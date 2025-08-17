# Solo 401(k) Employer Contribution - Correct Calculation

## The Issue
The current implementation uses a simple "25% of gross income" calculation, but for self-employed individuals, it's more complex due to self-employment tax considerations.

## Correct Calculation for Self-Employed

### For Sole Proprietors/Single-Member LLCs:
1. Start with net self-employment income
2. Calculate self-employment tax (15.3% × 92.35% of net income)
3. Deduct half of SE tax from net income
4. Maximum employer contribution = 20% of this adjusted amount

**Formula:**
```
Adjusted Income = Net Income - (Net Income × 0.9235 × 0.153 × 0.5)
Max Employer Contribution = Adjusted Income × 0.20
```

### For S-Corp Owners:
- Simply 25% of W-2 wages (not distributions)
- No self-employment tax adjustment needed

### For C-Corp Owners (ROBS):
- 25% of W-2 wages
- Can be more generous since it's a corporate contribution

## Example Calculations

### Sole Proprietor with $100,000 net income:
1. Self-employment tax: $100,000 × 0.9235 × 0.153 = $14,130
2. Deductible portion: $14,130 × 0.5 = $7,065
3. Adjusted income: $100,000 - $7,065 = $92,935
4. Max employer contribution: $92,935 × 0.20 = **$18,587**
   (Not $25,000 as current code would calculate)

### S-Corp with $100,000 W-2 wages:
- Max employer contribution: $100,000 × 0.25 = **$25,000**

## Current Code Issue

```javascript
// CURRENT (INCORRECT for sole props):
const maxEmployerContribution = Math.min(
  expectedContribution,
  grossIncome * 0.25,  // Wrong for sole proprietors!
  LIMITS.RETIREMENT.TOTAL_401K_457_403B - employeeContributions
);
```

## Correct Implementation

```javascript
function calculateSolo401kEmployerMax(grossIncome, entityType) {
  if (entityType === 'Sole Proprietorship' || entityType === 'Single-Member LLC') {
    // For self-employed: account for SE tax
    const seTax = grossIncome * 0.9235 * 0.153;
    const deductibleSE = seTax * 0.5;
    const adjustedIncome = grossIncome - deductibleSE;
    return adjustedIncome * 0.20;  // 20% for self-employed
  } else if (entityType === 'S-Corp' || entityType === 'C-Corp') {
    // For corporations: straight 25% of wages
    return grossIncome * 0.25;
  } else {
    // Default conservative estimate
    return grossIncome * 0.20;
  }
}
```

## Impact on ROBS Curious Profile

Since ROBS requires a C-Corp, users planning ROBS would actually get the full 25% calculation, which is correct. However:

1. **Pre-ROBS** (while self-employed): Should use 20% calculation
2. **Post-ROBS** (C-Corp owner): Can use 25% calculation

This transition isn't currently handled in the code.

## Recommendations

1. **Add entity type question**: "What is your business structure?"
   - Sole Proprietorship
   - Single-Member LLC  
   - S-Corporation
   - C-Corporation
   - Not Sure

2. **Adjust calculation based on entity type**

3. **For ROBS Curious specifically**:
   - If planning ROBS → assume C-Corp (25%)
   - If currently self-employed → use appropriate calculation

4. **Consider adding income type clarification**:
   - For S-Corp/C-Corp: "What is your W-2 wage?" (not total income)
   - For Sole Prop: "What is your net business income?"

## Testing Impact

The current tests would need adjustment:
- A sole proprietor with $150,000 income can contribute ~$27,000 employer (not $37,500)
- Combined with $23,000 employee = $50,000 total (well under the $69,000 limit)

This is a significant difference that affects retirement planning accuracy!
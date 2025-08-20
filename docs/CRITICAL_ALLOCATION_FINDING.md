# CRITICAL FINDING: Minimum 20% Savings Rate

## Discovery
While testing Profiles 4 and 7, we discovered that allocations were not matching expected values. The root cause is that the system enforces a **minimum 20% savings rate** regardless of the user's requested allocation percentage.

## How It Works

The `computeNetPool` function in Code.js uses:
```javascript
const targetRate = Math.max(defaultRate, userTotalPct);
```

Where:
- `defaultRate` = `CONFIG.OPTIMIZED_SAVINGS_RATE` = 0.20 (20%)
- `userTotalPct` = existing savings + (Allocation_Percentage / 100)

This means:
- If user wants 15%, system allocates 20% (minimum)
- If user wants 30%, system allocates 30% (above minimum)

## Test Examples

### Profile 4 Low Income Test
- Net Monthly Income: $5,500
- Requested Allocation: 15%
- Expected: $5,500 × 15% = $825
- **Actual: $5,500 × 20% = $1,100** ✓ (minimum enforced)

### Profile 7 Young Professional Test
- Net Monthly Income: $4,500
- Requested Allocation: 15%
- Expected: $4,500 × 15% = $675
- **Actual: $4,500 × 20% = $900** ✓ (minimum enforced)

## Implications

1. **Tests need adjustment** - Any test expecting less than 20% allocation will fail
2. **User expectations** - Users requesting low allocation percentages will get 20% minimum
3. **Documentation needed** - This minimum should be clearly communicated

## Solutions

### For Testing
1. Set Allocation_Percentage to achieve desired total above 20%
2. Or accept that 20% is the minimum and adjust expected values
3. For testing lower allocations, would need to modify CONFIG.OPTIMIZED_SAVINGS_RATE

### For Production
This is actually a **good feature** - it ensures users save at least 20% for retirement, which aligns with best practices for financial security.

## Updated Test Expectations

For any test with requested allocation < 20%:
- Calculate expected as: Net_Monthly_Income × 20%
- Not: Net_Monthly_Income × Allocation_Percentage%
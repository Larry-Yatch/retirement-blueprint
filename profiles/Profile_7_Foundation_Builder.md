# Profile 7: Foundation Builder

## Overview
This profile is the default for standard investors building their retirement foundation. They may have employer 401(k) or Roth accounts and represent the broadest user category without specific circumstances that trigger other profiles.

## Target User Characteristics
- **Employment**: W-2 employee or mixed employment
- **Age**: Under 50 (or 50+ without catch-up urgency)
- **Situation**: No special circumstances (ROBS, business, etc.)
- **Goal**: Build solid retirement foundation

## Classification Criteria
```javascript
// Default profile - assigned when no other profiles match
if (no other profile conditions met) {
    profile = '7_Foundation_Builder';
}
```

## Phase 2 Extra Questions
1. Does your employer offer a 401(k) retirement plan?
2. Does your employer match your 401(k) contributions?
3. What percentage does your employer match? (e.g., "50% up to 6%" or "100% up to 3%")
4. Does your employer 401(k) plan have a Roth option?

## Vehicle Priority Order

### Retirement Domain (Before Employer 401k Addition)
1. **Roth IRA** (if income < phase-out)
   - Cap: $7,000/year ($583/month)
   - Cap with catch-up (50+): $8,000/year ($667/month)
   
2. **Traditional IRA**
   - Cap: $7,000/year ($583/month)
   - Cap with catch-up (50+): $8,000/year ($667/month)
   
3. **Backdoor Roth IRA** (if income > phase-out)
   - Cap: $7,000/year ($583/month)
   - Cap with catch-up (50+): $8,000/year ($667/month)
   
4. **HSA** (if eligible)
   - Individual: $4,300/year ($358/month)
   - Family: $8,550/year ($713/month)
   - Catch-up (55+): +$1,000/year ($83/month)

*Note: Employer 401(k) vehicles are dynamically added if available*

### Education Domain
1. **Combined CESA**
   - Cap: $2,000/child/year ($167/child/month)
   
2. **Roth IRA**
   - Cap: Same as retirement (shared limit)
   
3. **Backdoor Roth IRA**
   - Cap: Same as retirement (shared limit)

### Health Domain
1. **HSA** (if eligible)
   - Same caps as in retirement domain

## Technical Implementation

### Helper Function Logic (Code.js:1363-1443)
```javascript
'7_Foundation_Builder': function(rowArr, hdr) {
    // Key features:
    // 1. Only profile using addEmployer401kVehicles()
    // 2. Dynamic vehicle ordering based on employer benefits
    // 3. Roth IRA prioritized by default (young savers)
    // 4. Full tax preference reordering
    // 5. Comprehensive phase-out handling
}
```

### Unique Feature: Employer 401(k) Integration
This is the ONLY profile that uses the `addEmployer401kVehicles()` function:

```javascript
baseRetirementOrder = addEmployer401kVehicles(baseRetirementOrder, {
    rowArr,
    hdr,
    age,
    grossIncome
});
```

### Employer 401(k) Logic
1. **Match First**: If employer offers match, prioritize to match limit
2. **Match Calculation**: Based on Q3 response (e.g., "50% up to 6%")
3. **Insertion Point**: After HSA (if present), before other vehicles
4. **Match Cap**: Calculated as percentage of gross income

### Universal Functions Applied
1. **calculateHsaMonthlyCapacity()** - Standard HSA limits
2. **calculateCesaMonthlyCapacity()** - CESA for children
3. **addEmployer401kVehicles()** - UNIQUE to this profile
4. **applyRothIRAPhaseOut()** - Income-based adjustments
5. **Tax Preference Functions** - Full reordering support

## Income Phase-Out Rules
- **Single Filers**: Roth IRA phases out $146,000-$161,000
- **Married Filing Jointly**: Roth IRA phases out $230,000-$240,000
- Above phase-out: Automatically includes Backdoor Roth IRA

## Optimization Strategy
1. **Employer Match First**: Free money - always maximize
2. **Roth While Young**: Lower tax bracket, more growth time
3. **HSA Triple Advantage**: If eligible, high priority
4. **Education Savings**: CESA for kids if applicable
5. **Tax Diversification**: Mix of Roth and Traditional

## Common Scenarios
- **Young Professional**: First job with 401(k), building habits
- **Mid-Career**: Steady income, employer benefits, family goals
- **Career Changer**: New job, rolling over old 401(k)
- **Dual Income**: Coordinating two employer plans

## Employer Match Examples
- **"50% up to 6%"**: Contribute 6% to get 3% match
- **"100% up to 3%"**: Contribute 3% to get 3% match
- **"Dollar for dollar up to $2,000"**: Contribute $2,000 to get $2,000

## Default Assumptions
- **Income**: ~$75,000 (used for calculations)
- **Priority**: Balanced approach to retirement
- **Risk Tolerance**: Moderate (implied by Roth preference)
- **Time Horizon**: 20+ years to retirement

## Tuning Considerations
- Expand employer 401(k) logic for full contributions beyond match
- Add automatic escalation recommendations
- Include target-date fund vs self-directed guidance
- Add emergency fund checks before retirement savings
- Consider debt payoff prioritization logic
- Include spouse coordination for dual-income households
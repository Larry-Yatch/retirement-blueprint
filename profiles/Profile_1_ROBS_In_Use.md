# Profile 1: ROBS-In-Use Strategist

## Overview
This profile is for users who have already implemented a ROBS (Rollover for Business Startups) structure with a C-corporation and are actively funding a Solo 401(k) with business revenue.

## Target User Characteristics
- **Already has**: Active C-corp with ROBS retirement plan
- **Business Status**: Operating business that generates revenue
- **Key Advantage**: Can contribute significantly more than traditional limits through profit distributions
- **Tax Strategy**: Flexibility between Roth and Traditional contributions

## Classification Criteria
```javascript
if (robsInUse === 'Yes') {
    profile = '1_ROBS_In_Use';
}
```

## Phase 2 Extra Questions
1. Describe how your ROBS strategy is currently structured:
2. How are your business profits routed into your Solo 401(k)?
3. Which type of contributions are you making? (Roth only / Traditional only / Both)
4. How often do you contribute to your Solo 401(k)? (Monthly, Quarterly, etc.)
5. Do you also contribute to a Roth IRA? If yes, how much per year to each?
6. Approximately how much do you expect your business to distribute to your Solo 401(k) each year?

## Vehicle Priority Order

### Retirement Domain
1. **ROBS Solo 401(k) – Profit Distribution**
   - Cap: Infinity (business profit dependent)
   - Priority: Highest - maximize business profit distributions
   
2. **ROBS Solo 401(k) – Roth**
   - Cap: $23,500/year ($1,958/month)
   - Cap with catch-up (50+): $31,000/year ($2,583/month)
   - Cap with catch-up (60+): $34,750/year ($2,896/month)
   
3. **ROBS Solo 401(k) – Traditional**
   - Cap: $23,500/year ($1,958/month)
   - Cap with catch-up (50+): $31,000/year ($2,583/month)
   - Cap with catch-up (60+): $34,750/year ($2,896/month)
   
4. **HSA** (if eligible)
   - Individual: $4,300/year ($358/month)
   - Family: $8,550/year ($713/month)
   - Catch-up (55+): +$1,000/year ($83/month)
   
5. **Roth IRA** (if income < phase-out)
   - Cap: $7,000/year ($583/month)
   - Cap with catch-up (50+): $8,000/year ($667/month)
   - Replaced with Backdoor Roth IRA if income exceeds limits

### Education Domain
1. **Combined CESA**
   - Cap: $2,000/child/year ($167/child/month)
   
2. **Roth IRA**
   - Cap: Same as retirement (shared limit)

### Health Domain
1. **HSA** (if eligible)
   - Same caps as in retirement domain

## Technical Implementation

### Helper Function Logic (Code.js:949-1032)
```javascript
'1_ROBS_In_Use': function(rowArr, hdr) {
    // Key features:
    // 1. Uses universal HSA/CESA calculation functions
    // 2. Applies catch-up contributions for age 50+
    // 3. Implements Roth IRA phase-out logic
    // 4. Tax preference ordering (Traditional vs Roth)
    // 5. No seeding - all contributions are ongoing
}
```

### Universal Functions Applied
1. **calculateHsaMonthlyCapacity()** - Determines HSA limits based on coverage and age
2. **calculateCesaMonthlyCapacity()** - Sets CESA limits per child
3. **applyRothIRAPhaseOut()** - Switches to Backdoor Roth when income exceeds limits
4. **Tax Preference Functions** - Reorders vehicles based on tax strategy

### Tax Preference Logic
- **"Now" Focus**: Prioritizes Traditional 401(k) contributions
- **"Later" Focus**: Prioritizes Roth 401(k) contributions
- **"Both" or Undefined**: Maintains balanced order

## Income Phase-Out Rules
- **Single Filers**: Roth IRA phases out $146,000-$161,000
- **Married Filing Jointly**: Roth IRA phases out $230,000-$240,000
- Above phase-out: Automatically switches to Backdoor Roth IRA

## Optimization Strategy
1. **Maximize Profit Distributions**: Primary focus on routing business profits to retirement
2. **Tax Diversification**: Balance between Roth and Traditional based on current tax bracket
3. **Catch-Up Contributions**: Automatically applied for users 50+
4. **HSA Triple Tax Advantage**: Prioritized when eligible
5. **Education Funding**: CESA for each child if applicable

## Common Scenarios
- **High Profit Business**: Can contribute well beyond normal 401(k) limits
- **Tax Optimization**: Flexibility to choose Roth vs Traditional based on income
- **Family Planning**: CESA contributions for children's education
- **Health Savings**: HSA for medical expenses and additional retirement

## Tuning Considerations
- Consider adding employer match calculations for ROBS Solo 401(k)
- May need to adjust profit distribution caps based on business type
- Could add logic for mega-backdoor Roth conversions
- Consider coordinating with spouse's retirement plans if applicable
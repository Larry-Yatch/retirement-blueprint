# Profile 2: ROBS-Curious Builder

## Overview
This profile is for users who are interested in ROBS but haven't implemented it yet. They meet all the requirements and want to leverage business income for retirement growth through a future ROBS structure.

## Target User Characteristics
- **Interest**: Actively interested in ROBS strategy
- **Qualifications**: Has new business idea, $50k+ to rollover, can fund setup costs
- **Current Status**: Planning or early-stage business
- **Goal**: Maximize retirement savings through business profits

## Classification Criteria
```javascript
if (robsInterest === 'Yes' &&
    robsNewBiz === 'Yes' &&
    robsFunds === 'Yes' &&
    robsSetup === 'Yes') {
    profile = '2_ROBS_Curious';
}
```

## Phase 2 Extra Questions
1. What is the approximate balance you plan to rollover initially into your ROBS-funded C-corp?
2. What is your expected annual contribution from business profits back into the Solo 401(k)?

## Vehicle Priority Order

### Retirement Domain
1. **Solo 401(k) – Roth**
   - Cap: $23,500/year ($1,958/month)
   - Cap with catch-up (50+): $31,000/year ($2,583/month)
   - Cap with catch-up (60+): $34,750/year ($2,896/month)
   
2. **Solo 401(k) – Traditional**
   - Cap: $23,500/year ($1,958/month)
   - Cap with catch-up (50+): $31,000/year ($2,583/month)
   - Cap with catch-up (60+): $34,750/year ($2,896/month)
   
3. **HSA** (if eligible)
   - Individual: $4,300/year ($358/month)
   - Family: $8,550/year ($713/month)
   - Catch-up (55+): +$1,000/year ($83/month)
   
4. **Roth IRA** (if income < phase-out)
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

### Helper Function Logic (Code.js:1033-1113)
```javascript
'2_ROBS_Curious': function(rowArr, hdr) {
    // Key features:
    // 1. Similar structure to ROBS_In_Use but without profit distribution vehicle
    // 2. Preparing for future ROBS implementation
    // 3. Standard Solo 401(k) limits apply
    // 4. Full universal function support
    // 5. No seeding - future contributions only
}
```

### Key Differences from Profile 1
- **No Profit Distribution Vehicle**: Not yet implemented ROBS structure
- **Standard Limits**: Solo 401(k) limited to employee contributions only
- **Planning Focus**: Questions gather info for future ROBS setup
- **Same Tax Strategies**: Identical tax preference handling

### Universal Functions Applied
1. **calculateHsaMonthlyCapacity()** - Determines HSA limits based on coverage and age
2. **calculateCesaMonthlyCapacity()** - Sets CESA limits per child
3. **applyRothIRAPhaseOut()** - Switches to Backdoor Roth when income exceeds limits
4. **Tax Preference Functions** - Reorders vehicles based on tax strategy

### Tax Preference Logic
- **"Now" Focus**: Prioritizes Traditional Solo 401(k)
- **"Later" Focus**: Prioritizes Roth Solo 401(k)
- **"Both" or Undefined**: Maintains balanced order

## Income Phase-Out Rules
- **Single Filers**: Roth IRA phases out $146,000-$161,000
- **Married Filing Jointly**: Roth IRA phases out $230,000-$240,000
- Above phase-out: Automatically switches to Backdoor Roth IRA

## Optimization Strategy
1. **Prepare for ROBS**: Maximize current retirement savings while planning
2. **Build Capital**: Focus on accumulating rollover funds
3. **Tax Planning**: Choose Roth vs Traditional based on expected business income
4. **Health Savings**: HSA provides triple tax advantage
5. **Education Planning**: CESA if children are present

## Transition Planning
- **Current State**: Standard retirement savings vehicles
- **Future State**: Full ROBS implementation with profit distributions
- **Key Metric**: Rollover balance for ROBS funding
- **Timeline**: Based on business readiness and capital accumulation

## Common Scenarios
- **W-2 Employee Planning Exit**: Building funds for ROBS while employed
- **Early-Stage Entrepreneur**: Business idea ready, accumulating capital
- **Tax Optimization**: Balancing current vs future tax considerations
- **Family Planning**: Including education savings in strategy

## Tuning Considerations
- Add employer contribution calculations when ROBS is implemented
- Consider tracking progress toward ROBS funding goals
- May need business type-specific optimizations
- Could add ROBS setup cost planning tools
- Consider adding milestone notifications for ROBS readiness
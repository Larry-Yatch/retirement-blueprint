# Profile 6: Catch-Up Visionary

## Overview
This profile is for users age 50+ who feel behind on retirement savings and want aggressive, tax-smart catch-up planning. They have access to enhanced contribution limits and need to maximize every opportunity.

## Target User Characteristics
- **Age**: 50 or older
- **Mindset**: Feels behind on retirement savings
- **Goal**: Aggressive savings to make up for lost time
- **Advantage**: Access to catch-up contributions across multiple vehicles

## Classification Criteria
```javascript
if (age >= 50 && catchUpFeeling === 'Yes') {
    profile = '6_Catch_Up';
}
```
*Note: Takes precedence over Bracket Strategist but not over business-related profiles*

## Phase 2 Extra Questions
Profile uses standard Phase 2 questions without additional profile-specific queries.

## Vehicle Priority Order

### Retirement Domain
1. **401(k) Catch-Up**
   - Age 50-59: $31,000/year ($2,583/month)
   - Age 60+: $34,750/year ($2,896/month)
   - Includes both regular limit + catch-up amount
   
2. **IRA Catch-Up**
   - All 50+: $8,000/year ($667/month)
   - Includes $7,000 base + $1,000 catch-up
   
3. **HSA** (if eligible)
   - Individual: $4,300/year ($358/month)
   - Family: $8,550/year ($713/month)
   - Age 55+ Catch-up: +$1,000/year ($83/month)

### Education Domain
1. **Combined CESA**
   - Cap: $2,000/child/year ($167/child/month)
   
2. **IRA Catch-Up**
   - Cap: Same as retirement (shared limit)

### Health Domain
1. **HSA** (if eligible)
   - Same caps as in retirement domain

## Technical Implementation

### Helper Function Logic (Code.js:1280-1362)
```javascript
'6_Catch_Up': function(rowArr, hdr) {
    // Key features:
    // 1. Named vehicles specifically for catch-up amounts
    // 2. Automatic catch-up calculations based on age
    // 3. Simplified vehicle list focusing on maximum contributions
    // 4. Tax preference ordering still applies
    // 5. Roth phase-out handling included
}
```

### Catch-Up Contribution Details
1. **401(k) Catch-Up**:
   - Age 50-59: +$7,500/year
   - Age 60-63: +$11,250/year (SECURE Act 2.0)
   - Combined with base limit in single vehicle

2. **IRA Catch-Up**:
   - All 50+: +$1,000/year
   - Applies to both Traditional and Roth

3. **HSA Catch-Up**:
   - Age 55+: +$1,000/year
   - Can continue past 65 if not on Medicare

### Universal Functions Applied
1. **calculateHsaMonthlyCapacity()** - Includes age 55+ catch-up
2. **calculateCesaMonthlyCapacity()** - Standard CESA limits
3. **applyRothIRAPhaseOut()** - Handles high-income scenarios
4. **Tax Preference Functions** - Reorders based on tax strategy

## Income Phase-Out Rules
- **Single Filers**: Roth IRA phases out $146,000-$161,000
- **Married Filing Jointly**: Roth IRA phases out $230,000-$240,000
- Above phase-out: Switches to Backdoor Roth IRA with catch-up

## Optimization Strategy
1. **Maximize Every Vehicle**: Use all catch-up opportunities
2. **Tax Diversification**: Balance Traditional and Roth
3. **Accelerated Savings**: 30-50% higher contribution capacity
4. **HSA Triple Play**: Medical expenses + catch-up + retirement
5. **Spousal Coordination**: Both spouses use catch-up if eligible

## Common Scenarios
- **Late Career Professional**: High income, maximizing final years
- **Empty Nester**: Kids through college, redirecting to retirement
- **Inheritance Recipient**: Windfall to allocate efficiently
- **Divorced Individual**: Rebuilding retirement after split

## Age-Based Considerations
- **Age 50-54**: 401(k) and IRA catch-up available
- **Age 55-59**: Add HSA catch-up if eligible
- **Age 60-63**: Enhanced 401(k) catch-up (SECURE Act 2.0)
- **Age 64+**: Consider Late Stage Growth profile

## Catch-Up Impact Analysis
- **401(k)**: 32% more capacity at 50+, 48% more at 60+
- **IRA**: 14% more capacity at 50+
- **HSA**: 23% more capacity at 55+ (individual)
- **Combined**: Can add $8,500-$12,250/year in catch-up

## Tax Planning Strategies
- **High Income Years**: Maximize Traditional for deductions
- **Variable Income**: Roth in low years, Traditional in high
- **Retirement Prep**: Build both buckets for flexibility
- **State Considerations**: Moving to no-tax state in retirement?

## Tuning Considerations
- Add Social Security optimization planning
- Include Required Minimum Distribution (RMD) projections
- Add Medicare/healthcare cost planning
- Consider pension integration if applicable
- Include long-term care insurance planning
- Add spousal age difference calculations
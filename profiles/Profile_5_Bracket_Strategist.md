# Profile 5: Bracket-Balanced Strategist

## Overview
This profile is for users focused on current tax reduction with flexibility for future Roth conversions. They prioritize minimizing taxes today through Traditional contributions while maintaining options for the future.

## Target User Characteristics
- **Tax Focus**: "Now" or "Both" - wants immediate tax savings
- **Income Level**: Mid to high income earners
- **Strategy**: Balance current deductions with future tax-free growth
- **Flexibility**: Wants options for both Traditional and Roth

## Classification Criteria
```javascript
if (['Now','Both'].includes(taxFocus)) {
    profile = '5_Bracket_Strategist';
}
```
*Note: This is a lower priority check, so users must not match other profiles first*

## Phase 2 Extra Questions
Profile uses standard Phase 2 questions without additional profile-specific queries.

## Vehicle Priority Order

### Retirement Domain (Default Order)
1. **Traditional 401(k)**
   - Cap: $23,500/year ($1,958/month)
   - Cap with catch-up (50+): $31,000/year ($2,583/month)
   - Cap with catch-up (60+): $34,750/year ($2,896/month)
   
2. **Traditional IRA**
   - Cap: $7,000/year ($583/month)
   - Cap with catch-up (50+): $8,000/year ($667/month)
   
3. **HSA** (if eligible)
   - Individual: $4,300/year ($358/month)
   - Family: $8,550/year ($713/month)
   - Catch-up (55+): +$1,000/year ($83/month)
   
4. **Roth IRA** (if income < phase-out)
   - Cap: $7,000/year ($583/month)
   - Cap with catch-up (50+): $8,000/year ($667/month)
   
5. **Backdoor Roth IRA** (if income > phase-out)
   - Cap: $7,000/year ($583/month)
   - Cap with catch-up (50+): $8,000/year ($667/month)

### Education Domain
1. **Combined CESA**
   - Cap: $2,000/child/year ($167/child/month)
   
2. **Traditional IRA**
   - Cap: Same as retirement (shared limit)
   
3. **Roth IRA**
   - Cap: Same as retirement (shared limit)
   
4. **Backdoor Roth IRA**
   - Cap: Same as retirement (shared limit)

### Health Domain
1. **HSA** (if eligible)
   - Same caps as in retirement domain

## Technical Implementation

### Helper Function Logic (Code.js:1197-1279)
```javascript
'5_Bracket_Strategist': function(rowArr, hdr) {
    // Key features:
    // 1. Traditional-first default ordering
    // 2. Full catch-up contribution support
    // 3. Dynamic reordering based on tax preference
    // 4. Roth phase-out handling
    // 5. No employer 401(k) integration (differs from Foundation Builder)
}
```

### Tax Strategy Implementation
1. **Default Order**: Traditional accounts first for immediate deductions
2. **Tax Focus "Now"**: Reinforces Traditional priority
3. **Tax Focus "Later"**: Can flip to Roth priority
4. **Tax Focus "Both"**: Maintains balanced approach

### Universal Functions Applied
1. **calculateHsaMonthlyCapacity()** - Determines HSA limits
2. **calculateCesaMonthlyCapacity()** - Sets CESA limits
3. **applyRothIRAPhaseOut()** - Handles high-income scenarios
4. **prioritizeTraditionalAccounts()** - Reorders for current tax savings
5. **prioritizeRothAccounts()** - Reorders for future tax savings

## Income Phase-Out Rules
- **Single Filers**: Roth IRA phases out $146,000-$161,000
- **Married Filing Jointly**: Roth IRA phases out $230,000-$240,000
- Above phase-out: Automatically includes Backdoor Roth IRA

## Optimization Strategy
1. **Reduce Current Taxes**: Maximum Traditional contributions
2. **Tax Bracket Management**: Stay below next bracket if possible
3. **Future Flexibility**: Some Roth for tax diversification
4. **HSA Priority**: Triple tax advantage always valuable
5. **Conversion Planning**: Traditional now, convert in low-income years

## Common Scenarios
- **High Earner**: Maximizing deductions to reduce tax burden
- **Business Owner**: Large income spikes need tax reduction
- **Pre-Retiree**: Building Traditional for conversion ladder
- **Dual Income**: Both spouses maximizing Traditional 401(k)s

## Tax Bracket Considerations
- **Key Brackets (2024)**:
  - 22% → 24%: $95,376 (single), $190,751 (married)
  - 24% → 32%: $191,951 (single), $383,901 (married)
  - 32% → 35%: $243,726 (single), $487,451 (married)
- **Strategy**: Contribute enough to stay in lower bracket

## Future Conversion Planning
- **Retirement Years**: Lower income = lower tax on conversions
- **Conversion Ladder**: Convert just enough to fill low brackets
- **IRMAA Considerations**: Avoid Medicare premium surcharges
- **State Taxes**: Consider relocating before conversions

## Tuning Considerations
- Add employer 401(k) match optimization
- Include state tax considerations in ordering
- Add tax bracket optimization calculator
- Consider adding after-tax 401(k) for mega-backdoor
- Include coordination with spouse's benefits
- Add estimated tax payment planning for high earners
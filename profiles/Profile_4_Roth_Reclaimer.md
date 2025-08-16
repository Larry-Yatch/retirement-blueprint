# Profile 4: Roth IRA Reclaimer

## Overview
This profile is for high-earners who need backdoor Roth strategies or want to consolidate/convert existing Traditional IRA assets. They typically have Traditional IRA balances that complicate backdoor Roth conversions.

## Target User Characteristics
- **Income Level**: Often above Roth IRA contribution limits
- **Existing Assets**: Has Traditional IRA or old 401(k) accounts
- **Tax Strategy**: Seeking tax-free growth through Roth conversions
- **Key Challenge**: Pro-rata rule for backdoor Roth conversions

## Classification Criteria
```javascript
if (hasTradIRA === 'Yes') {
    profile = '4_Roth_Reclaimer';
}
```

## Phase 2 Extra Questions
1. What is the current balance in your Traditional IRA or other old retirement account?
2. Have you ever made after-tax (non-deductible) contributions to an IRA?
3. Do you understand or have you used the "Backdoor Roth" IRA strategy?
4. Would you like to move some or all of your Traditional IRA money into a Roth IRA? If so, how much?

## Vehicle Priority Order

### Retirement Domain
1. **Backdoor Roth IRA**
   - Cap: $7,000/year ($583/month)
   - Cap with catch-up (50+): $8,000/year ($667/month)
   - Process: Contribute to Traditional IRA (non-deductible) → Convert to Roth
   
2. **HSA** (if eligible)
   - Individual: $4,300/year ($358/month)
   - Family: $8,550/year ($713/month)
   - Catch-up (55+): +$1,000/year ($83/month)

### Education Domain
1. **Combined CESA**
   - Cap: $2,000/child/year ($167/child/month)
   
2. **Backdoor Roth IRA**
   - Cap: Same as retirement (shared limit)

### Health Domain
1. **HSA** (if eligible)
   - Same caps as in retirement domain

## Technical Implementation

### Helper Function Logic (Code.js:1114-1179)
```javascript
'4_Roth_Reclaimer': function(rowArr, hdr) {
    // Key features:
    // 1. Minimal vehicle options due to existing Traditional IRA
    // 2. Focus on backdoor Roth strategy
    // 3. No direct Roth IRA (assumes high income)
    // 4. HSA for additional tax-advantaged savings
    // 5. No employer 401(k) vehicles by default
}
```

### Unique Characteristics
1. **Limited Options**: Fewest vehicles due to pro-rata rule complications
2. **Backdoor Focus**: Primary strategy is non-deductible → Roth conversion
3. **No Traditional IRA**: Avoid adding to Traditional IRA balance
4. **Conversion Planning**: Questions assess conversion readiness

### Universal Functions Applied
1. **calculateHsaMonthlyCapacity()** - Determines HSA limits based on coverage and age
2. **calculateCesaMonthlyCapacity()** - Sets CESA limits per child
3. **Tax Preference Functions** - Less relevant due to limited options

## Pro-Rata Rule Implications
- **Challenge**: Existing Traditional IRA balance complicates backdoor Roth
- **Formula**: Tax-free portion = (Basis / Total IRA Balance) × Conversion Amount
- **Solution Options**:
  1. Convert entire Traditional IRA to Roth (tax hit)
  2. Roll Traditional IRA into employer 401(k) if allowed
  3. Use ROBS strategy to absorb Traditional IRA

## Income Phase-Out Rules
- **Assumed High Income**: Profile assumes income exceeds direct Roth limits
- **Single Filers**: Above $161,000
- **Married Filing Jointly**: Above $240,000

## Optimization Strategy
1. **Clear Traditional IRA**: Roll into 401(k) or convert to enable clean backdoor
2. **Annual Backdoor**: $7,000-$8,000 per year tax-free growth
3. **HSA Maximum**: Triple tax advantage for medical/retirement
4. **Timing Conversions**: Consider tax bracket management
5. **Spousal Strategies**: Each spouse can do backdoor Roth

## Common Scenarios
- **Tech Professional**: High income, old 401(k) rolled to IRA
- **Medical Professional**: Needs to clear IRA for clean backdoor
- **Business Owner**: Considering ROBS to absorb Traditional IRA
- **Early Retiree**: Converting Traditional to Roth in low-income years

## Conversion Strategies
1. **Full Conversion**: Convert entire Traditional IRA (large tax bill)
2. **Partial Conversions**: Spread over multiple years
3. **401(k) Rollover**: Move Traditional IRA to employer plan
4. **ROBS Solution**: Use business structure to absorb IRA

## Tax Considerations
- **Conversion Taxes**: Ordinary income tax on converted amounts
- **State Taxes**: Consider state tax implications
- **Medicare Surcharge**: Large conversions may trigger IRMAA
- **Tax Withholding**: Plan for quarterly estimates if converting

## Tuning Considerations
- Add employer 401(k) option if user has access
- Include Roth conversion calculator/optimizer
- Add mega-backdoor Roth if 401(k) allows after-tax
- Consider adding taxable investment account as overflow
- Include education about pro-rata rule complications
- Add coordination with tax planning for conversions
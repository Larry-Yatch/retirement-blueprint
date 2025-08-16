# Profile 3: Solo 401(k) Builder

## Overview
This profile is for self-employed individuals or 1099 contractors who want to set up or optimize a Solo 401(k). They have no employees (except possibly a spouse) and can contribute as both employee and employer.

## Target User Characteristics
- **Employment**: Self-employed, 1099 contractor, or sole proprietor
- **Employees**: None (spouse allowed)
- **Business Types**: Sole Prop, LLC, S-Corp, or C-Corp
- **Key Advantage**: Double contribution capacity (employee + employer)

## Classification Criteria
```javascript
if ((workSituation === 'Self-employed' || workSituation === 'Both') && 
    hasEmployees === 'No') {
    profile = '3_Solo401k_Builder';
}
```

## Phase 2 Extra Questions
1. What kind of business do you run? (Sole Prop / LLC / S-Corp / C-Corp)
2. Do you have any employees besides yourself (and your spouse)?
3. Have you already set up a Solo 401(k) plan?
4. If yes, how much per year will you contribute as employee? (USD)
5. If yes, how much per year will your business contribute as employer? (USD)
6. About how much can you put into this plan from your business each year?

## Vehicle Priority Order

### Retirement Domain
1. **Solo 401(k) – Employee**
   - Cap: $23,500/year ($1,958/month)
   - Cap with catch-up (50+): $31,000/year ($2,583/month)
   - Cap with catch-up (60+): $34,750/year ($2,896/month)
   
2. **Solo 401(k) – Employer**
   - Cap: Up to 25% of compensation or 20% of self-employment income
   - Total 401(k) limit: $70,000/year ($5,833/month)
   - Total with catch-up (50-59): $77,500/year ($6,458/month)
   - Total with catch-up (60+): $81,250/year ($6,771/month)
   
3. **HSA** (if eligible)
   - Individual: $4,300/year ($358/month)
   - Family: $8,550/year ($713/month)
   - Catch-up (55+): +$1,000/year ($83/month)
   
4. **Roth IRA** (if income < phase-out)
   - Cap: $7,000/year ($583/month)
   - Cap with catch-up (50+): $8,000/year ($667/month)
   
5. **Backdoor Roth IRA** (if applicable)
   - Cap: $7,000/year ($583/month)
   - Cap with catch-up (50+): $8,000/year ($667/month)

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

### Helper Function Logic (Code.js:842-941)
```javascript
'3_Solo401k_Builder': function(rowArr, hdr) {
    // Key features:
    // 1. Reads existing plan status and contribution amounts
    // 2. Seeds contributions based on current plan or future expectations
    // 3. Separates employee and employer contributions
    // 4. Full catch-up contribution support
    // 5. Dynamic vehicle ordering based on tax preference
}
```

### Unique Features
1. **Seeding Logic**: 
   - If has existing plan: Seeds both employee and employer amounts from Q4 & Q5
   - If planning new plan: Seeds employee amount from Q6 (future expectations)

2. **Employer Contribution Calculations**:
   - S-Corp: Up to 25% of W-2 wages
   - Sole Prop/LLC: Up to 20% of net self-employment income
   - Must coordinate with employee deferrals

### Universal Functions Applied
1. **calculateHsaMonthlyCapacity()** - Determines HSA limits based on coverage and age
2. **calculateCesaMonthlyCapacity()** - Sets CESA limits per child
3. **applyRothIRAPhaseOut()** - Switches to Backdoor Roth when income exceeds limits
4. **Tax Preference Functions** - Reorders vehicles based on tax strategy

### Tax Preference Logic
- **"Now" Focus**: Employee contributions can be Traditional
- **"Later" Focus**: Employee contributions can be Roth
- **Employer Contributions**: Always pre-tax (Traditional)

## Income Phase-Out Rules
- **Single Filers**: Roth IRA phases out $146,000-$161,000
- **Married Filing Jointly**: Roth IRA phases out $230,000-$240,000
- Above phase-out: Automatically includes Backdoor Roth IRA option

## Optimization Strategy
1. **Maximize Both Buckets**: Use full employee deferral + employer match
2. **Business Structure Matters**: S-Corp vs Sole Prop affects contribution calculations
3. **Tax Diversification**: Balance Roth vs Traditional employee deferrals
4. **Catch-Up Advantage**: Significant additional capacity for 50+
5. **Backdoor Roth**: Available for high earners

## Common Scenarios
- **New Freelancer**: Setting up first Solo 401(k)
- **Established Consultant**: Optimizing existing plan
- **S-Corp Owner**: Maximizing salary/distribution split
- **High Earner**: Combining Solo 401(k) with Backdoor Roth

## Business Type Considerations
- **Sole Prop**: 20% of net self-employment income for employer portion
- **Single-Member LLC**: Taxed as sole prop unless elected otherwise
- **S-Corp**: 25% of W-2 wages for employer portion
- **C-Corp**: 25% of wages, but consider ROBS profile instead

## Tuning Considerations
- Add more sophisticated employer contribution calculations
- Consider mega-backdoor Roth for after-tax contributions
- Add coordination with spouse's retirement plans
- Include SEP-IRA as alternative for some scenarios
- Add quarterly estimated tax payment coordination
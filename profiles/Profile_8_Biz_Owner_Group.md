# Profile 8: Business Owner with Employee Group

## Overview
This profile is for business owners who have W-2 employees and are seeking advanced retirement strategies. They can establish group plans and potentially use defined benefit plans for significantly higher contribution limits.

## Target User Characteristics
- **Business Owner**: Owns one or more businesses
- **Has Employees**: W-2 employees on payroll
- **Income Level**: Typically high (average ~$144,000)
- **Goal**: Advanced strategies beyond individual limits

## Classification Criteria
```javascript
if (hasEmployees === 'Yes') {
    profile = '8_Biz_Owner_Group';
}
```
*Note: Takes precedence over Solo 401(k) Builder and other profiles*

## Phase 2 Extra Questions
Profile uses standard Phase 2 questions without additional profile-specific queries.
*Note: Could benefit from questions about number of employees, ages, and compensation*

## Vehicle Priority Order

### Retirement Domain
1. **Group 401(k) – Employee**
   - Cap: $23,500/year ($1,958/month)
   - Cap with catch-up (50+): $31,000/year ($2,583/month)
   - Cap with catch-up (60+): $34,750/year ($2,896/month)
   
2. **Group 401(k) – Employer**
   - Cap: Up to total limit of $70,000/year ($5,833/month)
   - Must consider nondiscrimination testing
   - Profit sharing possible up to 25% of compensation
   
3. **Defined Benefit Plan**
   - Cap: $280,000/year ($23,333/month)
   - Requires actuarial calculations
   - Best for older, high-income owners
   
4. **HSA** (if eligible)
   - Individual: $4,300/year ($358/month)
   - Family: $8,550/year ($713/month)
   - Catch-up (55+): +$1,000/year ($83/month)

### Education Domain
1. **Combined CESA**
   - Cap: $2,000/child/year ($167/child/month)
   
2. **Roth IRA**
   - Cap: $7,000/year ($583/month)
   - Cap with catch-up (50+): $8,000/year ($667/month)
   
3. **Backdoor Roth IRA**
   - Cap: Same as Roth IRA

### Health Domain
1. **HSA** (if eligible)
   - Same caps as in retirement domain

## Technical Implementation

### Helper Function Logic (Code.js:1446-1528)
```javascript
'8_Biz_Owner_Group': function(rowArr, hdr) {
    // Key features:
    // 1. Group 401(k) instead of Solo 401(k)
    // 2. Includes Defined Benefit Plan option
    // 3. Higher assumed income ($144,000)
    // 4. Full catch-up support
    // 5. Standard universal function integration
}
```

### Advanced Plan Considerations
1. **Group 401(k)**:
   - Must offer to all eligible employees
   - Nondiscrimination testing required
   - Safe harbor options available
   - Can include profit sharing

2. **Defined Benefit Plan**:
   - Allows massive contributions for older owners
   - Annual benefit up to $280,000 at retirement
   - Requires actuarial certification
   - Must cover employees (but can be designed favorably)

### Universal Functions Applied
1. **calculateHsaMonthlyCapacity()** - Standard HSA limits
2. **calculateCesaMonthlyCapacity()** - CESA calculations
3. **applyRothIRAPhaseOut()** - High income often triggers
4. **Tax Preference Functions** - Full reordering support

## Income Phase-Out Rules
- **Single Filers**: Roth IRA phases out $146,000-$161,000
- **Married Filing Jointly**: Roth IRA phases out $230,000-$240,000
- Most users in this profile exceed phase-out limits

## Optimization Strategy
1. **Defined Benefit First**: If age/income qualify, massive deductions
2. **Maximize Group Plans**: Use full employee/employer capacity
3. **Coordinate Spouse**: May have separate business or employment
4. **Tax Planning**: Large deductions crucial at high income
5. **Employee Costs**: Balance owner benefits with required coverage

## Common Scenarios
- **Professional Practice**: Doctors, lawyers with staff
- **Established Business**: 10+ years, stable profits
- **Family Business**: Employing family members strategically
- **Multiple Entities**: Different plans for different businesses

## Nondiscrimination Considerations
- **Coverage Tests**: Must cover enough non-highly compensated
- **ADP/ACP Tests**: Average deferral/contribution percentages
- **Top-Heavy Rules**: Enhanced benefits if too concentrated
- **Safe Harbor**: 3% non-elective or 4% match avoids testing

## Defined Benefit Advantages
- **Age 50**: ~$150,000-200,000 annual contribution
- **Age 55**: ~$200,000-250,000 annual contribution  
- **Age 60**: ~$250,000-280,000 annual contribution
- **Tax Deduction**: Full contribution is deductible

## Employee Cost Management
- **Vesting Schedules**: 3-year cliff or 6-year graded
- **Eligibility Requirements**: Age 21, 1 year service
- **Profit Sharing**: Can allocate favorably to older employees
- **Cash Balance Plans**: More predictable than traditional DB

## Tuning Considerations
- Add questions about employee demographics
- Include cash balance plan options
- Add 401(k) plan design optimizer
- Consider adding NQDC (non-qualified deferred comp)
- Include business structure optimization
- Add multi-entity coordination strategies
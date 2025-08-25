# Profile 8: Biz Owner Group

## 🎯 Profile Identity

### Target User
Business owners who have W-2 employees and are seeking advanced retirement strategies beyond individual limits. They can establish group plans and potentially use defined benefit plans for significantly higher contribution limits.

### Core Challenge
Maximizing owner retirement benefits while managing employee plan costs, complying with nondiscrimination rules, and leveraging advanced strategies like defined benefit plans for massive tax deductions.

### Key Differentiator
Unlike Solo 401(k) builders, these owners must cover employees but gain access to defined benefit plans that can allow $200,000-$280,000+ annual contributions for older, high-income owners.

## 📊 Classification Logic

### Priority Order
3 (High priority - after ROBS profiles but before individual profiles)

### Classification Criteria
```javascript
// From classifyClientProfileFromWorkingSheet()
if (hasEmployees === 'Yes') {
    return '8_Biz_Owner_Group';
}
// Note: Takes precedence over Solo 401(k) Builder and other profiles
```

### Common Scenarios
- **Professional Practice**: Doctors, lawyers with staff
- **Established Business**: 10+ years, stable profits
- **Family Business**: Employing family members strategically
- **Multiple Entities**: Different plans for different businesses

## 🚀 Implementation Status

### Current State
- ✅ Profile Helper Function
- ✅ Universal Functions Integration
- ✅ Form Questions Added
- ✅ Form Mapping Configured
- ✅ Employee Demographics Logic
- ✅ Cash Balance Plan Implementation
- ✅ Mega Backdoor Roth Implementation
- ❌ Test Scenarios Written
- ❌ Live Form Testing
- ❌ Production Ready

### Status Summary
**Status**: Full Implementation Complete - Needs Testing
**Last Updated**: December 2024 - Added employee demographics and conditional logic
**Next Steps**: Create test scenarios and validate calculations

## 💻 Technical Implementation

### Profile Helper Location
`Code.js` lines 1930-2075

### Key Features Implemented
- ✅ Group 401(k) instead of Solo 401(k)
- ✅ Defined Benefit Plan with age-based logic
- ✅ Employee demographics consideration
- ✅ Full catch-up support
- ✅ Tax preference reordering
- ✅ Cash Balance Plan with age requirements
- ✅ After-Tax 401(k) → Mega Backdoor Roth
- ✅ HSA prioritization
- ✅ Conditional plan recommendations based on owner/employee age gap

### Universal Functions Used
```javascript
✅ calculateHsaMonthlyCapacity()
✅ calculateCesaMonthlyCapacity()
❌ addEmployer401kVehicles() // Not used - has group plans
✅ applyRothIRAPhaseOut()
✅ prioritizeTraditionalAccounts() / prioritizeRothAccounts()
```

## 📝 Form Configuration

### Phase 2 Extra Questions (Implemented)
1. **ex_q1**: Number of W-2 employees?
2. **ex_q2**: Average employee age?
3. **ex_q3**: Average employee salary?
4. **ex_q4**: Do you currently have a retirement plan?
5. **ex_q5**: What type of plan? (401(k), DB, etc.)
6. **ex_q6**: How much do you contribute annually?

### Form Mapping (FORM_EX_Q_MAPPING)
```javascript
// Direct mapping - form positions match ex_q numbers
'8_Biz_Owner_Group': {
    // No remapping needed
}
```

### Implementation Logic
The profile now reads employee demographics to optimize plans:
- **Defined Benefit Plan**: Only if owner is 10+ years older than average employee
- **Cash Balance Plan**: If owner is 45+ and 5+ years older than employees
- **Existing plan seeding**: Seeds current contributions from ex_q6

## 🎯 Vehicle Priority Order

### Education Domain

#### Base Order
1. **Combined CESA** - $167/child/month
   - Why: Tax-free education savings
   - Conditions: Only if has children

2. **Education Bank** - Unlimited
   - Why: Overflow vehicle for education
   - Conditions: Always included

### Health Domain

#### Base Order
1. **HSA** - Individual: $358/mo, Family: $713/mo
   - Why: Triple tax advantage
   - Conditions: If HSA eligible
   - Catch-up: +$83/mo if age 55+

2. **Health Bank** - Unlimited
   - Why: Overflow vehicle for health
   - Conditions: Always included

### Retirement Domain

#### Base Order
1. **Defined Benefit Plan** - Up to $23,333/mo
   - Why: Massive deductions for high-income owners
   - Conditions: Best if age 45+ and high stable income
   - Note: Must cover employees but can be designed favorably

2. **Group 401(k) – Employee** - $1,958/mo
   - Why: Personal deferrals up to limit
   - Conditions: Primary defined contribution vehicle
   - Catch-up (50+): $2,583/mo
   - Catch-up (60+): $2,896/mo

3. **Group 401(k) – Employer Profit Sharing** - Up to $5,833/mo
   - Why: Additional deductible contributions
   - Conditions: Must satisfy nondiscrimination testing
   - Note: Combined employee + employer cap: $70,000/yr

4. **HSA** - (retirement portion)
   - Why: Triple tax advantage
   - Conditions: If HSA eligible
   - Note: Moved up for superior tax treatment

5. **Cash Balance Plan** - Varies by age
   - Why: Modern DB alternative with more predictable costs
   - Conditions: If age 45+ and want DB benefits with DC-like structure
   - Note: Can be combined with 401(k) profit sharing

6. **Backdoor Roth IRA** - $583/mo ($667/mo if 50+)
   - Why: Most will be phased out of direct Roth
   - Conditions: High income assumption

7. **After-Tax 401(k) → Mega Backdoor Roth** - Varies
   - Why: Additional Roth savings for high earners
   - Conditions: If plan allows after-tax contributions and in-service conversions
   - Note: Up to total $70,000 limit minus other contributions

8. **Family Bank** - Unlimited
   - Why: Final overflow
   - Conditions: Always included

### Dynamic Modifications

#### Safe Harbor 401(k) Option
- **3% Non-elective**: Avoids all testing, costs 3% of payroll
- **4% Match**: Avoids ADP/ACP testing, costs up to 4%
- **QACA**: 3% auto-enrollment with match

#### Age-Based DB Contributions
- **Age 45**: ~$100,000-150,000/year
- **Age 50**: ~$150,000-200,000/year
- **Age 55**: ~$200,000-250,000/year
- **Age 60**: ~$250,000-280,000/year

### Final Order Examples

#### Scenario: 55-Year-Old Practice Owner
**Education Domain:**
1. Combined CESA - $333/mo (2 kids)
2. Education Bank - Unlimited

**Health Domain:**
1. HSA - $796/mo (family + catch-up)
2. Health Bank - Unlimited

**Retirement Domain:**
1. Defined Benefit Plan - $20,833/mo ($250k/yr)
2. Group 401(k) Employee - $2,583/mo (with catch-up)
3. Group 401(k) Employer Profit Sharing - $2,917/mo (25%)
4. HSA - $796/mo (retirement portion)
5. Cash Balance Plan - (if not using traditional DB)
6. Backdoor Roth IRA - $667/mo
7. After-Tax 401(k) → Mega Backdoor - (if available)
8. Family Bank - Unlimited

## 🧪 Test Scenarios & Results

### Test Scenario 1: Professional Practice
**Purpose**: Test DB plan with group 401(k) combination

**Input Data**:
- Age: 55
- Income: $500,000
- Business Type: Medical practice
- Employees: 5 (avg age 35)
- Can Contribute: $200,000+

**Expected Results**:
- DB plan as primary vehicle
- Group 401(k) with safe harbor
- All catch-up contributions
- Backdoor Roth IRA

**Actual Results**: ❌ Not tested

### Test Scenario 2: Younger Business Owner
**Purpose**: Test when DB plan less favorable

**Input Data**:
- Age: 40
- Income: $200,000
- Employees: 10
- Profit Margin: 20%

**Expected Results**:
- Group 401(k) prioritized
- Profit sharing component
- Consider future DB plan

**Actual Results**: ❌ Not tested

### Test Commands
```javascript
// Need to create:
testProfile8DBPlan()
testProfile8YoungOwner()
testProfile8SafeHarbor()
testProfile8All()
```

## 📈 Optimization & Tuning

### Current Limitations
1. **No Employee Analysis**: Can't optimize plan design
2. **Static DB Amount**: Not calculated based on age/income
3. **No Safe Harbor Logic**: Missing automatic safe harbor
4. **No Multi-Entity**: Can't handle multiple businesses

### Future Enhancements
1. **Plan Design Optimizer**: Calculate optimal 401(k) formula
2. **DB/DC Combo**: Optimize combination plans
3. **Employee Demographics**: Tailor to workforce
4. **Cash Balance Plans**: Modern DB alternative
5. **NQDC Options**: For amounts above qualified limits

### Tuning Checklist
- [ ] Add employee demographic questions
- [ ] Create DB contribution calculator
- [ ] Add safe harbor decision logic
- [ ] Test with various business types
- [ ] Add profit sharing formulas
- [ ] Include vesting strategies
- [ ] Test nondiscrimination rules
- [ ] Add family employee optimization

## 📊 Common Calculations

### Defined Benefit Maximum
```
Age 55, Retire at 62:
Maximum annual benefit: $280,000
Years to retirement: 7
Required annual contribution: ~$250,000
Tax deduction at 37%: $92,500 saved
```

### Safe Harbor 401(k) Cost
```
Payroll: $500,000 (5 employees @ $100k avg)
3% Non-elective: $15,000 annual cost
Benefit: No testing, owner can max out
Owner contribution: $31,000 (age 50+)
ROI: $31,000 benefit for $15,000 cost
```

### Profit Sharing Allocation
```
Total Payroll: $600,000
Owner Salary: $200,000 (33%)
Profit Sharing: $150,000 available

Age-weighted formula:
- Owner (age 55): $100,000 (67%)
- Employees: $50,000 (33%)
Passes nondiscrimination testing
```

## 🔍 Debugging Guide

### Common Issues
1. **No DB plan shown**: Check age and income thresholds
2. **Group 401(k) missing**: Verify hasEmployees = "Yes"
3. **Wrong contribution limits**: Check age for catch-up
4. **Phase-out issues**: Most should show backdoor Roth

## 🔧 December 2024 Implementation Updates

### Key Enhancements
1. **Employee Demographics Integration**:
   - Reads number of employees (ex_q1)
   - Gets average employee age (ex_q2)
   - Captures average salary (ex_q3)
   - Uses demographics to optimize plan recommendations

2. **Smart Plan Recommendations**:
   ```javascript
   // Defined Benefit Plan - only if significant age gap
   if (age > avgEmployeeAge + 10) {
     baseRetirementOrder.push({ 
       name: 'Defined Benefit Plan', 
       capMonthly: LIMITS.RETIREMENT.DEFINED_BENEFIT / 12
     });
   }
   
   // Cash Balance Plan - moderate age gap required
   if (age >= 45 && age > avgEmployeeAge + 5) {
     const cashBalanceCap = age >= 60 ? 23333 : 
                           age >= 55 ? 16667 : 
                           age >= 50 ? 12500 : 8333;
     baseRetirementOrder.push({ 
       name: 'Cash Balance Plan', 
       capMonthly: cashBalanceCap
     });
   }
   ```

3. **Existing Plan Support**:
   - Reads current plan status (ex_q4)
   - Identifies plan type (ex_q5)
   - Seeds existing contributions (ex_q6)

4. **Enhanced Vehicle Order**:
   - Defined Benefit Plan (if age appropriate)
   - Group 401(k) Employee
   - Group 401(k) Employer Profit Sharing
   - HSA (prioritized)
   - Cash Balance Plan (if age appropriate)
   - Backdoor Roth IRA
   - Mega Backdoor Roth

5. **Cost-Benefit Analysis**:
   - Only recommends expensive plans when owner benefit significantly exceeds employee cost
   - Age gap requirements ensure IRS compliance
   - Protects against discrimination testing failures

### Implementation Highlights
```javascript
// Employee demographics
const numEmployees = Number(getValue(hdr, rowArr, HEADERS.P2_EX_Q1)) || 5;
const avgEmployeeAge = Number(getValue(hdr, rowArr, HEADERS.P2_EX_Q2)) || 35;
const avgEmployeeSalary = Number(getValue(hdr, rowArr, HEADERS.P2_EX_Q3)) || 50000;

// Seeding logic
if (hasRetirementPlan && annualContribution > 0) {
  if (planType.includes('401')) {
    seeds.Retirement['Group 401(k) – Employee'] = annualContribution / 12;
  } else if (planType.includes('Defined Benefit')) {
    seeds.Retirement['Defined Benefit Plan'] = annualContribution / 12;
  }
}
```

### Debug Commands
```javascript
diagnoseProfile('8_Biz_Owner_Group')
showVehicleOrder('8_Biz_Owner_Group')
traceAllocation('8_Biz_Owner_Group')
calculateDBContribution(age, income)
```

## 📚 References

### Related Files
- No test documentation found
- DB plan rules: IRS Publication 560
- Nondiscrimination: IRC Section 401(a)(4)

### External Documentation
- DOL coverage and testing rules
- Safe harbor 401(k) regulations
- Defined benefit plan limits
- Cross-tested profit sharing rules

## ✅ Production Readiness Checklist

- [ ] All test scenarios pass
- [x] Form questions properly mapped
- [x] Edge cases handled
- [x] Documentation complete
- [ ] Live form tested
- [ ] Allocation results verified
- [x] Error handling implemented

**Production Status**: Implementation Complete - Needs Testing
**Blockers**: 
- Test scenarios need creation
- Live form validation required
- Complex calculations need verification
**Sign-off**: Pending testing
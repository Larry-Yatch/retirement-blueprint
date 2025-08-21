# Profile 3: Solo 401k Builder

## 🎯 Profile Identity

### Target User
Self-employed individuals or business owners without employees who want to maximize retirement contributions through a Solo 401(k) plan, leveraging both employee and employer contribution capabilities.

### Core Challenge
Optimizing the complex employee/employer contribution split while managing different business entity types (Sole Proprietor, LLC, S-Corp, C-Corp) and their varying contribution calculation methods.

### Key Differentiator
Has the ability to contribute as both employee AND employer, potentially allowing up to $70,000+ annual contributions. Unlike Profile 1 (ROBS), these are traditional business owners not using retirement funds to operate the business.

## 📊 Classification Logic

### Priority Order
4 (After ROBS profiles and Biz Owner Group)

### Classification Criteria
```javascript
// From classifyClientProfileFromWorkingSheet()
if (workSituation === 'Self-employed' && !hasEmployees && !isUsingROBS) {
    return '3_Solo401k_Builder';
}
```

### Common Scenarios
- **Consultant/Freelancer**: High-income independent contractor
- **Small Business Owner**: LLC or S-Corp without employees
- **Side Business**: Maximizing retirement through profitable side venture
- **Professional Practice**: Doctor, lawyer, accountant working solo

## 🚀 Implementation Status

### Current State
- ✅ Profile Helper Function
- ✅ Universal Functions Integration
- ❌ Form Questions Added
- ❌ Form Mapping Configured
- ❌ Test Scenarios Written
- ❌ Live Form Testing
- ❌ Production Ready

### Status Summary
**Status**: Not Started - Infrastructure complete but needs seeding logic review
**Last Updated**: Profile exists with seeding concerns
**Next Steps**: Review and fix seeding calculations, add entity type handling

## 💻 Technical Implementation

### Profile Helper Location
`Code.js` lines ~1160-1240 (approximately)

### Key Features Implemented
- ✅ Solo 401(k) employee and employer vehicles
- ✅ Catch-up contributions (50+)
- ✅ Income phase-out handling
- ✅ Tax preference ordering
- ⚠️ Seeding logic (needs review)
- ❌ Entity type optimization

### Universal Functions Used
```javascript
✅ calculateHsaMonthlyCapacity()
✅ calculateCesaMonthlyCapacity()
❌ addEmployer401kVehicles() // Not applicable - Solo 401k
✅ applyRothIRAPhaseOut()
✅ prioritizeTraditionalAccounts() / prioritizeRothAccounts()
```

## 📝 Form Configuration

### Phase 2 Extra Questions
1. **ex_q1**: What kind of business do you have? (Sole Prop, LLC, S-Corp, etc.)
2. **ex_q2**: Do you have any employees? (besides yourself/spouse)
3. **ex_q3**: Have you already set up a Solo 401(k)?
4. **ex_q4**: How much can you contribute as an employee? (salary deferrals)
5. **ex_q5**: How much can your business contribute as employer? (profit sharing)
6. **ex_q6**: What's the total you plan to put into this plan annually?

### Form Mapping (FORM_EX_Q_MAPPING)
```javascript
// Not yet configured - needs implementation
'3_Solo401k_Builder': {
    // Mapping to be determined after form questions structured
}
```

### ⚠️ Known Issues
- Questions 4-6 ask for overlapping information
- Need entity type for accurate calculations
- Seeding logic concerns in documentation

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
1. **Solo 401(k) – Employee** - $1,958/mo
   - Why: Salary deferrals up to annual limit
   - Conditions: Primary retirement vehicle
   - Catch-up (50+): $2,583/mo
   - Catch-up (60+): $2,896/mo

2. **Solo 401(k) – Employer** - Varies (up to 25% of compensation)
   - Why: Profit sharing contribution
   - Conditions: Based on business profit
   - Note: Combined employee + employer cap: $70,000 ($77,500 if 50+)

3. **HSA** - (retirement portion)
   - Why: Triple tax advantage
   - Conditions: If HSA eligible

4. **SEP IRA** - 25% of compensation
   - Why: Alternative if no Solo 401(k)
   - Conditions: Backup option

5. **Traditional IRA** - $583/mo ($667/mo if 50+)
   - Why: Additional tax-deferred savings
   - Conditions: Always available

6. **Roth IRA** - $583/mo ($667/mo if 50+)
   - Why: Tax-free growth
   - Conditions: Subject to income phase-out

7. **Family Bank** - Unlimited
   - Why: Final overflow
   - Conditions: Always included

### Dynamic Modifications

#### Entity Type Impact
- **Sole Prop/LLC**: 20% of net self-employment income
- **S-Corp**: 25% of W-2 wages (more tax efficient)
- **C-Corp**: 25% of wages (like S-Corp)

#### Tax Preference Impact
- **"Now"**: Traditional vehicles prioritized
- **"Later"**: Roth vehicles prioritized
- **"Both"**: Balanced approach

### Final Order Examples

#### Scenario: S-Corp Owner, $150k Profit
**Education Domain:**
1. Education Bank - Unlimited (no kids)

**Health Domain:**
1. HSA - $358/mo (individual)
2. Health Bank - Unlimited

**Retirement Domain:**
1. Solo 401(k) Employee - $1,958/mo
2. Solo 401(k) Employer - $2,500/mo (25% of reasonable salary)
3. HSA - $358/mo (retirement portion)
4. Roth IRA - $583/mo
5. Traditional IRA - $583/mo
6. Family Bank - Unlimited

## 🧪 Test Scenarios & Results

### Test Scenario 1: Sole Proprietor Basic
**Purpose**: Test basic Solo 401(k) with simple business structure

**Input Data**:
- Age: 40
- Business Income: $100,000
- Entity Type: Sole Proprietor
- Tax Preference: Both

**Expected Results**:
- Employee: $1,958/mo
- Employer: ~$1,667/mo (20% of net)
- Total Solo 401(k): ~$3,625/mo

**Actual Results**: ❌ Not tested

### Test Scenario 2: S-Corp with Catch-up
**Purpose**: Test S-Corp optimization with age 50+ catch-up

**Input Data**:
- Age: 55
- Business Profit: $200,000
- Reasonable Salary: $100,000
- Entity Type: S-Corp

**Expected Results**:
- Employee: $2,583/mo (with catch-up)
- Employer: $2,083/mo (25% of salary)
- HSA with catch-up: $441/mo

**Actual Results**: ❌ Not tested

### Test Commands
```javascript
// Need to create:
testProfile3SoleProp()
testProfile3SCorp()
testProfile3Seeding()
testProfile3All()
```

## 📈 Optimization & Tuning

### Current Limitations
1. **Entity Type Calculations**: Not differentiated by business structure
2. **Seeding Logic**: Documentation warns about incorrect implementation
3. **Reasonable Salary**: No S-Corp salary optimization
4. **State Taxes**: Not considered in calculations

### Future Enhancements
1. **Entity Calculator**: Optimize based on business type
2. **Salary Optimizer**: For S-Corp reasonable compensation
3. **Multi-State**: Consider state tax implications
4. **Spouse Employee**: Add spouse as employee option
5. **Defined Benefit**: Add DB plan for high-income scenarios

### Tuning Checklist
- [ ] Fix seeding logic issues
- [ ] Add entity type calculations
- [ ] Structure form questions better
- [ ] Test employee/employer splits
- [ ] Verify contribution limits
- [ ] Add reasonable salary logic
- [ ] Test with various income levels
- [ ] Document entity differences

## 📊 Common Calculations

### Solo 401(k) by Entity Type

#### Sole Proprietor
```
Net Income: $100,000
Self-Employment Tax: ~$14,130
Adjusted Income: ~$92,935
Employee Contribution: $23,500 (max)
Employer Contribution: 20% × $92,935 = $18,587
Total: $42,087/year = $3,507/mo
```

#### S-Corporation
```
Total Profit: $200,000
Reasonable Salary: $100,000
Employee Contribution: $23,500
Employer Contribution: 25% × $100,000 = $25,000
Total: $48,500/year = $4,042/mo
Payroll Tax Savings: ~$15,000
```

#### With Catch-up (Age 50+)
```
Add $7,500 to employee contribution
New employee max: $31,000
Total with employer: Up to $77,500/year
```

## 🔍 Debugging Guide

### Common Issues
1. **Wrong employer calculation**: Check entity type
2. **Seeding confusion**: Review ex_q4/5/6 usage
3. **Missing catch-up**: Verify age >= 50
4. **Phase-out issues**: Check income levels

### Debug Commands
```javascript
diagnoseProfile('3_Solo401k_Builder')
showVehicleOrder('3_Solo401k_Builder')
traceAllocation('3_Solo401k_Builder')
```

## 📚 References

### Related Files
- Seeding concerns: Profile documentation mentions issues
- Entity types: IRS Publication 560
- Solo 401(k) rules: IRC Section 401(k)

### External Documentation
- IRS Solo 401(k) contribution limits
- Reasonable compensation for S-Corps
- State tax optimization strategies

## ✅ Production Readiness Checklist

- [ ] All test scenarios pass
- [ ] Form questions properly mapped
- [ ] Edge cases handled
- [ ] Documentation complete
- [ ] Live form tested
- [ ] Allocation results verified
- [ ] Error handling implemented

**Production Status**: Not Ready - Needs Seeding Fix
**Blockers**: 
- Seeding logic needs review and correction
- Entity type calculations not implemented
- Form questions need restructuring
**Sign-off**: Pending implementation
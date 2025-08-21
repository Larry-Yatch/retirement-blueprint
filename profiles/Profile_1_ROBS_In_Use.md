# Profile 1: ROBS In Use

## 🎯 Profile Identity

### Target User
Business owners who have already implemented a ROBS (Rollover as Business Startup) structure with an active C-corporation and are using their retirement funds to operate their business.

### Core Challenge
Maximizing retirement contributions through their C-corp's 401(k) plan while maintaining ROBS compliance and leveraging unlimited profit distributions as retirement contributions.

### Key Differentiator
Unlike all other profiles, Profile 1 users have unlimited contribution potential through C-corp profit distributions into their ROBS Solo 401(k), making this the highest contribution capacity profile.

## 📊 Classification Logic

### Priority Order
1 (First in classification hierarchy - highest priority)

### Classification Criteria
```javascript
// From classifyClientProfileFromWorkingSheet()
if (isUsingROBS === 'Yes') {
    return '1_ROBS_In_Use';
}
```

### Common Scenarios
- **Franchise Owner**: Used ROBS to buy franchise, now operating
- **Business Purchaser**: Acquired existing business with ROBS funds
- **Startup Founder**: Launched new business with retirement rollover
- **Growth Phase**: Profitable C-corp ready to maximize contributions

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
**Status**: Not Started - Infrastructure complete but not tuned
**Last Updated**: Profile exists but needs tuning
**Next Steps**: Review allocation logic for ROBS vehicles and profit distribution handling

## 💻 Technical Implementation

### Profile Helper Location
`Code.js` lines 963-1046

### Key Features Implemented
- ✅ ROBS Solo 401(k) vehicle included
- ✅ Catch-up contributions (50+)
- ✅ Income phase-out handling
- ✅ Tax preference ordering
- ❌ Profit distribution optimization
- ❌ C-corp compliance validation

### Universal Functions Used
```javascript
✅ calculateHsaMonthlyCapacity()
✅ calculateCesaMonthlyCapacity()
❌ addEmployer401kVehicles() // Not applicable - has ROBS
✅ applyRothIRAPhaseOut()
✅ prioritizeTraditionalAccounts() / prioritizeRothAccounts()
```

## 📝 Form Configuration

### Phase 2 Extra Questions
1. **ex_q1**: Describe how your ROBS strategy is currently structured
2. **ex_q2**: How are your business profits routed into your Solo 401(k)?
3. **ex_q3**: Which type of contributions are you making? (Roth/Traditional/Both)
4. **ex_q4**: How often do you contribute? (Monthly/Quarterly)
5. **ex_q5**: Do you also contribute to a Roth IRA? Amount?
6. **ex_q6**: Expected annual business distribution to Solo 401(k)?

### Form Mapping (FORM_EX_Q_MAPPING)
```javascript
// Not yet configured - needs implementation
'1_ROBS_In_Use': {
    // Mapping to be determined after form questions updated
}
```

### ⚠️ Known Issues
- Current questions are open-ended, need structured inputs
- Missing profit distribution amount question
- No compliance validation questions

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
1. **ROBS Solo 401(k) – Profit Distribution** - UNLIMITED
   - Why: C-corp profit distributions have no statutory limit
   - Conditions: Primary retirement vehicle
   - Note: Highest priority for maximizing retirement savings

2. **ROBS Solo 401(k) – Roth** - $1,958/mo
   - Why: Tax-free growth option
   - Conditions: If tax preference includes Roth
   - Catch-up (50+): $2,583/mo
   - Catch-up (60+): $2,896/mo

3. **HSA** - (retirement portion)
   - Why: Triple tax advantage - deduction, growth, and withdrawal
   - Conditions: If HSA eligible
   - Note: Moved up due to superior tax treatment

4. **ROBS Solo 401(k) – Traditional** - $1,958/mo
   - Why: Current tax deduction
   - Conditions: If tax preference includes Traditional
   - Catch-up (50+): $2,583/mo
   - Catch-up (60+): $2,896/mo

5. **Roth IRA** - $583/mo ($667/mo if 50+)
   - Why: Additional tax-free growth outside ROBS
   - Conditions: Subject to income phase-out

6. **Family Bank** - Unlimited
   - Why: Final overflow
   - Conditions: Always included

### Dynamic Modifications

#### Tax Preference Impact
- **"Now"**: Traditional 401(k) prioritized over Roth 401(k)
- **"Later"**: Roth 401(k) prioritized over Traditional 401(k)
- **"Both"**: Maintains balanced order shown above

#### If High Income
- Roth IRA converts to Backdoor Roth IRA
- No impact on ROBS Solo 401(k) vehicles

### Final Order Examples

#### Scenario: Profitable C-corp, Tax Preference "Later"
**Education Domain:**
1. Combined CESA - $333/mo (2 kids)
2. Education Bank - Unlimited

**Health Domain:**
1. HSA - $713/mo (family)
2. Health Bank - Unlimited

**Retirement Domain:**
1. ROBS Solo 401(k) Profit - UNLIMITED
2. ROBS Solo 401(k) Roth - $1,958/mo
3. HSA - $713/mo (retirement portion)
4. ROBS Solo 401(k) Traditional - $1,958/mo
5. Roth IRA - $583/mo
6. Family Bank - Unlimited

## 🧪 Test Scenarios & Results

### Test Scenario 1: Basic ROBS Operation
**Purpose**: Verify ROBS vehicle prioritization

**Input Data**:
- Age: 45
- Income: $100,000 (C-corp salary)
- Work Situation: Self-employed (C-corp)
- ROBS Status: Active
- Profit Available: $50,000
- Tax Preference: Both

**Expected Results**:
- ROBS Solo 401(k) Profit as primary vehicle
- Both Roth and Traditional 401(k) options
- Roth IRA included

**Actual Results**: ❌ Not tested

### Test Scenario 2: High Profit with Catch-up
**Purpose**: Test unlimited contribution with age 50+ catch-up

**Input Data**:
- Age: 52
- Income: $150,000
- C-corp Profit: $200,000
- Tax Preference: Later (Roth focus)

**Expected Results**:
- ROBS Solo 401(k) Profit accepts full $200k
- Roth 401(k) with catch-up: $2,583/mo
- Backdoor Roth IRA (high income)

**Actual Results**: ❌ Not tested

### Test Commands
```javascript
// Need to create:
testProfile1Basic()
testProfile1HighProfit()
testProfile1TaxPreferences()
testProfile1All()
```

## 📈 Optimization & Tuning

### Current Limitations
1. **No Profit Input**: Can't specify available profit distributions
2. **Open-ended Questions**: Current form questions too vague
3. **Reasonable Compensation**: No C-corp salary optimization
4. **Spouse Coordination**: No questions about spouse in business

### Future Enhancements
1. **Profit Distribution Calculator**: Optimize employee vs profit sharing split
2. **Compliance Dashboard**: ROBS rule compliance checks
3. **Multi-Entity Support**: Handle multiple businesses
4. **Exit Planning**: Strategy for ROBS termination
5. **Spouse Optimization**: Double capacity with spouse participation

### Tuning Checklist
- [ ] Convert open-ended questions to structured inputs
- [ ] Add profit distribution amount field
- [ ] Implement profit vehicle with proper capacity
- [ ] Test unlimited contribution handling
- [ ] Add reasonable compensation validation
- [ ] Test tax preference ordering
- [ ] Verify catch-up calculations
- [ ] Document C-corp requirements

## 📊 Common Calculations

### ROBS Solo 401(k) Structure
```
Employee Deferral: $23,500/year ($1,958/mo)
With Catch-up (50+): $31,000/year ($2,583/mo)
With Catch-up (60+): $34,750/year ($2,896/mo)

Profit Sharing Component: 
- Up to 25% of W-2 compensation
- Plus unlimited C-corp profit distributions
- Total: No statutory limit on profit distributions
```

### Reasonable Compensation Example
```
C-Corp Revenue: $500,000
Reasonable Salary: $100,000
Payroll Taxes: ~$15,300
Net for Profit Distribution: $384,700
All can go to ROBS Solo 401(k)
```

### Monthly Breakdown Example
```
Salary: $100,000/year = $8,333/mo
Employee Deferral: $1,958/mo
Profit Distribution: $32,058/mo (using above example)
Total to ROBS: $34,016/mo
```

## 🔍 Debugging Guide

### Common Issues
1. **ROBS vehicles missing**: Check isUsingROBS = 'Yes'
2. **No profit vehicle**: Current implementation missing
3. **Limited contributions**: Need profit distribution input
4. **Wrong tax order**: Verify Tax_Minimization preference

### Debug Commands
```javascript
diagnoseProfile('1_ROBS_In_Use')
showVehicleOrder('1_ROBS_In_Use')
traceAllocation('1_ROBS_In_Use')
```

## 📚 References

### Related Files
- Original profile doc exists but minimal
- ROBS compliance: IRS Revenue Ruling 2008-40
- C-corp requirements: IRC Section 401(k)

### External Documentation
- DOL ROBS compliance guidelines
- IRS reasonable compensation rules
- C-corporation tax optimization strategies

## ✅ Production Readiness Checklist

- [ ] All test scenarios pass
- [ ] Form questions properly mapped
- [ ] Edge cases handled
- [ ] Documentation complete
- [ ] Live form tested
- [ ] Allocation results verified
- [ ] Error handling implemented

**Production Status**: Not Ready - Needs Complete Tuning
**Blockers**: 
- Need structured form questions
- Missing profit distribution vehicle implementation
- No test coverage
**Sign-off**: Pending implementation
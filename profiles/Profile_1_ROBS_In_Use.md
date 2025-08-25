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
- ✅ Form Questions Added
- ✅ Form Mapping Configured
- ✅ Profit Distribution Logic Implemented
- ❌ Test Scenarios Written
- ❌ Live Form Testing
- ❌ Production Ready

### Status Summary
**Status**: Implementation Complete - Needs Testing
**Last Updated**: December 2024 - Full implementation with profit distribution
**Next Steps**: Create test scenarios and validate with live forms

## 💻 Technical Implementation

### Profile Helper Location
`Code.js` lines 963-1078

### Key Features Implemented
- ✅ ROBS Solo 401(k) vehicle included
- ✅ Catch-up contributions (50+)
- ✅ Income phase-out handling
- ✅ Tax preference ordering
- ✅ Profit distribution optimization
- ✅ Dynamic contribution type filtering (Roth/Traditional/Both)
- ✅ HSA prioritization (moved up to position 3)
- ✅ Profit distribution seeding from ex_q6

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
// Form questions map directly to ex_q fields, no remapping needed
'1_ROBS_In_Use': {
    // Direct mapping - form positions match ex_q numbers
}
```

### Implementation Logic
The profile now reads all ROBS-specific information:
- **ex_q1**: ROBS structure description (informational)
- **ex_q2**: Profit routing method (informational)
- **ex_q3**: Contribution type preference (Roth/Traditional/Both)
- **ex_q4**: Contribution frequency (informational)
- **ex_q5**: Roth IRA participation (Yes/No)
- **ex_q6**: Annual profit distribution amount (key input for seeding)

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

## 🔧 December 2024 Implementation Updates

### Key Changes Made
1. **Profit Distribution Logic**: 
   - Reads annual profit distribution from ex_q6
   - Seeds the amount into 'ROBS Solo 401(k) – Profit Distribution'
   - Maintains infinite capacity for this vehicle

2. **Contribution Type Filtering**:
   - Reads preference from ex_q3 (Roth only/Traditional only/Both)
   - Dynamically filters vehicles based on preference
   - Preserves profit distribution regardless of preference

3. **Roth IRA Handling**:
   - Reads participation status from ex_q5
   - Removes Roth IRA from order if user indicates no participation
   - Still applies phase-out rules when included

4. **HSA Prioritization**:
   - Moved HSA to position 3 (after profit distribution and employee contributions)
   - Recognizes HSA's superior tax treatment for retirement savings

5. **Enhanced Vehicle Capacity Calculations**:
   - Proper catch-up contributions for 401(k) based on age
   - Age 50-59: +$7,500/year
   - Age 60+: +$11,250/year
   - IRA catch-up: +$1,000/year for 50+

### Implementation Highlights
```javascript
// Profit distribution seeding
if (annualProfitDistribution > 0) {
  seeds.Retirement['ROBS Solo 401(k) – Profit Distribution'] = annualProfitDistribution / 12;
}

// Contribution type filtering
if (contributionType === 'Roth only') {
  baseRetirementOrder = baseRetirementOrder.filter(v => 
    !v.name.includes('Traditional') || v.name.includes('Profit Distribution')
  );
}

// HSA repositioning
const hsaIndex = baseRetirementOrder.findIndex(v => v.name === 'HSA');
if (hsaIndex > 3) {
  const hsaVehicle = baseRetirementOrder.splice(hsaIndex, 1)[0];
  baseRetirementOrder.splice(3, 0, hsaVehicle);
}
```

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
- [x] Form questions properly mapped
- [x] Edge cases handled
- [x] Documentation complete
- [ ] Live form tested
- [ ] Allocation results verified
- [x] Error handling implemented

**Production Status**: Implementation Complete - Needs Testing
**Blockers**: 
- Need test scenario creation
- Live form validation required
- Report field verification needed
**Sign-off**: Pending testing
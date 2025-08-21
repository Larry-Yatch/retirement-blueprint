# Profile 7: Foundation Builder

## 🎯 Profile Identity

### Target User
Standard investors building their retirement foundation without specific circumstances that trigger other profiles. This is the default profile for most W-2 employees with employer benefits who are establishing good savings habits.

### Core Challenge
Creating a balanced retirement strategy that maximizes employer benefits, takes advantage of tax-advantaged accounts, and builds a solid foundation for long-term wealth accumulation.

### Key Differentiator
This is the ONLY profile that dynamically integrates employer 401(k) benefits into the vehicle order, making it the most flexible profile for standard employees with varying benefit packages.

## 📊 Classification Logic

### Priority Order
8 (Default profile - lowest priority, catches all users not matching other profiles)

### Classification Criteria
```javascript
// From classifyClientProfileFromWorkingSheet()
// Default profile - assigned when no other profile conditions are met
if (no other profile conditions met) {
    return '7_Foundation_Builder';
}
```

### Common Scenarios
- **Young Professional**: First job with 401(k), building habits
- **Mid-Career Employee**: Steady income, employer benefits, family goals
- **Career Changer**: New job, evaluating benefit options
- **Dual Income Household**: Coordinating two employer plans

## 🚀 Implementation Status

### Current State
- ✅ Profile Helper Function
- ✅ Universal Functions Integration
- ✅ Form Questions Added
- ✅ Form Mapping Configured
- ✅ Test Scenarios Written
- ✅ Live Form Testing
- ✅ Production Ready

### Status Summary
**Status**: Complete - Fully Implemented and Tested
**Last Updated**: August 2024
**Next Steps**: Monitor performance and gather user feedback

## 💻 Technical Implementation

### Profile Helper Location
`Code.js` lines 1363-1443

### Key Features Implemented
- ✅ Dynamic employer 401(k) integration (UNIQUE)
- ✅ Roth-first default ordering for younger savers
- ✅ Full catch-up contribution support
- ✅ Income phase-out handling
- ✅ Tax preference reordering
- ✅ Comprehensive employer match calculations

### Universal Functions Used
```javascript
✅ calculateHsaMonthlyCapacity()
✅ calculateCesaMonthlyCapacity()
✅ addEmployer401kVehicles() // UNIQUE to this profile
✅ applyRothIRAPhaseOut()
✅ prioritizeTraditionalAccounts() / prioritizeRothAccounts()
```

## 📝 Form Configuration

### Phase 2 Extra Questions
1. **ex_q1**: Does your employer offer a 401(k) retirement plan? → Employer plan availability
2. **ex_q2**: Does your employer match your 401(k) contributions? → Match availability
3. **ex_q3**: What percentage does your employer match? → Match calculation
4. **ex_q4**: Does your employer 401(k) plan have a Roth option? → Roth 401(k) availability

### Form Mapping (FORM_EX_Q_MAPPING)
```javascript
'7_Foundation_Builder': {
    48: 'ex_q1',  // employer 401k
    49: 'ex_q2',  // employer match
    50: 'ex_q3',  // match percentage
    51: 'ex_q4'   // roth 401k option
}
```

### ⚠️ Known Issues
- None currently identified
- Form mapping tested and working

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

#### Base Order (Before Employer 401k Addition)
1. **Roth IRA** - $583/mo ($667/mo if 50+)
   - Why: Tax-free growth, default for younger savers
   - Conditions: If income < phase-out

2. **Traditional IRA** - $583/mo ($667/mo if 50+)
   - Why: Tax deduction option
   - Conditions: Always available

3. **Backdoor Roth IRA** - $583/mo ($667/mo if 50+)
   - Why: High earner Roth access
   - Conditions: If income > phase-out

4. **HSA** - (retirement portion)
   - Why: Triple tax advantage
   - Conditions: If HSA eligible

5. **Family Bank** - Unlimited
   - Why: Final overflow
   - Conditions: Always included

### Dynamic Modifications

#### Employer 401(k) Integration
When employer offers 401(k):
1. **401(k) Match** - Inserted FIRST (free money)
2. **401(k) Employee** - Inserted after match
3. Order becomes: Match → HSA → 401(k) → IRAs → Family Bank

#### Match Calculation Examples
- **"50% up to 6%"**: On $75k salary = $375/mo to get $187.50 match
- **"100% up to 3%"**: On $75k salary = $187.50/mo to get full match
- **"Dollar for dollar up to $2,000"**: $167/mo to get full $2,000/yr

### Final Order Examples

#### Scenario: Young Professional with 401(k) Match
**Education Domain:**
1. Education Bank - Unlimited (no kids yet)

**Health Domain:**
1. HSA - $358/mo (individual)
2. Health Bank - Unlimited

**Retirement Domain:**
1. 401(k) Match - $375/mo (to get 50% match on 6%)
2. HSA - $358/mo (retirement portion)
3. 401(k) Roth - $1,958/mo
4. Roth IRA - $583/mo
5. Traditional IRA - $583/mo
6. Family Bank - Unlimited

## 🧪 Test Scenarios & Results

### Test Scenario 1: Basic Employee with Match
**Purpose**: Verify employer 401(k) integration

**Input Data**:
- Age: 30
- Income: $75,000
- Filing: Single
- Has 401(k): Yes
- Match: 50% up to 6%
- Has Roth 401(k): Yes

**Expected Results**:
- 401(k) match prioritized first
- Roth vehicles prioritized (young age)
- Standard contribution limits

**Actual Results**: ✅ Passed

### Test Scenario 2: High Income with Phase-Out
**Purpose**: Test Roth IRA phase-out handling

**Input Data**:
- Age: 40
- Income: $180,000
- Filing: Single
- Children: 2
- HSA Eligible: Yes (family)

**Expected Results**:
- Backdoor Roth IRA (phased out)
- CESA for children
- HSA family limit

**Actual Results**: ✅ Passed

### Test Commands
```javascript
testProfile7BasicEmployee()
testProfile7HighIncome()
testProfile7NoEmployerPlan()
testProfile7All()
```

## 📈 Optimization & Tuning

### Current Limitations
1. **401(k) Beyond Match**: Only adds match, not full contribution
2. **Auto-Escalation**: No progressive increase recommendations
3. **Emergency Fund**: No validation of emergency savings
4. **Debt Consideration**: No debt payoff prioritization

### Future Enhancements
1. **Full 401(k) Integration**: Add employee contributions beyond match
2. **Smart Escalation**: Annual increase recommendations
3. **Holistic Planning**: Include emergency fund and debt
4. **Spouse Coordination**: Optimize dual-income strategies
5. **Target-Date Guidance**: Investment selection help

### Tuning Checklist
- ✅ Review current vehicle order
- ✅ Verify all universal functions used
- ✅ Check form question mapping
- ✅ Test with edge cases
- ✅ Validate catch-up logic
- ✅ Confirm phase-out handling
- ✅ Test employer benefits integration
- ✅ Verify tax preference ordering

## 📊 Common Calculations

### Employer Match Optimization
```
Salary: $75,000
Match: 50% up to 6%

Employee contribution: $75,000 × 6% = $4,500/year ($375/mo)
Employer match: $4,500 × 50% = $2,250/year ($187.50/mo)
Total benefit: $6,750/year ($562.50/mo)
```

### Roth vs Traditional Decision (Young Saver)
```
Age: 25
Current tax bracket: 22%
Expected retirement bracket: 24%+
Years to retirement: 40

Decision: Prioritize Roth
- Pay 22% tax now
- 40 years of tax-free growth
- Tax-free in potentially higher bracket
```

### Phase-Out Calculation
```
Single filer income: $155,000
Roth IRA phase-out range: $146,000-$161,000
Position in range: ($155,000-$146,000)/($161,000-$146,000) = 60%
Reduction: $7,000 × 60% = $4,200
Allowed contribution: $7,000 - $4,200 = $2,800/year
```

## 🔍 Debugging Guide

### Common Issues
1. **No 401(k) vehicles**: Check ex_q1 = "Yes"
2. **Wrong match amount**: Verify ex_q3 format
3. **Missing Backdoor Roth**: Check income level
4. **No HSA**: Verify HSA_Eligibility field

### Debug Commands
```javascript
diagnoseProfile('7_Foundation_Builder')
showVehicleOrder('7_Foundation_Builder')
traceAllocation('7_Foundation_Builder')
testEmployerIntegration()
```

## 📚 References

### Related Files
- Test results documented in test files
- Employer integration: `addEmployer401kVehicles()` function
- Form mapping: Code.js line ~1950

### External Documentation
- 401(k) contribution limits (IRS)
- Roth IRA phase-out rules
- Employer match best practices
- Target-date fund guidelines

## ✅ Production Readiness Checklist

- ✅ All test scenarios pass
- ✅ Form questions properly mapped
- ✅ Edge cases handled
- ✅ Documentation complete
- ✅ Live form tested
- ✅ Allocation results verified
- ✅ Error handling implemented

**Production Status**: Live and Stable
**Blockers**: None
**Sign-off**: Fully tested and validated August 2024
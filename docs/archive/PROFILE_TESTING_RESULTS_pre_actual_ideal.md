# Profile Testing Results & Issues Tracker

*Last Updated: August 27, 2025*

## 🚨 CRITICAL FINDING: System Working As Designed, But Design Doesn't Match User Expectations

**The "bug" is actually a feature!** The system intentionally treats allocation percentage as ADDITIONAL savings on top of existing contributions. This causes 2-3x "over-allocation" for profiles with seeded contributions.

**Example**: User currently contributing $4,000/mo to Solo 401k says "I want to save 25% of my income"
- **User expects**: $2,000/mo total (25% of $8,000 income)
- **System calculates**: $4,000 (existing) + $2,000 (25% additional) = $6,000/mo total

**Affected Profiles**: 1 (ROBS), 3 (Solo 401k), 8 (Biz Owner) - all profiles that seed existing contributions

**Design Decision Needed**: Should allocation % mean total or additional savings rate?

## Testing Summary

| Profile | Status | Test Result | Issues Found | Priority |
|---------|--------|-------------|--------------|----------|
| 1 - ROBS In Use | ⚠️ Issues | Working but allocation mismatch | Seeding logic causes 2x allocation | High |
| 2 - ROBS Curious | ✅ Passed | Working correctly | None | - |
| 3 - Solo 401k | ⚠️ Issues | Working but allocation mismatch | Seeding logic causes 3x allocation | High |
| 4 - Roth Reclaimer | ⚠️ Issues | Partially working | Form mapping error (ex_q fields) | High |
| 5 - Bracket Strategist | ✅ Passed | Working correctly | None | - |
| 6 - Catch-Up | ✅ Passed | Working correctly | None | - |
| 7 - Foundation Builder | ✅ Passed | Working correctly | 20% minimum enforced | - |
| 8 - Biz Owner | ⚠️ Issues | Working but allocation mismatch | Seeding logic causes 2x allocation | High |
| 9 - Late Stage | ✅ Passed | Working correctly | None | - |

## Key Findings

### ✅ Working Profiles (5 of 9):
- **Profiles 2, 5, 6, 7, 9** all work correctly
- These profiles either don't use seeds or use them correctly (for employer matches only)
- Allocations match expected values perfectly

### ⚠️ Profiles with Issues (4 of 9):

#### 1. Seeding Logic Problem (Profiles 1, 3, 8):
- **Root Cause**: These profiles incorrectly seed user-specified contribution amounts
- **Effect**: System treats seeds as existing contributions and adds user's percentage ON TOP
- **Result**: 2-3x over-allocation

**Affected Code Locations**:
- Profile 1: Line 1052 - `seeds.Retirement['ROBS Solo 401(k) – Profit Distribution'] = annualProfitDistribution / 12;`
- Profile 3: Line 921 - `seeds.Retirement['Solo 401(k) – Employee'] = annualFuture/12;`
- Profile 8: Lines 2044-2050 - Seeds Group 401(k) Employee contributions

#### 2. Form Mapping Problem (Profile 4):
- Test data uses wrong ex_q field numbers
- Profile expects ex_q1/2 but test provides ex_q5/6
- Results in Backdoor Roth logic not triggering

## Detailed Test Results

### ✅ Profile 7: Foundation Builder (PASSED)
**Test Date**: August 27, 2025

**Scenarios Tested**:
1. Young Professional (Age 25, Single)
   - Expected: $675/mo (15% requested)
   - Actual: $900/mo (20% enforced)
   - Status: Working as designed (20% minimum)

2. Family Starter (Age 35, Married, 2 kids)
   - Expected: $1,300/mo
   - Actual: $1,300/mo
   - Status: ✅ Perfect match

**Working Features**:
- ✅ Vehicle generation (401k match, Roth IRA, HSA)
- ✅ Domain allocation based on importance scores
- ✅ CESA allocation when children present
- ✅ 401(k) match calculations
- ✅ No equal $333 splits (investment scoring working)

---

### ✅ Profile 2: ROBS Curious (PASSED)
**Test Date**: August 27, 2025

**Scenarios Tested**:
1. W-2 Employee
   - Expected: $2,003/mo
   - Actual: $2,002/mo
   - Status: ✅ Passed (rounding difference)
   - Vehicles: 401(k) Traditional correctly generated

2. Self-Employed
   - Expected: $2,997/mo
   - Actual: $2,996/mo
   - Status: ✅ Passed (rounding difference)
   - Vehicles: Solo 401(k) Traditional correctly generated

**Working Features**:
- ✅ Dynamic employment logic
- ✅ Correct vehicle generation based on work situation
- ✅ Proper domain allocation
- ✅ HSA and overflow vehicles (Education Bank, Health Bank)

**Note**: ROBS-specific vehicles not shown in test because ex_q5/6/7 values weren't set for ROBS readiness

---

### ⚠️ Profile 4: Roth Reclaimer (ISSUES FOUND)
**Test Date**: August 27, 2025

**Scenarios Tested**:
1. High Income Backdoor ($200k income)
   - Expected: "Backdoor Roth IRA"
   - Actual: Regular "Roth IRA"
   - Status: ❌ Wrong vehicle type
   - Issue: Form mapping error

2. Low Income Direct ($75k income)
   - Expected: $825/mo (15% requested)
   - Actual: $1,099/mo (20% enforced)
   - Status: ⚠️ 20% minimum enforced
   - Vehicles: Correctly using regular Roth IRA

**Issues Identified**:
1. **Form Mapping Error**: Test data uses wrong ex_q field numbers
   - Test has: ex_q5 (Traditional IRA balance), ex_q6 (401k rollover)
   - Profile expects: ex_q1 (Traditional IRA balance), ex_q2 (401k rollover)
   - Result: Backdoor Roth logic never triggers

2. **Missing Employer 401(k)**: Profile 4 has employer 401k questions (ex_q3-6) but test doesn't set them

**Code Location**: profileHelpers['4_Roth_Reclaimer'] at line 1322 in Code.js

---

## Common Patterns Observed

### ✅ Working Well:
1. **Investment Scoring**: No equal $333 splits seen (fields are working)
2. **Domain Allocation**: Properly based on importance scores
3. **Vehicle Generation**: Core logic working for most profiles
4. **20% Minimum**: Consistently enforced across all profiles
5. **Overflow Vehicles**: Education Bank and Health Bank appearing correctly

### ⚠️ Issues Found:
1. **Form Mapping**: Profile 4 has incorrect ex_q field mappings in test data
2. **Missing Test Data**: Some profiles need specific ex_q values to trigger features

### 📝 Notes:
- The 20% minimum savings rate is enforced by `CONFIG.OPTIMIZED_SAVINGS_RATE: 0.20`
- This is a feature, not a bug - ensures adequate retirement savings

---

### ⚠️ Profile 1: ROBS In Use (ISSUES FOUND)
**Test Date**: August 27, 2025

**Scenario Tested**:
- Age 45, Self-employed, $150k income
- Using ROBS with C-Corp
- 30% allocation requested

**Results**:
- Expected: $2,700/mo (30% of $9,000)
- Actual: $6,866/mo
- Difference: +$4,166/mo (154% overage)

**Working Features**:
- ✅ ROBS Solo 401(k) Profit Distribution vehicle generated
- ✅ Backdoor Roth IRA correctly added
- ✅ HSA allocation working
- ✅ No equal $333 splits

**Issue Identified**:
1. **Unlimited ROBS Profit Distribution**: The profile is allocating $5,056/mo to ROBS Solo 401(k)
   - This appears to be treating profit distributions as unlimited
   - Test specified $50,000 annual ($4,167/mo) in ex_q6
   - System allocated more than the specified amount

**Hypothesis**: The ROBS profit distribution vehicle may not be respecting the ex_q6 limit, or there's additional logic adding employer contributions beyond the specified profit distribution.

---

### ⚠️ Profile 3: Solo 401k Builder (ISSUES FOUND)
**Test Date**: August 27, 2025

**Scenario Tested**:
- Age 40, Self-employed LLC, $120k income
- 25% allocation requested
- Solo 401k with $23,500 employee + $25,000 employer contributions

**Results**:
- Expected: $2,000/mo (25% of $8,000)
- Actual: $6,042/mo
- Difference: +$4,042/mo (202% overage)

**Working Features**:
- ✅ Solo 401(k) Employee/Employer split correctly generated
- ✅ Employee contribution: $1,958/mo ($23,500 annual)
- ✅ Employer contribution: $2,733/mo ($32,796 annual)
- ✅ CESA allocation for child
- ✅ HSA, Roth IRA, and Backdoor Roth IRA working

**Issue Identified**:
1. **Over-allocation**: System is allocating 3x the requested amount
   - Solo 401k alone is $4,691/mo (234% of requested $2,000)
   - Test specified $48,500 annual total in ex_q6
   - Actual Solo 401k allocation is $56,296 annual

**Pattern Emerging**: Both Profile 1 and 3 are significantly over-allocating. This suggests the universal allocation engine might be treating certain retirement vehicles as "unlimited" or applying additional logic beyond the user's allocation percentage.

**ROOT CAUSE IDENTIFIED**: 
The issue is not with the universal allocation engine but with how Profiles 1 and 3 are using the "seeds" mechanism:

1. **Profile 1**: Seeds $4,167/mo from ex_q6 (line 1052 in Code.js)
   ```javascript
   seeds.Retirement['ROBS Solo 401(k) – Profit Distribution'] = annualProfitDistribution / 12;
   ```

2. **Profile 3**: Seeds $4,042/mo from ex_q6 (line 921 in Code.js)
   ```javascript
   seeds.Retirement['Solo 401(k) – Employee'] = annualFuture/12;
   ```

3. **The Problem**: The `computeNetPool` function treats seeds as EXISTING contributions and adds the user's allocation percentage ON TOP:
   - Calculates current savings rate from seeds
   - Adds user's requested percentage to that
   - Results in massive over-allocation

4. **Why Others Work**: Profiles 2, 4, and 7 don't seed large contribution amounts - they only seed employer matches or leave seeds empty.

**CRITICAL DISCOVERY**: This is NOT a bug - it's the intended design!

The `computeNetPool` function documentation clearly states:
- "Computes how much 'new' savings to allocate each month"
- "treating userPct as an increment over their current savings rate"
- "@param userPct — additional % they want to save"

The system intentionally treats allocation percentage as ADDITIONAL savings on top of existing (seeded) contributions. 

**Design Intent**:
- Seeds = What user is ALREADY contributing
- Allocation % = ADDITIONAL savings they want to add
- Total = Seeds + Additional

**User Expectation Mismatch**:
Most users likely expect allocation % to mean TOTAL desired savings rate, not additional.

---

### ✅ Profile 5: Bracket Strategist (PASSED)
**Test Date**: August 27, 2025

**Scenario Tested**:
- Age 35, W-2 Employee, $95k income
- 20% allocation requested
- Has employer 401(k) with 100% match up to 4%

**Results**:
- Expected: $1,300/mo
- Actual: $1,300/mo
- Status: ✅ Perfect match!

**Working Features**:
- ✅ Employer match correctly calculated ($317/mo)
- ✅ Traditional 401(k) contributions
- ✅ HSA allocation working
- ✅ Health Bank as overflow
- ✅ No seeding issues

**Key Insight**: Profile 5 does NOT seed the employer match - it adds match as a vehicle in the order, allowing the allocation engine to fill it. This is the correct approach.

---

### ✅ Profile 6: Catch-Up Visionary (PASSED)
**Test Date**: August 27, 2025

**Scenario Tested**:
- Age 55, W-2 Employee, $150k income
- 30% allocation requested
- Catch-up contributions enabled

**Results**:
- Expected: $2,850/mo
- Actual: $2,850/mo
- Status: ✅ Perfect match!

**Working Features**:
- ✅ 401(k) catch-up contributions working
- ✅ Enhanced HSA limits for 55+
- ✅ Employer match correctly calculated
- ✅ No seeding issues

---

### ⚠️ Profile 8: Business Owner Group (ISSUES FOUND)
**Test Date**: August 27, 2025

**Scenario Tested**:
- Age 50, Self-employed, $500k income
- 25% allocation requested
- 10 employees, has 401(k) with profit sharing

**Results**:
- Expected: $7,500/mo
- Actual: $15,832/mo
- Difference: +$8,332/mo (211% overage)

**Issue Identified**:
- **Same seeding problem**: Seeds $8,333/mo from ex_q6 (lines 2044-2050 in Code.js)
- System adds 25% on top of the seeded amount

---

### ✅ Profile 9: Late Stage Growth (PASSED)
**Test Date**: August 27, 2025

**Scenario Tested**:
- Age 60, W-2 Employee, $200k income
- 35% allocation requested
- Near retirement (5 years)

**Results**:
- Expected: $4,200/mo
- Actual: $4,200/mo
- Status: ✅ Perfect match!

**Working Features**:
- ✅ Catch-up contributions
- ✅ Appropriate vehicle prioritization for late stage
- ✅ HSA and Health Bank working correctly
- ✅ No seeding issues

---

## Recommended Actions

### 1. Design Decision Required: Allocation Percentage Meaning
**Current Design**: Allocation % = ADDITIONAL savings on top of existing (seeded) contributions

**User Expectation**: Allocation % = TOTAL desired savings rate

**Options**:
a) **Keep Current Design** - Document clearly that % is additional
   - Pros: Preserves original design intent
   - Cons: Confusing for users

b) **Change to Total %** - Make allocation % represent total desired rate
   - Pros: Matches user expectations
   - Cons: Requires reworking computeNetPool logic

c) **Add Toggle** - Let user choose "additional" vs "total" percentage
   - Pros: Flexible for different use cases
   - Cons: Adds complexity

**Recommended**: Option B - Users naturally think in terms of total savings rate

**Why This Matters**:
- Profile 1 user with $50k annual profit distributions asking for 30% allocation gets $6,866/mo instead of $2,700/mo
- Profile 3 user with $48k annual Solo 401k asking for 25% allocation gets $6,042/mo instead of $2,000/mo
- Profile 8 user with $100k annual 401k asking for 25% allocation gets $15,832/mo instead of $7,500/mo

This could lead to users being advised to save FAR more than they intended or can afford.

### 2. Fix Profile 4 Test Data
**Problem**: Test uses ex_q5/6 instead of ex_q1/2

**Solution**: Update test data to use correct field mappings

### 3. Document Seeding Best Practices
Create clear guidelines for when to use seeds vs vehicle orders:
- **Seeds**: Automatic contributions (employer match, RMDs)
- **Vehicle Orders**: All user-specified contributions

## Next Steps

### Immediate Actions:
1. Fix Profile 1, 3, 8 seeding logic in Code.js
2. Fix Profile 4 test data mapping
3. Re-run tests for affected profiles
4. Update documentation with seeding best practices

### Testing Improvements:
1. Add validation to catch seeding misuse
2. Create unit tests for computeNetPool function
3. Add comprehensive test scenarios for edge cases

### Medium Priority:
4. **Profile 5 (Bracket Strategist)** - Test Traditional vs Roth preference
5. **Profile 6 (Catch-Up)** - Test age 50+ catch-up contributions
6. **Profile 9 (Late Stage)** - Test Roth conversions and QCD planning

### To Fix:
1. **Profile 4 Test Data**: Update ex_q field mappings
   - Change ex_q5 → ex_q1 (Traditional IRA balance)
   - Change ex_q6 → ex_q2 (401k accepts rollovers)
   - Add ex_q3-6 for employer 401k questions

---

## Testing Configuration

### Critical Fields Present: ✅
- investment_involvement, investment_time, investment_confidence
- retirement_importance, education_importance, health_importance
- retirement_years_until_target, cesa_years_until_first_need, hsa_years_until_need
- Net_Monthly_Income, Allocation_Percentage, filing_status
- All ex_q1-10 fields

### Test Environment:
- Headers validated in Working Sheet row 2
- Total 131 columns
- Using Testing.js for profile tests
- Using Testing_Enhanced.js for validation

---

## Action Items

1. **Continue Testing**: Test remaining 6 profiles
2. **Fix Profile 4**: Update test data with correct ex_q mappings
3. **Document ROBS Tests**: Need specific ex_q values for Profile 1 and 2
4. **Edge Case Testing**: After basic tests pass
   - High income phase-outs
   - Age-based catch-up
   - Multiple employment scenarios
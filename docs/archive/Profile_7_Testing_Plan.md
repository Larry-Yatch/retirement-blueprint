# Profile 7 (Foundation Builder) Comprehensive Testing Plan

## Overview
Profile 7 is the default profile for standard investors building their retirement foundation. With the recent fix to FORM_EX_Q_MAPPING, we need to verify that employer 401(k) vehicles are now properly allocated.

## Test Objectives
1. Verify form mapping fix resolves 401(k) vehicle allocation
2. Confirm proper vehicle prioritization across all domains
3. Test various income levels and phase-out scenarios
4. Validate catch-up contribution logic for age 50+
5. Ensure minimum 20% savings rate enforcement works correctly

## Test Scenarios

### Scenario 1: Young Professional Starting Out
**Purpose:** Verify basic functionality with employer 401(k)
- Age: 25
- Income: $65,000
- Filing: Single
- HSA: Yes
- Children: 0
- 401(k): Yes with 100% match up to 3%
- Allocation: 15% (should get 20% minimum)

**Expected Results:**
1. 401(k) match appears first in retirement
2. Roth vehicles prioritized (young age)
3. Total allocation = $867/mo (20% of $4,333 net monthly)

### Scenario 2: Family Starter
**Purpose:** Test with children and traditional tax preference
- Age: 35
- Income: $95,000
- Filing: Married Filing Jointly
- HSA: Yes (family)
- Children: 2
- 401(k): Yes with 50% match up to 6%
- Tax Preference: Now (traditional)
- Allocation: 20%

**Expected Results:**
1. CESA for children included
2. Traditional vehicles prioritized
3. Family HSA limit used
4. Total allocation = $1,300/mo

### Scenario 3: High Income Professional
**Purpose:** Test Roth IRA phase-out and backdoor
- Age: 40
- Income: $175,000 (above Roth phase-out)
- Filing: Single
- HSA: Yes
- Children: 0
- 401(k): Yes with 100% match up to 4%
- Allocation: 30%

**Expected Results:**
1. No direct Roth IRA (phased out)
2. Backdoor Roth IRA included
3. Higher allocation amount tests scaling

### Scenario 4: Near Retirement with Catch-Up
**Purpose:** Test catch-up contributions
- Age: 55
- Income: $125,000
- Filing: Married Filing Jointly
- HSA: Yes with catch-up
- Children: 0 (empty nesters)
- 401(k): Yes with 50% match up to 5%
- Allocation: 35%

**Expected Results:**
1. HSA catch-up: +$1,000/year
2. IRA catch-up: +$1,000/year
3. 401(k) catch-up: +$7,500/year
4. Proper monthly calculations with catch-up

### Scenario 5: No Employer Benefits
**Purpose:** Test without employer 401(k)
- Age: 30
- Income: $55,000
- Filing: Single
- HSA: No
- Children: 0
- 401(k): No
- Allocation: 25%

**Expected Results:**
1. IRA vehicles only for retirement
2. No 401(k) vehicles generated
3. Proper fallback to IRA limits

## Testing Steps

### Step 1: Vehicle Generation Test
```javascript
// Run testProfileHelper for each scenario
testProfileHelper('7_Foundation_Builder', scenarioData);
```
- Verify correct vehicles are generated
- Check monthly caps are accurate
- Confirm order matches expected priority

### Step 2: Complete Scenario Test
```javascript
// Run full allocation test
runCompleteScenarioTest('scenario', PROFILE_7_SCENARIOS);
```
- Verify allocations match generated vehicles
- Check total allocation amount
- Confirm 20% minimum enforcement

### Step 3: Form Submission Test (if needed)
- Submit actual form with Profile 7 data
- Verify ex_q1-4 populated correctly
- Check that 401(k) data flows through

### Step 4: Edge Case Testing
- Test with $0 employer match
- Test with very high income ($500k+)
- Test with fractional match percentages
- Test age 60+ for higher catch-up

## Success Criteria
1. ✅ All 401(k) vehicles appear in allocations (not just generation)
2. ✅ Correct prioritization: Match → HSA → Roth → Traditional
3. ✅ Phase-out rules properly applied
4. ✅ Catch-up contributions calculated correctly
5. ✅ Total allocations match expected amounts
6. ✅ Tax preference ordering works (Now/Later/Both)

## Validation Report Structure
Based on Profile 2 model:
1. Executive Summary
2. Test Scenario Details (for each)
   - Input Data
   - Expected Vehicle Order & Rationale
   - Actual Results
   - ✅/❌ Comparison
3. Retirement Planning Accuracy Assessment
4. Issues Identified (if any)
5. Recommendations
6. Conclusion with production readiness

## Timeline
1. Run all test scenarios: 30 minutes
2. Document results: 20 minutes
3. Update validation report: 30 minutes
4. Total: ~1.5 hours

## Notes
- Focus on 401(k) allocation since that was the main issue
- Use 2025 contribution limits throughout
- Document any unexpected behavior
- Compare against Profile 2 for consistency
# Complete Test Suite Guide

## Overview

The Complete Test Suites solve our persistent testing issues by providing:
- **ALL required fields** (90+ columns) with sensible defaults
- **Profile-specific test data** for accurate testing
- **Multiple scenarios** per profile to test edge cases
- **No more missing field errors** or $300/$300/$300 equal splits

## How to Use

### Test a Single Scenario
```javascript
// Profile 7 scenarios
testProfile7Young()        // Young professional with 401(k)
testProfile7Family()       // Family with children
testProfile7HighIncome()   // High income professional
testProfile7No401k()       // No employer 401(k) available

// Profile 2 scenarios  
testProfile2W2()          // W-2 employee
testProfile2Self()        // Self-employed

// Profile 4 scenarios
testProfile4Backdoor()    // High income backdoor Roth
testProfile4Direct()      // Low income direct Roth
```

### Test All Scenarios for a Profile
```javascript
testProfileAllScenarios('7_Foundation_Builder')
testProfileAllScenarios('2_ROBS_Curious')
testProfileAllScenarios('4_Roth_Reclaimer')
```

### Custom Testing
```javascript
// Test any profile/scenario combination
testProfileComplete('7_Foundation_Builder', 'youngProfessional')
testProfileComplete('2_ROBS_Curious', 'selfEmployed')
```

## What's Fixed

### 1. Domain Weight Calculation
All tests now include:
- `investment_involvement`, `investment_time`, `investment_confidence`
- `retirement_importance`, `education_importance`, `health_importance`
- `retirement_years_until_target`, `cesa_years_until_first_need`, `hsa_years_until_need`

No more equal $333/$333/$333 splits!

### 2. 401(k) Vehicle Generation
Profile 7 tests now properly include:
- `ex_q1`: Has employer 401(k)? 
- `ex_q2`: Has match?
- `ex_q3`: Match percentage
- `ex_q4`: Roth option?

401(k) vehicles should now appear in allocations.

### 3. Complete Data Coverage
Every test includes:
- All Phase 1 fields (personal info, work situation, income, etc.)
- All Phase 2 fields (balances, goals, preferences)
- All computed flags (NEEDS_BACKDOOR_ROTH, CATCH_UP_ELIGIBLE, etc.)
- Profile-specific extra questions

## Test Suite Structure

```javascript
const PROFILE_X_TEST_SUITE = {
  baseData: {
    // Complete set of ALL fields with defaults
    // ~90+ fields covering everything
  },
  scenarios: {
    scenarioName: {
      // Override specific fields for this scenario
      // Only need to specify what's different
    }
  }
}
```

## Adding New Profiles

When tuning a new profile:
1. Copy an existing test suite structure
2. Update profile-specific values in baseData
3. Create relevant scenarios
4. Update ex_q values based on profile's form questions

## Verification Checklist

After running tests, verify:
- [ ] No "undefined" or missing field errors
- [ ] Domain allocations reflect importance scores (not equal splits)
- [ ] 401(k) vehicles appear when ex_q1 = 'Yes'
- [ ] Total allocation matches expected percentage
- [ ] Phase-out rules apply for high income scenarios
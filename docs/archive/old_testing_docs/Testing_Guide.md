# Testing Guide

## Overview

The Testing.js file provides a comprehensive testing framework for the Retirement Blueprint system. This guide consolidates all testing best practices, common patterns, and troubleshooting tips.

## 🚀 Quick Start Testing

### From the Testing Menu
1. Open your Google Sheet
2. Click "🧪 Testing" in the menu bar
3. Select the test you want to run
4. Check Script Editor logs for results (View → Logs)

### From the Script Editor
1. Open Script Editor (Extensions → Apps Script)
2. Select Testing.js
3. Choose a function from dropdown:
   - `testProfile2All()` - Test all Profile 2 scenarios
   - `testProfile4All()` - Test all Profile 4 scenarios
   - `testAllProfiles()` - Test all profile helpers
4. Click ▶️ Run

### Quick Test Commands
```javascript
// Validate setup first
validateHeaders()  // Check all headers exist

// Test specific profiles
testProfile2W2()   // Profile 2 W-2 employee
testProfile2Self() // Profile 2 self-employed
testProfile4HighIncome() // Profile 4 backdoor Roth (now with employment logic)
testProfile5TaxNow()    // Profile 5 Traditional focus
testProfile6CatchUp()   // Profile 6 with catch-up contributions
testProfile9LateStage() // Profile 9 with Roth conversions & QCD

// Debug issues
diagnoseProfile('7_Foundation_Builder')
showVehicleOrder('2_ROBS_Curious')
traceAllocation('4_Roth_Reclaimer')
```

## 📋 Complete Test Data Template

**CRITICAL**: Every test MUST include these fields to avoid failures:

```javascript
const COMPLETE_TEST_TEMPLATE = {
  // ========== PHASE 1 CORE DATA ==========
  'Timestamp': new Date(),
  'Full_Name': 'Test User',
  'Email': 'test@example.com',
  'Student_ID_Last4': '1234',
  'Current_Age': 35,
  'ProfileID': '7_Foundation_Builder',
  'Work_Situation': 'W-2 employee',
  
  // ========== FINANCIAL DATA ==========
  'gross_annual_income': 75000,
  'Net_Monthly_Income': 5000,
  'Allocation_Percentage': 20,
  'filing_status': 'Single',
  
  // ========== INVESTMENT SCORING (CRITICAL!) ==========
  'investment_involvement': 4,  // 1-7 scale
  'investment_time': 4,         // 1-7 scale
  'investment_confidence': 4,   // 1-7 scale
  
  // ========== DOMAIN IMPORTANCE ==========
  'retirement_importance': 7,
  'education_importance': 1,    // Increase if kids
  'health_importance': 5,
  
  // ========== YEARS UNTIL NEED ==========
  'retirement_years_until_target': 30,
  'cesa_years_until_first_need': 18,
  'hsa_years_until_need': 30,
  
  // ========== PREFERENCES ==========
  'Tax_Minimization': 'Both',
  'hsa_eligibility': 'Yes',
  'cesa_num_children': 0,
  
  // ========== PROFILE-SPECIFIC ==========
  'ex_q1': 'Yes',  // Has 401k
  'ex_q2': 'Yes',  // Has match
  'ex_q3': '100% up to 3%',
  'ex_q4': 'Yes'   // Has Roth option
};
```

## 🧪 Test Suite Structure

### 1. Profile Test Suites

Located in Complete_Test_Suites_Fixed.js:

```javascript
const PROFILE_7_TEST_SUITE = {
  baseData: {
    // Complete set of ALL required fields
    // ~92 columns with sensible defaults
  },
  scenarios: {
    youngProfessional: {
      // Override specific fields
      Current_Age: 25,
      gross_annual_income: 65000
    },
    familyStarter: {
      Current_Age: 35,
      cesa_num_children: 2,
      filing_status: 'Married Filing Jointly'
    }
  }
}
```

### 2. Test Functions

#### Profile Helper Testing
```javascript
testProfileHelper('7_Foundation_Builder', testData)
// Tests vehicle generation only
```

#### Complete Scenario Testing
```javascript
runCompleteScenarioTest('youngProfessional', PROFILE_7_SCENARIOS)
// Tests full allocation flow
```

#### All Scenarios for a Profile
```javascript
testProfileAllScenarios('7_Foundation_Builder')
// Runs all defined scenarios
```

## 📊 Understanding Test Output

### Successful Test
```
📊 FINANCIAL INPUTS:
  Gross Annual: $120,000
  Net Monthly: $7,500
  Allocation %: 26.7%
  Expected Monthly: $2,003

💰 ACTUAL ALLOCATIONS:
Education:
  - Combined CESA: $333/mo
  - Education Bank: $334/mo
  Subtotal: $667/mo

Health:
  - HSA: $668/mo
  Subtotal: $668/mo

Retirement:
  - 401(k) Match Traditional: $600/mo
  - 401(k) Roth: $68/mo
  Subtotal: $668/mo

📊 SUMMARY:
  Expected: $2003
  Actual: $2003
  ✅ Allocation matches!
```

### Key Validation Points
1. **Total matches expected** (Net × Allocation %)
2. **Vehicle priority correct** (Match → HSA → Roth/Trad)
3. **Domain balance** (Based on importance scores)
4. **No limit violations** (Monthly caps respected)
5. **20% minimum enforced** (If requested < 20%)

## 🐛 Common Test Failures & Solutions

### 1. Missing Investment Scoring
**Symptom**: Equal $333/$333/$333 domain splits
**Solution**: Include all 3 investment scoring fields (1-7 scale)
```javascript
'investment_involvement': 4,
'investment_time': 4,
'investment_confidence': 4
```

### 2. Wrong Form Mapping
**Symptom**: Missing 401(k) or IRA vehicles
**Solution**: Check FORM_EX_Q_MAPPING for profile
```javascript
// Profile 7 expects:
'ex_q1': 'Yes',  // employer 401k
'ex_q2': 'Yes',  // employer match
'ex_q3': '100% up to 3%',
'ex_q4': 'Yes'   // roth option
```

### 3. Header Not Found
**Symptom**: "Cannot read property 'X' of undefined"
**Solution**: 
1. Run `validateHeaders()` first
2. Check Working Sheet row 2 (not row 1)
3. Use HEADERS constants

### 4. Zero or NaN Allocations
**Symptom**: $0 allocations or NaN values
**Solution**: Always set Net_Monthly_Income
```javascript
'Net_Monthly_Income': 5000,  // Required!
'Allocation_Percentage': 20   // Required!
```

### 5. Unexpected 20% Allocation
**Symptom**: Getting 20% when requesting 15%
**Solution**: This is correct - system enforces 20% minimum
```javascript
// System uses: Math.max(0.20, userRequest)
```

## 🛠️ Debug Helpers

### diagnoseProfile()
Shows complete profile analysis:
```javascript
diagnoseProfile('7_Foundation_Builder')
// Output:
// - Vehicles generated by helper
// - Actual allocations
// - Mismatches highlighted
```

### showVehicleOrder()
Displays vehicle priority:
```javascript
showVehicleOrder('2_ROBS_Curious')
// Shows ordered list of vehicles
```

### traceAllocation()
Traces allocation decisions:
```javascript
traceAllocation('4_Roth_Reclaimer')
// Shows why vehicles get skipped
```

### validateHeaders()
Pre-flight check:
```javascript
const validation = validateHeaders();
if (!validation.valid) {
  console.error('Missing:', validation.missingHeaders);
}
```

## 📝 Writing New Tests

### Test Factory Pattern
```javascript
function createTestScenario(overrides = {}) {
  // Start with complete defaults
  const defaults = { /* COMPLETE_TEST_TEMPLATE */ };
  
  // Merge overrides
  const testData = { ...defaults, ...overrides };
  
  // Validate
  const validation = validateTestData(testData, testData.ProfileID);
  if (!validation.valid) {
    throw new Error('Invalid test data: ' + validation.errors.join(', '));
  }
  
  return testData;
}

// Usage
const testData = createTestScenario({
  ProfileID: '5_Bracket_Strategist',
  Current_Age: 45,
  gross_annual_income: 150000
});
```

### Test Structure
```javascript
function testProfileXScenario() {
  console.log('Testing: Profile X specific scenario');
  
  // 1. Create test data
  const testData = createTestScenario({
    ProfileID: 'X_Profile_Name',
    // Scenario-specific overrides
  });
  
  // 2. Run test
  const result = runCompleteScenarioTest('scenario', { 
    scenario: testData 
  });
  
  // 3. Assert results
  assertVehicleAllocated(result, '401(k) Match');
  assertAllocationAmount(result, 'HSA', 375);
  
  return result;
}
```

## 🔧 Test Configuration

### Profile Requirements
```javascript
const PROFILE_REQUIREMENTS = {
  '2_ROBS_Curious': {
    required: ['ex_q1', 'ex_q2', 'ex_q3', 'ex_q4', 'ex_q5', 'ex_q6', 'ex_q7'],
    mapping: {
      ex_q1: 'employer_401k',
      ex_q2: 'employer_match',
      ex_q3: 'match_percentage',
      ex_q4: 'roth_option',
      ex_q5: 'rollover_balance',
      ex_q6: 'business_income',
      ex_q7: 'spouse_in_business'
    }
  },
  // ... other profiles
};
```

### Test Scenarios by Profile
- **Profile 2**: W-2 Employee, Self-Employed, Both
- **Profile 4**: High Income Backdoor, Low Income Direct, Mega Backdoor
- **Profile 7**: Young Professional, Family, High Income, Near Retirement

## 📋 Testing Checklist

Before running any test:
- [ ] Headers validated with `validateHeaders()`
- [ ] Complete test data (all required fields)
- [ ] Investment scoring included (1-7 scale)
- [ ] Profile-specific ex_q values set
- [ ] Net_Monthly_Income and Allocation_Percentage set
- [ ] Expected behavior documented

During testing:
- [ ] Check total allocation matches expected
- [ ] Verify vehicle priority order
- [ ] Confirm domain allocations reflect importance
- [ ] Ensure no contribution limit violations
- [ ] Test edge cases (phase-outs, limits)

After testing:
- [ ] Document any unexpected behavior
- [ ] Update test suite if needed
- [ ] Add new scenarios for edge cases
- [ ] Share findings in documentation

## 🚨 Emergency Troubleshooting

### "The test won't run!"
1. Check Script Editor → View → Logs for errors
2. Run `validateHeaders()` first
3. Verify you're testing the right profile
4. Check if Working Sheet has data

### "Wrong allocations!"
1. Use `diagnoseProfile()` to compare
2. Check if 20% minimum is affecting results
3. Verify all domain importance scores
4. Look for budget exhaustion

### "Missing vehicles!"
1. Check profile's ex_q mapping
2. Verify eligibility (HSA, kids for CESA)
3. Look at phase-out rules (high income)
4. Check employment status logic

## 📚 Key Testing Files

- `Testing.js` - Main testing framework
- `Complete_Test_Suites_Fixed.js` - Profile test data
- `Test_Data_Validator.js` - Data validation
- `Debug_Helpers.js` - Troubleshooting tools

## 🎯 Best Practices Summary

1. **Always validate first** - Saves hours of debugging
2. **Use complete test data** - All fields matter
3. **Test incrementally** - One scenario at a time
4. **Document expected behavior** - Before running
5. **Use debug helpers** - When things go wrong
6. **Check the 20% minimum** - It's a feature
7. **Verify form mappings** - Profile-specific
8. **Test edge cases** - High income, no benefits

## ⚠️ Missing Tests

The following tests are referenced in documentation but don't exist in the codebase:

### Form Mapping Tests
- `testFormQuestionMapping()` - Should test remapFormValues() function
- `testEmployer401kIntegration()` - Should test employer 401k question handling

### Priority Test Creation
1. **Form mapping validation** - Critical for profiles 2, 4, 7
2. **Profile classification edge cases** - Boundary conditions
3. **Allocation limit enforcement** - Contribution caps
4. **Email generation** - Phase 2 link creation

See [Development Notes](./Development_Notes.md) for implementation details.

Remember: Good tests prevent production issues!
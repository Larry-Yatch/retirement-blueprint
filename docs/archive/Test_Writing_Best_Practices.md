# Test Writing Best Practices for Retirement Blueprint

## The Problem
Every test we've written has failed on first run due to:
1. Missing required fields (investment scoring, ex_q mappings)
2. Header mismatches
3. Incorrect assumptions about data requirements
4. Not understanding what the engine actually needs

## The Solution: Pre-Flight Test Checklist

### 1. Use a Complete Test Data Template

```javascript
const COMPLETE_TEST_TEMPLATE = {
  // ========== PHASE 1 CORE DATA ==========
  'Timestamp': new Date(),
  'Full_Name': 'REQUIRED',
  'Email': 'REQUIRED',
  'Student_ID_Last4': 'REQUIRED',
  'Current_Age': 'REQUIRED_NUMBER',
  'ProfileID': 'REQUIRED (e.g., 7_Foundation_Builder)',
  'Work_Situation': 'REQUIRED (W-2 employee/Self-employed)',
  
  // ========== FINANCIAL DATA ==========
  'gross_annual_income': 'REQUIRED_NUMBER',
  'Net_Monthly_Income': 'REQUIRED_NUMBER',
  'Allocation_Percentage': 'REQUIRED_NUMBER',
  'filing_status': 'REQUIRED (Single/Married Filing Jointly)',
  
  // ========== INVESTMENT SCORING (CRITICAL!) ==========
  'investment_involvement': 'REQUIRED_NUMBER (1-7)',
  'investment_time': 'REQUIRED_NUMBER (1-7)',
  'investment_confidence': 'REQUIRED_NUMBER (1-7)',
  
  // ========== PREFERENCES ==========
  'Tax_Minimization': 'REQUIRED (Now/Later/Both)',
  'hsa_eligibility': 'REQUIRED (Yes/No)',
  'cesa_num_children': 'REQUIRED_NUMBER (0+)',
  
  // ========== PHASE 2 PROFILE-SPECIFIC ==========
  'ex_q1': 'PROFILE_SPECIFIC',
  'ex_q2': 'PROFILE_SPECIFIC',
  'ex_q3': 'PROFILE_SPECIFIC',
  'ex_q4': 'PROFILE_SPECIFIC',
  'ex_q5': 'PROFILE_SPECIFIC',
  'ex_q6': 'PROFILE_SPECIFIC',
  'ex_q7': 'PROFILE_SPECIFIC',
  'ex_q8': 'PROFILE_SPECIFIC',
  'ex_q9': 'PROFILE_SPECIFIC',
  'ex_q10': 'PROFILE_SPECIFIC'
};
```

### 2. Create a Test Data Validator

```javascript
function validateTestData(testData, profileId) {
  const errors = [];
  
  // Check required fields
  const requiredFields = [
    'Full_Name', 'Email', 'Student_ID_Last4', 'Current_Age',
    'ProfileID', 'Work_Situation', 'gross_annual_income',
    'Net_Monthly_Income', 'Allocation_Percentage', 'filing_status',
    'investment_involvement', 'investment_time', 'investment_confidence',
    'Tax_Minimization', 'hsa_eligibility', 'cesa_num_children'
  ];
  
  requiredFields.forEach(field => {
    if (!testData[field] && testData[field] !== 0) {
      errors.push(`Missing required field: ${field}`);
    }
  });
  
  // Check investment scores are 1-7
  ['investment_involvement', 'investment_time', 'investment_confidence'].forEach(field => {
    const value = testData[field];
    if (value < 1 || value > 7) {
      errors.push(`${field} must be 1-7, got ${value}`);
    }
  });
  
  // Check profile-specific requirements
  const profileReqs = getProfileRequirements(profileId);
  profileReqs.forEach(req => {
    if (!testData[req]) {
      errors.push(`Missing profile-specific field: ${req}`);
    }
  });
  
  return {
    valid: errors.length === 0,
    errors
  };
}
```

### 3. Use a Test Factory Function

```javascript
function createTestScenario(overrides = {}) {
  // Start with complete defaults
  const defaults = {
    // Demographics
    'Full_Name': 'Test User',
    'Email': 'test@example.com',
    'Student_ID_Last4': '1234',
    'Current_Age': 35,
    'ProfileID': '7_Foundation_Builder',
    'Work_Situation': 'W-2 employee',
    
    // Financial
    'gross_annual_income': 75000,
    'Net_Monthly_Income': 5000,
    'Allocation_Percentage': 20,
    'filing_status': 'Single',
    
    // CRITICAL - Investment Scoring
    'investment_involvement': 4,  // Neutral
    'investment_time': 4,         // Neutral
    'investment_confidence': 4,   // Neutral
    
    // Preferences
    'Tax_Minimization': 'Both',
    'hsa_eligibility': 'Yes',
    'cesa_num_children': 0,
    
    // Common 401k questions
    'ex_q1': 'Yes',  // Has 401k
    'ex_q2': 'Yes',  // Has match
    'ex_q3': '100% up to 3%',
    'ex_q4': 'Yes'   // Has Roth option
  };
  
  // Merge with overrides
  const testData = { ...defaults, ...overrides };
  
  // Validate before returning
  const validation = validateTestData(testData, testData.ProfileID);
  if (!validation.valid) {
    console.error('Invalid test data:', validation.errors);
    throw new Error('Test data validation failed');
  }
  
  return testData;
}
```

### 4. Document Profile Requirements

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
  '4_Roth_Reclaimer': {
    required: ['ex_q1', 'ex_q2', 'ex_q3', 'ex_q4', 'ex_q5', 'ex_q6', 'ex_q7', 'ex_q8'],
    mapping: {
      ex_q5: 'trad_ira_balance',
      ex_q6: 'after_tax_contributions',
      ex_q7: 'understands_backdoor',
      ex_q8: 'conversion_amount',
      ex_q1: 'employer_401k',
      ex_q2: 'employer_match',
      ex_q3: 'match_percentage',
      ex_q4: 'roth_option'
    }
  },
  '7_Foundation_Builder': {
    required: ['ex_q1', 'ex_q2', 'ex_q3', 'ex_q4'],
    mapping: {
      ex_q1: 'employer_401k',
      ex_q2: 'employer_match',
      ex_q3: 'match_percentage',
      ex_q4: 'roth_option'
    }
  }
};
```

### 5. Create Debug-First Tests

```javascript
function runTestWithDebugging(testName, testData) {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`RUNNING TEST: ${testName}`);
  console.log(`${'='.repeat(70)}`);
  
  // 1. Show what we're testing with
  console.log('\n📋 TEST DATA:');
  console.log('Key fields:');
  console.log(`  ProfileID: ${testData.ProfileID}`);
  console.log(`  Age: ${testData.Current_Age}`);
  console.log(`  Income: $${testData.gross_annual_income}`);
  console.log(`  Investment scores: ${testData.investment_involvement}/${testData.investment_time}/${testData.investment_confidence}`);
  
  // 2. Validate BEFORE running
  const validation = validateTestData(testData, testData.ProfileID);
  if (!validation.valid) {
    console.error('\n❌ TEST DATA INVALID:');
    validation.errors.forEach(err => console.error(`  - ${err}`));
    return false;
  }
  console.log('\n✅ Test data validated');
  
  // 3. Run with clear output
  try {
    const result = runActualTest(testData);
    console.log('\n✅ TEST PASSED');
    return result;
  } catch (error) {
    console.error('\n❌ TEST FAILED:');
    console.error(error.message);
    console.error('\nCommon causes:');
    console.error('1. Missing investment scoring (causes $333 split)');
    console.error('2. Wrong ex_q mapping for profile');
    console.error('3. Missing required fields');
    return false;
  }
}
```

### 6. Test Scenario Builder UI

```javascript
function buildTestScenarioInteractive() {
  // This could be a Google Sheets UI that:
  // 1. Shows all required fields
  // 2. Has dropdowns for valid values
  // 3. Validates as you build
  // 4. Shows profile-specific requirements
  // 5. Generates the test code
}
```

## Quick Reference Card

### Before Writing Any Test:

1. **Check Profile Requirements**
   ```javascript
   const reqs = PROFILE_REQUIREMENTS[profileId];
   console.log('Required fields:', reqs.required);
   console.log('Field meanings:', reqs.mapping);
   ```

2. **Start with Factory**
   ```javascript
   const testData = createTestScenario({
     ProfileID: '7_Foundation_Builder',
     Current_Age: 25
     // Factory provides all other required fields
   });
   ```

3. **Always Include Investment Scoring**
   - Even if test doesn't care about domain weights
   - Use 4 for neutral (balanced allocation)
   - Use 1-2 for conservative, 6-7 for aggressive

4. **Validate Before Running**
   ```javascript
   const validation = validateTestData(testData, profileId);
   if (!validation.valid) {
     console.error('Fix these issues:', validation.errors);
     return;
   }
   ```

## Common Pitfalls

1. **Forgetting Investment Scoring**
   - Symptom: Even $333/$333/$333 splits
   - Fix: Add investment_involvement/time/confidence

2. **Wrong Profile Question Mapping**
   - Symptom: Missing vehicles (401k, IRA)
   - Fix: Check PROFILE_REQUIREMENTS mapping

3. **Missing Net Monthly Income**
   - Symptom: $0 or NaN allocations
   - Fix: Always set Net_Monthly_Income

4. **Invalid Values**
   - Symptom: Unexpected behavior
   - Fix: Use validator to catch early

## Testing Checklist

- [ ] Used createTestScenario factory
- [ ] Included all investment scoring fields
- [ ] Checked profile-specific requirements
- [ ] Validated test data before running
- [ ] Documented what test is checking
- [ ] Added error handling with clear messages
- [ ] Tested with minimal data first
- [ ] Added to test suite only after working

## Example: Good Test

```javascript
function testProfile7With401k() {
  // Clear documentation
  console.log('Testing: Profile 7 should allocate to 401(k) match first');
  
  // Use factory with minimal overrides
  const testData = createTestScenario({
    ProfileID: '7_Foundation_Builder',
    Current_Age: 25,
    // Factory provides investment scoring!
  });
  
  // Run with debugging
  return runTestWithDebugging('Profile 7 401(k)', testData);
}
```

This approach would have prevented ALL of our test failures!
# Testing Framework Guide

## Overview

The consolidated Testing.js file provides a comprehensive testing framework for the Retirement Blueprint system. All testing functionality has been consolidated into a single, well-organized file for easier maintenance and use.

## File Structure

The Testing.js file is organized into 6 main sections:

### 1. TEST DATA GENERATION
- `generateTestData()` - Creates standardized test data with defaults
- `PROFILE_2_SCENARIOS` - Predefined scenarios for Profile 2 testing

### 2. PROFILE HELPER TESTING
- `testProfileHelper()` - Tests individual profile helpers
- `testAllProfiles()` - Tests all profile helpers systematically

### 3. COMPLETE SCENARIO TESTING
- `runCompleteScenarioTest()` - Full Phase 1 + Phase 2 testing with monthly calculations
- Shows expected vs actual allocations
- Validates the entire flow from data entry to allocation

### 4. ENGINE DIAGNOSTICS
- `testUniversalEngine()` - Tests the universal engine directly
- `diagnoseProfileIssues()` - Compares expected vs actual vehicles

### 5. VALIDATION UTILITIES
- `validateHeaders()` - Ensures all required columns exist
- `verifyWorkingSheetColumns()` - Shows column positions for debugging

### 6. TEST MENU AND RUNNERS
- `onOpen()` - Creates the Testing menu in Google Sheets
- Quick test runners for common scenarios

## How to Use

### From the Testing Menu
1. Open your Google Sheet
2. Click on "🧪 Testing" in the menu bar
3. Select the test you want to run

### From the Script Editor
1. Open the Script Editor (Extensions → Apps Script)
2. Select Testing.js
3. Run any function directly:
   - `quickTest()` - Runs Profile 2 W-2 scenario
   - `testProfile2W2()` - Test Profile 2 with W-2 employee
   - `testProfile2Self()` - Test Profile 2 with self-employed
   - `testProfile2All()` - Run all Profile 2 scenarios
   - `testAllProfiles()` - Test all profile helpers

### Common Test Scenarios

#### Testing Profile 2 with Monthly Contributions
```javascript
// This test shows:
// - Expected monthly allocation based on income and percentage
// - Actual allocations across all domains
// - Vehicle priority and contribution limits
testProfile2W2();
```

#### Debugging Engine Issues
```javascript
// Directly test the universal engine
testUniversalEngine();

// Compare profile helper output with engine results
diagnoseProfileIssues('2_ROBS_Curious');
```

#### Validating Setup
```javascript
// Check if all required headers exist
validateHeaders();

// Show column positions
verifyWorkingSheetColumns();
```

## Test Results Interpretation

### Successful Test Output
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
  - HSA: $45/mo
  - 401(k) Match Traditional: $600/mo
  - 401(k) Roth: $23/mo
  Subtotal: $668/mo

📊 SUMMARY:
  Expected: $2003
  Actual: $2003
  ✅ Allocation matches!
```

### Key Points to Verify
1. **Total Allocation** - Should match expected (Net Monthly × Allocation %)
2. **Vehicle Priority** - HSA and employer match should be funded first
3. **Domain Balance** - Each domain gets 1/3 of total allocation
4. **Contribution Limits** - No vehicle should exceed its annual/monthly limit

## Troubleshooting

### Common Issues

1. **"undefined" Total Monthly**
   - This is cosmetic - check if actual allocations sum correctly
   - Usually means Net_Monthly_Income or Allocation_Percentage is missing

2. **Missing Vehicles**
   - Check if eligibility data is set (HSA eligibility, number of children)
   - Verify work situation matches expected profile behavior

3. **Wrong Allocations**
   - Ensure Net_Monthly_Income and Allocation_Percentage are set
   - Check if profile helper is generating correct vehicle orders

## Migration Notes

### Archived Testing Files
The following files have been consolidated into Testing.js:
- Testing_Complete_Profile2.js
- Testing_Direct_Submission.js
- Testing_Engine_Diagnostic.js
- Testing_Quick_Fix.js
- Testing_Complete_Monthly.js

All functionality from these files is now available in the consolidated Testing.js with improved organization and consistency.

### Backward Compatibility
- `quickTest()` function maintained for compatibility
- All core testing functions preserve their original signatures
- Menu structure enhanced but maintains familiar options

## Next Steps

1. **Test Other Profiles** - Extend scenarios for remaining profiles
2. **Add Edge Cases** - High income, phase-outs, catch-up contributions
3. **Performance Testing** - Measure execution time for optimization
4. **Integration Tests** - Test form submission to allocation flow
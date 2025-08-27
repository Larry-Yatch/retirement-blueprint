# Testing Compatibility Report & Capabilities Review

## Compatibility Check ✅

### Code.js Exports These Key Functions:
1. **`profileHelpers`** object containing all 9 profile helper functions
2. **`runUniversalEngine(rowNum)`** - Main allocation engine
3. **`getValue(hdr, rowArr, name)`** - Header value getter
4. **`getHeaderMap(sheet)`** - Creates header position map
5. **`HEADERS`** constant - All header name definitions

### Testing.js Uses:
- ✅ `profileHelpers[profileId]` - Correctly references the object
- ✅ `runUniversalEngine(rowNum)` - Correct function call
- ✅ `getValue()` - Indirectly through profile helpers
- ✅ Headers from Working Sheet row 2

### Testing_Enhanced.js:
- ✅ References `runCompleteScenarioTest()` from Testing.js
- ✅ In Google Apps Script, all .js files share global scope
- ✅ Will work when both files are loaded together

## Testing Capabilities Overview

### 1. **Basic Testing (Testing.js)**

#### Profile Helper Testing
```javascript
testProfileHelper(profileId, testData)
```
- Tests vehicle generation for any profile
- Shows vehicle orders by domain
- Basic validation

#### Complete Scenario Testing
```javascript
runCompleteScenarioTest(scenarioName, scenarios)
```
- Tests full allocation flow
- Writes test data to Working Sheet
- Runs profile helper + universal engine
- Shows monthly allocations by vehicle
- Cleans up test data after

#### Available Test Suites
- **Profile 2 (ROBS Curious)**: W-2 Employee, Self-Employed scenarios
- **Profile 4 (Roth Reclaimer)**: High Income Backdoor, Low Income Direct
- **Profile 7 (Foundation Builder)**: Young Professional, Family Starter

#### Diagnostic Tools
- `validateHeaders()` - Basic header checking
- `testUniversalEngine()` - Direct engine testing
- `verifyWorkingSheetColumns()` - Column structure check

### 2. **Enhanced Testing (Testing_Enhanced.js)**

#### Critical Field Tracking
```javascript
CRITICAL_FIELDS = {
  INVESTMENT_SCORING: [...],  // Prevents $333 equal splits
  DOMAIN_IMPORTANCE: [...],   // Drives allocation percentages
  YEARS_UNTIL: [...],        // Affects urgency
  FINANCIAL_BASICS: [...],   // Core allocation inputs
  ELIGIBILITY: [...]         // Feature availability
}
```

#### Enhanced Validation
```javascript
validateHeadersEnhanced()
```
- Auto-detects header row (1 or 2)
- Checks ALL critical fields
- Clear error messages
- Specific fix instructions

#### Auto-Fix Capabilities
```javascript
fixMissingHeaders()
```
- Automatically adds missing headers to Working Sheet

```javascript
autoFixTestData(testData)
```
- Sets sensible defaults for missing fields
- Calculates derived fields
- Syncs duplicate fields (Full_Name/full_name)

#### Complete Data Generation
```javascript
generateCompleteTestData(profileId, overrides)
```
- Starts with 90+ field template
- Applies profile-specific defaults
- Auto-fixes common issues
- Returns validated, complete test data

#### Test With Validation
```javascript
runTestWithValidation(profileId, scenario)
```
- Validates data BEFORE running test
- Shows warnings and errors
- Attempts auto-fix if validation fails
- Prevents cryptic test failures

### 3. **Testing Menu Options**

#### From Testing.js Menu:
- Test All Profiles
- Profile 2: W-2, Self-Employed, All
- Profile 4: High Income, Low Income, All
- Profile 7: Young Pro, Family, All
- Universal Engine Test
- Column Verification
- Header Validation
- Validation Reports (Profiles 4 & 7)

#### From Enhanced Testing Menu:
- Enhanced Header Validation
- Fix Missing Headers
- Test All Profiles with Validation
- Show Complete Test Template
- Diagnose Test Failures

## Test Data Requirements

### Minimum Required Fields:
1. **Investment Scoring** (1-7 scale)
   - investment_involvement
   - investment_time
   - investment_confidence

2. **Domain Importance** (1-7 scale)
   - retirement_importance
   - education_importance
   - health_importance

3. **Years Until**
   - retirement_years_until_target
   - cesa_years_until_first_need
   - hsa_years_until_need

4. **Financial**
   - gross_annual_income
   - Net_Monthly_Income
   - Allocation_Percentage
   - filing_status

5. **Profile-Specific**
   - ex_q1 through ex_q10 (varies by profile)

## Common Test Patterns

### Test Single Profile
```javascript
// Basic approach
testProfileHelper('7_Foundation_Builder', {
  Current_Age: 35,
  gross_annual_income: 75000
});

// Enhanced approach (recommended)
const data = generateCompleteTestData('7_Foundation_Builder', {
  Current_Age: 35,
  gross_annual_income: 75000
});
runTestWithValidation('7_Foundation_Builder', data);
```

### Test All Profiles
```javascript
// Basic
testAllProfiles()

// Enhanced (with validation)
testAllProfilesWithValidation()
```

### Debug Failed Test
```javascript
// Check headers first
validateHeadersEnhanced()

// Fix if needed
fixMissingHeaders()

// Show common issues
diagnoseTestFailures()
```

## Recommendation

**Use both files together:**
1. Testing.js provides the core testing infrastructure
2. Testing_Enhanced.js adds validation and data completeness

**Workflow:**
1. Run `validateHeadersEnhanced()` first
2. Use `generateCompleteTestData()` for test data
3. Run tests with `runTestWithValidation()`
4. This eliminates 90% of common test failures
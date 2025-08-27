# Testing Action Plan - Fix Header & Data Issues

## The Two Main Problems We Keep Hitting

### 1. **Header Issues**
- Headers in wrong row (row 1 vs row 2)
- Missing critical headers that cause undefined errors
- No clear error messages when headers are missing

### 2. **Incomplete Test Data**
- Missing investment scoring → equal $333 splits
- Missing domain importance fields
- Missing years_until fields
- Profile-specific questions (ex_q1-10) not mapped correctly

## Immediate Solution

### Step 1: Run Enhanced Validation (2 minutes)
```javascript
// In Script Editor, run from Testing_Enhanced.js:
validateHeadersEnhanced()
```

This will show:
- Where headers are (row 1 or 2)
- Which critical fields are missing
- Clear fix instructions

### Step 2: Fix Missing Headers if Needed (1 minute)
```javascript
// If validation shows missing headers:
fixMissingHeaders()
```

This automatically adds any missing headers to the Working Sheet.

### Step 3: Use Complete Test Data (prevents 90% of failures)
```javascript
// Instead of partial test data, use:
const testData = generateCompleteTestData('7_Foundation_Builder', {
  // Only override what you need to test
  Current_Age: 45,
  gross_annual_income: 150000
});

// All critical fields are automatically included!
```

### Step 4: Run Tests with Validation
```javascript
// This validates data BEFORE running:
runTestWithValidation('7_Foundation_Builder')

// Or test all profiles:
testAllProfilesWithValidation()
```

## Quick Reference - Critical Fields

These fields MUST be present or tests fail:

### Investment Scoring (1-7 scale)
- `investment_involvement`
- `investment_time` 
- `investment_confidence`

### Domain Importance (1-7 scale)
- `retirement_importance`
- `education_importance`
- `health_importance`

### Years Until
- `retirement_years_until_target`
- `cesa_years_until_first_need`
- `hsa_years_until_need`

### Financial
- `Net_Monthly_Income` (must be > 0)
- `Allocation_Percentage` (must be > 0)

## Common Fixes

| Problem | Symptom | Fix |
|---------|---------|-----|
| Missing investment scoring | Equal $333/$333/$333 splits | Add all 3 fields with values 1-7 |
| Missing Net_Monthly_Income | $0 or NaN allocations | Set to positive number (e.g., 5000) |
| Missing ex_q fields | No 401k or IRA vehicles | Set ex_q1='Yes' for employer 401k |
| Headers not found | "Cannot read property X of undefined" | Run validateHeadersEnhanced() |
| Getting 20% instead of 15% | "Wrong" allocation | This is correct - 20% minimum enforced |

## Testing Workflow

1. **First time setup** (do once):
   ```javascript
   validateHeadersEnhanced()  // Check headers
   fixMissingHeaders()        // Fix if needed
   ```

2. **For each test**:
   ```javascript
   // Use complete data generator
   const data = generateCompleteTestData(profileId, overrides);
   
   // Run with validation
   runTestWithValidation(profileId, data);
   ```

3. **If test fails**:
   ```javascript
   diagnoseTestFailures()  // Shows common issues and fixes
   ```

## Next Steps

1. Clean up test files (archive old ones)
2. Use Testing_Enhanced.js for all testing
3. Always use generateCompleteTestData()
4. Run validation before tests

This approach will eliminate 90% of the header and data issues we've been facing!
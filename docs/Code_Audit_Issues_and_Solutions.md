# Retirement Blueprint Code Audit - Issues and Proposed Solutions

**Date:** January 2025  
**Auditor:** System Audit  
**Status:** Issues Identified, Solutions Proposed

## Executive Summary

This document outlines critical issues discovered during a comprehensive code audit of the Retirement Blueprint system. The audit identified 10 major categories of issues ranging from critical bugs that prevent functionality to minor inconsistencies. Each issue is documented with its location, impact, and proposed solution.

## Critical Issues (Must Fix Immediately)

### 1. Profile 2 (ROBS Curious) Question Mapping Error

**Location:** `code.js` lines 1227-1229  
**Issue:** The profile helper function attempts to read from non-existent headers:
```javascript
const plannedRollover = Number(getValue(hdr, rowArr, HEADERS.P2_EX_Q1)) || 0;
const businessSavingsCapacity = Number(getValue(hdr, rowArr, HEADERS.P2_EX_Q2)) || 0;
const spouseInBusiness = getValue(hdr, rowArr, HEADERS.P2_EX_Q7) === 'Yes';
```

**Impact:** Profile 2 users will have all their extra question data read as undefined/0, breaking the allocation logic.

**Root Cause:** The FORM_EX_Q_MAPPING for Profile 2 states "No mapping needed - form puts answers in ex_q1-7 sequentially", but the code tries to use P2_EX_Q headers that don't exist.

**Proposed Solution:**
```javascript
// Change from:
const plannedRollover = Number(getValue(hdr, rowArr, HEADERS.P2_EX_Q1)) || 0;
// To:
const plannedRollover = Number(getValue(hdr, rowArr, 'ex_q1')) || 0;
```
Apply this pattern to all Profile 2 extra question reads.

### 2. Missing Function: populateVehicleRecommendationsTable

**Location:** `Generate_Document_Safe.js` line 152  
**Issue:** Function is called but never defined:
```javascript
populateVehicleRecommendationsTable(body, vehicleRecommendations);
```

**Impact:** Document generation will fail with "undefined function" error when trying to create vehicle recommendation tables.

**Proposed Solution:** Create the missing function in `Document_Narratives.js`:
```javascript
function populateVehicleRecommendationsTable(body, recommendations) {
  if (!recommendations || recommendations.length === 0) {
    return;
  }
  
  // Create table with headers
  const table = body.appendTable();
  const headerRow = table.appendTableRow();
  headerRow.appendTableCell('Vehicle');
  headerRow.appendTableCell('Current Monthly');
  headerRow.appendTableCell('Recommended Monthly');
  headerRow.appendTableCell('Increase');
  
  // Add data rows
  recommendations.forEach(vehicle => {
    const row = table.appendTableRow();
    row.appendTableCell(vehicle.name);
    row.appendTableCell(`$${vehicle.actual.toLocaleString()}`);
    row.appendTableCell(`$${vehicle.ideal.toLocaleString()}`);
    row.appendTableCell(`$${vehicle.increase.toLocaleString()}`);
  });
}
```

## High Priority Issues

### 3. Missing Vehicle in Document Generation Lists

**Location:** `Document_Narratives.js` and `Document_Narratives_Simple.js`  
**Issue:** The following vehicle exists in the spreadsheet but is missing from the document generation vehicle list:
- Group 401(k) Employer Profit Sharing

**Impact:** This vehicle won't appear in recommendation tables even if it has values.

**Proposed Solution:** Add to vehicle list after Group 401(k) - Employer:
```javascript
{ name: 'Group 401(k) - Employer Profit Sharing', 
  actual: 'retirement_group_401k_employer_profit_sharing_actual', 
  ideal: 'retirement_group_401k_employer_profit_sharing_ideal' },
```

### 4. Duplicate Column References

**Location:** `code.js` lines 3244-3246  
**Issue:** The code writes the same values to multiple columns:
```javascript
actualMap['retirement_hsa_actual'] = actualHsa;
actualMap['health_hsa_actual'] = actualHsa;
actualMap['retirement_combined_cesa_actual'] = actualCesa;
actualMap['education_combined_cesa_actual'] = actualCesa;
```

**Impact:** Data redundancy and confusion about which column is authoritative.

**Proposed Solution:** 
- Choose one domain for each vehicle (HSA → Health, CESA → Education)
- Remove duplicate column references
- Update all code to use single column reference
- Consider removing unused columns from spreadsheet

## Medium Priority Issues

### 5. Hardcoded Default Values

**Locations:**
- `code.js` line 1115: `|| 100000` (annual profit distribution)
- `code.js` line 1218: `|| 100000` (gross annual income)
- `code.js` line 2433: `100000/12` (QCD limit)

**Issue:** Magic numbers that should be constants for maintainability.

**Proposed Solution:** Add to LIMITS constant:
```javascript
const LIMITS = {
  // ... existing limits ...
  DEFAULTS: {
    ANNUAL_PROFIT_DISTRIBUTION: 100000,
    GROSS_ANNUAL_INCOME: 100000,
    QCD_ANNUAL_LIMIT: 100000
  }
};
```

### 6. Inconsistent Data Type Conversions

**Location:** Throughout `code.js`  
**Issue:** Mix of `Number()` and `parseFloat()` for numeric conversions.

**Proposed Solution:** 
- Use `Number()` consistently for all numeric conversions
- Create a utility function:
```javascript
function getNumericValue(hdr, rowArr, field, defaultValue = 0) {
  const value = getValue(hdr, rowArr, field);
  const num = Number(value);
  return isNaN(num) ? defaultValue : num;
}
```

### 7. Dynamic Vehicle Names

**Location:** `code.js` line 3362  
**Issue:** Vehicle name includes dynamic percentage:
```javascript
nonDiscretionarySeeds.Retirement[`401(k) Match Traditional (${matchPercentage})`] = matchAmount;
```

**Impact:** Makes it harder to reference vehicle consistently.

**Proposed Solution:** Use fixed name and store percentage separately:
```javascript
nonDiscretionarySeeds.Retirement['401(k) Match Traditional'] = {
  amount: matchAmount,
  note: matchPercentage
};
```

## Low Priority Issues

### 8. Column Ordering

**Issue:** Actual/ideal column pairs are not adjacent:
- `retirement_401k_match_traditional_actual` at position 120
- `retirement_401k_match_traditional_ideal` at position 149

**Proposed Solution:** Consider reorganizing columns to keep actual/ideal pairs together for easier maintenance.

### 9. Missing Error Handling

**Location:** Throughout codebase  
**Issue:** No validation that required columns exist before accessing.

**Proposed Solution:** Add header validation function:
```javascript
function validateRequiredHeaders(hdr, requiredHeaders) {
  const missing = requiredHeaders.filter(header => !hdr[header]);
  if (missing.length > 0) {
    throw new Error(`Missing required headers: ${missing.join(', ')}`);
  }
}
```

### 10. Cross-File Dependencies

**Issue:** Functions defined in Document_Narratives.js are needed elsewhere but not clearly exported/imported.

**Proposed Solution:** Create a shared utilities file or clearly document dependencies.

## Implementation Priority

1. **Immediate (Block functionality):**
   - Fix Profile 2 question mapping
   - Add populateVehicleRecommendationsTable function

2. **High (Affects accuracy):**
   - Add missing Group 401(k) Profit Sharing to document generation
   - Resolve duplicate column references

3. **Medium (Code quality):**
   - Replace hardcoded values with constants
   - Standardize data type conversions
   - Fix dynamic vehicle naming

4. **Low (Nice to have):**
   - Reorder columns
   - Add error handling
   - Document cross-file dependencies

## Testing Recommendations

After implementing fixes:

1. Test Profile 2 specifically with various extra question inputs
2. Generate documents for all 9 profiles to ensure vehicle tables work
3. Verify employer match and profit sharing appear correctly
4. Check that HSA and CESA values appear in correct domains only
5. Run full regression test suite

## Conclusion

While the system has several issues, most are straightforward to fix. The critical issues with Profile 2 and missing document generation function should be addressed immediately as they completely break functionality for affected users. The other issues, while important for code quality and accuracy, can be addressed in subsequent updates.
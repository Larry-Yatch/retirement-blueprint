# Header Management Guide

## The Problem

Header mismatches between test functions and the Working Sheet are a recurring issue that causes tests to fail. This happens because:

1. **Hardcoded header names** in test functions don't match actual Working Sheet headers
2. **Row confusion** - Headers might be in row 1 or row 2
3. **Name variations** - "Full Name" vs "Full_Name" vs "full_name"
4. **No validation** - Tests assume headers exist without checking
5. **Multiple sources of truth** - Headers defined in multiple places

## The Solution

### 1. Centralized Header Constants

Create a single source of truth for all header names:

```javascript
// Testing_HEADERS.js
const WS_HEADERS = {
  PHASE1: {
    FULL_NAME: 'Full_Name',
    CURRENT_AGE: 'Current_Age',
    WORK_SITUATION: 'Work_Situation'
    // ... etc
  },
  PHASE2: {
    FILING_STATUS: 'filing_status',
    GROSS_ANNUAL_INCOME: 'gross_annual_income'
    // ... etc
  }
};
```

### 2. Dynamic Header Validation

Always validate headers before running tests:

```javascript
function validateHeaders() {
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  const actualHeaders = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  
  // Check all expected headers exist
  const missingHeaders = [];
  Object.values(WS_HEADERS).forEach(category => {
    Object.values(category).forEach(header => {
      if (!actualHeaders.includes(header)) {
        missingHeaders.push(header);
      }
    });
  });
  
  return {
    valid: missingHeaders.length === 0,
    missingHeaders
  };
}
```

### 3. Safe Value Setting

Use helper functions that validate headers exist:

```javascript
function safeSetValue(rowArr, hdr, headerKey, value) {
  const headerName = WS_HEADERS.PHASE1[headerKey] || headerKey;
  
  if (hdr[headerName]) {
    rowArr[hdr[headerName] - 1] = value;
    return true;
  } else {
    console.warn(`Header not found: ${headerName}`);
    return false;
  }
}
```

### 4. Pre-flight Checks

Run validation before any test:

```javascript
function runTestWithValidation() {
  // Step 1: Validate headers
  const validation = validateHeaders();
  if (!validation.valid) {
    console.error('Cannot run test - missing headers:', validation.missingHeaders);
    return;
  }
  
  // Step 2: Build header map from actual sheet
  const hdr = buildHeaderMap();
  
  // Step 3: Run test
  // ... test code
}
```

## Best Practices

### 1. Never Hardcode Header Names

❌ **Bad:**
```javascript
setValueInRow(rowArr, hdr, 'Full_Name', 'Test User');
setValueInRow(rowArr, hdr, 'Current_Age', 45);
```

✅ **Good:**
```javascript
safeSetValue(rowArr, hdr, 'FULL_NAME', 'Test User');
safeSetValue(rowArr, hdr, 'AGE', 45);
```

### 2. Check Which Row Contains Headers

Working Sheet headers might be in row 1 or row 2. Always verify:

```javascript
function findHeaderRow() {
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  
  // Check row 1
  const row1 = ws.getRange(1, 1, 1, 10).getValues()[0];
  if (row1.includes('Timestamp') || row1.includes('Full_Name')) {
    return 1;
  }
  
  // Check row 2
  const row2 = ws.getRange(2, 1, 1, 10).getValues()[0];
  if (row2.includes('Timestamp') || row2.includes('Full_Name')) {
    return 2;
  }
  
  throw new Error('Could not find header row');
}
```

### 3. Document Header Changes

When headers change in the Working Sheet:

1. Update the constants file
2. Run validation to ensure all tests still work
3. Update any affected test functions
4. Commit with clear message about header changes

### 4. Use Header Snapshots

Track when headers change:

```javascript
function saveHeaderSnapshot() {
  const headers = getActualHeaders();
  PropertiesService.getScriptProperties().setProperty(
    'HEADER_SNAPSHOT', 
    JSON.stringify(headers)
  );
}

function checkForChanges() {
  const saved = JSON.parse(PropertiesService.getScriptProperties().getProperty('HEADER_SNAPSHOT'));
  const current = getActualHeaders();
  
  // Compare and alert on differences
}
```

## Implementation Checklist

When creating new test functions:

- [ ] Import header constants
- [ ] Run header validation first
- [ ] Use safeSetValue() instead of direct assignment
- [ ] Build header map dynamically from sheet
- [ ] Handle missing headers gracefully
- [ ] Document any new headers needed

## Quick Reference

### Common Headers (as of last update)

**Phase 1:**
- `Timestamp`
- `Full_Name` 
- `Email`
- `Student_ID_Last4`
- `Current_Age`
- `Work_Situation`
- `ProfileID`

**Phase 2:**
- `filing_status`
- `gross_annual_income`
- `Net_Monthly_Income`
- `Allocation_Percentage`

**Extra Questions:**
- `ex_q1` through `ex_q10`

### Debugging Header Issues

1. **Run diagnostics:**
   ```javascript
   diagnoseHeaders(); // Shows actual headers in sheet
   ```

2. **Check validation:**
   ```javascript
   const validation = validateHeaders();
   console.log(validation);
   ```

3. **Compare expected vs actual:**
   ```javascript
   checkForHeaderChanges();
   ```

## Error Messages and Solutions

### "Header not found: Full_Name"
- Check if header uses underscores or spaces
- Verify header row (1 or 2)
- Update HEADER_MAPPING constant

### "Cannot read property '1' of undefined"
- Header doesn't exist in header map
- Run validation to identify missing headers

### "getValue is not a function"
- Using wrong header name format
- Header map not properly built

## Maintenance

1. **Weekly:** Run header validation tests
2. **Before major changes:** Save header snapshot
3. **After form updates:** Update HEADER_MAPPING
4. **On test failures:** Check for header changes first

This system ensures tests are resilient to header changes and provide clear error messages when mismatches occur.
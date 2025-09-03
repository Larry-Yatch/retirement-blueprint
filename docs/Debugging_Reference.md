# Debugging Reference Guide

## Current Debugging Focus: Reprocess_Allocations.js

### Purpose
The `Reprocess_Allocations.js` file is used for debugging and reprocessing allocation engine results when issues are suspected with the standard allocation flow.

## Key Debugging Functions

### reprocessAllocations(rowNum)
Reprocesses allocations for a specific row:
```javascript
reprocessAllocations(3);  // Reprocess row 3
```

### Key Debug Points

#### 1. Profile Detection
```javascript
const profileId = getProfileFromRow(rowNum);
Logger.log(`Profile detected: ${profileId}`);
```

#### 2. Vehicle Generation
```javascript
const vehicles = profileFunction.vehicles(rowNum);
Logger.log(`Generated ${vehicles.length} vehicles`);
vehicles.forEach(v => Logger.log(`  - ${v.name}: ${v.monthlyAmount}`));
```

#### 3. Allocation Pool
```javascript
const netPool = computeNetPool(rowNum);
Logger.log(`Net pool available: $${netPool}`);
```

#### 4. Actual vs Ideal Tracking
```javascript
// Check what's being written to actual columns
Logger.log(`Actual allocations: ${JSON.stringify(actualMap)}`);
// Check what's being written to ideal columns  
Logger.log(`Ideal allocations: ${JSON.stringify(idealMap)}`);
```

## Common Debugging Scenarios

### 1. Employer Match Not Working
**Symptoms:** 401(k) match not appearing or incorrect amount
**Debug Steps:**
```javascript
// Check if employer match questions are read correctly
const hasMatch = values[HEADERS.P2_EX_Q4 - 1];  // Profile 2 example
const matchPercent = values[HEADERS.P2_EX_Q5 - 1];
Logger.log(`Has match: ${hasMatch}, Match %: ${matchPercent}`);

// Verify match calculation
const matchAmount = grossAnnual * (matchPercent / 100) / 12;
Logger.log(`Calculated match: $${matchAmount}/month`);
```

### 2. Allocation Percentage Issues
**Symptoms:** System not respecting user's allocation percentage
**Debug Steps:**
```javascript
// Check allocation percentage reading
const allocPercent = values[HEADERS.ALLOCATION_PERCENTAGE - 1];
Logger.log(`Allocation %: ${allocPercent}`);

// Verify net pool calculation
const netMonthly = values[HEADERS.NET_MONTHLY_INCOME - 1];
const expectedPool = netMonthly * (allocPercent / 100);
Logger.log(`Expected pool: $${expectedPool}, Actual pool: $${netPool}`);
```

### 3. Vehicle Priority Problems
**Symptoms:** Vehicles funded in wrong order
**Debug Steps:**
```javascript
// Log vehicle order
vehicles.forEach((v, i) => {
  Logger.log(`Priority ${i+1}: ${v.name} - Max: $${v.monthlyAmount}`);
});

// Track allocation process
let remaining = netPool;
vehicles.forEach(v => {
  const allocated = Math.min(remaining, v.monthlyAmount);
  Logger.log(`Allocating $${allocated} to ${v.name} (remaining: $${remaining})`);
  remaining -= allocated;
});
```

### 4. Missing Allocations
**Symptoms:** Some vehicles show $0 when they should have funds
**Debug Steps:**
```javascript
// Check if vehicle is in the list
const vehicleNames = vehicles.map(v => v.name);
Logger.log(`Available vehicles: ${vehicleNames.join(', ')}`);

// Check if pool exhausted
if (remaining <= 0) {
  Logger.log(`Pool exhausted before reaching all vehicles`);
}

// Check vehicle limits
vehicles.forEach(v => {
  if (v.monthlyAmount === 0) {
    Logger.log(`${v.name} has $0 limit - check calculation`);
  }
});
```

## Header Verification

### Critical Headers for Debugging
```javascript
// Phase 1 Headers
ALLOCATION_PERCENTAGE: 22
NET_MONTHLY_INCOME: 24
GROSS_ANNUAL_INCOME: 25

// Phase 2 Headers (Profile-specific)
P2_EX_Q1: 40  // Rollover balance
P2_EX_Q2: 41  // Business income  
P2_EX_Q3: 42  // Has 401k
P2_EX_Q4: 43  // Has match
P2_EX_Q5: 44  // Match percentage
P2_EX_Q6: 45  // Roth option
P2_EX_Q7: 46  // Spouse in business

// Output Headers (Actual)
RETIREMENT_SOLO_401K_ROTH_ACTUAL: 52
RETIREMENT_SOLO_401K_TRADITIONAL_ACTUAL: 53
RETIREMENT_401K_MATCH_TRADITIONAL_ACTUAL: 71

// Output Headers (Ideal)
RETIREMENT_SOLO_401K_ROTH_IDEAL: 74
RETIREMENT_SOLO_401K_TRADITIONAL_IDEAL: 75
RETIREMENT_401K_MATCH_TRADITIONAL_IDEAL: 93
```

## Debug Logging Best Practices

### 1. Use Structured Logging
```javascript
Logger.log('='.repeat(50));
Logger.log(`DEBUGGING ROW ${rowNum}`);
Logger.log('='.repeat(50));
Logger.log(`Step 1: Profile Detection`);
Logger.log(`  Profile: ${profileId}`);
Logger.log(`Step 2: Input Values`);
Logger.log(`  Gross Annual: $${grossAnnual}`);
// etc...
```

### 2. Log Key Checkpoints
- Before/after profile detection
- Before/after vehicle generation
- Before/after pool calculation
- Before/after each allocation
- Before/after writing to sheet

### 3. Use Conditional Logging
```javascript
const DEBUG = true;  // Toggle for verbose logging
if (DEBUG) {
  Logger.log(`Detailed allocation info...`);
}
```

## Testing with Reprocess_Allocations

### 1. Single Row Test
```javascript
function testSingleRow() {
  reprocessAllocations(3);  // Test specific row
  // Check logs for issues
}
```

### 2. Compare with Original
```javascript
function compareAllocations(rowNum) {
  // Save original values
  const originalActual = getRowValues(rowNum, actualColumns);
  
  // Reprocess
  reprocessAllocations(rowNum);
  
  // Get new values
  const newActual = getRowValues(rowNum, actualColumns);
  
  // Compare
  for (let i = 0; i < originalActual.length; i++) {
    if (originalActual[i] !== newActual[i]) {
      Logger.log(`Difference in ${actualColumns[i]}: ${originalActual[i]} → ${newActual[i]}`);
    }
  }
}
```

### 3. Batch Testing
```javascript
function batchReprocess() {
  const testRows = [3, 5, 7, 9];  // Test specific rows
  testRows.forEach(row => {
    Logger.log(`Testing row ${row}...`);
    reprocessAllocations(row);
  });
}
```

## Common Issues and Solutions

### Issue: "Cannot read property of undefined"
**Cause:** Header mapping incorrect or data missing
**Solution:** Verify header positions match Current_Headers.md

### Issue: "Vehicle not found"
**Cause:** Vehicle name mismatch between generation and allocation
**Solution:** Check exact vehicle names (case-sensitive)

### Issue: "Allocation exceeds pool"
**Cause:** Seeds or non-discretionary items not subtracted from pool
**Solution:** Review computeNetPool() logic

### Issue: "Wrong profile detected"
**Cause:** ProfileID column incorrect or logic flaw
**Solution:** Check getProfileFromRow() and ProfileID column value

### Issue: "Employer match not showing in documents"
**Cause:** Column values exist but not appearing in generated documents
**Solution:** 
1. Verify `Document_Narratives.js` includes match in vehicle list (line 577)
2. Check `formatVehicleRecommendations` function returns match
3. Ensure all files pushed via clasp
**Resolution:** Fixed in January 2025 - match now displays correctly

## Quick Debug Commands

```javascript
// Show all allocations for a row
showAllocations(3);

// Compare actual vs ideal
compareActualIdeal(3);

// Show vehicle priority order
showVehicleOrder('2_ROBS_Curious');

// Diagnose specific profile
diagnoseProfile('4_Roth_Reclaimer');

// Check header mappings
verifyHeaders();

// Test allocation math
testAllocationMath(3);
```

## When to Use Reprocess_Allocations

Use this debugging tool when:
1. Suspecting allocation engine issues
2. Testing fixes without running full form submission
3. Comparing before/after states
4. Isolating profile-specific problems
5. Verifying employer match calculations
6. Testing allocation percentage changes
7. Debugging vehicle priority issues

---

*Last Updated: January 2025*
*For use during debugging phase*
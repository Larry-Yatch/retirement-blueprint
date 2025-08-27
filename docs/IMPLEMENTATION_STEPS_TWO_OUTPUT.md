# Implementation Steps: Two-Output System (Actual vs Ideal)

*Created: August 27, 2025*

## Overview
Transform the current "additional %" system to a "total %" system with two outputs: Actual (current state) and Ideal (recommended state).

## Phase 1: Update Form Questions (Minimal Risk)

### Step 1.1: Update Allocation Percentage Question
**File**: Phase 1 Form (Google Forms)
**Current Question**: 
> "What percentage of your monthly take-home pay would you like to invest each month, in addition to what you're already contributing to existing accounts?"

**New Question**:
> "What TOTAL percentage of your monthly take-home pay would you like to save for retirement, education, and health goals?
> 
> Enter your desired total savings rate (we'll enforce a minimum of 20%). 
> Note: We'll automatically add any non-discretionary items like ROBS distributions or employer matches on top of this percentage."

### Step 1.2: Add Clarification to Profile-Specific Questions
For profiles with non-discretionary items, add notes:
- **Profile 1 ex_q6**: Add "NOTE: These distributions will be added ON TOP of your savings percentage"
- **Profile 3 ex_q4-6**: Add "NOTE: Employer contributions may be added ON TOP of your savings percentage"
- **Profile 8 ex_q6**: Add "NOTE: Required contributions will be added ON TOP of your savings percentage"

---

## Phase 2: Code Infrastructure Updates

### Step 2.1: Add New Header Constants
**File**: Code.js
**Location**: HEADERS object (~line 2400)
```javascript
// Add new headers for current contributions
CURRENT_MONTHLY_HSA:           'Current_Monthly_HSA_Contribution',
CURRENT_MONTHLY_EDUCATION:     'Current_Monthly_Education_Contribution',  
CURRENT_MONTHLY_RETIREMENT:    'Current_Monthly_Retirement_Contribution',
```

### Step 2.2: Create Dual Calculation Functions
**File**: Code.js
**Location**: After existing helper functions (~line 3200)
```javascript
/**
 * Calculate ACTUAL allocations based on current contributions
 */
function calculateActualAllocations(rowArr, hdr) {
  const actual = {
    Education: {},
    Health: {},
    Retirement: {}
  };
  
  // Pull universal current contributions
  const currentHSA = Number(getValue(hdr, rowArr, HEADERS.CURRENT_MONTHLY_HSA)) || 0;
  const currentEducation = Number(getValue(hdr, rowArr, HEADERS.CURRENT_MONTHLY_EDUCATION)) || 0;
  const currentRetirement = Number(getValue(hdr, rowArr, HEADERS.CURRENT_MONTHLY_RETIREMENT)) || 0;
  
  // Add to actual
  if (currentHSA > 0) actual.Health['Current HSA'] = currentHSA;
  if (currentEducation > 0) actual.Education['Current Education'] = currentEducation;
  if (currentRetirement > 0) actual.Retirement['Current Retirement'] = currentRetirement;
  
  // Add profile-specific actuals (varies by profile)
  // This will be handled in each profile helper
  
  return actual;
}

/**
 * Calculate IDEAL allocations based on total desired percentage
 */
function calculateIdealAllocations(rowArr, hdr, nonDiscretionarySeeds) {
  // This will use the new computeNetPoolTotal function
  const netIncome = Number(getValue(hdr, rowArr, HEADERS.NET_MONTHLY_INCOME));
  const totalPercent = Number(getValue(hdr, rowArr, HEADERS.ALLOCATION_PERCENTAGE)) || 0;
  
  // Calculate discretionary pool (total % of income)
  const discretionaryPool = netIncome * Math.max(totalPercent / 100, 0.20);
  
  // Run allocation engine with discretionary pool
  // Add non-discretionary seeds on top
  
  return ideal;
}
```

### Step 2.3: Modify computeNetPool Function
**File**: Code.js
**Location**: ~line 3226
```javascript
/**
 * NEW: Computes discretionary allocation pool based on TOTAL desired percentage
 */
function computeNetPoolTotal(netIncome, totalUserPct, minRate = 0.20) {
  // User's total desired savings rate
  const targetRate = Math.max(totalUserPct / 100, minRate);
  
  // Calculate total discretionary pool
  const discretionaryPool = netIncome * targetRate;
  
  return discretionaryPool;
}

// Keep old function for backward compatibility during transition
function computeNetPoolLegacy(netIncome, seeds, userPct, defaultRate) {
  // Existing implementation
}
```

---

## Phase 3: Update Profile Helpers

### Step 3.1: Modify Seed Strategy for Each Profile
For each profile helper, separate discretionary and non-discretionary seeds:

**Example - Profile 1 (ROBS In Use)**:
```javascript
'1_ROBS_In_Use': function(rowArr, hdr) {
  // ... existing code ...
  
  // ACTUAL calculations (all current contributions)
  const actualSeeds = calculateActualAllocations(rowArr, hdr);
  
  // Add profile-specific actuals
  if (annualProfitDistribution > 0) {
    actualSeeds.Retirement['ROBS Profit Distribution'] = annualProfitDistribution / 12;
  }
  
  // IDEAL calculations (only non-discretionary)
  const nonDiscretionarySeeds = { Education: {}, Health: {}, Retirement: {} };
  
  // ROBS distributions are non-discretionary
  if (annualProfitDistribution > 0) {
    nonDiscretionarySeeds.Retirement['ROBS Solo 401(k) – Profit Distribution'] = annualProfitDistribution / 12;
  }
  
  // Return both sets
  return {
    actual: actualSeeds,
    nonDiscretionary: nonDiscretionarySeeds,
    vehicleOrders: {
      Education: educationOrder,
      Health: healthOrder,
      Retirement: retirementOrder
    }
  };
}
```

### Step 3.2: Update All 9 Profile Helpers
Apply similar pattern to all profiles:
- Profile 1: ROBS distributions = non-discretionary
- Profile 2: Only employer match = non-discretionary
- Profile 3: Employer portion only = non-discretionary
- Profile 4-7,9: Employer matches = non-discretionary
- Profile 8: Required DB/Safe Harbor = non-discretionary

---

## Phase 4: Update Engine and Output

### Step 4.1: Modify runUniversalEngine
**File**: Code.js
**Location**: ~line 3253
```javascript
function runUniversalEngine(rowNum) {
  // ... existing setup ...
  
  // Get both actual and ideal calculations from profile helper
  const { actual, nonDiscretionary, vehicleOrders } = helper(rowArr, hdr);
  
  // Calculate ACTUAL total
  const actualResults = {
    domains,
    vehicles: actual,
    total: sumAllVehicles(actual)
  };
  
  // Calculate IDEAL allocations
  const discretionaryPool = computeNetPoolTotal(netIncome, userPercent);
  const idealRaw = coreAllocate({ 
    domains, 
    pool: discretionaryPool, 
    seeds: {}, // No seeds for discretionary allocation
    vehicleOrders 
  });
  
  // Add non-discretionary on top of ideal
  const idealResults = combineAllocations(idealRaw, nonDiscretionary);
  
  return {
    actual: actualResults,
    ideal: idealResults,
    gap: calculateGap(actualResults, idealResults)
  };
}
```

### Step 4.2: Update Output/Reporting
Create new output format showing both:
```
CURRENT ALLOCATIONS (What you're doing today):
- Current HSA: $200/mo
- Current Education: $300/mo  
- Current 401(k): $500/mo
- ROBS Distributions: $4,000/mo
TOTAL CURRENT: $5,000/mo (50% of income)

RECOMMENDED ALLOCATIONS (Our ideal recommendation):
- HSA: $358/mo
- CESA: $333/mo
- 401(k): $1,309/mo (employee portion)
- ROBS Distributions: $4,000/mo (required)
TOTAL RECOMMENDED: $6,000/mo (60% of income)

ACTION NEEDED:
- Increase HSA by $158/mo
- Increase Education by $33/mo
- Increase 401(k) by $809/mo
- Total increase needed: $1,000/mo
```

---

## Phase 5: Testing

### Step 5.1: Update Test Data
- Change allocation percentages to represent total desired rate
- Remove expectation of "additional" calculations
- Update expected results

### Step 5.2: Test Each Profile
1. Run with current system to establish baseline
2. Implement changes for one profile
3. Verify Actual matches current contributions
4. Verify Ideal matches total % + non-discretionary
5. Repeat for all profiles

### Step 5.3: Edge Cases
- Test with 0% allocation (should still show non-discretionary)
- Test with very high allocation %
- Test with missing current contribution data

---

## Phase 6: Documentation and Communication

### Step 6.1: Update User Documentation
- Explain Actual vs Ideal
- Clarify total % vs additional
- Show examples for each profile

### Step 6.2: Update Technical Documentation
- Document the dual calculation system
- Update API/integration docs
- Create migration guide

---

## Implementation Order (Risk Management)

### Week 1: Foundation
1. Update form questions (low risk)
2. Create new calculation functions (no impact yet)
3. Update one profile (e.g., Profile 7) as pilot

### Week 2: Rollout
4. Test pilot profile thoroughly
5. Update remaining profiles
6. Update engine to use new calculations

### Week 3: Polish
7. Update output/reporting
8. Complete documentation
9. Full system testing

---

## Rollback Plan

If issues arise:
1. Keep legacy computeNetPool function
2. Add feature flag to toggle between systems
3. Can revert form questions while keeping code
4. Profile helpers can return old format if needed

---

## Success Metrics

1. Actual allocations = Sum of all current contributions
2. Ideal allocations = Total % of income + non-discretionary
3. No more 2-3x over-allocation surprises
4. User feedback confirms expectations are met
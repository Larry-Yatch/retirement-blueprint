# Phase 1: Testing Actual/Ideal Outputs

## What Needs Testing

Since form submissions are already writing to the correct columns, we need to test:

### 1. **Actual Values Collection**
- Verify Phase 2 form data is correctly read and written to `_actual` columns
- Test profile-specific actual calculations (employer matches, ROBS distributions, etc.)
- Ensure all actual columns are populated (even if 0)

### 2. **Ideal Values Calculation**
- Verify allocation engine results are written to `_ideal` columns
- Test non-discretionary additions (matches, required distributions)
- Confirm Family Bank ideal captures overflow correctly

### 3. **Key Test Scenarios**

#### Profile 1 (ROBS In Use)
- **Actual**: Current HSA, CESA, 401k contributions + ROBS distributions
- **Ideal**: Engine allocations + ROBS distributions (non-discretionary)
- **Test**: ROBS distributions appear in both actual and ideal

#### Profile 2 (ROBS Curious) with W-2
- **Actual**: Current contributions + calculated employer match
- **Ideal**: Engine allocations + employer match (non-discretionary)
- **Test**: Employer match calculated correctly from gross income

#### Profile 3 (Solo 401k Builder)
- **Actual**: Employee and employer contributions from form
- **Ideal**: Engine allocations + employer portion (non-discretionary)
- **Test**: Employee/employer split handled correctly

## How to Test

### Option 1: Use Test Functions (Recommended)
```javascript
// In Script Editor, run:
testAllProfilesActualIdeal()

// Or test individual profiles:
testProfile1ActualIdeal()  // ROBS with distributions
testProfile2ActualIdeal()  // W-2 with employer match
testProfile3ActualIdeal()  // Solo 401k with employer contrib
```

### Option 2: Manual Testing
1. Submit a Phase 1 form for a test user
2. Get the Phase 2 link and submit with known values
3. Check Working Sheet to verify:
   - Actual columns show form values
   - Ideal columns show recommendations
   - Total ideal matches expected percentage

### Option 3: Check Existing Data
1. Find a row with completed Phase 2 data
2. Verify actual columns contain user's current contributions
3. Verify ideal columns contain engine recommendations + non-discretionary

## What to Look For

### ✅ Good Signs:
- Actual values match Phase 2 form inputs
- Ideal values include both discretionary and non-discretionary
- Family Bank ideal contains remainder
- Total ideal ≈ Net Income × Allocation %
- Non-discretionary items appear in ideal even if not in actual

### ❌ Problem Indicators:
- Actual columns all $0 (form data not captured)
- Ideal missing non-discretionary items (matches, distributions)
- Family Bank ideal negative or missing
- Total ideal way off from expected percentage
- Actual/ideal values identical (calculation issue)

## Critical Calculations to Verify

### 1. Employer Match Calculation
```
Match = Gross Income × Match % × Match Rate / 12
Example: $100,000 × 3% × 100% / 12 = $250/month
```

### 2. Total Percentage Logic (New)
```
Discretionary = Net Income × Allocation %
Total Ideal = Discretionary + Non-discretionary
Family Bank = Total Ideal - Sum of all allocations
```

### 3. Profile-Specific Non-Discretionary
- **Profile 1**: ROBS distributions (ex_q6 / 12)
- **Profile 3**: Solo 401k employer (ex_q5 / 12)
- **Profiles 2,4,5,6,7,9**: Employer match (calculated)

## Next Steps

1. **Run test functions** to verify actual/ideal calculations
2. **Check a few real submissions** if available
3. **Document any issues** found
4. **Move to Phase 2** (future value calculations) once verified

## Key Functions to Review

- `handlePhase2()` - Main processing function
- `buildActualMap` section - Collects actual values
- `calculateEmployerMatch()` - Match calculation
- `computeNetPoolTotal()` - New total percentage logic
- Lines where `setValue` writes to `_actual` and `_ideal` columns
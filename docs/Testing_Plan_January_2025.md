# Testing Plan for Untested Profiles
**Created: January 2025**

## Overview
I've created comprehensive test scenarios for all profiles that need testing. The new `Testing_Scenarios.js` file contains complete test data for profiles 1, 3, 4, 5, 6, 8, and 9.

## Test Order (Recommended)

### 1. Profile 1: ROBS In Use
- **Scenarios**: Active ROBS with distributions, Planning ROBS startup
- **Key Tests**: ROBS distribution seeding, C-Corp vs planning status
- **Run**: `testProfile1All()`

### 2. Profile 3: Solo 401k Builder
- **Scenarios**: Sole Proprietor, S-Corp with existing Solo 401k
- **Key Tests**: Entity type calculations (20% vs 25%), catch-up at 52
- **Run**: `testProfile3All()`

### 3. Profile 4: Roth Reclaimer (Debug)
- **Scenarios**: Clean backdoor (no IRA), Pro-rata complications
- **Key Tests**: Backdoor Roth triggering, allocation calculations
- **Run**: `testProfile4Enhanced()`
- **Note**: Known issues with allocation - this will help diagnose

### 4. Profile 5: Bracket Strategist
- **Scenarios**: High bracket W-2, Business owner managing brackets
- **Key Tests**: Traditional prioritization, high income handling
- **Run**: `testProfile5All()`

### 5. Profile 6: Catch-Up
- **Scenarios**: Age 50-59 catch-up, Age 60+ enhanced catch-up
- **Key Tests**: All catch-up limits (401k, IRA, HSA at 55+)
- **Run**: `testProfile6All()`

### 6. Profile 8: Biz Owner Group (Priority - Fixed Today)
- **Scenarios**: Small group (5 employees), DB plan candidate (age gap)
- **Key Tests**: DB calculations, safe harbor guidance, HSA position
- **Run**: `testProfile8All()`

### 7. Profile 9: Late Stage Growth
- **Scenarios**: Phased retirement (Both), Final push W-2
- **Key Tests**: Near-retirement optimization, catch-up maximization
- **Run**: `testProfile9All()`

## How to Run Tests

1. **Individual Profile Testing**:
   ```javascript
   // In Script Editor, run:
   testProfile1All()  // Replace with desired profile
   ```

2. **Test All Profiles**:
   ```javascript
   testAllUntestedProfiles()
   ```

3. **Add Test Menu**:
   ```javascript
   testUntestedProfilesMenu()
   // Then use Extensions > Test Untested Profiles menu
   ```

## What to Look For

### ✅ Good Signs:
- Total allocation matches expected percentage
- Vehicles appear in correct priority order
- Catch-up contributions applied correctly
- Domain balance reflects importance scores
- Seeds populated for existing contributions

### ❌ Problem Indicators:
- $0 or NaN allocations
- Missing expected vehicles (e.g., Backdoor Roth for high income)
- Equal $333 splits (missing scoring fields)
- Total allocation significantly over/under target
- Vehicles with capacity but no allocation

## Test Data Structure

Each scenario includes:
- **Phase 1 Data**: Demographics, income, tax preferences, scoring (1-7 scales)
- **Phase 2 Data**: Profile-specific questions (ex_q1-q8)
- **Critical Fields**: Investment scoring, domain importance, years until need

All scenarios use realistic combinations to test edge cases:
- Income levels that trigger phase-outs
- Ages that trigger catch-up contributions
- Employment situations (W-2, Self, Both)
- Various family situations

## Next Steps After Testing

1. **Document Results**: Note any failures or unexpected behavior
2. **Debug Issues**: Use `diagnoseProfile()` and `showVehicleOrder()` helpers
3. **Fix Problems**: Update profile helper code as needed
4. **Retest**: Verify fixes work across all scenarios
5. **Update Documentation**: Keep profile markdown files current

## Priority Focus

Given the timeline:
1. **Test Profile 8 first** (just fixed today)
2. **Debug Profile 4** (known allocation issues)
3. **Verify catch-up profiles** (6 and 9) work correctly
4. **Test remaining profiles** (1, 3, 5)

Remember: The allocation engine works for profiles 2 and 7, so issues are likely in the profile helper implementations themselves.
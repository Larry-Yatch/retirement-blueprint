# Vehicle Order Implementation Changes

This document outlines the specific changes needed to implement the updated vehicle orders in the Code.js profile helper functions.

## Overview

Based on retirement best practices review, the following changes were made to optimize vehicle orders across all profiles:
- HSA moved higher in priority due to triple tax advantage
- Removed duplicate vehicles
- Added new vehicles for sophisticated strategies
- Maintained Family Bank as final overflow vehicle

## Profile-Specific Implementation Changes

### Profile 1: ROBS In Use (Lines 949-1032)
**Change**: Move HSA up in retirement vehicle order

**Current Order**:
1. ROBS Solo 401(k) – Profit Distribution
2. ROBS Solo 401(k) – Roth
3. ROBS Solo 401(k) – Traditional
4. HSA
5. Roth IRA
6. Family Bank

**New Order**:
1. ROBS Solo 401(k) – Profit Distribution
2. ROBS Solo 401(k) – Roth
3. **HSA** (moved up)
4. ROBS Solo 401(k) – Traditional
5. Roth IRA
6. Family Bank

### Profile 2: ROBS Curious ✅
**Status**: No changes needed - already well-tuned with dynamic ordering

### Profile 3: Solo 401(k) Builder ✅
**Status**: Consider moving HSA before Solo 401(k) Employer portion (optional enhancement)

### Profile 4: Roth Reclaimer (Lines 1122-1211)
**Change**: Remove duplicate Traditional 401(k) vehicle

**Current Issue**: Both "401(k) Traditional" and "Traditional 401(k)" appear in order

**New Order**:
1. 401(k) Match Traditional
2. HSA (already well-positioned)
3. 401(k) Roth
4. Backdoor Roth IRA
5. Mega Backdoor Roth
6. Traditional IRA (removed duplicate 401(k) Traditional)
7. Family Bank

### Profile 5: Bracket Strategist (Lines 1213-1295)
**Change**: Move HSA up after employer match

**Current Position**: HSA is 4th in order
**New Position**: HSA should be 2nd (after match, before Traditional 401(k))

### Profile 6: Catch Up (Lines 1296-1378)
**Change**: Move HSA up after employer match

**Current Position**: HSA is 3rd in order
**New Position**: HSA should be 2nd (after match, before 401(k) Catch-Up)

### Profile 7: Foundation Builder ✅
**Status**: No changes needed - dynamic employer integration works perfectly

### Profile 8: Biz Owner Group (Lines 1446-1528)
**Changes**: Add two new vehicles

**Additions**:
1. **Cash Balance Plan** - After HSA, before Backdoor Roth IRA
   - Conditions: If age 45+ and want DB benefits with DC-like structure
   - Capacity: Varies by age (similar to DB plan calculations)

2. **After-Tax 401(k) → Mega Backdoor Roth** - After Backdoor Roth IRA
   - Conditions: If plan allows after-tax contributions and in-service conversions
   - Capacity: Up to $70,000 total limit minus other contributions

**New Order**:
1. Defined Benefit Plan
2. Group 401(k) – Employee
3. Group 401(k) – Employer Profit Sharing
4. HSA (consider moving up)
5. **Cash Balance Plan** (NEW)
6. Backdoor Roth IRA
7. **After-Tax 401(k) → Mega Backdoor Roth** (NEW)
8. Family Bank

### Profile 9: Late Stage Growth (Lines 1545-1627)
**Changes**: Move HSA up and add two strategy vehicles

**Current Position**: HSA is 3rd in order
**New Position**: HSA should be 2nd (after match, before 401(k) Catch-Up)

**Additions**:
1. **Roth Conversions** - After 401(k) Catch-Up
   - Not a contribution vehicle but a strategy placeholder
   - Amount: Strategic based on tax bracket management

2. **Qualified Charitable Distribution Planning** - Before Family Bank
   - Available at age 70.5+
   - Up to $100,000/year direct to charity

**New Order**:
1. 401(k) Match
2. **HSA** (moved up)
3. 401(k) Catch-Up
4. **Roth Conversions** (NEW - strategy placeholder)
5. IRA Catch-Up
6. Backdoor Roth IRA Catch-Up
7. **QCD Planning** (NEW - for age 70.5+)
8. Family Bank

## Implementation Notes

### Code Structure
Each profile helper function builds arrays for each domain:
```javascript
let educationOrder = [];
let healthOrder = [];
let retirementOrder = [];
```

### HSA Positioning
When moving HSA up in retirement order, ensure it maintains its capacity calculation:
```javascript
const hsaMonthlyCapacity = calculateHsaMonthlyCapacity(age, hsaType);
```

### New Vehicle Templates

#### Cash Balance Plan (Profile 8)
```javascript
{
  vehicle: 'Cash Balance Plan',
  capacity: calculateCashBalanceCapacity(age), // New function needed
  taxTreatment: 'Traditional',
  domain: 'retirement'
}
```

#### Mega Backdoor Roth (Profile 8)
```javascript
{
  vehicle: 'After-Tax 401(k) → Mega Backdoor Roth',
  capacity: 70000/12 - other401kContributions, // Calculate remaining space
  taxTreatment: 'Roth',
  domain: 'retirement'
}
```

#### Roth Conversions (Profile 9)
```javascript
{
  vehicle: 'Roth Conversions',
  capacity: 'Strategic', // Not a fixed amount
  taxTreatment: 'Conversion',
  domain: 'retirement'
}
```

#### QCD Planning (Profile 9)
```javascript
if (age >= 70.5) {
  retirementOrder.push({
    vehicle: 'Qualified Charitable Distribution Planning',
    capacity: Math.min(100000/12, rmdAmount), // Up to $100k/year
    taxTreatment: 'Tax-Free',
    domain: 'retirement'
  });
}
```

## Testing Requirements

After implementation:
1. Test each profile with standard scenarios
2. Verify HSA maintains proper capacity calculations
3. Ensure new vehicles only appear when conditions are met
4. Confirm Family Bank remains as final vehicle
5. Test edge cases (age thresholds, income limits)

## Priority Implementation Order

1. **High Priority**: Fix Profile 4 duplicate (bug fix)
2. **Medium Priority**: Move HSA up in Profiles 1, 5, 6, 9
3. **Low Priority**: Add new vehicles to Profiles 8 and 9

## Employment-Based Logic Implementation

### New Profiles Requiring Employment Logic
Based on the analysis, four additional profiles need employment-based dynamic vehicle ordering:

#### Profile 4: Roth Reclaimer
- **Why**: Users could be W-2 employees with 401(k) access or self-employed with Solo 401(k)
- **Implementation**: Branch logic based on Work_Situation field
- **Key Difference**: W-2 gets mega backdoor potential, Self-employed gets Solo 401(k)

#### Profile 5: Bracket Strategist  
- **Why**: Tax optimizers often have multiple income sources
- **Implementation**: Similar to Profile 2 logic
- **Key Difference**: Traditional vehicle focus regardless of employment type

#### Profile 6: Catch Up
- **Why**: Age 50+ often have mixed employment (phasing out W-2, starting consulting)
- **Implementation**: Maximize catch-up across all available sources
- **Key Difference**: Coordinate catch-up limits across multiple plans

#### Profile 9: Late Stage Growth
- **Why**: Near-retirees commonly have phased retirement with both W-2 and consulting
- **Implementation**: Handle retired, employed, and mixed scenarios
- **Key Difference**: Include Roth conversions and QCD planning

### Implementation Pattern
All four profiles should follow the Profile 2 pattern:
1. Check Work_Situation at profile start
2. Generate base vehicles (HSA, IRAs, etc.)
3. Branch to add employment-specific vehicles
4. For "Both" scenario, coordinate contribution limits

### Form Question Requirements
Add to all four profiles:
- "What is your work situation?" (W-2 employee / Self-employed / Both)
- Consider profile-specific additions (e.g., "Are you doing consulting?" for Profile 9)

## Notes
- All vehicles can be self-directed (client preference)
- Family Bank remains the final overflow vehicle in all profiles
- Profiles 2, 3, and 7 already have appropriate employment logic
- Profile 1 (ROBS) and 8 (Biz Owner Group) don't need this logic due to their specific nature
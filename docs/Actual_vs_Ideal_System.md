# Actual vs Ideal Output System

*Last Updated: November 27, 2024*

## Overview

The Retirement Blueprint system now implements a two-output system that shows users:
1. **Actual** - What they are currently contributing
2. **Ideal** - What we recommend they contribute

The most significant change is that **allocation percentage now represents the TOTAL savings rate** users want, not additional savings on top of existing contributions.

## Key Concept: Total vs Additional

### Before (Old System)
- User's allocation % was treated as ADDITIONAL to existing contributions
- Example: User with $4,000/mo ROBS distributions requesting 25%
  - System calculated: $4,000 (existing) + $2,500 (25% additional) = $6,500/mo
  - Result: 2-3x over-allocation for profiles with seeds

### After (Current System)
- User's allocation % is treated as their TOTAL desired savings rate
- Example: User with $4,000/mo ROBS distributions requesting 25%
  - System calculates: $2,500 (25% total discretionary)
  - Plus non-discretionary: $4,000 (ROBS distributions)
  - Result: $2,500 discretionary + $4,000 non-discretionary = $6,500/mo ideal

## Implementation Details

### 1. New Total Percentage Calculation

```javascript
function computeNetPoolTotal(netIncome, discretionarySeeds, userPct, defaultRate) {
  const targetRate = Math.max(userPct / 100, defaultRate);
  const discretionaryPool = netIncome * targetRate;
  return discretionaryPool;
}
```

This replaces the old `computeNetPool` function when the feature flag is enabled.

### 2. Feature Flag

```javascript
const useNewLogic = true; // Set to false to revert to old behavior
```

Located in `runUniversalEngine` function around line 3309 in Code.js.

### 3. Actual vs Ideal Columns

The system populates two sets of columns in the Working Sheet:

#### Actual Columns (`_actual`)
Show what users currently contribute based on Phase 2 form responses:
- `health_hsa_actual`
- `retirement_traditional_401k_actual`
- `education_combined_cesa_actual`
- Profile-specific actuals (e.g., `retirement_robs_solo_401k_profit_distribution_actual`)

#### Ideal Columns (`_ideal`)
Show our recommendations:
- All discretionary allocations from the engine
- Plus non-discretionary additions (employer matches, ROBS distributions)
- Example: `retirement_traditional_401k_ideal`, `health_hsa_ideal`

## Discretionary vs Non-Discretionary

### Discretionary Contributions
User-controlled voluntary savings that count toward their total percentage:
- Personal 401(k) contributions
- IRA contributions
- HSA contributions (if voluntary)
- CESA contributions

### Non-Discretionary Contributions
Automatic or required contributions added ON TOP of the total percentage:
- **Profile 1**: ROBS profit distributions
- **Profile 3**: Solo 401(k) employer contributions
- **Profiles 2,4,5,6,7,9**: Employer 401(k) matches
- **Profile 8**: Required group plan contributions

## Profile-Specific Behavior

### Profile 1: ROBS In Use
- Non-discretionary: ROBS profit distributions (from `ex_q6`)
- User's % applies to remaining income after distributions

### Profile 3: Solo 401k Builder
- Non-discretionary: Employer portion of Solo 401(k) (from `ex_q5`)
- User's % determines employee contribution

### Profiles with Employer Match (2,4,5,6,7,9)
- Non-discretionary: Employer match amount
- Calculated using `calculateEmployerMatch` function
- Added on top of user's total percentage

## Form Question Updates

All forms have been updated to clarify the new behavior:

**Old Question**: "What percentage of your income would you like to save?"

**New Question**: "What TOTAL percentage of your income would you like to save for retirement, education, and health (including your current contributions listed above)? This will be your target savings rate."

## Testing the System

### Test Functions

1. **Test new logic is enabled**:
```javascript
validateNewLogicEnabled()
```

2. **Test actual vs ideal calculation**:
```javascript
testNewActualIdealLogic()
```

3. **Test Phase 2 generation**:
```javascript
testPhase2ActualIdealWriting()
```

### Expected Behavior

For a user with:
- $10,000/month income
- 25% total savings goal
- $4,000/month ROBS distributions

**Actual columns show**:
- Current HSA: $200
- Current 401k: $500
- ROBS: $4,000
- Total: $4,700

**Ideal columns show**:
- Recommended allocations: $2,500 (25% of income)
- Plus ROBS: $4,000 (non-discretionary)
- Total: $6,500

## Known Limitations

1. **Employer match ideal column**: May need to add `retirement_401k_match_traditional_ideal` column to spreadsheet
2. **Phase 2 testing**: Full testing requires actual form submission (not fully automated)
3. **Some ideal totals appear low**: Due to missing match column in some cases

## Migration Notes

### No Database Changes Required
- The system uses existing `_actual` and `_ideal` columns
- No spreadsheet structure changes needed

### Rollback Plan
If issues arise, set the feature flag to false:
```javascript
const useNewLogic = false; // Reverts to old behavior
```

## Impact on Users

### Positive Changes
1. More intuitive: Users think in terms of total savings rate
2. Prevents over-allocation: No more 2-3x recommended amounts
3. Clearer communication: Forms explicitly state "total percentage"

### User Education Needed
1. Existing users may need explanation of the change
2. Form questions now clearly state the behavior
3. Email reports will show both actual and ideal

## Future Enhancements

1. **Add missing ideal columns**: Specifically for employer match vehicles
2. **Automated testing**: Extract Phase 2 logic for better test coverage
3. **User dashboard**: Visual representation of actual vs ideal
4. **Progress tracking**: Show users how close they are to ideal

## Technical Reference

### Key Functions
- `computeNetPoolTotal()`: Calculates discretionary pool based on total percentage
- `calculateEmployerMatch()`: Computes employer match amounts
- `handlePhase2()`: Populates actual and ideal columns after form submission

### Key Variables
- `useNewLogic`: Feature flag for new behavior
- `nonDiscretionarySeeds`: Seeds that don't count toward user's percentage
- `actualMap`: Object holding current contribution values
- `idealMap`: Object holding recommended values

## Support

For questions or issues:
1. Check the feature flag status
2. Verify form questions have been updated
3. Test with `testNewActualIdealLogic()`
4. Review this documentation

The actual vs ideal system represents a fundamental improvement in how we calculate and communicate savings recommendations, making the system more intuitive and preventing the over-allocation issues that affected profiles with existing contributions.
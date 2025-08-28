# Profile 4 Roth Phase-Out Fix

## Issue Found
Profile 4 (Roth Reclaimer) was showing regular Roth IRA for high-income earners ($250k/$300k) when it should have been using Backdoor Roth IRA.

## Root Cause
The logic to check if direct Roth contributions are allowed was incorrect:

```javascript
// INCORRECT (line 1393):
const canDoDirectRoth = rothPhaseout.length > 0 && rothPhaseout[0].capMonthly > 0;
```

This always returned `true` because `applyRothIRAPhaseOut()` returns an array with Backdoor Roth IRA when income is above phase-out limits.

## Fix Applied
Changed the logic to specifically check if 'Roth IRA' is still in the vehicle list:

```javascript
// CORRECT (line 1393):
const canDoDirectRoth = rothPhaseout.some(v => v.name === 'Roth IRA');
```

## Phase-Out Limits (2025)
- **Single**: Phase-out starts at $146,000, complete at $161,000
- **Married Filing Jointly**: Phase-out starts at $230,000, complete at $240,000

## Expected Behavior After Fix

### Scenario 1: Single, $250k income
- **Before Fix**: Regular Roth IRA shown
- **After Fix**: Backdoor Roth IRA shown with appropriate notes

### Scenario 2: Married, $300k income  
- **Before Fix**: Regular Roth IRA shown
- **After Fix**: Backdoor Roth IRA shown with pro-rata tax notes if IRA balance exists

### Scenario 3: Single, $120k income
- **Before Fix**: Regular Roth IRA shown
- **After Fix**: Regular Roth IRA shown (correct - below phase-out)

## Testing
Created `Test_Profile4_Direct.js` to verify the fix works correctly for various income scenarios.

## Impact
This fix ensures Profile 4 correctly guides high-income earners to use the Backdoor Roth IRA strategy when their income exceeds IRS phase-out limits.
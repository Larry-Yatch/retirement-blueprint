# Tax Preference Logic Testing Instructions

## Test Implementation Summary
✅ **Tax preference logic successfully implemented across all 9 profile helpers**

The following helpers now support Tax_Minimization field values:
- **'Now'**: Prioritizes Traditional/401k accounts for current tax deductions
- **'Later'**: Prioritizes Roth accounts for tax-free growth  
- **'Both'**: Maintains balanced/original order

## Test Profiles in TestData Sheet

Each profile has different Tax_Minimization values for comprehensive testing:

| Profile | Tax_Minimization | Expected Behavior |
|---------|------------------|-------------------|
| 1_ROBS_In_Use | 'Both' | Balanced order |
| 2_ROBS_Curious | 'Later' | Roth accounts first |
| 3_Solo401k_Builder | 'Now' | Traditional accounts first |
| 4_Roth_Reclaimer | 'Both' | Balanced order |
| 5_Bracket_Strategist | 'Now' | Traditional accounts first |
| 6_Catch_Up | 'Later' | Roth accounts first |
| 7_Foundation_Builder | 'Later' | Roth accounts first |
| 8_Biz_Owner_Group | 'Now' | Traditional accounts first |
| 9_Late_Stage_Growth | 'Both' | Balanced order |

## Manual Testing Steps

1. **Open the retirement blueprint spreadsheet**
2. **Go to Working Sheet**
3. **Run any profile helper test function** (e.g., `test_3_Solo401k_Builder()`)
4. **Check retirement vehicle order** in the results
5. **Verify tax preference is applied correctly**

## Verification Commands in Apps Script

```javascript
// Test different tax preferences
test_3_Solo401k_Builder() // Tax_Minimization: 'Now' - should prioritize Traditional
test_2_ROBS_Curious()     // Tax_Minimization: 'Later' - should prioritize Roth  
test_4_Roth_Reclaimer()   // Tax_Minimization: 'Both' - should use balanced order

// Run comprehensive test
testAllProfileHelpersWithUniversalEngine()
```

## Expected Results

For **'Now' preference** (Traditional first):
- Traditional 401k/IRA accounts should appear before Roth accounts
- Example order: Traditional 401k → HSA → Roth IRA → Roth 401k

For **'Later' preference** (Roth first):
- Roth accounts should appear before Traditional accounts  
- Example order: Roth IRA → Roth 401k → HSA → Traditional 401k

For **'Both' preference** (Balanced):
- Original profile-specific order maintained
- No reordering based on account type

## Key Implementation Details

- All 9 helpers use `baseRetirementOrder` pattern
- Tax preference read from `HEADERS.TAX_MINIMIZATION`
- `prioritizeTraditionalAccounts()` and `prioritizeRothAccounts()` utility functions
- Catch-up contribution logic preserved
- HSA/CESA calculations unchanged
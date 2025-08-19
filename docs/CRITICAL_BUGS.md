# CRITICAL: Employer 401(k) Integration Issues

## The Problem

The code expects profiles 2, 4, 5, 6, and 9 to have employer 401(k) questions (ex_q1-ex_q4), but only Profile 2 (ROBS Curious) actually has these questions in its form. This causes the engine to break when:

1. `addEmployer401kVehicles()` is called in profile helpers
2. It tries to read ex_q1-ex_q4 which contain wrong data
3. The form mapping positions are incorrect

## Current State

### Profile 2 (ROBS Curious) - FIXED ✅
- Has employer 401(k) questions at positions 46-49
- Mapping has been corrected

### Profiles 4, 5, 6, 9 - BROKEN ❌
- Do NOT have employer 401(k) questions in their forms
- Code calls `addEmployer401kVehicles()` expecting these questions
- Will fail or produce incorrect results

## Solutions

### Option 1: Add Questions to Forms (Recommended)
Add these 4 questions to the Phase 2 forms for profiles 4, 5, 6, and 9:

1. Does your employer offer a 401(k) retirement plan? (Yes/No)
2. Does your employer match your 401(k) contributions? (Yes/No)
3. What percentage does your employer match? (e.g., "50% up to 6%")
4. Does your employer 401(k) plan have a Roth option? (Yes/No)

Then update FORM_EX_Q_MAPPING with correct positions.

### Option 2: Remove Employer 401(k) Logic
Remove `addEmployer401kVehicles()` calls from profiles 4, 5, 6, and 9 helpers.

This would remove employer 401(k) support from these profiles.

### Option 3: Default Values (Temporary Fix)
Modify `addEmployer401kVehicles()` to check if ex_q1 is valid before proceeding:

```javascript
function addEmployer401kVehicles(baseOrder, params) {
  const { rowArr, hdr, age, grossIncome } = params;
  
  // Safety check - if ex_q1 doesn't contain Yes/No, skip
  const hasEmployer401k = getValue(hdr, rowArr, HEADERS.P2_EX_Q1);
  if (hasEmployer401k !== 'Yes' && hasEmployer401k !== 'No') {
    console.log('Warning: No valid employer 401k data, skipping');
    return baseOrder;
  }
  
  // ... rest of function
}
```

## Impact on Testing

1. Profile 2 tests should work after form mapping fix
2. Profiles 4, 5, 6, 9 tests will fail without one of the above fixes
3. Live form submissions for these profiles will produce incorrect results

## Recommended Action

1. **Immediate**: Implement Option 3 as safety net
2. **Short-term**: Add questions to forms (Option 1)
3. **Update**: FORM_EX_Q_MAPPING once questions are added
4. **Test**: Each profile after fixes are applied

## Header System Note

The header system is working correctly. The issue is that the forms don't have the expected questions, not that the headers are wrong.
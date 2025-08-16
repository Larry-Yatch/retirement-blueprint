# Employer 401(k) Integration Testing Guide

## Overview
This guide explains how to test the employer 401(k) integration that was added to profiles 2, 4, 5, 6, and 9.

## Test Functions Available

**Note:** All test functions are now located in `Testing.js` to keep the codebase organized.

### 1. `testEmployer401kIntegration()`
Tests that employer 401(k) vehicles are properly created for profiles with employer questions.

**What it tests:**
- Profile helpers correctly read employer 401(k) questions from ex_q1-4
- Employer match vehicles are created when appropriate
- Match percentage calculations work correctly
- Vehicles appear in the correct order

**How to run:**
1. Open Google Apps Script editor
2. Make sure Testing.js is loaded in your project
3. Select `testEmployer401kIntegration` from the function dropdown (in Testing.js)
4. Click Run
5. Check the console output

**Expected output:**
```
=== EMPLOYER 401(K) INTEGRATION TEST ===

Testing Profile: 2_ROBS_Curious
--------------------------------
Age: 45
Income: $150,000
Employer 401(k): Yes
Employer Match: Yes
Match Details: 50% up to 6%

Allocation Order:
  1. 401(k) Match Traditional (50% up to 6%) - Limit: $750/mo
  2. HSA - Limit: $333/mo
  3. CESA - Limit: $167/mo
  ... (rest of vehicles)

✅ SUCCESS: Employer match found at position 1
```

### 2. `testFormQuestionMapping()`
Tests that the form mapping system correctly remaps questions to the expected positions.

**What it tests:**
- FORM_EX_Q_MAPPING configuration is correct
- remapFormValues() function works properly
- Questions land in the correct ex_q slots

**How to run:**
1. Open Google Apps Script editor
2. Make sure Testing.js is loaded in your project
3. Select `testFormQuestionMapping` from the function dropdown (in Testing.js)
4. Click Run
5. Check the console output

**Expected output:**
```
=== FORM QUESTION MAPPING TEST ===

Testing 2_ROBS_Curious:
Original form response positions:
  Position 7: 50000
  Position 8: 10000
  Position 9: Yes
  Position 10: Yes
  Position 11: 50% up to 6%
  Position 12: Yes

Mapping configuration:
  Position 9 → ex_q1
  Position 10 → ex_q2
  Position 11 → ex_q3
  Position 12 → ex_q4
  Position 7 → ex_q5
  Position 8 → ex_q6
✅ Mapping configuration found
```

## Manual Testing with Form Submissions

### Test Process:
1. Submit a test Phase 2 form for one of the updated profiles (2, 4, 5, 6, or 9)
2. Include employer 401(k) information in the new questions
3. Process the submission through handlePhase2()
4. Check Working Sheet to verify:
   - Questions appear in correct columns (P2_EX_Q1 through P2_EX_Q4)
   - Run the allocation engine on that row
   - Verify employer match appears in results

### Test Data Examples:

**Profile 2 (ROBS_Curious):**
- Employer 401(k)?: Yes
- Employer match?: Yes
- Match percentage?: 50% up to 6%
- Roth option?: Yes

**Profile 4 (Roth_Reclaimer):**
- Employer 401(k)?: Yes
- Employer match?: Yes
- Match percentage?: 100% up to 3%
- Roth option?: No

## Verification Checklist

For each profile tested:
- [ ] Form submission processes without errors
- [ ] Employer questions map to correct ex_q columns
- [ ] Profile helper reads employer data correctly
- [ ] Employer match vehicle appears when match = "Yes"
- [ ] Match calculation uses correct percentage
- [ ] No employer vehicles appear when 401(k) = "No"
- [ ] Allocation engine processes vehicles correctly

## Common Issues and Solutions

### Issue: Employer match not appearing
**Solution:** Check that:
1. ex_q1 (employer 401k) = "Yes"
2. ex_q2 (employer match) = "Yes"
3. ex_q3 has a valid match percentage format

### Issue: Questions in wrong columns
**Solution:** Update FORM_EX_Q_MAPPING with correct positions:
```javascript
'2_ROBS_Curious': {
  9: 'ex_q1',   // Update these numbers based on
  10: 'ex_q2',  // actual form question positions
  11: 'ex_q3',
  12: 'ex_q4',
  7: 'ex_q5',
  8: 'ex_q6'
}
```

### Issue: Match calculation incorrect
**Solution:** Verify match percentage format in ex_q3:
- Valid: "50% up to 6%", "100% up to 3%", "4%"
- Invalid: "50 percent", "half up to 6"

## Next Steps

1. Run both test functions to verify implementation
2. Submit test forms for each updated profile
3. Document any issues in profile_helper_tuning.md
4. Begin individual profile tuning once tests pass
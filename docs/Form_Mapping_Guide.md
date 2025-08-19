# Form Mapping Guide

## Critical Information for Profile Tuning

### Form Structure
All Phase 2 forms have the same structure:
1. Questions 0-43: Universal questions (same for all profiles)
   - 0-2: Name, Email, Student ID
   - 3-42: Demographics, priorities, scoring questions
   - 43: "Profile Deep Dive Questions" section header
2. Questions 44+: Profile-specific questions (different per profile)

### Mapping Requirements
When adding profile-specific questions that need to map to ex_q columns:

1. **Find the actual form position**: Profile questions start at position 44
2. **Update FORM_EX_Q_MAPPING**: Map form position → ex_q field
3. **Never use positions 0-43**: These are universal questions

### Example: ROBS Curious Correct Mapping
```javascript
'2_ROBS_Curious': {
  46: 'ex_q1',  // employer 401k (form position 46)
  47: 'ex_q2',  // employer match (form position 47)
  48: 'ex_q3',  // match percentage (form position 48)
  49: 'ex_q4',  // roth option (form position 49)
  44: 'ex_q5',  // rollover balance (form position 44)
  45: 'ex_q6',  // business income (form position 45)
  50: 'ex_q7'   // spouse in business (form position 50)
}
```

### Common Mistakes to Avoid
❌ **Wrong**: Using positions 7-13 (these are children/HSA questions)
✅ **Right**: Using positions 44+ (profile-specific questions)

### How Form Values Map to Working Sheet
1. Form submission comes in as array of values
2. remapFormValues() uses FORM_EX_Q_MAPPING to reorganize values
3. Values are written to Working Sheet starting after Phase 2 link column
4. ex_q1 through ex_q10 columns store the profile-specific data

### Debugging Tips
1. Check Current_Forms_Full.js to see actual question positions
2. Look for "Profile Deep Dive Questions" - next question is position 44
3. Count questions from there to get correct positions
4. Use remapFormValues debug logging to verify mapping

### For New Profile Tuning
1. Add your profile questions to the form
2. Note their positions (44, 45, 46, etc.)
3. Add mapping to FORM_EX_Q_MAPPING
4. Test with form submission
5. Verify ex_q values are populated correctly

Remember: The position numbers in FORM_EX_Q_MAPPING are the actual positions in the form array, NOT column numbers in the Working Sheet.
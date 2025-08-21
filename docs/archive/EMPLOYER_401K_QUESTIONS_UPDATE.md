# Employer 401(k) Questions Update Guide

## ✅ UPDATE COMPLETED

All Phase 2 forms have been updated with the employer 401(k) questions. However, column mapping still needs to be implemented to ensure questions map to ex_q1-ex_q4 positions in the Working Sheet.

## Profiles That Had Employer 401(k) Questions Added

The following profiles now use the `addEmployer401kVehicles` function and need these 4 questions added to their Phase 2 forms:

### Profiles to Update:
1. **Profile 2: ROBS_Curious** (Form ID: 1FAIpQLSchOqMFkphypcStnZ92i-oWhQ_Oysn4gIiWimJYVt3e-sjhXQ)
2. **Profile 4: Roth_Reclaimer** (Form ID: 1FAIpQLSdbKrRSMkQNnlS-Sv5eHADLRCLV29UH7KXLkYdXQVJ689ZSpQ)
3. **Profile 5: Bracket_Strategist** (Form ID: 1FAIpQLSc10zXxJ-aWWzjp8Dk70joUiPOCT47EWvYqrOWMdI0J9WMUYA)
4. **Profile 6: Catch_Up** (Form ID: 1FAIpQLSeTZgJ05mFpsu8dkckLEvHjXtKaPCg0-TOPMMYafjl1_XZwPg)
5. **Profile 9: Late_Stage_Growth** (Form ID: 1FAIpQLSeuw5G3w75vLZl0uJtA9zEs4GuEF5XYoNc3h0zz0fB8mBVh2A)

Note: Profile 7 (Foundation_Builder) already has these questions.

## The 4 Employer 401(k) Questions to Add

These questions should be added as extra questions (ex_q1 through ex_q4) in each Phase 2 form:

### ex_q1: Employer 401(k) Availability
**Question**: Does your employer offer a 401(k) retirement plan?
**Type**: Yes/No
**Required**: Yes

### ex_q2: Employer Match
**Question**: Does your employer match your 401(k) contributions?
**Type**: Yes/No
**Required**: Yes (if ex_q1 = Yes)

### ex_q3: Match Percentage
**Question**: What percentage does your employer match? (e.g., "50% up to 6%" or "100% up to 3%")
**Type**: Text
**Required**: Yes (if ex_q2 = Yes)
**Help Text**: Enter the match formula, such as "50% up to 6% of salary" or "Dollar for dollar up to 3%"

### ex_q4: Roth 401(k) Option
**Question**: Does your employer 401(k) plan have a Roth option?
**Type**: Yes/No
**Required**: Yes (if ex_q1 = Yes)

## Implementation Notes

1. These questions map to the `addEmployer401kVehicles` function parameters in Code.js (lines 726-729)
2. The function will only add employer match vehicles if ex_q1 and ex_q2 are both "Yes"
3. The match percentage (ex_q3) is used to calculate the monthly cap for the match vehicle
4. The Roth option (ex_q4) is collected for future enhancement possibilities

## Why These Profiles Need Employer 401(k) Questions

- **Profile 2 (ROBS_Curious)**: Planning ROBS but likely still W-2 employed
- **Profile 4 (Roth_Reclaimer)**: High-earners often have employer benefits
- **Profile 5 (Bracket_Strategist)**: Already has Traditional 401(k) in vehicle list
- **Profile 6 (Catch_Up)**: Already has 401(k) Catch-Up in vehicle list
- **Profile 9 (Late_Stage_Growth)**: Near retirement but could still be employed

## Profiles That DON'T Need These Questions

- **Profile 1 (ROBS_In_Use)**: Already has ROBS Solo 401(k)
- **Profile 3 (Solo401k_Builder)**: Self-employed with Solo 401(k)
- **Profile 8 (Biz_Owner_Group)**: Business owners with their own group plans

## Testing After Implementation

After adding these questions to the Phase 2 forms:
1. Test each profile to ensure questions appear correctly
2. Verify that employer match vehicles are added when appropriate
3. Check that match calculations work with various percentage formats
4. Ensure the allocation engine prioritizes employer match appropriately
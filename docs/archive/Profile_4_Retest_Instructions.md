# Profile 4 Retest Instructions

Now that we've fixed the test data mapping, please run the Profile 4 tests again:

1. Go to the Google Sheet
2. Click Testing menu → Profile 4 (Roth Reclaimer) → All Scenarios
3. Or run `testProfile4All()` in the Apps Script editor

## What Should Happen Now

With the corrected ex_q mappings:

### High Income Backdoor Test
Should show:
- HSA allocation (triple tax advantage)
- 401(k) Match Traditional ($667/mo for 100% up to 4%)
- 401(k) Roth ($1,958/mo - high income but Roth 401k not subject to limits)
- **Backdoor Roth IRA** (not regular Roth due to income > $161k)
- Total: $3,300/mo

### Low Income Direct Roth Test
Should show:
- Combined CESA ($333/mo for 2 kids)
- 401(k) Match Traditional ($375/mo for 50% up to 6%)
- **Direct Roth IRA** ($583/mo - income within limits)
- 401(k) Traditional (remaining capacity)
- Total: $825/mo

## Key Differences from First Test

1. **Employer 401(k) questions** now in correct positions (ex_q1-4)
2. **IRA/Backdoor questions** now in correct positions (ex_q5-8)
3. Should see proper 401(k) match allocations
4. High income should trigger Backdoor Roth, not regular Roth

## If Issues Persist

The remaining issues might be:
1. The universal engine allocation calculation
2. The addEmployer401kVehicles function not working
3. Profile helper not generating correct vehicle order

Let me know the results and I can help debug further!
# How to Test Profile 4 Roth Phase-Out Fix

## Option 1: Run Direct Test in Google Apps Script Editor

1. The code has been pushed to your Google Apps Script project
2. Open the Script Editor (from your Google Sheets: Extensions → Apps Script)
3. Find and run the function `testProfile4RothDirect()`
4. Check the console output to see results

## Option 2: Use the Testing Framework

Run this in the Script Editor:

```javascript
// Test high income scenario (should show Backdoor Roth)
runCompleteScenarioTest('highIncomeClean', {
  highIncomeClean: {
    name: 'High Income Clean Backdoor',
    phase1: {
      'Full_Name': 'Test Clean Backdoor',
      'Email': 'test@example.com',
      'Student_ID_Last4': '4001CB',
      'Current_Age': 45,
      'ProfileID': '4_Roth_Reclaimer',
      'Work_Situation': 'W-2 employee',
      'gross_annual_income': 250000,  // Above phase-out!
      'filing_status': 'Single',
      'Tax_Minimization': 'Later',
      'hsa_eligibility': 'Yes',
      'cesa_num_children': 0,
      'Net_Monthly_Income': 14000,
      'Allocation_Percentage': 30
    },
    phase2: {
      ex_q1: '0',              // No IRA balance
      ex_q2: 'Yes',            // 401k accepts rollovers
      ex_q5: 'Yes',            // Has employer 401k
      ex_q6: 'Yes',            // Has match
      ex_q7: '100% up to 5%',  // Match percentage
      ex_q8: 'Yes'             // Has Roth 401k
    }
  }
});
```

## Option 3: Manual Testing in Spreadsheet

1. Create a test row with these values:
   - Profile: 4_Roth_Reclaimer
   - Income: $250,000 (Single) or $300,000 (Married)
   - Fill in Phase 2 questions as shown above
   
2. Run Phase 2 for that row

3. Check the vehicles - should show "Backdoor Roth IRA" not "Roth IRA"

## Expected Results

### Before Fix (INCORRECT):
- High income ($250k single) → Shows "Roth IRA" 

### After Fix (CORRECT):
- High income ($250k single) → Shows "Backdoor Roth IRA"
- Low income ($120k single) → Shows "Roth IRA"

## Key Test Scenarios

1. **Single, $250k** (above $161k phase-out)
   - Expected: Backdoor Roth IRA

2. **Married, $300k** (above $240k phase-out)
   - Expected: Backdoor Roth IRA

3. **Single, $120k** (below $146k phase-out start)
   - Expected: Regular Roth IRA

4. **Single, $150k** (in phase-out range $146k-$161k)
   - Expected: Backdoor Roth IRA (conservative approach)
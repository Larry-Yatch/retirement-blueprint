# ROBS Curious Form Question Order Issue

## 🚨 PROBLEM IDENTIFIED:

The form questions are in the wrong order! Looking at the headers:

### Current Order in Form:
1. What is the approximate balance you plan to rollover... (Column 39)
2. What is your expected annual business income... (Column 40)
3. Do you have access to an employer-sponsored retirement plan... (Column 41)
4. If yes, does your employer offer matching... (Column 42)
5. Does your plan offer a Roth 401(k) option? (Column 43)
6. If yes, what percentage does your employer match... (Column 44)
7. If you have a business, does your spouse work... (Column 45)

### Expected Order (based on our mapping):
The mapping expects:
- Position 7 → ex_q5 (rollover balance)
- Position 8 → ex_q6 (business income)
- Position 9 → ex_q7 (spouse in business) ⚠️
- Position 10 → ex_q1 (employer 401k) ⚠️
- Position 11 → ex_q2 (employer match) ⚠️
- Position 12 → ex_q3 (match percentage) ⚠️
- Position 13 → ex_q4 (roth option) ⚠️

## THE ISSUE:
The spouse question is at the END (position 45) but our mapping expects it at position 9 (after business income question).

## SOLUTION OPTIONS:

### Option 1: Fix the Form (Recommended)
Move the spouse question to be Question 3 (right after business income):
1. Rollover balance
2. Business income
3. Spouse in business ← MOVE HERE
4. Employer 401k
5. Employer match
6. Match percentage
7. Roth option

### Option 2: Update the Mapping
Change the FORM_EX_Q_MAPPING to match current form order:
```javascript
'2_ROBS_Curious': {
  9: 'ex_q1',   // employer 401k (moved up)
  10: 'ex_q2',  // employer match (moved up)
  11: 'ex_q4',  // roth option (moved up)
  12: 'ex_q3',  // match percentage (moved up)
  7: 'ex_q5',   // rollover balance (stays)
  8: 'ex_q6',   // business income (stays)
  13: 'ex_q7'   // spouse in business (moved to end)
}
```

## RECOMMENDATION:
Fix the form order (Option 1) because:
1. Keeps related questions together (business income → spouse in business)
2. Maintains logical flow
3. Matches our intended mapping
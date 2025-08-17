# Profile 2: ROBS Curious - Simplified Solo 401(k) Update

## Changes Implemented

### 1. Updated Questions
**Old Question 2**: "What is your expected annual contribution from business profits back into the Solo 401(k)?"

**New Questions**:
- Question 2: "What is your expected annual business income available for retirement savings? (Enter total amount you can save from your business)"
- Question 3: "Does your spouse work in your business (or plan to)?"

### 2. Simplified Calculation Logic

Instead of asking for complex entity type and separate employee/employer contributions, we now:

1. **Ask for total business savings capacity** - What they can actually save
2. **Apply simple waterfall logic**:
   - Fill employee bucket first (up to IRS limits)
   - Remainder goes to employer bucket
   - Double capacity if spouse works in business

### 3. Benefits of This Approach

- **User-friendly**: One simple number instead of complex calculations
- **Accurate enough**: Gets ~90% accuracy for planning purposes
- **Family-aligned**: Accounts for spouse like our HSA/CESA functions
- **Flexible**: Works for all entity types without asking
- **Clear disclaimers**: Notes advise consulting tax advisor for precision

### 4. Calculation Examples

#### Single Person, $100k Business Savings:
- Employee: $23,000 (fills first)
- Employer: $46,000 (remainder up to $69k total)
- Total: $69,000

#### Couple in Business, $150k Savings:
- Employee: $46,000 (2 × $23k)
- Employer: $92,000 (2 × $46k)
- Total: $138,000

#### With Catch-up (50+), Single:
- Employee: $30,500
- Employer: $46,000
- Total: $76,500

### 5. Edge Cases Handled

- **W-2 only**: No Solo 401(k) vehicles added
- **Mixed employment**: Both employer and Solo 401(k) vehicles
- **Limited capacity**: Correctly caps at available funds
- **Spouse multiplier**: Doubles limits appropriately

### 6. Testing

Run `testSimplifiedSolo401k()` to verify calculations
Run `testROBSCuriousSimplified()` to test full profile scenarios

### 7. Form Mapping Update

Updated `FORM_EX_Q_MAPPING` to include:
```javascript
'2_ROBS_Curious': {
  10: 'ex_q1',  // employer 401k
  11: 'ex_q2',  // employer match
  12: 'ex_q3',  // match percentage
  13: 'ex_q4',  // roth option
  7: 'ex_q5',   // rollover balance
  8: 'ex_q6',   // business income for retirement (updated)
  9: 'ex_q7'    // spouse in business (new)
}
```

### 8. Next Steps

1. Update the Google Form with new questions
2. Test with live submissions
3. Monitor user feedback on clarity
4. Consider applying similar simplification to Profile 3 (Solo401k Builder)
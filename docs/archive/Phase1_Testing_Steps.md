# Phase 1 Testing Process: Step-by-Step Guide

## Overview
We need to verify that when a Phase 2 form is submitted, the system correctly:
1. Captures user's current contributions → `_actual` columns
2. Calculates recommended allocations → `_ideal` columns
3. Handles non-discretionary items (employer matches, ROBS distributions)

## Step 1: Verify Column Structure Exists

In Google Apps Script Editor, run:

```javascript
// First, check if all actual/ideal columns exist
verifyActualIdealColumns()
```

This will show you:
- Total number of actual/ideal columns
- Whether critical columns like `retirement_401k_match_traditional_actual` exist
- Any missing columns that might cause issues

**Expected output:**
```
Found 50+ actual columns
Found 50+ ideal columns
✅ All critical columns exist
```

## Step 2: Test with Synthetic Data

### Option A: Test Individual Profiles

```javascript
// Test Profile 1: ROBS with profit distributions
testProfile1ActualIdeal()

// Test Profile 2: W-2 employee with match
testProfile2ActualIdeal()

// Test Profile 3: Solo 401k with employer contrib
testProfile3ActualIdeal()
```

### Option B: Test All at Once

```javascript
// Run all profile tests
testAllProfilesActualIdeal()
```

### What to Look for in Output:

```
=== Testing Actual/Ideal for 1_ROBS_In_Use ===
Running allocation engine...

📊 ACTUAL VALUES (Current Contributions):
  retirement_hsa_actual: 300
  health_hsa_actual: 300
  retirement_traditional_401k_actual: 500
  retirement_robs_solo_401k_profit_distribution_actual: 4000

💎 IDEAL VALUES (Recommended Allocations):
  retirement_hsa_ideal: $358
  retirement_robs_solo_401k_profit_distribution_ideal: $4,000
  retirement_traditional_ira_ideal: $583
  family_bank_ideal: $1,559

  Total Ideal: $6,500

✅ VERIFICATION:
  Expected allocation (25% of $8000): $2000
  Family Bank (overflow): $1,559
```

### Key Things to Verify:

1. **Actual values match test inputs**
   - HSA actual = 300 (from form data)
   - ROBS distribution actual = 4000 (from ex_q6 / 12)

2. **Ideal includes non-discretionary**
   - ROBS distribution ideal = $4,000 (mandatory)
   - Other vehicles = engine allocations
   - Total = discretionary + non-discretionary

3. **Family Bank captures overflow**
   - Should be positive or $0
   - Represents unallocated funds

## Step 3: Test with Real Form Submission

### 3.1 Submit a Test Phase 1 Form

1. Open your Phase 1 Google Form
2. Submit with test data:
   - Name: "Test User Phase1"
   - Profile: Choose one (e.g., ROBS Curious)
   - Income: Known values

### 3.2 Check Phase 1 Processing

1. Go to Working Sheet
2. Find the new row
3. Verify:
   - Profile assigned correctly
   - Phase 2 link generated
   - Email sent (check logs)

### 3.3 Submit Phase 2 Form

1. Click the Phase 2 link from email/sheet
2. Fill with known values:
   ```
   Current HSA contribution: $200/month
   Current 401k contribution: $500/month
   Current CESA contribution: $0/month
   
   For ROBS profiles:
   - Annual profit distribution: $48,000
   
   For W-2 profiles:
   - Employer offers 401k: Yes
   - Match: 100% up to 3%
   ```

### 3.4 Verify Results in Working Sheet

After Phase 2 submission, check the Working Sheet row:

**Actual Columns Should Show:**
- `retirement_hsa_actual`: $200
- `health_hsa_actual`: $200
- `retirement_traditional_401k_actual`: $500
- `retirement_401k_match_traditional_actual`: [calculated match]

**Ideal Columns Should Show:**
- Various vehicles with engine allocations
- Non-discretionary items included
- `family_bank_ideal`: remainder

## Step 4: Common Issues to Check

### Issue 1: Actual Values All $0
**Cause**: Form data not being read correctly
**Check**: 
- Form question mapping in `remapFormValues()`
- Header names match exactly
- Phase 2 data pasted to correct columns

### Issue 2: Ideal Missing Non-Discretionary
**Cause**: Profile logic not identifying seeds
**Check**:
- `nonDiscretionarySeeds` object being built
- Profile-specific logic (ROBS, employer match)
- Seeds being added to ideal values

### Issue 3: Family Bank Negative
**Cause**: Over-allocation or calculation error
**Check**:
- Total percentage calculation
- Sum of all allocations
- Leftover calculation logic

## Step 5: Debug Specific Issues

If something looks wrong:

### 5.1 Check the Logs
```javascript
// In handlePhase2, add logging:
console.log('Actual Map:', JSON.stringify(actualMap));
console.log('Non-discretionary seeds:', JSON.stringify(nonDiscretionarySeeds));
console.log('Total ideal pool:', totalIdealPool);
```

### 5.2 Trace a Specific Value
Example: Why is employer match not showing?

1. Check if match percentage read correctly:
   ```javascript
   console.log('Match percentage:', matchPercentage);
   ```

2. Check calculation:
   ```javascript
   console.log('Calculated match:', calculateEmployerMatch(grossIncome, matchPercentage));
   ```

3. Check if written:
   ```javascript
   console.log('Match actual written to column:', hdr['retirement_401k_match_traditional_actual']);
   ```

## Step 6: Validate Edge Cases

Test these scenarios:

### 6.1 Zero Contributions
- User currently saves nothing
- Should show $0 actuals, positive ideals

### 6.2 High Income Phase-Out
- Income > $161k (Roth IRA phase-out)
- Should recommend backdoor Roth in ideal

### 6.3 Maximum Contributions
- User already maxing everything
- Ideal should respect limits

### 6.4 No Employer Match
- W-2 employee without 401k
- No match in actual or ideal

## Step 7: Document Results

Create a summary of your testing:

```
Phase 1 Test Results
Date: [Today]
Tester: [Your name]

Profile 1 (ROBS): ✅ PASS
- Actuals captured correctly
- ROBS distributions in ideal
- Family bank positive

Profile 2 (W-2): ✅ PASS  
- Employer match calculated
- Match appears in ideal only
- Total allocation correct

Profile 3 (Solo 401k): ⚠️ ISSUE
- Employer contribution not showing
- Need to check ex_q5 mapping

Overall: 2/3 profiles working
```

## Quick Checklist

Before moving to Phase 2, ensure:
- [ ] All actual columns capture form data
- [ ] All ideal columns show recommendations
- [ ] Non-discretionary items included in ideal
- [ ] Family bank captures remainder
- [ ] No calculation errors or warnings
- [ ] Tested multiple profiles
- [ ] Edge cases handled

## Next Steps

Once all tests pass:
1. Document any fixes needed
2. Apply fixes if necessary
3. Re-test problem areas
4. Move to Phase 2 (future value calculations)
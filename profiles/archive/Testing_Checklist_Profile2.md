# Profile 2 (ROBS Curious) - Testing Checklist

## Pre-Test Setup:
- [ ] Verify form questions are in correct order
- [ ] Confirm mapping in FORM_EX_Q_MAPPING matches form
- [ ] Push latest code changes via clasp

## Test Scenarios to Run:

### 1. Self-Employed Only Tests:
- [ ] **Test 1A**: Self-employed, no spouse, $80k business savings
  - Expected: Solo 401(k) vehicles with proper split
- [ ] **Test 1B**: Self-employed with spouse, $150k business savings
  - Expected: Doubled capacity for both spouses
- [ ] **Test 1C**: Self-employed, age 55, with catch-up
  - Expected: $30.5k employee limit instead of $23k

### 2. W-2 Employee Only Tests:
- [ ] **Test 2A**: W-2 with employer match
  - Expected: Employer 401(k) vehicles, no Solo 401(k)
- [ ] **Test 2B**: W-2 without employer plan
  - Expected: IRA vehicles only

### 3. Mixed Employment Tests:
- [ ] **Test 3A**: Both W-2 and self-employed
  - Expected: Both employer and Solo 401(k) vehicles
- [ ] **Test 3B**: Both with limited business income
  - Expected: Reduced Solo 401(k) capacity

### 4. Edge Case Tests:
- [ ] **Test 4A**: $0 business savings but has rollover
  - Expected: Traditional IRA, no Solo 401(k) employer
- [ ] **Test 4B**: High income Roth phase-out
  - Expected: Backdoor Roth appears

### 5. Form Submission Tests:
- [ ] Submit actual form with new questions
- [ ] Verify data lands in correct ex_q columns
- [ ] Run allocation engine on submitted data
- [ ] Check results in Working Sheet

## Verification Points:

### For Each Test:
1. **Vehicle Order**
   - [ ] HSA first if eligible
   - [ ] 401(k) vehicles based on employment
   - [ ] Traditional IRA included
   - [ ] Tax preference affects order

2. **Calculations**
   - [ ] Employee contribution limits correct
   - [ ] Employer portion calculated properly
   - [ ] Spouse multiplier works
   - [ ] Total doesn't exceed IRS limits

3. **Notes/Messages**
   - [ ] Appropriate disclaimers on Solo 401(k)
   - [ ] Spouse notes when applicable

## Code Functions to Run:
```javascript
// Unit tests
testSimplifiedSolo401k()

// Profile tests
testROBSCuriousSimplified()

// Mapping verification
testROBSCuriousMapping()
verifyWorkingSheetColumns()

// Live test
testEmployer401kIntegration() // Use Profile 2 test data
```

## Known Issues to Watch:
1. Form question order (spouse at end)
2. Entity type not captured (using 20% conservative)
3. No existing contribution seeding

## Success Criteria:
- [ ] All test scenarios pass
- [ ] Form data maps correctly
- [ ] Calculations match expectations
- [ ] No errors in console
- [ ] Results make financial sense
# Phase 2 Form Questions Verification & Fix Guide

## Overview
This document identifies critical mismatches between Phase 2 form questions and the code that processes them. These issues MUST be resolved before Thursday's launch to ensure data flows correctly from forms to calculations.

## Critical Issues Summary

### 🚨 High Priority Issues
1. **Profiles 5, 6, 9**: Code expects employer 401k questions but form mapping indicates they don't exist
2. **Profile 8**: Code expects employee demographic questions that aren't defined in PROFILE_CONFIG
3. **Multiple profiles**: Missing extraQuestions definitions in code (shown as `[/* ... */]`)

### ⚠️ Medium Priority Issues
1. **Profile 7**: Questions not visible in PROFILE_CONFIG but mapping exists
2. **Form position mapping**: Some profiles need complex remapping due to form structure

## Profile-by-Profile Analysis

### Profile 1: ROBS In Use ✅
**Status**: Questions defined and properly mapped
**Issues**: None
**Action**: None required

**Current Questions**:
1. Describe how your ROBS strategy is currently structured
2. How are your business profits routed into your Solo 401(k)?
3. Which type of contributions are you making? (Roth only / Traditional only / Both)
4. How often do you contribute? (Monthly/Quarterly/etc)
5. Do you also contribute to a Roth IRA? If yes, how much per year?
6. Expected annual business distribution to Solo 401(k)?

### Profile 2: ROBS Curious ✅
**Status**: Questions defined with complex mapping
**Issues**: None (mapping handles reordering)
**Action**: Verify form positions match mapping

**Mapping Verification**:
```javascript
'2_ROBS_Curious': {
  46: 'ex_q1',  // employer 401k
  47: 'ex_q2',  // employer match
  48: 'ex_q3',  // match percentage
  49: 'ex_q4',  // roth option
  44: 'ex_q5',  // rollover balance
  45: 'ex_q6',  // business income for retirement
  50: 'ex_q7'   // spouse in business
}
```

### Profile 3: Solo 401k Builder ✅
**Status**: Questions defined and properly mapped
**Issues**: None
**Action**: None required

**Current Questions**:
1. What kind of business do you run? (Sole Prop / LLC / S-Corp / C-Corp)
2. Do you have any employees besides yourself (and your spouse)?
3. Have you already set up a Solo 401(k) plan?
4. If yes, how much per year will you contribute as employee? (USD)
5. If yes, how much per year will your business contribute as employer? (USD)
6. About how much can you put into this plan from your business each year?

### Profile 4: Roth Reclaimer ✅
**Status**: Questions defined with complex mapping
**Issues**: None (mapping handles reordering)
**Action**: Verify form positions match mapping

**Mapping Verification**:
```javascript
'4_Roth_Reclaimer': {
  44: 'ex_q5',   // trad IRA balance
  45: 'ex_q6',   // after-tax contributions
  46: 'ex_q7',   // backdoor understanding
  47: 'ex_q8',   // conversion amount
  48: 'ex_q1',   // employer 401k
  49: 'ex_q2',   // employer match
  50: 'ex_q3',   // match percentage
  51: 'ex_q4'    // roth 401k option
}
```

### Profile 5: Bracket Strategist ❌
**Status**: CRITICAL MISMATCH
**Issues**: 
- extraQuestions shows `[/* ... */]` in PROFILE_CONFIG
- FORM_EX_Q_MAPPING says "NO employer 401k questions"
- Code at lines 1521-1524 expects employer 401k questions

**Code Expectation**:
```javascript
const hasEmployer401k = getValue(hdr, rowArr, HEADERS.P2_EX_Q1) === 'Yes';
const hasEmployerMatch = getValue(hdr, rowArr, HEADERS.P2_EX_Q2) === 'Yes';
const hasRoth401k = getValue(hdr, rowArr, HEADERS.P2_EX_Q4) === 'Yes';
```

### Profile 6: Catch Up ❌
**Status**: CRITICAL MISMATCH
**Issues**: 
- extraQuestions shows `[/* ... */]` in PROFILE_CONFIG
- FORM_EX_Q_MAPPING says "NO employer 401k questions"
- Code at lines 1696-1699 expects employer 401k questions

**Code Expectation**:
```javascript
const hasEmployer401k = getValue(hdr, rowArr, HEADERS.P2_EX_Q1) === 'Yes';
const hasEmployerMatch = getValue(hdr, rowArr, HEADERS.P2_EX_Q2) === 'Yes';
const hasRoth401k = getValue(hdr, rowArr, HEADERS.P2_EX_Q4) === 'Yes';
```

### Profile 7: Foundation Builder ⚠️
**Status**: Likely OK but needs verification
**Issues**: 
- extraQuestions shows `[/* ... */]` in PROFILE_CONFIG
- Has proper mapping for employer 401k questions
- Uses addEmployer401kVehicles() function

**Mapping exists**:
```javascript
'7_Foundation_Builder': {
  44: 'ex_q1',   // employer 401k
  45: 'ex_q2',   // employer match
  46: 'ex_q3',   // match percentage
  47: 'ex_q4'    // roth 401k option
}
```

### Profile 8: Biz Owner Group ❌
**Status**: CRITICAL - Missing required questions
**Issues**: 
- extraQuestions shows `[/* ... */]` in PROFILE_CONFIG
- Code expects 6 specific business/employee questions
- No mapping exists (direct mapping assumed)

**Code Expectations**:
```javascript
const numEmployees = Number(getValue(hdr, rowArr, HEADERS.P2_EX_Q1)) || 5;
const avgEmployeeAge = Number(getValue(hdr, rowArr, HEADERS.P2_EX_Q2)) || 35;
const avgEmployeeSalary = Number(getValue(hdr, rowArr, HEADERS.P2_EX_Q3)) || 50000;
const hasRetirementPlan = getValue(hdr, rowArr, HEADERS.P2_EX_Q4) === 'Yes';
const planType = getValue(hdr, rowArr, HEADERS.P2_EX_Q5) || '401(k)';
const annualContribution = Number(getValue(hdr, rowArr, HEADERS.P2_EX_Q6)) || 0;
```

**Required Questions**:
1. Number of W-2 employees?
2. Average employee age?
3. Average employee salary?
4. Do you currently have a retirement plan?
5. What type of plan? (401(k)/DB/etc)
6. How much do you contribute annually?

### Profile 9: Late Stage Growth ❌
**Status**: CRITICAL MISMATCH
**Issues**: 
- extraQuestions shows `[/* ... */]` in PROFILE_CONFIG
- FORM_EX_Q_MAPPING says "NO employer 401k questions"
- Code at lines 2094-2097 expects employer 401k questions

**Code Expectation**:
```javascript
const hasEmployer401k = getValue(hdr, rowArr, HEADERS.P2_EX_Q1) === 'Yes';
const hasEmployerMatch = getValue(hdr, rowArr, HEADERS.P2_EX_Q2) === 'Yes';
const hasRoth401k = getValue(hdr, rowArr, HEADERS.P2_EX_Q4) === 'Yes';
```

## Fix Checklist

### Step 1: Verify Actual Form Questions
For each profile with issues (5, 6, 7, 8, 9):

- [ ] Open the Google Form for the profile
- [ ] Document all questions in order
- [ ] Note the question types (text, number, yes/no, multiple choice)
- [ ] Count total questions to verify positions

### Step 2: Update PROFILE_CONFIG
For profiles with missing extraQuestions:

- [ ] Profile 5: Add actual questions to extraQuestions array
- [ ] Profile 6: Add actual questions to extraQuestions array
- [ ] Profile 7: Add actual questions to extraQuestions array
- [ ] Profile 8: Add actual questions to extraQuestions array
- [ ] Profile 9: Add actual questions to extraQuestions array

### Step 3: Fix Form Mappings

#### For Profiles 5, 6, 9 (if they DO have employer 401k questions):
- [ ] Add mapping to FORM_EX_Q_MAPPING similar to Profile 7:
```javascript
'5_Bracket_Strategist': {
  XX: 'ex_q1',   // employer 401k (find actual position)
  XX: 'ex_q2',   // employer match
  XX: 'ex_q3',   // match percentage
  XX: 'ex_q4'    // roth 401k option
},
```

#### For Profiles 5, 6, 9 (if they DON'T have employer 401k questions):
- [ ] Modify profile helper code to not expect these questions
- [ ] Remove or conditionally check for employer 401k data
- [ ] Use default values or skip employer 401k logic

### Step 4: Special Handling for Profile 8
- [ ] Verify form has all 6 employee demographic questions
- [ ] If not, add questions to form OR modify code to use defaults
- [ ] Ensure questions are in correct order (ex_q1 through ex_q6)

### Step 5: Test Each Profile

For each profile after fixes:
- [ ] Submit test Phase 1 form
- [ ] Get assigned to correct profile
- [ ] Submit Phase 2 form with test data
- [ ] Verify no errors in form submission
- [ ] Check data appears correctly in Working Sheet
- [ ] Run allocation calculation
- [ ] Verify results make sense

### Step 6: Update Documentation
- [ ] Update this document with actual questions found
- [ ] Document any remaining issues
- [ ] Create test scenarios for each profile
- [ ] Update Profile markdown files with correct questions

## Emergency Fallback Options

If forms cannot be updated before Thursday:

### Option 1: Code-Only Fix
Modify profile helpers to handle missing questions:
```javascript
// Safe reading with defaults
const hasEmployer401k = getValue(hdr, rowArr, HEADERS.P2_EX_Q1) || 'No';
if (hasEmployer401k === 'Yes') {
  // employer 401k logic
} else {
  // skip employer 401k vehicles
}
```

### Option 2: Disable Affected Profiles
Temporarily redirect affected profiles to Profile 7 (Foundation Builder):
```javascript
// In classifyClientProfileFromWorkingSheet()
if (['5_Bracket_Strategist', '6_Catch_Up', '8_Biz_Owner_Group', '9_Late_Stage_Growth'].includes(profile)) {
  console.warn(`Profile ${profile} has form issues, using Foundation Builder`);
  return '7_Foundation_Builder';
}
```

### Option 3: Manual Override
Add questions to Working Sheet manually after form submission:
- Create a manual review process
- Add missing data before running calculations
- Document which profiles need manual intervention

## Testing Commands

After fixes, use these to verify:
```javascript
// Test form mapping
testFormMapping()

// Test specific profile
testProfile5()  // Create if doesn't exist
testProfile6()  // Create if doesn't exist
testProfile8()  // Create if doesn't exist
testProfile9()  // Create if doesn't exist

// Diagnose issues
diagnoseProfile('5_Bracket_Strategist')
showVehicleOrder('5_Bracket_Strategist')
```

## Priority Order for Fixes

1. **HIGHEST**: Profile 8 (missing all questions)
2. **HIGH**: Profiles 5, 6, 9 (employer 401k mismatch)
3. **MEDIUM**: Profile 7 (verify questions match mapping)
4. **LOW**: Update documentation after fixes

## Sign-off Checklist

Before launch:
- [ ] All form questions documented
- [ ] All mappings verified or fixed
- [ ] All profile helpers tested
- [ ] Emergency fallback implemented if needed
- [ ] Team notified of any remaining issues

---

**Created**: December 2024
**Last Updated**: [To be updated after fixes]
**Critical for**: Thursday Launch
**Owner**: Development Team
# Profile Complete Validation & Fine-Tuning Guide

## Purpose
This comprehensive guide combines profile fine-tuning, validation, and form verification into a single reference document. Use this to ensure all 9 profiles are properly implemented, have correct form questions, and are ready for production.

## Table of Contents
1. [Critical Issues Summary](#critical-issues-summary)
2. [Universal Profile Checklist](#part-1-universal-profile-checklist)
3. [Red Flags - Common Mistakes](#part-2-red-flags---common-mistakes)
4. [Critical Calculations](#part-3-critical-calculations-to-verify)
5. [Profile-by-Profile Complete Validation](#part-4-profile-by-profile-complete-validation)
6. [Form Questions Verification](#part-5-form-questions-verification)
7. [Testing Protocol](#part-6-testing-protocol)
8. [Emergency Fixes](#part-7-emergency-fixes)
9. [Final Production Checklist](#part-8-final-production-checklist)

## Critical Issues Summary

### 🚨 High Priority Issues (Must Fix Before Launch)
1. **Profiles 5, 6, 9**: Code expects employer 401k questions but form mapping says they don't exist
2. **Profile 8**: Code expects 6 employee demographic questions not defined in PROFILE_CONFIG
3. **Multiple profiles**: Missing extraQuestions definitions (shown as `[/* ... */]`)

### ⚠️ Medium Priority Issues
1. **Profile 7**: Questions not visible in PROFILE_CONFIG but mapping exists
2. **Complex remapping**: Profiles 2 and 4 need position-based remapping

### ✅ Working Profiles
1. **Profiles 1, 2, 3**: Fully defined and mapped correctly

## Part 1: Universal Profile Checklist

Every profile helper MUST have these components:

### 1.1 Data Collection & Initialization
```
□ Standard Fields Collection
  □ age - with Number() conversion
  □ filing status - with proper string value
  □ gross income - with Number() and sensible default
  □ net monthly income - from Working Sheet
  □ HSA eligibility - Yes/No check
  □ number of children - with Number() conversion
  □ tax preference - Now/Later/Both
  □ work situation - where applicable

□ Profile-Specific Fields (ex_q1 through ex_q6/q10)
  □ All fields use getValue(hdr, rowArr, HEADERS.P2_EX_Q#)
  □ Numeric fields use Number() conversion
  □ Yes/No fields check === 'Yes'
  □ Defaults provided with || operator
  □ No undefined or null values passed through

□ Seeds Initialization
  □ const seeds = { Education: {}, Health: {}, Retirement: {} }
  □ All domains present even if empty
  □ Seeds use MONTHLY amounts (annual / 12)
```

### 1.2 Universal Function Usage
```
□ REQUIRED Function Calls
  □ calculateHsaMonthlyCapacity(hsaElig, age, filing)
  □ calculateCesaMonthlyCapacity(numKids)
  
□ CONDITIONAL Function Calls
  □ applyRothIRAPhaseOut() - if profile includes Roth IRA
  □ addEmployer401kVehicles() - if W-2 employee (Profiles 2,4,5,6,7,9)
  □ prioritizeTraditionalAccounts() - if taxFocus === 'Now'
  □ prioritizeRothAccounts() - if taxFocus === 'Later'
```

### 1.3 Vehicle Order Structure
```
□ Domain Structure
  □ Each domain returns array of vehicle objects
  □ Each vehicle has: { name: string, capMonthly: number }
  □ Capacities use calculated values, not hardcoded
  
□ Overflow Banks
  □ Education order ends with 'Education Bank' (Infinity capacity)
  □ Health order ends with 'Health Bank' (Infinity capacity)
  □ Retirement order ends with 'Family Bank' (Infinity capacity)
  
□ Return Structure
  return {
    seeds,
    vehicleOrders: {
      Education: educationOrder,
      Health: healthOrder,
      Retirement: retirementOrder
    }
  }
```

## Part 2: Red Flags - Common Mistakes

### 🚩 Hardcoded Values
```javascript
// ❌ WRONG - Hardcoded HSA capacity
{ name: 'HSA', capMonthly: 358 }

// ✅ CORRECT - Calculated capacity
{ name: 'HSA', capMonthly: hsaCap }

// ❌ WRONG - Hardcoded 401k without catch-up
{ name: '401(k)', capMonthly: 1958 }

// ✅ CORRECT - Dynamic with catch-up
{ name: '401(k)', capMonthly: age >= 50 ? enhancedCap : baseCap }
```

### 🚩 Missing Calculations
```javascript
// ❌ WRONG - Manual HSA calculation
const hsaCap = filing === 'Married Filing Jointly' ? 713 : 358;

// ✅ CORRECT - Using universal function
const hsaCap = calculateHsaMonthlyCapacity(hsaElig, age, filing);
```

### 🚩 Form Question Mismatches
```javascript
// ❌ WRONG - Reading question that doesn't exist
const hasEmployer401k = getValue(hdr, rowArr, HEADERS.P2_EX_Q1) === 'Yes';
// But form doesn't have this question!

// ✅ CORRECT - Check if question exists or provide default
const hasEmployer401k = getValue(hdr, rowArr, HEADERS.P2_EX_Q1) || 'No';
if (hasEmployer401k === 'Yes') {
  // employer logic
}
```

### 🚩 Seeding Errors
```javascript
// ❌ WRONG - Annual amount in seeds
seeds.Retirement['401(k)'] = 23500; // Annual amount!

// ✅ CORRECT - Monthly amount
seeds.Retirement['401(k)'] = 23500 / 12;

// ❌ WRONG - Seeding non-existent vehicle
seeds.Retirement['Mega Roth'] = 1000; // Vehicle not in order!
```

## Part 3: Critical Calculations to Verify

### Catch-Up Contributions (Age-Based)
```
401(k) Catch-Up:
- Age 50-59: Base $23,500 + $7,500 = $31,000/year
- Age 60+: Base $23,500 + $11,250 = $34,750/year
- Must ADD to base, not replace

IRA Catch-Up:
- Age 50+: Base $7,000 + $1,000 = $8,000/year
- Applies to both Traditional and Roth

HSA Catch-Up:
- Age 55+: Base + $1,000/year
```

### Employer Contribution Calculations
```
Solo 401(k) Employer:
- S-Corp/C-Corp: Up to 25% of W-2 wages
- Sole Prop/LLC: Up to 20% of net self-employment income
- Maximum: Total limit ($70,000) - employee contributions

Group 401(k) Employer:
- Profit sharing: Up to 25% of compensation
- Combined limit: $70,000 (or age-adjusted)
```

### Phase-Out Calculations
```
Roth IRA Phase-Out (2025):
- Single: $146,000-$161,000
- MFJ: $230,000-$240,000
- Should switch to Backdoor Roth when phased out
```

## Part 4: Profile-by-Profile Complete Validation

### Profile 1: ROBS In Use ✅

**Form Status**: Complete and Mapped
**Implementation Status**: Complete (December 2024)

#### Form Questions Validation
| Question | Maps To | Code Expects | Actual Form | Status |
|----------|---------|--------------|-------------|---------|
| Q1: ROBS structure | ex_q1 | Text | Text input | ✅ |
| Q2: Profit routing | ex_q2 | Text | Text input | ✅ |
| Q3: Contribution type | ex_q3 | Roth/Trad/Both | Dropdown | ✅ |
| Q4: Frequency | ex_q4 | Text | Dropdown | ✅ |
| Q5: Roth IRA? | ex_q5 | Yes/No | Yes/No | ✅ |
| Q6: Annual distribution | ex_q6 | Number | Number | ✅ |

#### Code Validation
```
□ Profit Distribution Logic ✅
  □ Reads annual distribution from ex_q6
  □ Seeds as monthly amount (÷12)
  □ Vehicle has Infinity capacity
  
□ Contribution Type Filtering ✅
  □ Reads preference from ex_q3
  □ Filters vehicles based on preference
  
□ Vehicle Order ✅
  □ Profit Distribution first
  □ HSA at position 3
  □ No employer 401k vehicles
```

### Profile 2: ROBS Curious ✅

**Form Status**: Complete with Complex Mapping
**Implementation Status**: Complete and Tested

#### Form Mapping (Complex)
```javascript
'2_ROBS_Curious': {
  46: 'ex_q1',  // employer 401k
  47: 'ex_q2',  // employer match
  48: 'ex_q3',  // match percentage
  49: 'ex_q4',  // roth option
  44: 'ex_q5',  // rollover balance
  45: 'ex_q6',  // business income
  50: 'ex_q7'   // spouse in business
}
```

#### Code Validation
```
□ Employment Branching ✅
  □ Three paths: W-2, Self-employed, Both
  □ Dynamic vehicle generation
  □ Proper limit coordination
  
□ Business Planning ✅
  □ Seeds planned rollover
  □ Seeds business capacity
  □ Checks spouse involvement
```

### Profile 3: Solo 401k Builder ✅

**Form Status**: Complete and Mapped
**Implementation Status**: Complete (December 2024)

#### Form Questions Validation
| Question | Maps To | Code Expects | Status |
|----------|---------|--------------|---------|
| Q1: Business type | ex_q1 | Sole Prop/LLC/S-Corp/C-Corp | ✅ |
| Q2: Have employees? | ex_q2 | Yes/No | ✅ |
| Q3: Have Solo 401k? | ex_q3 | Yes/No | ✅ |
| Q4: Employee contrib | ex_q4 | Number | ✅ |
| Q5: Employer contrib | ex_q5 | Number | ✅ |
| Q6: Future amount | ex_q6 | Number | ✅ |

#### Code Validation
```
□ Business Structure ✅
  □ Reads entity type
  □ Warns if employees detected
  □ Adjusts calculations by entity
  
□ Contribution Seeding ✅
  □ Branches on existing vs future
  □ All amounts monthly
```

### Profile 4: Roth Reclaimer ✅

**Form Status**: Complete with Complex Mapping
**Implementation Status**: Complete

#### Form Mapping (Complex)
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

**Form Status**: CRITICAL ISSUE - Questions Missing
**Implementation Status**: Code complete but expects missing questions

#### Issue Details
- PROFILE_CONFIG shows `extraQuestions: [/* ... */]`
- FORM_EX_Q_MAPPING says "NO employer 401k questions"
- Code expects: ex_q1, ex_q2, ex_q4 for employer 401k

#### Required Fix
```
□ Verify actual form questions
□ Either:
  - Add employer 401k questions to form
  - OR modify code to handle missing questions
□ Update PROFILE_CONFIG with actual questions
□ Add mapping if questions exist
```

### Profile 6: Catch Up ❌

**Form Status**: CRITICAL ISSUE - Questions Missing
**Implementation Status**: Code complete but expects missing questions

#### Issue Details
- PROFILE_CONFIG shows `extraQuestions: [/* ... */]`
- FORM_EX_Q_MAPPING says "NO employer 401k questions"
- Code expects: ex_q1, ex_q2, ex_q4 for employer 401k

### Profile 7: Foundation Builder ⚠️

**Form Status**: Questions Missing but Mapping Exists
**Implementation Status**: Likely OK but needs verification

#### Existing Mapping
```javascript
'7_Foundation_Builder': {
  44: 'ex_q1',   // employer 401k
  45: 'ex_q2',   // employer match
  46: 'ex_q3',   // match percentage
  47: 'ex_q4'    // roth 401k option
}
```

### Profile 8: Biz Owner Group ❌

**Form Status**: CRITICAL ISSUE - All Questions Missing
**Implementation Status**: Code complete (December 2024) but no questions defined

#### Required Questions
| Question Needed | Maps To | Code Expects |
|-----------------|---------|--------------|
| Number of employees | ex_q1 | Number |
| Avg employee age | ex_q2 | Number |
| Avg employee salary | ex_q3 | Number |
| Have retirement plan? | ex_q4 | Yes/No |
| Plan type | ex_q5 | Text |
| Annual contribution | ex_q6 | Number |

### Profile 9: Late Stage Growth ❌

**Form Status**: CRITICAL ISSUE - Questions Missing
**Implementation Status**: Code complete but expects missing questions

## Part 5: Form Questions Verification

### Fix Priority Order
1. **HIGHEST**: Profile 8 (all 6 questions missing)
2. **HIGH**: Profiles 5, 6, 9 (employer 401k mismatch)
3. **MEDIUM**: Profile 7 (verify questions match mapping)

### Form Fix Checklist

#### Step 1: Verify Actual Forms
For each profile with issues:
- [ ] Open Google Form
- [ ] Document all questions in order
- [ ] Note question types
- [ ] Count total questions

#### Step 2: Update PROFILE_CONFIG
```javascript
// Add missing questions
'5_Bracket_Strategist': {
  extraQuestions: [
    'Do you have access to an employer 401(k)?',
    'Does your employer match contributions?',
    'What is the match percentage?',
    'Does the plan have a Roth option?'
  ],
  // ... rest of config
}
```

#### Step 3: Fix or Add Mappings
```javascript
// If questions are out of order
'5_Bracket_Strategist': {
  XX: 'ex_q1',   // find actual position
  XX: 'ex_q2',
  XX: 'ex_q3',
  XX: 'ex_q4'
}
```

## Part 6: Testing Protocol

### Level 1: Basic Smoke Test
```
For each profile:
1. Minimal data test (age 45, $75k income)
2. Verify no errors
3. Check all domains have vehicles
4. Verify overflow banks present
```

### Level 2: Calculation Tests
```
1. Age boundaries: 49→50, 54→55, 59→60, 69→70.5
2. Income phase-outs: Test around limits
3. Employment scenarios: W-2, Self, Both
4. Catch-up verification
```

### Level 3: Integration Tests
```
1. Phase 1 → Classification
2. Phase 2 form submission
3. Profile helper execution
4. Allocation calculation
5. Report field population
```

### Level 4: Edge Cases
```
1. Zero values (no kids, no HSA)
2. Maximum values (high income, max contributions)
3. Unusual combinations
4. Missing data handling
```

## Part 7: Emergency Fixes

If forms cannot be updated before Thursday:

### Option 1: Safe Defaults in Code
```javascript
// Wrap all ex_q reads with defaults
const hasEmployer401k = getValue(hdr, rowArr, HEADERS.P2_EX_Q1) || 'No';
if (hasEmployer401k === 'Yes') {
  // employer logic
}
// Skip if 'No' or missing
```

### Option 2: Profile Redirection
```javascript
// In classifyClientProfileFromWorkingSheet()
const problemProfiles = ['5_Bracket_Strategist', '6_Catch_Up', '8_Biz_Owner_Group', '9_Late_Stage_Growth'];
if (problemProfiles.includes(profile)) {
  console.warn(`Profile ${profile} has form issues, using Foundation Builder`);
  return '7_Foundation_Builder';
}
```

### Option 3: Manual Intervention
- Flag profiles needing manual review
- Add data to Working Sheet manually
- Process after data complete

## Part 8: Final Production Checklist

### Per-Profile Checklist
```
□ Code Implementation
  □ No syntax errors
  □ Universal functions used
  □ Seeds properly initialized
  □ Vehicle orders complete
  
□ Form Integration
  □ Questions defined in PROFILE_CONFIG
  □ Mapping correct in FORM_EX_Q_MAPPING
  □ All ex_q reads match actual questions
  
□ Testing Complete
  □ Basic smoke test
  □ Calculations verified
  □ Edge cases handled
  □ Integration tested
```

### System-Wide Checklist
```
□ All 9 profiles validated
□ Form questions verified or fixes implemented
□ Test suite passes
□ Error handling in place
□ Emergency fallbacks ready
□ Documentation current
□ Team aware of any issues
```

### Launch Day Checklist
```
□ Monitor form submissions
□ Check for profile assignment errors
□ Verify calculations processing
□ Watch for missing data issues
□ Have manual override ready
□ Document any problems found
```

## Quick Reference

### Profile Status Summary
- ✅ **Ready**: 1, 2, 3, 4
- ❌ **Form Issues**: 5, 6, 8, 9
- ⚠️ **Needs Verification**: 7

### Universal Functions
```javascript
calculateHsaMonthlyCapacity(hsaElig, age, filing)
calculateCesaMonthlyCapacity(numKids)
applyRothIRAPhaseOut(vehicles, {grossIncome, filingStatus, taxFocus})
addEmployer401kVehicles(baseOrder, rowArr, hdr)
prioritizeTraditionalAccounts(vehicles)
prioritizeRothAccounts(vehicles)
```

### Testing Commands
```javascript
diagnoseProfile('1_ROBS_In_Use')
showVehicleOrder('1_ROBS_In_Use')
traceAllocation('1_ROBS_In_Use')
testFormMapping()
```

---

**Created**: December 2024
**Critical For**: Thursday Launch
**Last Updated**: [Update after fixes]
**Status**: 4 profiles ready, 5 need form verification/fixes
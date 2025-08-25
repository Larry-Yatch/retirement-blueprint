# Complete Profile Fine-Tuning & Validation Guide

## Purpose
This guide provides a systematic approach to fine-tuning and validating all 9 retirement blueprint profiles. Use this to ensure each profile is properly implemented, tested, and ready for production.

## Part 1: Universal Profile Checklist

Every profile helper MUST have these components properly implemented:

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

## Part 2: Red Flags - Common Mistakes to Avoid

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

### 🚩 Seeding Errors
```javascript
// ❌ WRONG - Annual amount in seeds
seeds.Retirement['401(k)'] = 23500; // Annual amount!

// ✅ CORRECT - Monthly amount
seeds.Retirement['401(k)'] = 23500 / 12;

// ❌ WRONG - Seeding non-existent vehicle
seeds.Retirement['Mega Roth'] = 1000; // Vehicle not in order!
```

### 🚩 Vehicle Order Issues
```javascript
// ❌ WRONG - Duplicate vehicles
retirementOrder = [
  { name: 'Traditional 401(k)', capMonthly: ... },
  { name: '401(k) Traditional', capMonthly: ... }, // Duplicate!
]

// ❌ WRONG - Missing Family Bank
retirementOrder = [
  { name: '401(k)', capMonthly: ... },
  { name: 'IRA', capMonthly: ... }
  // Missing Family Bank!
]
```

### 🚩 Employment Logic Gaps
```javascript
// ❌ WRONG - Not checking employment for employer 401k
const hasEmployer401k = getValue(...) === 'Yes';
// Using without checking if W-2 employee

// ✅ CORRECT - Checking work situation first
if (isW2Employee || isBoth) {
  const hasEmployer401k = getValue(...) === 'Yes';
  if (hasEmployer401k) {
    // Add employer 401k vehicles
  }
}
```

## Part 3: Critical Calculations to Verify

### Catch-Up Contributions (Age-Based)
```
401(k) Catch-Up:
- Age 50-59: Base + $7,500/year
- Age 60+: Base + $11,250/year
- Must ADD to base, not replace

IRA Catch-Up:
- Age 50+: Base + $1,000/year
- Applies to both Traditional and Roth

HSA Catch-Up:
- Age 55+: Base + $1,000/year
```

### Employer Contribution Calculations
```
Solo 401(k) Employer:
- S-Corp/C-Corp: Up to 25% of W-2 wages
- Sole Prop/LLC: Up to 20% of net self-employment income
- Maximum: Total limit - employee contributions

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

## Part 4: Profile-Specific Validation

### Profile 1: ROBS In Use
**Critical Validations:**
```
□ Profit Distribution Logic
  □ Read annual distribution from ex_q6
  □ Seed as monthly amount (÷12)
  □ Vehicle has Infinity capacity
  
□ Contribution Type Filtering
  □ Read preference from ex_q3
  □ Filter vehicles based on Roth/Traditional/Both
  □ Profit distribution always included
  
□ Vehicle Order
  □ Profit Distribution first
  □ HSA at position 3 or 4
  □ No employer 401k vehicles
```

### Profile 2: ROBS Curious
**Critical Validations:**
```
□ Employment Branching
  □ Three paths: W-2, Self-employed, Both
  □ W-2: Use addEmployer401kVehicles()
  □ Self: Add Solo 401k vehicles
  □ Both: Coordinate limits properly
  
□ Business Planning
  □ Seed planned rollover (ex_q5)
  □ Seed business capacity (ex_q6)
  □ Check spouse involvement (ex_q7)
```

### Profile 3: Solo 401k Builder
**Critical Validations:**
```
□ Business Structure
  □ Read entity type (ex_q1)
  □ Verify no employees (ex_q2)
  □ Warn if employees detected
  
□ Contribution Seeding
  □ If existing plan: Seed from ex_q4 & ex_q5
  □ If future plan: Seed from ex_q6 only
  □ All amounts monthly
  
□ Employer Calculations
  □ Adjust based on entity type
  □ Enforce total 401k limits
```

### Profile 4: Roth Reclaimer
**Critical Validations:**
```
□ Backdoor Roth Priority
  □ Should be first or second vehicle
  □ Traditional IRA balance considered
  □ Conversion planning included
  
□ Employment Logic
  □ Check for employer 401k access
  □ May have mega backdoor option
  □ Coordinate with backdoor strategy
```

### Profile 5: Bracket Strategist
**Critical Validations:**
```
□ Tax Preference Logic
  □ Traditional prioritized for "Now"
  □ Proper reordering applied
  □ Both options available
  
□ Employment Questions
  □ VERIFY: Form has employer 401k questions
  □ If not, fix code or form
```

### Profile 6: Catch Up
**Critical Validations:**
```
□ Age Verification
  □ Confirm age >= 50
  □ All catch-ups properly added
  □ Age 60+ gets extra 401k catch-up
  
□ Multiple Sources
  □ Handle mixed employment
  □ Maximize all catch-up options
```

### Profile 7: Foundation Builder
**Critical Validations:**
```
□ Dynamic Integration
  □ addEmployer401kVehicles() called first
  □ Standard vehicles added after
  □ Most flexible profile
```

### Profile 8: Biz Owner Group
**Critical Validations:**
```
□ Employee Demographics
  □ Read all 6 demographic fields
  □ Calculate age gaps correctly
  □ DB/CB plans conditional on gaps
  
□ Advanced Vehicles
  □ Defined Benefit if age gap > 10
  □ Cash Balance if 45+ and gap > 5
  □ Mega Backdoor included
```

### Profile 9: Late Stage Growth
**Critical Validations:**
```
□ Near-Retirement Logic
  □ All catch-ups included
  □ Employment may be mixed/retired
  □ Consider adding QCD for 70.5+
```

## Part 5: Testing Protocol

### Step 1: Basic Smoke Test
For each profile:
```
1. Create minimal test data:
   - Age: 45
   - Income: $75,000
   - Filing: Single
   - No special circumstances
   
2. Run profile helper
3. Verify no errors
4. Check seeds object has all domains
5. Check all domains have vehicles
6. Verify Family Bank is last
```

### Step 2: Calculation Test
```
1. Age Boundary Tests:
   - Test at ages: 49, 50, 54, 55, 59, 60, 70, 71
   - Verify catch-ups apply correctly
   - Check HSA catch-up at 55
   
2. Income Phase-Out Tests:
   - Test around Roth IRA limits
   - Verify switches to Backdoor
   - Check proper capacity reduction
   
3. Employment Scenarios:
   - W-2 only
   - Self-employed only
   - Both
   - Verify correct vehicles appear
```

### Step 3: Edge Case Test
```
1. Zero Values:
   - No children (CESA = 0)
   - No HSA eligibility
   - Zero income scenarios
   
2. Maximum Values:
   - Very high income
   - Maximum contributions
   - All vehicles at capacity
   
3. Unusual Combinations:
   - High age + low income
   - Self-employed + W-2
   - Multiple business entities
```

### Step 4: Integration Test
```
1. Full Flow Test:
   - Start with Phase 1 data
   - Run classification
   - Process Phase 2 data
   - Run profile helper
   - Execute allocation
   - Verify results
   
2. Output Validation:
   - All fields populated
   - Calculations correct
   - No missing data
   - Reasonable results
```

## Part 6: Validation Commands

### Profile Testing Commands
```javascript
// Basic validation
diagnoseProfile('1_ROBS_In_Use')
showVehicleOrder('1_ROBS_In_Use')
traceAllocation('1_ROBS_In_Use')

// Test with specific data
testProfile1Basic()     // Create these
testProfile1CatchUp()   // test functions
testProfile1EdgeCases() // as needed

// Verify calculations
validateCatchUpLogic('1_ROBS_In_Use', age)
validatePhaseOutLogic('1_ROBS_In_Use', income)
```

### System-Wide Validation
```javascript
// Test all profiles
testAllProfiles()

// Verify form mappings
testFormMapping()

// Check universal functions
testUniversalFunctions()
```

## Part 7: Final Checklist Before Production

### Per-Profile Checklist
```
□ Profile Helper Function
  □ No syntax errors
  □ All required fields collected
  □ Universal functions used
  □ Seeds properly initialized
  □ Vehicle orders complete
  □ Return structure correct
  
□ Form Integration
  □ Questions defined in PROFILE_CONFIG
  □ Mapping in FORM_EX_Q_MAPPING if needed
  □ All ex_q reads have matching questions
  
□ Testing
  □ Basic smoke test passes
  □ Calculations verified
  □ Edge cases handled
  □ Integration test complete
  
□ Documentation
  □ Profile .md file updated
  □ Test scenarios documented
  □ Known issues listed
```

### System-Wide Checklist
```
□ All 9 profiles validated
□ Form questions verified
□ Test suite complete
□ Error handling in place
□ Performance acceptable
□ Documentation current
```

## Appendix: Quick Reference

### Universal Functions
- `calculateHsaMonthlyCapacity(hsaElig, age, filing)`
- `calculateCesaMonthlyCapacity(numKids)`
- `applyRothIRAPhaseOut(vehicles, {grossIncome, filingStatus, taxFocus})`
- `addEmployer401kVehicles(baseOrder, rowArr, hdr)`
- `prioritizeTraditionalAccounts(vehicles)`
- `prioritizeRothAccounts(vehicles)`

### Common Patterns
```javascript
// Safe field reading
const value = getValue(hdr, rowArr, HEADERS.FIELD) || defaultValue;

// Conditional vehicle
if (condition) {
  order.push({ name: 'Vehicle', capMonthly: calculated });
}

// Dynamic capacity
const cap = age >= 50 ? enhancedAmount : baseAmount;
```

---

**Created**: December 2024
**Purpose**: Comprehensive guide for profile fine-tuning
**Use**: Before testing and production deployment
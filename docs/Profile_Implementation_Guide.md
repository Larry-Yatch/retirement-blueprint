# Profile Implementation Guide

## 🚀 Quick Reference - Start Here

```javascript
// 1. ALWAYS validate headers first
const validation = validateHeaders();
if (!validation.valid) { /* FIX THIS FIRST */ }

// 2. ALWAYS use HEADERS constants
const age = getValue(hdr, rowArr, HEADERS.CURRENT_AGE); // ✅
const age = getValue(hdr, rowArr, 'Current_Age');       // ❌

// 3. ALWAYS provide defaults
const income = Number(getValue(...)) || 75000;  // ✅
const income = Number(getValue(...));            // ❌

// 4. Debug helpers when something's wrong
diagnoseProfile('7_Foundation_Builder');     // Full diagnosis
showVehicleOrder('7_Foundation_Builder');    // See priority order
traceAllocation('7_Foundation_Builder');     // See why vehicles skip
```

## 📊 Profile Status Overview

| Profile | Universal Functions | Employment Logic | Form Questions | Implementation Status | Priority |
|---------|-------------------|------------------|----------------|---------------------|----------|
| 1_ROBS_In_Use | ✅ Complete | N/A | Original | ✅ Enhanced (HSA position) | Complete |
| 2_ROBS_Curious | ✅ Complete | ✅ W-2/Self/Both | ✅ Updated | ✅ TUNED | Complete |
| 3_Solo401k_Builder | ✅ Complete | N/A | Original | ✅ TUNED | Complete |
| 4_Roth_Reclaimer | ✅ Complete | ✅ W-2/Self/Both | ✅ Updated | ✅ Enhanced | Complete |
| 5_Bracket_Strategist | ✅ Complete | ✅ W-2/Self/Both | ✅ Updated | ✅ Enhanced | Complete |
| 6_Catch_Up | ✅ Complete | ✅ W-2/Self/Both | ✅ Updated | ✅ Enhanced | Complete |
| 7_Foundation_Builder | ✅ Complete | ✅ Original | Original | ✅ COMPLETE | Reference |
| 8_Biz_Owner_Group | ✅ Complete | N/A | Original | ✅ Enhanced (new vehicles) | Complete |
| 9_Late_Stage_Growth | ✅ Complete | ✅ W-2/Self/Both | ✅ Updated | ✅ Enhanced | Complete |

## 🏗️ Standard Profile Structure

Every profile MUST follow this structure:

```javascript
'[ProfileID]': function(rowArr, hdr) {
  // 1. Extract data with HEADERS constants and defaults
  const age = Number(getValue(hdr, rowArr, HEADERS.CURRENT_AGE)) || 35;
  const grossIncome = Number(getValue(hdr, rowArr, HEADERS.GROSS_ANNUAL_INCOME)) || 75000;
  const filing = getValue(hdr, rowArr, HEADERS.FILING_STATUS) || 'Single';
  const workSituation = getValue(hdr, rowArr, HEADERS.WORK_SITUATION);
  const taxFocus = getValue(hdr, rowArr, HEADERS.TAX_MINIMIZATION) || 'Both';
  const hsaElig = getValue(hdr, rowArr, HEADERS.P2_HSA_ELIGIBILITY) === 'Yes';
  const numKids = Number(getValue(hdr, rowArr, HEADERS.P2_CESA_NUM_CHILDREN)) || 0;
  
  // 2. Calculate capacities using universal functions
  const hsaCap = calculateHsaMonthlyCapacity(hsaElig, age, filing);
  const cesaCap = calculateCesaMonthlyCapacity(numKids);
  
  // 3. Build Education order
  const educationOrder = [];
  if (cesaCap > 0) {
    educationOrder.push({ name: 'Combined CESA', capMonthly: cesaCap });
  }
  educationOrder.push({ name: 'Education Bank', capMonthly: Infinity });
  
  // 4. Build Health order
  const healthOrder = [];
  if (hsaCap > 0) {
    healthOrder.push({ name: 'HSA', capMonthly: hsaCap });
  }
  healthOrder.push({ name: 'Health Bank', capMonthly: Infinity });
  
  // 5. Build Retirement order
  let baseRetirementOrder = [];
  
  // Add employment-specific vehicles
  const isSelfEmployed = workSituation === 'Self-employed' || workSituation === 'Both';
  const isW2Employee = workSituation === 'W-2 employee' || workSituation === 'Both';
  
  if (isW2Employee) {
    baseRetirementOrder = addEmployer401kVehicles(baseRetirementOrder, {
      rowArr, hdr, age, grossIncome
    });
  }
  
  // Add IRAs with phase-out
  const iraCap = age >= 50 
    ? (LIMITS.RETIREMENT.TRADITIONAL_IRA + LIMITS.RETIREMENT.CATCHUP_IRA) / 12
    : LIMITS.RETIREMENT.TRADITIONAL_IRA / 12;
    
  baseRetirementOrder.push({ name: 'Traditional IRA', capMonthly: iraCap });
  baseRetirementOrder.push({ name: 'Roth IRA', capMonthly: iraCap });
  
  // 6. Apply phase-outs and preferences
  baseRetirementOrder = applyRothIRAPhaseOut(baseRetirementOrder, {
    grossIncome,
    filingStatus: filing,
    taxFocus
  });
  
  // Apply tax preference
  if (taxFocus === 'Now') {
    baseRetirementOrder = prioritizeTraditionalAccounts(baseRetirementOrder);
  } else if (taxFocus === 'Later') {
    baseRetirementOrder = prioritizeRothAccounts(baseRetirementOrder);
  }
  
  // 7. Complete retirement order with Family Bank
  const retirementOrder = baseRetirementOrder.concat({ 
    name: 'Family Bank', 
    capMonthly: Infinity 
  });
  
  // 8. Return standard structure
  return {
    seeds: { 
      Education: {}, 
      Health: {}, 
      Retirement: {} 
    },
    vehicleOrders: {
      Education: educationOrder,
      Health: healthOrder,
      Retirement: retirementOrder
    }
  };
}
```

## 📋 Universal Functions Checklist

Every profile MUST call these functions:

✅ `calculateHsaMonthlyCapacity(hsaElig, age, filing)`
✅ `calculateCesaMonthlyCapacity(numKids)`
✅ `applyRothIRAPhaseOut(baseRetirementOrder, {...})`
✅ `prioritizeTraditionalAccounts(baseRetirementOrder)` OR `prioritizeRothAccounts(baseRetirementOrder)`

## 🎯 Profile-Specific Implementation Details

### Profile 1: ROBS_In_Use
- **Status**: Infrastructure complete, tuning not started
- **Unique Features**: 
  - Unlimited profit distributions from C-Corp
  - ROBS Solo 401(k) special rules
  - Reasonable compensation requirements
- **Implementation Notes**:
  - Focus on profit distribution optimization
  - Handle C-Corp compliance rules
  - Multiple contribution streams
- **Next Steps**: Review allocation priorities for ROBS vehicles

### Profile 2: ROBS_Curious ✅ COMPLETE
- **Status**: TUNED - Major overhaul complete
- **Key Implementation**:
  ```javascript
  // Dynamic vehicle selection based on employment
  if (isW2Employee) {
    baseRetirementOrder = addEmployer401kVehicles(baseRetirementOrder, params);
  }
  if (isSelfEmployed) {
    const totalSavings = Number(getValue(hdr, rowArr, HEADERS.P2_EX_Q6)) || 0;
    const spouseInBusiness = getValue(hdr, rowArr, HEADERS.P2_EX_Q7) === 'Yes';
    const monthlyCap = totalSavings / 12;
    baseRetirementOrder.push({ 
      name: spouseInBusiness ? 'Solo 401(k) (with spouse)' : 'Solo 401(k)',
      capMonthly: monthlyCap
    });
  }
  ```
- **Form Mapping**:
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

### Profile 3: Solo401k_Builder
- **Status**: Infrastructure complete, tuning not started
- **Unique Features**:
  - Employee/employer contribution split
  - Business structure impacts (Sole Prop vs S-Corp)
  - Seeding from existing balances
- **Implementation Considerations**:
  - Review seeding logic carefully
  - Handle profit sharing optimization
  - Different rules for different business types
- **Priority**: 4 (moderate complexity)

### Profile 4: Roth_Reclaimer ✅ COMPLETE
- **Status**: TUNED - Sophisticated backdoor Roth logic
- **Key Implementation**:
  ```javascript
  // Dynamic IRA strategy
  const hasTraditionalIRA = getValue(hdr, rowArr, HEADERS.P2_EX_Q5) === 'Yes';
  const understandsBackdoor = getValue(hdr, rowArr, HEADERS.P2_EX_Q7) === 'Yes';
  
  if (needsBackdoorRoth && !hasTraditionalIRA && understandsBackdoor) {
    baseRetirementOrder.push({ 
      name: 'Backdoor Roth IRA',
      capMonthly: LIMITS.RETIREMENT.ROTH_IRA / 12
    });
  }
  ```
- **Test Results**: All backdoor scenarios validated

### Profile 5: Bracket_Strategist ✅ ENHANCED
- **Status**: Complete with employment-based logic
- **Focus**: Tax bracket optimization
- **Implementation**: 
  - Traditional-first ordering
  - Employment-based branching (W-2/Self-employed/Both)
  - HSA moved to position 2 for tax efficiency
- **Key Features**: Dynamic vehicle generation based on work situation
- **Next Steps**: Test with various income levels and employment scenarios

### Profile 6: Catch_Up ✅ ENHANCED
- **Status**: Complete with employment-based logic
- **Focus**: Maximum contributions with catch-up
- **Key Limits**:
  - 401(k): $30,500 (50+), $34,250 (60+)
  - IRA: $8,000 (50+)
  - HSA: +$1,000 (55+)
- **Implementation**:
  - Employment-based branching
  - HSA moved to position 2 after employer match
  - All vehicles include catch-up naming
- **Next Steps**: Verify catch-up calculations across employment types

### Profile 7: Foundation_Builder ✅ REFERENCE
- **Status**: COMPLETE - Original implementation
- **Use as**: Template for other profiles
- **Key Features**: Standard employer 401(k) integration

### Profile 8: Biz_Owner_Group ✅ ENHANCED
- **Status**: Complete with advanced vehicles
- **Unique Features**:
  - Defined Benefit Plan
  - Cash Balance Plan (age 45+)
  - After-Tax 401(k) → Mega Backdoor Roth
  - Group 401(k) with profit sharing
  - HSA moved to position 4
- **Implementation**: Sophisticated vehicle order for high-net-worth business owners
- **Next Steps**: Add employee demographics questions

### Profile 9: Late_Stage_Growth ✅ ENHANCED
- **Status**: Complete with comprehensive retirement features
- **Focus**: Pre-retirement optimization
- **Implementation**:
  - Employment-based branching (handles phased retirement)
  - Roth Conversions strategy placeholder
  - Qualified Charitable Distribution Planning (age 70.5+)
  - HSA prioritized for Medicare bridge planning
- **Key Features**: Supports W-2, Self-employed, and mixed scenarios common in phased retirement
- **Next Steps**: Consider adding alternative investment vehicles

## ⏱️ Efficient Profile Tuning Process

### Phase 1: Analysis (30 minutes)
1. Write one paragraph about who this profile serves
2. Review current implementation
3. Document what each ex_q is used for
4. Run existing profile to see baseline

### Phase 2: Planning (20 minutes)
1. Sketch logic flow on paper
2. List vehicles in priority order
3. Identify edge cases
4. Find simplification opportunities

### Phase 3: Implementation (1-2 hours)
1. Start with standard structure
2. Use all universal functions
3. Add profile-specific logic
4. Test with multiple scenarios

### Phase 4: Testing (30 minutes)
1. Run header validation first
2. Use debug helpers if issues
3. Test edge cases
4. Verify no Taxable Brokerage

### Phase 5: Documentation (15 minutes)
1. Update this guide
2. Note special behaviors
3. Document test scenarios
4. Update status tracking

## 🛡️ Common Patterns

### Employment Logic
```javascript
const isSelfEmployed = workSituation === 'Self-employed' || workSituation === 'Both';
const isW2Employee = workSituation === 'W-2 employee' || workSituation === 'Both';

if (isW2Employee) {
  baseRetirementOrder = addEmployer401kVehicles(baseRetirementOrder, {
    rowArr, hdr, age, grossIncome
  });
}

if (isSelfEmployed) {
  // Profile-specific Solo 401(k) logic
}
```

### IRA with Catch-Up
```javascript
const iraCap = age >= 50 
  ? (LIMITS.RETIREMENT.TRADITIONAL_IRA + LIMITS.RETIREMENT.CATCHUP_IRA) / 12
  : LIMITS.RETIREMENT.TRADITIONAL_IRA / 12;

baseRetirementOrder.push({ name: 'Traditional IRA', capMonthly: iraCap });
baseRetirementOrder.push({ name: 'Roth IRA', capMonthly: iraCap });
```

### Phase-Out Application
```javascript
baseRetirementOrder = applyRothIRAPhaseOut(baseRetirementOrder, {
  grossIncome,
  filingStatus: filing,
  taxFocus
});
```

## ❌ Common Mistakes to Avoid

1. **Hardcoded Headers** - Always use HEADERS constants
2. **Missing Defaults** - getValue() can return undefined
3. **Taxable Brokerage** - Use Family Bank only
4. **Wrong Header Row** - Working Sheet uses row 2
5. **Hardcoded Limits** - Use LIMITS constants
6. **Forgetting Universal Functions** - Check the checklist
7. **Not Testing Edge Cases** - High income, no benefits, etc.

## 📊 Form Mapping Reference

When adding profile questions:
1. Universal questions: Positions 0-43
2. Profile questions: Start at position 44+
3. Update FORM_EX_Q_MAPPING in Code.js
4. Employer 401(k) questions should map to ex_q1-4

Current mappings:
```javascript
FORM_EX_Q_MAPPING = {
  '2_ROBS_Curious': { 46: 'ex_q1', 47: 'ex_q2', ... },
  '4_Roth_Reclaimer': { 44: 'ex_q1', 45: 'ex_q2', ... },
  '5_Bracket_Strategist': { 44: 'ex_q1', 45: 'ex_q2', ... },
  '6_Catch_Up': { 44: 'ex_q1', 45: 'ex_q2', ... },
  '9_Late_Stage_Growth': { 44: 'ex_q1', 45: 'ex_q2', ... }
}
```

## 🎯 Priority Order for Remaining Work

1. **Profile 5: Bracket Strategist** (3-4 hours) - Infrastructure ready
2. **Profile 6: Catch-Up Visionary** (3-4 hours) - Infrastructure ready
3. **Profile 9: Late Stage Growth** (4-5 hours) - Infrastructure ready
4. **Profile 3: Solo 401(k) Builder** (5-6 hours) - Seeding logic needed
5. **Profile 1: ROBS In Use** (6-8 hours) - Complex ROBS rules
6. **Profile 8: Business Owner Group** (8-10 hours) - Most complex

## 🚀 Next Steps

1. Start with Profile 5 (easiest remaining)
2. Use established patterns from Profiles 2 & 4
3. Test incrementally
4. Document as you go

Remember: Every hour spent on proper setup saves 3+ hours of debugging!
# Profile Tuning Quick Reference Card

## 🚀 Start Here Every Time

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
```

## 📋 Universal Functions Checklist

Every profile MUST call these:
```javascript
✅ const hsaCap = calculateHsaMonthlyCapacity(hsaElig, age, filing);
✅ const cesaCap = calculateCesaMonthlyCapacity(numKids);
✅ baseRetirementOrder = applyRothIRAPhaseOut(baseRetirementOrder, {...});
✅ baseRetirementOrder = prioritizeTraditionalAccounts(baseRetirementOrder); // OR
✅ baseRetirementOrder = prioritizeRothAccounts(baseRetirementOrder);
```

## 🏗️ Standard Structure

```javascript
'[ProfileID]': function(rowArr, hdr) {
  // 1. Extract data (with defaults!)
  // 2. Calculate capacities
  // 3. Build Education order → Education Bank
  // 4. Build Health order → Health Bank  
  // 5. Build Retirement order → Family Bank (NO Taxable!)
  // 6. Apply phase-outs and preferences
  // 7. Return { seeds, vehicleOrders }
}
```

## 💼 Employment Patterns

```javascript
// Check employment status
const isSelfEmployed = workSituation === 'Self-employed' || workSituation === 'Both';
const isW2Employee = workSituation === 'W-2 employee' || workSituation === 'Both';

// Add employer 401(k) if W-2
if (isW2Employee) {
  baseRetirementOrder = addEmployer401kVehicles(baseRetirementOrder, {
    hasEmployer401k: getValue(hdr, rowArr, HEADERS.P2_EX_Q1) === 'Yes',
    hasEmployerMatch: getValue(hdr, rowArr, HEADERS.P2_EX_Q2) === 'Yes',
    matchPercentage: getValue(hdr, rowArr, HEADERS.P2_EX_Q3),
    hasRoth401k: getValue(hdr, rowArr, HEADERS.P2_EX_Q4) === 'Yes',
    age,
    grossIncome
  });
}

// Add Solo 401(k) if self-employed
if (isSelfEmployed) {
  // Profile-specific Solo 401(k) logic
}
```

## 🎯 IRA Patterns

```javascript
// Calculate IRA limit with catch-up
const iraCap = age >= 50 
  ? (LIMITS.RETIREMENT.TRADITIONAL_IRA + LIMITS.RETIREMENT.CATCHUP_IRA) / 12
  : LIMITS.RETIREMENT.TRADITIONAL_IRA / 12;

// Basic IRA addition
baseRetirementOrder.push({ name: 'Traditional IRA', capMonthly: iraCap });
baseRetirementOrder.push({ name: 'Roth IRA', capMonthly: iraCap });

// Apply phase-out (this handles Backdoor Roth automatically)
baseRetirementOrder = applyRothIRAPhaseOut(baseRetirementOrder, {
  grossIncome,
  filingStatus: filing,
  taxFocus
});
```

## 🛡️ Common Gotchas

### ❌ NEVER Do This:
```javascript
// Hardcoded headers
getValue(hdr, rowArr, 'Current_Age')

// No defaults
Number(getValue(...))  // Could be NaN!

// Taxable Brokerage
baseRetirementOrder.push({ name: 'Taxable Brokerage', capMonthly: Infinity });

// Wrong header row
ws.getRange(1, 1, 1, ws.getLastColumn())  // Row 1 is wrong!

// Hardcoded limits
{ name: 'Roth IRA', capMonthly: 583 }  // Use LIMITS constant!
```

### ✅ ALWAYS Do This:
```javascript
// Use HEADERS constant
getValue(hdr, rowArr, HEADERS.CURRENT_AGE)

// Provide defaults
Number(getValue(...)) || 75000

// Family Bank only
retirementOrder.concat({ name: 'Family Bank', capMonthly: Infinity })

// Correct header row
ws.getRange(2, 1, 1, ws.getLastColumn())  // Row 2!

// Use LIMITS constant
{ name: 'Roth IRA', capMonthly: LIMITS.RETIREMENT.ROTH_IRA / 12 }
```

## 🧪 Test Pattern

```javascript
function testProfileX() {
  // 1. Validate headers FIRST
  const validation = validateHeaders();
  if (!validation.valid) return;
  
  // 2. Create scenarios
  const scenarios = [
    { name: 'Basic', data: { /* minimal data */ } },
    { name: 'Complex', data: { /* all features */ } },
    { name: 'Edge Case', data: { /* limits/phase-outs */ } }
  ];
  
  // 3. Test each scenario
  scenarios.forEach(scenario => {
    const testData = generateTestData();
    // Apply scenario data
    // Run helper
    // Verify results
  });
}
```

## 📝 Form Mapping

When form questions are reordered:
```javascript
FORM_EX_Q_MAPPING = {
  'ProfileID': {
    10: 'ex_q1',  // Form position 10 → ex_q1
    11: 'ex_q2',  // Form position 11 → ex_q2
    // etc...
  }
}
```

## ⏱️ Time Savers

1. **Copy from template** - Don't start from scratch
2. **Validate headers first** - Prevents hours of debugging
3. **Test early and often** - Push to Google Apps Script frequently
4. **Start simple** - Add complexity only if needed
5. **Use existing patterns** - Copy from Profile 2 or 4

## 🎯 Final Checklist

Before marking complete:
- [ ] Headers validated
- [ ] All universal functions used
- [ ] No Taxable Brokerage
- [ ] Proper defaults everywhere
- [ ] Test scenarios pass
- [ ] Documentation updated

## 🔥 Copy-Paste Snippets

```javascript
// Standard data extraction
const age = Number(getValue(hdr, rowArr, HEADERS.CURRENT_AGE));
const grossIncome = Number(getValue(hdr, rowArr, HEADERS.GROSS_ANNUAL_INCOME)) || 75000;
const filing = getValue(hdr, rowArr, HEADERS.FILING_STATUS);
const workSituation = getValue(hdr, rowArr, HEADERS.WORK_SITUATION);
const taxFocus = getValue(hdr, rowArr, HEADERS.TAX_MINIMIZATION);
const hsaElig = getValue(hdr, rowArr, HEADERS.P2_HSA_ELIGIBILITY) === 'Yes';
const numKids = Number(getValue(hdr, rowArr, HEADERS.P2_CESA_NUM_CHILDREN)) || 0;

// Standard vehicle order ending
const retirementOrder = baseRetirementOrder.concat({ 
  name: 'Family Bank', 
  capMonthly: Infinity 
});

// Standard return
return {
  seeds: { Education: {}, Health: {}, Retirement: {} },
  vehicleOrders: {
    Education: educationOrder,
    Health: healthOrder,
    Retirement: retirementOrder
  }
};
```
# Profile Tuning Guide

## 🚀 Quick Reference - Start Here Every Time

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

## ⏱️ Efficient Profile Tuning Process

### Phase 1: Analysis (30 minutes)
1. **Profile Identity**: Write one paragraph about who this profile serves
2. **Current Implementation Review**: 
   - Check existing vehicle order
   - Note any hardcoded values
   - Identify missing universal functions
3. **Extra Questions Analysis**: Document what each ex_q is used for
4. **Quick Test**: Run existing profile to see baseline behavior

### Phase 2: Planning (20 minutes)
1. **Decision Tree**: Sketch out the logic flow on paper first
2. **Vehicle Priority**: List vehicles in order for each scenario
3. **Edge Cases**: List known edge cases to handle
4. **Simplification Opportunities**: What can be simplified?

### Phase 3: Implementation (1-2 hours)
1. Start with the standard structure
2. Use all universal functions
3. Add employment-specific logic (employer 401k, Solo 401k)
4. Apply phase-outs and preferences
5. Test with multiple scenarios

### Phase 4: Testing (30 minutes)
1. Run header validation first
2. Test basic scenario
3. Test complex scenario with all features
4. Test edge cases (phase-outs, limits)
5. Verify no Taxable Brokerage appears

### Phase 5: Documentation (15 minutes)
1. Update profile documentation
2. Note any special behaviors
3. Document test scenarios used
4. Update tracking logs

## 💼 Employment Patterns

```javascript
// Check employment status
const isSelfEmployed = workSituation === 'Self-employed' || workSituation === 'Both';
const isW2Employee = workSituation === 'W-2 employee' || workSituation === 'Both';

// Add employer 401(k) if W-2
if (isW2Employee) {
  baseRetirementOrder = addEmployer401kVehicles(baseRetirementOrder, {
    rowArr, hdr, age, grossIncome
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

## 🛡️ Major Time Sinks & Solutions

### 1. Header Mismatch Issues (3+ hours wasted on Profile 2)
**Problem**: Test functions failed due to header mismatches

**Solution**:
- Always use Working Sheet row 2 headers
- Use the HEADERS constant from Code.js
- Run `validateHeaders()` before any test

### 2. Complex Questions (2+ hours redesigning)
**Problem**: Initial questions too complex for users

**Solution**: Start simple, add complexity only if needed
- Example: Solo 401(k) simplified to just "total savings capacity"

### 3. Form Question Mapping (1+ hour debugging)
**Problem**: Form questions not in expected order

**Solution**: 
- Check Current_Forms_Full.js for actual positions
- Update FORM_EX_Q_MAPPING with correct positions
- Profile questions start at position 44+

### 4. Employer 401(k) Questions Missing
**Problem**: Code expects ex_q1-ex_q4 but forms don't have questions

**Solution**: Add these 4 questions when tuning profiles that need them:
1. Does your employer offer a 401(k)?
2. Does your employer match?
3. What percentage match?
4. Roth option available?

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

// Standard capacity calculations
const hsaCap = calculateHsaMonthlyCapacity(hsaElig, age, filing);
const cesaCap = calculateCesaMonthlyCapacity(numKids);

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

## ❌ Common Gotchas to Avoid

### NEVER Do This:
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

### ALWAYS Do This:
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

## 🎯 Final Checklist

Before marking a profile complete:
- [ ] Headers validated - no hardcoded strings
- [ ] All universal functions used
- [ ] Employment logic correct (W-2, self-employed, both)
- [ ] IRA phase-out applied
- [ ] Tax preference applied (Traditional vs Roth)
- [ ] No Taxable Brokerage anywhere
- [ ] Proper defaults on all getValue() calls
- [ ] Test scenarios pass
- [ ] Form mapping updated if needed
- [ ] Documentation updated

## 📝 Testing Pattern

```javascript
function testProfileX() {
  // 1. Validate headers FIRST
  const validation = validateHeaders();
  if (!validation.valid) {
    console.error('Header validation failed:', validation.missingHeaders);
    return;
  }
  
  // 2. Create scenarios
  const scenarios = [
    { name: 'Basic W-2', data: { workSituation: 'W-2 employee' } },
    { name: 'Self-employed', data: { workSituation: 'Self-employed' } },
    { name: 'High income phase-out', data: { grossIncome: 250000 } },
    { name: 'With kids and HSA', data: { numKids: 2, hsaElig: 'Yes' } }
  ];
  
  // 3. Test each scenario
  scenarios.forEach(scenario => {
    console.log(`Testing ${scenario.name}...`);
    const testData = generateTestData();
    // Apply scenario data
    // Run helper
    // Verify results
  });
}
```

## 💡 Key Lessons from Profile Tuning

1. **Validate headers first** - Saves hours of debugging
2. **Start simple** - Complex questions confuse users
3. **Check form positions** - Never assume question order
4. **Use existing patterns** - Copy from working profiles
5. **Test incrementally** - Push to Google often
6. **Document as you go** - Future you will thank you

## 🚨 When Things Go Wrong

1. **Test fails with "Header not found"**
   - Run validateHeaders()
   - Check you're using row 2
   - Verify HEADERS constant usage

2. **Form values in wrong columns**
   - Check FORM_EX_Q_MAPPING
   - Verify form question positions
   - Add debug logging to remapFormValues

3. **Unexpected vehicle appears**
   - Check for Taxable Brokerage
   - Verify employment logic
   - Check phase-out functions

4. **Missing employer 401(k)**
   - Verify questions exist in form
   - Check ex_q1-ex_q4 mapping
   - Ensure addEmployer401kVehicles called

Remember: Every hour spent on proper setup saves 3+ hours of debugging!
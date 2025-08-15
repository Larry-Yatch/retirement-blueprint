# Profile Helper Functions - Universal Functions Analysis

## Universal Functions Available

1. **calculateHsaMonthlyCapacity(hsaEligible, age, filingStatus)** - Lines 820-828
   - Calculates HSA monthly capacity based on eligibility, age (55+ catch-up), and filing status
   
2. **calculateCesaMonthlyCapacity(numChildren)** - Lines 830-832
   - Calculates CESA monthly capacity based on number of children
   
3. **addEmployer401kVehicles(baseOrder, params)** - Lines 722-775
   - Adds employer 401(k) vehicles based on extra questions about employer plans
   
4. **applyRothIRAPhaseOut(vehicleOrder, params)** - Lines 682-720
   - Applies Roth IRA phase-out rules based on income and filing status
   
5. **prioritizeTraditionalAccounts(vehicleOrder)** - Lines 777-795
   - Reorders vehicles to prioritize Traditional accounts for current tax savings
   
6. **prioritizeRothAccounts(vehicleOrder)** - Lines 797-817
   - Reorders vehicles to prioritize Roth accounts for tax-free growth

## Profile Analysis Summary Table

| Profile | Uses calculateHsa | Uses calculateCesa | Uses addEmployer401k | Uses applyRothIRA | Uses prioritizeTrad | Uses prioritizeRoth | Missing Functions |
|---------|------------------|-------------------|---------------------|-------------------|-------------------|-------------------|-------------------|
| 1_ROBS_In_Use | ❌ Manual | ❌ Manual | N/A | ❌ | ✅ | ✅ | calculateHsa, calculateCesa, applyRothIRA |
| 2_ROBS_Curious | ✅ | ✅ | N/A | ❌ | ✅ | ✅ | applyRothIRA |
| 3_Solo401k_Builder | ✅ | ✅ | N/A | ❌ | ✅ | ✅ | applyRothIRA |
| 4_Roth_Reclaimer | ✅ | ✅ | N/A | ❌ | ✅ | ✅ | applyRothIRA |
| 5_Bracket_Strategist | ✅ | ✅ | N/A | ❌ | ✅ | ✅ | applyRothIRA |
| 6_Catch_Up | ✅ | ✅ | N/A | ❌ | ✅ | ✅ | applyRothIRA |
| 7_Foundation_Builder | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | None - Uses all! |
| 8_Biz_Owner_Group | ✅ | ✅ | N/A | ❌ | ✅ | ✅ | applyRothIRA |
| 9_Late_Stage_Growth | ✅ | ✅ | N/A | ❌ | ✅ | ✅ | applyRothIRA |

## Detailed Analysis by Profile

### 1. **1_ROBS_In_Use** (Lines 939-1017)

**Currently Using:**
- prioritizeTraditionalAccounts (line 984)
- prioritizeRothAccounts (line 987)

**NOT Using (but should):**
- calculateHsaMonthlyCapacity - Currently calculating manually (lines 949-954)
- calculateCesaMonthlyCapacity - Currently calculating manually (line 955)
- applyRothIRAPhaseOut - Missing income-based phase-out logic

**Manual HSA Calculation (lines 949-954):**
```javascript
let hsaCap = 0;
if (hsaElig) {
  const type = (filing === 'Married Filing Jointly') ? 'FAMILY' : 'INDIVIDUAL';
  const base = LIMITS.HEALTH.HSA[type];
  const catchup = age >= 55 ? LIMITS.HEALTH.HSA.CATCHUP : 0;
  hsaCap = (base + catchup) / 12;
}
```

**Manual CESA Calculation (line 955):**
```javascript
const cesaCap = (CONFIG.ANNUAL_CESA_LIMIT * numKids) / 12;
```

### 2. **2_ROBS_Curious** (Lines 1018-1090)

**Currently Using:**
- calculateHsaMonthlyCapacity (line 1028)
- calculateCesaMonthlyCapacity (line 1029)
- prioritizeTraditionalAccounts (line 1073)
- prioritizeRothAccounts (line 1076)

**NOT Using (but should):**
- applyRothIRAPhaseOut - Missing income-based phase-out logic

### 3. **3_Solo401k_Builder** (Lines 842-931)

**Currently Using:**
- calculateHsaMonthlyCapacity (line 859)
- calculateCesaMonthlyCapacity (line 860)
- prioritizeTraditionalAccounts (line 914)
- prioritizeRothAccounts (line 917)

**NOT Using (but should):**
- applyRothIRAPhaseOut - Missing income-based phase-out logic

### 4. **4_Roth_Reclaimer** (Lines 1091-1163)

**Currently Using:**
- calculateHsaMonthlyCapacity (line 1101)
- calculateCesaMonthlyCapacity (line 1102)
- prioritizeTraditionalAccounts (line 1146)
- prioritizeRothAccounts (line 1149)

**NOT Using (but should):**
- applyRothIRAPhaseOut - This profile specifically deals with Roth IRAs and should apply phase-out rules

### 5. **5_Bracket_Strategist** (Lines 1164-1236)

**Currently Using:**
- calculateHsaMonthlyCapacity (line 1174)
- calculateCesaMonthlyCapacity (line 1175)
- prioritizeTraditionalAccounts (line 1219)
- prioritizeRothAccounts (line 1222)

**NOT Using (but should):**
- applyRothIRAPhaseOut - Tax-focused profile should consider income phase-outs

### 6. **6_Catch_Up** (Lines 1237-1309)

**Currently Using:**
- calculateHsaMonthlyCapacity (line 1247)
- calculateCesaMonthlyCapacity (line 1248)
- prioritizeTraditionalAccounts (line 1292)
- prioritizeRothAccounts (line 1295)

**NOT Using (but should):**
- applyRothIRAPhaseOut - Catch-up eligible users may have high incomes subject to phase-outs

### 7. **7_Foundation_Builder** (Lines 1310-1392)

**Currently Using ALL:**
- calculateHsaMonthlyCapacity (line 1320)
- calculateCesaMonthlyCapacity (line 1321)
- addEmployer401kVehicles (line 1358)
- applyRothIRAPhaseOut (line 1366)
- prioritizeTraditionalAccounts (line 1375)
- prioritizeRothAccounts (line 1378)

**This is the ONLY profile using all universal functions correctly!**

### 8. **8_Biz_Owner_Group** (Lines 1393-1465)

**Currently Using:**
- calculateHsaMonthlyCapacity (line 1403)
- calculateCesaMonthlyCapacity (line 1404)
- prioritizeTraditionalAccounts (line 1448)
- prioritizeRothAccounts (line 1451)

**NOT Using (but should):**
- applyRothIRAPhaseOut - Business owners may have varying incomes subject to phase-outs
- addEmployer401kVehicles - Business owners with employees likely have employer plans

### 9. **9_Late_Stage_Growth** (Lines 1466-1538)

**Currently Using:**
- calculateHsaMonthlyCapacity (line 1476)
- calculateCesaMonthlyCapacity (line 1477)
- prioritizeTraditionalAccounts (line 1521)
- prioritizeRothAccounts (line 1524)

**NOT Using (but should):**
- applyRothIRAPhaseOut - Late-stage users may have accumulated high incomes

## Key Improvements Needed

### 1. **1_ROBS_In_Use** - Critical Updates Needed
- Replace manual HSA calculation (lines 949-954) with `calculateHsaMonthlyCapacity(hsaElig, age, filing)`
- Replace manual CESA calculation (line 955) with `calculateCesaMonthlyCapacity(numKids)`
- Add `applyRothIRAPhaseOut` after building retirement order
- Need to get gross income for phase-out calculation

### 2. **All Profiles Except 7_Foundation_Builder** - Add Roth IRA Phase-Out
All profiles should apply Roth IRA phase-out rules. This requires:
1. Getting gross income from the data
2. Calling `applyRothIRAPhaseOut` after building the base retirement order but before tax preference adjustments

### 3. **Profiles with Employer Plans** - Consider addEmployer401kVehicles
Profiles that might benefit from `addEmployer401kVehicles`:
- **8_Biz_Owner_Group** - Business owners with employees likely have employer 401(k) plans
- Other profiles could check extra questions to see if employer plans exist

## Implementation Priority

1. **High Priority**: Fix 1_ROBS_In_Use to use universal HSA/CESA functions
2. **High Priority**: Add applyRothIRAPhaseOut to all profiles (except 7 which already has it)
3. **Medium Priority**: Add addEmployer401kVehicles to 8_Biz_Owner_Group
4. **Low Priority**: Consider adding employer 401(k) logic to other profiles based on extra questions

## Code Pattern to Follow (from 7_Foundation_Builder)

```javascript
// 1. Calculate capacities using universal functions
const hsaCap = calculateHsaMonthlyCapacity(hsaElig, age, filing);
const cesaCap = calculateCesaMonthlyCapacity(numKids);

// 2. Build base retirement order
let baseRetirementOrder = cfg.vehicleOrder_Retirement.map(v => {
  // Apply catch-up logic
});

// 3. Add employer vehicles if applicable
const grossIncome = Number(getValue(hdr, rowArr, HEADERS.GROSS_ANNUAL_INCOME)) || 75000;
baseRetirementOrder = addEmployer401kVehicles(baseRetirementOrder, {
  rowArr,
  hdr,
  age,
  grossIncome
});

// 4. Apply Roth IRA phase-out
baseRetirementOrder = applyRothIRAPhaseOut(baseRetirementOrder, {
  grossIncome,
  filingStatus: filing,
  taxFocus
});

// 5. Apply tax preference ordering
if (taxFocus === 'Now') {
  baseRetirementOrder = prioritizeTraditionalAccounts(baseRetirementOrder);
} else if (taxFocus === 'Later') {
  baseRetirementOrder = prioritizeRothAccounts(baseRetirementOrder);
}
```
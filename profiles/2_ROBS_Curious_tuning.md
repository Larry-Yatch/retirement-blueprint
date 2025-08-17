# Profile 2: ROBS Curious - Tuning Analysis

## 🎯 Profile Overview
**Title:** ROBS-Curious Builder  
**Description:** Interested in ROBS but hasn't implemented it yet; wants to leverage business income for retirement growth.

## 📊 Current Vehicle Order

### Retirement Vehicles:
1. Solo 401(k) – Roth (Employee limit: $23,000/yr)
2. Solo 401(k) – Traditional (Employee limit: $23,000/yr)
3. HSA (if eligible)
4. Roth IRA ($7,000/yr)

### Education Vehicles:
1. Combined CESA (if has children)
2. Roth IRA

### Health Vehicles:
1. HSA (if eligible)

## ❓ Key Questions & Issues

### 1. Solo 401(k) Confusion
**Issue:** Profile is ROBS-Curious but not self-employed yet. Solo 401(k) vehicles won't work for W-2 employees.
**Solution:** Need to conditionally include Solo 401(k) only if self-employed.

### 2. Missing Employer 401(k) Integration
**Issue:** Now that we've added employer 401(k) questions, need to handle both scenarios:
- W-2 employee with employer 401(k)
- Self-employed planning to set up Solo 401(k)

### 3. ROBS Planning Integration
**Issue:** Profile is planning ROBS but current vehicles don't reflect this planning stage.
**Extra Questions:**
- ex_q5: Rollover balance planned for ROBS
- ex_q6: Expected annual contribution from business profits

### 4. Vehicle Order Logic
**Current Issues:**
- Solo 401(k) listed first but may not be available
- Missing Traditional IRA option
- Missing backdoor Roth strategy

## 🔧 Proposed Changes

### 1. Conditional Vehicle Logic
```javascript
// Check employment status
const isSelfEmployed = getValue(hdr, rowArr, HEADERS.WORK_SITUATION) === 'Self-employed';
const hasEmployer401k = getValue(hdr, rowArr, HEADERS.P2_EX_Q1) === 'Yes';

// Build appropriate 401(k) vehicles
if (isSelfEmployed) {
  // Solo 401(k) options
  vehicles.push({ name: 'Solo 401(k) – Roth', capMonthly: employeeCap });
  vehicles.push({ name: 'Solo 401(k) – Traditional', capMonthly: employeeCap });
} else if (hasEmployer401k) {
  // Employer 401(k) handled by addEmployer401kVehicles
  // But may want to add employee contribution vehicles too
}
```

### 2. Add Traditional IRA Option
Since they're planning ROBS, they'll need Traditional IRA for rollovers:
```javascript
vehicles.push({ name: 'Traditional IRA', capMonthly: LIMITS.RETIREMENT.TRADITIONAL_IRA / 12 });
```

### 3. Consider Backdoor Roth
If income is high, add backdoor Roth strategy after Traditional IRA.

### 4. Use Rollover Balance Info
The ex_q5 (rollover balance) could inform seeding or priority adjustments.

## 📋 Revised Vehicle Order Proposal

### Scenario 1: W-2 Employee with Employer 401(k)
1. Employer 401(k) Match (if available) - FREE MONEY
2. HSA (if eligible)
3. Traditional IRA
4. Roth IRA (or Backdoor if phased out)
5. Taxable investing

### Scenario 2: Self-Employed (Planning ROBS)
1. HSA (if eligible)
2. Solo 401(k) – Based on tax preference
3. Traditional IRA (for future ROBS rollover)
4. Roth IRA (or Backdoor if phased out)
5. Taxable investing

### Scenario 3: Mixed (Both W-2 and Self-Employed)
Combine both strategies with appropriate limits.

## 🎬 Action Items for Implementation
1. Add employment status check
2. Conditionally include Solo 401(k) vs employer vehicles
3. Add Traditional IRA to vehicle list
4. Consider seeding logic based on rollover balance
5. Test with various employment scenarios
# Profile 4: Roth Reclaimer - Tuning Analysis

## 🎯 Profile Overview
**Title:** Roth IRA Reclaimer  
**Description:** Has Traditional IRA assets from previous employer plans that prevent direct Roth contributions due to pro-rata rule. Needs backdoor Roth strategy.

## 📊 Current Vehicle Order

### Retirement Vehicles:
1. Roth IRA ($7,000/yr)
2. Taxable Brokerage (Infinity)

### Education Vehicles:
1. Combined CESA (if has children)

### Health Vehicles:
1. HSA (if eligible)

## ❓ Key Questions & Issues

### 1. Limited Vehicle Options
**Issue:** Only 2 retirement vehicles listed, very restrictive.
**Why:** Pro-rata rule prevents clean backdoor Roth conversions when holding Traditional IRA assets.
**Solution:** Need to add more vehicles and strategies.

### 2. Missing Employer 401(k)
**Issue:** Now has employer 401(k) questions but not utilizing them.
**Opportunity:** Employer 401(k) can accept IRA rollovers, clearing path for backdoor Roth!

### 3. Extra Questions Analysis
Current extra questions:
- ex_q5: Traditional IRA balance (the problem)
- ex_q6: After-tax contributions capacity
- ex_q7: Understanding of backdoor Roth process
- ex_q8: Annual Roth conversion amount desired

New employer 401(k) questions (ex_q1-4) mapped from positions 11-14.

### 4. Backdoor Roth Strategy
The key strategy for this profile:
1. Roll Traditional IRA into employer 401(k) (if plan allows)
2. Make non-deductible Traditional IRA contributions
3. Convert to Roth IRA immediately (no pro-rata issues)

## 🔧 Proposed Changes

### 1. Add Employer 401(k) Vehicles
- Employer match (if available)
- Employee contributions (Traditional and/or Roth)
- Important: Many 401(k)s accept IRA rollovers!

### 2. Add Traditional IRA for Backdoor
After rolling existing balance to 401(k), Traditional IRA becomes vehicle for backdoor Roth.

### 3. Consider After-Tax 401(k) → Mega Backdoor
If employer plan allows:
- After-tax 401(k) contributions
- In-service withdrawals to Roth IRA

### 4. Seeding Strategy
Use ex_q5 (Traditional IRA balance) to inform urgency of rollover strategy.

## 📋 Revised Vehicle Order Proposal

### Phase 1: While holding Traditional IRA
1. Employer 401(k) Match (if available)
2. HSA (if eligible)
3. Employer 401(k) Traditional/Roth
4. Taxable Brokerage

### Phase 2: After IRA rollover to 401(k)
1. Employer 401(k) Match (if available)
2. HSA (if eligible)
3. Backdoor Roth IRA (via Traditional IRA)
4. Employer 401(k) Traditional/Roth
5. After-tax 401(k) → Mega Backdoor (if available)
6. Taxable Brokerage

## 🎬 Implementation Strategy

### Dynamic Vehicle Selection Based on:
1. **Traditional IRA Balance** (ex_q5)
   - If > 0: Limited to employer vehicles + taxable
   - If = 0: Full backdoor Roth available

2. **Employer 401(k) Features**
   - Accepts rollovers? → Path to clear IRA
   - Has Roth option? → Tax diversification
   - Allows after-tax? → Mega backdoor potential

3. **Understanding Level** (ex_q7)
   - If understands backdoor: Include it
   - If not: Educate or stick to basics

4. **Income Level**
   - High income → Definitely need backdoor
   - Moderate → Maybe direct Roth still works

## 🚀 Action Items
1. Add conditional logic for IRA balance
2. Implement employer 401(k) vehicles
3. Add backdoor Roth vehicle when appropriate
4. Consider mega backdoor if plan allows
5. Add educational notes about the strategy
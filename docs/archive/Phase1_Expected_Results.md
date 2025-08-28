# Phase 1: Expected Results Visual Guide

## What You Should See in Working Sheet After Phase 2 Submission

### Example 1: Profile 2 (ROBS Curious) - W-2 Employee

**User Input (Phase 2 Form):**
- Currently contributing $300/mo to HSA
- Currently contributing $1,000/mo to 401k
- Employer matches 100% up to 3%
- Gross income: $100,000/year
- Wants to save 25% total

**Expected Working Sheet Results:**

| Column | Expected Value | Why |
|--------|---------------|-----|
| **ACTUALS** | | |
| retirement_hsa_actual | $300 | From form: current HSA |
| health_hsa_actual | $300 | Same value, different domain |
| retirement_traditional_401k_actual | $1,000 | From form: current 401k |
| retirement_401k_match_traditional_actual | $250 | Calculated: $100k × 3% / 12 |
| **IDEALS** | | |
| retirement_401k_match_traditional_ideal | $250 | Match (non-discretionary) |
| retirement_traditional_401k_ideal | $1,583 | Engine allocation |
| retirement_hsa_ideal | $358 | Max HSA for single |
| retirement_roth_ira_ideal | $583 | Engine allocation |
| family_bank_ideal | $326 | Leftover from 25% |

**Total Actual**: $1,550/mo (current savings)
**Total Ideal**: $2,500/mo (25% of $10,000 net monthly)

---

### Example 2: Profile 1 (ROBS In Use) - With Distributions

**User Input (Phase 2 Form):**
- Currently contributing $200/mo to HSA
- ROBS profit distributions: $60,000/year
- No current 401k (using ROBS)
- Wants to save 20% total

**Expected Working Sheet Results:**

| Column | Expected Value | Why |
|--------|---------------|-----|
| **ACTUALS** | | |
| retirement_hsa_actual | $200 | From form |
| retirement_robs_solo_401k_profit_distribution_actual | $5,000 | $60k / 12 |
| **IDEALS** | | |
| retirement_robs_solo_401k_profit_distribution_ideal | $5,000 | Non-discretionary |
| retirement_hsa_ideal | $358 | Max HSA |
| retirement_robs_solo_401k_traditional_ideal | $1,000 | Engine allocation |
| retirement_traditional_ira_ideal | $583 | Engine allocation |
| family_bank_ideal | $59 | Small leftover |

**Key Point**: ROBS distribution ($5,000) appears in BOTH actual and ideal because it's mandatory.

---

### Example 3: Profile 3 (Solo 401k Builder) - Self-Employed

**User Input (Phase 2 Form):**
- Currently contributing $18,000/year employee
- Currently contributing $12,000/year employer
- S-Corp with $120,000 W-2 wages
- Wants to save 30% total

**Expected Working Sheet Results:**

| Column | Expected Value | Why |
|--------|---------------|-----|
| **ACTUALS** | | |
| retirement_solo_401k_employee_actual | $1,500 | $18k / 12 |
| retirement_solo_401k_employer_actual | $1,000 | $12k / 12 |
| **IDEALS** | | |
| retirement_solo_401k_employer_ideal | $1,000 | Non-discretionary |
| retirement_solo_401k_employee_ideal | $1,958 | Engine allocation |
| retirement_hsa_ideal | $713 | Family HSA max |
| retirement_roth_ira_ideal | $583 | Engine allocation |
| education_combined_cesa_ideal | $333 | If has kids |
| family_bank_ideal | $413 | Remainder |

---

## Red Flags to Watch For

### ❌ BAD: All Actuals are $0
```
retirement_hsa_actual: $0
retirement_traditional_401k_actual: $0
```
**Problem**: Form data not being captured

### ❌ BAD: Ideal = Actual Exactly
```
retirement_traditional_401k_actual: $1,000
retirement_traditional_401k_ideal: $1,000
```
**Problem**: Engine not running or no reallocation happening

### ❌ BAD: Missing Non-Discretionary in Ideal
```
Profile has employer match but:
retirement_401k_match_traditional_ideal: $0
```
**Problem**: Match calculation failing

### ❌ BAD: Negative Family Bank
```
family_bank_ideal: -$500
```
**Problem**: Over-allocation or calculation error

### ✅ GOOD: Expected Pattern
```
Actuals: Show current contributions (can be $0)
Ideals: Show recommendations (usually different/higher)
Non-discretionary: Appear in ideal even if not in actual
Family Bank: Positive or $0
Total Ideal ≈ Net Income × Allocation %
```

## Quick Validation Formula

For any row, you can verify:

```
Total Ideal = Sum of all _ideal columns
Expected Total = Net_Monthly_Income × (Allocation_Percentage / 100)

These should be very close (within $10-20 due to rounding)
```

## Testing Commands Summary

```javascript
// 1. Check columns exist
verifyActualIdealColumns()

// 2. Test with fake data
testAllProfilesActualIdeal()

// 3. Test specific profile
testProfile2ActualIdeal()  // W-2 with match

// 4. After real form submission, find the row and check manually
```
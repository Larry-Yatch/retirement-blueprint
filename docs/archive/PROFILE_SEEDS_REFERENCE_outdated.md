# Profile Seeds Reference Guide

*Last Updated: August 27, 2025*

## Overview
Seeds represent existing or committed contributions that are already flowing. The allocation percentage adds ADDITIONAL savings on top of these seeded amounts.

## Profiles That Use Seeds (5 of 9)

### 🏢 Profile 1: ROBS In Use
**Seeds:**
- `seeds.Retirement['ROBS Solo 401(k) – Profit Distribution']`

**Amount:** `annualProfitDistribution / 12`
**Source:** ex_q6 - "Expected annual company profit distributions back into your Solo 401(k)"
**When Seeded:** If annualProfitDistribution > 0
**Purpose:** C-corp profit distributions are mandatory under ROBS structure
**Example:** User enters $60,000 annual → Seeds $5,000/month

---

### 🤔 Profile 2: ROBS Curious
**Seeds:**
- `seeds.Retirement['Planned ROBS Rollover']`

**Amount:** `plannedRollover` (lump sum, not monthly)
**Source:** ex_q1 - Rollover amount for ROBS
**When Seeded:** If plannedRollover > 0
**Purpose:** Informational only - tracks planned rollover amount
**Note:** Does NOT affect monthly allocation calculations

---

### 💼 Profile 3: Solo 401(k) Builder
**Seeds (Existing Plan):**
- `seeds.Retirement['Solo 401(k) – Employee']` = `annualEmployee / 12`
- `seeds.Retirement['Solo 401(k) – Employer']` = `annualEmployer / 12`

**Seeds (Future Plan):**
- `seeds.Retirement['Solo 401(k) – Employee']` = `annualFuture / 12`

**Sources:**
- ex_q3: "Have you already set up a Solo 401(k) plan?"
- ex_q4: Employee contribution amount (if yes)
- ex_q5: Employer contribution amount (if yes)
- ex_q6: Expected total contribution (if no)

**When Seeded:** Always (either existing or future amounts)
**Purpose:** Represents committed Solo 401(k) contributions
**Example:** $48,000 annual → Seeds $4,000/month

---

### 🎯 Profile 4: Roth Reclaimer
**Seeds:**
- `seeds.Retirement['Traditional IRA Balance']`

**Amount:** `tradIRABalance` (balance, not monthly)
**Source:** ex_q1 - Current Traditional IRA balance
**When Seeded:** If tradIRABalance > 0
**Purpose:** Tracks IRA balance for backdoor Roth planning
**Note:** Does NOT affect monthly allocation calculations

---

### 👥 Profile 8: Business Owner Group
**Seeds:**
- `seeds.Retirement['Group 401(k) – Employee']` OR
- `seeds.Retirement['Defined Benefit Plan']`

**Amount:** `annualContribution / 12`
**Source:** 
- ex_q4: "Do you currently have a retirement plan?"
- ex_q5: Plan type (determines which vehicle to seed)
- ex_q6: Annual contribution amount

**When Seeded:** If hasRetirementPlan && annualContribution > 0
**Purpose:** Existing group retirement plan contributions
**Example:** $100,000 annual → Seeds $8,333/month

---

## Profiles That DON'T Use Seeds (4 of 9)

### ✅ Profile 5: Bracket Strategist
- Initializes empty seeds
- Uses vehicle orders only
- Employer match handled as vehicle, not seed

### ✅ Profile 6: Catch-Up Visionary
- Initializes empty seeds
- All contributions through allocation engine

### ✅ Profile 7: Foundation Builder
- Initializes empty seeds
- Reference implementation with clean allocation

### ✅ Profile 9: Late Stage Growth
- Initializes empty seeds
- All contributions through allocation engine

---

## Key Insights

### Seeds That Affect Monthly Allocation:
1. **Profile 1**: ROBS profit distributions (monthly)
2. **Profile 3**: Solo 401(k) contributions (monthly)
3. **Profile 8**: Group retirement contributions (monthly)

### Seeds That Are Informational Only:
1. **Profile 2**: Planned ROBS rollover (lump sum)
2. **Profile 4**: Traditional IRA balance (for planning)

### Why This Matters:
- Profiles 1, 3, and 8 will allocate MORE than the user's stated percentage
- The allocation % is treated as ADDITIONAL to seeded amounts
- This can result in 2-3x the expected total allocation

### Design Intent:
- Seeds = What you're ALREADY contributing automatically
- Allocation % = What you want to ADD on top
- Total = Seeds + Additional allocation

### User Expectation Mismatch:
Most users expect allocation % to be their TOTAL desired rate, not additional. This causes confusion when they see much higher total allocations than expected.
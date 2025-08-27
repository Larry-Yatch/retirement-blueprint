# Two Output Strategy: Actual vs Ideal

*Created: August 27, 2025*

## The Vision

### 1. ACTUAL Output (What You're Doing Today)
Based on:
- Universal current contributions (HSA, Education, Retirement from form)
- Profile-specific current contributions (Solo 401k, Group 401k, etc.)
- Everything they told us they're currently contributing

Example:
```
ACTUAL Current Allocations:
- Current HSA: $200/mo
- Current Education (529): $300/mo
- Current 401(k): $500/mo
- ROBS Distributions: $4,000/mo (non-discretionary)
TOTAL ACTUAL: $5,000/mo
```

### 2. IDEAL Output (What We Recommend)
Based on:
- Their desired allocation % (or 20% minimum)
- This % is their TOTAL desired savings rate
- PLUS non-discretionary profile-specific items (ROBS distributions, employer matches)
- NOT stacked on top of current discretionary savings

Example:
```
IDEAL Recommended Allocations:
- HSA: $358/mo
- CESA: $333/mo  
- 401(k): $1,809/mo
- ROBS Distributions: $4,000/mo (non-discretionary)
TOTAL IDEAL: $6,500/mo

Where $2,500 = 25% of $10,000 income (their total desired rate)
Plus $4,000 = Non-discretionary ROBS
```

## Key Distinction: Discretionary vs Non-Discretionary

### Non-Discretionary (Always Included in Ideal):
- ROBS profit distributions (Profile 1)
- Employer 401(k) matches
- Required minimum distributions
- Anything that happens automatically

### Discretionary (Replaced, Not Added To):
- Current 401(k) employee contributions
- Current IRA contributions
- Current HSA contributions
- Current education savings
- Anything the user actively chooses to contribute

## Implementation Logic

```javascript
// ACTUAL Calculation
actual = currentUniversalContributions + currentProfileSpecificContributions

// IDEAL Calculation  
discretionaryIdeal = netIncome * max(userPercent, 20%)
idealTotal = discretionaryIdeal + nonDiscretionarySeeds

// NOT THIS (current system):
// idealTotal = actual + (netIncome * additionalPercent)
```

## Form Question Updates Needed

### Current Question (Confusing):
"What percentage of your monthly take-home pay would you like to invest each month, in addition to what you're already contributing?"

### New Question (Clear):
"What TOTAL percentage of your monthly take-home pay would you like to save for all goals combined?

NOTE: We'll add any automatic contributions (like ROBS distributions or employer matches) on top of this percentage."

## Benefits of This Approach

1. **Clear Distinction**: Actual vs Ideal is obvious
2. **User Expectations Met**: Percentage means total desired rate
3. **Non-Discretionary Respected**: ROBS/matches always included
4. **Gap Analysis**: Easy to see Ideal - Actual = Change Needed
5. **No Confusion**: No more "why is it 3x what I asked for?"

## Example Scenarios

### Scenario 1: ROBS User
- Income: $10,000/mo
- Wants: 30% savings rate
- ROBS distributions: $4,000/mo

**ACTUAL**:
- Current 401(k): $500/mo
- ROBS: $4,000/mo
- Total: $4,500/mo

**IDEAL**:
- Discretionary (30% × $10,000): $3,000/mo
- Non-discretionary ROBS: $4,000/mo
- Total: $7,000/mo
- Action needed: Increase discretionary from $500 to $3,000

### Scenario 2: W-2 Employee
- Income: $8,000/mo
- Wants: 25% savings rate
- Employer match: $300/mo

**ACTUAL**:
- Current 401(k): $1,000/mo
- Match: $300/mo
- Total: $1,300/mo

**IDEAL**:
- Discretionary (25% × $8,000): $2,000/mo
- Non-discretionary match: $300/mo
- Total: $2,300/mo
- Action needed: Increase 401(k) from $1,000 to $2,000

## Seeds Strategy Under This Model

### Seeds for ACTUAL:
Everything currently being contributed

### Seeds for IDEAL:
Only non-discretionary items:
- ROBS distributions
- Employer matches
- Other automatic contributions

### NOT Seeded for IDEAL:
- Current voluntary 401(k) contributions
- Current IRA contributions
- Current HSA contributions
- These are replaced by the ideal calculation

## Summary

This approach:
1. Shows what users ARE doing (actual)
2. Shows what they SHOULD do (ideal)
3. Treats allocation % as total desired rate
4. Respects non-discretionary items
5. Provides clear gap analysis
6. Matches user expectations

Much cleaner than the current "additional %" approach!

---

## Profile-by-Profile Breakdown: Discretionary vs Non-Discretionary

### 🏢 Profile 1: ROBS In Use

**Non-Discretionary (Always in Ideal):**
- ROBS Solo 401(k) Profit Distributions (from ex_q6)
- Employer match (if applicable)

**Discretionary (Replaced by Ideal %):**
- Current HSA contributions
- Current education contributions  
- Current retirement contributions (excluding ROBS distributions)
- Personal IRA contributions

**Implementation Note:** ROBS distributions are mandatory under the C-corp structure and must always be included in ideal calculations.

---

### 🤔 Profile 2: ROBS Curious

**Non-Discretionary (Always in Ideal):**
- Employer 401(k) match (if W-2 employee)

**Discretionary (Replaced by Ideal %):**
- Current HSA contributions
- Current education contributions
- Current retirement contributions
- Planned ROBS rollover (informational only)

---

### 💼 Profile 3: Solo 401(k) Builder

**Non-Discretionary (Always in Ideal):**
- Employer portion of Solo 401(k) (profit sharing)
- Any contractual/committed contributions

**Discretionary (Replaced by Ideal %):**
- Employee portion of Solo 401(k)
- Current HSA contributions
- Current education contributions
- Personal IRA contributions

**Note:** The employer/employee split requires careful handling - employer contributions are often formulaic (e.g., 25% of net self-employment income).

---

### 🎯 Profile 4: Roth Reclaimer

**Non-Discretionary (Always in Ideal):**
- Employer 401(k) match
- Required minimum distributions (if applicable)

**Discretionary (Replaced by Ideal %):**
- Current 401(k) employee contributions
- Current IRA contributions
- Current HSA contributions
- Current education contributions
- Backdoor Roth conversions (these are voluntary)

---

### 📊 Profile 5: Bracket Strategist

**Non-Discretionary (Always in Ideal):**
- Employer 401(k) match
- Any automatic employer contributions

**Discretionary (Replaced by Ideal %):**
- Current 401(k) employee contributions
- Current HSA contributions
- Current education contributions
- All voluntary retirement savings

---

### 🎯 Profile 6: Catch-Up Visionary

**Non-Discretionary (Always in Ideal):**
- Employer 401(k) match
- Any pension contributions
- Required minimum distributions (if over 73)

**Discretionary (Replaced by Ideal %):**
- Current 401(k) employee contributions (including catch-up)
- Current IRA contributions (including catch-up)
- Current HSA contributions
- Current education contributions

---

### 🌱 Profile 7: Foundation Builder

**Non-Discretionary (Always in Ideal):**
- Employer 401(k) match (if applicable)
- Any automatic savings plans

**Discretionary (Replaced by Ideal %):**
- All current voluntary contributions
- Emergency fund contributions
- Current HSA contributions
- Current education contributions

---

### 👥 Profile 8: Business Owner Group

**Non-Discretionary (Always in Ideal):**
- Required employer contributions (Safe Harbor, etc.)
- Defined Benefit Plan contributions (if actuarially required)
- Profit sharing (if formula-based)

**Discretionary (Replaced by Ideal %):**
- Voluntary 401(k) employee deferrals
- Voluntary profit sharing
- Current HSA contributions
- Current education contributions

**Note:** Business owners must distinguish between required plan contributions and voluntary contributions.

---

### 🏁 Profile 9: Late Stage Growth

**Non-Discretionary (Always in Ideal):**
- Employer 401(k) match
- Required minimum distributions (if applicable)
- Pension payments

**Discretionary (Replaced by Ideal %):**
- Current 401(k) employee contributions
- Current IRA contributions
- Roth conversions (voluntary)
- Current HSA contributions

---

## Implementation Checklist

### For ACTUAL Calculations:
- [ ] Pull current HSA from universal questions
- [ ] Pull current education from universal questions
- [ ] Pull current retirement from universal questions
- [ ] Pull profile-specific current contributions
- [ ] Sum all for total actual

### for IDEAL Calculations:
- [ ] Calculate discretionary pool: netIncome × max(userPercent, 20%)
- [ ] Allocate discretionary pool across vehicles
- [ ] Add non-discretionary seeds on top
- [ ] Sum all for total ideal

### Key Code Changes Needed:
1. Modify `computeNetPool` to calculate based on total % not additional
2. Create separate tracking for discretionary vs non-discretionary seeds
3. Generate two output sets (actual and ideal)
4. Update reporting to show both with clear labeling

---

## Documentation Cleanup Recommendations

### Files to Consolidate:
1. Merge into "Allocation_Strategy_Guide.md":
   - PROFILE_SEEDS_REFERENCE.md
   - CURRENT_CONTRIBUTION_TRACKING.md  
   - MISSING_SEEDS_ANALYSIS.md

### Files to Archive:
- Development_Notes.md
- FORM_QUESTION_UPDATES.md (after implementing)
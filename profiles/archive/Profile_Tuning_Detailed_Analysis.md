# Profile Tuning Detailed Analysis

## Overview
This document provides comprehensive technical analysis and implementation details for profile tuning. For current project status and quick reference, see [`/Notes/profile_helper_tuning.md`](../Notes/profile_helper_tuning.md).

**Use this document for:**
- Understanding implementation decisions and reasoning
- Learning the tuning process methodology
- Implementing new profile changes
- Debugging unexpected behavior
- Code patterns and examples

---

# Profile 2: ROBS Curious - Detailed Analysis

## Profile Identity & Core Challenge
**Who they are:** Someone interested in ROBS (Rollover as Business Startup) but hasn't implemented it yet. They're exploring using retirement funds to start/fund a business.

**Core Challenge:** They might be either:
- Currently a W-2 employee planning to start a business
- Already self-employed but haven't set up ROBS yet
- Both (side business while employed)

## Key Assumptions Made

### 1. Employment Status Flexibility
**Assumption:** Profile 2 users could have any employment status.
**Logic:** Since they're "ROBS Curious" not "ROBS Active", they're in planning phase.
**Implementation:** Check `WORK_SITUATION` header to determine available vehicles.

### 2. Solo 401(k) Conditional Inclusion
**Assumption:** Solo 401(k) only available if self-employed.
**Risk:** Original config had Solo 401(k) hardcoded for everyone.
**Solution:** Made it conditional on employment status.

### 3. Traditional IRA Importance
**Assumption:** They'll need Traditional IRA for future ROBS rollover.
**Logic:** ROBS requires rolling retirement funds into C-corp's 401(k).
**Implementation:** Added Traditional IRA to all scenarios.

### 4. Extra Question Usage
- **ex_q5** (Rollover balance): Used for informational seeding
- **ex_q6** (Expected contribution): Sizes Solo 401(k) employer portion
**Assumption:** These values represent realistic planning numbers.

## Vehicle Order Logic by Scenario

### IMPORTANT: No Taxable Brokerage
All profiles should flow excess funds directly to Family Bank. Taxable Brokerage is NOT included in any vehicle orders.

### Scenario 1: W-2 Employee Only
```
1. Employer 401(k) Match (if available) - FREE MONEY
2. HSA (if eligible) - Triple tax advantage
3. Employer 401(k) Employee contributions
4. Traditional IRA - For future ROBS
5. Roth IRA (or Backdoor if phased out)
6. Family Bank - Final overflow (no Taxable Brokerage)
```

### Scenario 2: Self-Employed Only
```
1. HSA (if eligible)
2. Solo 401(k) – Roth/Traditional (order based on tax preference)
3. Solo 401(k) – Employer (if expecting contributions)
4. Traditional IRA
5. Roth IRA (or Backdoor if phased out)
6. Family Bank - Final overflow (no Taxable Brokerage)
```

### Scenario 3: Both W-2 and Self-Employed
Combines both strategies with appropriate limits, flowing directly to Family Bank.

## Potential Issues & Edge Cases

### 1. Solo 401(k) Setup Timing
**Issue:** They might not have Solo 401(k) set up yet.
**Impact:** Vehicles suggested they can't use.
**Mitigation:** Could add question about Solo 401(k) status.

### 2. ROBS Timeline
**Issue:** No timeline question for ROBS implementation.
**Impact:** Might prioritize wrong vehicles for their timeline.
**Suggestion:** Add "When do you plan to implement ROBS?"

### 3. Business Entity Type
**Issue:** ROBS requires C-corp, but we don't ask entity type.
**Impact:** Might suggest incompatible strategies.
**Current Handling:** Assumed they'll set up correctly.

### 4. Income Assumptions
**Default:** $100,000 if not provided.
**Risk:** Could affect phase-out calculations incorrectly.

---

# Profile 4: Roth Reclaimer - Detailed Analysis

## Profile Identity & Core Challenge
**Who they are:** Someone with Traditional IRA assets (usually from 401(k) rollovers) who wants to contribute to Roth IRA but is blocked by pro-rata rule.

**Core Challenge:** Pro-rata rule makes backdoor Roth conversions taxable if holding Traditional IRA assets.

## Key Assumptions Made

### 1. Understanding Backdoor Roth
**Assumption:** Not everyone understands backdoor Roth strategy.
**Logic:** It's a sophisticated strategy requiring specific steps.
**Implementation:** Only suggest if ex_q7 = "Yes" (understands backdoor).

### 2. Employer 401(k) Accepts Rollovers
**Assumption:** Many employer 401(k)s accept IRA rollovers.
**Risk:** Not all plans allow this.
**Mitigation:** Added as informational note, not requirement.

### 3. Income Level Assumptions
**Default:** $95,000 if not provided.
**Logic:** High enough to potentially need backdoor, not guaranteed phase-out.
**Risk:** Might suggest wrong strategy if actual income very different.

### 4. After-Tax Contributions
**Assumption:** ex_q6 asking about "after-tax contributions" means to 401(k).
**Logic:** Enables mega backdoor Roth strategy.
**Risk:** User might think it means IRA contributions.

## Complex Decision Tree

### Traditional IRA Balance Check (ex_q5)
```
IF balance > 0:
  - Direct Roth contributions create pro-rata tax issue
  - Backdoor Roth also affected by pro-rata
  - Solution: Roll to employer 401(k) first
ELSE:
  - Clean slate for backdoor Roth
  - No pro-rata concerns
```

### Income Phase-Out Logic
```
IF income allows direct Roth AND no IRA balance:
  - Use direct Roth IRA
ELIF income too high for direct Roth:
  IF understands backdoor:
    - Use Backdoor Roth IRA
  ELSE:
    - Use Traditional IRA
    - Add educational note about backdoor
```

### Employer 401(k) Integration
```
IF has employer 401(k):
  - Add employer match first (free money)
  - Add employee contributions
  - Note IRA rollover possibility
  - Check for mega backdoor opportunity
```

## Vehicle Ordering Rationale

### Phase 1: While Holding Traditional IRA
Limited options due to pro-rata rule:
1. **Employer 401(k) Match** - Free money always first
2. **HSA** - Triple tax advantage
3. **Employer 401(k)** - No pro-rata issues
4. **Family Bank** - Final overflow (no Taxable Brokerage)

### Phase 2: After IRA Cleared
Full strategy available:
1. **Employer 401(k) Match** - Free money
2. **HSA** - Best tax treatment
3. **Backdoor Roth IRA** - Tax-free growth
4. **401(k) Employee** - Tax-advantaged
5. **Mega Backdoor** - If sophisticated
6. **Family Bank** - Final overflow (no Taxable Brokerage)

## Potential Issues & Edge Cases

### 1. 401(k) Rollover Acceptance
**Issue:** Not verified if their 401(k) accepts rollovers.
**Impact:** Strategy might not be executable.
**Suggestion:** Add question about 401(k) features.

### 2. Mega Backdoor Availability
**Issue:** Rare - requires after-tax 401(k) AND in-service withdrawals.
**Impact:** Might suggest unavailable strategy.
**Current:** Only if understands backdoor AND has after-tax.

### 3. Conversion Timing
**Issue:** ex_q8 asks desired conversion amount but not timing.
**Impact:** Might create large tax bill if done wrong year.
**Not Addressed:** Would need tax planning integration.

### 4. State Tax Considerations
**Issue:** Some states don't allow IRA → 401(k) rollovers.
**Not Considered:** Would need state-specific rules.

## Testing Scenarios Needed

### Profile 2 Testing Matrix
1. W-2 employee with employer 401(k)
2. Self-employed with no employer plan  
3. Both employment types
4. High income (Roth phase-out)
5. With/without HSA eligibility
6. Various rollover amounts

### Profile 4 Testing Matrix
1. With Traditional IRA balance + employer 401(k)
2. No IRA balance + high income
3. Understands backdoor vs doesn't
4. After-tax contributions available
5. Various income levels for phase-out testing
6. Age 50+ for catch-up contributions

## Questions for Validation

### Profile 2 Questions
1. Should Solo 401(k) employer portion be capped at 25% of income?
2. Should we add C-corp formation timeline question?
3. Is Traditional IRA always needed or only if no current retirement accounts?
4. Should business income be separate from W-2 income?

### Profile 4 Questions
1. Should we verify 401(k) accepts IRA rollovers?
2. Is mega backdoor too advanced for most users?
3. Should conversion amount (ex_q8) affect vehicle ordering?
4. Need to handle married filing separately (very low Roth limit)?

## Summary of Major Decisions

### Profile 2
- Made Solo 401(k) conditional on employment status
- Added Traditional IRA for ROBS planning
- Used extra questions for sizing not just info
- Direct overflow to Family Bank (no Taxable Brokerage)

### Profile 4
- Created sophisticated decision tree for backdoor Roth
- Only suggest strategies user understands
- Integrated employer 401(k) as solution to pro-rata
- Added educational notes for learning opportunities
- Direct overflow to Family Bank (no Taxable Brokerage)

---

# Profile Tuning Process Documentation

## Overview
This section documents the exact process used to tune profiles, including analysis steps, implementation approach, testing methodology, and documentation standards. This serves as a guide for future tuning efforts.

## Step-by-Step Tuning Process

### 1. Initial Profile Analysis
**Goal:** Understand the profile's identity, challenges, and current implementation.

**Process:**
1. Read profile description in PROFILE_CONFIG
2. Examine current vehicle order
3. Review extra questions to understand data available
4. Identify the core problem this profile solves

**Documentation:**
- Create `profiles/[ProfileID]_tuning.md` file
- Include sections: Profile Overview, Current Vehicle Order, Key Questions & Issues

### 2. Identify Implementation Issues
**Goal:** Find gaps between profile intent and current implementation.

**Common Issues Found:**
- Hard-coded vehicles that should be conditional
- Missing employer 401(k) integration
- Not using extra question data effectively
- Missing key vehicles for the strategy
- Wrong vehicle ordering for tax optimization

**Example from Profile 2:**
```
Issue: Solo 401(k) hard-coded but user might be W-2 employee
Solution: Check WORK_SITUATION header and conditionally include
```

### 3. Design Enhanced Logic
**Goal:** Create sophisticated conditional logic addressing all scenarios.

**Key Design Principles:**
1. **Use all available data** - Headers and extra questions
2. **Handle multiple scenarios** - Different employment, income, understanding levels
3. **Educational approach** - Guide users who don't understand strategies
4. **Fail gracefully** - Always have fallback options

**Example Decision Tree (Profile 4):**
```
IF has Traditional IRA balance:
  IF has employer 401(k) AND understands backdoor:
    → Suggest IRA rollover strategy
  ELSE:
    → Limited to taxable investments
ELSE:
  IF income allows direct Roth:
    → Use direct Roth IRA
  ELSE IF understands backdoor:
    → Use backdoor Roth
  ELSE:
    → Traditional IRA with educational note
```

### 4. Implementation in Code.js
**Goal:** Update profile helper function with new logic.

**CRITICAL REQUIREMENT:** NO TAXABLE BROKERAGE
- All excess funds must flow to Family Bank
- Do NOT include "Taxable Brokerage" in any vehicle orders
- Family Bank should be the final vehicle with Infinity capacity

**Structure:**
```javascript
'[ProfileID]': function(rowArr, hdr) {
  // 1. Extract all data points
  const age = Number(getValue(hdr, rowArr, HEADERS.CURRENT_AGE));
  const grossIncome = Number(getValue(hdr, rowArr, HEADERS.GROSS_ANNUAL_INCOME));
  // ... extract all needed data
  
  // 2. Calculate capacities using universal functions
  const hsaCap = calculateHsaMonthlyCapacity(hsaElig, age, filing);
  
  // 3. Initialize seeds if needed
  const seeds = { Education: {}, Health: {}, Retirement: {} };
  
  // 4. Build vehicle orders dynamically
  let baseRetirementOrder = [];
  
  // 5. Apply conditional logic
  if (condition) {
    // Add appropriate vehicles
  }
  
  // 6. Apply universal adjustments
  baseRetirementOrder = applyRothIRAPhaseOut(baseRetirementOrder, params);
  
  // 7. IMPORTANT: Add Family Bank as final vehicle (NO Taxable Brokerage)
  const retirementOrder = baseRetirementOrder.concat({ name: 'Family Bank', capMonthly: Infinity });
  
  // 8. Return structured result
  return {
    seeds,
    vehicleOrders: {
      Education: educationOrder,
      Health: healthOrder,
      Retirement: retirementOrder
    }
  };
}
```

### 5. Update Configuration
**Goal:** Ensure PROFILE_CONFIG reflects new questions and approach.

**Updates Required:**
1. Add employer 401(k) questions to extraQuestions array
2. Update description if strategy changed
3. Note that vehicleOrder arrays are now dynamic

**Example:**
```javascript
extraQuestions: [
  'Original question 1',
  'Original question 2',
  'Does your employer offer a 401(k) retirement plan?',    // NEW
  'Does your employer match your 401(k) contributions?',   // NEW
  'What percentage does your employer match?',             // NEW
  'Does your employer 401(k) plan have a Roth option?'     // NEW
]
```

### 6. Create Test Scenarios
**Goal:** Validate logic handles all edge cases correctly.

**Test Matrix Should Include:**
- Different employment situations
- Various income levels (phase-out testing)
- With/without employer benefits
- Different understanding levels
- Age variations (catch-up contributions)
- Family situations (HSA, CESA eligibility)

**Implementation in Testing.js:**
```javascript
function testTunedProfiles() {
  const profile2Tests = [
    {
      name: 'Descriptive Test Name',
      rowData: {
        // All relevant data fields
      }
    }
  ];
  
  profile2Tests.forEach(test => {
    const result = runProfileTest('2_ROBS_Curious', test.rowData);
    analyzeResults(result, test);
  });
}
```

### 7. Document in Tracking Files
**Goal:** Maintain clear record of changes and status.

**Update profile_helper_tuning.md:**

1. **Status Table Update:**
```markdown
| Profile | Universal Functions | Employer 401(k) | Form Questions | Tuning Status | Next Steps |
|---------|-------------------|-----------------|----------------|---------------|------------|
| 2_ROBS_Curious | ✅ Complete | ✅ Added | ✅ Updated | ✅ Tuned | Test with live form |
```

2. **Detailed Profile Section:**
```markdown
### Profile 2: ROBS_Curious ✅
- **Status**: TUNED - Major overhaul complete with simplified Solo 401(k)
- **Recent Changes**: 
  - Added dynamic vehicle selection based on employment status
  - Integrated employer 401(k) for W-2 employees
  - Added Traditional IRA for ROBS planning
  - Implemented SIMPLIFIED Solo 401(k) calculation with spouse support
  - Updated form questions for clarity
  - Fixed form mapping to match actual question order
- **Key Features**:
  - Conditionally includes Solo 401(k) only if self-employed
  - Supports mixed employment (Both W-2 and self-employed)
  - Uses ex_q5 (rollover balance) for informational seeding
  - Uses ex_q6 (business savings capacity) with simplified calculation
  - Uses ex_q7 (spouse in business) to double Solo 401(k) capacity
  - Automatic employee/employer split (fills employee first)
- **Simplified Approach**:
  - No entity type needed (conservative 20% for all)
  - Single question for total business savings capacity
  - Clear disclaimers about consulting tax advisor
  - ~90% accuracy for planning purposes
- **Next Steps**: Test with live form submissions
```

### 8. Create Detailed Analysis
**Goal:** Document reasoning for future reference.

**Create Comprehensive Analysis File:**
- Assumptions made and why
- Logic flow and decision trees
- Potential issues identified
- Questions needing validation
- Test scenarios required

## Documentation Standards

### File Organization
```
/profiles/
  - [ProfileID]_tuning.md           # Initial analysis and proposal
  - Profile_Tuning_Detailed_Analysis.md  # Comprehensive documentation

/Notes/
  - profile_helper_tuning.md        # Master tracking document
  - Claude-Session.md               # Session notes and progress

/Testing.js                         # All test functions
```

### Commit Messages
When committing tuning changes:
```
git commit -m "Tune Profile X: [Brief description of major changes]

- Added conditional logic for [scenario]
- Integrated employer 401(k) support
- Enhanced [specific feature]
- Updated test scenarios"
```

### Key Information to Track
1. **Profile Identity** - Who they are and core challenge
2. **Major Assumptions** - What we assumed and why
3. **Logic Changes** - Conditional flows added
4. **Vehicle Changes** - What was added/removed/reordered
5. **Extra Question Usage** - How each ex_q is used
6. **Edge Cases** - Identified but not addressed
7. **Testing Results** - What scenarios were tested

## Common Patterns and Solutions

### Pattern 1: Employment-Based Vehicle Selection
```javascript
const workSituation = getValue(hdr, rowArr, HEADERS.WORK_SITUATION);
const isSelfEmployed = workSituation === 'Self-employed' || workSituation === 'Both';
const isW2Employee = workSituation === 'W-2 employee' || workSituation === 'Both';

if (isSelfEmployed) {
  // Add Solo 401(k) vehicles
}
if (isW2Employee) {
  // Add employer 401(k) vehicles
}
```

### Pattern 2: Conditional Strategy Based on Understanding
```javascript
const understandsStrategy = getValue(hdr, rowArr, HEADERS.P2_EX_Q7) === 'Yes';

if (complexConditionsMet && understandsStrategy) {
  // Suggest advanced strategy
} else if (complexConditionsMet && !understandsStrategy) {
  // Add educational note
  // Suggest basic alternative
}
```

### Pattern 3: Dynamic Capacity Calculation
```javascript
if (expectedContribution > 0) {
  const employerCap = Math.min(
    expectedContribution / 12, 
    LIMITS.RETIREMENT.TOTAL_401K_457_403B / 12
  );
  vehicles.push({ name: 'Solo 401(k) – Employer', capMonthly: employerCap });
}
```

## Checklist for Profile Tuning

- [ ] Analyzed current implementation and identified issues
- [ ] Created tuning proposal document
- [ ] Implemented conditional logic for all scenarios
- [ ] Added employer 401(k) integration where applicable
- [ ] Used all extra questions effectively
- [ ] Applied universal functions (HSA, CESA, phase-outs)
- [ ] Created comprehensive test scenarios
- [ ] Updated PROFILE_CONFIG with new questions
- [ ] Updated profile_helper_tuning.md status
- [ ] Added detailed profile section with changes
- [ ] Created test function in Testing.js
- [ ] Documented assumptions and edge cases
- [ ] Committed with descriptive message

## Next Steps After Tuning

1. **Run test function** to validate all scenarios
2. **Review results** for unexpected behavior
3. **Adjust logic** if needed based on test results
4. **Update documentation** with any changes
5. **Mark ready for live testing** in tracking doc
6. **After all profiles tuned**, run comprehensive integration tests
7. **Deploy and monitor** initial live form submissions

This process ensures systematic, well-documented profile enhancements that can be understood and maintained by future developers.
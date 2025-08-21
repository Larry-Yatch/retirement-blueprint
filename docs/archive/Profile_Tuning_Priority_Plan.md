# Profile Tuning Priority Plan (UPDATED)

## Overview
With Profiles 2 (ROBS Curious) ✅ and 4 (Roth Reclaimer) ✅ completed, and Profile 7 (Foundation Builder) ✅ already implemented, we need to tune the remaining 5 profiles. This updated plan is based on:
- Existing infrastructure and implementation
- Actual complexity from documentation review
- Time remaining in 3-day deadline
- Best practices from tuning guides

## REVISED Priority Order (Based on Existing Work)

### ✅ COMPLETED PROFILES
- **Profile 2: ROBS Curious** - Fully tuned with dynamic vehicle selection
- **Profile 4: Roth Reclaimer** - Fully tuned with backdoor Roth logic
- **Profile 7: Foundation Builder** - Already complete (reference implementation)

### 1. Profile 5: Bracket Strategist (EASIEST REMAINING)
**Why easiest:**
- Infrastructure already complete (universal functions added)
- Employer 401(k) support already integrated
- Form questions already mapped (ex_q1-4)
- Just needs testing and validation

**Key Features:**
- Traditional 401(k) priority
- Tax bracket optimization
- Standard vehicle order
- Phase-out handling via utility

**Estimated Time:** 3-4 hours (per tuning guide)

---

### 2. Profile 6: Catch-Up Visionary (SECOND EASIEST)
**Why next:**
- Infrastructure complete
- Employer 401(k) support added
- Just needs catch-up calculation validation
- Age-based limit enhancements

**Key Features:**
- 401(k) with catch-up ($30,500 for 50+, $34,250 for 60+)
- IRA with catch-up ($8,000)
- HSA catch-up for 55+ ($1,000)
- Already has form questions mapped

**Estimated Time:** 3-4 hours

---

### 3. Profile 9: Late Stage Growth (MODERATE COMPLEXITY)
**Why moderate:**
- Infrastructure complete
- Employer 401(k) support added
- BUT missing alternative investments logic
- Estate planning considerations not implemented

**Key Features:**
- Pre-retirement optimization
- Needs alternative investment vehicles added
- Tax bracket management for RMDs
- Healthcare bridge planning

**Known Issues:**
- Alternative investments vehicle missing
- Estate planning logic not implemented

**Estimated Time:** 4-5 hours

---

### 4. Profile 3: Solo 401(k) Builder (MODERATE-COMPLEX)
**Why moderate-complex:**
- No infrastructure yet (business profile)
- Needs seeding logic review
- Employee vs employer calculations
- Business structure variations

**Key Features:**
- Solo 401(k) employee/employer split
- Business type impacts (Sole Prop vs S-Corp)
- Seeding from existing balances
- Simplified calculation option

**Known Issues:**
- Seeding logic concerns noted in docs
- Profit sharing optimization needed

**Estimated Time:** 5-6 hours

---

### 5. Profile 1: ROBS In Use (COMPLEX)
**Why complex:**
- No infrastructure yet
- Unlimited profit distributions
- C-Corp compliance rules
- Complex ROBS Solo 401(k)

**Key Features:**
- ROBS Solo 401(k) profit distributions (unlimited)
- C-Corp reasonable compensation
- ROBS compliance requirements
- Multiple contribution streams

**Known Issues:**
- Profit sharing optimization concerns

**Estimated Time:** 6-8 hours

---

### 6. Profile 8: Business Owner Group (MOST COMPLEX)
**Why most complex:**
- No infrastructure yet
- Multiple retirement plan types
- Group plan dynamics
- Employee considerations

**Key Features:**
- SIMPLE IRA, SEP IRA, 401(k) options
- Safe harbor provisions
- Defined benefit potential
- Employee vs owner calculations

**Known Issues:**
- Most complex business logic
- Multiple plan type handling

**Estimated Time:** 8-10 hours

---

## Implementation Strategy (3-Day Deadline)

### Day 1: Quick Wins (Est. 10-12 hours)
- [ ] Profile 5: Bracket Strategist (3-4 hours)
- [ ] Profile 6: Catch-Up Visionary (3-4 hours)
- [ ] Profile 9: Late Stage Growth (4-5 hours)

### Day 2: Business Profiles (Est. 11-14 hours)
- [ ] Profile 3: Solo 401(k) Builder (5-6 hours)
- [ ] Profile 1: ROBS In Use (6-8 hours)

### Day 3: Most Complex (Est. 8-10 hours)
- [ ] Profile 8: Business Owner Group (8-10 hours)
- [ ] OR: Complete any unfinished profiles
- [ ] Final testing and validation

### Achievable Goals:
- **Minimum**: Complete Profiles 5, 6, 9 (infrastructure exists)
- **Target**: Complete Profiles 5, 6, 9, 3, 1
- **Stretch**: All remaining profiles

## Testing Approach (FROM TUNING GUIDES)

For each profile:
1. **VALIDATE HEADERS FIRST** - Run `validateHeaders()` to avoid 3+ hour debugging
2. **Review profile configuration** in PROFILE_CONFIG
3. **Check form mapping** - Verify FORM_EX_Q_MAPPING entries
4. **Implement profile helper** using:
   - HEADERS constants (never hardcode!)
   - Defaults for all getValue() calls
   - Universal utility functions
5. **Create test scenarios**:
   - Basic scenario
   - High income (phase-out testing)
   - With benefits (HSA, employer match)
6. **Validate with monthly calculations**
7. **Document special behaviors**

## Success Criteria

Each profile is complete when:
- ✅ All extra questions mapped correctly
- ✅ Profile helper generates correct vehicle order
- ✅ Monthly contribution calculations are accurate
- ✅ Universal engine allocates funds properly
- ✅ Test scenarios pass validation
- ✅ Edge cases handled appropriately

## Key Implementation Patterns

From successful implementations (Profiles 2, 4, 7):

```javascript
// 1. ALWAYS start with header validation
const validation = validateHeaders();

// 2. Extract data with HEADERS constants and defaults
const age = Number(getValue(hdr, rowArr, HEADERS.CURRENT_AGE)) || 35;

// 3. Use universal functions
const hsaCap = calculateHsaMonthlyCapacity(hsaElig, age, filing);

// 4. Apply phase-outs properly
baseRetirementOrder = applyRothIRAPhaseOut(baseRetirementOrder, {
  grossIncome,
  filingStatus: filing,
  taxFocus
});

// 5. Return proper structure
return {
  seeds,
  vehicleOrders: {
    Education: educationOrder,
    Health: healthOrder,
    Retirement: retirementOrder
  }
};
```

## Critical Warnings from Documentation

1. **Header Mismatches**: The #1 cause of debugging time - ALWAYS validate first
2. **Missing Defaults**: getValue() can return undefined - ALWAYS provide defaults
3. **Form Mapping**: Use FORM_EX_Q_MAPPING system - don't hardcode question numbers
4. **Taxable Brokerage**: REMOVED - use Family Bank for overflow
5. **Phase-Outs**: Use utility function - don't implement manually

## Next Steps

1. Start with Profile 5 (Bracket Strategist) - infrastructure ready
2. Run header validation first
3. Use established patterns from Profiles 2 & 4
4. Test with multiple scenarios
5. Move quickly through 5, 6, 9 since infrastructure exists
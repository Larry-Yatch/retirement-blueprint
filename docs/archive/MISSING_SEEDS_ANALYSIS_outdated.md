# Missing Seeds Analysis & Recommendations

*Created: August 27, 2025*

## Critical Gap: Current vs Ideal Allocations

### The Problem
We're not distinguishing between:
1. **Current Reality** - What users are actually contributing today
2. **Ideal Recommendations** - What we suggest they should contribute

This creates confusion because we're mixing existing contributions with new recommendations.

## Missing Seeds We Should Capture

### 🎓 Education Domain
**Currently Missing:**
- Existing CESA contributions
- Existing 529 plan contributions
- Existing Coverdell ESA contributions

**Form Questions Exist But Not Seeded:**
- "Current monthly education contribution" appears in all forms
- This data is collected but NOT used as seeds

**Recommendation:** Seed existing education contributions for all profiles with children

### 🏥 Health Domain
**Currently Missing:**
- Current HSA contributions (partially captured)

**Form Questions Exist:**
- `P2_HSA_CURRENT_BALANCE` - Current HSA balance
- `P2_HSA_MONTHLY_CONTRIB` - Current monthly HSA contribution

**Recommendation:** Seed existing HSA contributions for all HSA-eligible users

### 💼 Retirement Domain
**Missing from Various Profiles:**

#### Profile 5, 6, 7, 9 (W-2 Employees)
- Current 401(k) employee contributions
- Current IRA contributions
- Current Roth IRA contributions

#### Profile 7 (Foundation Builder)
- Any existing retirement contributions

#### All Profiles
- Employer match amounts (currently handled as vehicles, not seeds)

## Recommended Seeding Strategy

### 1. Universal Seeds (All Profiles)
```javascript
// Education seeds
if (currentMonthlyEducation > 0) {
  seeds.Education['Current CESA/529'] = currentMonthlyEducation;
}

// Health seeds
if (currentMonthlyHSA > 0) {
  seeds.Health['Current HSA'] = currentMonthlyHSA;
}
```

### 2. Profile-Specific Seeds

#### W-2 Employee Profiles (5, 6, 7, 9)
```javascript
// Current 401(k) contributions
if (current401kContribution > 0) {
  seeds.Retirement['Current 401(k)'] = current401kContribution / 12;
}

// Employer match (should be seeded, not just a vehicle)
if (hasEmployerMatch) {
  seeds.Retirement['Employer Match'] = calculateMatchAmount();
}
```

### 3. Separate Tracking: Current vs Ideal
We should track:
- **Current Allocation** = Seeds only (what they're doing today)
- **Ideal Allocation** = Seeds + New allocation (our recommendation)
- **Gap Analysis** = Ideal - Current (what they need to change)

## Implementation Approach

### Option 1: Add Seeds to All Profiles
**Pros:**
- Consistent treatment across all profiles
- Clear distinction between current and recommended
- Better user understanding

**Cons:**
- Major code changes required
- Changes system behavior significantly

### Option 2: Two-Column Output
Show users:
```
Current Contributions:
- 401(k): $500/mo (existing)
- HSA: $200/mo (existing)
- CESA: $100/mo (existing)
Total Current: $800/mo

Our Recommendations:
- 401(k): $800/mo (+$300)
- HSA: $358/mo (+$158)
- CESA: $333/mo (+$233)
- Roth IRA: $500/mo (new)
Total Recommended: $1,991/mo

Additional Savings Needed: $1,191/mo
```

### Option 3: Redefine Allocation Percentage
Change the system so allocation % means "total desired rate" not "additional":
- Calculate: Desired Total = Net Income × Allocation %
- Subtract: New Allocation = Desired Total - Current Seeds
- Result: System allocates only the gap

## Recommended Path Forward

1. **Immediate Fix**: Update form questions to clarify "additional" nature
2. **Short Term**: Add missing seeds for education and HSA contributions
3. **Medium Term**: Implement two-column output (current vs ideal)
4. **Long Term**: Consider redesigning allocation % to mean total rate

## Impact on Each Profile

### High Impact (Need Seeds Added):
- Profile 5: Missing current 401(k) and employer match seeds
- Profile 6: Missing current 401(k) and catch-up contribution seeds
- Profile 7: Missing all current contribution seeds
- Profile 9: Missing current 401(k) and employer match seeds

### Medium Impact (Already Have Some Seeds):
- Profile 1: Has ROBS seeds, missing HSA/CESA
- Profile 3: Has Solo 401(k) seeds, missing HSA/CESA
- Profile 8: Has group plan seeds, missing HSA/CESA

### Low Impact:
- Profile 2: Informational seeds only
- Profile 4: Balance tracking only

## Business Decision Required

The fundamental question: Should our system show:
1. **What to do with new money** (current design)
2. **Total optimal allocation** (user expectation)
3. **Both with clear labeling** (recommended)

This affects whether we treat existing contributions as:
- Baseline to build upon (current)
- Part of the total allocation (expected)
- Separate tracking with gap analysis (ideal)
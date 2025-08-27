# Current Contribution Tracking Analysis

*Created: August 27, 2025*

## Your Vision vs Current Implementation

### Your Vision ✅
1. Universal questions ask everyone what they're currently contributing
2. Profile-specific questions ask for profile-specific contributions (ROBS, Solo 401k, etc.)

### Current Reality
**Data Collection: ✅ WORKING**
- All forms collect current monthly HSA contribution
- All forms collect current monthly education contribution  
- All forms collect current monthly retirement contribution
- Profile-specific forms collect specialized contributions

**Data Usage: ❌ NOT IMPLEMENTED**
- These current contributions are NOT being used as seeds
- Only profile-specific contributions are seeded (ROBS, Solo 401k, etc.)

## What We're Currently Collecting

### Universal Questions (All Profiles)
| Question | Form Index | Header Mapping | Used as Seed? |
|----------|------------|----------------|---------------|
| Current monthly HSA contribution | 15 | current_monthly_hsa_contribution | ❌ No |
| Current monthly education contribution | 20 | current_monthly_education_contribution | ❌ No |
| Current monthly retirement contribution | 26 | current_monthly_retirement_contribution | ❌ No |

### Profile-Specific Questions
| Profile | What's Collected | Used as Seed? |
|---------|-----------------|---------------|
| 1 - ROBS | Profit distributions (ex_q6) | ✅ Yes |
| 2 - ROBS Curious | Planned rollover (ex_q1) | ✅ Yes (info only) |
| 3 - Solo 401k | Employee/Employer contributions (ex_q4-6) | ✅ Yes |
| 4 - Roth Reclaimer | Traditional IRA balance (ex_q1) | ✅ Yes (info only) |
| 5 - Bracket Strategist | Nothing specific | N/A |
| 6 - Catch-Up | Nothing specific | N/A |
| 7 - Foundation Builder | Nothing specific | N/A |
| 8 - Biz Owner | Current plan contributions (ex_q6) | ✅ Yes |
| 9 - Late Stage | Nothing specific | N/A |

## The Gap

We're collecting all the right data but only using part of it:
- ✅ Profile-specific contributions → Seeded
- ❌ Universal current contributions → Collected but ignored

## Minimal Change Solution

To implement your vision with minimal changes:

### Step 1: Add Universal Seeds to All Profiles
```javascript
// Add to every profile helper after initializing empty seeds:
const currentHSA = Number(getValue(hdr, rowArr, HEADERS.P2_HSA_MONTHLY_CONTRIB)) || 0;
const currentEducation = Number(getValue(hdr, rowArr, 'current_monthly_education_contribution')) || 0;
const currentRetirement = Number(getValue(hdr, rowArr, 'current_monthly_retirement_contribution')) || 0;

if (currentHSA > 0) seeds.Health['Current HSA'] = currentHSA;
if (currentEducation > 0) seeds.Education['Current Education'] = currentEducation;
if (currentRetirement > 0) seeds.Retirement['Current Retirement'] = currentRetirement;
```

### Step 2: Keep Profile-Specific Seeds As-Is
- Profile 1 keeps ROBS distributions
- Profile 3 keeps Solo 401k amounts
- Profile 8 keeps group plan amounts
- etc.

### Result: Complete Picture
Seeds would then represent ALL current contributions:
- Universal (HSA, Education, general Retirement)
- Profile-specific (ROBS, Solo 401k, etc.)

Allocation % remains "additional" on top of all seeds.

## Impact Assessment

### Low Risk Changes:
- Adding universal seeds is additive only
- Doesn't change existing profile-specific seeds
- Maintains current "additional %" logic

### What Users Would See:
```
Current Contributions (from your inputs):
- Current HSA: $200/mo
- Current Education: $150/mo  
- Current Retirement: $500/mo
- ROBS Distributions: $4,000/mo
Total Current: $4,850/mo

Additional Allocation (25% of income):
- New contributions: $2,000/mo

Total Recommended: $6,850/mo
```

## Recommendation

This is a small, safe change that:
1. Uses data we're already collecting
2. Provides complete picture of current state
3. Makes "additional %" calculation more accurate
4. Requires minimal code changes
5. No form changes needed

The only question is whether to implement this now or wait for a larger redesign.
# Profile Helper Tuning - Master Tracking Document

## 🎯 Purpose
This document tracks the current status and progress of profile helper tuning. For detailed implementation analysis, reasoning, and technical patterns, see [`/profiles/Profile_Tuning_Detailed_Analysis.md`](../profiles/Profile_Tuning_Detailed_Analysis.md).

**Use this document for:**
- Quick status checks
- Tracking what's complete vs pending
- Test results summary
- Planning next tasks

## 📊 Profile Tuning Status Overview

| Profile | Universal Functions | Employer 401(k) | Form Questions | Tuning Status | Next Steps |
|---------|-------------------|-----------------|----------------|---------------|------------|
| 1_ROBS_In_Use | ✅ Complete | N/A | Original | ⏳ Not Started | Review allocation logic |
| 2_ROBS_Curious | ✅ Complete | ✅ Added | ✅ Updated | ✅ Tuned | Test with live form |
| 3_Solo401k_Builder | ✅ Complete | N/A | Original | ⏳ Not Started | Review seeding logic |
| 4_Roth_Reclaimer | ✅ Complete | ✅ Added | ✅ Updated | ✅ Tuned | Test with live form |
| 5_Bracket_Strategist | ✅ Complete | ✅ Added | ✅ Updated | ⏳ Not Started | Test & tune allocation |
| 6_Catch_Up | ✅ Complete | ✅ Added | ✅ Updated | ⏳ Not Started | Test & tune allocation |
| 7_Foundation_Builder | ✅ Complete | ✅ Original | Original | ✅ Complete | Reference implementation |
| 8_Biz_Owner_Group | ✅ Complete | N/A | Original | ⏳ Not Started | Review group plan logic |
| 9_Late_Stage_Growth | ✅ Complete | ✅ Added | ✅ Updated | ⏳ Not Started | Test & tune allocation |

## 🔧 Infrastructure Improvements Completed

### 1. Universal Functions Implementation (✅ Complete)
All profiles now properly use:
- `calculateHsaMonthlyCapacity()` - HSA limits with age 55+ catch-up
- `calculateCesaMonthlyCapacity()` - CESA limits per child
- `applyRothIRAPhaseOut()` - Income-based Roth IRA phase-out
- `prioritizeTraditionalAccounts()` / `prioritizeRothAccounts()` - Tax preference ordering

### 2. Employer 401(k) Expansion (✅ Complete)
- Extended `addEmployer401kVehicles()` to 6 profiles (was only Profile 7)
- Added to profiles: 2, 4, 5, 6, 9 (in addition to existing Profile 7)
- Ensures "free money" employer match is never missed

### 3. Form Question Mapping System (✅ Complete)
Implemented flexible mapping system to handle dynamic form questions:

#### Key Components Added to Code.js:
1. **FORM_EX_Q_MAPPING** (lines 1776-1818)
   - Maps form question positions to ex_q1-10 slots
   - Profile-specific configurations
   - Easy to update when forms change

2. **remapFormValues()** (lines 1823-1844)
   - Intelligently remaps responses during paste to Working Sheet
   - Ensures employer 401(k) questions always land in ex_q1-4

3. **Updated handlePhase2()** (lines 2226-2237)
   - Automatically applies mapping based on profile
   - Seamless handling of both mapped and unmapped profiles

4. **testFormMapping()** (lines 1849-1870)
   - Utility function to verify mappings

#### Current Mapping Configuration:
```javascript
FORM_EX_Q_MAPPING = {
  '2_ROBS_Curious': {
    9: 'ex_q1',   // employer 401k
    10: 'ex_q2',  // employer match
    11: 'ex_q3',  // match percentage
    12: 'ex_q4',  // roth option
    7: 'ex_q5',   // rollover balance (original)
    8: 'ex_q6'    // annual contribution (original)
  },
  // Similar mappings for profiles 4, 5, 6, 9
}
```

## 📝 Phase 2 Form Updates

### Employer 401(k) Questions Added
✅ All forms for profiles 2, 4, 5, 6, and 9 now include:
1. Does your employer offer a 401(k) retirement plan?
2. Does your employer match your 401(k) contributions?
3. What percentage does your employer match?
4. Does your employer 401(k) plan have a Roth option?

### Form Update Process
When tuning profiles and changing questions:
1. Add/modify questions in Google Form
2. Note new positions (count from 1, including timestamp)
3. Update FORM_EX_Q_MAPPING in Code.js
4. Test with dummy submission

## 🎯 Profile-Specific Tuning Notes

### Profile 1: ROBS_In_Use
- **Status**: Infrastructure complete, tuning not started
- **Unique Features**: Unlimited profit distributions
- **Next Steps**: Review allocation priorities for ROBS vehicles

### Profile 2: ROBS_Curious ✅
- **Status**: TUNED - Major overhaul complete with simplified Solo 401(k)
- **Key Changes**: 
  - Dynamic vehicles based on employment
  - Employer 401(k) support
  - Traditional IRA added
  - Simplified Solo 401(k) calculation with spouse support
  - Updated form questions and mapping
- **Test Results**: ✅ All scenarios pass (see test details in analysis doc)
- **Latest Updates**: 
  - Simplified business savings question
  - Added spouse in business question
  - Fixed form mapping (spouse question at end)
- **Next Steps**: Ready for live form testing

### Profile 3: Solo401k_Builder
- **Status**: Infrastructure complete, tuning not started
- **Unique Features**: Seeding logic for employee/employer contributions
- **Next Steps**: Review seeding calculations and allocation order

### Profile 4: Roth_Reclaimer ✅
- **Status**: TUNED - Sophisticated backdoor Roth logic implemented
- **Key Changes**: Dynamic IRA strategy based on balance/understanding, employer 401(k) integration, mega backdoor support
- **Test Results**: ✅ All backdoor scenarios validated
- **Next Steps**: Ready for live form testing

### Profile 5: Bracket_Strategist
- **Status**: Infrastructure complete, tuning not started
- **Recent Changes**: Added employer 401(k) support
- **Focus**: Tax optimization - Traditional first
- **Next Steps**: Verify tax preference ordering with employer match

### Profile 6: Catch_Up
- **Status**: Infrastructure complete, tuning not started
- **Recent Changes**: Added employer 401(k) support
- **Focus**: Maximum contributions with catch-up
- **Next Steps**: Ensure catch-up calculations work with employer match

### Profile 7: Foundation_Builder ✅
- **Status**: COMPLETE - Reference implementation
- **Notes**: Original implementation with employer 401(k)
- **Use as**: Template for other profiles

### Profile 8: Biz_Owner_Group
- **Status**: Infrastructure complete, tuning not started
- **Unique Features**: Group plans, defined benefit potential
- **Next Steps**: Review group plan vehicle priorities

### Profile 9: Late_Stage_Growth
- **Status**: Infrastructure complete, tuning not started
- **Recent Changes**: Added employer 401(k) support
- **Missing**: Alternative investment integration
- **Next Steps**: Consider adding alternative investment logic

## 🚀 Next Steps

### Current Phase: Profile Tuning
- **Completed**: Profiles 2 & 4 ✅
- **In Progress**: Profile 5 (Bracket Strategist)
- **Remaining**: Profiles 1, 3, 6, 8, 9

### Quick Reference:
- **Tuning Process**: See [Profile Tuning Process Documentation](../profiles/Profile_Tuning_Detailed_Analysis.md#profile-tuning-process-documentation)
- **Test Functions**: `testTunedProfiles()` in Testing.js
- **Form Mapping**: Lines 1776-1818 in Code.js

## 📋 Testing Summary

### Test Results:
- **Profile 2**: ✅ 3/3 scenarios pass
- **Profile 4**: ✅ 3/3 scenarios pass

For detailed test scenarios and implementation patterns, see the analysis document.


## 🔄 Continuous Improvement Process

1. **Tune One Profile at a Time** - Focus and thoroughness
2. **Update Forms Freely** - Mapping system handles position changes
3. **Document Changes Here** - Keep this as source of truth
4. **Test Extensively** - Use test data before production
5. **Share Learnings** - Apply improvements across profiles

## 📚 Key Files

- **Technical Reference**: [`/profiles/Profile_Tuning_Detailed_Analysis.md`](../profiles/Profile_Tuning_Detailed_Analysis.md)
- **Test Functions**: `Testing.js` - `testTunedProfiles()`
- **Main Code**: `Code.js` - Profile helpers start at line ~990

---

CONCERN

We need to optimize SOLO401k profit sharing for profiles 1,2,3,8

*Last Updated: 2025-08-16 - Profiles 2 & 4 tuned and tested*
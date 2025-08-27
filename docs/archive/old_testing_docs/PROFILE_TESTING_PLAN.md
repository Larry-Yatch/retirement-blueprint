# Retirement Blueprint Profile Testing Plan

## Overview
This document outlines the comprehensive testing strategy for all 9 tuned profiles in the Retirement Blueprint system. The plan ensures each profile correctly generates vehicles, allocates funds, and handles edge cases.

## Testing Infrastructure

### Pre-Test Setup
1. **Validate Headers**
   ```javascript
   validateHeaders()  // Must pass before any testing
   ```
   
2. **Check Working Sheet**
   - Ensure headers are in row 2
   - Clear any test data from previous runs
   
3. **Verify Test Functions**
   - All profile test functions are in Testing.js
   - Complete test suites available for profiles 2, 4, 7

## Profile Testing Matrix

### Profile 1: ROBS In Use
**Status**: Enhanced with unlimited profit distributions
**Test Functions**: Not yet created
**Key Test Scenarios**:
1. Basic ROBS with profit distributions
2. High profit distributions ($10k+/month)
3. With/without HSA eligibility
4. With/without children (CESA)

### Profile 2: ROBS Curious
**Status**: Complete with dynamic employment logic
**Test Functions**: 
- `testProfile2W2()` - W-2 employee scenario
- `testProfile2Self()` - Self-employed scenario
- `testProfile2All()` - All scenarios

**Key Test Scenarios**:
1. W-2 employee with employer 401(k)
2. Self-employed with business income
3. Both W-2 and self-employed
4. High income backdoor Roth scenarios

### Profile 3: Solo 401(k) Builder
**Status**: Complete with employee/employer split
**Test Functions**: Not yet created
**Key Test Scenarios**:
1. Low business income (< $50k)
2. High business income (> $200k)
3. With catch-up contributions (age 50+)
4. Maximum contribution scenarios

### Profile 4: Roth Reclaimer
**Status**: Enhanced with employment-based logic
**Test Functions**:
- `testProfile4HighIncome()` - Backdoor Roth scenario
- `testProfile4LowIncome()` - Direct Roth contributions
- `testProfile4All()` - All scenarios

**Key Test Scenarios**:
1. High income with employer 401(k)
2. High income self-employed
3. Phase-out zone testing ($146k-$161k single)
4. Mega backdoor Roth (if 401k allows)

### Profile 5: Bracket Strategist
**Status**: Enhanced with employment logic
**Test Functions**: Not yet created
**Key Test Scenarios**:
1. W-2 with high tax bracket
2. Self-employed maximizing deductions
3. Mixed Traditional/Roth strategies
4. HSA prioritization

### Profile 6: Catch-Up Visionary
**Status**: Enhanced with age 50+ maximization
**Test Functions**: Not yet created
**Key Test Scenarios**:
1. Age 50-59 with catch-up limits
2. Age 60+ with enhanced catch-up
3. Multiple catch-up vehicles
4. Maximum contribution testing

### Profile 7: Foundation Builder
**Status**: Complete reference implementation
**Test Functions**:
- `testProfile7YoungPro()` - Young professional
- `testProfile7Family()` - Family with children
- `testProfile7All()` - All scenarios

**Key Test Scenarios**:
1. Entry-level income ($40-60k)
2. Mid-career with family
3. High earner foundation
4. No employer benefits

### Profile 8: Business Owner Group
**Status**: Enhanced with Cash Balance Plan
**Test Functions**: Not yet created
**Key Test Scenarios**:
1. Small employee group (< 5)
2. Large employee group (> 20)
3. Cash Balance Plan eligibility
4. Mega Backdoor Roth testing
5. Combined plan testing

### Profile 9: Late Stage Growth
**Status**: Enhanced with Roth conversions
**Test Functions**: Not yet created
**Key Test Scenarios**:
1. Pre-retirement (55-59)
2. Early retirement (60-64)
3. Roth conversion strategies
4. QCD planning scenarios

## Test Data Requirements

### Required Fields (ALL Tests)
```javascript
// Core demographics
'Current_Age': 35,
'ProfileID': '7_Foundation_Builder',
'Work_Situation': 'W-2 employee',

// Financial data
'gross_annual_income': 75000,
'Net_Monthly_Income': 5000,
'Allocation_Percentage': 20,
'filing_status': 'Single',

// Investment scoring (CRITICAL!)
'investment_involvement': 4,
'investment_time': 4,
'investment_confidence': 4,

// Domain importance
'retirement_importance': 7,
'education_importance': 1,
'health_importance': 5,

// Years until need
'retirement_years_until_target': 30,
'cesa_years_until_first_need': 18,
'hsa_years_until_need': 30,

// Preferences
'Tax_Minimization': 'Both',
'hsa_eligibility': 'Yes',
'cesa_num_children': 0,

// Profile-specific (ex_q1-10)
'ex_q1': 'Yes',  // Varies by profile
'ex_q2': 'Yes',
// ... etc
```

## Testing Methodology

### 1. Individual Profile Testing
For each profile:
1. Run basic scenario test
2. Test employment variations (W-2, Self, Both)
3. Test income edge cases
4. Test with/without benefits
5. Verify vehicle generation order
6. Validate allocation amounts
7. Check domain balance

### 2. Cross-Profile Testing
1. Same income across different profiles
2. Profile transitions (age/situation changes)
3. Benefit eligibility changes

### 3. Edge Case Testing
1. **Income Phase-Outs**
   - Roth IRA phase-out zones
   - High income scenarios
   
2. **Age-Based Testing**
   - Under 50
   - 50-59 (first catch-up)
   - 60+ (enhanced catch-up)
   
3. **Contribution Limits**
   - At limit scenarios
   - Over limit handling
   - Multiple account coordination

## Test Execution Plan

### Phase 1: Infrastructure Validation (Day 1)
1. Run `validateHeaders()` ✓
2. Test universal engine with sample data
3. Verify all helper functions exist
4. Document any missing test functions

### Phase 2: Profile Testing (Days 2-3)
Execute in order:
1. Profile 7 (Foundation Builder) - Reference
2. Profile 2 (ROBS Curious) - Dynamic logic
3. Profile 4 (Roth Reclaimer) - Complex eligibility
4. Profile 1 (ROBS In Use) - Unlimited vehicles
5. Profile 3 (Solo 401k) - Split contributions
6. Profile 5 (Bracket Strategist) - Tax optimization
7. Profile 6 (Catch-Up) - Age-based limits
8. Profile 8 (Business Owner) - Advanced vehicles
9. Profile 9 (Late Stage) - Retirement planning

### Phase 3: Integration Testing (Day 4)
1. Form submission to allocation flow
2. Phase 1 → Phase 2 transitions
3. Email generation and links
4. Error handling and validation

### Phase 4: Performance & Scale (Day 5)
1. Bulk user processing
2. Performance benchmarks
3. Memory usage monitoring
4. Concurrent user handling

## Success Criteria

### Per-Profile Success
- [ ] All test scenarios pass
- [ ] Vehicle generation matches profile logic
- [ ] Allocation respects 20% minimum
- [ ] Domain balance reflects importance scores
- [ ] No contribution limit violations
- [ ]Form mapping works correctly

### System-Wide Success
- [ ] All 9 profiles tested comprehensively
- [ ] Edge cases handled gracefully
- [ ] Performance acceptable (< 5s per user)
- [ ] No runtime errors in production scenarios
- [ ] Documentation updated with findings

## Test Reporting

### Daily Test Report Format
```
Profile: [Name]
Date: [Date]
Scenarios Tested: X/Y
Pass Rate: X%
Issues Found:
- Issue 1: Description
- Issue 2: Description
Action Items:
- Fix 1
- Fix 2
```

### Final Test Summary
- Total scenarios tested
- Overall pass rate
- Critical issues resolved
- Performance metrics
- Recommendations for production

## Quick Test Commands

```javascript
// Validate setup
validateHeaders()

// Test specific profiles
testProfile2All()      // ROBS Curious
testProfile4All()      // Roth Reclaimer  
testProfile7All()      // Foundation Builder

// Debug helpers
diagnoseProfile('1_ROBS_In_Use')
showVehicleOrder('8_Biz_Owner_Group')
traceAllocation('5_Bracket_Strategist')

// Test all profiles
testAllProfiles()      // Runs all available tests
```

## Next Steps

1. Create missing test functions for profiles 1, 3, 5, 6, 8, 9
2. Build comprehensive test data sets
3. Execute testing plan systematically
4. Document all findings
5. Create automated test suite for CI/CD

## Notes

- Always test with complete data (all fields)
- The 20% minimum is a feature, not a bug
- Investment scoring drives domain allocation
- Profile-specific questions use ex_q1-10 mapping
- Headers must be validated before any testing
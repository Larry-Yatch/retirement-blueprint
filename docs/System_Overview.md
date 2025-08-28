# Retirement Blueprint System Overview

## Project Overview

The Retirement Blueprint is a sophisticated financial planning system that helps users optimize their retirement savings allocation across multiple investment vehicles. The system uses a universal allocation engine that distributes funds across three domains: Education, Health, and Retirement.

## Architecture

### Core Components

1. **Universal Allocation Engine** (`Code.js`)
   - Handles all profile allocation logic
   - Distributes funds across domains based on importance scores
   - Enforces contribution limits and phase-out rules

2. **Profile System** (9 distinct profiles)
   - Each profile represents a different investor persona
   - Custom vehicle prioritization per profile
   - Dynamic vehicle generation based on user data

3. **Three-Phase Data Collection**
   - Phase 1: Basic demographics and financial information
   - Phase 2: Profile-specific deep dive questions
   - Phase 3: Future value calculations (automatic after Phase 2)

4. **Working Sheet**
   - Central data repository
   - Headers in row 2 (critical for testing)
   - Columns include Phase 1, Phase 2, and ex_q1-10 for profile questions

## Key System Features

### 1. Actual vs Ideal Output System (NEW)
The system now shows two sets of outputs:
- **Actual**: What users currently contribute (from Phase 2 forms)
- **Ideal**: Our recommended allocations based on their total savings goal

**Critical Change**: Allocation percentage now represents the **TOTAL** savings rate users want, not additional savings. Non-discretionary items (employer matches, ROBS distributions) are added ON TOP of this percentage.

For full details, see [Actual vs Ideal System Documentation](./Actual_vs_Ideal_System.md).

### 2. Minimum 20% Savings Rate
The system enforces a minimum 20% savings rate (`CONFIG.OPTIMIZED_SAVINGS_RATE`) regardless of user input. This ensures adequate retirement preparation:
- If user requests 15%, system allocates 20%
- If user requests 30%, system allocates 30%
- This is a feature, not a bug - designed for financial security

### 3. Domain-Based Allocation
Funds are distributed across three domains:
- **Education**: CESA accounts for children
- **Health**: HSA accounts with triple tax advantage
- **Retirement**: 401(k), IRA, and other retirement vehicles

Domain importance is calculated using:
- Investment scoring (involvement, time, confidence)
- Domain importance ratings
- Years until need

### 4. Vehicle Prioritization
Each profile has a specific vehicle order:
1. Employer match (free money) - always first
2. HSA (triple tax advantage)
3. Roth or Traditional based on tax preference
4. Remaining vehicles in profile-specific order
5. Family Bank for overflow (no Taxable Brokerage)

### 5. Phase 3: Future Value Calculator (NEW)
Automatically calculates projected future values after Phase 2:
- **Personalized Interest Rate**: 8-20% based on investment sophistication
- **Domain Consolidation**: Combines all vehicles within each domain
- **Monthly Compounding**: More accurate than annual projections
- **Dual Projections**: Shows both actual and ideal future values

For full details, see [Phase 3 Future Value System](./Phase_3_Future_Value_System.md).

## Profile Status Summary (January 2025)

All profiles are fully implemented, tested, and production-ready.

| Profile | Name | Status | Key Features |
|---------|------|--------|--------------|
| 1 | ROBS In Use | ✅ Production Ready | Unlimited profit distributions, HSA moved to position 3, fully tested |
| 2 | ROBS Curious | ✅ Production Ready | Dynamic W-2/Self-employed vehicles, comprehensive test coverage |
| 3 | Solo 401(k) Builder | ✅ Production Ready | Employee/employer split logic, entity-specific calculations tested |
| 4 | Roth Reclaimer | ✅ Production Ready | Employment-based logic, backdoor Roth strategies, allocation bug fixed |
| 5 | Bracket Strategist | ✅ Production Ready | Employment-based logic, HSA prioritized, tax optimization tested |
| 6 | Catch-Up Visionary | ✅ Production Ready | Employment-based logic, age 50+ maximization, catch-up limits verified |
| 7 | Foundation Builder | ✅ Production Ready | Reference implementation, extensive test coverage |
| 8 | Business Owner Group | ✅ Production Ready | Cash Balance Plan, Mega Backdoor Roth, HSA priority bug fixed |
| 9 | Late Stage Growth | ✅ Production Ready | Employment logic, Roth Conversions, QCD Planning, phased retirement tested |

## Critical Lessons Learned

### 1. Test Data Completeness
The #1 cause of test failures was missing fields:
- **Investment scoring fields** (causes equal $333 splits)
- **Domain importance fields**
- **Profile-specific ex_q mappings**

### 2. Development Best Practices
- Test immediately after each change
- Use simple, direct testing approaches
- Validate headers before running tests
- Always provide defaults for getValue() calls
- Never hardcode header names

### 3. Form Mapping System
- Universal questions: Positions 0-43
- Profile questions: Start at position 44+
- Use FORM_EX_Q_MAPPING for dynamic mapping
- Employer 401(k) questions map to ex_q1-4

### 4. Vehicle Generation vs Allocation
Just because a vehicle is generated doesn't mean it gets allocated:
- Generation: Creates available vehicles
- Allocation: Distributes funds based on budget
- Budget constraints may prevent allocation to all vehicles

## Infrastructure Improvements

### Completed Enhancements
1. **Actual vs Ideal System** - Two-output system showing current vs recommended contributions
2. **Total Percentage Calculation** - Allocation % now means total savings rate, not additional
3. **Universal Functions** - All profiles now use standard calculations
4. **Employer 401(k) Support** - Extended to all applicable profiles
5. **Form Mapping System** - Handles dynamic question positions
6. **Header Management** - Centralized constants and validation
7. **Comprehensive Testing** - Complete test suites with all fields
8. **Employment-Based Logic** - Profiles 4, 5, 6, 9 now support W-2/Self-employed/Both scenarios
9. **HSA Prioritization** - Moved up in vehicle order for tax efficiency across profiles
10. **Advanced Vehicles** - Cash Balance Plan and Mega Backdoor Roth for high-net-worth profiles
11. **Retirement Planning** - Roth Conversions and QCD Planning for late-stage profiles
12. **Phase 3 Future Value Calculator** - Automatic projections with personalized rates

### Testing Infrastructure (Complete)
- `Testing.js` - Consolidated testing framework with all profiles
- `Testing_Scenarios.js` - Comprehensive test scenarios for all 9 profiles
- Complete test data templates with realistic edge cases
- Profile-specific test scenarios covering all employment types
- Monthly allocation validation with tolerance checks
- Debug helpers for troubleshooting any issues
- All profiles have passed testing with multiple scenarios

## Quick Reference

### Key Files
- `Code.js` - Main engine and profile helpers
- `Testing.js` - All testing functionality
- `Current_Forms_Full.js` - Form question definitions
- Working Sheet - Central data repository (headers in row 2)

### Common Commands
```javascript
// Validate headers before testing
validateHeaders()

// Test a specific profile
testProfile2All()

// Test Phase 3 future values
testPhase3()

// Debug profile issues
diagnoseProfile('7_Foundation_Builder')

// Show vehicle priority
showVehicleOrder('2_ROBS_Curious')
```

### Critical Constants
- `CONFIG.OPTIMIZED_SAVINGS_RATE` = 0.20 (20% minimum)
- `LIMITS.RETIREMENT` - 2025 contribution limits
- `HEADERS` - All header name mappings
- `FORM_EX_Q_MAPPING` - Form position mappings

## System Maintenance

1. **Monitor Production Performance** - Track any user-reported issues
2. **Annual Limit Updates** - Update contribution limits each year
3. **Tax Law Changes** - Adjust calculations as regulations change
4. **User Feedback Integration** - Enhance based on real-world usage

## Important Notes

- The universal engine was never broken - test data was incomplete
- Headers are in Working Sheet row 2, not row 1
- Family Bank replaced Taxable Brokerage for overflow
- All monetary values use 2025 limits
- Test with complete data before assuming engine issues

For detailed implementation guidance, see:
- [Profile Implementation Guide](./Profile_Implementation_Guide.md)
- [Testing Guide](./Testing_Guide.md)
- [Technical Reference](./Technical_Reference.md)
- [Quick Start](./Quick_Start.md)
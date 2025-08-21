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

3. **Two-Phase Data Collection**
   - Phase 1: Basic demographics and financial information
   - Phase 2: Profile-specific deep dive questions

4. **Working Sheet**
   - Central data repository
   - Headers in row 2 (critical for testing)
   - Columns include Phase 1, Phase 2, and ex_q1-10 for profile questions

## Key System Features

### 1. Minimum 20% Savings Rate
The system enforces a minimum 20% savings rate (`CONFIG.OPTIMIZED_SAVINGS_RATE`) regardless of user input. This ensures adequate retirement preparation:
- If user requests 15%, system allocates 20%
- If user requests 30%, system allocates 30%
- This is a feature, not a bug - designed for financial security

### 2. Domain-Based Allocation
Funds are distributed across three domains:
- **Education**: CESA accounts for children
- **Health**: HSA accounts with triple tax advantage
- **Retirement**: 401(k), IRA, and other retirement vehicles

Domain importance is calculated using:
- Investment scoring (involvement, time, confidence)
- Domain importance ratings
- Years until need

### 3. Vehicle Prioritization
Each profile has a specific vehicle order:
1. Employer match (free money) - always first
2. HSA (triple tax advantage)
3. Roth or Traditional based on tax preference
4. Remaining vehicles in profile-specific order
5. Family Bank for overflow (no Taxable Brokerage)

## Profile Status Summary

| Profile | Name | Status | Key Features |
|---------|------|--------|--------------|
| 1 | ROBS In Use | ✅ Enhanced | Unlimited profit distributions, HSA moved to position 3 |
| 2 | ROBS Curious | ✅ Complete | Dynamic W-2/Self-employed vehicles |
| 3 | Solo 401(k) Builder | ✅ Complete | Employee/employer split logic |
| 4 | Roth Reclaimer | ✅ Enhanced | Employment-based logic, backdoor Roth strategies |
| 5 | Bracket Strategist | ✅ Enhanced | Employment-based logic, HSA prioritized |
| 6 | Catch-Up Visionary | ✅ Enhanced | Employment-based logic, age 50+ maximization |
| 7 | Foundation Builder | ✅ Complete | Reference implementation |
| 8 | Business Owner Group | ✅ Enhanced | Cash Balance Plan, Mega Backdoor Roth added |
| 9 | Late Stage Growth | ✅ Enhanced | Employment logic, Roth Conversions, QCD Planning |

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
1. **Universal Functions** - All profiles now use standard calculations
2. **Employer 401(k) Support** - Extended to all applicable profiles
3. **Form Mapping System** - Handles dynamic question positions
4. **Header Management** - Centralized constants and validation
5. **Comprehensive Testing** - Complete test suites with all fields
6. **Employment-Based Logic** - Profiles 4, 5, 6, 9 now support W-2/Self-employed/Both scenarios
7. **HSA Prioritization** - Moved up in vehicle order for tax efficiency across profiles
8. **Advanced Vehicles** - Cash Balance Plan and Mega Backdoor Roth for high-net-worth profiles
9. **Retirement Planning** - Roth Conversions and QCD Planning for late-stage profiles

### Testing Infrastructure
- `Testing.js` - Consolidated testing framework
- Complete test data templates
- Profile-specific test scenarios
- Monthly allocation validation
- Debug helpers for troubleshooting

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

## Next Steps

1. **Complete Remaining Profiles** (5, 6, 9, 3, 1, 8)
2. **Optimize Solo 401(k) Profit Sharing** for business profiles
3. **Live Form Testing** for completed profiles
4. **Performance Optimization** if needed

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
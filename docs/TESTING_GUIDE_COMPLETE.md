# Complete Testing Guide for Retirement Blueprint

*Last Updated: August 27, 2025*

## 🎯 Overview

This guide consolidates all testing documentation for the Retirement Blueprint system. We have two main testing files that work together to provide comprehensive testing capabilities.

## 📁 Current Testing Infrastructure

### Active Testing Files
1. **Testing.js** - Core testing framework
2. **Testing_Enhanced.js** - Enhanced validation and data generation

### Documentation Structure
```
docs/
├── TESTING_GUIDE_COMPLETE.md (this file)
├── TESTING_QUICK_REFERENCE.md
└── archive/
    └── old_testing_docs/ (historical reference)
```

## 🚀 Quick Start

### 1. First Time Setup (One Time Only)
```javascript
// Open Script Editor and run from Testing_Enhanced.js:
validateHeadersEnhanced()  // Check for missing headers
fixMissingHeaders()        // Auto-fix if needed
```

### 2. Test a Single Profile
```javascript
// Using enhanced testing (recommended)
const testData = generateCompleteTestData('7_Foundation_Builder', {
  Current_Age: 45,
  gross_annual_income: 150000
});
runTestWithValidation('7_Foundation_Builder', testData);

// Using basic testing
testProfileHelper('7_Foundation_Builder');
```

### 3. Test All Profiles
```javascript
// Enhanced (with validation)
testAllProfilesWithValidation()

// Basic
testAllProfiles()
```

## 🔍 Understanding the Two Testing Approaches

### Basic Testing (Testing.js)

**Pros:**
- Simpler, direct testing
- Pre-built scenarios for profiles 2, 4, 7
- Good for quick checks

**Cons:**
- Manual test data creation
- Prone to missing critical fields
- Less helpful error messages

**Key Functions:**
```javascript
validateHeaders()              // Basic header check
testProfileHelper()           // Test vehicle generation
runCompleteScenarioTest()     // Full allocation test
testAllProfiles()            // Test all helpers
```

### Enhanced Testing (Testing_Enhanced.js)

**Pros:**
- Auto-detects header location
- Validates ALL critical fields
- Auto-fixes common issues
- Complete test data generation
- Clear error messages

**Cons:**
- Slightly more complex
- Requires understanding of validation

**Key Functions:**
```javascript
validateHeadersEnhanced()     // Smart header validation
fixMissingHeaders()          // Auto-add missing headers
generateCompleteTestData()   // Create complete test data
runTestWithValidation()      // Test with pre-validation
autoFixTestData()           // Fix common data issues
```

## 📋 Critical Fields That Must Be Present

### 1. Investment Scoring (1-7 scale)
```javascript
'investment_involvement': 4,  // How involved in investments
'investment_time': 4,        // Time available for investing
'investment_confidence': 4   // Investment knowledge confidence
```
**Without these:** You get equal $333/$333/$333 domain splits

### 2. Domain Importance (1-7 scale)
```javascript
'retirement_importance': 7,  // How important is retirement
'education_importance': 3,   // How important is education (increase if kids)
'health_importance': 5       // How important is health savings
```
**Without these:** Allocations won't reflect priorities

### 3. Years Until Need
```javascript
'retirement_years_until_target': 30,  // Years to retirement
'cesa_years_until_first_need': 18,   // Years until kids need college
'hsa_years_until_need': 30           // Years until major health expenses
```
**Without these:** Urgency calculations fail

### 4. Financial Basics
```javascript
'gross_annual_income': 75000,
'Net_Monthly_Income': 5000,    // MUST be > 0
'Allocation_Percentage': 20,   // MUST be > 0
'filing_status': 'Single'      // or 'Married Filing Jointly'
```
**Without these:** $0 or NaN allocations

### 5. Profile-Specific Questions (ex_q1-10)
Each profile expects different values. Common pattern:
```javascript
'ex_q1': 'Yes',         // Has employer 401k?
'ex_q2': 'Yes',         // Has match?
'ex_q3': '100% up to 3%', // Match details
'ex_q4': 'Yes'          // Has Roth option?
```

## 🧪 Testing All 9 Profiles

### Profile Test Status
| Profile | ID | Test Functions | Scenarios |
|---------|----|--------------:|-----------|
| ROBS In Use | 1_ROBS_In_Use | Basic only | Custom |
| ROBS Curious | 2_ROBS_Curious | ✅ Complete | W-2, Self, Both |
| Solo 401k | 3_Solo401k_Builder | Basic only | Custom |
| Roth Reclaimer | 4_Roth_Reclaimer | ✅ Complete | High/Low Income |
| Bracket Strategist | 5_Bracket_Strategist | Basic only | Custom |
| Catch-Up | 6_Catch_Up | Basic only | Custom |
| Foundation | 7_Foundation_Builder | ✅ Complete | Young/Family |
| Biz Owner | 8_Biz_Owner_Group | Basic only | Custom |
| Late Stage | 9_Late_Stage_Growth | Basic only | Custom |

### Testing Each Profile

#### Profiles with Complete Test Suites (2, 4, 7)
```javascript
// Test all scenarios
testProfile2All()  // ROBS Curious
testProfile4All()  // Roth Reclaimer
testProfile7All()  // Foundation Builder

// Test specific scenarios
testProfile2W2()        // W-2 employee
testProfile2Self()      // Self-employed
testProfile4HighIncome() // Backdoor Roth
testProfile7Family()     // Family with kids
```

#### Profiles with Basic Testing (1, 3, 5, 6, 8, 9)
```javascript
// Use enhanced testing with complete data
const data = generateCompleteTestData('1_ROBS_In_Use', {
  Work_Situation: 'Self-employed',
  gross_annual_income: 150000
});
runTestWithValidation('1_ROBS_In_Use', data);
```

## 🐛 Common Test Failures & Solutions

### 1. Equal $333/$333/$333 Domain Splits
**Cause:** Missing investment scoring fields
**Fix:** Add all 3 investment fields (1-7 scale)
```javascript
'investment_involvement': 4,
'investment_time': 4,
'investment_confidence': 4
```

### 2. $0 or NaN Allocations
**Cause:** Missing Net_Monthly_Income or Allocation_Percentage
**Fix:** Set both to positive numbers
```javascript
'Net_Monthly_Income': 5000,
'Allocation_Percentage': 20
```

### 3. "Cannot read property X of undefined"
**Cause:** Headers not found in Working Sheet
**Fix:** Run validation and auto-fix
```javascript
validateHeadersEnhanced()
fixMissingHeaders()
```

### 4. Missing 401k or IRA Vehicles
**Cause:** Profile-specific questions (ex_q1-4) not set
**Fix:** Set appropriate values for the profile
```javascript
'ex_q1': 'Yes',  // Has employer 401k
'ex_q2': 'Yes',  // Has match
'ex_q3': '100% up to 3%',
'ex_q4': 'Yes'   // Has Roth option
```

### 5. Getting 20% When Setting 15%
**Cause:** System enforces 20% minimum savings rate
**Fix:** This is correct behavior - not a bug

## 🛠️ Debug Tools

### Diagnose Profile Issues
```javascript
diagnoseProfile('7_Foundation_Builder')
// Shows vehicles generated vs allocated
```

### Show Vehicle Priority
```javascript
showVehicleOrder('2_ROBS_Curious')
// Displays vehicle funding order
```

### Trace Allocation Logic
```javascript
traceAllocation('4_Roth_Reclaimer')
// Shows why vehicles get skipped
```

### Diagnose Test Failures
```javascript
diagnoseTestFailures()
// Shows common issues and fixes
```

## 📊 Understanding Test Output

### Good Test Output
```
📊 FINANCIAL INPUTS:
  Gross Annual: $120,000
  Net Monthly: $7,500
  Allocation %: 26.7%
  Expected Monthly: $2,003

💰 ACTUAL ALLOCATIONS:
Retirement:
  - 401(k) Match Traditional: $600/mo
  - 401(k) Roth: $68/mo
  Subtotal: $668/mo

✅ Allocation matches!
```

### Problem Indicators
- ❌ Missing headers
- ⚠️ Missing critical fields
- Equal domain splits ($333 each)
- $0 or NaN values
- Missing expected vehicles

## 📝 Writing New Tests

### Using the Enhanced Template
```javascript
function testNewScenario() {
  // 1. Generate complete data with overrides
  const testData = generateCompleteTestData('8_Biz_Owner_Group', {
    Current_Age: 50,
    gross_annual_income: 500000,
    W2_Employees: 'Yes',
    ex_q1: '10',  // Number of employees
    ex_q2: '35',  // Average employee age
  });
  
  // 2. Run with validation
  runTestWithValidation('8_Biz_Owner_Group', testData);
}
```

### Adding Assertions
```javascript
function testWithAssertions() {
  const result = runTestWithValidation('7_Foundation_Builder');
  
  // Assert vehicles allocated
  assertVehicleAllocated(result, '401(k) Match');
  assertAllocationAmount(result, 'HSA', 333, 10); // $333 ± $10
}
```

## 🚦 Testing Workflow

### 1. Development Testing
```javascript
// After making changes to a profile
validateHeadersEnhanced()
testProfileHelper('4_Roth_Reclaimer')  // Quick vehicle check
runTestWithValidation('4_Roth_Reclaimer')  // Full allocation test
```

### 2. Pre-Production Testing
```javascript
// Test all profiles comprehensively
testAllProfilesWithValidation()

// Run specific edge cases
testHighIncomePhaseOut()
testCatchUpContributions()
testBusinessOwnerScenarios()
```

### 3. Production Validation
- Run live form tests
- Verify email generation
- Check Phase 2 transitions

## 📚 Additional Resources

### Key Files
- `Code.js` - Main application with profile helpers
- `Testing.js` - Core testing framework
- `Testing_Enhanced.js` - Enhanced validation
- `Current_Forms_Full.js` - Form configuration

### Related Documentation
- [System Overview](./System_Overview.md) - Architecture and concepts
- [Profile Implementation Guide](./Profile_Implementation_Guide.md) - Profile details
- [Technical Reference](./Technical_Reference.md) - API documentation

## 🎯 Best Practices

1. **Always validate headers first** - Prevents cryptic errors
2. **Use complete test data** - generateCompleteTestData() handles this
3. **Test after every change** - Catch issues early
4. **Document expected behavior** - Before writing tests
5. **Use enhanced testing** - Better error messages
6. **Test edge cases** - High income, no benefits, etc.
7. **Keep tests simple** - One scenario per test

## 📋 Testing Checklist

### Before Testing
- [ ] Headers validated with validateHeadersEnhanced()
- [ ] Using generateCompleteTestData() for test data
- [ ] Profile-specific questions (ex_q) set correctly
- [ ] Expected behavior documented

### During Testing
- [ ] Total allocation matches expected
- [ ] Vehicle priority order correct
- [ ] Domain balance reflects importance scores
- [ ] No contribution limit violations
- [ ] 20% minimum properly enforced

### After Testing
- [ ] All profiles tested
- [ ] Edge cases covered
- [ ] No console errors
- [ ] Results documented

## 🆘 Getting Help

If tests are failing:
1. Run `diagnoseTestFailures()` for common solutions
2. Check this guide's Common Failures section
3. Verify test data completeness
4. Review profile-specific requirements

Remember: Most test failures are due to missing headers or incomplete test data. The enhanced testing tools prevent 90% of these issues!
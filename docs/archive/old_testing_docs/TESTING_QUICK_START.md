# Quick Start Testing Guide

## 🚀 Immediate Testing Steps

### 1. Open Google Sheets Script Editor
```
Extensions → Apps Script
```

### 2. Run Header Validation
In Script Editor, select `Testing.js` and run:
```javascript
validateHeaders()
```

### 3. Test All Profiles at Once
Run the comprehensive test:
```javascript
runAllProfileTests()  // From RUN_ALL_TESTS.js
```

## 📊 Available Test Functions

### Existing Complete Test Suites
- **Profile 2 (ROBS Curious)**: `testProfile2All()`
- **Profile 4 (Roth Reclaimer)**: `testProfile4All()`
- **Profile 7 (Foundation Builder)**: `testProfile7All()`

### Basic Test Functions (Created in RUN_ALL_TESTS.js)
- **Profile 1**: `testProfile1()`
- **Profile 3**: `testProfile3()`
- **Profile 5**: `testProfile5()`
- **Profile 6**: `testProfile6()`
- **Profile 8**: `testProfile8()`
- **Profile 9**: `testProfile9()`

## 🧪 Testing Menu

After running `onOpen()` or refreshing the sheet, use:
```
🧪 Testing → Run ALL Profile Tests
```

## 📋 What Gets Tested

### For Each Profile:
1. **Vehicle Generation** - Correct vehicles in right order
2. **Allocation Logic** - Funds distributed properly
3. **Domain Balance** - Based on importance scores
4. **Limit Enforcement** - Contribution caps respected
5. **20% Minimum** - Savings rate enforcement

### Key Scenarios:
- W-2 employees with 401(k)
- Self-employed with business income
- Mixed employment situations
- High income (backdoor Roth)
- Age-based catch-up contributions
- With/without benefits

## 🔍 Viewing Results

1. **Script Editor Logs**: View → Logs
2. **Console Output**: Shows detailed allocation breakdowns
3. **Pass/Fail Status**: Green ✅ or Red ❌ indicators

## ⚠️ Common Issues

### "Headers not found"
Run `validateHeaders()` first

### "Missing investment scoring"
Ensure test data includes:
- investment_involvement (1-7)
- investment_time (1-7)
- investment_confidence (1-7)

### "Wrong allocations"
Check if 20% minimum is affecting results

## 📝 Test Data Structure

Every test needs these fields:
```javascript
{
  // Demographics
  Current_Age: 35,
  ProfileID: '7_Foundation_Builder',
  Work_Situation: 'W-2 employee',
  
  // Financial
  gross_annual_income: 75000,
  Net_Monthly_Income: 5000,
  Allocation_Percentage: 20,
  
  // Scoring (CRITICAL!)
  investment_involvement: 4,
  investment_time: 4,
  investment_confidence: 4,
  
  // Domain importance
  retirement_importance: 7,
  education_importance: 3,
  health_importance: 5,
  
  // Profile-specific
  ex_q1: 'Yes',  // Varies by profile
  ex_q2: 'Yes',
  // etc...
}
```

## 🎯 Quick Commands

```javascript
// Test everything
runAllProfileTests()

// Test specific profile
testProfile2All()  // ROBS Curious
testProfile4All()  // Roth Reclaimer
testProfile7All()  // Foundation Builder

// Debug helpers
diagnoseProfile('1_ROBS_In_Use')
showVehicleOrder('8_Biz_Owner_Group')

// Validate setup
validateHeaders()
```

## 📈 Expected Results

✅ **Good Test Output**:
```
Profile: 7_Foundation_Builder
Expected Monthly: $1,000
Actual Allocations:
- 401(k) Match: $250
- HSA: $333
- Roth IRA: $417
Total: $1,000 ✅
```

❌ **Problem Output**:
```
Profile: 4_Roth_Reclaimer
ERROR: Missing ex_q1 field
Vehicle generation failed
```

## 🚦 Next Steps After Testing

1. **All Pass**: Ready for production
2. **Some Failures**: Check test data completeness
3. **Consistent Failures**: Debug profile helper
4. **Performance Issues**: Optimize allocation logic
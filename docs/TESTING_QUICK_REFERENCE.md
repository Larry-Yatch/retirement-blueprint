# Testing Quick Reference

## 🚀 Most Common Commands

```javascript
// First time setup (run once)
validateHeadersEnhanced()
fixMissingHeaders()

// Test all profiles
testAllProfilesWithValidation()

// Test specific profiles
testProfile2All()  // ROBS Curious
testProfile4All()  // Roth Reclaimer  
testProfile7All()  // Foundation Builder

// Debug failures
diagnoseTestFailures()
```

## 🔧 Fix Common Issues

| Problem | Solution |
|---------|----------|
| Equal $333 splits | Add investment scoring fields (1-7) |
| $0 allocations | Set Net_Monthly_Income > 0 |
| Headers not found | Run fixMissingHeaders() |
| Missing vehicles | Set ex_q1='Yes' for 401k |
| Getting 20% not 15% | Working correctly (20% minimum) |

## 📋 Required Fields Checklist

```javascript
// These prevent 90% of failures
{
  // Investment Scoring (1-7)
  investment_involvement: 4,
  investment_time: 4,
  investment_confidence: 4,
  
  // Domain Importance (1-7)
  retirement_importance: 7,
  education_importance: 3,
  health_importance: 5,
  
  // Years Until
  retirement_years_until_target: 30,
  cesa_years_until_first_need: 18,
  hsa_years_until_need: 30,
  
  // Financial (must be > 0)
  Net_Monthly_Income: 5000,
  Allocation_Percentage: 20
}
```

## 🧪 Test Any Profile

```javascript
// Generate complete data
const data = generateCompleteTestData('1_ROBS_In_Use', {
  // Only override what you're testing
  Current_Age: 50,
  gross_annual_income: 200000
});

// Run with validation
runTestWithValidation('1_ROBS_In_Use', data);
```

## 📊 Profile Reference (All Complete)

| # | Profile | Test Function | Status |
|---|---------|---------------|--------|
| 1 | ROBS In Use | testProfile1All() | ✅ Production Ready |
| 2 | ROBS Curious | testProfile2All() | ✅ Production Ready |
| 3 | Solo 401k | testProfile3All() | ✅ Production Ready |
| 4 | Roth Reclaimer | testProfile4All() | ✅ Production Ready (Fixed) |
| 5 | Bracket Strategist | testProfile5All() | ✅ Production Ready |
| 6 | Catch-Up | testProfile6All() | ✅ Production Ready |
| 7 | Foundation | testProfile7All() | ✅ Production Ready |
| 8 | Biz Owner | testProfile8All() | ✅ Production Ready (Fixed) |
| 9 | Late Stage | testProfile9All() | ✅ Production Ready |

## 🆘 Emergency Fixes

```javascript
// Can't find headers?
validateHeadersEnhanced()
fixMissingHeaders()

// Test failing?
diagnoseTestFailures()

// Need complete template?
showCompleteTestTemplate()

// Check specific profile
diagnoseProfile('7_Foundation_Builder')
```
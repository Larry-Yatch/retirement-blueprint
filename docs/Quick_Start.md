# Quick Start Guide

## "I Need To..." Reference

### 🔧 Fix a Broken Test
1. Run `validateHeaders()` - fixes 90% of issues
2. Check Working Sheet row 2 has headers
3. Ensure all investment scoring fields (1-7) are included
4. Verify profile's ex_q mapping matches form
5. See [Testing Guide](./Testing_Guide.md#common-test-failures--solutions)

### 📝 Tune a New Profile
1. Start with [Profile Implementation Guide](./Profile_Implementation_Guide.md#efficient-profile-tuning-process)
2. Use the standard structure template
3. Include all universal functions
4. Test with complete data
5. Update form mapping if needed

### 🧪 Run Quick Tests
```javascript
// In Script Editor - All profiles tested and working!
testProfile1All()    // Test Profile 1 (ROBS In Use)
testProfile2All()    // Test Profile 2 (ROBS Curious)
testProfile3All()    // Test Profile 3 (Solo 401k Builder)
testProfile4All()    // Test Profile 4 (Roth Reclaimer) - Fixed
testProfile5All()    // Test Profile 5 (Bracket Strategist)
testProfile6All()    // Test Profile 6 (Catch-Up Visionary)
testProfile7All()    // Test Profile 7 (Foundation Builder)
testProfile8All()    // Test Profile 8 (Business Owner Group) - Fixed
testProfile9All()    // Test Profile 9 (Late Stage Growth)
validateHeaders()    // Check setup
diagnoseProfile('7_Foundation_Builder')  // Debug issues

// Phase 3 Future Value Tests
testPhase3()         // Test future value calculations
testPhase3EdgeCases() // Test edge cases
testPhase3Scenarios() // Test realistic scenarios
```
See [Testing Guide](./TESTING_GUIDE_COMPLETE.md)

### 🗺️ Add Form Questions
1. Add questions to Google Form
2. Note positions (start counting at 0)
3. Profile questions start at position 44+
4. Update FORM_EX_Q_MAPPING in Code.js
5. See [Technical Reference](./Technical_Reference.md#form-mapping-system)

### 🐛 Debug Allocation Issues
```javascript
// Why is allocation wrong?
diagnoseProfile('ProfileID')     // Compare expected vs actual
showVehicleOrder('ProfileID')   // Check vehicle priority
traceAllocation('ProfileID')    // See allocation decisions

// Common issues:
// - 20% minimum enforced (not a bug!)
// - Missing investment scoring = equal splits
// - Budget exhausted before all vehicles
```

### 📊 Understand Test Output
Look for these key indicators:
- ✅ Total matches expected (Net × Allocation %)
- ✅ Vehicle priority correct (Match → HSA → Roth/Trad)
- ✅ Domain balance reflects importance scores
- ❌ Equal $333 splits = missing scoring fields
- ❌ 20% instead of 15% = minimum enforced

### 💰 View Future Value Projections
```javascript
// After Phase 2 runs, Phase 3 automatically calculates future values
// To manually run Phase 3:
runPhase3(rowNum)    // Run for specific row

// Results appear in these columns:
// - personalized_annual_rate (8-20% based on investment scoring)
// - retirement_fv_actual/ideal
// - education_fv_actual/ideal  
// - health_fv_actual/ideal
```
See [Phase 3 Documentation](./Phase_3_Future_Value_System.md)

### 🔍 Find Information
- **System architecture** → [System Overview](./System_Overview.md)
- **Profile details** → [Profile Implementation Guide](./Profile_Implementation_Guide.md)
- **Test examples** → [Testing Guide](./Testing_Guide.md)
- **Technical details** → [Technical Reference](./Technical_Reference.md)
- **Future values** → [Phase 3 Future Value System](./Phase_3_Future_Value_System.md)

## Common Workflows

### Testing a Profile After Changes
```javascript
// 1. Validate setup
validateHeaders()

// 2. Test specific scenario
testProfile2W2()  // or your profile

// 3. If issues, debug
diagnoseProfile('2_ROBS_Curious')

// 4. Check all scenarios
testProfile2All()
```

### Adding Employer 401(k) Questions
1. Add to form at end of profile section:
   - Does employer offer 401(k)?
   - Does employer match?
   - Match percentage?
   - Roth option available?
2. Update FORM_EX_Q_MAPPING to put in ex_q1-4
3. Test with form submission

### Creating New Test Scenario
```javascript
// Use the factory pattern
const testData = createTestScenario({
  ProfileID: '5_Bracket_Strategist',
  Current_Age: 45,
  gross_annual_income: 150000
  // Factory provides all other required fields
});

// Run test
runCompleteScenarioTest('highIncome', { highIncome: testData });
```

## Troubleshooting Decision Tree

### "Test won't run"
1. Check Script Editor logs (View → Logs)
2. → Missing headers? → Run `validateHeaders()`
3. → Wrong profile? → Check ProfileID spelling
4. → No data? → Check Working Sheet has test data

### "Wrong allocation amount"
1. Expected < 20%? → System enforces 20% minimum
2. → Equal splits? → Add investment scoring (1-7)
3. → Missing vehicles? → Check ex_q values
4. → Over limit? → Check monthly caps

### "Missing vehicles"
1. No 401(k)? → Check ex_q1 = 'Yes'
2. → No HSA? → Check hsa_eligibility = 'Yes'
3. → No CESA? → Check cesa_num_children > 0
4. → No Roth? → Check income for phase-out

## Key Commands Reference

### Validation
```javascript
validateHeaders()              // Check all headers exist
verifyWorkingSheetColumns()   // Show column layout
testFormMapping('ProfileID')  // Verify form mapping
```

### Testing (All Profiles Complete)
```javascript
testProfile1All()             // Test all Profile 1 scenarios ✅
testProfile2All()             // Test all Profile 2 scenarios ✅
testProfile3All()             // Test all Profile 3 scenarios ✅
testProfile4All()             // Test all Profile 4 scenarios ✅ (Fixed)
testProfile5All()             // Test all Profile 5 scenarios ✅
testProfile6All()             // Test all Profile 6 scenarios ✅
testProfile7All()             // Test all Profile 7 scenarios ✅
testProfile8All()             // Test all Profile 8 scenarios ✅ (Fixed)
testProfile9All()             // Test all Profile 9 scenarios ✅
testAllProfilesWithValidation() // Test all profiles comprehensively
```

### Debugging
```javascript
diagnoseProfile('ProfileID')     // Full analysis
showVehicleOrder('ProfileID')   // Vehicle priority
traceAllocation('ProfileID')    // Allocation trace
```

## Critical Things to Remember

### Always Include These Fields
```javascript
// Investment scoring (1-7 scale) - REQUIRED!
'investment_involvement': 4,
'investment_time': 4,
'investment_confidence': 4,

// Financial basics - REQUIRED!
'Net_Monthly_Income': 5000,
'Allocation_Percentage': 20,
```

### System Features (Not Bugs!)
- **20% minimum savings** - Always enforced
- **Family Bank only** - No Taxable Brokerage
- **Headers in row 2** - Not row 1
- **Match first** - Always highest priority

### Common Gotchas
- ❌ Hardcoding header names → Use HEADERS constants
- ❌ Missing defaults → getValue() returns undefined
- ❌ Wrong row for headers → Always row 2
- ❌ Incomplete test data → Use template

## Need More Help?

1. **Detailed guides** in this folder
2. **Code comments** in main files
3. **Test examples** in Testing.js
4. **Debug helpers** for troubleshooting

Remember: When in doubt, run `validateHeaders()` first!

## 🎯 System Maintenance

### Production Status (January 2025)

#### All Testing Complete ✅
- All 9 profiles fully tested and verified
- Profile 4 allocation bug fixed
- Profile 8 HSA prioritization bug fixed
- Testing.js and Testing_Scenarios.js provide complete coverage
- System is production-ready

#### Regular Maintenance Tasks
1. **Monitor Production** - Track user feedback and issues
2. **Annual Updates** - Update contribution limits each January
3. **Tax Law Changes** - Adjust calculations as needed
4. **Performance Monitoring** - Ensure system runs efficiently

### Future Enhancements

#### 1. Advanced Features
- Alternative investment options
- Estate planning tools
- RMD calculators
- Social Security optimization

#### 2. System Improvements
- Performance optimization
- Enhanced error handling
- Better user experience

#### 3. Administrative Tools
- Form mapping UI
- Bulk testing interface
- Analytics dashboard

## 🚨 System Status

**Current Status**: PRODUCTION READY
- ✅ All 9 profiles tested and working
- ✅ Bug fixes applied and verified
- ✅ Complete test coverage
- ✅ Documentation updated
- ✅ Ready for production use
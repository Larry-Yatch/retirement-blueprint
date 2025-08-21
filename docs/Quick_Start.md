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
// In Script Editor
testProfile2All()    // Test Profile 2 (enhanced with employment logic)
testProfile4All()    // Test Profile 4 (enhanced with employment logic)
testProfile5All()    // Test Profile 5 (enhanced with employment logic)
testProfile6All()    // Test Profile 6 (enhanced with employment logic)
testProfile8All()    // Test Profile 8 (enhanced with new vehicles)
testProfile9All()    // Test Profile 9 (enhanced with retirement features)
validateHeaders()    // Check setup
diagnoseProfile('7_Foundation_Builder')  // Debug issues
```
See [Testing Guide](./Testing_Guide.md#quick-start-testing)

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

### 🔍 Find Information
- **System architecture** → [System Overview](./System_Overview.md)
- **Profile details** → [Profile Implementation Guide](./Profile_Implementation_Guide.md)
- **Test examples** → [Testing Guide](./Testing_Guide.md)
- **Technical details** → [Technical Reference](./Technical_Reference.md)

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

### Testing
```javascript
testProfile2All()             // Test all Profile 2 scenarios (enhanced)
testProfile4All()             // Test all Profile 4 scenarios (enhanced)
testProfile5All()             // Test all Profile 5 scenarios (enhanced)
testProfile6All()             // Test all Profile 6 scenarios (enhanced)
testProfile8All()             // Test all Profile 8 scenarios (enhanced)
testProfile9All()             // Test all Profile 9 scenarios (enhanced)
testAllProfiles()            // Test all profile helpers
quickTest()                  // Run quick validation
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

## 🎯 Next Steps & Priorities

### Immediate Actions Required

#### 1. Test Enhanced Profiles (HIGH PRIORITY)
The following profiles have been enhanced but need comprehensive testing:
```javascript
// Priority order for testing:
testProfile5All()  // Bracket Strategist - Employment logic added
testProfile6All()  // Catch-Up - Employment logic added  
testProfile8All()  // Biz Owner Group - New vehicles added
testProfile9All()  // Late Stage - Retirement features added
```
**Why**: These profiles have new features but no test coverage yet.

#### 2. Create Missing Test Functions
Need to implement test functions that don't exist:
- `testProfile5All()` - Test employment scenarios
- `testProfile6All()` - Test catch-up with employment types
- `testProfile8All()` - Test Cash Balance Plan & Mega Backdoor
- `testProfile9All()` - Test Roth Conversions & QCD

**Template**: Use `testProfile2All()` and `testProfile4All()` as examples.

#### 3. Live Form Testing
Once tests pass in Script Editor:
1. Submit test responses through actual Google Forms
2. Verify Phase 2 emails are sent correctly
3. Check that form mappings work in production
4. Validate complete end-to-end flow

### Short-Term Priorities (This Week)

#### 1. Form Mapping Validation
- Create `testFormMapping()` function for all profiles
- Verify ex_q1-4 properly capture employer 401(k) data
- Test edge cases (missing questions, extra questions)

#### 2. Profile-Specific Test Scenarios
For each enhanced profile, create scenarios testing:
- W-2 employee only
- Self-employed only
- Both employment types
- High income (phase-outs)
- Age-based features (catch-up, QCD)

#### 3. Documentation Updates
- Add test results to each profile doc
- Update profile docs with actual test commands
- Create troubleshooting guide for common issues

### Medium-Term Goals (Next 2 Weeks)

#### 1. Performance Optimization
- Profile the allocation engine for bottlenecks
- Optimize Working Sheet writes (batch operations)
- Cache header lookups for better performance

#### 2. Error Handling Enhancement
- Add better error messages for missing data
- Create fallback logic for edge cases
- Implement logging for debugging

#### 3. User Experience Improvements
- Clearer instructions in forms
- Better validation messages
- Progress indicators for multi-step process

### Long-Term Roadmap (Next Month)

#### 1. Advanced Features
- Alternative investment options for Profile 9
- Estate planning tools
- RMD calculators
- Social Security optimization

#### 2. Testing Infrastructure
- Automated test suite that runs on schedule
- Performance benchmarks
- Regression testing framework

#### 3. Administrative Tools
- Form mapping UI for easy updates
- Bulk testing interface
- Analytics dashboard

## 🚨 Critical Path

**Must Do First**:
1. Test Profile 5 with all employment scenarios
2. Test Profile 6 catch-up calculations
3. Test Profile 8 new vehicles (Cash Balance, Mega Backdoor)
4. Test Profile 9 retirement features (Conversions, QCD)

**Then**:
1. Fix any bugs found during testing
2. Update test documentation with results
3. Run live form tests
4. Deploy to production

**Success Criteria**:
- ✅ All enhanced profiles have passing tests
- ✅ Form mappings validated end-to-end
- ✅ Documentation matches implementation
- ✅ No allocation calculation errors
- ✅ Live form submissions process correctly
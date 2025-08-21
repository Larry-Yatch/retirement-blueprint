/**
 * Run Profile 2 tests with validation and auto-fixing
 */

function runFixedProfile2Test() {
  console.log('\n' + '='.repeat(80));
  console.log('RUNNING PROFILE 2 WITH VALIDATION & AUTO-FIX');
  console.log('='.repeat(80));
  
  // First show what the auto-fix does
  demonstrateAutoFix();
  
  Utilities.sleep(2000);
  
  // Run validated test for W-2 employee
  console.log('\n\n📋 TESTING W-2 EMPLOYEE WITH VALIDATION:');
  runValidatedTest('2_ROBS_Curious', 'w2Employee');
  
  Utilities.sleep(2000);
  
  // Run validated test for self-employed
  console.log('\n\n📋 TESTING SELF-EMPLOYED WITH VALIDATION:');
  runValidatedTest('2_ROBS_Curious', 'selfEmployed');
}

/**
 * Compare old vs new test suites
 */
function compareTestSuites() {
  console.log('\n' + '='.repeat(80));
  console.log('COMPARING OLD VS NEW TEST SUITES');
  console.log('='.repeat(80));
  
  // Old Profile 2 (lazy copy)
  const oldSuite = PROFILE_2_TEST_SUITE;
  console.log('\n🔴 OLD Profile 2 Base Data Issues:');
  console.log(`- Copied from Profile 7`);
  console.log(`- education_importance: ${oldSuite.baseData.education_importance} (wrong - no kids default)`);
  console.log(`- ex_q5 meaning: "Emergency fund goal" (wrong - should be "Rollover balance")`);
  
  // New Profile 2 (complete)
  const newSuite = PROFILE_2_COMPLETE;
  console.log('\n🟢 NEW Profile 2 Base Data:');
  console.log(`- Complete profile-specific data`);
  console.log(`- education_importance: ${newSuite.baseData.education_importance} (correct default)`);
  console.log(`- ex_q5 meaning: "Rollover balance" (correct for ROBS)`);
  console.log(`- retirement_current_balance: ${newSuite.baseData.retirement_current_balance} (matches rollover)`);
  
  // Show scenario fixes
  console.log('\n📊 W-2 Employee Scenario Fixes:');
  const oldW2 = oldSuite.scenarios.w2Employee;
  const newW2 = newSuite.scenarios.w2Employee;
  
  console.log('\nOLD:');
  console.log(`- Has 2 kids but education_importance not set`);
  console.log(`- cesa_total_goal: not set`);
  console.log(`- Total_Monthly_Savings_Capacity: not updated`);
  
  console.log('\nNEW:');
  console.log(`- education_importance: ${newW2.education_importance} (set for family)`);
  console.log(`- cesa_total_goal: ${newW2.cesa_total_goal}`);
  console.log(`- Total_Monthly_Savings_Capacity: ${newW2.Total_Monthly_Savings_Capacity} (calculated)`);
}

/**
 * Run a quick test to see if CESA allocations work now
 */
function quickTestCESA() {
  console.log('\n' + '='.repeat(80));
  console.log('QUICK TEST: CESA ALLOCATION FOR FAMILY');
  console.log('='.repeat(80));
  
  // Use the FIXED test suite
  const suite = PROFILE_2_COMPLETE;
  const testData = { ...suite.baseData, ...suite.scenarios.w2Employee };
  
  console.log('\n📊 Family Test Data:');
  console.log(`- Has ${testData.cesa_num_children} kids`);
  console.log(`- Education importance: ${testData.education_importance}`);
  console.log(`- CESA goal: $${testData.cesa_total_goal}`);
  console.log(`- Years until need: ${testData.cesa_years_until_first_need}`);
  
  console.log('\n🚀 Running allocation test...');
  
  // Quick test using our complete function
  testProfileComplete('2_ROBS_Curious', 'w2Employee');
}
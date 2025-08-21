/**
 * Test Profile 2 with fixed complete test suite
 */

function testProfile2Fixed() {
  console.log('\n' + '='.repeat(80));
  console.log('TESTING PROFILE 2 WITH FIXED COMPLETE TEST SUITE');
  console.log('='.repeat(80));
  
  // Use the FIXED test suite
  const suite = PROFILE_2_COMPLETE;
  
  // Test W-2 Employee with family
  console.log('\n📋 W-2 EMPLOYEE WITH FAMILY:');
  const w2Data = { ...suite.baseData, ...suite.scenarios.w2Employee };
  
  console.log('\nKey Test Data:');
  console.log(`- Has ${w2Data.cesa_num_children} kids`);
  console.log(`- Education importance: ${w2Data.education_importance}`);
  console.log(`- CESA goal: $${w2Data.cesa_total_goal}`);
  console.log(`- Total savings capacity: $${w2Data.Total_Monthly_Savings_Capacity}`);
  
  // Run complete scenario test
  runCompleteScenarioTest(w2Data);
  
  Utilities.sleep(2000);
  
  // Test Self-Employed  
  console.log('\n\n📋 SELF-EMPLOYED ROBS READY:');
  const selfData = { ...suite.baseData, ...suite.scenarios.selfEmployed };
  
  console.log('\nKey Test Data:');
  console.log(`- Has Solo 401(k): ${selfData.SOLO401K_AVAILABLE}`);
  console.log(`- Catch-up eligible: ${selfData.CATCH_UP_ELIGIBLE}`);
  console.log(`- Business income: $${selfData.ex_q6}`);
  console.log(`- Total savings capacity: $${selfData.Total_Monthly_Savings_Capacity}`);
  
  runCompleteScenarioTest(selfData);
}

// Compare with old test to see the difference
function compareOldVsNew() {
  console.log('\n' + '='.repeat(80));
  console.log('COMPARING OLD VS NEW PROFILE 2 TEST');
  console.log('='.repeat(80));
  
  // Old test (lazy copy from Profile 7)
  console.log('\n🔴 OLD TEST (Lazy Copy):');
  const oldSuite = PROFILE_2_TEST_SUITE;
  const oldW2 = { ...oldSuite.baseData, ...oldSuite.scenarios.w2Employee };
  
  console.log('Base education_importance:', oldSuite.baseData.education_importance);
  console.log('W2 has kids:', oldW2.cesa_num_children);
  console.log('W2 education_importance override:', oldSuite.scenarios.w2Employee.education_importance || 'NONE');
  console.log('Effective education_importance:', oldW2.education_importance);
  
  // New test (complete data)
  console.log('\n🟢 NEW TEST (Complete):');
  const newSuite = PROFILE_2_COMPLETE;
  const newW2 = { ...newSuite.baseData, ...newSuite.scenarios.w2Employee };
  
  console.log('Base education_importance:', newSuite.baseData.education_importance);
  console.log('W2 has kids:', newW2.cesa_num_children);
  console.log('W2 education_importance override:', newSuite.scenarios.w2Employee.education_importance);
  console.log('Effective education_importance:', newW2.education_importance);
  console.log('CESA goal set:', newW2.cesa_total_goal);
  console.log('Total savings recalculated:', newW2.Total_Monthly_Savings_Capacity);
}
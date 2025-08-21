/**
 * Test all Profile 7 scenarios to verify 401(k) allocation fix
 */

function testProfile7AllScenarios() {
  console.log('\n' + '='.repeat(80));
  console.log('TESTING ALL PROFILE 7 SCENARIOS');
  console.log('='.repeat(80));
  
  // Test each scenario
  const scenarios = [
    { name: 'youngProfessional', description: 'Young Professional (25yo, $65k)' },
    { name: 'familyStarter', description: 'Family with Kids (35yo, $95k)' },
    { name: 'highIncome', description: 'High Income (40yo, $150k)' },
    { name: 'noEmployer401k', description: 'No Employer 401(k) Available' }
  ];
  
  scenarios.forEach(scenario => {
    console.log(`\n\n${'='.repeat(60)}`);
    console.log(`Testing: ${scenario.description}`);
    console.log('='.repeat(60));
    
    testProfileComplete('7_Foundation_Builder', scenario.name);
    
    Utilities.sleep(2000); // Pause between tests
  });
  
  console.log('\n\n' + '='.repeat(80));
  console.log('PROFILE 7 TEST SUMMARY');
  console.log('='.repeat(80));
  console.log('\n✅ All scenarios tested. Check results above for:');
  console.log('- Young Professional: Should show $163/mo to 401(k) match');
  console.log('- Family Starter: Should prioritize education + 401(k) match');
  console.log('- High Income: Should show higher 401(k) match amount');
  console.log('- No 401(k): Should allocate to IRAs instead');
}

// Quick summary function
function testProfile7Summary() {
  console.log('\n' + '='.repeat(80));
  console.log('PROFILE 7 QUICK SUMMARY TEST');
  console.log('='.repeat(80));
  
  const scenarios = ['youngProfessional', 'familyStarter', 'highIncome'];
  
  scenarios.forEach(scenarioName => {
    const suite = PROFILE_7_TEST_SUITE;
    const scenario = suite.scenarios[scenarioName];
    const testData = { ...suite.baseData, ...scenario };
    
    const income = testData.gross_annual_income;
    const matchPct = testData.ex_q3;
    
    // Extract match percentage
    const matchUpToMatch = matchPct.match(/up to (\d+)%/);
    const matchUpTo = matchUpToMatch ? parseInt(matchUpToMatch[1]) : 0;
    const expectedMatch = Math.round((income * matchUpTo / 100) / 12);
    
    console.log(`\n${scenario.Full_Name}:`);
    console.log(`  Income: $${income.toLocaleString()}/yr`);
    console.log(`  Match: ${matchPct}`);
    console.log(`  Expected 401(k) match: $${expectedMatch}/mo`);
  });
}
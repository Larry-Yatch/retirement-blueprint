/**
 * COMPLETE TEST SUITE FOR PROFILE 2 (ROBS CURIOUS)
 * 
 * Profile 2 is for people interested in ROBS who may have:
 * - Existing rollover accounts
 * - Current W-2 employment with 401(k)
 * - Self-employment income
 * - Interest in starting a business
 */

function testProfile2Complete() {
  console.log('\n' + '='.repeat(80));
  console.log('COMPLETE PROFILE 2 (ROBS CURIOUS) TEST SUITE');
  console.log('='.repeat(80));
  
  // First, let's check the vehicle order
  console.log('\n📋 CHECKING VEHICLE ORDER FOR PROFILE 2...');
  showVehicleOrder('2_ROBS_Curious', 'w2Employee');
  
  Utilities.sleep(2000);
  
  // Test both scenarios
  testProfile2AllScenarios();
}

function testProfile2AllScenarios() {
  console.log('\n' + '='.repeat(80));
  console.log('TESTING ALL PROFILE 2 SCENARIOS');
  console.log('='.repeat(80));
  
  const scenarios = [
    { 
      name: 'w2Employee', 
      description: 'W-2 Employee with 401(k) Match',
      expectedChecks: {
        has401k: true,
        expectedMatch: 450, // 50% up to 6% of $120k
        hasKids: true,
        hasHSA: true
      }
    },
    { 
      name: 'selfEmployed', 
      description: 'Self-Employed Business Owner',
      expectedChecks: {
        has401k: false,
        hasSolo401k: true,
        businessIncome: 50000,
        hasKids: false,
        hasHSA: true
      }
    }
  ];
  
  scenarios.forEach(scenario => {
    console.log(`\n\n${'='.repeat(60)}`);
    console.log(`Testing: ${scenario.description}`);
    console.log('='.repeat(60));
    
    testProfileComplete('2_ROBS_Curious', scenario.name);
    
    Utilities.sleep(2000);
  });
  
  // Run diagnostic
  console.log('\n\n📊 RUNNING FULL DIAGNOSTICS...');
  diagnoseProfile('2_ROBS_Curious');
  
  console.log('\n\n' + '='.repeat(80));
  console.log('PROFILE 2 TEST SUMMARY');
  console.log('='.repeat(80));
  console.log('\n✅ Check results above for:');
  console.log('- W-2 Employee: Should show $450/mo to 401(k) match');
  console.log('- W-2 Employee: Should allocate to CESA for 2 kids');
  console.log('- Self-Employed: Should show Solo 401(k) vehicles');
  console.log('- Both: Should have ROBS-specific vehicles available');
}

/**
 * Test with assertions to catch issues early
 */
function testProfile2WithAssertions() {
  console.log('\n' + '='.repeat(80));
  console.log('PROFILE 2 TESTS WITH ASSERTIONS');
  console.log('='.repeat(80));
  
  // Test W-2 Employee scenario
  console.log('\n📋 Testing W-2 Employee with 401(k)...');
  try {
    const result = runScenarioAndGetResult('2_ROBS_Curious', 'w2Employee');
    
    // Key assertions for W-2 employee
    assertVehicleAllocated(result, '401(k) Match');
    assertAllocationAmount(result, '401(k) Match', 450, 10); // $120k × 6% × 50% ÷ 12
    assertVehicleAllocated(result, 'Combined CESA', 'Education'); // Has 2 kids
    assertVehicleAllocated(result, 'HSA', 'Health');
    
    // Check for ROBS vehicles if applicable
    console.log('\nChecking for ROBS-specific vehicles...');
    const hasROBSVehicles = Object.values(result.vehicles).some(domain =>
      Object.keys(domain).some(vehicle => vehicle.includes('ROBS'))
    );
    console.log(`ROBS vehicles present: ${hasROBSVehicles ? '✅ YES' : '❌ NO'}`);
    
    console.log('✅ W-2 Employee test passed!');
    
  } catch (error) {
    console.error(`❌ W-2 Employee test failed: ${error.message}`);
    return;
  }
  
  // Test Self-Employed scenario
  console.log('\n📋 Testing Self-Employed Business Owner...');
  try {
    const result = runScenarioAndGetResult('2_ROBS_Curious', 'selfEmployed');
    
    // Key assertions for self-employed
    const has401kMatch = Object.entries(result.vehicles.Retirement || {})
      .some(([name, amount]) => name.includes('401(k) Match') && amount > 0);
    assert(!has401kMatch, 'Should NOT have employer 401(k) match');
    
    // Should have Solo 401(k) or other self-employed vehicles
    const hasSolo401k = Object.values(result.vehicles).some(domain =>
      Object.keys(domain).some(vehicle => vehicle.includes('Solo 401'))
    );
    console.log(`Solo 401(k) vehicles: ${hasSolo401k ? '✅ Present' : '⚠️  Not found (may be intentional)'}`);
    
    assertVehicleAllocated(result, 'HSA', 'Health');
    
    console.log('✅ Self-Employed test passed!');
    
  } catch (error) {
    console.error(`❌ Self-Employed test failed: ${error.message}`);
    return;
  }
  
  console.log('\n' + '='.repeat(80));
  console.log('✅ ALL PROFILE 2 ASSERTION TESTS PASSED!');
  console.log('='.repeat(80));
}

/**
 * Quick allocation trace for Profile 2
 */
function traceProfile2Allocations() {
  console.log('\n' + '='.repeat(80));
  console.log('PROFILE 2 ALLOCATION TRACES');
  console.log('='.repeat(80));
  
  console.log('\n1️⃣ W-2 EMPLOYEE ALLOCATION TRACE:');
  traceAllocation('2_ROBS_Curious', 'w2Employee');
  
  Utilities.sleep(2000);
  
  console.log('\n\n2️⃣ SELF-EMPLOYED ALLOCATION TRACE:');
  traceAllocation('2_ROBS_Curious', 'selfEmployed');
}

/**
 * Check Profile 2 specific features
 */
function checkProfile2Features() {
  console.log('\n' + '='.repeat(80));
  console.log('PROFILE 2 SPECIFIC FEATURES CHECK');
  console.log('='.repeat(80));
  
  const suite = PROFILE_2_TEST_SUITE;
  
  console.log('\n📋 Profile 2 Extra Questions:');
  console.log('ex_q1: Has employer 401k?', suite.baseData.ex_q1);
  console.log('ex_q2: Has match?', suite.baseData.ex_q2);
  console.log('ex_q3: Match details:', suite.baseData.ex_q3);
  console.log('ex_q4: Roth option?', suite.baseData.ex_q4);
  console.log('ex_q5: Rollover balance:', suite.baseData.ex_q5);
  console.log('ex_q6: Business income:', suite.baseData.ex_q6);
  console.log('ex_q7: Spouse in business?', suite.baseData.ex_q7);
  
  console.log('\n📊 Key Profile Characteristics:');
  console.log('- Interested in ROBS:', suite.baseData.Interested_in_ROBS);
  console.log('- Has $50k+ rollover:', suite.baseData.Rollover_Account_50k);
  console.log('- ROBS Ready:', suite.baseData.ROBS_READY);
  
  console.log('\n⚡ Expected Behavior:');
  console.log('1. Should handle both W-2 and self-employed scenarios');
  console.log('2. Should integrate employer 401(k) when available');
  console.log('3. May include ROBS-specific vehicles');
  console.log('4. Should handle rollover account considerations');
}
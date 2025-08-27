/**
 * TEST WITH ASSERTIONS
 * 
 * These tests will FAIL FAST if something is wrong
 * Much better than manually checking output!
 */

function testProfile7WithAssertions() {
  console.log('\n' + '='.repeat(80));
  console.log('PROFILE 7 TESTS WITH ASSERTIONS');
  console.log('='.repeat(80));
  
  // Test Young Professional
  console.log('\n📋 Testing Young Professional...');
  try {
    const result = runScenarioAndGetResult('7_Foundation_Builder', 'youngProfessional');
    
    // ASSERTIONS
    assertVehicleAllocated(result, '401(k) Match');
    assertAllocationAmount(result, '401(k) Match', 163);
    assertVehicleAllocated(result, 'Roth IRA');
    
    console.log('✅ All assertions passed!');
    
  } catch (error) {
    console.error(error.message);
    return; // Stop on first failure
  }
  
  // Test Family Starter
  console.log('\n📋 Testing Family Starter...');
  try {
    const result = runScenarioAndGetResult('7_Foundation_Builder', 'familyStarter');
    
    // ASSERTIONS
    assertVehicleAllocated(result, '401(k) Match');
    assertAllocationAmount(result, '401(k) Match', 475); // 50% up to 6% of $95k
    assertVehicleAllocated(result, 'Combined CESA', 'Education');
    
    console.log('✅ All assertions passed!');
    
  } catch (error) {
    console.error(error.message);
    return;
  }
  
  // Test No 401(k)
  console.log('\n📋 Testing No Employer 401(k)...');
  try {
    const result = runScenarioAndGetResult('7_Foundation_Builder', 'noEmployer401k');
    
    // ASSERTIONS - Should NOT have 401(k)
    const has401k = Object.entries(result.vehicles.Retirement || {})
      .some(([name, amount]) => name.includes('401(k)') && amount > 0);
    
    assert(!has401k, 'Should NOT have 401(k) allocation when ex_q1 = No');
    assertVehicleAllocated(result, 'Roth IRA');
    
    console.log('✅ All assertions passed!');
    
  } catch (error) {
    console.error(error.message);
    return;
  }
  
  console.log('\n' + '='.repeat(80));
  console.log('✅ ALL PROFILE 7 TESTS PASSED!');
  console.log('='.repeat(80));
}

/**
 * Helper to run scenario and return engine result
 */
function runScenarioAndGetResult(profileId, scenarioName) {
  const suite = getTestSuite(profileId);
  const scenario = suite.scenarios[scenarioName];
  const testData = { ...suite.baseData, ...scenario };
  
  // Write to sheet
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  const headers = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  
  const hdr = {};
  headers.forEach((header, index) => {
    if (header) hdr[header] = index + 1;
  });
  
  const testRow = ws.getLastRow() + 1;
  Object.entries(testData).forEach(([key, value]) => {
    if (hdr[key]) ws.getRange(testRow, hdr[key]).setValue(value);
  });
  
  // Run engine
  const result = runUniversalEngine(testRow);
  
  // Clean up
  ws.deleteRow(testRow);
  
  return result;
}

/**
 * Test all profiles with assertions
 */
function testAllProfilesWithAssertions() {
  const tests = [
    {
      profile: '7_Foundation_Builder',
      scenario: 'youngProfessional',
      assertions: [
        { type: 'allocated', vehicle: '401(k) Match' },
        { type: 'amount', vehicle: '401(k) Match', amount: 163 }
      ]
    },
    {
      profile: '2_ROBS_Curious',
      scenario: 'w2Employee',
      assertions: [
        { type: 'allocated', vehicle: '401(k) Match' },
        { type: 'allocated', vehicle: 'HSA', domain: 'Health' }
      ]
    },
    {
      profile: '4_Roth_Reclaimer',
      scenario: 'highIncomeBackdoor',
      assertions: [
        { type: 'allocated', vehicle: 'Backdoor Roth IRA' },
        { type: 'allocated', vehicle: '401(k) Match' }
      ]
    }
  ];
  
  let allPassed = true;
  
  tests.forEach(test => {
    console.log(`\nTesting ${test.profile} - ${test.scenario}...`);
    
    try {
      const result = runScenarioAndGetResult(test.profile, test.scenario);
      
      test.assertions.forEach(assertion => {
        if (assertion.type === 'allocated') {
          assertVehicleAllocated(result, assertion.vehicle, assertion.domain);
        } else if (assertion.type === 'amount') {
          assertAllocationAmount(result, assertion.vehicle, assertion.amount);
        }
      });
      
      console.log('✅ PASSED');
      
    } catch (error) {
      console.error(`❌ FAILED: ${error.message}`);
      allPassed = false;
    }
  });
  
  console.log('\n' + '='.repeat(80));
  console.log(allPassed ? '✅ ALL TESTS PASSED!' : '❌ SOME TESTS FAILED');
  console.log('='.repeat(80));
}
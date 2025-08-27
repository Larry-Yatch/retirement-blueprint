/**
 * Test Profile 7 with complete domain importance fields
 * This should fix the $300/$300/$300 equal split issue
 */

function testProfile7Fixed() {
  console.log('\n' + '='.repeat(80));
  console.log('PROFILE 7 TEST WITH DOMAIN IMPORTANCE FIELDS');
  console.log('='.repeat(80));
  
  // Import test scenarios from Testing.js
  const scenario = PROFILE_7_SCENARIOS.youngProfessional;
  
  console.log('\nScenario: Young Professional Starting Out');
  console.log('Expected: Allocations to 401(k) match and Roth 401(k) based on domain weights');
  console.log('NOT expected: Equal $333/$333/$333 split across domains\n');
  
  // Run the test
  runCompleteScenarioTest('youngProfessional', PROFILE_7_SCENARIOS);
}

// Also test the family scenario
function testProfile7Family() {
  console.log('\n' + '='.repeat(80));
  console.log('PROFILE 7 FAMILY TEST WITH DOMAIN IMPORTANCE');
  console.log('='.repeat(80));
  
  console.log('\nScenario: Family with Children');
  console.log('Expected: Higher education allocation due to kids');
  console.log('Expected: 401(k) and CESA vehicles should be prioritized\n');
  
  runCompleteScenarioTest('familyStarter', PROFILE_7_SCENARIOS);
}

// Run both tests
function testProfile7Complete() {
  testProfile7Fixed();
  console.log('\n\nWaiting 3 seconds before next test...\n');
  Utilities.sleep(3000);
  testProfile7Family();
  
  console.log('\n' + '='.repeat(80));
  console.log('PROFILE 7 COMPLETE TEST SUMMARY');
  console.log('='.repeat(80));
  console.log('\n✅ Tests completed. Check results above for:');
  console.log('1. No more $333/$333/$333 equal splits');
  console.log('2. Domain weights based on importance scores');
  console.log('3. 401(k) vehicles properly allocated');
  console.log('4. Education vehicles when kids present');
}
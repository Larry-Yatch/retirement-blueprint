/**
 * Simple test runner for Profile 2
 */

function TestP2() {
  console.log('TESTING PROFILE 2 WITH FIXED DATA');
  console.log('='.repeat(50));
  
  // Test W-2 Employee
  const suite = PROFILE_2_COMPLETE;
  const w2Data = { ...suite.baseData, ...suite.scenarios.w2Employee };
  
  console.log('\nW-2 Employee Test:');
  console.log(`Kids: ${w2Data.cesa_num_children}`);
  console.log(`Education importance: ${w2Data.education_importance}`);
  console.log(`CESA goal: $${w2Data.cesa_total_goal}`);
  
  // Run allocation engine directly
  const phase1Results = runAllocationPhase1(w2Data);
  const allocations = phase1Results.allocations;
  
  console.log('\nDomain Weights:');
  console.log(`Education: ${phase1Results.weights.Education.toFixed(3)}`);
  console.log(`Health: ${phase1Results.weights.Health.toFixed(3)}`);
  console.log(`Retirement: ${phase1Results.weights.Retirement.toFixed(3)}`);
  
  console.log('\nAllocations:');
  console.log('Education: $' + allocations.Education.total);
  console.log('Health: $' + allocations.Health.total);
  console.log('Retirement: $' + allocations.Retirement.total);
  
  // Check CESA specifically
  const cesaAlloc = allocations.Education.vehicles.find(v => v.name === 'CESA');
  if (cesaAlloc) {
    console.log(`\n✅ CESA allocated: $${cesaAlloc.allocated}`);
  } else {
    console.log('\n❌ NO CESA ALLOCATION FOUND');
  }
  
  // Show all education vehicles
  console.log('\nEducation vehicles:');
  allocations.Education.vehicles.forEach(v => {
    console.log(`- ${v.name}: $${v.allocated}`);
  });
}
/**
 * Debug Profile 2 401(k) match calculation
 */

function debugProfile2Match() {
  console.log('\n' + '='.repeat(80));
  console.log('DEBUGGING PROFILE 2 401(k) MATCH CALCULATION');
  console.log('='.repeat(80));
  
  const suite = PROFILE_2_TEST_SUITE;
  const w2Scenario = suite.scenarios.w2Employee;
  
  console.log('\n📊 W-2 Employee Data:');
  console.log(`Gross Annual Income: $${w2Scenario.gross_annual_income}`);
  console.log(`Match Formula: ${suite.baseData.ex_q3}`);
  
  // Parse match percentage
  const matchFormula = suite.baseData.ex_q3; // "50% up to 6%"
  console.log('\n🧮 Match Calculation:');
  
  // Expected calculation
  const salary = w2Scenario.gross_annual_income;
  const matchUpTo = 6; // 6% of salary
  const matchRate = 50; // 50% match
  
  const employeeContrib = salary * (matchUpTo / 100);
  const employerMatch = employeeContrib * (matchRate / 100);
  const monthlyMatch = employerMatch / 12;
  
  console.log(`Employee contributes: $${salary} × ${matchUpTo}% = $${employeeContrib}/year`);
  console.log(`Employer matches: $${employeeContrib} × ${matchRate}% = $${employerMatch}/year`);
  console.log(`Monthly match: $${employerMatch} ÷ 12 = $${Math.round(monthlyMatch)}/mo`);
  
  console.log('\n❓ Why is actual match $600/mo?');
  
  // Check if it's using a different calculation
  const actualMonthly = 600;
  const impliedAnnualMatch = actualMonthly * 12;
  const impliedMatchRate = impliedAnnualMatch / salary * 100;
  
  console.log(`\nReverse calculation:`);
  console.log(`$600/mo × 12 = $${impliedAnnualMatch}/year`);
  console.log(`$${impliedAnnualMatch} ÷ $${salary} = ${impliedMatchRate.toFixed(1)}%`);
  
  console.log('\n💡 Possible explanations:');
  console.log('1. Match is calculated as 6% of gross (not 50% of 6%)');
  console.log(`   $${salary} × 6% ÷ 12 = $${Math.round(salary * 0.06 / 12)}/mo ✅`);
  console.log('2. Different income is being used');
  console.log('3. Match formula is being interpreted differently');
}

// Also check the allocation test data
function checkProfile2TestData() {
  console.log('\n' + '='.repeat(80));
  console.log('PROFILE 2 TEST DATA CHECK');
  console.log('='.repeat(80));
  
  const suite = PROFILE_2_TEST_SUITE;
  
  console.log('\n📋 Base Data Key Fields:');
  console.log(`ProfileID: ${suite.baseData.ProfileID}`);
  console.log(`Allocation %: ${suite.baseData.Allocation_Percentage}%`);
  console.log(`Requested allocation: $${suite.baseData.Net_Monthly_Income} × ${suite.baseData.Allocation_Percentage}% = $${suite.baseData.Net_Monthly_Income * suite.baseData.Allocation_Percentage / 100}`);
  
  console.log('\nDomain Importance (Base):');
  console.log(`Retirement: ${suite.baseData.retirement_importance}`);
  console.log(`Education: ${suite.baseData.education_importance}`);
  console.log(`Health: ${suite.baseData.health_importance}`);
  console.log(`Has kids: ${suite.baseData.cesa_num_children}`);
  
  console.log('\n📊 W-2 Scenario Overrides:');
  const w2 = suite.scenarios.w2Employee;
  console.log(`Net Monthly: $${w2.Net_Monthly_Income}`);
  console.log(`Kids: ${w2.cesa_num_children}`);
  console.log(`Education importance: ${w2.education_importance || 'NOT SET - USING BASE VALUE OF 1!'}`);
}

// Check allocation trace with fixed data
function testProfile2FixedAllocation() {
  console.log('\n' + '='.repeat(80));
  console.log('TESTING PROFILE 2 WITH FIXED EDUCATION IMPORTANCE');
  console.log('='.repeat(80));
  
  // This will use the updated test data
  testProfileComplete('2_ROBS_Curious', 'w2Employee');
}
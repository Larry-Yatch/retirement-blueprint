/**
 * Edge case testing for ROBS Curious profile
 */
function testROBSCuriousEdgeCases() {
  console.log('\n=== ROBS CURIOUS EDGE CASE TESTING ===\n');
  
  // Edge Case 1: Very high income self-employed
  console.log('EDGE CASE 1: High Income Self-Employed ($500k)');
  console.log('-'.repeat(50));
  
  const highIncomeTest = runProfileTest('2_ROBS_Curious', {
    age: 45,
    grossIncome: 500000,
    filing: 'Married Filing Jointly',
    workSituation: 'Self-employed',
    taxFocus: 'Now',
    hsaElig: 'Yes',
    numKids: 2,
    hasEmployer401k: 'No',
    plannedRollover: 1000000,
    expectedContribution: 150000  // Very high expected contribution
  });
  
  // Check employer contribution calculation
  const employerVehicle = highIncomeTest.vehicleOrders.Retirement.find(v => 
    v.name === 'Solo 401(k) – Employer'
  );
  
  if (employerVehicle) {
    const annualEmployer = employerVehicle.capMonthly * 12;
    const income25pct = 500000 * 0.25;
    const maxWithEmployee = 69000 - 23000; // Total limit - employee contribution
    
    console.log('Solo 401(k) Employer Contribution Analysis:');
    console.log(`  Monthly cap: $${Math.round(employerVehicle.capMonthly)}`);
    console.log(`  Annual cap: $${Math.round(annualEmployer)}`);
    console.log(`  25% of income: $${income25pct}`);
    console.log(`  Max with employee: $${maxWithEmployee}`);
    console.log(`  Expected contribution: $150,000`);
    console.log(`  Correctly limited: ${annualEmployer <= Math.min(income25pct, maxWithEmployee, 150000) ? '✅' : '❌'}`);
  }
  
  // Check Roth IRA phase-out
  const rothIRA = highIncomeTest.vehicleOrders.Retirement.find(v => v.name === 'Roth IRA');
  const backdoorRoth = highIncomeTest.vehicleOrders.Retirement.find(v => v.name === 'Backdoor Roth IRA');
  console.log(`\nRoth IRA Status:`);
  console.log(`  Direct Roth: ${rothIRA ? '❌ Should be phased out' : '✅ Correctly phased out'}`);
  console.log(`  Backdoor Roth: ${backdoorRoth ? '✅ Available' : '❌ Missing'}`);
  
  // Edge Case 2: Both employment with max contributions
  console.log('\n\nEDGE CASE 2: Both Employment Types');
  console.log('-'.repeat(50));
  
  const bothEmploymentTest = runProfileTest('2_ROBS_Curious', {
    age: 55,  // Catch-up eligible
    grossIncome: 300000,
    filing: 'Single',
    workSituation: 'Both',
    taxFocus: 'Both',
    hsaElig: 'Yes',
    numKids: 0,
    hasEmployer401k: 'Yes',
    hasMatch: 'Yes',
    matchDetails: '100% up to 6%',
    hasRoth401k: 'Yes',
    plannedRollover: 500000,
    expectedContribution: 75000
  });
  
  // Count 401(k) vehicles
  const all401kVehicles = bothEmploymentTest.vehicleOrders.Retirement.filter(v => 
    v.name.includes('401(k)')
  );
  
  console.log('401(k) Vehicles Present:');
  all401kVehicles.forEach(v => {
    console.log(`  ${v.name}: $${Math.round(v.capMonthly)}/mo`);
  });
  
  const hasSoloAndEmployer = all401kVehicles.some(v => v.name.includes('Solo')) && 
                            all401kVehicles.some(v => v.name.includes('Match'));
  console.log(`\nHas both Solo and Employer 401(k): ${hasSoloAndEmployer ? '✅' : '❌'}`);
  
  // Edge Case 3: Zero/Negative values
  console.log('\n\nEDGE CASE 3: Zero/Negative Values');
  console.log('-'.repeat(50));
  
  const zeroTest = runProfileTest('2_ROBS_Curious', {
    age: 30,
    grossIncome: 0,  // No income
    filing: 'Single',
    workSituation: 'Self-employed',
    taxFocus: 'Both',
    hsaElig: 'No',
    numKids: 0,
    hasEmployer401k: 'No',
    plannedRollover: 0,
    expectedContribution: 0
  });
  
  const hasAnyVehicles = zeroTest.vehicleOrders.Retirement.some(v => 
    v.capMonthly > 0 && v.capMonthly !== Infinity && v.name !== 'Family Bank'
  );
  
  console.log(`Has retirement vehicles with $0 income: ${hasAnyVehicles ? '❌ Should not' : '✅ Correctly none'}`);
  
  // Edge Case 4: Married Filing Separately
  console.log('\n\nEDGE CASE 4: Married Filing Separately');
  console.log('-'.repeat(50));
  
  const mfsTest = runProfileTest('2_ROBS_Curious', {
    age: 40,
    grossIncome: 150000,
    filing: 'Married Filing Separately',
    workSituation: 'W-2 employee',
    taxFocus: 'Later',
    hsaElig: 'Yes',
    numKids: 1,
    hasEmployer401k: 'Yes',
    hasMatch: 'No',
    hasRoth401k: 'Yes',
    plannedRollover: 100000,
    expectedContribution: 0
  });
  
  // MFS has very low Roth IRA phase-out ($0-$10,000)
  const mfsRoth = mfsTest.vehicleOrders.Retirement.find(v => v.name === 'Roth IRA');
  console.log('Married Filing Separately Roth IRA:');
  if (mfsRoth) {
    console.log(`  Cap: $${Math.round(mfsRoth.capMonthly)}/mo`);
    console.log(`  Should be heavily restricted: ${mfsRoth.capMonthly < 100 ? '✅' : '❌'}`);
  } else {
    console.log(`  ✅ Correctly phased out completely`);
  }
  
  // Edge Case 5: Age-based catch-up boundaries
  console.log('\n\nEDGE CASE 5: Catch-up Age Boundaries');
  console.log('-'.repeat(50));
  
  const ageTests = [49, 50, 59, 60];
  
  ageTests.forEach(age => {
    const result = runProfileTest('2_ROBS_Curious', {
      age: age,
      grossIncome: 100000,
      filing: 'Single',
      workSituation: 'Self-employed',
      taxFocus: 'Both',
      hsaElig: 'No',
      numKids: 0,
      hasEmployer401k: 'No',
      plannedRollover: 0,
      expectedContribution: 0
    });
    
    const solo401k = result.vehicleOrders.Retirement.find(v => 
      v.name.includes('Solo 401(k)') && !v.name.includes('Employer')
    );
    
    if (solo401k) {
      const annualLimit = Math.round(solo401k.capMonthly * 12);
      let expectedLimit;
      
      if (age < 50) {
        expectedLimit = 23000;
      } else if (age < 60) {
        expectedLimit = 23000 + 7500;  // 50-59 catch-up
      } else {
        expectedLimit = 23000 + 11250; // 60+ catch-up
      }
      
      console.log(`Age ${age}: Limit $${annualLimit} (expected $${expectedLimit}) ${
        annualLimit === expectedLimit ? '✅' : '❌'
      }`);
    }
  });
}

// Export for use in main testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { testROBSCuriousEdgeCases };
}
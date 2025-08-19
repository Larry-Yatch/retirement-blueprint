// Universal Engine Diagnostic Test
// Quick test to verify if the engine is working

/**
 * Test the universal engine directly with minimal setup
 */
function testUniversalEngineBasic() {
  console.log('\n=== UNIVERSAL ENGINE DIAGNOSTIC ===\n');
  
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  
  // Find a row with Profile 2
  const lastRow = ws.getLastRow();
  let testRow = null;
  
  // Get headers first to find ProfileID column
  const headers = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  let profileIdCol = 0;
  headers.forEach((header, index) => {
    if (header === 'ProfileID') profileIdCol = index + 1;
  });
  
  console.log(`ProfileID is in column ${profileIdCol}`);
  
  for (let i = 3; i <= lastRow; i++) {
    const profileId = ws.getRange(i, profileIdCol).getValue();
    if (profileId === '2_ROBS_Curious') {
      testRow = i;
      console.log(`Found Profile 2 at row ${i}`);
      break;
    }
  }
  
  if (!testRow) {
    console.log('❌ No Profile 2 found in Working Sheet');
    return;
  }
  
  // Run the universal engine
  console.log('\nRunning universal engine...');
  try {
    const results = runUniversalEngine(testRow);
    console.log('✅ Engine ran successfully!');
    
    // Check results
    console.log('\nEngine Results:');
    console.log(`- Total monthly allocation: $${results.totalMonthly}`);
    console.log(`- Domains: ${Object.keys(results.vehicles).join(', ')}`);
    
    // Show retirement vehicles
    console.log('\nRetirement Vehicles:');
    Object.entries(results.vehicles.Retirement || {}).forEach(([vehicle, amount]) => {
      console.log(`  ${vehicle}: $${Math.round(amount)}/mo`);
    });
    
    return results;
  } catch (error) {
    console.log('❌ ENGINE ERROR:', error.message);
    console.log(error.stack);
    return null;
  }
}

/**
 * Test profile helper directly
 */
function testProfile2HelperDirect() {
  console.log('\n=== PROFILE 2 HELPER DIRECT TEST ===\n');
  
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  const headers = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  
  // Build header map
  const hdr = {};
  headers.forEach((header, index) => {
    if (header) hdr[header] = index + 1;
  });
  
  // Get row 9 data (from your test)
  const rowData = ws.getRange(9, 1, 1, ws.getLastColumn()).getValues()[0];
  
  console.log('Test Data Summary:');
  console.log(`- Age: ${rowData[hdr['Current_Age'] - 1]}`);
  console.log(`- Income: ${rowData[hdr['gross_annual_income'] - 1]}`);
  console.log(`- Work Situation: ${rowData[hdr['Work_Situation'] - 1]}`);
  console.log(`- HSA Eligible: ${rowData[hdr['hsa_eligibility'] - 1]}`);
  console.log(`- Children: ${rowData[hdr['cesa_num_children'] - 1]}`);
  console.log(`- Employer 401k (ex_q1): ${rowData[hdr['ex_q1'] - 1]}`);
  console.log(`- Employer Match (ex_q2): ${rowData[hdr['ex_q2'] - 1]}`);
  
  // Debug: Show which columns these map to
  console.log('\nColumn mappings:');
  console.log(`- hsa_eligibility: column ${hdr['hsa_eligibility'] || 'NOT FOUND'}`);
  console.log(`- cesa_num_children: column ${hdr['cesa_num_children'] || 'NOT FOUND'}`);
  console.log(`- ex_q1: column ${hdr['ex_q1'] || 'NOT FOUND'}`);
  
  try {
    console.log('\nRunning profile helper...');
    const result = profileHelpers['2_ROBS_Curious'](rowData, hdr);
    
    console.log('\n✅ Profile helper executed successfully!');
    
    console.log('\nVehicle Orders by Domain:');
    
    // Education
    console.log('\nEducation:');
    result.vehicleOrders.Education.forEach(v => {
      console.log(`  - ${v.name}: ${v.capMonthly === Infinity ? 'unlimited' : '$' + Math.round(v.capMonthly) + '/mo'}`);
    });
    
    // Health
    console.log('\nHealth:');
    result.vehicleOrders.Health.forEach(v => {
      console.log(`  - ${v.name}: ${v.capMonthly === Infinity ? 'unlimited' : '$' + Math.round(v.capMonthly) + '/mo'}`);
    });
    
    // Retirement
    console.log('\nRetirement:');
    result.vehicleOrders.Retirement.forEach(v => {
      console.log(`  - ${v.name}: ${v.capMonthly === Infinity ? 'unlimited' : '$' + Math.round(v.capMonthly) + '/mo'}`);
    });
    
    return result;
  } catch (error) {
    console.log('\n❌ PROFILE HELPER ERROR:', error.message);
    console.log(error.stack);
    return null;
  }
}

/**
 * Compare expected vs actual vehicles
 */
function diagnoseProfile2Issues() {
  console.log('\n=== PROFILE 2 DIAGNOSTIC ===\n');
  
  const helperResult = testProfile2HelperDirect();
  if (!helperResult) return;
  
  const engineResult = testUniversalEngineBasic();
  if (!engineResult) return;
  
  console.log('\n=== COMPARISON ===\n');
  
  // Expected vehicles for W-2 employee with HSA and 2 kids
  const expected = [
    'HSA',
    '401(k) Match Traditional',
    '401(k) Traditional', 
    '401(k) Roth',
    'Traditional IRA',
    'Roth IRA',
    'Combined CESA'
  ];
  
  // Get actual retirement vehicles from helper
  const actualVehicles = helperResult.vehicleOrders.Retirement
    .filter(v => v.name !== 'Family Bank')
    .map(v => v.name);
  
  console.log('Expected vehicles:');
  expected.forEach(v => console.log(`  - ${v}`));
  
  console.log('\nActual vehicles from helper:');
  actualVehicles.forEach(v => console.log(`  - ${v}`));
  
  console.log('\nMissing vehicles:');
  expected.forEach(v => {
    if (!actualVehicles.includes(v)) {
      console.log(`  ❌ ${v}`);
    }
  });
  
  // Check if vehicles appear in other domains
  console.log('\nChecking other domains:');
  if (helperResult.vehicleOrders.Health.some(v => v.name === 'HSA')) {
    console.log('  - HSA found in Health domain ✅');
  }
  if (helperResult.vehicleOrders.Education.some(v => v.name === 'Combined CESA')) {
    console.log('  - Combined CESA found in Education domain ✅');
  }
}

// Run diagnostic when loaded
diagnoseProfile2Issues();
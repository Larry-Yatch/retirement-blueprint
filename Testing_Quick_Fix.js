// Quick Fix for Profile 2 Testing
// Ensures we have correct data in the right columns

/**
 * Fix the test data in row 9
 */
function fixTestDataRow9() {
  console.log('=== FIXING TEST DATA IN ROW 9 ===\n');
  
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  const headers = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  
  // Build header map
  const hdr = {};
  headers.forEach((header, index) => {
    if (header) hdr[header] = index + 1;
  });
  
  // Critical columns we need to fix
  const fixes = {
    'hsa_eligibility': 'Yes',
    'cesa_num_children': 2,
    'p2_hsa_monthly_contrib': 500,
    'p2_cesa_monthly_contrib': 200,
    'p2_retirement_personal': 2000
  };
  
  console.log('Setting values in row 9:');
  Object.entries(fixes).forEach(([header, value]) => {
    if (hdr[header]) {
      ws.getRange(9, hdr[header]).setValue(value);
      console.log(`  ✅ ${header} (col ${hdr[header]}) = ${value}`);
    } else {
      console.log(`  ❌ ${header} - column not found!`);
    }
  });
  
  console.log('\nData fixed! Now run the test again.');
}

/**
 * Quick test after fix
 */
function testAfterFix() {
  // First fix the data
  fixTestDataRow9();
  
  // Wait a moment
  Utilities.sleep(1000);
  
  // Now test
  console.log('\n=== TESTING AFTER FIX ===\n');
  
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  const headers = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  
  const hdr = {};
  headers.forEach((header, index) => {
    if (header) hdr[header] = index + 1;
  });
  
  const rowData = ws.getRange(9, 1, 1, ws.getLastColumn()).getValues()[0];
  
  console.log('Verified Data:');
  console.log(`- HSA Eligible: ${rowData[hdr['hsa_eligibility'] - 1]}`);
  console.log(`- Children: ${rowData[hdr['cesa_num_children'] - 1]}`);
  console.log(`- Monthly HSA: ${rowData[hdr['p2_hsa_monthly_contrib'] - 1]}`);
  console.log(`- Monthly CESA: ${rowData[hdr['p2_cesa_monthly_contrib'] - 1]}`);
  console.log(`- Monthly Retirement: ${rowData[hdr['p2_retirement_personal'] - 1]}`);
  
  // Run profile helper
  console.log('\nRunning profile helper...');
  const result = profileHelpers['2_ROBS_Curious'](rowData, hdr);
  
  console.log('\nGenerated Vehicles:');
  console.log('\nEducation:');
  result.vehicleOrders.Education.forEach(v => {
    if (v.capMonthly !== Infinity) {
      console.log(`  - ${v.name}: $${Math.round(v.capMonthly)}/mo`);
    }
  });
  
  console.log('\nHealth:');
  result.vehicleOrders.Health.forEach(v => {
    if (v.capMonthly !== Infinity) {
      console.log(`  - ${v.name}: $${Math.round(v.capMonthly)}/mo`);
    }
  });
  
  console.log('\nRetirement:');
  result.vehicleOrders.Retirement.forEach(v => {
    if (v.capMonthly !== Infinity) {
      console.log(`  - ${v.name}: $${Math.round(v.capMonthly)}/mo`);
    }
  });
  
  // Now run engine
  console.log('\n\nRunning Universal Engine...');
  const engineResult = runUniversalEngine(9);
  
  console.log('\nEngine allocated:');
  console.log(`- Total: $${engineResult.totalMonthly}/mo`);
  console.log('\nRetirement allocations:');
  Object.entries(engineResult.vehicles.Retirement).forEach(([vehicle, amount]) => {
    if (amount > 0) {
      console.log(`  - ${vehicle}: $${Math.round(amount)}/mo`);
    }
  });
}

// Run the fix
testAfterFix();
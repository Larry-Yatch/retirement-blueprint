/**
 * Debug vehicle ordering issue for Profile 7
 */

function debugVehicleOrder() {
  console.log('\n' + '='.repeat(80));
  console.log('DEBUGGING VEHICLE ORDER FOR PROFILE 7');
  console.log('='.repeat(80));
  
  // Use complete test data
  const suite = PROFILE_7_TEST_SUITE;
  const testData = { ...suite.baseData, ...suite.scenarios.youngProfessional };
  
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  const headers = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  
  const hdr = {};
  headers.forEach((header, index) => {
    if (header) hdr[header] = index + 1;
  });
  
  const testRow = ws.getLastRow() + 1;
  
  // Write test data
  Object.entries(testData).forEach(([key, value]) => {
    if (hdr[key]) {
      ws.getRange(testRow, hdr[key]).setValue(value);
    }
  });
  
  const rowData = ws.getRange(testRow, 1, 1, ws.getLastColumn()).getValues()[0];
  
  // Run just the profile helper
  console.log('1️⃣ PROFILE HELPER VEHICLE ORDER');
  const helperResult = profileHelpers['7_Foundation_Builder'](rowData, hdr);
  
  console.log('\nRetirement vehicles in order:');
  helperResult.vehicleOrders.Retirement.forEach((vehicle, index) => {
    console.log(`  ${index}. ${vehicle.name}`);
  });
  
  // Check the actual allocator logic
  console.log('\n2️⃣ CHECKING ALLOCATOR BEHAVIOR');
  
  // Simulate what the allocator does
  const totalToAllocate = 367; // From previous debug
  let remaining = totalToAllocate;
  
  console.log(`\nSimulating allocation of $${totalToAllocate} to retirement:`);
  
  helperResult.vehicleOrders.Retirement.forEach((vehicle, index) => {
    if (remaining <= 0) return;
    
    const allocate = Math.min(remaining, vehicle.capMonthly);
    
    if (allocate > 0) {
      console.log(`  ${vehicle.name}: Allocate $${Math.round(allocate)}`);
      remaining -= allocate;
    } else {
      console.log(`  ${vehicle.name}: Skip (no funds remaining)`);
    }
  });
  
  // Check if HSA is in wrong place
  console.log('\n3️⃣ HSA PLACEMENT CHECK');
  const hsaInRetirement = helperResult.vehicleOrders.Retirement.some(v => v.name === 'HSA');
  const hsaInHealth = helperResult.vehicleOrders.Health.some(v => v.name === 'HSA');
  
  console.log(`HSA in Retirement vehicles: ${hsaInRetirement ? '❌ YES (WRONG!)' : '✅ NO'}`);
  console.log(`HSA in Health vehicles: ${hsaInHealth ? '✅ YES' : '❌ NO (WRONG!)'}`);
  
  // Check vehicle order after employer 401k addition
  console.log('\n4️⃣ CHECKING addEmployer401kVehicles LOGIC');
  
  // Look at the base config order
  const cfg = PROFILE_CONFIG['7_Foundation_Builder'];
  console.log('\nBase config retirement order:');
  cfg.vehicleOrder_Retirement.forEach((v, i) => {
    console.log(`  ${i}. ${v.name}`);
  });
  
  // Check if 401k is being inserted correctly
  console.log('\n5️⃣ EXPECTED vs ACTUAL ORDER');
  console.log('\nExpected order:');
  console.log('  0. 401(k) Match (if employer offers)');
  console.log('  1. HSA (if eligible)');
  console.log('  2. Roth IRA');
  console.log('  3. Traditional IRA');
  console.log('  4. Roth 401(k) Employee (if available)');
  console.log('  5. Traditional 401(k) Employee (if available)');
  console.log('  6. Family Bank');
  
  console.log('\nActual order:');
  helperResult.vehicleOrders.Retirement.forEach((vehicle, index) => {
    console.log(`  ${index}. ${vehicle.name}`);
  });
  
  // Clean up
  ws.deleteRow(testRow);
  
  console.log('\n' + '='.repeat(80));
  console.log('DIAGNOSIS');
  console.log('='.repeat(80));
  console.log('\nThe issue appears to be vehicle ordering.');
  console.log('401(k) match should be FIRST but may be placed after other vehicles.');
}
/**
 * Debug why engine isn't allocating to 401(k) vehicles
 */

function debugEngineAllocation() {
  console.log('\n' + '='.repeat(80));
  console.log('DEBUGGING ENGINE ALLOCATION FOR 401(k) VEHICLES');
  console.log('='.repeat(80));
  
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  const headers = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  
  // Build header map
  const hdr = {};
  headers.forEach((header, index) => {
    if (header) hdr[header] = index + 1;
  });
  
  // Create test data
  const testData = {
    'Timestamp': new Date(),
    'Full_Name': 'Engine Debug Test',
    'Email': 'engine@debug.com',
    'Student_ID_Last4': '8888',
    'Current_Age': 30,
    'ProfileID': '7_Foundation_Builder',
    'Work_Situation': 'W-2 employee',
    'gross_annual_income': 75000,
    'filing_status': 'Single',
    'Tax_Minimization': 'Both',
    'hsa_eligibility': 'Yes',
    'cesa_num_children': 0,
    'Net_Monthly_Income': 5000,
    'Allocation_Percentage': 20,
    'ex_q1': 'Yes',
    'ex_q2': 'Yes',
    'ex_q3': '100% up to 3%',
    'ex_q4': 'Yes'
  };
  
  // Write test row
  const testRow = ws.getLastRow() + 1;
  console.log('Writing test data to row', testRow);
  
  Object.entries(testData).forEach(([key, value]) => {
    if (hdr[key]) {
      ws.getRange(testRow, hdr[key]).setValue(value);
    }
  });
  
  // Get row data
  const rowData = ws.getRange(testRow, 1, 1, ws.getLastColumn()).getValues()[0];
  
  // Run profile helper first
  console.log('\n1️⃣ PROFILE HELPER RESULTS:');
  const profileResult = profileHelpers['7_Foundation_Builder'](rowData, hdr);
  
  console.log('\nRetirement vehicles from helper:');
  profileResult.vehicleOrders.Retirement.forEach(v => {
    console.log(`  - ${v.name}: ${v.capMonthly === Infinity ? 'Unlimited' : '$' + Math.round(v.capMonthly) + '/mo'}`);
  });
  
  // Check what computeNetPool returns
  console.log('\n2️⃣ CHECKING computeNetPool:');
  // computeNetPool expects: (netIncome, seeds, userPct, defaultRate)
  const netIncome = 5000;
  const userPct = 20; // This is the Allocation_Percentage
  const defaultRate = 0.20; // CONFIG.OPTIMIZED_SAVINGS_RATE
  const seeds = profileResult.seeds || { Education: {}, Health: {}, Retirement: {} };
  
  const netPool = computeNetPool(netIncome, seeds, userPct, defaultRate);
  console.log('  Net pool amount:', netPool);
  console.log('  Expected (20% of $5000):', 5000 * 0.20);
  
  // Check domain weights
  console.log('\n3️⃣ CHECKING DOMAIN WEIGHTS:');
  const domainWeights = {
    Education: { w: 0.333 },
    Health: { w: 0.333 },
    Retirement: { w: 0.334 }
  };
  console.log('  Education:', domainWeights.Education.w);
  console.log('  Health:', domainWeights.Health.w);
  console.log('  Retirement:', domainWeights.Retirement.w);
  
  // Run the actual engine
  console.log('\n4️⃣ RUNNING UNIVERSAL ENGINE:');
  try {
    const engineResult = runUniversalEngine(testRow);
    
    console.log('\nEngine allocation results:');
    Object.entries(engineResult.vehicles).forEach(([domain, vehicles]) => {
      console.log(`\n${domain}:`);
      Object.entries(vehicles).forEach(([vehicle, amount]) => {
        if (amount > 0) {
          console.log(`  - ${vehicle}: $${Math.round(amount)}/mo`);
        }
      });
    });
    
    // Check specifically for 401(k) vehicles
    console.log('\n5️⃣ CHECKING FOR 401(k) ALLOCATIONS:');
    const retirement = engineResult.vehicles.Retirement || {};
    let found401k = false;
    Object.entries(retirement).forEach(([vehicle, amount]) => {
      if (vehicle.includes('401(k)')) {
        console.log(`  Found ${vehicle}: $${amount}`);
        found401k = true;
      }
    });
    if (!found401k) {
      console.log('  ❌ NO 401(k) VEHICLES IN ALLOCATION!');
    }
    
    // Check if listAllVehicleActualKeys includes 401(k)
    console.log('\n6️⃣ CHECKING listAllVehicleActualKeys:');
    const allKeys = listAllVehicleActualKeys();
    const retirement401kKeys = allKeys.Retirement.filter(key => key.includes('401(k)'));
    console.log('  Total Retirement keys:', allKeys.Retirement.length);
    console.log('  401(k) keys found:', retirement401kKeys.length);
    retirement401kKeys.forEach(key => {
      console.log(`    - ${key}`);
    });
    
  } catch (error) {
    console.error('❌ Engine error:', error.message);
    console.log(error.stack);
  }
  
  // Check if the issue is in coreAllocate
  console.log('\n7️⃣ TESTING coreAllocate DIRECTLY:');
  const testVehicleOrders = {
    Education: [{ name: 'Education Bank', capMonthly: Infinity }],
    Health: [{ name: 'HSA', capMonthly: 358 }, { name: 'Health Bank', capMonthly: Infinity }],
    Retirement: [
      { name: 'HSA', capMonthly: 358 },
      { name: '401(k) Match Traditional', capMonthly: 188 },
      { name: 'Roth IRA', capMonthly: 583 },
      { name: 'Family Bank', capMonthly: Infinity }
    ]
  };
  
  const allocResult = coreAllocate({
    domains: domainWeights,
    pool: 1000,
    seeds: { Education: {}, Health: {}, Retirement: {} },
    vehicleOrders: testVehicleOrders
  });
  
  console.log('\nDirect coreAllocate results:');
  console.log('  Retirement allocations:');
  Object.entries(allocResult.Retirement).forEach(([vehicle, amount]) => {
    if (amount > 0) {
      console.log(`    - ${vehicle}: $${Math.round(amount)}`);
    }
  });
  
  // Clean up
  console.log('\n🧹 Cleaning up test row...');
  ws.deleteRow(testRow);
  
  console.log('\n' + '='.repeat(80));
  console.log('DIAGNOSIS COMPLETE');
  console.log('='.repeat(80));
}

// Add to menu
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🐛 Debug Engine')
    .addItem('Debug Engine Allocation', 'debugEngineAllocation')
    .addToUi();
}
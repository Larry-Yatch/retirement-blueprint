/**
 * Debug why 401(k) vehicles are generated but not allocated
 */

function debugProfile7Allocation() {
  console.log('\n' + '='.repeat(80));
  console.log('DEBUGGING PROFILE 7 401(k) ALLOCATION');
  console.log('='.repeat(80));
  
  // Use complete test data
  const suite = PROFILE_7_TEST_SUITE;
  const testData = { ...suite.baseData, ...suite.scenarios.youngProfessional };
  
  // Write to Working Sheet
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  const headers = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  
  const hdr = {};
  headers.forEach((header, index) => {
    if (header) hdr[header] = index + 1;
  });
  
  const testRow = ws.getLastRow() + 1;
  
  // Write test data
  console.log('1️⃣ WRITING TEST DATA');
  Object.entries(testData).forEach(([key, value]) => {
    if (hdr[key]) {
      ws.getRange(testRow, hdr[key]).setValue(value);
    }
  });
  
  // Get row data
  const rowData = ws.getRange(testRow, 1, 1, ws.getLastColumn()).getValues()[0];
  
  // Run profile helper
  console.log('\n2️⃣ RUNNING PROFILE HELPER');
  const helperResult = profileHelpers['7_Foundation_Builder'](rowData, hdr);
  
  console.log('\nGenerated Retirement Vehicles:');
  helperResult.vehicleOrders.Retirement.forEach((vehicle, index) => {
    const cap = vehicle.capMonthly === Infinity ? 'Unlimited' : `$${Math.round(vehicle.capMonthly)}/mo`;
    console.log(`  ${index + 1}. ${vehicle.name}: ${cap}`);
  });
  
  // Check what the engine sees
  console.log('\n3️⃣ CHECKING ALLOCATION DETAILS');
  
  // Get allocation amount
  const netMonthly = testData.Net_Monthly_Income;
  const allocPercent = testData.Allocation_Percentage;
  const allocAmount = netMonthly * (allocPercent / 100);
  console.log(`\nAllocation: $${netMonthly} × ${allocPercent}% = $${allocAmount}/mo`);
  
  // Check minimum savings rate
  console.log(`Minimum (20%): $${netMonthly * 0.20}/mo`);
  console.log(`Actual allocation will be: $${Math.max(allocAmount, netMonthly * 0.20)}/mo`);
  
  // Run engine with detailed logging
  console.log('\n4️⃣ RUNNING ENGINE WITH DETAILS');
  
  // Set debug flag if available
  if (typeof DEBUG !== 'undefined') {
    DEBUG.allocation = true;
  }
  
  const engineResult = runUniversalEngine(testRow);
  
  // Check retirement vehicles in detail
  console.log('\n5️⃣ RETIREMENT ALLOCATION BREAKDOWN');
  const retirementVehicles = engineResult.vehicles.Retirement || {};
  
  console.log('\nVehicles allocated:');
  Object.entries(retirementVehicles).forEach(([name, amount]) => {
    if (amount > 0) {
      console.log(`  ${name}: $${Math.round(amount)}/mo`);
    }
  });
  
  console.log('\nVehicles NOT allocated (amount = 0):');
  helperResult.vehicleOrders.Retirement.forEach(vehicle => {
    const vehicleName = vehicle.name;
    if (!retirementVehicles[vehicleName] || retirementVehicles[vehicleName] === 0) {
      console.log(`  ❌ ${vehicleName}`);
    }
  });
  
  // Check domain weights
  console.log('\n6️⃣ DOMAIN WEIGHTS');
  const rMonthly = 0.08 / 12;
  const domainWeights = computeDomainsAndWeights(rowData, hdr, rMonthly);
  
  console.log('Domain weights:');
  console.log(`  Education: ${(domainWeights.Education.w * 100).toFixed(1)}%`);
  console.log(`  Health: ${(domainWeights.Health.w * 100).toFixed(1)}%`);
  console.log(`  Retirement: ${(domainWeights.Retirement.w * 100).toFixed(1)}%`);
  
  // Calculate expected retirement allocation
  const totalAlloc = Math.max(allocAmount, netMonthly * 0.20);
  const retirementWeight = domainWeights.Retirement.w;
  const expectedRetirement = totalAlloc * retirementWeight;
  
  console.log(`\nExpected retirement allocation: $${Math.round(expectedRetirement)}/mo`);
  console.log(`Actual retirement allocation: $${Math.round(Object.values(retirementVehicles).reduce((a,b) => a+b, 0))}/mo`);
  
  // Check if 401k match fits
  console.log('\n7️⃣ 401(k) MATCH ANALYSIS');
  const match401k = helperResult.vehicleOrders.Retirement.find(v => v.name.includes('401(k) Match'));
  if (match401k) {
    console.log(`401(k) Match cap: $${Math.round(match401k.capMonthly)}/mo`);
    console.log(`Available for retirement: $${Math.round(expectedRetirement)}/mo`);
    console.log(`Fits? ${match401k.capMonthly <= expectedRetirement ? '✅ YES' : '❌ NO - not enough allocation'}`);
  }
  
  // Clean up
  ws.deleteRow(testRow);
  
  console.log('\n' + '='.repeat(80));
  console.log('DIAGNOSIS COMPLETE');
  console.log('\nLikely issue: Not enough allocation for 401(k) after HSA and domain splits');
}
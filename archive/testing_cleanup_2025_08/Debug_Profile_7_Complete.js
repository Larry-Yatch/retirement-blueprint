/**
 * Complete debug of Profile 7 allocation issues
 */

function debugProfile7Complete() {
  console.log('\n' + '='.repeat(80));
  console.log('COMPLETE PROFILE 7 DEBUG');
  console.log('='.repeat(80));
  
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  const headers = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  
  // Build header map
  const hdr = {};
  headers.forEach((header, index) => {
    if (header) hdr[header] = index + 1;
  });
  
  // Test data matching youngProfessional scenario
  const testData = {
    'Full_Name': 'Debug Profile 7',
    'Email': 'debug@test.com',
    'Student_ID_Last4': '7777',
    'Current_Age': 25,
    'ProfileID': '7_Foundation_Builder',
    'Work_Situation': 'W-2 employee',
    'gross_annual_income': 65000,
    'filing_status': 'Single',
    'Tax_Minimization': 'Both',
    'hsa_eligibility': 'Yes',
    'cesa_num_children': 0,
    'Net_Monthly_Income': 4500,
    'Allocation_Percentage': 15,
    'investment_involvement': 3,
    'investment_time': 3,
    'investment_confidence': 3,
    'retirement_importance': 6,
    'education_importance': 1,
    'health_importance': 4,
    'retirement_years_until_target': 40,
    'cesa_years_until_first_need': 99,
    'hsa_years_until_need': 30,
    'Timestamp': new Date(),
    // Profile 7 extra questions
    'ex_q1': 'Yes',         // Has employer 401k
    'ex_q2': 'Yes',         // Has match
    'ex_q3': '100% up to 3%', // Match percentage
    'ex_q4': 'Yes',         // Has Roth 401k option
    'ex_q5': '5000',        // Emergency fund goal
    'ex_q6': '1000',        // Current emergency savings
    'ex_q7': 'Aggressive'   // Risk tolerance
  };
  
  // Write test row
  const testRow = ws.getLastRow() + 1;
  console.log('1️⃣ WRITING TEST DATA TO ROW', testRow);
  
  Object.entries(testData).forEach(([key, value]) => {
    if (hdr[key]) {
      ws.getRange(testRow, hdr[key]).setValue(value);
    }
  });
  
  // Get row data
  const rowData = ws.getRange(testRow, 1, 1, ws.getLastColumn()).getValues()[0];
  
  // 2. Run profile helper
  console.log('\n2️⃣ RUNNING PROFILE HELPER');
  try {
    const helperResult = profileHelpers['7_Foundation_Builder'](rowData, hdr);
    
    console.log('\nGENERATED VEHICLES:');
    ['Education', 'Health', 'Retirement'].forEach(domain => {
      console.log(`\n${domain}:`);
      helperResult.vehicleOrders[domain].forEach(vehicle => {
        const cap = vehicle.capMonthly === Infinity ? 'Unlimited' : `$${Math.round(vehicle.capMonthly)}/mo`;
        console.log(`  - ${vehicle.name}: ${cap}`);
      });
    });
    
    // Check if 401k vehicles exist
    const has401k = helperResult.vehicleOrders.Retirement.some(v => 
      v.name.includes('401') || v.name.includes('401(k)'));
    console.log(`\n401(k) vehicles generated: ${has401k ? '✅ YES' : '❌ NO'}`);
    
  } catch (error) {
    console.error('Profile helper error:', error.message);
  }
  
  // 3. Check ex_q values
  console.log('\n3️⃣ CHECKING EMPLOYER 401(k) DATA');
  console.log(`ex_q1 (Has 401k): ${getValue(hdr, rowData, 'ex_q1')}`);
  console.log(`ex_q2 (Has match): ${getValue(hdr, rowData, 'ex_q2')}`);
  console.log(`ex_q3 (Match %): ${getValue(hdr, rowData, 'ex_q3')}`);
  console.log(`ex_q4 (Roth option): ${getValue(hdr, rowData, 'ex_q4')}`);
  
  // 4. Run engine
  console.log('\n4️⃣ RUNNING UNIVERSAL ENGINE');
  const engineResult = runUniversalEngine(testRow);
  
  console.log('\nENGINE ALLOCATIONS:');
  let totalAllocated = 0;
  Object.entries(engineResult.vehicles).forEach(([domain, vehicles]) => {
    console.log(`\n${domain}:`);
    Object.entries(vehicles).forEach(([vehicle, amount]) => {
      if (amount > 0) {
        console.log(`  - ${vehicle}: $${Math.round(amount)}/mo`);
        totalAllocated += amount;
      }
    });
  });
  
  console.log(`\nTotal allocated: $${Math.round(totalAllocated)}`);
  console.log(`Expected (15%): $${Math.round(4500 * 0.15)}`);
  console.log(`Actual as % of income: ${(totalAllocated / 4500 * 100).toFixed(1)}%`);
  
  // 5. Check minimum savings rate
  console.log('\n5️⃣ CHECKING MINIMUM SAVINGS RATE');
  console.log(`CONFIG.OPTIMIZED_SAVINGS_RATE: ${CONFIG.OPTIMIZED_SAVINGS_RATE}`);
  console.log(`Minimum monthly (20%): $${Math.round(4500 * 0.20)}`);
  
  if (totalAllocated >= 4500 * 0.20) {
    console.log('✅ Meets minimum 20% savings rate');
  }
  
  // Clean up
  console.log('\n6️⃣ CLEANING UP');
  ws.deleteRow(testRow);
  
  console.log('\n' + '='.repeat(80));
  console.log('DIAGNOSIS SUMMARY');
  console.log('='.repeat(80));
  console.log('\nLikely issues:');
  console.log('1. Profile 7 helper may not be generating 401(k) vehicles');
  console.log('2. Total exceeds requested 15% due to 20% minimum enforcement');
  console.log('3. Need to check Profile 7 helper implementation');
}
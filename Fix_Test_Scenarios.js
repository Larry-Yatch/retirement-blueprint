/**
 * Fix all test scenarios to include investment scoring questions
 */

function addInvestmentScoringToAllTests() {
  console.log('FIXING TEST SCENARIOS - Adding Investment Scoring Questions');
  console.log('=' .repeat(80));
  
  // The issue: Test scenarios are missing these required fields:
  // - investment_involvement (1-7 scale)
  // - investment_time (1-7 scale)  
  // - investment_confidence (1-7 scale)
  
  // Without these, the engine can't calculate domain weights and falls back
  // to an even 33.3%/33.3%/33.4% split, resulting in $333/$333/$334
  
  console.log('\nThe Problem:');
  console.log('- Tests show even $300/$300/$300 or $333/$333/$333 allocations');
  console.log('- This happens when investment scoring questions are missing');
  console.log('- Engine falls back to equal domain weights without these scores');
  
  console.log('\nThe Solution:');
  console.log('Add these to all test scenario phase1 data:');
  console.log("  'investment_involvement': 4,  // 1-7 scale");
  console.log("  'investment_time': 4,         // 1-7 scale");
  console.log("  'investment_confidence': 4    // 1-7 scale");
  
  console.log('\nWhy This Matters:');
  console.log('- These scores determine domain weights (Education/Health/Retirement)');
  console.log('- Higher scores = more aggressive allocation, lower = conservative');
  console.log('- Score of 4 = neutral/balanced allocation');
  
  console.log('\nRecommended Fix:');
  console.log('Update all test scenarios in Testing.js to include these fields');
  console.log('This will fix the "even split" issue and show proper vehicle allocations');
}

// Quick test to verify the fix works
function testWithInvestmentScoring() {
  console.log('\n' + '='.repeat(80));
  console.log('TESTING WITH INVESTMENT SCORING');
  console.log('='.repeat(80));
  
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  const headers = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  
  // Build header map
  const hdr = {};
  headers.forEach((header, index) => {
    if (header) hdr[header] = index + 1;
  });
  
  // Create test data WITH investment scoring
  const testData = {
    'Timestamp': new Date(),
    'Full_Name': 'Investment Scoring Test',
    'Email': 'scoring@test.com',
    'Student_ID_Last4': '9999',
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
    // THE KEY FIELDS:
    'investment_involvement': 4,
    'investment_time': 4,
    'investment_confidence': 4,
    // 401k data
    'ex_q1': 'Yes',
    'ex_q2': 'Yes',
    'ex_q3': '100% up to 3%',
    'ex_q4': 'Yes'
  };
  
  // Write and test
  const testRow = ws.getLastRow() + 1;
  Object.entries(testData).forEach(([key, value]) => {
    if (hdr[key]) {
      ws.getRange(testRow, hdr[key]).setValue(value);
    }
  });
  
  console.log('Running engine WITH investment scoring...');
  const result = runUniversalEngine(testRow);
  
  console.log('\nResults:');
  Object.entries(result.vehicles).forEach(([domain, vehicles]) => {
    console.log(`\n${domain}:`);
    Object.entries(vehicles).forEach(([vehicle, amount]) => {
      if (amount > 0) {
        console.log(`  - ${vehicle}: $${amount}/mo`);
      }
    });
  });
  
  // Check if we got proper allocation (not even split)
  const amounts = [];
  Object.values(result.vehicles).forEach(domain => {
    Object.values(domain).forEach(amount => {
      if (amount > 0) amounts.push(amount);
    });
  });
  
  const allSame = amounts.every(a => a === amounts[0]);
  console.log(`\nEven split detected: ${allSame ? '❌ YES (bad)' : '✅ NO (good)'}`);
  
  // Clean up
  ws.deleteRow(testRow);
}
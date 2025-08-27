/**
 * Debug why investment scoring isn't being written/read properly
 */

function debugInvestmentScoring() {
  console.log('\n' + '='.repeat(80));
  console.log('DEBUGGING INVESTMENT SCORING ISSUE');
  console.log('='.repeat(80));
  
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  const headers = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  
  // Build header map
  const hdr = {};
  headers.forEach((header, index) => {
    if (header) hdr[header] = index + 1;
  });
  
  // 1. Check if investment scoring columns exist
  console.log('\n1️⃣ CHECKING INVESTMENT SCORING COLUMNS:');
  const scoringFields = ['investment_involvement', 'investment_time', 'investment_confidence'];
  
  scoringFields.forEach(field => {
    const exists = hdr[field] !== undefined;
    const col = hdr[field] || 'NOT FOUND';
    console.log(`  ${field}: ${exists ? '✅' : '❌'} (column ${col})`);
  });
  
  // 2. Test data from scenario
  const testScenario = {
    'Full_Name': 'Investment Scoring Test',
    'ProfileID': '7_Foundation_Builder',
    'Net_Monthly_Income': 5000,
    'Allocation_Percentage': 20,
    'investment_involvement': 4,
    'investment_time': 4,
    'investment_confidence': 4
  };
  
  // 3. Check what runCompleteScenarioTest is doing
  console.log('\n2️⃣ CHECKING HOW TEST WRITES DATA:');
  
  // Look at the actual test scenario structure
  const PROFILE_7_SCENARIOS = {
    testScenario: {
      name: 'Debug Test',
      phase1: {
        'investment_involvement': 4,
        'investment_time': 4,
        'investment_confidence': 4
      },
      phase2: {}
    }
  };
  
  // Check if phase1 data includes scoring
  console.log('\nPhase1 data includes:');
  Object.entries(PROFILE_7_SCENARIOS.testScenario.phase1).forEach(([key, value]) => {
    console.log(`  ${key}: ${value}`);
  });
  
  // 4. Write test row manually
  console.log('\n3️⃣ WRITING TEST ROW MANUALLY:');
  const testRow = ws.getLastRow() + 1;
  
  // Write all fields
  Object.entries(testScenario).forEach(([key, value]) => {
    if (hdr[key]) {
      ws.getRange(testRow, hdr[key]).setValue(value);
      console.log(`  Wrote ${key} = ${value} to column ${hdr[key]}`);
    } else {
      console.log(`  ❌ Could not write ${key} - column not found`);
    }
  });
  
  // 5. Read back and check
  console.log('\n4️⃣ READING BACK VALUES:');
  const rowData = ws.getRange(testRow, 1, 1, ws.getLastColumn()).getValues()[0];
  
  scoringFields.forEach(field => {
    if (hdr[field]) {
      const value = rowData[hdr[field] - 1];
      console.log(`  ${field}: "${value}" (type: ${typeof value})`);
    }
  });
  
  // 6. Check what computeDomainsAndWeights receives
  console.log('\n5️⃣ CHECKING computeDomainsAndWeights:');
  
  // Get the values the engine would use
  const inv1 = getValue(hdr, rowData, 'investment_involvement');
  const inv2 = getValue(hdr, rowData, 'investment_time');
  const inv3 = getValue(hdr, rowData, 'investment_confidence');
  
  console.log(`  investment_involvement: ${inv1} (type: ${typeof inv1})`);
  console.log(`  investment_time: ${inv2} (type: ${typeof inv2})`);
  console.log(`  investment_confidence: ${inv3} (type: ${typeof inv3})`);
  
  const Sbar = (Number(inv1) + Number(inv2) + Number(inv3)) / 3;
  console.log(`  Sbar calculation: (${inv1} + ${inv2} + ${inv3}) / 3 = ${Sbar}`);
  
  if (isNaN(Sbar) || Sbar === 0) {
    console.log('  ❌ Sbar is invalid - will cause equal domain weights!');
  }
  
  // 7. Check actual domain weight calculation
  console.log('\n6️⃣ CALCULATING DOMAIN WEIGHTS:');
  const rMonthly = 0.08 / 12; // Simplified for test
  
  try {
    const domainWeights = computeDomainsAndWeights(rowData, hdr, rMonthly);
    console.log('  Domain weights:');
    console.log(`    Education: ${domainWeights.Education.w}`);
    console.log(`    Health: ${domainWeights.Health.w}`);
    console.log(`    Retirement: ${domainWeights.Retirement.w}`);
    
    // Check if weights are equal (bad)
    const weights = [domainWeights.Education.w, domainWeights.Health.w, domainWeights.Retirement.w];
    const allEqual = weights.every(w => Math.abs(w - 0.333) < 0.01);
    console.log(`  Equal weights detected: ${allEqual ? '❌ YES' : '✅ NO'}`);
    
  } catch (error) {
    console.error('  ❌ Error calculating domain weights:', error.message);
  }
  
  // Clean up
  console.log('\n7️⃣ Cleaning up test row...');
  ws.deleteRow(testRow);
  
  console.log('\n' + '='.repeat(80));
  console.log('DIAGNOSIS COMPLETE');
  console.log('\nLikely issues:');
  console.log('1. Investment scoring columns might not exist in Working Sheet');
  console.log('2. Column names might be different (underscores vs camelCase)');
  console.log('3. Test function might not be writing these fields');
  console.log('4. getValue might be looking for different column names');
}

// Check what columns actually exist
function listAllWorkingSheetColumns() {
  console.log('\n' + '='.repeat(80));
  console.log('ALL WORKING SHEET COLUMNS');
  console.log('='.repeat(80));
  
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  const headers = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  
  console.log('\nLooking for investment-related columns:');
  headers.forEach((header, index) => {
    if (header && (header.toLowerCase().includes('invest') || 
                   header.toLowerCase().includes('score') ||
                   header.toLowerCase().includes('involve') ||
                   header.toLowerCase().includes('confid'))) {
      console.log(`  Column ${index + 1}: "${header}"`);
    }
  });
  
  console.log('\nAll columns:');
  headers.forEach((header, index) => {
    if (header) {
      console.log(`  ${index + 1}: ${header}`);
    }
  });
}
// Complete Profile 2 Test with Monthly Contribution Calculations
// This test validates the entire flow from Phase 1/2 data through to actual allocations

/**
 * Run a complete test that shows monthly contribution calculations
 */
function testProfile2WithMonthlyCalculations() {
  console.log('\n' + '='.repeat(70));
  console.log('PROFILE 2 COMPLETE TEST WITH MONTHLY CONTRIBUTION CALCULATIONS');
  console.log('='.repeat(70));
  
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  const headers = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  
  // Build header map
  const hdr = {};
  headers.forEach((header, index) => {
    if (header) hdr[header] = index + 1;
  });
  
  // Create realistic test scenario
  const testScenario = {
    // Phase 1 Data
    'Full_Name': 'Monthly Calc Test',
    'Email': 'test.monthly@example.com',
    'Student_ID_Last4': '1234',
    'Current_Age': 45,
    'ProfileID': '2_ROBS_Curious',
    'Work_Situation': 'W-2 employee',
    'gross_annual_income': 120000,
    'filing_status': 'Married Filing Jointly',
    'Tax_Minimization': 'Both',
    // Critical for monthly calculations
    'Net_Monthly_Income': 7500,  // After taxes
    'Allocation_Percentage': 26.7,  // Want to save 26.7% of net income
    // Benefits
    'hsa_eligibility': 'Yes',
    'cesa_num_children': 2,
    // Phase 2 Data (extra questions)
    'ex_q1': 'Yes',  // Has employer 401k
    'ex_q2': 'Yes',  // Has match
    'ex_q3': '50% up to 6%',  // Match details
    'ex_q4': 'Yes',  // Has Roth option
    'ex_q5': '75000',  // ROBS rollover amount
    'ex_q6': '0',  // Business income (not started)
    'ex_q7': 'No'  // Spouse not in business
  };
  
  // Calculate expected monthly allocation
  const expectedMonthlyAllocation = testScenario.Net_Monthly_Income * (testScenario.Allocation_Percentage / 100);
  console.log('\n📊 FINANCIAL INPUTS:');
  console.log(`  Gross Annual Income: $${testScenario.gross_annual_income.toLocaleString()}`);
  console.log(`  Net Monthly Income: $${testScenario.Net_Monthly_Income.toLocaleString()}`);
  console.log(`  Allocation Percentage: ${testScenario.Allocation_Percentage}%`);
  console.log(`  Expected Monthly Allocation: $${Math.round(expectedMonthlyAllocation).toLocaleString()}`);
  
  // Find or create test row
  const lastRow = ws.getLastRow();
  const testRow = lastRow + 1;
  
  // Write test data to Working Sheet
  console.log(`\n📝 Writing test data to row ${testRow}...`);
  Object.entries(testScenario).forEach(([key, value]) => {
    if (hdr[key]) {
      ws.getRange(testRow, hdr[key]).setValue(value);
    }
  });
  
  // Also set timestamp
  ws.getRange(testRow, hdr['Timestamp']).setValue(new Date());
  
  console.log('✅ Test data written to Working Sheet');
  
  // Run profile helper
  console.log('\n🚀 RUNNING PROFILE HELPER...');
  const rowData = ws.getRange(testRow, 1, 1, ws.getLastColumn()).getValues()[0];
  
  try {
    const profileResult = profileHelpers['2_ROBS_Curious'](rowData, hdr);
    
    console.log('\n📋 GENERATED VEHICLE ORDERS:');
    
    // Show all domains
    ['Education', 'Health', 'Retirement'].forEach(domain => {
      console.log(`\n${domain} Domain:`);
      profileResult.vehicleOrders[domain].forEach(vehicle => {
        if (vehicle.capMonthly === Infinity) {
          console.log(`  - ${vehicle.name}: Unlimited`);
        } else {
          console.log(`  - ${vehicle.name}: $${Math.round(vehicle.capMonthly)}/mo`);
        }
      });
    });
    
    // Run universal engine
    console.log('\n⚙️  RUNNING UNIVERSAL ENGINE...');
    const engineResult = runUniversalEngine(testRow);
    
    console.log('\n💰 ACTUAL ALLOCATIONS:');
    console.log(`  Total Monthly Allocation: $${engineResult.totalMonthly || 'undefined'}`);
    
    // Show allocations by domain
    Object.entries(engineResult.vehicles).forEach(([domain, vehicles]) => {
      console.log(`\n${domain} Allocations:`);
      let domainTotal = 0;
      Object.entries(vehicles).forEach(([vehicle, amount]) => {
        if (amount > 0) {
          console.log(`  - ${vehicle}: $${Math.round(amount)}/mo`);
          domainTotal += amount;
        }
      });
      console.log(`  Domain Total: $${Math.round(domainTotal)}/mo`);
    });
    
    // Calculate actual total
    let actualTotal = 0;
    Object.values(engineResult.vehicles).forEach(domainVehicles => {
      Object.values(domainVehicles).forEach(amount => {
        actualTotal += amount;
      });
    });
    
    console.log('\n📊 SUMMARY:');
    console.log(`  Expected Monthly Allocation: $${Math.round(expectedMonthlyAllocation)}`);
    console.log(`  Actual Total Allocated: $${Math.round(actualTotal)}`);
    
    // Check if allocation matches expectation
    if (Math.abs(actualTotal - expectedMonthlyAllocation) < 1) {
      console.log('  ✅ Allocation matches expected amount!');
    } else {
      console.log(`  ⚠️  Allocation difference: $${Math.round(Math.abs(actualTotal - expectedMonthlyAllocation))}`);
    }
    
    // Show what's in the actual columns
    console.log('\n🔍 CHECKING ACTUAL COLUMNS:');
    const actualKeys = listAllVehicleActualKeys();
    let foundActuals = false;
    actualKeys.forEach(key => {
      const value = rowData[hdr[key] - 1];
      if (value && value !== 0) {
        console.log(`  ${key}: $${value}`);
        foundActuals = true;
      }
    });
    if (!foundActuals) {
      console.log('  ⚠️  No values found in _actual columns');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log(error.stack);
  }
  
  // Clean up
  console.log('\n🧹 Cleaning up test data...');
  ws.deleteRow(testRow);
  console.log('✅ Test complete!');
}

// Run the test
testProfile2WithMonthlyCalculations();
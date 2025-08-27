/**
 * Profile 7 (Foundation Builder) Retest Script
 * Tests the corrected form mapping for employer 401(k) questions
 */

/**
 * Test Profile 7 with Young Professional scenario
 */
function testProfile7YoungProfessional() {
  console.log('\n' + '='.repeat(80));
  console.log('PROFILE 7 (FOUNDATION BUILDER) - YOUNG PROFESSIONAL TEST');
  console.log('Testing with corrected form mapping (positions 44-47 → ex_q1-4)');
  console.log('='.repeat(80));
  
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  const headers = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  
  // Build header map
  const hdr = {};
  headers.forEach((header, index) => {
    if (header) hdr[header] = index + 1;
  });
  
  // Test data for young professional
  const testData = {
    // Phase 1 data
    'Timestamp': new Date(),
    'Full_Name': 'Test Young Professional',
    'Email': 'test.young.pro@example.com',
    'Student_ID_Last4': '7001',
    'Current_Age': 25,
    'ProfileID': '7_Foundation_Builder',
    'Work_Situation': 'W-2 employee',
    'gross_annual_income': 65000,
    'filing_status': 'Single',
    'Tax_Minimization': 'Both',
    'hsa_eligibility': 'Yes',
    'cesa_num_children': 0,
    'Net_Monthly_Income': 4333, // ~$65k gross → ~$52k net
    'Allocation_Percentage': 15,
    
    // Phase 2 data - employer 401(k) questions
    'ex_q1': 'Yes',          // Has employer 401k
    'ex_q2': 'Yes',          // Has match
    'ex_q3': '100% up to 3%', // Match percentage
    'ex_q4': 'Yes',          // Has Roth 401k option
    'ex_q5': '5000',         // Emergency fund goal
    'ex_q6': '1000',         // Current emergency savings
    'ex_q7': 'Aggressive'    // Risk tolerance
  };
  
  // Find or create test row
  const lastRow = ws.getLastRow();
  const testRow = lastRow + 1;
  
  console.log('\n📝 Writing test data to row', testRow);
  
  // Write test data
  Object.entries(testData).forEach(([key, value]) => {
    if (hdr[key]) {
      ws.getRange(testRow, hdr[key]).setValue(value);
    }
  });
  
  // Calculate expected values
  const netMonthly = testData.Net_Monthly_Income;
  const requestedPercent = testData.Allocation_Percentage;
  const expectedRequested = netMonthly * (requestedPercent / 100);
  const expectedActual = netMonthly * 0.20; // 20% minimum
  
  console.log('\n💰 FINANCIAL CALCULATIONS:');
  console.log(`  Gross Annual: $${testData.gross_annual_income.toLocaleString()}`);
  console.log(`  Net Monthly: $${netMonthly.toLocaleString()}`);
  console.log(`  Requested Allocation: ${requestedPercent}% = $${Math.round(expectedRequested)}`);
  console.log(`  Expected Actual: 20% minimum = $${Math.round(expectedActual)}`);
  
  // Run profile helper
  console.log('\n🚀 RUNNING PROFILE HELPER...');
  const rowData = ws.getRange(testRow, 1, 1, ws.getLastColumn()).getValues()[0];
  
  try {
    const profileResult = profileHelpers['7_Foundation_Builder'](rowData, hdr);
    
    console.log('\n📋 GENERATED VEHICLES:');
    
    // Check Education vehicles
    console.log('\nEducation Domain:');
    profileResult.vehicleOrders.Education.forEach(v => {
      const cap = v.capMonthly === Infinity ? 'Unlimited' : `$${Math.round(v.capMonthly)}/mo`;
      console.log(`  - ${v.name}: ${cap}`);
    });
    
    // Check Health vehicles
    console.log('\nHealth Domain:');
    profileResult.vehicleOrders.Health.forEach(v => {
      const cap = v.capMonthly === Infinity ? 'Unlimited' : `$${Math.round(v.capMonthly)}/mo`;
      console.log(`  - ${v.name}: ${cap}`);
    });
    
    // Check Retirement vehicles - THIS IS KEY
    console.log('\nRetirement Domain:');
    let has401kMatch = false;
    let has401kEmployee = false;
    profileResult.vehicleOrders.Retirement.forEach(v => {
      const cap = v.capMonthly === Infinity ? 'Unlimited' : `$${Math.round(v.capMonthly)}/mo`;
      console.log(`  - ${v.name}: ${cap}`);
      if (v.name.includes('401(k) Match')) has401kMatch = true;
      if (v.name.includes('401(k) –')) has401kEmployee = true;
    });
    
    console.log('\n✅ Vehicle Generation Check:');
    console.log(`  401(k) Match generated: ${has401kMatch ? '✅ YES' : '❌ NO'}`);
    console.log(`  401(k) Employee generated: ${has401kEmployee ? '✅ YES' : '❌ NO'}`);
    
    // Run universal engine
    console.log('\n⚙️  RUNNING UNIVERSAL ENGINE...');
    const engineResult = runUniversalEngine(testRow);
    
    console.log('\n💸 ACTUAL ALLOCATIONS:');
    let totalAllocated = 0;
    let has401kMatchAllocation = false;
    let has401kEmployeeAllocation = false;
    
    Object.entries(engineResult.vehicles).forEach(([domain, vehicles]) => {
      console.log(`\n${domain}:`);
      let domainTotal = 0;
      Object.entries(vehicles).forEach(([vehicle, amount]) => {
        if (amount > 0) {
          console.log(`  - ${vehicle}: $${Math.round(amount)}/mo`);
          domainTotal += amount;
          if (vehicle.includes('401(k) Match')) has401kMatchAllocation = true;
          if (vehicle.includes('401(k) –')) has401kEmployeeAllocation = true;
        }
      });
      totalAllocated += domainTotal;
      console.log(`  Domain Total: $${Math.round(domainTotal)}/mo`);
    });
    
    console.log('\n📊 ALLOCATION SUMMARY:');
    console.log(`  Expected Total: $${Math.round(expectedActual)}`);
    console.log(`  Actual Total: $${Math.round(totalAllocated)}`);
    console.log(`  Difference: $${Math.round(Math.abs(totalAllocated - expectedActual))}`);
    
    console.log('\n✅ Allocation Check:');
    console.log(`  401(k) Match allocated: ${has401kMatchAllocation ? '✅ YES' : '❌ NO'}`);
    console.log(`  401(k) Employee allocated: ${has401kEmployeeAllocation ? '✅ YES' : '❌ NO'}`);
    
    if (!has401kMatchAllocation || !has401kEmployeeAllocation) {
      console.log('\n⚠️  WARNING: 401(k) vehicles generated but not allocated!');
      console.log('This suggests the form mapping may still have issues.');
    }
    
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.log(error.stack);
  }
  
  // Clean up
  console.log('\n🧹 Cleaning up test row...');
  ws.deleteRow(testRow);
  console.log('✅ Test complete!');
}

/**
 * Test Profile 7 with Family Starter scenario
 */
function testProfile7FamilyStarter() {
  console.log('\n' + '='.repeat(80));
  console.log('PROFILE 7 (FOUNDATION BUILDER) - FAMILY STARTER TEST');
  console.log('='.repeat(80));
  
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  const headers = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  
  // Build header map
  const hdr = {};
  headers.forEach((header, index) => {
    if (header) hdr[header] = index + 1;
  });
  
  // Test data for family with children
  const testData = {
    // Phase 1 data
    'Timestamp': new Date(),
    'Full_Name': 'Test Family Starter',
    'Email': 'test.family@example.com',
    'Student_ID_Last4': '7002',
    'Current_Age': 35,
    'ProfileID': '7_Foundation_Builder',
    'Work_Situation': 'W-2 employee',
    'gross_annual_income': 95000,
    'filing_status': 'Married Filing Jointly',
    'Tax_Minimization': 'Now', // Traditional preference
    'hsa_eligibility': 'Yes',
    'cesa_num_children': 2,
    'Net_Monthly_Income': 6500,
    'Allocation_Percentage': 20,
    
    // Phase 2 data
    'ex_q1': 'Yes',          // Has employer 401k
    'ex_q2': 'Yes',          // Has match
    'ex_q3': '50% up to 6%', // Match percentage
    'ex_q4': 'No',           // No Roth 401k option
    'ex_q5': '20000',        // Emergency fund goal
    'ex_q6': '8000',         // Current emergency savings
    'ex_q7': 'Moderate'      // Risk tolerance
  };
  
  // Similar test execution...
  const lastRow = ws.getLastRow();
  const testRow = lastRow + 1;
  
  // Write test data
  Object.entries(testData).forEach(([key, value]) => {
    if (hdr[key]) {
      ws.getRange(testRow, hdr[key]).setValue(value);
    }
  });
  
  console.log('\n💰 Expected: $1,300/mo (20% of $6,500)');
  console.log('  With CESA for 2 children and Traditional preference');
  
  try {
    // Run profile helper
    const rowData = ws.getRange(testRow, 1, 1, ws.getLastColumn()).getValues()[0];
    const profileResult = profileHelpers['7_Foundation_Builder'](rowData, hdr);
    
    // Run engine
    const engineResult = runUniversalEngine(testRow);
    
    // Show results
    console.log('\n💸 ALLOCATIONS:');
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
    
    console.log(`\nTotal Allocated: $${Math.round(totalAllocated)}/mo`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  
  // Clean up
  ws.deleteRow(testRow);
  console.log('✅ Test complete!');
}

/**
 * Run all Profile 7 tests
 */
function testProfile7All() {
  console.log('🧪 PROFILE 7 COMPREHENSIVE RETEST');
  console.log('Testing with corrected FORM_EX_Q_MAPPING');
  console.log('=' .repeat(80));
  
  // Run both test scenarios
  testProfile7YoungProfessional();
  Utilities.sleep(2000);
  testProfile7FamilyStarter();
  
  console.log('\n' + '='.repeat(80));
  console.log('ALL PROFILE 7 TESTS COMPLETE');
  console.log('Check results above for 401(k) allocation status');
}

// Menu for easy access
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🧪 Profile 7 Retest')
    .addItem('Test Young Professional', 'testProfile7YoungProfessional')
    .addItem('Test Family Starter', 'testProfile7FamilyStarter')
    .addItem('Run All Tests', 'testProfile7All')
    .addToUi();
}
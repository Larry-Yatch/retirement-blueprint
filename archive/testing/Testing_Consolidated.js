/**
 * Consolidated Testing Framework for Retirement Blueprint
 * Combines all testing functionality into a single, well-organized file
 * 
 * Sections:
 * 1. TEST DATA GENERATION
 * 2. PROFILE HELPER TESTING  
 * 3. COMPLETE SCENARIO TESTING (Phase 1 + 2)
 * 4. ENGINE DIAGNOSTICS
 * 5. VALIDATION UTILITIES
 * 6. TEST MENU AND RUNNERS
 */

// ============================================
// SECTION 1: TEST DATA GENERATION
// ============================================

/**
 * Generate standardized test data for any profile
 * @param {Object} overrides - Values to override defaults
 * @returns {Object} Complete test data object
 */
function generateTestData(overrides = {}) {
  const defaults = {
    // Demographics
    'Full_Name': 'Test User',
    'Email': 'test@example.com',
    'Student_ID_Last4': '1234',
    'Current_Age': 35,
    'gross_annual_income': 75000,
    'filing_status': 'Single',
    'Tax_Minimization': 'Both',
    
    // Financial
    'Net_Monthly_Income': 5000,
    'Allocation_Percentage': 20,
    
    // Work situation
    'Work_Situation': 'W-2 employee',
    'ProfileID': '1_ROBS_In_Use',
    
    // Benefits
    'hsa_eligibility': 'No',
    'cesa_num_children': 0,
    
    // Extra questions (Profile-specific)
    'ex_q1': '',
    'ex_q2': '',
    'ex_q3': '',
    'ex_q4': '',
    'ex_q5': '',
    'ex_q6': '',
    'ex_q7': ''
  };
  
  return { ...defaults, ...overrides };
}

/**
 * Test scenarios for Profile 2 (ROBS Curious)
 */
const PROFILE_2_SCENARIOS = {
  w2Employee: {
    name: 'W-2 Employee with Benefits',
    phase1: {
      'Full_Name': 'Test W2 Employee',
      'Email': 'test.w2@example.com',
      'Student_ID_Last4': '1234TW',
      'Current_Age': 45,
      'ProfileID': '2_ROBS_Curious',
      'Work_Situation': 'W-2 employee',
      'gross_annual_income': 120000,
      'filing_status': 'Married Filing Jointly',
      'Tax_Minimization': 'Both',
      'hsa_eligibility': 'Yes',
      'cesa_num_children': 2,
      'Net_Monthly_Income': 7500,
      'Allocation_Percentage': 26.7
    },
    phase2: {
      ex_q1: 'Yes',          // Has employer 401k
      ex_q2: 'Yes',          // Has match
      ex_q3: '50% up to 6%', // Match details
      ex_q4: 'Yes',          // Roth option
      ex_q5: '75000',        // Rollover balance
      ex_q6: '0',            // Business income
      ex_q7: 'No'            // Spouse in business
    }
  },
  selfEmployed: {
    name: 'Self-Employed Business Owner',
    phase1: {
      'Full_Name': 'Test Self Employed',
      'Email': 'test.self@example.com',
      'Student_ID_Last4': '5678TS',
      'Current_Age': 52,
      'ProfileID': '2_ROBS_Curious',
      'Work_Situation': 'Self-employed',
      'gross_annual_income': 150000,
      'filing_status': 'Single',
      'Tax_Minimization': 'Now',
      'hsa_eligibility': 'Yes',
      'cesa_num_children': 0,
      'Net_Monthly_Income': 9000,
      'Allocation_Percentage': 33.3
    },
    phase2: {
      ex_q1: 'No',
      ex_q2: 'No',
      ex_q3: '',
      ex_q4: 'No',
      ex_q5: '200000',
      ex_q6: '50000',
      ex_q7: 'No'
    }
  }
};

// ============================================
// SECTION 2: PROFILE HELPER TESTING
// ============================================

/**
 * Test a specific profile helper function
 * @param {string} profileId - Profile ID to test
 * @param {Object} testData - Optional test data overrides
 */
function testProfileHelper(profileId, testData = {}) {
  console.log(`\n=== TESTING PROFILE: ${profileId} ===\n`);
  
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  const headers = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  
  // Build header map
  const hdr = {};
  headers.forEach((header, index) => {
    if (header) hdr[header] = index + 1;
  });
  
  // Generate test data
  const data = generateTestData({ ProfileID: profileId, ...testData });
  
  // Create row data array
  const rowData = new Array(headers.length);
  headers.forEach((header, index) => {
    if (data[header] !== undefined) {
      rowData[index] = data[header];
    }
  });
  
  try {
    // Run profile helper
    const helper = profileHelpers[profileId];
    if (!helper) {
      console.log(`❌ No helper found for profile: ${profileId}`);
      return;
    }
    
    const result = helper(rowData, hdr);
    
    // Display results
    console.log('Vehicle Orders by Domain:\n');
    
    ['Education', 'Health', 'Retirement'].forEach(domain => {
      console.log(`${domain}:`);
      result.vehicleOrders[domain].forEach(vehicle => {
        const cap = vehicle.capMonthly === Infinity ? 'Unlimited' : `$${Math.round(vehicle.capMonthly)}/mo`;
        console.log(`  - ${vehicle.name}: ${cap}`);
      });
      console.log('');
    });
    
    console.log('✅ Profile helper executed successfully');
    
  } catch (error) {
    console.error(`❌ Error testing profile ${profileId}:`, error.message);
    console.log(error.stack);
  }
}

/**
 * Test all profile helpers
 */
function testAllProfiles() {
  const profiles = Object.keys(profileHelpers);
  console.log(`\nTesting ${profiles.length} profiles...\n`);
  
  profiles.forEach(profileId => {
    testProfileHelper(profileId);
    console.log('\n' + '='.repeat(50) + '\n');
  });
}

// ============================================
// SECTION 3: COMPLETE SCENARIO TESTING
// ============================================

/**
 * Run a complete test with Phase 1 and Phase 2 data
 * Shows actual monthly contribution calculations
 */
function runCompleteScenarioTest(scenarioName = 'w2Employee') {
  console.log('\n' + '='.repeat(70));
  console.log(`COMPLETE SCENARIO TEST: ${scenarioName}`);
  console.log('='.repeat(70));
  
  const scenario = PROFILE_2_SCENARIOS[scenarioName];
  if (!scenario) {
    console.log(`❌ Unknown scenario: ${scenarioName}`);
    return;
  }
  
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  const headers = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  
  // Build header map
  const hdr = {};
  headers.forEach((header, index) => {
    if (header) hdr[header] = index + 1;
  });
  
  // Find or create test row
  const lastRow = ws.getLastRow();
  const testRow = lastRow + 1;
  
  // Write Phase 1 data
  console.log('\n📝 Setting up test data...');
  Object.entries(scenario.phase1).forEach(([key, value]) => {
    if (hdr[key]) {
      ws.getRange(testRow, hdr[key]).setValue(value);
    }
  });
  
  // Write Phase 2 data
  Object.entries(scenario.phase2).forEach(([key, value]) => {
    if (hdr[key]) {
      ws.getRange(testRow, hdr[key]).setValue(value);
    }
  });
  
  // Set timestamp
  ws.getRange(testRow, hdr['Timestamp']).setValue(new Date());
  
  // Calculate expected allocation
  const netMonthly = scenario.phase1.Net_Monthly_Income;
  const allocPercent = scenario.phase1.Allocation_Percentage;
  const expectedAllocation = netMonthly * (allocPercent / 100);
  
  console.log('\n📊 FINANCIAL INPUTS:');
  console.log(`  Gross Annual: $${scenario.phase1.gross_annual_income.toLocaleString()}`);
  console.log(`  Net Monthly: $${netMonthly.toLocaleString()}`);
  console.log(`  Allocation %: ${allocPercent}%`);
  console.log(`  Expected Monthly: $${Math.round(expectedAllocation).toLocaleString()}`);
  
  // Run profile helper
  console.log('\n🚀 RUNNING PROFILE HELPER...');
  const rowData = ws.getRange(testRow, 1, 1, ws.getLastColumn()).getValues()[0];
  
  try {
    const profileResult = profileHelpers[scenario.phase1.ProfileID](rowData, hdr);
    
    // Run universal engine
    console.log('\n⚙️  RUNNING UNIVERSAL ENGINE...');
    const engineResult = runUniversalEngine(testRow);
    
    // Show allocations
    console.log('\n💰 ACTUAL ALLOCATIONS:');
    let actualTotal = 0;
    
    Object.entries(engineResult.vehicles).forEach(([domain, vehicles]) => {
      console.log(`\n${domain}:`);
      let domainTotal = 0;
      Object.entries(vehicles).forEach(([vehicle, amount]) => {
        if (amount > 0) {
          console.log(`  - ${vehicle}: $${Math.round(amount)}/mo`);
          domainTotal += amount;
        }
      });
      actualTotal += domainTotal;
      console.log(`  Subtotal: $${Math.round(domainTotal)}/mo`);
    });
    
    // Summary
    console.log('\n📊 SUMMARY:');
    console.log(`  Expected: $${Math.round(expectedAllocation)}`);
    console.log(`  Actual: $${Math.round(actualTotal)}`);
    
    if (Math.abs(actualTotal - expectedAllocation) < 1) {
      console.log('  ✅ Allocation matches!');
    } else {
      console.log(`  ⚠️  Difference: $${Math.round(Math.abs(actualTotal - expectedAllocation))}`);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log(error.stack);
  }
  
  // Clean up
  console.log('\n🧹 Cleaning up...');
  ws.deleteRow(testRow);
  console.log('✅ Test complete!');
}

// ============================================
// SECTION 4: ENGINE DIAGNOSTICS
// ============================================

/**
 * Test the universal engine directly
 */
function testUniversalEngine(rowNum = null) {
  console.log('\n=== UNIVERSAL ENGINE DIAGNOSTIC ===\n');
  
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  
  // Find test row if not provided
  if (!rowNum) {
    const headers = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
    const profileIdCol = headers.indexOf('ProfileID') + 1;
    
    for (let i = 3; i <= ws.getLastRow(); i++) {
      if (ws.getRange(i, profileIdCol).getValue() === '2_ROBS_Curious') {
        rowNum = i;
        console.log(`Found Profile 2 at row ${i}`);
        break;
      }
    }
  }
  
  if (!rowNum) {
    console.log('❌ No test row found');
    return;
  }
  
  console.log('Running universal engine...');
  try {
    const results = runUniversalEngine(rowNum);
    console.log('✅ Engine ran successfully!');
    
    console.log('\nEngine Results:');
    console.log(`- Total monthly: $${results.totalMonthly || 'undefined'}`);
    
    Object.entries(results.vehicles).forEach(([domain, vehicles]) => {
      console.log(`\n${domain} Vehicles:`);
      Object.entries(vehicles).forEach(([vehicle, amount]) => {
        if (amount > 0) {
          console.log(`  ${vehicle}: $${Math.round(amount)}/mo`);
        }
      });
    });
    
    return results;
  } catch (error) {
    console.log('❌ ENGINE ERROR:', error.message);
    console.log(error.stack);
    return null;
  }
}

/**
 * Compare expected vs actual vehicles for a profile
 */
function diagnoseProfileIssues(profileId) {
  console.log(`\n=== DIAGNOSING ${profileId} ===\n`);
  
  // Run profile helper
  const helperResult = testProfileHelper(profileId);
  
  // Run engine
  const engineResult = testUniversalEngine();
  
  // Compare results
  console.log('\n=== COMPARISON ===\n');
  // Add comparison logic here
}

// ============================================
// SECTION 5: VALIDATION UTILITIES
// ============================================

/**
 * Validate that all required headers exist
 */
function validateHeaders() {
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  const headers = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  
  const required = [
    'Timestamp', 'Full_Name', 'Email', 'Student_ID_Last4',
    'Current_Age', 'ProfileID', 'Work_Situation',
    'gross_annual_income', 'Net_Monthly_Income', 'Allocation_Percentage',
    'hsa_eligibility', 'cesa_num_children',
    'ex_q1', 'ex_q2', 'ex_q3', 'ex_q4', 'ex_q5', 'ex_q6', 'ex_q7'
  ];
  
  const missing = [];
  required.forEach(header => {
    if (!headers.includes(header)) {
      missing.push(header);
    }
  });
  
  if (missing.length > 0) {
    console.log('❌ Missing headers:', missing.join(', '));
    return false;
  }
  
  console.log('✅ All required headers present');
  return true;
}

/**
 * Verify Working Sheet column structure
 */
function verifyWorkingSheetColumns() {
  console.log('\n=== VERIFYING WORKING SHEET COLUMNS ===\n');
  
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  const headers = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  
  console.log(`Total columns: ${headers.length}`);
  console.log('\nKey column positions:');
  
  const keyColumns = [
    'ProfileID', 'Work_Situation', 'Current_Age',
    'gross_annual_income', 'Net_Monthly_Income', 'Allocation_Percentage',
    'ex_q1', 'ex_q2', 'ex_q3', 'ex_q4', 'ex_q5', 'ex_q6', 'ex_q7'
  ];
  
  keyColumns.forEach(col => {
    const pos = headers.indexOf(col) + 1;
    if (pos > 0) {
      console.log(`  ${col}: Column ${pos}`);
    } else {
      console.log(`  ${col}: NOT FOUND ❌`);
    }
  });
}

// ============================================
// SECTION 6: TEST MENU AND RUNNERS
// ============================================

/**
 * Create a custom menu for easy test access
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🧪 Testing')
    .addItem('Test All Profiles', 'testAllProfiles')
    .addSeparator()
    .addItem('Test Profile 2 (W-2 Employee)', 'testProfile2W2')
    .addItem('Test Profile 2 (Self-Employed)', 'testProfile2Self')
    .addItem('Test Profile 2 (All Scenarios)', 'testProfile2All')
    .addSeparator()
    .addItem('Test Universal Engine', 'testUniversalEngine')
    .addItem('Verify Column Structure', 'verifyWorkingSheetColumns')
    .addItem('Validate Headers', 'validateHeaders')
    .addToUi();
}

// Quick test runners
function testProfile2W2() {
  runCompleteScenarioTest('w2Employee');
}

function testProfile2Self() {
  runCompleteScenarioTest('selfEmployed');
}

function testProfile2All() {
  Object.keys(PROFILE_2_SCENARIOS).forEach(scenario => {
    runCompleteScenarioTest(scenario);
    Utilities.sleep(2000);
  });
}

// Export commonly used functions for backward compatibility
function quickTest() {
  testProfile2W2();
}

/**
 * Main entry point for testing
 */
function runTests() {
  console.log('🧪 Retirement Blueprint Testing Framework');
  console.log('========================================\n');
  
  // Validate setup
  if (!validateHeaders()) {
    console.log('\n❌ Fix header issues before running tests');
    return;
  }
  
  // Show menu options
  console.log('Available tests:');
  console.log('1. testAllProfiles() - Test all profile helpers');
  console.log('2. testProfile2W2() - Test Profile 2 with W-2 scenario');
  console.log('3. testProfile2Self() - Test Profile 2 with self-employed');
  console.log('4. testUniversalEngine() - Test engine directly');
  console.log('5. verifyWorkingSheetColumns() - Check column structure');
  console.log('\nRun any function directly or use the Testing menu');
}
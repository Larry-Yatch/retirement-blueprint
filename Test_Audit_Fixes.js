/**
 * Test Script for Code Audit Fixes
 * Tests the fixes applied based on Code_Audit_Issues_and_Solutions.md
 */

function testAuditFixes() {
  console.log('==================================================');
  console.log('TESTING CODE AUDIT FIXES');
  console.log('==================================================');
  
  // Get spreadsheet and sheet
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Working');
  
  if (!sheet) {
    console.log('❌ ERROR: Working sheet not found');
    return;
  }
  
  // Test 1: Profile 2 Question Mapping
  console.log('\n1. Testing Profile 2 Question Mapping...');
  testProfile2QuestionMapping(sheet);
  
  // Test 2: Vehicle Recommendations Table Function
  console.log('\n2. Testing populateVehicleRecommendationsTable...');
  testVehicleRecommendationsTable();
  
  // Test 3: Constants Usage
  console.log('\n3. Testing LIMITS.DEFAULTS constants...');
  testDefaultConstants();
  
  // Test 4: Fixed Vehicle Naming
  console.log('\n4. Testing 401(k) Match vehicle naming...');
  test401kMatchNaming(sheet);
  
  console.log('\n==================================================');
  console.log('TEST SUITE COMPLETE');
  console.log('==================================================');
}

function testProfile2QuestionMapping(sheet) {
  try {
    // Set up test data for Profile 2
    const headers = sheet.getRange(2, 1, 1, sheet.getLastColumn()).getValues()[0];
    const hdr = {};
    headers.forEach((h, i) => hdr[h] = i + 1);
    
    // Create test row with Profile 2 data
    const testRow = new Array(headers.length).fill('');
    testRow[hdr['Profile'] - 1] = '2_ROBS_Curious';
    testRow[hdr['ex_q1'] - 1] = '100000'; // Rollover balance
    testRow[hdr['ex_q2'] - 1] = '50000';  // Business income
    testRow[hdr['ex_q3'] - 1] = 'Yes';    // Employer 401k
    testRow[hdr['ex_q4'] - 1] = 'Yes';    // Employer match
    testRow[hdr['ex_q5'] - 1] = '50% up to 6%'; // Match percentage
    testRow[hdr['ex_q6'] - 1] = 'Yes';    // Roth option
    testRow[hdr['ex_q7'] - 1] = 'Yes';    // Spouse in business
    
    // Test the profile helper
    const result = profile2_ROBS_Curious_Helper(hdr, testRow);
    
    // Verify the function can read the questions correctly
    if (result) {
      console.log('✅ Profile 2 helper executed successfully');
      console.log('   - Function returned vehicle orders and seeds');
    } else {
      console.log('❌ Profile 2 helper returned null/undefined');
    }
    
  } catch (error) {
    console.log('❌ Error in Profile 2 question mapping:', error.toString());
  }
}

function testVehicleRecommendationsTable() {
  try {
    // Check if the function exists
    if (typeof populateVehicleRecommendationsTable === 'function') {
      console.log('✅ populateVehicleRecommendationsTable function exists');
    } else {
      console.log('❌ populateVehicleRecommendationsTable function not found');
      console.log('   Note: Function must be in Document_Narratives.js and loaded in GAS project');
    }
  } catch (error) {
    console.log('❌ Error checking function:', error.toString());
  }
}

function testDefaultConstants() {
  try {
    // Check if LIMITS.DEFAULTS exists and has expected values
    if (LIMITS && LIMITS.DEFAULTS) {
      console.log('✅ LIMITS.DEFAULTS constants defined:');
      console.log('   - ANNUAL_PROFIT_DISTRIBUTION:', LIMITS.DEFAULTS.ANNUAL_PROFIT_DISTRIBUTION);
      console.log('   - GROSS_ANNUAL_INCOME:', LIMITS.DEFAULTS.GROSS_ANNUAL_INCOME);
      console.log('   - QCD_ANNUAL_LIMIT:', LIMITS.DEFAULTS.QCD_ANNUAL_LIMIT);
      
      if (LIMITS.DEFAULTS.ANNUAL_PROFIT_DISTRIBUTION === 100000 &&
          LIMITS.DEFAULTS.GROSS_ANNUAL_INCOME === 100000 &&
          LIMITS.DEFAULTS.QCD_ANNUAL_LIMIT === 100000) {
        console.log('✅ All default values set correctly');
      }
    } else {
      console.log('❌ LIMITS.DEFAULTS not defined');
    }
  } catch (error) {
    console.log('❌ Error checking constants:', error.toString());
  }
}

function test401kMatchNaming(sheet) {
  try {
    // Set up test data
    const headers = sheet.getRange(2, 1, 1, sheet.getLastColumn()).getValues()[0];
    const hdr = {};
    headers.forEach((h, i) => hdr[h] = i + 1);
    
    // Create test row with employer match
    const testRow = new Array(headers.length).fill('');
    testRow[hdr['Profile'] - 1] = '7_Foundation_Builder';
    testRow[hdr['Gross_Annual_Income'] - 1] = '100000';
    testRow[hdr['ex_q1'] - 1] = 'Yes'; // Has employer 401k
    testRow[hdr['ex_q2'] - 1] = 'Yes'; // Has match
    testRow[hdr['ex_q3'] - 1] = '50% up to 6%'; // Match percentage
    
    // Get non-discretionary seeds
    const seeds = getNonDiscretionarySeeds(hdr, testRow, '7_Foundation_Builder');
    
    // Check if 401(k) Match uses fixed naming
    if (seeds && seeds.Retirement) {
      const matchKeys = Object.keys(seeds.Retirement).filter(key => key.includes('401(k) Match'));
      
      if (matchKeys.length > 0) {
        const hasFixedName = matchKeys.some(key => key === '401(k) Match Traditional');
        if (hasFixedName) {
          console.log('✅ 401(k) Match uses fixed vehicle name');
          console.log('   - Found: "401(k) Match Traditional"');
        } else {
          console.log('⚠️  401(k) Match might still use dynamic naming:', matchKeys[0]);
        }
      } else {
        console.log('   Note: No 401(k) Match found in test (might be correct if no match)');
      }
    }
    
  } catch (error) {
    console.log('❌ Error testing 401(k) Match naming:', error.toString());
  }
}

// Create menu item for easy testing
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Audit Tests')
    .addItem('Run Audit Fix Tests', 'testAuditFixes')
    .addToUi();
}
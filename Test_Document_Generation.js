/**
 * Test Document Generation - Quick test for Phase 3
 */

function testDocumentGeneration() {
  Logger.log('=== TESTING DOCUMENT GENERATION ===');
  
  try {
    // Find a row with Phase 2 data
    const { sheet: ws, hdr } = initWS();
    let testRow = null;
    
    // Look for a row that has Phase 2 data (ideal values)
    for (let row = 3; row <= 20; row++) {
      const rowData = ws.getRange(row, 1, 1, ws.getLastColumn()).getValues()[0];
      const hasIdealData = rowData[hdr['retirement_traditional_401k_ideal']] || 
                          rowData[hdr['health_hsa_ideal']] ||
                          rowData[hdr['family_bank_ideal']];
      if (hasIdealData) {
        testRow = row;
        Logger.log(`Found test data in row ${row}`);
        break;
      }
    }
    
    if (!testRow) {
      // Create test data if none exists
      Logger.log('No existing data found. Creating test data...');
      testRow = createTestDataForDocGeneration();
    }
    
    // Test the safe generation
    Logger.log(`\nTesting safe document generation for row ${testRow}...`);
    const safeUrl = generateRetirementBlueprintSafe(testRow);
    Logger.log(`✅ Safe generation successful: ${safeUrl}`);
    
    // Test the complete generation
    Logger.log(`\nTesting complete document generation for row ${testRow}...`);
    const completeUrl = generateRetirementBlueprintComplete(testRow);
    Logger.log(`✅ Complete generation successful: ${completeUrl}`);
    
    Logger.log('\n=== DOCUMENT GENERATION TEST COMPLETE ===');
    
    return {
      success: true,
      safeUrl: safeUrl,
      completeUrl: completeUrl,
      row: testRow
    };
    
  } catch (error) {
    Logger.log(`❌ Document generation test failed: ${error.toString()}`);
    console.error(error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * Create test data for document generation
 */
function createTestDataForDocGeneration() {
  const { sheet: ws, hdr } = initWS();
  const lastRow = ws.getLastRow();
  const newRow = lastRow + 1;
  
  // Basic demographics
  ws.getRange(newRow, hdr['timestamp'] + 1).setValue(new Date());
  ws.getRange(newRow, hdr['Full_Name'] + 1).setValue('Document Test User');
  ws.getRange(newRow, hdr['Email'] + 1).setValue('test@example.com');
  ws.getRange(newRow, hdr['Student_ID_Last4'] + 1).setValue('TEST');
  ws.getRange(newRow, hdr['Current_Age'] + 1).setValue(35);
  ws.getRange(newRow, hdr['gross_annual_income'] + 1).setValue(85000);
  ws.getRange(newRow, hdr['Net_Monthly_Income'] + 1).setValue(5500);
  ws.getRange(newRow, hdr['Allocation_Percentage'] + 1).setValue(25);
  ws.getRange(newRow, hdr['ProfileID'] + 1).setValue('7_Foundation_Builder');
  
  // Phase 2 data
  ws.getRange(newRow, hdr['retirement_importance'] + 1).setValue(6);
  ws.getRange(newRow, hdr['education_importance'] + 1).setValue(4);
  ws.getRange(newRow, hdr['health_importance'] + 1).setValue(5);
  ws.getRange(newRow, hdr['investment_involvement'] + 1).setValue(4);
  ws.getRange(newRow, hdr['investment_time'] + 1).setValue(4);
  ws.getRange(newRow, hdr['investment_confidence'] + 1).setValue(4);
  
  // Some example allocations
  ws.getRange(newRow, hdr['retirement_traditional_401k_actual'] + 1).setValue(500);
  ws.getRange(newRow, hdr['retirement_traditional_401k_ideal'] + 1).setValue(800);
  ws.getRange(newRow, hdr['health_hsa_actual'] + 1).setValue(200);
  ws.getRange(newRow, hdr['health_hsa_ideal'] + 1).setValue(300);
  ws.getRange(newRow, hdr['family_bank_ideal'] + 1).setValue(275);
  
  // Future values
  ws.getRange(newRow, hdr['personalized_annual_rate'] + 1).setValue(0.12);
  ws.getRange(newRow, hdr['retirement_fv_actual'] + 1).setValue(500000);
  ws.getRange(newRow, hdr['retirement_fv_ideal'] + 1).setValue(850000);
  
  SpreadsheetApp.flush();
  return newRow;
}

/**
 * Menu function to test document generation
 */
function runDocumentGenerationTest() {
  const ui = SpreadsheetApp.getUi();
  
  ui.alert('Starting Document Generation Test', 
    'This will test both safe and complete document generation methods.\n\n' +
    'Check the Execution Log for detailed results.',
    ui.ButtonSet.OK);
  
  const result = testDocumentGeneration();
  
  if (result.success) {
    ui.alert('Test Successful!', 
      `Documents created successfully:\n\n` +
      `Safe URL: ${result.safeUrl}\n\n` +
      `Complete URL: ${result.completeUrl}\n\n` +
      `Test row: ${result.row}`,
      ui.ButtonSet.OK);
  } else {
    ui.alert('Test Failed', 
      `Error: ${result.error}\n\n` +
      `Check the Execution Log for details.`,
      ui.ButtonSet.OK);
  }
}

/**
 * Test specific profiles for document generation
 */
function testDocumentGenerationByProfile(profileId) {
  Logger.log(`\n=== Testing Document Generation for Profile ${profileId} ===`);
  
  const { sheet: ws, hdr } = initWS();
  let testRow = null;
  
  // Find a row with this profile
  for (let row = 3; row <= 30; row++) {
    const rowData = ws.getRange(row, 1, 1, ws.getLastColumn()).getValues()[0];
    if (rowData[hdr['ProfileID']] === profileId && rowData[hdr['family_bank_ideal']]) {
      testRow = row;
      break;
    }
  }
  
  if (testRow) {
    Logger.log(`Found ${profileId} in row ${testRow}`);
    try {
      const url = generateRetirementBlueprintComplete(testRow);
      Logger.log(`✅ Document generated: ${url}`);
      return true;
    } catch (error) {
      Logger.log(`❌ Failed: ${error.toString()}`);
      return false;
    }
  } else {
    Logger.log(`No test data found for profile ${profileId}`);
    return false;
  }
}

/**
 * Test all profiles
 */
function testAllProfileDocuments() {
  const profiles = [
    '1_ROBS_In_Use',
    '2_ROBS_Curious', 
    '3_Solo401k_Builder',
    '4_Roth_Reclaimer',
    '5_Bracket_Strategist',
    '6_Catch_Up',
    '7_Foundation_Builder',
    '8_Biz_Owner_Group',
    '9_Late_Stage_Growth'
  ];
  
  const results = {};
  profiles.forEach(profile => {
    results[profile] = testDocumentGenerationByProfile(profile);
  });
  
  Logger.log('\n=== PROFILE DOCUMENT TEST RESULTS ===');
  Object.entries(results).forEach(([profile, success]) => {
    Logger.log(`${profile}: ${success ? '✅ PASS' : '❌ FAIL'}`);
  });
}
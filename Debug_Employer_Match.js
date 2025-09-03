/**
 * Debug script for employer match visibility in documents
 * This script helps identify why employer match is written to columns but not appearing in documents
 */

function debugEmployerMatch(rowNum = 3) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName('Working Sheet');
  
  if (!ws) {
    Logger.log('❌ Working Sheet not found');
    return;
  }
  
  Logger.log('=' .repeat(60));
  Logger.log(`DEBUGGING EMPLOYER MATCH FOR ROW ${rowNum}`);
  Logger.log('='.repeat(60));
  
  // Step 1: Check header mapping
  Logger.log('\n📋 STEP 1: HEADER MAPPING CHECK');
  const headerRow = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  
  // Find match column indices
  const matchActualIndex = headerRow.indexOf('retirement_401k_match_traditional_actual');
  const matchIdealIndex = headerRow.indexOf('retirement_401k_match_traditional_ideal');
  
  Logger.log(`Match Actual Column: ${matchActualIndex + 1} (${matchActualIndex >= 0 ? 'Found' : 'NOT FOUND'})`);
  Logger.log(`Match Ideal Column: ${matchIdealIndex + 1} (${matchIdealIndex >= 0 ? 'Found' : 'NOT FOUND'})`);
  
  if (matchActualIndex < 0 || matchIdealIndex < 0) {
    Logger.log('❌ Match columns not found in headers!');
    Logger.log('Available headers with "match": ' + 
      headerRow.filter(h => h.toLowerCase().includes('match')).join(', '));
    return;
  }
  
  // Step 2: Check values in the columns
  Logger.log('\n💰 STEP 2: COLUMN VALUES CHECK');
  const rowData = ws.getRange(rowNum, 1, 1, ws.getLastColumn()).getValues()[0];
  
  const matchActualValue = rowData[matchActualIndex];
  const matchIdealValue = rowData[matchIdealIndex];
  
  Logger.log(`Match Actual Value: $${matchActualValue || 0}`);
  Logger.log(`Match Ideal Value: $${matchIdealValue || 0}`);
  
  // Step 3: Check profile and employer info
  Logger.log('\n👤 STEP 3: PROFILE & EMPLOYER INFO');
  const profileIdIndex = headerRow.indexOf('ProfileID');
  const profileId = rowData[profileIdIndex];
  Logger.log(`Profile: ${profileId}`);
  
  // Check Phase 2 employer questions based on profile
  const exQ3Index = headerRow.indexOf('ex_q3'); // Has 401k
  const exQ4Index = headerRow.indexOf('ex_q4'); // Has match
  const exQ5Index = headerRow.indexOf('ex_q5'); // Match percentage
  
  const has401k = rowData[exQ3Index];
  const hasMatch = rowData[exQ4Index];
  const matchPercent = rowData[exQ5Index];
  
  Logger.log(`Has 401k: ${has401k}`);
  Logger.log(`Has Match: ${hasMatch}`);
  Logger.log(`Match Percentage: ${matchPercent}%`);
  
  // Step 4: Calculate expected match
  Logger.log('\n📊 STEP 4: MATCH CALCULATION');
  const grossAnnualIndex = headerRow.indexOf('gross_annual_income');
  const grossAnnual = parseFloat(rowData[grossAnnualIndex]) || 0;
  
  if (hasMatch === 'Yes' && matchPercent > 0) {
    const expectedMonthlyMatch = (grossAnnual * (matchPercent / 100)) / 12;
    Logger.log(`Gross Annual: $${grossAnnual}`);
    Logger.log(`Expected Monthly Match: $${expectedMonthlyMatch.toFixed(2)}`);
    Logger.log(`Actual in Column: $${matchActualValue || 0}`);
    Logger.log(`Ideal in Column: $${matchIdealValue || 0}`);
    
    if (Math.abs(expectedMonthlyMatch - (matchIdealValue || 0)) > 1) {
      Logger.log('⚠️ WARNING: Calculated match differs from ideal column value!');
    }
  }
  
  // Step 5: Check document generation retrieval
  Logger.log('\n📄 STEP 5: DOCUMENT GENERATION CHECK');
  
  // Build header map like document generation does
  const hdr = {};
  headerRow.forEach((header, index) => {
    if (header) {
      hdr[header] = index;
    }
  });
  
  // Check if the match columns are in the header map
  Logger.log(`Header map has match actual: ${hdr['retirement_401k_match_traditional_actual'] !== undefined}`);
  Logger.log(`Header map has match ideal: ${hdr['retirement_401k_match_traditional_ideal'] !== undefined}`);
  
  // Simulate vehicle data retrieval like in Document_Narratives.js
  const vehicle = { 
    name: '401(k) Match Traditional', 
    actual: 'retirement_401k_match_traditional_actual', 
    ideal: 'retirement_401k_match_traditional_ideal' 
  };
  
  const actualValue = vehicle.actual && hdr[vehicle.actual] !== undefined ? 
    parseFloat(rowData[hdr[vehicle.actual]]) || 0 : 0;
  const idealValue = vehicle.ideal && hdr[vehicle.ideal] !== undefined ? 
    parseFloat(rowData[hdr[vehicle.ideal]]) || 0 : 0;
  
  Logger.log(`Document would retrieve:`);
  Logger.log(`  Actual: $${actualValue}`);
  Logger.log(`  Ideal: $${idealValue}`);
  Logger.log(`  Would show in document: ${actualValue > 0 || idealValue > 0 ? 'YES' : 'NO'}`);
  
  // Step 6: Check for common issues
  Logger.log('\n⚠️ STEP 6: COMMON ISSUES CHECK');
  
  if (!matchActualValue && !matchIdealValue) {
    Logger.log('❌ Both match values are empty/zero - allocation may not be writing correctly');
  }
  
  if (matchActualValue && !idealValue) {
    Logger.log('❌ Value in column but document retrieval gets 0 - header mapping issue');
  }
  
  if (typeof matchActualValue === 'string' && matchActualValue.includes('$')) {
    Logger.log('❌ Value stored as string with $ - parsing will fail');
  }
  
  if (matchActualValue === '#N/A' || matchIdealValue === '#N/A') {
    Logger.log('❌ Formula error in column');
  }
  
  // Step 7: Test fix suggestions
  Logger.log('\n✅ STEP 7: SUGGESTED FIXES');
  
  if (matchActualValue > 0 && actualValue === 0) {
    Logger.log('1. Header mapping issue - check exact column header spelling');
    Logger.log('2. Document generation may be looking for different header name');
  }
  
  if (!matchActualValue && hasMatch === 'Yes') {
    Logger.log('1. Allocation engine not writing match values');
    Logger.log('2. Check profile vehicle generation includes match');
    Logger.log('3. Verify actualMap and idealMap include match keys');
  }
  
  if (matchActualValue > 0 && idealValue > 0) {
    Logger.log('✅ Values are being retrieved correctly!');
    Logger.log('Check if document template has {{retirement_401k_match_traditional_actual}} placeholder');
    Logger.log('Check if vehicle table is being populated correctly');
  }
  
  Logger.log('\n' + '='.repeat(60));
  Logger.log('DEBUGGING COMPLETE');
  Logger.log('='.repeat(60));
}

/**
 * Test document retrieval specifically
 */
function testDocumentMatchRetrieval(rowNum = 3) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName('Working Sheet');
  
  Logger.log('\n📄 TESTING DOCUMENT RETRIEVAL FOR EMPLOYER MATCH');
  
  // Get header map exactly as document generation does
  const headerRow = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  const hdr = {};
  headerRow.forEach((header, index) => {
    if (header) {
      hdr[header] = index;
    }
  });
  
  // Get row data
  const rowData = ws.getRange(rowNum, 1, 1, ws.getLastColumn()).getValues()[0];
  
  // Define vehicle exactly as in Document_Narratives.js
  const matchVehicle = { 
    name: '401(k) Match Traditional', 
    actual: 'retirement_401k_match_traditional_actual', 
    ideal: 'retirement_401k_match_traditional_ideal' 
  };
  
  Logger.log(`\nVehicle Definition:`);
  Logger.log(`  Name: ${matchVehicle.name}`);
  Logger.log(`  Actual Key: ${matchVehicle.actual}`);
  Logger.log(`  Ideal Key: ${matchVehicle.ideal}`);
  
  Logger.log(`\nHeader Map Check:`);
  Logger.log(`  Has actual key: ${hdr[matchVehicle.actual] !== undefined}`);
  Logger.log(`  Actual index: ${hdr[matchVehicle.actual]}`);
  Logger.log(`  Has ideal key: ${hdr[matchVehicle.ideal] !== undefined}`);
  Logger.log(`  Ideal index: ${hdr[matchVehicle.ideal]}`);
  
  Logger.log(`\nRaw Values:`);
  Logger.log(`  Raw actual: ${rowData[hdr[matchVehicle.actual]]}`);
  Logger.log(`  Raw ideal: ${rowData[hdr[matchVehicle.ideal]]}`);
  
  // Retrieve exactly as document generation does
  const actualValue = matchVehicle.actual && hdr[matchVehicle.actual] !== undefined ? 
    parseFloat(rowData[hdr[matchVehicle.actual]]) || 0 : 0;
  const idealValue = matchVehicle.ideal && hdr[matchVehicle.ideal] !== undefined ? 
    parseFloat(rowData[hdr[matchVehicle.ideal]]) || 0 : 0;
  
  Logger.log(`\nParsed Values:`);
  Logger.log(`  Actual: $${actualValue}`);
  Logger.log(`  Ideal: $${idealValue}`);
  
  Logger.log(`\nWould Include in Document: ${actualValue > 0 || idealValue > 0 ? 'YES' : 'NO'}`);
  
  if (actualValue > 0 || idealValue > 0) {
    Logger.log(`\nVehicle Recommendation Object:`);
    Logger.log(`  {`);
    Logger.log(`    name: '${matchVehicle.name}',`);
    Logger.log(`    actual: ${actualValue},`);
    Logger.log(`    ideal: ${idealValue},`);
    Logger.log(`    difference: ${idealValue - actualValue}`);
    Logger.log(`  }`);
  }
}

/**
 * Fix employer match visibility
 */
function fixEmployerMatch(rowNum = 3) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName('Working Sheet');
  
  Logger.log('\n🔧 ATTEMPTING TO FIX EMPLOYER MATCH VISIBILITY');
  
  // Get headers
  const headerRow = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  
  // Find or create match columns
  let matchActualIndex = headerRow.indexOf('retirement_401k_match_traditional_actual');
  let matchIdealIndex = headerRow.indexOf('retirement_401k_match_traditional_ideal');
  
  if (matchActualIndex < 0) {
    Logger.log('❌ Match actual column not found - cannot fix');
    return;
  }
  
  if (matchIdealIndex < 0) {
    Logger.log('❌ Match ideal column not found - cannot fix');
    return;
  }
  
  // Get row data
  const rowData = ws.getRange(rowNum, 1, 1, ws.getLastColumn()).getValues()[0];
  
  // Check current values
  const currentActual = rowData[matchActualIndex];
  const currentIdeal = rowData[matchIdealIndex];
  
  Logger.log(`Current Actual: ${currentActual}`);
  Logger.log(`Current Ideal: ${currentIdeal}`);
  
  // If values exist, ensure they're numbers not strings
  if (currentActual || currentIdeal) {
    const numActual = parseFloat(String(currentActual).replace(/[$,]/g, '')) || 0;
    const numIdeal = parseFloat(String(currentIdeal).replace(/[$,]/g, '')) || 0;
    
    if (numActual !== currentActual || numIdeal !== currentIdeal) {
      Logger.log('Converting string values to numbers...');
      ws.getRange(rowNum, matchActualIndex + 1).setValue(numActual);
      ws.getRange(rowNum, matchIdealIndex + 1).setValue(numIdeal);
      Logger.log(`✅ Fixed: Actual=${numActual}, Ideal=${numIdeal}`);
    } else {
      Logger.log('✅ Values are already numeric');
    }
  } else {
    Logger.log('⚠️ No values to fix - need to run allocation engine first');
  }
}

// Menu function
function addDebugMenu() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🔍 Debug Employer Match')
    .addItem('Debug Current Row', 'debugCurrentRow')
    .addItem('Test Document Retrieval', 'testCurrentRowRetrieval')
    .addItem('Fix Match Values', 'fixCurrentRow')
    .addItem('Debug Row 3', 'debugRow3')
    .addToUi();
}

function debugCurrentRow() {
  const row = SpreadsheetApp.getActiveRange().getRow();
  debugEmployerMatch(row);
}

function testCurrentRowRetrieval() {
  const row = SpreadsheetApp.getActiveRange().getRow();
  testDocumentMatchRetrieval(row);
}

function fixCurrentRow() {
  const row = SpreadsheetApp.getActiveRange().getRow();
  fixEmployerMatch(row);
}

function debugRow3() {
  debugEmployerMatch(3);
  testDocumentMatchRetrieval(3);
}
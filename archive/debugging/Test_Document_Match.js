/**
 * Test document generation for employer match visibility
 */

function testDocumentMatchGeneration(rowNum = 38) {
  Logger.log('=' .repeat(60));
  Logger.log('TESTING DOCUMENT GENERATION FOR EMPLOYER MATCH');
  Logger.log('=' .repeat(60));
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName('Working Sheet');
  
  // Get header mapping
  const headerRow = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  const hdr = {};
  headerRow.forEach((header, index) => {
    if (header) {
      hdr[header] = index;
    }
  });
  
  // Get row data
  const rowData = ws.getRange(rowNum, 1, 1, ws.getLastColumn()).getValues()[0];
  
  Logger.log(`\n📊 Testing Row ${rowNum}`);
  Logger.log(`Profile: ${rowData[hdr['ProfileID']]}`);
  
  // Test the getVehicleRecommendations function
  Logger.log('\n📋 VEHICLE RECOMMENDATIONS:');
  
  // Define all vehicles exactly as in Document_Narratives.js
  const vehicleTypes = [
    { name: '401(k) Match Traditional', actual: 'retirement_401k_match_traditional_actual', ideal: 'retirement_401k_match_traditional_ideal' },
    { name: 'Traditional 401(k)', actual: 'retirement_traditional_401k_actual', ideal: 'retirement_traditional_401k_ideal' },
    { name: 'Roth IRA', actual: 'retirement_roth_ira_actual', ideal: 'retirement_roth_ira_ideal' },
    // Add other vehicles as needed
  ];
  
  const recommendations = [];
  
  vehicleTypes.forEach(vehicle => {
    const actualValue = vehicle.actual && hdr[vehicle.actual] !== undefined ? 
      parseFloat(rowData[hdr[vehicle.actual]]) || 0 : 0;
    const idealValue = vehicle.ideal && hdr[vehicle.ideal] !== undefined ? 
      parseFloat(rowData[hdr[vehicle.ideal]]) || 0 : 0;
    
    if (vehicle.name.includes('Match')) {
      Logger.log(`\n🎯 EMPLOYER MATCH CHECK:`);
      Logger.log(`  Vehicle: ${vehicle.name}`);
      Logger.log(`  Actual Column: ${vehicle.actual}`);
      Logger.log(`  Column Index: ${hdr[vehicle.actual]}`);
      Logger.log(`  Raw Value: ${rowData[hdr[vehicle.actual]]}`);
      Logger.log(`  Parsed Actual: $${actualValue}`);
      Logger.log(`  Ideal Column: ${vehicle.ideal}`);
      Logger.log(`  Column Index: ${hdr[vehicle.ideal]}`);
      Logger.log(`  Raw Value: ${rowData[hdr[vehicle.ideal]]}`);
      Logger.log(`  Parsed Ideal: $${idealValue}`);
      Logger.log(`  Will Include: ${actualValue > 0 || idealValue > 0 ? 'YES' : 'NO'}`);
    }
    
    if (actualValue > 0 || idealValue > 0) {
      recommendations.push({
        name: vehicle.name,
        actual: actualValue,
        ideal: idealValue,
        difference: idealValue - actualValue
      });
      
      Logger.log(`✅ Including: ${vehicle.name} - Actual: $${actualValue}, Ideal: $${idealValue}`);
    }
  });
  
  Logger.log(`\n📊 TOTAL VEHICLES TO SHOW: ${recommendations.length}`);
  recommendations.forEach((rec, i) => {
    Logger.log(`  ${i + 1}. ${rec.name}: $${rec.actual} / $${rec.ideal}`);
  });
  
  // Now test if we can create a simple document with the match
  Logger.log('\n📄 DOCUMENT CREATION TEST:');
  
  try {
    // Create a test document
    const doc = DocumentApp.create(`TEST Match Visibility - Row ${rowNum}`);
    const body = doc.getBody();
    
    body.appendParagraph('EMPLOYER MATCH TEST').setHeading(DocumentApp.ParagraphHeading.HEADING1);
    body.appendParagraph(`Testing row ${rowNum} - Profile: ${rowData[hdr['ProfileID']]}`);
    
    body.appendParagraph('\nVehicle Recommendations:').setHeading(DocumentApp.ParagraphHeading.HEADING2);
    
    // Create a simple table
    const table = body.appendTable();
    const headerRowTable = table.appendTableRow();
    headerRowTable.appendTableCell('Vehicle');
    headerRowTable.appendTableCell('Current');
    headerRowTable.appendTableCell('Recommended');
    headerRowTable.appendTableCell('Difference');
    
    recommendations.forEach(rec => {
      const row = table.appendTableRow();
      row.appendTableCell(rec.name);
      row.appendTableCell(`$${rec.actual}`);
      row.appendTableCell(`$${rec.ideal}`);
      row.appendTableCell(`$${rec.difference}`);
    });
    
    // Special section for employer match
    body.appendParagraph('\nEmployer Match Details:').setHeading(DocumentApp.ParagraphHeading.HEADING2);
    
    const matchActual = rowData[hdr['retirement_401k_match_traditional_actual']] || 0;
    const matchIdeal = rowData[hdr['retirement_401k_match_traditional_ideal']] || 0;
    
    body.appendParagraph(`Direct from columns:`);
    body.appendParagraph(`  Actual: $${matchActual}`);
    body.appendParagraph(`  Ideal: $${matchIdeal}`);
    
    doc.saveAndClose();
    
    const url = doc.getUrl();
    Logger.log(`✅ Test document created: ${url}`);
    
    // Also log to make it easy to find
    ws.getRange(rowNum, ws.getLastColumn() + 1).setValue(url);
    Logger.log(`URL saved to row ${rowNum}, last column + 1`);
    
  } catch (error) {
    Logger.log(`❌ Error creating document: ${error.toString()}`);
  }
  
  Logger.log('\n' + '=' .repeat(60));
  Logger.log('TEST COMPLETE');
  Logger.log('=' .repeat(60));
}

/**
 * Test the actual document generation function
 */
function testActualDocumentGeneration(rowNum = 38) {
  Logger.log('Testing actual document generation function...');
  
  // Check which function is being called
  if (typeof generateRetirementBlueprint === 'function') {
    Logger.log('✅ generateRetirementBlueprint function exists');
    
    // Try to generate
    try {
      generateRetirementBlueprint(rowNum);
      Logger.log('✅ Document generation completed');
    } catch (error) {
      Logger.log(`❌ Error in generation: ${error.toString()}`);
    }
  } else {
    Logger.log('❌ generateRetirementBlueprint function not found');
  }
  
  // Check if Document_Narratives functions exist
  if (typeof getVehicleRecommendations === 'function') {
    Logger.log('✅ getVehicleRecommendations function exists');
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const ws = ss.getSheetByName('Working Sheet');
    
    try {
      const recommendations = getVehicleRecommendations(ws, rowNum);
      Logger.log(`Found ${recommendations.length} recommendations`);
      
      // Check for employer match
      const hasMatch = recommendations.some(r => r.name.includes('Match'));
      Logger.log(hasMatch ? '✅ Employer match is in recommendations' : '❌ Employer match NOT in recommendations');
      
      if (hasMatch) {
        const match = recommendations.find(r => r.name.includes('Match'));
        Logger.log(`Match details: ${JSON.stringify(match)}`);
      }
    } catch (error) {
      Logger.log(`❌ Error getting recommendations: ${error.toString()}`);
    }
  } else {
    Logger.log('❌ getVehicleRecommendations function not found');
  }
}

/**
 * Quick test for row 38
 */
function testRow38Document() {
  testDocumentMatchGeneration(38);
  testActualDocumentGeneration(38);
}
/**
 * Debug to check which functions are available and what they return
 */

function checkDocumentFunctions() {
  Logger.log('='.repeat(60));
  Logger.log('CHECKING DOCUMENT GENERATION FUNCTIONS');
  Logger.log('='.repeat(60));
  
  // Check which functions exist
  Logger.log('\n📋 FUNCTION AVAILABILITY:');
  Logger.log(`formatVehicleRecommendations exists: ${typeof formatVehicleRecommendations === 'function'}`);
  Logger.log(`populateVehicleRecommendationsTable exists: ${typeof populateVehicleRecommendationsTable === 'function'}`);
  Logger.log(`generateSafeDocument exists: ${typeof generateSafeDocument === 'function'}`);
  Logger.log(`generateDocumentBranded exists: ${typeof generateDocumentBranded === 'function'}`);
  
  // Test formatVehicleRecommendations with row 38
  if (typeof formatVehicleRecommendations === 'function') {
    Logger.log('\n📊 TESTING formatVehicleRecommendations for row 38:');
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const ws = ss.getSheetByName('Working Sheet');
    
    // Get headers
    const headerRow = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
    const hdr = {};
    headerRow.forEach((header, index) => {
      if (header) {
        hdr[header] = index;
      }
    });
    
    // Get row data
    const rowData = ws.getRange(38, 1, 1, ws.getLastColumn()).getValues()[0];
    
    // Call the function
    try {
      const recommendations = formatVehicleRecommendations(rowData, hdr);
      Logger.log(`✅ Function returned ${recommendations.length} recommendations`);
      
      // Check for employer match
      const hasMatch = recommendations.some(r => r.name && r.name.includes('Match'));
      
      if (hasMatch) {
        Logger.log('✅ EMPLOYER MATCH FOUND IN RECOMMENDATIONS');
        const match = recommendations.find(r => r.name && r.name.includes('Match'));
        Logger.log(`  Name: ${match.name}`);
        Logger.log(`  Actual: $${match.actual}`);
        Logger.log(`  Ideal: $${match.ideal}`);
        Logger.log(`  Difference: $${match.difference}`);
      } else {
        Logger.log('❌ EMPLOYER MATCH NOT IN RECOMMENDATIONS');
        Logger.log('All recommendations:');
        recommendations.forEach((r, i) => {
          Logger.log(`  ${i+1}. ${r.name}: $${r.actual} / $${r.ideal}`);
        });
      }
      
      // Check raw column values for comparison
      Logger.log('\n🔍 RAW COLUMN VALUES:');
      const matchActual = rowData[hdr['retirement_401k_match_traditional_actual']];
      const matchIdeal = rowData[hdr['retirement_401k_match_traditional_ideal']];
      Logger.log(`  retirement_401k_match_traditional_actual: ${matchActual}`);
      Logger.log(`  retirement_401k_match_traditional_ideal: ${matchIdeal}`);
      
    } catch (error) {
      Logger.log(`❌ Error calling function: ${error.toString()}`);
    }
  }
  
  Logger.log('\n' + '='.repeat(60));
  Logger.log('CHECK COMPLETE');
  Logger.log('='.repeat(60));
}

/**
 * Direct test of the vehicle list in Document_Narratives
 */
function testVehicleListDirectly() {
  Logger.log('Testing vehicle list directly...');
  
  // Define the exact list from Document_Narratives.js line 577
  const testVehicle = { 
    name: '401(k) Match Traditional', 
    actual: 'retirement_401k_match_traditional_actual', 
    ideal: 'retirement_401k_match_traditional_ideal' 
  };
  
  Logger.log(`Vehicle definition: ${JSON.stringify(testVehicle)}`);
  
  // Now test with actual data
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName('Working Sheet');
  const headerRow = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  
  const matchActualCol = headerRow.indexOf('retirement_401k_match_traditional_actual');
  const matchIdealCol = headerRow.indexOf('retirement_401k_match_traditional_ideal');
  
  Logger.log(`Column indices: Actual=${matchActualCol}, Ideal=${matchIdealCol}`);
  
  if (matchActualCol >= 0 && matchIdealCol >= 0) {
    const rowData = ws.getRange(38, 1, 1, ws.getLastColumn()).getValues()[0];
    Logger.log(`Row 38 values: Actual=${rowData[matchActualCol]}, Ideal=${rowData[matchIdealCol]}`);
  }
}
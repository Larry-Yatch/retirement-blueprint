/**
 * Debug the table population for employer match
 */

function debugTablePopulation() {
  Logger.log('='.repeat(60));
  Logger.log('DEBUGGING TABLE POPULATION');
  Logger.log('='.repeat(60));
  
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
  
  // Get row 38 data
  const rowData = ws.getRange(38, 1, 1, ws.getLastColumn()).getValues()[0];
  
  // Get recommendations using the actual function
  const recommendations = formatVehicleRecommendations(rowData, hdr);
  
  Logger.log(`\n📊 Recommendations before table population:`);
  Logger.log(`Total: ${recommendations.length}`);
  recommendations.forEach((rec, i) => {
    Logger.log(`  ${i+1}. ${rec.name}: $${rec.actual} / $${rec.ideal}`);
  });
  
  // Check if populateVehicleRecommendationsTable modifies the list
  Logger.log('\n📋 Testing table population:');
  
  // Create a test document to see what gets into the table
  try {
    const testDoc = DocumentApp.create('DEBUG Table Population Test');
    const body = testDoc.getBody();
    
    body.appendParagraph('Vehicle Recommendations Table Test');
    
    // Create table exactly as in document generation
    const table = body.appendTable();
    
    // Call the actual populate function
    populateVehicleRecommendationsTable(table, recommendations);
    
    // Count rows in table
    const numRows = table.getNumRows();
    Logger.log(`✅ Table created with ${numRows} rows`);
    
    // Check if match is in table
    let matchFound = false;
    for (let i = 0; i < numRows; i++) {
      const row = table.getRow(i);
      if (row.getNumCells() > 0) {
        const firstCell = row.getCell(0).getText();
        if (firstCell.includes('Match')) {
          matchFound = true;
          Logger.log(`✅ MATCH FOUND IN TABLE at row ${i}: ${firstCell}`);
        }
      }
    }
    
    if (!matchFound) {
      Logger.log('❌ MATCH NOT FOUND IN TABLE');
      Logger.log('Table contents:');
      for (let i = 0; i < Math.min(numRows, 10); i++) {
        const row = table.getRow(i);
        if (row.getNumCells() > 0) {
          Logger.log(`  Row ${i}: ${row.getCell(0).getText()}`);
        }
      }
    }
    
    testDoc.saveAndClose();
    Logger.log(`\nTest document: ${testDoc.getUrl()}`);
    
  } catch (error) {
    Logger.log(`❌ Error creating test table: ${error.toString()}`);
  }
  
  Logger.log('\n' + '='.repeat(60));
  Logger.log('DEBUG COMPLETE');
  Logger.log('='.repeat(60));
}

/**
 * Check the populateVehicleRecommendationsTable function
 */
function checkTableFunction() {
  Logger.log('Checking populateVehicleRecommendationsTable implementation...');
  
  // Create test data
  const testRecommendations = [
    { name: '401(k) Match Traditional', actual: 500, ideal: 1000, difference: 500 },
    { name: 'Traditional 401(k)', actual: 5000, ideal: 0, difference: -5000 },
    { name: 'Roth IRA', actual: 0, ideal: 500, difference: 500 }
  ];
  
  Logger.log(`Test data: ${JSON.stringify(testRecommendations)}`);
  
  try {
    const doc = DocumentApp.create('Table Function Test');
    const table = doc.getBody().appendTable();
    
    populateVehicleRecommendationsTable(table, testRecommendations);
    
    Logger.log('✅ Function executed without error');
    
    // Check table contents
    const numRows = table.getNumRows();
    Logger.log(`Table has ${numRows} rows`);
    
    for (let i = 0; i < numRows; i++) {
      const row = table.getRow(i);
      const cells = [];
      for (let j = 0; j < row.getNumCells(); j++) {
        cells.push(row.getCell(j).getText());
      }
      Logger.log(`Row ${i}: ${cells.join(' | ')}`);
    }
    
    doc.saveAndClose();
    Logger.log(`Document: ${doc.getUrl()}`);
    
  } catch (error) {
    Logger.log(`❌ Error: ${error.toString()}`);
  }
}
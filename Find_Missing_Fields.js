/**
 * Find what fields are causing equal domain splits
 */

function findMissingDomainFields() {
  console.log('\n' + '='.repeat(80));
  console.log('FINDING MISSING DOMAIN WEIGHT FIELDS');
  console.log('='.repeat(80));
  
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  const headers = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  
  // Build header map
  const hdr = {};
  headers.forEach((header, index) => {
    if (header) hdr[header] = index + 1;
  });
  
  // Check what HEADERS constants we need
  console.log('\n1️⃣ CHECKING REQUIRED HEADERS FOR DOMAIN WEIGHTS:');
  
  const requiredHeaders = [
    'P2_RETIREMENT_IMPORTANCE',
    'P2_EDUCATION_IMPORTANCE', 
    'P2_HEALTH_IMPORTANCE',
    'P2_RETIREMENT_YEARS',
    'P2_CESA_YEARS_UNTIL_FIRST',
    'P2_HSA_YEARS_UNTIL_NEED',
    'P2_INV_INVOLVEMENT',
    'P2_INV_TIME',
    'P2_INV_CONFIDENCE'
  ];
  
  // Check what these map to
  requiredHeaders.forEach(headerKey => {
    const actualHeader = HEADERS[headerKey];
    console.log(`\n${headerKey}:`);
    console.log(`  Maps to: "${actualHeader}"`);
    
    if (actualHeader && hdr[actualHeader]) {
      console.log(`  ✅ Found at column ${hdr[actualHeader]}`);
    } else {
      console.log(`  ❌ NOT FOUND in Working Sheet!`);
    }
  });
  
  // Look for importance-related columns
  console.log('\n\n2️⃣ SEARCHING FOR IMPORTANCE/PRIORITY COLUMNS:');
  headers.forEach((header, index) => {
    if (header && (
      header.toLowerCase().includes('importance') ||
      header.toLowerCase().includes('priority') ||
      header.toLowerCase().includes('years') ||
      header.toLowerCase().includes('retirement') ||
      header.toLowerCase().includes('education') ||
      header.toLowerCase().includes('health')
    )) {
      console.log(`  Column ${index + 1}: "${header}"`);
    }
  });
  
  // Check a real Profile 7 row
  console.log('\n\n3️⃣ CHECKING REAL PROFILE 7 ROW:');
  const profileCol = headers.indexOf('ProfileID') + 1;
  
  for (let i = 3; i <= Math.min(ws.getLastRow(), 10); i++) {
    const profileId = ws.getRange(i, profileCol).getValue();
    if (profileId === '7_Foundation_Builder') {
      console.log(`Found Profile 7 at row ${i}`);
      
      // Check key values
      const rowData = ws.getRange(i, 1, 1, ws.getLastColumn()).getValues()[0];
      
      // Try to get importance scores
      const retImportance = getValue(hdr, rowData, 'retirement_importance');
      const eduImportance = getValue(hdr, rowData, 'education_importance');
      const healthImportance = getValue(hdr, rowData, 'health_importance');
      
      console.log('\nImportance scores:');
      console.log(`  Retirement: ${retImportance || 'NOT FOUND'}`);
      console.log(`  Education: ${eduImportance || 'NOT FOUND'}`);
      console.log(`  Health: ${healthImportance || 'NOT FOUND'}`);
      
      break;
    }
  }
}

// Quick test with all fields
function testWithAllDomainFields() {
  console.log('\n' + '='.repeat(80));
  console.log('TESTING WITH ALL DOMAIN FIELDS');
  console.log('='.repeat(80));
  
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  const headers = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  const hdr = {};
  headers.forEach((header, index) => {
    if (header) hdr[header] = index + 1;
  });
  
  // Complete test data including importance scores
  const testData = {
    'Full_Name': 'Complete Domain Test',
    'ProfileID': '7_Foundation_Builder',
    'Net_Monthly_Income': 5000,
    'Allocation_Percentage': 20,
    
    // Investment scoring
    'investment_involvement': 5,
    'investment_time': 5,
    'investment_confidence': 5,
    
    // Domain importance scores (1-7)
    'retirement_importance': 6,  // High importance
    'education_importance': 3,   // Low importance (no kids)
    'health_importance': 5,      // Medium-high importance
    
    // Years until need
    'retirement_years': 30,      // 30 years to retirement
    'education_years_until_first': 18,  // N/A but set anyway
    'hsa_years_until_need': 20,  // 20 years until major health needs
    
    // Other required fields
    'Current_Age': 35,
    'Work_Situation': 'W-2 employee',
    'gross_annual_income': 75000,
    'filing_status': 'Single',
    'Tax_Minimization': 'Both',
    'hsa_eligibility': 'Yes',
    'cesa_num_children': 0,
    
    // 401k data
    'ex_q1': 'Yes',
    'ex_q2': 'Yes', 
    'ex_q3': '100% up to 3%',
    'ex_q4': 'Yes'
  };
  
  // Write test row
  const testRow = ws.getLastRow() + 1;
  console.log('Writing test data to row', testRow);
  
  let missingColumns = [];
  Object.entries(testData).forEach(([key, value]) => {
    if (hdr[key]) {
      ws.getRange(testRow, hdr[key]).setValue(value);
    } else {
      missingColumns.push(key);
    }
  });
  
  if (missingColumns.length > 0) {
    console.log('\n❌ Missing columns:', missingColumns.join(', '));
  }
  
  // Run engine and check
  console.log('\nRunning engine...');
  const result = runUniversalEngine(testRow);
  
  console.log('\nResults:');
  Object.entries(result.vehicles).forEach(([domain, vehicles]) => {
    console.log(`\n${domain}:`);
    let domainTotal = 0;
    Object.entries(vehicles).forEach(([vehicle, amount]) => {
      if (amount > 0) {
        console.log(`  - ${vehicle}: $${amount}/mo`);
        domainTotal += amount;
      }
    });
    console.log(`  Total: $${domainTotal}/mo`);
  });
  
  // Clean up
  ws.deleteRow(testRow);
}
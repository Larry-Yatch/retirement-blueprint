/**
 * Debug script to figure out why Profile 7 401(k) vehicles aren't allocating
 */

function debugProfile7Issue() {
  console.log('\n' + '='.repeat(80));
  console.log('DEBUGGING PROFILE 7 401(k) ALLOCATION ISSUE');
  console.log('='.repeat(80));
  
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  const headers = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  
  // Build header map
  const hdr = {};
  headers.forEach((header, index) => {
    if (header) hdr[header] = index + 1;
  });
  
  // Check if ex_q columns exist
  console.log('\n1️⃣ CHECKING EX_Q COLUMNS IN WORKING SHEET:');
  const exQColumns = ['ex_q1', 'ex_q2', 'ex_q3', 'ex_q4', 'ex_q5', 'ex_q6', 'ex_q7'];
  exQColumns.forEach(col => {
    const exists = hdr[col] ? 'YES' : 'NO';
    const position = hdr[col] || 'N/A';
    console.log(`  ${col}: ${exists} (column ${position})`);
  });
  
  // Create minimal test data
  const testData = {
    'Timestamp': new Date(),
    'Full_Name': 'Debug Test',
    'Email': 'debug@test.com',
    'Student_ID_Last4': '9999',
    'Current_Age': 30,
    'ProfileID': '7_Foundation_Builder',
    'Work_Situation': 'W-2 employee',
    'gross_annual_income': 75000,
    'filing_status': 'Single',
    'Tax_Minimization': 'Both',
    'hsa_eligibility': 'Yes',
    'cesa_num_children': 0,
    'Net_Monthly_Income': 5000,
    'Allocation_Percentage': 20,
    'ex_q1': 'Yes',          // Has employer 401k
    'ex_q2': 'Yes',          // Has match
    'ex_q3': '100% up to 3%', // Match percentage
    'ex_q4': 'Yes'           // Has Roth 401k option
  };
  
  // Write test row
  const testRow = ws.getLastRow() + 1;
  console.log('\n2️⃣ WRITING TEST DATA TO ROW', testRow);
  
  Object.entries(testData).forEach(([key, value]) => {
    if (hdr[key]) {
      ws.getRange(testRow, hdr[key]).setValue(value);
      if (key.startsWith('ex_q')) {
        console.log(`  Wrote ${key} = "${value}" to column ${hdr[key]}`);
      }
    }
  });
  
  // Read back the row data
  const rowData = ws.getRange(testRow, 1, 1, ws.getLastColumn()).getValues()[0];
  
  console.log('\n3️⃣ READING BACK EX_Q VALUES:');
  exQColumns.forEach(col => {
    if (hdr[col]) {
      const value = rowData[hdr[col] - 1];
      console.log(`  ${col} (col ${hdr[col]}): "${value}"`);
    }
  });
  
  // Check what getValue returns
  console.log('\n4️⃣ TESTING getValue FUNCTION:');
  const ex_q1_value = getValue(hdr, rowData, 'ex_q1');
  const ex_q2_value = getValue(hdr, rowData, 'ex_q2');
  const ex_q3_value = getValue(hdr, rowData, 'ex_q3');
  const ex_q4_value = getValue(hdr, rowData, 'ex_q4');
  
  console.log(`  getValue for ex_q1: "${ex_q1_value}"`);
  console.log(`  getValue for ex_q2: "${ex_q2_value}"`);
  console.log(`  getValue for ex_q3: "${ex_q3_value}"`);
  console.log(`  getValue for ex_q4: "${ex_q4_value}"`);
  
  // Run profile helper
  console.log('\n5️⃣ RUNNING PROFILE HELPER:');
  try {
    const result = profileHelpers['7_Foundation_Builder'](rowData, hdr);
    
    console.log('\nGenerated Retirement Vehicles:');
    let has401k = false;
    result.vehicleOrders.Retirement.forEach(v => {
      console.log(`  - ${v.name}: ${v.capMonthly === Infinity ? 'Unlimited' : '$' + Math.round(v.capMonthly) + '/mo'}`);
      if (v.name.includes('401(k)')) has401k = true;
    });
    
    console.log(`\n401(k) vehicles generated: ${has401k ? '✅ YES' : '❌ NO'}`);
    
    // Check if addEmployer401kVehicles is being called
    console.log('\n6️⃣ CHECKING addEmployer401kVehicles FUNCTION:');
    
    // Test the function directly
    const testOrder = [{ name: 'Test Vehicle', capMonthly: 100 }];
    const updatedOrder = addEmployer401kVehicles(testOrder, {
      rowArr: rowData,
      hdr: hdr,
      age: 30,
      grossIncome: 75000
    });
    
    console.log('  Original order length:', testOrder.length);
    console.log('  Updated order length:', updatedOrder.length);
    console.log('  Vehicles added:', updatedOrder.length - testOrder.length);
    
  } catch (error) {
    console.error('❌ Error in profile helper:', error.message);
    console.log(error.stack);
  }
  
  // Check HEADERS constant
  console.log('\n7️⃣ CHECKING HEADERS CONSTANTS:');
  console.log(`  HEADERS.P2_EX_Q1: "${HEADERS.P2_EX_Q1}"`);
  console.log(`  HEADERS.P2_EX_Q2: "${HEADERS.P2_EX_Q2}"`);
  console.log(`  HEADERS.P2_EX_Q3: "${HEADERS.P2_EX_Q3}"`);
  console.log(`  HEADERS.P2_EX_Q4: "${HEADERS.P2_EX_Q4}"`);
  
  // Clean up
  console.log('\n🧹 Cleaning up test row...');
  ws.deleteRow(testRow);
  
  console.log('\n' + '='.repeat(80));
  console.log('DEBUG COMPLETE - Check results above');
  console.log('='.repeat(80));
}

// Additional focused test
function testAddEmployer401kDirectly() {
  console.log('\n' + '='.repeat(80));
  console.log('TESTING addEmployer401kVehicles DIRECTLY');
  console.log('='.repeat(80));
  
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  const headers = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  
  // Build header map
  const hdr = {};
  headers.forEach((header, index) => {
    if (header) hdr[header] = index + 1;
  });
  
  // Create a fake row with 401k data
  const fakeRow = new Array(headers.length).fill('');
  
  // Set values at correct positions
  fakeRow[hdr['ex_q1'] - 1] = 'Yes';  // Has 401k
  fakeRow[hdr['ex_q2'] - 1] = 'Yes';  // Has match
  fakeRow[hdr['ex_q3'] - 1] = '100% up to 3%';  // Match details
  fakeRow[hdr['ex_q4'] - 1] = 'Yes';  // Has Roth option
  
  console.log('Test row data:');
  console.log(`  ex_q1 (col ${hdr['ex_q1']}): "${fakeRow[hdr['ex_q1'] - 1]}"`);
  console.log(`  ex_q2 (col ${hdr['ex_q2']}): "${fakeRow[hdr['ex_q2'] - 1]}"`);
  console.log(`  ex_q3 (col ${hdr['ex_q3']}): "${fakeRow[hdr['ex_q3'] - 1]}"`);
  console.log(`  ex_q4 (col ${hdr['ex_q4']}): "${fakeRow[hdr['ex_q4'] - 1]}"`);
  
  // Test the function
  const baseOrder = [];
  const result = addEmployer401kVehicles(baseOrder, {
    rowArr: fakeRow,
    hdr: hdr,
    age: 30,
    grossIncome: 75000
  });
  
  console.log('\nResult:');
  console.log('  Vehicles added:', result.length);
  result.forEach(v => {
    console.log(`  - ${v.name}: $${Math.round(v.capMonthly)}/mo`);
  });
}

// Menu entry
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🐛 Debug Profile 7')
    .addItem('Debug 401(k) Issue', 'debugProfile7Issue')
    .addItem('Test addEmployer401k Directly', 'testAddEmployer401kDirectly')
    .addToUi();
}
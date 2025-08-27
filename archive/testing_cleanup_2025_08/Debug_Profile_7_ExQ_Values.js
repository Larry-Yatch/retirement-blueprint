/**
 * Debug ex_q values for Profile 7
 */

function debugProfile7ExQValues() {
  console.log('\n' + '='.repeat(80));
  console.log('DEBUGGING PROFILE 7 EX_Q VALUES');
  console.log('='.repeat(80));
  
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  const headers = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  
  // Build header map
  const hdr = {};
  headers.forEach((header, index) => {
    if (header) hdr[header] = index + 1;
  });
  
  // Check what ex_q columns exist
  console.log('\n1️⃣ CHECKING EX_Q COLUMNS IN WORKING SHEET:');
  for (let i = 1; i <= 7; i++) {
    const colName = `ex_q${i}`;
    const exists = hdr[colName] !== undefined;
    console.log(`  ${colName}: ${exists ? '✅ Column ' + hdr[colName] : '❌ NOT FOUND'}`);
  }
  
  // Check HEADERS constants
  console.log('\n2️⃣ CHECKING HEADERS CONSTANTS:');
  console.log(`  P2_EX_Q1 = "${HEADERS.P2_EX_Q1}" (should be "ex_q1")`);
  console.log(`  P2_EX_Q2 = "${HEADERS.P2_EX_Q2}" (should be "ex_q2")`);
  console.log(`  P2_EX_Q3 = "${HEADERS.P2_EX_Q3}" (should be "ex_q3")`);
  console.log(`  P2_EX_Q4 = "${HEADERS.P2_EX_Q4}" (should be "ex_q4")`);
  
  // Write a test row with explicit values
  console.log('\n3️⃣ WRITING TEST ROW WITH EXPLICIT EX_Q VALUES:');
  const testRow = ws.getLastRow() + 1;
  
  // Write directly to ex_q columns
  if (hdr.ex_q1) ws.getRange(testRow, hdr.ex_q1).setValue('Yes');
  if (hdr.ex_q2) ws.getRange(testRow, hdr.ex_q2).setValue('Yes');
  if (hdr.ex_q3) ws.getRange(testRow, hdr.ex_q3).setValue('100% up to 3%');
  if (hdr.ex_q4) ws.getRange(testRow, hdr.ex_q4).setValue('Yes');
  
  // Set other required fields
  ws.getRange(testRow, hdr.ProfileID).setValue('7_Foundation_Builder');
  ws.getRange(testRow, hdr.Current_Age).setValue(25);
  ws.getRange(testRow, hdr.gross_annual_income).setValue(65000);
  
  // Read back the values
  console.log('\n4️⃣ READING BACK EX_Q VALUES:');
  const rowData = ws.getRange(testRow, 1, 1, ws.getLastColumn()).getValues()[0];
  
  console.log('Direct column reads:');
  if (hdr.ex_q1) console.log(`  ex_q1 (col ${hdr.ex_q1}): "${rowData[hdr.ex_q1 - 1]}"`);
  if (hdr.ex_q2) console.log(`  ex_q2 (col ${hdr.ex_q2}): "${rowData[hdr.ex_q2 - 1]}"`);
  if (hdr.ex_q3) console.log(`  ex_q3 (col ${hdr.ex_q3}): "${rowData[hdr.ex_q3 - 1]}"`);
  if (hdr.ex_q4) console.log(`  ex_q4 (col ${hdr.ex_q4}): "${rowData[hdr.ex_q4 - 1]}"`);
  
  console.log('\nUsing getValue with HEADERS:');
  console.log(`  P2_EX_Q1: "${getValue(hdr, rowData, HEADERS.P2_EX_Q1)}"`);
  console.log(`  P2_EX_Q2: "${getValue(hdr, rowData, HEADERS.P2_EX_Q2)}"`);
  console.log(`  P2_EX_Q3: "${getValue(hdr, rowData, HEADERS.P2_EX_Q3)}"`);
  console.log(`  P2_EX_Q4: "${getValue(hdr, rowData, HEADERS.P2_EX_Q4)}"`);
  
  // Test addEmployer401kVehicles directly
  console.log('\n5️⃣ TESTING addEmployer401kVehicles DIRECTLY:');
  const baseOrder = [
    { name: 'Roth IRA', capMonthly: 583.33 },
    { name: 'Traditional IRA', capMonthly: 583.33 }
  ];
  
  const updatedOrder = addEmployer401kVehicles(baseOrder, {
    rowArr: rowData,
    hdr: hdr,
    age: 25,
    grossIncome: 65000
  });
  
  console.log('\nBase order:');
  baseOrder.forEach(v => console.log(`  - ${v.name}`));
  
  console.log('\nUpdated order:');
  updatedOrder.forEach(v => console.log(`  - ${v.name}`));
  
  console.log(`\n401(k) vehicles added: ${updatedOrder.length > baseOrder.length ? '✅ YES' : '❌ NO'}`);
  
  // Clean up
  ws.deleteRow(testRow);
  
  console.log('\n' + '='.repeat(80));
  console.log('DIAGNOSIS COMPLETE');
}
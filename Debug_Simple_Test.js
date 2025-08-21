/**
 * Simple test to isolate the issue
 */

function simpleProfile7Test() {
  console.log('\n' + '='.repeat(80));
  console.log('SIMPLE PROFILE 7 TEST - MINIMAL REPRODUCTION');
  console.log('='.repeat(80));
  
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  
  // Get a real row with Profile 7 data
  console.log('\n1️⃣ LOOKING FOR EXISTING PROFILE 7 ROW...');
  const headers = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  const profileCol = headers.indexOf('ProfileID') + 1;
  
  let testRow = null;
  for (let i = 3; i <= ws.getLastRow(); i++) {
    const profileId = ws.getRange(i, profileCol).getValue();
    if (profileId === '7_Foundation_Builder') {
      testRow = i;
      console.log(`  Found Profile 7 at row ${i}`);
      break;
    }
  }
  
  if (!testRow) {
    console.log('  No existing Profile 7 row found');
    return;
  }
  
  // Check what vehicles are in that row's allocation columns
  console.log('\n2️⃣ CHECKING ALLOCATION COLUMNS...');
  
  // Find allocation columns
  const allocStartCol = headers.indexOf('Vehicles Begin') + 1;
  console.log(`  Allocation columns start at: ${allocStartCol}`);
  
  if (allocStartCol > 0) {
    const numAllocCols = 50; // Check next 50 columns
    const allocHeaders = ws.getRange(2, allocStartCol, 1, numAllocCols).getValues()[0];
    const allocValues = ws.getRange(testRow, allocStartCol, 1, numAllocCols).getValues()[0];
    
    console.log('\n  Retirement allocations found:');
    allocHeaders.forEach((header, idx) => {
      if (header && header.includes('Retirement') && allocValues[idx] > 0) {
        console.log(`    ${header}: $${allocValues[idx]}`);
      }
    });
    
    // Check specifically for 401(k)
    const has401k = allocHeaders.some((h, idx) => 
      h && h.includes('401(k)') && allocValues[idx] > 0
    );
    console.log(`\n  Has 401(k) allocation: ${has401k ? '❌ NO' : '❌ NO'}`);
  }
  
  // Run the engine on this row
  console.log('\n3️⃣ RUNNING ENGINE ON EXISTING ROW...');
  try {
    const result = runUniversalEngine(testRow);
    
    console.log('\n  Engine results:');
    if (result.vehicles && result.vehicles.Retirement) {
      Object.entries(result.vehicles.Retirement).forEach(([vehicle, amount]) => {
        if (amount > 0) {
          console.log(`    ${vehicle}: $${amount}`);
        }
      });
    }
  } catch (error) {
    console.error('  Error:', error.message);
  }
  
  console.log('\n' + '='.repeat(80));
  console.log('TEST COMPLETE');
}

// Also check what happens with a fresh test
function checkFreshAllocation() {
  console.log('\n' + '='.repeat(80));
  console.log('CHECKING FRESH ALLOCATION');
  console.log('='.repeat(80));
  
  // Run the test scenario from Testing.js
  runCompleteScenarioTest('youngProfessional', PROFILE_7_SCENARIOS);
}
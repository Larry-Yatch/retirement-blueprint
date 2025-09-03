/**
 * REPROCESS ALLOCATIONS WITH FIXES
 * Created to apply employer match and other fixes to existing data
 */

/**
 * Reprocess a single row's allocation with the fixed code
 * @param {number} rowNum - The row number to reprocess
 * @param {boolean} generateDoc - Whether to also generate document after reprocessing
 */
function reprocessSingleRow(rowNum, generateDoc = false) {
  try {
    // Validate rowNum
    if (!rowNum || isNaN(rowNum) || rowNum < 3) {
      throw new Error(`Invalid row number: ${rowNum}. Must be 3 or greater.`);
    }
    
    console.log(`========== REPROCESSING ROW ${rowNum} ==========`);
    
    const { sheet: ws, hdr } = initWS();
    const rowData = ws.getRange(rowNum, 1, 1, ws.getLastColumn()).getValues()[0];
    
    // Get identifying info
    const fullName = getValue(hdr, rowData, HEADERS.FULL_NAME);
    const profileId = getValue(hdr, rowData, HEADERS.PROFILE_ID);
    const email = getValue(hdr, rowData, HEADERS.EMAIL);
    
    console.log(`Processing: ${fullName} (${email})`);
    console.log(`Profile: ${profileId}`);
    
    // Store original values for comparison
    const originalMatch = getValue(hdr, rowData, HEADERS.RETIREMENT_401K_MATCH_TRADITIONAL_IDEAL) || 0;
    
    // Run the allocation engine with fixes
    console.log('Running allocation engine...');
    const results = runUniversalEngine(rowNum);
    
    if (!results) {
      throw new Error('Allocation engine returned no results');
    }
    
    // The rest of handlePhase2 logic writes the results
    // We need to replicate that writing logic here
    console.log('Writing results to sheet...');
    writeAllocationResults(ws, hdr, rowNum, results);
    
    // Check what changed
    const newRowData = ws.getRange(rowNum, 1, 1, ws.getLastColumn()).getValues()[0];
    const newMatch = getValue(hdr, newRowData, HEADERS.RETIREMENT_401K_MATCH_TRADITIONAL_IDEAL) || 0;
    
    if (originalMatch != newMatch) {
      console.log(`✅ 401(k) Match changed: $${originalMatch} → $${newMatch}`);
    }
    
    // Generate document if requested
    if (generateDoc) {
      console.log('Generating document...');
      const docUrl = generateDocumentBrandedForRow(rowNum);
      console.log(`Document created: ${docUrl}`);
    }
    
    console.log(`========== COMPLETED ROW ${rowNum} ==========\n`);
    return true;
    
  } catch (error) {
    console.error(`Error reprocessing row ${rowNum}: ${error.toString()}`);
    return false;
  }
}

/**
 * Write allocation results to sheet (simplified from handlePhase2)
 */
function writeAllocationResults(ws, hdr, rowNum, results) {
  const rowArr = ws.getRange(rowNum, 1, 1, ws.getLastColumn()).getValues()[0];
  const profileId = getValue(hdr, rowArr, HEADERS.PROFILE_ID);
  
  // Build actualMap (simplified - focusing on key fixes)
  const actualMap = {};
  
  // Universal actuals
  const actualHsa = Number(getValue(hdr, rowArr, HEADERS.P2_HSA_MONTHLY_CONTRIB)) || 0;
  const actualCesa = Number(getValue(hdr, rowArr, HEADERS.P2_CESA_MONTHLY_CONTRIB)) || 0;
  const actualRet = Number(getValue(hdr, rowArr, HEADERS.P2_RETIREMENT_PERSONAL)) || 0;
  
  actualMap['health_hsa_actual'] = actualHsa;
  actualMap['education_combined_cesa_actual'] = actualCesa;
  actualMap['retirement_traditional_401k_actual'] = actualRet;
  
  // Write actuals
  Object.entries(actualMap).forEach(([key, value]) => {
    if (hdr[key]) {
      ws.getRange(rowNum, hdr[key])
        .setValue(value)
        .setNumberFormat('$#,##0');
    }
  });
  
  // Write ideals from results.vehicles
  const writtenIdeal = new Set();
  let sumIdeal = 0;
  
  Object.entries(results.vehicles).forEach(([domain, vehicles]) => {
    Object.entries(vehicles).forEach(([veh, amtRaw]) => {
      const key = veh.toLowerCase()
        .replace(/401\(k\)/g, '401k')
        .replace(/[()%–]/g, '')
        .replace(/\s+/g, '_');
      const hdrName = `${domain.toLowerCase()}_${key}_ideal`;
      const col = hdr[hdrName];
      
      if (col) {
        const amt = Math.round(amtRaw || 0);
        ws.getRange(rowNum, col)
          .setValue(amt)
          .setNumberFormat('$#,##0');
        writtenIdeal.add(hdrName);
        sumIdeal += amt;
      }
    });
  });
  
  console.log(`Wrote ${writtenIdeal.size} ideal allocations`);
}

/**
 * Simple test function - always prompts for row number
 */
function testReprocessWithPrompt() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.prompt(
    'Test Reprocess',
    'Enter row number to reprocess (3 or higher):',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (response.getSelectedButton() === ui.Button.OK) {
    const rowNum = parseInt(response.getResponseText());
    if (rowNum && rowNum >= 3) {
      const success = reprocessSingleRow(rowNum, true);
      if (success) {
        ui.alert('Success', `Row ${rowNum} reprocessed and document generated.`, ui.ButtonSet.OK);
      }
    } else {
      ui.alert('Invalid', 'Please enter a valid row number (3 or higher)', ui.ButtonSet.OK);
    }
  }
}

/**
 * Test reprocessing on a single row first
 * @param {number} rowNum - Optional row number to test (defaults to current row)
 */
function testReprocessSingleRow(rowNum = null) {
  // Use provided row or get current selected row
  if (!rowNum) {
    const sheet = SpreadsheetApp.getActiveSheet();
    if (!sheet || sheet.getName() !== 'Working Sheet') {
      SpreadsheetApp.getUi().alert(
        'Wrong Sheet',
        'Please select a row in the Working Sheet',
        SpreadsheetApp.getUi().ButtonSet.OK
      );
      return;
    }
    rowNum = sheet.getActiveRange().getRow();
    
    if (rowNum < 3) {
      SpreadsheetApp.getUi().alert(
        'Invalid Row',
        'Please select a data row (row 3 or below)',
        SpreadsheetApp.getUi().ButtonSet.OK
      );
      return;
    }
  }
  
  console.log('Testing reprocess on row ' + rowNum);
  
  const success = reprocessSingleRow(rowNum, true);
  
  if (success) {
    SpreadsheetApp.getUi().alert(
      'Test Complete', 
      `Row ${rowNum} has been reprocessed. Check the document and values.`,
      SpreadsheetApp.getUi().ButtonSet.OK
    );
  }
}

/**
 * Reprocess currently selected row
 */
function reprocessCurrentRow() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const rowNum = sheet.getActiveRange().getRow();
  
  if (rowNum < 3) {
    SpreadsheetApp.getUi().alert(
      'Invalid Row',
      'Please select a data row (row 3 or below)',
      SpreadsheetApp.getUi().ButtonSet.OK
    );
    return;
  }
  
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert(
    'Confirm Reprocess',
    `Reprocess allocations for row ${rowNum}?`,
    ui.ButtonSet.YES_NO
  );
  
  if (response === ui.Button.YES) {
    reprocessSingleRow(rowNum, false);
    ui.alert('Complete', `Row ${rowNum} has been reprocessed.`, ui.ButtonSet.OK);
  }
}

/**
 * Reprocess all rows with data
 * BE CAREFUL - This will update all rows!
 */
function reprocessAllRows(startRow = 3, endRow = null) {
  const ui = SpreadsheetApp.getUi();
  
  // Safety confirmation
  const response = ui.alert(
    '⚠️ Confirm Bulk Reprocess',
    'This will reprocess allocations for ALL rows with data.\n\n' +
    'This will update ideal allocation values based on the fixed code.\n\n' +
    'Are you sure you want to continue?',
    ui.ButtonSet.YES_NO
  );
  
  if (response !== ui.Button.YES) {
    console.log('Reprocess cancelled by user');
    return;
  }
  
  const { sheet: ws, hdr } = initWS();
  const lastRow = endRow || ws.getLastRow();
  
  let successCount = 0;
  let errorCount = 0;
  const errors = [];
  
  console.log(`Starting reprocess from row ${startRow} to ${lastRow}`);
  
  for (let row = startRow; row <= lastRow; row++) {
    try {
      // Skip empty rows
      const profileId = ws.getRange(row, hdr[HEADERS.PROFILE_ID]).getValue();
      if (!profileId || profileId === '') {
        console.log(`Skipping row ${row} - no profile ID`);
        continue;
      }
      
      const success = reprocessSingleRow(row, false);
      if (success) {
        successCount++;
      } else {
        errorCount++;
        errors.push(row);
      }
      
      // Add a small delay to prevent timeout
      Utilities.sleep(500);
      
    } catch (error) {
      console.error(`Error on row ${row}: ${error.toString()}`);
      errorCount++;
      errors.push(row);
    }
  }
  
  // Report results
  let message = `Reprocessing complete!\n\n`;
  message += `✅ Success: ${successCount} rows\n`;
  message += `❌ Errors: ${errorCount} rows\n`;
  
  if (errors.length > 0) {
    message += `\nError rows: ${errors.join(', ')}`;
  }
  
  ui.alert('Reprocess Complete', message, ui.ButtonSet.OK);
}

/**
 * Generate documents and send emails for all reprocessed rows
 */
function regenerateAllDocuments(startRow = 3, endRow = null) {
  const ui = SpreadsheetApp.getUi();
  
  const response = ui.alert(
    '📄 Regenerate Documents',
    'This will generate new documents and send emails for all rows.\n\n' +
    'Make sure you have reprocessed allocations first!\n\n' +
    'Continue?',
    ui.ButtonSet.YES_NO
  );
  
  if (response !== ui.Button.YES) {
    return;
  }
  
  const { sheet: ws, hdr } = initWS();
  const lastRow = endRow || ws.getLastRow();
  
  let count = 0;
  
  for (let row = startRow; row <= lastRow; row++) {
    try {
      const profileId = ws.getRange(row, hdr[HEADERS.PROFILE_ID]).getValue();
      if (!profileId || profileId === '') continue;
      
      console.log(`Generating document for row ${row}...`);
      generateDocumentBrandedForRow(row);
      count++;
      
      // Delay to prevent hitting limits
      Utilities.sleep(2000);
      
    } catch (error) {
      console.error(`Error generating document for row ${row}: ${error.toString()}`);
    }
  }
  
  ui.alert('Documents Generated', `Generated ${count} documents`, ui.ButtonSet.OK);
}
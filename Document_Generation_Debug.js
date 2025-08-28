/**
 * Debug version to test document generation without excessive length
 */
function generateRetirementBlueprintDebug(rowNum) {
  try {
    Logger.log(`Starting DEBUG document generation for row ${rowNum}`);
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const ws = ss.getSheetByName(DOC_CONFIG.SHEET_NAME);
    if (!ws) throw new Error('Working Sheet not found');
    
    // Get headers and data
    const lastCol = ws.getLastColumn();
    const headers = ws.getRange(DOC_CONFIG.HEADER_ROW, 1, 1, lastCol).getValues()[0];
    const rowData = ws.getRange(rowNum, 1, 1, lastCol).getValues()[0];
    
    // Create header map for easy access
    const hdr = {};
    headers.forEach((h, i) => {
      if (h) hdr[h] = i;
    });
    
    // Get key data
    const fullName = rowData[hdr['Full_Name']] || 'Client';
    const profileId = rowData[hdr['ProfileID']];
    
    // Create document name
    const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd_HHmm');
    const cleanName = fullName.replace(/\s+/g, '_');
    const docName = `DEBUG_Blueprint_${cleanName}_${timestamp}`;
    
    // Create document directly without template
    const folder = DOC_CONFIG.OUTPUT_FOLDER_ID ? 
      DriveApp.getFolderById(DOC_CONFIG.OUTPUT_FOLDER_ID) : 
      DriveApp.getRootFolder();
      
    const doc = DocumentApp.create(docName);
    const body = doc.getBody();
    
    // Add content with logging
    body.clear();
    
    // Title
    body.appendParagraph('RETIREMENT BLUEPRINT - DEBUG VERSION').setHeading(DocumentApp.ParagraphHeading.TITLE);
    body.appendParagraph(`For: ${fullName}`);
    body.appendParagraph(`Profile: ${profileId}`);
    body.appendParagraph('');
    
    // Test each narrative function
    body.appendParagraph('NARRATIVE TESTS:').setHeading(DocumentApp.ParagraphHeading.HEADING1);
    
    // Test opening narrative
    try {
      const opening = generateOpeningNarrative(rowData, hdr);
      Logger.log(`Opening narrative length: ${opening.length}`);
      if (opening.length > 1000) {
        body.appendParagraph('ERROR: Opening narrative too long! Length: ' + opening.length);
      } else {
        body.appendParagraph('Opening Narrative:').setHeading(DocumentApp.ParagraphHeading.HEADING2);
        body.appendParagraph(opening);
      }
    } catch (e) {
      body.appendParagraph('ERROR in opening narrative: ' + e.toString());
      Logger.log('Error in opening narrative: ' + e.toString());
    }
    
    body.appendParagraph('');
    
    // Test phase 1 narrative
    try {
      const phase1 = generatePhase1Narrative(rowData, hdr);
      Logger.log(`Phase 1 narrative length: ${phase1.length}`);
      if (phase1.length > 1000) {
        body.appendParagraph('ERROR: Phase 1 narrative too long! Length: ' + phase1.length);
      } else {
        body.appendParagraph('Phase 1 Narrative:').setHeading(DocumentApp.ParagraphHeading.HEADING2);
        body.appendParagraph(phase1);
      }
    } catch (e) {
      body.appendParagraph('ERROR in phase 1 narrative: ' + e.toString());
      Logger.log('Error in phase 1 narrative: ' + e.toString());
    }
    
    body.appendParagraph('');
    
    // Test data values
    body.appendParagraph('DATA VALUES:').setHeading(DocumentApp.ParagraphHeading.HEADING1);
    body.appendParagraph(`Annual Income: ${rowData[hdr['gross_annual_income']]}`);
    body.appendParagraph(`Net Monthly: ${rowData[hdr['Net_Monthly_Income']]}`);
    body.appendParagraph(`Allocation %: ${rowData[hdr['Allocation_Percentage']]}`);
    
    // Save and close
    doc.saveAndClose();
    const file = DriveApp.getFileById(doc.getId());
    file.moveTo(folder);
    
    const docUrl = doc.getUrl();
    Logger.log(`Debug document created: ${docUrl}`);
    
    return docUrl;
    
  } catch (error) {
    Logger.log(`ERROR in debug generation: ${error.toString()}`);
    throw error;
  }
}

/**
 * Menu function to test debug generation
 */
function testDebugGeneration() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const row = sheet.getActiveRange().getRow();
  
  if (row < 3) {
    SpreadsheetApp.getUi().alert('Please select a data row (row 3+)');
    return;
  }
  
  try {
    const url = generateRetirementBlueprintDebug(row);
    SpreadsheetApp.getUi().alert('Debug document generated!\\n\\n' + url);
  } catch (error) {
    SpreadsheetApp.getUi().alert('Error: ' + error.toString());
  }
}
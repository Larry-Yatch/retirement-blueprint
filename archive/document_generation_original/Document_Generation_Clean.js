/**
 * Clean document generation - minimal version to test
 */
function generateDocumentClean(rowNum) {
  try {
    Logger.log('Starting clean document generation for row ' + rowNum);
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const ws = ss.getSheetByName('Working Sheet');
    if (!ws) throw new Error('Working Sheet not found');
    
    // Get data
    const lastCol = ws.getLastColumn();
    const headers = ws.getRange(2, 1, 1, lastCol).getValues()[0];
    const rowData = ws.getRange(rowNum, 1, 1, lastCol).getValues()[0];
    
    // Create header map
    const hdr = {};
    headers.forEach((h, i) => {
      if (h) hdr[h] = i;
    });
    
    // Get basic info
    const fullName = rowData[hdr['Full_Name']] || 'Client';
    const profileId = rowData[hdr['ProfileID']];
    
    // Create new document
    const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd_HHmm');
    const docName = 'Report_CLEAN_' + fullName.replace(/\s+/g, '_') + '_' + timestamp;
    
    const folder = DriveApp.getFolderById('16KZLGRzLxa-e-jxnkDVb-sZcbosgPvGM');
    const doc = DocumentApp.create(docName);
    const body = doc.getBody();
    
    // Add content WITHOUT using template
    body.clear();
    
    body.appendParagraph('RETIREMENT BLUEPRINT REPORT').setHeading(DocumentApp.ParagraphHeading.TITLE);
    body.appendParagraph('For: ' + fullName);
    body.appendParagraph('Date: ' + timestamp);
    body.appendParagraph('Profile: ' + profileId);
    
    body.appendPageBreak();
    
    // Add narratives directly
    body.appendParagraph('YOUR STORY').setHeading(DocumentApp.ParagraphHeading.HEADING1);
    
    const opening = generateOpeningNarrative(rowData, hdr);
    body.appendParagraph(opening);
    
    body.appendParagraph('');
    
    const phase1 = generatePhase1Narrative(rowData, hdr);
    body.appendParagraph(phase1);
    
    body.appendParagraph('');
    
    const phase2 = generatePhase2Narrative(rowData, hdr);
    body.appendParagraph(phase2);
    
    body.appendParagraph('');
    
    // Add simple data
    body.appendParagraph('FINANCIAL SUMMARY').setHeading(DocumentApp.ParagraphHeading.HEADING1);
    body.appendParagraph('Annual Income: $' + (rowData[hdr['gross_annual_income']] || 'N/A'));
    body.appendParagraph('Monthly Net: $' + (rowData[hdr['Net_Monthly_Income']] || 'N/A'));
    body.appendParagraph('Savings Rate: ' + (rowData[hdr['Allocation_Percentage']] || 'N/A') + '%');
    
    body.appendParagraph('');
    body.appendParagraph('-- End of Report --');
    
    // Save and move
    doc.saveAndClose();
    const file = DriveApp.getFileById(doc.getId());
    file.moveTo(folder);
    
    const docUrl = doc.getUrl();
    
    Logger.log('Document created successfully: ' + docUrl);
    
    // Save URL to sheet
    const urlCol = hdr['retirement_blueprint_doc_url'] || lastCol + 1;
    ws.getRange(rowNum, urlCol).setValue(docUrl);
    
    return docUrl;
    
  } catch (error) {
    Logger.log('Error in clean generation: ' + error.toString());
    throw error;
  }
}

/**
 * Test the clean generation from menu
 */
function testCleanGeneration() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const row = sheet.getActiveRange().getRow();
  
  if (row < 3) {
    SpreadsheetApp.getUi().alert('Please select a data row (row 3+)');
    return;
  }
  
  try {
    const url = generateDocumentClean(row);
    SpreadsheetApp.getUi().alert('Clean document generated!\n\n' + url);
  } catch (error) {
    SpreadsheetApp.getUi().alert('Error: ' + error.toString());
  }
}
/**
 * Safe document generation - prevents content repetition
 */
function generateRetirementBlueprintSafe(rowNum) {
  try {
    Logger.log(`Starting SAFE document generation for row ${rowNum}`);
    
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
    const email = rowData[hdr['Email']];
    
    // Create document name
    const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
    const cleanName = fullName.replace(/\s+/g, '_');
    const docName = `Retirement Blueprint_${cleanName}_${timestamp}`;
    
    // Create NEW document WITHOUT using template copy
    const folder = DOC_CONFIG.OUTPUT_FOLDER_ID ? 
      DriveApp.getFolderById(DOC_CONFIG.OUTPUT_FOLDER_ID) : 
      DriveApp.getRootFolder();
    
    const doc = DocumentApp.create(docName);
    const body = doc.getBody();
    body.clear();
    
    // Build document from scratch
    // Title section
    body.appendParagraph('RETIREMENT BLUEPRINT').setHeading(DocumentApp.ParagraphHeading.TITLE);
    body.appendParagraph('Your Personalized Path to Financial Freedom');
    body.appendParagraph('');
    body.appendParagraph('Prepared for: ' + fullName);
    body.appendParagraph('Date: ' + timestamp);
    body.appendParagraph('Profile: ' + (PROFILE_CONFIG[profileId]?.title || 'Retirement Strategist'));
    
    body.appendPageBreak();
    
    // Generate narratives safely - with increased character limits
    const opening = truncateNarrative(generateOpeningNarrative(rowData, hdr), 1500);
    body.appendParagraph(opening);
    body.appendParagraph('');
    
    // Chapter 1
    body.appendParagraph('CHAPTER 1: YOUR CURRENT PATH').setHeading(DocumentApp.ParagraphHeading.HEADING1);
    const phase1 = truncateNarrative(generatePhase1Narrative(rowData, hdr), 1200);
    body.appendParagraph(phase1);
    body.appendParagraph('');
    
    body.appendParagraph('Financial Snapshot:');
    body.appendParagraph('• Annual Income: ' + formatCurrency(rowData[hdr['gross_annual_income']]));
    body.appendParagraph('• Monthly Net: ' + formatCurrency(rowData[hdr['Net_Monthly_Income']]));
    body.appendParagraph('• Savings Rate: ' + (rowData[hdr['Allocation_Percentage']] || '0') + '%');
    body.appendParagraph('');
    
    // Chapter 2
    body.appendParagraph('CHAPTER 2: YOUR PRIORITIES').setHeading(DocumentApp.ParagraphHeading.HEADING1);
    const phase2 = truncateNarrative(generatePhase2Narrative(rowData, hdr), 1200);
    body.appendParagraph(phase2);
    body.appendParagraph('');
    
    const profileNarrative = truncateNarrative(generateProfileNarrative(profileId, rowData, hdr), 1500);
    if (profileNarrative) {
      body.appendParagraph(profileNarrative);
      body.appendParagraph('');
    }
    
    // Chapter 3
    body.appendParagraph('CHAPTER 3: YOUR OPPORTUNITY').setHeading(DocumentApp.ParagraphHeading.HEADING1);
    const results = truncateNarrative(generateResultsNarrative(rowData, hdr), 1200);
    body.appendParagraph(results);
    body.appendParagraph('');
    
    // Calculate totals
    const actualTotal = calculateTotalMonthly(rowData, hdr, 'actual');
    const idealTotal = calculateTotalMonthly(rowData, hdr, 'ideal');
    const difference = idealTotal - actualTotal;
    
    body.appendParagraph('Monthly Contribution Summary:');
    body.appendParagraph('• Current: ' + formatCurrency(actualTotal));
    body.appendParagraph('• Optimized: ' + formatCurrency(idealTotal));
    body.appendParagraph('• Improvement: ' + formatCurrency(difference));
    body.appendParagraph('');
    
    // Chapter 4
    body.appendParagraph('CHAPTER 4: FUTURE PROJECTIONS').setHeading(DocumentApp.ParagraphHeading.HEADING1);
    const rate = rowData[hdr['personalized_annual_rate']];
    body.appendParagraph('Your Personalized Growth Rate: ' + formatPercentage(rate));
    body.appendParagraph('');
    
    body.appendParagraph('Retirement Projections:');
    body.appendParagraph('• Current Path: ' + formatCurrency(rowData[hdr['retirement_fv_actual']]));
    body.appendParagraph('• Optimized Path: ' + formatCurrency(rowData[hdr['retirement_fv_ideal']]));
    const fvGain = (parseFloat(rowData[hdr['retirement_fv_ideal']]) || 0) - 
                   (parseFloat(rowData[hdr['retirement_fv_actual']]) || 0);
    body.appendParagraph('• Additional Wealth: ' + formatCurrency(fvGain));
    body.appendParagraph('');
    
    // Chapter 5 - Vehicle recommendations
    body.appendParagraph('CHAPTER 5: YOUR VEHICLES').setHeading(DocumentApp.ParagraphHeading.HEADING1);
    const recommendations = formatVehicleRecommendations(rowData, hdr);
    if (recommendations && recommendations.length > 0) {
      const table = body.appendTable();
      populateVehicleRecommendationsTable(table, recommendations);
    } else {
      body.appendParagraph('Vehicle recommendations will be provided based on your profile.');
    }
    body.appendParagraph('');
    
    // Chapter 6 - Action plan
    body.appendParagraph('CHAPTER 6: YOUR ACTION PLAN').setHeading(DocumentApp.ParagraphHeading.HEADING1);
    const actionSteps = truncateNarrative(
      generateActionStepsNarrative(rowData, hdr, recommendations), 
      2000
    );
    body.appendParagraph(actionSteps);
    body.appendParagraph('');
    
    // Closing
    body.appendParagraph('The best retirement plan is the one you actually implement.');
    body.appendParagraph('Start today, and your future self will thank you.');
    body.appendParagraph('');
    body.appendParagraph('To your financial freedom,');
    body.appendParagraph('The Retirement Blueprint Team');
    
    // Save and move
    doc.saveAndClose();
    const file = DriveApp.getFileById(doc.getId());
    file.moveTo(folder);
    
    const docUrl = doc.getUrl();
    
    // Save URL to sheet
    const urlCol = hdr['retirement_blueprint_doc_url'] || lastCol + 1;
    if (!hdr['retirement_blueprint_doc_url']) {
      ws.getRange(DOC_CONFIG.HEADER_ROW, urlCol).setValue('retirement_blueprint_doc_url');
    }
    ws.getRange(rowNum, urlCol).setValue(docUrl);
    
    Logger.log(`Safe document created successfully: ${docUrl}`);
    
    // Generate PDF and email if requested
    if (email) {
      sendRetirementBlueprintEmail(doc.getId(), email, fullName, headers, rowData, hdr);
    }
    
    return docUrl;
    
  } catch (error) {
    Logger.log(`Error in safe generation: ${error.toString()}`);
    throw error;
  }
}

/**
 * Helper function to prevent excessive narrative length
 */
function truncateNarrative(text, maxLength) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Menu function to run safe generation
 */
function generateDocumentSafe() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const row = sheet.getActiveRange().getRow();
  
  if (row < 3) {
    SpreadsheetApp.getUi().alert('Please select a data row (row 3+)');
    return;
  }
  
  try {
    const url = generateRetirementBlueprintSafe(row);
    SpreadsheetApp.getUi().alert('Document generated safely!\\n\\n' + url);
  } catch (error) {
    SpreadsheetApp.getUi().alert('Error: ' + error.toString());
  }
}
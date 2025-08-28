/**
 * Complete Document Generation System - All functions in one file
 * This is the production-ready version that works reliably
 */

// Configuration - using a different name to avoid conflicts with Document_Generation.js
const DOC_CONFIG_COMPLETE = {
  SHEET_NAME: 'Working Sheet',
  HEADER_ROW: 2,
  OUTPUT_FOLDER_ID: '16KZLGRzLxa-e-jxnkDVb-sZcbosgPvGM'
};

// PROFILE_CONFIG is already defined in code.js
// Using the existing global constant

/**
 * Main function - generates complete retirement blueprint document
 */
function generateRetirementBlueprintComplete(rowNum) {
  try {
    Logger.log(`Starting complete document generation for row ${rowNum}`);
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const ws = ss.getSheetByName(DOC_CONFIG_COMPLETE.SHEET_NAME);
    if (!ws) throw new Error('Working Sheet not found');
    
    // Get headers and data
    const lastCol = ws.getLastColumn();
    const headers = ws.getRange(DOC_CONFIG_COMPLETE.HEADER_ROW, 1, 1, lastCol).getValues()[0];
    const rowData = ws.getRange(rowNum, 1, 1, lastCol).getValues()[0];
    
    // Create header map
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
    
    // Create NEW document
    const folder = DOC_CONFIG_COMPLETE.OUTPUT_FOLDER_ID ? 
      DriveApp.getFolderById(DOC_CONFIG_COMPLETE.OUTPUT_FOLDER_ID) : 
      DriveApp.getRootFolder();
    
    const doc = DocumentApp.create(docName);
    const body = doc.getBody();
    body.clear();
    
    // Build document
    buildTitlePage(body, fullName, timestamp, profileId);
    buildChapter1(body, rowData, hdr);
    buildChapter2(body, rowData, hdr);
    buildChapter3(body, rowData, hdr);
    buildChapter4(body, rowData, hdr);
    buildChapter5(body, rowData, hdr);
    buildChapter6(body, rowData, hdr);
    buildClosing(body);
    
    // Save and move
    doc.saveAndClose();
    const file = DriveApp.getFileById(doc.getId());
    file.moveTo(folder);
    
    const docUrl = doc.getUrl();
    
    // Save URL to sheet
    const urlCol = hdr['retirement_blueprint_doc_url'] || lastCol + 1;
    if (!hdr['retirement_blueprint_doc_url']) {
      ws.getRange(DOC_CONFIG_COMPLETE.HEADER_ROW, urlCol).setValue('retirement_blueprint_doc_url');
    }
    ws.getRange(rowNum, urlCol).setValue(docUrl);
    
    Logger.log(`Document created successfully: ${docUrl}`);
    
    // Generate PDF and email if requested
    if (email) {
      sendRetirementBlueprintEmail(doc.getId(), email, fullName);
    }
    
    return docUrl;
    
  } catch (error) {
    Logger.log(`Error in generation: ${error.toString()}`);
    throw error;
  }
}

// ============== DOCUMENT BUILDING FUNCTIONS ==============

function buildTitlePage(body, fullName, timestamp, profileId) {
  body.appendParagraph('RETIREMENT BLUEPRINT').setHeading(DocumentApp.ParagraphHeading.TITLE);
  body.appendParagraph('Your Personalized Path to Financial Freedom');
  body.appendParagraph('');
  body.appendParagraph('Prepared for: ' + fullName);
  body.appendParagraph('Date: ' + timestamp);
  body.appendParagraph('Profile: ' + (PROFILE_CONFIG[profileId]?.title || 'Retirement Strategist'));
  body.appendPageBreak();
}

function buildChapter1(body, rowData, hdr) {
  const firstName = (rowData[hdr['Full_Name']] || '').split(' ')[0];
  const age = rowData[hdr['Current_Age']];
  const income = formatCurrency(rowData[hdr['gross_annual_income']]);
  const netMonthly = formatCurrency(rowData[hdr['Net_Monthly_Income']]);
  const savingsRate = rowData[hdr['Allocation_Percentage']] || '0';
  
  // Opening
  body.appendParagraph(`Dear ${firstName},`);
  body.appendParagraph('');
  body.appendParagraph(`At ${age} years old, you've taken an important step by completing this retirement assessment. This personalized blueprint shows exactly how to optimize your retirement savings for maximum growth and tax efficiency.`);
  body.appendParagraph('');
  
  // Chapter 1
  body.appendParagraph('CHAPTER 1: YOUR CURRENT PATH').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph('');
  body.appendParagraph('Financial Snapshot:');
  body.appendParagraph('• Annual Income: ' + income);
  body.appendParagraph('• Monthly Net: ' + netMonthly);
  body.appendParagraph('• Target Savings Rate: ' + savingsRate + '%');
  body.appendParagraph('');
}

function buildChapter2(body, rowData, hdr) {
  const profileId = rowData[hdr['ProfileID']];
  const profileConfig = PROFILE_CONFIG[profileId];
  
  body.appendParagraph('CHAPTER 2: YOUR PRIORITIES').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph('');
  body.appendParagraph(`As a ${profileConfig.title}, you have unique opportunities to maximize your retirement savings. ${profileConfig.description}.`);
  body.appendParagraph('');
  
  // Add priority scores
  const retImportance = rowData[hdr['retirement_importance']] || 'N/A';
  const eduImportance = rowData[hdr['education_importance']] || 'N/A';
  const healthImportance = rowData[hdr['health_importance']] || 'N/A';
  
  body.appendParagraph('Your Priorities (1-7 scale):');
  body.appendParagraph(`• Retirement Security: ${retImportance}/7`);
  body.appendParagraph(`• Education Funding: ${eduImportance}/7`);
  body.appendParagraph(`• Healthcare Planning: ${healthImportance}/7`);
  body.appendParagraph('');
}

function buildChapter3(body, rowData, hdr) {
  const actualTotal = calculateTotalMonthly(rowData, hdr, 'actual');
  const idealTotal = calculateTotalMonthly(rowData, hdr, 'ideal');
  const difference = idealTotal - actualTotal;
  
  body.appendParagraph('CHAPTER 3: YOUR OPPORTUNITY').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph('');
  body.appendParagraph('Our analysis reveals significant opportunities to optimize your retirement strategy:');
  body.appendParagraph('');
  body.appendParagraph('Monthly Contribution Summary:');
  body.appendParagraph('• Current: ' + formatCurrency(actualTotal));
  body.appendParagraph('• Optimized: ' + formatCurrency(idealTotal));
  body.appendParagraph('• Additional Savings: ' + formatCurrency(difference));
  body.appendParagraph('');
}

function buildChapter4(body, rowData, hdr) {
  const rate = rowData[hdr['personalized_annual_rate']];
  const retirementFvActual = rowData[hdr['retirement_fv_actual']];
  const retirementFvIdeal = rowData[hdr['retirement_fv_ideal']];
  const fvGain = (parseFloat(retirementFvIdeal) || 0) - (parseFloat(retirementFvActual) || 0);
  
  body.appendParagraph('CHAPTER 4: FUTURE PROJECTIONS').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph('');
  body.appendParagraph('Your Personalized Growth Rate: ' + formatPercentage(rate));
  body.appendParagraph('');
  body.appendParagraph('Retirement Projections:');
  body.appendParagraph('• Current Path: ' + formatCurrency(retirementFvActual));
  body.appendParagraph('• Optimized Path: ' + formatCurrency(retirementFvIdeal));
  body.appendParagraph('• Additional Wealth: ' + formatCurrency(fvGain));
  body.appendParagraph('');
}

function buildChapter5(body, rowData, hdr) {
  body.appendParagraph('CHAPTER 5: YOUR VEHICLES').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph('');
  
  const recommendations = formatVehicleRecommendations(rowData, hdr);
  if (recommendations && recommendations.length > 0) {
    const table = body.appendTable();
    populateVehicleRecommendationsTable(table, recommendations);
  } else {
    body.appendParagraph('See detailed vehicle recommendations in Chapter 6.');
  }
  body.appendParagraph('');
}

function buildChapter6(body, rowData, hdr) {
  body.appendParagraph('CHAPTER 6: YOUR ACTION PLAN').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph('');
  
  const recommendations = formatVehicleRecommendations(rowData, hdr);
  const topActions = recommendations
    .filter(r => r.ideal > r.actual)
    .sort((a, b) => (b.ideal - b.actual) - (a.ideal - a.actual))
    .slice(0, 3);
  
  body.appendParagraph('Your Top 3 Priority Actions:');
  body.appendParagraph('');
  
  topActions.forEach((action, index) => {
    body.appendParagraph(`${index + 1}. ${action.name}`);
    if (action.actual === 0) {
      body.appendParagraph(`   Open and fund with ${formatCurrency(action.ideal)} monthly`);
    } else {
      body.appendParagraph(`   Increase from ${formatCurrency(action.actual)} to ${formatCurrency(action.ideal)} monthly`);
    }
    body.appendParagraph('');
  });
}

function buildClosing(body) {
  body.appendParagraph('The best retirement plan is the one you actually implement.');
  body.appendParagraph('Start today, and your future self will thank you.');
  body.appendParagraph('');
  body.appendParagraph('To your financial freedom,');
  body.appendParagraph('The Retirement Blueprint Team');
}

// ============== HELPER FUNCTIONS ==============

function formatVehicleRecommendations(rowData, hdr) {
  const recommendations = [];
  const vehicles = [
    'Traditional 401(k)', 'Roth 401(k)', '401(k) Match Traditional', 
    'Solo 401(k) - Employee', 'Solo 401(k) - Employer', 
    'Traditional IRA', 'Roth IRA', 'Backdoor Roth IRA',
    'HSA', 'CESA', 'Family Bank'
  ];
  
  vehicles.forEach(name => {
    const key = name.toLowerCase().replace(/[()]/g, '').replace(/\s+/g, '_');
    const actualCol = `retirement_${key}_actual`;
    const idealCol = `retirement_${key}_ideal`;
    
    const actual = parseFloat(rowData[hdr[actualCol]]) || 0;
    const ideal = parseFloat(rowData[hdr[idealCol]]) || 0;
    
    if (actual > 0 || ideal > 0) {
      recommendations.push({ name, actual, ideal });
    }
  });
  
  return recommendations;
}

function populateVehicleRecommendationsTable(table, recommendations) {
  // Header row
  const headerRow = table.appendTableRow();
  headerRow.appendTableCell('Investment Vehicle').getChild(0).asParagraph().setBold(true);
  headerRow.appendTableCell('Current Monthly').getChild(0).asParagraph().setBold(true);
  headerRow.appendTableCell('Recommended Monthly').getChild(0).asParagraph().setBold(true);
  headerRow.appendTableCell('Action Needed').getChild(0).asParagraph().setBold(true);
  
  // Data rows
  recommendations.forEach(rec => {
    const row = table.appendTableRow();
    row.appendTableCell(rec.name);
    row.appendTableCell(formatCurrency(rec.actual));
    row.appendTableCell(formatCurrency(rec.ideal));
    
    let action = '';
    if (rec.actual === 0 && rec.ideal > 0) {
      action = 'Open & Fund';
    } else if (rec.ideal > rec.actual) {
      action = 'Increase';
    } else if (rec.ideal < rec.actual) {
      action = 'Reduce';
    } else {
      action = 'Maintain';
    }
    row.appendTableCell(action);
  });
}

function calculateTotalMonthly(rowData, hdr, type) {
  let total = 0;
  Object.entries(hdr).forEach(([header, idx]) => {
    if (header.endsWith(`_${type}`) && !header.includes('_fv_')) {
      const value = parseFloat(rowData[idx]) || 0;
      total += value;
    }
  });
  return total;
}

function formatCurrency(value) {
  const num = parseFloat(value) || 0;
  return '$' + num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function formatPercentage(value) {
  const num = parseFloat(value) || 0;
  if (num < 1) {
    return (num * 100).toFixed(1) + '%';
  }
  return num.toFixed(1) + '%';
}

function sendRetirementBlueprintEmail(docId, email, fullName) {
  try {
    const doc = DriveApp.getFileById(docId);
    const pdfBlob = doc.getBlob().getAs('application/pdf')
      .setName(doc.getName() + '.pdf');
    
    const subject = 'Your Retirement Blueprint Report';
    const body = `Dear ${fullName.split(' ')[0]},\n\n` +
      `Thank you for completing your Retirement Blueprint assessment. ` +
      `Attached you'll find your personalized retirement savings strategy report.\n\n` +
      `Please review the report carefully and don't hesitate to reach out if you have any questions.\n\n` +
      `Best regards,\nThe Retirement Blueprint Team`;
    
    MailApp.sendEmail({
      to: email,
      subject: subject,
      body: body,
      attachments: [pdfBlob]
    });
    
    Logger.log(`Email sent to ${email}`);
  } catch (error) {
    Logger.log(`Error sending email: ${error}`);
  }
}

// ============== MENU FUNCTION ==============

function generateDocumentComplete() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const row = sheet.getActiveRange().getRow();
  
  if (row < 3) {
    SpreadsheetApp.getUi().alert('Please select a data row (row 3+)');
    return;
  }
  
  try {
    const url = generateRetirementBlueprintComplete(row);
    SpreadsheetApp.getUi().alert('Document generated successfully!\n\n' + url);
  } catch (error) {
    SpreadsheetApp.getUi().alert('Error: ' + error.toString());
  }
}
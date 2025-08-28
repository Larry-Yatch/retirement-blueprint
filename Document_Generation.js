// ═══════════════════════════════════════════════════════════════════════════════
// DOCUMENT GENERATION SYSTEM FOR RETIREMENT BLUEPRINT
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Configuration for document generation
 */
const DOC_CONFIG = {
  // Template document IDs (to be set after creating templates)
  UNIVERSAL_TEMPLATE_ID: '1f1lFQRx4NBClZ8x5hjWJDMsMv4z5jeamPbuutglBfj0',
  PROFILE_TEMPLATES: {
    '1_ROBS_In_Use': '',
    '2_ROBS_Curious': '',
    '3_Solo401k_Builder': '',
    '4_Roth_Reclaimer': '',
    '5_Bracket_Strategist': '',
    '6_Catch_Up': '',
    '7_Foundation_Builder': '',
    '8_Biz_Owner_Group': '',
    '9_Late_Stage_Growth': ''
  },
  
  // Output folder configuration
  OUTPUT_FOLDER_ID: '16KZLGRzLxa-e-jxnkDVb-sZcbosgPvGM',
  
  // Working Sheet configuration
  SHEET_NAME: 'Working Sheet',
  HEADER_ROW: 2,
  
  // Email configuration
  EMAIL_TEMPLATE: {
    subject: 'Your Retirement Blueprint Report',
    body: `Dear {{FirstName}},

Thank you for completing your Retirement Blueprint assessment. Attached you'll find your personalized retirement savings strategy report.

This report includes:
• Your current (actual) contribution analysis
• Our recommended (ideal) contribution strategy  
• Future value projections based on your personalized rate of {{personalized_annual_rate}}%
• Specific action steps for optimizing your retirement savings

Please review the report carefully and don't hesitate to reach out if you have any questions about implementing these recommendations.

Best regards,
The Retirement Blueprint Team

P.S. This report was generated on {{report_date}} based on your responses. If your financial situation changes, we recommend updating your assessment.`
  },
  
  // Document naming
  DOC_NAME_PATTERN: 'Retirement Blueprint_{{Full_Name}}_{{date}}'
};

/**
 * Main function to generate retirement blueprint document for a specific row
 * Called automatically after Phase 3 completes
 */
function generateRetirementBlueprint(rowNum) {
  try {
    Logger.log(`Starting document generation for row ${rowNum}`);
    
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
    
    // Check if document already exists
    const existingDocUrl = rowData[hdr['retirement_blueprint_doc_url']];
    if (existingDocUrl) {
      Logger.log(`Document already exists for ${fullName}`);
      return existingDocUrl;
    }
    
    // Create document name
    const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
    const cleanName = fullName.replace(/\s+/g, '_');
    const docName = `Retirement Blueprint_${cleanName}_${timestamp}`;
    
    // Create the merged document
    const newDocId = createMergedDocument(docName, profileId, headers, rowData, hdr);
    const newDocUrl = `https://docs.google.com/document/d/${newDocId}/edit`;
    
    // Save document URL back to sheet
    const docUrlCol = hdr['retirement_blueprint_doc_url'] || lastCol + 1;
    if (!hdr['retirement_blueprint_doc_url']) {
      // Add header if it doesn't exist
      ws.getRange(DOC_CONFIG.HEADER_ROW, docUrlCol).setValue('retirement_blueprint_doc_url');
    }
    ws.getRange(rowNum, docUrlCol).setValue(newDocUrl);
    
    // Generate PDF and email
    if (email) {
      sendRetirementBlueprintEmail(newDocId, email, fullName, headers, rowData, hdr);
    }
    
    Logger.log(`Successfully generated document for ${fullName}`);
    return newDocUrl;
    
  } catch (error) {
    Logger.log(`Error generating document: ${error}`);
    throw error;
  }
}

/**
 * Create merged document combining universal template and profile-specific content
 */
function createMergedDocument(docName, profileId, headers, rowData, hdr) {
  // Check if templates are configured
  if (!DOC_CONFIG.UNIVERSAL_TEMPLATE_ID) {
    throw new Error('Universal template ID not configured. Please create template first.');
  }
  
  // Create copy of universal template
  const folder = DOC_CONFIG.OUTPUT_FOLDER_ID ? 
    DriveApp.getFolderById(DOC_CONFIG.OUTPUT_FOLDER_ID) : 
    DriveApp.getRootFolder();
    
  const newFile = DriveApp.getFileById(DOC_CONFIG.UNIVERSAL_TEMPLATE_ID)
    .makeCopy(docName, folder);
  const doc = DocumentApp.openById(newFile.getId());
  const body = doc.getBody();
  
  // Replace all placeholders with data
  const replacements = prepareReplacements(headers, rowData, hdr);
  Object.entries(replacements).forEach(([placeholder, value]) => {
    body.replaceText(`{{${placeholder}}}`, value);
  });
  
  // Find and replace the vehicle recommendations placeholder with actual table
  const vehiclePlaceholder = '[Vehicle recommendations will be inserted here]';
  const bodyText = body.getText();
  if (bodyText.includes(vehiclePlaceholder)) {
    // Find the paragraph containing the placeholder
    let foundElement = null;
    const numChildren = body.getNumChildren();
    for (let i = 0; i < numChildren; i++) {
      const child = body.getChild(i);
      if (child.getType() === DocumentApp.ElementType.PARAGRAPH) {
        if (child.asText().getText().includes(vehiclePlaceholder)) {
          foundElement = child;
          break;
        }
      }
    }
    
    if (foundElement) {
      // Insert the table after the placeholder paragraph
      const index = body.getChildIndex(foundElement);
      foundElement.asText().setText(''); // Clear placeholder text
      addVehicleRecommendationsTable(body, rowData, hdr);
    }
  }
  
  // Add profile-specific content if template exists
  const profileTemplateId = DOC_CONFIG.PROFILE_TEMPLATES[profileId];
  if (profileTemplateId) {
    appendProfileContent(doc, profileTemplateId);
  }
  
  // Add addendum content based on profile
  appendAddendumContent(doc, profileId, rowData, hdr);
  
  doc.saveAndClose();
  return newFile.getId();
}

/**
 * Prepare all replacements including calculated fields
 */
function prepareReplacements(headers, rowData, hdr) {
  const replacements = {};
  
  // Add all raw data fields
  headers.forEach((header, idx) => {
    if (header) {
      const value = rowData[idx];
      replacements[header] = formatValue(header, value);
    }
  });
  
  // Add calculated fields
  const firstName = (rowData[hdr['Full_Name']] || '').split(' ')[0];
  replacements['FirstName'] = firstName;
  replacements['report_date'] = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'MMMM d, yyyy');
  
  // Calculate total actual vs ideal monthly contributions
  const actualTotal = calculateTotalMonthly(rowData, hdr, 'actual');
  const idealTotal = calculateTotalMonthly(rowData, hdr, 'ideal');
  replacements['total_actual_monthly'] = formatCurrency(actualTotal);
  replacements['total_ideal_monthly'] = formatCurrency(idealTotal);
  replacements['monthly_difference'] = formatCurrency(idealTotal - actualTotal);
  
  // Format percentages
  if (replacements['personalized_annual_rate']) {
    replacements['personalized_annual_rate'] = formatPercentage(replacements['personalized_annual_rate']);
  }
  
  // Calculate future value gains
  const retirementFvActual = parseFloat(rowData[hdr['retirement_fv_actual']]) || 0;
  const retirementFvIdeal = parseFloat(rowData[hdr['retirement_fv_ideal']]) || 0;
  replacements['retirement_fv_gain'] = formatCurrency(retirementFvIdeal - retirementFvActual);
  
  const educationFvActual = parseFloat(rowData[hdr['education_fv_actual']]) || 0;
  const educationFvIdeal = parseFloat(rowData[hdr['education_fv_ideal']]) || 0;
  replacements['education_fv_gain'] = formatCurrency(educationFvIdeal - educationFvActual);
  
  const healthFvActual = parseFloat(rowData[hdr['health_fv_actual']]) || 0;
  const healthFvIdeal = parseFloat(rowData[hdr['health_fv_ideal']]) || 0;
  replacements['health_fv_gain'] = formatCurrency(healthFvIdeal - healthFvActual);
  
  // Profile information
  const profileConfig = PROFILE_CONFIG[rowData[hdr['ProfileID']]];
  replacements['profile_title'] = profileConfig ? profileConfig.title : 'Retirement Strategist';
  replacements['profile_description'] = profileConfig ? profileConfig.description : '';
  
  return replacements;
}

/**
 * Calculate total monthly contributions across all vehicles
 */
function calculateTotalMonthly(rowData, hdr, type) {
  let total = 0;
  
  // Find all columns ending with _actual or _ideal
  Object.entries(hdr).forEach(([header, idx]) => {
    if (header.endsWith(`_${type}`) && !header.includes('_fv_')) {
      const value = parseFloat(rowData[idx]) || 0;
      total += value;
    }
  });
  
  return total;
}

/**
 * Format values based on field type
 */
function formatValue(header, value) {
  if (value === null || value === undefined || value === '') return 'N/A';
  
  // Currency fields
  if (header.includes('income') || header.includes('balance') || 
      header.includes('actual') || header.includes('ideal') || 
      header.includes('fv_') || header.includes('contribution')) {
    return formatCurrency(value);
  }
  
  // Percentage fields
  if (header.includes('percentage') || header.includes('rate')) {
    return formatPercentage(value);
  }
  
  // Age fields
  if (header.includes('age')) {
    return `${value} years`;
  }
  
  return String(value);
}

/**
 * Format currency values
 */
function formatCurrency(value) {
  const num = parseFloat(value) || 0;
  return '$' + num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Format percentage values
 */
function formatPercentage(value) {
  const num = parseFloat(value) || 0;
  // If value is already in percentage form (e.g., 0.15 for 15%)
  if (num < 1) {
    return (num * 100).toFixed(1) + '%';
  }
  // If value is already in whole number form (e.g., 15 for 15%)
  return num.toFixed(1) + '%';
}

/**
 * Append profile-specific content from template
 */
function appendProfileContent(doc, profileTemplateId) {
  try {
    const profileDoc = DocumentApp.openById(profileTemplateId);
    const profileBody = profileDoc.getBody();
    const targetBody = doc.getBody();
    
    // Add section break
    targetBody.appendPageBreak();
    
    // Copy all elements from profile template
    const totalElements = profileBody.getNumChildren();
    for (let i = 0; i < totalElements; i++) {
      const element = profileBody.getChild(i);
      const type = element.getType();
      
      if (type === DocumentApp.ElementType.PARAGRAPH) {
        targetBody.appendParagraph(element.asParagraph().copy());
      } else if (type === DocumentApp.ElementType.TABLE) {
        targetBody.appendTable(element.asTable().copy());
      } else if (type === DocumentApp.ElementType.LIST_ITEM) {
        targetBody.appendListItem(element.asListItem().copy());
      }
    }
  } catch (error) {
    Logger.log(`Error appending profile content: ${error}`);
  }
}

/**
 * Append relevant addendum content based on profile and data
 */
function appendAddendumContent(doc, profileId, rowData, hdr) {
  const body = doc.getBody();
  
  // Determine which addendums to include
  const addendums = [];
  
  // Universal addendums that apply to all profiles
  addendums.push('universal/tax_optimization_strategies');
  addendums.push('universal/contribution_limit_reference');
  
  // Profile-specific addendums
  if (profileId === '8_Biz_Owner_Group') {
    addendums.push('biz_owner_group/cash_balance_plan_guide');
    addendums.push('biz_owner_group/mega_backdoor_roth_setup');
  } else if (profileId === '9_Late_Stage_Growth') {
    addendums.push('late_stage_growth/roth_conversion_strategies');
    addendums.push('late_stage_growth/qcd_planning_guide');
  }
  
  // Conditional addendums based on data
  if (rowData[hdr['hsa_eligibility']] === 'Yes') {
    addendums.push('universal/hsa_optimization_guide');
  }
  
  if (rowData[hdr['cesa_num_children']] > 0) {
    addendums.push('universal/education_funding_strategies');
  }
  
  // TODO: Load and append each addendum document
  // For now, just add a placeholder
  if (addendums.length > 0) {
    body.appendPageBreak();
    body.appendParagraph('APPENDICES').setHeading(DocumentApp.ParagraphHeading.HEADING1);
    body.appendParagraph(`The following supplemental guides are included based on your profile and responses:`);
    
    addendums.forEach(addendum => {
      body.appendListItem(`${addendum.replace(/_/g, ' ').replace(/\//g, ' - ')}`);
    });
  }
}

/**
 * Generate PDF and send email
 */
function sendRetirementBlueprintEmail(docId, email, fullName, headers, rowData, hdr) {
  try {
    const doc = DriveApp.getFileById(docId);
    const pdfBlob = doc.getBlob().getAs('application/pdf')
      .setName(doc.getName() + '.pdf');
    
    // Prepare email body with replacements
    let emailBody = DOC_CONFIG.EMAIL_TEMPLATE.body;
    const replacements = prepareReplacements(headers, rowData, hdr);
    
    Object.entries(replacements).forEach(([key, value]) => {
      emailBody = emailBody.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });
    
    // Send email
    MailApp.sendEmail({
      to: email,
      subject: DOC_CONFIG.EMAIL_TEMPLATE.subject,
      body: emailBody,
      attachments: [pdfBlob]
    });
    
    Logger.log(`Email sent to ${email}`);
    
  } catch (error) {
    Logger.log(`Error sending email: ${error}`);
  }
}

/**
 * Create template documents for initial setup
 * Run this once to create the template structure
 */
function createTemplateDocuments() {
  const folder = DOC_CONFIG.OUTPUT_FOLDER_ID ? 
    DriveApp.getFolderById(DOC_CONFIG.OUTPUT_FOLDER_ID) : 
    DriveApp.getRootFolder();
    
  // Create universal template
  const universalDoc = DocumentApp.create('TEMPLATE - Retirement Blueprint Universal');
  const universalBody = universalDoc.getBody();
  
  // Add template structure
  universalBody.clear();
  universalBody.appendParagraph('RETIREMENT BLUEPRINT REPORT').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  universalBody.appendParagraph('Personalized Retirement Savings Strategy for {{Full_Name}}');
  universalBody.appendParagraph('Generated: {{report_date}}');
  
  universalBody.appendPageBreak();
  
  // Executive Summary
  universalBody.appendParagraph('EXECUTIVE SUMMARY').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  universalBody.appendParagraph('Profile: {{profile_title}}').setHeading(DocumentApp.ParagraphHeading.HEADING2);
  universalBody.appendParagraph('{{profile_description}}');
  
  universalBody.appendParagraph('Key Metrics').setHeading(DocumentApp.ParagraphHeading.HEADING2);
  const metricsTable = universalBody.appendTable();
  
  let row1 = metricsTable.appendTableRow();
  row1.appendTableCell('Annual Income');
  row1.appendTableCell('{{gross_annual_income}}');
  
  let row2 = metricsTable.appendTableRow();
  row2.appendTableCell('Monthly Net Income');
  row2.appendTableCell('{{Net_Monthly_Income}}');
  
  let row3 = metricsTable.appendTableRow();
  row3.appendTableCell('Target Savings Rate');
  row3.appendTableCell('{{Allocation_Percentage}}');
  
  let row4 = metricsTable.appendTableRow();
  row4.appendTableCell('Personalized Growth Rate');
  row4.appendTableCell('{{personalized_annual_rate}}');
  
  // Current vs Recommended Analysis
  universalBody.appendParagraph('CURRENT VS RECOMMENDED ANALYSIS').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  
  universalBody.appendParagraph('Monthly Contribution Summary').setHeading(DocumentApp.ParagraphHeading.HEADING2);
  const contributionTable = universalBody.appendTable();
  
  let headerRow = contributionTable.appendTableRow();
  headerRow.appendTableCell('Category');
  headerRow.appendTableCell('Current (Actual)');
  headerRow.appendTableCell('Recommended (Ideal)');
  headerRow.appendTableCell('Difference');
  
  let dataRow = contributionTable.appendTableRow();
  dataRow.appendTableCell('Total Monthly');
  dataRow.appendTableCell('{{total_actual_monthly}}');
  dataRow.appendTableCell('{{total_ideal_monthly}}');
  dataRow.appendTableCell('{{monthly_difference}}');
  
  // Future Value Projections
  universalBody.appendParagraph('FUTURE VALUE PROJECTIONS').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  universalBody.appendParagraph('Based on your personalized annual growth rate of {{personalized_annual_rate}}');
  
  const fvTable = universalBody.appendTable();
  
  let fvHeader = fvTable.appendTableRow();
  fvHeader.appendTableCell('Domain');
  fvHeader.appendTableCell('Current Path');
  fvHeader.appendTableCell('Recommended Path');
  fvHeader.appendTableCell('Potential Gain');
  
  let fvRow1 = fvTable.appendTableRow();
  fvRow1.appendTableCell('Retirement');
  fvRow1.appendTableCell('{{retirement_fv_actual}}');
  fvRow1.appendTableCell('{{retirement_fv_ideal}}');
  fvRow1.appendTableCell('{{retirement_fv_gain}}');
  
  let fvRow2 = fvTable.appendTableRow();
  fvRow2.appendTableCell('Education');
  fvRow2.appendTableCell('{{education_fv_actual}}');
  fvRow2.appendTableCell('{{education_fv_ideal}}');
  fvRow2.appendTableCell('{{education_fv_gain}}');
  
  let fvRow3 = fvTable.appendTableRow();
  fvRow3.appendTableCell('Health');
  fvRow3.appendTableCell('{{health_fv_actual}}');
  fvRow3.appendTableCell('{{health_fv_ideal}}');
  fvRow3.appendTableCell('{{health_fv_gain}}');
  
  // Vehicle Recommendations
  universalBody.appendParagraph('VEHICLE ALLOCATION RECOMMENDATIONS').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  universalBody.appendParagraph('The following allocation maximizes your tax advantages and long-term growth:');
  universalBody.appendParagraph('[Vehicle recommendations will be inserted here]'); // Placeholder for now
  
  // Action Steps
  universalBody.appendParagraph('IMMEDIATE ACTION STEPS').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  universalBody.appendListItem('Review your current contribution allocations against our recommendations');
  universalBody.appendListItem('Prioritize vehicles with employer matching first (free money!)');
  universalBody.appendListItem('Maximize HSA contributions if eligible (triple tax advantage)');
  universalBody.appendListItem('Consider automating contributions to ensure consistency');
  
  universalDoc.saveAndClose();
  
  // Move to folder if specified
  if (DOC_CONFIG.OUTPUT_FOLDER_ID) {
    DriveApp.getFileById(universalDoc.getId()).moveTo(folder);
  }
  
  Logger.log(`Universal template created with ID: ${universalDoc.getId()}`);
  Logger.log('Update DOC_CONFIG.UNIVERSAL_TEMPLATE_ID with this ID');
  
  // TODO: Create profile-specific templates
  // For now, return the universal template ID
  return universalDoc.getId();
}

/**
 * Integration point with Phase 3
 * Add this call to the end of runPhase3() function
 */
function integrateWithPhase3() {
  // This code should be added to the end of runPhase3() in Code.js:
  /*
  // After Phase 3 calculations are complete, generate document
  generateRetirementBlueprint(rowNum);
  */
}

/**
 * Format vehicle recommendations into a readable table
 */
function formatVehicleRecommendations(rowData, hdr) {
  const recommendations = [];
  
  // Retirement vehicles
  const retirementVehicles = [
    { name: 'ROBS Solo 401(k) - Profit Distribution', actual: 'retirement_robs_solo_401k_profit_distribution_actual', ideal: 'retirement_robs_solo_401k_profit_distribution_ideal' },
    { name: 'ROBS Solo 401(k) - Roth', actual: 'retirement_robs_solo_401k_roth_actual', ideal: 'retirement_robs_solo_401k_roth_ideal' },
    { name: 'ROBS Solo 401(k) - Traditional', actual: 'retirement_robs_solo_401k_traditional_actual', ideal: 'retirement_robs_solo_401k_traditional_ideal' },
    { name: 'Solo 401(k) - Employee', actual: 'retirement_solo_401k_employee_actual', ideal: 'retirement_solo_401k_employee_ideal' },
    { name: 'Solo 401(k) - Employer', actual: 'retirement_solo_401k_employer_actual', ideal: 'retirement_solo_401k_employer_ideal' },
    { name: 'Traditional 401(k)', actual: 'retirement_traditional_401k_actual', ideal: 'retirement_traditional_401k_ideal' },
    { name: '401(k) Catch-Up', actual: 'retirement_401k_catch_up_actual', ideal: 'retirement_401k_catch_up_ideal' },
    { name: 'Traditional IRA', actual: 'retirement_traditional_ira_actual', ideal: 'retirement_traditional_ira_ideal' },
    { name: 'Roth IRA', actual: 'retirement_roth_ira_actual', ideal: 'retirement_roth_ira_ideal' },
    { name: 'Backdoor Roth IRA', actual: 'retirement_backdoor_roth_ira_actual', ideal: 'retirement_backdoor_roth_ira_ideal' },
    { name: 'IRA Catch-Up', actual: 'retirement_ira_catch_up_actual', ideal: 'retirement_ira_catch_up_ideal' },
    { name: 'Cash Balance Plan', actual: 'retirement_cash_balance_plan_actual', ideal: 'retirement_cash_balance_plan_ideal' },
    { name: 'Defined Benefit Plan', actual: 'retirement_defined_benefit_plan_actual', ideal: 'retirement_defined_benefit_plan_ideal' },
    { name: 'Group 401(k) - Employee', actual: 'retirement_group_401k_employee_actual', ideal: 'retirement_group_401k_employee_ideal' },
    { name: 'Group 401(k) - Employer', actual: 'retirement_group_401k_employer_actual', ideal: 'retirement_group_401k_employer_ideal' },
    { name: 'HSA (Retirement)', actual: 'retirement_hsa_actual', ideal: 'retirement_hsa_ideal' }
  ];
  
  // Education vehicles
  const educationVehicles = [
    { name: 'Combined CESA', actual: 'education_combined_cesa_actual', ideal: 'education_combined_cesa_ideal' }
  ];
  
  // Health vehicles
  const healthVehicles = [
    { name: 'HSA (Health)', actual: 'health_hsa_actual', ideal: 'health_hsa_ideal' }
  ];
  
  // Other
  const otherVehicles = [
    { name: 'Family Bank', actual: '', ideal: 'family_bank_ideal' }
  ];
  
  // Collect all vehicles with non-zero recommendations
  [...retirementVehicles, ...educationVehicles, ...healthVehicles, ...otherVehicles].forEach(vehicle => {
    const actualValue = vehicle.actual && hdr[vehicle.actual] !== undefined ? 
      parseFloat(rowData[hdr[vehicle.actual]]) || 0 : 0;
    const idealValue = vehicle.ideal && hdr[vehicle.ideal] !== undefined ? 
      parseFloat(rowData[hdr[vehicle.ideal]]) || 0 : 0;
    
    if (actualValue > 0 || idealValue > 0) {
      recommendations.push({
        name: vehicle.name,
        actual: actualValue,
        ideal: idealValue,
        difference: idealValue - actualValue
      });
    }
  });
  
  // Sort by ideal value descending
  recommendations.sort((a, b) => b.ideal - a.ideal);
  
  return recommendations;
}

/**
 * Add formatted vehicle recommendations to document
 */
function addVehicleRecommendationsTable(body, rowData, hdr) {
  const recommendations = formatVehicleRecommendations(rowData, hdr);
  
  if (recommendations.length === 0) {
    body.appendParagraph('No vehicle recommendations available.');
    return;
  }
  
  const table = body.appendTable();
  
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
    if (rec.difference > 0) {
      action = `Increase by ${formatCurrency(rec.difference)}`;
    } else if (rec.difference < 0) {
      action = `Decrease by ${formatCurrency(Math.abs(rec.difference))}`;
    } else {
      action = 'On track!';
    }
    row.appendTableCell(action);
  });
}

/**
 * Add document generation menu items
 * Call this from the main onOpen function
 */
function addDocumentGenerationMenu(ui) {
  ui.createMenu('📄 Document Generation')
    .addItem('Create Template Documents', 'createTemplateDocuments')
    .addItem('Generate Document for Current Row', 'generateDocumentForCurrentRow')
    .addItem('Generate All Pending Documents', 'generateAllPendingDocuments')
    .addItem('Test Email (Current Row)', 'testEmailCurrentRow')
    .addSeparator()
    .addItem('Setup Instructions', 'showSetupInstructions')
    .addToUi();
}

/**
 * Test email for current row (without generating document)
 */
function testEmailCurrentRow() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const currentRow = sheet.getActiveRange().getRow();
  
  if (currentRow < 3) {
    SpreadsheetApp.getUi().alert('Please select a data row (row 3 or below)');
    return;
  }
  
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const ws = ss.getSheetByName(DOC_CONFIG.SHEET_NAME);
    const lastCol = ws.getLastColumn();
    const headers = ws.getRange(DOC_CONFIG.HEADER_ROW, 1, 1, lastCol).getValues()[0];
    const rowData = ws.getRange(currentRow, 1, 1, lastCol).getValues()[0];
    
    const hdr = {};
    headers.forEach((h, i) => {
      if (h) hdr[h] = i;
    });
    
    const email = rowData[hdr['Email']];
    const fullName = rowData[hdr['Full_Name']] || 'Test User';
    
    if (!email) {
      SpreadsheetApp.getUi().alert('No email address found for this row');
      return;
    }
    
    // Send test email without attachment
    let emailBody = DOC_CONFIG.EMAIL_TEMPLATE.body;
    const replacements = prepareReplacements(headers, rowData, hdr);
    
    Object.entries(replacements).forEach(([key, value]) => {
      emailBody = emailBody.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });
    
    MailApp.sendEmail({
      to: email,
      subject: '[TEST] ' + DOC_CONFIG.EMAIL_TEMPLATE.subject,
      body: emailBody + '\n\n[This is a test email - no document attached]'
    });
    
    SpreadsheetApp.getUi().alert(`Test email sent to ${email}`);
  } catch (error) {
    SpreadsheetApp.getUi().alert(`Error sending test email: ${error}`);
  }
}

/**
 * Generate document for the currently selected row
 */
function generateDocumentForCurrentRow() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const currentRow = sheet.getActiveRange().getRow();
  
  if (currentRow < 3) {
    SpreadsheetApp.getUi().alert('Please select a data row (row 3 or below)');
    return;
  }
  
  try {
    const docUrl = generateRetirementBlueprint(currentRow);
    SpreadsheetApp.getUi().alert(`Document generated successfully!\n\nURL: ${docUrl}`);
  } catch (error) {
    SpreadsheetApp.getUi().alert(`Error generating document: ${error}`);
  }
}

/**
 * Generate documents for all rows that don't have one yet
 */
function generateAllPendingDocuments() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName(DOC_CONFIG.SHEET_NAME);
  const lastRow = ws.getLastRow();
  const lastCol = ws.getLastColumn();
  
  const headers = ws.getRange(DOC_CONFIG.HEADER_ROW, 1, 1, lastCol).getValues()[0];
  const hdr = {};
  headers.forEach((h, i) => {
    if (h) hdr[h] = i;
  });
  
  // Find or create doc URL column
  let docUrlCol = hdr['retirement_blueprint_doc_url'];
  if (!docUrlCol) {
    docUrlCol = lastCol + 1;
    ws.getRange(DOC_CONFIG.HEADER_ROW, docUrlCol).setValue('retirement_blueprint_doc_url');
  }
  
  let generated = 0;
  for (let row = 3; row <= lastRow; row++) {
    const existingUrl = ws.getRange(row, docUrlCol).getValue();
    if (!existingUrl) {
      try {
        generateRetirementBlueprint(row);
        generated++;
        Utilities.sleep(1000); // Pause between documents
      } catch (error) {
        Logger.log(`Error generating document for row ${row}: ${error}`);
      }
    }
  }
  
  SpreadsheetApp.getUi().alert(`Generated ${generated} documents`);
}

/**
 * Show setup instructions
 */
function showSetupInstructions() {
  const instructions = `
SETUP INSTRUCTIONS:

1. Create Output Folder:
   - Create a new folder in Google Drive for output documents
   - Copy the folder ID from the URL
   - Update DOC_CONFIG.OUTPUT_FOLDER_ID

2. Create Templates:
   - Run 'Create Template Documents' from this menu
   - Note the template ID shown in the logs
   - Update DOC_CONFIG.UNIVERSAL_TEMPLATE_ID

3. Configure Email:
   - Update DOC_CONFIG.EMAIL_TEMPLATE as needed

4. Integration with Phase 3:
   - Add generateRetirementBlueprint(rowNum) to the end of runPhase3()

5. Test:
   - Select a data row and run 'Generate Document for Current Row'

Current Configuration:
- Output Folder: ${DOC_CONFIG.OUTPUT_FOLDER_ID || 'Not set'}
- Universal Template: ${DOC_CONFIG.UNIVERSAL_TEMPLATE_ID || 'Not set'}
`;

  SpreadsheetApp.getUi().alert(instructions);
}
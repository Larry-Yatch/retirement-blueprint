// ═══════════════════════════════════════════════════════════════════════════════
// DOCUMENT GENERATION SYSTEM FOR RETIREMENT BLUEPRINT
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Configuration for document generation
 */
const DOC_CONFIG = {
  // Template document IDs (to be set after creating templates)
  UNIVERSAL_TEMPLATE_ID: '1oQsN-ZuRNQQ3Tm6VAjzWkDDbCD_LkIehM5t-KnhXb-8',
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
  
  // Prepare all replacements including narratives
  const replacements = prepareReplacements(headers, rowData, hdr);
  
  // Add narrative replacements
  replacements['opening_narrative'] = generateOpeningNarrative(rowData, hdr);
  replacements['phase1_narrative'] = generatePhase1Narrative(rowData, hdr);
  replacements['phase2_narrative'] = generatePhase2Narrative(rowData, hdr);
  replacements['results_narrative'] = generateResultsNarrative(rowData, hdr);
  replacements['profile_narrative'] = generateProfileNarrative(profileId, rowData, hdr);
  
  // Replace all placeholders with data
  Object.entries(replacements).forEach(([placeholder, value]) => {
    body.replaceText(`{{${placeholder}}}`, value);
  });
  
  // Handle vehicle recommendations table
  const recommendations = formatVehicleRecommendations(rowData, hdr);
  const vehiclePlaceholder = '[Vehicle recommendations will be inserted here]';
  const bodyText = body.getText();
  if (bodyText.includes(vehiclePlaceholder)) {
    // Find the paragraph containing the placeholder
    let foundElement = null;
    let foundIndex = -1;
    const numChildren = body.getNumChildren();
    for (let i = 0; i < numChildren; i++) {
      const child = body.getChild(i);
      if (child.getType() === DocumentApp.ElementType.PARAGRAPH) {
        if (child.asText().getText().includes(vehiclePlaceholder)) {
          foundElement = child;
          foundIndex = i;
          break;
        }
      }
    }
    
    if (foundElement) {
      foundElement.asText().setText(''); // Clear placeholder text
      // Insert table at the correct position
      const table = body.insertTable(foundIndex + 1);
      populateVehicleRecommendationsTable(table, recommendations);
    }
  }
  
  // Handle action steps with narrative
  const actionPlaceholder = '[Action steps will be inserted here]';
  if (body.getText().includes(actionPlaceholder)) {
    const actionNarrative = generateActionStepsNarrative(rowData, hdr, recommendations);
    body.replaceText(actionPlaceholder, actionNarrative);
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
    
    // Copy all elements from profile template (with safety limit)
    const totalElements = profileBody.getNumChildren();
    const maxElements = Math.min(totalElements, 100); // Safety limit
    
    for (let i = 0; i < maxElements; i++) {
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
function createTemplateDocumentsOLD() {
  const folder = DOC_CONFIG.OUTPUT_FOLDER_ID ? 
    DriveApp.getFolderById(DOC_CONFIG.OUTPUT_FOLDER_ID) : 
    DriveApp.getRootFolder();
    
  // Create universal template
  const universalDoc = DocumentApp.create('TEMPLATE - Retirement Blueprint Universal Enhanced');
  const universalBody = universalDoc.getBody();
  
  // Add template structure
  universalBody.clear();
  
  // Title Page
  universalBody.appendParagraph('RETIREMENT BLUEPRINT').setHeading(DocumentApp.ParagraphHeading.TITLE);
  universalBody.appendParagraph('Your Personalized Path to Financial Freedom').setHeading(DocumentApp.ParagraphHeading.SUBTITLE);
  universalBody.appendParagraph('');
  universalBody.appendParagraph('Prepared for: {{Full_Name}}');
  universalBody.appendParagraph('Date: {{report_date}}');
  universalBody.appendParagraph('Profile Type: {{profile_title}}');
  
  universalBody.appendPageBreak();
  
  // Personal Opening
  universalBody.appendParagraph('{{opening_narrative}}');
  
  // Chapter 1: Your Current Path
  universalBody.appendParagraph('CHAPTER 1: YOUR CURRENT PATH').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  universalBody.appendParagraph('{{phase1_narrative}}');
  
  universalBody.appendParagraph('Financial Snapshot').setHeading(DocumentApp.ParagraphHeading.HEADING2);
  const metricsTable = universalBody.appendTable();
  
  let row1 = metricsTable.appendTableRow();
  row1.appendTableCell('Annual Income');
  row1.appendTableCell('{{gross_annual_income}}');
  
  let row2 = metricsTable.appendTableRow();
  row2.appendTableCell('Monthly Net Income');
  row2.appendTableCell('{{Net_Monthly_Income}}');
  
  let row3 = metricsTable.appendTableRow();
  row3.appendTableCell('Filing Status');
  row3.appendTableCell('{{filing_status}}');
  
  let row4 = metricsTable.appendTableRow();
  row4.appendTableCell('Current Savings Rate');
  row4.appendTableCell('{{Allocation_Percentage}}%');
  
  let row5 = metricsTable.appendTableRow();
  row5.appendTableCell('Years to Retirement');
  row5.appendTableCell('{{retirement_years_until_target}}');
  
  // Chapter 2: Your Priorities and Vision
  universalBody.appendParagraph('CHAPTER 2: YOUR PRIORITIES AND VISION').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  universalBody.appendParagraph('{{phase2_narrative}}');
  
  // Profile-specific insights
  universalBody.appendParagraph('Your Unique Advantages').setHeading(DocumentApp.ParagraphHeading.HEADING2);
  universalBody.appendParagraph('{{profile_narrative}}');
  
  // Chapter 3: Your Optimization Opportunity
  universalBody.appendParagraph('CHAPTER 3: YOUR OPTIMIZATION OPPORTUNITY').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  universalBody.appendParagraph('{{results_narrative}}');
  
  universalBody.appendParagraph('Monthly Contribution Analysis').setHeading(DocumentApp.ParagraphHeading.HEADING2);
  const contributionTable = universalBody.appendTable();
  
  let headerRow = contributionTable.appendTableRow();
  headerRow.appendTableCell('Category');
  headerRow.appendTableCell('Current Monthly');
  headerRow.appendTableCell('Optimized Monthly');
  headerRow.appendTableCell('Improvement');
  
  let dataRow = contributionTable.appendTableRow();
  dataRow.appendTableCell('Total Contributions');
  dataRow.appendTableCell('{{total_actual_monthly}}');
  dataRow.appendTableCell('{{total_ideal_monthly}}');
  dataRow.appendTableCell('{{monthly_difference}}');
  
  // Chapter 4: Your Future Wealth Projection
  universalBody.appendParagraph('CHAPTER 4: YOUR FUTURE WEALTH PROJECTION').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  universalBody.appendParagraph('With your personalized growth rate of {{personalized_annual_rate}}, here\'s how your wealth will accumulate:');
  
  const fvTable = universalBody.appendTable();
  
  let fvHeader = fvTable.appendTableRow();
  fvHeader.appendTableCell('Wealth Domain');
  fvHeader.appendTableCell('Current Path');
  fvHeader.appendTableCell('Optimized Path');
  fvHeader.appendTableCell('Additional Wealth');
  
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
  fvRow3.appendTableCell('Healthcare');
  fvRow3.appendTableCell('{{health_fv_actual}}');
  fvRow3.appendTableCell('{{health_fv_ideal}}');
  fvRow3.appendTableCell('{{health_fv_gain}}');
  
  // Chapter 5: Your Vehicle Allocation Strategy
  universalBody.appendParagraph('CHAPTER 5: YOUR VEHICLE ALLOCATION STRATEGY').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  universalBody.appendParagraph('We\'ve carefully ordered your investment vehicles to maximize tax advantages and compound growth:');
  universalBody.appendParagraph('[Vehicle recommendations will be inserted here]');
  
  // Chapter 6: Your Action Plan
  universalBody.appendParagraph('CHAPTER 6: YOUR ACTION PLAN').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  universalBody.appendParagraph('[Action steps will be inserted here]');
  
  // Closing
  universalBody.appendPageBreak();
  universalBody.appendParagraph('YOUR NEXT STEPS').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  universalBody.appendParagraph('Success in retirement planning comes from taking action. Start today with your personalized action plan above.');
  
  universalBody.appendParagraph('');
  universalBody.appendParagraph('To your financial freedom,');
  universalBody.appendParagraph('The Retirement Blueprint Team');
  
  universalDoc.saveAndClose();
  
  // Move to folder if specified
  if (DOC_CONFIG.OUTPUT_FOLDER_ID) {
    DriveApp.getFileById(universalDoc.getId()).moveTo(folder);
  }
  
  Logger.log(`Enhanced universal template created with ID: ${universalDoc.getId()}`);
  Logger.log('Update DOC_CONFIG.UNIVERSAL_TEMPLATE_ID with this ID');
  
  return universalDoc.getId();
}

/**
 * Create template documents - NEW EFFICIENT VERSION
 */
function createTemplateDocuments() {
  try {
    const folder = DOC_CONFIG.OUTPUT_FOLDER_ID ? 
      DriveApp.getFolderById(DOC_CONFIG.OUTPUT_FOLDER_ID) : 
      DriveApp.getRootFolder();
      
    // Create document with simpler approach
    const doc = DocumentApp.create('TEMPLATE - Retirement Blueprint Enhanced V2');
    const body = doc.getBody();
    
    // Clear and build efficiently
    body.clear();
    
    // Title section
    body.appendParagraph('RETIREMENT BLUEPRINT').setHeading(DocumentApp.ParagraphHeading.TITLE);
    body.appendParagraph('Your Personalized Path to Financial Freedom');
    body.appendParagraph('');
    body.appendParagraph('Prepared for: {{Full_Name}}');
    body.appendParagraph('Date: {{report_date}}');
    body.appendParagraph('Profile: {{profile_title}}');
    
    body.appendPageBreak();
    
    // Opening
    body.appendParagraph('{{opening_narrative}}');
    body.appendParagraph('');
    
    // Chapter 1
    body.appendParagraph('CHAPTER 1: YOUR CURRENT PATH').setHeading(DocumentApp.ParagraphHeading.HEADING1);
    body.appendParagraph('{{phase1_narrative}}');
    body.appendParagraph('');
    
    // Simple table for financial snapshot
    body.appendParagraph('Financial Snapshot:');
    body.appendParagraph('Annual Income: {{gross_annual_income}}');
    body.appendParagraph('Monthly Net: {{Net_Monthly_Income}}');
    body.appendParagraph('Savings Rate: {{Allocation_Percentage}}%');
    body.appendParagraph('');
    
    // Chapter 2
    body.appendParagraph('CHAPTER 2: YOUR PRIORITIES').setHeading(DocumentApp.ParagraphHeading.HEADING1);
    body.appendParagraph('{{phase2_narrative}}');
    body.appendParagraph('');
    body.appendParagraph('{{profile_narrative}}');
    body.appendParagraph('');
    
    // Chapter 3
    body.appendParagraph('CHAPTER 3: YOUR OPPORTUNITY').setHeading(DocumentApp.ParagraphHeading.HEADING1);
    body.appendParagraph('{{results_narrative}}');
    body.appendParagraph('');
    body.appendParagraph('Monthly Contributions:');
    body.appendParagraph('Current: {{total_actual_monthly}}');
    body.appendParagraph('Optimized: {{total_ideal_monthly}}');
    body.appendParagraph('Improvement: {{monthly_difference}}');
    body.appendParagraph('');
    
    // Chapter 4
    body.appendParagraph('CHAPTER 4: FUTURE PROJECTIONS').setHeading(DocumentApp.ParagraphHeading.HEADING1);
    body.appendParagraph('Growth Rate: {{personalized_annual_rate}}');
    body.appendParagraph('');
    body.appendParagraph('Retirement Future Value:');
    body.appendParagraph('Current Path: {{retirement_fv_actual}}');
    body.appendParagraph('Optimized Path: {{retirement_fv_ideal}}');
    body.appendParagraph('Additional Wealth: {{retirement_fv_gain}}');
    body.appendParagraph('');
    
    // Chapter 5
    body.appendParagraph('CHAPTER 5: YOUR VEHICLES').setHeading(DocumentApp.ParagraphHeading.HEADING1);
    body.appendParagraph('[Vehicle recommendations will be inserted here]');
    body.appendParagraph('');
    
    // Chapter 6
    body.appendParagraph('CHAPTER 6: YOUR ACTION PLAN').setHeading(DocumentApp.ParagraphHeading.HEADING1);
    body.appendParagraph('[Action steps will be inserted here]');
    body.appendParagraph('');
    
    // Simple closing
    body.appendParagraph('Remember: The best plan is the one you implement.');
    body.appendParagraph('Start today!');
    
    // Save and close
    doc.saveAndClose();
    
    // Move to folder
    if (DOC_CONFIG.OUTPUT_FOLDER_ID) {
      const file = DriveApp.getFileById(doc.getId());
      file.moveTo(folder);
    }
    
    const docId = doc.getId();
    Logger.log('Enhanced template created successfully!');
    Logger.log('Template ID: ' + docId);
    
    return docId;
    
  } catch (error) {
    Logger.log('Error creating template: ' + error.toString());
    throw error;
  }
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
 * Populate vehicle recommendations table
 */
function populateVehicleRecommendationsTable(table, recommendations) {
  if (!recommendations || recommendations.length === 0) {
    const row = table.appendTableRow();
    row.appendTableCell('No vehicle recommendations available.');
    return;
  }
  
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

// ═══════════════════════════════════════════════════════════════════════════════
// NARRATIVE GENERATION FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Generate opening narrative based on client data
 */
function generateOpeningNarrative(rowData, hdr) {
  const firstName = (rowData[hdr['Full_Name']] || '').split(' ')[0];
  const age = rowData[hdr['Current_Age']];
  const workSituation = rowData[hdr['Work_Situation']];
  const profileId = rowData[hdr['ProfileID']];
  const profileConfig = PROFILE_CONFIG[profileId];
  
  let narrative = `Dear ${firstName},\n\n`;
  
  // Age-based opening
  if (age < 35) {
    narrative += `At ${age}, you're at an ideal stage to build a powerful financial foundation. `;
  } else if (age < 50) {
    narrative += `At ${age}, you're in your peak earning years with significant opportunities to accelerate your wealth building. `;
  } else if (age < 60) {
    narrative += `At ${age}, you've entered a critical phase where strategic decisions can dramatically impact your retirement security. `;
  } else {
    narrative += `At ${age}, you're approaching or in retirement with important opportunities to optimize and protect your wealth. `;
  }
  
  // Work situation context
  if (workSituation === 'Self-employed') {
    narrative += `As a self-employed professional, you have unique control over your retirement strategy. `;
  } else if (workSituation === 'W-2 employee') {
    narrative += `As an employee, you have access to valuable workplace benefits that we'll help you maximize. `;
  } else if (workSituation === 'Both') {
    narrative += `With both employment and self-employment income, you have exceptional opportunities to diversify your retirement savings. `;
  }
  
  narrative += `\n\nThis personalized Retirement Blueprint has been crafted specifically for your situation as a ${profileConfig.title}. `;
  narrative += `We've analyzed your current financial position, understood your priorities, and designed a strategy that aligns with your goals.`;
  
  return narrative;
}

/**
 * Generate Phase 1 narrative - Current Situation Story
 */
function generatePhase1Narrative(rowData, hdr) {
  const income = formatCurrency(rowData[hdr['gross_annual_income']]);
  const netMonthly = formatCurrency(rowData[hdr['Net_Monthly_Income']]);
  const savingsRate = rowData[hdr['Allocation_Percentage']] + '%';
  const filingStatus = rowData[hdr['filing_status']];
  const retirementTimeframe = rowData[hdr['Retirement_Timeframe']];
  const actionMotivation = rowData[hdr['Action_Motivation']];
  
  let narrative = '\n\nWith an annual income of ' + income + ' and monthly net income of ' + netMonthly + ', ';
  narrative += 'you\'ve committed to saving ' + savingsRate + ' of your income for the future. ';
  
  // Tax situation
  if (filingStatus === 'Single') {
    narrative += 'As a single filer, we\'ll help you maximize individual contribution limits and tax advantages. ';
  } else if (filingStatus === 'Married Filing Jointly') {
    narrative += 'Filing jointly provides opportunities for higher contribution limits and coordinated tax strategies. ';
  }
  
  // Urgency and motivation
  if (retirementTimeframe === 'Less than 5 years') {
    narrative += '\n\nWith retirement approaching soon, every decision counts. ';
  } else if (retirementTimeframe === '5-10 years') {
    narrative += '\n\nWith 5-10 years until retirement, you\'re in the critical accumulation phase. ';
  } else {
    narrative += '\n\nWith over 10 years until retirement, time is your greatest asset. ';
  }
  
  if (actionMotivation === 'Urgent - Need to act now') {
    narrative += 'Your sense of urgency is well-founded, and we\'re here to help you take immediate, effective action.';
  } else {
    narrative += 'Your proactive approach to planning will pay significant dividends over time.';
  }
  
  return narrative;
}

/**
 * Generate Phase 2 narrative - Priorities and Goals
 */
function generatePhase2Narrative(rowData, hdr) {
  const retirementImportance = rowData[hdr['retirement_importance']];
  const educationImportance = rowData[hdr['education_importance']];
  const healthImportance = rowData[hdr['health_importance']];
  const hasChildren = rowData[hdr['cesa_num_children']] > 0;
  const hsaEligible = rowData[hdr['hsa_eligibility']] === 'Yes';
  const investmentConfidence = rowData[hdr['investment_confidence']];
  
  let narrative = '\n\n';
  
  // Investment philosophy
  const confidenceLevel = parseInt(investmentConfidence) || 4;
  if (confidenceLevel >= 6) {
    narrative += 'Your high investment confidence (' + confidenceLevel + '/7) indicates you\'re ready for sophisticated strategies. ';
  } else if (confidenceLevel >= 4) {
    narrative += 'Your moderate investment confidence (' + confidenceLevel + '/7) suggests a balanced approach with room for growth. ';
  } else {
    narrative += 'We\'ll help build your investment confidence (currently ' + confidenceLevel + '/7) through education and gradual implementation. ';
  }
  
  // Domain priorities
  const priorities = [
    { domain: 'retirement', importance: parseInt(retirementImportance) || 0 },
    { domain: 'education', importance: parseInt(educationImportance) || 0 },
    { domain: 'health', importance: parseInt(healthImportance) || 0 }
  ].sort((a, b) => b.importance - a.importance);
  
  narrative += '\n\nYour priorities are clear: ';
  
  if (priorities[0].domain === 'retirement') {
    narrative += 'Retirement security is your top priority, ';
  } else if (priorities[0].domain === 'education' && hasChildren) {
    narrative += 'Funding your children\'s education is your top priority, ';
  } else if (priorities[0].domain === 'health') {
    narrative += 'Health security and medical expense planning is your top priority, ';
  }
  
  narrative += 'and we\'ve designed your strategy accordingly. ';
  
  // Specific goals
  const desiredRetirement = rowData[hdr['retirement_desired_monthly_income']];
  if (desiredRetirement) {
    narrative += 'Your goal of ' + formatCurrency(desiredRetirement) + ' monthly retirement income guides our recommendations. ';
  }
  
  return narrative;
}

/**
 * Generate results interpretation narrative
 */
function generateResultsNarrative(rowData, hdr) {
  const actualTotal = calculateTotalMonthly(rowData, hdr, 'actual');
  const idealTotal = calculateTotalMonthly(rowData, hdr, 'ideal');
  const difference = idealTotal - actualTotal;
  const percentIncrease = actualTotal > 0 ? ((difference / actualTotal) * 100).toFixed(0) : 100;
  
  let narrative = '\n\n';
  
  if (difference > 0) {
    narrative += 'By optimizing your allocation strategy, you can increase your monthly contributions by ' + formatCurrency(difference) + ' ';
    narrative += '(a ' + percentIncrease + '% improvement) while maximizing tax advantages. ';
  } else if (difference === 0) {
    narrative += 'Congratulations! You\'re already optimizing your contributions effectively. ';
    narrative += 'Our recommendations confirm your current strategy while ensuring you\'re not missing any opportunities. ';
  }
  
  // Future value impact
  const retirementFvActual = parseFloat(rowData[hdr['retirement_fv_actual']]) || 0;
  const retirementFvIdeal = parseFloat(rowData[hdr['retirement_fv_ideal']]) || 0;
  const fvDifference = retirementFvIdeal - retirementFvActual;
  
  if (fvDifference > 1000000) {
    narrative += '\n\nThis optimization could mean an additional ' + formatCurrency(fvDifference) + ' in retirement savings - ';
    narrative += 'that\'s over a million dollars in additional wealth for your future. ';
  } else if (fvDifference > 100000) {
    narrative += '\n\nOver time, this strategy could generate an additional ' + formatCurrency(fvDifference) + ' for retirement. ';
  }
  
  return narrative;
}

/**
 * Generate action steps narrative
 */
function generateActionStepsNarrative(rowData, hdr, recommendations) {
  let narrative = 'Based on your unique situation, here are your priority actions:\n\n';
  
  // Get top 3 recommendations by ideal amount
  const topActions = recommendations
    .filter(r => r.ideal > r.actual)
    .sort((a, b) => (b.ideal - b.actual) - (a.ideal - a.actual))
    .slice(0, 3);
  
  topActions.forEach((action, index) => {
    narrative += (index + 1) + '. ' + action.name + ': ';
    
    if (action.actual === 0) {
      narrative += 'Open and fund with ' + formatCurrency(action.ideal) + ' monthly. ';
    } else {
      narrative += 'Increase from ' + formatCurrency(action.actual) + ' to ' + formatCurrency(action.ideal) + ' monthly. ';
    }
    
    // Add specific guidance
    if (action.name.includes('401(k) Match')) {
      narrative += 'This is free money from your employer - make this your #1 priority. ';
    } else if (action.name.includes('HSA')) {
      narrative += 'Triple tax advantage makes this incredibly valuable for long-term growth. ';
    } else if (action.name.includes('Backdoor')) {
      narrative += 'This strategy reclaims Roth benefits despite income limits. ';
    }
    
    narrative += '\n\n';
  });
  
  return narrative;
}

/**
 * Generate profile-specific narrative section
 */
function generateProfileNarrative(profileId, rowData, hdr) {
  const narratives = {
    '1_ROBS_In_Use': generateROBSInUseNarrative,
    '2_ROBS_Curious': generateROBSCuriousNarrative,
    '3_Solo401k_Builder': generateSolo401kNarrative,
    '4_Roth_Reclaimer': generateRothReclaimerNarrative,
    '5_Bracket_Strategist': generateBracketStrategistNarrative,
    '6_Catch_Up': generateCatchUpNarrative,
    '7_Foundation_Builder': generateFoundationBuilderNarrative,
    '8_Biz_Owner_Group': generateBizOwnerNarrative,
    '9_Late_Stage_Growth': generateLateStageNarrative
  };
  
  const narrativeFunction = narratives[profileId];
  if (narrativeFunction && typeof narrativeFunction === 'function') {
    return narrativeFunction(rowData, hdr);
  }
  
  return '';
}

// Profile-specific narrative generators

function generateROBSInUseNarrative(rowData, hdr) {
  const profitDistribution = rowData[hdr['ex_q6']];
  const contributionType = rowData[hdr['ex_q3']];
  
  let narrative = '\n\nYou\'ve taken the entrepreneurial leap, using your retirement funds to build your business through a ROBS structure. ';
  narrative += 'This positions you uniquely in the retirement planning landscape.\n\n';
  
  if (profitDistribution) {
    narrative += 'With projected annual profit distributions of ' + formatCurrency(profitDistribution) + ', ';
    narrative += 'you have virtually unlimited contribution capacity - a massive advantage over traditional retirement savers. ';
  }
  
  narrative += '\n\nYour C-corporation structure allows you to contribute far beyond normal limits, ';
  narrative += 'turning business profits into tax-advantaged retirement savings. ';
  
  if (contributionType === 'Roth only') {
    narrative += 'Your preference for Roth contributions will create tax-free wealth for retirement. ';
  } else if (contributionType === 'Traditional only') {
    narrative += 'Your traditional contributions provide immediate tax deductions to fuel business growth. ';
  } else {
    narrative += 'Your balanced approach between Roth and traditional gives you tax flexibility. ';
  }
  
  return narrative;
}

function generateROBSCuriousNarrative(rowData, hdr) {
  const rolloverBalance = rowData[hdr['ex_q5']];
  const businessSavings = rowData[hdr['ex_q6']];
  
  let narrative = '\n\nYou\'re considering one of the most powerful strategies for entrepreneurial wealth building. ';
  
  if (rolloverBalance) {
    narrative += 'With ' + formatCurrency(rolloverBalance) + ' available for rollover, ';
    narrative += 'you have substantial capital to launch or acquire a business while maintaining tax advantages. ';
  }
  
  narrative += '\n\nA ROBS structure could transform your retirement savings into active business capital, ';
  narrative += 'potentially accelerating wealth creation beyond traditional investment returns. ';
  
  if (businessSavings) {
    narrative += 'Your projected business savings of ' + formatCurrency(businessSavings) + ' annually ';
    narrative += 'could flow into your Solo 401(k) with no contribution limits. ';
  }
  
  return narrative;
}

// Placeholder functions for other profiles
function generateSolo401kNarrative(rowData, hdr) {
  return '\n\nAs a self-employed professional, you have the unique ability to contribute as both employee and employer, potentially doubling your retirement savings capacity.';
}

function generateRothReclaimerNarrative(rowData, hdr) {
  return '\n\nYour high income is both a blessing and a challenge. We\'ll help you navigate income limits to reclaim valuable Roth contribution opportunities.';
}

function generateBracketStrategistNarrative(rowData, hdr) {
  return '\n\nYour tax-aware approach positions you well for both current deductions and future tax-free growth. Balance is key to your strategy.';
}

function generateCatchUpNarrative(rowData, hdr) {
  return '\n\nAt 50+, you\'ve unlocked powerful catch-up provisions that can accelerate your retirement savings in these critical final accumulation years.';
}

function generateFoundationBuilderNarrative(rowData, hdr) {
  return '\n\nYou\'re building your financial foundation at the perfect time. With decades ahead, even modest contributions will compound into significant wealth.';
}

function generateBizOwnerNarrative(rowData, hdr) {
  return '\n\nAs a business owner with employees, you have access to advanced strategies that can save hundreds of thousands in taxes while securing your retirement.';
}

function generateLateStageNarrative(rowData, hdr) {
  return '\n\nYou\'re in the home stretch with important decisions ahead. We\'ll help you optimize these final years while preparing for the transition to retirement income.';
}
/**
 * Bulletproof template creator - absolutely no loops possible
 */
function createTemplateBulletproof() {
  try {
    // Create a brand new document
    const templateName = 'TEMPLATE - Retirement Blueprint Clean ' + new Date().getTime();
    const newDoc = DocumentApp.create(templateName);
    const body = newDoc.getBody();
    
    // Clear everything first
    body.clear();
    
    // Build template step by step with NO loops
    const title = body.appendParagraph('RETIREMENT BLUEPRINT');
    title.setHeading(DocumentApp.ParagraphHeading.TITLE);
    
    body.appendParagraph('Your Personalized Path to Financial Freedom');
    body.appendParagraph('');
    body.appendParagraph('Prepared for: {{Full_Name}}');
    body.appendParagraph('Date: {{report_date}}');
    body.appendParagraph('Profile: {{profile_title}}');
    
    // Single page break
    body.appendPageBreak();
    
    // Opening section
    body.appendParagraph('{{opening_narrative}}');
    body.appendParagraph('');
    
    // Chapter 1
    const ch1 = body.appendParagraph('CHAPTER 1: YOUR CURRENT PATH');
    ch1.setHeading(DocumentApp.ParagraphHeading.HEADING1);
    body.appendParagraph('{{phase1_narrative}}');
    body.appendParagraph('');
    
    body.appendParagraph('Financial Snapshot:');
    body.appendParagraph('• Annual Income: {{gross_annual_income}}');
    body.appendParagraph('• Monthly Net: {{Net_Monthly_Income}}');
    body.appendParagraph('• Savings Rate: {{Allocation_Percentage}}%');
    body.appendParagraph('');
    
    // Chapter 2
    const ch2 = body.appendParagraph('CHAPTER 2: YOUR PRIORITIES');
    ch2.setHeading(DocumentApp.ParagraphHeading.HEADING1);
    body.appendParagraph('{{phase2_narrative}}');
    body.appendParagraph('');
    body.appendParagraph('{{profile_narrative}}');
    body.appendParagraph('');
    
    // Chapter 3
    const ch3 = body.appendParagraph('CHAPTER 3: YOUR OPPORTUNITY');
    ch3.setHeading(DocumentApp.ParagraphHeading.HEADING1);
    body.appendParagraph('{{results_narrative}}');
    body.appendParagraph('');
    
    body.appendParagraph('Monthly Contribution Summary:');
    body.appendParagraph('• Current: {{total_actual_monthly}}');
    body.appendParagraph('• Optimized: {{total_ideal_monthly}}');
    body.appendParagraph('• Improvement: {{monthly_difference}}');
    body.appendParagraph('');
    
    // Chapter 4
    const ch4 = body.appendParagraph('CHAPTER 4: FUTURE PROJECTIONS');
    ch4.setHeading(DocumentApp.ParagraphHeading.HEADING1);
    body.appendParagraph('Your Personalized Growth Rate: {{personalized_annual_rate}}');
    body.appendParagraph('');
    
    body.appendParagraph('Retirement Projections:');
    body.appendParagraph('• Current Path: {{retirement_fv_actual}}');
    body.appendParagraph('• Optimized Path: {{retirement_fv_ideal}}');
    body.appendParagraph('• Additional Wealth: {{retirement_fv_gain}}');
    body.appendParagraph('');
    
    // Chapter 5
    const ch5 = body.appendParagraph('CHAPTER 5: YOUR VEHICLES');
    ch5.setHeading(DocumentApp.ParagraphHeading.HEADING1);
    body.appendParagraph('[Vehicle recommendations will be inserted here]');
    body.appendParagraph('');
    
    // Chapter 6
    const ch6 = body.appendParagraph('CHAPTER 6: YOUR ACTION PLAN');
    ch6.setHeading(DocumentApp.ParagraphHeading.HEADING1);
    body.appendParagraph('[Action steps will be inserted here]');
    body.appendParagraph('');
    
    // Simple closing
    body.appendParagraph('The best retirement plan is the one you actually implement.');
    body.appendParagraph('Start today, and your future self will thank you.');
    body.appendParagraph('');
    body.appendParagraph('To your financial freedom,');
    body.appendParagraph('The Retirement Blueprint Team');
    
    // Save and close
    newDoc.saveAndClose();
    
    // Move to folder if configured
    const folderId = '16KZLGRzLxa-e-jxnkDVb-sZcbosgPvGM';
    if (folderId) {
      const file = DriveApp.getFileById(newDoc.getId());
      const folder = DriveApp.getFolderById(folderId);
      file.moveTo(folder);
    }
    
    const docId = newDoc.getId();
    Logger.log('SUCCESS! Template created with ID: ' + docId);
    Logger.log('Template name: ' + templateName);
    
    // Show success message
    SpreadsheetApp.getUi().alert(
      'Template Created Successfully!\n\n' +
      'Template ID: ' + docId + '\n\n' +
      'Copy this ID and update DOC_CONFIG.UNIVERSAL_TEMPLATE_ID'
    );
    
    return docId;
    
  } catch (error) {
    Logger.log('Error creating template: ' + error.toString());
    SpreadsheetApp.getUi().alert('Error: ' + error.toString());
    throw error;
  }
}

/**
 * Menu function to create bulletproof template
 */
function createBulletproofTemplate() {
  createTemplateBulletproof();
}
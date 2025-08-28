/**
 * Create enhanced template in a more efficient way
 * This version is optimized to avoid timeout issues
 */
function createEnhancedTemplateEfficient() {
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
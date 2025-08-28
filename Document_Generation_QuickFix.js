/**
 * Create a simplified template for testing
 * This avoids any potential loops or issues
 */
function createSimplifiedTemplate() {
  const folder = DOC_CONFIG.OUTPUT_FOLDER_ID ? 
    DriveApp.getFolderById(DOC_CONFIG.OUTPUT_FOLDER_ID) : 
    DriveApp.getRootFolder();
    
  // Create a clean, simple template
  const doc = DocumentApp.create('TEMPLATE - Retirement Blueprint Simple');
  const body = doc.getBody();
  
  body.clear();
  
  // Simple structure without any potential loops
  body.appendParagraph('RETIREMENT BLUEPRINT').setHeading(DocumentApp.ParagraphHeading.TITLE);
  body.appendParagraph('For: {{Full_Name}}');
  body.appendParagraph('Date: {{report_date}}');
  body.appendParagraph('');
  body.appendParagraph('{{opening_narrative}}');
  body.appendPageBreak();
  
  body.appendParagraph('YOUR CURRENT SITUATION').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph('{{phase1_narrative}}');
  body.appendParagraph('');
  
  body.appendParagraph('YOUR PRIORITIES').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph('{{phase2_narrative}}');
  body.appendParagraph('');
  
  body.appendParagraph('YOUR OPPORTUNITY').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph('{{results_narrative}}');
  body.appendParagraph('');
  
  body.appendParagraph('MONTHLY CONTRIBUTIONS').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph('Current: {{total_actual_monthly}}');
  body.appendParagraph('Recommended: {{total_ideal_monthly}}');
  body.appendParagraph('Improvement: {{monthly_difference}}');
  body.appendParagraph('');
  
  body.appendParagraph('YOUR VEHICLES').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph('[Vehicle recommendations will be inserted here]');
  body.appendParagraph('');
  
  body.appendParagraph('YOUR ACTION PLAN').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph('[Action steps will be inserted here]');
  
  doc.saveAndClose();
  
  // Move to folder if specified
  if (DOC_CONFIG.OUTPUT_FOLDER_ID) {
    DriveApp.getFileById(doc.getId()).moveTo(folder);
  }
  
  Logger.log(`Simplified template created with ID: ${doc.getId()}`);
  return doc.getId();
}

/**
 * Quick diagnostic function
 */
function diagnoseDocumentGeneration() {
  const templateId = DOC_CONFIG.UNIVERSAL_TEMPLATE_ID;
  try {
    const templateDoc = DocumentApp.openById(templateId);
    const body = templateDoc.getBody();
    const numChildren = body.getNumChildren();
    
    Logger.log(`Template has ${numChildren} elements`);
    
    // Check for any suspicious patterns
    for (let i = 0; i < Math.min(10, numChildren); i++) {
      const element = body.getChild(i);
      Logger.log(`Element ${i}: ${element.getType()} - ${element.getText().substring(0, 50)}`);
    }
    
  } catch (error) {
    Logger.log(`Error diagnosing template: ${error}`);
  }
}
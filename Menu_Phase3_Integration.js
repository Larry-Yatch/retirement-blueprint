// ═══════════════════════════════════════════════════════════════════════════════
// MENU ADDITIONS FOR PHASE 3 DOCUMENT INTEGRATION
// Add these menu items to the existing onOpen() function in code.js
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Additional menu items for Phase 3 integration
 * Add this to the Document Generation menu in onOpen()
 * 
 * Example integration in onOpen():
 * 
 * // Document Generation menu
 * ui.createMenu('📄 Document Generation')
 *   .addItem('🎨 Generate Branded Blueprint', 'generateDocumentBranded')
 *   .addItem('Generate Safe Blueprint', 'generateDocumentSafe')
 *   .addSeparator()
 *   // ADD THESE NEW ITEMS:
 *   .addSubMenu(ui.createMenu('🔄 Phase 3 Integration')
 *     .addItem('Test Phase 3 Document Generation', 'testPhase3DocumentGeneration')
 *     .addItem('Generate Document for Current Row', 'generateDocumentForCurrentRow')
 *     .addItem('Batch Generate Documents', 'batchGenerateDocuments'))
 *   .addSeparator()
 *   .addItem('Test Document Generation', 'runDocumentGenerationTest')
 *   // ... rest of menu
 */

/**
 * Alternative: Standalone Phase 3 menu
 * Add this as a separate menu if preferred
 */
function addPhase3Menu() {
  const ui = SpreadsheetApp.getUi();
  
  ui.createMenu('🔄 Phase 3 Automation')
    .addItem('Run Phase 3 for Current Row', 'runPhase3ForCurrentRow')
    .addItem('Test Document Integration', 'testPhase3DocumentGeneration')
    .addItem('Generate Document Only', 'generateDocumentForCurrentRow')
    .addSeparator()
    .addItem('Batch Generate Documents', 'batchGenerateDocuments')
    .addSeparator()
    .addItem('Test Helper Functions', 'testDocumentHelpers')
    .addToUi();
}

/**
 * Wrapper to run Phase 3 for current row
 */
function runPhase3ForCurrentRow() {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const row = sheet.getActiveRange().getRow();
    
    if (row < 3) {
      SpreadsheetApp.getUi().alert('Please select a data row (row 3 or below)');
      return;
    }
    
    Logger.log(`Running Phase 3 for row ${row}...`);
    
    // Check if runPhase3 function exists
    if (typeof runPhase3 === 'function') {
      runPhase3(row);
      SpreadsheetApp.getUi().alert('✅ Success!', `Phase 3 completed for row ${row}.\n\nCheck the logs for document generation status.`, SpreadsheetApp.getUi().ButtonSet.OK);
    } else {
      SpreadsheetApp.getUi().alert('❌ Error', 'runPhase3 function not found. Ensure code.js is loaded.', SpreadsheetApp.getUi().ButtonSet.OK);
    }
    
  } catch (error) {
    SpreadsheetApp.getUi().alert('❌ Error', error.toString(), SpreadsheetApp.getUi().ButtonSet.OK);
  }
}

/**
 * Quick test to verify all integration components are available
 */
function verifyPhase3Integration() {
  const ui = SpreadsheetApp.getUi();
  let report = 'Phase 3 Integration Status:\n\n';
  
  // Check core functions
  const functions = [
    { name: 'runPhase3', desc: 'Phase 3 automation' },
    { name: 'generateRetirementBlueprint', desc: 'Document integration wrapper' },
    { name: 'generateRetirementBlueprintSafe', desc: 'Safe document generation' },
    { name: 'generateDocumentBranded', desc: 'Branded document generation' },
    { name: 'formatCurrency', desc: 'Currency formatting helper' },
    { name: 'generateOpeningNarrative', desc: 'Narrative generation' }
  ];
  
  functions.forEach(func => {
    const exists = typeof this[func.name] === 'function';
    report += `${exists ? '✅' : '❌'} ${func.name} - ${func.desc}\n`;
  });
  
  // Check configuration objects
  report += '\nConfiguration Objects:\n';
  const configs = [
    { name: 'DOC_CONFIG', desc: 'Document configuration' },
    { name: 'PROFILE_CONFIG', desc: 'Profile configuration' },
    { name: 'BRANDING_CONFIG', desc: 'Branding configuration' },
    { name: 'ADDENDUM_CONFIG', desc: 'Addendum configuration' }
  ];
  
  configs.forEach(config => {
    const exists = typeof this[config.name] !== 'undefined';
    report += `${exists ? '✅' : '❌'} ${config.name} - ${config.desc}\n`;
  });
  
  ui.alert('Integration Status', report, ui.ButtonSet.OK);
}
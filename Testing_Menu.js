// Add Testing Menu to Google Sheets
// Add this to Code.js or as a separate file

/**
 * Create custom menu when sheet opens
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  
  ui.createMenu('🧪 Profile Testing')
    .addSubMenu(ui.createMenu('Profile 2 - ROBS Curious')
      .addItem('Test W-2 Employee', 'testProfile2_W2')
      .addItem('Test Self-Employed', 'testProfile2_Self')
      .addItem('Test Both Employment', 'testProfile2_Both')
      .addItem('Test Family Business', 'testProfile2_Family')
      .addItem('Test High Income', 'testProfile2_High')
      .addSeparator()
      .addItem('Run ALL Tests', 'runAllCompleteTests')
      .addItem('Clean Up Test Data', 'cleanupTestData'))
    .addSeparator()
    .addItem('Validate Last Submission', 'validateLastSubmission')
    .addToUi();
}

// Individual test functions for menu
function testProfile2_W2() {
  runCompleteProfile2Test('w2Employee');
}

function testProfile2_Self() {
  runCompleteProfile2Test('selfEmployed');
}

function testProfile2_Both() {
  runCompleteProfile2Test('both');
}

function testProfile2_Family() {
  runCompleteProfile2Test('spouseInBusiness');
}

function testProfile2_High() {
  runCompleteProfile2Test('highIncome');
}

function validateLastSubmission() {
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  const lastRow = ws.getLastRow();
  validateProfile2Submission(lastRow);
}
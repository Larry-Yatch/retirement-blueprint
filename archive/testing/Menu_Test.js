/**
 * Simple test to verify menu creation
 */

function testMenuCreation() {
  const ui = SpreadsheetApp.getUi();
  ui.alert('Menu Test', 'If you see this, the code is running!', ui.ButtonSet.OK);
}

function createTestMenu() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🔧 Test Menu')
    .addItem('Test Alert', 'testMenuCreation')
    .addToUi();
}
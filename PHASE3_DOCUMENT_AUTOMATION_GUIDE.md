# Phase 3 Document Generation Automation Guide

## Overview

This guide explains how to make document generation automatic after Phase 3 completes, while keeping manual generation options available.

## What Changes

### Current Flow (Manual)
1. User submits Phase 1 form → Profile classification → Email sent
2. User submits Phase 2 form → Allocation engine runs → Phase 3 runs automatically
3. **Manual step**: Admin must click menu option to generate document

### New Flow (Automated)
1. User submits Phase 1 form → Profile classification → Email sent
2. User submits Phase 2 form → Allocation engine runs → Phase 3 runs automatically
3. **Automatic**: Document generates and email sends with 3 PDFs attached

## Implementation Steps

### 1. Add the Required Files

Add these TWO files to your Google Apps Script project:

#### A. Document_Generation_Helpers.js
1. Click the "+" button next to Files
2. Name it `Document_Generation_Helpers`
3. Copy the entire contents of `Document_Generation_Helpers.js` into the new file
4. Save the file

#### B. Phase3_Document_Integration.js
1. Click the "+" button next to Files
2. Name it `Phase3_Document_Integration`
3. Copy the entire contents of `Phase3_Document_Integration.js` into the new file
4. Save the file

### 2. Verify Existing Files

Ensure you have these files in your Google Apps Script project:
- `Generate_Document_Branded.gs`
- `Generate_Document_Safe.gs`
- `Document_Branding.gs`
- `Logo_Helper.gs`

The integration uses functions from these existing files.

### 3. No Changes to Core Code

The existing `code.js` already calls `generateRetirementBlueprint(rowNum)` after Phase 3 completes. Our new integration file provides this function, so no changes to `code.js` are needed.

### 4. Update Menu (Optional)

To add convenient testing options to the menu, add these functions to your menu:

```javascript
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Retirement Blueprint')
    // ... existing menu items ...
    
    // Add these new items
    .addSeparator()
    .addItem('Test Automated Document Generation', 'testAutomatedDocumentGeneration')
    .addItem('Batch Generate Documents', 'batchGenerateDocuments')
    .addItem('Generate Document for Selected Row (Manual)', 'generateDocumentBranded')
    .addToUi();
}
```

## How It Works

### Automatic Generation
When Phase 3 completes, it automatically:
1. Calls `generateRetirementBlueprint(rowNum)`
2. Creates the branded document
3. Sends email with 3 PDF attachments
4. Saves document URL to Working Sheet (optional new column)

### Manual Options Remain
You can still manually generate documents:
- **Single Row**: Select a row and use menu option "Generate Document for Selected Row"
- **Test Function**: Use "Test Automated Document Generation" to test with a specific row
- **Batch Processing**: Use "Batch Generate Documents" for multiple rows at once

## Error Handling

The automation is designed to be resilient:
- If document generation fails, Phase 3 still completes successfully
- Errors are logged but don't break the main flow
- Document URL is saved to sheet if possible (creates column if needed)

## Testing

### Test Single Row Automation
```javascript
// In Script Editor, run:
testAutomatedDocumentGeneration()
// Change testRow variable in the function to test different rows
```

### Test Batch Processing
1. Use menu: Retirement Blueprint → Batch Generate Documents
2. Enter row numbers like: 3,5,7
3. System will process each row and report results

### Monitor Logs
Check logs for detailed information:
- View → Logs in Script Editor
- Look for messages starting with 📄, ✅, or ❌

## Rollback Plan

If you need to disable automatic generation temporarily:

1. Comment out the document generation call in `code.js`:
```javascript
// In runPhase3 function, comment out these lines:
/*
try {
  if (typeof generateRetirementBlueprint === 'function') {
    generateRetirementBlueprint(rowNum);
    Logger.log(`📄 Generated retirement blueprint document for row ${rowNum}`);
  }
} catch (docError) {
  Logger.log(`⚠️ Document generation error for row ${rowNum}: ${docError.message}`);
}
*/
```

2. Documents can still be generated manually via menu options

## Troubleshooting

### Common Errors

**"formatCurrency is not defined"** 
- Solution: Ensure you've added `Document_Generation_Helpers.js` to your project
- This file contains all the helper functions needed for document generation

**"generateRetirementBlueprint is not defined"**
- Solution: Ensure you've added `Phase3_Document_Integration.js` to your project
- This file provides the bridge between Phase 3 and document generation

**Document generation fails silently**
- Check the logs (View → Logs in Script Editor)
- Look for error messages starting with ❌
- Verify all required files are present

## Benefits

1. **Fully Automated**: No manual intervention needed after form submission
2. **Immediate Delivery**: Users get their blueprint right after Phase 2
3. **Error Resilient**: Failures don't break the main process
4. **Manual Fallback**: Can still generate documents manually if needed
5. **Batch Processing**: Can process multiple rows efficiently
6. **URL Tracking**: Document URLs saved to Working Sheet for reference

## Next Steps

1. Add BOTH files to your Google Apps Script project:
   - `Document_Generation_Helpers.js` (helper functions)
   - `Phase3_Document_Integration.js` (automation bridge)
2. Test with a single row first using `testAutomatedDocumentGeneration()`
3. Monitor logs during first few automated runs
4. Consider adding the optional menu items for convenience
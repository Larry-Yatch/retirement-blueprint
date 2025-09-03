# Google Apps Script Cleanup Guide

## Files to KEEP in Google Apps Script:

These are the core production files needed for the system to work:

1. **code.gs** (or code.js) - Main application logic
2. **Current_Forms_Full.gs** - Form configurations
3. **Document_Branding.gs** - Branding utilities
4. **Form_Management.gs** - Form management functions
5. **Generate_Document_Branded.gs** - Branded document generation
6. **Generate_Document_Safe.gs** - Safe document generation with email
7. **Logo_Helper.gs** - Logo utilities

## Files to DELETE from Google Apps Script:

### Testing Files:
- COMPREHENSIVE_TEST_SCENARIOS.gs
- Menu_Test.gs
- Test_Actual_Ideal_Outputs.gs
- Testing.gs
- Testing_Enhanced.gs
- Testing_Scenarios.gs

### Template Creation Files:
- Create_Enhanced_Template.gs
- Create_Template_Bulletproof.gs

### Fix Scripts:
- Fix_Missing_Headers.gs
- Fix_Profile4.gs
- Run_Profile4_Test.gs

### Old Document Generation:
- Document_Generation.gs
- Document_Generation_backup.gs
- Document_Generation_Clean.gs
- Document_Generation_Complete.gs
- Document_Generation_Debug.gs
- Document_Generation_Narrative.gs
- Document_Generation_QuickFix.gs
- Generate_Document_Branded_Old.gs
- Generate_Document_Branded_Standalone.gs
- Test_Document_Generation.gs

### Any other files not in the KEEP list

## How to Delete in Google Apps Script:

1. Open your Google Apps Script project
2. In the left sidebar, you'll see all the .gs files
3. For each file in the DELETE list:
   - Click on the file
   - Click the three dots menu (⋮) next to the file name
   - Select "Delete"
   - Confirm deletion

## Important Notes:

- Make sure you have a backup before deleting (which you do - it's all in GitHub)
- After deletion, test the document generation to ensure everything still works
- The Google Apps Script project should only contain the 7 core files listed above

## Post-Cleanup Test:

After cleaning up, test the system:
1. Generate a branded document for a test row
2. Verify you receive an email with 3 PDFs attached
3. Check that the document has proper branding applied
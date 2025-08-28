# Google Apps Script Cleanup Instructions

Since clasp doesn't automatically remove files from Google Apps Script, you'll need to manually clean up the test files:

## Option 1: Manual Deletion in Script Editor
1. Open your Google Sheets
2. Go to **Extensions → Apps Script**
3. In the file list on the left, delete these test files:
   - Quick_Test_Profile4.js
   - Test_HeaderMapping.js
   - Test_Profile4_Direct.js
   - Test_Profile8_Allocation.js
   - Test_Profile8_DB.js
   - Test_Profile8_DBThreshold.js
   - Test_Profile8_Priority.js
   - Testing_Enhanced.js

## Option 2: Keep Only Essential Files
Keep these files:
- **Code.js** - Main codebase
- **Testing.js** - Basic testing framework
- **Testing_Scenarios.js** - All test scenarios for future use
- **Form_Management.js** - Form utilities
- **Current_Forms_Full.js** - Form definitions
- **Fix_Missing_Headers.js** - Header utility (might need again)
- **appsscript.json** - Manifest

## Why Keep Testing Files?
- **Testing.js** and **Testing_Scenarios.js** contain all the test scenarios we created
- They're useful for future regression testing
- They document how each profile should behave

## Files Successfully Removed Locally
All test files have been removed from your local directory and won't be pushed in future updates.
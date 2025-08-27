#!/bin/bash

# Clean up Google Apps Script project

echo "Cleaning up Google Apps Script project..."

# Remove all test files locally
echo "Removing test files locally..."
rm -f Test_*.js
rm -f Quick_*.js
rm -f Testing_Enhanced.js

# Push the cleaned version
echo "Pushing cleaned version to Google Apps Script..."
clasp push

echo "Cleanup complete!"
echo ""
echo "Files that will remain in Google Apps Script:"
echo "- Code.js (main code)"
echo "- Testing.js (basic testing framework)"
echo "- Testing_Scenarios.js (test scenarios for all profiles)"
echo "- Form_Management.js (form utilities)"
echo "- Current_Forms_Full.js (form definitions)"
echo "- Fix_Missing_Headers.js (header utility)"
echo "- appsscript.json (manifest)"
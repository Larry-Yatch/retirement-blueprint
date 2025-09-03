# Google Apps Script Files Overview

## Active JS Files in Your Project

When you open Google Apps Script, you should see these files:

### 1. **Code.js** (130KB) - Main Application
- Contains all profile helpers (1-9)
- Universal allocation engine
- Header definitions (HEADERS constant)
- Form configuration (PROFILE_CONFIG)
- Contribution limits (LIMITS)
- Helper functions for calculations
- Menu creation and UI functions

### 2. **Testing.js** (31KB) - Core Testing Framework
- Test scenarios for profiles 2, 4, 7
- `testProfileHelper()` - Tests vehicle generation
- `runCompleteScenarioTest()` - Full allocation testing
- `validateHeaders()` - Basic header validation
- `testUniversalEngine()` - Direct engine testing
- Menu creation for testing UI

### 3. **Testing_Enhanced.js** (24KB) - Enhanced Testing
- `validateHeadersEnhanced()` - Smart header validation
- `fixMissingHeaders()` - Auto-fix missing headers
- `generateCompleteTestData()` - Creates complete test data
- `runTestWithValidation()` - Tests with pre-validation
- Critical fields tracking
- Auto-fix test data issues

### 4. **Form_Management.js** (24KB) - Form Tools
- `exportFormToJSON()` - Export form structure
- `compareFormToTemplate()` - Compare forms
- `updateFormFromTemplate()` - Update forms
- `exportAllForms()` - Batch export
- `analyzeCurrentForms()` - Form analysis
- Form synchronization utilities

### 5. **Current_Forms_Full.js** (135KB) - Form Data
- Complete form structures for all 10 forms
- Phase 1 and Phase 2 form questions
- Form metadata and configuration
- Question mappings
- Exported form data (CURRENT_FORMS object)

### 6. **Profile_Tuning_Template.js** (in templates/) - Development Template
- Template for tuning profiles
- Not actively used in production
- Reference for profile development

## What This Means for Testing

### All Files Share Global Scope
In Google Apps Script, all .js files are loaded together, so:
- Testing.js can call functions from Code.js
- Testing_Enhanced.js can call functions from Testing.js
- Form_Management.js can access CURRENT_FORMS from Current_Forms_Full.js

### Testing Functions Available

From **Testing.js**:
```javascript
// Profile-specific tests
testProfile2All()      // ROBS Curious
testProfile4All()      // Roth Reclaimer
testProfile7All()      // Foundation Builder

// General testing
testAllProfiles()      // Test all profile helpers
validateHeaders()      // Basic validation
```

From **Testing_Enhanced.js**:
```javascript
// Enhanced validation
validateHeadersEnhanced()     // Better header checking
fixMissingHeaders()          // Auto-fix headers
generateCompleteTestData()   // Complete test data
testAllProfilesWithValidation() // Test with validation
```

From **Form_Management.js**:
```javascript
// Form utilities (not needed for testing profiles)
exportAllForms()       // Export form structures
analyzeCurrentForms()  // Analyze form data
```

## For Testing Profiles

You only need to focus on:
1. **Testing.js** - Core testing functions
2. **Testing_Enhanced.js** - Enhanced validation

The other files (Form_Management.js, Current_Forms_Full.js) are for form management and don't affect profile testing.

## Ready to Test!

In the Script Editor, you should see all these files listed. For testing:
1. Start with `validateHeadersEnhanced()` from Testing_Enhanced.js
2. Then run profile tests from Testing.js or Testing_Enhanced.js
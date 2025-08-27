# Technical Reference

## Header Management System

### The Problem
Header mismatches between test functions and the Working Sheet are a recurring issue that causes tests to fail. This happens because:
1. Hardcoded header names in test functions don't match actual Working Sheet headers
2. Row confusion - Headers are in row 2, not row 1
3. Name variations - "Full Name" vs "Full_Name" vs "full_name"
4. No validation - Tests assume headers exist without checking

### The Solution

#### 1. Centralized Header Constants (Code.js lines ~259-296)
```javascript
const HEADERS = {
  // Phase 1 Headers
  TIMESTAMP: 'Timestamp',
  FULL_NAME: 'Full_Name',
  EMAIL: 'Email',
  STUDENT_ID: 'Student_ID_Last4',
  CURRENT_AGE: 'Current_Age',
  WORK_SITUATION: 'Work_Situation',
  PROFILE_ID: 'ProfileID',
  
  // Financial Headers
  FILING_STATUS: 'filing_status',
  GROSS_ANNUAL_INCOME: 'gross_annual_income',
  NET_MONTHLY_INCOME: 'Net_Monthly_Income',
  ALLOCATION_PERCENTAGE: 'Allocation_Percentage',
  
  // Phase 2 Headers
  P2_HSA_ELIGIBILITY: 'hsa_eligibility',
  P2_CESA_NUM_CHILDREN: 'cesa_num_children',
  TAX_MINIMIZATION: 'Tax_Minimization',
  
  // Extra Questions
  P2_EX_Q1: 'ex_q1',
  P2_EX_Q2: 'ex_q2',
  // ... through ex_q10
};
```

#### 2. Header Validation Function
```javascript
function validateHeaders() {
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  const actualHeaders = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  
  const missingHeaders = [];
  Object.values(HEADERS).forEach(header => {
    if (!actualHeaders.includes(header)) {
      missingHeaders.push(header);
    }
  });
  
  return {
    valid: missingHeaders.length === 0,
    missingHeaders
  };
}
```

#### 3. Safe Value Access
```javascript
function safeGetValue(hdr, rowArr, headerKey) {
  const headerName = HEADERS[headerKey] || headerKey;
  
  if (hdr[headerName]) {
    return rowArr[hdr[headerName] - 1];
  } else {
    console.warn(`Header not found: ${headerName}`);
    return undefined;
  }
}
```

### Best Practices
1. **Always use HEADERS constants** - Never hardcode header names
2. **Validate before testing** - Run validateHeaders() first
3. **Remember row 2** - Working Sheet headers are in row 2
4. **Provide defaults** - getValue() can return undefined

## Actual vs Ideal System Functions

### Core Allocation Functions

#### computeNetPoolTotal()
```javascript
function computeNetPoolTotal(netIncome, discretionarySeeds, userPct, defaultRate) {
  // NEW: Treats allocation percentage as TOTAL desired savings rate
  const targetRate = Math.max(userPct / 100, defaultRate);
  const discretionaryPool = netIncome * targetRate;
  return discretionaryPool;
}
```
- Replaces `computeNetPool` when feature flag is enabled
- Returns discretionary allocation amount based on total percentage
- Non-discretionary items added separately

#### calculateEmployerMatch()
```javascript
function calculateEmployerMatch(grossIncome, matchPercentage) {
  // Parses match strings like "100% up to 3%" or "50% up to 6%"
  const matchUpToMatch = matchPercentage.match(/up to (\d+)%/);
  if (matchUpToMatch) {
    const matchUpToPct = parseInt(matchUpToMatch[1]) / 100;
    const matchCap = Math.round((grossIncome * matchUpToPct) / 12);
    
    const matchRateMatch = matchPercentage.match(/^(\d+)%/);
    if (matchRateMatch) {
      const matchRate = parseInt(matchRateMatch[1]) / 100;
      return Math.round(matchCap * matchRate);
    }
  }
  return 0;
}
```
- Calculates monthly employer match amount
- Handles various match formats
- Used for non-discretionary calculations

### Feature Flag
```javascript
const useNewLogic = true; // In runUniversalEngine around line 3309
```
- Controls whether to use total percentage calculation
- Set to false to revert to old additional percentage behavior

## Form Mapping System

### Overview
The form mapping system handles dynamic form question positions and maps them to the correct ex_q columns in the Working Sheet. The current implementation uses **Option 2 (Position-based mapping)** from the original design.

### Implementation Status
- ✅ **Implemented**: Position-based mapping (FORM_EX_Q_MAPPING)
- ❌ **Not Implemented**: Smart detection (Option 3), Dynamic form reader (Option 4)
- ⚠️ **Issue**: Profiles 5, 6, 9 missing employer 401k mappings

See [Development Notes](./Development_Notes.md) for future enhancement options.

### Form Structure
- Questions 0-43: Universal questions (same for all profiles)
- Questions 44+: Profile-specific questions (different per profile)

### FORM_EX_Q_MAPPING (Code.js lines 2215-2255)
```javascript
const FORM_EX_Q_MAPPING = {
  '2_ROBS_Curious': {
    46: 'ex_q1',  // employer 401k
    47: 'ex_q2',  // employer match
    48: 'ex_q3',  // match percentage
    49: 'ex_q4',  // roth option
    44: 'ex_q5',  // rollover balance
    45: 'ex_q6',  // business savings
    50: 'ex_q7'   // spouse in business
  },
  '4_Roth_Reclaimer': {
    44: 'ex_q1',  // employer 401k
    45: 'ex_q2',  // employer match
    46: 'ex_q3',  // match percentage
    47: 'ex_q4',  // roth option
    48: 'ex_q5',  // trad IRA balance
    49: 'ex_q6',  // after-tax contributions
    50: 'ex_q7',  // understands backdoor
    51: 'ex_q8'   // conversion amount
  },
  // ... other profiles
};
```

### remapFormValues() Function
```javascript
function remapFormValues(profileId, formValues) {
  const mapping = FORM_EX_Q_MAPPING[profileId];
  if (!mapping) return formValues;
  
  const remappedValues = [...formValues];
  const exQStartIndex = findExQStartIndex(); // After Phase 2 link
  
  // Clear ex_q slots first
  for (let i = 0; i < 10; i++) {
    remappedValues[exQStartIndex + i] = '';
  }
  
  // Map form positions to ex_q slots
  Object.entries(mapping).forEach(([formPos, exQSlot]) => {
    const slotNumber = parseInt(exQSlot.replace('ex_q', '')) - 1;
    remappedValues[exQStartIndex + slotNumber] = formValues[formPos];
  });
  
  return remappedValues;
}
```

### Adding New Mappings
1. Add/modify questions in Google Form
2. Note new positions (count from 0, including timestamp)
3. Update FORM_EX_Q_MAPPING in Code.js
4. Test with dummy submission

## Critical System Findings

### 1. Minimum 20% Savings Rate
The system enforces a minimum 20% savings rate regardless of user input:
```javascript
const targetRate = Math.max(CONFIG.OPTIMIZED_SAVINGS_RATE, userTotalPct);
// CONFIG.OPTIMIZED_SAVINGS_RATE = 0.20
```

**Impact**: Tests expecting less than 20% allocation will get 20% minimum

### 2. Domain Weight Calculation
Domain allocation depends on three factors:
```javascript
// Investment scoring (1-7 scale)
investment_involvement
investment_time  
investment_confidence

// Domain importance (1-7 scale)
retirement_importance
education_importance
health_importance

// Years until need
retirement_years_until_target
cesa_years_until_first_need
hsa_years_until_need
```

**Impact**: Missing any of these causes equal $333/$333/$333 splits

### 3. Vehicle Generation vs Allocation
- **Generation**: Profile helper creates available vehicles
- **Allocation**: Engine distributes funds based on budget
- **Budget constraints**: May prevent allocation to all generated vehicles

### 4. Employer 401(k) Priority
Employer match should ALWAYS be first priority (free money):
```javascript
// Correct implementation
updatedOrder.unshift(matchVehicle); // Add to beginning

// Wrong implementation (was causing Profile 7 bug)
const hsaIndex = updatedOrder.findIndex(v => v.name === 'HSA');
const insertIndex = hsaIndex >= 0 ? hsaIndex + 1 : 0;
```

## API Deployment (Optional)

### Purpose
Enable command-line testing with `clasp run` for faster iteration

### Setup Steps
1. Open Script Editor (Extensions → Apps Script)
2. Deploy → New Deployment
3. Select "API Executable"
4. Copy deployment ID
5. Update .clasp.json:
```json
{
  "scriptId": "YOUR_SCRIPT_ID",
  "deploymentId": "YOUR_DEPLOYMENT_ID"
}
```

### Usage
```bash
clasp run testProfile7All
clasp run validateHeaders
```

## Critical Bugs Log

### 1. Missing Investment Scoring Fields
**Symptom**: Equal $333/$333/$333 domain splits
**Root Cause**: Test data missing investment_involvement, investment_time, investment_confidence
**Fix**: Include all investment scoring fields (1-7 scale) in test data

### 2. Profile 7 401(k) Zero Allocation
**Symptom**: 401(k) vehicles generated but receiving $0
**Root Cause**: 401(k) match inserted after HSA instead of first
**Fix**: Changed to unshift() to add at beginning of array

### 3. Form Question Mapping Issues
**Symptom**: Employer 401(k) data in wrong columns
**Root Cause**: Profile questions not mapped to ex_q1-4
**Fix**: Implemented FORM_EX_Q_MAPPING system

### 4. Test Data Inconsistencies
**Symptom**: Contradictory test data (e.g., kids but education_importance=1)
**Root Cause**: Lazy copying between profiles
**Fix**: Created profile-specific test suites with coherent data

## Contribution Limits (2025)

### Retirement
```javascript
LIMITS.RETIREMENT = {
  TRADITIONAL_401K: 23500,
  ROTH_401K: 23500,
  TRADITIONAL_IRA: 7000,
  ROTH_IRA: 7000,
  CATCHUP_401K: 7500,    // Age 50+
  CATCHUP_401K_60: 11250, // Age 60-63
  CATCHUP_IRA: 1000,      // Age 50+
  SOLO_401K_TOTAL: 70000,
  SEP_IRA_PERCENT: 0.25,
  SIMPLE_IRA_EMPLOYEE: 16000,
  SIMPLE_IRA_CATCHUP: 3500
};
```

### Health & Education
```javascript
LIMITS.HEALTH = {
  HSA_INDIVIDUAL: 4300,
  HSA_FAMILY: 8550,
  HSA_CATCHUP: 1000  // Age 55+
};

LIMITS.EDUCATION = {
  CESA_PER_CHILD: 2000,
  AGGREGATE_529: 18000  // Per beneficiary
};
```

## Profile Helper Enhancements (November 2024)

### Employment-Based Logic
Profiles 4, 5, 6, and 9 now support dynamic vehicle generation based on work situation:
```javascript
const workSituation = getValue(hdr, rowArr, HEADERS.WORK_SITUATION);
const isSelfEmployed = workSituation === 'Self-employed' || workSituation === 'Both';
const isW2Employee = workSituation === 'W-2 employee' || workSituation === 'Both';
const isBoth = workSituation === 'Both';
```

### HSA Prioritization
HSA moved up in vehicle order across multiple profiles due to triple tax advantage:
- Profile 1: Position 3 (after ROBS vehicles)
- Profiles 4, 5, 6, 9: Position 2 (after employer match)
- Profile 8: Position 4 (after group plans)

### New Advanced Vehicles
Profile 8 (Biz Owner Group):
- Cash Balance Plan (age 45+)
- After-Tax 401(k) → Mega Backdoor Roth

Profile 9 (Late Stage Growth):
- Roth Conversions (strategy placeholder)
- Qualified Charitable Distribution Planning (age 70.5+)

## File Structure Reference

### Core Files
- `Code.js` - Main engine and profile helpers
- `Testing.js` - Consolidated testing framework
- `Current_Forms_Full.js` - Form question definitions
- `Helpers.js` - Utility functions
- `Limits.js` - Contribution limits

### Configuration
- `.clasp.json` - Script ID and deployment ID
- `.claspignore` - Files to exclude from push

### Working Sheet Structure
- Row 1: Usually empty or has labels
- Row 2: **Headers** (critical!)
- Row 3+: Data rows
- Columns: Phase 1 data → Phase 2 link → Phase 2 data → ex_q1-10

## Debugging Commands

```javascript
// Pre-flight checks
validateHeaders()        // Ensure all headers exist
verifyWorkingSheetColumns() // Show column positions

// Profile debugging
diagnoseProfile('7_Foundation_Builder')  // Full analysis
showVehicleOrder('2_ROBS_Curious')     // Vehicle priority
traceAllocation('4_Roth_Reclaimer')    // Allocation trace

// Form mapping
testFormMapping('2_ROBS_Curious')       // Verify mapping
FORM_EX_Q_MAPPING                       // View all mappings

// Direct testing
testUniversalEngine()                   // Test engine directly
runCompleteScenarioTest()               // Full scenario test
```

## Common Error Messages

### "Header not found: X"
- Check if using HEADERS constant
- Verify header exists in row 2
- Run validateHeaders()

### "Cannot read property '1' of undefined"
- Header doesn't exist in header map
- Usually means wrong header name

### "getValue is not a function"
- Imported from wrong file
- Should use getValue from Helpers.js

### "$0 allocation" or "NaN"
- Missing Net_Monthly_Income
- Missing Allocation_Percentage
- Non-numeric values in numeric fields

## Maintenance Tasks

### Weekly
- Run validateHeaders() to catch changes
- Test one profile end-to-end
- Check for new form submissions

### Before Major Changes
- Save header snapshot
- Document current mappings
- Run all profile tests

### After Form Updates
- Update FORM_EX_Q_MAPPING
- Test with dummy submission
- Update documentation

This technical reference provides the deep implementation details needed for maintaining and extending the system.
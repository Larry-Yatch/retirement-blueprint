/**
 * Enhanced Testing Framework with Header Validation
 * 
 * This file demonstrates best practices for avoiding header mismatch issues:
 * 1. Always validate headers before running tests
 * 2. Use a centralized header mapping system
 * 3. Build header maps dynamically from the actual Working Sheet
 * 4. Provide clear error messages when headers don't match
 */

// ═══════════════════════════════════════════════════════════════════════════════
// HEADER MANAGEMENT SYSTEM
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Centralized header mapping - Single source of truth
 * Update this when Working Sheet headers change
 */
const HEADER_MAPPING = {
  // Phase 1 Headers
  TIMESTAMP: 'Timestamp',
  FULL_NAME: 'Full_Name',
  EMAIL: 'Email',
  STUDENT_ID: 'Student_ID_Last4',
  AGE: 'Current_Age',
  WORK: 'Work_Situation',
  OWNS_BIZ: 'Owns_Biz',
  TAX_APPROACH: 'Tax_Minimization',
  PROFILE: 'ProfileID',
  
  // Phase 2 Headers
  FILING: 'filing_status',
  INCOME: 'gross_annual_income',
  NET_INCOME: 'Net_Monthly_Income',
  ALLOCATION_PCT: 'Allocation_Percentage',
  
  // Extra Questions
  EX_Q1: 'ex_q1',
  EX_Q2: 'ex_q2',
  EX_Q3: 'ex_q3',
  EX_Q4: 'ex_q4',
  EX_Q5: 'ex_q5',
  EX_Q6: 'ex_q6',
  EX_Q7: 'ex_q7',
  EX_Q8: 'ex_q8',
  EX_Q9: 'ex_q9',
  EX_Q10: 'ex_q10',
  
  // Other important headers
  HSA_ELIG: 'hsa_eligibility',
  HAS_CHILDREN: 'has_children_or_plan_children_education',
  NUM_CHILDREN: 'cesa_num_children',
  RETIREMENT_IMPORTANCE: 'retirement_importance',
  EDUCATION_IMPORTANCE: 'education_importance',
  HEALTH_IMPORTANCE: 'health_importance'
};

/**
 * Gets headers from Working Sheet and validates against expected headers
 * @returns {Object} { hdr: headerMap, valid: boolean, errors: string[] }
 */
function getValidatedHeaders() {
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  if (!ws) {
    return { 
      hdr: {}, 
      valid: false, 
      errors: ['Working Sheet not found'] 
    };
  }
  
  // Get headers from row 2 (not row 1)
  const headerRange = ws.getRange(2, 1, 1, ws.getLastColumn());
  const headers = headerRange.getValues()[0];
  const hdr = {};
  const foundHeaders = new Set();
  
  // Build header map
  headers.forEach((header, index) => {
    if (header) {
      hdr[header] = index + 1; // 1-based index
      foundHeaders.add(header);
    }
  });
  
  // Validate expected headers exist
  const errors = [];
  Object.entries(HEADER_MAPPING).forEach(([key, expectedHeader]) => {
    if (!foundHeaders.has(expectedHeader)) {
      errors.push(`Missing expected header: ${expectedHeader} (${key})`);
    }
  });
  
  return {
    hdr,
    valid: errors.length === 0,
    errors,
    foundHeaders: Array.from(foundHeaders)
  };
}

/**
 * Safe header value setter with validation
 */
function safeSetValue(rowArr, hdr, headerKey, value) {
  const headerName = HEADER_MAPPING[headerKey] || headerKey;
  
  if (hdr[headerName]) {
    rowArr[hdr[headerName] - 1] = value;
    return true;
  } else {
    console.warn(`Header not found: ${headerName} (key: ${headerKey})`);
    return false;
  }
}

/**
 * Creates test data with header validation
 */
function createValidatedTestData(customData = {}) {
  const validation = getValidatedHeaders();
  
  if (!validation.valid) {
    console.error('Header validation failed:');
    validation.errors.forEach(err => console.error(`  - ${err}`));
    throw new Error('Cannot create test data - header validation failed');
  }
  
  const { hdr } = validation;
  const rowArr = new Array(Object.keys(hdr).length).fill('');
  
  // Set defaults using HEADER_MAPPING
  const defaults = {
    TIMESTAMP: new Date().toISOString(),
    FULL_NAME: 'Test User',
    EMAIL: 'test@example.com',
    STUDENT_ID: '1234',
    AGE: 45,
    WORK: 'W-2 employee',
    OWNS_BIZ: 'No',
    TAX_APPROACH: 'Both',
    PROFILE: '7_Foundation_Builder',
    FILING: 'Single',
    INCOME: 75000,
    NET_INCOME: 5000,
    ALLOCATION_PCT: 15,
    RETIREMENT_IMPORTANCE: 5,
    EDUCATION_IMPORTANCE: 3,
    HEALTH_IMPORTANCE: 4,
    HSA_ELIG: 'Yes',
    HAS_CHILDREN: 'Yes',
    NUM_CHILDREN: 2
  };
  
  // Apply defaults
  Object.entries(defaults).forEach(([key, value]) => {
    safeSetValue(rowArr, hdr, key, value);
  });
  
  // Apply custom data
  Object.entries(customData).forEach(([key, value]) => {
    safeSetValue(rowArr, hdr, key, value);
  });
  
  return { hdr, rowArr };
}

// ═══════════════════════════════════════════════════════════════════════════════
// TEST FUNCTIONS USING VALIDATED HEADERS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Test ROBS Curious with header validation
 */
function testROBSCuriousWithValidation() {
  console.log('\n=== TESTING ROBS CURIOUS WITH HEADER VALIDATION ===\n');
  
  try {
    // Validate headers first
    const validation = getValidatedHeaders();
    if (!validation.valid) {
      console.error('Cannot run test - header validation failed');
      return;
    }
    
    // Test scenarios using HEADER_MAPPING keys
    const scenarios = [
      {
        name: 'Self-employed with Solo 401(k)',
        data: {
          PROFILE: '2_ROBS_Curious',
          WORK: 'Self-employed',
          AGE: 45,
          INCOME: 150000,
          EX_Q5: '100000',  // rollover
          EX_Q6: '80000',   // business savings
          EX_Q7: 'No'       // spouse
        }
      },
      {
        name: 'W-2 employee with employer 401(k)',
        data: {
          PROFILE: '2_ROBS_Curious',
          WORK: 'W-2 employee',
          AGE: 48,
          INCOME: 120000,
          EX_Q1: 'Yes',     // has employer 401k
          EX_Q2: 'Yes',     // has match
          EX_Q3: '50% up to 6%',
          EX_Q4: 'Yes',     // has Roth option
          EX_Q5: '75000',   // rollover
          EX_Q6: '0',       // no business yet
          EX_Q7: 'No'       // spouse
        }
      }
    ];
    
    scenarios.forEach(scenario => {
      console.log(`\nTesting: ${scenario.name}`);
      console.log('─'.repeat(50));
      
      const testData = createValidatedTestData(scenario.data);
      const result = profileHelpers['2_ROBS_Curious'](testData.rowArr, testData.hdr);
      
      console.log('Retirement Vehicles:');
      result.vehicleOrders.Retirement.forEach(v => {
        if (!v.name.includes('Bank')) {
          console.log(`  ${v.name}: $${Math.round(v.capMonthly)}/mo`);
        }
      });
    });
    
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

/**
 * Header diagnostic tool - shows what headers are actually in the sheet
 */
function diagnoseHeaders() {
  console.log('\n=== HEADER DIAGNOSTIC TOOL ===\n');
  
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  if (!ws) {
    console.error('Working Sheet not found!');
    return;
  }
  
  // Check both row 1 and row 2 for headers
  console.log('Checking Row 1:');
  const row1 = ws.getRange(1, 1, 1, ws.getLastColumn()).getValues()[0];
  const row1Headers = row1.filter(h => h).slice(0, 10); // Show first 10
  console.log(row1Headers.join(', ') + '...');
  
  console.log('\nChecking Row 2:');
  const row2 = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  const row2Headers = row2.filter(h => h).slice(0, 10); // Show first 10
  console.log(row2Headers.join(', ') + '...');
  
  // Validate against expected headers
  const validation = getValidatedHeaders();
  
  console.log('\n\nValidation Results:');
  console.log(`Valid: ${validation.valid ? '✅' : '❌'}`);
  
  if (validation.errors.length > 0) {
    console.log('\nErrors:');
    validation.errors.forEach(err => console.log(`  - ${err}`));
  }
  
  console.log(`\nTotal headers found: ${validation.foundHeaders.length}`);
  console.log('\nSample of found headers:');
  validation.foundHeaders.slice(0, 20).forEach(h => console.log(`  - ${h}`));
}

/**
 * Test runner with pre-flight checks
 */
function runTestsWithValidation() {
  console.log('\n=== RUNNING TESTS WITH VALIDATION ===\n');
  
  // Step 1: Diagnose headers
  console.log('Step 1: Header Diagnosis');
  diagnoseHeaders();
  
  // Step 2: Validate headers
  console.log('\n\nStep 2: Header Validation');
  const validation = getValidatedHeaders();
  
  if (!validation.valid) {
    console.error('\n❌ CANNOT RUN TESTS - Headers are not valid');
    console.error('Please fix the header issues before running tests');
    return;
  }
  
  console.log('✅ Headers validated successfully');
  
  // Step 3: Run tests
  console.log('\n\nStep 3: Running Tests');
  
  try {
    testROBSCuriousWithValidation();
    console.log('\n✅ All tests completed');
  } catch (error) {
    console.error('\n❌ Tests failed:', error.message);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// MIGRATION HELPER
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Helps migrate old test code to use the new header system
 */
function migrateTestCode() {
  console.log('\n=== TEST CODE MIGRATION GUIDE ===\n');
  
  console.log('Replace hardcoded headers with HEADER_MAPPING keys:\n');
  
  console.log('OLD: setValueInRow(rowArr, hdr, "Full_Name", "Test User")');
  console.log('NEW: safeSetValue(rowArr, hdr, "FULL_NAME", "Test User")\n');
  
  console.log('OLD: rowArr[hdr["Current_Age"] - 1] = 45');
  console.log('NEW: safeSetValue(rowArr, hdr, "AGE", 45)\n');
  
  console.log('OLD: const age = rowArr[hdr["Current_Age"] - 1]');
  console.log('NEW: const age = rowArr[hdr[HEADER_MAPPING.AGE] - 1]\n');
  
  console.log('Benefits:');
  console.log('1. Single source of truth for header names');
  console.log('2. Validation before tests run');
  console.log('3. Clear error messages when headers change');
  console.log('4. Easy to update when Working Sheet changes');
}

// ═══════════════════════════════════════════════════════════════════════════════
// HEADER CHANGE DETECTION
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Saves current headers to Script Properties for change detection
 */
function saveCurrentHeaders() {
  const validation = getValidatedHeaders();
  const headerSnapshot = JSON.stringify(validation.foundHeaders);
  
  PropertiesService.getScriptProperties().setProperty('HEADER_SNAPSHOT', headerSnapshot);
  PropertiesService.getScriptProperties().setProperty('HEADER_SNAPSHOT_DATE', new Date().toISOString());
  
  console.log('Header snapshot saved');
}

/**
 * Checks if headers have changed since last snapshot
 */
function checkForHeaderChanges() {
  const savedSnapshot = PropertiesService.getScriptProperties().getProperty('HEADER_SNAPSHOT');
  const snapshotDate = PropertiesService.getScriptProperties().getProperty('HEADER_SNAPSHOT_DATE');
  
  if (!savedSnapshot) {
    console.log('No previous header snapshot found');
    saveCurrentHeaders();
    return;
  }
  
  const validation = getValidatedHeaders();
  const currentSnapshot = JSON.stringify(validation.foundHeaders);
  
  if (currentSnapshot !== savedSnapshot) {
    console.log('\n⚠️  HEADERS HAVE CHANGED!');
    console.log(`Last snapshot: ${snapshotDate}`);
    
    const oldHeaders = JSON.parse(savedSnapshot);
    const newHeaders = validation.foundHeaders;
    
    const added = newHeaders.filter(h => !oldHeaders.includes(h));
    const removed = oldHeaders.filter(h => !newHeaders.includes(h));
    
    if (added.length > 0) {
      console.log('\nAdded headers:');
      added.forEach(h => console.log(`  + ${h}`));
    }
    
    if (removed.length > 0) {
      console.log('\nRemoved headers:');
      removed.forEach(h => console.log(`  - ${h}`));
    }
    
    console.log('\nUpdate HEADER_MAPPING and run saveCurrentHeaders() to acknowledge changes');
  } else {
    console.log('✅ Headers unchanged since ' + snapshotDate);
  }
}
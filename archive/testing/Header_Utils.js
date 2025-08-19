/**
 * Header Utility Functions
 * Add this to Code.js or include as a separate file
 * 
 * These utilities help prevent header mismatch issues
 */

// ═══════════════════════════════════════════════════════════════════════════════
// HEADER CONSTANTS - Single Source of Truth
// ═══════════════════════════════════════════════════════════════════════════════

const HEADERS = {
  // Phase 1 core headers
  TIMESTAMP: 'Timestamp',
  FULL_NAME: 'Full_Name',
  EMAIL: 'Email',
  STUDENT_ID_LAST4: 'Student_ID_Last4',
  CURRENT_AGE: 'Current_Age',
  WORK_SITUATION: 'Work_Situation',
  OWNS_BIZ: 'Owns_Biz',
  TAX_MINIMIZATION: 'Tax_Minimization',
  PROFILE_ID: 'ProfileID',
  
  // Phase 2 core headers
  FILING_STATUS: 'filing_status',
  GROSS_ANNUAL_INCOME: 'gross_annual_income',
  NET_MONTHLY_INCOME: 'Net_Monthly_Income',
  ALLOCATION_PERCENTAGE: 'Allocation_Percentage',
  
  // Extra questions
  P2_EX_Q1: 'ex_q1',
  P2_EX_Q2: 'ex_q2',
  P2_EX_Q3: 'ex_q3',
  P2_EX_Q4: 'ex_q4',
  P2_EX_Q5: 'ex_q5',
  P2_EX_Q6: 'ex_q6',
  P2_EX_Q7: 'ex_q7',
  P2_EX_Q8: 'ex_q8',
  P2_EX_Q9: 'ex_q9',
  P2_EX_Q10: 'ex_q10'
};

// ═══════════════════════════════════════════════════════════════════════════════
// HEADER UTILITIES
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Gets the header row number (1 or 2) from Working Sheet
 * @returns {number} The row number containing headers
 */
function getHeaderRowNumber() {
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  if (!ws) throw new Error('Working Sheet not found');
  
  // Check row 2 first (most common)
  const row2 = ws.getRange(2, 1, 1, 10).getValues()[0];
  if (row2.some(cell => cell === 'Timestamp' || cell === 'Full_Name')) {
    return 2;
  }
  
  // Check row 1
  const row1 = ws.getRange(1, 1, 1, 10).getValues()[0];
  if (row1.some(cell => cell === 'Timestamp' || cell === 'Full_Name')) {
    return 1;
  }
  
  throw new Error('Could not find header row in Working Sheet');
}

/**
 * Builds a header map from the Working Sheet
 * @param {number} headerRow - Optional row number, auto-detected if not provided
 * @returns {Object} Map of header name to 1-based column index
 */
function buildHeaderMap(headerRow = null) {
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  if (!ws) throw new Error('Working Sheet not found');
  
  const row = headerRow || getHeaderRowNumber();
  const headers = ws.getRange(row, 1, 1, ws.getLastColumn()).getValues()[0];
  const hdr = {};
  
  headers.forEach((header, index) => {
    if (header) {
      hdr[header] = index + 1; // 1-based index
    }
  });
  
  return hdr;
}

/**
 * Validates that expected headers exist in the Working Sheet
 * @param {Array<string>} requiredHeaders - Headers that must exist
 * @returns {Object} { valid: boolean, missing: string[], hdr: Object }
 */
function validateRequiredHeaders(requiredHeaders = []) {
  const hdr = buildHeaderMap();
  const missing = [];
  
  // Check default required headers
  const defaultRequired = [
    HEADERS.PROFILE_ID,
    HEADERS.CURRENT_AGE,
    HEADERS.WORK_SITUATION,
    HEADERS.GROSS_ANNUAL_INCOME
  ];
  
  const allRequired = [...new Set([...defaultRequired, ...requiredHeaders])];
  
  allRequired.forEach(header => {
    if (!hdr[header]) {
      missing.push(header);
    }
  });
  
  return {
    valid: missing.length === 0,
    missing,
    hdr
  };
}

/**
 * Safe getter for header values with error handling
 * @param {Object} hdr - Header map
 * @param {Array} rowArr - Row data array
 * @param {string} headerKey - Key from HEADERS constant
 * @param {*} defaultValue - Default value if header not found
 * @returns {*} The value or default
 */
function safeGetValue(hdr, rowArr, headerKey, defaultValue = '') {
  const headerName = HEADERS[headerKey] || headerKey;
  
  if (hdr[headerName]) {
    return rowArr[hdr[headerName] - 1];
  } else {
    console.warn(`Header not found: ${headerName} (key: ${headerKey}), using default: ${defaultValue}`);
    return defaultValue;
  }
}

/**
 * Safe setter for header values with validation
 * @param {Array} rowArr - Row data array
 * @param {Object} hdr - Header map
 * @param {string} headerKey - Key from HEADERS constant
 * @param {*} value - Value to set
 * @returns {boolean} Success status
 */
function safeSetValue(rowArr, hdr, headerKey, value) {
  const headerName = HEADERS[headerKey] || headerKey;
  
  if (hdr[headerName]) {
    rowArr[hdr[headerName] - 1] = value;
    return true;
  } else {
    console.warn(`Cannot set value - header not found: ${headerName} (key: ${headerKey})`);
    return false;
  }
}

/**
 * Creates test data with proper header validation
 * @param {Object} overrides - Values to override defaults
 * @returns {Object} { hdr, rowArr, valid }
 */
function createTestDataSafe(overrides = {}) {
  // Validate headers first
  const validation = validateRequiredHeaders();
  
  if (!validation.valid) {
    console.error('Missing required headers:', validation.missing);
    throw new Error(`Cannot create test data - missing headers: ${validation.missing.join(', ')}`);
  }
  
  const { hdr } = validation;
  const rowArr = new Array(Object.keys(hdr).length).fill('');
  
  // Set defaults using HEADERS constants
  const defaults = {
    TIMESTAMP: new Date().toISOString(),
    FULL_NAME: 'Test User',
    EMAIL: 'test@example.com',
    STUDENT_ID_LAST4: '1234',
    CURRENT_AGE: 45,
    WORK_SITUATION: 'W-2 employee',
    OWNS_BIZ: 'No',
    TAX_MINIMIZATION: 'Both',
    PROFILE_ID: '7_Foundation_Builder',
    FILING_STATUS: 'Single',
    GROSS_ANNUAL_INCOME: 75000,
    NET_MONTHLY_INCOME: 5000,
    ALLOCATION_PERCENTAGE: 15
  };
  
  // Apply defaults
  Object.entries(defaults).forEach(([key, value]) => {
    safeSetValue(rowArr, hdr, key, value);
  });
  
  // Apply overrides
  Object.entries(overrides).forEach(([key, value]) => {
    safeSetValue(rowArr, hdr, key, value);
  });
  
  return { hdr, rowArr, valid: true };
}

/**
 * Diagnostic function to display current headers
 */
function showHeaderDiagnostics() {
  console.log('\n=== HEADER DIAGNOSTICS ===\n');
  
  try {
    const headerRow = getHeaderRowNumber();
    console.log(`Headers found in row: ${headerRow}`);
    
    const hdr = buildHeaderMap(headerRow);
    const headerList = Object.keys(hdr).filter(h => h);
    
    console.log(`\nTotal headers: ${headerList.length}`);
    console.log('\nFirst 20 headers:');
    headerList.slice(0, 20).forEach((h, i) => {
      console.log(`  ${i + 1}. ${h} (column ${hdr[h]})`);
    });
    
    // Check for common headers
    console.log('\nChecking common headers:');
    const commonHeaders = [
      'PROFILE_ID',
      'CURRENT_AGE', 
      'WORK_SITUATION',
      'GROSS_ANNUAL_INCOME',
      'P2_EX_Q1'
    ];
    
    commonHeaders.forEach(key => {
      const headerName = HEADERS[key];
      const exists = hdr[headerName] ? '✅' : '❌';
      console.log(`  ${exists} ${key}: "${headerName}"`);
    });
    
  } catch (error) {
    console.error('Diagnostic failed:', error.message);
  }
}

/**
 * Example usage in profile helpers
 */
function exampleProfileHelperUsage() {
  // This shows how to use these utilities in actual profile helpers
  
  return function(rowArr, hdr) {
    // Use HEADERS constants instead of strings
    const age = Number(safeGetValue(hdr, rowArr, 'CURRENT_AGE', 30));
    const income = Number(safeGetValue(hdr, rowArr, 'GROSS_ANNUAL_INCOME', 50000));
    const workSituation = safeGetValue(hdr, rowArr, 'WORK_SITUATION', 'W-2 employee');
    
    // For extra questions
    const hasEmployer401k = safeGetValue(hdr, rowArr, 'P2_EX_Q1', 'No') === 'Yes';
    const employerMatch = safeGetValue(hdr, rowArr, 'P2_EX_Q2', 'No') === 'Yes';
    
    // Rest of profile helper logic...
  };
}
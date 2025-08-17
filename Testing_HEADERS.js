/**
 * HEADER CONSTANTS AND VALIDATION SYSTEM
 * 
 * This file centralizes all header definitions to prevent mismatch issues
 * between test functions and the Working Sheet.
 * 
 * USAGE:
 * 1. Import these constants in your test files
 * 2. Use WS_HEADERS.PHASE1.FULL_NAME instead of hardcoding 'Full_Name'
 * 3. Run validateHeaders() before tests to ensure Working Sheet matches
 */

/**
 * Working Sheet Header Definitions
 * These MUST match the actual headers in row 2 of the Working Sheet
 */
const WS_HEADERS = {
  // Phase 1 Headers
  PHASE1: {
    TIMESTAMP: 'Timestamp',
    FULL_NAME: 'Full_Name',
    EMAIL: 'Email',
    STUDENT_ID_LAST4: 'Student_ID_Last4',
    CURRENT_AGE: 'Current_Age',
    WORK_SITUATION: 'Work_Situation',
    OWNS_BIZ: 'Owns_Biz',
    PLANS_BIZ: 'Plans_Biz',
    W2_EMPLOYEES: 'W2_Employees',
    ROTH_IRA_HOLDER: 'Roth_IRA_Holder',
    TRADITIONAL_RETIREMENT: 'Traditional_Retirement',
    USING_ROBS: 'Using_ROBS',
    INTERESTED_IN_ROBS: 'Interested_in_ROBS',
    ROBS_NEW_BUSINESS: 'ROBS_New_Business',
    ROLLOVER_ACCOUNT_50K: 'Rollover_Account_50k',
    SETUP_COST_FUNDING: 'Setup_Cost_Funding',
    TAX_MINIMIZATION: 'Tax_Minimization',
    RETIREMENT_CATCHUP: 'Retirement_Catchup',
    RETIREMENT_TIMEFRAME: 'Retirement_Timeframe',
    ACTION_MOTIVATION: 'Action_Motivation',
    PROFILE_ID: 'ProfileID'
  },
  
  // Phase 2 Headers
  PHASE2: {
    FILING_STATUS: 'filing_status',
    ALLOCATION_PERCENTAGE: 'Allocation_Percentage',
    TOTAL_MONTHLY_SAVINGS: 'Total_Monthly_Savings_Capacity',
    NET_MONTHLY_INCOME: 'Net_Monthly_Income',
    GROSS_ANNUAL_INCOME: 'gross_annual_income',
    
    // Phase 2 form response headers
    TIMESTAMP: 'timestamp',
    FULL_NAME: 'full_name',
    EMAIL: 'email',
    STUDENT_IDENTIFIER: 'student_identifier',
    CURRENT_AGE: 'current_age',
    TARGET_RETIREMENT_AGE: 'target_retirement_age',
    HAS_CHILDREN: 'has_children_or_plan_children_education',
    YEARS_UNTIL_USE: 'years_until_use_of_funds',
    HSA_ELIGIBILITY: 'hsa_eligibility',
    INVESTMENT_INVOLVEMENT: 'investment_involvement',
    INVESTMENT_TIME: 'investment_time',
    INVESTMENT_CONFIDENCE: 'investment_confidence',
    
    // HSA specific
    CURRENT_HSA_BALANCE: 'current_hsa_balance',
    CURRENT_MONTHLY_HSA: 'current_monthly_hsa_contribution',
    HSA_YEARS_UNTIL_NEED: 'hsa_years_until_need',
    HSA_TARGET_BALANCE: 'hsa_target_balance',
    
    // CESA specific
    CESA_CURRENT_BALANCE: 'cesa_current_balance',
    CESA_MONTHLY_CONTRIBUTION: 'cesa_monthly_contribution',
    CESA_NUM_CHILDREN: 'cesa_num_children',
    CESA_TOTAL_GOAL: 'cesa_total_goal',
    CESA_YEARS_UNTIL_FIRST: 'cesa_years_until_first_need',
    
    // Retirement specific
    RETIREMENT_CURRENT_BALANCE: 'retirement_current_balance',
    RETIREMENT_PERSONAL_CONTRIBUTION: 'retirement_personal_contribution',
    RETIREMENT_YEARS_UNTIL_TARGET: 'retirement_years_until_target',
    RETIREMENT_DESIRED_MONTHLY_INCOME: 'retirement_desired_monthly_income',
    
    // Importance ratings
    RETIREMENT_IMPORTANCE: 'retirement_importance',
    RETIREMENT_ANXIETY: 'retirement_anxiety',
    RETIREMENT_MOTIVATION: 'retirement_motivation',
    EDUCATION_IMPORTANCE: 'education_importance',
    EDUCATION_ANXIETY: 'education_anxiety',
    EDUCATION_MOTIVATION: 'education_motivation',
    HEALTH_IMPORTANCE: 'health_importance',
    HEALTH_ANXIETY: 'health_anxiety',
    HEALTH_MOTIVATION: 'health_motivation',
    
    // Tie breakers
    TIE_FUND_CHOICE: 'tie_fund_choice',
    TIE_PAINFUL_CHOICE: 'tie_painful_choice',
    TIE_RANK_RETIREMENT: 'tie_rank_retirement',
    TIE_RANK_EDUCATION: 'tie_rank_education',
    TIE_RANK_HEALTH: 'tie_rank_health'
  },
  
  // Extra Questions Headers
  EXTRA_QUESTIONS: {
    EX_Q1: 'ex_q1',
    EX_Q2: 'ex_q2',
    EX_Q3: 'ex_q3',
    EX_Q4: 'ex_q4',
    EX_Q5: 'ex_q5',
    EX_Q6: 'ex_q6',
    EX_Q7: 'ex_q7',
    EX_Q8: 'ex_q8',
    EX_Q9: 'ex_q9',
    EX_Q10: 'ex_q10'
  },
  
  // Calculated Fields
  CALCULATED: {
    USES_ROBS: 'USES_ROBS',
    INTREST_ROBS: 'INTREST_ROBS',
    ROBS_READY: 'ROBS_READY',
    SELF_EMPLOYED: 'SELF_EMPLOYED',
    HAS_BIZ: 'HAS_BIZ',
    PLANS_BIZ: 'PLANS_BIZ',
    HAS_EMPLOYEES: 'HAS_EMPLOYEES',
    SOLO401K_AVAILABLE: 'SOLO401K_AVAILABLE',
    NEEDS_BACKDOOR_ROTH: 'NEEDS_BACKDOOR_ROTH',
    CATCH_UP_ELIGIBLE: 'CATCH_UP_ELIGIBLE',
    LATE_STAGE_ELIGIBLE: 'LATE_STAGE_ELIGIBLE',
    TAX_FOCUS_NOW: 'TAX_FOCUS_NOW',
    TAX_FOCUS_LATER: 'TAX_FOCUS_LATER',
    TAX_FOCUS_BOTH: 'TAX_FOCUS_BOTH',
    URGENT_ACTION: 'URGENT_ACTION',
    PHASE_2_LINK_SENT: 'Phase_2_Link_Sent',
    PHASE_2_LINK: 'Phase_2_Link'
  },
  
  // Actual/Ideal Allocation Headers
  ALLOCATIONS: {
    // Retirement vehicles
    RETIREMENT_ROBS_SOLO_401K_PROFIT_ACTUAL: 'retirement_robs_solo_401k_profit_distribution_actual',
    RETIREMENT_ROBS_SOLO_401K_ROTH_ACTUAL: 'retirement_robs_solo_401k_roth_actual',
    RETIREMENT_ROBS_SOLO_401K_TRADITIONAL_ACTUAL: 'retirement_robs_solo_401k_traditional_actual',
    RETIREMENT_SOLO_401K_ROTH_ACTUAL: 'retirement_solo_401k_roth_actual',
    RETIREMENT_SOLO_401K_TRADITIONAL_ACTUAL: 'retirement_solo_401k_traditional_actual',
    RETIREMENT_SOLO_401K_EMPLOYEE_ACTUAL: 'retirement_solo_401k_employee_actual',
    RETIREMENT_SOLO_401K_EMPLOYER_ACTUAL: 'retirement_solo_401k_employer_actual',
    RETIREMENT_BACKDOOR_ROTH_IRA_ACTUAL: 'retirement_backdoor_roth_ira_actual',
    RETIREMENT_TRADITIONAL_IRA_ACTUAL: 'retirement_traditional_ira_actual',
    RETIREMENT_TRADITIONAL_401K_ACTUAL: 'retirement_traditional_401k_actual',
    RETIREMENT_DEFINED_BENEFIT_ACTUAL: 'retirement_defined_benefit_plan_actual',
    RETIREMENT_ROTH_IRA_ACTUAL: 'retirement_roth_ira_actual',
    RETIREMENT_HSA_ACTUAL: 'retirement_hsa_actual',
    RETIREMENT_401K_CATCH_UP_ACTUAL: 'retirement_401k_catch_up_actual',
    RETIREMENT_IRA_CATCH_UP_ACTUAL: 'retirement_ira_catch_up_actual',
    RETIREMENT_ROTH_CONVERSION_ACTUAL: 'retirement_roth_conversion_actual',
    RETIREMENT_ALTERNATIVE_INVESTMENTS_ACTUAL: 'retirement_alternative_investments_actual',
    
    // Education vehicles
    EDUCATION_COMBINED_CESA_ACTUAL: 'education_combined_cesa_actual',
    
    // Health vehicles
    HEALTH_HSA_ACTUAL: 'health_hsa_actual',
    
    // Ideal allocations (same pattern with _ideal suffix)
    FAMILY_BANK_IDEAL: 'family_bank_ideal'
  }
};

/**
 * Validates that all expected headers exist in the Working Sheet
 * @returns {Object} Validation result with status and any missing headers
 */
function validateHeaders() {
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  if (!ws) {
    return {
      valid: false,
      error: 'Working Sheet not found',
      missingHeaders: []
    };
  }
  
  // Get actual headers from Working Sheet
  const headerRange = ws.getRange(2, 1, 1, ws.getLastColumn());
  const actualHeaders = headerRange.getValues()[0];
  const actualHeaderSet = new Set(actualHeaders.filter(h => h));
  
  // Collect all expected headers
  const expectedHeaders = new Set();
  
  // Add all headers from our constants
  Object.values(WS_HEADERS).forEach(category => {
    Object.values(category).forEach(header => {
      expectedHeaders.add(header);
    });
  });
  
  // Find missing headers
  const missingHeaders = [];
  expectedHeaders.forEach(header => {
    if (!actualHeaderSet.has(header)) {
      missingHeaders.push(header);
    }
  });
  
  // Find extra headers (in sheet but not in our constants)
  const extraHeaders = [];
  actualHeaderSet.forEach(header => {
    if (!expectedHeaders.has(header) && header) {
      extraHeaders.push(header);
    }
  });
  
  return {
    valid: missingHeaders.length === 0,
    missingHeaders,
    extraHeaders,
    actualHeaders: Array.from(actualHeaderSet)
  };
}

/**
 * Helper function to get header index from Working Sheet
 * @param {string} headerName - The header name to find
 * @returns {number} 1-based column index, or -1 if not found
 */
function getHeaderIndex(headerName) {
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  if (!ws) return -1;
  
  const headerRange = ws.getRange(2, 1, 1, ws.getLastColumn());
  const headers = headerRange.getValues()[0];
  
  for (let i = 0; i < headers.length; i++) {
    if (headers[i] === headerName) {
      return i + 1; // Convert to 1-based index
    }
  }
  
  return -1;
}

/**
 * Builds header map from actual Working Sheet headers
 * This is a safer alternative to hardcoding header positions
 * @returns {Object} Map of header name to 1-based column index
 */
function buildHeaderMap() {
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  if (!ws) {
    throw new Error('Working Sheet not found');
  }
  
  const headerRange = ws.getRange(2, 1, 1, ws.getLastColumn());
  const headers = headerRange.getValues()[0];
  const headerMap = {};
  
  headers.forEach((header, index) => {
    if (header) {
      headerMap[header] = index + 1; // 1-based index
    }
  });
  
  return headerMap;
}

/**
 * Test helper that creates a properly formatted test row
 * @param {Object} data - Key-value pairs of header names and values
 * @returns {Object} Object with hdr (header map) and rowArr (data array)
 */
function createTestRow(data = {}) {
  const hdr = buildHeaderMap();
  const rowArr = new Array(Object.keys(hdr).length).fill('');
  
  // Set defaults
  const defaults = {
    [WS_HEADERS.PHASE1.TIMESTAMP]: new Date().toISOString(),
    [WS_HEADERS.PHASE1.FULL_NAME]: 'Test User',
    [WS_HEADERS.PHASE1.EMAIL]: 'test@example.com',
    [WS_HEADERS.PHASE1.STUDENT_ID_LAST4]: '1234',
    [WS_HEADERS.PHASE1.CURRENT_AGE]: 45,
    [WS_HEADERS.PHASE1.WORK_SITUATION]: 'W-2 employee',
    [WS_HEADERS.PHASE1.OWNS_BIZ]: 'No',
    [WS_HEADERS.PHASE1.TAX_MINIMIZATION]: 'Both',
    [WS_HEADERS.PHASE1.PROFILE_ID]: '7_Foundation_Builder',
    [WS_HEADERS.PHASE2.FILING_STATUS]: 'Single',
    [WS_HEADERS.PHASE2.GROSS_ANNUAL_INCOME]: 75000,
    [WS_HEADERS.PHASE2.NET_MONTHLY_INCOME]: 5000,
    [WS_HEADERS.PHASE2.ALLOCATION_PERCENTAGE]: 15,
    [WS_HEADERS.PHASE2.RETIREMENT_IMPORTANCE]: 5,
    [WS_HEADERS.PHASE2.EDUCATION_IMPORTANCE]: 3,
    [WS_HEADERS.PHASE2.HEALTH_IMPORTANCE]: 4
  };
  
  // Apply defaults
  Object.entries(defaults).forEach(([header, value]) => {
    if (hdr[header]) {
      rowArr[hdr[header] - 1] = value;
    }
  });
  
  // Apply custom data
  Object.entries(data).forEach(([header, value]) => {
    if (hdr[header]) {
      rowArr[hdr[header] - 1] = value;
    } else {
      console.warn(`Header "${header}" not found in Working Sheet`);
    }
  });
  
  return { hdr, rowArr };
}

/**
 * Example usage in test functions
 */
function exampleTestUsage() {
  // Validate headers first
  const validation = validateHeaders();
  if (!validation.valid) {
    console.error('Header validation failed!');
    console.error('Missing headers:', validation.missingHeaders);
    return;
  }
  
  // Create test data using constants
  const testData = createTestRow({
    [WS_HEADERS.PHASE1.PROFILE_ID]: '2_ROBS_Curious',
    [WS_HEADERS.PHASE1.WORK_SITUATION]: 'Self-employed',
    [WS_HEADERS.PHASE1.CURRENT_AGE]: 52,
    [WS_HEADERS.PHASE2.GROSS_ANNUAL_INCOME]: 150000,
    [WS_HEADERS.EXTRA_QUESTIONS.EX_Q5]: '100000',
    [WS_HEADERS.EXTRA_QUESTIONS.EX_Q6]: '80000',
    [WS_HEADERS.EXTRA_QUESTIONS.EX_Q7]: 'Yes'
  });
  
  // Use the test data
  const result = profileHelpers['2_ROBS_Curious'](testData.rowArr, testData.hdr);
  console.log('Test completed');
}

/**
 * Run header validation as part of test suite
 */
function testHeaderValidation() {
  console.log('\n=== HEADER VALIDATION TEST ===\n');
  
  const validation = validateHeaders();
  
  if (validation.valid) {
    console.log('✅ All expected headers found in Working Sheet');
  } else {
    console.log('❌ Header validation failed');
    console.log('\nMissing headers:');
    validation.missingHeaders.forEach(h => console.log(`  - ${h}`));
  }
  
  if (validation.extraHeaders.length > 0) {
    console.log('\n⚠️  Extra headers found (not in constants):');
    validation.extraHeaders.forEach(h => console.log(`  - ${h}`));
  }
  
  console.log(`\nTotal headers in Working Sheet: ${validation.actualHeaders.length}`);
  
  return validation.valid;
}
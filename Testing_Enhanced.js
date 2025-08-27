/**
 * Enhanced Testing Framework for Retirement Blueprint
 * Addresses header validation and test data completeness issues
 * 
 * This file enhances the existing Testing.js with:
 * 1. Robust header validation with auto-detection
 * 2. Complete test data templates with ALL required fields
 * 3. Data validation and auto-fix functionality
 * 4. Clear error messages for missing data
 */

// ═══════════════════════════════════════════════════════════════════════════════
// CRITICAL FIELDS THAT CAUSE TEST FAILURES
// ═══════════════════════════════════════════════════════════════════════════════

const CRITICAL_FIELDS = {
  // These MUST be present or tests fail with cryptic errors
  INVESTMENT_SCORING: [
    'investment_involvement',  // 1-7 scale, affects risk tolerance
    'investment_time',        // 1-7 scale, affects urgency
    'investment_confidence'   // 1-7 scale, affects complexity
  ],
  
  DOMAIN_IMPORTANCE: [
    'retirement_importance',  // 1-7 scale, drives retirement allocation
    'education_importance',   // 1-7 scale, drives CESA allocation
    'health_importance'       // 1-7 scale, drives HSA allocation
  ],
  
  YEARS_UNTIL: [
    'retirement_years_until_target',  // Years to retirement
    'cesa_years_until_first_need',   // Years until first child needs college
    'hsa_years_until_need'            // Years until major health expenses
  ],
  
  FINANCIAL_BASICS: [
    'gross_annual_income',
    'Net_Monthly_Income',
    'Allocation_Percentage',
    'filing_status'
  ],
  
  ELIGIBILITY: [
    'hsa_eligibility',
    'cesa_num_children'
  ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPLETE TEST DATA TEMPLATE WITH ALL FIELDS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Complete test data template with ALL fields properly documented
 * This prevents the most common test failures
 */
const COMPLETE_TEST_TEMPLATE = {
  // ========== IDENTIFICATION ==========
  'Timestamp': new Date(),
  'Full_Name': 'Test User',
  'Email': 'test@example.com',
  'Student_ID_Last4': '1234',
  
  // ========== DEMOGRAPHICS ==========
  'Current_Age': 35,
  'ProfileID': '7_Foundation_Builder',
  'Work_Situation': 'W-2 employee',  // 'W-2 employee', 'Self-employed', 'Both'
  
  // ========== FINANCIAL DATA ==========
  'gross_annual_income': 75000,
  'Net_Monthly_Income': 5000,  // CRITICAL: Used to calculate actual allocation
  'Allocation_Percentage': 20,  // CRITICAL: % of net income to allocate
  'filing_status': 'Single',    // 'Single', 'Married Filing Jointly'
  
  // ========== INVESTMENT SCORING (CRITICAL!) ==========
  // Without these, you get equal $333/$333/$333 splits
  'investment_involvement': 4,  // 1-7: How involved in investment decisions
  'investment_time': 4,         // 1-7: Time available for investing
  'investment_confidence': 4,   // 1-7: Confidence in investment knowledge
  
  // ========== DOMAIN IMPORTANCE (CRITICAL!) ==========
  // These drive the allocation split between domains
  'retirement_importance': 7,   // 1-7: How important is retirement
  'education_importance': 1,    // 1-7: Increase if you have kids
  'health_importance': 5,       // 1-7: How important is health savings
  
  // ========== YEARS UNTIL NEED (CRITICAL!) ==========
  // These affect urgency calculations
  'retirement_years_until_target': 30,  // Current age to retirement age
  'cesa_years_until_first_need': 18,   // When first child needs college
  'hsa_years_until_need': 30,          // When major health expenses expected
  
  // ========== TAX PREFERENCES ==========
  'Tax_Minimization': 'Both',  // 'Now', 'Later', 'Both'
  
  // ========== ELIGIBILITY FLAGS ==========
  'hsa_eligibility': 'Yes',     // 'Yes' or 'No'
  'cesa_num_children': 0,       // Number of children (0-10)
  
  // ========== BUSINESS FLAGS (Phase 1) ==========
  'Owns_Biz': 'No',
  'Plans_Biz': 'No',
  'W2_Employees': 'No',
  'Using_ROBS': 'No',
  'Interested_in_ROBS': 'No',
  'ROBS_New_Business': 'No',
  'Rollover_Account_50k': 'No',
  'Setup_Cost_Funding': 'No',
  
  // ========== RETIREMENT FLAGS ==========
  'Roth_IRA_Holder': 'No',
  'Traditional_Retirement': 'No',
  'Retirement_Catchup': 'No',
  'Retirement_Timeframe': '10+ years',
  'Action_Motivation': 'Save for retirement',
  
  // ========== COMPUTED FLAGS (Auto-calculated) ==========
  'Total_Monthly_Savings_Capacity': 1000,  // Net_Monthly * Allocation_%
  'USES_ROBS': false,
  'INTREST_ROBS': false,
  'ROBS_READY': false,
  'SELF_EMPLOYED': false,
  'HAS_BIZ': false,
  'PLANS_BIZ': false,
  'HAS_EMPLOYEES': false,
  'SOLO401K_AVAILABLE': false,
  'NEEDS_BACKDOOR_ROTH': false,
  'CATCH_UP_ELIGIBLE': false,
  'LATE_STAGE_ELIGIBLE': false,
  'TAX_FOCUS_NOW': false,
  'TAX_FOCUS_LATER': false,
  'TAX_FOCUS_BOTH': true,
  'URGENT_ACTION': false,
  
  // ========== PROFILE-SPECIFIC QUESTIONS ==========
  // These map differently for each profile
  'ex_q1': '',  // Varies by profile
  'ex_q2': '',
  'ex_q3': '',
  'ex_q4': '',
  'ex_q5': '',
  'ex_q6': '',
  'ex_q7': '',
  'ex_q8': '',
  'ex_q9': '',
  'ex_q10': '',
  
  // ========== PHASE 2 SYNC FIELDS ==========
  // Lowercase versions for Phase 2 compatibility
  'timestamp': new Date(),
  'full_name': 'Test User',
  'email': 'test@example.com',
  'student_identifier': '1234',
  'current_age': 35,
  'target_retirement_age': 65,
  'has_children_or_plan_children_education': 'No',
  'years_until_use_of_funds': 30
};

// ═══════════════════════════════════════════════════════════════════════════════
// ENHANCED HEADER VALIDATION
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Enhanced header validation that checks for all required fields
 * and provides clear guidance on what's missing
 */
function validateHeadersEnhanced() {
  console.log('\n' + '═'.repeat(70));
  console.log('ENHANCED HEADER VALIDATION');
  console.log('═'.repeat(70) + '\n');
  
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  if (!ws) {
    console.error('❌ CRITICAL: Working Sheet not found!');
    return { valid: false, error: 'No Working Sheet' };
  }
  
  // Auto-detect header row (1 or 2)
  let headerRow = 2;
  let headers = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  
  if (!headers.includes('Timestamp') && !headers.includes('ProfileID')) {
    console.log('Headers not in row 2, checking row 1...');
    headerRow = 1;
    headers = ws.getRange(1, 1, 1, ws.getLastColumn()).getValues()[0];
  }
  
  console.log(`✓ Headers found in row ${headerRow}`);
  console.log(`✓ Total columns: ${headers.length}`);
  
  // Check all critical fields
  const results = {
    valid: true,
    headerRow: headerRow,
    foundHeaders: [],
    missingHeaders: [],
    criticalMissing: [],
    warnings: []
  };
  
  // Check each critical field group
  console.log('\nChecking critical field groups:');
  
  Object.entries(CRITICAL_FIELDS).forEach(([groupName, fields]) => {
    console.log(`\n${groupName}:`);
    fields.forEach(field => {
      if (headers.includes(field)) {
        console.log(`  ✓ ${field}`);
        results.foundHeaders.push(field);
      } else {
        console.log(`  ❌ ${field} - MISSING!`);
        results.missingHeaders.push(field);
        results.criticalMissing.push(field);
        results.valid = false;
      }
    });
  });
  
  // Check profile-specific questions
  console.log('\nProfile-specific questions (ex_q1-10):');
  for (let i = 1; i <= 10; i++) {
    const field = `ex_q${i}`;
    if (headers.includes(field)) {
      console.log(`  ✓ ${field}`);
      results.foundHeaders.push(field);
    } else {
      console.log(`  ⚠️  ${field} - Missing (may be needed for some profiles)`);
      results.warnings.push(field);
    }
  }
  
  // Summary
  console.log('\n' + '═'.repeat(70));
  console.log('VALIDATION SUMMARY');
  console.log('═'.repeat(70));
  
  if (results.valid) {
    console.log('\n✅ ALL CRITICAL HEADERS PRESENT - Ready for testing!');
  } else {
    console.log('\n❌ CRITICAL HEADERS MISSING - Tests will fail!');
    console.log('\nMissing critical fields:');
    results.criticalMissing.forEach(field => {
      console.log(`  - ${field}`);
    });
    
    console.log('\n📋 TO FIX:');
    console.log('1. Add these column headers to Working Sheet row ' + headerRow);
    console.log('2. Or use the auto-fix function: fixMissingHeaders()');
  }
  
  return results;
}

// ═══════════════════════════════════════════════════════════════════════════════
// TEST DATA VALIDATION AND AUTO-FIX
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Validates test data completeness and consistency
 */
function validateTestDataCompleteness(testData, profileId) {
  const errors = [];
  const warnings = [];
  
  // Check critical fields
  CRITICAL_FIELDS.INVESTMENT_SCORING.forEach(field => {
    if (!testData[field] || testData[field] < 1 || testData[field] > 7) {
      errors.push(`${field} must be 1-7, got: ${testData[field] || 'missing'}`);
    }
  });
  
  CRITICAL_FIELDS.DOMAIN_IMPORTANCE.forEach(field => {
    if (!testData[field] || testData[field] < 1 || testData[field] > 7) {
      errors.push(`${field} must be 1-7, got: ${testData[field] || 'missing'}`);
    }
  });
  
  CRITICAL_FIELDS.YEARS_UNTIL.forEach(field => {
    if (testData[field] === undefined || testData[field] === null) {
      errors.push(`${field} is missing`);
    }
  });
  
  // Check financial fields
  if (!testData.Net_Monthly_Income || testData.Net_Monthly_Income <= 0) {
    errors.push('Net_Monthly_Income must be > 0');
  }
  
  if (!testData.Allocation_Percentage || testData.Allocation_Percentage <= 0) {
    errors.push('Allocation_Percentage must be > 0');
  }
  
  // Check consistency
  if (testData.cesa_num_children > 0 && testData.education_importance < 3) {
    warnings.push('Has children but education_importance is low');
  }
  
  if (testData.Current_Age >= 50 && !testData.Retirement_Catchup) {
    warnings.push('Age 50+ but catch-up not enabled');
  }
  
  // Profile-specific validation
  const profileValidation = validateProfileSpecificData(testData, profileId);
  errors.push(...profileValidation.errors);
  warnings.push(...profileValidation.warnings);
  
  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Profile-specific data validation
 */
function validateProfileSpecificData(testData, profileId) {
  const errors = [];
  const warnings = [];
  
  switch(profileId) {
    case '2_ROBS_Curious':
      if (!testData.ex_q5) warnings.push('ex_q5 (rollover balance) missing');
      if (!testData.ex_q6) warnings.push('ex_q6 (business income) missing');
      break;
      
    case '4_Roth_Reclaimer':
      if (testData.gross_annual_income > 146000 && !testData.ex_q1) {
        errors.push('High income but missing backdoor Roth questions');
      }
      break;
      
    case '7_Foundation_Builder':
      if (testData.ex_q1 === 'Yes' && !testData.ex_q3) {
        warnings.push('Has 401k but missing match percentage');
      }
      break;
  }
  
  return { errors, warnings };
}

/**
 * Auto-fix common test data issues
 */
function autoFixTestData(testData) {
  const fixed = { ...testData };
  
  // Set defaults for missing critical fields
  if (!fixed.investment_involvement) fixed.investment_involvement = 4;
  if (!fixed.investment_time) fixed.investment_time = 4;
  if (!fixed.investment_confidence) fixed.investment_confidence = 4;
  
  if (!fixed.retirement_importance) fixed.retirement_importance = 6;
  if (!fixed.education_importance) {
    fixed.education_importance = fixed.cesa_num_children > 0 ? 5 : 1;
  }
  if (!fixed.health_importance) {
    fixed.health_importance = fixed.hsa_eligibility === 'Yes' ? 5 : 3;
  }
  
  // Calculate years until fields
  if (!fixed.retirement_years_until_target && fixed.Current_Age) {
    fixed.retirement_years_until_target = Math.max(65 - fixed.Current_Age, 5);
  }
  
  if (!fixed.cesa_years_until_first_need) {
    fixed.cesa_years_until_first_need = fixed.cesa_num_children > 0 ? 10 : 99;
  }
  
  if (!fixed.hsa_years_until_need && fixed.Current_Age) {
    fixed.hsa_years_until_need = Math.max(65 - fixed.Current_Age, 10);
  }
  
  // Sync duplicate fields
  if (fixed.Full_Name && !fixed.full_name) fixed.full_name = fixed.Full_Name;
  if (fixed.Current_Age && !fixed.current_age) fixed.current_age = fixed.Current_Age;
  if (fixed.Email && !fixed.email) fixed.email = fixed.Email;
  
  // Calculate total monthly savings
  if (fixed.Net_Monthly_Income && fixed.Allocation_Percentage) {
    fixed.Total_Monthly_Savings_Capacity = 
      fixed.Net_Monthly_Income * (fixed.Allocation_Percentage / 100);
  }
  
  return fixed;
}

// ═══════════════════════════════════════════════════════════════════════════════
// ENHANCED TEST DATA GENERATORS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Generate complete test data with all required fields
 */
function generateCompleteTestData(profileId, overrides = {}) {
  // Start with complete template
  const baseData = { ...COMPLETE_TEST_TEMPLATE };
  
  // Apply profile-specific defaults
  const profileDefaults = getProfileDefaults(profileId);
  Object.assign(baseData, profileDefaults);
  
  // Apply overrides
  Object.assign(baseData, overrides);
  
  // Auto-fix any issues
  const fixedData = autoFixTestData(baseData);
  
  // Validate
  const validation = validateTestDataCompleteness(fixedData, profileId);
  if (!validation.valid) {
    console.warn('⚠️  Test data validation errors:', validation.errors);
  }
  
  return fixedData;
}

/**
 * Get profile-specific default values
 */
function getProfileDefaults(profileId) {
  const defaults = {
    ProfileID: profileId
  };
  
  switch(profileId) {
    case '1_ROBS_In_Use':
      return {
        ...defaults,
        Work_Situation: 'Self-employed',
        Using_ROBS: 'Yes',
        investment_involvement: 5,
        investment_confidence: 5,
        retirement_importance: 7
      };
      
    case '2_ROBS_Curious':
      return {
        ...defaults,
        Interested_in_ROBS: 'Yes',
        Plans_Biz: 'Yes',
        investment_involvement: 4,
        retirement_importance: 6
      };
      
    case '3_Solo401k_Builder':
      return {
        ...defaults,
        Work_Situation: 'Self-employed',
        Owns_Biz: 'Yes',
        investment_confidence: 4,
        retirement_importance: 6
      };
      
    case '4_Roth_Reclaimer':
      return {
        ...defaults,
        gross_annual_income: 180000,
        Tax_Minimization: 'Later',
        investment_confidence: 5,
        retirement_importance: 7
      };
      
    case '5_Bracket_Strategist':
      return {
        ...defaults,
        Tax_Minimization: 'Now',
        investment_time: 5,
        retirement_importance: 6
      };
      
    case '6_Catch_Up':
      return {
        ...defaults,
        Current_Age: 55,
        Retirement_Catchup: 'Yes',
        investment_involvement: 5,
        retirement_importance: 7
      };
      
    case '7_Foundation_Builder':
      return {
        ...defaults,
        investment_involvement: 3,
        investment_confidence: 3,
        retirement_importance: 5
      };
      
    case '8_Biz_Owner_Group':
      return {
        ...defaults,
        Work_Situation: 'Self-employed',
        Owns_Biz: 'Yes',
        W2_Employees: 'Yes',
        gross_annual_income: 300000,
        investment_confidence: 6,
        retirement_importance: 7
      };
      
    case '9_Late_Stage_Growth':
      return {
        ...defaults,
        Current_Age: 60,
        Retirement_Catchup: 'Yes',
        Retirement_Timeframe: 'Less than 5 years',
        investment_involvement: 6,
        retirement_importance: 7
      };
      
    default:
      return defaults;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// TEST RUNNERS WITH BETTER ERROR HANDLING
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Run a test with complete data validation
 */
function runTestWithValidation(profileId, scenario = {}) {
  console.log(`\n=== Testing ${profileId} ===`);
  
  // Generate complete test data
  const testData = generateCompleteTestData(profileId, scenario);
  
  // Validate before running
  const validation = validateTestDataCompleteness(testData, profileId);
  if (!validation.valid) {
    console.error('❌ Test data validation failed:');
    validation.errors.forEach(error => console.error(`  - ${error}`));
    console.log('\nAttempting auto-fix...');
    const fixedData = autoFixTestData(testData);
    return runCompleteScenarioTest('custom', { custom: fixedData });
  }
  
  if (validation.warnings.length > 0) {
    console.warn('⚠️  Warnings:');
    validation.warnings.forEach(warn => console.warn(`  - ${warn}`));
  }
  
  // Run the test
  return runCompleteScenarioTest('custom', { custom: testData });
}

// ═══════════════════════════════════════════════════════════════════════════════
// QUICK FIX FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Quick function to add missing headers to Working Sheet
 */
function fixMissingHeaders() {
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  const validation = validateHeadersEnhanced();
  
  if (validation.valid) {
    console.log('✅ All headers present, no fix needed');
    return;
  }
  
  const headers = ws.getRange(validation.headerRow, 1, 1, ws.getLastColumn()).getValues()[0];
  const lastCol = headers.filter(h => h).length + 1;
  
  console.log(`\nAdding ${validation.criticalMissing.length} missing headers starting at column ${lastCol}`);
  
  validation.criticalMissing.forEach((header, index) => {
    ws.getRange(validation.headerRow, lastCol + index).setValue(header);
    console.log(`  ✓ Added ${header} to column ${lastCol + index}`);
  });
  
  console.log('\n✅ Headers fixed! Run validateHeadersEnhanced() again to confirm.');
}

/**
 * Test all profiles with complete data
 */
function testAllProfilesWithValidation() {
  const profiles = [
    '1_ROBS_In_Use',
    '2_ROBS_Curious',
    '3_Solo401k_Builder',
    '4_Roth_Reclaimer',
    '5_Bracket_Strategist',
    '6_Catch_Up',
    '7_Foundation_Builder',
    '8_Biz_Owner_Group',
    '9_Late_Stage_Growth'
  ];
  
  console.log('Testing all profiles with complete validated data...\n');
  
  profiles.forEach(profileId => {
    try {
      runTestWithValidation(profileId);
      console.log(`✅ ${profileId} test passed\n`);
    } catch (error) {
      console.error(`❌ ${profileId} test failed: ${error.message}\n`);
    }
    Utilities.sleep(1000);
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// ENHANCED MENU
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Add enhanced testing options to menu
 */
function addEnhancedTestingMenu() {
  const ui = SpreadsheetApp.getUi();
  const menu = ui.createMenu('🧪 Enhanced Testing');
  
  menu
    .addItem('🔍 Validate Headers (Enhanced)', 'validateHeadersEnhanced')
    .addItem('🔧 Fix Missing Headers', 'fixMissingHeaders')
    .addSeparator()
    .addItem('✅ Test All Profiles (With Validation)', 'testAllProfilesWithValidation')
    .addSeparator()
    .addItem('📋 Show Complete Test Template', 'showCompleteTestTemplate')
    .addItem('🆘 Diagnose Test Failures', 'diagnoseTestFailures')
    .addToUi();
}

/**
 * Show the complete test template for reference
 */
function showCompleteTestTemplate() {
  console.log('\n' + '═'.repeat(70));
  console.log('COMPLETE TEST DATA TEMPLATE');
  console.log('═'.repeat(70) + '\n');
  
  console.log('Copy this template and fill in values for your test:\n');
  console.log(JSON.stringify(COMPLETE_TEST_TEMPLATE, null, 2));
  
  console.log('\n' + '═'.repeat(70));
  console.log('CRITICAL FIELDS (Must have valid values):');
  console.log('═'.repeat(70));
  
  Object.entries(CRITICAL_FIELDS).forEach(([group, fields]) => {
    console.log(`\n${group}:`);
    fields.forEach(field => {
      console.log(`  - ${field}: ${COMPLETE_TEST_TEMPLATE[field] || 'SET THIS!'}`);
    });
  });
}

/**
 * Diagnose common test failures
 */
function diagnoseTestFailures() {
  console.log('\n' + '═'.repeat(70));
  console.log('COMMON TEST FAILURE DIAGNOSIS');
  console.log('═'.repeat(70) + '\n');
  
  console.log('1. Equal $333/$333/$333 domain splits:');
  console.log('   ❌ Missing investment scoring fields (investment_involvement, etc.)');
  console.log('   ✅ Fix: Add values 1-7 for all investment scoring fields\n');
  
  console.log('2. Missing vehicles (401k, IRA, etc):');
  console.log('   ❌ Missing ex_q1-4 values for employer 401k questions');
  console.log('   ✅ Fix: Set ex_q1="Yes" if employer has 401k\n');
  
  console.log('3. $0 or NaN allocations:');
  console.log('   ❌ Missing Net_Monthly_Income or Allocation_Percentage');
  console.log('   ✅ Fix: Set both to positive numbers\n');
  
  console.log('4. "Cannot read property X of undefined":');
  console.log('   ❌ Headers not found in Working Sheet');
  console.log('   ✅ Fix: Run validateHeadersEnhanced() then fixMissingHeaders()\n');
  
  console.log('5. Wrong allocation percentage:');
  console.log('   ❌ Getting 20% when you set 15%');
  console.log('   ✅ This is correct - system enforces 20% minimum\n');
  
  console.log('Run validateHeadersEnhanced() first, then use generateCompleteTestData()');
}
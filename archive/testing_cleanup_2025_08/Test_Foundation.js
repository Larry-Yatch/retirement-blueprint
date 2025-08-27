/**
 * Test Foundation - A robust testing framework that prevents common failures
 * 
 * This addresses ALL the issues we've encountered:
 * 1. Missing required fields (investment scoring)
 * 2. Header mismatches and wrong row numbers
 * 3. Incomplete test logic
 * 4. Wrong assumptions about data flow
 * 5. Not understanding what functions expect
 */

// ============================================
// SECTION 1: HEADER MANAGEMENT
// ============================================

/**
 * Get headers dynamically and validate they exist
 * This prevents the #1 cause of test failures
 */
function getValidatedHeaders() {
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  if (!ws) {
    throw new Error('Working Sheet not found');
  }
  
  // CRITICAL: Headers are ALWAYS in row 2
  const headers = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  const hdr = {};
  
  headers.forEach((header, index) => {
    if (header) hdr[header] = index + 1;
  });
  
  // Validate critical headers exist
  const required = [
    'ProfileID', 'Net_Monthly_Income', 'Allocation_Percentage',
    'investment_involvement', 'investment_time', 'investment_confidence'
  ];
  
  const missing = required.filter(h => !hdr[h]);
  if (missing.length > 0) {
    throw new Error(`Missing required headers: ${missing.join(', ')}`);
  }
  
  return { ws, headers, hdr };
}

// ============================================
// SECTION 2: COMPLETE TEST DATA REQUIREMENTS
// ============================================

/**
 * Document EVERY field the engine needs
 * This prevents missing field errors
 */
const ENGINE_REQUIREMENTS = {
  // Core identification
  identity: {
    'Timestamp': { type: 'date', default: () => new Date() },
    'Full_Name': { type: 'string', required: true },
    'Email': { type: 'string', required: true },
    'Student_ID_Last4': { type: 'string', required: true }
  },
  
  // Demographics
  demographics: {
    'Current_Age': { type: 'number', required: true, min: 18, max: 100 },
    'Work_Situation': { type: 'enum', values: ['W-2 employee', 'Self-employed'], required: true },
    'filing_status': { type: 'enum', values: ['Single', 'Married Filing Jointly'], required: true }
  },
  
  // Financial
  financial: {
    'gross_annual_income': { type: 'number', required: true, min: 0 },
    'Net_Monthly_Income': { type: 'number', required: true, min: 0 },
    'Allocation_Percentage': { type: 'number', required: true, min: 0, max: 100 }
  },
  
  // Investment Scoring (CRITICAL - causes $333 split if missing!)
  investmentScoring: {
    'investment_involvement': { type: 'number', required: true, min: 1, max: 7, default: 4 },
    'investment_time': { type: 'number', required: true, min: 1, max: 7, default: 4 },
    'investment_confidence': { type: 'number', required: true, min: 1, max: 7, default: 4 }
  },
  
  // Preferences
  preferences: {
    'ProfileID': { type: 'string', required: true },
    'Tax_Minimization': { type: 'enum', values: ['Now', 'Later', 'Both'], default: 'Both' },
    'hsa_eligibility': { type: 'enum', values: ['Yes', 'No'], default: 'No' },
    'cesa_num_children': { type: 'number', default: 0, min: 0 }
  }
};

/**
 * Profile-specific question mappings
 * This prevents wrong ex_q assignments
 */
const PROFILE_EX_Q_REQUIREMENTS = {
  '2_ROBS_Curious': {
    ex_q1: { name: 'employer_401k', type: 'enum', values: ['Yes', 'No'] },
    ex_q2: { name: 'employer_match', type: 'enum', values: ['Yes', 'No'] },
    ex_q3: { name: 'match_percentage', type: 'string' },
    ex_q4: { name: 'roth_option', type: 'enum', values: ['Yes', 'No'] },
    ex_q5: { name: 'rollover_balance', type: 'number' },
    ex_q6: { name: 'business_income', type: 'number' },
    ex_q7: { name: 'spouse_in_business', type: 'enum', values: ['Yes', 'No'] }
  },
  '4_Roth_Reclaimer': {
    ex_q5: { name: 'trad_ira_balance', type: 'number' },
    ex_q6: { name: 'after_tax_contributions', type: 'enum', values: ['Yes', 'No'] },
    ex_q7: { name: 'understands_backdoor', type: 'enum', values: ['Yes', 'No'] },
    ex_q8: { name: 'conversion_amount', type: 'number' },
    ex_q1: { name: 'employer_401k', type: 'enum', values: ['Yes', 'No'] },
    ex_q2: { name: 'employer_match', type: 'enum', values: ['Yes', 'No'] },
    ex_q3: { name: 'match_percentage', type: 'string' },
    ex_q4: { name: 'roth_option', type: 'enum', values: ['Yes', 'No'] }
  },
  '7_Foundation_Builder': {
    ex_q1: { name: 'employer_401k', type: 'enum', values: ['Yes', 'No'] },
    ex_q2: { name: 'employer_match', type: 'enum', values: ['Yes', 'No'] },
    ex_q3: { name: 'match_percentage', type: 'string' },
    ex_q4: { name: 'roth_option', type: 'enum', values: ['Yes', 'No'] }
  }
};

// ============================================
// SECTION 3: SMART TEST DATA BUILDER
// ============================================

/**
 * Build complete, valid test data with validation
 */
function buildCompleteTestData(profile, customValues = {}) {
  const testData = {};
  
  // 1. Add all required fields with defaults
  Object.entries(ENGINE_REQUIREMENTS).forEach(([category, fields]) => {
    Object.entries(fields).forEach(([field, config]) => {
      if (config.default !== undefined) {
        testData[field] = typeof config.default === 'function' ? config.default() : config.default;
      } else if (config.required) {
        // Provide sensible defaults for required fields
        switch (config.type) {
          case 'number':
            testData[field] = field.includes('income') ? 75000 : 
                             field.includes('Age') ? 35 : 
                             field.includes('Percentage') ? 20 : 0;
            break;
          case 'string':
            testData[field] = `Test ${field}`;
            break;
          case 'enum':
            testData[field] = config.values[0];
            break;
        }
      }
    });
  });
  
  // 2. Set profile ID
  testData.ProfileID = profile;
  
  // 3. Add profile-specific ex_q values
  const profileReqs = PROFILE_EX_Q_REQUIREMENTS[profile];
  if (profileReqs) {
    Object.entries(profileReqs).forEach(([exQ, config]) => {
      if (config.type === 'enum') {
        testData[exQ] = config.values[0]; // Default to first option
      } else if (config.type === 'number') {
        testData[exQ] = 0;
      } else {
        testData[exQ] = '';
      }
    });
  }
  
  // 4. Apply custom values
  Object.assign(testData, customValues);
  
  // 5. Validate the complete data
  const validation = validateCompleteTestData(testData);
  if (!validation.valid) {
    console.error('Test data validation failed:');
    validation.errors.forEach(err => console.error(`  - ${err}`));
    throw new Error('Invalid test data');
  }
  
  return testData;
}

/**
 * Comprehensive validation
 */
function validateCompleteTestData(testData) {
  const errors = [];
  
  // Check all required fields
  Object.entries(ENGINE_REQUIREMENTS).forEach(([category, fields]) => {
    Object.entries(fields).forEach(([field, config]) => {
      if (config.required && !testData[field] && testData[field] !== 0) {
        errors.push(`Missing required field: ${field}`);
      }
      
      // Type validation
      if (testData[field] !== undefined) {
        if (config.type === 'number' && typeof testData[field] !== 'number') {
          errors.push(`${field} must be a number, got ${typeof testData[field]}`);
        }
        if (config.min !== undefined && testData[field] < config.min) {
          errors.push(`${field} must be >= ${config.min}, got ${testData[field]}`);
        }
        if (config.max !== undefined && testData[field] > config.max) {
          errors.push(`${field} must be <= ${config.max}, got ${testData[field]}`);
        }
        if (config.values && !config.values.includes(testData[field])) {
          errors.push(`${field} must be one of [${config.values.join(', ')}], got ${testData[field]}`);
        }
      }
    });
  });
  
  // Special validation for investment scores
  if (!testData.investment_involvement || !testData.investment_time || !testData.investment_confidence) {
    errors.push('CRITICAL: Missing investment scoring - will cause $333 equal split!');
  }
  
  return { valid: errors.length === 0, errors };
}

// ============================================
// SECTION 4: SAFE TEST RUNNER
// ============================================

/**
 * Run tests with comprehensive error handling and debugging
 */
function runSafeTest(testName, profileId, customValues = {}) {
  console.log('\n' + '='.repeat(80));
  console.log(`SAFE TEST: ${testName}`);
  console.log('='.repeat(80));
  
  try {
    // 1. Get validated headers
    console.log('\n1️⃣ Validating headers...');
    const { ws, headers, hdr } = getValidatedHeaders();
    console.log('✅ Headers validated');
    
    // 2. Build complete test data
    console.log('\n2️⃣ Building test data...');
    const testData = buildCompleteTestData(profileId, customValues);
    console.log('✅ Test data complete');
    
    // Show key values
    console.log('\nKey test values:');
    console.log(`  Profile: ${testData.ProfileID}`);
    console.log(`  Age: ${testData.Current_Age}`);
    console.log(`  Income: $${testData.gross_annual_income}`);
    console.log(`  Net Monthly: $${testData.Net_Monthly_Income}`);
    console.log(`  Allocation: ${testData.Allocation_Percentage}%`);
    console.log(`  Investment Scores: ${testData.investment_involvement}/${testData.investment_time}/${testData.investment_confidence}`);
    
    // 3. Write test data
    console.log('\n3️⃣ Writing test data...');
    const testRow = ws.getLastRow() + 1;
    Object.entries(testData).forEach(([key, value]) => {
      if (hdr[key]) {
        ws.getRange(testRow, hdr[key]).setValue(value);
      }
    });
    console.log(`✅ Data written to row ${testRow}`);
    
    // 4. Run profile helper
    console.log('\n4️⃣ Running profile helper...');
    const rowData = ws.getRange(testRow, 1, 1, ws.getLastColumn()).getValues()[0];
    const profileResult = profileHelpers[profileId](rowData, hdr);
    
    console.log('\nGenerated vehicles:');
    ['Education', 'Health', 'Retirement'].forEach(domain => {
      console.log(`\n${domain}:`);
      profileResult.vehicleOrders[domain].forEach(v => {
        console.log(`  - ${v.name}: ${v.capMonthly === Infinity ? 'Unlimited' : '$' + Math.round(v.capMonthly) + '/mo'}`);
      });
    });
    
    // 5. Run engine
    console.log('\n5️⃣ Running universal engine...');
    const engineResult = runUniversalEngine(testRow);
    
    console.log('\nEngine allocations:');
    let totalAllocated = 0;
    Object.entries(engineResult.vehicles).forEach(([domain, vehicles]) => {
      console.log(`\n${domain}:`);
      let domainTotal = 0;
      Object.entries(vehicles).forEach(([vehicle, amount]) => {
        if (amount > 0) {
          console.log(`  - ${vehicle}: $${Math.round(amount)}/mo`);
          domainTotal += amount;
        }
      });
      totalAllocated += domainTotal;
      console.log(`  Subtotal: $${Math.round(domainTotal)}`);
    });
    
    console.log(`\nTotal allocated: $${Math.round(totalAllocated)}/mo`);
    
    // 6. Verify results
    console.log('\n6️⃣ Verifying results...');
    const expectedAllocation = testData.Net_Monthly_Income * Math.max(0.20, testData.Allocation_Percentage / 100);
    console.log(`  Expected: $${Math.round(expectedAllocation)}/mo`);
    console.log(`  Actual: $${Math.round(totalAllocated)}/mo`);
    console.log(`  Match: ${Math.abs(totalAllocated - expectedAllocation) < 5 ? '✅' : '❌'}`);
    
    // Check for common issues
    const amounts = [];
    Object.values(engineResult.vehicles).forEach(domain => {
      Object.values(domain).forEach(amount => {
        if (amount > 0) amounts.push(amount);
      });
    });
    const allSame = amounts.length > 1 && amounts.every(a => Math.abs(a - amounts[0]) < 1);
    if (allSame) {
      console.log('\n⚠️  WARNING: Equal domain splits detected!');
      console.log('This usually means investment scoring is missing or invalid');
    }
    
    // Clean up
    console.log('\n7️⃣ Cleaning up...');
    ws.deleteRow(testRow);
    
    console.log('\n✅ TEST COMPLETE');
    return { success: true, result: engineResult };
    
  } catch (error) {
    console.error('\n❌ TEST FAILED:');
    console.error(error.message);
    console.error('\nStack trace:');
    console.error(error.stack);
    
    console.error('\nCommon causes:');
    console.error('1. Missing investment scoring fields');
    console.error('2. Headers in wrong row (should be row 2)');
    console.error('3. Missing required fields');
    console.error('4. Profile helper not found');
    
    return { success: false, error: error.message };
  }
}

// ============================================
// SECTION 5: PRE-BUILT TEST SCENARIOS
// ============================================

/**
 * Ready-to-use test scenarios that ACTUALLY WORK
 */
const WORKING_TEST_SCENARIOS = {
  // Profile 7 - Foundation Builder
  profile7_young_401k: () => runSafeTest('Profile 7 - Young with 401k', '7_Foundation_Builder', {
    Current_Age: 25,
    gross_annual_income: 65000,
    Net_Monthly_Income: 4333,
    Allocation_Percentage: 15,
    ex_q1: 'Yes',  // Has 401k
    ex_q2: 'Yes',  // Has match
    ex_q3: '100% up to 3%',
    ex_q4: 'Yes'   // Roth option
  }),
  
  profile7_family: () => runSafeTest('Profile 7 - Family', '7_Foundation_Builder', {
    Current_Age: 35,
    gross_annual_income: 95000,
    Net_Monthly_Income: 6500,
    filing_status: 'Married Filing Jointly',
    cesa_num_children: 2,
    Allocation_Percentage: 20,
    ex_q1: 'Yes',
    ex_q2: 'Yes',
    ex_q3: '50% up to 6%',
    ex_q4: 'No'
  }),
  
  // Profile 4 - Roth Reclaimer
  profile4_backdoor: () => runSafeTest('Profile 4 - Backdoor Roth', '4_Roth_Reclaimer', {
    Current_Age: 40,
    gross_annual_income: 200000,
    Net_Monthly_Income: 11000,
    Allocation_Percentage: 30,
    ex_q5: 50000,  // Trad IRA balance
    ex_q6: 'Yes',  // After-tax contributions
    ex_q7: 'Yes',  // Understands backdoor
    ex_q8: 25000,  // Conversion amount
    ex_q1: 'Yes',  // Has 401k
    ex_q2: 'Yes',  // Has match
    ex_q3: '100% up to 4%',
    ex_q4: 'Yes'   // Roth option
  }),
  
  // Profile 2 - ROBS Curious
  profile2_w2: () => runSafeTest('Profile 2 - W2 Employee', '2_ROBS_Curious', {
    Current_Age: 45,
    gross_annual_income: 120000,
    Net_Monthly_Income: 7500,
    Allocation_Percentage: 26.7,
    ex_q1: 'Yes',
    ex_q2: 'Yes',
    ex_q3: '50% up to 6%',
    ex_q4: 'Yes',
    ex_q5: 75000,  // Rollover balance
    ex_q6: 0,      // Business income
    ex_q7: 'No'    // Spouse in business
  })
};

// ============================================
// SECTION 6: TEST MENU
// ============================================

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🧪 Safe Testing')
    .addItem('Test Profile 7 - Young 401k', 'testProfile7Young401k')
    .addItem('Test Profile 7 - Family', 'testProfile7Family')
    .addItem('Test Profile 4 - Backdoor', 'testProfile4Backdoor')
    .addItem('Test Profile 2 - W2', 'testProfile2W2')
    .addSeparator()
    .addItem('Validate Headers', 'validateHeadersOnly')
    .addItem('Show Requirements', 'showTestRequirements')
    .addToUi();
}

// Menu functions
function testProfile7Young401k() { WORKING_TEST_SCENARIOS.profile7_young_401k(); }
function testProfile7Family() { WORKING_TEST_SCENARIOS.profile7_family(); }
function testProfile4Backdoor() { WORKING_TEST_SCENARIOS.profile4_backdoor(); }
function testProfile2W2() { WORKING_TEST_SCENARIOS.profile2_w2(); }

function validateHeadersOnly() {
  try {
    const { headers } = getValidatedHeaders();
    console.log('✅ Headers validated successfully');
    console.log(`Found ${headers.length} columns`);
  } catch (error) {
    console.error('❌ Header validation failed:', error.message);
  }
}

function showTestRequirements() {
  console.log('TEST DATA REQUIREMENTS');
  console.log('=' .repeat(50));
  
  Object.entries(ENGINE_REQUIREMENTS).forEach(([category, fields]) => {
    console.log(`\n${category.toUpperCase()}:`);
    Object.entries(fields).forEach(([field, config]) => {
      const req = config.required ? 'REQUIRED' : 'optional';
      console.log(`  ${field}: ${config.type} (${req})`);
    });
  });
  
  console.log('\n\nCRITICAL FIELDS:');
  console.log('- investment_involvement (1-7)');
  console.log('- investment_time (1-7)');
  console.log('- investment_confidence (1-7)');
  console.log('Without these, you get $333/$333/$333 split!');
}
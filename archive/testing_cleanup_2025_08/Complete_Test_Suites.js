/**
 * COMPLETE TEST SUITES FOR ALL PROFILES
 * 
 * Each test suite contains:
 * 1. baseData - ALL fields needed for proper testing
 * 2. scenarios - Different user situations to test
 * 
 * This eliminates all missing field errors and ensures consistent testing
 */

// ============================================
// PROFILE 7: FOUNDATION BUILDER
// ============================================
const PROFILE_7_TEST_SUITE = {
  baseData: {
    // ── Administrative ──
    'Timestamp': new Date(),
    'timestamp': new Date(), // Phase 2 timestamp
    
    // ── Phase 1: Personal Information ──
    'Full_Name': 'Foundation Builder Test',
    'full_name': 'Foundation Builder Test', // Phase 2 version
    'Email': 'foundation@test.com',
    'email': 'foundation@test.com', // Phase 2 version
    'Student_ID_Last4': '7001',
    'student_identifier': '7001', // Phase 2 version
    'Current_Age': 30,
    'current_age': 30, // Phase 2 version
    
    // ── Phase 1: Work & Business ──
    'Work_Situation': 'W-2 employee',
    'Owns_Biz': 'No',
    'Plans_Biz': 'No',
    'W2_Employees': 'No',
    
    // ── Phase 1: Retirement Accounts ──
    'Roth_IRA_Holder': 'No',
    'Traditional_Retirement': 'Yes',
    'Using_ROBS': 'No',
    'Interested_in_ROBS': 'No',
    'ROBS_New_Business': 'No',
    'Rollover_Account_50k': 'No',
    'Setup_Cost_Funding': 'N/A',
    
    // ── Phase 1: Tax & Income ──
    'Tax_Minimization': 'Both',
    'gross_annual_income': 75000,
    'filing_status': 'Single',
    'Net_Monthly_Income': 5000,
    'Allocation_Percentage': 20,
    'Total_Monthly_Savings_Capacity': 1000,
    
    // ── Phase 1: Goals & Timing ──
    'Retirement_Catchup': 'No',
    'Retirement_Timeframe': '30+ years',
    'Action_Motivation': 'Build wealth',
    
    // ── Phase 1: Computed Fields ──
    'ProfileID': '7_Foundation_Builder',
    'USES_ROBS': 'FALSE',
    'INTREST_ROBS': 'FALSE',
    'ROBS_READY': 'FALSE',
    'SELF_EMPLOYED': 'FALSE',
    'HAS_BIZ': 'FALSE',
    'PLANS_BIZ': 'FALSE',
    'HAS_EMPLOYEES': 'FALSE',
    'SOLO401K_AVAILABLE': 'FALSE',
    'NEEDS_BACKDOOR_ROTH': 'FALSE',
    'CATCH_UP_ELIGIBLE': 'FALSE',
    'LATE_STAGE_ELIGIBLE': 'FALSE',
    'TAX_FOCUS_NOW': 'FALSE',
    'TAX_FOCUS_LATER': 'FALSE',
    'TAX_FOCUS_BOTH': 'TRUE',
    'URGENT_ACTION': 'FALSE',
    
    // ── Phase 2: Investment Scoring (CRITICAL!) ──
    'investment_involvement': 3,
    'investment_time': 3,
    'investment_confidence': 3,
    
    // ── Phase 2: Domain Importance (CRITICAL!) ──
    'retirement_importance': 6,
    'education_importance': 1,
    'health_importance': 4,
    
    // ── Phase 2: Domain Anxiety & Motivation ──
    'retirement_anxiety': 4,
    'retirement_motivation': 6,
    'education_anxiety': 1,
    'education_motivation': 1,
    'health_anxiety': 3,
    'health_motivation': 4,
    
    // ── Phase 2: Years Until Need (CRITICAL!) ──
    'target_retirement_age': 65,
    'retirement_years_until_target': 35,
    'hsa_years_until_need': 20,
    'cesa_years_until_first_need': 99, // No kids
    'years_until_use_of_funds': 35,
    
    // ── Phase 2: Current Balances ──
    'retirement_current_balance': 10000,
    'retirement_personal_contribution': 500,
    'retirement_desired_monthly_income': 8000,
    'current_hsa_balance': 0,
    'current_monthly_hsa_contribution': 0,
    'hsa_target_balance': 100000,
    'cesa_current_balance': 0,
    'cesa_monthly_contribution': 0,
    'cesa_total_goal': 0,
    
    // ── Phase 2: Benefits ──
    'hsa_eligibility': 'Yes',
    'has_children_or_plan_children_education': 'No',
    'cesa_num_children': 0,
    
    // ── Phase 2: Tiebreaker Questions ──
    'tie_fund_choice': 'Retirement',
    'tie_painful_choice': 'Education',
    'tie_rank_retirement': 1,
    'tie_rank_education': 3,
    'tie_rank_health': 2,
    
    // ── Phase 2: Profile 7 Specific Questions ──
    'ex_q1': 'Yes',           // Has employer 401k
    'ex_q2': 'Yes',           // Has match
    'ex_q3': '100% up to 3%', // Match percentage
    'ex_q4': 'Yes',           // Has Roth 401k option
    'ex_q5': '10000',         // Emergency fund goal
    'ex_q6': '2000',          // Current emergency savings
    'ex_q7': 'Moderate',      // Risk tolerance
    'ex_q8': '',
    'ex_q9': '',
    'ex_q10': '',
    
    // ── Phase 2 Link Status ──
    'Phase_2_Link_Sent': 'Yes',
    'Phase_2_Link': 'https://forms.gle/test'
  },
  
  scenarios: {
    // Young professional just starting out
    youngProfessional: {
      'Full_Name': 'Young Professional',
      'full_name': 'Young Professional',
      'Current_Age': 25,
      'current_age': 25,
      'gross_annual_income': 65000,
      'Net_Monthly_Income': 4500,
      'Allocation_Percentage': 15,
      'retirement_years_until_target': 40,
      'ex_q3': '100% up to 3%', // Modest match
      'investment_involvement': 2, // Lower confidence
      'investment_time': 2,
      'investment_confidence': 2
    },
    
    // Mid-career with family
    familyStarter: {
      'Full_Name': 'Family Starter',
      'full_name': 'Family Starter',
      'Current_Age': 35,
      'current_age': 35,
      'filing_status': 'Married Filing Jointly',
      'gross_annual_income': 95000,
      'Net_Monthly_Income': 6500,
      'Allocation_Percentage': 20,
      'has_children_or_plan_children_education': 'Yes',
      'cesa_num_children': 2,
      'education_importance': 6,
      'retirement_importance': 5,
      'cesa_years_until_first_need': 10,
      'retirement_years_until_target': 30,
      'ex_q3': '50% up to 6%', // Better match
      'ex_q4': 'No' // No Roth 401k
    },
    
    // High income professional
    highIncome: {
      'Full_Name': 'High Income Professional',
      'full_name': 'High Income Professional',
      'Current_Age': 40,
      'current_age': 40,
      'gross_annual_income': 150000,
      'Net_Monthly_Income': 9500,
      'Allocation_Percentage': 25,
      'retirement_years_until_target': 25,
      'NEEDS_BACKDOOR_ROTH': 'TRUE',
      'ex_q3': '100% up to 6%', // Excellent match
      'ex_q5': '30000', // Higher emergency fund goal
      'investment_involvement': 5,
      'investment_time': 5,
      'investment_confidence': 5
    },
    
    // No employer 401k
    noEmployer401k: {
      'Full_Name': 'No 401k Available',
      'full_name': 'No 401k Available',
      'ex_q1': 'No', // No employer 401k
      'ex_q2': 'No',
      'ex_q3': '',
      'ex_q4': 'No'
    }
  }
};

// ============================================
// PROFILE 2: ROBS CURIOUS
// ============================================
const PROFILE_2_TEST_SUITE = {
  baseData: {
    // Copy all fields from Profile 7 base data
    ...PROFILE_7_TEST_SUITE.baseData,
    
    // Override Profile 2 specific values
    'ProfileID': '2_ROBS_Curious',
    'Full_Name': 'ROBS Curious Test',
    'full_name': 'ROBS Curious Test',
    'Email': 'robs.curious@test.com',
    'email': 'robs.curious@test.com',
    'Student_ID_Last4': '2001',
    'student_identifier': '2001',
    
    // ROBS specific
    'Interested_in_ROBS': 'Yes',
    'INTREST_ROBS': 'TRUE',
    'Rollover_Account_50k': 'Yes',
    'ROBS_READY': 'TRUE',
    
    // Profile 2 specific questions
    'ex_q1': 'Yes',         // Has employer 401k
    'ex_q2': 'Yes',         // Has match
    'ex_q3': '50% up to 6%',// Match details
    'ex_q4': 'Yes',         // Roth option
    'ex_q5': '75000',       // Rollover balance
    'ex_q6': '0',           // Business income
    'ex_q7': 'No'           // Spouse in business
  },
  
  scenarios: {
    w2Employee: {
      'Full_Name': 'W2 Employee ROBS',
      'full_name': 'W2 Employee ROBS',
      'Work_Situation': 'W-2 employee',
      'Current_Age': 45,
      'current_age': 45,
      'gross_annual_income': 120000,
      'Net_Monthly_Income': 7500,
      'filing_status': 'Married Filing Jointly',
      'has_children_or_plan_children_education': 'Yes',
      'cesa_num_children': 2,
      'retirement_years_until_target': 20,
      // Fix domain importance for someone with kids
      'education_importance': 5,  // Has 2 kids, education is important
      'retirement_importance': 5, // ROBS curious, retirement important too
      'health_importance': 4,     // Moderate health importance
      'cesa_years_until_first_need': 10  // Kids need college in ~10 years
    },
    
    selfEmployed: {
      'Full_Name': 'Self Employed ROBS',
      'full_name': 'Self Employed ROBS',
      'Work_Situation': 'Self-employed',
      'Owns_Biz': 'Yes',
      'HAS_BIZ': 'TRUE',
      'SELF_EMPLOYED': 'TRUE',
      'Current_Age': 52,
      'current_age': 52,
      'gross_annual_income': 150000,
      'Net_Monthly_Income': 9000,
      'ex_q1': 'No', // No employer 401k
      'ex_q2': 'No',
      'ex_q6': '50000', // Business income
      'retirement_years_until_target': 13
    }
  }
};

// ============================================
// PROFILE 4: ROTH RECLAIMER
// ============================================
const PROFILE_4_TEST_SUITE = {
  baseData: {
    // Copy all fields from Profile 7 base data
    ...PROFILE_7_TEST_SUITE.baseData,
    
    // Override Profile 4 specific values
    'ProfileID': '4_Roth_Reclaimer',
    'Full_Name': 'Roth Reclaimer Test',
    'full_name': 'Roth Reclaimer Test',
    'Email': 'roth.reclaimer@test.com',
    'email': 'roth.reclaimer@test.com',
    'Student_ID_Last4': '4001',
    'student_identifier': '4001',
    
    // Roth specific
    'Tax_Minimization': 'Later',
    'TAX_FOCUS_LATER': 'TRUE',
    'TAX_FOCUS_BOTH': 'FALSE',
    'Traditional_Retirement': 'Yes',
    'Roth_IRA_Holder': 'Yes',
    
    // Profile 4 specific questions (8 questions!)
    'ex_q1': 'Yes',         // Has employer 401k
    'ex_q2': 'Yes',         // Has match
    'ex_q3': '100% up to 4%',// Match percentage
    'ex_q4': 'Yes',         // Has Roth 401k option
    'ex_q5': '50000',       // Traditional IRA balance
    'ex_q6': 'Yes',         // Made after-tax contributions
    'ex_q7': 'Yes',         // Understands backdoor Roth
    'ex_q8': '25000'        // Conversion amount
  },
  
  scenarios: {
    highIncomeBackdoor: {
      'Full_Name': 'High Income Backdoor',
      'full_name': 'High Income Backdoor',
      'Current_Age': 40,
      'current_age': 40,
      'gross_annual_income': 200000,
      'Net_Monthly_Income': 11000,
      'Allocation_Percentage': 30,
      'NEEDS_BACKDOOR_ROTH': 'TRUE',
      'retirement_years_until_target': 25
    },
    
    lowIncomeDirectRoth: {
      'Full_Name': 'Low Income Direct Roth',
      'full_name': 'Low Income Direct Roth',
      'Current_Age': 30,
      'current_age': 30,
      'gross_annual_income': 75000,
      'Net_Monthly_Income': 5500,
      'filing_status': 'Married Filing Jointly',
      'ex_q5': '0', // No Traditional IRA
      'ex_q6': 'No',
      'ex_q7': 'No',
      'ex_q8': '0',
      'retirement_years_until_target': 35
    }
  }
};

// ============================================
// TEST RUNNER FUNCTIONS
// ============================================

/**
 * Get test suite for a profile
 */
function getTestSuite(profileId) {
  const suites = {
    '2_ROBS_Curious': PROFILE_2_TEST_SUITE,
    '4_Roth_Reclaimer': PROFILE_4_TEST_SUITE,
    '7_Foundation_Builder': PROFILE_7_TEST_SUITE
  };
  
  return suites[profileId];
}

/**
 * Run a complete test with all required fields
 */
function testProfileComplete(profileId, scenarioName = 'typical') {
  console.log('\n' + '='.repeat(80));
  console.log(`TESTING ${profileId} - ${scenarioName}`);
  console.log('='.repeat(80));
  
  const suite = getTestSuite(profileId);
  if (!suite) {
    console.log(`❌ No test suite found for ${profileId}`);
    return;
  }
  
  // Get base scenario name
  const baseScenarioName = Object.keys(suite.scenarios)[0] || 'typical';
  const scenario = suite.scenarios[scenarioName] || suite.scenarios[baseScenarioName];
  
  // Merge base data with scenario overrides
  const testData = { ...suite.baseData, ...scenario };
  
  // Write to Working Sheet
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  const headers = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  
  const hdr = {};
  headers.forEach((header, index) => {
    if (header) hdr[header] = index + 1;
  });
  
  const testRow = ws.getLastRow() + 1;
  
  console.log('Writing complete test data...');
  console.log(`- Base fields: ${Object.keys(suite.baseData).length}`);
  console.log(`- Scenario overrides: ${Object.keys(scenario).length}`);
  
  // Write all fields
  let fieldsWritten = 0;
  Object.entries(testData).forEach(([key, value]) => {
    if (hdr[key]) {
      ws.getRange(testRow, hdr[key]).setValue(value);
      fieldsWritten++;
    }
  });
  
  console.log(`✅ Wrote ${fieldsWritten} fields to row ${testRow}`);
  
  // Run the engine
  console.log('\nRunning universal engine...');
  try {
    const result = runUniversalEngine(testRow);
    
    console.log('\n💰 ALLOCATIONS:');
    let total = 0;
    
    Object.entries(result.vehicles).forEach(([domain, vehicles]) => {
      console.log(`\n${domain}:`);
      let domainTotal = 0;
      Object.entries(vehicles).forEach(([vehicle, amount]) => {
        if (amount > 0) {
          console.log(`  - ${vehicle}: $${Math.round(amount)}/mo`);
          domainTotal += amount;
        }
      });
      total += domainTotal;
      if (domainTotal > 0) {
        console.log(`  Subtotal: $${Math.round(domainTotal)}/mo`);
      }
    });
    
    console.log(`\n📊 SUMMARY:`);
    console.log(`Total allocated: $${Math.round(total)}/mo`);
    console.log(`Expected (${testData.Allocation_Percentage}%): $${Math.round(testData.Net_Monthly_Income * testData.Allocation_Percentage / 100)}/mo`);
    
    // Check for 401k vehicles if expected
    if (testData.ex_q1 === 'Yes') {
      const has401k = Object.keys(result.vehicles.Retirement || {})
        .some(v => v.includes('401') || v.includes('401(k)'));
      console.log(`\n401(k) vehicles: ${has401k ? '✅ Present' : '❌ MISSING'}`);
    }
    
    console.log('\n✅ Test completed successfully');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log(error.stack);
  }
  
  // Clean up
  ws.deleteRow(testRow);
}

// Quick test functions
function testProfile7Young() { testProfileComplete('7_Foundation_Builder', 'youngProfessional'); }
function testProfile7Family() { testProfileComplete('7_Foundation_Builder', 'familyStarter'); }
function testProfile7HighIncome() { testProfileComplete('7_Foundation_Builder', 'highIncome'); }
function testProfile7No401k() { testProfileComplete('7_Foundation_Builder', 'noEmployer401k'); }

function testProfile2W2() { testProfileComplete('2_ROBS_Curious', 'w2Employee'); }
function testProfile2Self() { testProfileComplete('2_ROBS_Curious', 'selfEmployed'); }

function testProfile4Backdoor() { testProfileComplete('4_Roth_Reclaimer', 'highIncomeBackdoor'); }
function testProfile4Direct() { testProfileComplete('4_Roth_Reclaimer', 'lowIncomeDirectRoth'); }

/**
 * Test all scenarios for a profile
 */
function testProfileAllScenarios(profileId) {
  const suite = getTestSuite(profileId);
  if (!suite) {
    console.log(`❌ No test suite found for ${profileId}`);
    return;
  }
  
  console.log(`\nTesting all scenarios for ${profileId}...`);
  
  Object.keys(suite.scenarios).forEach(scenarioName => {
    testProfileComplete(profileId, scenarioName);
    Utilities.sleep(2000); // Pause between tests
  });
  
  console.log('\n' + '='.repeat(80));
  console.log(`ALL SCENARIOS TESTED FOR ${profileId}`);
  console.log('='.repeat(80));
}
/**
 * FIXED COMPLETE TEST SUITES
 * 
 * No more lazy copying! Each profile has its own complete base data
 * with appropriate defaults that make sense for that profile
 */

// ============================================
// PROFILE 2: ROBS CURIOUS - COMPLETE BASE DATA
// ============================================
const PROFILE_2_COMPLETE = {
  baseData: {
    // ── Administrative ──
    'Timestamp': new Date(),
    'timestamp': new Date(),
    
    // ── Personal Information ──
    'Full_Name': 'ROBS Curious Test',
    'full_name': 'ROBS Curious Test',
    'Email': 'robs.curious@test.com',
    'email': 'robs.curious@test.com',
    'Student_ID_Last4': '2001',
    'student_identifier': '2001',
    'Current_Age': 45,
    'current_age': 45,
    
    // ── Work & Business ──
    'Work_Situation': 'W-2 employee',
    'Owns_Biz': 'No',
    'Plans_Biz': 'Yes', // Curious about ROBS for future business
    'W2_Employees': 'No',
    
    // ── Retirement Accounts ──
    'Roth_IRA_Holder': 'Yes',
    'Traditional_Retirement': 'Yes',
    'Using_ROBS': 'No',
    'Interested_in_ROBS': 'Yes', // Key for this profile
    'ROBS_New_Business': 'Yes',
    'Rollover_Account_50k': 'Yes', // Has rollover for potential ROBS
    'Setup_Cost_Funding': 'Rollover',
    
    // ── Tax & Income ──
    'Tax_Minimization': 'Both',
    'gross_annual_income': 100000,
    'filing_status': 'Married Filing Jointly',
    'Net_Monthly_Income': 6500,
    'Allocation_Percentage': 20,
    'Total_Monthly_Savings_Capacity': 1300,
    
    // ── Goals & Timing ──
    'Retirement_Catchup': 'No',
    'Retirement_Timeframe': '20-30 years',
    'Action_Motivation': 'Start business',
    
    // ── Computed Fields (Profile 2 appropriate) ──
    'ProfileID': '2_ROBS_Curious',
    'USES_ROBS': 'FALSE',
    'INTREST_ROBS': 'TRUE',
    'ROBS_READY': 'TRUE',
    'SELF_EMPLOYED': 'FALSE',
    'HAS_BIZ': 'FALSE',
    'PLANS_BIZ': 'TRUE',
    'HAS_EMPLOYEES': 'FALSE',
    'SOLO401K_AVAILABLE': 'FALSE',
    'NEEDS_BACKDOOR_ROTH': 'FALSE',
    'CATCH_UP_ELIGIBLE': 'FALSE',
    'LATE_STAGE_ELIGIBLE': 'FALSE',
    'TAX_FOCUS_NOW': 'FALSE',
    'TAX_FOCUS_LATER': 'FALSE',
    'TAX_FOCUS_BOTH': 'TRUE',
    'URGENT_ACTION': 'FALSE',
    
    // ── Investment Scoring ──
    'investment_involvement': 4, // Moderate - considering business
    'investment_time': 4,
    'investment_confidence': 4,
    
    // ── Domain Importance (ROBS curious priorities) ──
    'retirement_importance': 6, // High - thinking about ROBS
    'education_importance': 3,  // Moderate default
    'health_importance': 4,     // Moderate
    
    // ── Domain Anxiety & Motivation ──
    'retirement_anxiety': 5,    // Anxious about having enough
    'retirement_motivation': 6, // Motivated by ROBS potential
    'education_anxiety': 3,
    'education_motivation': 3,
    'health_anxiety': 3,
    'health_motivation': 4,
    
    // ── Years Until Need ──
    'target_retirement_age': 65,
    'retirement_years_until_target': 20,
    'hsa_years_until_need': 15,
    'cesa_years_until_first_need': 99, // No kids by default
    'years_until_use_of_funds': 20,
    
    // ── Current Balances ──
    'retirement_current_balance': 75000, // Has rollover
    'retirement_personal_contribution': 800,
    'retirement_desired_monthly_income': 10000,
    'current_hsa_balance': 5000,
    'current_monthly_hsa_contribution': 200,
    'hsa_target_balance': 150000,
    'cesa_current_balance': 0,
    'cesa_monthly_contribution': 0,
    'cesa_total_goal': 0,
    
    // ── Benefits ──
    'hsa_eligibility': 'Yes',
    'has_children_or_plan_children_education': 'No',
    'cesa_num_children': 0,
    
    // ── Tiebreaker Questions ──
    'tie_fund_choice': 'Retirement',
    'tie_painful_choice': 'Education',
    'tie_rank_retirement': 1,
    'tie_rank_education': 3,
    'tie_rank_health': 2,
    
    // ── Profile 2 SPECIFIC Questions ──
    'ex_q1': 'Yes',         // Has employer 401k
    'ex_q2': 'Yes',         // Has match
    'ex_q3': '50% up to 6%',// Match details
    'ex_q4': 'Yes',         // Roth option
    'ex_q5': '75000',       // Rollover balance (for ROBS)
    'ex_q6': '0',           // Business income (none yet)
    'ex_q7': 'No',          // Spouse in business
    
    // ── Phase 2 Link Status ──
    'Phase_2_Link_Sent': 'Yes',
    'Phase_2_Link': 'https://forms.gle/test'
  },
  
  scenarios: {
    w2Employee: {
      'Full_Name': 'W2 Employee ROBS',
      'full_name': 'W2 Employee ROBS',
      'Current_Age': 45,
      'current_age': 45,
      'gross_annual_income': 120000,
      'Net_Monthly_Income': 7500,
      'filing_status': 'Married Filing Jointly',
      'Allocation_Percentage': 20,
      'Total_Monthly_Savings_Capacity': 1500,
      // Family with kids
      'has_children_or_plan_children_education': 'Yes',
      'cesa_num_children': 2,
      'education_importance': 5,  // Important with kids
      'cesa_years_until_first_need': 10,
      'cesa_monthly_contribution': 200,
      'cesa_total_goal': 100000,
      // Employer match details
      'ex_q3': '50% up to 6%',
      'retirement_years_until_target': 20
    },
    
    selfEmployed: {
      'Full_Name': 'Self Employed ROBS Ready',
      'full_name': 'Self Employed ROBS Ready',
      'Work_Situation': 'Self-employed',
      'SELF_EMPLOYED': 'TRUE',
      'HAS_BIZ': 'TRUE',
      'SOLO401K_AVAILABLE': 'TRUE',
      'Current_Age': 52,
      'current_age': 52,
      'CATCH_UP_ELIGIBLE': 'TRUE',
      'gross_annual_income': 150000,
      'Net_Monthly_Income': 9000,
      'Allocation_Percentage': 25,
      'Total_Monthly_Savings_Capacity': 2250,
      'retirement_years_until_target': 13,
      // No employer 401k
      'ex_q1': 'No',
      'ex_q2': 'No',
      'ex_q3': '',
      'ex_q4': 'No',
      // Has business income
      'ex_q6': '50000',
      'Owns_Biz': 'Yes',
      'HAS_BIZ': 'TRUE',
      // Higher rollover for ROBS
      'ex_q5': '200000',
      'retirement_current_balance': 200000
    }
  }
};

// ============================================
// PROFILE 4: ROTH RECLAIMER - COMPLETE BASE DATA
// ============================================
const PROFILE_4_COMPLETE = {
  baseData: {
    // ── Administrative ──
    'Timestamp': new Date(),
    'timestamp': new Date(),
    
    // ── Personal Information ──
    'Full_Name': 'Roth Reclaimer Test',
    'full_name': 'Roth Reclaimer Test',
    'Email': 'roth.reclaimer@test.com',
    'email': 'roth.reclaimer@test.com',
    'Student_ID_Last4': '4001',
    'student_identifier': '4001',
    'Current_Age': 40,
    'current_age': 40,
    
    // ── Work & Business ──
    'Work_Situation': 'W-2 employee',
    'Owns_Biz': 'No',
    'Plans_Biz': 'No',
    'W2_Employees': 'No',
    
    // ── Retirement Accounts ──
    'Roth_IRA_Holder': 'Yes', // Key for Roth Reclaimer
    'Traditional_Retirement': 'Yes', // Has traditional to convert
    'Using_ROBS': 'No',
    'Interested_in_ROBS': 'No',
    'ROBS_New_Business': 'No',
    'Rollover_Account_50k': 'Yes',
    'Setup_Cost_Funding': 'N/A',
    
    // ── Tax & Income ──
    'Tax_Minimization': 'Later', // Key for Roth focus
    'gross_annual_income': 150000,
    'filing_status': 'Single',
    'Net_Monthly_Income': 8500,
    'Allocation_Percentage': 25,
    'Total_Monthly_Savings_Capacity': 2125,
    
    // ── Goals & Timing ──
    'Retirement_Catchup': 'No',
    'Retirement_Timeframe': '20-30 years',
    'Action_Motivation': 'Tax-free growth',
    
    // ── Computed Fields ──
    'ProfileID': '4_Roth_Reclaimer',
    'USES_ROBS': 'FALSE',
    'INTREST_ROBS': 'FALSE',
    'ROBS_READY': 'FALSE',
    'SELF_EMPLOYED': 'FALSE',
    'HAS_BIZ': 'FALSE',
    'PLANS_BIZ': 'FALSE',
    'HAS_EMPLOYEES': 'FALSE',
    'SOLO401K_AVAILABLE': 'FALSE',
    'NEEDS_BACKDOOR_ROTH': 'TRUE', // High income
    'CATCH_UP_ELIGIBLE': 'FALSE',
    'LATE_STAGE_ELIGIBLE': 'FALSE',
    'TAX_FOCUS_NOW': 'FALSE',
    'TAX_FOCUS_LATER': 'TRUE', // Roth focus
    'TAX_FOCUS_BOTH': 'FALSE',
    'URGENT_ACTION': 'FALSE',
    
    // ── Investment Scoring ──
    'investment_involvement': 5, // Higher - actively converting
    'investment_time': 5,
    'investment_confidence': 5,
    
    // ── Domain Importance ──
    'retirement_importance': 7, // Very high - Roth focused
    'education_importance': 2,  // Low - no kids default
    'health_importance': 4,
    
    // ── Years Until Need ──
    'target_retirement_age': 65,
    'retirement_years_until_target': 25,
    'hsa_years_until_need': 20,
    'cesa_years_until_first_need': 99,
    'years_until_use_of_funds': 25,
    
    // ── Current Balances ──
    'retirement_current_balance': 100000,
    'retirement_personal_contribution': 1500,
    'retirement_desired_monthly_income': 12000,
    'current_hsa_balance': 10000,
    'current_monthly_hsa_contribution': 300,
    'hsa_target_balance': 200000,
    'cesa_current_balance': 0,
    'cesa_monthly_contribution': 0,
    'cesa_total_goal': 0,
    
    // ── Benefits ──
    'hsa_eligibility': 'Yes',
    'has_children_or_plan_children_education': 'No',
    'cesa_num_children': 0,
    
    // ── Profile 4 SPECIFIC Questions (8 questions!) ──
    'ex_q1': 'Yes',         // Has employer 401k
    'ex_q2': 'Yes',         // Has match
    'ex_q3': '100% up to 4%',// Match percentage
    'ex_q4': 'Yes',         // Has Roth 401k option
    'ex_q5': '50000',       // Traditional IRA balance (to convert)
    'ex_q6': 'Yes',         // Made after-tax contributions
    'ex_q7': 'Yes',         // Understands backdoor Roth
    'ex_q8': '25000',       // Conversion amount this year
    
    // ── Phase 2 Link Status ──
    'Phase_2_Link_Sent': 'Yes',
    'Phase_2_Link': 'https://forms.gle/test'
  },
  
  scenarios: {
    highIncomeBackdoor: {
      'Full_Name': 'High Income Backdoor Pro',
      'full_name': 'High Income Backdoor Pro',
      'Current_Age': 40,
      'current_age': 40,
      'gross_annual_income': 200000,
      'Net_Monthly_Income': 11000,
      'Allocation_Percentage': 30,
      'Total_Monthly_Savings_Capacity': 3300,
      'NEEDS_BACKDOOR_ROTH': 'TRUE',
      'retirement_years_until_target': 25,
      // Larger balances to convert
      'ex_q5': '100000',
      'ex_q8': '50000',
      'retirement_current_balance': 200000
    },
    
    lowIncomeDirectRoth: {
      'Full_Name': 'Direct Roth Contributor',
      'full_name': 'Direct Roth Contributor',
      'Current_Age': 30,
      'current_age': 30,
      'gross_annual_income': 75000,
      'Net_Monthly_Income': 5500,
      'filing_status': 'Married Filing Jointly',
      'Allocation_Percentage': 15,
      'Total_Monthly_Savings_Capacity': 825,
      'NEEDS_BACKDOOR_ROTH': 'FALSE', // Income allows direct
      'retirement_years_until_target': 35,
      // No conversion needed
      'ex_q5': '0',
      'ex_q6': 'No',
      'ex_q7': 'No',
      'ex_q8': '0',
      // Lower match
      'ex_q3': '50% up to 4%',
      'retirement_current_balance': 25000
    }
  }
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get complete test suite (no more referencing other suites!)
 */
function getCompleteTestSuite(profileId) {
  const suites = {
    '2_ROBS_Curious': PROFILE_2_COMPLETE,
    '4_Roth_Reclaimer': PROFILE_4_COMPLETE,
    '7_Foundation_Builder': PROFILE_7_TEST_SUITE // Keep existing as it's complete
  };
  
  return suites[profileId];
}

/**
 * Run test with validation
 */
function runValidatedTest(profileId, scenarioName) {
  console.log('\n' + '='.repeat(80));
  console.log(`RUNNING VALIDATED TEST: ${profileId} - ${scenarioName}`);
  console.log('='.repeat(80));
  
  const suite = getCompleteTestSuite(profileId);
  if (!suite) {
    console.log('❌ No test suite found');
    return;
  }
  
  const scenario = suite.scenarios[scenarioName];
  if (!scenario) {
    console.log('❌ No scenario found');
    return;
  }
  
  // Merge base + scenario
  let testData = { ...suite.baseData, ...scenario };
  
  // Validate BEFORE fixing
  console.log('\n📋 Pre-validation:');
  const validation = validateTestData(testData, profileId);
  
  if (validation.errors.length > 0) {
    console.log('❌ Errors found:');
    validation.errors.forEach(err => console.log(`  - ${err}`));
    
    // Auto-fix
    console.log('\n🔧 Applying auto-fix...');
    testData = fixTestData(testData);
    
    // Re-validate
    const revalidation = validateTestData(testData, profileId);
    if (revalidation.errors.length === 0) {
      console.log('✅ Fixed all errors');
    }
  }
  
  if (validation.warnings.length > 0) {
    console.log('\n⚠️  Warnings:');
    validation.warnings.forEach(warn => console.log(`  - ${warn}`));
  }
  
  // Run the test
  console.log('\n🚀 Running test...');
  testProfileComplete(profileId, scenarioName);
}
/**
 * TEST DATA VALIDATOR
 * 
 * Ensures test data is complete, consistent, and realistic
 * Catches lazy copying and contradictory values before tests run
 */

/**
 * Validate test data consistency and completeness
 */
function validateTestData(testData, profileId) {
  const errors = [];
  const warnings = [];
  
  // 1. Check profile-specific questions match the profile
  const profileQuestionMappings = {
    '2_ROBS_Curious': {
      ex_q1: 'Has employer 401k',
      ex_q2: 'Has match',
      ex_q3: 'Match percentage',
      ex_q4: 'Roth option',
      ex_q5: 'Rollover balance',
      ex_q6: 'Business income',
      ex_q7: 'Spouse in business'
    },
    '4_Roth_Reclaimer': {
      ex_q1: 'Has employer 401k',
      ex_q2: 'Has match',
      ex_q3: 'Match percentage',
      ex_q4: 'Has Roth 401k option',
      ex_q5: 'Traditional IRA balance',
      ex_q6: 'Made after-tax contributions',
      ex_q7: 'Understands backdoor Roth',
      ex_q8: 'Conversion amount'
    },
    '7_Foundation_Builder': {
      ex_q1: 'Has employer 401k',
      ex_q2: 'Has match',
      ex_q3: 'Match percentage',
      ex_q4: 'Has Roth 401k option',
      ex_q5: 'Emergency fund goal',
      ex_q6: 'Current emergency savings',
      ex_q7: 'Risk tolerance'
    }
  };
  
  // 2. Check child-related consistency
  const numKids = testData.cesa_num_children || 0;
  const hasKids = testData.has_children_or_plan_children_education === 'Yes';
  
  if (numKids > 0 && !hasKids) {
    errors.push('Has kids but has_children_or_plan_children_education is not Yes');
  }
  
  if (numKids > 0 && testData.education_importance < 3) {
    warnings.push(`Has ${numKids} kids but education_importance is only ${testData.education_importance}`);
  }
  
  if (numKids > 0 && testData.cesa_total_goal === 0) {
    warnings.push('Has kids but cesa_total_goal is 0');
  }
  
  // 3. Check age/retirement consistency
  const age = testData.Current_Age || testData.current_age;
  const yearsToRetirement = testData.retirement_years_until_target;
  
  if (age && yearsToRetirement) {
    const impliedRetirementAge = age + yearsToRetirement;
    if (impliedRetirementAge < 55 || impliedRetirementAge > 75) {
      warnings.push(`Implied retirement age ${impliedRetirementAge} seems unusual`);
    }
  }
  
  if (yearsToRetirement < 10 && testData.retirement_importance < 5) {
    warnings.push('Near retirement but low retirement importance');
  }
  
  // 4. Check work situation consistency
  const workSituation = testData.Work_Situation;
  
  if (workSituation === 'Self-employed') {
    if (testData.SELF_EMPLOYED !== 'TRUE') {
      errors.push('Work_Situation is Self-employed but SELF_EMPLOYED flag is not TRUE');
    }
    if (testData.ex_q1 === 'Yes' && profileId !== '8_Biz_Owner_Group') {
      warnings.push('Self-employed usually should not have employer 401k');
    }
  }
  
  if (workSituation === 'W-2 employee' && testData.ex_q6 && parseInt(testData.ex_q6) > 0) {
    warnings.push('W-2 employee with business income - should Work_Situation be "Both"?');
  }
  
  // 5. Check income consistency
  const grossIncome = testData.gross_annual_income;
  const netMonthly = testData.Net_Monthly_Income;
  
  if (grossIncome && netMonthly) {
    const impliedTaxRate = 1 - (netMonthly * 12 / grossIncome);
    if (impliedTaxRate < 0.1 || impliedTaxRate > 0.5) {
      warnings.push(`Implied tax rate ${(impliedTaxRate * 100).toFixed(1)}% seems unusual`);
    }
  }
  
  // 6. Check allocation consistency
  const allocPercent = testData.Allocation_Percentage;
  const totalCapacity = testData.Total_Monthly_Savings_Capacity;
  
  if (netMonthly && allocPercent && totalCapacity) {
    const expectedCapacity = netMonthly * (allocPercent / 100);
    if (Math.abs(totalCapacity - expectedCapacity) > 1) {
      errors.push(`Total_Monthly_Savings_Capacity ($${totalCapacity}) doesn't match Net_Monthly × Allocation% ($${expectedCapacity})`);
    }
  }
  
  // 7. Check phase-out consistency
  if (grossIncome > 140000 && testData.filing_status === 'Single') {
    if (testData.NEEDS_BACKDOOR_ROTH !== 'TRUE') {
      warnings.push('High income single filer should need backdoor Roth');
    }
  }
  
  // 8. Check domain importance totals
  const retImportance = testData.retirement_importance || 0;
  const eduImportance = testData.education_importance || 0;
  const healthImportance = testData.health_importance || 0;
  
  if (retImportance === 0 && eduImportance === 0 && healthImportance === 0) {
    errors.push('All domain importance scores are 0');
  }
  
  // 9. Check computed flags
  if (testData.Current_Age >= 50 && testData.CATCH_UP_ELIGIBLE !== 'TRUE') {
    warnings.push('Age 50+ but CATCH_UP_ELIGIBLE is not TRUE');
  }
  
  // Return validation results
  return { errors, warnings, isValid: errors.length === 0 };
}

/**
 * Fix common test data issues automatically
 */
function fixTestData(testData) {
  const fixed = { ...testData };
  
  // Fix Total_Monthly_Savings_Capacity
  if (fixed.Net_Monthly_Income && fixed.Allocation_Percentage) {
    fixed.Total_Monthly_Savings_Capacity = 
      Math.round(fixed.Net_Monthly_Income * fixed.Allocation_Percentage / 100);
  }
  
  // Fix work situation flags
  if (fixed.Work_Situation === 'Self-employed') {
    fixed.SELF_EMPLOYED = 'TRUE';
    fixed.HAS_BIZ = 'TRUE';
  }
  
  // Fix catch-up eligibility
  const age = fixed.Current_Age || fixed.current_age;
  if (age >= 50) {
    fixed.CATCH_UP_ELIGIBLE = 'TRUE';
  }
  
  // Fix backdoor Roth need
  if (fixed.gross_annual_income > 140000 && fixed.filing_status === 'Single') {
    fixed.NEEDS_BACKDOOR_ROTH = 'TRUE';
  }
  
  // Sync age fields
  if (fixed.Current_Age && !fixed.current_age) {
    fixed.current_age = fixed.Current_Age;
  }
  if (fixed.current_age && !fixed.Current_Age) {
    fixed.Current_Age = fixed.current_age;
  }
  
  // Sync name fields
  if (fixed.Full_Name && !fixed.full_name) {
    fixed.full_name = fixed.Full_Name;
  }
  
  return fixed;
}

/**
 * Run validation on a test suite
 */
function validateTestSuite(suiteName) {
  console.log('\n' + '='.repeat(80));
  console.log(`VALIDATING ${suiteName}`);
  console.log('='.repeat(80));
  
  const suites = {
    'Profile 2': PROFILE_2_TEST_SUITE,
    'Profile 4': PROFILE_4_TEST_SUITE,
    'Profile 7': PROFILE_7_TEST_SUITE
  };
  
  const suite = suites[suiteName];
  if (!suite) {
    console.log('❌ Suite not found');
    return;
  }
  
  // Extract profile ID from base data
  const profileId = suite.baseData.ProfileID;
  
  // Validate base data
  console.log('\n📋 Validating Base Data:');
  const baseValidation = validateTestData(suite.baseData, profileId);
  
  if (baseValidation.errors.length > 0) {
    console.log('\n❌ ERRORS:');
    baseValidation.errors.forEach(err => console.log(`  - ${err}`));
  }
  
  if (baseValidation.warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:');
    baseValidation.warnings.forEach(warn => console.log(`  - ${warn}`));
  }
  
  if (baseValidation.isValid && baseValidation.warnings.length === 0) {
    console.log('✅ Base data is valid');
  }
  
  // Validate each scenario
  Object.entries(suite.scenarios).forEach(([scenarioName, scenarioData]) => {
    console.log(`\n📋 Validating Scenario: ${scenarioName}`);
    
    // Merge base + scenario data
    const fullData = { ...suite.baseData, ...scenarioData };
    const validation = validateTestData(fullData, profileId);
    
    if (validation.errors.length > 0) {
      console.log('  ❌ ERRORS:');
      validation.errors.forEach(err => console.log(`    - ${err}`));
    }
    
    if (validation.warnings.length > 0) {
      console.log('  ⚠️  WARNINGS:');
      validation.warnings.forEach(warn => console.log(`    - ${warn}`));
    }
    
    if (validation.isValid && validation.warnings.length === 0) {
      console.log('  ✅ Valid');
    }
  });
}

/**
 * Validate all test suites
 */
function validateAllTestSuites() {
  ['Profile 2', 'Profile 4', 'Profile 7'].forEach(suite => {
    validateTestSuite(suite);
    console.log('');
  });
}

/**
 * Show what fixing would do
 */
function demonstrateAutoFix() {
  console.log('\n' + '='.repeat(80));
  console.log('DEMONSTRATING AUTO-FIX CAPABILITIES');
  console.log('='.repeat(80));
  
  const testCase = {
    'Current_Age': 52,
    'Work_Situation': 'Self-employed',
    'gross_annual_income': 150000,
    'Net_Monthly_Income': 10000,
    'Allocation_Percentage': 25,
    'filing_status': 'Single',
    // Missing/wrong: SELF_EMPLOYED, CATCH_UP_ELIGIBLE, Total_Monthly_Savings_Capacity, etc.
  };
  
  console.log('\n🔧 Original data:');
  console.log(JSON.stringify(testCase, null, 2));
  
  const fixed = fixTestData(testCase);
  
  console.log('\n✅ Fixed data adds:');
  Object.keys(fixed).forEach(key => {
    if (!testCase[key] || testCase[key] !== fixed[key]) {
      console.log(`  ${key}: ${fixed[key]}`);
    }
  });
}
/**
 * Comprehensive Test Scenarios for All Profiles
 * Created: January 2025
 * 
 * This file contains complete test scenarios for all profiles that need testing:
 * - Profile 1: ROBS In Use
 * - Profile 3: Solo 401k Builder  
 * - Profile 4: Roth Reclaimer (debugging allocation issues)
 * - Profile 5: Bracket Strategist
 * - Profile 6: Catch-Up
 * - Profile 8: Biz Owner Group
 * - Profile 9: Late Stage Growth
 */

// ============================================
// PROFILE 1: ROBS IN USE
// ============================================
const PROFILE_1_SCENARIOS = {
  activeROBS: {
    name: 'Active ROBS with Distributions',
    phase1: {
      'Full_Name': 'Test ROBS Active',
      'Email': 'test.robs.active@example.com',
      'Student_ID_Last4': '1001RA',
      'Current_Age': 48,
      'ProfileID': '1_ROBS_In_Use',
      'Work_Situation': 'Self-employed',
      'gross_annual_income': 180000,
      'filing_status': 'Married Filing Jointly',
      'Tax_Minimization': 'Both',
      'hsa_eligibility': 'Yes',
      'cesa_num_children': 1,
      'Net_Monthly_Income': 12000,
      'Allocation_Percentage': 25,
      // Investment scoring (1-7 scale)
      'investment_involvement': 6,  // High - business owner
      'investment_time': 5,
      'investment_confidence': 5,
      // Domain importance (1-7 scale)
      'retirement_importance': 7,  // Very high - using ROBS
      'education_importance': 4,   // Has 1 child
      'health_importance': 5,
      // Years until need
      'retirement_years_until_target': 17,  // 48 years old
      'cesa_years_until_first_need': 10,
      'hsa_years_until_need': 15
    },
    phase2: {
      ex_q1: 'C-Corp',           // ROBS structure type
      ex_q2: 'Quarterly',        // Profit distribution frequency
      ex_q3: 'Both',            // Contribution preference (Roth/Traditional)
      ex_q4: 'Monthly',         // Contribution frequency
      ex_q5: 'Yes',             // Has Roth IRA
      ex_q6: '72000'            // Annual distribution amount
    }
  },
  planningROBS: {
    name: 'Planning ROBS Startup',
    phase1: {
      'Full_Name': 'Test ROBS Planning',
      'Email': 'test.robs.planning@example.com',
      'Student_ID_Last4': '1002RP',
      'Current_Age': 55,
      'ProfileID': '1_ROBS_In_Use',
      'Work_Situation': 'Self-employed',
      'gross_annual_income': 250000,
      'filing_status': 'Single',
      'Tax_Minimization': 'Now',
      'hsa_eligibility': 'Yes',
      'cesa_num_children': 0,
      'Net_Monthly_Income': 16000,
      'Allocation_Percentage': 30,
      // Investment scoring (1-7 scale)
      'investment_involvement': 7,
      'investment_time': 6,
      'investment_confidence': 6,
      // Domain importance (1-7 scale)
      'retirement_importance': 7,
      'education_importance': 1,  // No kids
      'health_importance': 6,    // Age 55+
      // Years until need
      'retirement_years_until_target': 10,
      'cesa_years_until_first_need': 99,
      'hsa_years_until_need': 10
    },
    phase2: {
      ex_q1: 'Planning',
      ex_q2: 'Not yet',
      ex_q3: 'Traditional',      // Tax focus = Now
      ex_q4: 'Monthly',
      ex_q5: 'No',              // High income, phased out
      ex_q6: '0'                // No distributions yet
    }
  }
};

// ============================================
// PROFILE 3: SOLO 401K BUILDER
// ============================================
const PROFILE_3_SCENARIOS = {
  soleProp: {
    name: 'Sole Proprietor Building Solo 401k',
    phase1: {
      'Full_Name': 'Test Sole Prop',
      'Email': 'test.sole.prop@example.com',
      'Student_ID_Last4': '3001SP',
      'Current_Age': 42,
      'ProfileID': '3_Solo401k_Builder',
      'Work_Situation': 'Self-employed',
      'gross_annual_income': 125000,
      'filing_status': 'Single',
      'Tax_Minimization': 'Both',
      'hsa_eligibility': 'Yes',
      'cesa_num_children': 0,
      'Net_Monthly_Income': 8500,
      'Allocation_Percentage': 30,
      // Investment scoring
      'investment_involvement': 5,
      'investment_time': 4,
      'investment_confidence': 5,
      // Domain importance
      'retirement_importance': 6,
      'education_importance': 1,
      'health_importance': 5,
      // Years until need
      'retirement_years_until_target': 23,
      'cesa_years_until_first_need': 99,
      'hsa_years_until_need': 20
    },
    phase2: {
      ex_q1: 'Sole Proprietor',  // Business type
      ex_q2: 'No',               // Have employees
      ex_q3: 'Yes',              // Have Solo 401k
      ex_q4: '1500',             // Current employee contribution
      ex_q5: '2000',             // Current employer contribution
      ex_q6: '4000'              // Target total monthly
    }
  },
  sCorp: {
    name: 'S-Corp with Existing Solo 401k',
    phase1: {
      'Full_Name': 'Test S-Corp',
      'Email': 'test.scorp@example.com',
      'Student_ID_Last4': '3002SC',
      'Current_Age': 52,
      'ProfileID': '3_Solo401k_Builder',
      'Work_Situation': 'Self-employed',
      'gross_annual_income': 200000,
      'filing_status': 'Married Filing Jointly',
      'Tax_Minimization': 'Later',
      'hsa_eligibility': 'Yes',
      'cesa_num_children': 2,
      'Net_Monthly_Income': 13000,
      'Allocation_Percentage': 35,
      // Investment scoring
      'investment_involvement': 6,
      'investment_time': 5,
      'investment_confidence': 6,
      // Domain importance
      'retirement_importance': 7,
      'education_importance': 5,  // 2 kids
      'health_importance': 5,
      // Years until need
      'retirement_years_until_target': 13,
      'cesa_years_until_first_need': 8,
      'hsa_years_until_need': 10
    },
    phase2: {
      ex_q1: 'S-Corp',
      ex_q2: 'No',
      ex_q3: 'Yes',
      ex_q4: '2583',  // Max with catch-up
      ex_q5: '4167',  // 25% of W-2
      ex_q6: '0'      // Already maxing out
    }
  }
};

// ============================================
// PROFILE 4: ROTH RECLAIMER (Enhanced for debugging)
// ============================================
const PROFILE_4_SCENARIOS_ENHANCED = {
  highIncomeClean: {
    name: 'High Income Clean Backdoor (No IRA)',
    phase1: {
      'Full_Name': 'Test Clean Backdoor',
      'Email': 'test.clean.backdoor@example.com',
      'Student_ID_Last4': '4001CB',
      'Current_Age': 45,
      'ProfileID': '4_Roth_Reclaimer',
      'Work_Situation': 'W-2 employee',
      'gross_annual_income': 250000,
      'filing_status': 'Single',
      'Tax_Minimization': 'Later',
      'hsa_eligibility': 'Yes',
      'cesa_num_children': 0,
      'Net_Monthly_Income': 14000,
      'Allocation_Percentage': 30,
      // Investment scoring
      'investment_involvement': 5,
      'investment_time': 4,
      'investment_confidence': 5,
      // Domain importance
      'retirement_importance': 7,
      'education_importance': 1,
      'health_importance': 5,
      // Years until need
      'retirement_years_until_target': 20,
      'cesa_years_until_first_need': 99,
      'hsa_years_until_need': 15
    },
    phase2: {
      ex_q1: '0',              // Traditional IRA balance
      ex_q2: 'Yes',            // 401k accepts rollovers
      ex_q3: '',               // (not used - likely after-tax contributions)
      ex_q4: '',               // (not used - likely backdoor understanding)
      ex_q5: 'Yes',            // Has employer 401k
      ex_q6: 'Yes',            // Has match
      ex_q7: '100% up to 5%',  // Match percentage
      ex_q8: 'Yes'             // Has Roth 401k option
    }
  },
  proRataIssue: {
    name: 'High Income with Pro-Rata Complications',
    phase1: {
      'Full_Name': 'Test Pro Rata',
      'Email': 'test.prorata@example.com',
      'Student_ID_Last4': '4002PR',
      'Current_Age': 38,
      'ProfileID': '4_Roth_Reclaimer',
      'Work_Situation': 'Both',
      'gross_annual_income': 300000,
      'filing_status': 'Married Filing Jointly',
      'Tax_Minimization': 'Later',
      'hsa_eligibility': 'Yes',
      'cesa_num_children': 1,
      'Net_Monthly_Income': 18000,
      'Allocation_Percentage': 35,
      // Investment scoring
      'investment_involvement': 6,
      'investment_time': 5,
      'investment_confidence': 6,
      // Domain importance
      'retirement_importance': 7,
      'education_importance': 4,
      'health_importance': 5,
      // Years until need
      'retirement_years_until_target': 27,
      'cesa_years_until_first_need': 15,
      'hsa_years_until_need': 25
    },
    phase2: {
      ex_q1: '150000',         // Large Traditional IRA balance
      ex_q2: 'No',             // 401k doesn't accept rollovers
      ex_q3: '',               // (not used - likely after-tax contributions)
      ex_q4: '',               // (not used - likely backdoor understanding)
      ex_q5: 'Yes',            // Has employer 401k
      ex_q6: 'Yes',            // Has match
      ex_q7: '50% up to 8%',   // Match percentage
      ex_q8: 'Yes'             // Has Roth 401k option
    }
  }
};

// ============================================
// PROFILE 5: BRACKET STRATEGIST
// ============================================
const PROFILE_5_SCENARIOS = {
  highBracket: {
    name: 'High Tax Bracket W-2 Employee',
    phase1: {
      'Full_Name': 'Test High Bracket',
      'Email': 'test.high.bracket@example.com',
      'Student_ID_Last4': '5001HB',
      'Current_Age': 50,
      'ProfileID': '5_Bracket_Strategist',
      'Work_Situation': 'W-2 employee',
      'gross_annual_income': 350000,
      'filing_status': 'Married Filing Jointly',
      'Tax_Minimization': 'Now',
      'hsa_eligibility': 'Yes',
      'cesa_num_children': 2,
      'Net_Monthly_Income': 20000,
      'Allocation_Percentage': 30,
      // Investment scoring
      'investment_involvement': 5,
      'investment_time': 4,
      'investment_confidence': 5,
      // Domain importance
      'retirement_importance': 6,
      'education_importance': 6,  // 2 kids, high income
      'health_importance': 5,
      // Years until need
      'retirement_years_until_target': 15,
      'cesa_years_until_first_need': 5,
      'hsa_years_until_need': 10
    },
    phase2: {
      ex_q1: 'Yes',             // Has employer 401k
      ex_q2: 'Yes',             // Has match
      ex_q3: '50% up to 6%',    // Match percentage
      ex_q4: 'Yes'              // Has Roth option (but won't use)
    }
  },
  businessOwnerBracket: {
    name: 'Business Owner Managing Brackets',
    phase1: {
      'Full_Name': 'Test Biz Bracket',
      'Email': 'test.biz.bracket@example.com',
      'Student_ID_Last4': '5002BB',
      'Current_Age': 45,
      'ProfileID': '5_Bracket_Strategist',
      'Work_Situation': 'Self-employed',
      'gross_annual_income': 275000,
      'filing_status': 'Single',
      'Tax_Minimization': 'Now',
      'hsa_eligibility': 'No',
      'cesa_num_children': 0,
      'Net_Monthly_Income': 16000,
      'Allocation_Percentage': 40,
      // Investment scoring
      'investment_involvement': 7,
      'investment_time': 6,
      'investment_confidence': 7,
      // Domain importance
      'retirement_importance': 7,
      'education_importance': 1,
      'health_importance': 4,
      // Years until need
      'retirement_years_until_target': 20,
      'cesa_years_until_first_need': 99,
      'hsa_years_until_need': 20
    },
    phase2: {
      ex_q1: 'No',  // Self-employed
      ex_q2: 'No',
      ex_q3: '',
      ex_q4: 'No'
    }
  }
};

// ============================================
// PROFILE 6: CATCH-UP
// ============================================
const PROFILE_6_SCENARIOS = {
  age50Plus: {
    name: 'Age 50-59 Maximizing Catch-Up',
    phase1: {
      'Full_Name': 'Test Catch-Up 50s',
      'Email': 'test.catchup.50s@example.com',
      'Student_ID_Last4': '6001C5',
      'Current_Age': 55,
      'ProfileID': '6_Catch_Up',
      'Work_Situation': 'W-2 employee',
      'gross_annual_income': 150000,
      'filing_status': 'Married Filing Jointly',
      'Tax_Minimization': 'Both',
      'hsa_eligibility': 'Yes',
      'cesa_num_children': 0,
      'Net_Monthly_Income': 9500,
      'Allocation_Percentage': 40,
      // Investment scoring
      'investment_involvement': 4,
      'investment_time': 3,
      'investment_confidence': 4,
      // Domain importance
      'retirement_importance': 7,  // Catching up!
      'education_importance': 1,
      'health_importance': 6,     // Age 55+ HSA catch-up
      // Years until need
      'retirement_years_until_target': 10,
      'cesa_years_until_first_need': 99,
      'hsa_years_until_need': 10
    },
    phase2: {
      ex_q1: 'Yes',
      ex_q2: 'Yes',
      ex_q3: '100% up to 4%',
      ex_q4: 'Yes'
    }
  },
  age60Plus: {
    name: 'Age 60+ Enhanced Catch-Up',
    phase1: {
      'Full_Name': 'Test Catch-Up 60s',
      'Email': 'test.catchup.60s@example.com',
      'Student_ID_Last4': '6002C6',
      'Current_Age': 62,
      'ProfileID': '6_Catch_Up',
      'Work_Situation': 'Both',  // Phased retirement
      'gross_annual_income': 200000,
      'filing_status': 'Single',
      'Tax_Minimization': 'Now',
      'hsa_eligibility': 'Yes',
      'cesa_num_children': 0,
      'Net_Monthly_Income': 12000,
      'Allocation_Percentage': 50,  // Aggressive saving
      // Investment scoring
      'investment_involvement': 3,
      'investment_time': 2,
      'investment_confidence': 3,
      // Domain importance
      'retirement_importance': 7,
      'education_importance': 1,
      'health_importance': 7,  // Near retirement health
      // Years until need
      'retirement_years_until_target': 3,
      'cesa_years_until_first_need': 99,
      'hsa_years_until_need': 3
    },
    phase2: {
      ex_q1: 'Yes',
      ex_q2: 'Yes',
      ex_q3: '50% up to 6%',
      ex_q4: 'No'  // Traditional focus
    }
  }
};

// ============================================
// PROFILE 8: BIZ OWNER GROUP
// ============================================
const PROFILE_8_SCENARIOS = {
  smallGroup: {
    name: 'Small Business 5 Employees',
    phase1: {
      'Full_Name': 'Test Small Group',
      'Email': 'test.small.group@example.com',
      'Student_ID_Last4': '8001SG',
      'Current_Age': 48,
      'ProfileID': '8_Biz_Owner_Group',
      'Work_Situation': 'Self-employed',
      'gross_annual_income': 300000,
      'filing_status': 'Married Filing Jointly',
      'Tax_Minimization': 'Now',
      'hsa_eligibility': 'Yes',
      'cesa_num_children': 2,
      'Net_Monthly_Income': 18000,
      'Allocation_Percentage': 35,
      // Investment scoring
      'investment_involvement': 6,
      'investment_time': 5,
      'investment_confidence': 6,
      // Domain importance
      'retirement_importance': 6,
      'education_importance': 5,
      'health_importance': 5,
      // Years until need
      'retirement_years_until_target': 17,
      'cesa_years_until_first_need': 8,
      'hsa_years_until_need': 15
    },
    phase2: {
      ex_q1: '5',              // Number of employees
      ex_q2: '32',             // Average employee age
      ex_q3: '60000',          // Average employee salary
      ex_q4: 'Yes',            // Have retirement plan
      ex_q5: 'Safe Harbor 401(k)', // Plan type
      ex_q6: '3000'            // Current monthly contribution
    }
  },
  definedBenefit: {
    name: 'Large Age Gap DB Plan Candidate',
    phase1: {
      'Full_Name': 'Test DB Plan',
      'Email': 'test.db.plan@example.com',
      'Student_ID_Last4': '8002DB',
      'Current_Age': 58,
      'ProfileID': '8_Biz_Owner_Group',
      'Work_Situation': 'Self-employed',
      'gross_annual_income': 500000,
      'filing_status': 'Single',
      'Tax_Minimization': 'Now',
      'hsa_eligibility': 'Yes',
      'cesa_num_children': 0,
      'Net_Monthly_Income': 28000,
      'Allocation_Percentage': 40,
      // Investment scoring
      'investment_involvement': 5,
      'investment_time': 4,
      'investment_confidence': 5,
      // Domain importance
      'retirement_importance': 7,
      'education_importance': 1,
      'health_importance': 6,
      // Years until need
      'retirement_years_until_target': 7,
      'cesa_years_until_first_need': 99,
      'hsa_years_until_need': 5
    },
    phase2: {
      ex_q1: '12',             // Number of employees
      ex_q2: '28',             // Average age (30 year gap!)
      ex_q3: '55000',          // Average salary
      ex_q4: 'No',             // No current plan
      ex_q5: '',               // N/A
      ex_q6: '0'               // Starting fresh
    }
  }
};

// ============================================
// PROFILE 9: LATE STAGE GROWTH
// ============================================
const PROFILE_9_SCENARIOS = {
  phasedRetirement: {
    name: 'Phased Retirement Both Income',
    phase1: {
      'Full_Name': 'Test Phased Retire',
      'Email': 'test.phased@example.com',
      'Student_ID_Last4': '9001PR',
      'Current_Age': 65,
      'ProfileID': '9_Late_Stage_Growth',
      'Work_Situation': 'Both',
      'gross_annual_income': 180000,
      'filing_status': 'Married Filing Jointly',
      'Tax_Minimization': 'Both',
      'hsa_eligibility': 'Yes',
      'cesa_num_children': 0,
      'Net_Monthly_Income': 11000,
      'Allocation_Percentage': 30,
      // Investment scoring
      'investment_involvement': 3,
      'investment_time': 2,
      'investment_confidence': 4,
      // Domain importance
      'retirement_importance': 6,
      'education_importance': 1,
      'health_importance': 7,  // Medicare gap
      // Years until need
      'retirement_years_until_target': 2,
      'cesa_years_until_first_need': 99,
      'hsa_years_until_need': 0
    },
    phase2: {
      ex_q1: 'Yes',
      ex_q2: 'Yes',
      ex_q3: '100% up to 3%',
      ex_q4: 'No'  // Traditional focus
    }
  },
  finalPush: {
    name: 'Final Push to Retirement',
    phase1: {
      'Full_Name': 'Test Final Push',
      'Email': 'test.final.push@example.com',
      'Student_ID_Last4': '9002FP',
      'Current_Age': 68,
      'ProfileID': '9_Late_Stage_Growth',
      'Work_Situation': 'W-2 employee',
      'gross_annual_income': 120000,
      'filing_status': 'Single',
      'Tax_Minimization': 'Now',
      'hsa_eligibility': 'Yes',
      'cesa_num_children': 0,
      'Net_Monthly_Income': 7500,
      'Allocation_Percentage': 45,
      // Investment scoring
      'investment_involvement': 2,
      'investment_time': 2,
      'investment_confidence': 3,
      // Domain importance
      'retirement_importance': 7,
      'education_importance': 1,
      'health_importance': 7,
      // Years until need
      'retirement_years_until_target': 2,
      'cesa_years_until_first_need': 99,
      'hsa_years_until_need': 0
    },
    phase2: {
      ex_q1: 'Yes',
      ex_q2: 'No',  // No match
      ex_q3: '',
      ex_q4: 'No'
    }
  }
};

// ============================================
// TEST RUNNER FUNCTIONS
// ============================================

/**
 * Run a single scenario with enhanced testing
 * Use this if you want validation and better error messages
 */
function runEnhancedScenarioTest(profileId, scenarioName, scenarios) {
  const scenario = scenarios[scenarioName];
  if (!scenario) {
    console.error(`❌ Unknown scenario: ${scenarioName}`);
    return;
  }
  
  console.log(`\n=== Enhanced Test: ${scenario.name} ===`);
  
  // Merge phase1 and phase2 data
  const testData = { ...scenario.phase1, ...scenario.phase2 };
  
  // Use generateCompleteTestData to ensure all fields are present
  const completeData = generateCompleteTestData(profileId, testData);
  
  // Write to Working Sheet and run the test
  const { sheet: ws, hdr } = initWS();
  const testRow = 15; // Use a test row
  
  // Write test data
  const dataArray = new Array(ws.getLastColumn()).fill('');
  Object.entries(completeData).forEach(([field, value]) => {
    const col = hdr[field];
    if (col) {
      dataArray[col - 1] = value;
    }
  });
  
  ws.getRange(testRow, 1, 1, dataArray.length).setValues([dataArray]);
  
  // Run the universal engine
  try {
    runUniversalEngine(testRow);
    console.log('✅ Test completed successfully');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

/**
 * Wrapper to use enhanced testing if available
 * Falls back to basic testing if Testing_Enhanced.js not loaded
 */
function runScenarioTest(profileId, scenarioName, scenarios) {
  const scenario = scenarios[scenarioName];
  if (!scenario) {
    console.error(`❌ Unknown scenario: ${scenarioName}`);
    return;
  }
  
  // For now, just use the basic testing which works
  // Enhanced testing has integration issues that need fixing
  if (typeof runCompleteScenarioTest === 'function') {
    runCompleteScenarioTest(scenarioName, scenarios);
  } else {
    console.error('❌ Testing.js not loaded!');
    console.error('Please ensure Testing.js is included in your project.');
  }
}

/**
 * Run test for Profile 1 (ROBS In Use)
 */
function testProfile1All() {
  console.log('\n=== TESTING PROFILE 1: ROBS IN USE ===\n');
  Object.keys(PROFILE_1_SCENARIOS).forEach(scenario => {
    runScenarioTest('1_ROBS_In_Use', scenario, PROFILE_1_SCENARIOS);
    Utilities.sleep(2000);
  });
}

/**
 * Run test for Profile 3 (Solo 401k Builder)
 */
function testProfile3All() {
  console.log('\n=== TESTING PROFILE 3: SOLO 401K BUILDER ===\n');
  Object.keys(PROFILE_3_SCENARIOS).forEach(scenario => {
    runScenarioTest('3_Solo401k_Builder', scenario, PROFILE_3_SCENARIOS);
    Utilities.sleep(2000);
  });
}

/**
 * Run enhanced test for Profile 4 (Roth Reclaimer)
 */
function testProfile4Enhanced() {
  console.log('\n=== TESTING PROFILE 4: ROTH RECLAIMER (ENHANCED) ===\n');
  Object.keys(PROFILE_4_SCENARIOS_ENHANCED).forEach(scenario => {
    runScenarioTest('4_Roth_Reclaimer', scenario, PROFILE_4_SCENARIOS_ENHANCED);
    Utilities.sleep(2000);
  });
}

/**
 * Run test for Profile 5 (Bracket Strategist)
 */
function testProfile5All() {
  console.log('\n=== TESTING PROFILE 5: BRACKET STRATEGIST ===\n');
  Object.keys(PROFILE_5_SCENARIOS).forEach(scenario => {
    runScenarioTest('5_Bracket_Strategist', scenario, PROFILE_5_SCENARIOS);
    Utilities.sleep(2000);
  });
}

/**
 * Run test for Profile 6 (Catch-Up)
 */
function testProfile6All() {
  console.log('\n=== TESTING PROFILE 6: CATCH-UP ===\n');
  Object.keys(PROFILE_6_SCENARIOS).forEach(scenario => {
    runScenarioTest('6_Catch_Up', scenario, PROFILE_6_SCENARIOS);
    Utilities.sleep(2000);
  });
}

/**
 * Run test for Profile 8 (Biz Owner Group)
 */
function testProfile8All() {
  console.log('\n=== TESTING PROFILE 8: BIZ OWNER GROUP ===\n');
  Object.keys(PROFILE_8_SCENARIOS).forEach(scenario => {
    runScenarioTest('8_Biz_Owner_Group', scenario, PROFILE_8_SCENARIOS);
    Utilities.sleep(2000);
  });
}

/**
 * Run test for Profile 9 (Late Stage Growth)
 */
function testProfile9All() {
  console.log('\n=== TESTING PROFILE 9: LATE STAGE GROWTH ===\n');
  Object.keys(PROFILE_9_SCENARIOS).forEach(scenario => {
    runScenarioTest('9_Late_Stage_Growth', scenario, PROFILE_9_SCENARIOS);
    Utilities.sleep(2000);
  });
}

/**
 * Test all untested profiles
 */
function testAllUntestedProfiles() {
  const profiles = [
    { name: 'Profile 1: ROBS In Use', fn: testProfile1All },
    { name: 'Profile 3: Solo 401k Builder', fn: testProfile3All },
    { name: 'Profile 4: Roth Reclaimer (Enhanced)', fn: testProfile4Enhanced },
    { name: 'Profile 5: Bracket Strategist', fn: testProfile5All },
    { name: 'Profile 6: Catch-Up', fn: testProfile6All },
    { name: 'Profile 8: Biz Owner Group', fn: testProfile8All },
    { name: 'Profile 9: Late Stage Growth', fn: testProfile9All }
  ];
  
  profiles.forEach((profile, index) => {
    console.log(`\n${'='.repeat(80)}`);
    console.log(`TESTING ${profile.name} (${index + 1}/${profiles.length})`);
    console.log('='.repeat(80));
    
    try {
      profile.fn();
    } catch (error) {
      console.error(`❌ ERROR testing ${profile.name}:`, error.message);
    }
    
    if (index < profiles.length - 1) {
      console.log('\nPausing before next profile...');
      Utilities.sleep(5000);
    }
  });
  
  console.log('\n' + '='.repeat(80));
  console.log('ALL PROFILE TESTING COMPLETE');
  console.log('='.repeat(80));
}

/**
 * Quick test menu for individual profiles
 */
function testUntestedProfilesMenu() {
  const ui = SpreadsheetApp.getUi();
  const menu = ui.createMenu('Test Untested Profiles')
    .addItem('Profile 1: ROBS In Use', 'testProfile1All')
    .addItem('Profile 3: Solo 401k Builder', 'testProfile3All')
    .addItem('Profile 4: Roth Reclaimer (Debug)', 'testProfile4Enhanced')
    .addItem('Profile 5: Bracket Strategist', 'testProfile5All')
    .addItem('Profile 6: Catch-Up', 'testProfile6All')
    .addItem('Profile 8: Biz Owner Group', 'testProfile8All')
    .addItem('Profile 9: Late Stage Growth', 'testProfile9All')
    .addSeparator()
    .addItem('Test ALL Untested Profiles', 'testAllUntestedProfiles');
  
  menu.addToUi();
}

// ============================================
// USAGE INSTRUCTIONS
// ============================================
/**
 * HOW TO USE THESE TEST SCENARIOS:
 * 
 * 1. Load either Testing.js OR Testing_Enhanced.js first:
 *    - Testing_Enhanced.js (RECOMMENDED) - Better validation and error messages
 *    - Testing.js - Basic testing without validation
 * 
 * 2. For best results with Testing_Enhanced.js, first run:
 *    validateHeadersEnhanced()
 *    fixMissingHeaders()  // If validation shows missing headers
 * 
 * 3. To test a single profile:
 *    - Run testProfile1All(), testProfile3All(), etc.
 * 
 * 4. To test all untested profiles:
 *    - Run testAllUntestedProfiles()
 * 
 * 5. To add the menu to your spreadsheet:
 *    - Run testUntestedProfilesMenu()
 * 
 * 6. Each scenario tests specific conditions:
 *    - Different ages (catch-up contributions)
 *    - Different income levels (phase-outs)
 *    - Different employment situations
 *    - Edge cases specific to each profile
 * 
 * 7. Expected results for each profile:
 *    - Profile 1: ROBS distributions should be seeded correctly
 *    - Profile 3: Solo 401k employer calculations should match entity type
 *    - Profile 4: Backdoor Roth should trigger for high income
 *    - Profile 5: Traditional vehicles should be prioritized
 *    - Profile 6: All catch-up contributions should be maximized
 *    - Profile 8: DB plan should calculate based on age
 *    - Profile 9: Should handle phased retirement scenarios
 */
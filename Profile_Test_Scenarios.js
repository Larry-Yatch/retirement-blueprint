/**
 * Profile Test Scenarios - Using the WORKING runCompleteScenarioTest function
 * 
 * We know runCompleteScenarioTest works, so let's just create proper scenarios
 * with ALL required fields for each profile.
 */

// Base scenario template with ALL fields the engine needs
const BASE_SCENARIO_TEMPLATE = {
  phase1: {
    // Identity
    'Full_Name': 'Test User',
    'Email': 'test@example.com', 
    'Student_ID_Last4': '1234',
    
    // Demographics
    'Current_Age': 35,
    'ProfileID': '', // Set per profile
    'Work_Situation': 'W-2 employee',
    'filing_status': 'Single',
    
    // Financial
    'gross_annual_income': 75000,
    'Net_Monthly_Income': 5000,
    'Allocation_Percentage': 20,
    
    // CRITICAL - Investment Scoring (prevents $333 split)
    'investment_involvement': 4,
    'investment_time': 4,
    'investment_confidence': 4,
    
    // Preferences
    'Tax_Minimization': 'Both',
    'hsa_eligibility': 'Yes',
    'cesa_num_children': 0
  },
  phase2: {
    // Profile-specific, filled in per profile
  }
};

/**
 * Create a scenario by merging base template with custom values
 */
function createScenario(name, profileId, phase1Overrides = {}, phase2Data = {}) {
  return {
    name,
    phase1: {
      ...BASE_SCENARIO_TEMPLATE.phase1,
      ProfileID: profileId,
      ...phase1Overrides
    },
    phase2: phase2Data
  };
}

// ============================================
// PROFILE 2 - ROBS CURIOUS SCENARIOS
// ============================================
const PROFILE_2_COMPLETE_SCENARIOS = {
  w2Employee: createScenario(
    'W-2 Employee with Benefits',
    '2_ROBS_Curious',
    {
      Current_Age: 45,
      gross_annual_income: 120000,
      Net_Monthly_Income: 7500,
      filing_status: 'Married Filing Jointly',
      cesa_num_children: 2,
      Allocation_Percentage: 26.7
    },
    {
      ex_q1: 'Yes',          // Has employer 401k
      ex_q2: 'Yes',          // Has match
      ex_q3: '50% up to 6%', // Match details
      ex_q4: 'Yes',          // Roth option
      ex_q5: '75000',        // Rollover balance
      ex_q6: '0',            // Business income
      ex_q7: 'No'            // Spouse in business
    }
  ),
  
  selfEmployed: createScenario(
    'Self-Employed Business Owner',
    '2_ROBS_Curious',
    {
      Current_Age: 52,
      Work_Situation: 'Self-employed',
      gross_annual_income: 150000,
      Net_Monthly_Income: 9000,
      Tax_Minimization: 'Now',
      Allocation_Percentage: 33.3
    },
    {
      ex_q1: 'No',
      ex_q2: 'No',
      ex_q3: '',
      ex_q4: 'No',
      ex_q5: '200000',
      ex_q6: '50000',
      ex_q7: 'No'
    }
  )
};

// ============================================
// PROFILE 4 - ROTH RECLAIMER SCENARIOS
// ============================================
const PROFILE_4_COMPLETE_SCENARIOS = {
  highIncomeBackdoor: createScenario(
    'High Income Backdoor Roth',
    '4_Roth_Reclaimer',
    {
      Current_Age: 40,
      gross_annual_income: 200000,
      Net_Monthly_Income: 11000,
      Tax_Minimization: 'Later',
      Allocation_Percentage: 30
    },
    {
      ex_q5: '50000',       // Traditional IRA balance
      ex_q6: 'Yes',         // Made after-tax contributions
      ex_q7: 'Yes',         // Understands backdoor Roth
      ex_q8: '25000',       // Conversion amount
      ex_q1: 'Yes',         // Has employer 401k
      ex_q2: 'Yes',         // Has match
      ex_q3: '100% up to 4%', // Match percentage
      ex_q4: 'Yes'          // Has Roth 401k option
    }
  ),
  
  lowIncomeDirectRoth: createScenario(
    'Low Income Direct Roth',
    '4_Roth_Reclaimer',
    {
      Current_Age: 30,
      gross_annual_income: 75000,
      Net_Monthly_Income: 5500,
      filing_status: 'Married Filing Jointly',
      cesa_num_children: 2,
      Allocation_Percentage: 15
    },
    {
      ex_q5: '0',           // No Traditional IRA balance
      ex_q6: 'No',          // No after-tax contributions
      ex_q7: 'No',          // No backdoor knowledge needed
      ex_q8: '0',           // No conversion
      ex_q1: 'Yes',         // Has employer 401k
      ex_q2: 'Yes',         // Has match
      ex_q3: '50% up to 6%', // Match percentage
      ex_q4: 'No'           // No Roth 401k option
    }
  )
};

// ============================================
// PROFILE 7 - FOUNDATION BUILDER SCENARIOS
// ============================================
const PROFILE_7_COMPLETE_SCENARIOS = {
  youngProfessional: createScenario(
    'Young Professional Starting Out',
    '7_Foundation_Builder',
    {
      Current_Age: 25,
      gross_annual_income: 65000,
      Net_Monthly_Income: 4500,
      Allocation_Percentage: 15
    },
    {
      ex_q1: 'Yes',         // Has employer 401k
      ex_q2: 'Yes',         // Has match
      ex_q3: '100% up to 3%', // Match percentage
      ex_q4: 'Yes',         // Has Roth 401k option
      ex_q5: '5000',        // Emergency fund goal
      ex_q6: '1000',        // Current emergency savings
      ex_q7: 'Aggressive'   // Risk tolerance
    }
  ),
  
  familyStarter: createScenario(
    'Family with Children',
    '7_Foundation_Builder',
    {
      Current_Age: 35,
      gross_annual_income: 95000,
      Net_Monthly_Income: 6500,
      filing_status: 'Married Filing Jointly',
      Tax_Minimization: 'Now',
      cesa_num_children: 2,
      Allocation_Percentage: 20,
      investment_involvement: 4,
      investment_time: 4,
      investment_confidence: 4
    },
    {
      ex_q1: 'Yes',         // Has employer 401k
      ex_q2: 'Yes',         // Has match
      ex_q3: '50% up to 6%', // Match percentage
      ex_q4: 'No',          // No Roth 401k option
      ex_q5: '20000',       // Emergency fund goal
      ex_q6: '8000',        // Current emergency savings
      ex_q7: 'Moderate'     // Risk tolerance
    }
  ),
  
  highIncome: createScenario(
    'High Income No Kids',
    '7_Foundation_Builder',
    {
      Current_Age: 40,
      gross_annual_income: 175000,
      Net_Monthly_Income: 10000,
      filing_status: 'Single',
      cesa_num_children: 0,
      Allocation_Percentage: 30,
      investment_involvement: 5,
      investment_time: 5,
      investment_confidence: 6
    },
    {
      ex_q1: 'Yes',
      ex_q2: 'Yes',
      ex_q3: '100% up to 4%',
      ex_q4: 'Yes',
      ex_q5: '30000',
      ex_q6: '25000',
      ex_q7: 'Aggressive'
    }
  )
};

// ============================================
// SIMPLE TEST RUNNERS
// ============================================

/**
 * Test any profile using the working runCompleteScenarioTest
 */
function testProfile(profileScenarios, scenarioName) {
  // This uses the EXISTING working function from Testing.js
  return runCompleteScenarioTest(scenarioName, profileScenarios);
}

// Profile 2 Tests
function testProfile2All() {
  console.log('TESTING PROFILE 2 - ROBS CURIOUS');
  console.log('=' .repeat(80));
  
  Object.keys(PROFILE_2_COMPLETE_SCENARIOS).forEach(scenario => {
    testProfile(PROFILE_2_COMPLETE_SCENARIOS, scenario);
    Utilities.sleep(1000);
  });
}

// Profile 4 Tests  
function testProfile4All() {
  console.log('TESTING PROFILE 4 - ROTH RECLAIMER');
  console.log('=' .repeat(80));
  
  Object.keys(PROFILE_4_COMPLETE_SCENARIOS).forEach(scenario => {
    testProfile(PROFILE_4_COMPLETE_SCENARIOS, scenario);
    Utilities.sleep(1000);
  });
}

// Profile 7 Tests
function testProfile7Complete() {
  console.log('TESTING PROFILE 7 - FOUNDATION BUILDER');
  console.log('=' .repeat(80));
  
  Object.keys(PROFILE_7_COMPLETE_SCENARIOS).forEach(scenario => {
    testProfile(PROFILE_7_COMPLETE_SCENARIOS, scenario);
    Utilities.sleep(1000);
  });
}

// Single scenario tests
function testProfile7Young() {
  testProfile(PROFILE_7_COMPLETE_SCENARIOS, 'youngProfessional');
}

function testProfile7Family() {
  testProfile(PROFILE_7_COMPLETE_SCENARIOS, 'familyStarter');
}

function testProfile7HighIncome() {
  testProfile(PROFILE_7_COMPLETE_SCENARIOS, 'highIncome');
}

// ============================================
// QUICK VALIDATION
// ============================================

/**
 * Validate a scenario has all required fields
 */
function validateScenario(scenario) {
  const errors = [];
  
  // Check investment scoring
  const phase1 = scenario.phase1;
  if (!phase1.investment_involvement || !phase1.investment_time || !phase1.investment_confidence) {
    errors.push('Missing investment scoring - will cause $333 split!');
  }
  
  // Check other critical fields
  const required = ['Net_Monthly_Income', 'Allocation_Percentage', 'ProfileID'];
  required.forEach(field => {
    if (!phase1[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  });
  
  return { valid: errors.length === 0, errors };
}

// ============================================
// TEMPLATE FOR NEW PROFILES
// ============================================

/**
 * Template for adding new profile scenarios
 */
const PROFILE_X_TEMPLATE = {
  scenario1: createScenario(
    'Scenario Name',
    'X_Profile_Name',
    {
      // Override phase1 fields as needed
      Current_Age: 40,
      gross_annual_income: 100000,
      Net_Monthly_Income: 6500,
      // investment scores already included in base!
    },
    {
      // Phase2 profile-specific questions
      ex_q1: '',
      ex_q2: '',
      // etc...
    }
  )
};

// ============================================
// MENU
// ============================================

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('📋 Profile Tests')
    .addSubMenu(ui.createMenu('Profile 2 - ROBS')
      .addItem('Test All', 'testProfile2All'))
    .addSubMenu(ui.createMenu('Profile 4 - Roth')
      .addItem('Test All', 'testProfile4All'))
    .addSubMenu(ui.createMenu('Profile 7 - Foundation')
      .addItem('Test All', 'testProfile7Complete')
      .addItem('Young Professional', 'testProfile7Young')
      .addItem('Family', 'testProfile7Family')
      .addItem('High Income', 'testProfile7HighIncome'))
    .addToUi();
}

/**
 * The beauty of this approach:
 * 1. Uses the EXISTING working test function
 * 2. All scenarios have investment scoring by default
 * 3. Easy to add new scenarios - just override what's different
 * 4. No complex new logic to debug
 * 5. If runCompleteScenarioTest works, these will work
 */
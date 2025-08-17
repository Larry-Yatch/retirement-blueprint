// ═══════════════════════════════════════════════════════════════════════════════
// TESTING FUNCTIONS FOR GOOGLE APPS SCRIPT
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Utility function to set a value in a row based on column header
 */
function setValueInRow(rowArr, hdr, key, value) {
  if (hdr[key]) {
    rowArr[hdr[key] - 1] = value;
  } else {
    console.log(`Warning: Header key "${key}" not found`);
  }
}

/**
 * Test fetching headers from sheet
 */
function testFetchHeaders() {
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  if (!ws) {
    Logger.log('❌ Working Sheet not found!');
    return;
  }
  
  const lastCol = ws.getLastColumn();
  Logger.log(`📊 Working Sheet has ${lastCol} columns`);
  
  const headers = ws.getRange(1, 1, 1, lastCol).getValues()[0];
  headers.forEach((header, index) => {
    if (header.includes('ex_q')) {
      Logger.log(`Column ${index + 1}: ${header}`);
    }
  });
}

/**
 * Generate standardized test data for profiles
 */
function generateTestData() {
  // Get Working Sheet
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  
  // Get headers from Working Sheet
  const headerRange = ws.getRange(1, 1, 1, ws.getLastColumn());
  const headers = headerRange.getValues()[0];
  const hdr = {};
  headers.forEach((header, index) => {
    if (header) {
      hdr[header] = index + 1; // 1-based index
    }
  });
  
  // Create a row array with default values
  const rowArr = new Array(headers.length).fill('');
  
  // Set default values using actual header names from Working Sheet
  setValueInRow(rowArr, hdr, 'Timestamp', new Date().toISOString());
  setValueInRow(rowArr, hdr, 'Full_Name', 'Test User');
  setValueInRow(rowArr, hdr, 'Email', 'test@example.com');
  setValueInRow(rowArr, hdr, 'Student_ID_Last4', '1234');
  setValueInRow(rowArr, hdr, 'Current_Age', 45);
  setValueInRow(rowArr, hdr, 'Work_Situation', 'W-2 employee');
  setValueInRow(rowArr, hdr, 'Owns_Biz', 'No');
  setValueInRow(rowArr, hdr, 'Tax_Minimization', 'Both');
  setValueInRow(rowArr, hdr, 'ProfileID', '7_Foundation_Builder');
  
  // Phase 2 defaults
  setValueInRow(rowArr, hdr, 'filing_status', 'Single');
  setValueInRow(rowArr, hdr, 'gross_annual_income', 75000);
  setValueInRow(rowArr, hdr, 'Net_Monthly_Income', 5000);
  setValueInRow(rowArr, hdr, 'Allocation_Percentage', 15);
  setValueInRow(rowArr, hdr, 'retirement_importance', 5);
  setValueInRow(rowArr, hdr, 'education_importance', 3);
  setValueInRow(rowArr, hdr, 'health_importance', 4);
  setValueInRow(rowArr, hdr, 'hsa_eligibility', 'Yes');
  setValueInRow(rowArr, hdr, 'has_children_or_plan_children_education', 'Yes');
  setValueInRow(rowArr, hdr, 'cesa_num_children', 2);
  
  return { hdr, rowArr, headers };
}

/**
 * Test a specific profile helper by ID
 */
function testProfileHelper(profileId) {
  console.log(`\n=== TESTING PROFILE: ${profileId} ===\n`);
  
  // Generate test data
  const testData = generateTestData();
  const { hdr, rowArr } = testData;
  
  // Set the profile ID
  setValueInRow(rowArr, hdr, 'ProfileID', profileId);
  
  // Check if profile exists
  if (!profileHelpers[profileId]) {
    console.log(`❌ Profile helper not found for: ${profileId}`);
    return null;
  }
  
  // Run the profile helper
  console.log('Running profile helper...');
  const result = profileHelpers[profileId](rowArr, hdr);
  
  // Display results
  console.log('\n📊 RESULTS:');
  console.log('\nSeeds:');
  Object.entries(result.seeds).forEach(([domain, vehicles]) => {
    if (Object.keys(vehicles).length > 0) {
      console.log(`  ${domain}:`);
      Object.entries(vehicles).forEach(([vehicle, amount]) => {
        console.log(`    - ${vehicle}: $${Math.round(amount)}/mo`);
      });
    }
  });
  
  console.log('\nVehicle Orders:');
  Object.entries(result.vehicleOrders).forEach(([domain, vehicles]) => {
    console.log(`  ${domain}:`);
    vehicles.forEach((v, index) => {
      console.log(`    ${index + 1}. ${v.name}: $${Math.round(v.capMonthly)}/mo`);
    });
  });
  
  return result;
}

/**
 * Test all profile helpers
 */
function testAllProfiles() {
  console.log('\n=== TESTING ALL PROFILES ===\n');
  
  const profileIds = Object.keys(profileHelpers);
  const results = {};
  
  profileIds.forEach(profileId => {
    try {
      console.log(`\n${'─'.repeat(50)}`);
      console.log(`Testing ${profileId}...`);
      const result = testProfileHelper(profileId);
      results[profileId] = result ? 'PASS' : 'FAIL';
    } catch (error) {
      console.log(`❌ ERROR: ${error.message}`);
      results[profileId] = 'ERROR';
    }
  });
  
  // Summary
  console.log('\n\n📋 SUMMARY:');
  Object.entries(results).forEach(([profileId, status]) => {
    const icon = status === 'PASS' ? '✅' : '❌';
    console.log(`${icon} ${profileId}: ${status}`);
  });
}

/**
 * Test individual form mapping
 */
function testFormQuestionMapping() {
  console.log('\n=== FORM QUESTION MAPPING TEST ===\n');
  
  // Test data simulating form responses with questions in different positions
  const testCases = [
    {
      profileId: '2_ROBS_Curious',
      formResponse: [
        '2024-01-15 10:30:00',  // 0: timestamp
        'test@example.com',     // 1: email
        'John Doe',             // 2: name
        '12345',                // 3: student ID
        '45',                   // 4: age
        '150000',               // 5: income
        'Traditional',          // 6: tax preference
        '50000',                // 7: ex_q5 (rollover balance) - original position
        '10000',                // 8: ex_q6 (annual contribution) - original position
        'Yes',                  // 9: ex_q1 (employer 401k) - NEW
        'Yes',                  // 10: ex_q2 (employer match) - NEW
        '50% up to 6%',         // 11: ex_q3 (match percentage) - NEW
        'Yes'                   // 12: ex_q4 (roth option) - NEW
      ],
      expectedMapping: {
        ex_q1: 'Yes',
        ex_q2: 'Yes', 
        ex_q3: '50% up to 6%',
        ex_q4: 'Yes',
        ex_q5: '50000',
        ex_q6: '10000'
      }
    }
  ];
  
  testCases.forEach(testCase => {
    console.log(`\nTesting Profile: ${testCase.profileId}`);
    console.log('Form Response:');
    testCase.formResponse.forEach((val, i) => {
      if (i >= 7) { // Show extra questions
        console.log(`  Position ${i}: "${val}"`);
      }
    });
    
    console.log('\nExpected Mapping:');
    Object.entries(testCase.expectedMapping).forEach(([exQ, value]) => {
      console.log(`  ${exQ}: "${value}"`);
    });
    
    console.log('\nMapping Configuration:');
    const mapping = FORM_EX_Q_MAPPING[testCase.profileId];
    if (mapping) {
      Object.entries(mapping).forEach(([sourcePos, targetExQ]) => {
        console.log(`  Position ${sourcePos} → ${targetExQ}`);
      });
      console.log('✅ Mapping configuration found');
    } else {
      console.log('❌ No mapping configuration found!');
    }
  });
  
  console.log('\n=== TEST COMPLETE ===\n');
}

/**
 * Test employer 401k integration for a specific profile
 */
function testEmployer401kIntegration() {
  console.log('\n=== EMPLOYER 401(K) INTEGRATION TEST ===\n');
  
  // Ask which profile to test
  const ui = SpreadsheetApp.getUi();
  const response = ui.prompt(
    'Test Employer 401(k)',
    'Which profile to test? (e.g., 2_ROBS_Curious, 4_Roth_Reclaimer)',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (response.getSelectedButton() !== ui.Button.OK) {
    console.log('Test cancelled');
    return;
  }
  
  const profileId = response.getResponseText();
  
  // Generate test data
  const testData = generateTestData();
  const { hdr, rowArr } = testData;
  
  // Set up test scenario
  setValueInRow(rowArr, hdr, 'ProfileID', profileId);
  setValueInRow(rowArr, hdr, 'Work_Situation', 'W-2 employee');
  setValueInRow(rowArr, hdr, 'Current_Age', 45);
  setValueInRow(rowArr, hdr, 'gross_annual_income', 100000);
  
  // Set employer 401k info
  setValueInRow(rowArr, hdr, 'ex_q1', 'Yes');  // Has employer 401k
  setValueInRow(rowArr, hdr, 'ex_q2', 'Yes');  // Has match
  setValueInRow(rowArr, hdr, 'ex_q3', '50% up to 6%');  // Match percentage
  setValueInRow(rowArr, hdr, 'ex_q4', 'Yes');  // Has Roth option
  
  // Run the profile helper
  console.log(`Testing ${profileId} with employer 401(k)...\n`);
  const result = profileHelpers[profileId](rowArr, hdr);
  
  // Check for employer 401k vehicles
  console.log('Checking for employer 401(k) vehicles:');
  const retirement = result.vehicleOrders.Retirement;
  const employer401k = retirement.filter(v => 
    v.name.includes('Employer 401(k)') || 
    v.name.includes('Employer Match')
  );
  
  if (employer401k.length > 0) {
    console.log('✅ Employer 401(k) vehicles found:');
    employer401k.forEach(v => {
      console.log(`  - ${v.name}: $${Math.round(v.capMonthly)}/mo`);
    });
  } else {
    console.log('❌ No employer 401(k) vehicles found!');
  }
  
  // Show all retirement vehicles
  console.log('\nAll Retirement Vehicles:');
  retirement.forEach(v => {
    if (!v.name.includes('Bank')) {
      console.log(`  - ${v.name}: $${Math.round(v.capMonthly)}/mo`);
    }
  });
}

/**
 * Test form submission processing
 */
function testFormSubmissionProcessing() {
  console.log('\n=== FORM SUBMISSION PROCESSING TEST ===\n');
  
  // Simulate a form submission
  const formResponse = {
    profileId: '2_ROBS_Curious',
    timestamp: new Date().toISOString(),
    email: 'test@example.com',
    responses: [
      '2024-01-15 10:30:00',
      'test@example.com',
      'Test User',
      '1234',
      '45',
      '150000',
      'Both',
      '75000',  // rollover balance
      '10000',  // annual contribution
      'Yes',    // employer 401k
      'Yes',    // employer match
      '50% up to 6%',  // match percentage
      'Yes'     // roth option
    ]
  };
  
  console.log('Simulating form submission...');
  console.log(`Profile: ${formResponse.profileId}`);
  console.log(`Email: ${formResponse.email}`);
  
  // Apply mapping
  const mapping = FORM_EX_Q_MAPPING[formResponse.profileId];
  console.log('\nApplying mapping:');
  Object.entries(mapping).forEach(([sourcePos, targetExQ]) => {
    console.log(`  Position ${sourcePos} → ${targetExQ}: "${formResponse.responses[sourcePos]}"`);
  });
  
  // Simulate processing through profile helper
  console.log('\nSimulating profile helper processing...');
  
  // Create mock row data after mapping
  const mockHdr = {};
  const headers = ['timestamp', 'email', 'name', 'student_id', 'age', 'income', 'tax_pref',
                   'ex_q1', 'ex_q2', 'ex_q3', 'ex_q4', 'ex_q5', 'ex_q6'];
  headers.forEach((h, i) => mockHdr[h.toUpperCase()] = i + 1);
  
  console.log('\n✅ Form processing simulation complete');
}

/**
 * Test employer match calculation
 */
function testEmployerMatchCalculation() {
  console.log('\n=== EMPLOYER MATCH CALCULATION TEST ===\n');
  
  const testCases = [
    { income: 100000, match: '50% up to 6%', expected: 250 },
    { income: 80000, match: '100% up to 3%', expected: 200 },
    { income: 60000, match: '50% up to 4%', expected: 100 },
    { income: 120000, match: '100% up to 6%', expected: 600 },
    { income: 50000, match: 'Other/Not sure', expected: 125 }
  ];
  
  testCases.forEach(test => {
    const monthlyIncome = test.income / 12;
    
    // Parse match percentage
    let matchUpToPct = 0.03; // Default 3%
    if (test.match.includes('3%')) matchUpToPct = 0.03;
    else if (test.match.includes('4%')) matchUpToPct = 0.04;
    else if (test.match.includes('6%')) matchUpToPct = 0.06;
    
    const matchPct = test.match.includes('100%') ? 1.0 : 0.5;
    const matchCap = Math.round(monthlyIncome * matchUpToPct * matchPct);
    
    console.log(`Income: $${test.income}, Match: "${test.match}"`);
    console.log(`  Calculated: $${matchCap}/mo`);
    console.log(`  Expected: $${test.expected}/mo`);
    console.log(`  ${matchCap === test.expected ? '✅ PASS' : '❌ FAIL'}`);
  });
}

/**
 * Test Solo 401k Builder seeding logic
 */
function testSolo401kSeeding() {
  console.log('\n=== SOLO 401(K) SEEDING TEST ===\n');
  
  const testData = generateTestData();
  const { hdr, rowArr } = testData;
  
  // Set up Solo 401k Builder profile
  setValueInRow(rowArr, hdr, 'ProfileID', '3_Solo401k_Builder');
  setValueInRow(rowArr, hdr, 'Work_Situation', 'Self-employed');
  setValueInRow(rowArr, hdr, 'Current_Age', 45);
  
  // Test with existing plan
  setValueInRow(rowArr, hdr, 'ex_q3', 'Yes'); // Has Solo 401k
  setValueInRow(rowArr, hdr, 'ex_q4', '30000'); // Employee contribution
  setValueInRow(rowArr, hdr, 'ex_q5', '20000'); // Employer contribution
  
  const result = profileHelpers['3_Solo401k_Builder'](rowArr, hdr);
  
  console.log('Seeds (existing contributions):');
  Object.entries(result.seeds.Retirement).forEach(([vehicle, amount]) => {
    console.log(`  ${vehicle}: $${Math.round(amount)}/mo`);
  });
  
  console.log('\nVehicle capacities:');
  result.vehicleOrders.Retirement.forEach(v => {
    if (v.name.includes('Solo 401(k)')) {
      console.log(`  ${v.name}: $${Math.round(v.capMonthly)}/mo`);
    }
  });
}

/**
 * Test Roth IRA phase-out calculations
 */
function testRothPhaseOut() {
  console.log('\n=== ROTH IRA PHASE-OUT TEST ===\n');
  
  const testCases = [
    { filing: 'Single', income: 140000, expected: 7000 }, // Full contribution
    { filing: 'Single', income: 148000, expected: 4200 }, // Partial phase-out
    { filing: 'Single', income: 153000, expected: 0 },    // Fully phased out
    { filing: 'Married Filing Jointly', income: 220000, expected: 7000 },
    { filing: 'Married Filing Jointly', income: 235000, expected: 2800 },
    { filing: 'Married Filing Jointly', income: 240000, expected: 0 }
  ];
  
  testCases.forEach(test => {
    const result = applyRothIRAPhaseOut([], { 
      grossIncome: test.income, 
      filing: test.filing 
    });
    
    const rothVehicle = result.find(v => v.name === 'Roth IRA');
    const actualAnnual = rothVehicle ? Math.round(rothVehicle.capMonthly * 12) : 0;
    
    console.log(`${test.filing}, Income: $${test.income.toLocaleString()}`);
    console.log(`  Expected: $${test.expected}`);
    console.log(`  Actual: $${actualAnnual}`);
    console.log(`  ${actualAnnual === test.expected ? '✅ PASS' : '❌ FAIL'}`);
  });
}

/**
 * Test universal functions (HSA, CESA)
 */
function testUniversalFunctions() {
  console.log('\n=== UNIVERSAL FUNCTIONS TEST ===\n');
  
  // Test HSA calculations
  console.log('HSA Calculations:');
  const hsaTests = [
    { eligible: true, age: 45, filing: 'Single', expected: 3850 },
    { eligible: true, age: 55, filing: 'Single', expected: 4850 },
    { eligible: true, age: 45, filing: 'Married Filing Jointly', expected: 7750 },
    { eligible: true, age: 55, filing: 'Married Filing Jointly', expected: 8750 },
    { eligible: false, age: 45, filing: 'Single', expected: 0 }
  ];
  
  hsaTests.forEach(test => {
    const monthlyCapacity = calculateHsaMonthlyCapacity(
      test.eligible, 
      test.age, 
      test.filing
    );
    const annual = Math.round(monthlyCapacity * 12);
    
    console.log(`  Eligible: ${test.eligible}, Age: ${test.age}, Filing: ${test.filing}`);
    console.log(`    Expected: $${test.expected}/year`);
    console.log(`    Actual: $${annual}/year`);
    console.log(`    ${annual === test.expected ? '✅' : '❌'}`);
  });
  
  // Test CESA calculations
  console.log('\nCESA Calculations:');
  const cesaTests = [
    { numKids: 0, expected: 0 },
    { numKids: 1, expected: 2000 },
    { numKids: 2, expected: 4000 },
    { numKids: 3, expected: 6000 }
  ];
  
  cesaTests.forEach(test => {
    const monthlyCapacity = calculateCesaMonthlyCapacity(test.numKids);
    const annual = Math.round(monthlyCapacity * 12);
    
    console.log(`  Number of kids: ${test.numKids}`);
    console.log(`    Expected: $${test.expected}/year`);
    console.log(`    Actual: $${annual}/year`);
    console.log(`    ${annual === test.expected ? '✅' : '❌'}`);
  });
}

/**
 * Test tax preference vehicle ordering
 */
function testTaxPreferenceOrdering() {
  console.log('\n=== TAX PREFERENCE ORDERING TEST ===\n');
  
  const testData = generateTestData();
  const { hdr, rowArr } = testData;
  
  // Test Profile 2 with different tax preferences
  setValueInRow(rowArr, hdr, 'ProfileID', '2_ROBS_Curious');
  setValueInRow(rowArr, hdr, 'Work_Situation', 'Self-employed');
  setValueInRow(rowArr, hdr, 'Current_Age', 45);
  setValueInRow(rowArr, hdr, 'ex_q6', '50000'); // Has business income
  
  const taxPreferences = ['Now', 'Later', 'Both'];
  
  taxPreferences.forEach(taxFocus => {
    setValueInRow(rowArr, hdr, 'Tax_Minimization', taxFocus);
    
    const result = profileHelpers['2_ROBS_Curious'](rowArr, hdr);
    const vehicles = result.vehicleOrders.Retirement
      .filter(v => v.name.includes('Solo 401(k)') && !v.name.includes('Employer'))
      .map(v => v.name);
    
    console.log(`\n${taxFocus}: ${vehicles.join(' → ')}`);
    
    // Verify ordering
    if (taxFocus === 'Now' && vehicles[0].includes('Traditional')) {
      console.log('  ✅ Traditional first (correct)');
    } else if (taxFocus === 'Later' && vehicles[0].includes('Roth')) {
      console.log('  ✅ Roth first (correct)');
    } else if (taxFocus === 'Both') {
      console.log('  ✅ Balanced approach');
    } else {
      console.log('  ❌ Incorrect ordering');
    }
  });
}

/**
 * Test Profile 4 backdoor Roth logic
 */
function testBackdoorRothLogic() {
  console.log('\n=== BACKDOOR ROTH LOGIC TEST ===\n');
  
  const testData = generateTestData();
  const { hdr, rowArr } = testData;
  
  // Set up Profile 4
  setValueInRow(rowArr, hdr, 'ProfileID', '4_Roth_Reclaimer');
  setValueInRow(rowArr, hdr, 'Current_Age', 45);
  
  const scenarios = [
    {
      name: 'No Trad IRA, high income',
      tradIRABalance: 0,
      income: 200000,
      expected: 'Direct Roth IRA phased out, backdoor available'
    },
    {
      name: 'Has Trad IRA, no employer 401k',
      tradIRABalance: 50000,
      income: 200000,
      hasEmployer401k: false,
      expected: 'Pro-rata rule issue, no backdoor'
    },
    {
      name: 'Has Trad IRA, has employer 401k',
      tradIRABalance: 50000,
      income: 200000,
      hasEmployer401k: true,
      expected: 'Can roll to 401k, then backdoor'
    }
  ];
  
  scenarios.forEach(scenario => {
    console.log(`\n${scenario.name}:`);
    
    setValueInRow(rowArr, hdr, 'ex_q5', scenario.tradIRABalance);
    setValueInRow(rowArr, hdr, 'Gross_Annual_Income', scenario.income);
    setValueInRow(rowArr, hdr, 'ex_q1', scenario.hasEmployer401k ? 'Yes' : 'No');
    
    const result = profileHelpers['4_Roth_Reclaimer'](rowArr, hdr);
    const vehicles = result.vehicleOrders.Retirement.map(v => v.name);
    
    console.log(`  Vehicles: ${vehicles.filter(v => v.includes('IRA')).join(', ')}`);
    console.log(`  Expected: ${scenario.expected}`);
  });
}

/**
 * Test profile helper error handling
 */
function testErrorHandling() {
  console.log('\n=== ERROR HANDLING TEST ===\n');
  
  // Test missing profile
  try {
    const result = profileHelpers['99_NonExistent']([], {});
    console.log('❌ Should have thrown error for non-existent profile');
  } catch (error) {
    console.log('✅ Correctly threw error for non-existent profile');
  }
  
  // Test missing required data
  const testData = generateTestData();
  const { hdr, rowArr } = testData;
  
  // Remove critical data
  setValueInRow(rowArr, hdr, 'Current_Age', '');
  setValueInRow(rowArr, hdr, 'ProfileID', '2_ROBS_Curious');
  
  try {
    const result = profileHelpers['2_ROBS_Curious'](rowArr, hdr);
    console.log('✅ Handled missing age gracefully');
  } catch (error) {
    console.log('❌ Failed on missing age:', error.message);
  }
}

/**
 * Test the simplified Solo 401(k) calculation for ROBS Curious
 */
function testSimplifiedSolo401k() {
  console.log('\n=== TESTING SIMPLIFIED SOLO 401(K) CALCULATION ===\n');
  
  const testCases = [
    {
      name: 'Single person, $100k capacity',
      businessSavings: 100000,
      spouseInBusiness: false,
      age: 45,
      expected: {
        employee: 23000,
        employer: 46000
      }
    },
    {
      name: 'Single with catch-up, $100k capacity',
      businessSavings: 100000,
      spouseInBusiness: false,
      age: 55,
      expected: {
        employee: 30500,
        employer: 46000
      }
    },
    {
      name: 'Couple in business, $150k capacity',
      businessSavings: 150000,
      spouseInBusiness: true,
      age: 45,
      expected: {
        employee: 46000,
        employer: 92000
      }
    },
    {
      name: 'Couple with catch-up, $200k capacity',
      businessSavings: 200000,
      spouseInBusiness: true,
      age: 55,
      expected: {
        employee: 61000,
        employer: 92000
      }
    },
    {
      name: 'Limited capacity $50k',
      businessSavings: 50000,
      spouseInBusiness: false,
      age: 45,
      expected: {
        employee: 23000,
        employer: 27000
      }
    }
  ];
  
  let allPass = true;
  
  testCases.forEach(test => {
    console.log(`\nTest: ${test.name}`);
    console.log(`  Business Savings: $${test.businessSavings.toLocaleString()}`);
    console.log(`  Spouse in Business: ${test.spouseInBusiness ? 'Yes' : 'No'}`);
    console.log(`  Age: ${test.age}`);
    
    // Calculate using our simplified logic
    const participants = test.spouseInBusiness ? 2 : 1;
    const employeeMaxPerPerson = test.age >= 50 ? 30500 : 23000;
    const totalMaxPerPerson = test.age >= 50 ? 76500 : 69000;
    
    const employeeMaxTotal = employeeMaxPerPerson * participants;
    const totalMaxTotal = totalMaxPerPerson * participants;
    
    const employeeAmount = Math.min(test.businessSavings, employeeMaxTotal);
    const employerAmount = Math.min(
      test.businessSavings - employeeAmount,
      totalMaxTotal - employeeAmount
    );
    
    console.log(`  Calculated:`);
    console.log(`    Employee: $${employeeAmount.toLocaleString()}`);
    console.log(`    Employer: $${employerAmount.toLocaleString()}`);
    console.log(`    Total: $${(employeeAmount + employerAmount).toLocaleString()}`);
    
    if (employeeAmount === test.expected.employee && 
        employerAmount === test.expected.employer) {
      console.log(`  ✅ PASS`);
    } else {
      console.log(`  ❌ FAIL`);
      console.log(`    Expected: Employee $${test.expected.employee}, Employer $${test.expected.employer}`);
      allPass = false;
    }
  });
  
  console.log('\n=== RESULT: ' + (allPass ? '✅ ALL TESTS PASS' : '❌ SOME TESTS FAILED') + ' ===\n');
}

/**
 * Test ROBS Curious profile with simplified approach
 */
function testROBSCuriousSimplified() {
  console.log('\n=== TESTING ROBS CURIOUS WITH SIMPLIFIED APPROACH ===\n');
  
  // Create test data
  const testData = generateTestData();
  const hdr = testData.hdr;
  const rowArr = testData.rowArr;
  
  // Test scenarios
  const scenarios = [
    {
      name: 'Self-employed, no spouse, $80k business savings',
      data: {
        Work_Situation: 'Self-employed',
        Current_Age: 45,
        gross_annual_income: 150000,
        ex_q5: '100000',  // rollover balance
        ex_q6: '80000',   // business savings capacity
        ex_q7: 'No'       // spouse in business
      }
    },
    {
      name: 'Self-employed with spouse, $150k business savings',
      data: {
        Work_Situation: 'Self-employed',
        Current_Age: 52,
        gross_annual_income: 250000,
        ex_q5: '200000',  // rollover balance
        ex_q6: '150000',  // business savings capacity
        ex_q7: 'Yes'      // spouse in business
      }
    },
    {
      name: 'W-2 employee planning ROBS',
      data: {
        Work_Situation: 'W-2 employee',
        Current_Age: 48,
        gross_annual_income: 120000,
        ex_q1: 'Yes',     // has employer 401k
        ex_q2: 'Yes',     // has match
        ex_q3: '50% up to 6%',
        ex_q4: 'Yes',     // has Roth option
        ex_q5: '75000',   // rollover balance
        ex_q6: '0',       // no business yet
        ex_q7: 'No'       // spouse in business
      }
    },
    {
      name: 'Both W-2 and self-employed',
      data: {
        Work_Situation: 'Both',
        Current_Age: 55,
        gross_annual_income: 300000,
        ex_q1: 'Yes',     // has employer 401k
        ex_q2: 'Yes',     // has match
        ex_q3: '100% up to 3%',
        ex_q4: 'Yes',     // has Roth option
        ex_q5: '150000',  // rollover balance
        ex_q6: '60000',   // business savings capacity
        ex_q7: 'No'       // spouse in business
      }
    }
  ];
  
  // Set profile ID
  rowArr[hdr['ProfileID'] - 1] = '2_ROBS_Curious';
  
  scenarios.forEach(scenario => {
    console.log(`\n${scenario.name}`);
    console.log('─'.repeat(50));
    
    // Update test data with scenario values
    Object.entries(scenario.data).forEach(([key, value]) => {
      if (hdr[key]) {
        rowArr[hdr[key] - 1] = value;
      }
    });
    
    // Run the profile helper
    const result = profileHelpers['2_ROBS_Curious'](rowArr, hdr);
    
    // Display results
    console.log('\nRetirement Vehicles:');
    result.vehicleOrders.Retirement.forEach(v => {
      if (!v.name.includes('Bank')) {
        console.log(`  ${v.name}: $${Math.round(v.capMonthly)}/mo`);
        if (v.note) {
          console.log(`    Note: ${v.note}`);
        }
      }
    });
    
    // Check for Solo 401(k) vehicles
    const solo401kEmployee = result.vehicleOrders.Retirement.find(v => 
      v.name.includes('Solo 401(k)') && !v.name.includes('Employer')
    );
    const solo401kEmployer = result.vehicleOrders.Retirement.find(v => 
      v.name === 'Solo 401(k) – Employer'
    );
    
    if (solo401kEmployee || solo401kEmployer) {
      console.log('\nSolo 401(k) Summary:');
      if (solo401kEmployee) {
        console.log(`  Employee: $${Math.round(solo401kEmployee.capMonthly * 12).toLocaleString()}/year`);
      }
      if (solo401kEmployer) {
        console.log(`  Employer: $${Math.round(solo401kEmployer.capMonthly * 12).toLocaleString()}/year`);
      }
      if (solo401kEmployee && solo401kEmployer) {
        const total = (solo401kEmployee.capMonthly + solo401kEmployer.capMonthly) * 12;
        console.log(`  Total: $${Math.round(total).toLocaleString()}/year`);
      }
    }
  });
  
  console.log('\n=== TEST COMPLETE ===\n');
}

/**
 * Test ROBS Curious form mapping
 */
function testROBSCuriousMapping() {
  console.log('\n=== TESTING ROBS CURIOUS FORM MAPPING ===\n');
  
  // Simulate form response with new question order
  const formResponse = [
    '2024-01-15 10:30:00',  // 0: timestamp
    'test@example.com',     // 1: email
    'John Doe',             // 2: name
    '12345',                // 3: student ID
    '45',                   // 4: age
    '150000',               // 5: income
    'Both',                 // 6: tax preference
    '75000',                // 7: rollover balance (Q1)
    '100000',               // 8: business savings capacity (Q2)
    'Yes',                  // 9: employer 401k (Q4)
    'Yes',                  // 10: employer match (Q5)
    'Yes',                  // 11: roth option (Q7)
    '50% up to 6%',         // 12: match percentage (Q6)
    'Yes'                   // 13: spouse in business (Q3 at end)
  ];
  
  // Expected mapping results
  const expectedMappings = {
    'ex_q1': 'Yes',           // employer 401k (position 9)
    'ex_q2': 'Yes',           // employer match (position 10)
    'ex_q3': '50% up to 6%',  // match percentage (position 12)
    'ex_q4': 'Yes',           // roth option (position 11)
    'ex_q5': '75000',         // rollover balance (position 7)
    'ex_q6': '100000',        // business savings (position 8)
    'ex_q7': 'Yes'            // spouse in business (position 13)
  };
  
  console.log('Form Response Order:');
  console.log('Position 7: Rollover balance = "' + formResponse[7] + '"');
  console.log('Position 8: Business savings = "' + formResponse[8] + '"');
  console.log('Position 9: Employer 401k = "' + formResponse[9] + '"');
  console.log('Position 10: Employer match = "' + formResponse[10] + '"');
  console.log('Position 11: Roth option = "' + formResponse[11] + '"');
  console.log('Position 12: Match percentage = "' + formResponse[12] + '"');
  console.log('Position 13: Spouse in business = "' + formResponse[13] + '"');
  
  console.log('\nApplying FORM_EX_Q_MAPPING for ROBS_Curious:');
  
  // Get the mapping
  const mapping = FORM_EX_Q_MAPPING['2_ROBS_Curious'];
  console.log('Mapping configuration:', JSON.stringify(mapping, null, 2));
  
  // Apply the mapping
  const mappedValues = {};
  Object.entries(mapping).forEach(([sourcePos, targetExQ]) => {
    const value = formResponse[parseInt(sourcePos)];
    mappedValues[targetExQ] = value;
    console.log(`Position ${sourcePos} → ${targetExQ}: "${value}"`);
  });
  
  console.log('\nVerifying mapped values:');
  let allCorrect = true;
  
  Object.entries(expectedMappings).forEach(([exQ, expectedValue]) => {
    const actualValue = mappedValues[exQ];
    const isCorrect = actualValue === expectedValue;
    
    console.log(`${exQ}: "${actualValue}" ${isCorrect ? '✅' : '❌'} (expected: "${expectedValue}")`);
    
    if (!isCorrect) {
      allCorrect = false;
    }
  });
  
  console.log('\nOverall result:', allCorrect ? '✅ ALL MAPPINGS CORRECT' : '❌ MAPPING ERRORS FOUND');
  
  // Test key values in profile helper
  console.log('\n--- Testing Key Values in Profile Helper ---');
  console.log('Rollover balance (ex_q5):', mappedValues['ex_q5']);
  console.log('Business savings capacity (ex_q6):', mappedValues['ex_q6']);
  console.log('Spouse in business (ex_q7):', mappedValues['ex_q7']);
  console.log('Has employer 401k (ex_q1):', mappedValues['ex_q1']);
  
  return allCorrect;
}

/**
 * Verify Working Sheet columns match HEADERS configuration
 */
function verifyWorkingSheetColumns() {
  console.log('\n=== VERIFYING WORKING SHEET COLUMN MAPPING ===\n');
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName('Working Sheet');
  
  if (!ws) {
    console.log('❌ ERROR: Working Sheet not found!');
    return false;
  }
  
  // Get actual headers from Working Sheet
  const headerRow = ws.getRange(1, 1, 1, ws.getLastColumn()).getValues()[0];
  
  // Critical ex_q columns to verify
  const criticalColumns = [
    'P2_EX_Q1', 'P2_EX_Q2', 'P2_EX_Q3', 'P2_EX_Q4', 
    'P2_EX_Q5', 'P2_EX_Q6', 'P2_EX_Q7'
  ];
  
  console.log('Checking critical ex_q columns:');
  console.log('─'.repeat(50));
  
  let allCorrect = true;
  const columnPositions = {};
  
  criticalColumns.forEach(headerKey => {
    const expectedHeader = HEADERS[headerKey];
    
    // Find actual position in sheet
    let actualPosition = -1;
    headerRow.forEach((header, index) => {
      if (header === expectedHeader) {
        actualPosition = index + 1; // Convert to 1-based
      }
    });
    
    if (actualPosition === -1) {
      console.log(`❌ ${headerKey} (${expectedHeader}): NOT FOUND in Working Sheet!`);
      allCorrect = false;
    } else {
      console.log(`✅ ${headerKey} (${expectedHeader}): Column ${actualPosition}`);
      columnPositions[headerKey] = actualPosition;
    }
  });
  
  // Show the column mapping for ROBS Curious
  console.log('\n\nROBS Curious Form Mapping vs Sheet Columns:');
  console.log('─'.repeat(50));
  
  const mapping = FORM_EX_Q_MAPPING['2_ROBS_Curious'];
  console.log('Form Position → ex_q → Sheet Column:');
  
  Object.entries(mapping).forEach(([formPos, exQ]) => {
    const headerKey = `P2_${exQ.toUpperCase()}`;
    const sheetColumn = columnPositions[headerKey];
    console.log(`Position ${formPos} → ${exQ} → Column ${sheetColumn || 'NOT FOUND'}`);
  });
  
  console.log('\n\nOverall result:', allCorrect ? 
    '✅ COLUMN MAPPING IS CORRECT' : 
    '❌ COLUMN MAPPING ISSUES FOUND');
  
  return allCorrect;
}

/**
 * Display test menu for easy access
 */
function showTestMenu() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🧪 Profile Tests')
    .addItem('Test All Profiles', 'testAllProfiles')
    .addItem('Test Specific Profile', 'testProfileHelperMenu')
    .addSeparator()
    .addItem('Test ROBS Simplified Solo 401(k)', 'testSimplifiedSolo401k')
    .addItem('Test ROBS Curious Profile', 'testROBSCuriousSimplified')
    .addItem('Test ROBS Form Mapping', 'testROBSCuriousMapping')
    .addItem('Verify Working Sheet Columns', 'verifyWorkingSheetColumns')
    .addSeparator()
    .addItem('Test Employer 401(k) Integration', 'testEmployer401kIntegration')
    .addItem('Test Universal Functions', 'testUniversalFunctions')
    .addItem('Test Tax Preference Ordering', 'testTaxPreferenceOrdering')
    .addItem('Test Roth Phase-Out', 'testRothPhaseOut')
    .addSeparator()
    .addItem('Test Form Processing', 'testFormSubmissionProcessing')
    .addItem('Test Error Handling', 'testErrorHandling')
    .addToUi();
}

/**
 * Menu helper for testing specific profile
 */
function testProfileHelperMenu() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.prompt(
    'Test Profile Helper',
    'Enter profile ID (e.g., 2_ROBS_Curious):',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (response.getSelectedButton() === ui.Button.OK) {
    testProfileHelper(response.getResponseText());
  }
}
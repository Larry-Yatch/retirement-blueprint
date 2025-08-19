// Profile 2 Live Testing Script
// Test various scenarios for ROBS Curious profile

/**
 * Test Profile 2 with live form submission scenarios
 */
function testProfile2LiveScenarios() {
  console.log('=== PROFILE 2 LIVE TESTING SCENARIOS ===\n');
  
  // Scenario 1: W-2 Employee with Employer 401(k)
  const scenario1 = {
    name: 'W-2 Employee with Employer Match',
    description: 'Traditional employee with employer benefits, planning ROBS',
    responses: {
      // Universal questions (0-43)
      fullName: 'Test W2 Employee',
      email: 'test.w2@example.com',
      studentId: '1234TW',
      age: 45,
      grossIncome: 120000,
      filingStatus: 'Married Filing Jointly',
      workSituation: 'W-2 employee',
      taxMinimization: 'Both',
      hsaEligibility: 'Yes',
      cesaNumChildren: 2,
      // Profile-specific questions (44-50)
      q44_rolloverBalance: '75000',  // ex_q5
      q45_businessSavings: '0',      // ex_q6 - no business yet
      q46_employer401k: 'Yes',        // ex_q1
      q47_employerMatch: 'Yes',       // ex_q2
      q48_matchPercent: '50% up to 6%', // ex_q3
      q49_roth401k: 'Yes',            // ex_q4
      q50_spouseInBusiness: 'No'      // ex_q7
    },
    expectedVehicles: [
      '401(k) Match Traditional',
      '401(k) Traditional',
      '401(k) Roth',
      'HSA',
      'Traditional IRA',
      'Roth IRA',
      'Combined CESA',
      'Family Bank'
    ]
  };
  
  // Scenario 2: Self-Employed with Business Savings
  const scenario2 = {
    name: 'Self-Employed Planning ROBS',
    description: 'Business owner with significant savings capacity',
    responses: {
      fullName: 'Test Business Owner',
      email: 'test.biz@example.com',
      studentId: '5678TB',
      age: 52,
      grossIncome: 150000,
      filingStatus: 'Single',
      workSituation: 'Self-employed',
      taxMinimization: 'Now',
      hsaEligibility: 'Yes',
      cesaNumChildren: 0,
      q44_rolloverBalance: '200000',  // ex_q5
      q45_businessSavings: '50000',   // ex_q6
      q46_employer401k: 'No',         // ex_q1
      q47_employerMatch: 'No',        // ex_q2
      q48_matchPercent: '',           // ex_q3
      q49_roth401k: 'No',             // ex_q4
      q50_spouseInBusiness: 'No'      // ex_q7
    },
    expectedVehicles: [
      'HSA',
      'Solo 401(k) – Traditional',
      'Solo 401(k) – Roth',
      'Solo 401(k) – Employer',
      'Traditional IRA',
      'Roth IRA',
      'Family Bank'
    ]
  };
  
  // Scenario 3: Both W-2 and Self-Employed
  const scenario3 = {
    name: 'Both W-2 and Self-Employed',
    description: 'Has day job and side business',
    responses: {
      fullName: 'Test Hybrid Worker',
      email: 'test.both@example.com',
      studentId: '9012TH',
      age: 40,
      grossIncome: 180000,
      filingStatus: 'Married Filing Jointly',
      workSituation: 'Both',
      taxMinimization: 'Later',
      hsaEligibility: 'No',
      cesaNumChildren: 1,
      q44_rolloverBalance: '50000',   // ex_q5
      q45_businessSavings: '20000',   // ex_q6
      q46_employer401k: 'Yes',        // ex_q1
      q47_employerMatch: 'Yes',       // ex_q2
      q48_matchPercent: '100% up to 3%', // ex_q3
      q49_roth401k: 'No',             // ex_q4
      q50_spouseInBusiness: 'No'      // ex_q7
    },
    expectedVehicles: [
      '401(k) Match Traditional',
      '401(k) Roth',
      '401(k) Traditional',
      'Solo 401(k) – Roth',
      'Solo 401(k) – Traditional',
      'Solo 401(k) – Employer',
      'Traditional IRA',
      'Roth IRA',
      'Combined CESA',
      'Family Bank'
    ]
  };
  
  // Scenario 4: Spouse in Business
  const scenario4 = {
    name: 'Self-Employed with Spouse',
    description: 'Family business with both spouses working',
    responses: {
      fullName: 'Test Family Business',
      email: 'test.family@example.com',
      studentId: '3456TF',
      age: 48,
      grossIncome: 200000,
      filingStatus: 'Married Filing Jointly',
      workSituation: 'Self-employed',
      taxMinimization: 'Both',
      hsaEligibility: 'Yes',
      cesaNumChildren: 3,
      q44_rolloverBalance: '150000',  // ex_q5
      q45_businessSavings: '100000',  // ex_q6 - high savings
      q46_employer401k: 'No',         // ex_q1
      q47_employerMatch: 'No',        // ex_q2
      q48_matchPercent: '',           // ex_q3
      q49_roth401k: 'No',             // ex_q4
      q50_spouseInBusiness: 'Yes'     // ex_q7 - spouse works
    },
    expectedVehicles: [
      'HSA',
      'Solo 401(k) – Roth',
      'Solo 401(k) – Traditional',
      'Solo 401(k) – Employer',
      'Traditional IRA',
      'Roth IRA',
      'Combined CESA',
      'Family Bank'
    ],
    notes: 'Solo 401(k) employee vehicles should have increased capacity for both spouses'
  };
  
  // Scenario 5: High Income Phase-out Test
  const scenario5 = {
    name: 'High Income Phase-out',
    description: 'Testing Roth IRA phase-out and backdoor Roth',
    responses: {
      fullName: 'Test High Income',
      email: 'test.high@example.com',
      studentId: '7890TH',
      age: 35,
      grossIncome: 250000,
      filingStatus: 'Single',
      workSituation: 'W-2 employee',
      taxMinimization: 'Now',
      hsaEligibility: 'No',
      cesaNumChildren: 0,
      q44_rolloverBalance: '100000',  // ex_q5
      q45_businessSavings: '0',       // ex_q6
      q46_employer401k: 'Yes',        // ex_q1
      q47_employerMatch: 'No',        // ex_q2
      q48_matchPercent: '',           // ex_q3
      q49_roth401k: 'Yes',            // ex_q4
      q50_spouseInBusiness: 'No'      // ex_q7
    },
    expectedVehicles: [
      '401(k) Traditional',
      '401(k) Roth',
      'Traditional IRA',
      'Backdoor Roth IRA',  // Should see backdoor due to income
      'Family Bank'
    ]
  };
  
  return [scenario1, scenario2, scenario3, scenario4, scenario5];
}

/**
 * Instructions for manual testing
 */
function printTestInstructions() {
  console.log('\n=== PROFILE 2 LIVE TESTING INSTRUCTIONS ===\n');
  console.log('1. Go to the Profile 2 (ROBS Curious) Google Form');
  console.log('2. Submit each scenario using the provided test data');
  console.log('3. After submission, check the Working Sheet to verify:');
  console.log('   - Data appears in correct columns');
  console.log('   - ex_q1-ex_q7 are populated correctly');
  console.log('   - Profile helper generates expected vehicle order');
  console.log('\n4. Run validateProfile2Submission() after each submission');
  console.log('5. Document any discrepancies\n');
  
  const scenarios = testProfile2LiveScenarios();
  scenarios.forEach((scenario, index) => {
    console.log(`\n--- Scenario ${index + 1}: ${scenario.name} ---`);
    console.log(`Description: ${scenario.description}`);
    console.log('\nForm Responses:');
    Object.entries(scenario.responses).forEach(([key, value]) => {
      console.log(`  ${key}: ${value}`);
    });
    console.log('\nExpected Vehicles:');
    scenario.expectedVehicles.forEach(vehicle => {
      console.log(`  - ${vehicle}`);
    });
    if (scenario.notes) {
      console.log(`\nNotes: ${scenario.notes}`);
    }
  });
}

/**
 * Validate a Profile 2 submission after form entry
 */
function validateProfile2Submission(rowNumber) {
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  const headers = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  const rowData = ws.getRange(rowNumber, 1, 1, ws.getLastColumn()).getValues()[0];
  
  // Build header map
  const hdr = {};
  headers.forEach((header, index) => {
    if (header) hdr[header] = index + 1;
  });
  
  console.log('\n=== VALIDATING PROFILE 2 SUBMISSION ===');
  console.log(`Row ${rowNumber} Analysis:\n`);
  
  // Check profile ID
  const profileId = rowData[hdr['ProfileID'] - 1];
  console.log(`Profile ID: ${profileId}`);
  if (profileId !== '2_ROBS_Curious') {
    console.log('❌ ERROR: Wrong profile ID!');
    return;
  }
  
  // Check key fields
  console.log('\nKey Fields:');
  console.log(`  Age: ${rowData[hdr['Current_Age'] - 1]}`);
  console.log(`  Income: ${rowData[hdr['gross_annual_income'] - 1]}`);
  console.log(`  Work Situation: ${rowData[hdr['Work_Situation'] - 1]}`);
  console.log(`  Tax Focus: ${rowData[hdr['Tax_Minimization'] - 1]}`);
  
  // Check extra questions mapping
  console.log('\nExtra Questions Mapping:');
  console.log(`  ex_q1 (employer 401k): ${rowData[hdr['ex_q1'] - 1]}`);
  console.log(`  ex_q2 (employer match): ${rowData[hdr['ex_q2'] - 1]}`);
  console.log(`  ex_q3 (match percent): ${rowData[hdr['ex_q3'] - 1]}`);
  console.log(`  ex_q4 (roth 401k): ${rowData[hdr['ex_q4'] - 1]}`);
  console.log(`  ex_q5 (rollover balance): ${rowData[hdr['ex_q5'] - 1]}`);
  console.log(`  ex_q6 (business savings): ${rowData[hdr['ex_q6'] - 1]}`);
  console.log(`  ex_q7 (spouse in business): ${rowData[hdr['ex_q7'] - 1]}`);
  
  // Run profile helper
  console.log('\nRunning Profile Helper...');
  try {
    const result = profileHelpers['2_ROBS_Curious'](rowData, hdr);
    
    console.log('\nGenerated Vehicle Order:');
    result.vehicleOrders.Retirement.forEach(vehicle => {
      if (vehicle.capMonthly === Infinity) {
        console.log(`  - ${vehicle.name} (unlimited)`);
      } else {
        console.log(`  - ${vehicle.name}: $${Math.round(vehicle.capMonthly)}/mo`);
      }
      if (vehicle.note) {
        console.log(`    Note: ${vehicle.note}`);
      }
    });
    
    console.log('\n✅ Profile helper executed successfully!');
  } catch (error) {
    console.log(`\n❌ ERROR: ${error.message}`);
    console.log(error.stack);
  }
}

// Print instructions when loaded
printTestInstructions();
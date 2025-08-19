// Complete Profile 2 Testing with Phase 1 Setup
// This ensures Phase 1 and Phase 2 data are properly matched

/**
 * Create a complete test scenario with matching Phase 1 and Phase 2 data
 */
function createCompleteTestScenario(scenarioName) {
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  const headers = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  
  // Build header map
  const hdr = {};
  headers.forEach((header, index) => {
    if (header) hdr[header] = index + 1;
  });
  
  // Complete test scenarios with Phase 1 and Phase 2 data
  const scenarios = {
    w2Employee: {
      name: 'W-2 Employee with Employer 401(k)',
      phase1: {
        'Full_Name': 'Test W2 Employee',
        'Email': 'test.w2@example.com',
        'Student_ID_Last4': '1234TW',
        'Current_Age': 45,
        'ProfileID': '2_ROBS_Curious',
        'Work_Situation': 'W-2 employee',
        'gross_annual_income': 120000,
        'filing_status': 'Married Filing Jointly',
        'Tax_Minimization': 'Both',
        'p2_hsa_eligibility': 'Yes',
        'p2_cesa_num_children': 2,
        'Net_Monthly_Income': 7500,
        'Allocation_Percentage': 26.7
      },
      phase2: {
        ex_q1: 'Yes',        // employer 401k
        ex_q2: 'Yes',        // employer match
        ex_q3: '50% up to 6%', // match percent
        ex_q4: 'Yes',        // roth option
        ex_q5: '75000',      // rollover balance
        ex_q6: '0',          // business savings
        ex_q7: 'No',         // spouse in business
        p2_hsa_monthly_contrib: 500,
        p2_cesa_monthly_contrib: 200,
        p2_retirement_personal: 2000
      }
    },
    selfEmployed: {
      name: 'Self-Employed Planning ROBS',
      phase1: {
        'Full_Name': 'Test Business Owner',
        'Email': 'test.biz@example.com',
        'Student_ID_Last4': '5678TB',
        'Current_Age': 52,
        'ProfileID': '2_ROBS_Curious',
        'Work_Situation': 'Self-employed',
        'gross_annual_income': 150000,
        'filing_status': 'Single',
        'Tax_Minimization': 'Now',
        'p2_hsa_eligibility': 'Yes',
        'p2_cesa_num_children': 0,
        'Net_Monthly_Income': 9000,
        'Allocation_Percentage': 33.3
      },
      phase2: {
        ex_q1: 'No',
        ex_q2: 'No',
        ex_q3: '',
        ex_q4: 'No',
        ex_q5: '200000',     // large rollover
        ex_q6: '50000',      // business savings
        ex_q7: 'No',
        p2_hsa_monthly_contrib: 750,
        p2_cesa_monthly_contrib: 0,
        p2_retirement_personal: 3000
      }
    },
    both: {
      name: 'Both W-2 and Self-Employed',
      phase1: {
        'Full_Name': 'Test Hybrid Worker',
        'Email': 'test.both@example.com',
        'Student_ID_Last4': '9012TH',
        'Current_Age': 40,
        'ProfileID': '2_ROBS_Curious',
        'Work_Situation': 'Both',
        'gross_annual_income': 180000,
        'filing_status': 'Married Filing Jointly',
        'Tax_Minimization': 'Later',
        'p2_hsa_eligibility': 'No',
        'p2_cesa_num_children': 1,
        'Net_Monthly_Income': 11000,
        'Allocation_Percentage': 27.3
      },
      phase2: {
        ex_q1: 'Yes',
        ex_q2: 'Yes',
        ex_q3: '100% up to 3%',
        ex_q4: 'No',
        ex_q5: '50000',
        ex_q6: '20000',      // side business
        ex_q7: 'No',
        p2_hsa_monthly_contrib: 0,
        p2_cesa_monthly_contrib: 100,
        p2_retirement_personal: 3000
      }
    },
    spouseInBusiness: {
      name: 'Family Business with Spouse',
      phase1: {
        'Full_Name': 'Test Family Business',
        'Email': 'test.family@example.com',
        'Student_ID_Last4': '3456TF',
        'Current_Age': 48,
        'ProfileID': '2_ROBS_Curious',
        'Work_Situation': 'Self-employed',
        'gross_annual_income': 200000,
        'filing_status': 'Married Filing Jointly',
        'Tax_Minimization': 'Both',
        'p2_hsa_eligibility': 'Yes',
        'p2_cesa_num_children': 3,
        'Net_Monthly_Income': 12000,
        'Allocation_Percentage': 33.3
      },
      phase2: {
        ex_q1: 'No',
        ex_q2: 'No',
        ex_q3: '',
        ex_q4: 'No',
        ex_q5: '150000',
        ex_q6: '100000',     // high business savings
        ex_q7: 'Yes',        // spouse works in business!
        p2_hsa_monthly_contrib: 500,
        p2_cesa_monthly_contrib: 300,
        p2_retirement_personal: 4000
      }
    },
    highIncome: {
      name: 'High Income Phase-out Test',
      phase1: {
        'Full_Name': 'Test High Income',
        'Email': 'test.high@example.com',
        'Student_ID_Last4': '7890TH',
        'Current_Age': 35,
        'ProfileID': '2_ROBS_Curious',
        'Work_Situation': 'W-2 employee',
        'gross_annual_income': 250000,
        'filing_status': 'Single',
        'Tax_Minimization': 'Now',
        'p2_hsa_eligibility': 'No',
        'p2_cesa_num_children': 0,
        'Net_Monthly_Income': 14000,
        'Allocation_Percentage': 35.7
      },
      phase2: {
        ex_q1: 'Yes',
        ex_q2: 'No',
        ex_q3: '',
        ex_q4: 'Yes',
        ex_q5: '100000',
        ex_q6: '0',
        ex_q7: 'No',
        p2_hsa_monthly_contrib: 0,
        p2_cesa_monthly_contrib: 0,
        p2_retirement_personal: 5000
      }
    }
  };
  
  const scenario = scenarios[scenarioName];
  if (!scenario) {
    console.log('Invalid scenario. Choose from:', Object.keys(scenarios).join(', '));
    return null;
  }
  
  return { scenario, hdr, ws };
}

/**
 * Set up Phase 1 data for a test scenario
 */
function setupPhase1TestData(scenarioName) {
  const { scenario, hdr, ws } = createCompleteTestScenario(scenarioName);
  if (!scenario) return null;
  
  console.log(`\nSetting up Phase 1 data for: ${scenario.name}`);
  
  // Check if student already exists
  const studentId = scenario.phase1['Student_ID_Last4'];
  const existing = ws.createTextFinder(studentId).matchEntireCell(true).findAll();
  
  let rowNum;
  if (existing.length > 0) {
    // Update existing row
    rowNum = existing[0].getRow();
    console.log(`Found existing student at row ${rowNum}, updating...`);
  } else {
    // Create new row
    ws.appendRow([]);
    rowNum = ws.getLastRow();
    console.log(`Creating new student at row ${rowNum}`);
    
    // Add timestamp
    ws.getRange(rowNum, hdr['Timestamp']).setValue(new Date());
  }
  
  // Write Phase 1 data
  Object.entries(scenario.phase1).forEach(([field, value]) => {
    if (hdr[field]) {
      ws.getRange(rowNum, hdr[field]).setValue(value);
    } else {
      console.log(`Warning: Header not found for ${field}`);
    }
  });
  
  console.log('✅ Phase 1 data set up successfully');
  return { rowNum, studentId, scenario };
}

/**
 * Submit Phase 2 data for a prepared Phase 1 entry
 */
function submitPhase2TestData(scenarioName) {
  // First ensure Phase 1 is set up
  const phase1Result = setupPhase1TestData(scenarioName);
  if (!phase1Result) return;
  
  const { rowNum, studentId, scenario } = phase1Result;
  const { hdr, ws } = createCompleteTestScenario(scenarioName);
  
  console.log(`\nSubmitting Phase 2 data for: ${scenario.name}`);
  
  // Build form values array that matches the expected format
  const formValues = [
    new Date().toString(), // Timestamp
    scenario.phase1['Full_Name'],
    scenario.phase1['Email'],
    studentId,
    // Skip demographic questions (4-42) as they're already in Phase 1
    ...Array(39).fill(''), // Placeholder for questions 4-42
    'Profile Deep Dive Questions', // Question 43
    scenario.phase2.ex_q5, // Question 44 - rollover
    scenario.phase2.ex_q6, // Question 45 - business savings
    scenario.phase2.ex_q1, // Question 46 - employer 401k
    scenario.phase2.ex_q2, // Question 47 - match
    scenario.phase2.ex_q3, // Question 48 - match percent
    scenario.phase2.ex_q4, // Question 49 - roth option
    scenario.phase2.ex_q7  // Question 50 - spouse
  ];
  
  // Also include the contribution amounts in the form (if your form has these)
  formValues.push(
    scenario.phase2.p2_hsa_monthly_contrib,
    scenario.phase2.p2_cesa_monthly_contrib,
    scenario.phase2.p2_retirement_personal
  );
  
  // Create fake event
  const fakeEvent = {
    values: formValues,
    range: { 
      getSheet: () => ({ 
        getName: () => 'Phase 2 ROBS Curious Raw' 
      })
    }
  };
  
  try {
    // Call the handler
    handlePhase2(fakeEvent);
    console.log('✅ Phase 2 data submitted successfully');
    
    // Validate the results
    console.log('\n--- VALIDATION RESULTS ---');
    validateProfile2Submission(rowNum);
    
  } catch (error) {
    console.error('❌ Error submitting Phase 2:', error.message);
    console.log(error.stack);
  }
}

/**
 * Run a complete test with both Phase 1 and Phase 2
 */
function runCompleteProfile2Test(scenarioName) {
  console.log('\n' + '='.repeat(60));
  console.log(`COMPLETE TEST: ${scenarioName}`);
  console.log('='.repeat(60));
  
  submitPhase2TestData(scenarioName);
}

/**
 * Run all test scenarios
 */
function runAllCompleteTests() {
  const scenarios = ['w2Employee', 'selfEmployed', 'both', 'spouseInBusiness', 'highIncome'];
  
  scenarios.forEach(scenario => {
    runCompleteProfile2Test(scenario);
    Utilities.sleep(2000); // Wait between tests
  });
  
  console.log('\n✅ ALL TESTS COMPLETED!');
  console.log('\nCheck the Working Sheet to see all test results');
}

/**
 * Quick test for Google Apps Script editor
 */
function quickTest() {
  // Change this to test different scenarios
  runCompleteProfile2Test('w2Employee');
}

/**
 * Clean up test data
 */
function cleanupTestData() {
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  const testIds = ['1234TW', '5678TB', '9012TH', '3456TF', '7890TH'];
  
  console.log('Cleaning up test data...');
  
  testIds.forEach(id => {
    const found = ws.createTextFinder(id).matchEntireCell(true).findAll();
    found.forEach(cell => {
      const row = cell.getRow();
      console.log(`Deleting test row ${row} (ID: ${id})`);
      ws.deleteRow(row);
    });
  });
  
  console.log('✅ Test data cleaned up');
}
// Direct Form Submission for Profile 2 Testing
// This bypasses the Google Form and writes directly to sheets

/**
 * Submit test data directly to the Working Sheet
 * This simulates a Phase 2 form submission
 */
function submitProfile2TestData(scenario) {
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  const phase2Sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Phase 2 ROBS Curious Raw');
  
  // Test scenarios
  const scenarios = {
    w2Employee: {
      name: 'W-2 Employee with Employer 401(k)',
      formData: [
        new Date(), // Timestamp
        'Test W2 Employee', // Full Name
        'test.w2@example.com', // Email
        '1234TW', // Student ID
        'Under 30', // Age range
        '41-50', // Retirement age
        'Pacific', // Time zone
        'Advisor/Consultant', // Work type
        '5', '7', '3', '8', '2', // Priority scores
        '120000', // Income
        'Yes', // Benefits
        'Some college', // Education
        'Married', // Marital
        'Own', // Housing
        '2', // Children
        'Married Filing Jointly', // Filing
        'Medium', // Risk
        'Growth', // Focus
        '200000', // Net worth
        '50000', // Liquid
        '10000', // Emergency
        'Credit cards', // Debt
        'Both', // Tax focus
        '45', // Current age
        'In 20 years', // Retire when
        'W-2 employee', // Work situation
        '8', '7', '5', // More scores
        'Yes', // Has plan
        '', '', '', '', '', '', // Unused scores
        'Yes', // HSA eligible
        '2', // Num children
        '500', // HSA monthly
        '200', // CESA monthly
        '2000', // Retirement monthly
        'Profile Deep Dive Questions', // Section header
        '75000', // q44 - rollover balance (ex_q5)
        '0', // q45 - business savings (ex_q6)
        'Yes', // q46 - employer 401k (ex_q1)
        'Yes', // q47 - employer match (ex_q2)
        '50% up to 6%', // q48 - match percent (ex_q3)
        'Yes', // q49 - roth option (ex_q4)
        'No' // q50 - spouse in business (ex_q7)
      ]
    },
    selfEmployed: {
      name: 'Self-Employed Planning ROBS',
      formData: [
        new Date(),
        'Test Business Owner',
        'test.biz@example.com',
        '5678TB',
        'Under 30',
        '51-55',
        'Pacific',
        'Business Owner',
        '7', '9', '5', '6', '3',
        '150000',
        'No',
        'Bachelor degree',
        'Single',
        'Own',
        '0',
        'Single',
        'High',
        'Growth',
        '500000',
        '100000',
        '20000',
        'None',
        'Now',
        '52',
        'In 15 years',
        'Self-employed',
        '9', '8', '6',
        'Yes',
        '', '', '', '', '', '',
        'Yes',
        '0',
        '750',
        '0',
        '3000',
        'Profile Deep Dive Questions',
        '200000', // rollover
        '50000', // business savings
        'No', // employer 401k
        'No', // match
        '', // match percent
        'No', // roth option
        'No' // spouse
      ]
    },
    spouseInBusiness: {
      name: 'Family Business with Spouse',
      formData: [
        new Date(),
        'Test Family Business',
        'test.family@example.com',
        '3456TF',
        'Under 30',
        '46-50',
        'Pacific',
        'Business Owner',
        '6', '8', '7', '5', '4',
        '200000',
        'Yes',
        'Bachelor degree',
        'Married',
        'Own',
        '3',
        'Married Filing Jointly',
        'Medium',
        'Balanced',
        '750000',
        '150000',
        '30000',
        'Mortgage',
        'Both',
        '48',
        'In 17 years',
        'Self-employed',
        '8', '7', '7',
        'Yes',
        '', '', '', '', '', '',
        'Yes',
        '3',
        '500',
        '300',
        '4000',
        'Profile Deep Dive Questions',
        '150000', // rollover
        '100000', // business savings - high amount
        'No', // employer 401k
        'No', // match
        '', // match percent
        'No', // roth option
        'Yes' // spouse works in business!
      ]
    }
  };
  
  const data = scenarios[scenario];
  if (!data) {
    console.log('Invalid scenario. Choose from: w2Employee, selfEmployed, spouseInBusiness');
    return;
  }
  
  console.log(`Submitting test data for: ${data.name}`);
  
  // Step 1: Add to Phase 2 Raw sheet
  phase2Sheet.appendRow(data.formData);
  const lastRow = phase2Sheet.getLastRow();
  
  // Step 2: Trigger the form submission handler
  const fakeEvent = {
    values: data.formData,
    range: phase2Sheet.getRange(lastRow, 1, 1, data.formData.length),
    source: SpreadsheetApp.getActiveSpreadsheet()
  };
  
  try {
    // Call the handler directly
    handlePhase2(fakeEvent);
    console.log('✅ Test data submitted successfully!');
    
    // Find the row in Working Sheet
    const studentId = data.formData[3];
    const workingSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
    const finder = workingSheet.createTextFinder(studentId).matchEntireCell(true);
    const found = finder.findAll();
    
    if (found.length > 0) {
      const wsRow = found[found.length - 1].getRow();
      console.log(`Data written to Working Sheet row ${wsRow}`);
      
      // Run validation
      validateProfile2Submission(wsRow);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log(error.stack);
  }
}

/**
 * Run all test scenarios
 */
function runAllProfile2Tests() {
  const scenarios = ['w2Employee', 'selfEmployed', 'spouseInBusiness'];
  
  scenarios.forEach((scenario, index) => {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`TEST ${index + 1}: ${scenario}`);
    console.log('='.repeat(50));
    
    submitProfile2TestData(scenario);
    
    // Wait a bit between submissions
    Utilities.sleep(2000);
  });
  
  console.log('\n✅ All tests completed!');
}

/**
 * Quick test runner for Google Apps Script
 */
function quickTestProfile2() {
  // Choose which scenario to test
  const scenario = 'w2Employee'; // Change this to test different scenarios
  
  submitProfile2TestData(scenario);
}
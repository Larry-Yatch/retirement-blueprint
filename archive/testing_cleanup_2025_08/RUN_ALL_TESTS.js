// ═══════════════════════════════════════════════════════════════════════════════
// RUN ALL PROFILE TESTS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Master test runner for all profile testing
 * Run this to execute comprehensive testing of all 9 profiles
 */
function runAllProfileTests() {
  console.log('\n' + '═'.repeat(80));
  console.log('RETIREMENT BLUEPRINT - COMPREHENSIVE PROFILE TESTING');
  console.log('Testing all 9 profiles with multiple scenarios each');
  console.log('═'.repeat(80) + '\n');
  
  // Step 1: Validate infrastructure
  console.log('STEP 1: VALIDATING INFRASTRUCTURE');
  console.log('-'.repeat(40));
  
  const validation = validateHeaders();
  if (!validation.valid) {
    console.error('❌ HEADER VALIDATION FAILED!');
    console.error('Missing headers:', validation.missingHeaders);
    console.error('\nPlease fix headers before running tests.');
    return;
  }
  
  console.log('✅ Header validation passed');
  console.log(`✅ Found ${validation.foundHeaders.length} headers`);
  
  // Step 2: Test profiles with existing test functions
  console.log('\n\nSTEP 2: TESTING PROFILES WITH EXISTING FUNCTIONS');
  console.log('-'.repeat(40));
  
  const profileTests = [
    {
      name: 'Profile 2: ROBS Curious',
      testFunction: testProfile2All,
      scenarios: ['W-2 Employee', 'Self-Employed', 'Both']
    },
    {
      name: 'Profile 4: Roth Reclaimer', 
      testFunction: testProfile4All,
      scenarios: ['High Income Backdoor', 'Low Income Direct', 'Mega Backdoor']
    },
    {
      name: 'Profile 7: Foundation Builder',
      testFunction: testProfile7All,
      scenarios: ['Young Professional', 'Family Starter', 'High Income']
    }
  ];
  
  profileTests.forEach((profile, index) => {
    console.log(`\n\n${index + 1}. TESTING ${profile.name}`);
    console.log('Scenarios:', profile.scenarios.join(', '));
    console.log('-'.repeat(60));
    
    try {
      profile.testFunction();
      console.log(`✅ ${profile.name} tests completed`);
    } catch (error) {
      console.error(`❌ ${profile.name} test failed:`, error);
    }
    
    // Pause between profiles
    Utilities.sleep(3000);
  });
  
  // Step 3: Test profiles without dedicated functions
  console.log('\n\nSTEP 3: TESTING REMAINING PROFILES');
  console.log('-'.repeat(40));
  
  const remainingProfiles = [
    '1_ROBS_In_Use',
    '3_Solo401k_Builder', 
    '5_Bracket_Strategist',
    '6_Catch_Up',
    '8_Biz_Owner_Group',
    '9_Late_Stage_Growth'
  ];
  
  remainingProfiles.forEach((profileId, index) => {
    console.log(`\n${index + 1}. Testing ${profileId}`);
    console.log('-'.repeat(40));
    
    // Create basic test data for each profile
    const testData = createProfileTestData(profileId);
    
    try {
      const result = testProfileHelper(profileId, testData);
      console.log(`✅ ${profileId} vehicle generation passed`);
      
      // Also test with universal engine
      testWithUniversalEngine(testData);
      console.log(`✅ ${profileId} allocation test passed`);
      
    } catch (error) {
      console.error(`❌ ${profileId} test failed:`, error);
    }
    
    Utilities.sleep(2000);
  });
  
  // Step 4: Summary
  console.log('\n\n' + '═'.repeat(80));
  console.log('TESTING COMPLETE - SUMMARY');
  console.log('═'.repeat(80));
  console.log('\nProfiles with full test suites: 2, 4, 7');
  console.log('Profiles tested with basic scenarios: 1, 3, 5, 6, 8, 9');
  console.log('\nNext steps:');
  console.log('1. Review logs for any failures');
  console.log('2. Create comprehensive test suites for remaining profiles');
  console.log('3. Add edge case testing');
  console.log('4. Test form integration');
}

/**
 * Create basic test data for a profile
 */
function createProfileTestData(profileId) {
  const baseData = {
    'Timestamp': new Date(),
    'Full_Name': `Test User ${profileId}`,
    'Email': 'test@example.com',
    'Student_ID_Last4': '1234',
    'ProfileID': profileId,
    'Work_Situation': 'W-2 employee',
    'gross_annual_income': 100000,
    'Net_Monthly_Income': 6000,
    'Allocation_Percentage': 25,
    'filing_status': 'Single',
    'investment_involvement': 5,
    'investment_time': 5,
    'investment_confidence': 5,
    'retirement_importance': 7,
    'education_importance': 3,
    'health_importance': 5,
    'retirement_years_until_target': 30,
    'cesa_years_until_first_need': 18,
    'hsa_years_until_need': 30,
    'Tax_Minimization': 'Both',
    'hsa_eligibility': 'Yes',
    'cesa_num_children': 0
  };
  
  // Add profile-specific data
  switch(profileId) {
    case '1_ROBS_In_Use':
      return {
        ...baseData,
        'Current_Age': 45,
        'Work_Situation': 'Self-employed',
        'ex_q1': 'Roth 401(k) funded by C-Corp distributions',
        'ex_q2': 'Monthly profit distributions to Solo 401(k)',
        'ex_q3': 'Both',
        'ex_q4': 'Monthly',
        'ex_q5': 'Yes, $3000/year',
        'ex_q6': '$50000'
      };
      
    case '3_Solo401k_Builder':
      return {
        ...baseData,
        'Current_Age': 40,
        'Work_Situation': 'Self-employed',
        'ex_q1': 'LLC',
        'ex_q2': 'No',
        'ex_q3': 'Yes',
        'ex_q4': '$23500',
        'ex_q5': '$25000',
        'ex_q6': '$48500'
      };
      
    case '5_Bracket_Strategist':
      return {
        ...baseData,
        'Current_Age': 35,
        'Tax_Minimization': 'Tax now',
        'ex_q1': 'Yes',
        'ex_q2': 'Yes',
        'ex_q3': '100% up to 4%',
        'ex_q4': 'Yes'
      };
      
    case '6_Catch_Up':
      return {
        ...baseData,
        'Current_Age': 55,
        'gross_annual_income': 150000,
        'Net_Monthly_Income': 9000,
        'ex_q1': 'Yes',
        'ex_q2': 'Yes',
        'ex_q3': '100% up to 3%',
        'ex_q4': 'Yes'
      };
      
    case '8_Biz_Owner_Group':
      return {
        ...baseData,
        'Current_Age': 50,
        'Work_Situation': 'Self-employed',
        'gross_annual_income': 500000,
        'Net_Monthly_Income': 30000,
        'ex_q1': '10',
        'ex_q2': '30',
        'ex_q3': '$60000',
        'ex_q4': 'Yes',
        'ex_q5': '401(k) with profit sharing',
        'ex_q6': '$100000'
      };
      
    case '9_Late_Stage_Growth':
      return {
        ...baseData,
        'Current_Age': 60,
        'gross_annual_income': 200000,
        'Net_Monthly_Income': 12000,
        'retirement_years_until_target': 5,
        'ex_q1': 'Yes',
        'ex_q2': 'Yes', 
        'ex_q3': '50% up to 6%',
        'ex_q4': 'Yes'
      };
      
    default:
      return baseData;
  }
}

/**
 * Test with universal engine
 */
function testWithUniversalEngine(testData) {
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  
  // Write test data to a new row
  const headers = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  const newRow = ws.getLastRow() + 1;
  
  // Create row data array
  const rowData = headers.map(header => testData[header] || '');
  
  // Write to sheet
  ws.getRange(newRow, 1, 1, rowData.length).setValues([rowData]);
  
  // Run universal engine
  const result = runUniversalEngine(newRow);
  
  // Clean up test row
  ws.deleteRow(newRow);
  
  return result;
}

/**
 * Quick test runner for development
 */
function quickTestAllProfiles() {
  console.log('Running quick test of all profiles...');
  testAllProfiles();  // Uses existing function
}

/**
 * Test a single profile by ID
 */
function testSingleProfile(profileId) {
  console.log(`\nTesting ${profileId}...`);
  const testData = createProfileTestData(profileId);
  
  // Test vehicle generation
  console.log('\n1. Testing vehicle generation:');
  const vehicles = testProfileHelper(profileId, testData);
  
  // Test allocation
  console.log('\n2. Testing allocation:');
  const result = testWithUniversalEngine(testData);
  
  console.log('\n✅ Test complete');
  return { vehicles, result };
}

// Menu integration
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  
  ui.createMenu('🧪 Testing')
    .addItem('Run ALL Profile Tests', 'runAllProfileTests')
    .addSeparator()
    .addSubMenu(ui.createMenu('Quick Tests')
      .addItem('Test All Helpers', 'testAllProfiles')
      .addItem('Validate Headers', 'validateHeaders')
      .addItem('Test Universal Engine', 'testUniversalEngine'))
    .addSeparator()
    .addSubMenu(ui.createMenu('Individual Profiles')
      .addItem('Profile 1: ROBS In Use', 'testProfile1')
      .addItem('Profile 2: ROBS Curious', 'testProfile2All')
      .addItem('Profile 3: Solo 401k', 'testProfile3')
      .addItem('Profile 4: Roth Reclaimer', 'testProfile4All')
      .addItem('Profile 5: Bracket Strategist', 'testProfile5')
      .addItem('Profile 6: Catch-Up', 'testProfile6')
      .addItem('Profile 7: Foundation', 'testProfile7All')
      .addItem('Profile 8: Biz Owner', 'testProfile8')
      .addItem('Profile 9: Late Stage', 'testProfile9'))
    .addToUi();
}

// Individual profile test functions
function testProfile1() { testSingleProfile('1_ROBS_In_Use'); }
function testProfile3() { testSingleProfile('3_Solo401k_Builder'); }
function testProfile5() { testSingleProfile('5_Bracket_Strategist'); }
function testProfile6() { testSingleProfile('6_Catch_Up'); }
function testProfile8() { testSingleProfile('8_Biz_Owner_Group'); }
function testProfile9() { testSingleProfile('9_Late_Stage_Growth'); }
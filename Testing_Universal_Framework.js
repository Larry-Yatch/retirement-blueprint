// Universal Testing Framework for All Profiles
// Expandable structure that works for any profile

/**
 * Profile test configurations
 * Add new profiles here as they're tuned
 */
const PROFILE_TEST_CONFIGS = {
  '2_ROBS_Curious': {
    name: 'ROBS Curious',
    formId: '1XjpC0o75D4Lgu07hegkK1c5LD47TU6M78Kdywhj8Ao8',
    hasEmployer401k: true,
    extraQuestions: {
      ex_q1: { pos: 46, desc: 'employer 401k' },
      ex_q2: { pos: 47, desc: 'employer match' },
      ex_q3: { pos: 48, desc: 'match percentage' },
      ex_q4: { pos: 49, desc: 'roth option' },
      ex_q5: { pos: 44, desc: 'rollover balance' },
      ex_q6: { pos: 45, desc: 'business savings' },
      ex_q7: { pos: 50, desc: 'spouse in business' }
    },
    scenarios: {
      w2Employee: {
        name: 'W-2 Employee with Employer 401(k)',
        phase1: {
          'Work_Situation': 'W-2 employee',
          'Current_Age': 45,
          'gross_annual_income': 120000,
          'filing_status': 'Married Filing Jointly',
          'Tax_Minimization': 'Both',
          'p2_hsa_eligibility': 'Yes',
          'p2_cesa_num_children': 2
        },
        phase2: {
          ex_q1: 'Yes',
          ex_q2: 'Yes',
          ex_q3: '50% up to 6%',
          ex_q4: 'Yes',
          ex_q5: '75000',
          ex_q6: '0',
          ex_q7: 'No'
        }
      },
      selfEmployed: {
        name: 'Self-Employed Planning ROBS',
        phase1: {
          'Work_Situation': 'Self-employed',
          'Current_Age': 52,
          'gross_annual_income': 150000,
          'filing_status': 'Single',
          'Tax_Minimization': 'Now',
          'p2_hsa_eligibility': 'Yes',
          'p2_cesa_num_children': 0
        },
        phase2: {
          ex_q1: 'No',
          ex_q2: 'No',
          ex_q3: '',
          ex_q4: 'No',
          ex_q5: '200000',
          ex_q6: '50000',
          ex_q7: 'No'
        }
      }
    }
  },
  
  '4_Roth_Reclaimer': {
    name: 'Roth Reclaimer',
    formId: '1B1VaZanAkzb6QB86knxk9eWhlNFpH-st65pdX__CvnE',
    hasEmployer401k: false, // Uses different questions
    extraQuestions: {
      ex_q5: { pos: 44, desc: 'traditional IRA balance' },
      ex_q6: { pos: 45, desc: 'after-tax contributions' },
      ex_q7: { pos: 46, desc: 'backdoor understanding' },
      ex_q8: { pos: 47, desc: 'conversion amount' }
    },
    scenarios: {
      noBalance: {
        name: 'No Traditional IRA Balance',
        phase1: {
          'Work_Situation': 'W-2 employee',
          'Current_Age': 40,
          'gross_annual_income': 180000,
          'filing_status': 'Single',
          'Tax_Minimization': 'Later'
        },
        phase2: {
          ex_q5: '0',
          ex_q6: 'No',
          ex_q7: 'Yes',
          ex_q8: '0'
        }
      },
      withBalance: {
        name: 'With Traditional IRA Balance',
        phase1: {
          'Work_Situation': 'W-2 employee',
          'Current_Age': 45,
          'gross_annual_income': 150000,
          'filing_status': 'Married Filing Jointly',
          'Tax_Minimization': 'Both'
        },
        phase2: {
          ex_q5: '100000',
          ex_q6: 'Yes',
          ex_q7: 'Yes',
          ex_q8: '50000'
        }
      }
    }
  },
  
  '5_Bracket_Strategist': {
    name: 'Bracket Strategist',
    formId: '15clxf7SsHDxz05m5GetbCRToxb48eMrNk9Dpz4dVFO8',
    hasEmployer401k: true,
    extraQuestions: {
      // These will need to be mapped when form is updated
      ex_q1: { pos: null, desc: 'employer 401k' },
      ex_q2: { pos: null, desc: 'employer match' },
      ex_q3: { pos: null, desc: 'match percentage' },
      ex_q4: { pos: null, desc: 'roth option' }
    },
    scenarios: {
      // Add test scenarios when profile is tuned
    }
  }
  
  // Add more profiles as they're tuned...
};

/**
 * Universal test data creator
 */
class ProfileTestBuilder {
  constructor(profileId) {
    this.profileId = profileId;
    this.config = PROFILE_TEST_CONFIGS[profileId];
    if (!this.config) {
      throw new Error(`Profile ${profileId} not configured for testing`);
    }
  }
  
  /**
   * Get base Phase 1 data that's common to all profiles
   */
  getBasePhase1Data(testName) {
    return {
      'Full_Name': `Test ${this.config.name} ${testName}`,
      'Email': `test.${this.profileId.toLowerCase()}@example.com`,
      'Student_ID_Last4': this.generateStudentId(testName),
      'ProfileID': this.profileId,
      'Net_Monthly_Income': 8000,
      'Allocation_Percentage': 25
    };
  }
  
  /**
   * Generate unique student ID for test
   */
  generateStudentId(testName) {
    const profileNum = this.profileId.split('_')[0];
    const hash = testName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return `${profileNum}${hash}T${profileNum}`;
  }
  
  /**
   * Build complete test scenario
   */
  buildScenario(scenarioKey) {
    const scenario = this.config.scenarios[scenarioKey];
    if (!scenario) {
      throw new Error(`Scenario ${scenarioKey} not found for ${this.profileId}`);
    }
    
    // Merge base data with scenario-specific data
    const phase1Data = {
      ...this.getBasePhase1Data(scenario.name),
      ...scenario.phase1
    };
    
    return {
      name: scenario.name,
      profileId: this.profileId,
      phase1: phase1Data,
      phase2: scenario.phase2
    };
  }
  
  /**
   * Get all scenarios for this profile
   */
  getAllScenarios() {
    return Object.keys(this.config.scenarios).map(key => this.buildScenario(key));
  }
}

/**
 * Universal test runner
 */
class UniversalTestRunner {
  constructor() {
    this.ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
    this.headers = this.ws.getRange(2, 1, 1, this.ws.getLastColumn()).getValues()[0];
    this.hdr = {};
    this.headers.forEach((header, index) => {
      if (header) this.hdr[header] = index + 1;
    });
  }
  
  /**
   * Set up Phase 1 data for any profile
   */
  setupPhase1(testData) {
    console.log(`\nSetting up Phase 1 for ${testData.profileId}: ${testData.name}`);
    
    const studentId = testData.phase1['Student_ID_Last4'];
    const existing = this.ws.createTextFinder(studentId).matchEntireCell(true).findAll();
    
    let rowNum;
    if (existing.length > 0) {
      rowNum = existing[0].getRow();
      console.log(`Updating existing row ${rowNum}`);
    } else {
      this.ws.appendRow([]);
      rowNum = this.ws.getLastRow();
      console.log(`Creating new row ${rowNum}`);
      this.ws.getRange(rowNum, this.hdr['Timestamp']).setValue(new Date());
    }
    
    // Write all Phase 1 data
    Object.entries(testData.phase1).forEach(([field, value]) => {
      if (this.hdr[field]) {
        this.ws.getRange(rowNum, this.hdr[field]).setValue(value);
      }
    });
    
    console.log('✅ Phase 1 setup complete');
    return { rowNum, studentId };
  }
  
  /**
   * Submit Phase 2 data for any profile
   */
  submitPhase2(testData, rowNum) {
    console.log(`\nSubmitting Phase 2 for ${testData.profileId}: ${testData.name}`);
    
    const config = PROFILE_TEST_CONFIGS[testData.profileId];
    
    // Build form values based on profile's question mapping
    const formValues = this.buildFormValues(testData, config);
    
    // Create event
    const fakeEvent = {
      values: formValues,
      range: { 
        getSheet: () => ({ 
          getName: () => `Phase 2 ${config.name} Raw` 
        })
      }
    };
    
    try {
      handlePhase2(fakeEvent);
      console.log('✅ Phase 2 submitted successfully');
      
      // Run profile-specific validation
      this.validateSubmission(rowNum, testData.profileId);
      
    } catch (error) {
      console.error('❌ Error:', error.message);
    }
  }
  
  /**
   * Build form values array based on profile configuration
   */
  buildFormValues(testData, config) {
    const values = [
      new Date().toString(),
      testData.phase1['Full_Name'],
      testData.phase1['Email'],
      testData.phase1['Student_ID_Last4']
    ];
    
    // Add placeholder values for questions 4-43
    for (let i = 4; i <= 43; i++) {
      values.push('');
    }
    
    // Add profile-specific questions in the correct positions
    const maxPos = Math.max(...Object.values(config.extraQuestions).map(q => q.pos || 0));
    
    // Initialize array up to max position
    while (values.length <= maxPos) {
      values.push('');
    }
    
    // Place answers in correct positions
    Object.entries(config.extraQuestions).forEach(([key, info]) => {
      if (info.pos && testData.phase2[key] !== undefined) {
        values[info.pos] = testData.phase2[key];
      }
    });
    
    return values;
  }
  
  /**
   * Profile-specific validation
   */
  validateSubmission(rowNum, profileId) {
    console.log('\n--- VALIDATION RESULTS ---');
    
    const rowData = this.ws.getRange(rowNum, 1, 1, this.ws.getLastColumn()).getValues()[0];
    const result = profileHelpers[profileId](rowData, this.hdr);
    
    console.log('Generated vehicles:');
    result.vehicleOrders.Retirement.forEach(vehicle => {
      if (vehicle.capMonthly === Infinity) {
        console.log(`  - ${vehicle.name} (unlimited)`);
      } else {
        console.log(`  - ${vehicle.name}: $${Math.round(vehicle.capMonthly)}/mo`);
      }
    });
  }
  
  /**
   * Run a complete test
   */
  runTest(profileId, scenarioKey) {
    const builder = new ProfileTestBuilder(profileId);
    const testData = builder.buildScenario(scenarioKey);
    
    console.log('\n' + '='.repeat(60));
    console.log(`TESTING: ${profileId} - ${testData.name}`);
    console.log('='.repeat(60));
    
    const { rowNum } = this.setupPhase1(testData);
    this.submitPhase2(testData, rowNum);
  }
  
  /**
   * Run all tests for a profile
   */
  runAllTestsForProfile(profileId) {
    const builder = new ProfileTestBuilder(profileId);
    const scenarios = builder.getAllScenarios();
    
    scenarios.forEach(testData => {
      const { rowNum } = this.setupPhase1(testData);
      this.submitPhase2(testData, rowNum);
      Utilities.sleep(2000);
    });
  }
  
  /**
   * Clean up test data
   */
  cleanup(profileId) {
    const builder = new ProfileTestBuilder(profileId);
    const testIds = [];
    
    // Collect all test student IDs for this profile
    Object.keys(PROFILE_TEST_CONFIGS[profileId].scenarios).forEach(key => {
      const scenario = builder.buildScenario(key);
      testIds.push(scenario.phase1['Student_ID_Last4']);
    });
    
    console.log(`Cleaning up test data for ${profileId}...`);
    testIds.forEach(id => {
      const found = this.ws.createTextFinder(id).matchEntireCell(true).findAll();
      found.forEach(cell => {
        this.ws.deleteRow(cell.getRow());
      });
    });
    console.log('✅ Cleanup complete');
  }
}

// ========== USAGE FUNCTIONS ==========

/**
 * Test a specific profile and scenario
 */
function testProfile(profileId, scenarioKey) {
  const runner = new UniversalTestRunner();
  runner.runTest(profileId, scenarioKey);
}

/**
 * Test all scenarios for a profile
 */
function testAllScenariosForProfile(profileId) {
  const runner = new UniversalTestRunner();
  runner.runAllTestsForProfile(profileId);
}

/**
 * Quick test functions for Google Apps Script
 */
function testProfile2() {
  testProfile('2_ROBS_Curious', 'w2Employee');
}

function testProfile4() {
  testProfile('4_Roth_Reclaimer', 'withBalance');
}

function testAllProfile2() {
  testAllScenariosForProfile('2_ROBS_Curious');
}

/**
 * Show available profiles and scenarios
 */
function showAvailableTests() {
  console.log('=== AVAILABLE TEST PROFILES ===\n');
  
  Object.entries(PROFILE_TEST_CONFIGS).forEach(([profileId, config]) => {
    console.log(`${profileId}: ${config.name}`);
    console.log(`  Form ID: ${config.formId}`);
    console.log(`  Scenarios:`);
    Object.entries(config.scenarios).forEach(([key, scenario]) => {
      console.log(`    - ${key}: ${scenario.name}`);
    });
    console.log('');
  });
}
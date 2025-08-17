// Testing scenarios for Profile 2 (ROBS Curious) and Profile 4 (Roth Reclaimer)

/**
 * Test Profile 2: ROBS Curious with various scenarios
 */
function testProfile2ROBSCurious() {
  console.log('\n=== TESTING PROFILE 2: ROBS CURIOUS ===\n');
  
  // Test scenarios
  const scenarios = [
    {
      name: 'W-2 Employee with Employer 401(k)',
      data: {
        age: 45,
        grossIncome: 120000,
        filingStatus: 'Married Filing Jointly',
        workSituation: 'W-2 employee',
        taxMinimization: 'Both',
        hsaEligibility: 'Yes',
        cesaNumChildren: 2,
        // Employer 401(k) questions
        ex_q1: 'Yes',  // has employer 401k
        ex_q2: 'Yes',  // has match
        ex_q3: '50% up to 6%',  // match details
        ex_q4: 'Yes',  // has Roth option
        // ROBS planning questions
        ex_q5: '75000',  // planned rollover
        ex_q6: '0'       // no business yet
      },
      expected: [
        '401(k) Match Traditional',
        'HSA',
        'Traditional IRA',
        'Roth IRA',
        'Taxable Brokerage'
      ]
    },
    {
      name: 'Self-Employed Planning ROBS',
      data: {
        age: 52,
        grossIncome: 150000,
        filingStatus: 'Single',
        workSituation: 'Self-employed',
        taxMinimization: 'Now',
        hsaEligibility: 'Yes',
        cesaNumChildren: 0,
        // No employer 401(k)
        ex_q1: 'No',
        ex_q2: 'No',
        ex_q3: '',
        ex_q4: 'No',
        // ROBS planning
        ex_q5: '200000',  // large rollover planned
        ex_q6: '50000'    // expecting profit contributions
      },
      expected: [
        'HSA',
        'Solo 401(k) – Traditional',
        'Solo 401(k) – Roth',
        'Solo 401(k) – Employer',
        'Traditional IRA',
        'Roth IRA',
        'Taxable Brokerage'
      ]
    },
    {
      name: 'Both W-2 and Self-Employed',
      data: {
        age: 40,
        grossIncome: 180000,
        filingStatus: 'Married Filing Jointly',
        workSituation: 'Both',
        taxMinimization: 'Later',
        hsaEligibility: 'No',
        cesaNumChildren: 1,
        // Has employer benefits
        ex_q1: 'Yes',
        ex_q2: 'Yes',
        ex_q3: '100% up to 3%',
        ex_q4: 'No',
        // Also has side business
        ex_q5: '50000',
        ex_q6: '20000'
      },
      expected: [
        '401(k) Match Traditional',
        'Solo 401(k) – Roth',
        'Solo 401(k) – Traditional', 
        'Solo 401(k) – Employer',
        'Traditional IRA',
        'Roth IRA',
        'Combined CESA',
        'Taxable Brokerage'
      ]
    },
    {
      name: 'High Income Roth Phase-out',
      data: {
        age: 35,
        grossIncome: 250000,
        filingStatus: 'Single',
        workSituation: 'W-2 employee',
        taxMinimization: 'Both',
        hsaEligibility: 'Yes',
        cesaNumChildren: 0,
        ex_q1: 'Yes',
        ex_q2: 'No',
        ex_q3: '',
        ex_q4: 'Yes',
        ex_q5: '10000',
        ex_q6: '0'
      },
      expected: [
        'HSA',
        'Traditional IRA',
        'Backdoor Roth IRA',  // Should be backdoor due to income
        'Taxable Brokerage'
      ]
    }
  ];
  
  // Run each scenario
  scenarios.forEach(scenario => {
    console.log(`\nScenario: ${scenario.name}`);
    console.log('Input data:', JSON.stringify(scenario.data, null, 2));
    
    // Create mock row and header
    const mockHdr = createMockHeader();
    const mockRow = createMockRow(scenario.data, mockHdr);
    
    // Call the profile helper
    const result = profileHelpers['2_ROBS_Curious'](mockRow, mockHdr);
    
    console.log('\nVehicle Order:');
    result.vehicleOrders.Retirement.forEach((vehicle, idx) => {
      if (vehicle.capMonthly !== Infinity && vehicle.capMonthly !== 0) {
        console.log(`  ${idx + 1}. ${vehicle.name} - $${Math.round(vehicle.capMonthly)}/mo`);
      }
    });
    
    console.log('\nSeeds:', result.seeds);
    
    // Validate expectations
    const vehicleNames = result.vehicleOrders.Retirement
      .filter(v => v.capMonthly > 0 && v.capMonthly !== Infinity)
      .map(v => v.name);
    
    console.log('\nExpected vehicles present?');
    scenario.expected.forEach(expectedVehicle => {
      const found = vehicleNames.some(v => v.includes(expectedVehicle));
      console.log(`  ${expectedVehicle}: ${found ? '✅' : '❌'}`);
    });
  });
}

/**
 * Test Profile 4: Roth Reclaimer with various scenarios
 */
function testProfile4RothReclaimer() {
  console.log('\n\n=== TESTING PROFILE 4: ROTH RECLAIMER ===\n');
  
  const scenarios = [
    {
      name: 'Has Traditional IRA + Employer 401(k)',
      data: {
        age: 45,
        grossIncome: 150000,
        filingStatus: 'Married Filing Jointly',
        hsaEligibility: 'Yes',
        cesaNumChildren: 0,
        // Employer 401(k)
        ex_q1: 'Yes',
        ex_q2: 'Yes', 
        ex_q3: '50% up to 6%',
        ex_q4: 'Yes',
        // Backdoor Roth situation
        ex_q5: '100000',  // Traditional IRA balance (problem!)
        ex_q6: 'No',      // no after-tax yet
        ex_q7: 'Yes',     // understands backdoor
        ex_q8: '6500'     // wants to convert IRA limit
      },
      expected: [
        '401(k) Match',
        'HSA',
        '401(k) – Roth',
        '401(k) – Traditional',
        'Backdoor Roth IRA',
        'IRA → 401(k) Rollover',  // Strategy note
        'Taxable Brokerage'
      ]
    },
    {
      name: 'No IRA Balance + High Income',
      data: {
        age: 50,
        grossIncome: 300000,
        filingStatus: 'Single',
        hsaEligibility: 'No',
        cesaNumChildren: 2,
        ex_q1: 'Yes',
        ex_q2: 'Yes',
        ex_q3: '100% up to 4%',
        ex_q4: 'No',
        ex_q5: '0',       // No IRA balance - clean!
        ex_q6: 'Yes',     // Can do after-tax
        ex_q7: 'Yes',     // Understands backdoor
        ex_q8: '7500'     // Wants max with catch-up
      },
      expected: [
        '401(k) Match',
        '401(k) – Traditional',
        'Backdoor Roth IRA',
        'After-tax 401(k) → Mega Backdoor',
        'Combined CESA',
        'Taxable Brokerage'
      ]
    },
    {
      name: 'Doesn\'t Understand Backdoor',
      data: {
        age: 40,
        grossIncome: 200000,
        filingStatus: 'Married Filing Jointly',
        hsaEligibility: 'Yes',
        cesaNumChildren: 0,
        ex_q1: 'No',
        ex_q2: 'No',
        ex_q3: '',
        ex_q4: 'No',
        ex_q5: '50000',   // Has IRA balance
        ex_q6: 'No',
        ex_q7: 'No',      // Doesn't understand backdoor
        ex_q8: '0'
      },
      expected: [
        'HSA',
        'Traditional IRA',  // Only option without backdoor knowledge
        'Taxable Brokerage'
      ]
    },
    {
      name: 'Low Income Direct Roth Available',
      data: {
        age: 35,
        grossIncome: 100000,
        filingStatus: 'Single',
        hsaEligibility: 'Yes',
        cesaNumChildren: 1,
        ex_q1: 'Yes',
        ex_q2: 'No',
        ex_q3: '',
        ex_q4: 'Yes',
        ex_q5: '0',       // No IRA balance
        ex_q6: 'No',
        ex_q7: 'No',      // Doesn't need backdoor
        ex_q8: '0'
      },
      expected: [
        'HSA',
        'Roth IRA',  // Direct contribution available
        '401(k) – Roth',
        '401(k) – Traditional',
        'Combined CESA',
        'Taxable Brokerage'
      ]
    }
  ];
  
  // Run each scenario
  scenarios.forEach(scenario => {
    console.log(`\nScenario: ${scenario.name}`);
    console.log('Input data:', JSON.stringify(scenario.data, null, 2));
    
    // Create mock row and header
    const mockHdr = createMockHeader();
    const mockRow = createMockRow(scenario.data, mockHdr);
    
    // Call the profile helper
    const result = profileHelpers['4_Roth_Reclaimer'](mockRow, mockHdr);
    
    console.log('\nVehicle Order:');
    result.vehicleOrders.Retirement.forEach((vehicle, idx) => {
      if (vehicle.name !== 'Family Bank') {
        const cap = vehicle.capMonthly === Infinity ? 'Unlimited' : 
                   vehicle.capMonthly === 0 ? 'Info only' : 
                   `$${Math.round(vehicle.capMonthly)}/mo`;
        console.log(`  ${idx + 1}. ${vehicle.name} - ${cap}`);
        if (vehicle.note) {
          console.log(`     Note: ${vehicle.note}`);
        }
      }
    });
    
    console.log('\nSeeds:', result.seeds);
    
    // Validate expectations
    const vehicleNames = result.vehicleOrders.Retirement.map(v => v.name);
    
    console.log('\nExpected vehicles present?');
    scenario.expected.forEach(expectedVehicle => {
      const found = vehicleNames.some(v => v.includes(expectedVehicle));
      console.log(`  ${expectedVehicle}: ${found ? '✅' : '❌'}`);
    });
  });
}

/**
 * Helper function to create mock header mapping
 */
function createMockHeader() {
  const headers = {};
  let col = 1;
  
  // Add all the headers we need
  Object.keys(HEADERS).forEach(key => {
    headers[HEADERS[key]] = col++;
  });
  
  return headers;
}

/**
 * Helper function to create mock row data
 */
function createMockRow(data, hdr) {
  const row = [];
  
  // Map data fields to their header positions
  const mapping = {
    age: HEADERS.CURRENT_AGE,
    grossIncome: HEADERS.GROSS_ANNUAL_INCOME,
    filingStatus: HEADERS.FILING_STATUS,
    workSituation: HEADERS.WORK_SITUATION,
    taxMinimization: HEADERS.TAX_MINIMIZATION,
    hsaEligibility: HEADERS.P2_HSA_ELIGIBILITY,
    cesaNumChildren: HEADERS.P2_CESA_NUM_CHILDREN,
    ex_q1: HEADERS.P2_EX_Q1,
    ex_q2: HEADERS.P2_EX_Q2,
    ex_q3: HEADERS.P2_EX_Q3,
    ex_q4: HEADERS.P2_EX_Q4,
    ex_q5: HEADERS.P2_EX_Q5,
    ex_q6: HEADERS.P2_EX_Q6,
    ex_q7: HEADERS.P2_EX_Q7,
    ex_q8: HEADERS.P2_EX_Q8
  };
  
  // Fill the row array
  Object.entries(mapping).forEach(([dataKey, headerKey]) => {
    if (data[dataKey] !== undefined) {
      row[hdr[headerKey] - 1] = data[dataKey];
    }
  });
  
  return row;
}

// Run the tests
function runProfileValidationTests() {
  testProfile2ROBSCurious();
  testProfile4RothReclaimer();
}
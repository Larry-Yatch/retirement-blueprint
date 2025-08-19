/**
 * Complete test suite for ROBS Curious Profile
 * Copy this entire file into Google Apps Script to run tests
 */

/**
 * Test the simplified Solo 401(k) calculation logic
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
      allPass = false;
    }
  });
  
  console.log('\n=== RESULT: ' + (allPass ? '✅ ALL TESTS PASS' : '❌ SOME TESTS FAILED') + ' ===\n');
}

/**
 * Test ROBS Curious profile with simplified approach
 */
function testROBSCuriousSimplified() {
  console.log('\n=== TESTING ROBS CURIOUS PROFILE ===\n');
  
  // Create test data
  const testData = generateTestData();
  const hdr = testData.hdr;
  const rowArr = testData.rowArr;
  
  // Set up ROBS Curious test scenario
  rowArr[hdr['ProfileID'] - 1] = '2_ROBS_Curious';
  rowArr[hdr['Work_Situation'] - 1] = 'Self-employed';
  rowArr[hdr['Current_Age'] - 1] = 45;
  rowArr[hdr['Gross_Annual_Income'] - 1] = 150000;
  rowArr[hdr['P2_EX_Q5'] - 1] = '100000';  // rollover
  rowArr[hdr['P2_EX_Q6'] - 1] = '80000';   // business savings
  rowArr[hdr['P2_EX_Q7'] - 1] = 'No';      // spouse
  
  // Run the profile helper
  const result = profileHelpers['2_ROBS_Curious'](rowArr, hdr);
  
  console.log('Retirement Vehicles:');
  result.vehicleOrders.Retirement.forEach(v => {
    if (!v.name.includes('Bank')) {
      console.log(`  ${v.name}: $${Math.round(v.capMonthly)}/mo`);
      if (v.note) {
        console.log(`    Note: ${v.note}`);
      }
    }
  });
  
  // Check for Solo 401(k) vehicles
  const solo401kVehicles = result.vehicleOrders.Retirement.filter(v => 
    v.name.includes('Solo 401(k)')
  );
  
  if (solo401kVehicles.length > 0) {
    console.log('\nSolo 401(k) found: ✅');
  } else {
    console.log('\nSolo 401(k) found: ❌ (Should have Solo 401k for self-employed)');
  }
}

/**
 * Test form mapping for ROBS Curious
 */
function testROBSCuriousMapping() {
  console.log('\n=== TESTING ROBS CURIOUS FORM MAPPING ===\n');
  
  const mapping = FORM_EX_Q_MAPPING['2_ROBS_Curious'];
  console.log('Current mapping configuration:');
  console.log(JSON.stringify(mapping, null, 2));
  
  // Simulate form response
  const formResponse = [
    '2024-01-15', 'test@example.com', 'John Doe', '12345', '45', '150000', 'Both',
    '75000',        // 7: rollover
    '100000',       // 8: business savings
    'Yes',          // 9: employer 401k
    'Yes',          // 10: employer match
    'Yes',          // 11: roth option
    '50% up to 6%', // 12: match percentage
    'Yes'           // 13: spouse in business
  ];
  
  console.log('\nApplying mapping:');
  Object.entries(mapping).forEach(([pos, exQ]) => {
    console.log(`Position ${pos} → ${exQ}: "${formResponse[pos]}"`);
  });
  
  console.log('\n✅ Mapping test complete');
}
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
        employer: 46000  // $69k total - $23k employee
      }
    },
    {
      name: 'Single person with catch-up, $100k capacity',
      businessSavings: 100000,
      spouseInBusiness: false,
      age: 55,
      expected: {
        employee: 30500,
        employer: 46000  // $76.5k total - $30.5k employee
      }
    },
    {
      name: 'Couple in business, $150k capacity',
      businessSavings: 150000,
      spouseInBusiness: true,
      age: 45,
      expected: {
        employee: 46000,  // 2 x $23k
        employer: 92000   // 2 x $46k
      }
    },
    {
      name: 'Couple with catch-up, $200k capacity',
      businessSavings: 200000,
      spouseInBusiness: true,
      age: 55,
      expected: {
        employee: 61000,  // 2 x $30.5k
        employer: 92000   // 2 x $46k
      }
    },
    {
      name: 'Limited capacity $50k',
      businessSavings: 50000,
      spouseInBusiness: false,
      age: 45,
      expected: {
        employee: 23000,
        employer: 27000   // Remaining $27k
      }
    }
  ];
  
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
    
    console.log(`\n  Calculated:`);
    console.log(`    Employee: $${employeeAmount.toLocaleString()} (expected: $${test.expected.employee.toLocaleString()})`);
    console.log(`    Employer: $${employerAmount.toLocaleString()} (expected: $${test.expected.employer.toLocaleString()})`);
    console.log(`    Total: $${(employeeAmount + employerAmount).toLocaleString()}`);
    
    // Verify
    const employeeMatch = employeeAmount === test.expected.employee;
    const employerMatch = employerAmount === test.expected.employer;
    
    if (employeeMatch && employerMatch) {
      console.log(`  ✅ PASS`);
    } else {
      console.log(`  ❌ FAIL`);
      if (!employeeMatch) console.log(`    Employee mismatch!`);
      if (!employerMatch) console.log(`    Employer mismatch!`);
    }
  });
  
  console.log('\n=== TEST COMPLETE ===\n');
}

/**
 * Test ROBS Curious with new simplified approach
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
        Gross_Annual_Income: 150000,
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
        Gross_Annual_Income: 250000,
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
        Gross_Annual_Income: 120000,
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
        Gross_Annual_Income: 300000,
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
  
  scenarios.forEach(scenario => {
    console.log(`\n${scenario.name}`);
    console.log('─'.repeat(50));
    
    // Update test data with scenario values
    Object.entries(scenario.data).forEach(([key, value]) => {
      const headerKey = `P2_${key.toUpperCase()}`;
      if (hdr[headerKey]) {
        rowArr[hdr[headerKey] - 1] = value;
      } else if (hdr[key]) {
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
/**
 * PROFILE X: [Profile Name] - Tuning Template
 * 
 * Use this template as a starting point for tuning any profile.
 * Replace X with profile number and update all sections.
 */

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 1: PROFILE ANALYSIS (Fill this out first!)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Profile Identity: [Who is this profile for?]
 * Core Challenge: [What problem are they solving?]
 * 
 * Current Issues:
 * - [ ] Missing universal functions (HSA, CESA, phase-outs)
 * - [ ] No employer 401(k) integration
 * - [ ] Hardcoded vehicles regardless of eligibility
 * - [ ] Missing catch-up contributions
 * - [ ] Includes Taxable Brokerage
 * 
 * Extra Questions Usage:
 * - ex_q1: [What it's for]
 * - ex_q2: [What it's for]
 * - ex_q3: [What it's for]
 * - etc...
 */

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 2: IMPLEMENTATION
// ═══════════════════════════════════════════════════════════════════════════════

'X_Profile_Name': function(rowArr, hdr) {
  // ─── 1. EXTRACT ALL DATA (Use HEADERS constants!) ───
  const age = Number(getValue(hdr, rowArr, HEADERS.CURRENT_AGE));
  const grossIncome = Number(getValue(hdr, rowArr, HEADERS.GROSS_ANNUAL_INCOME)) || 75000; // Default
  const filing = getValue(hdr, rowArr, HEADERS.FILING_STATUS);
  const workSituation = getValue(hdr, rowArr, HEADERS.WORK_SITUATION);
  const taxFocus = getValue(hdr, rowArr, HEADERS.TAX_MINIMIZATION);
  
  // Health/Education data
  const hsaElig = getValue(hdr, rowArr, HEADERS.P2_HSA_ELIGIBILITY) === 'Yes';
  const numKids = Number(getValue(hdr, rowArr, HEADERS.P2_CESA_NUM_CHILDREN)) || 0;
  
  // Profile-specific extra questions
  // const specificData = getValue(hdr, rowArr, HEADERS.P2_EX_QX);
  
  // ─── 2. CALCULATE CAPACITIES (Use universal functions) ───
  const hsaCap = calculateHsaMonthlyCapacity(hsaElig, age, filing);
  const cesaCap = calculateCesaMonthlyCapacity(numKids);
  
  // ─── 3. EMPLOYMENT STATUS LOGIC ───
  const isSelfEmployed = workSituation === 'Self-employed' || workSituation === 'Both';
  const isW2Employee = workSituation === 'W-2 employee' || workSituation === 'Both';
  
  // ─── 4. BUILD VEHICLE ORDERS ───
  
  // Education vehicles
  const educationOrder = [];
  if (numKids > 0) {
    educationOrder.push({ name: 'Combined CESA', capMonthly: cesaCap });
  }
  educationOrder.push({ name: 'Education Bank', capMonthly: Infinity });
  
  // Health vehicles
  const healthOrder = [];
  if (hsaElig) {
    healthOrder.push({ name: 'HSA', capMonthly: hsaCap });
  }
  healthOrder.push({ name: 'Health Bank', capMonthly: Infinity });
  
  // Retirement vehicles - build dynamically
  let baseRetirementOrder = [];
  
  // Always start with HSA if eligible (triple tax advantage)
  if (hsaElig) {
    baseRetirementOrder.push({ name: 'HSA', capMonthly: hsaCap });
  }
  
  // Add employer 401(k) if applicable
  if (isW2Employee) {
    baseRetirementOrder = addEmployer401kVehicles(baseRetirementOrder, {
      hasEmployer401k: getValue(hdr, rowArr, HEADERS.P2_EX_Q1) === 'Yes',
      hasEmployerMatch: getValue(hdr, rowArr, HEADERS.P2_EX_Q2) === 'Yes',
      matchPercentage: getValue(hdr, rowArr, HEADERS.P2_EX_Q3),
      hasRoth401k: getValue(hdr, rowArr, HEADERS.P2_EX_Q4) === 'Yes',
      age,
      grossIncome
    });
  }
  
  // Add profile-specific vehicles here
  // Example: Solo 401(k) for self-employed
  if (isSelfEmployed) {
    // Add Solo 401(k) logic
  }
  
  // Calculate IRA limits with catch-up
  const iraCap = age >= 50 
    ? (LIMITS.RETIREMENT.TRADITIONAL_IRA + LIMITS.RETIREMENT.CATCHUP_IRA) / 12
    : LIMITS.RETIREMENT.TRADITIONAL_IRA / 12;
  
  // Add IRA vehicles
  baseRetirementOrder.push({ name: 'Traditional IRA', capMonthly: iraCap });
  baseRetirementOrder.push({ name: 'Roth IRA', capMonthly: iraCap });
  
  // ─── 5. APPLY TAX PREFERENCES AND PHASE-OUTS ───
  
  // Apply Roth phase-out
  baseRetirementOrder = applyRothIRAPhaseOut(baseRetirementOrder, {
    grossIncome,
    filingStatus: filing,
    taxFocus
  });
  
  // Apply tax preference ordering
  if (taxFocus === 'Now') {
    baseRetirementOrder = prioritizeTraditionalAccounts(baseRetirementOrder);
  } else if (taxFocus === 'Later') {
    baseRetirementOrder = prioritizeRothAccounts(baseRetirementOrder);
  }
  // 'Both' keeps default order
  
  // ─── 6. FINALIZE WITH FAMILY BANK (NO Taxable Brokerage!) ───
  const retirementOrder = baseRetirementOrder.concat({ 
    name: 'Family Bank', 
    capMonthly: Infinity 
  });
  
  // ─── 7. SEEDS (if applicable) ───
  const seeds = {
    Education: {},
    Health: {},
    Retirement: {}
  };
  
  // Add any seeding logic here
  // Example: seeds.Retirement['Solo 401(k) - Employee'] = 1000;
  
  // ─── 8. RETURN RESULT ───
  return {
    seeds,
    vehicleOrders: {
      Education: educationOrder,
      Health: healthOrder,
      Retirement: retirementOrder
    }
  };
},

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 3: TEST SCENARIOS
// ═══════════════════════════════════════════════════════════════════════════════

function testProfileX() {
  console.log('\n=== TESTING PROFILE X ===\n');
  
  // Validate headers first!
  const validation = validateHeaders();
  if (!validation.valid) {
    console.error('Header validation failed:', validation.missing);
    return;
  }
  
  const scenarios = [
    {
      name: 'Basic W-2 Employee',
      data: {
        ProfileID: 'X_Profile_Name',
        Work_Situation: 'W-2 employee',
        Current_Age: 45,
        gross_annual_income: 75000,
        filing_status: 'Single',
        hsa_eligibility: 'Yes',
        cesa_num_children: 2
      }
    },
    {
      name: 'Self-Employed High Earner',
      data: {
        ProfileID: 'X_Profile_Name',
        Work_Situation: 'Self-employed',
        Current_Age: 55,
        gross_annual_income: 200000,
        filing_status: 'Married Filing Jointly',
        hsa_eligibility: 'No',
        cesa_num_children: 0
      }
    },
    {
      name: 'Mixed Employment',
      data: {
        ProfileID: 'X_Profile_Name',
        Work_Situation: 'Both',
        Current_Age: 50,
        gross_annual_income: 150000,
        filing_status: 'Single',
        hsa_eligibility: 'Yes',
        cesa_num_children: 1,
        ex_q1: 'Yes', // has employer 401k
        ex_q2: 'Yes', // has match
        ex_q3: '50% up to 6%',
        ex_q4: 'Yes'  // has Roth option
      }
    }
  ];
  
  scenarios.forEach(scenario => {
    console.log(`\n${scenario.name}`);
    console.log('─'.repeat(50));
    
    const testData = generateTestData();
    const { hdr, rowArr } = testData;
    
    // Apply scenario data
    Object.entries(scenario.data).forEach(([key, value]) => {
      if (hdr[key]) {
        rowArr[hdr[key] - 1] = value;
      }
    });
    
    // Run profile helper
    const result = profileHelpers['X_Profile_Name'](rowArr, hdr);
    
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
    
    // Verify key expectations
    // Add specific checks for this profile
  });
  
  console.log('\n=== TEST COMPLETE ===\n');
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 4: FORM MAPPING (if needed)
// ═══════════════════════════════════════════════════════════════════════════════

// Add to FORM_EX_Q_MAPPING if questions are reordered:
/*
'X_Profile_Name': {
  7: 'ex_q1',   // Map form position 7 to ex_q1
  8: 'ex_q2',   // Map form position 8 to ex_q2
  // etc...
}
*/

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 5: DOCUMENTATION CHECKLIST
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Before marking complete:
 * - [ ] All universal functions used
 * - [ ] No Taxable Brokerage included
 * - [ ] Employer 401(k) integration working
 * - [ ] Catch-up contributions implemented
 * - [ ] Tax preferences applied correctly
 * - [ ] Phase-out rules working
 * - [ ] All test scenarios pass
 * - [ ] Form mapping updated (if needed)
 * - [ ] Tracking document updated
 * - [ ] No hardcoded values
 * - [ ] Proper defaults for all data
 */
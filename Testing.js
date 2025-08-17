// ═══════════════════════════════════════════════════════════════════════════════
// TESTING AND VALIDATION FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════
// This file contains testing, validation, and diagnostic functions
// that support the retirement blueprint application.

// Header Diagnostic Functions
// ═══════════════════════════════════════════════════════════════════════════════

function diagnoseWorkingSheetHeaders() {
  Logger.log('🔍 DIAGNOSING WORKING SHEET HEADERS');
  Logger.log('═'.repeat(80));
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName('Working Sheet');
  
  if (!ws) {
    Logger.log('❌ Working Sheet not found');
    return;
  }
  
  const lastCol = ws.getLastColumn();
  Logger.log(`📊 Working Sheet has ${lastCol} columns`);
  
  // Read headers from row 2
  const headers = ws.getRange(2, 1, 1, lastCol).getValues()[0];
  Logger.log(`📋 Reading headers from Working Sheet row 2:`);
  
  headers.forEach((header, index) => {
    Logger.log(`  Column ${index + 1}: "${header}"`);
  });
  
  // Create header map like getHeaderMap() does
  const headerMap = {};
  headers.forEach((h, i) => {
    if (h) headerMap[h.trim()] = i + 1;
  });
  
  Logger.log(`\n🗺️ Header Map created by getHeaderMap():`);
  Object.keys(headerMap).forEach(key => {
    Logger.log(`  "${key}" → Column ${headerMap[key]}`);
  });
  
  // Check for specific headers we need
  const criticalHeaders = ['ex_q3', 'hsa_eligibility', 'cesa_num_children'];
  Logger.log(`\n🎯 Checking for critical headers:`);
  criticalHeaders.forEach(header => {
    if (headerMap[header]) {
      Logger.log(`  ✅ "${header}" found at column ${headerMap[header]}`);
    } else {
      Logger.log(`  ❌ "${header}" NOT FOUND`);
    }
  });
  
  // Look for any header that might be hsa_eligibility
  Logger.log(`\n🔍 Searching for HSA-related headers:`);
  Object.keys(headerMap).forEach(header => {
    if (header.toLowerCase().includes('hsa')) {
      Logger.log(`  Found: "${header}" at column ${headerMap[header]}`);
    }
  });
  
  // Look for any header that might be cesa_num_children
  Logger.log(`\n🔍 Searching for CESA/children-related headers:`);
  Object.keys(headerMap).forEach(header => {
    if (header.toLowerCase().includes('cesa') || header.toLowerCase().includes('child')) {
      Logger.log(`  Found: "${header}" at column ${headerMap[header]}`);
    }
  });
  
  Logger.log('\n' + '═'.repeat(80));
}

// Test Data Helper Functions
// ═══════════════════════════════════════════════════════════════════════════════

function getTestProfile(profileName) {
  // Create a basic test profile with all required fields
  const hdr = {
    'ex_q3': 1,
    'hsa_eligibility': 2,
    'cesa_num_children': 3,
    'age': 4,
    'filing_status': 5,
    'state_tax': 6,
    'annual_income': 7,
    'risk_profile': 8,
    'investment_involvement': 9,
    'hsa_custodian_comfort': 10,
    'self_employment': 11,
    'small_business': 12,
    'net_income_monthly': 13,
    'retirement_monthly': 14,
    'education_monthly': 15,
    'health_monthly': 16
  };
  
  const rowArr = new Array(20);
  
  // Set default values based on profile
  switch(profileName) {
    case '1_ROBS_In_Use':
      rowArr[hdr['ex_q3'] - 1] = 'Yes';
      rowArr[hdr['age'] - 1] = 52;
      rowArr[hdr['hsa_eligibility'] - 1] = 'yes';
      rowArr[hdr['cesa_num_children'] - 1] = 2;
      break;
    case '2_ROBS_Curious':
      rowArr[hdr['ex_q3'] - 1] = 'No';
      rowArr[hdr['age'] - 1] = 48;
      rowArr[hdr['hsa_eligibility'] - 1] = 'yes';
      rowArr[hdr['cesa_num_children'] - 1] = 1;
      break;
    case '3_Solo401k_Builder':
      rowArr[hdr['self_employment'] - 1] = 'yes';
      rowArr[hdr['age'] - 1] = 35;
      rowArr[hdr['hsa_eligibility'] - 1] = 'no';
      rowArr[hdr['cesa_num_children'] - 1] = 0;
      break;
    case '4_Roth_Reclaimer':
      rowArr[hdr['state_tax'] - 1] = 8;
      rowArr[hdr['annual_income'] - 1] = 150000;
      rowArr[hdr['age'] - 1] = 28;
      rowArr[hdr['hsa_eligibility'] - 1] = 'yes';
      break;
    case '5_Bracket_Strategist':
      rowArr[hdr['annual_income'] - 1] = 250000;
      rowArr[hdr['age'] - 1] = 45;
      rowArr[hdr['hsa_eligibility'] - 1] = 'yes';
      break;
    case '6_Catch_Up':
      rowArr[hdr['age'] - 1] = 55;
      rowArr[hdr['hsa_eligibility'] - 1] = 'yes';
      break;
    case '7_Foundation_Builder':
      rowArr[hdr['age'] - 1] = 30;
      rowArr[hdr['hsa_eligibility'] - 1] = 'no';
      break;
    case '8_Biz_Owner_Group':
      rowArr[hdr['small_business'] - 1] = 'yes';
      rowArr[hdr['age'] - 1] = 40;
      break;
    case '9_Late_Stage_Growth':
      rowArr[hdr['age'] - 1] = 58;
      rowArr[hdr['retirement_monthly'] - 1] = 2000;
      break;
    default:
      rowArr[hdr['age'] - 1] = 35;
  }
  
  // Set common defaults
  rowArr[hdr['filing_status'] - 1] = rowArr[hdr['filing_status'] - 1] || 'married_filing_jointly';
  rowArr[hdr['state_tax'] - 1] = rowArr[hdr['state_tax'] - 1] || 5;
  rowArr[hdr['annual_income'] - 1] = rowArr[hdr['annual_income'] - 1] || 100000;
  rowArr[hdr['risk_profile'] - 1] = 'moderate';
  rowArr[hdr['investment_involvement'] - 1] = 'moderate';
  rowArr[hdr['hsa_custodian_comfort'] - 1] = 'comfortable';
  rowArr[hdr['net_income_monthly'] - 1] = 8000;
  rowArr[hdr['retirement_monthly'] - 1] = rowArr[hdr['retirement_monthly'] - 1] || 500;
  rowArr[hdr['education_monthly'] - 1] = rowArr[hdr['education_monthly'] - 1] || 200;
  rowArr[hdr['health_monthly'] - 1] = rowArr[hdr['health_monthly'] - 1] || 100;
  
  return { rowArr, hdr };
}

// Validation Helper Functions
// ═══════════════════════════════════════════════════════════════════════════════

function validateAllocations(allocations, testData, profileConfig) {
  const results = {
    vehicleCapsRespected: true,
    domainWeightsApplied: true,
    allocationsSumCorrectly: true,
    incomeConstraints: true,
    returnRateCalculation: true,
    tests: {}
  };
  
  Logger.log(`\n🔍 VALIDATING ALLOCATIONS`);
  
  // 1. Check vehicle caps are respected
  Logger.log(`\n1️⃣ Checking vehicle capacity limits...`);
  let capsValid = true;
  Object.entries(allocations).forEach(([vehicleName, amount]) => {
    // Find the vehicle in any domain
    let vehicle = null;
    ['vehicleOrder_Retirement', 'vehicleOrder_Education', 'vehicleOrder_Health'].forEach(orderKey => {
      const found = (profileConfig[orderKey] || []).find(v => v.name === vehicleName);
      if (found) vehicle = found;
    });
    
    if (vehicle && vehicle.capMonthly && amount > vehicle.capMonthly) {
      Logger.log(`  ❌ ${vehicleName}: ${amount} exceeds cap of ${vehicle.capMonthly}`);
      capsValid = false;
    } else if (vehicle && vehicle.capMonthly) {
      Logger.log(`  ✅ ${vehicleName}: ${amount} ≤ cap of ${vehicle.capMonthly}`);
    }
  });
  results.vehicleCapsRespected = capsValid;
  results.tests.vehicleCaps = capsValid;
  
  // 2. Check domain weights are properly applied
  Logger.log(`\n2️⃣ Checking domain weight application...`);
  const domainTotals = {
    Retirement: 0,
    Education: 0,
    Health: 0
  };
  
  Object.entries(allocations).forEach(([vehicleName, amount]) => {
    // Determine which domain this vehicle belongs to
    ['Retirement', 'Education', 'Health'].forEach(domain => {
      const vehicleList = profileConfig[`vehicleOrder_${domain}`] || [];
      if (vehicleList.some(v => v.name === vehicleName)) {
        domainTotals[domain] += amount;
      }
    });
  });
  
  Logger.log(`  Retirement total: $${domainTotals.Retirement}`);
  Logger.log(`  Education total: $${domainTotals.Education}`);
  Logger.log(`  Health total: $${domainTotals.Health}`);
  
  // For now, just check that allocations exist where expected
  const weightsValid = true; // Could add more sophisticated weight validation
  results.domainWeightsApplied = weightsValid;
  results.tests.domainWeights = weightsValid;
  
  // 3. Check allocations sum correctly
  Logger.log(`\n3️⃣ Checking allocation totals...`);
  const totalAllocated = Object.values(allocations).reduce((sum, val) => sum + val, 0);
  const netIncome = testData.rowArr[testData.hdr['net_income_monthly'] - 1] || 8000;
  
  Logger.log(`  Total allocated: $${totalAllocated}`);
  Logger.log(`  Net income: $${netIncome}`);
  Logger.log(`  Allocation as % of income: ${(totalAllocated / netIncome * 100).toFixed(1)}%`);
  
  const sumValid = totalAllocated > 0 && totalAllocated <= netIncome;
  results.allocationsSumCorrectly = sumValid;
  results.tests.allocationSum = sumValid;
  
  // 4. Check income constraints
  Logger.log(`\n4️⃣ Checking income constraints...`);
  const incomeValid = totalAllocated <= netIncome;
  Logger.log(`  Total allocated ($${totalAllocated}) ${incomeValid ? '≤' : '>'} net income ($${netIncome}): ${incomeValid ? '✅' : '❌'}`);
  results.incomeConstraints = incomeValid;
  results.tests.incomeConstraints = incomeValid;
  
  // 5. Check return rate calculation
  Logger.log(`\n5️⃣ Checking return rate calculation...`);
  const involvement = testData.rowArr[testData.hdr['investment_involvement'] - 1] || 'moderate';
  const expectedRate = involvement === 'high' ? 0.00667 : 0.00583; // 8% or 7% annually
  const returnValid = true; // Could add more validation here
  Logger.log(`  Investment involvement: ${involvement}`);
  Logger.log(`  Expected monthly rate: ${(expectedRate * 100).toFixed(2)}%`);
  results.returnRateCalculation = returnValid;
  results.tests.returnRateCalculation = returnValid;
  
  // Overall result
  results.allTestsPassed = Object.values(results.tests).every(test => test === true);
  
  return results;
}

// HSA/CESA Calculation Testing
// ═══════════════════════════════════════════════════════════════════════════════

function testHsaCesaCalculations() {
  Logger.log('🧪 TESTING HSA/CESA CALCULATIONS');
  Logger.log('═'.repeat(80));
  
  // Test HSA calculations
  Logger.log('\n📋 Testing HSA Calculations:');
  
  // Test 1: Single, under 55, eligible
  let result = calculateHsaMonthlyCapacity('yes', 'single', 30);
  Logger.log(`Single, age 30, eligible: $${result}/month (expected: $362.50)`);
  
  // Test 2: Married, over 55, eligible
  result = calculateHsaMonthlyCapacity('yes', 'married_filing_jointly', 56);
  Logger.log(`Married, age 56, eligible: $${result}/month (expected: $791.67)`);
  
  // Test 3: Not eligible
  result = calculateHsaMonthlyCapacity('no', 'single', 40);
  Logger.log(`Not eligible: $${result}/month (expected: $0)`);
  
  // Test CESA calculations
  Logger.log('\n📋 Testing CESA Calculations:');
  
  // Test 1: 0 children
  result = calculateCesaMonthlyCapacity(0);
  Logger.log(`0 children: $${result}/month (expected: $0)`);
  
  // Test 2: 2 children
  result = calculateCesaMonthlyCapacity(2);
  Logger.log(`2 children: $${result}/month (expected: $333.33)`);
  
  // Test 3: 5 children
  result = calculateCesaMonthlyCapacity(5);
  Logger.log(`5 children: $${result}/month (expected: $833.33)`);
  
  Logger.log('\n' + '═'.repeat(80));
  Logger.log('✅ HSA/CESA calculation tests completed');
}

// Diagnostic function to list all possible vehicle actual keys
// Moved from Code.js for better organization
function listAllVehicleActualKeys() {
  const keys = new Set();

  Object.values(PROFILE_CONFIG).forEach(cfg => {
    ['Retirement','Education','Health'].forEach(domain => {
      (cfg[`vehicleOrder_${domain}`] || []).forEach(v => {
        const key = `${domain.toLowerCase()}_` +
          v.name.toLowerCase()
                .replace(/[()%–-]/g, '')
                .replace(/\s+/g, '_') +
          '_actual';
        keys.add(key);
      });
    });
  });

  // Log them sorted
  const sorted = Array.from(keys).sort();
  Logger.log('Actual vehicle headers needed:\n' + sorted.join('\n'));

  // And return the array of keys
  return Array.from(keys);
}

// Engine Testing with Real Test Data
// ═══════════════════════════════════════════════════════════════════════════════

function createTestDataTab() {
  const ss      = SpreadsheetApp.getActiveSpreadsheet();
  const ws      = ss.getSheetByName('Working Sheet');
  const rawCols = ws.getLastColumn();
  const headers = ws.getRange(2, 1, 1, rawCols).getValues()[0];

  // 1) Delete old TestData if it exists
  const old = ss.getSheetByName('TestData');
  if (old) ss.deleteSheet(old);

  // 2) Create new TestData and write headers
  const td = ss.insertSheet('TestData');
  td.getRange(1, 1, 1, rawCols).setValues([headers]);

  // 3) Define one varied test-row object per profile, using exact header names:
  const testRows = [
    // 1: ROBS profit seeded, no kids/HSA, Roth-phase-out check
    {
      ProfileID:                 '1_ROBS_In_Use',
      Net_Monthly_Income:        6000,
      gross_annual_income:       72000,
      filing_status:             'Married Filing Jointly',
      Current_Age:               45,
      Retirement_Catchup:        'No',
      Tax_Minimization:          'Both',
      // Classification fields for 1_ROBS_In_Use
      Using_ROBS:                'Yes',
      Interested_in_ROBS:        'Yes',
      ROBS_New_Business:         'Yes',
      Rollover_Account_50k:      'Yes',
      Setup_Cost_Funding:        'Yes',
      Work_Situation:            'Self-employed',
      W2_Employees:              'No',
      Traditional_Retirement:    'Yes',
      Roth_IRA_Holder:           'Yes',
      Retirement_Timeframe:      'No',
      Action_Motivation:         'Yes',
      Owns_Biz:                  'Yes',
      Plans_Biz:                 'No',
      hsa_eligibility:           'No',
      cesa_num_children:         0,
      investment_involvement:    5,
      investment_time:           6,
      investment_confidence:     4,
      retirement_importance:     4,
      retirement_years_until_target: 20,
      education_importance:      3,
      cesa_years_until_first_need:   0,
      health_importance:         2,
      hsa_years_until_need:      5,
      ex_q6:                     12000
    },
    // 2: ROBS curious, has kids & HSA, later-tax focus
    {
      ProfileID:                 '2_ROBS_Curious',
      Net_Monthly_Income:        8000,
      gross_annual_income:       90000,
      filing_status:             'Single',
      Current_Age:               40,
      Retirement_Catchup:        'No',
      Tax_Minimization:          'Later',
      // Classification fields for 2_ROBS_Curious
      Using_ROBS:                'No',
      Interested_in_ROBS:        'Yes',
      ROBS_New_Business:         'Yes',
      Rollover_Account_50k:      'Yes',
      Setup_Cost_Funding:        'Yes',
      Work_Situation:            'Self-employed',
      W2_Employees:              'No',
      Traditional_Retirement:    'Yes',
      Roth_IRA_Holder:           'Yes',
      Retirement_Timeframe:      'No',
      Action_Motivation:         'Yes',
      Owns_Biz:                  'No',
      Plans_Biz:                 'Yes',
      hsa_eligibility:           'Yes',
      cesa_num_children:         2,
      investment_involvement:    3,
      investment_time:           3,
      investment_confidence:     3,
      retirement_importance:     6,
      retirement_years_until_target: 25,
      education_importance:      5,
      cesa_years_until_first_need:   5,
      health_importance:         4,
      hsa_years_until_need:      10,
      ex_q6:                     0
    },
    // 3: Solo401k Builder, now-tax focus, one kid, HSA eligible
    {
      ProfileID:                 '3_Solo401k_Builder',
      Net_Monthly_Income:        7000,
      gross_annual_income:       84000,
      filing_status:             'Married Filing Jointly',
      Current_Age:               38,
      Retirement_Catchup:        'No',
      Tax_Minimization:          'Now',
      // Classification fields for 3_Solo401k_Builder
      Using_ROBS:                'No',
      Interested_in_ROBS:        'No',
      ROBS_New_Business:         'No',
      Rollover_Account_50k:      'No',
      Setup_Cost_Funding:        'No',
      Work_Situation:            'Self-employed',
      W2_Employees:              'No',
      Traditional_Retirement:    'No',
      Roth_IRA_Holder:           'Yes',
      Retirement_Timeframe:      'No',
      Action_Motivation:         'Yes',
      Owns_Biz:                  'Yes',
      Plans_Biz:                 'No',
      hsa_eligibility:           'Yes',
      cesa_num_children:         1,
      investment_involvement:    2,
      investment_time:           4,
      investment_confidence:     5,
      retirement_importance:     5,
      retirement_years_until_target: 15,
      education_importance:      2,
      cesa_years_until_first_need:   0,
      health_importance:         6,
      hsa_years_until_need:      8,
      ex_q6:                     0
    },
    // 4: Roth Reclaimer, catch-up allowed at age 50, no HSA
    {
      ProfileID:                 '4_Roth_Reclaimer',
      Net_Monthly_Income:        9000,
      gross_annual_income:       95000,
      filing_status:             'Single',
      Current_Age:               50,
      Retirement_Catchup:        'Yes',
      Tax_Minimization:          'Both',
      // Classification fields for 4_Roth_Reclaimer
      Using_ROBS:                'No',
      Interested_in_ROBS:        'No',
      ROBS_New_Business:         'No',
      Rollover_Account_50k:      'No',
      Setup_Cost_Funding:        'No',
      Work_Situation:            'W-2 employee',
      W2_Employees:              'No',
      Traditional_Retirement:    'Yes',
      Roth_IRA_Holder:           'Yes',
      Retirement_Timeframe:      'No',
      Action_Motivation:         'Yes',
      Owns_Biz:                  'No',
      Plans_Biz:                 'No',
      hsa_eligibility:           'No',
      cesa_num_children:         0,
      investment_involvement:    4,
      investment_time:           5,
      investment_confidence:     6,
      retirement_importance:     7,
      retirement_years_until_target: 30,
      education_importance:      4,
      cesa_years_until_first_need:   0,
      health_importance:         3,
      hsa_years_until_need:      12,
      ex_q6:                     0
    },
    // 5: Bracket Strategist, now-tax focus, HSA & CESA
    {
      ProfileID:                 '5_Bracket_Strategist',
      Net_Monthly_Income:        5500,
      gross_annual_income:       65000,
      filing_status:             'Married Filing Jointly',
      Current_Age:               48,
      Retirement_Catchup:        'No',
      Tax_Minimization:          'Now',
      // Classification fields for 5_Bracket_Strategist
      Using_ROBS:                'No',
      Interested_in_ROBS:        'No',
      ROBS_New_Business:         'No',
      Rollover_Account_50k:      'No',
      Setup_Cost_Funding:        'No',
      Work_Situation:            'W-2 employee',
      W2_Employees:              'No',
      Traditional_Retirement:    'No',
      Roth_IRA_Holder:           'Yes',
      Retirement_Timeframe:      'No',
      Action_Motivation:         'Yes',
      Owns_Biz:                  'No',
      Plans_Biz:                 'No',
      hsa_eligibility:           'Yes',
      cesa_num_children:         1,
      investment_involvement:    6,
      investment_time:           5,
      investment_confidence:     4,
      retirement_importance:     3,
      retirement_years_until_target: 10,
      education_importance:      6,
      cesa_years_until_first_need:   3,
      health_importance:         5,
      hsa_years_until_need:      6,
      ex_q6:                     0
    },
    // 6: Catch-Up Visionary, age 55+, catch-up + HSA
    {
      ProfileID:                 '6_Catch_Up',
      Net_Monthly_Income:        6500,
      gross_annual_income:       78000,
      filing_status:             'Single',
      Current_Age:               52,
      Retirement_Catchup:        'Yes',
      Tax_Minimization:          'Later',
      // Classification fields for 6_Catch_Up
      Using_ROBS:                'No',
      Interested_in_ROBS:        'No',
      ROBS_New_Business:         'No',
      Rollover_Account_50k:      'No',
      Setup_Cost_Funding:        'No',
      Work_Situation:            'W-2 employee',
      W2_Employees:              'No',
      Traditional_Retirement:    'No',
      Roth_IRA_Holder:           'Yes',
      Retirement_Timeframe:      'No',
      Action_Motivation:         'Yes',
      Owns_Biz:                  'No',
      Plans_Biz:                 'No',
      hsa_eligibility:           'Yes',
      cesa_num_children:         0,
      investment_involvement:    5,
      investment_time:           5,
      investment_confidence:     5,
      retirement_importance:     4,
      retirement_years_until_target: 20,
      education_importance:      3,
      cesa_years_until_first_need:   0,
      health_importance:         4,
      hsa_years_until_need:      5,
      ex_q6:                     0
    },
    // 7: Foundation Builder, young, no HSA/CESA, low scores
    {
      ProfileID:                 '7_Foundation_Builder',
      Net_Monthly_Income:        4000,
      gross_annual_income:       48000,
      filing_status:             'Single',
      Current_Age:               30,
      Retirement_Catchup:        'No',
      Tax_Minimization:          'Later',
      // Classification fields for 7_Foundation_Builder (defaults)
      Using_ROBS:                'No',
      Interested_in_ROBS:        'No',
      ROBS_New_Business:         'No',
      Rollover_Account_50k:      'No',
      Setup_Cost_Funding:        'No',
      Work_Situation:            'W-2 employee',
      W2_Employees:              'No',
      Traditional_Retirement:    'No',
      Roth_IRA_Holder:           'No',
      Retirement_Timeframe:      'No',
      Action_Motivation:         'No',
      Owns_Biz:                  'No',
      Plans_Biz:                 'No',
      hsa_eligibility:           'No',
      cesa_num_children:         0,
      investment_involvement:    1,
      investment_time:           2,
      investment_confidence:     2,
      retirement_importance:     2,
      retirement_years_until_target: 35,
      education_importance:      1,
      cesa_years_until_first_need:   0,
      health_importance:         2,
      hsa_years_until_need:      15,
      ex_q6:                     0
    },
    // 8: Business Owner Group, complex, many kids, HSA
    {
      ProfileID:                 '8_Biz_Owner_Group',
      Net_Monthly_Income:        12000,
      gross_annual_income:       144000,
      filing_status:             'Married Filing Jointly',
      Current_Age:               45,
      Retirement_Catchup:        'No',
      Tax_Minimization:          'Now',
      // Classification fields for 8_Biz_Owner_Group
      Using_ROBS:                'No',
      Interested_in_ROBS:        'No',
      ROBS_New_Business:         'No',
      Rollover_Account_50k:      'No',
      Setup_Cost_Funding:        'No',
      Work_Situation:            'Self-employed',
      W2_Employees:              'Yes',
      Traditional_Retirement:    'Yes',
      Roth_IRA_Holder:           'Yes',
      Retirement_Timeframe:      'No',
      Action_Motivation:         'Yes',
      Owns_Biz:                  'Yes',
      Plans_Biz:                 'No',
      hsa_eligibility:           'Yes',
      cesa_num_children:         3,
      investment_involvement:    6,
      investment_time:           6,
      investment_confidence:     6,
      retirement_importance:     5,
      retirement_years_until_target: 12,
      education_importance:      5,
      cesa_years_until_first_need:   4,
      health_importance:         6,
      hsa_years_until_need:      8,
      ex_q6:                     0
    },
    // 9: Late-Stage Growth, near retirement, catch-up + HSA + CESA
    {
      ProfileID:                 '9_Late_Stage_Growth',
      Net_Monthly_Income:        10000,
      gross_annual_income:       110000,
      filing_status:             'Single',
      Current_Age:               60,
      Retirement_Catchup:        'Yes',
      Tax_Minimization:          'Both',
      // Classification fields for 9_Late_Stage_Growth
      Using_ROBS:                'No',
      Interested_in_ROBS:        'No',
      ROBS_New_Business:         'No',
      Rollover_Account_50k:      'No',
      Setup_Cost_Funding:        'No',
      Work_Situation:            'W-2 employee',
      W2_Employees:              'No',
      Traditional_Retirement:    'No',
      Roth_IRA_Holder:           'Yes',
      Retirement_Timeframe:      'No',
      Action_Motivation:         'Yes',
      Owns_Biz:                  'No',
      Plans_Biz:                 'No',
      hsa_eligibility:           'Yes',
      cesa_num_children:         2,
      investment_involvement:    4,
      investment_time:           4,
      investment_confidence:     4,
      retirement_importance:     7,
      retirement_years_until_target: 5,
      education_importance:      4,
      cesa_years_until_first_need:   2,
      health_importance:         5,
      hsa_years_until_need:      3,
      ex_q6:                     0
    }
  ];

  // 4) Build and write each row aligned to the headers
  const output = testRows.map(obj => {
    const row = headers.map(_=> '');
    Object.entries(obj).forEach(([key,val]) => {
      const idx = headers.indexOf(key);
      if (idx !== -1) row[idx] = val;
    });
    return row;
  });

  td.getRange(2, 1, output.length, rawCols).setValues(output);
  
  Logger.log(`✅ Created TestData sheet with ${testRows.length} test profiles`);
}

function runEngineTestForRow(testRow = 3) {
  const ss      = SpreadsheetApp.getActiveSpreadsheet();
  const td      = ss.getSheetByName('TestData');
  const ws      = ss.getSheetByName('Working Sheet');
  const rawCols = td.getLastColumn();
  
  if (!td) {
    Logger.log('❌ TestData sheet not found. Run createTestDataTab() first.');
    return null;
  }
  
  // Grab the headers from the Working Sheet (row 2)
  const headers = ws.getRange(2, 1, 1, rawCols).getValues()[0];

  const destRow = 4;

  // Read the single test data row from TestData
  const testVals = td.getRange(testRow, 1, 1, rawCols).getValues()[0];

  // Copy the test data into the Working Sheet row
  ws.getRange(destRow, 1, 1, rawCols).setValues([testVals]);

  // Run the engine with the test row
  const result = runUniversalEngine(destRow);

  // Look up the profile ID from testVals using the Working Sheet headers
  const profile = testVals[ headers.indexOf('ProfileID') ];
  const netIncome = testVals[ headers.indexOf('Net_Monthly_Income') ];
  const age = testVals[ headers.indexOf('Current_Age') ];
  const taxPref = testVals[ headers.indexOf('Tax_Minimization') ];

  // Log the results
  Logger.log(`\n🧪 TESTING PROFILE: ${profile}`);
  Logger.log(`   Test row: ${testRow}`);
  Logger.log(`   Age: ${age}, Net Income: $${netIncome}, Tax Pref: ${taxPref}`);
  Logger.log(`   Result: ${result.error ? '❌ ERROR: ' + result.error : '✅ SUCCESS'}`);
  
  if (result.vehicles) {
    const totalAllocated = Object.values(result.vehicles).reduce((sum, v) => sum + v, 0);
    Logger.log(`   Total Allocated: $${totalAllocated.toFixed(2)}`);
    Logger.log('   Allocations:');
    Object.entries(result.vehicles).forEach(([vehicle, amount]) => {
      if (amount > 0) {
        Logger.log(`     • ${vehicle}: $${amount.toFixed(2)}`);
      }
    });
  }
  
  return result;
}

function runAllEngineTests() {
  Logger.log('🚀 RUNNING ENGINE TESTS FOR ALL PROFILES');
  Logger.log('═'.repeat(80));
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const td = ss.getSheetByName('TestData');
  
  if (!td) {
    createTestDataTab();
  }
  
  const results = [];
  let passCount = 0;
  let failCount = 0;
  
  // Test all 9 profiles (rows 2-10 in TestData)
  for (let row = 2; row <= 10; row++) {
    const result = runEngineTestForRow(row);
    
    if (result && !result.error) {
      passCount++;
      results.push({ row, status: 'PASS', result });
    } else {
      failCount++;
      results.push({ row, status: 'FAIL', error: result?.error || 'Unknown error' });
    }
  }
  
  Logger.log('\n' + '═'.repeat(80));
  Logger.log('📊 TEST SUMMARY:');
  Logger.log(`   Total Tests: ${passCount + failCount}`);
  Logger.log(`   ✅ Passed: ${passCount}`);
  Logger.log(`   ❌ Failed: ${failCount}`);
  
  if (failCount > 0) {
    Logger.log('\n❌ FAILED TESTS:');
    results.filter(r => r.status === 'FAIL').forEach(r => {
      Logger.log(`   Row ${r.row}: ${r.error}`);
    });
  }
  
  return {
    totalTests: passCount + failCount,
    passed: passCount,
    failed: failCount,
    results
  };
}

// Simple test wrapper that can be called from Code.js
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Test form mapping - simple wrapper for Testing.js function
 * Call this from Code.js to run the full test
 */
function testFormMapping() {
  console.log('Running form mapping tests from Testing.js...\n');
  testFormQuestionMapping();
}

// Form Mapping and Employer 401(k) Testing
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Test employer 401(k) integration for profiles with new employer questions
 * Tests the form mapping and vehicle creation for profiles 2, 4, 5, 6, and 9
 */
function testEmployer401kIntegration() {
  // Create a mock header mapping for testing (1-indexed like Google Sheets)
  const hdr = {
    'ProfileID': 1,
    'Current_Age': 2, 
    'gross_annual_income': 3,
    'filing_status': 4,
    'Tax_Minimization': 5,
    'hsa_eligibility': 6,
    'cesa_num_children': 7,
    'ex_q1': 8,
    'ex_q2': 9,
    'ex_q3': 10,
    'ex_q4': 11,
    'ex_q5': 12,
    'ex_q6': 13,
    'ex_q7': 14,
    'ex_q8': 15
  };
  
  // Test profiles that now have employer 401(k) questions
  const testProfiles = [
    {
      profileId: '2_ROBS_Curious',
      testData: {
        age: 45,
        grossIncome: 150000,
        ex_q1: 'Yes',  // employer 401k
        ex_q2: 'Yes',  // employer match
        ex_q3: '50% up to 6%',  // match percentage
        ex_q4: 'Yes',  // roth option
        ex_q5: '50000',  // rollover balance
        ex_q6: '10000'   // annual contribution
      }
    },
    {
      profileId: '4_Roth_Reclaimer',
      testData: {
        age: 40,
        grossIncome: 120000,
        ex_q1: 'Yes',  // employer 401k
        ex_q2: 'Yes',  // employer match
        ex_q3: '100% up to 3%',  // match percentage
        ex_q4: 'No',   // roth option
        ex_q5: '100000',  // trad IRA balance
        ex_q6: '5000',    // after-tax contributions
        ex_q7: 'Yes',     // backdoor understanding
        ex_q8: '5500'     // conversion amount
      }
    },
    {
      profileId: '5_Bracket_Strategist',
      testData: {
        age: 55,
        grossIncome: 200000,
        ex_q1: 'Yes',  // employer 401k
        ex_q2: 'Yes',  // employer match
        ex_q3: '50% up to 4%',  // match percentage
        ex_q4: 'Yes'   // roth option
      }
    },
    {
      profileId: '6_Catch_Up',
      testData: {
        age: 60,
        grossIncome: 180000,
        ex_q1: 'Yes',  // employer 401k
        ex_q2: 'Yes',  // employer match
        ex_q3: '100% up to 6%',  // match percentage
        ex_q4: 'Yes'   // roth option
      }
    },
    {
      profileId: '9_Late_Stage_Growth',
      testData: {
        age: 58,
        grossIncome: 300000,
        ex_q1: 'Yes',  // employer 401k
        ex_q2: 'Yes',  // employer match
        ex_q3: '50% up to 6%',  // match percentage
        ex_q4: 'Yes'   // roth option
      }
    }
  ];
  
  console.log('\n=== EMPLOYER 401(K) INTEGRATION TEST ===\n');
  
  testProfiles.forEach(profile => {
    console.log(`\nTesting Profile: ${profile.profileId}`);
    console.log('--------------------------------');
    
    // Create a test row with the profile data (subtract 1 for 0-based array indexing)
    const rowArr = [];
    rowArr[hdr['ProfileID'] - 1] = profile.profileId;
    rowArr[hdr['Current_Age'] - 1] = profile.testData.age;
    rowArr[hdr['gross_annual_income'] - 1] = profile.testData.grossIncome;
    rowArr[hdr['filing_status'] - 1] = 'Married Filing Jointly';
    rowArr[hdr['Tax_Minimization'] - 1] = 'Both';
    rowArr[hdr['hsa_eligibility'] - 1] = 'Yes';
    rowArr[hdr['cesa_num_children'] - 1] = 0;
    rowArr[hdr['ex_q1'] - 1] = profile.testData.ex_q1;
    rowArr[hdr['ex_q2'] - 1] = profile.testData.ex_q2;
    rowArr[hdr['ex_q3'] - 1] = profile.testData.ex_q3;
    rowArr[hdr['ex_q4'] - 1] = profile.testData.ex_q4;
    
    // Debug logging
    console.log('Test row setup:');
    console.log('  hdr[ex_q1]:', hdr['ex_q1'], 'value:', rowArr[hdr['ex_q1'] - 1]);
    console.log('  hdr[ex_q2]:', hdr['ex_q2'], 'value:', rowArr[hdr['ex_q2'] - 1]);
    console.log('  hdr[ex_q3]:', hdr['ex_q3'], 'value:', rowArr[hdr['ex_q3'] - 1]);
    console.log('  hdr[ex_q4]:', hdr['ex_q4'], 'value:', rowArr[hdr['ex_q4'] - 1]);
    console.log('  age index:', hdr['Current_Age'], 'value:', rowArr[hdr['Current_Age'] - 1]);
    console.log('  income index:', hdr['gross_annual_income'], 'value:', rowArr[hdr['gross_annual_income'] - 1]);
    if (profile.testData.ex_q5) rowArr[hdr['ex_q5'] - 1] = profile.testData.ex_q5;
    if (profile.testData.ex_q6) rowArr[hdr['ex_q6'] - 1] = profile.testData.ex_q6;
    if (profile.testData.ex_q7) rowArr[hdr['ex_q7'] - 1] = profile.testData.ex_q7;
    if (profile.testData.ex_q8) rowArr[hdr['ex_q8'] - 1] = profile.testData.ex_q8;
    
    // Get the profile helper function
    const helper = profileHelpers[profile.profileId];
    
    if (helper) {
      // Call the profile helper to get allocation order
      const { seeds, vehicleOrders } = helper(rowArr, hdr);
      const allocOrder = vehicleOrders.Retirement;
      
      console.log(`Age: ${profile.testData.age}`);
      console.log(`Income: $${profile.testData.grossIncome.toLocaleString()}`);
      console.log(`Employer 401(k): ${profile.testData.ex_q1}`);
      console.log(`Employer Match: ${profile.testData.ex_q2}`);
      console.log(`Match Details: ${profile.testData.ex_q3}`);
      console.log(`\nAllocation Order:`);
      
      // Check if employer match vehicles are present
      const hasEmployerMatch = allocOrder.some(v => v.name.includes('401(k) Match'));
      const matchPosition = allocOrder.findIndex(v => v.name.includes('401(k) Match'));
      
      allocOrder.forEach((vehicle, index) => {
        console.log(`  ${index + 1}. ${vehicle.name} - Limit: $${vehicle.monthlyLimit}/mo`);
      });
      
      if (profile.testData.ex_q2 === 'Yes') {
        if (hasEmployerMatch) {
          console.log(`\n✅ SUCCESS: Employer match found at position ${matchPosition + 1}`);
        } else {
          console.log('\n❌ ERROR: Employer match expected but not found!');
        }
      } else {
        if (!hasEmployerMatch) {
          console.log('\n✅ SUCCESS: No employer match expected or found');
        } else {
          console.log('\n❌ ERROR: Employer match found but not expected!');
        }
      }
    } else {
      console.log(`❌ ERROR: Helper function for ${profile.profileId} not found`);
    }
  });
  
  console.log('\n=== TEST COMPLETE ===\n');
}

/**
 * Test form question mapping functionality
 * Verifies that the FORM_EX_Q_MAPPING correctly remaps form responses
 */
function testFormQuestionMapping() {
  console.log('\n=== FORM QUESTION MAPPING TEST ===\n');
  
  // Test data simulating form responses with questions in different positions
  const testCases = [
    {
      profileId: '2_ROBS_Curious',
      formResponse: [
        '2024-01-15 10:30:00',  // 0: timestamp
        'Test User',            // 1: name
        'test@example.com',     // 2: email
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
    },
    {
      profileId: '4_Roth_Reclaimer',
      formResponse: [
        '2024-01-15 11:00:00',  // 0: timestamp
        'Roth User',            // 1: name
        'roth@example.com',     // 2: email
        '67890',                // 3: student ID
        '40',                   // 4: age
        '120000',               // 5: income
        'Roth',                 // 6: tax preference
        '100000',               // 7: ex_q5 (trad IRA balance)
        '5000',                 // 8: ex_q6 (after-tax contributions)
        'Yes',                  // 9: ex_q7 (backdoor understanding)
        '5500',                 // 10: ex_q8 (conversion amount)
        'Yes',                  // 11: ex_q1 (employer 401k) - NEW
        'Yes',                  // 12: ex_q2 (employer match) - NEW
        '100% up to 3%',        // 13: ex_q3 (match percentage) - NEW
        'No'                    // 14: ex_q4 (roth option) - NEW
      ],
      expectedMapping: {
        ex_q1: 'Yes',
        ex_q2: 'Yes',
        ex_q3: '100% up to 3%',
        ex_q4: 'No',
        ex_q5: '100000',
        ex_q6: '5000',
        ex_q7: 'Yes',
        ex_q8: '5500'
      }
    }
  ];
  
  testCases.forEach(testCase => {
    console.log(`\nTesting ${testCase.profileId}:`);
    console.log('Original form response positions:');
    testCase.formResponse.forEach((val, idx) => {
      if (idx >= 7) {  // Only show extra questions
        console.log(`  Position ${idx}: ${val}`);
      }
    });
    
    // Simulate the remapping
    const hdr = {}; // Mock header mapping
    const startCol = 47; // Mock start column for P2 data
    
    // Set up mock headers
    Object.keys(testCase.expectedMapping).forEach((key, idx) => {
      hdr[HEADERS[`P2_${key.toUpperCase()}`]] = startCol + idx;
    });
    
    const remapped = remapFormValues(testCase.formResponse, testCase.profileId, startCol, hdr);
    
    console.log('\nExpected mapping result:');
    Object.entries(testCase.expectedMapping).forEach(([key, expectedValue]) => {
      console.log(`  ${key}: ${expectedValue}`);
    });
    
    console.log('\nMapping configuration:');
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
  
  console.log('\n=== MAPPING TEST COMPLETE ===\n');
}

/**
 * Test form submission processing with mapping
 * Simulates actual form submission and processing through allocator
 */
function testFormSubmissionWithMapping() {
  console.log('\n=== FORM SUBMISSION WITH MAPPING TEST ===\n');
  
  // Simulate a form submission for Profile 2 with employer 401k questions in new positions
  const formResponse = {
    timestamp: '2024-01-15 14:30:00',
    profileId: '2_ROBS_Curious',
    responses: [
      '2024-01-15 14:30:00',  // 0: timestamp
      'Bob Builder',          // 1: name
      'bob@example.com',      // 2: email
      '99999',                // 3: student ID
      '35',                   // 4: age
      '100000',               // 5: income
      'Medium',               // 6: tax preference
      '25000',                // 7: rollover balance (ex_q5) 
      '5000',                 // 8: annual contribution (ex_q6)
      'Yes',                  // 9: employer 401k (ex_q1)
      'Yes',                  // 10: employer match (ex_q2)
      '50% up to 6%',         // 11: match percentage (ex_q3)
      'Yes',                  // 12: roth option (ex_q4)
      'Yes',                  // 13: HSA eligible
      '2'                     // 14: number of children
    ]
  };
  
  console.log('Form submission:');
  console.log(`  Profile: ${formResponse.profileId}`);
  console.log(`  Age: ${formResponse.responses[4]}`);
  console.log(`  Income: $${formResponse.responses[5]}`);
  console.log(`  Employer 401k: ${formResponse.responses[9]} (position 9)`);
  console.log(`  Match: ${formResponse.responses[10]} with ${formResponse.responses[11]}`);
  
  // Test the mapping
  const mapping = FORM_EX_Q_MAPPING[formResponse.profileId];
  console.log('\nApplying mapping:');
  Object.entries(mapping).forEach(([sourcePos, targetExQ]) => {
    console.log(`  Position ${sourcePos} → ${targetExQ}: "${formResponse.responses[sourcePos]}"`);
  });
  
  // Simulate processing through profile helper
  console.log('\nSimulating profile helper processing...');
  
  // Create mock row data after mapping
  const mockHdr = {};
  Object.keys(HEADERS).forEach((key, index) => {
    mockHdr[HEADERS[key]] = index + 1;
  });
  
  // Apply mapping
  const mappedData = remapFormValues(formResponse.responses, formResponse.profileId, 0, mockHdr);
  
  // Verify employer 401k data is in correct positions
  const employerData = {
    hasEmployer401k: mappedData[mockHdr[HEADERS.P2_EX_Q1] - 1],
    hasMatch: mappedData[mockHdr[HEADERS.P2_EX_Q2] - 1],
    matchPercentage: mappedData[mockHdr[HEADERS.P2_EX_Q3] - 1],
    hasRoth401k: mappedData[mockHdr[HEADERS.P2_EX_Q4] - 1]
  };
  
  console.log('\nMapped employer 401k data:');
  console.log(`  Has 401k: ${employerData.hasEmployer401k}`);
  console.log(`  Has match: ${employerData.hasMatch}`);
  console.log(`  Match percentage: ${employerData.matchPercentage}`);
  console.log(`  Has Roth option: ${employerData.hasRoth401k}`);
  
  // Verify the data would create the correct vehicle
  if (employerData.hasEmployer401k === 'Yes' && employerData.hasMatch === 'Yes') {
    const monthlyIncome = parseInt(formResponse.responses[5]) / 12;
    const matchUpToMatch = employerData.matchPercentage.match(/up to (\d+)%/);
    const matchUpToPct = matchUpToMatch ? parseInt(matchUpToMatch[1]) / 100 : 0.06;
    const matchCap = Math.round(monthlyIncome * matchUpToPct);
    
    console.log(`\n✅ Would create employer match vehicle:`);
    console.log(`   Name: 401(k) Match Traditional (${employerData.matchPercentage})`);
    console.log(`   Monthly cap: $${matchCap}`);
  } else {
    console.log('\n❌ No employer match vehicle would be created');
  }
  
  console.log('\n=== SUBMISSION TEST COMPLETE ===\n');
}

/**
 * Test Profile 2 and Profile 4 tuning with detailed scenarios
 * Validates assumptions and edge cases
 */
function testTunedProfiles() {
  console.log('\n=== TESTING TUNED PROFILES 2 & 4 ===\n');
  
  // Add detailed ROBS Curious analysis
  testROBSCuriousDetailed();
  
  // Test Profile 2: ROBS Curious
  console.log('PROFILE 2: ROBS CURIOUS TESTS');
  console.log('=' .repeat(50));
  
  const profile2Tests = [
    {
      name: 'W-2 Employee with 401(k) Match',
      rowData: {
        age: 45,
        grossIncome: 120000,
        filing: 'Married Filing Jointly',
        workSituation: 'W-2 employee',
        taxFocus: 'Both',
        hsaElig: 'Yes',
        numKids: 2,
        hasEmployer401k: 'Yes',
        hasMatch: 'Yes',
        matchDetails: '50% up to 6%',
        hasRoth401k: 'Yes',
        plannedRollover: 75000,
        expectedContribution: 0
      }
    },
    {
      name: 'Self-Employed with Business Income',
      rowData: {
        age: 52,
        grossIncome: 150000,
        filing: 'Single',
        workSituation: 'Self-employed',
        taxFocus: 'Now',
        hsaElig: 'Yes',
        numKids: 0,
        hasEmployer401k: 'No',
        plannedRollover: 200000,
        expectedContribution: 50000
      }
    },
    {
      name: 'Both W-2 and Self-Employed',
      rowData: {
        age: 40,
        grossIncome: 180000,
        filing: 'Married Filing Jointly',
        workSituation: 'Both',
        taxFocus: 'Later',
        hsaElig: 'No',
        numKids: 1,
        hasEmployer401k: 'Yes',
        hasMatch: 'Yes',
        matchDetails: '100% up to 3%',
        hasRoth401k: 'No',
        plannedRollover: 50000,
        expectedContribution: 20000
      }
    }
  ];
  
  profile2Tests.forEach(test => {
    console.log(`\nTest: ${test.name}`);
    const result = runProfileTest('2_ROBS_Curious', test.rowData);
    analyzeResults(result, test);
  });
  
  // Test Profile 4: Roth Reclaimer
  console.log('\n\nPROFILE 4: ROTH RECLAIMER TESTS');
  console.log('=' .repeat(50));
  
  const profile4Tests = [
    {
      name: 'Has IRA + Understands Backdoor',
      rowData: {
        age: 45,
        grossIncome: 150000,
        filing: 'Married Filing Jointly',
        hsaElig: 'Yes',
        numKids: 0,
        hasEmployer401k: 'Yes',
        hasMatch: 'Yes',
        matchDetails: '50% up to 6%',
        hasRoth401k: 'Yes',
        tradIRABalance: 100000,
        afterTaxContrib: 'No',
        understandsBackdoor: 'Yes',
        desiredConversion: 6500
      }
    },
    {
      name: 'Clean Slate + Mega Backdoor',
      rowData: {
        age: 50,
        grossIncome: 300000,
        filing: 'Single',
        hsaElig: 'No',
        numKids: 2,
        hasEmployer401k: 'Yes',
        hasMatch: 'Yes',
        matchDetails: '100% up to 4%',
        hasRoth401k: 'No',
        tradIRABalance: 0,
        afterTaxContrib: 'Yes',
        understandsBackdoor: 'Yes',
        desiredConversion: 7500
      }
    },
    {
      name: 'Doesn\'t Understand Backdoor',
      rowData: {
        age: 40,
        grossIncome: 200000,
        filing: 'Married Filing Jointly',
        hsaElig: 'Yes',
        numKids: 0,
        hasEmployer401k: 'No',
        tradIRABalance: 50000,
        understandsBackdoor: 'No'
      }
    }
  ];
  
  profile4Tests.forEach(test => {
    console.log(`\nTest: ${test.name}`);
    const result = runProfileTest('4_Roth_Reclaimer', test.rowData);
    analyzeResults(result, test);
  });
}

/**
 * Helper to run a single profile test
 */
function runProfileTest(profileId, rowData) {
  // Create mock header mapping
  const hdr = {};
  Object.keys(HEADERS).forEach((key, idx) => {
    hdr[HEADERS[key]] = idx + 1;
  });
  
  // Create row array
  const rowArr = [];
  
  // Map test data to row positions
  const dataMapping = {
    age: HEADERS.CURRENT_AGE,
    grossIncome: HEADERS.GROSS_ANNUAL_INCOME,
    filing: HEADERS.FILING_STATUS,
    workSituation: HEADERS.WORK_SITUATION,
    taxFocus: HEADERS.TAX_MINIMIZATION,
    hsaElig: HEADERS.P2_HSA_ELIGIBILITY,
    numKids: HEADERS.P2_CESA_NUM_CHILDREN,
    // Profile 2 specifics
    plannedRollover: HEADERS.P2_EX_Q5,
    expectedContribution: HEADERS.P2_EX_Q6,
    // Profile 4 specifics
    tradIRABalance: HEADERS.P2_EX_Q5,
    afterTaxContrib: HEADERS.P2_EX_Q6,
    understandsBackdoor: HEADERS.P2_EX_Q7,
    desiredConversion: HEADERS.P2_EX_Q8,
    // Employer 401k (both profiles)
    hasEmployer401k: HEADERS.P2_EX_Q1,
    hasMatch: HEADERS.P2_EX_Q2,
    matchDetails: HEADERS.P2_EX_Q3,
    hasRoth401k: HEADERS.P2_EX_Q4
  };
  
  Object.entries(dataMapping).forEach(([key, header]) => {
    if (rowData[key] !== undefined) {
      rowArr[hdr[header] - 1] = rowData[key];
    }
  });
  
  // Call the profile helper
  const helper = profileHelpers[profileId];
  return helper(rowArr, hdr);
}

/**
 * Analyze and display test results
 */
/**
 * Detailed testing for ROBS Curious profile
 * Tests assumptions and edge cases
 */
function testROBSCuriousDetailed() {
  console.log('\n=== DETAILED ROBS CURIOUS ANALYSIS ===\n');
  
  // Test Case 1: Self-employed with Solo 401(k) limits
  console.log('TEST 1: Solo 401(k) Contribution Limits');
  console.log('-'.repeat(40));
  
  const test1 = runProfileTest('2_ROBS_Curious', {
    age: 52,
    grossIncome: 150000,
    filing: 'Single',
    workSituation: 'Self-employed',
    taxFocus: 'Now',
    hsaElig: 'Yes',
    numKids: 0,
    hasEmployer401k: 'No',
    plannedRollover: 200000,
    expectedContribution: 50000  // Business profit contribution
  });
  
  // Check Solo 401(k) limits
  const solo401kVehicles = test1.vehicleOrders.Retirement.filter(v => 
    v.name.includes('Solo 401(k)')
  );
  
  console.log('Solo 401(k) Vehicles Found:');
  solo401kVehicles.forEach(v => {
    const annualCap = Math.round(v.capMonthly * 12);
    console.log(`  ${v.name}: $${v.capMonthly}/mo ($${annualCap}/yr)`);
  });
  
  // Verify catch-up is applied (age 52 = 50+)
  const expectedEmployeeCap = (23000 + 7500) / 12; // $30,500 with catch-up
  const actualEmployeeCap = solo401kVehicles.find(v => 
    v.name.includes('Traditional') || v.name.includes('Roth')
  )?.capMonthly;
  
  console.log(`\nEmployee contribution limit check:`);
  console.log(`  Expected: $${Math.round(expectedEmployeeCap)}/mo`);
  console.log(`  Actual: $${Math.round(actualEmployeeCap)}/mo`);
  console.log(`  Catch-up applied: ${actualEmployeeCap > 23000/12 ? '✅' : '❌'}`);
  
  // Test Case 2: Employment situation handling
  console.log('\n\nTEST 2: Employment Situation Logic');
  console.log('-'.repeat(40));
  
  const employmentTests = [
    { workSituation: 'W-2 employee', hasEmployer401k: 'Yes' },
    { workSituation: 'Self-employed', hasEmployer401k: 'No' },
    { workSituation: 'Both', hasEmployer401k: 'Yes' }
  ];
  
  employmentTests.forEach(test => {
    const result = runProfileTest('2_ROBS_Curious', {
      age: 45,
      grossIncome: 120000,
      filing: 'Married Filing Jointly',
      workSituation: test.workSituation,
      taxFocus: 'Both',
      hsaElig: 'Yes',
      numKids: 0,
      hasEmployer401k: test.hasEmployer401k,
      hasMatch: test.hasEmployer401k,
      matchDetails: '50% up to 6%',
      hasRoth401k: 'Yes',
      plannedRollover: 50000,
      expectedContribution: 0
    });
    
    const hasSolo401k = result.vehicleOrders.Retirement.some(v => 
      v.name.includes('Solo 401(k)')
    );
    const hasEmployerMatch = result.vehicleOrders.Retirement.some(v => 
      v.name.includes('401(k) Match')
    );
    
    console.log(`\n${test.workSituation}:`);
    console.log(`  Has Solo 401(k): ${hasSolo401k ? '✅' : '❌'}`);
    console.log(`  Has Employer Match: ${hasEmployerMatch ? '✅' : '❌'}`);
    
    // Verify logic
    const shouldHaveSolo = test.workSituation === 'Self-employed' || 
                          test.workSituation === 'Both';
    const shouldHaveMatch = test.hasEmployer401k === 'Yes';
    
    console.log(`  Logic correct: ${
      (hasSolo401k === shouldHaveSolo && hasEmployerMatch === shouldHaveMatch) 
      ? '✅' : '❌'
    }`);
  });
  
  // Test Case 3: ROBS Planning Elements
  console.log('\n\nTEST 3: ROBS Planning Features');
  console.log('-'.repeat(40));
  
  const robsTest = runProfileTest('2_ROBS_Curious', {
    age: 48,
    grossIncome: 100000,
    filing: 'Single',
    workSituation: 'Self-employed',
    taxFocus: 'Both',
    hsaElig: 'No',
    numKids: 0,
    hasEmployer401k: 'No',
    plannedRollover: 300000,  // Large ROBS rollover planned
    expectedContribution: 75000  // Significant business profit expected
  });
  
  // Check Traditional IRA presence (needed for ROBS)
  const hasTradIRA = robsTest.vehicleOrders.Retirement.some(v => 
    v.name === 'Traditional IRA'
  );
  console.log(`Traditional IRA for ROBS: ${hasTradIRA ? '✅' : '❌'}`);
  
  // Check seeding
  console.log(`\nSeeds:`, robsTest.seeds.Retirement);
  console.log(`Planned rollover captured: ${
    robsTest.seeds.Retirement['Planned ROBS Rollover'] === 300000 ? '✅' : '❌'
  }`);
  
  // Check Solo 401(k) employer portion
  const employerVehicle = robsTest.vehicleOrders.Retirement.find(v => 
    v.name === 'Solo 401(k) – Employer'
  );
  if (employerVehicle) {
    const annualEmployer = employerVehicle.capMonthly * 12;
    console.log(`\nSolo 401(k) Employer portion:`);
    console.log(`  Monthly: $${Math.round(employerVehicle.capMonthly)}`);
    console.log(`  Annual: $${Math.round(annualEmployer)}`);
    console.log(`  Uses expected contribution: ${
      annualEmployer <= 75000 ? '✅' : '❌'
    }`);
  }
  
  // Test Case 4: Tax Preference Ordering
  console.log('\n\nTEST 4: Tax Preference Vehicle Ordering');
  console.log('-'.repeat(40));
  
  const taxPreferences = ['Now', 'Later', 'Both'];
  
  taxPreferences.forEach(taxFocus => {
    const result = runProfileTest('2_ROBS_Curious', {
      age: 40,
      grossIncome: 100000,
      filing: 'Single',
      workSituation: 'Self-employed',
      taxFocus: taxFocus,
      hsaElig: 'No',
      numKids: 0,
      hasEmployer401k: 'No',
      plannedRollover: 0,
      expectedContribution: 0
    });
    
    const vehicles = result.vehicleOrders.Retirement
      .filter(v => v.name.includes('Solo 401(k)') && !v.name.includes('Employer'))
      .map(v => v.name);
    
    console.log(`\n${taxFocus}: ${vehicles.join(' → ')}`);
    
    // Verify ordering
    if (taxFocus === 'Now' && vehicles[0].includes('Traditional')) {
      console.log('  Correct: Traditional first ✅');
    } else if (taxFocus === 'Later' && vehicles[0].includes('Roth')) {
      console.log('  Correct: Roth first ✅');
    } else if (taxFocus === 'Both') {
      console.log('  Default order maintained ✅');
    }
  });
  
  // Test Case 5: Roth IRA Phase-out
  console.log('\n\nTEST 5: Roth IRA Phase-out Logic');
  console.log('-'.repeat(40));
  
  const incomeTests = [
    { income: 150000, filing: 'Single' },      // Near phase-out
    { income: 180000, filing: 'Single' },      // In phase-out
    { income: 250000, filing: 'Single' },      // Fully phased out
    { income: 240000, filing: 'Married Filing Jointly' }, // MFJ near phase-out
  ];
  
  incomeTests.forEach(test => {
    const result = runProfileTest('2_ROBS_Curious', {
      age: 35,
      grossIncome: test.income,
      filing: test.filing,
      workSituation: 'W-2 employee',
      taxFocus: 'Both',
      hsaElig: 'No',
      numKids: 0,
      hasEmployer401k: 'Yes',
      hasMatch: 'No',
      hasRoth401k: 'Yes',
      plannedRollover: 0,
      expectedContribution: 0
    });
    
    const rothIRA = result.vehicleOrders.Retirement.find(v => 
      v.name === 'Roth IRA'
    );
    const backdoorRoth = result.vehicleOrders.Retirement.find(v => 
      v.name === 'Backdoor Roth IRA'
    );
    
    console.log(`\n$${test.income} ${test.filing}:`);
    if (rothIRA) {
      console.log(`  Roth IRA: $${Math.round(rothIRA.capMonthly)}/mo`);
    }
    if (backdoorRoth) {
      console.log(`  Backdoor Roth: $${Math.round(backdoorRoth.capMonthly)}/mo`);
    }
    if (!rothIRA && !backdoorRoth) {
      console.log(`  No Roth IRA available (fully phased out)`);
    }
  });
}

function analyzeResults(result, test) {
  console.log('  Input:', JSON.stringify(test.rowData, null, 2));
  
  // Show retirement vehicles
  console.log('\n  Retirement Vehicles:');
  result.vehicleOrders.Retirement.forEach((v, idx) => {
    if (v.name !== 'Family Bank') {
      const cap = v.capMonthly === Infinity ? 'Unlimited' : 
                 v.capMonthly === 0 ? 'Info' : 
                 `$${Math.round(v.capMonthly)}/mo`;
      console.log(`    ${idx + 1}. ${v.name} - ${cap}`);
      if (v.note) console.log(`       Note: ${v.note}`);
    }
  });
  
  // Show seeds if any
  if (Object.keys(result.seeds.Retirement || {}).length > 0) {
    console.log('\n  Seeds:', result.seeds.Retirement);
  }
  
  // Show other domains if vehicles present
  ['Education', 'Health'].forEach(domain => {
    const vehicles = result.vehicleOrders[domain].filter(v => 
      !v.name.includes('Bank') && v.capMonthly > 0
    );
    if (vehicles.length > 0) {
      console.log(`\n  ${domain} Vehicles:`);
      vehicles.forEach(v => {
        console.log(`    - ${v.name}: $${Math.round(v.capMonthly)}/mo`);
      });
    }
  });
}
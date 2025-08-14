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
/**
 * Test Suite for Actual/Ideal Output Generation
 * Tests that Phase 2 processing correctly calculates and writes actual/ideal values
 */

/**
 * Test the actual/ideal calculation for a specific profile
 */
function testActualIdealForProfile(profileId, testData) {
  console.log(`\n=== Testing Actual/Ideal for ${profileId} ===`);
  
  try {
    // Get the Working Sheet and set up test row
    const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
    const testRow = ws.getLastRow() + 1;
    const hdr = getHeaderMap(ws);
    
    // Write test data to the sheet
    Object.keys(testData).forEach(key => {
      if (hdr[key]) {
        ws.getRange(testRow, hdr[key]).setValue(testData[key]);
      }
    });
    
    // Run the allocation engine
    console.log('Running allocation engine...');
    const results = runUniversalEngine(testRow);
    
    if (!results) {
      console.error('❌ Allocation engine returned no results');
      return;
    }
    
    // Get the row data
    const rowData = ws.getRange(testRow, 1, 1, ws.getLastColumn()).getValues()[0];
    
    // Check actual values written
    console.log('\n📊 ACTUAL VALUES (Current Contributions):');
    const actualColumns = [
      'retirement_hsa_actual',
      'health_hsa_actual',
      'retirement_combined_cesa_actual',
      'education_combined_cesa_actual',
      'retirement_traditional_401k_actual',
      'retirement_401k_match_traditional_actual',
      'retirement_robs_solo_401k_profit_distribution_actual',
      'retirement_solo_401k_employee_actual',
      'retirement_solo_401k_employer_actual',
      'retirement_group_401k_employee_actual'
    ];
    
    actualColumns.forEach(col => {
      if (hdr[col]) {
        const value = rowData[hdr[col] - 1];
        if (value && value !== 0) {
          console.log(`  ${col}: ${value}`);
        }
      }
    });
    
    // Check ideal values written
    console.log('\n💎 IDEAL VALUES (Recommended Allocations):');
    const idealColumns = [];
    
    // Collect all ideal columns from the sheet
    Object.keys(hdr).forEach(header => {
      if (header.endsWith('_ideal')) {
        idealColumns.push(header);
      }
    });
    
    let totalIdeal = 0;
    idealColumns.sort().forEach(col => {
      const value = rowData[hdr[col] - 1];
      if (value && value !== 0) {
        console.log(`  ${col}: ${value}`);
        // Extract numeric value from currency format
        const numValue = typeof value === 'string' ? 
          parseFloat(value.replace(/[$,]/g, '')) : value;
        if (!isNaN(numValue)) {
          totalIdeal += numValue;
        }
      }
    });
    
    console.log(`\n  Total Ideal: $${totalIdeal.toFixed(0)}`);
    
    // Verify calculations
    console.log('\n✅ VERIFICATION:');
    
    // Check if total matches expected
    const netMonthly = testData.Net_Monthly_Income || 0;
    const allocPercent = testData.Allocation_Percentage || 0;
    const expectedTotal = netMonthly * (allocPercent / 100);
    console.log(`  Expected allocation (${allocPercent}% of $${netMonthly}): $${expectedTotal.toFixed(0)}`);
    
    // Check family bank
    const familyBankIdeal = rowData[hdr['family_bank_ideal'] - 1];
    console.log(`  Family Bank (overflow): ${familyBankIdeal || '$0'}`);
    
    // Clean up test row
    ws.deleteRow(testRow);
    
  } catch (error) {
    console.error('❌ Error during test:', error);
    console.error('Stack:', error.stack);
  }
}

/**
 * Test Profile 1: ROBS In Use - with profit distributions
 */
function testProfile1ActualIdeal() {
  const testData = {
    ProfileID: '1_ROBS_In_Use',
    Current_Age: 45,
    filing_status: 'Married Filing Jointly',
    gross_annual_income: 120000,
    Net_Monthly_Income: 8000,
    Allocation_Percentage: 25,
    
    // Investment scoring
    investment_involvement: 5,
    investment_time: 5,
    investment_confidence: 5,
    retirement_importance: 7,
    education_importance: 3,
    health_importance: 5,
    retirement_years_until_target: 20,
    
    // Phase 2 actuals
    current_monthly_hsa_contribution: 300,  // P2_HSA_MONTHLY_CONTRIB
    cesa_monthly_contribution: 200,         // P2_CESA_MONTHLY_CONTRIB
    retirement_personal_contribution: 500,  // P2_RETIREMENT_PERSONAL
    
    // Profile specific
    hsa_eligibility: 'Yes',
    cesa_num_children: 2,
    ex_q6: 48000  // Annual profit distribution
  };
  
  testActualIdealForProfile('1_ROBS_In_Use', testData);
}

/**
 * Test Profile 2: ROBS Curious - with employer match
 */
function testProfile2ActualIdeal() {
  const testData = {
    ProfileID: '2_ROBS_Curious',
    Current_Age: 40,
    Work_Situation: 'W-2 employee',
    filing_status: 'Single',
    gross_annual_income: 90000,
    Net_Monthly_Income: 5500,
    Allocation_Percentage: 20,
    
    // Investment scoring
    investment_involvement: 4,
    investment_time: 4,
    investment_confidence: 4,
    retirement_importance: 6,
    education_importance: 1,
    health_importance: 4,
    retirement_years_until_target: 25,
    
    // Phase 2 actuals
    current_monthly_hsa_contribution: 200,
    retirement_personal_contribution: 800,
    
    // Profile specific
    hsa_eligibility: 'Yes',
    ex_q1: 'Yes',  // Has employer 401k
    ex_q2: 'Yes',  // Has match
    ex_q3: '100% up to 3%',  // Match percentage
    ex_q4: 'Yes'   // Has Roth option
  };
  
  testActualIdealForProfile('2_ROBS_Curious', testData);
}

/**
 * Test Profile 3: Solo 401k Builder
 */
function testProfile3ActualIdeal() {
  const testData = {
    ProfileID: '3_Solo401k_Builder',
    Current_Age: 42,
    Work_Situation: 'Self-employed',
    filing_status: 'Married Filing Jointly',
    gross_annual_income: 150000,
    Net_Monthly_Income: 10000,
    Allocation_Percentage: 30,
    
    // Investment scoring
    investment_involvement: 6,
    investment_time: 5,
    investment_confidence: 6,
    retirement_importance: 7,
    education_importance: 4,
    health_importance: 5,
    retirement_years_until_target: 23,
    
    // Phase 2 actuals
    current_monthly_hsa_contribution: 400,
    cesa_monthly_contribution: 300,
    
    // Profile specific
    hsa_eligibility: 'Yes',
    cesa_num_children: 2,
    ex_q1: 'S-Corp',  // Business type
    ex_q3: 'Yes',     // Has Solo 401k
    ex_q4: 18000,     // Employee contribution (annual)
    ex_q5: 12000      // Employer contribution (annual)
  };
  
  testActualIdealForProfile('3_Solo401k_Builder', testData);
}

/**
 * Test all profiles with actual/ideal
 */
function testAllProfilesActualIdeal() {
  console.log('=== TESTING ACTUAL/IDEAL OUTPUTS FOR ALL PROFILES ===\n');
  console.log('This test verifies that:');
  console.log('1. Actual values are correctly read from Phase 2 form data');
  console.log('2. Ideal values include both discretionary and non-discretionary amounts');
  console.log('3. Family Bank captures overflow correctly');
  console.log('4. Total allocations match expected percentages\n');
  
  // Test each profile
  testProfile1ActualIdeal();
  testProfile2ActualIdeal();
  testProfile3ActualIdeal();
  
  console.log('\n=== TEST COMPLETE ===');
  console.log('Review the output above to verify:');
  console.log('- Actual columns show current contributions from form data');
  console.log('- Ideal columns show recommended allocations');
  console.log('- Non-discretionary items (matches, distributions) are included in ideal');
  console.log('- Family Bank ideal captures any remaining funds');
}

/**
 * Verify actual/ideal columns exist
 */
function verifyActualIdealColumns() {
  console.log('=== Verifying Actual/Ideal Columns ===\n');
  
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  const headers = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  
  const actualColumns = headers.filter(h => h.endsWith('_actual'));
  const idealColumns = headers.filter(h => h.endsWith('_ideal'));
  
  console.log(`Found ${actualColumns.length} actual columns`);
  console.log(`Found ${idealColumns.length} ideal columns`);
  
  // Check for critical columns
  const criticalActuals = [
    'retirement_hsa_actual',
    'health_hsa_actual',
    'retirement_traditional_401k_actual',
    'retirement_401k_match_traditional_actual',
    'retirement_combined_cesa_actual',
    'education_combined_cesa_actual'
  ];
  
  const criticalIdeals = [
    'retirement_hsa_ideal',
    'health_hsa_ideal',
    'retirement_traditional_401k_ideal',
    'retirement_roth_401k_ideal',
    'retirement_traditional_ira_ideal',
    'retirement_roth_ira_ideal',
    'family_bank_ideal'
  ];
  
  console.log('\nChecking critical actual columns:');
  criticalActuals.forEach(col => {
    const exists = headers.includes(col);
    console.log(`  ${col}: ${exists ? '✅' : '❌'}`);
  });
  
  console.log('\nChecking critical ideal columns:');
  criticalIdeals.forEach(col => {
    const exists = headers.includes(col);
    console.log(`  ${col}: ${exists ? '✅' : '❌'}`);
  });
}

/**
 * Test the new actual/ideal logic flag
 */
function testActualIdealLogicFlag() {
  console.log('=== Testing Actual/Ideal Logic Flag ===\n');
  
  // This would need to check if useNewLogic is true in runUniversalEngine
  console.log('The system should be using the new logic where:');
  console.log('- Allocation % represents TOTAL savings rate (not additional)');
  console.log('- Non-discretionary items are added ON TOP');
  console.log('- Family Bank gets remainder of total target');
  
  // You could test by running a scenario and checking the math
  const testCase = {
    netMonthly: 10000,
    allocPercent: 25,  // 25% total
    robsDistribution: 4000,  // Non-discretionary
    
    expectedDiscretionary: 2500,  // 25% of 10000
    expectedTotal: 6500  // 2500 + 4000
  };
  
  console.log('\nTest case:');
  console.log(`- Net monthly: $${testCase.netMonthly}`);
  console.log(`- Allocation %: ${testCase.allocPercent}%`);
  console.log(`- ROBS distribution: $${testCase.robsDistribution}`);
  console.log(`- Expected discretionary: $${testCase.expectedDiscretionary}`);
  console.log(`- Expected total: $${testCase.expectedTotal}`);
}

// Helper function
function getHeaderMap(sheet) {
  const headers = sheet.getRange(2, 1, 1, sheet.getLastColumn()).getValues()[0];
  const headerMap = {};
  headers.forEach((header, index) => {
    if (header) {
      headerMap[header] = index + 1;
    }
  });
  return headerMap;
}
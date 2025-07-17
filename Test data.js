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
    // 1A: ROBS profit seeded, no kids/HSA, Roth-phase-out check
    {
      ProfileID:                 '1A_ROBS_In_Use',
      Net_Monthly_Income:        6000,
      gross_annual_income:       72000,
      filing_status:             'Married Filing Jointly',
      Current_Age:               45,
      Retirement_Catchup:        'No',
      Tax_Minimization:          'Both',
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
    // 1B: ROBS curious, has kids & HSA, later-tax focus
    {
      ProfileID:                 '1B_ROBS_Curious',
      Net_Monthly_Income:        8000,
      gross_annual_income:       90000,
      filing_status:             'Single',
      Current_Age:               40,
      Retirement_Catchup:        'No',
      Tax_Minimization:          'Later',
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
    // 2: Solo401k Builder, now-tax focus, one kid, HSA eligible
    {
      ProfileID:                 '2_Solo401k_Builder',
      Net_Monthly_Income:        7000,
      gross_annual_income:       84000,
      filing_status:             'Married Filing Jointly',
      Current_Age:               38,
      Retirement_Catchup:        'No',
      Tax_Minimization:          'Now',
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
    // 3: Roth Reclaimer, catch-up allowed at age 50, no HSA
    {
      ProfileID:                 '3_Roth_Reclaimer',
      Net_Monthly_Income:        9000,
      gross_annual_income:       95000,
      filing_status:             'Single',
      Current_Age:               50,
      Retirement_Catchup:        'Yes',
      Tax_Minimization:          'Both',
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
    // 4: Bracket Strategist, now-tax focus, HSA & CESA
    {
      ProfileID:                 '4_Bracket_Strategist',
      Net_Monthly_Income:        5500,
      gross_annual_income:       65000,
      filing_status:             'Married Filing Jointly',
      Current_Age:               48,
      Retirement_Catchup:        'No',
      Tax_Minimization:          'Now',
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
    // 5: Catch-Up Visionary, age 55+, catch-up + HSA
    {
      ProfileID:                 '5_Catch_Up',
      Net_Monthly_Income:        6500,
      gross_annual_income:       78000,
      filing_status:             'Single',
      Current_Age:               55,
      Retirement_Catchup:        'Yes',
      Tax_Minimization:          'Later',
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
    // 6: Foundation Builder, young, no HSA/CESA, low scores
    {
      ProfileID:                 '6_Foundation_Builder',
      Net_Monthly_Income:        4000,
      gross_annual_income:       48000,
      filing_status:             'Single',
      Current_Age:               30,
      Retirement_Catchup:        'No',
      Tax_Minimization:          'Both',
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
    // 7: Business Owner Group, complex, many kids, HSA
    {
      ProfileID:                 '7_Biz_Owner_Group',
      Net_Monthly_Income:        12000,
      gross_annual_income:       144000,
      filing_status:             'Married Filing Jointly',
      Current_Age:               45,
      Retirement_Catchup:        'No',
      Tax_Minimization:          'Now',
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
    // 8: Late-Stage Growth, near retirement, catch-up + HSA + CESA
    {
      ProfileID:                 '8_Late_Stage_Growth',
      Net_Monthly_Income:        10000,
      gross_annual_income:       110000,
      filing_status:             'Single',
      Current_Age:               60,
      Retirement_Catchup:        'Yes',
      Tax_Minimization:          'Both',
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
}



function smokeTestRow(testRow = 3) {
  const ss      = SpreadsheetApp.getActiveSpreadsheet();
  const td      = ss.getSheetByName('TestData');
  const ws      = ss.getSheetByName('Working Sheet');
  const rawCols = td.getLastColumn();
  
  // Grab the headers from the Working Sheet (row 2)
  const headers = ws.getRange(2, 1, 1, rawCols).getValues()[0];

  const destRow = 4;

  // Read the single test data row from TestData
  const testVals = td.getRange(testRow, 1, 1, rawCols).getValues()[0];

  // Log each header with its corresponding value for the test row
  Logger.log('Test Row Data (Row %s):', testRow);
  for (let i = 0; i < rawCols; i++) {
    const header = headers[i];   // Access the header
    const value = testVals[i];   // Access the value from the test row
    Logger.log('Header: %s, Value: %s', header, value);
  }

  // Copy the test data into the Working Sheet row
  ws.getRange(destRow, 1, 1, rawCols).setValues([testVals]);

  // Run the engine with the test row
  const result = runUniversalEngine(destRow);

  // Look up the profile ID from testVals using the Working Sheet headers
  const profile = testVals[ headers.indexOf('ProfileID') ]; // Example: profile value

  // Log the results
  Logger.log('🧪 Profile %s (TestData row %s) →\n%s',
             profile, testRow, JSON.stringify(result.vehicles, null, 2));
}

/**
 * Wrapper to run Profile 4 test
 */
function runProfile4PhaseOutTest() {
  // Load the test scenarios
  const scenarios = {
    highIncomeClean: {
      name: 'High Income Clean Backdoor (No IRA)',
      phase1: {
        'Full_Name': 'Test Clean Backdoor',
        'Email': 'test.clean.backdoor@example.com',
        'Student_ID_Last4': '4001CB',
        'Current_Age': 45,
        'ProfileID': '4_Roth_Reclaimer',
        'Work_Situation': 'W-2 employee',
        'gross_annual_income': 250000,
        'filing_status': 'Single',
        'Tax_Minimization': 'Later',
        'hsa_eligibility': 'Yes',
        'cesa_num_children': 0,
        'Net_Monthly_Income': 14000,
        'Allocation_Percentage': 30,
        'investment_involvement': 5,
        'investment_time': 4,
        'investment_confidence': 5,
        'retirement_importance': 7,
        'education_importance': 1,
        'health_importance': 5,
        'retirement_years_until_target': 20,
        'cesa_years_until_first_need': 99,
        'hsa_years_until_need': 15
      },
      phase2: {
        ex_q1: '0',              // Traditional IRA balance
        ex_q2: 'Yes',            // 401k accepts rollovers
        ex_q5: 'Yes',            // Has employer 401k
        ex_q6: 'Yes',            // Has match
        ex_q7: '100% up to 5%',  // Match percentage
        ex_q8: 'Yes'             // Has Roth 401k option
      }
    },
    proRataIssue: {
      name: 'High Income with Pro-Rata Complications',
      phase1: {
        'Full_Name': 'Test Pro Rata',
        'Email': 'test.prorata@example.com',
        'Student_ID_Last4': '4002PR',
        'Current_Age': 38,
        'ProfileID': '4_Roth_Reclaimer',
        'Work_Situation': 'Both',
        'gross_annual_income': 300000,
        'filing_status': 'Married Filing Jointly',
        'Tax_Minimization': 'Later',
        'hsa_eligibility': 'Yes',
        'cesa_num_children': 1,
        'Net_Monthly_Income': 18000,
        'Allocation_Percentage': 35,
        'investment_involvement': 6,
        'investment_time': 5,
        'investment_confidence': 6,
        'retirement_importance': 7,
        'education_importance': 4,
        'health_importance': 5,
        'retirement_years_until_target': 27,
        'cesa_years_until_first_need': 15,
        'hsa_years_until_need': 25
      },
      phase2: {
        ex_q1: '150000',         // Large Traditional IRA balance
        ex_q2: 'No',             // 401k doesn't accept rollovers
        ex_q5: 'Yes',            // Has employer 401k
        ex_q6: 'Yes',            // Has match
        ex_q7: '50% up to 8%',   // Match percentage
        ex_q8: 'Yes'             // Has Roth 401k option
      }
    }
  };

  console.log('=== Testing Profile 4 Roth Phase-Out (Fixed) ===\n');
  
  // Run both scenarios
  Object.entries(scenarios).forEach(([key, scenario]) => {
    console.log(`Testing: ${scenario.name}`);
    console.log(`Income: $${scenario.phase1.gross_annual_income.toLocaleString()}`);
    console.log(`Filing: ${scenario.phase1.filing_status}`);
    console.log(`IRA Balance: $${scenario.phase2.ex_q1}`);
    
    try {
      runCompleteScenarioTest(key, scenarios);
      console.log('Test completed\n');
    } catch (error) {
      console.error('Test failed:', error.message, '\n');
    }
  });
}
/**
 * Comprehensive Test Scenarios for All Profiles
 * Each profile should be tested with multiple scenarios to ensure all code paths work
 */

// ═══════════════════════════════════════════════════════════════════════════════
// PROFILE 1: ROBS IN USE - Test Scenarios
// ═══════════════════════════════════════════════════════════════════════════════

const PROFILE_1_SCENARIOS = {
  // Scenario 1: Basic ROBS with moderate profit distributions
  moderateProfits: {
    name: 'Moderate ROBS Profit Distributions',
    phase1: {
      'ProfileID': '1_ROBS_In_Use',
      'Current_Age': 45,
      'Work_Situation': 'Self-employed',
      'gross_annual_income': 100000,
      'Net_Monthly_Income': 6500,
      'Allocation_Percentage': 30,
      'filing_status': 'Single',
      'Tax_Minimization': 'Later',
      'hsa_eligibility': 'Yes',
      'cesa_num_children': 0,
      'investment_involvement': 5,
      'investment_time': 5,
      'investment_confidence': 5,
      'retirement_importance': 7,
      'education_importance': 1,
      'health_importance': 5,
      'retirement_years_until_target': 20,
      'cesa_years_until_first_need': 99,
      'hsa_years_until_need': 20
    },
    phase2: {
      ex_q1: 'Roth 401(k) funded by C-Corp distributions',
      ex_q2: 'Monthly profit distributions to Solo 401(k)',
      ex_q3: 'Roth only',
      ex_q4: 'Monthly',
      ex_q5: 'No',
      ex_q6: '30000'  // $30k annual profit distribution
    }
  },
  
  // Scenario 2: High profit distributions (testing unlimited vehicle)
  highProfits: {
    name: 'High ROBS Profit Distributions',
    phase1: {
      'ProfileID': '1_ROBS_In_Use',
      'Current_Age': 52,
      'Work_Situation': 'Self-employed',
      'gross_annual_income': 250000,
      'Net_Monthly_Income': 15000,
      'Allocation_Percentage': 40,
      'filing_status': 'Married Filing Jointly',
      'Tax_Minimization': 'Later',
      'hsa_eligibility': 'Yes',
      'cesa_num_children': 2,
      'investment_involvement': 6,
      'investment_time': 6,
      'investment_confidence': 6,
      'retirement_importance': 7,
      'education_importance': 5,
      'health_importance': 6,
      'retirement_years_until_target': 13,
      'cesa_years_until_first_need': 8,
      'hsa_years_until_need': 13
    },
    phase2: {
      ex_q1: 'Roth 401(k) funded by C-Corp distributions',
      ex_q2: 'Monthly profit distributions to Solo 401(k)',
      ex_q3: 'Both',
      ex_q4: 'Monthly',
      ex_q5: 'Yes, $7000/year',
      ex_q6: '150000'  // $150k annual profit distribution (high)
    }
  },
  
  // Scenario 3: Traditional focus with catch-up age
  traditionalCatchUp: {
    name: 'Traditional Focus with Catch-Up',
    phase1: {
      'ProfileID': '1_ROBS_In_Use',
      'Current_Age': 55,
      'Work_Situation': 'Self-employed',
      'gross_annual_income': 180000,
      'Net_Monthly_Income': 11000,
      'Allocation_Percentage': 35,
      'filing_status': 'Single',
      'Tax_Minimization': 'Now',  // Traditional focus
      'hsa_eligibility': 'Yes',
      'cesa_num_children': 0,
      'Retirement_Catchup': 'Yes',
      'investment_involvement': 5,
      'investment_time': 5,
      'investment_confidence': 5,
      'retirement_importance': 7,
      'education_importance': 1,
      'health_importance': 6,
      'retirement_years_until_target': 10,
      'cesa_years_until_first_need': 99,
      'hsa_years_until_need': 10
    },
    phase2: {
      ex_q1: 'Traditional 401(k) funded by C-Corp distributions',
      ex_q2: 'Quarterly profit distributions',
      ex_q3: 'Traditional only',
      ex_q4: 'Quarterly',
      ex_q5: 'Yes, $8000/year',  // Catch-up IRA
      ex_q6: '80000'
    }
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// PROFILE 3: SOLO 401K BUILDER - Test Scenarios
// ═══════════════════════════════════════════════════════════════════════════════

const PROFILE_3_SCENARIOS = {
  // Scenario 1: New business with low income
  newBusiness: {
    name: 'New Business Low Income',
    phase1: {
      'ProfileID': '3_Solo401k_Builder',
      'Current_Age': 30,
      'Work_Situation': 'Self-employed',
      'gross_annual_income': 50000,
      'Net_Monthly_Income': 3500,
      'Allocation_Percentage': 20,
      'filing_status': 'Single',
      'Tax_Minimization': 'Later',
      'hsa_eligibility': 'Yes',
      'cesa_num_children': 0,
      'investment_involvement': 4,
      'investment_time': 4,
      'investment_confidence': 3,
      'retirement_importance': 6,
      'education_importance': 1,
      'health_importance': 5,
      'retirement_years_until_target': 35,
      'cesa_years_until_first_need': 99,
      'hsa_years_until_need': 35
    },
    phase2: {
      ex_q1: 'Sole Prop',
      ex_q2: 'No',
      ex_q3: 'Yes',
      ex_q4: '6000',   // Low employee contribution
      ex_q5: '10000',  // Low employer contribution
      ex_q6: '16000'
    }
  },
  
  // Scenario 2: Established business maximizing contributions
  establishedMax: {
    name: 'Established Business Max Contributions',
    phase1: {
      'ProfileID': '3_Solo401k_Builder',
      'Current_Age': 45,
      'Work_Situation': 'Self-employed',
      'gross_annual_income': 200000,
      'Net_Monthly_Income': 12000,
      'Allocation_Percentage': 30,
      'filing_status': 'Married Filing Jointly',
      'Tax_Minimization': 'Both',
      'hsa_eligibility': 'Yes',
      'cesa_num_children': 1,
      'investment_involvement': 5,
      'investment_time': 5,
      'investment_confidence': 5,
      'retirement_importance': 7,
      'education_importance': 4,
      'health_importance': 5,
      'retirement_years_until_target': 20,
      'cesa_years_until_first_need': 12,
      'hsa_years_until_need': 20
    },
    phase2: {
      ex_q1: 'LLC',
      ex_q2: 'No',
      ex_q3: 'Yes',
      ex_q4: '23500',  // Max employee
      ex_q5: '46500',  // Max employer (total $70k)
      ex_q6: '70000'
    }
  },
  
  // Scenario 3: S-Corp with catch-up
  sCorpCatchUp: {
    name: 'S-Corp with Catch-Up Contributions',
    phase1: {
      'ProfileID': '3_Solo401k_Builder',
      'Current_Age': 55,
      'Work_Situation': 'Self-employed',
      'gross_annual_income': 150000,
      'Net_Monthly_Income': 9000,
      'Allocation_Percentage': 35,
      'filing_status': 'Single',
      'Tax_Minimization': 'Now',
      'hsa_eligibility': 'Yes',
      'cesa_num_children': 0,
      'Retirement_Catchup': 'Yes',
      'investment_involvement': 5,
      'investment_time': 5,
      'investment_confidence': 5,
      'retirement_importance': 7,
      'education_importance': 1,
      'health_importance': 6,
      'retirement_years_until_target': 10,
      'cesa_years_until_first_need': 99,
      'hsa_years_until_need': 10
    },
    phase2: {
      ex_q1: 'S-Corp',
      ex_q2: 'No',
      ex_q3: 'Yes',
      ex_q4: '31000',  // With catch-up
      ex_q5: '30000',  // Employer portion
      ex_q6: '61000'
    }
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// PROFILE 5: BRACKET STRATEGIST - Test Scenarios
// ═══════════════════════════════════════════════════════════════════════════════

const PROFILE_5_SCENARIOS = {
  // Scenario 1: W-2 employee prioritizing current tax reduction
  w2TaxNow: {
    name: 'W-2 Employee Tax Now Focus',
    phase1: {
      'ProfileID': '5_Bracket_Strategist',
      'Current_Age': 40,
      'Work_Situation': 'W-2 employee',
      'gross_annual_income': 120000,
      'Net_Monthly_Income': 7500,
      'Allocation_Percentage': 25,
      'filing_status': 'Married Filing Jointly',
      'Tax_Minimization': 'Now',
      'hsa_eligibility': 'Yes',
      'cesa_num_children': 2,
      'investment_involvement': 4,
      'investment_time': 4,
      'investment_confidence': 4,
      'retirement_importance': 6,
      'education_importance': 5,
      'health_importance': 5,
      'retirement_years_until_target': 25,
      'cesa_years_until_first_need': 10,
      'hsa_years_until_need': 25
    },
    phase2: {
      ex_q1: 'Yes',
      ex_q2: 'Yes',
      ex_q3: '100% up to 4%',
      ex_q4: 'Yes'
    }
  },
  
  // Scenario 2: Self-employed maximizing deductions
  selfEmployedTaxStrategy: {
    name: 'Self-Employed Tax Optimization',
    phase1: {
      'ProfileID': '5_Bracket_Strategist',
      'Current_Age': 45,
      'Work_Situation': 'Self-employed',
      'gross_annual_income': 180000,
      'Net_Monthly_Income': 11000,
      'Allocation_Percentage': 30,
      'filing_status': 'Single',
      'Tax_Minimization': 'Now',
      'hsa_eligibility': 'Yes',
      'cesa_num_children': 0,
      'investment_involvement': 5,
      'investment_time': 5,
      'investment_confidence': 5,
      'retirement_importance': 7,
      'education_importance': 1,
      'health_importance': 5,
      'retirement_years_until_target': 20,
      'cesa_years_until_first_need': 99,
      'hsa_years_until_need': 20
    },
    phase2: {
      ex_q1: 'No',
      ex_q2: 'No',
      ex_q3: '',
      ex_q4: 'No'
    }
  },
  
  // Scenario 3: Both W-2 and self-employed (complex)
  bothEmploymentTypes: {
    name: 'Both W-2 and Self-Employed',
    phase1: {
      'ProfileID': '5_Bracket_Strategist',
      'Current_Age': 38,
      'Work_Situation': 'Both',
      'gross_annual_income': 250000,  // Combined income
      'Net_Monthly_Income': 15000,
      'Allocation_Percentage': 28,
      'filing_status': 'Married Filing Jointly',
      'Tax_Minimization': 'Now',
      'hsa_eligibility': 'Yes',
      'cesa_num_children': 1,
      'investment_involvement': 5,
      'investment_time': 4,
      'investment_confidence': 5,
      'retirement_importance': 6,
      'education_importance': 4,
      'health_importance': 5,
      'retirement_years_until_target': 27,
      'cesa_years_until_first_need': 15,
      'hsa_years_until_need': 27
    },
    phase2: {
      ex_q1: 'Yes',
      ex_q2: 'Yes',
      ex_q3: '50% up to 6%',
      ex_q4: 'No'  // No Roth option
    }
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// PROFILE 6: CATCH-UP VISIONARY - Test Scenarios
// ═══════════════════════════════════════════════════════════════════════════════

const PROFILE_6_SCENARIOS = {
  // Scenario 1: Age 50 just eligible for catch-up
  age50FirstCatchUp: {
    name: 'Age 50 First Catch-Up Year',
    phase1: {
      'ProfileID': '6_Catch_Up',
      'Current_Age': 50,
      'Work_Situation': 'W-2 employee',
      'gross_annual_income': 130000,
      'Net_Monthly_Income': 8000,
      'Allocation_Percentage': 30,
      'filing_status': 'Single',
      'Tax_Minimization': 'Both',
      'hsa_eligibility': 'Yes',
      'cesa_num_children': 0,
      'Retirement_Catchup': 'Yes',
      'investment_involvement': 5,
      'investment_time': 5,
      'investment_confidence': 5,
      'retirement_importance': 7,
      'education_importance': 1,
      'health_importance': 6,
      'retirement_years_until_target': 15,
      'cesa_years_until_first_need': 99,
      'hsa_years_until_need': 15
    },
    phase2: {
      ex_q1: 'Yes',
      ex_q2: 'Yes',
      ex_q3: '100% up to 3%',
      ex_q4: 'Yes'
    }
  },
  
  // Scenario 2: Age 60+ with enhanced catch-up
  age60EnhancedCatchUp: {
    name: 'Age 60+ Enhanced Catch-Up',
    phase1: {
      'ProfileID': '6_Catch_Up',
      'Current_Age': 62,
      'Work_Situation': 'W-2 employee',
      'gross_annual_income': 180000,
      'Net_Monthly_Income': 11000,
      'Allocation_Percentage': 40,
      'filing_status': 'Married Filing Jointly',
      'Tax_Minimization': 'Both',
      'hsa_eligibility': 'Yes',
      'cesa_num_children': 0,
      'Retirement_Catchup': 'Yes',
      'investment_involvement': 6,
      'investment_time': 5,
      'investment_confidence': 6,
      'retirement_importance': 7,
      'education_importance': 1,
      'health_importance': 6,
      'retirement_years_until_target': 3,
      'cesa_years_until_first_need': 99,
      'hsa_years_until_need': 3
    },
    phase2: {
      ex_q1: 'Yes',
      ex_q2: 'Yes',
      ex_q3: '50% up to 6%',
      ex_q4: 'Yes'
    }
  },
  
  // Scenario 3: Self-employed catch-up maximization
  selfEmployedMaxCatchUp: {
    name: 'Self-Employed Max Catch-Up',
    phase1: {
      'ProfileID': '6_Catch_Up',
      'Current_Age': 55,
      'Work_Situation': 'Self-employed',
      'gross_annual_income': 200000,
      'Net_Monthly_Income': 12000,
      'Allocation_Percentage': 35,
      'filing_status': 'Single',
      'Tax_Minimization': 'Now',
      'hsa_eligibility': 'Yes',
      'cesa_num_children': 0,
      'Retirement_Catchup': 'Yes',
      'investment_involvement': 5,
      'investment_time': 5,
      'investment_confidence': 5,
      'retirement_importance': 7,
      'education_importance': 1,
      'health_importance': 6,
      'retirement_years_until_target': 10,
      'cesa_years_until_first_need': 99,
      'hsa_years_until_need': 10
    },
    phase2: {
      ex_q1: 'No',
      ex_q2: 'No',
      ex_q3: '',
      ex_q4: 'No'
    }
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// PROFILE 8: BUSINESS OWNER GROUP - Test Scenarios
// ═══════════════════════════════════════════════════════════════════════════════

const PROFILE_8_SCENARIOS = {
  // Scenario 1: Small group, traditional 401k
  smallGroupTraditional: {
    name: 'Small Employee Group Traditional 401k',
    phase1: {
      'ProfileID': '8_Biz_Owner_Group',
      'Current_Age': 45,
      'Work_Situation': 'Self-employed',
      'gross_annual_income': 300000,
      'Net_Monthly_Income': 18000,
      'Allocation_Percentage': 25,
      'filing_status': 'Married Filing Jointly',
      'Tax_Minimization': 'Now',
      'hsa_eligibility': 'Yes',
      'cesa_num_children': 2,
      'W2_Employees': 'Yes',
      'investment_involvement': 6,
      'investment_time': 5,
      'investment_confidence': 6,
      'retirement_importance': 7,
      'education_importance': 4,
      'health_importance': 5,
      'retirement_years_until_target': 20,
      'cesa_years_until_first_need': 10,
      'hsa_years_until_need': 20
    },
    phase2: {
      ex_q1: '5',      // 5 employees
      ex_q2: '35',     // Average age 35
      ex_q3: '50000',  // Average salary
      ex_q4: 'Yes',
      ex_q5: '401(k)',
      ex_q6: '50000'
    }
  },
  
  // Scenario 2: Large group with Cash Balance Plan
  largeGroupCashBalance: {
    name: 'Large Group with Cash Balance Plan',
    phase1: {
      'ProfileID': '8_Biz_Owner_Group',
      'Current_Age': 55,
      'Work_Situation': 'Self-employed',
      'gross_annual_income': 800000,
      'Net_Monthly_Income': 45000,
      'Allocation_Percentage': 30,
      'filing_status': 'Married Filing Jointly',
      'Tax_Minimization': 'Now',
      'hsa_eligibility': 'Yes',
      'cesa_num_children': 0,
      'W2_Employees': 'Yes',
      'Retirement_Catchup': 'Yes',
      'investment_involvement': 6,
      'investment_time': 6,
      'investment_confidence': 6,
      'retirement_importance': 7,
      'education_importance': 1,
      'health_importance': 6,
      'retirement_years_until_target': 10,
      'cesa_years_until_first_need': 99,
      'hsa_years_until_need': 10
    },
    phase2: {
      ex_q1: '25',     // 25 employees
      ex_q2: '32',     // Younger average age (good for DB)
      ex_q3: '65000',  // Average salary
      ex_q4: 'Yes',
      ex_q5: '401(k), Profit Sharing, Cash Balance',
      ex_q6: '280000'  // Max defined benefit contribution
    }
  },
  
  // Scenario 3: Mega Backdoor Roth scenario
  megaBackdoorRoth: {
    name: 'Business Owner with Mega Backdoor',
    phase1: {
      'ProfileID': '8_Biz_Owner_Group',
      'Current_Age': 48,
      'Work_Situation': 'Self-employed',
      'gross_annual_income': 500000,
      'Net_Monthly_Income': 28000,
      'Allocation_Percentage': 28,
      'filing_status': 'Single',
      'Tax_Minimization': 'Later',
      'hsa_eligibility': 'Yes',
      'cesa_num_children': 1,
      'W2_Employees': 'Yes',
      'investment_involvement': 6,
      'investment_time': 5,
      'investment_confidence': 6,
      'retirement_importance': 7,
      'education_importance': 3,
      'health_importance': 5,
      'retirement_years_until_target': 17,
      'cesa_years_until_first_need': 12,
      'hsa_years_until_need': 17
    },
    phase2: {
      ex_q1: '10',
      ex_q2: '40',
      ex_q3: '80000',
      ex_q4: 'Yes',
      ex_q5: '401(k) with after-tax contributions',
      ex_q6: '150000'
    }
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// PROFILE 9: LATE STAGE GROWTH - Test Scenarios
// ═══════════════════════════════════════════════════════════════════════════════

const PROFILE_9_SCENARIOS = {
  // Scenario 1: Pre-retirement W-2 employee
  preRetirementW2: {
    name: 'Pre-Retirement W-2 Employee',
    phase1: {
      'ProfileID': '9_Late_Stage_Growth',
      'Current_Age': 58,
      'Work_Situation': 'W-2 employee',
      'gross_annual_income': 180000,
      'Net_Monthly_Income': 11000,
      'Allocation_Percentage': 35,
      'filing_status': 'Married Filing Jointly',
      'Tax_Minimization': 'Both',
      'hsa_eligibility': 'Yes',
      'cesa_num_children': 0,
      'Retirement_Catchup': 'Yes',
      'Retirement_Timeframe': '5-10 years',
      'investment_involvement': 5,
      'investment_time': 5,
      'investment_confidence': 5,
      'retirement_importance': 7,
      'education_importance': 1,
      'health_importance': 6,
      'retirement_years_until_target': 7,
      'cesa_years_until_first_need': 99,
      'hsa_years_until_need': 7
    },
    phase2: {
      ex_q1: 'Yes',
      ex_q2: 'Yes',
      ex_q3: '100% up to 4%',
      ex_q4: 'Yes'
    }
  },
  
  // Scenario 2: Self-employed with Roth conversions
  selfEmployedRothConversions: {
    name: 'Self-Employed Planning Roth Conversions',
    phase1: {
      'ProfileID': '9_Late_Stage_Growth',
      'Current_Age': 62,
      'Work_Situation': 'Self-employed',
      'gross_annual_income': 250000,
      'Net_Monthly_Income': 15000,
      'Allocation_Percentage': 40,
      'filing_status': 'Married Filing Jointly',
      'Tax_Minimization': 'Later',
      'hsa_eligibility': 'Yes',
      'cesa_num_children': 0,
      'Retirement_Catchup': 'Yes',
      'Retirement_Timeframe': 'Less than 5 years',
      'investment_involvement': 6,
      'investment_time': 6,
      'investment_confidence': 6,
      'retirement_importance': 7,
      'education_importance': 1,
      'health_importance': 6,
      'retirement_years_until_target': 3,
      'cesa_years_until_first_need': 99,
      'hsa_years_until_need': 3
    },
    phase2: {
      ex_q1: 'No',
      ex_q2: 'No',
      ex_q3: '',
      ex_q4: 'No'
    }
  },
  
  // Scenario 3: Both employment with QCD planning
  bothEmploymentQCD: {
    name: 'Both Employment Types with QCD Planning',
    phase1: {
      'ProfileID': '9_Late_Stage_Growth',
      'Current_Age': 64,
      'Work_Situation': 'Both',
      'gross_annual_income': 300000,
      'Net_Monthly_Income': 18000,
      'Allocation_Percentage': 45,
      'filing_status': 'Married Filing Jointly',
      'Tax_Minimization': 'Both',
      'hsa_eligibility': 'Yes',
      'cesa_num_children': 0,
      'Retirement_Catchup': 'Yes',
      'Retirement_Timeframe': 'Less than 5 years',
      'investment_involvement': 6,
      'investment_time': 5,
      'investment_confidence': 6,
      'retirement_importance': 7,
      'education_importance': 1,
      'health_importance': 7,
      'retirement_years_until_target': 1,
      'cesa_years_until_first_need': 99,
      'hsa_years_until_need': 1
    },
    phase2: {
      ex_q1: 'Yes',
      ex_q2: 'Yes',
      ex_q3: '50% up to 6%',
      ex_q4: 'Yes'
    }
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// TEST RUNNER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Run all scenarios for a specific profile
 */
function testProfileAllScenarios(profileId, scenarios) {
  console.log(`\n${'═'.repeat(70)}`);
  console.log(`TESTING ALL SCENARIOS FOR ${profileId}`);
  console.log(`${'═'.repeat(70)}\n`);
  
  const results = [];
  
  Object.keys(scenarios).forEach(scenarioKey => {
    const scenario = scenarios[scenarioKey];
    console.log(`\nScenario: ${scenario.name}`);
    console.log('-'.repeat(50));
    
    try {
      // Combine phase1 and phase2 data
      const testData = { ...scenario.phase1, ...scenario.phase2 };
      
      // Run the test
      const result = runTestWithValidation(profileId, testData);
      
      results.push({
        scenario: scenario.name,
        status: 'PASSED',
        result: result
      });
      
      console.log(`✅ ${scenario.name} completed`);
      
    } catch (error) {
      results.push({
        scenario: scenario.name,
        status: 'FAILED',
        error: error.message
      });
      
      console.error(`❌ ${scenario.name} failed: ${error.message}`);
    }
    
    Utilities.sleep(1000);
  });
  
  // Summary
  console.log(`\n${'═'.repeat(70)}`);
  console.log(`SUMMARY FOR ${profileId}`);
  console.log(`${'═'.repeat(70)}`);
  
  const passed = results.filter(r => r.status === 'PASSED').length;
  const failed = results.filter(r => r.status === 'FAILED').length;
  
  console.log(`Total Scenarios: ${results.length}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  
  if (failed > 0) {
    console.log('\nFailed Scenarios:');
    results.filter(r => r.status === 'FAILED').forEach(r => {
      console.log(`  - ${r.scenario}: ${r.error}`);
    });
  }
  
  return results;
}

// Individual test functions using comprehensive scenarios
function testProfile1Comprehensive() {
  return testProfileAllScenarios('1_ROBS_In_Use', PROFILE_1_SCENARIOS);
}

function testProfile3Comprehensive() {
  return testProfileAllScenarios('3_Solo401k_Builder', PROFILE_3_SCENARIOS);
}

function testProfile5Comprehensive() {
  return testProfileAllScenarios('5_Bracket_Strategist', PROFILE_5_SCENARIOS);
}

function testProfile6Comprehensive() {
  return testProfileAllScenarios('6_Catch_Up', PROFILE_6_SCENARIOS);
}

function testProfile8Comprehensive() {
  return testProfileAllScenarios('8_Biz_Owner_Group', PROFILE_8_SCENARIOS);
}

function testProfile9Comprehensive() {
  return testProfileAllScenarios('9_Late_Stage_Growth', PROFILE_9_SCENARIOS);
}
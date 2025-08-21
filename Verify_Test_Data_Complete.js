/**
 * Verify test scenarios have all required fields
 */

function verifyTestDataComplete() {
  console.log('\n' + '='.repeat(80));
  console.log('VERIFYING TEST DATA COMPLETENESS');
  console.log('='.repeat(80));
  
  // Required fields for proper domain weight calculation
  const requiredFields = [
    // Investment scoring
    'investment_involvement',
    'investment_time',
    'investment_confidence',
    // Domain importance
    'retirement_importance',
    'education_importance',
    'health_importance',
    // Years until need
    'retirement_years_until_target',
    'cesa_years_until_first_need',
    'hsa_years_until_need'
  ];
  
  // Check each profile's scenarios
  const allScenarios = {
    'Profile 2': PROFILE_2_SCENARIOS,
    'Profile 4': PROFILE_4_SCENARIOS,
    'Profile 7': PROFILE_7_SCENARIOS
  };
  
  Object.entries(allScenarios).forEach(([profileName, scenarios]) => {
    console.log(`\n${profileName}:`);
    
    Object.entries(scenarios).forEach(([scenarioName, scenario]) => {
      console.log(`\n  ${scenarioName}:`);
      
      let allFieldsPresent = true;
      requiredFields.forEach(field => {
        const hasField = scenario.phase1 && scenario.phase1[field] !== undefined;
        if (!hasField) {
          console.log(`    ❌ Missing: ${field}`);
          allFieldsPresent = false;
        }
      });
      
      if (allFieldsPresent) {
        console.log(`    ✅ All required fields present`);
        
        // Show domain importance values
        console.log(`    Domain importance: Ret=${scenario.phase1.retirement_importance}, Edu=${scenario.phase1.education_importance}, Health=${scenario.phase1.health_importance}`);
        console.log(`    Years until: Ret=${scenario.phase1.retirement_years_until_target}, Edu=${scenario.phase1.cesa_years_until_first_need}, Health=${scenario.phase1.hsa_years_until_need}`);
      }
    });
  });
  
  console.log('\n' + '='.repeat(80));
  console.log('VERIFICATION COMPLETE');
  console.log('='.repeat(80));
}

// Quick check for one scenario
function checkScenarioFields(profileId, scenarioName) {
  const scenarios = profileId === '2_ROBS_Curious' ? PROFILE_2_SCENARIOS :
                   profileId === '4_Roth_Reclaimer' ? PROFILE_4_SCENARIOS :
                   profileId === '7_Foundation_Builder' ? PROFILE_7_SCENARIOS : null;
                   
  if (!scenarios || !scenarios[scenarioName]) {
    console.log('Invalid profile or scenario');
    return;
  }
  
  const scenario = scenarios[scenarioName];
  console.log(`\n${profileId} - ${scenarioName}:`);
  console.log('Phase 1 data:');
  Object.entries(scenario.phase1).forEach(([key, value]) => {
    if (key.includes('importance') || key.includes('years') || key.includes('investment')) {
      console.log(`  ${key}: ${value}`);
    }
  });
}
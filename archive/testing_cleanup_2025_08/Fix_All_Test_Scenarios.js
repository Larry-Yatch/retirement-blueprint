/**
 * Fix ALL test scenarios with the required domain weight fields
 */

// The COMPLETE list of fields needed to avoid $300/$300/$300 split
const REQUIRED_DOMAIN_FIELDS = {
  // Domain importance (1-7 scale)
  'retirement_importance': 5,      // Default: retirement is important
  'education_importance': 3,       // Default: lower if no kids
  'health_importance': 4,          // Default: moderate importance
  
  // Years until need
  'retirement_years_until_target': 30,  // Default: 30 years to retirement
  'cesa_years_until_first_need': 18,   // Default: 18 years (newborn to college)
  'hsa_years_until_need': 20           // Default: 20 years until major health
};

/**
 * Add domain fields to any test scenario
 */
function addDomainFields(scenario, customValues = {}) {
  return {
    ...scenario,
    phase1: {
      ...scenario.phase1,
      ...REQUIRED_DOMAIN_FIELDS,
      ...customValues
    }
  };
}

// Example: Fix Profile 7 scenarios
const FIXED_PROFILE_7_SCENARIOS = {
  youngProfessional: addDomainFields(PROFILE_7_SCENARIOS.youngProfessional, {
    'retirement_importance': 6,      // Young pro prioritizes retirement
    'education_importance': 1,       // No kids
    'health_importance': 4,          
    'retirement_years_until_target': 40,  // 25 years old, retire at 65
    'cesa_years_until_first_need': 99,    // No kids
    'hsa_years_until_need': 30
  }),
  
  familyStarter: addDomainFields(PROFILE_7_SCENARIOS.familyStarter, {
    'retirement_importance': 5,      
    'education_importance': 6,       // Has kids - education important!
    'health_importance': 5,          // Family health important
    'retirement_years_until_target': 30,  // 35 years old
    'cesa_years_until_first_need': 10,    // Kids need college in 10 years
    'hsa_years_until_need': 20
  })
};

/**
 * Quick function to patch existing scenarios
 */
function patchTestScenarios() {
  // This shows what needs to be added to Testing.js
  console.log('Add these fields to ALL test scenarios in phase1:');
  console.log('');
  console.log('// Domain importance (1-7, affects allocation split)');
  console.log("'retirement_importance': 5,");
  console.log("'education_importance': 3,");  
  console.log("'health_importance': 4,");
  console.log('');
  console.log('// Years until need (affects urgency)');
  console.log("'retirement_years_until_target': 30,");
  console.log("'cesa_years_until_first_need': 18,");
  console.log("'hsa_years_until_need': 20");
  console.log('');
  console.log('Adjust values based on scenario:');
  console.log('- No kids? Set education_importance: 1');
  console.log('- Young? Set retirement_years_until_target: 40');
  console.log('- Has kids? Set education_importance: 6, cesa_years_until_first_need: 10-15');
}
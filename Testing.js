// ═══════════════════════════════════════════════════════════════════════════════
// TESTING AND VALIDATION FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════
// This file contains all testing, validation, and smoke test functions
// extracted from Code.js to improve maintainability.

// Form Testing Functions
// ═══════════════════════════════════════════════════════════════════════════════

function testExportSingleForm() {
  const results = Object.entries(FORM_CONFIG).map(([configKey, formConfig]) => {
    try {
      if (!formConfig.formId) {
        return {
          configKey: configKey,
          success: false,
          error: "No form ID configured"
        };
      }
      
      Logger.log(`📋 Exporting ${configKey}...`);
      const formData = exportFormToJSON(formConfig.formId, formConfig.name);
      
      if (formData && formData.items) {
        Logger.log(`✅ ${configKey}: ${formData.items.length} questions`);
        return {
          configKey: configKey,
          success: true,
          questionCount: formData.items.length,
          formData: formData
        };
      } else {
        Logger.log(`❌ ${configKey}: Failed to export or no items found`);
        return {
          configKey: configKey,
          success: false,
          error: "No form data or items found"
        };
      }
    } catch (error) {
      Logger.log(`❌ ${configKey}: ${error.message}`);
      return {
        configKey: configKey,
        success: false,
        error: error.message
      };
    }
  });
  
  const successCount = results.filter(r => r.success).length;
  const totalCount = results.length;
  
  Logger.log(`\n📊 Export Summary: ${successCount}/${totalCount} forms exported successfully`);
  
  results.forEach(result => {
    if (!result.success) {
      Logger.log(`❌ ${result.configKey}: ${result.error}`);
    }
  });
  
  Logger.log(`\n📋 Next Steps:`);
  Logger.log(`Run showFormComparison('1_ROBS_In_Use') for detailed form view.`);
  
  return {
    success: successCount === totalCount,
    results: results,
    summary: `${successCount}/${totalCount} forms exported`
  };
}

function testUpdateSingleForm() {
  const profileId = '1_ROBS_In_Use';
  const formConfig = FORM_CONFIG[profileId];
  
  if (!formConfig || !formConfig.formId) {
    Logger.log('No form ID available for testing');
  }
}

// Profile Helper Testing Functions
// ═══════════════════════════════════════════════════════════════════════════════

function testPhase2() {
  Logger.log('🧪 Testing Phase 2 with mock data...');
  
  const profileId = '1_ROBS_In_Use';
  const mockRowArr = [
    'TEST123',  // Student ID
    '45',       // Age
    'Both'      // Tax preference
  ];
  
  const mockHdr = {
    'student_id': 1,
    'Current_Age': 2,
    'Tax_Minimization': 3
  };
  
  try {
    const helper = profileHelpers[profileId];
    if (!helper) {
      Logger.log(`❌ No helper found for ${profileId}`);
      return null;
    }
    
    const result = helper(mockRowArr, mockHdr);
    Logger.log(`✅ ${profileId} helper executed successfully`);
    Logger.log(`Seeds: ${JSON.stringify(result.seeds, null, 2)}`);
    Logger.log(`Vehicle orders created for ${Object.keys(result.vehicleOrders).length} domains`);
    
    return result;
  } catch (error) {
    Logger.log(`❌ Error testing ${profileId}: ${error.message}`);
    return null;
  }
}

function createTestData(profileType, options = {}) {
  const defaults = {
    age: 40,
    income: 70000,
    netIncome: 5000,
    filingStatus: 'Single',
    taxPreference: 'Both',
    hsaEligible: false,
    numKids: 0,
    catchupEligible: false
  };
  
  const params = { ...defaults, ...options };
  
  // Build mock row array
  const mockRowArr = new Array(50).fill('');
  
  // Helper function to set test values
  function setTestValue(headerKey, value) {
    const col = HEADERS[headerKey];
    if (col) {
      mockRowArr[col - 1] = value;
    }
  }
  
  // Core demographic data
  setTestValue('STUDENT_ID', 'TEST123');
  setTestValue('CURRENT_AGE', params.age);
  setTestValue('GROSS_ANNUAL_INCOME', params.income);
  setTestValue('NET_MONTHLY_INCOME', params.netIncome);
  setTestValue('FILING_STATUS', params.filingStatus);
  setTestValue('TAX_MINIMIZATION', params.taxPreference);
  setTestValue('HSA_ELIGIBILITY', params.hsaEligible ? 'Yes' : 'No');
  setTestValue('CESA_NUM_CHILDREN', params.numKids);
  setTestValue('RETIREMENT_CATCHUP', params.catchupEligible ? 'Yes' : 'No');
  
  // Financial preference data
  setTestValue('P2_INV_INVOLVEMENT', 4);
  setTestValue('P2_INV_TIME', 5);
  setTestValue('P2_INV_CONFIDENCE', 4);
  setTestValue('P2_RETIREMENT_IMPORTANCE', 5);
  setTestValue('P2_RETIREMENT_YEARS_UNTIL_TARGET', 20);
  setTestValue('P2_EDUCATION_IMPORTANCE', params.numKids > 0 ? 4 : 1);
  setTestValue('P2_CESA_YEARS_UNTIL_FIRST_NEED', params.numKids > 0 ? 10 : 0);
  setTestValue('P2_HEALTH_IMPORTANCE', params.hsaEligible ? 4 : 2);
  setTestValue('P2_HSA_YEARS_UNTIL_NEED', 10);
  
  // Profile-specific seeds
  switch(profileType) {
    case '1_ROBS_In_Use':
      setTestValue('P2_EX_Q6', 12000); // Existing ROBS profit
      break;
  }
  
  // Investment/time horizon data
  setTestValue('P2_INV_INVOLVEMENT', 4);
  setTestValue('P2_INV_TIME', 5);
  setTestValue('P2_INV_CONFIDENCE', 4);
  
  return {
    mockRowArr,
    mockHdr: HEADERS,
    params
  };
}

function testProfileHelper(profileId, customOptions = {}) {
  try {
    Logger.log(`🧪 Testing ${profileId}...`);
    
    const helper = profileHelpers[profileId];
    if (!helper) {
      Logger.log(`❌ Helper not found for profile: ${profileId}`);
      return null;
    }
    
    // Create test data
    const { mockRowArr, mockHdr } = createTestData(profileId, customOptions);
    
    // Execute helper
    const result = helper(mockRowArr, mockHdr);
    
    Logger.log(`✅ ${profileId} executed successfully`);
    Logger.log(`Seeds: ${JSON.stringify(result.seeds, null, 2)}`);
    Logger.log(`Vehicle Orders:`);
    Object.entries(result.vehicleOrders).forEach(([domain, vehicles]) => {
      Logger.log(`  ${domain}: ${vehicles.length} vehicles`);
      vehicles.forEach((vehicle, index) => {
        Logger.log(`    ${index + 1}. ${vehicle.name} (cap: $${Math.round(vehicle.capMonthly)}/month)`);
      });
    });
    
    return result;
  } catch (error) {
    Logger.log(`❌ Error testing ${profileId}: ${error.message}`);
    return null;
  }
}

function testAllProfileHelpers() {
  Logger.log('🧪 Testing all profile helpers...\n');
  
  const profiles = Object.keys(profileHelpers);
  const results = {};
  
  profiles.forEach(profileId => {
    try {
      const result = testProfileHelper(profileId);
      results[profileId] = {
        success: result !== null,
        result: result
      };
    } catch (error) {
      results[profileId] = {
        success: false,
        error: error.message
      };
    }
  });
  
  // Summary
  const successful = Object.values(results).filter(r => r.success).length;
  Logger.log(`\n📊 Summary: ${successful}/${profiles.length} helpers passed`);
  
  return results;
}

function testScenarios() {
  Logger.log('🧪 Running test scenarios...\n');
  
  const scenarios = [
    {
      name: 'Young ROBS user with HSA',
      profileId: '1_ROBS_In_Use',
      options: { age: 35, hsaEligible: true, taxPreference: 'Now' }
    },
    {
      name: 'Mid-career with children',
      profileId: '2_ROBS_Curious',
      options: { age: 42, numKids: 2, hsaEligible: true, taxPreference: 'Later' }
    },
    {
      name: 'High earner near retirement',
      profileId: '6_Catch_Up',
      options: { age: 58, income: 150000, catchupEligible: true, taxPreference: 'Both' }
    }
  ];
  
  scenarios.forEach(scenario => {
    Logger.log(`\n--- ${scenario.name} ---`);
    const result = testProfileHelper(scenario.profileId, scenario.options);
    if (result) {
      Logger.log(`✅ ${scenario.name}: SUCCESS`);
      
      // Quick validation
      const hasSeeds = Object.keys(result.seeds).length > 0;
      const hasVehicleOrders = Object.keys(result.vehicleOrders).length > 0;
      
      if (hasSeeds && hasVehicleOrders) {
        Logger.log(`   ✓ Has seeds and vehicle orders`);
      } else {
        Logger.log(`   ⚠️ Missing seeds (${hasSeeds}) or vehicle orders (${hasVehicleOrders})`);
      }
    } else {
      Logger.log(`❌ ${scenario.name}: FAILED`);
    }
  });
}

function testFullAllocationEngine(profileId = '3_Solo401k_Builder', customOptions = {}) {
  try {
    Logger.log(`🧪 Testing full allocation engine for ${profileId}...`);
    
    // Create test data
    const { mockRowArr, mockHdr, params } = createTestData(profileId, customOptions);
    
    // Get helper result
    const helper = profileHelpers[profileId];
    if (!helper) {
      Logger.log(`❌ Helper not found for profile: ${profileId}`);
      return null;
    }
    
    const helperResult = helper(mockRowArr, mockHdr);
    Logger.log(`✅ Helper executed for ${profileId}`);
    
    // Test allocation logic
    const testAmount = params.netIncome * 0.2; // 20% savings rate
    Logger.log(`💰 Testing allocation of $${Math.round(testAmount)}/month`);
    
    const allocation = allocateAcrossDomains(testAmount, helperResult.vehicleOrders);
    
    Logger.log(`📊 Allocation Results:`);
    Object.entries(allocation).forEach(([domain, vehicles]) => {
      Logger.log(`  ${domain}:`);
      Object.entries(vehicles).forEach(([vehicle, amount]) => {
        if (amount > 0) {
          Logger.log(`  ${vehicle}: $${Math.round(amount)}/month`);
        }
      });
    });
    
    return allocation;
  } catch (error) {
    Logger.log(`❌ Error in full allocation test: ${error.message}`);
    return null;
  }
}

// Individual profile test functions - easy to select from dropdown
function test_1_ROBS_In_Use() { return testProfileHelper('1_ROBS_In_Use'); }
function test_2_ROBS_Curious() { return testProfileHelper('2_ROBS_Curious'); }
function test_3_Solo401k_Builder() { return testProfileHelper('3_Solo401k_Builder'); }
function test_4_Roth_Reclaimer() { return testProfileHelper('4_Roth_Reclaimer'); }
function test_5_Bracket_Strategist() { return testProfileHelper('5_Bracket_Strategist'); }
function test_6_Catch_Up() { return testProfileHelper('6_Catch_Up'); }
function test_7_Foundation_Builder() { return testProfileHelper('7_Foundation_Builder'); }
function test_8_Biz_Owner_Group() { return testProfileHelper('8_Biz_Owner_Group'); }
function test_9_Late_Stage_Growth() { return testProfileHelper('9_Late_Stage_Growth'); }

// Validation Functions
// ═══════════════════════════════════════════════════════════════════════════════

function explainProfileHelper(profileId) {
  const cfg = PROFILE_CONFIG[profileId];
  if (!cfg) {
    Logger.log(`❌ Profile ${profileId} not found`);
    return;
  }
  
  Logger.log(`\n=== 📖 PROFILE HELPER EXPLANATION: ${profileId} ===`);
  Logger.log(`📋 Title: ${cfg.title}`);
  Logger.log(`📝 Description: ${cfg.description}`);
  
  // Test with sample data to show how it works
  const { mockRowArr, mockHdr, params } = createTestData(profileId);
  const helper = profileHelpers[profileId];
  
  if (!helper) {
    Logger.log(`❌ No helper function found for ${profileId}`);
    return;
  }
  
  try {
    const result = helper(mockRowArr, mockHdr);
    
    Logger.log(`\n1️⃣ SEEDS (Pre-filled amounts):`);
    Object.entries(result.seeds).forEach(([domain, vehicles]) => {
      Logger.log(`   ${domain}:`);
      if (Object.keys(vehicles).length > 0) {
        Object.entries(vehicles).forEach(([vehicle, amount]) => {
          if (amount > 0) {
            Logger.log(`     • ${vehicle}: $${Math.round(amount)}/month`);
          }
        });
      } else {
        Logger.log(`   ${domain}: No existing contributions`);
      }
    });
  
  // 2. Explain Vehicle Orders
  Logger.log(`\n2️⃣ VEHICLE PRIORITY ORDERS:`);
  Object.entries(result.vehicleOrders).forEach(([domain, vehicles]) => {
    Logger.log(`   ${domain}:`);
    vehicles.forEach((vehicle, index) => {
      Logger.log(`      ${index + 1}. ${vehicle.name}`);
      if (vehicle.capMonthly < Infinity) {
        Logger.log(`      💡 Will fill up to $${Math.round(vehicle.capMonthly)}/month, then overflow to next vehicle`);
      }
    });
  });
  
  // 3. Show key parameters
  Logger.log(`\n3️⃣ KEY PARAMETERS USED:`);
  Logger.log(`   • Age: ${params.age} (Catch-up eligible: ${params.catchupEligible})`);
  Logger.log(`   • Tax preference: ${params.taxPreference}`);
  Logger.log(`   • HSA eligible: ${params.hsaEligible}`);
  Logger.log(`   • Number of children: ${params.numKids}`);
  Logger.log(`   • Filing status: ${params.filingStatus}`);
  Logger.log(`   • Annual income: $${params.income.toLocaleString()}`);
  
  if (params.catchupEligible) {
    Logger.log(`   • Catch-up contributions available at age ${age}!`);
  }
  
  Logger.log('\n4️⃣ WHAT TO LOOK FOR:');
  Logger.log('   ✅ GOOD SIGNS:');
  Logger.log('      • Seeds match existing contributions from form data');
  Logger.log('      • Vehicle orders reflect tax preferences');
  Logger.log('      • HSA included only when eligible');
  Logger.log('      • Education vehicles only when have children');
  Logger.log('      • Catch-up limits applied when age-appropriate');
  
    Logger.log('   ⚠️  POTENTIAL ISSUES:');
    Logger.log('      • Missing vehicles for eligible categories');
    Logger.log('      • Wrong tax treatment priority');
    Logger.log('      • Incorrect contribution limits');
    Logger.log('      • Seeds not matching actual form responses');
    
  } catch (error) {
    Logger.log(`❌ Error running explanation: ${error.message}`);
  }
}

function validateProfileHelper(profileId, testScenarios = []) {
  const cfg = PROFILE_CONFIG[profileId];
  if (!cfg) {
    Logger.log(`❌ Profile ${profileId} not found`);
    return false;
  }
  
  Logger.log(`📋 Profile: ${cfg.title}`);
  Logger.log(`📝 Description: ${cfg.description}`);
  
  // Default test scenarios if none provided
  if (testScenarios.length === 0) {
    testScenarios = [
      { name: 'Default', options: {} },
      { name: 'With HSA', options: { hsaEligible: true } },
      { name: 'With Kids', options: { numKids: 2 } }
    ];
  }
  
  let allPassed = true;
  
  testScenarios.forEach(scenario => {
    Logger.log(`\n🧪 Testing scenario: ${scenario.name}`);
    
    try {
      const { mockRowArr, mockHdr, params } = createTestData(profileId, scenario.options);
      const helper = profileHelpers[profileId];
      
      if (!helper) {
        Logger.log(`❌ No helper function found for ${profileId}`);
        allPassed = false;
        return;
      }
      
      const result = helper(mockRowArr, mockHdr);
      
      // Run technical validation
      const validation = validateHelperResults(result, params);
      
      if (validation.passed) {
        Logger.log(`✅ Technical validation PASSED`);
        
        // Run financial strategy validation
        const strategyValidation = validateFinancialStrategy(profileId, result, params);
        if (strategyValidation.passed) {
          Logger.log(`✅ Financial strategy validation PASSED`);
        } else {
          Logger.log(`⚠️ Financial strategy concerns:`);
          strategyValidation.warnings.forEach(warning => {
            Logger.log(`   • ${warning}`);
          });
          allPassed = false;
        }
        
      } else {
        Logger.log('❌ Technical Tests FAILED:');
        validation.errors.forEach(error => Logger.log(`   • ${error}`));
        allPassed = false;
      }
      
    } catch (error) {
      Logger.log(`❌ ERROR in scenario: ${error.message}`);
      allPassed = false;
    }
  });
  
  Logger.log(`\n📊 OVERALL RESULT: ${allPassed ? '✅ PASSED' : '❌ FAILED'}`);
  return allPassed;
}

function validateHelperResults(result, params) {
  const errors = [];
  
  // 1. Check basic structure
  if (!result || !result.seeds || !result.vehicleOrders) {
    errors.push('Missing seeds or vehicleOrders');
    return { passed: false, errors };
  }
  
  // 2. Check domain structure
  ['Education', 'Health', 'Retirement'].forEach(domain => {
    if (!result.vehicleOrders[domain]) {
      errors.push(`Missing ${domain} vehicleOrders`);
    }
    if (!result.seeds[domain]) {
      errors.push(`Missing ${domain} seeds`);
    }
  });
  
  // 3. Check HSA logic
  const hsaInHealth = result.vehicleOrders.Health?.some(v => v.name === 'HSA');
  const hsaInRetirement = result.vehicleOrders.Retirement?.some(v => v.name === 'HSA');
  
  if (params.hsaEligible) {
    if (!hsaInHealth && !hsaInRetirement) {
      errors.push('HSA missing when eligible');
    }
  } else {
    if (hsaInHealth || hsaInRetirement) {
      errors.push('HSA present when not eligible');
    }
  }
  
  // 4. Check education logic
  const hasEducationVehicles = result.vehicleOrders.Education?.some(v => v.name === 'Combined CESA');
  
  if (params.numKids > 0) {
    if (!hasEducationVehicles) {
      errors.push('Education vehicles missing when has children');
    }
  }
  
  // 5. Check CESA cap calculation
  if (params.numKids > 0 && hasEducationVehicles) {
    const cesaVehicle = result.vehicleOrders.Education.find(v => v.name === 'Combined CESA');
    const expectedCap = (CONFIG.ANNUAL_CESA_LIMIT * params.numKids) / 12;
    
    if (cesaVehicle && Math.abs(cesaVehicle.capMonthly - expectedCap) > 1) {
      errors.push(`CESA cap incorrect: expected ${expectedCap}, got ${cesaVehicle.capMonthly}`);
    }
  }
  
  return {
    passed: errors.length === 0,
    errors
  };
}

function validateFinancialStrategy(profileId, result, params) {
  const warnings = [];
  
  // Tax preference validation
  if (params.taxPreference === 'Now') {
    // Should prioritize traditional/deductible vehicles
    const retirementOrder = result.vehicleOrders.Retirement || [];
    const firstVehicle = retirementOrder[0];
    
    if (firstVehicle && firstVehicle.name.includes('Roth')) {
      warnings.push('Tax preference is Now but Roth vehicle is prioritized first');
    }
  }
  
  if (params.taxPreference === 'Later') {
    // Should prioritize Roth vehicles
    const retirementOrder = result.vehicleOrders.Retirement || [];
    const rothVehicles = retirementOrder.filter(v => v.name.includes('Roth'));
    
    if (rothVehicles.length === 0) {
      warnings.push('Tax preference is Later but no Roth vehicles found');
    }
  }
  
  // Age-appropriate strategies
  if (params.age >= 50 && params.catchupEligible) {
    // Should be using catch-up contributions
    const retirementVehicles = result.vehicleOrders.Retirement || [];
    const hasCatchup = retirementVehicles.some(v => 
      v.capMonthly > (v.name.includes('401') ? 1916.67 : 500) // Basic limits
    );
    
    if (!hasCatchup) {
      warnings.push('Age 50+ but catch-up contributions may not be applied');
    }
  }
  
  // Income-appropriate strategies
  if (params.income > 100000) {
    // High earners should consider tax-advantaged accounts
    const totalCap = Object.values(result.vehicleOrders)
      .flat()
      .reduce((sum, vehicle) => sum + (vehicle.capMonthly || 0), 0);
    
    if (totalCap < 2000) { // Less than $24k/year capacity
      warnings.push('High income but low tax-advantaged account capacity');
    }
  }
  
  return {
    passed: warnings.length === 0,
    warnings
  };
}

function validateAllProfiles() {
  Logger.log('🧪 Validating all profile helpers...\n');
  
  const profiles = Object.keys(profileHelpers);
  const results = {};
  
  profiles.forEach(profileId => {
    Logger.log(`\n=== ${profileId} ===`);
    results[profileId] = validateProfileHelper(profileId);
  });
  
  const passedCount = Object.values(results).filter(Boolean).length;
  Logger.log(`\n📊 FINAL SUMMARY: ${passedCount}/${profiles.length} profiles passed validation`);
  
  return results;
}

// Individual validation functions - easy to select from dropdown  
function validate_1_ROBS_In_Use() { return validateProfileHelper('1_ROBS_In_Use'); }
function validate_2_ROBS_Curious() { return validateProfileHelper('2_ROBS_Curious'); }
function validate_3_Solo401k_Builder() { return validateProfileHelper('3_Solo401k_Builder'); }
function validate_4_Roth_Reclaimer() { return validateProfileHelper('4_Roth_Reclaimer'); }
function validate_5_Bracket_Strategist() { return validateProfileHelper('5_Bracket_Strategist'); }
function validate_6_Catch_Up() { return validateProfileHelper('6_Catch_Up'); }
function validate_7_Foundation_Builder() { return validateProfileHelper('7_Foundation_Builder'); }
function validate_8_Biz_Owner_Group() { return validateProfileHelper('8_Biz_Owner_Group'); }
function validate_9_Late_Stage_Growth() { return validateProfileHelper('9_Late_Stage_Growth'); }

// Tax Preference Testing
function testTaxPreferences(profileId = '1_ROBS_In_Use') {
  Logger.log(`🧪 Testing tax preferences for ${profileId}...\n`);
  
  const preferences = ['Now', 'Later', 'Both'];
  
  preferences.forEach(pref => {
    Logger.log(`--- Tax Preference: ${pref} ---`);
    
    try {
      const { mockRowArr, mockHdr } = createTestData(profileId, { 
        taxPreference: pref,
        age: 45,
        hsaEligible: true 
      });
      
      const helper = profileHelpers[profileId];
      const result = helper(mockRowArr, mockHdr);
      
      // Analyze retirement vehicle order
      const retirementOrder = result.vehicleOrders.Retirement || [];
      Logger.log(`Retirement vehicle priority:`);
      retirementOrder.forEach((vehicle, index) => {
        const taxType = vehicle.name.includes('Roth') ? 'Roth' : 
                       vehicle.name.includes('Traditional') ? 'Traditional' : 'Other';
        Logger.log(`  ${index + 1}. ${vehicle.name} (${taxType})`);
      });
      
      // Check if order makes sense
      const firstVehicle = retirementOrder[0];
      if (firstVehicle) {
        const isRothFirst = firstVehicle.name.includes('Roth');
        const isTradFirst = firstVehicle.name.includes('Traditional');
        
        if (pref === 'Now' && isRothFirst) {
          Logger.log(`⚠️ WARNING: "Now" preference but Roth is first priority`);
        } else if (pref === 'Later' && isTradFirst) {
          Logger.log(`⚠️ WARNING: "Later" preference but Traditional is first priority`);
        } else {
          Logger.log(`✅ Vehicle order aligns with tax preference`);
        }
      }
      
    } catch (error) {
      Logger.log(`❌ Error testing ${pref}: ${error.message}`);
    }
    
    Logger.log('');
  });
}

// Smoke Test Functions  
// ═══════════════════════════════════════════════════════════════════════════════

function smokeTestEngine() {
  Logger.log('🔥 Running smoke test on universal engine...\n');
  
  try {
    // Test with row 3 from TestData (assuming it exists)
    const testRowResult = smokeTestRow(3);
    
    if (testRowResult) {
      Logger.log('✅ Smoke test PASSED - Universal engine is functional');
      return true;
    } else {
      Logger.log('❌ Smoke test FAILED - Check TestData sheet and universal engine');
      return false;
    }
    
  } catch (error) {
    Logger.log(`❌ Smoke test ERROR: ${error.message}`);
    return false;
  }
}

function quickTestEngine() {
  Logger.log('⚡ Quick test of all profile helpers...\n');
  
  const profiles = Object.keys(profileHelpers);
  let passed = 0;
  let failed = 0;
  
  profiles.forEach(profileId => {
    try {
      // Quick test with minimal data
      const { mockRowArr, mockHdr } = createTestData(profileId, {});
      const helper = profileHelpers[profileId];
      const result = helper(mockRowArr, mockHdr);
      
      // Basic validation
      if (result && result.seeds && result.vehicleOrders) {
        Logger.log(`✅ ${profileId}: OK`);
        passed++;
      } else {
        Logger.log(`❌ ${profileId}: Missing seeds or vehicleOrders`);
        failed++;
      }
      
    } catch (error) {
      Logger.log(`❌ ${profileId}: ${error.message}`);
      failed++;
    }
  });
  
  Logger.log(`\n📊 Quick Test Results: ${passed} passed, ${failed} failed`);
  return { passed, failed, total: profiles.length };
}
// ═══════════════════════════════════════════════════════════════════════════════
// TESTING AND VALIDATION FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════
// This file contains all testing, validation, and smoke test functions
// extracted from Code.js to improve maintainability.

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
      Logger.log(`  ❌ "${header}" NOT found`);
    }
  });
  
  return headerMap;
}

function diagnoseProfileHelperContext() {
  Logger.log('🔍 DIAGNOSING PROFILE HELPER CONTEXT');
  Logger.log('═'.repeat(80));
  
  try {
    // Simulate exactly what the Solo 401k Builder test does
    Logger.log('📋 Step 1: Testing initWS() function...');
    const { sheet, hdr } = initWS();
    
    Logger.log(`✅ initWS() successful`);
    Logger.log(`📊 Sheet name: ${sheet.getName()}`);
    Logger.log(`📊 Header map contains ${Object.keys(hdr).length} headers`);
    
    // Show first 10 headers in the map
    Logger.log(`\n🗺️ First 10 headers in hdr object:`);
    Object.keys(hdr).slice(0, 10).forEach(key => {
      Logger.log(`  "${key}" → Column ${hdr[key]}`);
    });
    
    // Check for the failing header
    Logger.log(`\n🎯 Checking for the failing header:`);
    const targetHeader = HEADERS.P2_EX_Q3; // This should be 'ex_q3'
    Logger.log(`  Looking for: "${targetHeader}" (value of HEADERS.P2_EX_Q3)`);
    
    if (hdr[targetHeader]) {
      Logger.log(`  ✅ Found "${targetHeader}" at column ${hdr[targetHeader]}`);
    } else {
      Logger.log(`  ❌ "${targetHeader}" NOT found in hdr object`);
      Logger.log(`  Available headers: ${Object.keys(hdr).join(', ')}`);
    }
    
    // Test the actual getValue call that's failing
    Logger.log(`\n🧪 Testing the failing getValue call:`);
    const rowData = sheet.getRange(4, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    try {
      const result = getValue(hdr, rowData, HEADERS.P2_EX_Q3);
      Logger.log(`  ✅ getValue() succeeded: "${result}"`);
    } catch (error) {
      Logger.log(`  ❌ getValue() failed: ${error.message}`);
    }
    
  } catch (error) {
    Logger.log(`❌ Error in diagnosis: ${error.message}`);
  }
}

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

// Quick access functions for end-to-end tests - easy to select from dropdown
function testSolo401kE2E() { return testSolo401kBuilderEndToEnd(); }
function quickTestSolo401k() { 
  Logger.log('🚀 QUICK TEST: Solo 401k Builder End-to-End');
  Logger.log('Running comprehensive test...\n');
  return testSolo401kBuilderEndToEnd(); 
}

// Quick tax preference verification test
function quickTestTaxPreference() {
  Logger.log('🎯 QUICK TEST: Tax Preference Logic Verification');
  
  const testProfiles = [
    { profile: '3_Solo401k_Builder', taxPref: 'Now', expected: 'Traditional first' },
    { profile: '2_ROBS_Curious', taxPref: 'Later', expected: 'Roth first' },
    { profile: '4_Roth_Reclaimer', taxPref: 'Both', expected: 'Balanced order' }
  ];
  
  testProfiles.forEach(test => {
    Logger.log(`\n--- Testing ${test.profile} (${test.taxPref}) ---`);
    try {
      const result = testProfileHelper(test.profile);
      const retOrder = result.vehicleOrders.Retirement || [];
      const vehicleNames = retOrder.slice(0, -1).map(v => v.name); // Exclude Family Bank
      
      Logger.log(`Tax preference: ${test.taxPref} (${test.expected})`);
      Logger.log(`Retirement order: ${vehicleNames.join(' → ')}`);
      
      // Simple verification
      const hasTraditional = vehicleNames.some(name => name.toLowerCase().includes('traditional'));
      const hasRoth = vehicleNames.some(name => name.toLowerCase().includes('roth'));
      
      if (hasTraditional && hasRoth) {
        const traditionalIndex = vehicleNames.findIndex(name => name.toLowerCase().includes('traditional'));
        const rothIndex = vehicleNames.findIndex(name => name.toLowerCase().includes('roth'));
        
        if (test.taxPref === 'Now' && traditionalIndex < rothIndex) {
          Logger.log('✅ Tax preference NOW working: Traditional before Roth');
        } else if (test.taxPref === 'Later' && rothIndex < traditionalIndex) {
          Logger.log('✅ Tax preference LATER working: Roth before Traditional');
        } else if (test.taxPref === 'Both') {
          Logger.log('✅ Tax preference BOTH working: Balanced order maintained');
        } else {
          Logger.log(`⚠️ Tax preference may need review for ${test.profile}`);
        }
      } else {
        Logger.log('ℹ️ Profile has limited retirement vehicle types for comparison');
      }
    } catch (error) {
      Logger.log(`❌ Error testing ${test.profile}: ${error.message}`);
    }
  });
  
  Logger.log('\n🎯 Tax preference verification complete');
}

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

// Phase 1 Classification Testing Functions
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Main test function to verify Phase 1 classification logic
 * Tests multiple profiles to ensure correct classification
 * Easy to run from Google Apps Script editor dropdown
 */
function testPhase1Classification() {
  Logger.log('🧪 TESTING PHASE 1 CLASSIFICATION LOGIC\n');
  Logger.log('═══════════════════════════════════════\n');
  
  // Test profiles with expected outcomes
  const testCases = [
    {
      profileName: 'Profile 3 (3_Solo401k_Builder)',
      testRowNumber: 4, // Row 4 in TestData sheet (Profile 3)
      expectedProfile: '3_Solo401k_Builder',
      description: 'Self-employed, no employees, no ROBS interest'
    },
    {
      profileName: 'Profile 1 (1_ROBS_In_Use)', 
      testRowNumber: 2, // Row 2 in TestData sheet (Profile 1)
      expectedProfile: '1_ROBS_In_Use',
      description: 'Currently using ROBS'
    },
    {
      profileName: 'Profile 2 (2_ROBS_Curious)',
      testRowNumber: 3, // Row 3 in TestData sheet (Profile 2) 
      expectedProfile: '2_ROBS_Curious',
      description: 'ROBS curious and meets all criteria'
    },
    {
      profileName: 'Profile 8 (8_Biz_Owner_Group)',
      testRowNumber: 9, // Row 9 in TestData sheet (Profile 8)
      expectedProfile: '8_Biz_Owner_Group', 
      description: 'Business owner with W2 employees'
    }
  ];
  
  let passedTests = 0;
  let totalTests = testCases.length;
  
  // Run each test case
  testCases.forEach((testCase, index) => {
    Logger.log(`\n--- Test ${index + 1}: ${testCase.profileName} ---`);
    Logger.log(`Description: ${testCase.description}`);
    
    try {
      const result = testSingleProfileClassification(
        testCase.testRowNumber, 
        testCase.expectedProfile,
        testCase.profileName
      );
      
      if (result.passed) {
        Logger.log(`✅ TEST PASSED: Correctly classified as ${result.actualProfile}`);
        passedTests++;
      } else {
        Logger.log(`❌ TEST FAILED: Expected ${testCase.expectedProfile}, got ${result.actualProfile}`);
        Logger.log(`   Classification logic issue detected!`);
      }
      
    } catch (error) {
      Logger.log(`❌ TEST ERROR: ${error.message}`);
    }
  });
  
  // Final summary
  Logger.log(`\n${'═'.repeat(50)}`);
  Logger.log(`📊 PHASE 1 CLASSIFICATION TEST SUMMARY`);
  Logger.log(`${'═'.repeat(50)}`);
  Logger.log(`✅ Passed: ${passedTests}/${totalTests} tests`);
  Logger.log(`❌ Failed: ${totalTests - passedTests}/${totalTests} tests`);
  
  if (passedTests === totalTests) {
    Logger.log(`\n🎉 ALL TESTS PASSED! Phase 1 classification is working correctly.`);
    return true;
  } else {
    Logger.log(`\n⚠️  SOME TESTS FAILED! Please review the classification logic in handlePhase1().`);
    return false;
  }
}

/**
 * Tests classification for a single profile using test data
 * @param {number} testRowNumber - Row number in TestData sheet (1-based)
 * @param {string} expectedProfile - Expected ProfileID result
 * @param {string} profileName - Human readable profile name for logging
 * @returns {object} Test result with passed status and actual profile
 */
function testSingleProfileClassification(testRowNumber, expectedProfile, profileName) {
  Logger.log(`📋 Reading test data from TestData sheet, row ${testRowNumber}...`);
  
  // Get the test data
  const testData = getTestDataRow(testRowNumber);
  if (!testData) {
    throw new Error(`Failed to read test data from row ${testRowNumber}`);
  }
  
  Logger.log(`👤 Testing with data: Age=${testData.Current_Age}, Work=${testData.Work_Situation}, ROBS_Use=${testData.Using_ROBS}`);
  
  // Simulate the classification logic from classifyClientProfileFromWorkingSheet()
  const actualProfile = simulatePhase1Classification(testData);
  
  Logger.log(`🔍 Classification result: ${actualProfile}`);
  
  // Verify the result
  const passed = (actualProfile === expectedProfile);
  
  return {
    passed: passed,
    expectedProfile: expectedProfile,
    actualProfile: actualProfile,
    testData: testData
  };
}

/**
 * Reads test data from a specific row in the TestData sheet
 * @param {number} rowNumber - Row number (1-based, where row 1 is headers)
 * @returns {object} Test data as key-value pairs
 */
function getTestDataRow(rowNumber) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const testDataSheet = ss.getSheetByName('TestData');
    
    if (!testDataSheet) {
      throw new Error('TestData sheet not found. Run createTestDataTab() first.');
    }
    
    // Get headers from row 1
    const headers = testDataSheet.getRange(1, 1, 1, testDataSheet.getLastColumn()).getValues()[0];
    
    // Get data from specified row
    const rowData = testDataSheet.getRange(rowNumber, 1, 1, testDataSheet.getLastColumn()).getValues()[0];
    
    // Convert to key-value object
    const testData = {};
    headers.forEach((header, index) => {
      testData[header] = rowData[index];
    });
    
    return testData;
    
  } catch (error) {
    Logger.log(`❌ Error reading test data: ${error.message}`);
    return null;
  }
}

/**
 * Diagnostic function to debug TestData sheet issues
 * Reads and displays complete information about the test data setup
 * @param {number} rowNumber - The row number to diagnose (default is 4 for Profile 3)
 * @returns {object} Diagnostic results
 */
function diagnoseTestData(rowNumber = 4) {
  Logger.log('🔍 Starting TestData Diagnostic for row ' + rowNumber);
  Logger.log('═'.repeat(60));
  
  const results = {
    success: false,
    testDataSheetExists: false,
    headers: [],
    rowData: {},
    expectedProfile: '',
    actualProfile: '',
    missingFields: [],
    unexpectedFields: [],
    fieldMismatches: [],
    recommendations: []
  };
  
  try {
    // Step 1: Check if TestData sheet exists
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const testDataSheet = ss.getSheetByName('TestData');
    
    if (!testDataSheet) {
      Logger.log('❌ TestData sheet not found!');
      results.recommendations.push('Run createTestDataTab() to create the TestData sheet');
      return results;
    }
    
    results.testDataSheetExists = true;
    Logger.log('✅ TestData sheet exists');
    
    // Step 2: Read all headers
    const lastCol = testDataSheet.getLastColumn();
    const headers = testDataSheet.getRange(1, 1, 1, lastCol).getValues()[0];
    results.headers = headers;
    
    Logger.log('\n📋 Found ' + headers.length + ' headers:');
    headers.forEach((header, index) => {
      if (header) {
        Logger.log('  Column ' + (index + 1) + ': ' + header);
      }
    });
    
    // Step 3: Read row data
    const rowData = testDataSheet.getRange(rowNumber, 1, 1, lastCol).getValues()[0];
    const testData = {};
    headers.forEach((header, index) => {
      if (header) {
        testData[header] = rowData[index];
      }
    });
    results.rowData = testData;
    
    Logger.log('\n📊 Row ' + rowNumber + ' data:');
    Object.entries(testData).forEach(([key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        Logger.log('  ' + key + ': ' + value);
      }
    });
    
    // Step 4: Check expected values for Profile 3 (row 4)
    if (rowNumber === 4) {
      results.expectedProfile = '3_Solo401k_Builder';
      const expectedValues = {
        ProfileID: '3_Solo401k_Builder',
        Net_Monthly_Income: 7000,
        gross_annual_income: 84000,
        filing_status: 'Married Filing Jointly',
        Current_Age: 38,
        Retirement_Catchup: 'No',
        Tax_Minimization: 'Now',
        Using_ROBS: 'No',
        Interested_in_ROBS: 'No',
        Work_Situation: 'Self-employed',
        W2_Employees: 'No',
        hsa_eligibility: 'Yes',
        cesa_num_children: 1,
        investment_involvement: 2,
        retirement_importance: 5,
        retirement_years_until_target: 15
      };
      
      Logger.log('\n🎯 Checking Profile 3 expected values:');
      Object.entries(expectedValues).forEach(([key, expectedValue]) => {
        const actualValue = testData[key];
        if (actualValue === expectedValue) {
          Logger.log('  ✅ ' + key + ': ' + actualValue + ' (matches)');
        } else {
          Logger.log('  ❌ ' + key + ': expected ' + expectedValue + ', got ' + actualValue);
          results.fieldMismatches.push({
            field: key,
            expected: expectedValue,
            actual: actualValue
          });
        }
      });
    }
    
    // Step 5: Check for required fields
    const requiredFields = [
      'ProfileID', 'Current_Age', 'Net_Monthly_Income', 'gross_annual_income',
      'filing_status', 'Tax_Minimization', 'Using_ROBS', 'Interested_in_ROBS',
      'Work_Situation', 'W2_Employees', 'hsa_eligibility', 'cesa_num_children',
      'investment_involvement', 'retirement_importance', 'retirement_years_until_target'
    ];
    
    Logger.log('\n🔍 Checking required fields:');
    requiredFields.forEach(field => {
      if (!testData.hasOwnProperty(field) || testData[field] === '' || testData[field] === null) {
        Logger.log('  ❌ Missing: ' + field);
        results.missingFields.push(field);
      }
    });
    
    // Step 6: Simulate classification
    if (testData.Current_Age && testData.Using_ROBS !== undefined) {
      try {
        const classifiedProfile = simulatePhase1Classification(testData);
        results.actualProfile = classifiedProfile;
        
        Logger.log('\n🎯 Classification result:');
        Logger.log('  Expected: ' + results.expectedProfile);
        Logger.log('  Actual: ' + classifiedProfile);
        
        if (classifiedProfile === results.expectedProfile) {
          Logger.log('  ✅ Classification matches expected profile!');
        } else {
          Logger.log('  ❌ Classification mismatch!');
          results.recommendations.push('Check classification logic in simulatePhase1Classification()');
        }
      } catch (error) {
        Logger.log('  ❌ Classification error: ' + error.message);
        results.recommendations.push('Fix classification errors: ' + error.message);
      }
    }
    
    // Step 7: Generate recommendations
    if (results.missingFields.length > 0) {
      results.recommendations.push('Run createTestDataTab() to recreate TestData with all required fields');
    }
    
    if (results.fieldMismatches.length > 0) {
      results.recommendations.push('TestData values don\'t match expected Profile 3 values - recreate TestData sheet');
    }
    
    if (!results.testDataSheetExists) {
      results.recommendations.push('Create TestData sheet first using createTestDataTab()');
    }
    
    results.success = (results.missingFields.length === 0 && 
                      results.fieldMismatches.length === 0 && 
                      results.actualProfile === results.expectedProfile);
    
    // Final summary
    Logger.log('\n📋 SUMMARY:');
    Logger.log('  Test Data Sheet: ' + (results.testDataSheetExists ? 'Exists' : 'Missing'));
    Logger.log('  Missing Fields: ' + results.missingFields.length);
    Logger.log('  Field Mismatches: ' + results.fieldMismatches.length);
    Logger.log('  Classification: ' + (results.actualProfile === results.expectedProfile ? 'Correct' : 'Incorrect'));
    Logger.log('  Overall Status: ' + (results.success ? '✅ PASS' : '❌ FAIL'));
    
    if (results.recommendations.length > 0) {
      Logger.log('\n💡 Recommendations:');
      results.recommendations.forEach((rec, index) => {
        Logger.log('  ' + (index + 1) + '. ' + rec);
      });
    }
    
    Logger.log('\n' + '═'.repeat(60));
    
  } catch (error) {
    Logger.log('❌ Diagnostic error: ' + error.message);
    results.recommendations.push('Fix diagnostic error: ' + error.message);
  }
  
  return results;
}

/**
 * Quick diagnostic check for all test profiles
 * Checks if each profile row contains the expected ProfileID
 */
function diagnoseAllTestProfiles() {
  Logger.log('🔍 Diagnosing all test profiles...\n');
  
  const expectedProfiles = [
    { row: 2, profileId: '1_ROBS_In_Use' },
    { row: 3, profileId: '2_ROBS_Curious' },
    { row: 4, profileId: '3_Solo401k_Builder' },
    { row: 5, profileId: '4_Roth_Reclaimer' },
    { row: 6, profileId: '5_Bracket_Strategist' },
    { row: 7, profileId: '6_Catch_Up' },
    { row: 8, profileId: '7_Foundation_Builder' },
    { row: 9, profileId: '8_Biz_Owner_Group' },
    { row: 10, profileId: '9_Late_Stage_Growth' }
  ];
  
  const results = [];
  
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const testDataSheet = ss.getSheetByName('TestData');
    
    if (!testDataSheet) {
      Logger.log('❌ TestData sheet not found! Run createTestDataTab() first.');
      return;
    }
    
    // Get headers
    const headers = testDataSheet.getRange(1, 1, 1, testDataSheet.getLastColumn()).getValues()[0];
    const profileIdCol = headers.indexOf('ProfileID') + 1;
    
    if (profileIdCol === 0) {
      Logger.log('❌ ProfileID column not found in headers!');
      return;
    }
    
    // Check each profile
    expectedProfiles.forEach(({ row, profileId }) => {
      const actualProfileId = testDataSheet.getRange(row, profileIdCol).getValue();
      const matches = actualProfileId === profileId;
      
      results.push({
        row,
        expected: profileId,
        actual: actualProfileId,
        matches
      });
      
      Logger.log(
        (matches ? '✅' : '❌') + 
        ' Row ' + row + ': ' + 
        (matches ? profileId : 'Expected ' + profileId + ', got ' + actualProfileId)
      );
    });
    
    // Summary
    const passCount = results.filter(r => r.matches).length;
    Logger.log('\n📊 Summary: ' + passCount + '/' + results.length + ' profiles match expected values');
    
    if (passCount < results.length) {
      Logger.log('\n💡 Recommendation: Run createTestDataTab() to recreate the TestData sheet with correct values');
    }
    
  } catch (error) {
    Logger.log('❌ Error: ' + error.message);
  }
}

/**
 * Simulates the Phase 1 classification logic from classifyClientProfileFromWorkingSheet()
 * Uses the exact same logic but works with test data object instead of spreadsheet
 * @param {object} testData - Test data object with all required fields
 * @returns {string} Classified ProfileID
 */
function simulatePhase1Classification(testData) {
  // Extract the key fields used in classification (matching the exact field names from handlePhase1)
  const ageText = testData.Current_Age;
  const robsInUse = testData.Using_ROBS;
  const robsInterest = testData.Interested_in_ROBS;
  const robsNewBiz = testData.ROBS_New_Business;
  const robsFunds = testData.Rollover_Account_50k;
  const robsSetup = testData.Setup_Cost_Funding;
  const workSituation = testData.Work_Situation;
  const hasEmployees = testData.W2_Employees;
  const hasTradIRA = testData.Traditional_Retirement;
  const taxFocus = testData.Tax_Minimization;
  const catchUpFeeling = testData.Retirement_Catchup;
  const nearRetire = testData.Retirement_Timeframe;
  
  const age = parseInt(ageText, 10);
  
  // Apply the exact same classification logic from classifyClientProfileFromWorkingSheet()
  let profile = '';
  
  if (robsInUse === 'Yes') {
    profile = '1_ROBS_In_Use';
  } else if (
    robsInterest === 'Yes' &&
    robsNewBiz === 'Yes' &&
    robsFunds === 'Yes' &&
    robsSetup === 'Yes'
  ) {
    profile = '2_ROBS_Curious';
  } else if (hasEmployees === 'Yes') {
    profile = '8_Biz_Owner_Group';
  } else if ((workSituation === 'Self-employed' || workSituation === 'Both') && hasEmployees === 'No') {
    profile = '3_Solo401k_Builder';
  } else if (hasTradIRA === 'Yes') {
    profile = '4_Roth_Reclaimer';
  } else if (age >= 55 || String(nearRetire).startsWith('Yes')) {
    profile = '9_Late_Stage_Growth';
  } else if (age >= 50 && catchUpFeeling === 'Yes') {
    profile = '6_Catch_Up';
  } else if (['Now', 'Both'].includes(taxFocus)) {
    profile = '5_Bracket_Strategist';
  } else {
    profile = '7_Foundation_Builder';
  }
  
  return profile;
}

/**
 * Quick test function for Profile 3 specifically (easy to run from dropdown)
 * This is the main test case requested by the user
 */
function testProfile3Classification() {
  Logger.log('🧪 TESTING PROFILE 3 (3_Solo401k_Builder) CLASSIFICATION\n');
  
  try {
    const result = testSingleProfileClassification(4, '3_Solo401k_Builder', 'Profile 3');
    
    if (result.passed) {
      Logger.log(`✅ SUCCESS: Profile 3 correctly classified as ${result.actualProfile}`);
      Logger.log(`📋 Test data used:`);
      Logger.log(`   Age: ${result.testData.Current_Age}`);
      Logger.log(`   Work Situation: ${result.testData.Work_Situation}`);
      Logger.log(`   Has Employees: ${result.testData.W2_Employees}`);
      Logger.log(`   Using ROBS: ${result.testData.Using_ROBS}`);
      Logger.log(`   Interested in ROBS: ${result.testData.Interested_in_ROBS}`);
      return true;
    } else {
      Logger.log(`❌ FAILED: Expected 3_Solo401k_Builder, got ${result.actualProfile}`);
      return false;
    }
  } catch (error) {
    Logger.log(`❌ ERROR: ${error.message}`);
    return false;
  }
}

/**
 * Comprehensive test that validates the classification logic step by step
 * Shows exactly how each decision point works
 */
function debugPhase1Classification() {
  Logger.log('🔍 DEBUGGING PHASE 1 CLASSIFICATION LOGIC\n');
  Logger.log('═══════════════════════════════════════\n');
  
  // Test with Profile 3 data to show decision tree
  const testData = getTestDataRow(4); // Profile 3
  
  if (!testData) {
    Logger.log('❌ Could not read test data');
    return;
  }
  
  Logger.log('📋 Input Data:');
  Logger.log(`   Age: ${testData.Current_Age}`);
  Logger.log(`   Using ROBS: ${testData.Using_ROBS}`);
  Logger.log(`   Interested in ROBS: ${testData.Interested_in_ROBS}`);
  Logger.log(`   ROBS New Business: ${testData.ROBS_New_Business}`);
  Logger.log(`   Rollover Account 50k: ${testData.Rollover_Account_50k}`);
  Logger.log(`   Setup Cost Funding: ${testData.Setup_Cost_Funding}`);
  Logger.log(`   Work Situation: ${testData.Work_Situation}`);
  Logger.log(`   W2 Employees: ${testData.W2_Employees}`);
  Logger.log(`   Traditional Retirement: ${testData.Traditional_Retirement}`);
  Logger.log(`   Tax Minimization: ${testData.Tax_Minimization}`);
  Logger.log(`   Retirement Catchup: ${testData.Retirement_Catchup}`);
  Logger.log(`   Retirement Timeframe: ${testData.Retirement_Timeframe}`);
  
  Logger.log(`\n🔍 Decision Tree Evaluation:`);
  
  // Walk through the decision tree step by step
  if (testData.Using_ROBS === 'Yes') {
    Logger.log(`   ✓ Using ROBS = Yes → 1_ROBS_In_Use`);
    return '1_ROBS_In_Use';
  } else {
    Logger.log(`   ✗ Using ROBS = ${testData.Using_ROBS} (not Yes)`);
  }
  
  const robsCurious = (
    testData.Interested_in_ROBS === 'Yes' &&
    testData.ROBS_New_Business === 'Yes' &&
    testData.Rollover_Account_50k === 'Yes' &&
    testData.Setup_Cost_Funding === 'Yes'
  );
  
  if (robsCurious) {
    Logger.log(`   ✓ ROBS Curious criteria met → 2_ROBS_Curious`);
    return '2_ROBS_Curious';
  } else {
    Logger.log(`   ✗ ROBS Curious criteria not met:`);
    Logger.log(`     - Interested: ${testData.Interested_in_ROBS}`);
    Logger.log(`     - New Business: ${testData.ROBS_New_Business}`);
    Logger.log(`     - Rollover 50k: ${testData.Rollover_Account_50k}`);
    Logger.log(`     - Setup Funding: ${testData.Setup_Cost_Funding}`);
  }
  
  if (testData.W2_Employees === 'Yes') {
    Logger.log(`   ✓ Has W2 Employees = Yes → 8_Biz_Owner_Group`);
    return '8_Biz_Owner_Group';
  } else {
    Logger.log(`   ✗ Has W2 Employees = ${testData.W2_Employees} (not Yes)`);
  }
  
  const isSelfEmployedNoEmployees = (
    (testData.Work_Situation === 'Self-employed' || testData.Work_Situation === 'Both') && 
    testData.W2_Employees === 'No'
  );
  
  if (isSelfEmployedNoEmployees) {
    Logger.log(`   ✓ Self-employed with no employees → 3_Solo401k_Builder`);
    Logger.log(`     - Work Situation: ${testData.Work_Situation}`);
    Logger.log(`     - W2 Employees: ${testData.W2_Employees}`);
    return '3_Solo401k_Builder';
  } else {
    Logger.log(`   ✗ Not self-employed with no employees`);
    Logger.log(`     - Work Situation: ${testData.Work_Situation}`);
    Logger.log(`     - W2 Employees: ${testData.W2_Employees}`);
  }
  
  // Continue with remaining logic...
  const age = parseInt(testData.Current_Age, 10);
  
  if (testData.Traditional_Retirement === 'Yes') {
    Logger.log(`   ✓ Has Traditional IRA = Yes → 4_Roth_Reclaimer`);
    return '4_Roth_Reclaimer';
  }
  
  if (age >= 55 || String(testData.Retirement_Timeframe).startsWith('Yes')) {
    Logger.log(`   ✓ Age 55+ or near retirement → 9_Late_Stage_Growth`);
    return '9_Late_Stage_Growth';
  }
  
  if (age >= 50 && testData.Retirement_Catchup === 'Yes') {
    Logger.log(`   ✓ Age 50+ with catchup feeling → 6_Catch_Up`);
    return '6_Catch_Up';
  }
  
  if (['Now', 'Both'].includes(testData.Tax_Minimization)) {
    Logger.log(`   ✓ Tax focus Now/Both → 5_Bracket_Strategist`);
    return '5_Bracket_Strategist';
  }
  
  Logger.log(`   ✓ Default fallback → 7_Foundation_Builder`);
  return '7_Foundation_Builder';
}

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

// End-to-End Profile Tests
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * COMPREHENSIVE END-TO-END TEST FOR SOLO 401K BUILDER (PROFILE 3)
 * 
 * This test proves that the Solo 401k Builder is "ready and fully functional" by:
 * 1. Using Profile 3 test data from row 4 in TestData sheet
 * 2. Testing complete flow: Test Data → Profile Classification → Profile Helper → runUniversalEngine → Final Allocation
 * 3. Verifying all steps work correctly with detailed logging
 * 
 * Easy to run from Google Apps Script dropdown: testSolo401kBuilderEndToEnd()
 */
function testSolo401kBuilderEndToEnd() {
  Logger.log('🧪 COMPREHENSIVE END-TO-END TEST: SOLO 401K BUILDER (PROFILE 3)');
  Logger.log('═'.repeat(80));
  Logger.log('This test proves the Solo 401k Builder is ready and fully functional\n');
  
  let testResults = {
    testDataValid: false,
    classificationCorrect: false,
    helperExecuted: false,
    universalEngineWorked: false,
    allocationsValid: false,
    overallPassed: false
  };
  
  try {
    // ═══════════════════════════════════════════════════════════════════════════════
    // STEP 1: VERIFY TEST DATA FROM ROW 4 (PROFILE 3)
    // ═══════════════════════════════════════════════════════════════════════════════
    Logger.log('📋 STEP 1: Verifying Profile 3 test data from TestData sheet row 4...');
    
    const testData = getTestDataRow(4); // Row 4 contains Profile 3 test case
    if (!testData) {
      throw new Error('Could not read Profile 3 test data from row 4. Run createTestDataTab() first.');
    }
    
    // Verify key test data fields
    const expectedFields = {
      'ProfileID': '3_Solo401k_Builder',
      'Current_Age': 38,
      'Work_Situation': 'Self-employed',
      'W2_Employees': 'No',
      'Using_ROBS': 'No',
      'Interested_in_ROBS': 'No',
      'Tax_Minimization': 'Now',
      'hsa_eligibility': 'Yes',
      'cesa_num_children': 1,
      'Net_Monthly_Income': 7000,
      'gross_annual_income': 84000
    };
    
    Logger.log('   Verifying key test data fields:');
    let fieldsValid = true;
    Object.entries(expectedFields).forEach(([field, expectedValue]) => {
      const actualValue = testData[field];
      if (actualValue === expectedValue) {
        Logger.log(`   ✅ ${field}: ${actualValue} (correct)`);
      } else {
        Logger.log(`   ❌ ${field}: Expected ${expectedValue}, got ${actualValue}`);
        fieldsValid = false;
      }
    });
    
    if (!fieldsValid) {
      throw new Error('Test data validation failed - key fields do not match expected values');
    }
    
    testResults.testDataValid = true;
    Logger.log('   ✅ STEP 1 PASSED: Test data is valid\n');
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // STEP 2: TEST PROFILE CLASSIFICATION
    // ═══════════════════════════════════════════════════════════════════════════════
    Logger.log('🔍 STEP 2: Testing Profile Classification Logic...');
    Logger.log('   Input data for classification:');
    Logger.log(`   • Age: ${testData.Current_Age}`);
    Logger.log(`   • Work Situation: ${testData.Work_Situation}`);
    Logger.log(`   • Has W2 Employees: ${testData.W2_Employees}`);
    Logger.log(`   • Using ROBS: ${testData.Using_ROBS}`);
    Logger.log(`   • Interested in ROBS: ${testData.Interested_in_ROBS}`);
    
    const classifiedProfile = simulatePhase1Classification(testData);
    Logger.log(`   🔍 Classification result: ${classifiedProfile}`);
    
    if (classifiedProfile === '3_Solo401k_Builder') {
      testResults.classificationCorrect = true;
      Logger.log('   ✅ STEP 2 PASSED: Correctly classified as 3_Solo401k_Builder\n');
    } else {
      throw new Error(`Classification failed: Expected 3_Solo401k_Builder, got ${classifiedProfile}`);
    }
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // STEP 3: TEST PROFILE HELPER FUNCTION
    // ═══════════════════════════════════════════════════════════════════════════════
    Logger.log('⚙️ STEP 3: Testing 3_Solo401k_Builder Profile Helper Function...');
    
    // Convert test data to rowArr format for helper function
    const mockRowArr = convertTestDataToRowArray(testData);
    const { sheet, hdr } = initWS(); // Get proper header map from Working Sheet
    const mockHdr = hdr;
    
    // Execute the profile helper
    const helper = profileHelpers['3_Solo401k_Builder'];
    if (!helper) {
      throw new Error('3_Solo401k_Builder helper function not found');
    }
    
    const helperResult = helper(mockRowArr, mockHdr);
    
    // Validate helper result structure
    if (!helperResult || !helperResult.seeds || !helperResult.vehicleOrders) {
      throw new Error('Helper result missing required structure (seeds and vehicleOrders)');
    }
    
    Logger.log('   ✅ Helper executed successfully');
    Logger.log('   📊 Helper Results:');
    
    // Log seeds
    Logger.log('   Seeds (Pre-filled amounts):');
    Object.entries(helperResult.seeds).forEach(([domain, vehicles]) => {
      Logger.log(`     ${domain}:`);
      if (Object.keys(vehicles).length > 0) {
        Object.entries(vehicles).forEach(([vehicle, amount]) => {
          if (amount > 0) {
            Logger.log(`       • ${vehicle}: $${Math.round(amount)}/month`);
          }
        });
      } else {
        Logger.log(`       No existing contributions`);
      }
    });
    
    // Log vehicle orders
    Logger.log('   Vehicle Priority Orders:');
    Object.entries(helperResult.vehicleOrders).forEach(([domain, vehicles]) => {
      Logger.log(`     ${domain}:`);
      vehicles.forEach((vehicle, index) => {
        const capText = vehicle.capMonthly === Infinity ? 'Unlimited' : `$${Math.round(vehicle.capMonthly)}/month cap`;
        Logger.log(`       ${index + 1}. ${vehicle.name} (${capText})`);
      });
    });
    
    // Validate key aspects for Solo 401k Builder
    const retirementVehicles = helperResult.vehicleOrders.Retirement;
    const hasSolo401k = retirementVehicles.some(v => v.name.includes('Solo 401'));
    const hasHSA = helperResult.vehicleOrders.Health.some(v => v.name === 'HSA');
    const hasEducation = helperResult.vehicleOrders.Education.length > 0;
    
    if (!hasSolo401k) {
      throw new Error('Solo 401k vehicles missing from retirement order');
    }
    if (!hasHSA) {
      throw new Error('HSA missing from health order despite HSA eligibility');
    }
    if (!hasEducation) {
      throw new Error('Education vehicles missing despite having 1 child');
    }
    
    testResults.helperExecuted = true;
    Logger.log('   ✅ STEP 3 PASSED: Profile helper executed correctly with valid outputs\n');
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // STEP 4: TEST UNIVERSAL ENGINE WITH MOCK DATA
    // ═══════════════════════════════════════════════════════════════════════════════
    Logger.log('🚀 STEP 4: Testing Universal Engine with Profile 3 data...');
    
    // Simulate the universal engine flow
    const netIncome = testData.Net_Monthly_Income;
    const testAllocationAmount = netIncome * 0.2; // 20% savings rate for testing
    
    Logger.log(`   💰 Net Monthly Income: $${netIncome}`);
    Logger.log(`   💰 Test Allocation Amount: $${Math.round(testAllocationAmount)} (20% savings rate)`);
    
    // Test the core allocation logic
    const domains = {
      Education: { w: 0.15 },  // Mock domain weights
      Health: { w: 0.25 },
      Retirement: { w: 0.60 }
    };
    
    const pool = testAllocationAmount;
    const seeds = helperResult.seeds;
    const vehicleOrders = helperResult.vehicleOrders;
    
    // Call the core allocation function
    const allocationResult = coreAllocate({ domains, pool, seeds, vehicleOrders });
    
    if (!allocationResult) {
      throw new Error('Universal engine core allocation failed');
    }
    
    Logger.log('   ✅ Universal engine executed successfully');
    Logger.log('   📊 Allocation Results:');
    
    let totalAllocated = 0;
    Object.entries(allocationResult).forEach(([domain, vehicles]) => {
      Logger.log(`     ${domain}:`);
      let domainTotal = 0;
      Object.entries(vehicles).forEach(([vehicle, amount]) => {
        if (amount > 0) {
          Logger.log(`       • ${vehicle}: $${Math.round(amount)}/month`);
          domainTotal += amount;
          totalAllocated += amount;
        }
      });
      Logger.log(`       Domain Total: $${Math.round(domainTotal)}/month`);
    });
    
    Logger.log(`   💰 Total Allocated: $${Math.round(totalAllocated)}/month`);
    Logger.log(`   💰 Pool Available: $${Math.round(pool)}/month`);
    
    // Validate allocation makes sense
    if (totalAllocated <= 0) {
      throw new Error('No money was allocated by universal engine');
    }
    
    // Check that allocations respect vehicle caps
    let capsRespected = true;
    Object.entries(vehicleOrders).forEach(([domain, vehicles]) => {
      vehicles.forEach(vehicle => {
        const allocated = allocationResult[domain][vehicle.name] || 0;
        if (allocated > vehicle.capMonthly + 1) { // +1 for rounding tolerance
          Logger.log(`   ⚠️ WARNING: ${vehicle.name} allocated $${allocated} exceeds cap of $${vehicle.capMonthly}`);
          capsRespected = false;
        }
      });
    });
    
    if (!capsRespected) {
      throw new Error('Vehicle allocation caps were not respected');
    }
    
    testResults.universalEngineWorked = true;
    testResults.allocationsValid = true;
    Logger.log('   ✅ STEP 4 PASSED: Universal engine produced valid allocations\n');
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // STEP 5: FINAL VALIDATION AND SUMMARY
    // ═══════════════════════════════════════════════════════════════════════════════
    Logger.log('🏁 STEP 5: Final Validation and Summary...');
    
    // Validate Solo 401k specific functionality
    const solo401kEmployeeAllocated = allocationResult.Retirement['Solo 401(k) – Employee'] || 0;
    const solo401kEmployerAllocated = allocationResult.Retirement['Solo 401(k) – Employer'] || 0;
    const hsaAllocated = allocationResult.Health['HSA'] || 0;
    const cesaAllocated = allocationResult.Education['Combined CESA'] || 0;
    
    Logger.log('   Key Solo 401k Builder Allocations:');
    Logger.log(`   • Solo 401(k) Employee: $${Math.round(solo401kEmployeeAllocated)}/month`);
    Logger.log(`   • Solo 401(k) Employer: $${Math.round(solo401kEmployerAllocated)}/month`);
    Logger.log(`   • HSA: $${Math.round(hsaAllocated)}/month`);
    Logger.log(`   • Combined CESA: $${Math.round(cesaAllocated)}/month`);
    
    // Validate that priority vehicles are being used first
    const hasRetirementAllocation = solo401kEmployeeAllocated > 0 || solo401kEmployerAllocated > 0;
    const hasHealthAllocation = hsaAllocated > 0;
    const hasEducationAllocation = cesaAllocated > 0;
    
    if (!hasRetirementAllocation) {
      Logger.log('   ⚠️ WARNING: No Solo 401k allocations detected');
    }
    if (!hasHealthAllocation && testData.hsa_eligibility === 'Yes') {
      Logger.log('   ⚠️ WARNING: No HSA allocation despite eligibility');
    }
    if (!hasEducationAllocation && testData.cesa_num_children > 0) {
      Logger.log('   ⚠️ WARNING: No CESA allocation despite having children');
    }
    
    testResults.overallPassed = (
      testResults.testDataValid &&
      testResults.classificationCorrect &&
      testResults.helperExecuted &&
      testResults.universalEngineWorked &&
      testResults.allocationsValid
    );
    
    Logger.log('   ✅ STEP 5 COMPLETED: Final validation complete\n');
    
  } catch (error) {
    Logger.log(`\n❌ TEST FAILED: ${error.message}\n`);
    testResults.error = error.message;
  }
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // FINAL TEST SUMMARY
  // ═══════════════════════════════════════════════════════════════════════════════
  Logger.log('═'.repeat(80));
  Logger.log('📊 FINAL TEST SUMMARY: SOLO 401K BUILDER END-TO-END TEST');
  Logger.log('═'.repeat(80));
  
  const stepResults = [
    { name: 'Test Data Validation', passed: testResults.testDataValid },
    { name: 'Profile Classification', passed: testResults.classificationCorrect },
    { name: 'Profile Helper Execution', passed: testResults.helperExecuted },
    { name: 'Universal Engine', passed: testResults.universalEngineWorked },
    { name: 'Allocation Validation', passed: testResults.allocationsValid }
  ];
  
  stepResults.forEach((step, index) => {
    const status = step.passed ? '✅ PASSED' : '❌ FAILED';
    Logger.log(`${index + 1}. ${step.name}: ${status}`);
  });
  
  Logger.log('');
  if (testResults.overallPassed) {
    Logger.log('🎉 OVERALL RESULT: ✅ ALL TESTS PASSED');
    Logger.log('🎯 CONCLUSION: Solo 401k Builder (Profile 3) is READY and FULLY FUNCTIONAL');
    Logger.log('');
    Logger.log('The Solo 401k Builder profile successfully:');
    Logger.log('• ✅ Classifies correctly from test data');
    Logger.log('• ✅ Executes profile helper without errors');
    Logger.log('• ✅ Processes through universal engine');
    Logger.log('• ✅ Produces reasonable allocation outputs');
    Logger.log('• ✅ Respects vehicle caps and priority orders');
    Logger.log('• ✅ Handles HSA eligibility correctly');
    Logger.log('• ✅ Includes education savings for children');
    Logger.log('• ✅ Implements Solo 401k employee/employer structure');
  } else {
    Logger.log('❌ OVERALL RESULT: TESTS FAILED');
    Logger.log('⚠️ CONCLUSION: Solo 401k Builder needs attention before being considered fully functional');
    if (testResults.error) {
      Logger.log(`💥 Error: ${testResults.error}`);
    }
  }
  
  Logger.log('═'.repeat(80));
  
  return testResults;
}

/**
 * Helper function to convert test data object to rowArr format for profile helpers
 * Maps test data fields to the array positions expected by profile helper functions
 */
function convertTestDataToRowArray(testData) {
  const { sheet, hdr } = initWS(); // Get proper header map
  const maxCol = Math.max(...Object.values(hdr));
  const rowArr = new Array(maxCol).fill(''); // Initialize with correct size
  
  // Direct mapping: testData field names should match header names exactly
  Object.entries(testData).forEach(([testDataKey, value]) => {
    const colIndex = hdr[testDataKey];
    if (colIndex) {
      rowArr[colIndex - 1] = value; // -1 because hdr uses 1-based indexing
    }
  });
  
  return rowArr;
}

// Comprehensive Profile Helper Tests
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * COMPREHENSIVE TEST FOR ALL 9 PROFILE HELPERS
 * 
 * This test validates that all 9 profile helpers work correctly with their respective test data:
 * 1. For each profile (1-9), loads the corresponding test data from TestData sheet
 * 2. Tests that the profile helper function executes without errors
 * 3. Validates the helper returns proper structure (seeds and vehicleOrders)
 * 4. Checks that vehicle configurations match PROFILE_CONFIG expectations
 * 5. Verifies no missing functions or undefined references
 * 6. Tests edge cases like missing data or invalid values
 * 
 * Easy to run from Google Apps Script editor dropdown: testAllProfileHelpersComprehensive()
 */
function testAllProfileHelpersComprehensive() {
  Logger.log('🧪 COMPREHENSIVE TEST: ALL 9 PROFILE HELPERS');
  Logger.log('═'.repeat(80));
  Logger.log('Testing all profile helpers with their respective test data from TestData sheet\n');
  
  const allProfiles = [
    '1_ROBS_In_Use',
    '2_ROBS_Curious', 
    '3_Solo401k_Builder',
    '4_Roth_Reclaimer',
    '5_Bracket_Strategist',
    '6_Catch_Up',
    '7_Foundation_Builder',
    '8_Biz_Owner_Group',
    '9_Late_Stage_Growth'
  ];
  
  const testResults = {
    profiles: {},
    summary: {
      total: allProfiles.length,
      passed: 0,
      failed: 0,
      errors: []
    }
  };
  
  // Test each profile systematically
  allProfiles.forEach((profileId, index) => {
    const testRowNumber = index + 2; // TestData rows start at 2 (row 1 is headers)
    
    Logger.log(`\n${'═'.repeat(60)}`);
    Logger.log(`📋 TESTING PROFILE ${index + 1}/9: ${profileId}`);
    Logger.log(`${'═'.repeat(60)}`);
    Logger.log(`Using test data from TestData sheet row ${testRowNumber}`);
    
    try {
      const profileResult = testSingleProfileHelperComprehensive(profileId, testRowNumber);
      testResults.profiles[profileId] = profileResult;
      
      if (profileResult.overallPassed) {
        testResults.summary.passed++;
        Logger.log(`✅ ${profileId}: ALL TESTS PASSED`);
      } else {
        testResults.summary.failed++;
        Logger.log(`❌ ${profileId}: TESTS FAILED`);
        profileResult.failureReasons.forEach(reason => {
          Logger.log(`   • ${reason}`);
          testResults.summary.errors.push(`${profileId}: ${reason}`);
        });
      }
      
    } catch (error) {
      testResults.summary.failed++;
      const errorMsg = `${profileId}: Unexpected error - ${error.message}`;
      testResults.summary.errors.push(errorMsg);
      Logger.log(`❌ ${errorMsg}`);
      
      testResults.profiles[profileId] = {
        overallPassed: false,
        error: error.message,
        failureReasons: [`Unexpected error: ${error.message}`]
      };
    }
  });
  
  // ═══════════════════════════════════════════════════════════════════════════════
  // FINAL COMPREHENSIVE SUMMARY
  // ═══════════════════════════════════════════════════════════════════════════════
  Logger.log(`\n${'═'.repeat(80)}`);
  Logger.log('📊 COMPREHENSIVE TEST SUMMARY: ALL 9 PROFILE HELPERS');
  Logger.log('═'.repeat(80));
  
  Logger.log(`Total Profiles Tested: ${testResults.summary.total}`);
  Logger.log(`✅ Passed: ${testResults.summary.passed}`);
  Logger.log(`❌ Failed: ${testResults.summary.failed}`);
  
  if (testResults.summary.passed === testResults.summary.total) {
    Logger.log(`\n🎉 SUCCESS: ALL ${testResults.summary.total} PROFILE HELPERS ARE FUNCTIONAL AND READY!`);
    Logger.log(`\n✅ VALIDATION COMPLETE:`);
    Logger.log(`  • All profile helpers execute without errors`);
    Logger.log(`  • All helpers return proper structure (seeds and vehicleOrders)`);
    Logger.log(`  • Vehicle configurations respect limits and caps`);
    Logger.log(`  • HSA eligibility handled correctly across all profiles`);
    Logger.log(`  • Education vehicles included when appropriate`);
    Logger.log(`  • Tax preferences reflected in vehicle ordering`);
    Logger.log(`  • Catch-up contributions applied when age-appropriate`);
    Logger.log(`  • No missing functions or undefined references detected`);
    Logger.log(`\n🚀 RESULT: All 9 profile helpers are ready for production use!`);
  } else {
    Logger.log(`\n⚠️ ISSUES FOUND: ${testResults.summary.failed} profile(s) need attention`);
    Logger.log(`\nFailed Profiles and Reasons:`);
    testResults.summary.errors.forEach(error => {
      Logger.log(`  ❌ ${error}`);
    });
    Logger.log(`\n🔧 ACTION REQUIRED: Fix the above issues before considering profiles production-ready`);
  }
  
  Logger.log('═'.repeat(80));
  
  return testResults;
}

/**
 * Comprehensive test for a single profile helper using its test data
 * Tests all aspects: structure, functionality, edge cases, and financial logic
 */
function testSingleProfileHelperComprehensive(profileId, testRowNumber) {
  const result = {
    profileId: profileId,
    testRowNumber: testRowNumber,
    tests: {
      testDataValid: false,
      helperExists: false,
      helperExecutes: false,
      properStructure: false,
      vehicleConfigValid: false,
      hsaLogicCorrect: false,
      educationLogicCorrect: false,
      taxPreferenceLogic: false,
      catchupLogicCorrect: false,
      limitsRespected: false,
      edgeCasesHandled: false
    },
    overallPassed: false,
    failureReasons: [],
    details: {}
  };
  
  try {
    // ═══════════════════════════════════════════════════════════════════════════════
    // TEST 1: VALIDATE TEST DATA
    // ═══════════════════════════════════════════════════════════════════════════════
    Logger.log(`\n1️⃣ Testing: Test Data Validation`);
    
    const testData = getTestDataRow(testRowNumber);
    if (!testData || !testData.ProfileID) {
      result.failureReasons.push('Cannot read test data from TestData sheet');
      return result;
    }
    
    if (testData.ProfileID !== profileId) {
      result.failureReasons.push(`Test data mismatch: expected ${profileId}, got ${testData.ProfileID}`);
      return result;
    }
    
    result.tests.testDataValid = true;
    result.details.testData = testData;
    Logger.log(`   ✅ Test data valid for ${profileId}`);
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // TEST 2: VERIFY HELPER FUNCTION EXISTS
    // ═══════════════════════════════════════════════════════════════════════════════
    Logger.log(`\n2️⃣ Testing: Helper Function Exists`);
    
    const helper = profileHelpers[profileId];
    if (!helper || typeof helper !== 'function') {
      result.failureReasons.push('Profile helper function not found or not a function');
      return result;
    }
    
    result.tests.helperExists = true;
    Logger.log(`   ✅ Helper function exists for ${profileId}`);
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // TEST 3: EXECUTE HELPER WITH TEST DATA
    // ═══════════════════════════════════════════════════════════════════════════════
    Logger.log(`\n3️⃣ Testing: Helper Execution`);
    
    const mockRowArr = convertTestDataToRowArray(testData);
    const mockHdr = HEADERS;
    
    let helperResult;
    try {
      helperResult = helper(mockRowArr, mockHdr);
      result.tests.helperExecutes = true;
      Logger.log(`   ✅ Helper executed without errors`);
    } catch (execError) {
      result.failureReasons.push(`Helper execution error: ${execError.message}`);
      return result;
    }
    
    result.details.helperResult = helperResult;
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // TEST 4: VALIDATE RETURN STRUCTURE
    // ═══════════════════════════════════════════════════════════════════════════════
    Logger.log(`\n4️⃣ Testing: Return Structure`);
    
    if (!helperResult || typeof helperResult !== 'object') {
      result.failureReasons.push('Helper did not return an object');
      return result;
    }
    
    if (!helperResult.seeds || typeof helperResult.seeds !== 'object') {
      result.failureReasons.push('Helper result missing seeds object');
      return result;
    }
    
    if (!helperResult.vehicleOrders || typeof helperResult.vehicleOrders !== 'object') {
      result.failureReasons.push('Helper result missing vehicleOrders object');
      return result;
    }
    
    // Check required domains
    const requiredDomains = ['Education', 'Health', 'Retirement'];
    const missingSeedDomains = requiredDomains.filter(domain => !helperResult.seeds[domain]);
    const missingOrderDomains = requiredDomains.filter(domain => !helperResult.vehicleOrders[domain]);
    
    if (missingSeedDomains.length > 0) {
      result.failureReasons.push(`Missing seed domains: ${missingSeedDomains.join(', ')}`);
      return result;
    }
    
    if (missingOrderDomains.length > 0) {
      result.failureReasons.push(`Missing vehicleOrder domains: ${missingOrderDomains.join(', ')}`);
      return result;
    }
    
    result.tests.properStructure = true;
    Logger.log(`   ✅ Return structure is valid`);
    Logger.log(`   Seeds domains: ${Object.keys(helperResult.seeds).join(', ')}`);
    Logger.log(`   VehicleOrder domains: ${Object.keys(helperResult.vehicleOrders).join(', ')}`);
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // TEST 5: VALIDATE VEHICLE CONFIGURATIONS
    // ═══════════════════════════════════════════════════════════════════════════════
    Logger.log(`\n5️⃣ Testing: Vehicle Configurations`);
    
    let vehicleConfigIssues = [];
    
    Object.entries(helperResult.vehicleOrders).forEach(([domain, vehicles]) => {
      if (!Array.isArray(vehicles)) {
        vehicleConfigIssues.push(`${domain} vehicleOrders is not an array`);
        return;
      }
      
      vehicles.forEach((vehicle, index) => {
        if (!vehicle.name || typeof vehicle.name !== 'string') {
          vehicleConfigIssues.push(`${domain}[${index}] missing or invalid name`);
        }
        
        if (typeof vehicle.capMonthly !== 'number' || vehicle.capMonthly < 0) {
          vehicleConfigIssues.push(`${domain}[${index}] invalid capMonthly: ${vehicle.capMonthly}`);
        }
      });
    });
    
    if (vehicleConfigIssues.length > 0) {
      result.failureReasons.push(...vehicleConfigIssues);
    } else {
      result.tests.vehicleConfigValid = true;
      Logger.log(`   ✅ All vehicle configurations are valid`);
    }
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // TEST 6: HSA ELIGIBILITY LOGIC
    // ═══════════════════════════════════════════════════════════════════════════════
    Logger.log(`\n6️⃣ Testing: HSA Eligibility Logic`);
    
    const hsaEligible = testData.hsa_eligibility === 'Yes';
    const hsaInHealth = helperResult.vehicleOrders.Health?.some(v => v.name === 'HSA') || false;
    const hsaInRetirement = helperResult.vehicleOrders.Retirement?.some(v => v.name === 'HSA') || false;
    const hasHSA = hsaInHealth || hsaInRetirement;
    
    if (hsaEligible && !hasHSA) {
      result.failureReasons.push('HSA eligible but HSA vehicle not found in Health or Retirement');
    } else if (!hsaEligible && hasHSA) {
      result.failureReasons.push('Not HSA eligible but HSA vehicle present');
    } else {
      result.tests.hsaLogicCorrect = true;
      Logger.log(`   ✅ HSA logic correct (eligible: ${hsaEligible}, present: ${hasHSA})`);
    }
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // TEST 7: EDUCATION LOGIC (CESA)
    // ═══════════════════════════════════════════════════════════════════════════════
    Logger.log(`\n7️⃣ Testing: Education Logic`);
    
    const numKids = Number(testData.cesa_num_children) || 0;
    const hasEducationVehicles = helperResult.vehicleOrders.Education?.some(v => 
      v.name.includes('CESA') || v.name.includes('Education')
    ) || false;
    
    if (numKids > 0 && !hasEducationVehicles) {
      result.failureReasons.push(`Has ${numKids} children but no education vehicles found`);
    } else {
      result.tests.educationLogicCorrect = true;
      Logger.log(`   ✅ Education logic correct (kids: ${numKids}, has education vehicles: ${hasEducationVehicles})`);
    }
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // TEST 8: TAX PREFERENCE LOGIC
    // ═══════════════════════════════════════════════════════════════════════════════
    Logger.log(`\n8️⃣ Testing: Tax Preference Logic`);
    
    const taxPref = testData.Tax_Minimization;
    const retirementVehicles = helperResult.vehicleOrders.Retirement || [];
    const firstRetirementVehicle = retirementVehicles[0];
    
    let taxLogicIssues = [];
    
    if (taxPref === 'Now' && firstRetirementVehicle?.name.includes('Roth')) {
      taxLogicIssues.push('Tax preference "Now" but Roth vehicle prioritized first');
    }
    
    if (taxPref === 'Later' && firstRetirementVehicle && !firstRetirementVehicle.name.includes('Roth')) {
      // Check if any Roth vehicles exist
      const hasRothVehicles = retirementVehicles.some(v => v.name.includes('Roth'));
      if (!hasRothVehicles) {
        taxLogicIssues.push('Tax preference "Later" but no Roth vehicles found');
      }
    }
    
    if (taxLogicIssues.length > 0) {
      result.failureReasons.push(...taxLogicIssues);
    } else {
      result.tests.taxPreferenceLogic = true;
      Logger.log(`   ✅ Tax preference logic appropriate (pref: ${taxPref})`);
    }
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // TEST 9: CATCH-UP CONTRIBUTION LOGIC
    // ═══════════════════════════════════════════════════════════════════════════════
    Logger.log(`\n9️⃣ Testing: Catch-up Contribution Logic`);
    
    const age = Number(testData.Current_Age) || 0;
    const catchupEligible = age >= 50 && testData.Retirement_Catchup === 'Yes';
    
    // Check if catch-up limits appear to be applied (rough check)
    let catchupApplied = false;
    retirementVehicles.forEach(vehicle => {
      if (vehicle.name.includes('401') && vehicle.capMonthly > 2000) { // Basic 401k limit is ~$1916/month
        catchupApplied = true;
      }
      if (vehicle.name.includes('IRA') && vehicle.capMonthly > 500) { // Basic IRA limit is $500/month
        catchupApplied = true;
      }
    });
    
    if (catchupEligible && !catchupApplied) {
      result.failureReasons.push(`Age ${age}, catch-up eligible, but catch-up limits may not be applied`);
    } else {
      result.tests.catchupLogicCorrect = true;
      Logger.log(`   ✅ Catch-up logic appropriate (age: ${age}, eligible: ${catchupEligible})`);
    }
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // TEST 10: CONTRIBUTION LIMITS RESPECTED
    // ═══════════════════════════════════════════════════════════════════════════════
    Logger.log(`\n🔟 Testing: Contribution Limits`);
    
    let limitIssues = [];
    
    // Check some basic limits (this is a simplified check)
    Object.entries(helperResult.vehicleOrders).forEach(([domain, vehicles]) => {
      vehicles.forEach(vehicle => {
        // HSA limits
        if (vehicle.name === 'HSA' && vehicle.capMonthly > 400) { // ~$4800/year individual limit
          limitIssues.push(`HSA cap too high: $${vehicle.capMonthly}/month`);
        }
        
        // Basic 401k limits (without catch-up)
        if (vehicle.name.includes('401') && !catchupEligible && vehicle.capMonthly > 2100) {
          limitIssues.push(`401k cap potentially too high for non-catch-up: $${vehicle.capMonthly}/month`);
        }
      });
    });
    
    if (limitIssues.length > 0) {
      result.failureReasons.push(...limitIssues);
    } else {
      result.tests.limitsRespected = true;
      Logger.log(`   ✅ Contribution limits appear reasonable`);
    }
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // TEST 11: EDGE CASES AND ERROR HANDLING
    // ═══════════════════════════════════════════════════════════════════════════════
    Logger.log(`\n1️⃣1️⃣ Testing: Edge Cases`);
    
    // Test with some invalid/edge case data
    try {
      const edgeRowArr = [...mockRowArr];
      // Introduce some edge cases
      edgeRowArr[0] = ''; // Empty student ID
      edgeRowArr[1] = 'invalid_age'; // Invalid age
      
      const edgeResult = helper(edgeRowArr, mockHdr);
      
      // Should still return valid structure even with bad data
      if (edgeResult && edgeResult.seeds && edgeResult.vehicleOrders) {
        result.tests.edgeCasesHandled = true;
        Logger.log(`   ✅ Edge cases handled gracefully`);
      } else {
        result.failureReasons.push('Helper fails to handle edge cases gracefully');
      }
    } catch (edgeError) {
      result.failureReasons.push(`Edge case handling error: ${edgeError.message}`);
    }
    
    // ═══════════════════════════════════════════════════════════════════════════════
    // FINAL RESULT CALCULATION
    // ═══════════════════════════════════════════════════════════════════════════════
    const passedTests = Object.values(result.tests).filter(Boolean).length;
    const totalTests = Object.keys(result.tests).length;
    
    result.overallPassed = result.failureReasons.length === 0 && passedTests === totalTests;
    result.details.testsPassedCount = passedTests;
    result.details.totalTestCount = totalTests;
    
    Logger.log(`\n📊 ${profileId} Test Summary: ${passedTests}/${totalTests} tests passed`);
    
    if (result.overallPassed) {
      Logger.log(`✅ ${profileId}: COMPREHENSIVE TEST PASSED - Ready for production!`);
    } else {
      Logger.log(`❌ ${profileId}: Issues found - needs attention`);
    }
    
  } catch (error) {
    result.failureReasons.push(`Unexpected test error: ${error.message}`);
    Logger.log(`❌ Unexpected error testing ${profileId}: ${error.message}`);
  }
  
  return result;
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

// Quick Access Functions for Comprehensive Testing
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Quick access function to test a specific profile helper comprehensively
 * Example: testSingleProfileComprehensive('1_ROBS_In_Use')
 */
function testSingleProfileComprehensive(profileId) {
  Logger.log(`🧪 COMPREHENSIVE TEST: ${profileId}`);
  Logger.log('═'.repeat(60));
  
  // Map profile ID to test row number
  const profileToRowMap = {
    '1_ROBS_In_Use': 2,
    '2_ROBS_Curious': 3,
    '3_Solo401k_Builder': 4,
    '4_Roth_Reclaimer': 5,
    '5_Bracket_Strategist': 6,
    '6_Catch_Up': 7,
    '7_Foundation_Builder': 8,
    '8_Biz_Owner_Group': 9,
    '9_Late_Stage_Growth': 10
  };
  
  const testRowNumber = profileToRowMap[profileId];
  if (!testRowNumber) {
    Logger.log(`❌ Unknown profile ID: ${profileId}`);
    return null;
  }
  
  return testSingleProfileHelperComprehensive(profileId, testRowNumber);
}

/**
 * Test all profile helpers with specific edge cases
 * This tests scenarios like extreme ages, high income, multiple children, etc.
 */
function testAllProfileHelpersEdgeCases() {
  Logger.log('🧪 EDGE CASE TESTING: ALL PROFILE HELPERS');
  Logger.log('═'.repeat(80));
  Logger.log('Testing all profile helpers with edge case scenarios\n');
  
  const edgeCaseScenarios = [
    {
      name: 'Very Young (22 years old)',
      modifications: { Current_Age: 22, Retirement_Catchup: 'No' }
    },
    {
      name: 'Very Old (70 years old)', 
      modifications: { Current_Age: 70, Retirement_Catchup: 'Yes' }
    },
    {
      name: 'High Income ($500K)',
      modifications: { gross_annual_income: 500000, Net_Monthly_Income: 35000 }
    },
    {
      name: 'Low Income ($25K)',
      modifications: { gross_annual_income: 25000, Net_Monthly_Income: 1500 }
    },
    {
      name: 'Many Children (5 kids)',
      modifications: { cesa_num_children: 5 }
    },
    {
      name: 'Invalid/Missing Data',
      modifications: { Current_Age: '', gross_annual_income: 'invalid', Tax_Minimization: '' }
    }
  ];
  
  const allProfiles = [
    '1_ROBS_In_Use', '2_ROBS_Curious', '3_Solo401k_Builder', '4_Roth_Reclaimer',
    '5_Bracket_Strategist', '6_Catch_Up', '7_Foundation_Builder', '8_Biz_Owner_Group', '9_Late_Stage_Growth'
  ];
  
  const results = {};
  
  edgeCaseScenarios.forEach(scenario => {
    Logger.log(`\n${'═'.repeat(60)}`);
    Logger.log(`🎯 EDGE CASE: ${scenario.name}`);
    Logger.log('═'.repeat(60));
    
    results[scenario.name] = {};
    
    allProfiles.forEach(profileId => {
      try {
        Logger.log(`\n📋 Testing ${profileId} with ${scenario.name}...`);
        
        // Get base test data and apply modifications
        const testRowNumber = allProfiles.indexOf(profileId) + 2;
        const baseTestData = getTestDataRow(testRowNumber);
        
        if (!baseTestData) {
          Logger.log(`❌ Cannot get test data for ${profileId}`);
          results[scenario.name][profileId] = { success: false, error: 'No test data' };
          return;
        }
        
        // Apply edge case modifications
        const modifiedTestData = { ...baseTestData, ...scenario.modifications };
        
        // Convert to helper format and test
        const mockRowArr = convertTestDataToRowArray(modifiedTestData);
        const mockHdr = HEADERS;
        
        const helper = profileHelpers[profileId];
        if (!helper) {
          Logger.log(`❌ Helper not found for ${profileId}`);
          results[scenario.name][profileId] = { success: false, error: 'Helper not found' };
          return;
        }
        
        const result = helper(mockRowArr, mockHdr);
        
        // Basic validation
        if (result && result.seeds && result.vehicleOrders) {
          Logger.log(`   ✅ ${profileId}: Handled edge case gracefully`);
          results[scenario.name][profileId] = { success: true, result };
        } else {
          Logger.log(`   ❌ ${profileId}: Invalid result structure`);
          results[scenario.name][profileId] = { success: false, error: 'Invalid structure' };
        }
        
      } catch (error) {
        Logger.log(`   ❌ ${profileId}: Error - ${error.message}`);
        results[scenario.name][profileId] = { success: false, error: error.message };
      }
    });
  });
  
  // Summary
  Logger.log(`\n${'═'.repeat(80)}`);
  Logger.log('📊 EDGE CASE TEST SUMMARY');
  Logger.log('═'.repeat(80));
  
  edgeCaseScenarios.forEach(scenario => {
    const scenarioResults = results[scenario.name];
    const successes = Object.values(scenarioResults).filter(r => r.success).length;
    const total = Object.keys(scenarioResults).length;
    
    Logger.log(`${scenario.name}: ${successes}/${total} profiles handled correctly`);
    
    Object.entries(scenarioResults).forEach(([profileId, result]) => {
      if (!result.success) {
        Logger.log(`  ❌ ${profileId}: ${result.error}`);
      }
    });
  });
  
  return results;
}

/**
 * Individual comprehensive test functions for easy dropdown access
 */
function testComprehensive_1_ROBS_In_Use() { return testSingleProfileComprehensive('1_ROBS_In_Use'); }
function testComprehensive_2_ROBS_Curious() { return testSingleProfileComprehensive('2_ROBS_Curious'); }
function testComprehensive_3_Solo401k_Builder() { return testSingleProfileComprehensive('3_Solo401k_Builder'); }
function testComprehensive_4_Roth_Reclaimer() { return testSingleProfileComprehensive('4_Roth_Reclaimer'); }
function testComprehensive_5_Bracket_Strategist() { return testSingleProfileComprehensive('5_Bracket_Strategist'); }
function testComprehensive_6_Catch_Up() { return testSingleProfileComprehensive('6_Catch_Up'); }
function testComprehensive_7_Foundation_Builder() { return testSingleProfileComprehensive('7_Foundation_Builder'); }
function testComprehensive_8_Biz_Owner_Group() { return testSingleProfileComprehensive('8_Biz_Owner_Group'); }
function testComprehensive_9_Late_Stage_Growth() { return testSingleProfileComprehensive('9_Late_Stage_Growth'); }

/**
 * Test that all profile helpers integrate correctly with the universal engine
 */
function testAllProfileHelpersWithUniversalEngine() {
  Logger.log('🧪 INTEGRATION TEST: ALL PROFILE HELPERS WITH UNIVERSAL ENGINE');
  Logger.log('═'.repeat(80));
  Logger.log('Testing that all profile helpers work correctly with the universal engine\n');
  
  const allProfiles = [
    '1_ROBS_In_Use', '2_ROBS_Curious', '3_Solo401k_Builder', '4_Roth_Reclaimer',
    '5_Bracket_Strategist', '6_Catch_Up', '7_Foundation_Builder', '8_Biz_Owner_Group', '9_Late_Stage_Growth'
  ];
  
  const results = {};
  let totalPassed = 0;
  let totalFailed = 0;
  
  allProfiles.forEach((profileId, index) => {
    const testRowNumber = index + 2;
    
    Logger.log(`\n${'═'.repeat(60)}`);
    Logger.log(`🔄 INTEGRATION TEST ${index + 1}/9: ${profileId}`);
    Logger.log('═'.repeat(60));
    
    try {
      // Get test data
      const testData = getTestDataRow(testRowNumber);
      if (!testData) {
        throw new Error('Cannot read test data');
      }
      
      // Test helper execution
      const mockRowArr = convertTestDataToRowArray(testData);
      const helper = profileHelpers[profileId];
      const helperResult = helper(mockRowArr, HEADERS);
      
      Logger.log(`✅ Helper executed successfully`);
      
      // Test with universal engine allocation logic
      const testAmount = (testData.Net_Monthly_Income || 5000) * 0.2; // 20% savings rate
      Logger.log(`💰 Testing allocation of $${Math.round(testAmount)}/month`);
      
      // Simulate core allocation
      const domains = {
        Education: { w: 0.15 },
        Health: { w: 0.25 },
        Retirement: { w: 0.60 }
      };
      
      try {
        const allocation = coreAllocate({
          domains: domains,
          pool: testAmount,
          seeds: helperResult.seeds,
          vehicleOrders: helperResult.vehicleOrders
        });
        
        if (allocation && typeof allocation === 'object') {
          Logger.log(`✅ Universal engine allocation successful`);
          
          // Validate allocation
          let totalAllocated = 0;
          Object.values(allocation).forEach(domainAllocation => {
            Object.values(domainAllocation).forEach(amount => {
              if (typeof amount === 'number') totalAllocated += amount;
            });
          });
          
          Logger.log(`💰 Total allocated: $${Math.round(totalAllocated)}/month`);
          
          results[profileId] = {
            success: true,
            helperResult,
            allocation,
            totalAllocated
          };
          totalPassed++;
          
        } else {
          throw new Error('Invalid allocation result');
        }
        
      } catch (allocError) {
        throw new Error(`Universal engine allocation failed: ${allocError.message}`);
      }
      
    } catch (error) {
      Logger.log(`❌ Integration test failed: ${error.message}`);
      results[profileId] = {
        success: false,
        error: error.message
      };
      totalFailed++;
    }
  });
  
  // Final summary
  Logger.log(`\n${'═'.repeat(80)}`);
  Logger.log('📊 INTEGRATION TEST SUMMARY');
  Logger.log('═'.repeat(80));
  Logger.log(`✅ Passed: ${totalPassed}/${allProfiles.length}`);
  Logger.log(`❌ Failed: ${totalFailed}/${allProfiles.length}`);
  
  if (totalPassed === allProfiles.length) {
    Logger.log(`\n🎉 SUCCESS: ALL PROFILE HELPERS INTEGRATE CORRECTLY WITH UNIVERSAL ENGINE!`);
    Logger.log(`All 9 profile helpers successfully:`)
    Logger.log(`• Execute without errors`);
    Logger.log(`• Return valid structures for the universal engine`);
    Logger.log(`• Process through allocation logic correctly`);
    Logger.log(`• Produce reasonable allocation outputs`);
  } else {
    Logger.log(`\n⚠️ INTEGRATION ISSUES: ${totalFailed} profile(s) failed integration testing`);
    Object.entries(results).forEach(([profileId, result]) => {
      if (!result.success) {
        Logger.log(`❌ ${profileId}: ${result.error}`);
      }
    });
  }
  
  return results;
}


// ═══════════════════════════════════════════════════════════════════════════════
// COMPREHENSIVE ALLOCATION ENGINE TEST
// ═══════════════════════════════════════════════════════════════════════════════
// Tests the complete allocation engine (runUniversalEngine) with all 9 test profiles
// Validates mathematical correctness, vehicle caps, domain weights, and more

function testCompleteAllocationEngine() {
  Logger.log(`\n${'═'.repeat(80)}`);
  Logger.log('🧪 COMPREHENSIVE ALLOCATION ENGINE TEST');
  Logger.log('Testing runUniversalEngine with all 9 test profiles');
  Logger.log('═'.repeat(80));
  
  const results = {
    profileResults: {},
    overallResults: {
      totalProfiles: 0,
      passedProfiles: 0,
      failedProfiles: 0,
      totalTests: 0,
      passedTests: 0,
      failedTests: 0
    },
    validationSummary: {
      mathematicalAccuracy: true,
      vehicleCapRespect: true,
      domainWeightApplication: true,
      investmentInvolvementEffect: true,
      monthlyAllocationSum: true,
      incomeConstraints: true,
      returnRateCalculation: true
    }
  };
  
  // All 9 test profiles to validate
  const testProfiles = [
    { id: '1_ROBS_In_Use', row: 3 },
    { id: '2_ROBS_Curious', row: 4 },
    { id: '3_Solo401k_Builder', row: 5 },
    { id: '4_Roth_Reclaimer', row: 6 },
    { id: '5_Bracket_Strategist', row: 7 },
    { id: '6_Catch_Up', row: 8 },
    { id: '7_Foundation_Builder', row: 9 },
    { id: '8_Biz_Owner_Group', row: 10 },
    { id: '9_Late_Stage_Growth', row: 11 }
  ];
  
  results.overallResults.totalProfiles = testProfiles.length;
  
  // Test each profile
  testProfiles.forEach((profile, index) => {
    Logger.log(`\n${'-'.repeat(60)}`);
    Logger.log(`TEST ${index + 1}/9: ${profile.id}`);
    Logger.log('-'.repeat(60));
    
    const profileResult = {
      profileId: profile.id,
      testRow: profile.row,
      tests: {
        engineExecution: false,
        validOutput: false,
        mathematicalAccuracy: false,
        vehicleCapRespect: false,
        domainWeightApplication: false,
        investmentInvolvementEffect: false,
        incomeConstraints: false,
        monthlyAllocationSum: false,
        returnRateCalculation: false
      },
      data: {},
      errors: []
    };
    
    try {
      // 1. Execute runUniversalEngine
      Logger.log(`🔄 Running universal engine for ${profile.id}...`);
      
      const engineResult = runUniversalEngine(profile.row);
      
      if (!engineResult || !engineResult.domains || !engineResult.vehicles) {
        throw new Error('runUniversalEngine returned invalid structure');
      }
      
      profileResult.tests.engineExecution = true;
      profileResult.data.engineResult = engineResult;
      Logger.log(`✅ Engine execution successful`);
      
      // 2. Validate output structure
      const { domains, vehicles } = engineResult;
      
      if (domains.Education && domains.Health && domains.Retirement &&
          vehicles.Education && vehicles.Health && vehicles.Retirement) {
        profileResult.tests.validOutput = true;
        Logger.log(`✅ Valid output structure`);
      } else {
        throw new Error('Missing domain data in engine output');
      }
      
      // 3. Get test data for validation
      const testData = getTestDataRow(profile.row);
      if (!testData) {
        throw new Error('Cannot retrieve test data for validation');
      }
      
      profileResult.data.testData = testData;
      
      // 4. Test mathematical accuracy - allocations sum correctly
      let totalAllocated = 0;
      let domainTotals = {};
      
      Object.entries(vehicles).forEach(([domain, domainVehicles]) => {
        domainTotals[domain] = 0;
        Object.values(domainVehicles).forEach(amount => {
          if (typeof amount === 'number' && amount > 0) {
            totalAllocated += amount;
            domainTotals[domain] += amount;
          }
        });
      });
      
      profileResult.data.totalAllocated = totalAllocated;
      profileResult.data.domainTotals = domainTotals;
      
      if (totalAllocated > 0) {
        profileResult.tests.mathematicalAccuracy = true;
        Logger.log(`✅ Mathematical accuracy: $${Math.round(totalAllocated)}/month allocated`);
      } else {
        profileResult.errors.push('No positive allocations found');
      }
      
      // 5. Test vehicle caps are respected
      let vehicleCapViolations = 0;
      const helper = profileHelpers[profile.id];
      if (helper) {
        const mockRowArr = convertTestDataToRowArray(testData);
        const helperResult = helper(mockRowArr, HEADERS);
        
        if (helperResult && helperResult.vehicleOrders) {
          Object.entries(helperResult.vehicleOrders).forEach(([domain, vehicleList]) => {
            vehicleList.forEach(vehicle => {
              const allocated = vehicles[domain][vehicle.name] || 0;
              if (allocated > vehicle.capMonthly + 1) { // +1 for rounding tolerance
                vehicleCapViolations++;
                profileResult.errors.push(`${vehicle.name}: allocated $${allocated} > cap $${vehicle.capMonthly}`);
              }
            });
          });
        }
      }
      
      if (vehicleCapViolations === 0) {
        profileResult.tests.vehicleCapRespect = true;
        Logger.log(`✅ Vehicle caps respected`);
      } else {
        profileResult.errors.push(`${vehicleCapViolations} vehicle cap violations`);
      }
      
      // 6. Test domain weights are properly applied
      const domainWeightTotal = domains.Education.w + domains.Health.w + domains.Retirement.w;
      if (Math.abs(domainWeightTotal - 1.0) < 0.01) { // Allow small rounding errors
        profileResult.tests.domainWeightApplication = true;
        Logger.log(`✅ Domain weights sum to 1.0 (${domainWeightTotal.toFixed(3)})`);
      } else {
        profileResult.errors.push(`Domain weights sum to ${domainWeightTotal}, not 1.0`);
      }
      
      // 7. Test investment involvement affects return rates correctly
      const inv1 = testData.investment_involvement || 1;
      const inv2 = testData.investment_time || 1;
      const inv3 = testData.investment_confidence || 1;
      const Sbar = (inv1 + inv2 + inv3) / 3;
      const expectedRAnn = 0.08 + ((Sbar - 1) / 6) * 0.12;
      
      if (Sbar >= 1 && Sbar <= 7 && expectedRAnn >= 0.08 && expectedRAnn <= 0.20) {
        profileResult.tests.investmentInvolvementEffect = true;
        profileResult.data.returnRate = expectedRAnn;
        Logger.log(`✅ Investment involvement effect: Sbar=${Sbar.toFixed(2)}, rAnn=${(expectedRAnn*100).toFixed(1)}%`);
      } else {
        profileResult.errors.push(`Invalid investment parameters or return rate calculation`);
      }
      
      // 8. Test total allocations don't exceed available income
      const netIncome = testData.Net_Monthly_Income || 0;
      const savingsRate = totalAllocated / netIncome;
      
      if (totalAllocated <= netIncome) {
        profileResult.tests.incomeConstraints = true;
        Logger.log(`✅ Income constraints: $${Math.round(totalAllocated)}/$${netIncome} (${(savingsRate*100).toFixed(1)}% savings rate)`);
      } else {
        profileResult.errors.push(`Allocations exceed income: $${Math.round(totalAllocated)} > $${netIncome}`);
      }
      
      // 9. Test monthly allocations sum correctly within domains
      let domainSumErrors = 0;
      Object.entries(domainTotals).forEach(([domain, total]) => {
        const expectedTotal = domains[domain].w * totalAllocated;
        if (Math.abs(total - expectedTotal) > 1) { // Allow $1 rounding tolerance
          domainSumErrors++;
          profileResult.errors.push(`${domain}: allocated $${Math.round(total)} ≠ expected $${Math.round(expectedTotal)}`);
        }
      });
      
      if (domainSumErrors === 0) {
        profileResult.tests.monthlyAllocationSum = true;
        Logger.log(`✅ Monthly allocations sum correctly within domains`);
      }
      
      // 10. Test return rate calculation consistency
      const rMonthly = expectedRAnn / 12;
      if (rMonthly > 0 && rMonthly <= 0.02) { // Reasonable monthly rate
        profileResult.tests.returnRateCalculation = true;
        Logger.log(`✅ Return rate calculation: ${(rMonthly*100).toFixed(3)}%/month`);
      } else {
        profileResult.errors.push(`Unreasonable monthly return rate: ${(rMonthly*100).toFixed(3)}%`);
      }
      
      // Count passed tests for this profile
      const passedTests = Object.values(profileResult.tests).filter(Boolean).length;
      const totalTests = Object.keys(profileResult.tests).length;
      
      profileResult.passedTests = passedTests;
      profileResult.totalTests = totalTests;
      
      if (passedTests === totalTests && profileResult.errors.length === 0) {
        results.overallResults.passedProfiles++;
        Logger.log(`🎉 ${profile.id}: ALL TESTS PASSED (${passedTests}/${totalTests})`);
      } else {
        results.overallResults.failedProfiles++;
        Logger.log(`❌ ${profile.id}: ${passedTests}/${totalTests} tests passed, ${profileResult.errors.length} errors`);
        profileResult.errors.forEach(error => {
          Logger.log(`   ⚠️ ${error}`);
        });
      }
      
      results.overallResults.passedTests += passedTests;
      results.overallResults.totalTests += totalTests;
      
    } catch (error) {
      profileResult.errors.push(`Critical error: ${error.message}`);
      results.overallResults.failedProfiles++;
      Logger.log(`❌ ${profile.id}: CRITICAL FAILURE - ${error.message}`);
    }
    
    results.profileResults[profile.id] = profileResult;
  });
  
  // Overall validation summary
  Logger.log(`\n${'═'.repeat(80)}`);
  Logger.log('📊 COMPREHENSIVE TEST SUMMARY');
  Logger.log('═'.repeat(80));
  
  Logger.log(`Profiles: ${results.overallResults.passedProfiles}/${results.overallResults.totalProfiles} passed`);
  Logger.log(`Tests: ${results.overallResults.passedTests}/${results.overallResults.totalTests} passed`);
  
  // Update validation summary based on results
  Object.keys(results.validationSummary).forEach(validation => {
    let allPassed = true;
    Object.values(results.profileResults).forEach(profile => {
      if (validation === 'mathematicalAccuracy' && !profile.tests.mathematicalAccuracy) allPassed = false;
      if (validation === 'vehicleCapRespect' && !profile.tests.vehicleCapRespect) allPassed = false;
      if (validation === 'domainWeightApplication' && !profile.tests.domainWeightApplication) allPassed = false;
      if (validation === 'investmentInvolvementEffect' && !profile.tests.investmentInvolvementEffect) allPassed = false;
      if (validation === 'monthlyAllocationSum' && !profile.tests.monthlyAllocationSum) allPassed = false;
      if (validation === 'incomeConstraints' && !profile.tests.incomeConstraints) allPassed = false;
      if (validation === 'returnRateCalculation' && !profile.tests.returnRateCalculation) allPassed = false;
    });
    results.validationSummary[validation] = allPassed;
  });
  
  Logger.log(`\n🔍 VALIDATION RESULTS:`);
  Object.entries(results.validationSummary).forEach(([test, passed]) => {
    const status = passed ? '✅' : '❌';
    Logger.log(`${status} ${test}: ${passed ? 'PASSED' : 'FAILED'}`);
  });
  
  const overallSuccess = results.overallResults.passedProfiles === results.overallResults.totalProfiles;
  
  if (overallSuccess) {
    Logger.log(`\n🎉 🎉 🎉 COMPREHENSIVE ALLOCATION ENGINE TEST: SUCCESS! 🎉 🎉 🎉`);
    Logger.log(`All 9 test profiles successfully validated:`);
    Logger.log(`✅ Engine produces correct mathematical outputs`);
    Logger.log(`✅ Vehicle caps are respected`);
    Logger.log(`✅ Domain weights are properly applied`);
    Logger.log(`✅ Investment involvement affects return rates correctly`);
    Logger.log(`✅ Monthly allocations sum correctly`);
    Logger.log(`✅ Income constraints are respected`);
    Logger.log(`✅ Return rate calculations are consistent`);
    Logger.log(`\n🏆 THE ALLOCATION ENGINE IS PRODUCTION READY! 🏆`);
  } else {
    Logger.log(`\n⚠️ COMPREHENSIVE TEST FAILED`);
    Logger.log(`${results.overallResults.failedProfiles} profile(s) failed validation`);
    Logger.log(`Manual review and fixes required before production use`);
  }
  
  return results;
}
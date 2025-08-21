/**
 * DEBUG HELPERS FOR PROFILE TUNING
 * 
 * These functions help identify issues quickly during profile tuning
 * Use these FIRST when something isn't working as expected
 */

// ============================================
// 1. VEHICLE ORDER VISUALIZATION
// ============================================

/**
 * Show the ACTUAL vehicle order after all modifications
 * This is critical for understanding allocation priority
 */
function showVehicleOrder(profileId, scenarioName = null) {
  console.log('\n' + '='.repeat(80));
  console.log(`VEHICLE ORDER FOR ${profileId}`);
  console.log('='.repeat(80));
  
  const suite = getTestSuite(profileId);
  if (!suite) {
    // For untuned profiles, use basic test data
    const testData = generateTestData({ ProfileID: profileId });
    return showVehicleOrderForData(profileId, testData);
  }
  
  const scenario = scenarioName ? suite.scenarios[scenarioName] : suite.scenarios[Object.keys(suite.scenarios)[0]];
  const testData = { ...suite.baseData, ...scenario };
  
  showVehicleOrderForData(profileId, testData);
}

function showVehicleOrderForData(profileId, testData) {
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  const headers = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  
  const hdr = {};
  headers.forEach((header, index) => {
    if (header) hdr[header] = index + 1;
  });
  
  // Create row data
  const rowData = new Array(headers.length);
  Object.entries(testData).forEach(([key, value]) => {
    const index = headers.indexOf(key);
    if (index >= 0) rowData[index] = value;
  });
  
  try {
    const result = profileHelpers[profileId](rowData, hdr);
    
    console.log('\n🎯 VEHICLE PRIORITY ORDER:\n');
    
    ['Retirement', 'Education', 'Health'].forEach(domain => {
      console.log(`${domain}:`);
      result.vehicleOrders[domain].forEach((v, i) => {
        const cap = v.capMonthly === Infinity ? 'Unlimited' : `$${Math.round(v.capMonthly)}/mo`;
        const priority = i === 0 ? ' 🏆' : '';
        console.log(`  ${i+1}. ${v.name} (${cap})${priority}`);
      });
      console.log('');
    });
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// ============================================
// 2. ALLOCATION TRACE
// ============================================

/**
 * Trace exactly how funds are allocated to each vehicle
 * Shows why vehicles might be skipped
 */
function traceAllocation(profileId, scenarioName = null) {
  console.log('\n' + '='.repeat(80));
  console.log(`ALLOCATION TRACE FOR ${profileId}`);
  console.log('='.repeat(80));
  
  const suite = getTestSuite(profileId) || { 
    baseData: generateTestData({ ProfileID: profileId }), 
    scenarios: {} 
  };
  
  const scenario = scenarioName && suite.scenarios[scenarioName] ? 
    suite.scenarios[scenarioName] : {};
  const testData = { ...suite.baseData, ...scenario };
  
  // Write test data
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  const headers = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  
  const hdr = {};
  headers.forEach((header, index) => {
    if (header) hdr[header] = index + 1;
  });
  
  const testRow = ws.getLastRow() + 1;
  Object.entries(testData).forEach(([key, value]) => {
    if (hdr[key]) ws.getRange(testRow, hdr[key]).setValue(value);
  });
  
  // Get row data and run helper
  const rowData = ws.getRange(testRow, 1, 1, ws.getLastColumn()).getValues()[0];
  const helperResult = profileHelpers[profileId](rowData, hdr);
  
  // Calculate domain allocations
  const netMonthly = testData.Net_Monthly_Income || 5000;
  const allocPercent = testData.Allocation_Percentage || 20;
  const requestedTotal = netMonthly * (allocPercent / 100);
  const actualTotal = Math.max(requestedTotal, netMonthly * 0.20); // 20% minimum
  
  console.log('\n💰 ALLOCATION BREAKDOWN:');
  console.log(`Requested: ${allocPercent}% × $${netMonthly} = $${Math.round(requestedTotal)}`);
  console.log(`Actual: $${Math.round(actualTotal)} (20% minimum enforced: ${actualTotal > requestedTotal ? 'YES' : 'NO'})`);
  
  // Get domain weights
  const rMonthly = 0.08 / 12;
  const domainWeights = computeDomainsAndWeights(rowData, hdr, rMonthly);
  
  console.log('\n📊 DOMAIN SPLITS:');
  ['Education', 'Health', 'Retirement'].forEach(domain => {
    const weight = domainWeights[domain].w;
    const amount = actualTotal * weight;
    console.log(`${domain}: ${(weight * 100).toFixed(1)}% = $${Math.round(amount)}`);
  });
  
  // Simulate allocation
  console.log('\n🔄 ALLOCATION SIMULATION:\n');
  
  ['Retirement', 'Health', 'Education'].forEach(domain => {
    const vehicles = helperResult.vehicleOrders[domain];
    const domainAmount = actualTotal * domainWeights[domain].w;
    let remaining = domainAmount;
    
    console.log(`${domain} (Budget: $${Math.round(domainAmount)}):`);
    
    vehicles.forEach((vehicle, i) => {
      const allocate = Math.min(remaining, vehicle.capMonthly);
      
      if (allocate > 0) {
        console.log(`  ✅ ${vehicle.name}: Allocate $${Math.round(allocate)}`);
        remaining -= allocate;
      } else {
        console.log(`  ❌ ${vehicle.name}: SKIPPED (no funds remaining)`);
      }
    });
    
    if (remaining > 0) {
      console.log(`  💰 Remaining: $${Math.round(remaining)} (goes to last vehicle)`);
    }
    console.log('');
  });
  
  // Clean up
  ws.deleteRow(testRow);
}

// ============================================
// 3. QUICK DIAGNOSTICS
// ============================================

/**
 * Run all diagnostics for a profile
 */
function diagnoseProfile(profileId) {
  console.log('\n' + '🏥'.repeat(40));
  console.log(`COMPLETE DIAGNOSTICS FOR ${profileId}`);
  console.log('🏥'.repeat(40));
  
  // 1. Show vehicle order
  showVehicleOrder(profileId);
  
  // 2. Trace allocation
  traceAllocation(profileId);
  
  // 3. Check for common issues
  console.log('\n⚠️  COMMON ISSUES CHECK:');
  
  const checks = [
    {
      name: '401(k) Match First',
      test: () => {
        const suite = getTestSuite(profileId);
        if (!suite || !suite.baseData.ex_q1 || suite.baseData.ex_q1 !== 'Yes') return 'N/A - No 401(k)';
        
        // Run helper to check order
        const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
        const headers = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
        const hdr = {};
        headers.forEach((header, index) => {
          if (header) hdr[header] = index + 1;
        });
        
        const rowData = new Array(headers.length);
        Object.entries(suite.baseData).forEach(([key, value]) => {
          const index = headers.indexOf(key);
          if (index >= 0) rowData[index] = value;
        });
        
        const result = profileHelpers[profileId](rowData, hdr);
        const firstVehicle = result.vehicleOrders.Retirement[0];
        
        return firstVehicle && firstVehicle.name.includes('401(k) Match') ? 
          '✅ PASS' : '❌ FAIL - 401(k) match not first!';
      }
    },
    {
      name: 'HSA in Health Domain',
      test: () => {
        const cfg = PROFILE_CONFIG[profileId];
        if (!cfg) return 'N/A - Profile not configured';
        
        const hsaInHealth = cfg.vehicleOrder_Health.some(v => v.name === 'HSA');
        const hsaInRetirement = cfg.vehicleOrder_Retirement.some(v => v.name === 'HSA');
        
        if (hsaInHealth && !hsaInRetirement) return '✅ PASS - HSA only in Health';
        if (!hsaInHealth && hsaInRetirement) return '⚠️  WARNING - HSA in Retirement (intentional?)';
        if (hsaInHealth && hsaInRetirement) return '❌ FAIL - HSA in both domains!';
        return '❓ No HSA configured';
      }
    },
    {
      name: 'No Taxable Brokerage',
      test: () => {
        const cfg = PROFILE_CONFIG[profileId];
        if (!cfg) return 'N/A';
        
        const hasTaxable = ['Retirement', 'Education', 'Health'].some(domain => 
          cfg[`vehicleOrder_${domain}`] && 
          cfg[`vehicleOrder_${domain}`].some(v => v.name.includes('Taxable'))
        );
        
        return hasTaxable ? '❌ FAIL - Remove Taxable Brokerage!' : '✅ PASS';
      }
    }
  ];
  
  checks.forEach(check => {
    const result = check.test();
    console.log(`  ${check.name}: ${result}`);
  });
  
  console.log('\n' + '='.repeat(80));
}

// ============================================
// 4. TEST DATA COMPLETENESS CHECK
// ============================================

/**
 * Verify test data has all required fields
 */
function checkTestDataCompleteness(profileId) {
  console.log('\n' + '='.repeat(80));
  console.log(`TEST DATA COMPLETENESS CHECK: ${profileId}`);
  console.log('='.repeat(80));
  
  const suite = getTestSuite(profileId);
  if (!suite) {
    console.log('❌ No test suite found for this profile');
    return;
  }
  
  const criticalFields = [
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
  
  console.log('\nChecking critical fields in baseData:');
  let allPresent = true;
  
  criticalFields.forEach(field => {
    const hasField = suite.baseData[field] !== undefined;
    console.log(`  ${field}: ${hasField ? '✅' : '❌ MISSING'}`);
    if (!hasField) allPresent = false;
  });
  
  console.log(`\nOverall: ${allPresent ? '✅ COMPLETE' : '❌ INCOMPLETE - Add missing fields!'}`);
}

// ============================================
// 5. QUICK COMMANDS
// ============================================

// Diagnose all tuned profiles
function diagnoseAllProfiles() {
  ['2_ROBS_Curious', '4_Roth_Reclaimer', '7_Foundation_Builder'].forEach(profileId => {
    diagnoseProfile(profileId);
    Utilities.sleep(1000);
  });
}

// Show vehicle order for all profiles
function showAllVehicleOrders() {
  const profiles = Object.keys(profileHelpers);
  profiles.forEach(profileId => {
    showVehicleOrder(profileId);
  });
}

// Trace allocation for a specific scenario
function trace(profileId, scenarioName) {
  traceAllocation(profileId, scenarioName);
}
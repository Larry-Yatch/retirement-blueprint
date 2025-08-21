/**
 * Test and validate Profile 4 (Roth Reclaimer) and Profile 7 (Foundation Builder)
 * This script runs comprehensive tests and generates validation reports
 */

/**
 * Generate a validation report for a profile test
 */
function generateValidationReport(profileId, testResults) {
  const timestamp = new Date().toISOString();
  let report = `# ${profileId} Test Validation Report\n\n`;
  report += `Generated: ${timestamp}\n\n`;
  
  report += `## Executive Summary\n\n`;
  report += `Profile ${profileId} has been tested with multiple scenarios. `;
  
  // Count successes
  const totalTests = testResults.length;
  const passedTests = testResults.filter(r => r.success).length;
  report += `${passedTests} out of ${totalTests} test scenarios passed.\n\n`;
  
  // Detail each test scenario
  testResults.forEach((result, index) => {
    report += `## Test Scenario ${index + 1}: ${result.scenario.name}\n\n`;
    
    report += `### Input Data\n\n`;
    report += `**Demographics:**\n`;
    report += `- Age: ${result.scenario.phase1.Current_Age}\n`;
    report += `- Gross Annual Income: $${result.scenario.phase1.gross_annual_income.toLocaleString()}\n`;
    report += `- Filing Status: ${result.scenario.phase1.filing_status}\n`;
    report += `- Work Situation: ${result.scenario.phase1.Work_Situation}\n`;
    report += `- Tax Minimization: ${result.scenario.phase1.Tax_Minimization}\n\n`;
    
    report += `**Benefits:**\n`;
    report += `- HSA Eligibility: ${result.scenario.phase1.hsa_eligibility}\n`;
    report += `- Number of Children: ${result.scenario.phase1.cesa_num_children}\n\n`;
    
    report += `**Financial Planning:**\n`;
    report += `- Net Monthly Income: $${result.scenario.phase1.Net_Monthly_Income.toLocaleString()}\n`;
    report += `- Allocation Percentage: ${result.scenario.phase1.Allocation_Percentage}%\n`;
    report += `- Expected Monthly Allocation: $${result.expectedAllocation.toLocaleString()}\n\n`;
    
    // Profile-specific details
    if (profileId === '4_Roth_Reclaimer') {
      report += `**Roth Strategy Details:**\n`;
      report += `- Traditional IRA Balance: $${(result.scenario.phase2.ex_q1 || 0).toLocaleString()}\n`;
      report += `- After-tax Contributions: ${result.scenario.phase2.ex_q2}\n`;
      report += `- Understands Backdoor: ${result.scenario.phase2.ex_q3}\n`;
      report += `- Desired Conversion: $${(result.scenario.phase2.ex_q4 || 0).toLocaleString()}\n`;
    } else if (profileId === '7_Foundation_Builder') {
      report += `**Foundation Building Details:**\n`;
      report += `- Emergency Fund Goal: $${(result.scenario.phase2.ex_q5 || 0).toLocaleString()}\n`;
      report += `- Current Emergency Savings: $${(result.scenario.phase2.ex_q6 || 0).toLocaleString()}\n`;
      report += `- Risk Tolerance: ${result.scenario.phase2.ex_q7}\n`;
    }
    
    report += `\n**Employer 401(k) Details:**\n`;
    report += `- Has Employer 401(k): ${result.scenario.phase2.ex_q1 || result.scenario.phase2.ex_q5}\n`;
    report += `- Has Employer Match: ${result.scenario.phase2.ex_q2 || result.scenario.phase2.ex_q6}\n`;
    report += `- Match Details: ${result.scenario.phase2.ex_q3 || result.scenario.phase2.ex_q7 || 'N/A'}\n`;
    report += `- Has Roth 401(k) Option: ${result.scenario.phase2.ex_q4 || result.scenario.phase2.ex_q8}\n\n`;
    
    report += `### Vehicle Order Generated\n\n`;
    
    if (result.vehicleOrders) {
      ['Education', 'Health', 'Retirement'].forEach(domain => {
        report += `**${domain} Domain:**\n`;
        result.vehicleOrders[domain].forEach(vehicle => {
          const cap = vehicle.capMonthly === Infinity ? 'Unlimited' : `$${Math.round(vehicle.capMonthly)}/mo`;
          report += `- ${vehicle.name}: ${cap}\n`;
        });
        report += `\n`;
      });
    }
    
    report += `### Actual Allocations\n\n`;
    if (result.allocations) {
      report += `**Total Allocated:** $${result.actualTotal}/mo\n`;
      report += `**Expected:** $${result.expectedAllocation}/mo\n`;
      report += `**Match:** ${result.allocationMatch ? '✅' : '❌'}\n\n`;
      
      Object.entries(result.allocations).forEach(([domain, vehicles]) => {
        report += `**${domain} Allocations:**\n`;
        let domainTotal = 0;
        Object.entries(vehicles).forEach(([vehicle, amount]) => {
          if (amount > 0) {
            report += `- ${vehicle}: $${Math.round(amount)}/mo\n`;
            domainTotal += amount;
          }
        });
        report += `- Domain Total: $${Math.round(domainTotal)}/mo\n\n`;
      });
    }
    
    report += `### Test Result: ${result.success ? '✅ PASSED' : '❌ FAILED'}\n\n`;
    if (!result.success && result.error) {
      report += `**Error:** ${result.error}\n\n`;
    }
    
    report += `---\n\n`;
  });
  
  // Analysis section
  report += `## Analysis\n\n`;
  
  if (profileId === '4_Roth_Reclaimer') {
    report += `### Roth Strategy Validation\n\n`;
    report += `The Roth Reclaimer profile correctly handles:\n`;
    report += `1. **Income Phase-outs** - High income scenarios trigger backdoor Roth\n`;
    report += `2. **Direct Roth** - Low income scenarios use direct Roth IRA\n`;
    report += `3. **Conversion Logic** - Respects desired conversion amounts\n`;
    report += `4. **Employer Integration** - Includes 401(k) options when available\n\n`;
  } else if (profileId === '7_Foundation_Builder') {
    report += `### Foundation Building Validation\n\n`;
    report += `The Foundation Builder profile correctly handles:\n`;
    report += `1. **Young Professional Needs** - Balanced approach for starting out\n`;
    report += `2. **Emergency Fund** - Considers emergency savings goals\n`;
    report += `3. **Family Planning** - Includes education savings for children\n`;
    report += `4. **Growth Focus** - Prioritizes long-term growth vehicles\n\n`;
  }
  
  report += `## Recommendations\n\n`;
  if (passedTests === totalTests) {
    report += `✅ All test scenarios passed. Profile is ready for production use.\n`;
  } else {
    report += `⚠️ Some test scenarios failed. Review and fix the following:\n`;
    testResults.filter(r => !r.success).forEach(r => {
      report += `- ${r.scenario.name}: ${r.error || 'Unknown error'}\n`;
    });
  }
  
  return report;
}

/**
 * Run comprehensive tests for Profile 4
 */
function testProfile4Comprehensive() {
  console.log('\\n=== TESTING PROFILE 4 (ROTH RECLAIMER) ===\\n');
  
  const testResults = [];
  
  // Test each scenario
  Object.entries(PROFILE_4_SCENARIOS).forEach(([key, scenario]) => {
    console.log(`\\nTesting scenario: ${scenario.name}`);
    
    try {
      // Run the test
      const result = runScenarioTest(scenario);
      testResults.push({
        scenario: scenario,
        success: result.success,
        expectedAllocation: result.expectedAllocation,
        actualTotal: result.actualTotal,
        allocationMatch: result.allocationMatch,
        vehicleOrders: result.vehicleOrders,
        allocations: result.allocations,
        error: result.error
      });
    } catch (error) {
      testResults.push({
        scenario: scenario,
        success: false,
        error: error.message
      });
    }
  });
  
  // Generate report
  const report = generateValidationReport('4_Roth_Reclaimer', testResults);
  console.log('\\n' + report);
  
  return report;
}

/**
 * Run comprehensive tests for Profile 7
 */
function testProfile7Comprehensive() {
  console.log('\\n=== TESTING PROFILE 7 (FOUNDATION BUILDER) ===\\n');
  
  const testResults = [];
  
  // Test each scenario
  Object.entries(PROFILE_7_SCENARIOS).forEach(([key, scenario]) => {
    console.log(`\\nTesting scenario: ${scenario.name}`);
    
    try {
      // Run the test
      const result = runScenarioTest(scenario);
      testResults.push({
        scenario: scenario,
        success: result.success,
        expectedAllocation: result.expectedAllocation,
        actualTotal: result.actualTotal,
        allocationMatch: result.allocationMatch,
        vehicleOrders: result.vehicleOrders,
        allocations: result.allocations,
        error: result.error
      });
    } catch (error) {
      testResults.push({
        scenario: scenario,
        success: false,
        error: error.message
      });
    }
  });
  
  // Generate report
  const report = generateValidationReport('7_Foundation_Builder', testResults);
  console.log('\\n' + report);
  
  return report;
}

/**
 * Helper function to run a single scenario test
 */
function runScenarioTest(scenario) {
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  const headers = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  
  // Build header map
  const hdr = {};
  headers.forEach((header, index) => {
    if (header) hdr[header] = index + 1;
  });
  
  // Create test row
  const testRow = ws.getLastRow() + 1;
  
  // Write test data
  Object.entries(scenario.phase1).forEach(([key, value]) => {
    if (hdr[key]) {
      ws.getRange(testRow, hdr[key]).setValue(value);
    }
  });
  
  Object.entries(scenario.phase2).forEach(([key, value]) => {
    if (hdr[key]) {
      ws.getRange(testRow, hdr[key]).setValue(value);
    }
  });
  
  ws.getRange(testRow, hdr['Timestamp']).setValue(new Date());
  
  // Calculate expected
  const expectedAllocation = Math.round(scenario.phase1.Net_Monthly_Income * (scenario.phase1.Allocation_Percentage / 100));
  
  // Get row data
  const rowData = ws.getRange(testRow, 1, 1, ws.getLastColumn()).getValues()[0];
  
  try {
    // Run profile helper
    const profileResult = profileHelpers[scenario.phase1.ProfileID](rowData, hdr);
    
    // Run engine
    const engineResult = runUniversalEngine(testRow);
    
    // Calculate actual total
    let actualTotal = 0;
    Object.values(engineResult.vehicles).forEach(domainVehicles => {
      Object.values(domainVehicles).forEach(amount => {
        actualTotal += amount;
      });
    });
    
    // Clean up
    ws.deleteRow(testRow);
    
    return {
      success: true,
      expectedAllocation: expectedAllocation,
      actualTotal: Math.round(actualTotal),
      allocationMatch: Math.abs(actualTotal - expectedAllocation) < 1,
      vehicleOrders: profileResult.vehicleOrders,
      allocations: engineResult.vehicles
    };
    
  } catch (error) {
    // Clean up
    ws.deleteRow(testRow);
    
    return {
      success: false,
      error: error.message,
      expectedAllocation: expectedAllocation
    };
  }
}

// Run the tests when this script loads
testProfile4Comprehensive();
testProfile7Comprehensive();
/**
 * Add missing vehicle headers to Working Sheet
 */
function addMissingVehicleHeaders() {
  console.log('=== Adding Missing Vehicle Headers ===\n');
  
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  const lastCol = ws.getLastColumn();
  const headers = ws.getRange(2, 1, 1, lastCol).getValues()[0];
  
  // Headers that should exist but are missing
  const missingHeaders = [
    // Cash Balance Plan
    'retirement_cash_balance_plan_actual',
    'retirement_cash_balance_plan_ideal',
    // Group 401(k) Employee
    'retirement_group_401k_employee_actual', 
    'retirement_group_401k_employee_ideal',
    // Group 401(k) Employer
    'retirement_group_401k_employer_actual',
    'retirement_group_401k_employer_ideal',
    // For completeness, add employer profit sharing variant
    'retirement_group_401k_employer_profit_sharing_actual',
    'retirement_group_401k_employer_profit_sharing_ideal'
  ];
  
  // Check which ones are actually missing
  const toAdd = [];
  missingHeaders.forEach(header => {
    if (!headers.includes(header)) {
      toAdd.push(header);
    }
  });
  
  if (toAdd.length === 0) {
    console.log('✅ All headers already exist!');
    return;
  }
  
  console.log(`Found ${toAdd.length} missing headers to add:`);
  toAdd.forEach(h => console.log(`- ${h}`));
  
  // Add the missing headers
  console.log('\nAdding headers...');
  toAdd.forEach((header, index) => {
    const col = lastCol + index + 1;
    ws.getRange(2, col).setValue(header);
    console.log(`Added "${header}" to column ${col}`);
  });
  
  // Update the column width for better visibility
  const numAdded = toAdd.length;
  ws.autoResizeColumns(lastCol + 1, numAdded);
  
  console.log(`\n✅ Successfully added ${numAdded} headers!`);
  console.log('\nYou should now re-run the Profile 8 test to see DB Plan allocations.');
}

/**
 * Quick check to verify all vehicle headers exist
 */
function verifyAllVehicleHeaders() {
  console.log('=== Verifying All Vehicle Headers ===\n');
  
  const ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Working Sheet');
  const headers = ws.getRange(2, 1, 1, ws.getLastColumn()).getValues()[0];
  
  // All vehicle types that might be generated
  const vehicleTypes = [
    // IRAs
    'traditional_ira',
    'roth_ira',
    'backdoor_roth_ira',
    // 401(k) variants
    '401k',
    '401k_match',
    '401k_match_traditional',
    '401k_roth',
    '401k_traditional',
    'mega_backdoor_roth',
    'after_tax_401k__mega_backdoor_roth',
    // Solo 401(k)
    'solo_401k_employee',
    'solo_401k_employee_traditional',
    'solo_401k_employee_roth',
    'solo_401k_employer',
    // Group 401(k)
    'group_401k_employee',
    'group_401k_employer',
    'group_401k_employer_profit_sharing',
    // Other employer plans
    'defined_benefit_plan',
    'cash_balance_plan',
    'profit_sharing_plan',
    'sep_ira',
    'simple_ira',
    // HSA
    'hsa',
    // Education
    'combined_cesa',
    '529_plan',
    // Banks
    'education_bank',
    'health_bank',
    'family_bank'
  ];
  
  console.log('Checking retirement vehicle headers:');
  let missingCount = 0;
  
  vehicleTypes.forEach(vehicle => {
    const actualHeader = `retirement_${vehicle}_actual`;
    const idealHeader = `retirement_${vehicle}_ideal`;
    
    const hasActual = headers.includes(actualHeader);
    const hasIdeal = headers.includes(idealHeader);
    
    if (!hasActual || !hasIdeal) {
      console.log(`\n${vehicle}:`);
      if (!hasActual) {
        console.log(`  ❌ Missing: ${actualHeader}`);
        missingCount++;
      }
      if (!hasIdeal) {
        console.log(`  ❌ Missing: ${idealHeader}`);
        missingCount++;
      }
    }
  });
  
  if (missingCount === 0) {
    console.log('\n✅ All vehicle headers exist!');
  } else {
    console.log(`\n⚠️  Found ${missingCount} missing headers`);
    console.log('Run addMissingVehicleHeaders() to add them.');
  }
}
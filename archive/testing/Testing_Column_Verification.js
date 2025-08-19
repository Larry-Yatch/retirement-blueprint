/**
 * Verify that Working Sheet column headers match HEADERS configuration
 * This is CRITICAL for form mapping to work correctly
 */
function verifyWorkingSheetColumns() {
  console.log('\n=== VERIFYING WORKING SHEET COLUMN MAPPING ===\n');
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName('Working Sheet');
  
  if (!ws) {
    console.log('❌ ERROR: Working Sheet not found!');
    return false;
  }
  
  // Get actual headers from Working Sheet
  const headerRow = ws.getRange(1, 1, 1, ws.getLastColumn()).getValues()[0];
  
  // Critical ex_q columns to verify
  const criticalColumns = [
    'P2_EX_Q1', 'P2_EX_Q2', 'P2_EX_Q3', 'P2_EX_Q4', 
    'P2_EX_Q5', 'P2_EX_Q6', 'P2_EX_Q7'
  ];
  
  console.log('Checking critical ex_q columns:');
  console.log('─'.repeat(50));
  
  let allCorrect = true;
  const columnPositions = {};
  
  criticalColumns.forEach(headerKey => {
    const expectedHeader = HEADERS[headerKey];
    
    // Find actual position in sheet
    let actualPosition = -1;
    headerRow.forEach((header, index) => {
      if (header === expectedHeader) {
        actualPosition = index + 1; // Convert to 1-based
      }
    });
    
    if (actualPosition === -1) {
      console.log(`❌ ${headerKey} (${expectedHeader}): NOT FOUND in Working Sheet!`);
      allCorrect = false;
    } else {
      console.log(`✅ ${headerKey} (${expectedHeader}): Column ${actualPosition}`);
      columnPositions[headerKey] = actualPosition;
    }
  });
  
  // Show the column mapping for ROBS Curious
  console.log('\n\nROBS Curious Form Mapping vs Sheet Columns:');
  console.log('─'.repeat(50));
  
  const mapping = FORM_EX_Q_MAPPING['2_ROBS_Curious'];
  console.log('Form Position → ex_q → Sheet Column:');
  
  Object.entries(mapping).forEach(([formPos, exQ]) => {
    const headerKey = `P2_${exQ.toUpperCase()}`;
    const sheetColumn = columnPositions[headerKey];
    console.log(`Position ${formPos} → ${exQ} → Column ${sheetColumn || 'NOT FOUND'}`);
  });
  
  // Check for any duplicate headers
  console.log('\n\nChecking for duplicate headers:');
  const headerCounts = {};
  headerRow.forEach((header, index) => {
    if (header) {
      if (!headerCounts[header]) {
        headerCounts[header] = [];
      }
      headerCounts[header].push(index + 1);
    }
  });
  
  let hasDuplicates = false;
  Object.entries(headerCounts).forEach(([header, positions]) => {
    if (positions.length > 1) {
      console.log(`⚠️  DUPLICATE: "${header}" found in columns: ${positions.join(', ')}`);
      hasDuplicates = true;
    }
  });
  
  if (!hasDuplicates) {
    console.log('✅ No duplicate headers found');
  }
  
  console.log('\n\nOverall result:', allCorrect && !hasDuplicates ? 
    '✅ COLUMN MAPPING IS CORRECT' : 
    '❌ COLUMN MAPPING ISSUES FOUND');
  
  return allCorrect && !hasDuplicates;
}

/**
 * Show how form data flows to Working Sheet
 */
function traceFormDataFlow() {
  console.log('\n=== FORM DATA FLOW TRACE ===\n');
  
  // Simulate ROBS Curious form submission
  const formData = {
    timestamp: '2024-01-15 10:30:00',
    email: 'test@example.com',
    name: 'John Doe',
    studentId: '12345',
    age: '45',
    income: '150000',
    taxPref: 'Both',
    q1_rollover: '75000',
    q2_businessSavings: '100000',
    q3_spouseInBusiness: 'Yes',
    q4_employer401k: 'Yes',
    q5_employerMatch: 'Yes',
    q6_matchPercent: '50% up to 6%',
    q7_rothOption: 'Yes'
  };
  
  console.log('1️⃣ Form Submission Array:');
  const formArray = Object.values(formData);
  formArray.forEach((val, i) => {
    console.log(`   [${i}]: ${val}`);
  });
  
  console.log('\n2️⃣ FORM_EX_Q_MAPPING applies:');
  const mapping = FORM_EX_Q_MAPPING['2_ROBS_Curious'];
  Object.entries(mapping).forEach(([pos, exQ]) => {
    console.log(`   Position ${pos} → ${exQ}: "${formArray[pos]}"`);
  });
  
  console.log('\n3️⃣ After remapFormValues(), data goes to Working Sheet:');
  console.log('   Standard columns: A-G (timestamp through tax_pref)');
  console.log('   Then ex_q columns:');
  
  // Get actual column letters (approximate)
  const getColumnLetter = (num) => {
    let letter = '';
    while (num > 0) {
      num--;
      letter = String.fromCharCode(65 + (num % 26)) + letter;
      num = Math.floor(num / 26);
    }
    return letter;
  };
  
  // Assuming ex_q1 starts around column 30 (adjust based on your sheet)
  const exQStartColumn = 30; 
  
  for (let i = 1; i <= 7; i++) {
    const colNum = exQStartColumn + i - 1;
    const colLetter = getColumnLetter(colNum);
    const exQ = `ex_q${i}`;
    const value = Object.entries(mapping).find(([pos, eq]) => eq === exQ);
    if (value) {
      console.log(`   Column ${colLetter} (${exQ}): "${formArray[value[0]]}"`);
    }
  }
  
  console.log('\n4️⃣ Profile helper reads using HEADERS:');
  console.log('   getValue(hdr, rowArr, HEADERS.P2_EX_Q5) → Rollover balance');
  console.log('   getValue(hdr, rowArr, HEADERS.P2_EX_Q6) → Business savings');
  console.log('   getValue(hdr, rowArr, HEADERS.P2_EX_Q7) → Spouse in business');
}

/**
 * Generate a diagnostic report
 */
function generateMappingDiagnostic() {
  console.log('\n=== MAPPING DIAGNOSTIC REPORT ===\n');
  
  const issues = [];
  const warnings = [];
  
  // Check 1: Verify Working Sheet exists and has headers
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName('Working Sheet');
  
  if (!ws) {
    issues.push('Working Sheet not found');
    console.log('❌ CRITICAL: Working Sheet not found!');
    return;
  }
  
  const headers = ws.getRange(1, 1, 1, ws.getLastColumn()).getValues()[0];
  console.log(`Found ${headers.length} columns in Working Sheet`);
  
  // Check 2: Verify ex_q columns exist
  const requiredExQ = ['ex_q1', 'ex_q2', 'ex_q3', 'ex_q4', 'ex_q5', 'ex_q6', 'ex_q7'];
  const foundExQ = headers.filter(h => requiredExQ.includes(h));
  
  if (foundExQ.length < requiredExQ.length) {
    const missing = requiredExQ.filter(eq => !foundExQ.includes(eq));
    issues.push(`Missing ex_q columns: ${missing.join(', ')}`);
  } else {
    console.log('✅ All required ex_q columns found');
  }
  
  // Check 3: Verify HEADERS configuration matches sheet
  requiredExQ.forEach(exQ => {
    const headerKey = `P2_${exQ.toUpperCase()}`;
    const expectedValue = HEADERS[headerKey];
    if (expectedValue !== exQ) {
      warnings.push(`HEADERS.${headerKey} = '${expectedValue}' (expected '${exQ}')`);
    }
  });
  
  // Check 4: Show current ROBS Curious mapping
  console.log('\nCurrent ROBS Curious Mapping:');
  const mapping = FORM_EX_Q_MAPPING['2_ROBS_Curious'];
  console.log(JSON.stringify(mapping, null, 2));
  
  // Summary
  console.log('\n📋 DIAGNOSTIC SUMMARY:');
  if (issues.length === 0 && warnings.length === 0) {
    console.log('✅ No issues found - mapping should work correctly');
  } else {
    if (issues.length > 0) {
      console.log('\n❌ CRITICAL ISSUES:');
      issues.forEach(issue => console.log(`   - ${issue}`));
    }
    if (warnings.length > 0) {
      console.log('\n⚠️  WARNINGS:');
      warnings.forEach(warning => console.log(`   - ${warning}`));
    }
  }
  
  console.log('\n💡 NEXT STEPS:');
  console.log('1. Submit a test form with the new questions');
  console.log('2. Check that values appear in correct ex_q columns');
  console.log('3. Run testROBSCuriousSimplified() to verify calculations');
}
/**
 * Test function to verify ROBS Curious form mapping after question updates
 */
function testROBSCuriousMapping() {
  console.log('\n=== TESTING ROBS CURIOUS FORM MAPPING ===\n');
  
  // Simulate form response with new question order
  const formResponse = [
    '2024-01-15 10:30:00',  // 0: timestamp
    'test@example.com',     // 1: email
    'John Doe',             // 2: name
    '12345',                // 3: student ID
    '45',                   // 4: age
    '150000',               // 5: income
    'Both',                 // 6: tax preference (later/now/both)
    '75000',                // 7: rollover balance (Q1)
    '100000',               // 8: business savings capacity (Q2 - NEW WORDING)
    'Yes',                  // 9: spouse in business (Q3 - NEW)
    'Yes',                  // 10: employer 401k (Q4)
    'Yes',                  // 11: employer match (Q5)
    '50% up to 6%',         // 12: match percentage (Q6)
    'Yes'                   // 13: roth option (Q7)
  ];
  
  // Expected mapping results
  const expectedMappings = {
    'ex_q1': 'Yes',           // employer 401k (position 10)
    'ex_q2': 'Yes',           // employer match (position 11)
    'ex_q3': '50% up to 6%',  // match percentage (position 12)
    'ex_q4': 'Yes',           // roth option (position 13)
    'ex_q5': '75000',         // rollover balance (position 7)
    'ex_q6': '100000',        // business savings (position 8)
    'ex_q7': 'Yes'            // spouse in business (position 9)
  };
  
  console.log('Form Response:');
  console.log('Position 7: Rollover balance = "' + formResponse[7] + '"');
  console.log('Position 8: Business savings = "' + formResponse[8] + '"');
  console.log('Position 9: Spouse in business = "' + formResponse[9] + '"');
  console.log('Position 10: Employer 401k = "' + formResponse[10] + '"');
  console.log('Position 11: Employer match = "' + formResponse[11] + '"');
  console.log('Position 12: Match percentage = "' + formResponse[12] + '"');
  console.log('Position 13: Roth option = "' + formResponse[13] + '"');
  
  console.log('\nApplying FORM_EX_Q_MAPPING for ROBS_Curious:');
  
  // Get the mapping
  const mapping = FORM_EX_Q_MAPPING['2_ROBS_Curious'];
  console.log('Mapping configuration:', JSON.stringify(mapping, null, 2));
  
  // Apply the mapping
  const mappedValues = {};
  Object.entries(mapping).forEach(([sourcePos, targetExQ]) => {
    const value = formResponse[parseInt(sourcePos)];
    mappedValues[targetExQ] = value;
    console.log(`Position ${sourcePos} → ${targetExQ}: "${value}"`);
  });
  
  console.log('\nVerifying mapped values:');
  let allCorrect = true;
  
  Object.entries(expectedMappings).forEach(([exQ, expectedValue]) => {
    const actualValue = mappedValues[exQ];
    const isCorrect = actualValue === expectedValue;
    
    console.log(`${exQ}: "${actualValue}" ${isCorrect ? '✅' : '❌'} (expected: "${expectedValue}")`);
    
    if (!isCorrect) {
      allCorrect = false;
    }
  });
  
  console.log('\nOverall result:', allCorrect ? '✅ ALL MAPPINGS CORRECT' : '❌ MAPPING ERRORS FOUND');
  
  // Test key values in profile helper
  console.log('\n--- Testing Key Values in Profile Helper ---');
  console.log('Rollover balance (ex_q5):', mappedValues['ex_q5']);
  console.log('Business savings capacity (ex_q6):', mappedValues['ex_q6']);
  console.log('Spouse in business (ex_q7):', mappedValues['ex_q7']);
  console.log('Has employer 401k (ex_q1):', mappedValues['ex_q1']);
  
  return allCorrect;
}

/**
 * Test the remapFormValues function
 */
function testRemapFormValues() {
  console.log('\n=== TESTING remapFormValues FUNCTION ===\n');
  
  // Create test headers
  const hdr = {};
  const headers = [
    'timestamp', 'email', 'name', 'student_id', 'age', 'income', 'tax_pref',
    'ex_q1', 'ex_q2', 'ex_q3', 'ex_q4', 'ex_q5', 'ex_q6', 'ex_q7', 'ex_q8', 'ex_q9', 'ex_q10'
  ];
  headers.forEach((h, i) => hdr[h.toUpperCase()] = i + 1);
  
  // Test form values
  const formVals = [
    '2024-01-15 10:30:00',
    'test@example.com',
    'John Doe',
    '12345',
    '45',
    '150000',
    'Both',
    '75000',                // 7: rollover balance
    '100000',               // 8: business savings
    'Yes',                  // 9: spouse in business
    'Yes',                  // 10: employer 401k
    'Yes',                  // 11: employer match
    '50% up to 6%',         // 12: match percentage
    'Yes'                   // 13: roth option
  ];
  
  console.log('Before remapping:');
  console.log('Position 7-13:', formVals.slice(7, 14));
  
  // Apply remapping
  const remapped = remapFormValues(formVals, '2_ROBS_Curious', hdr);
  
  console.log('\nAfter remapping:');
  console.log('ex_q1 position:', remapped[hdr['EX_Q1'] - 1]);
  console.log('ex_q2 position:', remapped[hdr['EX_Q2'] - 1]);
  console.log('ex_q3 position:', remapped[hdr['EX_Q3'] - 1]);
  console.log('ex_q4 position:', remapped[hdr['EX_Q4'] - 1]);
  console.log('ex_q5 position:', remapped[hdr['EX_Q5'] - 1]);
  console.log('ex_q6 position:', remapped[hdr['EX_Q6'] - 1]);
  console.log('ex_q7 position:', remapped[hdr['EX_Q7'] - 1]);
  
  return remapped;
}
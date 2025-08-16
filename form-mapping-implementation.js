// =============================================================================
// FLEXIBLE FORM MAPPING SYSTEM
// Add this section to Code.js to handle dynamic form question mapping
// =============================================================================

/**
 * Form mapping configuration
 * Maps form IDs to their question positions and target headers
 */
const FORM_QUESTION_MAPPING = {
  // Profile 2: ROBS_Curious
  '1FAIpQLSchOqMFkphypcStnZ92i-oWhQ_Oysn4gIiWimJYVt3e-sjhXQ': {
    profile: '2_ROBS_Curious',
    mapping: {
      // Original questions (adjust positions based on your actual form)
      7: 'P2_EX_Q5',  // rollover balance
      8: 'P2_EX_Q6',  // annual contribution
      // New employer questions (wherever they were added)
      9: 'P2_EX_Q1',  // employer 401k
      10: 'P2_EX_Q2', // employer match
      11: 'P2_EX_Q3', // match percentage
      12: 'P2_EX_Q4'  // roth option
    }
  },
  
  // Profile 3: Solo401k_Builder (no employer questions needed)
  '1FAIpQLSdU_sA5SmTnGffw4Nqy2p7c0KuLh7kZoLj94Ctm0h4ojRoFfw': {
    profile: '3_Solo401k_Builder',
    mapping: {
      7: 'P2_EX_Q1',  // business type
      8: 'P2_EX_Q2',  // have employees
      9: 'P2_EX_Q3',  // have solo 401k
      10: 'P2_EX_Q4', // employee contribution
      11: 'P2_EX_Q5', // employer contribution
      12: 'P2_EX_Q6'  // total annual amount
    }
  },
  
  // Profile 4: Roth_Reclaimer
  '1FAIpQLSdbKrRSMkQNnlS-Sv5eHADLRCLV29UH7KXLkYdXQVJ689ZSpQ': {
    profile: '4_Roth_Reclaimer',
    mapping: {
      // Original questions
      7: 'P2_EX_Q5',  // trad IRA balance
      8: 'P2_EX_Q6',  // after-tax contributions
      9: 'P2_EX_Q7',  // backdoor understanding
      10: 'P2_EX_Q8', // conversion amount
      // New employer questions
      11: 'P2_EX_Q1', // employer 401k
      12: 'P2_EX_Q2', // employer match
      13: 'P2_EX_Q3', // match percentage
      14: 'P2_EX_Q4'  // roth option
    }
  },
  
  // Add other profiles as you update their forms...
};

/**
 * Get form ID from the form response
 * This assumes the form URL is available in the response
 */
function getFormIdFromResponse(e) {
  // Option 1: If form URL is in the response
  if (e.source && e.source.getId) {
    return e.source.getId();
  }
  
  // Option 2: Extract from the response sheet name pattern
  const sheetName = e.range.getSheet().getName();
  // You might need to map sheet names to form IDs
  
  // Option 3: Store form ID in a hidden question at the end
  // return e.values[e.values.length - 1];
  
  // Fallback: return null if can't determine
  return null;
}

/**
 * Apply form mapping to reorder values before pasting to Working Sheet
 */
function applyFormMapping(vals, formId) {
  // If no mapping exists, return values as-is
  const formConfig = FORM_QUESTION_MAPPING[formId];
  if (!formConfig || !formConfig.mapping) {
    return vals;
  }
  
  // Create new array with proper length for Working Sheet
  const maxCol = Math.max(...Object.keys(formConfig.mapping).map(k => parseInt(k)));
  const mappedVals = new Array(Math.max(vals.length, maxCol + 1));
  
  // Copy standard fields (first 7: timestamp, name, email, student ID, etc.)
  for (let i = 0; i < 7 && i < vals.length; i++) {
    mappedVals[i] = vals[i];
  }
  
  // Apply mapping for extra questions
  Object.entries(formConfig.mapping).forEach(([sourcePos, targetHeader]) => {
    const sourcePosNum = parseInt(sourcePos);
    if (sourcePosNum < vals.length) {
      // Find target position based on header
      const targetPos = getTargetPosition(targetHeader);
      if (targetPos !== null) {
        mappedVals[targetPos] = vals[sourcePosNum];
      }
    }
  });
  
  return mappedVals;
}

/**
 * Get target position for a header in Working Sheet
 * This needs to align with your HEADERS configuration
 */
function getTargetPosition(targetHeader) {
  // This is a simplified version - you'll need to calculate based on your actual setup
  const headerPositions = {
    'P2_EX_Q1': 47,  // Adjust these based on your actual Working Sheet
    'P2_EX_Q2': 48,
    'P2_EX_Q3': 49,
    'P2_EX_Q4': 50,
    'P2_EX_Q5': 51,
    'P2_EX_Q6': 52,
    'P2_EX_Q7': 53,
    'P2_EX_Q8': 54,
    'P2_EX_Q9': 55,
    'P2_EX_Q10': 56
  };
  
  return headerPositions[targetHeader] || null;
}

// =============================================================================
// MODIFY handlePhase2() - Replace lines 2156-2158 with:
// =============================================================================

// 3) Paste raw Phase 2 answers with intelligent mapping
const startCol = hdr[HEADERS.PHASE_2_LINK] + 1;

// Get form ID (you may need to pass this differently based on your setup)
const formId = getFormIdFromResponse(e);

// Apply mapping if available
const mappedVals = formId ? applyFormMapping(vals, formId) : vals;

// Paste the mapped values
ws.getRange(rowNum, startCol, 1, mappedVals.length).setValues([mappedVals]);

// =============================================================================
// UTILITY FUNCTIONS FOR MANAGING MAPPINGS
// =============================================================================

/**
 * Update mapping for a specific form
 * Useful when you change form questions
 */
function updateFormMapping(formId, newMapping) {
  FORM_QUESTION_MAPPING[formId] = {
    ...FORM_QUESTION_MAPPING[formId],
    mapping: newMapping
  };
  
  // Optionally save to Script Properties for persistence
  PropertiesService.getScriptProperties()
    .setProperty('FORM_MAPPINGS', JSON.stringify(FORM_QUESTION_MAPPING));
}

/**
 * Test function to verify mapping works correctly
 */
function testFormMapping() {
  // Test data
  const testVals = [
    '2024-01-15', // timestamp
    'John Doe',   // name
    'john@example.com', // email
    '1234',       // student ID
    // ... other standard fields ...
    'Yes',        // ex_q1 (employer 401k) at position 9
    'Yes',        // ex_q2 (match) at position 10
    '50% up to 6%', // ex_q3 (percentage) at position 11
    'Yes'         // ex_q4 (roth option) at position 12
  ];
  
  const formId = '1FAIpQLSchOqMFkphypcStnZ92i-oWhQ_Oysn4gIiWimJYVt3e-sjhXQ';
  const mapped = applyFormMapping(testVals, formId);
  
  console.log('Original:', testVals);
  console.log('Mapped:', mapped);
}
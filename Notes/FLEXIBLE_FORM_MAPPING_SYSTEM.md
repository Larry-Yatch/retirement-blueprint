# Flexible Form Mapping System for Continuous Profile Tuning

## The Opportunity
The paste to Working Sheet (line 2158 in handlePhase2) is the perfect place to implement flexible question mapping since:
1. All form responses flow through this single point
2. We can intercept and rearrange before pasting
3. Individual form response sheets can have any column order

## Option 1: Question-Based Mapping System (Recommended)

### Implementation
Create a mapping configuration that maps question text to expected positions:

```javascript
// Add this configuration near the top of Code.js
const PHASE2_QUESTION_MAPPING = {
  // Map question text (or unique part) to Working Sheet column
  'employer offer a 401(k)': 'P2_EX_Q1',
  'employer match your 401(k)': 'P2_EX_Q2', 
  'percentage does your employer match': 'P2_EX_Q3',
  'employer 401(k) plan have a Roth': 'P2_EX_Q4',
  
  // Original questions for each profile
  '2_ROBS_Curious': {
    'balance you plan to rollover': 'P2_EX_Q5',
    'expected annual contribution': 'P2_EX_Q6'
  },
  '3_Solo401k_Builder': {
    'kind of business': 'P2_EX_Q1',
    'have any employees': 'P2_EX_Q2',
    'already set up a Solo 401': 'P2_EX_Q3',
    'contribute as employee': 'P2_EX_Q4',
    'business contribute as employer': 'P2_EX_Q5',
    'put into this plan': 'P2_EX_Q6'
  },
  // ... other profiles
};

// Replace line 2158 with intelligent mapping
function mapAndPastePhase2Responses(ws, rowNum, startCol, vals, hdr, formId) {
  // 1. Get the form's question list (from form or stored config)
  const questions = getFormQuestions(formId); // You'll need to implement this
  
  // 2. Create a mapped array with values in correct positions
  const mappedVals = new Array(vals.length);
  
  // 3. Copy standard fields (timestamp, name, email, student ID, etc.)
  for (let i = 0; i < 7; i++) { // First 7 are always standard
    mappedVals[i] = vals[i];
  }
  
  // 4. Map extra questions based on question text
  const profileId = getProfileFromFormId(formId);
  questions.slice(7).forEach((questionText, idx) => {
    const sourcePos = idx + 7;
    let targetHeader = findTargetHeader(questionText, profileId);
    if (targetHeader && hdr[HEADERS[targetHeader]]) {
      const targetPos = hdr[HEADERS[targetHeader]] - startCol;
      mappedVals[targetPos] = vals[sourcePos];
    }
  });
  
  // 5. Paste the mapped values
  ws.getRange(rowNum, startCol, 1, mappedVals.length).setValues([mappedVals]);
}
```

## Option 2: Position Configuration with Form Versioning

### Implementation
Track form versions and question positions:

```javascript
const FORM_VERSIONS = {
  '1FAIpQLSchOqMFkphypcStnZ92i-oWhQ_Oysn4gIiWimJYVt3e-sjhXQ': { // Profile 2
    version: '2.0',
    profile: '2_ROBS_Curious',
    questionMap: {
      // position in form -> ex_q position
      7: 5,  // rollover balance -> ex_q5
      8: 6,  // annual contribution -> ex_q6
      9: 1,  // employer 401k -> ex_q1
      10: 2, // employer match -> ex_q2
      11: 3, // match percentage -> ex_q3
      12: 4  // roth option -> ex_q4
    }
  }
  // ... other forms
};

// Enhanced paste function
function pasteWithMapping(ws, rowNum, startCol, vals, formId) {
  const config = FORM_VERSIONS[formId];
  if (!config || !config.questionMap) {
    // No mapping needed, paste as-is
    ws.getRange(rowNum, startCol, 1, vals.length).setValues([vals]);
    return;
  }
  
  // Rearrange vals based on mapping
  const mappedVals = [...vals];
  Object.entries(config.questionMap).forEach(([fromPos, toExQ]) => {
    const targetCol = hdr[HEADERS[`P2_EX_Q${toExQ}`]] - startCol;
    if (fromPos < vals.length && targetCol >= 0) {
      mappedVals[targetCol] = vals[fromPos];
    }
  });
  
  ws.getRange(rowNum, startCol, 1, mappedVals.length).setValues([mappedVals]);
}
```

## Option 3: Smart Detection System (Most Flexible)

### Implementation
Detect question type by analyzing the response:

```javascript
// Question detection patterns
const QUESTION_PATTERNS = {
  employer_401k: {
    pattern: /^(Yes|No)$/,
    preceded_by_pattern: /employer.*401/i,
    maps_to: 'P2_EX_Q1'
  },
  match_percentage: {
    pattern: /\d+%.*up to.*\d+%/,
    maps_to: 'P2_EX_Q3'
  },
  dollar_amount: {
    pattern: /^\d+$/,
    context_needed: true // Check question text
  }
  // ... more patterns
};

// Intelligent mapping based on response patterns
function smartMapResponses(vals, questions) {
  const mapped = new Array(vals.length);
  
  vals.forEach((val, idx) => {
    if (idx < 7) {
      mapped[idx] = val; // Standard fields
      return;
    }
    
    // Analyze the value and question to determine target
    const questionText = questions[idx];
    const targetPos = detectTargetPosition(val, questionText);
    if (targetPos !== null) {
      mapped[targetPos] = val;
    }
  });
  
  return mapped;
}
```

## Option 4: Dynamic Form Reader (Ultimate Flexibility)

### Implementation
Read form structure dynamically and create mapping:

```javascript
// Use Form_Management.js capabilities
function createDynamicMapping(formId) {
  // 1. Export form structure
  const formData = exportFormById(formId);
  
  // 2. Analyze questions
  const questions = formData.items.filter(item => 
    item.type === 'TEXT' || item.type === 'MULTIPLE_CHOICE'
  );
  
  // 3. Create mapping based on question titles
  const mapping = {};
  questions.forEach((q, idx) => {
    const targetHeader = determineTargetHeader(q.title);
    if (targetHeader) {
      mapping[idx + 1] = targetHeader; // +1 for timestamp
    }
  });
  
  // 4. Cache the mapping
  PropertiesService.getScriptProperties()
    .setProperty(`FORM_MAP_${formId}`, JSON.stringify(mapping));
  
  return mapping;
}
```

## Recommended Implementation Plan

### Phase 1: Immediate Solution
1. Implement Option 2 (Position Configuration) for current forms
2. Add this before line 2158 in handlePhase2():

```javascript
// Get form ID from the response
const formId = getFormIdFromResponse(e); // You'll need to implement this

// Apply mapping if available
const mappedVals = applyFormMapping(vals, formId);

// Replace line 2158 with:
ws.getRange(rowNum, startCol, 1, mappedVals.length).setValues([mappedVals]);
```

### Phase 2: Long-term Solution
1. Implement Option 1 (Question-Based Mapping) for flexibility
2. Add admin UI to manage mappings
3. Store mappings in Properties Service or separate sheet

### Benefits of This Approach
1. **No form-sheet connection breaks** - Original response sheets stay intact
2. **Flexible question ordering** - Add questions anywhere in forms
3. **Profile-specific handling** - Different mappings per profile
4. **Easy updates** - Change mapping config, not code
5. **Backward compatible** - Works with existing data

### Testing Strategy
1. Create test form with questions in wrong order
2. Submit test response
3. Verify mapping places answers in correct ex_q positions
4. Test with actual allocation engine

### Maintenance Workflow
1. When updating a form:
   - Add/change questions as needed
   - Update the mapping configuration
   - Test with dummy submission
   - Deploy updated mapping

2. Document changes:
   - Form version
   - Question positions
   - Mapping updates
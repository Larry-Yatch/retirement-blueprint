// Profile Testing Planner and Framework
// Helps plan questions for each profile and test as we go

/**
 * Current state of profile questions and testing
 */
const PROFILE_PLANNING = {
  '1_ROBS_In_Use': {
    status: 'NOT_STARTED',
    currentQuestions: [
      'Describe how your ROBS strategy is currently structured',
      'How are your business profits routed into your Solo 401(k)?',
      'Which type of contributions are you making?',
      'How often do you contribute to your Solo 401(k)?',
      'Do you also contribute to a Roth IRA?'
    ],
    plannedQuestions: {
      // Define what we need when tuning
      ex_q1: 'Current ROBS structure details',
      ex_q2: 'Profit distribution method',
      ex_q3: 'Contribution types (Roth/Traditional/Both)',
      ex_q4: 'Contribution frequency',
      ex_q5: 'Other retirement contributions'
    },
    testScenarios: [] // Will define when tuning
  },
  
  '2_ROBS_Curious': {
    status: 'COMPLETED',
    currentQuestions: [
      'What is the approximate balance you plan to rollover?',
      'What is your expected annual business income for retirement?',
      'Does your employer offer a 401(k)?',
      'Does your employer match?',
      'What percentage does your employer match?',
      'Does your employer 401(k) have a Roth option?',
      'Does your spouse work in your business?'
    ],
    mappedQuestions: {
      ex_q1: { pos: 46, desc: 'employer 401k', type: 'Yes/No' },
      ex_q2: { pos: 47, desc: 'employer match', type: 'Yes/No' },
      ex_q3: { pos: 48, desc: 'match percentage', type: 'Text' },
      ex_q4: { pos: 49, desc: 'roth option', type: 'Yes/No' },
      ex_q5: { pos: 44, desc: 'rollover balance', type: 'Number' },
      ex_q6: { pos: 45, desc: 'business savings', type: 'Number' },
      ex_q7: { pos: 50, desc: 'spouse in business', type: 'Yes/No' }
    },
    testScenarios: ['w2Employee', 'selfEmployed', 'both', 'spouseInBusiness', 'highIncome']
  },
  
  '3_Solo401k_Builder': {
    status: 'NOT_STARTED',
    currentQuestions: [
      'What kind of business do you run?',
      'Do you have any employees besides yourself?',
      'Have you already set up a Solo 401(k)?',
      'How much do you contribute as employee?',
      'How much does your business contribute as employer?'
    ],
    plannedQuestions: {
      ex_q1: 'Business type (LLC/S-Corp/C-Corp)',
      ex_q2: 'Has employees (Yes/No)',
      ex_q3: 'Solo 401(k) already setup (Yes/No)',
      ex_q4: 'Employee contribution amount',
      ex_q5: 'Employer contribution amount',
      ex_q6: 'Total business profit available'
    },
    needsEmployer401k: false // Solo 401(k) focused
  },
  
  '4_Roth_Reclaimer': {
    status: 'COMPLETED',
    currentQuestions: [
      'Current balance in Traditional IRA?',
      'Ever made after-tax contributions?',
      'Understand Backdoor Roth?',
      'How much to convert to Roth?'
    ],
    mappedQuestions: {
      ex_q5: { pos: 44, desc: 'traditional IRA balance', type: 'Number' },
      ex_q6: { pos: 45, desc: 'after-tax contributions', type: 'Text' },
      ex_q7: { pos: 46, desc: 'backdoor understanding', type: 'Text' },
      ex_q8: { pos: 47, desc: 'conversion amount', type: 'Number' }
    },
    needsEmployer401k: false // Different focus
  },
  
  '5_Bracket_Strategist': {
    status: 'NEEDS_EMPLOYER_401K',
    currentQuestions: [
      'Contributing to tax-deferred accounts?',
      'How much per month?',
      'Income expectations next 5 years?',
      'Plan to convert Traditional to Roth later?',
      'Currently contribute to Roth IRA?'
    ],
    plannedQuestions: {
      // Need to add employer 401(k) questions
      ex_q1: 'Employer 401(k) (Yes/No)',
      ex_q2: 'Employer match (Yes/No)',
      ex_q3: 'Match percentage',
      ex_q4: 'Roth 401(k) option (Yes/No)',
      // Keep existing questions
      ex_q5: 'Current tax-deferred contributions',
      ex_q6: 'Monthly contribution amount',
      ex_q7: 'Income trajectory',
      ex_q8: 'Future Roth conversion plans'
    },
    needsEmployer401k: true
  },
  
  '6_Catch_Up': {
    status: 'NEEDS_EMPLOYER_401K',
    currentQuestions: [
      'Years until retirement?',
      'Current accounts and balances?',
      'Open to catch-up contributions?',
      'Biggest financial concern?'
    ],
    plannedQuestions: {
      ex_q1: 'Employer 401(k) (Yes/No)',
      ex_q2: 'Employer match (Yes/No)',
      ex_q3: 'Match percentage',
      ex_q4: 'Roth 401(k) option (Yes/No)',
      ex_q5: 'Years to retirement',
      ex_q6: 'Current retirement balance',
      ex_q7: 'Catch-up contribution capacity',
      ex_q8: 'Primary concern'
    },
    needsEmployer401k: true
  },
  
  '7_Foundation_Builder': {
    status: 'ALREADY_HAS_EMPLOYER_401K',
    currentQuestions: [
      'Which retirement accounts do you have?',
      'Which account to start first?',
      'How much could you save monthly?',
      'Include education/health savings?'
    ],
    notes: 'Original implementation - use as reference'
  },
  
  '8_Biz_Owner_Group': {
    status: 'NOT_STARTED',
    currentQuestions: [
      'How many W-2 employees?',
      'Controlled group?',
      'Which retirement plans currently?',
      'Interested in advanced plans?'
    ],
    plannedQuestions: {
      ex_q1: 'Number of employees',
      ex_q2: 'Controlled group status',
      ex_q3: 'Current retirement plans',
      ex_q4: 'Advanced plan interest',
      ex_q5: 'Total payroll',
      ex_q6: 'Owner compensation'
    },
    needsEmployer401k: false // Has group plans
  },
  
  '9_Late_Stage_Growth': {
    status: 'NEEDS_EMPLOYER_401K',
    currentQuestions: [
      'Years until retirement?',
      'Current retirement balance?',
      'Other investments?',
      'Interest in real estate/private funds?'
    ],
    plannedQuestions: {
      ex_q1: 'Employer 401(k) (Yes/No)',
      ex_q2: 'Employer match (Yes/No)',
      ex_q3: 'Match percentage',
      ex_q4: 'Roth 401(k) option (Yes/No)',
      ex_q5: 'Years to retirement',
      ex_q6: 'Current balance',
      ex_q7: 'Alternative investments',
      ex_q8: 'Alternative allocation percentage'
    },
    needsEmployer401k: true
  }
};

/**
 * Generate test data based on what we know about a profile
 */
function generateTestDataForProfile(profileId) {
  const profile = PROFILE_PLANNING[profileId];
  
  if (!profile) {
    console.log(`Profile ${profileId} not found`);
    return;
  }
  
  console.log(`\n=== PROFILE ${profileId} TESTING PLAN ===`);
  console.log(`Status: ${profile.status}`);
  
  if (profile.status === 'COMPLETED') {
    console.log('\n✅ Profile is ready for testing');
    console.log('Mapped questions:');
    Object.entries(profile.mappedQuestions).forEach(([key, info]) => {
      console.log(`  ${key} (pos ${info.pos}): ${info.desc} [${info.type}]`);
    });
    console.log(`\nTest scenarios available: ${profile.testScenarios.join(', ')}`);
  }
  else if (profile.status === 'NEEDS_EMPLOYER_401K') {
    console.log('\n⚠️ Profile needs employer 401(k) questions added to form');
    console.log('Required questions to add:');
    console.log('  1. Does your employer offer a 401(k)? (Yes/No)');
    console.log('  2. Does your employer match? (Yes/No)');
    console.log('  3. What percentage match? (Text)');
    console.log('  4. Roth 401(k) option? (Yes/No)');
    console.log('\nThen update form mapping positions');
  }
  else {
    console.log('\n📋 Profile needs planning');
    console.log('Current form questions:');
    profile.currentQuestions.forEach((q, i) => {
      console.log(`  ${i + 1}. ${q}`);
    });
    
    if (profile.plannedQuestions) {
      console.log('\nPlanned mapping:');
      Object.entries(profile.plannedQuestions).forEach(([key, desc]) => {
        console.log(`  ${key}: ${desc}`);
      });
    }
  }
}

/**
 * Show profiles ready for testing
 */
function showTestReadyProfiles() {
  console.log('\n=== PROFILES READY FOR TESTING ===\n');
  
  Object.entries(PROFILE_PLANNING).forEach(([id, profile]) => {
    if (profile.status === 'COMPLETED') {
      console.log(`✅ ${id}`);
    }
  });
  
  console.log('\n=== PROFILES NEEDING FORM UPDATES ===\n');
  
  Object.entries(PROFILE_PLANNING).forEach(([id, profile]) => {
    if (profile.status === 'NEEDS_EMPLOYER_401K') {
      console.log(`⚠️ ${id} - Add employer 401(k) questions`);
    }
  });
  
  console.log('\n=== PROFILES NEEDING PLANNING ===\n');
  
  Object.entries(PROFILE_PLANNING).forEach(([id, profile]) => {
    if (profile.status === 'NOT_STARTED') {
      console.log(`📋 ${id} - Define questions and mapping`);
    }
  });
}

/**
 * Generate form update plan
 */
function generateFormUpdatePlan() {
  console.log('\n=== FORM UPDATE PLAN ===\n');
  
  const needsEmployer = [];
  const needsPlanning = [];
  
  Object.entries(PROFILE_PLANNING).forEach(([id, profile]) => {
    if (profile.needsEmployer401k && profile.status !== 'COMPLETED') {
      needsEmployer.push(id);
    }
    if (profile.status === 'NOT_STARTED') {
      needsPlanning.push(id);
    }
  });
  
  console.log('1. IMMEDIATE: Add employer 401(k) questions to these profiles:');
  needsEmployer.forEach(id => console.log(`   - ${id}`));
  
  console.log('\n2. NEXT: Plan and map questions for these profiles:');
  needsPlanning.forEach(id => console.log(`   - ${id}`));
  
  console.log('\n3. TESTING ORDER:');
  console.log('   - Profile 2 ✅ (Ready now)');
  console.log('   - Profile 4 ✅ (Ready now)');
  console.log('   - Profile 5, 6, 9 (After adding employer questions)');
  console.log('   - Profile 1, 3, 8 (After planning questions)');
}

/**
 * Test what we have now
 */
function testAvailableProfiles() {
  // For now, we can only test Profile 2 and 4
  console.log('Running tests for completed profiles...\n');
  
  // Test Profile 2
  if (PROFILE_PLANNING['2_ROBS_Curious'].status === 'COMPLETED') {
    console.log('Testing Profile 2...');
    // Run the existing test function
  }
  
  // Test Profile 4
  if (PROFILE_PLANNING['4_Roth_Reclaimer'].status === 'COMPLETED') {
    console.log('Testing Profile 4...');
    // Run profile 4 tests
  }
}

// Run the analysis
showTestReadyProfiles();
generateFormUpdatePlan();
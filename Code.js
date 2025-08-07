// ═══════════════════════════════════════════════════════════════════════════════
// CONFIGURATION CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Application configuration settings
 */
const CONFIG = {
  ADMIN_EMAIL: 'Sarah.L@TruPathMastery.com',
  SPREADSHEET_ID: '104pHxIgsGAcOrktL75Hi7WlEd8j0BoeadntLR9PrGYo',
  OPTIMIZED_SAVINGS_RATE: 0.20,
  ANNUAL_CESA_LIMIT: 2000
};

/**
 * IRS contribution limits for various investment vehicles
 */
const LIMITS = {
  RETIREMENT: {
    EMPLOYEE_401K: 23500,
    CATCHUP_401K_50: 7500,
    CATCHUP_401K_60: 11250,
    TOTAL_401K_457_403B: 70000,
    TOTAL_50_59_64: 77500,
    TOTAL_60_63: 81250,
    TRADITIONAL_IRA: 7000,
    ROTH_IRA: 7000,
    CATCHUP_IRA: 1000,
    DEFINED_BENEFIT: 280000
  },
  EDUCATION: {
    CESA_COMBINED: Infinity
  },
  HEALTH: {
    HSA: {
      INDIVIDUAL: 4300,
      FAMILY: 8550,
      CATCHUP: 1000
    }
  },
  OTHER: {
    ALTERNATIVE_INVESTMENTS: Infinity,
    ROTH_CONVERSION: Infinity
  }
};


/**
 * For each ProfileID, defines:
 *  • title           — for narrative
 *  • description     — for Phase 2 form description
 *  • extraQuestions  — prompts to re-pair with answers
 *  • formId          — your Phase 2 form’s ID
 *  • entryToken      — the prefill entry.<token>
 *  • Vehicle Order   — the optional vehicles and order of funding
 */
// === PROFILE CONFIGURATION ===
/*** PROFILE CONFIGURATION ***/
const PROFILE_CONFIG = {
  '1A_ROBS_In_Use': {
    title:       'ROBS-In-Use Strategist',
    description: 'Already has a C-corp + ROBS retirement plan, funding a Solo 401(k) with business revenue.',
    extraQuestions: [
      'Describe how your ROBS strategy is currently structured:',
      'How are your business profits routed into your Solo 401(k)?',
      'Which type of contributions are you making? (Roth only / Traditional only / Both)',
      'How often do you contribute to your Solo 401(k)? (Monthly, Quarterly, etc.)',
      'Do you also contribute to a Roth IRA, HSA, or CESA? If yes, how much per year to each?',
      'Approximately how much do you expect your business to distribute to your Solo 401(k) each year?'
    ],
    formId:     '1FAIpQLSfnAJLDoJHGOJx0LdAVrue-6vn00enirAx4Wz_mWcjnELoRCw',
    entryToken: 'entry.641505166',
    vehicleOrder_Retirement: [
      { name: 'ROBS Solo 401(k) – Profit Distribution', capMonthly: Infinity },
      { name: 'ROBS Solo 401(k) – Roth',                capMonthly: LIMITS.RETIREMENT.EMPLOYEE_401K / 12 },
      { name: 'ROBS Solo 401(k) – Traditional',         capMonthly: LIMITS.RETIREMENT.EMPLOYEE_401K / 12 },
      { name: 'HSA',                                    capMonthly: LIMITS.HEALTH.HSA.INDIVIDUAL  / 12 },
      { name: 'Roth IRA',                               capMonthly: LIMITS.RETIREMENT.ROTH_IRA     / 12 }
      
    ],
    vehicleOrder_Education: [
      { name: 'Combined CESA', capMonthly: Infinity },  // overwritten at runtime
      { name: 'Roth IRA',      capMonthly: LIMITS.RETIREMENT.ROTH_IRA / 12 }
    ],
    vehicleOrder_Health: [
      { name: 'HSA', capMonthly: LIMITS.HEALTH.HSA.INDIVIDUAL / 12 }
    ]
  },

  '1B_ROBS_Curious': {
    title:       'ROBS-Curious Builder',
    description: 'Interested in ROBS but hasn’t implemented it yet; wants to leverage business income for retirement growth.',
    extraQuestions: [
      'What is the approximate balance you plan to rollover initially into your ROBS-funded C-corp?',
      'What is your expected annual contribution from business profits back into the Solo 401(k)?'
    ],
    formId:     '1FAIpQLSchOqMFkphypcStnZ92i-oWhQ_Oysn4gIiWimJYVt3e-sjhXQ',
    entryToken: 'entry.110058618',
    vehicleOrder_Retirement: [
      { name: 'Solo 401(k) – Roth',        capMonthly: LIMITS.RETIREMENT.EMPLOYEE_401K / 12 },
      { name: 'Solo 401(k) – Traditional', capMonthly: LIMITS.RETIREMENT.EMPLOYEE_401K / 12 },
      { name: 'HSA',                       capMonthly: LIMITS.HEALTH.HSA.INDIVIDUAL / 12 },
      { name: 'Roth IRA',                  capMonthly: LIMITS.RETIREMENT.ROTH_IRA / 12 }
    ],
    vehicleOrder_Education: [
      { name: 'Combined CESA', capMonthly: Infinity },
      { name: 'Roth IRA',      capMonthly: LIMITS.RETIREMENT.ROTH_IRA / 12 }
    ],
    vehicleOrder_Health: [
      { name: 'HSA', capMonthly: LIMITS.HEALTH.HSA.INDIVIDUAL / 12 }
    ]
  },

  '2_Solo401k_Builder': {
    title:       'Solo 401(k) Builder',
    description: 'Self-employed or 1099 contractor who wants to set up or optimize a Solo 401(k).',
    extraQuestions: [
      'What kind of business do you run? (Sole Prop / LLC / S-Corp / C-Corp)',
      'Do you have any employees besides yourself (and your spouse)?',
      'Have you already set up a Solo 401(k) plan?',
      'If yes, how much per year will you contribute as employee? (USD)',
      'If yes, how much per year will your business contribute as employer? (USD)',
      'About how much can you put into this plan from your business each year?'
    ],
    formId:     '1FAIpQLSdU_sA5SmTnGffw4Nqy2p7c0KuLh7kZoLj94Ctm0h4ojRoFfw',
    entryToken: 'entry.79994550',
    vehicleOrder_Retirement: [
      { name: 'Solo 401(k) – Employee', capMonthly: LIMITS.RETIREMENT.EMPLOYEE_401K / 12 },
      { name: 'Solo 401(k) – Employer', capMonthly: LIMITS.RETIREMENT.TOTAL_401K_457_403B / 12 },
      { name: 'HSA',                    capMonthly: LIMITS.HEALTH.HSA.INDIVIDUAL / 12 },
      { name: 'Roth IRA',               capMonthly: LIMITS.RETIREMENT.ROTH_IRA     / 12 },
      { name: 'Backdoor Roth IRA', capMonthly: LIMITS.RETIREMENT.ROTH_IRA     / 12 }
    ],
    vehicleOrder_Education: [
      { name: 'Combined CESA', capMonthly: Infinity },
      { name: 'Roth IRA',      capMonthly: LIMITS.RETIREMENT.ROTH_IRA / 12 },
      { name: 'Backdoor Roth IRA', capMonthly: LIMITS.RETIREMENT.ROTH_IRA     / 12 }
    ],
    vehicleOrder_Health: [
      { name: 'HSA', capMonthly: LIMITS.HEALTH.HSA.INDIVIDUAL / 12 }
    ]
  },

  '3_Roth_Reclaimer': {
    title:       'Roth IRA Reclaimer',
    description: 'High-earner who seeks backdoor Roth or IRA consolidation.',
    extraQuestions: [
      'What is the current balance in your Traditional IRA or other old retirement account?',
      'Have you ever made after-tax (non-deductible) contributions to an IRA?',
      'Do you understand or have you used the "Backdoor Roth" IRA strategy?',
      'Would you like to move some or all of your Traditional IRA money into a Roth IRA? If so, how much?'
    ],
    formId:     '1FAIpQLSdbKrRSMkQNnlS-Sv5eHADLRCLV29UH7KXLkYdXQVJ689ZSpQ',
    entryToken: 'entry.1488387721',
    vehicleOrder_Retirement: [
      { name: 'Backdoor Roth IRA', capMonthly: LIMITS.RETIREMENT.ROTH_IRA     / 12 },
      { name: 'HSA',               capMonthly: LIMITS.HEALTH.HSA.INDIVIDUAL / 12 }
    ],
    vehicleOrder_Education: [
      { name: 'Combined CESA',       capMonthly: Infinity },
      { name: 'Backdoor Roth IRA',   capMonthly: LIMITS.RETIREMENT.ROTH_IRA   / 12 }
    ],
    vehicleOrder_Health: [
      { name: 'HSA', capMonthly: LIMITS.HEALTH.HSA.INDIVIDUAL / 12 }
    ]
  },

  '4_Bracket_Strategist': {
    title:       'Bracket-Balanced Strategist',
    description: 'Focus on current tax reduction with flexibility for future Roth conversions.',
    extraQuestions: [/* ... */],
    formId:     '1FAIpQLSc10zXxJ-aWWzjp8Dk70joUiPOCT47EWvYqrOWMdI0J9WMUYA',
    entryToken: 'entry.383767276',
    vehicleOrder_Retirement: [
      { name: 'Traditional 401(k)', capMonthly: LIMITS.RETIREMENT.EMPLOYEE_401K     / 12 },
      { name: 'Traditional IRA',    capMonthly: LIMITS.RETIREMENT.TRADITIONAL_IRA / 12 },
      { name: 'HSA',                capMonthly: LIMITS.HEALTH.HSA.INDIVIDUAL   / 12 },
      { name: 'Roth IRA',           capMonthly: LIMITS.RETIREMENT.ROTH_IRA       / 12 },
      { name: 'Backdoor Roth IRA', capMonthly: LIMITS.RETIREMENT.ROTH_IRA     / 12 }
    ],
    vehicleOrder_Education: [
      { name: 'Combined CESA', capMonthly: Infinity },
      { name: 'Traditional IRA', capMonthly: LIMITS.RETIREMENT.TRADITIONAL_IRA / 12 },
      { name: 'Roth IRA',        capMonthly: LIMITS.RETIREMENT.ROTH_IRA       / 12 },
      { name: 'Backdoor Roth IRA', capMonthly: LIMITS.RETIREMENT.ROTH_IRA     / 12 }
    ],
    vehicleOrder_Health: [
      { name: 'HSA', capMonthly: LIMITS.HEALTH.HSA.INDIVIDUAL / 12 }
    ]
  },

  '5_Catch_Up': {
    title:       'Catch-Up Visionary',
    description: 'Age 50+ who wants aggressive, tax-smart catch-up planning.',
    extraQuestions: [/* ... */],
    formId:     '1FAIpQLSeTZgJ05mFpsu8dkckLEvHjXtKaPCg0-TOPMMYafjl1_XZwPg',
    entryToken: 'entry.859920868',
    vehicleOrder_Retirement: [
      { name: '401(k) Catch-Up', capMonthly: (LIMITS.RETIREMENT.EMPLOYEE_401K + LIMITS.RETIREMENT.CATCHUP_401K_50) / 12 },
      { name: 'IRA Catch-Up',    capMonthly: (LIMITS.RETIREMENT.TRADITIONAL_IRA + LIMITS.RETIREMENT.CATCHUP_IRA) / 12 },
      { name: 'HSA',             capMonthly: LIMITS.HEALTH.HSA.INDIVIDUAL                      / 12 }
    ],
    vehicleOrder_Education: [
      { name: 'Combined CESA', capMonthly: Infinity },
      { name: 'IRA Catch-Up',  capMonthly: (LIMITS.RETIREMENT.TRADITIONAL_IRA + LIMITS.RETIREMENT.CATCHUP_IRA) / 12 }
    ],
    vehicleOrder_Health: [
      { name: 'HSA', capMonthly: LIMITS.HEALTH.HSA.INDIVIDUAL / 12 }
    ]
  },

  '6_Foundation_Builder': {
    title:       'Foundation Builder',
    description: 'No current retirement accounts but ready to start with clear, simple steps.',
    extraQuestions: [/* ... */],
    formId:     '1FAIpQLSc4oMG-yUnGnucmWLcx9trxMXIp2DWwVZijbp0OfTtQ3f8wqg',
    entryToken: 'entry.188501795',
    vehicleOrder_Retirement: [
      { name: 'Roth IRA',            capMonthly: LIMITS.RETIREMENT.ROTH_IRA                / 12 },
      { name: 'Backdoor Roth IRA', capMonthly: LIMITS.RETIREMENT.ROTH_IRA     / 12 },
      { name: 'Traditional IRA',     capMonthly: LIMITS.RETIREMENT.TRADITIONAL_IRA          / 12 },
      { name: 'HSA',                 capMonthly: LIMITS.HEALTH.HSA.INDIVIDUAL              / 12 }
    ],
    vehicleOrder_Education: [
      { name: 'Combined CESA', capMonthly: Infinity },
      { name: 'Roth IRA',      capMonthly: LIMITS.RETIREMENT.ROTH_IRA     / 12 },
      { name: 'Backdoor Roth IRA', capMonthly: LIMITS.RETIREMENT.ROTH_IRA     / 12 }
    ],
    vehicleOrder_Health: [
      { name: 'HSA', capMonthly: LIMITS.HEALTH.HSA.INDIVIDUAL / 12 }
    ]
  },

  '7_Biz_Owner_Group': {
    title:       'Business Owner with Employee Group',
    description: 'Owns one or more businesses with W-2 employees; seeking advanced or defined-benefit strategies.',
    extraQuestions: [/* ... */],
    formId:     '1FAIpQLScWP0EfDPcO46vRywpc0rkzuorCQJh0DCzeJs8EcDxAMrPC7A',
    entryToken: 'entry.568866179',
    vehicleOrder_Retirement: [
      { name: 'Group 401(k) – Employee', capMonthly: LIMITS.RETIREMENT.EMPLOYEE_401K / 12 },
      { name: 'Group 401(k) – Employer', capMonthly: LIMITS.RETIREMENT.TOTAL_401K_457_403B / 12 },
      { name: 'Defined Benefit Plan',    capMonthly: LIMITS.RETIREMENT.DEFINED_BENEFIT   / 12 },
      { name: 'HSA',                     capMonthly: LIMITS.HEALTH.HSA.INDIVIDUAL       / 12 }
    ],
    vehicleOrder_Education: [
      { name: 'Combined CESA', capMonthly: Infinity },
      { name: 'Roth IRA',      capMonthly: LIMITS.RETIREMENT.ROTH_IRA / 12 },
      { name: 'Backdoor Roth IRA', capMonthly: LIMITS.RETIREMENT.ROTH_IRA     / 12 }
    ],
    vehicleOrder_Health: [
      { name: 'HSA',          capMonthly: LIMITS.HEALTH.HSA.INDIVIDUAL / 12 }
    ]
  },

  '8_Late_Stage_Growth': {
    title:       'Late-Stage Growth Strategist',
    description: 'Near-retirement with sizable savings; interested in alts like real estate or private equity.',
    extraQuestions: [/* ... */],
    formId:     '1FAIpQLSeuw5G3w75vLZl0uJtA9zEs4GuEF5XYoNc3h0zz0fB8mBVh2A',
    entryToken: 'entry.58001264',
    vehicleOrder_Retirement: [
      { name: '401(k) Catch-Up', capMonthly: (LIMITS.RETIREMENT.EMPLOYEE_401K + LIMITS.RETIREMENT.CATCHUP_401K_50) / 12 },
      { name: 'IRA Catch-Up',    capMonthly: (LIMITS.RETIREMENT.TRADITIONAL_IRA + LIMITS.RETIREMENT.CATCHUP_IRA) / 12 },
      { name: 'HSA',                        capMonthly: LIMITS.HEALTH.HSA.INDIVIDUAL / 12 }
    ],
    vehicleOrder_Education: [
      { name: 'Combined CESA', capMonthly: Infinity },
      { name: 'Roth IRA',      capMonthly: LIMITS.RETIREMENT.ROTH_IRA / 12 },
      { name: 'Backdoor Roth IRA', capMonthly: LIMITS.RETIREMENT.ROTH_IRA     / 12 }
    ],
    vehicleOrder_Health: [
      { name: 'HSA',          capMonthly: LIMITS.HEALTH.HSA.INDIVIDUAL / 12 }
    ]
  }
};

// end PROFILE_CONFIG

// Stub helpers object—one entry per profileId
/**
 * Per-profile configuration helpers.
 * Each helper returns:
 *  • seeds:       { Education: {}, Health: {}, Retirement: {} }
 *  • vehicleOrders: { Education: [...], Health: [...], Retirement: [...] }
 */
const profileHelpers = {
'2_Solo401k_Builder': function(rowArr, hdr) {
  // Read the “have plan?” flag and all three Solo‐401k fields
  const hasPlan       = getValue(hdr, rowArr, HEADERS.P2_EX_Q3) === 'Yes';
  const annualEmployee= Number(getValue(hdr, rowArr, HEADERS.P2_EX_Q4)) || 0;
  const annualEmployer= Number(getValue(hdr, rowArr, HEADERS.P2_EX_Q5)) || 0;
  const annualFuture  = Number(getValue(hdr, rowArr, HEADERS.P2_EX_Q6)) || 0;

  // Compute HSA/­CESA caps as before…
  const hsaElig = getValue(hdr,rowArr,HEADERS.P2_HSA_ELIGIBILITY)==='Yes';
  const numKids = Number(getValue(hdr,rowArr,HEADERS.P2_CESA_NUM_CHILDREN))||0;
  const age     = Number(getValue(hdr,rowArr,HEADERS.CURRENT_AGE));
  const filing  = getValue(hdr,rowArr,HEADERS.FILING_STATUS);
  let hsaCap = 0;
  if (hsaElig) {
    const type    = (filing==='Married Filing Jointly') ? 'FAMILY' : 'INDIVIDUAL';
    const base    = LIMITS.HEALTH.HSA[type];
    const catchup = age>=55 ? LIMITS.HEALTH.HSA.CATCHUP : 0;
    hsaCap = (base+catchup)/12;
  }
  const cesaCap = (CONFIG.ANNUAL_CESA_LIMIT * numKids) / 12;

  // Seed map: decide which bucket to prefill
  const seeds = { Education: {}, Health: {}, Retirement: {} };
  if (hasPlan) {
    // existing plan → seed employee & employer
    seeds.Retirement['Solo 401(k) – Employee'] = annualEmployee/12;
    seeds.Retirement['Solo 401(k) – Employer'] = annualEmployer/12;
  } else {
    // future plan → seed only the employee bucket from ex_q6
    seeds.Retirement['Solo 401(k) – Employee'] = annualFuture/12;
  }

  // Build vehicleOrders + banks (same as before)…
  const cfg = PROFILE_CONFIG['2_Solo401k_Builder'];
  const educationOrder = (numKids>0
    ? cfg.vehicleOrder_Education.map(v=>({
        name:v.name,
        capMonthly:v.name==='Combined CESA'?cesaCap:v.capMonthly
      }))
    : []
  ).concat({ name:'Education Bank', capMonthly:Infinity });

  const healthOrder = cfg.vehicleOrder_Health
    .map(v=>({
      name:v.name,
      capMonthly:v.name==='HSA'?hsaCap:v.capMonthly
    }))
    .filter(v=>!(v.name==='HSA'&&!hsaElig))
    .concat({ name:'Health Bank', capMonthly:Infinity });

  const retirementOrder = cfg.vehicleOrder_Retirement
    .map(v=>({ name:v.name, capMonthly:v.capMonthly }))
    .filter(v=>!(v.name==='HSA'&&!hsaElig))
    .concat({ name:'Family Bank', capMonthly:Infinity });

  return {
    seeds,
    vehicleOrders: {
      Education:  educationOrder,
      Health:     healthOrder,
      Retirement: retirementOrder
    }
  };
},







  '1A_ROBS_In_Use': function(rowArr, hdr) {
    const hsaElig = getValue(hdr, rowArr, HEADERS.P2_HSA_ELIGIBILITY) === 'Yes';
    const numKids = Number(getValue(hdr, rowArr, HEADERS.P2_CESA_NUM_CHILDREN)) || 0;
    const age = Number(getValue(hdr, rowArr, HEADERS.CURRENT_AGE));
    const filing = getValue(hdr, rowArr, HEADERS.FILING_STATUS);
    
    let hsaCap = 0;
    if (hsaElig) {
      const type = (filing === 'Married Filing Jointly') ? 'FAMILY' : 'INDIVIDUAL';
      const base = LIMITS.HEALTH.HSA[type];
      const catchup = age >= 55 ? LIMITS.HEALTH.HSA.CATCHUP : 0;
      hsaCap = (base + catchup) / 12;
    }
    const cesaCap = (CONFIG.ANNUAL_CESA_LIMIT * numKids) / 12;

    const seeds = { Education: {}, Health: {}, Retirement: {} };
    
    const cfg = PROFILE_CONFIG['1A_ROBS_In_Use'];
    const educationOrder = (numKids > 0
      ? cfg.vehicleOrder_Education.map(v => ({
          name: v.name,
          capMonthly: v.name === 'Combined CESA' ? cesaCap : v.capMonthly
        }))
      : []
    ).concat({ name: 'Education Bank', capMonthly: Infinity });

    const healthOrder = cfg.vehicleOrder_Health
      .map(v => ({
        name: v.name,
        capMonthly: v.name === 'HSA' ? hsaCap : v.capMonthly
      }))
      .filter(v => !(v.name === 'HSA' && !hsaElig))
      .concat({ name: 'Health Bank', capMonthly: Infinity });

    const retirementOrder = cfg.vehicleOrder_Retirement
      .map(v => ({ name: v.name, capMonthly: v.capMonthly }))
      .filter(v => !(v.name === 'HSA' && !hsaElig))
      .concat({ name: 'Family Bank', capMonthly: Infinity });

    return {
      seeds,
      vehicleOrders: {
        Education: educationOrder,
        Health: healthOrder,
        Retirement: retirementOrder
      }
    };
  },
  '1B_ROBS_Curious': function(rowArr, hdr) {
    const hsaElig = getValue(hdr, rowArr, HEADERS.P2_HSA_ELIGIBILITY) === 'Yes';
    const numKids = Number(getValue(hdr, rowArr, HEADERS.P2_CESA_NUM_CHILDREN)) || 0;
    const age = Number(getValue(hdr, rowArr, HEADERS.CURRENT_AGE));
    const filing = getValue(hdr, rowArr, HEADERS.FILING_STATUS);
    
    let hsaCap = 0;
    if (hsaElig) {
      const type = (filing === 'Married Filing Jointly') ? 'FAMILY' : 'INDIVIDUAL';
      const base = LIMITS.HEALTH.HSA[type];
      const catchup = age >= 55 ? LIMITS.HEALTH.HSA.CATCHUP : 0;
      hsaCap = (base + catchup) / 12;
    }
    const cesaCap = (CONFIG.ANNUAL_CESA_LIMIT * numKids) / 12;

    const seeds = { Education: {}, Health: {}, Retirement: {} };
    
    const cfg = PROFILE_CONFIG['1B_ROBS_Curious'];
    const educationOrder = (numKids > 0
      ? cfg.vehicleOrder_Education.map(v => ({
          name: v.name,
          capMonthly: v.name === 'Combined CESA' ? cesaCap : v.capMonthly
        }))
      : []
    ).concat({ name: 'Education Bank', capMonthly: Infinity });

    const healthOrder = cfg.vehicleOrder_Health
      .map(v => ({
        name: v.name,
        capMonthly: v.name === 'HSA' ? hsaCap : v.capMonthly
      }))
      .filter(v => !(v.name === 'HSA' && !hsaElig))
      .concat({ name: 'Health Bank', capMonthly: Infinity });

    const retirementOrder = cfg.vehicleOrder_Retirement
      .map(v => ({ name: v.name, capMonthly: v.capMonthly }))
      .filter(v => !(v.name === 'HSA' && !hsaElig))
      .concat({ name: 'Family Bank', capMonthly: Infinity });

    return {
      seeds,
      vehicleOrders: {
        Education: educationOrder,
        Health: healthOrder,
        Retirement: retirementOrder
      }
    };
  },
  '3_Roth_Reclaimer': function(rowArr, hdr) {
    const hsaElig = getValue(hdr, rowArr, HEADERS.P2_HSA_ELIGIBILITY) === 'Yes';
    const numKids = Number(getValue(hdr, rowArr, HEADERS.P2_CESA_NUM_CHILDREN)) || 0;
    const age = Number(getValue(hdr, rowArr, HEADERS.CURRENT_AGE));
    const filing = getValue(hdr, rowArr, HEADERS.FILING_STATUS);
    
    let hsaCap = 0;
    if (hsaElig) {
      const type = (filing === 'Married Filing Jointly') ? 'FAMILY' : 'INDIVIDUAL';
      const base = LIMITS.HEALTH.HSA[type];
      const catchup = age >= 55 ? LIMITS.HEALTH.HSA.CATCHUP : 0;
      hsaCap = (base + catchup) / 12;
    }
    const cesaCap = (CONFIG.ANNUAL_CESA_LIMIT * numKids) / 12;

    const seeds = { Education: {}, Health: {}, Retirement: {} };
    
    const cfg = PROFILE_CONFIG['3_Roth_Reclaimer'];
    const educationOrder = (numKids > 0
      ? cfg.vehicleOrder_Education.map(v => ({
          name: v.name,
          capMonthly: v.name === 'Combined CESA' ? cesaCap : v.capMonthly
        }))
      : []
    ).concat({ name: 'Education Bank', capMonthly: Infinity });

    const healthOrder = cfg.vehicleOrder_Health
      .map(v => ({
        name: v.name,
        capMonthly: v.name === 'HSA' ? hsaCap : v.capMonthly
      }))
      .filter(v => !(v.name === 'HSA' && !hsaElig))
      .concat({ name: 'Health Bank', capMonthly: Infinity });

    const retirementOrder = cfg.vehicleOrder_Retirement
      .map(v => ({ name: v.name, capMonthly: v.capMonthly }))
      .filter(v => !(v.name === 'HSA' && !hsaElig))
      .concat({ name: 'Family Bank', capMonthly: Infinity });

    return {
      seeds,
      vehicleOrders: {
        Education: educationOrder,
        Health: healthOrder,
        Retirement: retirementOrder
      }
    };
  },
  '4_Bracket_Strategist': function(rowArr, hdr) {
    const hsaElig = getValue(hdr, rowArr, HEADERS.P2_HSA_ELIGIBILITY) === 'Yes';
    const numKids = Number(getValue(hdr, rowArr, HEADERS.P2_CESA_NUM_CHILDREN)) || 0;
    const age = Number(getValue(hdr, rowArr, HEADERS.CURRENT_AGE));
    const filing = getValue(hdr, rowArr, HEADERS.FILING_STATUS);
    
    let hsaCap = 0;
    if (hsaElig) {
      const type = (filing === 'Married Filing Jointly') ? 'FAMILY' : 'INDIVIDUAL';
      const base = LIMITS.HEALTH.HSA[type];
      const catchup = age >= 55 ? LIMITS.HEALTH.HSA.CATCHUP : 0;
      hsaCap = (base + catchup) / 12;
    }
    const cesaCap = (CONFIG.ANNUAL_CESA_LIMIT * numKids) / 12;

    const seeds = { Education: {}, Health: {}, Retirement: {} };
    
    const cfg = PROFILE_CONFIG['4_Bracket_Strategist'];
    const educationOrder = (numKids > 0
      ? cfg.vehicleOrder_Education.map(v => ({
          name: v.name,
          capMonthly: v.name === 'Combined CESA' ? cesaCap : v.capMonthly
        }))
      : []
    ).concat({ name: 'Education Bank', capMonthly: Infinity });

    const healthOrder = cfg.vehicleOrder_Health
      .map(v => ({
        name: v.name,
        capMonthly: v.name === 'HSA' ? hsaCap : v.capMonthly
      }))
      .filter(v => !(v.name === 'HSA' && !hsaElig))
      .concat({ name: 'Health Bank', capMonthly: Infinity });

    const retirementOrder = cfg.vehicleOrder_Retirement
      .map(v => ({ name: v.name, capMonthly: v.capMonthly }))
      .filter(v => !(v.name === 'HSA' && !hsaElig))
      .concat({ name: 'Family Bank', capMonthly: Infinity });

    return {
      seeds,
      vehicleOrders: {
        Education: educationOrder,
        Health: healthOrder,
        Retirement: retirementOrder
      }
    };
  },
  '5_Catch_Up': function(rowArr, hdr) {
    const hsaElig = getValue(hdr, rowArr, HEADERS.P2_HSA_ELIGIBILITY) === 'Yes';
    const numKids = Number(getValue(hdr, rowArr, HEADERS.P2_CESA_NUM_CHILDREN)) || 0;
    const age = Number(getValue(hdr, rowArr, HEADERS.CURRENT_AGE));
    const filing = getValue(hdr, rowArr, HEADERS.FILING_STATUS);
    
    let hsaCap = 0;
    if (hsaElig) {
      const type = (filing === 'Married Filing Jointly') ? 'FAMILY' : 'INDIVIDUAL';
      const base = LIMITS.HEALTH.HSA[type];
      const catchup = age >= 55 ? LIMITS.HEALTH.HSA.CATCHUP : 0;
      hsaCap = (base + catchup) / 12;
    }
    const cesaCap = (CONFIG.ANNUAL_CESA_LIMIT * numKids) / 12;

    const seeds = { Education: {}, Health: {}, Retirement: {} };
    
    const cfg = PROFILE_CONFIG['5_Catch_Up'];
    const educationOrder = (numKids > 0
      ? cfg.vehicleOrder_Education.map(v => ({
          name: v.name,
          capMonthly: v.name === 'Combined CESA' ? cesaCap : v.capMonthly
        }))
      : []
    ).concat({ name: 'Education Bank', capMonthly: Infinity });

    const healthOrder = cfg.vehicleOrder_Health
      .map(v => ({
        name: v.name,
        capMonthly: v.name === 'HSA' ? hsaCap : v.capMonthly
      }))
      .filter(v => !(v.name === 'HSA' && !hsaElig))
      .concat({ name: 'Health Bank', capMonthly: Infinity });

    const retirementOrder = cfg.vehicleOrder_Retirement
      .map(v => ({ name: v.name, capMonthly: v.capMonthly }))
      .filter(v => !(v.name === 'HSA' && !hsaElig))
      .concat({ name: 'Family Bank', capMonthly: Infinity });

    return {
      seeds,
      vehicleOrders: {
        Education: educationOrder,
        Health: healthOrder,
        Retirement: retirementOrder
      }
    };
  },
  '6_Foundation_Builder': function(rowArr, hdr) {
    const hsaElig = getValue(hdr, rowArr, HEADERS.P2_HSA_ELIGIBILITY) === 'Yes';
    const numKids = Number(getValue(hdr, rowArr, HEADERS.P2_CESA_NUM_CHILDREN)) || 0;
    const age = Number(getValue(hdr, rowArr, HEADERS.CURRENT_AGE));
    const filing = getValue(hdr, rowArr, HEADERS.FILING_STATUS);
    
    let hsaCap = 0;
    if (hsaElig) {
      const type = (filing === 'Married Filing Jointly') ? 'FAMILY' : 'INDIVIDUAL';
      const base = LIMITS.HEALTH.HSA[type];
      const catchup = age >= 55 ? LIMITS.HEALTH.HSA.CATCHUP : 0;
      hsaCap = (base + catchup) / 12;
    }
    const cesaCap = (CONFIG.ANNUAL_CESA_LIMIT * numKids) / 12;

    const seeds = { Education: {}, Health: {}, Retirement: {} };
    
    const cfg = PROFILE_CONFIG['6_Foundation_Builder'];
    const educationOrder = (numKids > 0
      ? cfg.vehicleOrder_Education.map(v => ({
          name: v.name,
          capMonthly: v.name === 'Combined CESA' ? cesaCap : v.capMonthly
        }))
      : []
    ).concat({ name: 'Education Bank', capMonthly: Infinity });

    const healthOrder = cfg.vehicleOrder_Health
      .map(v => ({
        name: v.name,
        capMonthly: v.name === 'HSA' ? hsaCap : v.capMonthly
      }))
      .filter(v => !(v.name === 'HSA' && !hsaElig))
      .concat({ name: 'Health Bank', capMonthly: Infinity });

    const retirementOrder = cfg.vehicleOrder_Retirement
      .map(v => ({ name: v.name, capMonthly: v.capMonthly }))
      .filter(v => !(v.name === 'HSA' && !hsaElig))
      .concat({ name: 'Family Bank', capMonthly: Infinity });

    return {
      seeds,
      vehicleOrders: {
        Education: educationOrder,
        Health: healthOrder,
        Retirement: retirementOrder
      }
    };
  },
  '7_Biz_Owner_Group': function(rowArr, hdr) {
    const hsaElig = getValue(hdr, rowArr, HEADERS.P2_HSA_ELIGIBILITY) === 'Yes';
    const numKids = Number(getValue(hdr, rowArr, HEADERS.P2_CESA_NUM_CHILDREN)) || 0;
    const age = Number(getValue(hdr, rowArr, HEADERS.CURRENT_AGE));
    const filing = getValue(hdr, rowArr, HEADERS.FILING_STATUS);
    
    let hsaCap = 0;
    if (hsaElig) {
      const type = (filing === 'Married Filing Jointly') ? 'FAMILY' : 'INDIVIDUAL';
      const base = LIMITS.HEALTH.HSA[type];
      const catchup = age >= 55 ? LIMITS.HEALTH.HSA.CATCHUP : 0;
      hsaCap = (base + catchup) / 12;
    }
    const cesaCap = (CONFIG.ANNUAL_CESA_LIMIT * numKids) / 12;

    const seeds = { Education: {}, Health: {}, Retirement: {} };
    
    const cfg = PROFILE_CONFIG['7_Biz_Owner_Group'];
    const educationOrder = (numKids > 0
      ? cfg.vehicleOrder_Education.map(v => ({
          name: v.name,
          capMonthly: v.name === 'Combined CESA' ? cesaCap : v.capMonthly
        }))
      : []
    ).concat({ name: 'Education Bank', capMonthly: Infinity });

    const healthOrder = cfg.vehicleOrder_Health
      .map(v => ({
        name: v.name,
        capMonthly: v.name === 'HSA' ? hsaCap : v.capMonthly
      }))
      .filter(v => !(v.name === 'HSA' && !hsaElig))
      .concat({ name: 'Health Bank', capMonthly: Infinity });

    const retirementOrder = cfg.vehicleOrder_Retirement
      .map(v => ({ name: v.name, capMonthly: v.capMonthly }))
      .filter(v => !(v.name === 'HSA' && !hsaElig))
      .concat({ name: 'Family Bank', capMonthly: Infinity });

    return {
      seeds,
      vehicleOrders: {
        Education: educationOrder,
        Health: healthOrder,
        Retirement: retirementOrder
      }
    };
  },
  '8_Late_Stage_Growth': function(rowArr, hdr) {
    const hsaElig = getValue(hdr, rowArr, HEADERS.P2_HSA_ELIGIBILITY) === 'Yes';
    const numKids = Number(getValue(hdr, rowArr, HEADERS.P2_CESA_NUM_CHILDREN)) || 0;
    const age = Number(getValue(hdr, rowArr, HEADERS.CURRENT_AGE));
    const filing = getValue(hdr, rowArr, HEADERS.FILING_STATUS);
    
    let hsaCap = 0;
    if (hsaElig) {
      const type = (filing === 'Married Filing Jointly') ? 'FAMILY' : 'INDIVIDUAL';
      const base = LIMITS.HEALTH.HSA[type];
      const catchup = age >= 55 ? LIMITS.HEALTH.HSA.CATCHUP : 0;
      hsaCap = (base + catchup) / 12;
    }
    const cesaCap = (CONFIG.ANNUAL_CESA_LIMIT * numKids) / 12;

    const seeds = { Education: {}, Health: {}, Retirement: {} };
    
    const cfg = PROFILE_CONFIG['8_Late_Stage_Growth'];
    const educationOrder = (numKids > 0
      ? cfg.vehicleOrder_Education.map(v => ({
          name: v.name,
          capMonthly: v.name === 'Combined CESA' ? cesaCap : v.capMonthly
        }))
      : []
    ).concat({ name: 'Education Bank', capMonthly: Infinity });

    const healthOrder = cfg.vehicleOrder_Health
      .map(v => ({
        name: v.name,
        capMonthly: v.name === 'HSA' ? hsaCap : v.capMonthly
      }))
      .filter(v => !(v.name === 'HSA' && !hsaElig))
      .concat({ name: 'Health Bank', capMonthly: Infinity });

    const retirementOrder = cfg.vehicleOrder_Retirement
      .map(v => ({ name: v.name, capMonthly: v.capMonthly }))
      .filter(v => !(v.name === 'HSA' && !hsaElig))
      .concat({ name: 'Family Bank', capMonthly: Infinity });

    return {
      seeds,
      vehicleOrders: {
        Education: educationOrder,
        Health: healthOrder,
        Retirement: retirementOrder
      }
    };
  }
};



/*** HEADER-NAME CONSTANTS ***/
const HEADERS = {
  // ── Phase 1 raw inputs (Form Responses 1 → Working Sheet) ──
  TIMESTAMP:                      'Timestamp',
  FULL_NAME:                      'Full_Name',
  EMAIL:                          'Email',
  STUDENT_ID_LAST4:               'Student_ID_Last4',
  CURRENT_AGE:                    'Current_Age',
  WORK_SITUATION:                 'Work_Situation',
  OWNS_BIZ:                       'Owns_Biz',
  PLANS_BIZ:                      'Plans_Biz',
  W2_EMPLOYEES:                   'W2_Employees',
  ROTH_IRA_HOLDER:                'Roth_IRA_Holder',
  TRADITIONAL_RETIREMENT:         'Traditional_Retirement',
  USING_ROBS:                     'Using_ROBS',
  INTERESTED_IN_ROBS:             'Interested_in_ROBS',
  ROBS_NEW_BUSINESS:              'ROBS_New_Business',
  ROLLOVER_ACCOUNT_50K:           'Rollover_Account_50k',
  SETUP_COST_FUNDING:             'Setup_Cost_Funding',
  TAX_MINIMIZATION:               'Tax_Minimization',
  RETIREMENT_CATCHUP:             'Retirement_Catchup',
  RETIREMENT_TIMEFRAME:           'Retirement_Timeframe',
  ACTION_MOTIVATION:              'Action_Motivation',
  GROSS_ANNUAL_INCOME:            'gross_annual_income',
  FILING_STATUS:                  'filing_status',

  // ── Phase 1 computed & tag fields ──
  NET_MONTHLY_INCOME:             'Net_Monthly_Income',
  ALLOCATION_PERCENTAGE:          'Allocation_Percentage',
  TOTAL_MONTHLY_SAVINGS_CAPACITY: 'Total_Monthly_Savings_Capacity',
  PROFILE_ID:                     'ProfileID',
  USES_ROBS:                      'USES_ROBS',
  INTREST_ROBS:                   'INTREST_ROBS',
  ROBS_READY:                     'ROBS_READY',
  SELF_EMPLOYED:                  'SELF_EMPLOYED',
  HAS_BIZ:                        'HAS_BIZ',
  PLANS_BIZ_RAW:                  'Plans_Biz',
  PLANS_BIZ:                      'PLANS_BIZ',
  HAS_EMPLOYEES:                  'HAS_EMPLOYEES',
  SOLO401K_AVAILABLE:             'SOLO401K_AVAILABLE',
  NEEDS_BACKDOOR_ROTH:            'NEEDS_BACKDOOR_ROTH',
  CATCH_UP_ELIGIBLE:              'CATCH_UP_ELIGIBLE',
  LATE_STAGE_ELIGIBLE:            'LATE_STAGE_ELIGIBLE',
  TAX_FOCUS_NOW:                  'TAX_FOCUS_NOW',
  TAX_FOCUS_LATER:                'TAX_FOCUS_LATER',
  TAX_FOCUS_BOTH:                 'TAX_FOCUS_BOTH',
  URGENT_ACTION:                  'URGENT_ACTION',

  // ── Phase 2 link ──
  PHASE_2_LINK_SENT:              'Phase_2_Link_Sent',
  PHASE_2_LINK:                   'Phase_2_Link',

  // ── Phase 2 raw inputs ──
  P2_TIMESTAMP:                   'timestamp',
  P2_FULL_NAME:                   'full_name',
  P2_EMAIL:                       'email',
  P2_STUDENT_IDENTIFIER:          'student_identifier',
  P2_CURRENT_AGE:                 'current_age',
  P2_TARGET_RETIREMENT_AGE:       'target_retirement_age',
  P2_HAS_CHILDREN:                'has_children_or_plan_children_education',
  P2_YEARS_UNTIL_FUNDS:           'years_until_use_of_funds',
  P2_HSA_ELIGIBILITY:             'hsa_eligibility',
  P2_INV_INVOLVEMENT:             'investment_involvement',
  P2_INV_TIME:                    'investment_time',
  P2_INV_CONFIDENCE:              'investment_confidence',
  P2_HSA_CURRENT_BALANCE:         'current_hsa_balance',
  P2_HSA_MONTHLY_CONTRIB:         'current_monthly_hsa_contribution',
  P2_HSA_YEARS_UNTIL_NEED:        'hsa_years_until_need',
  P2_HSA_TARGET_BALANCE:          'hsa_target_balance',
  P2_CESA_CURRENT_BALANCE:        'cesa_current_balance',
  P2_CESA_MONTHLY_CONTRIB:        'cesa_monthly_contribution',
  P2_CESA_NUM_CHILDREN:           'cesa_num_children',
  P2_CESA_TOTAL_GOAL:             'cesa_total_goal',
  P2_CESA_YEARS_UNTIL_FIRST:      'cesa_years_until_first_need',
  P2_RETIREMENT_CURRENT_BAL:      'retirement_current_balance',
  P2_RETIREMENT_PERSONAL:         'retirement_personal_contribution',
  P2_RETIREMENT_YEARS:            'retirement_years_until_target',
  P2_RETIREMENT_DESIRED_INC:      'retirement_desired_monthly_income',
  P2_RETIREMENT_IMPORTANCE:       'retirement_importance',
  P2_RETIREMENT_ANXIETY:          'retirement_anxiety',
  P2_RETIREMENT_MOTIVATION:       'retirement_motivation',
  P2_EDUCATION_IMPORTANCE:        'education_importance',
  P2_EDUCATION_ANXIETY:           'education_anxiety',
  P2_EDUCATION_MOTIVATION:        'education_motivation',
  P2_HEALTH_IMPORTANCE:           'health_importance',
  P2_HEALTH_ANXIETY:              'health_anxiety',
  P2_HEALTH_MOTIVATION:           'health_motivation',
  P2_TIE_FUND_CHOICE:             'tie_fund_choice',
  P2_TIE_PAINFUL_CHOICE:          'tie_painful_choice',
  P2_TIE_RANK_RETIREMENT:         'tie_rank_retirement',
  P2_TIE_RANK_EDUCATION:          'tie_rank_education',
  P2_TIE_RANK_HEALTH:             'tie_rank_health',
  P2_EX_Q1:                       'ex_q1',
  P2_EX_Q2:                       'ex_q2',
  P2_EX_Q3:                       'ex_q3',
  P2_EX_Q4:                       'ex_q4',
  P2_EX_Q5:                       'ex_q5',
  P2_EX_Q6:                       'ex_q6',
  P2_EX_Q7:                       'ex_q7',
  P2_EX_Q8:                       'ex_q8',
  P2_EX_Q9:                       'ex_q9',
  P2_EX_Q10:                      'ex_q10',

    // ── Phase 2 output columns ──
  // Retirement IRA top-ups (education piggy-backed here)
  RETIREMENT_TRADITIONAL_IRA_ACTUAL: 'retirement_traditional_ira_actual',
  RETIREMENT_TRADITIONAL_IRA_IDEAL:  'retirement_traditional_ira_ideal',
  RETIREMENT_ROTH_IRA_ACTUAL:        'retirement_roth_ira_actual',
  RETIREMENT_ROTH_IRA_IDEAL:         'retirement_roth_ira_ideal',
  RETIREMENT_BACKDOOR_ROTH_IRA_ACTUAL: 'retirement_backdoor_roth_ira_actual',
  RETIREMENT_BACKDOOR_ROTH_IRA_IDEAL:  'retirement_backdoor_roth_ira_ideal',

  // Education CESA bucket
  EDUCATION_COMBINED_CESA_ACTUAL:    'education_combined_cesa_actual',
  EDUCATION_COMBINED_CESA_IDEAL:     'education_combined_cesa_ideal',

  // Family Bank
  FAMILY_BANK_IDEAL:                 'family_bank_ideal'
};


/**
 * CORE ALLOCATOR
 * Pure waterfall allocator across three domains.
 *
 * @param {{Education:{w:number},Health:{w:number},Retirement:{w:number}}} domains
 * @param {number} pool
 * @param {{Education:Object,Health:Object,Retirement:Object}} seeds
 * @param {{Education:Array,Health:Array,Retirement:Array}} vehicleOrders
 * @returns {{Education:Object,Health:Object,Retirement:Object}}
 */
function coreAllocate({ domains, pool, seeds, vehicleOrders }) {
  // 1) Initialize vehicles with seeds or zero
  const vehicles = {
    Education: Object.fromEntries(
      vehicleOrders.Education.map(v => [v.name, seeds.Education[v.name] || 0])
    ),
    Health: Object.fromEntries(
      vehicleOrders.Health.map(v => [v.name, seeds.Health[v.name] || 0])
    ),
    Retirement: Object.fromEntries(
      vehicleOrders.Retirement.map(v => [v.name, seeds.Retirement[v.name] || 0])
    )
  };

  // 2) Education
  const eduPool = domains.Education.w * pool;
  const eduAlloc = cascadeWaterfall(vehicleOrders.Education, eduPool, vehicles.Education);
  vehicles.Education = eduAlloc;
  const leftoverEdu = eduPool - sumValues(eduAlloc);

  // 3) Health (include leftover from Education)
  const healthPool = domains.Health.w * pool + leftoverEdu;
  const hlthAlloc = cascadeWaterfall(vehicleOrders.Health, healthPool, vehicles.Health);
  vehicles.Health = hlthAlloc;
  const leftoverHealth = healthPool - sumValues(hlthAlloc);

  // 4) Retirement (include leftover from Health)
  const retPool = domains.Retirement.w * pool + leftoverHealth;
  const retAlloc = cascadeWaterfall(vehicleOrders.Retirement, retPool, vehicles.Retirement);
  vehicles.Retirement = retAlloc;

  return vehicles;
}





/*** HELPERS ***/

/**
 * Map headers (row 2) → column index
 */
function getHeaderMap(sheet) {
  const headers = sheet
    .getRange(2, 1, 1, sheet.getLastColumn())
    .getValues()[0];
  const map = {};
  headers.forEach((h, i) => {
    if (h) map[h.trim()] = i + 1;
  });
  return map;
}


/**
 * Fill‐priority cascade (waterfall) allocator.
 *
 * @param {Array<{name: string, capMonthly: number}>} order
 * @param {number} pool  Total dollars to allocate
 * @param {Object} initial  Optional map of pre‐seeded allocations { [name]: amount }
 * @returns {Object}  Final allocations by vehicle name
 */
function cascadeWaterfall(order, pool, initial = {}) {
  const alloc = { ...initial };
  let remaining = pool;

  for (const v of order) {
    const already = alloc[v.name] || 0;
    // capMonthly might be Infinity
    const available = Math.max(0, (v.capMonthly || Infinity) - already);
    const take = Math.min(available, remaining);
    if (take > 0) {
      alloc[v.name] = already + take;
      remaining -= take;
    }
    if (remaining <= 0) break;
  }

  return alloc;
}



/**
 * Round-robin cascade: allocate `total` across `order` of vehicles
 */
function cascadeRoundRobin(order, total, initialAlloc = {}) {
  const alloc = order.reduce((o, v) => {
    o[v.name] = initialAlloc[v.name] || 0;
    return o;
  }, {});
  const caps = order.map(v => ({
    name:      v.name,
    remaining: (v.capMonthly || Infinity) - (initialAlloc[v.name] || 0)
  }));
  let left = total, idx = 0;
  while (left > 0 && caps.some(c => c.remaining > 0)) {
    const c = caps[idx];
    if (c.remaining > 0) {
      const step = Math.min(1, c.remaining, left);
      alloc[c.name] += step;
      c.remaining   -= step;
      left          -= step;
    }
    idx = (idx + 1) % caps.length;
  }
  return alloc;
}

/**
 * Initialize Working Sheet and header map
 * @returns {{sheet: Object, hdr: Object}}
 */
function initWS() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Working Sheet');
  if (!sheet) throw new Error('Working Sheet not found');
  const hdr   = getHeaderMap(sheet);
  return { sheet, hdr };
}

/**
 * Read a cell by header name
 * @param {Object} hdr   headerName→colIndex map
 * @param {Array}  rowArr one row from getValues()[0]
 * @param {string} name  exact header text
 */
function getValue(hdr, rowArr, name) {
  const col = hdr[name];
  if (!col) {
    Logger.log(
      `⚠️ [getValue] missing header "${name}". Available headers: ` +
      Object.keys(hdr).join(', ')
    );
    throw new Error(`Header not found: "${name}"`);
  }
  return rowArr[col - 1];
}


/**
 * Write a value by header name
 * @param {Sheet}  sheet  the Working Sheet
 * @param {Object} hdr    headerName→colIndex map
 * @param {number} rowNum 1-based row number
 * @param {string} name   exact header text
 * @param {*}      value
 */
function setValue(sheet, hdr, rowNum, name, value) {
  const col = hdr[name];
  if (!col) {
    Logger.log(
      `⚠️ [setValue] cannot write to missing header "${name}". ` +
      `Available headers: ${Object.keys(hdr).join(', ')}`
    );
    return; // or: throw new Error(...)
  }
  sheet.getRange(rowNum, col).setValue(value);
}


/*** DISPATCHER ***/
function onAnyFormSubmit(e) {
  const sheetName = e.range.getSheet().getName();
  if (sheetName === 'Form Responses 1') {
    handlePhase1(e);
  } else {
    handlePhase2(e);
  }
}

/*** PHASE 1 ***/
function handlePhase1(e) {
  // 1) Copy & tag the raw Phase 1 submission
  FinancialTruPathFunctionLibrary.copyAndNotifySubmission({
    srcSheetName:       'Form Responses 1',
    destSheetName:      'Working Sheet',
    highlightColor:     '#FFCCCC',
    notificationEmail:  CONFIG.ADMIN_EMAIL,
    successSubject:     'New ISL Retirement Blueprint Phase 1 Submission',
    successBody:        'A student has completed Phase 1 and been marked in the tracker.',
    failureSubject:     'Phase 1 Submission ⚠️ Student Identifier Not Found',
    failureBody:        'The submitted Student Identifier could not be found; please handle updating the tracker manually.',
    trackingSpreadsheetId: CONFIG.SPREADSHEET_ID,
    trackingSheetName:    'Financial',
    lookupColumn:         'G',
    markColumn:           'AH',
    missingHighlightColor:'#FFFF00'
  }, e);

  // 2) Classify Profile & write tags
  classifyClientProfileFromWorkingSheet();

  // 3) Build the Phase 2 prefill URL + email it
  const { sheet: ws, hdr } = initWS();
  const rowNum = ws.getLastRow();
  const rowArr = ws.getRange(rowNum, 1, 1, ws.getLastColumn()).getValues()[0];

  // grab data from the new row
  const profileId    = getValue(hdr, rowArr, HEADERS.PROFILE_ID);
  const studentLast4 = getValue(hdr, rowArr, HEADERS.STUDENT_ID_LAST4);
  const studentEmail = getValue(hdr, rowArr, HEADERS.EMAIL);
  const fullName     = e.values[1];  // assuming e.values = [timestamp, fullName, email, studentId,...]

  // ensure config exists
  const cfg = PROFILE_CONFIG[profileId];
  if (!cfg || !cfg.formId || !cfg.entryToken) {
    MailApp.sendEmail({
      to:      CONFIG.ADMIN_EMAIL,
      subject: '⚠️ Missing Phase 2 config for ' + profileId,
      body:    `Profile ${profileId} is not configured in PROFILE_CONFIG.`
    });
    return;
  }

  // build the prefill URL
  const baseUrl    = `https://docs.google.com/forms/d/e/${cfg.formId}/viewform?usp=pp_url`;
  const prefillUrl = `${baseUrl}&${cfg.entryToken}=${encodeURIComponent(studentLast4)}`;

  // send the email
  MailApp.sendEmail({
    to:      studentEmail,
    subject: 'URGENT - Your Phase 2 Retirement Blueprint Deep-Dive Survey',
    body:    `Hi ${fullName},\n\n` +
             `Thanks for completing Phase 1! To finish your personalized Retirement Blueprint, please complete this follow-up Phase 2 survey:\n\n` +
             `${prefillUrl}\n\n` +
             `– The TruPath Team`
  });

  // 4) Write the sent-timestamp & URL back to the Working Sheet
  const now = new Date();
  setValue(ws, hdr, rowNum, HEADERS.PHASE_2_LINK_SENT, now);
  setValue(ws, hdr, rowNum, HEADERS.PHASE_2_LINK, prefillUrl);
}


function classifyClientProfileFromWorkingSheet() {
  const { sheet: sh, hdr } = initWS();
  const rowNum = sh.getLastRow();
  const rowArr = sh.getRange(rowNum, 1, 1, sh.getLastColumn()).getValues()[0];

  // ——— PHASE 1 fields (use HEADERS constants!) ———
  const ageText        = getValue(hdr, rowArr, HEADERS.CURRENT_AGE);
  const robsInUse      = getValue(hdr, rowArr, HEADERS.USING_ROBS);
  const robsInterest   = getValue(hdr, rowArr, HEADERS.INTERESTED_IN_ROBS);
  const robsNewBiz     = getValue(hdr, rowArr, HEADERS.ROBS_NEW_BUSINESS);
  const robsFunds      = getValue(hdr, rowArr, HEADERS.ROLLOVER_ACCOUNT_50K);
  const robsSetup      = getValue(hdr, rowArr, HEADERS.SETUP_COST_FUNDING);
  const workSituation  = getValue(hdr, rowArr, HEADERS.WORK_SITUATION);
  const ownsBiz        = getValue(hdr, rowArr, HEADERS.OWNS_BIZ);
  const plansBiz = getValue(hdr, rowArr, HEADERS.PLANS_BIZ_RAW);
  const hasEmployees   = getValue(hdr, rowArr, HEADERS.W2_EMPLOYEES);
  const hasTradIRA     = getValue(hdr, rowArr, HEADERS.TRADITIONAL_RETIREMENT);
  const hasRothIRA     = getValue(hdr, rowArr, HEADERS.ROTH_IRA_HOLDER);
  const taxFocus       = getValue(hdr, rowArr, HEADERS.TAX_MINIMIZATION);
  const catchUpFeeling = getValue(hdr, rowArr, HEADERS.RETIREMENT_CATCHUP);
  const nearRetire     = getValue(hdr, rowArr, HEADERS.RETIREMENT_TIMEFRAME);
  const rawAction      = getValue(hdr, rowArr, HEADERS.ACTION_MOTIVATION);
  const urgentAction   = (rawAction === 'Yes');


  const age = parseInt(ageText, 10);

  // Determine ProfileID (unchanged) …
  let profile = '';
  if (robsInUse === 'Yes') {
    profile = '1A_ROBS_In_Use';
  } else if (
    robsInterest === 'Yes' &&
    robsNewBiz   === 'Yes' &&
    robsFunds    === 'Yes' &&
    robsSetup    === 'Yes'
  ) {
    profile = '1B_ROBS_Curious';
  } else if (hasEmployees === 'Yes') {
    profile = '7_Biz_Owner_Group';
  } else if ((workSituation === 'Self-employed' || workSituation === 'Both') && hasEmployees === 'No') {
    profile = '2_Solo401k_Builder';
  } else if (hasTradIRA === 'Yes') {
    profile = '3_Roth_Reclaimer';
  } else if (age >= 55 || String(nearRetire).startsWith('Yes')) {
    profile = '8_Late_Stage_Growth';
  } else if (age >= 50 && catchUpFeeling === 'Yes') {
    profile = '5_Catch_Up';
  } else if (['Now','Both'].includes(taxFocus)) {
    profile = '4_Bracket_Strategist';
  } else {
    profile = '6_Foundation_Builder';
  }

  // Write ProfileID
  setValue(sh, hdr, rowNum, HEADERS.PROFILE_ID, profile);

  // Build & write tags in sheet order
  const tags = {
    USES_ROBS:           (robsInUse   === 'Yes'),
    INTREST_ROBS:        (profile !== '1A_ROBS_In_Use' && robsInterest === 'Yes'),
    ROBS_READY:          (robsInterest === 'Yes' && robsNewBiz === 'Yes' && robsFunds === 'Yes' && robsSetup === 'Yes'),
    SELF_EMPLOYED:       (workSituation === 'Self-employed'),
    HAS_BIZ:             (ownsBiz      === 'Yes'),
    PLANS_BIZ:           (plansBiz     === 'Yes'),
    HAS_EMPLOYEES:       (hasEmployees === 'Yes'),
    NEEDS_BACKDOOR_ROTH: (hasTradIRA   === 'Yes' && hasRothIRA === 'No'),
    SOLO401K_AVAILABLE:    (workSituation === 'Self-employed' && hasEmployees === 'No'),
    CATCH_UP_ELIGIBLE:   (age >= 50),
    LATE_STAGE_ELIGIBLE: (age >= 55 || String(nearRetire).startsWith('Yes')),
    TAX_FOCUS_NOW:       (taxFocus     === 'Now'),
    TAX_FOCUS_LATER:     (taxFocus     === 'Later'),
    TAX_FOCUS_BOTH:      (taxFocus     === 'Both'),
    URGENT_ACTION:       (urgentAction === 'Yes')
  };

   // new: write each tag into its actual header column
  for (const [tagName, isOn] of Object.entries(tags)) {
    // only write if the header actually exists
    if (hdr[tagName]) {
      sh.getRange(rowNum, hdr[tagName])
        .setValue(isOn ? tagName : '');
    }
  }
}




function handlePhase2(e) {
  // 0) Copy & notify into RawPhase2
  const srcName = (e.range && e.range.getSheet && e.range.getSheet().getName())
                  || 'Phase 2 ROBS Curious Raw';
  FinancialTruPathFunctionLibrary.copyAndNotifySubmission({
    srcSheetName:      srcName,
    destSheetName:     'RawPhase2',
    highlightColor:    '#CCFFCC',
    notificationEmail: CONFIG.ADMIN_EMAIL,
    successSubject:    'Phase 2 Complete',
    successBody:       `Copied from "${srcName}" & marked attendance.`,
    failureSubject:    'Phase 2 ⚠️ Student ID Not Found',
    failureBody:       `ID from "${srcName}" not in tracker!`,
    trackingSpreadsheetId: CONFIG.SPREADSHEET_ID,
    trackingSheetName:    'Financial',
    lookupColumn:         'G',
    markColumn:           'AI',
    missingHighlightColor:'#FFFF00'
  }, e);

  // 1) Init & grab values
  const { sheet: ws, hdr } = initWS();
  const vals = e.values;
  if (!vals) throw new Error('handlePhase2: missing e.values');

  // 2) Find the matching row in Working Sheet by Student_ID (col 4)
  const studentId = vals[3];
  const matches = ws.createTextFinder(studentId).matchEntireCell(true).findAll();
  if (!matches.length) throw new Error(`No match for Student ID "${studentId}"`);
  const rowNum = matches[matches.length - 1].getRow();

  // 3) Paste raw Phase 2 answers
  const startCol = hdr[HEADERS.PHASE_2_LINK] + 1;
  ws.getRange(rowNum, startCol, 1, vals.length).setValues([vals]);

  // 4) Run the allocation engine
  const results = runUniversalEngine(rowNum);

  // 5) Read back "actual" inputs
  const rowArr     = ws.getRange(rowNum,1,1,ws.getLastColumn()).getValues()[0];
  const actualDist = (Number(getValue(hdr,rowArr,HEADERS.P2_EX_Q6))||0)/12;
  const actualHsa  = Number(getValue(hdr,rowArr,HEADERS.P2_HSA_MONTHLY_CONTRIB))||0;
  const actualCesa = Number(getValue(hdr,rowArr,HEADERS.P2_CESA_MONTHLY_CONTRIB))||0;
  const actualRet  = Number(getValue(hdr,rowArr,HEADERS.P2_RETIREMENT_PERSONAL))||0;

  // 6) Build actualMap (all keys default to 0), then override
  const actualMap = {};
  listAllVehicleActualKeys().forEach(key => {
    // skip any family_bank_actual keys
    if (!/family_bank/.test(key)) actualMap[key] = 0;
  });
  actualMap['retirement_robs_solo_401k_profit_distribution_actual'] = actualDist;
  actualMap['retirement_hsa_actual']   = actualHsa;
  actualMap['health_hsa_actual']       = actualHsa;
  actualMap['retirement_combined_cesa_actual'] = actualCesa;
  actualMap['education_combined_cesa_actual']  = actualCesa;
  actualMap['retirement_traditional_401k_actual'] = actualRet;

  // 7) Write every _actual cell, rounded & formatted
  Object.entries(actualMap).forEach(([hdrName, rawAmt]) => {
    const col = hdr[hdrName];
    if (!col) return;
    const cell = ws.getRange(rowNum, col);
    cell.setValue(Math.round(rawAmt));
    cell.setNumberFormat('$#,##0');
  });

  // 8) Write every _ideal allocation, rounded & formatted
  const writtenIdeal = new Set();
  let sumIdeal = 0;
  ['Retirement','Education','Health'].forEach(domain => {
    for (const [veh, amtRaw] of Object.entries(results.vehicles[domain])) {
      // skip Family Bank here
      if (veh === 'Family Bank') continue;
      const key = veh.toLowerCase().replace(/[()%–]/g,'').replace(/\s+/g,'_');
      const hdrName = `${domain.toLowerCase()}_${key}_ideal`;
      const col = hdr[hdrName];
      if (!col) continue;
      const amt  = Math.round(amtRaw || 0);
      ws.getRange(rowNum, col)
        .setValue(amt)
        .setNumberFormat('$#,##0');
      writtenIdeal.add(hdrName);
      sumIdeal += amt;
    }
  });

  // 9) Dump leftover into single family_bank_ideal
  const totalPool = Number(getValue(hdr,rowArr,HEADERS.NET_MONTHLY_INCOME)) 
                    * CONFIG.OPTIMIZED_SAVINGS_RATE;
  const leftover  = Math.max(0, Math.round(totalPool - sumIdeal));
  const fbCol = hdr['family_bank_ideal'];
  if (fbCol) {
    ws.getRange(rowNum, fbCol)
      .setValue(leftover)
      .setNumberFormat('$#,##0');
    writtenIdeal.add('family_bank_ideal');
  } else {
    Logger.log('⚠️ Missing header: family_bank_ideal');
  }

  // 10) Zero-fill any remaining _actual or _ideal
  Object.entries(hdr).forEach(([name, col]) => {
    const cell = ws.getRange(rowNum, col);
    if (name.endsWith('_actual') && !(name in actualMap)) {
      cell.setValue(0).setNumberFormat('$#,##0');
    }
    if (name.endsWith('_ideal') && !writtenIdeal.has(name)) {
      cell.setValue(0).setNumberFormat('$#,##0');
    }
  });

  Logger.log(`✔️ Phase 2 done — wrote ${Object.keys(actualMap).length} actual + ${writtenIdeal.size} ideal`);
}



// helper to fetch all actual keys (returns array)
function listAllVehicleActualKeys() {
  const keys = new Set();

  Object.values(PROFILE_CONFIG).forEach(cfg => {
    ['Retirement','Education','Health'].forEach(domain => {
      (cfg[`vehicleOrder_${domain}`] || []).forEach(v => {
        const key = `${domain.toLowerCase()}_` +
          v.name.toLowerCase()
                .replace(/[()%–-]/g, '')
                .replace(/\s+/g, '_') +
          '_actual';
        keys.add(key);
      });
    });
  });

  // Log them sorted
  const sorted = Array.from(keys).sort();
  Logger.log('Actual vehicle headers needed:\n' + sorted.join('\n'));

  // And return the array of keys
  return Array.from(keys);
}



/*** DOMAIN WEIGHTS ***/
function computeDomainsAndWeights(rowArr, hdr, rMonthly) {
  // Importance scores (1–7 mapped to 0–1)
  const imp = {
    Retirement: (Number(getValue(hdr, rowArr, HEADERS.P2_RETIREMENT_IMPORTANCE)) - 1) / 6,
    Education:  (Number(getValue(hdr, rowArr, HEADERS.P2_EDUCATION_IMPORTANCE))  - 1) / 6,
    Health:     (Number(getValue(hdr, rowArr, HEADERS.P2_HEALTH_IMPORTANCE))     - 1) / 6
  };

  // Raw urgency: discount factor 1/(1+r)^months
  const domains = {
    Retirement: {
      t: Number(getValue(hdr, rowArr, HEADERS.P2_RETIREMENT_YEARS)) * 12
    },
    Education: {
      // use years until first need for education (CESA)
      t: Number(getValue(hdr, rowArr, HEADERS.P2_CESA_YEARS_UNTIL_FIRST)) * 12
    },
    Health: {
      // use years until HSA need
      t: Number(getValue(hdr, rowArr, HEADERS.P2_HSA_YEARS_UNTIL_NEED)) * 12
    }
  };

  let maxU = 0;
  for (let d in domains) {
    const U = 1 / Math.pow(1 + rMonthly, domains[d].t);
    domains[d].Uraw = U;
    maxU = Math.max(maxU, U);
  }
  // Normalize urgency and blend with importance
  for (let d in domains) {
    domains[d].Ubar = domains[d].Uraw / maxU;
    domains[d].w    = (imp[d] + domains[d].Ubar) / 2;
  }
  // Final normalize so Σw = 1
  const sumW = Object.values(domains).reduce((s,v) => s + v.w, 0);
  for (let d in domains) domains[d].w /= sumW;

  return domains;
}




/*** UTILS ***/
function sumValues(obj) {
  return Object.values(obj).reduce((s, v) => s + v, 0);
}
function mergeInto(target, src) {
  for (const k in src) target[k] = (target[k] || 0) + src[k];
}


/**
 * Computes how much “new” savings to allocate each month,
 * treating userPct as an increment over their current savings rate.
 *
 * @param {number} netIncome    — take-home pay per month
 * @param {Object} seeds        — { Education: {...}, Health: {...}, Retirement: {...} }
 * @param {number} userPct      — additional % they want to save (0–100)
 * @param {number} defaultRate  — our guideline rate (e.g. 0.20)
 * @returns {number} netPool    — dollars/month of new allocations
 */
function computeNetPool(netIncome, seeds, userPct, defaultRate) {
  // 1) Sum their existing (seeded) contributions
  const totalSeed = sumValues(seeds.Education)
                  + sumValues(seeds.Health)
                  + sumValues(seeds.Retirement);

  // 2) Compute current savings rate
  const currentPct = netIncome > 0 ? totalSeed / netIncome : 0;

  // 3) Desired total savings rate = current + incremental
  const userTotalPct = currentPct + (userPct / 100);

  // 4) Enforce at least the default guideline
  const targetRate = Math.max(defaultRate, userTotalPct);

  // 5) Compute gross pool then subtract seeds
  const grossPool = netIncome * targetRate;
  const netPool   = grossPool - totalSeed;

  // 6) Never go below zero
  const finalPool = netPool > 0 ? netPool : 0;
  return finalPool;
}





function testPhase2() {
  const ss  = SpreadsheetApp.getActiveSpreadsheet();
  const raw = ss.getSheetByName('Phase 2 ROBS Curious Raw'); // ← exact name of your raw tab
  if (!raw) throw new Error('testPhase2: raw sheet not found');
  const last = raw.getLastRow();
  const vals = raw.getRange(last, 1, 1, raw.getLastColumn()).getValues()[0];
  handlePhase2({ values: vals });
}

function dumpHeaders() {
  const { hdr } = initWS();
  Logger.log(Object.keys(hdr).join(', '));
}


function debugHeaders() {
  const { hdr } = initWS();
  console.log(Object.keys(HEADERS).map(k => `${k}→${hdr[HEADERS[k]]||'<missing>'}`).join('\n'));
}



// ═══════════════════════════════════════════════════════════════════════════════
// TESTING AND DEBUGGING FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Test data factory - creates realistic example data for testing
 */
function createTestData(profileType, options = {}) {
  const defaults = {
    age: 35,
    filing: 'Married Filing Jointly',
    hsaEligible: true,
    numKids: 2,
    netIncome: 8000,
    userAddPct: 5
  };
  
  const data = { ...defaults, ...options };
  
  // Create mock row array with realistic data
  const mockRowArr = new Array(200).fill(''); // Large enough array
  const mockHdr = {};
  
  // Build header mapping and populate data
  let colIndex = 1;
  const setTestValue = (headerName, value) => {
    mockHdr[headerName] = colIndex;
    mockRowArr[colIndex - 1] = value;
    colIndex++;
  };
  
  // Set common test values
  setTestValue(HEADERS.CURRENT_AGE, data.age);
  setTestValue(HEADERS.FILING_STATUS, data.filing);
  setTestValue(HEADERS.P2_HSA_ELIGIBILITY, data.hsaEligible ? 'Yes' : 'No');
  setTestValue(HEADERS.P2_CESA_NUM_CHILDREN, data.numKids);
  setTestValue(HEADERS.NET_MONTHLY_INCOME, data.netIncome);
  setTestValue(HEADERS.ALLOCATION_PERCENTAGE, data.userAddPct);
  setTestValue(HEADERS.PROFILE_ID, profileType);
  
  // Profile-specific test data
  switch(profileType) {
    case '2_Solo401k_Builder':
      setTestValue(HEADERS.P2_EX_Q3, 'Yes'); // Has plan
      setTestValue(HEADERS.P2_EX_Q4, 15000); // Employee contribution
      setTestValue(HEADERS.P2_EX_Q5, 25000); // Employer contribution  
      setTestValue(HEADERS.P2_EX_Q6, 40000); // Future contribution
      break;
      
    case '1A_ROBS_In_Use':
      setTestValue(HEADERS.P2_EX_Q1, 'C-corp with Solo 401(k) funded from business profits');
      setTestValue(HEADERS.P2_EX_Q2, 'Monthly distributions based on cash flow');
      break;
      
    case '3_Roth_Reclaimer':
      setTestValue(HEADERS.P2_EX_Q1, 250000); // Traditional IRA balance
      setTestValue(HEADERS.P2_EX_Q2, 'Yes'); // After-tax contributions
      break;
  }
  
  // Investment/time horizon data
  setTestValue(HEADERS.P2_INV_INVOLVEMENT, 4);
  setTestValue(HEADERS.P2_INV_TIME, 3);  
  setTestValue(HEADERS.P2_INV_CONFIDENCE, 4);
  setTestValue(HEADERS.P2_RETIREMENT_YEARS, 30);
  setTestValue(HEADERS.P2_CESA_YEARS_UNTIL_FIRST, 10);
  setTestValue(HEADERS.P2_HSA_YEARS_UNTIL_NEED, 20);
  setTestValue(HEADERS.P2_RETIREMENT_IMPORTANCE, 7);
  setTestValue(HEADERS.P2_EDUCATION_IMPORTANCE, 6);
  setTestValue(HEADERS.P2_HEALTH_IMPORTANCE, 5);
  
  return { mockRowArr, mockHdr };
}

/**
 * Test individual profile helper with example data
 */
function testProfileHelper(profileId, customOptions = {}) {
  Logger.log(`\n🧪 TESTING PROFILE: ${profileId}`);
  Logger.log('═'.repeat(60));
  
  try {
    // Get the helper function
    const helper = profileHelpers[profileId];
    if (!helper) {
      throw new Error(`Helper not found for profile: ${profileId}`);
    }
    
    // Create test data
    const { mockRowArr, mockHdr } = createTestData(profileId, customOptions);
    
    // Log test parameters
    Logger.log('📋 Test Parameters:');
    Logger.log(`  Age: ${getValue(mockHdr, mockRowArr, HEADERS.CURRENT_AGE)}`);
    Logger.log(`  Filing: ${getValue(mockHdr, mockRowArr, HEADERS.FILING_STATUS)}`);
    Logger.log(`  HSA Eligible: ${getValue(mockHdr, mockRowArr, HEADERS.P2_HSA_ELIGIBILITY)}`);
    Logger.log(`  Children: ${getValue(mockHdr, mockRowArr, HEADERS.P2_CESA_NUM_CHILDREN)}`);
    Logger.log(`  Net Income: $${getValue(mockHdr, mockRowArr, HEADERS.NET_MONTHLY_INCOME)}/month`);
    
    // Run the helper
    const result = helper(mockRowArr, mockHdr);
    
    // Log results
    Logger.log('\n📊 RESULTS:');
    Logger.log('Seeds (pre-filled amounts):');
    Logger.log(JSON.stringify(result.seeds, null, 2));
    
    Logger.log('\nVehicle Orders:');
    ['Education', 'Health', 'Retirement'].forEach(domain => {
      Logger.log(`\n${domain}:`);
      result.vehicleOrders[domain].forEach((vehicle, index) => {
        const cap = vehicle.capMonthly === Infinity ? 'Unlimited' : `$${vehicle.capMonthly}/mo`;
        Logger.log(`  ${index + 1}. ${vehicle.name} (Cap: ${cap})`);
      });
    });
    
    return result;
    
  } catch (error) {
    Logger.log(`❌ ERROR: ${error.message}`);
    return null;
  }
}

/**
 * Test all profile helpers with default data
 */
function testAllProfileHelpers() {
  Logger.log('🧪 TESTING ALL PROFILE HELPERS');
  Logger.log('═'.repeat(80));
  
  const profiles = Object.keys(PROFILE_CONFIG);
  const results = {};
  
  profiles.forEach(profileId => {
    results[profileId] = testProfileHelper(profileId);
    Logger.log('\n' + '─'.repeat(80) + '\n');
  });
  
  Logger.log('✅ All profile helpers tested!');
  return results;
}

/**
 * Test specific scenarios for tuning
 */
function testScenarios() {
  Logger.log('🎯 TESTING SPECIFIC SCENARIOS');
  Logger.log('═'.repeat(80));
  
  // Scenario 1: Young high earner with no kids
  Logger.log('\n📊 SCENARIO 1: Young High Earner, No Kids');
  testProfileHelper('6_Foundation_Builder', {
    age: 28,
    netIncome: 12000,
    numKids: 0,
    hsaEligible: true
  });
  
  // Scenario 2: Mid-career with kids, maxing retirement
  Logger.log('\n📊 SCENARIO 2: Mid-Career, 3 Kids, High Savings');
  testProfileHelper('2_Solo401k_Builder', {
    age: 42,
    netIncome: 15000,
    numKids: 3,
    userAddPct: 15
  });
  
  // Scenario 3: Catch-up age, family coverage HSA
  Logger.log('\n📊 SCENARIO 3: Catch-Up Age, Family HSA');
  testProfileHelper('5_Catch_Up', {
    age: 55,
    netIncome: 10000,
    filing: 'Married Filing Jointly',
    hsaEligible: true,
    numKids: 1
  });
  
  // Scenario 4: No HSA eligibility
  Logger.log('\n📊 SCENARIO 4: No HSA Eligibility');
  testProfileHelper('3_Roth_Reclaimer', {
    age: 45,
    netIncome: 9000,
    hsaEligible: false,
    numKids: 2
  });
}

/**
 * Test the full allocation engine with mock data
 */
function testFullAllocationEngine(profileId = '2_Solo401k_Builder', customOptions = {}) {
  Logger.log(`\n🚀 TESTING FULL ALLOCATION ENGINE`);
  Logger.log('═'.repeat(80));
  
  try {
    // Create test data  
    const { mockRowArr, mockHdr } = createTestData(profileId, customOptions);
    
    // Get helper results
    const helper = profileHelpers[profileId];
    const { seeds, vehicleOrders } = helper(mockRowArr, mockHdr);
    
    // Calculate domain weights (simplified)
    const domains = {
      Education: { w: 0.2 },
      Health: { w: 0.3 }, 
      Retirement: { w: 0.5 }
    };
    
    // Calculate net pool
    const netIncome = Number(getValue(mockHdr, mockRowArr, HEADERS.NET_MONTHLY_INCOME));
    const userAddPct = Number(getValue(mockHdr, mockRowArr, HEADERS.ALLOCATION_PERCENTAGE)) || 0;
    const netPool = computeNetPool(netIncome, seeds, userAddPct, CONFIG.OPTIMIZED_SAVINGS_RATE);
    
    Logger.log(`💰 Net Income: $${netIncome}/month`);
    Logger.log(`📈 Additional Savings: ${userAddPct}%`);
    Logger.log(`🎯 Net Pool for Allocation: $${Math.round(netPool)}/month`);
    
    // Run allocation
    const allocation = coreAllocate({ domains, pool: netPool, seeds, vehicleOrders });
    
    Logger.log('\n📊 FINAL ALLOCATION:');
    ['Education', 'Health', 'Retirement'].forEach(domain => {
      Logger.log(`\n${domain} (Weight: ${(domains[domain].w * 100).toFixed(1)}%):`);
      Object.entries(allocation[domain]).forEach(([vehicle, amount]) => {
        if (amount > 0) {
          Logger.log(`  ${vehicle}: $${Math.round(amount)}/month`);
        }
      });
    });
    
    return allocation;
    
  } catch (error) {
    Logger.log(`❌ ERROR: ${error.message}`);
    return null;
  }
}

// Individual profile test functions - easy to select from dropdown
function test_1A_ROBS_In_Use() { return testProfileHelper('1A_ROBS_In_Use'); }
function test_1B_ROBS_Curious() { return testProfileHelper('1B_ROBS_Curious'); }
function test_2_Solo401k_Builder() { return testProfileHelper('2_Solo401k_Builder'); }
function test_3_Roth_Reclaimer() { return testProfileHelper('3_Roth_Reclaimer'); }
function test_4_Bracket_Strategist() { return testProfileHelper('4_Bracket_Strategist'); }
function test_5_Catch_Up() { return testProfileHelper('5_Catch_Up'); }
function test_6_Foundation_Builder() { return testProfileHelper('6_Foundation_Builder'); }
function test_7_Biz_Owner_Group() { return testProfileHelper('7_Biz_Owner_Group'); }
function test_8_Late_Stage_Growth() { return testProfileHelper('8_Late_Stage_Growth'); }

/**
 * Demonstration function with detailed result interpretation
 */
function demonstrateResultInterpretation() {
  Logger.log('🎓 HOW TO INTERPRET PROFILE HELPER RESULTS');
  Logger.log('═'.repeat(80));
  
  // Run a test with known parameters
  const profileId = '2_Solo401k_Builder';
  const testOptions = {
    age: 35,
    filing: 'Married Filing Jointly',
    hsaEligible: true,
    numKids: 2,
    netIncome: 8000,
    userAddPct: 5
  };
  
  Logger.log(`\n📊 EXAMPLE: Testing ${profileId}`);
  Logger.log(`Parameters: Age ${testOptions.age}, Income $${testOptions.netIncome}/mo, ${testOptions.numKids} kids`);
  
  const { mockRowArr, mockHdr } = createTestData(profileId, testOptions);
  const helper = profileHelpers[profileId];
  const result = helper(mockRowArr, mockHdr);
  
  Logger.log('\n' + '─'.repeat(60));
  Logger.log('🔍 INTERPRETING THE RESULTS:');
  Logger.log('─'.repeat(60));
  
  // 1. Explain Seeds
  Logger.log('\n1️⃣ SEEDS SECTION:');
  Logger.log('   This shows PRE-EXISTING contributions the person is already making.');
  Logger.log('   These amounts are SUBTRACTED from their available savings pool.');
  Logger.log('\n   Raw Output:');
  Logger.log(JSON.stringify(result.seeds, null, 4));
  
  Logger.log('\n   💡 What this means:');
  Object.entries(result.seeds).forEach(([domain, vehicles]) => {
    const domainTotal = Object.values(vehicles).reduce((sum, amt) => sum + (amt || 0), 0);
    if (domainTotal > 0) {
      Logger.log(`   ${domain}: Already contributing $${Math.round(domainTotal)}/month`);
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
  Logger.log('\n2️⃣ VEHICLE ORDERS SECTION:');
  Logger.log('   This shows the PRIORITY ORDER for allocating NEW money.');
  Logger.log('   Money flows top-to-bottom until each vehicle hits its monthly cap.');
  
  ['Education', 'Health', 'Retirement'].forEach(domain => {
    Logger.log(`\n   🎯 ${domain.toUpperCase()} PRIORITY:`);
    result.vehicleOrders[domain].forEach((vehicle, index) => {
      const cap = vehicle.capMonthly === Infinity ? 'No Limit' : `$${Math.round(vehicle.capMonthly)}/mo max`;
      const priority = index + 1;
      Logger.log(`   ${priority}. ${vehicle.name} (${cap})`);
      
      // Add interpretation
      if (vehicle.name.includes('Bank')) {
        Logger.log(`      💡 This is a "catch-all" for overflow money`);
      } else if (vehicle.capMonthly !== Infinity) {
        Logger.log(`      💡 Will fill up to $${Math.round(vehicle.capMonthly)}/month, then overflow to next vehicle`);
      }
    });
  });
  
  // 3. Calculate and explain caps
  Logger.log('\n3️⃣ CONTRIBUTION LIMITS BREAKDOWN:');
  Logger.log('   Here are the IRS/plan limits being applied:');
  
  const age = testOptions.age;
  const filing = testOptions.filing;
  const hsaType = (filing === 'Married Filing Jointly') ? 'FAMILY' : 'INDIVIDUAL';
  
  Logger.log(`\n   📋 For age ${age}, filing ${filing}:`);
  Logger.log(`   • Solo 401(k) Employee: $${LIMITS.RETIREMENT.EMPLOYEE_401K}/year = $${Math.round(LIMITS.RETIREMENT.EMPLOYEE_401K/12)}/month`);
  Logger.log(`   • HSA (${hsaType.toLowerCase()}): $${LIMITS.HEALTH.HSA[hsaType]}/year = $${Math.round(LIMITS.HEALTH.HSA[hsaType]/12)}/month`);
  Logger.log(`   • Roth IRA: $${LIMITS.RETIREMENT.ROTH_IRA}/year = $${Math.round(LIMITS.RETIREMENT.ROTH_IRA/12)}/month`);
  Logger.log(`   • CESA per child: $${CONFIG.ANNUAL_CESA_LIMIT}/year = $${Math.round(CONFIG.ANNUAL_CESA_LIMIT/12)}/month`);
  Logger.log(`   • Combined CESA (${testOptions.numKids} kids): $${testOptions.numKids * CONFIG.ANNUAL_CESA_LIMIT}/year = $${Math.round((testOptions.numKids * CONFIG.ANNUAL_CESA_LIMIT)/12)}/month`);
  
  if (age >= 50) {
    Logger.log(`   • Catch-up contributions available at age ${age}!`);
  }
  
  Logger.log('\n4️⃣ WHAT TO LOOK FOR:');
  Logger.log('   ✅ GOOD SIGNS:');
  Logger.log('   • Vehicle caps match IRS limits');
  Logger.log('   • Priority order makes sense for the profile');
  Logger.log('   • HSA shows up if eligible, filtered out if not');
  Logger.log('   • Education vehicles only appear if numKids > 0');
  Logger.log('   • Bank vehicles appear last as overflow');
  
  Logger.log('\n   ⚠️  RED FLAGS:');
  Logger.log('   • Vehicle caps are wrong (check LIMITS object)');
  Logger.log('   • HSA appears when not eligible');
  Logger.log('   • Education vehicles when no kids');
  Logger.log('   • Priority order doesn\'t match profile strategy');
  Logger.log('   • Missing vehicles that should be there');
  
  return result;
}

/**
*original testing and debugging functions
 */
function smokeTestEngine() {
  const testRow = 4;  // ← change this to the row number you prepared
  const result  = runUniversalEngine(testRow);

  // Log the full allocations object
  Logger.log('Allocations for row ' + testRow + ':\n' +
             JSON.stringify(result.vehicles, null, 2));
}

function listProfileIDs() {
  return Object.keys(PROFILE_CONFIG);
}

function logProfileIDs() {
  const ids = listProfileIDs();
  Logger.log('Configured Profile IDs: %s', ids.join(', '));
}

function checkHeaderAlignment() {
  const { hdr } = initWS();
  const defined = Object.entries(HEADERS).map(([key, name]) => ({ key, name }));
  const namesFound = Object.keys(hdr);

  // 1a) Find missing constants
  const missing = defined.filter(d => !hdr[d.name]);

  // 1b) Find extra sheet columns
  const extras  = namesFound.filter(n => !defined.some(d => d.name === n));

  Logger.log('⚠️ Missing HEADER constants for: %s', missing.map(m=>m.name).join(', ') || 'None');
  Logger.log('⚠️ Extra columns in sheet not in HEADERS: %s', extras.join(', ') || 'None');
}

function debugVehicleHeaders() {
  const actualKeys = listAllVehicleActualKeys();  // Builds [ ...'_actual' ] list
  const idealKeys  = actualKeys.map(k => k.replace('_actual', '_ideal'));
  Logger.log('─── Actual headers needed:\n%s', actualKeys.join('\n'));
  Logger.log('─── Ideal  headers needed:\n%s', idealKeys.join('\n'));
}


/**
 * Orchestrator for Phase 2: reads inputs, delegates per‐profile config,
 * computes net savings pool, calls coreAllocate, rounds results, and returns domains & vehicles.
 *
 * @param {number} rowNum  1-based row in the Working Sheet to process
 * @returns {{domains:Object, vehicles:Object}}
 */
function runUniversalEngine(rowNum) {
  Logger.log('runUniversalEngine ▶ START row=%s', rowNum);

  // 1) Read row
  const { sheet: sh, hdr } = initWS();
  const rowArr = sh.getRange(rowNum, 1, 1, sh.getLastColumn()).getValues()[0];

  // 2) Domain weights
  const inv1 = Number(getValue(hdr, rowArr, HEADERS.P2_INV_INVOLVEMENT));
  const inv2 = Number(getValue(hdr, rowArr, HEADERS.P2_INV_TIME));
  const inv3 = Number(getValue(hdr, rowArr, HEADERS.P2_INV_CONFIDENCE));
  const Sbar = (inv1 + inv2 + inv3) / 3;
  const rAnn = 0.08 + ((Sbar - 1) / 6) * 0.12;
  const rMonthly = rAnn / 12;
  const domObj = computeDomainsAndWeights(rowArr, hdr, rMonthly);
  const domains = {
    Education:  { w: domObj.Education.w },
    Health:     { w: domObj.Health.w },
    Retirement: { w: domObj.Retirement.w }
  };

  // 3) Net income & user add‐pct
  const netIncome  = Number(getValue(hdr, rowArr, HEADERS.NET_MONTHLY_INCOME));
  const userAddPct = Number(getValue(hdr, rowArr, HEADERS.ALLOCATION_PERCENTAGE)) || 0;

  // 4) Profile helper
  const profileId = getValue(hdr, rowArr, HEADERS.PROFILE_ID);
  const helper    = profileHelpers[profileId];
  if (!helper) throw new Error(`No helper for profile '${profileId}'`);
  const { seeds, vehicleOrders } = helper(rowArr, hdr);

  // 5) Net‐pool calculation
  const netPool = computeNetPool(netIncome, seeds, userAddPct, CONFIG.OPTIMIZED_SAVINGS_RATE);

  // 6) Allocate and round
  const raw = coreAllocate({ domains, pool: netPool, seeds, vehicleOrders });
  const vehicles = {};
  for (const domain of Object.keys(raw)) {
    vehicles[domain] = {};
    for (const [veh, amt] of Object.entries(raw[domain])) {
      vehicles[domain][veh] = Math.round(amt);
    }
  }

  Logger.log('runUniversalEngine ▶ COMPLETE row=%s', rowNum);
  return { domains, vehicles };
}



/**
 * Quick smoke test for runUniversalEngine()
 */
function quickTestEngine() {
  const testRow = 4;  // ← change this to the row with your Phase 2 data
  const { domains, vehicles } = runUniversalEngine(testRow);
  Logger.log('domains: %s',  JSON.stringify(domains,  null, 2));
  Logger.log('vehicles: %s', JSON.stringify(vehicles, null, 2));
}





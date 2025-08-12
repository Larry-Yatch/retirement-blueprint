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
  '1_ROBS_In_Use': {
    title:       'ROBS-In-Use Strategist',
    description: 'Already has a C-corp + ROBS retirement plan, funding a Solo 401(k) with business revenue.',
    extraQuestions: [
      'Describe how your ROBS strategy is currently structured:',
      'How are your business profits routed into your Solo 401(k)?',
      'Which type of contributions are you making? (Roth only / Traditional only / Both)',
      'How often do you contribute to your Solo 401(k)? (Monthly, Quarterly, etc.)',
      'Do you also contribute to a Roth IRA? If yes, how much per year to each?',
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

  '2_ROBS_Curious': {
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

  '3_Solo401k_Builder': {
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

  '4_Roth_Reclaimer': {
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

  '5_Bracket_Strategist': {
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

  '6_Catch_Up': {
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

  '7_Foundation_Builder': {
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

  '8_Biz_Owner_Group': {
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

  '9_Late_Stage_Growth': {
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

// ═══════════════════════════════════════════════════════════════════════════════
// CURRENT FORM DATA - EMBEDDED EXPORTS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Current form structures exported from Google Forms
 * This section gets automatically updated by updateEmbeddedFormData()
 * DO NOT EDIT MANUALLY - Use updateEmbeddedFormData() to refresh
 */
const CURRENT_FORMS = {
  "lastExported": "2025-08-12T06:18:55.748Z",
  "exportedBy": "updateEmbeddedFormData()",
  "formsData": {
    "PHASE_1": {
      "metadata": {
        "formId": "1w4aPniYDM3oxiT-crPghmn9sYxYaw51sSexktoZJE8A",
        "name": "Phase 1 - Profile Classification",
        "title": "",
        "description": "This form captures only the information required to classify you into one of the 9 retirement funding profiles. Please answer honestly and skip any ROBS-specific questions if they do not apply.",
        "exportTimestamp": "2025-08-12T06:18:56.272Z"
      },
      "items": [
        {
          "index": 0,
          "title": "Full Name",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 1,
          "title": "Email",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 2,
          "title": "Student Identifier",
          "type": "SECTION_HEADER",
          "helpText": "In the following field we are going to ask for your Student Identifier.  This is what we use to track your answers across all of the worksheets for this course.  IT IS CRITICAL TO GET THE MOST OF OUT THESE WORKSHEETS THAT YOU USE THE SAME IDENTIFIER.  Your student identifier is the last four of your cell phone number and your first and last initial IN CAPS no spaces.\n\nExample: 6123LY",
          "required": false
        },
        {
          "index": 3,
          "title": "Student Identifier - Last 4 of your cell phone number with First and Last Initial in CAPS\n\nEX: 6123LY",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 4,
          "title": "What is your current age?",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 5,
          "title": "What best describes your work situation?",
          "type": "MULTIPLE_CHOICE",
          "helpText": "",
          "required": true,
          "choices": [
            "W-2 employee",
            "Self-employed",
            "Both",
            "Not working"
          ]
        },
        {
          "index": 6,
          "title": "Do you own a business?",
          "type": "MULTIPLE_CHOICE",
          "helpText": "",
          "required": true,
          "choices": [
            "Yes",
            "No"
          ]
        },
        {
          "index": 7,
          "title": "Do you plan to start a business in the next 12 months?",
          "type": "MULTIPLE_CHOICE",
          "helpText": "",
          "required": true,
          "choices": [
            "Yes",
            "No"
          ]
        },
        {
          "index": 8,
          "title": "Do you have W-2 employees (excluding yourself or your spouse)?",
          "type": "MULTIPLE_CHOICE",
          "helpText": "",
          "required": true,
          "choices": [
            "Yes",
            "No"
          ]
        },
        {
          "index": 9,
          "title": "Do you currently have a Roth IRA?",
          "type": "MULTIPLE_CHOICE",
          "helpText": "",
          "required": true,
          "choices": [
            "Yes",
            "No"
          ]
        },
        {
          "index": 10,
          "title": "Do you have a Traditional IRA or a previous employer 401(k)/403(b)/TSP?",
          "type": "MULTIPLE_CHOICE",
          "helpText": "",
          "required": true,
          "choices": [
            "Yes",
            "No"
          ]
        },
        {
          "index": 11,
          "title": "Are you currently using a ROBS structure?",
          "type": "MULTIPLE_CHOICE",
          "helpText": "",
          "required": true,
          "choices": [
            "Yes",
            "No"
          ]
        },
        {
          "index": 12,
          "title": "Are you interested in using a ROBS strategy? \n(if you are planning on starting a business you might want to mark this yes)",
          "type": "MULTIPLE_CHOICE",
          "helpText": "",
          "required": true,
          "choices": [
            "Yes",
            "No",
            "Not sure"
          ]
        },
        {
          "index": 13,
          "title": "ROBS Qualification (Answer only if interested in ROBS)",
          "type": "SECTION_HEADER",
          "helpText": "If you are interested in starting a business fill these out.\nIf you are not interested in ROBS, mark these as N/A.",
          "required": false
        },
        {
          "index": 14,
          "title": "ROBS QUALIFIER: Is this a new business (or one you could restructure under a new C-corp)?",
          "type": "MULTIPLE_CHOICE",
          "helpText": "",
          "required": true,
          "choices": [
            "Yes",
            "No",
            "N/A"
          ]
        },
        {
          "index": 15,
          "title": "ROBS QUALIFIER: Do you have at least $50,000 in a rollover-eligible retirement account?",
          "type": "MULTIPLE_CHOICE",
          "helpText": "",
          "required": true,
          "choices": [
            "Yes",
            "No",
            "N/A"
          ]
        },
        {
          "index": 16,
          "title": "ROBS QUALIFIER: Can you fund the estimated $5,000–$10,000 setup cost?",
          "type": "MULTIPLE_CHOICE",
          "helpText": "",
          "required": true,
          "choices": [
            "Yes",
            "No",
            "N/A"
          ]
        },
        {
          "index": 17,
          "title": "Are you focused on minimizing taxes now, later, or both?",
          "type": "MULTIPLE_CHOICE",
          "helpText": "",
          "required": true,
          "choices": [
            "Now",
            "Later",
            "Both"
          ]
        },
        {
          "index": 18,
          "title": "Do you feel behind on retirement and want to catch up?",
          "type": "MULTIPLE_CHOICE",
          "helpText": "",
          "required": true,
          "choices": [
            "Yes",
            "No"
          ]
        },
        {
          "index": 19,
          "title": "Are you within 5–10 years of retirement or currently semi-retired, with an interest in reallocating your retirement funds for growth or income?",
          "type": "MULTIPLE_CHOICE",
          "helpText": "",
          "required": true,
          "choices": [
            "Yes – planning withdrawals soon",
            "Yes – but not withdrawing yet",
            "No"
          ]
        },
        {
          "index": 20,
          "title": "Are you motivated to take action on your financial plan in the next 6–12 months?",
          "type": "MULTIPLE_CHOICE",
          "helpText": "",
          "required": true,
          "choices": [
            "Yes",
            "No"
          ]
        },
        {
          "index": 21,
          "title": "How do you file your taxes?",
          "type": "MULTIPLE_CHOICE",
          "helpText": "",
          "required": true,
          "choices": [
            "Single",
            "Married Filing Jointly"
          ]
        },
        {
          "index": 22,
          "title": "“What is your approximate gross ANNUAL income (before taxes and retirement contributions)?”\nThis is used to determine eligibility for certain retirement accounts and strategies.\n\nEnter the amount in whole dollars e.g. 6000 for $6 000",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 23,
          "title": "What is your take-home (net) pay each month after taxes?\nEnter the amount you actually receive in your bank account each month (whole dollars). e.g. 6000 for $6 000",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 24,
          "title": "What percentage of your monthly take-home pay would you like to invest each month, in addition to what you’re already contributing to existing accounts?\n\nEnter a whole number between 0 and 100. For example, if you’re already saving 10% of your take-home pay and you’d like to save another 12%, enter 12.",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 25,
          "title": "Approximately how much can you commit to save each month across all goals?\nEnter a dollar amount in whole dollars. e.g. 800 for $800/month",
          "type": "TEXT",
          "helpText": "",
          "required": true
        }
      ]
    },
    "1_ROBS_In_Use": {
      "metadata": {
        "formId": "1jv_rpG_i6O26BB0TcTtF_pxjYyvIXfA5qXTNPT8uzec",
        "name": "Phase 2 - ROBS-In-Use Strategist",
        "title": "Retirement Blueprint – Phase 2 – ROBS In Use Profile Deep Dive",
        "description": "This form captures detailed information to create your personalized Retirement Blueprint. Please answer all that apply.",
        "exportTimestamp": "2025-08-12T06:19:03.307Z"
      },
      "items": [
        {
          "index": 0,
          "title": "Full Name",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 1,
          "title": "Email",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 2,
          "title": "Student Identifier",
          "type": "TEXT",
          "helpText": "Last 4 digits of your cell phone + initials in CAPS, no spaces. e.g. 6123LY (If pre-filled please do not change)",
          "required": true
        },
        {
          "index": 3,
          "title": "Demographics & Investment Profile",
          "type": "SECTION_HEADER",
          "helpText": "These help us classify your profile and set growth assumptions.",
          "required": false
        },
        {
          "index": 4,
          "title": "Current Age",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 5,
          "title": "Target Retirement Age",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 6,
          "title": "Do you have children (or plan to support children’s education)?",
          "type": "MULTIPLE_CHOICE",
          "helpText": "",
          "required": true,
          "choices": [
            "Yes",
            "No"
          ]
        },
        {
          "index": 7,
          "title": "If yes, how many years are there until you plan to use the funds.",
          "type": "TEXT",
          "helpText": "Leave blank if no children",
          "required": false
        },
        {
          "index": 8,
          "title": "Do you have an HSA or do you expect to be eligible for an HSA?",
          "type": "MULTIPLE_CHOICE",
          "helpText": "",
          "required": true,
          "choices": [
            "Yes",
            "No"
          ]
        },
        {
          "index": 9,
          "title": "Your Investment Profile",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us estimate the return rate for your self directed investments.",
          "required": false
        },
        {
          "index": 10,
          "title": "How involved do you want to be in managing your own investment decisions?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not involved",
          "rightLabel": "Highly involved"
        },
        {
          "index": 11,
          "title": "How much time do you plan to dedicate to investment  research and management?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "As little as possible",
          "rightLabel": "A lot"
        },
        {
          "index": 12,
          "title": "How would you rate your confidence in investing, as well as your knowledge or experience?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Beginner",
          "rightLabel": "Very experienced"
        },
        {
          "index": 13,
          "title": "Health (HSA) Urgency",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us determine the Urgency in growing an HSA account.",
          "required": false
        },
        {
          "index": 14,
          "title": "Current HSA balance",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 15,
          "title": "Current monthly HSA contribution",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 16,
          "title": "Years until you expect to need these funds",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 17,
          "title": "Target HSA balance",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 18,
          "title": "Education (CESA) Urgency",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us determine the urgency and scale of your combined education savings.",
          "required": false
        },
        {
          "index": 19,
          "title": "Current education savings balance",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 20,
          "title": "Current monthly education contribution",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 21,
          "title": "How many children or dependents are you saving for?",
          "type": "TEXT",
          "helpText": "Enter a whole number, e.g. 2",
          "required": false
        },
        {
          "index": 22,
          "title": "Total combined education savings goal",
          "type": "TEXT",
          "helpText": "e.g. $150,000 for all children",
          "required": false
        },
        {
          "index": 23,
          "title": "Years until the first child needs funds",
          "type": "TEXT",
          "helpText": "Enter years until your earliest education expense, e.g. 5",
          "required": false
        },
        {
          "index": 24,
          "title": "Retirement Urgency",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us determine the Urgency in growing your personal retirement accounts.",
          "required": false
        },
        {
          "index": 25,
          "title": "Aside from corporate profit distributions, how much per month do you personally contribute to retirement accounts? (not including CESA or HSA)",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 26,
          "title": "Expected annual company profit distributions back into your Solo 401(k) - (this is the amount of profit that is first taxed at 21% (corp rate) then distributed back into the 401(k))",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 27,
          "title": "Current total retirement savings",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 28,
          "title": "Years until your target retirement age",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 29,
          "title": "Desired monthly retirement income (today’s dollars)",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 30,
          "title": "Ambition Quotient",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us understand the relative importance of each domain in your life today.",
          "required": false
        },
        {
          "index": 31,
          "title": "How important to you is saving for retirement at this point in your life?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not at all important",
          "rightLabel": "Absolutely essential"
        },
        {
          "index": 32,
          "title": "How much anxiety do you currently feel about your retirement outlook?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "No anxiety at all",
          "rightLabel": "Constant anxiety and concern"
        },
        {
          "index": 33,
          "title": "How motivated are you to take action toward your retirement goals?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not motivated at all",
          "rightLabel": "Extremely motivated"
        },
        {
          "index": 34,
          "title": "How important to you is saving for a child’s education (or the education of children you support) at this point in your life?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not at all important",
          "rightLabel": "Absolutely essential"
        },
        {
          "index": 35,
          "title": "How much anxiety do you currently feel about being able to fund your children’s future education?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "No anxiety at all",
          "rightLabel": "Constant anxiety and concern"
        },
        {
          "index": 36,
          "title": "How motivated are you to take action toward funding your children’s future education?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not motivated at all",
          "rightLabel": "Extremely motivated"
        },
        {
          "index": 37,
          "title": "How important to you is saving for future healthcare costs at this point in your life?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not at all important",
          "rightLabel": "Absolutely essential"
        },
        {
          "index": 38,
          "title": "How much anxiety do you currently feel about being able to afford healthcare expenses down the road?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "No anxiety at all",
          "rightLabel": "Constant anxiety and concern"
        },
        {
          "index": 39,
          "title": "How motivated are you to set aside money specifically for health-related expenses?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not motivated at all",
          "rightLabel": "Extremely motivated"
        },
        {
          "index": 40,
          "title": "Tie-Breaker Questions",
          "type": "SECTION_HEADER",
          "helpText": "These help us finalize your priorities. Please answer all three.",
          "required": false
        },
        {
          "index": 41,
          "title": "If you could only fully fund one area this year, which would you choose?*",
          "type": "LIST",
          "helpText": "",
          "required": true,
          "choices": [
            "Retirement",
            "Education",
            "Health"
          ]
        },
        {
          "index": 42,
          "title": "Which area would feel most painful to neglect or delay right now?*",
          "type": "LIST",
          "helpText": "",
          "required": true,
          "choices": [
            "Retirement",
            "Education",
            "Health"
          ]
        },
        {
          "index": 43,
          "title": "Rank these in order of importance",
          "type": "GRID",
          "helpText": "",
          "required": true,
          "rows": [
            "Retirement",
            "Education",
            "Health"
          ],
          "columns": [
            "1",
            "2",
            "3"
          ]
        },
        {
          "index": 44,
          "title": "Profile Deep Dive Questions",
          "type": "SECTION_HEADER",
          "helpText": "These help us to customize your Blueprint based on your specific situation.  If you do not know the answer to a question write \"I do not know.\"  or \"Please give me advice on this.\"",
          "required": false
        },
        {
          "index": 45,
          "title": "Describe how your ROBS strategy is currently structured:",
          "type": "PARAGRAPH_TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 46,
          "title": "How are your business profits routed into your Solo 401(k)?",
          "type": "PARAGRAPH_TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 47,
          "title": "Which type of contributions are you making? (Roth only / Traditional only / Both)",
          "type": "MULTIPLE_CHOICE",
          "helpText": "",
          "required": true,
          "choices": [
            "Roth",
            "Traditional",
            "Both"
          ]
        },
        {
          "index": 48,
          "title": "How often do you contribute to your Solo 401(k)? (Monthly, Quarterly, etc.)",
          "type": "PARAGRAPH_TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 49,
          "title": "Do you also contribute to a Roth IRA? If yes, how much per year to each?\n\nJust write a whole number eg 100.",
          "type": "TEXT",
          "helpText": "",
          "required": true
        }
      ]
    },
    "2_ROBS_Curious": {
      "metadata": {
        "formId": "1XjpC0o75D4Lgu07hegkK1c5LD47TU6M78Kdywhj8Ao8",
        "name": "Phase 2 - ROBS-Curious Builder",
        "title": "Retirement Blueprint – Phase 2 – ROBS-Curious Builder Profile Deep Dive",
        "description": "This form captures detailed information to create your personalized Retirement Blueprint. Please answer all that apply.",
        "exportTimestamp": "2025-08-12T06:19:15.564Z"
      },
      "items": [
        {
          "index": 0,
          "title": "Full Name",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 1,
          "title": "Email",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 2,
          "title": "Student Identifier",
          "type": "TEXT",
          "helpText": "Last 4 digits of your cell phone + initials in CAPS, no spaces. e.g. 6123LY (If pre-filled please do not change)",
          "required": true
        },
        {
          "index": 3,
          "title": "Demographics & Investment Profile",
          "type": "SECTION_HEADER",
          "helpText": "These help us classify your profile and set growth assumptions.",
          "required": false
        },
        {
          "index": 4,
          "title": "Current Age",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 5,
          "title": "Target Retirement Age",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 6,
          "title": "Do you have children (or plan to support children’s education)?",
          "type": "MULTIPLE_CHOICE",
          "helpText": "",
          "required": true,
          "choices": [
            "Yes",
            "No"
          ]
        },
        {
          "index": 7,
          "title": "If Yes, years until you plan to use the funds.",
          "type": "TEXT",
          "helpText": "Leave blank if no children",
          "required": false
        },
        {
          "index": 8,
          "title": "Do you have an HSA or do you expect to be eligible for an HSA?",
          "type": "MULTIPLE_CHOICE",
          "helpText": "",
          "required": true,
          "choices": [
            "Yes",
            "No"
          ]
        },
        {
          "index": 9,
          "title": "Your Investment Profile",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us estimate the return rate for your self directed investments.",
          "required": false
        },
        {
          "index": 10,
          "title": "How involved do you want to be in managing your own investment decisions?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not involved",
          "rightLabel": "Highly involved"
        },
        {
          "index": 11,
          "title": "How much time do you plan to dedicate to investment research and management?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "As little as possible",
          "rightLabel": "A lot"
        },
        {
          "index": 12,
          "title": "How would you rate your confidence in investing, as well as your knowledge or experience?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Beginner",
          "rightLabel": "Very experienced"
        },
        {
          "index": 13,
          "title": "Health (HSA) Urgency",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us determine the Urgency in growing an HSA account.",
          "required": false
        },
        {
          "index": 14,
          "title": "Current HSA balance",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 15,
          "title": "Current monthly HSA contribution",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 16,
          "title": "Years until you expect to need these funds",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 17,
          "title": "Target HSA balance",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 18,
          "title": "Education (CESA) Urgency",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us determine the urgency and scale of your combined education savings.",
          "required": false
        },
        {
          "index": 19,
          "title": "Current education savings balance",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 20,
          "title": "Current monthly education contribution",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 21,
          "title": "How many children or dependents are you saving for?",
          "type": "TEXT",
          "helpText": "Enter a whole number, e.g. 2",
          "required": false
        },
        {
          "index": 22,
          "title": "Total combined education savings goal",
          "type": "TEXT",
          "helpText": "e.g. $150,000 for all children",
          "required": false
        },
        {
          "index": 23,
          "title": "Years until the first child needs funds",
          "type": "TEXT",
          "helpText": "Enter years until your earliest education expense, e.g. 5",
          "required": false
        },
        {
          "index": 24,
          "title": "Retirement Urgency",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us determine the Urgency in growing your personal retirement accounts.",
          "required": false
        },
        {
          "index": 25,
          "title": "Current total retirement savings",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 26,
          "title": "Current monthly retirement contribution",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 27,
          "title": "Years until your target retirement age",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 28,
          "title": "Desired monthly retirement income (today’s dollars)",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 29,
          "title": "Ambition Quotient",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us understand the relative importance of each domain in your life today.",
          "required": false
        },
        {
          "index": 30,
          "title": "How important to you is saving for retirement at this point in your life?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not at all important",
          "rightLabel": "Absolutely essential"
        },
        {
          "index": 31,
          "title": "How much anxiety do you currently feel about your retirement outlook?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "No anxiety at all",
          "rightLabel": "Constant anxiety and concern"
        },
        {
          "index": 32,
          "title": "How motivated are you to take action toward your retirement goals?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not motivated at all",
          "rightLabel": "Extremely motivated"
        },
        {
          "index": 33,
          "title": "How important to you is saving for a child’s education (or the education of children you support) at this point in your life?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not at all important",
          "rightLabel": "Absolutely essential"
        },
        {
          "index": 34,
          "title": "How much anxiety do you currently feel about being able to fund your children’s future education?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "No anxiety at all",
          "rightLabel": "Constant anxiety and concern"
        },
        {
          "index": 35,
          "title": "How motivated are you to take action toward funding your children’s future education?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not motivated at all",
          "rightLabel": "Extremely motivated"
        },
        {
          "index": 36,
          "title": "How important to you is saving for future healthcare costs at this point in your life?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not at all important",
          "rightLabel": "Absolutely essential"
        },
        {
          "index": 37,
          "title": "How much anxiety do you currently feel about being able to afford healthcare expenses down the road?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "No anxiety at all",
          "rightLabel": "Constant anxiety and concern"
        },
        {
          "index": 38,
          "title": "How motivated are you to set aside money specifically for health-related expenses?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not motivated at all",
          "rightLabel": "Extremely motivated"
        },
        {
          "index": 39,
          "title": "Tie-Breaker Questions",
          "type": "SECTION_HEADER",
          "helpText": "These help us finalize your priorities. Please answer all three.",
          "required": false
        },
        {
          "index": 40,
          "title": "If you could only fully fund one area this year, which would you choose?*",
          "type": "LIST",
          "helpText": "",
          "required": true,
          "choices": [
            "Retirement",
            "Education",
            "Health"
          ]
        },
        {
          "index": 41,
          "title": "Which area would feel most painful to neglect or delay right now?*",
          "type": "LIST",
          "helpText": "",
          "required": true,
          "choices": [
            "Retirement",
            "Education",
            "Health"
          ]
        },
        {
          "index": 42,
          "title": "Rank these in order of importance",
          "type": "GRID",
          "helpText": "",
          "required": true,
          "rows": [
            "Retirement",
            "Education",
            "Health"
          ],
          "columns": [
            "1",
            "2",
            "3"
          ]
        },
        {
          "index": 43,
          "title": "Profile Deep Dive Questions",
          "type": "SECTION_HEADER",
          "helpText": "These help us to customize your Blueprint based on you specific situation.  If you do not know the answer to a question, write \"I do not know.\"  or \"Please give me advice on this.\"",
          "required": false
        },
        {
          "index": 44,
          "title": "What is the approximate balance you plan to rollover initially into your ROBS-funded C-corp?",
          "type": "PARAGRAPH_TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 45,
          "title": "What is your expected annual contribution from business profits back into the Solo 401(k)?",
          "type": "PARAGRAPH_TEXT",
          "helpText": "",
          "required": true
        }
      ]
    },
    "3_Solo401k_Builder": {
      "metadata": {
        "formId": "1ur5MAwKetidU52v1xQDZSMn5LjefpIQqGbngxLR8dOE",
        "name": "Phase 2 - Solo 401(k) Builder",
        "title": "Retirement Blueprint – Phase 2 – SOLO 401(K) Builder Profile Deep Dive",
        "description": "This form captures detailed information to create your personalized Retirement Blueprint. Please answer all that apply.",
        "exportTimestamp": "2025-08-12T06:19:26.867Z"
      },
      "items": [
        {
          "index": 0,
          "title": "Full Name",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 1,
          "title": "Email",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 2,
          "title": "Student Identifier",
          "type": "TEXT",
          "helpText": "Last 4 digits of your cell phone + initials in CAPS, no spaces. e.g. 6123LY (If pre-filled please do not change)",
          "required": true
        },
        {
          "index": 3,
          "title": "Demographics & Investment Profile",
          "type": "SECTION_HEADER",
          "helpText": "These help us classify your profile and set growth assumptions.",
          "required": false
        },
        {
          "index": 4,
          "title": "Current Age",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 5,
          "title": "Target Retirement Age",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 6,
          "title": "Do you have children (or plan to support children’s education)?",
          "type": "MULTIPLE_CHOICE",
          "helpText": "",
          "required": true,
          "choices": [
            "Yes",
            "No"
          ]
        },
        {
          "index": 7,
          "title": "If Yes, years until you plan to use the funds.",
          "type": "TEXT",
          "helpText": "Leave blank if no children",
          "required": false
        },
        {
          "index": 8,
          "title": "Do you have an HSA or do you expect to be eligible for an HSA?",
          "type": "MULTIPLE_CHOICE",
          "helpText": "",
          "required": true,
          "choices": [
            "Yes",
            "No"
          ]
        },
        {
          "index": 9,
          "title": "Your Investment Profile",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us estimate the return rate for your self directed investments.",
          "required": false
        },
        {
          "index": 10,
          "title": "How involved do you want to be in managing your own investment decisions?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not involved",
          "rightLabel": "Highly involved"
        },
        {
          "index": 11,
          "title": "How much time do you plan to dedicate to investment research and management?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "As little as possible",
          "rightLabel": "A lot"
        },
        {
          "index": 12,
          "title": "How would you rate your confidence in investing, as well as your knowledge or experience?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Beginner",
          "rightLabel": "Very experienced"
        },
        {
          "index": 13,
          "title": "Health (HSA) Urgency",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us determine the Urgency in growing an HSA account.",
          "required": false
        },
        {
          "index": 14,
          "title": "Current HSA balance",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 15,
          "title": "Current monthly HSA contribution",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 16,
          "title": "Years until you expect to need these funds",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 17,
          "title": "Target HSA balance",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 18,
          "title": "Education (CESA) Urgency",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us determine the urgency and scale of your combined education savings.",
          "required": false
        },
        {
          "index": 19,
          "title": "Current education savings balance",
          "type": "TEXT",
          "helpText": "Leave blank if not saving for Education",
          "required": false
        },
        {
          "index": 20,
          "title": "Current monthly education contribution",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 21,
          "title": "How many children or dependents are you saving for?",
          "type": "TEXT",
          "helpText": "Leave blank if not saving for Education\nEnter a whole number, e.g. 2",
          "required": false
        },
        {
          "index": 22,
          "title": "Total combined education savings goal",
          "type": "TEXT",
          "helpText": "Leave blank if not saving for Education\ne.g. $150,000 for all children",
          "required": false
        },
        {
          "index": 23,
          "title": "Years until the first child needs funds",
          "type": "TEXT",
          "helpText": "\nLeave blank if not saving for Education\nEnter years until your earliest education expense, e.g. 5",
          "required": false
        },
        {
          "index": 24,
          "title": "Retirement Urgency",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us determine the Urgency in growing your personal retirement accounts.",
          "required": false
        },
        {
          "index": 25,
          "title": "Current total retirement savings",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 26,
          "title": "Current monthly retirement contribution",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 27,
          "title": "Years until your target retirement age",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 28,
          "title": "Desired monthly retirement income (today’s dollars)",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 29,
          "title": "Ambition Quotient",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us understand the relative importance of each domain in your life today.",
          "required": false
        },
        {
          "index": 30,
          "title": "How important to you is saving for retirement at this point in your life?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not at all important",
          "rightLabel": "Absolutely essential"
        },
        {
          "index": 31,
          "title": "How much anxiety do you currently feel about your retirement outlook?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "No anxiety at all",
          "rightLabel": "Constant anxiety and concern"
        },
        {
          "index": 32,
          "title": "How motivated are you to take action toward your retirement goals?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not motivated at all",
          "rightLabel": "Extremely motivated"
        },
        {
          "index": 33,
          "title": "How important to you is saving for a child’s education (or the education of children you support) at this point in your life?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not at all important",
          "rightLabel": "Absolutely essential"
        },
        {
          "index": 34,
          "title": "How much anxiety do you currently feel about being able to fund your children’s future education?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "No anxiety at all",
          "rightLabel": "Constant anxiety and concern"
        },
        {
          "index": 35,
          "title": "How motivated are you to take action toward funding your children’s future education?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not motivated at all",
          "rightLabel": "Extremely motivated"
        },
        {
          "index": 36,
          "title": "How important to you is saving for future healthcare costs at this point in your life?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not at all important",
          "rightLabel": "Absolutely essential"
        },
        {
          "index": 37,
          "title": "How much anxiety do you currently feel about being able to afford healthcare expenses down the road?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "No anxiety at all",
          "rightLabel": "Constant anxiety and concern"
        },
        {
          "index": 38,
          "title": "How motivated are you to set aside money specifically for health-related expenses?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not motivated at all",
          "rightLabel": "Extremely motivated"
        },
        {
          "index": 39,
          "title": "Tie-Breaker Questions",
          "type": "SECTION_HEADER",
          "helpText": "These help us finalize your priorities. Please answer all three.",
          "required": false
        },
        {
          "index": 40,
          "title": "If you could only fully fund one area this year, which would you choose?*",
          "type": "LIST",
          "helpText": "",
          "required": true,
          "choices": [
            "Retirement",
            "Education",
            "Health"
          ]
        },
        {
          "index": 41,
          "title": "Which area would feel most painful to neglect or delay right now?*",
          "type": "LIST",
          "helpText": "",
          "required": true,
          "choices": [
            "Retirement",
            "Education",
            "Health"
          ]
        },
        {
          "index": 42,
          "title": "Rank these in order of importance",
          "type": "GRID",
          "helpText": "",
          "required": true,
          "rows": [
            "Retirement",
            "Education",
            "Health"
          ],
          "columns": [
            "1",
            "2",
            "3"
          ]
        },
        {
          "index": 43,
          "title": "Profile Deep Dive Questions",
          "type": "SECTION_HEADER",
          "helpText": "These help us to customize your Blueprint based on you specific situation.  If you do not know the answer to a question write \"I do not know.\"  or \"Please give me advie on this.\"",
          "required": false
        },
        {
          "index": 44,
          "title": "What kind of business do you run? (Sole Prop / LLC / S-Corp / C-Corp)",
          "type": "PARAGRAPH_TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 45,
          "title": "Do you have any employees besides yourself (and your spouse)?",
          "type": "MULTIPLE_CHOICE",
          "helpText": "",
          "required": true,
          "choices": [
            "Yes",
            "No"
          ]
        },
        {
          "index": 46,
          "title": "Have you already set up a Solo 401(k) plan?",
          "type": "MULTIPLE_CHOICE",
          "helpText": "",
          "required": true,
          "choices": [
            "Yes",
            "No"
          ]
        },
        {
          "index": 47,
          "title": "If yes, how much per year will you contribute as employee? (USD)\n\nEnter the amount in whole dollars e.g. 6000 for $6 000",
          "type": "PARAGRAPH_TEXT",
          "helpText": "",
          "required": false
        },
        {
          "index": 48,
          "title": "If yes, how much per year will your business contribute as employer? (USD)\n\nEnter the amount in whole dollars e.g. 6000 for $6 000",
          "type": "PARAGRAPH_TEXT",
          "helpText": "",
          "required": false
        },
        {
          "index": 49,
          "title": "If no, about how much do you expect to contribute into your new SOLO401k from your business each year?\n\nEnter the amount in whole dollars e.g. 6000 for $6 000",
          "type": "PARAGRAPH_TEXT",
          "helpText": "",
          "required": true
        }
      ]
    },
    "4_Roth_Reclaimer": {
      "metadata": {
        "formId": "1B1VaZanAkzb6QB86knxk9eWhlNFpH-st65pdX__CvnE",
        "name": "Phase 2 - Roth IRA Reclaimer",
        "title": "Retirement Blueprint – Phase 2 – Roth Reclaimer Profile Deep Dive",
        "description": "This form captures detailed information to create your personalized Retirement Blueprint. Please answer all that apply.",
        "exportTimestamp": "2025-08-12T06:19:40.156Z"
      },
      "items": [
        {
          "index": 0,
          "title": "Full Name",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 1,
          "title": "Email",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 2,
          "title": "Student Identifier",
          "type": "TEXT",
          "helpText": "Last 4 digits of your cell phone + initials in CAPS, no spaces. e.g. 6123LY (If pre-filled please do not change)",
          "required": true
        },
        {
          "index": 3,
          "title": "Demographics & Investment Profile",
          "type": "SECTION_HEADER",
          "helpText": "These help us classify your profile and set growth assumptions.",
          "required": false
        },
        {
          "index": 4,
          "title": "Current Age",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 5,
          "title": "Target Retirement Age",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 6,
          "title": "Do you have children (or plan to support children’s education)?",
          "type": "MULTIPLE_CHOICE",
          "helpText": "",
          "required": true,
          "choices": [
            "Yes",
            "No"
          ]
        },
        {
          "index": 7,
          "title": "If Yes, years until you plan to use the funds.",
          "type": "TEXT",
          "helpText": "Leave blank if no children",
          "required": false
        },
        {
          "index": 8,
          "title": "Do you have an HSA or do you expect to be eligible for an HSA?",
          "type": "MULTIPLE_CHOICE",
          "helpText": "",
          "required": true,
          "choices": [
            "Yes",
            "No"
          ]
        },
        {
          "index": 9,
          "title": "Your Investment Profile",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us estimate the return rate for your self directed investments.",
          "required": false
        },
        {
          "index": 10,
          "title": "How involved do you want to be in managing your own investment decisions?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not involved",
          "rightLabel": "Highly involved"
        },
        {
          "index": 11,
          "title": "How much time do you plan to dedicate to investment research and management?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "As little as possible",
          "rightLabel": "A lot"
        },
        {
          "index": 12,
          "title": "How would you rate your confidence in investing as well as your knowledge or experience?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Beginner",
          "rightLabel": "Very experienced"
        },
        {
          "index": 13,
          "title": "Health (HSA) Urgency",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us determine the Urgency in growing an HSA account.",
          "required": false
        },
        {
          "index": 14,
          "title": "Current HSA balance",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 15,
          "title": "Current monthly HSA contribution",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 16,
          "title": "Years until you expect to need these funds",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 17,
          "title": "Target HSA balance",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 18,
          "title": "Education (CESA) Urgency",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us determine the urgency and scale of your combined education savings.",
          "required": false
        },
        {
          "index": 19,
          "title": "Current education savings balance",
          "type": "TEXT",
          "helpText": "Leave blank if not saving for Education",
          "required": false
        },
        {
          "index": 20,
          "title": "Current monthly education contribution",
          "type": "TEXT",
          "helpText": "Leave blank if not saving for Education",
          "required": false
        },
        {
          "index": 21,
          "title": "How many children or dependents are you saving for?",
          "type": "TEXT",
          "helpText": "Leave blank if not saving for Education\nEnter a whole number, e.g. 2",
          "required": true
        },
        {
          "index": 22,
          "title": "Total combined education savings goal",
          "type": "TEXT",
          "helpText": "Leave blank if not saving for Education\ne.g. $150,000 for all children",
          "required": true
        },
        {
          "index": 23,
          "title": "Years until the first child needs funds",
          "type": "TEXT",
          "helpText": "Leave blank if not saving for Education\nEnter years until your earliest education expense, e.g. 5",
          "required": true
        },
        {
          "index": 24,
          "title": "Retirement Urgency",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us determine the Urgency in growing your personal retirement accounts.",
          "required": false
        },
        {
          "index": 25,
          "title": "Current total retirement savings",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 26,
          "title": "Current monthly retirement contribution",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 27,
          "title": "Years until your target retirement age",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 28,
          "title": "Desired monthly retirement income (today’s dollars)",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 29,
          "title": "Ambition Quotient",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us understand the relative importance of each domain in your life today.",
          "required": false
        },
        {
          "index": 30,
          "title": "How important to you is saving for retirement at this point in your life?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not at all important",
          "rightLabel": "Absolutely essential"
        },
        {
          "index": 31,
          "title": "How much anxiety do you currently feel about your retirement outlook?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "No anxiety at all",
          "rightLabel": "Constant anxiety and concern"
        },
        {
          "index": 32,
          "title": "How motivated are you to take action toward your retirement goals?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not motivated at all",
          "rightLabel": "Extremely motivated"
        },
        {
          "index": 33,
          "title": "How important to you is saving for a child’s education (or the education of children you support) at this point in your life?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not at all important",
          "rightLabel": "Absolutely essential"
        },
        {
          "index": 34,
          "title": "How much anxiety do you currently feel about being able to fund your children’s future education?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "No anxiety at all",
          "rightLabel": "Constant anxiety and concern"
        },
        {
          "index": 35,
          "title": "How motivated are you to take action toward funding your children’s future education?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not motivated at all",
          "rightLabel": "Extremely motivated"
        },
        {
          "index": 36,
          "title": "How important to you is saving for future healthcare costs at this point in your life?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not at all important",
          "rightLabel": "Absolutely essential"
        },
        {
          "index": 37,
          "title": "How much anxiety do you currently feel about being able to afford healthcare expenses down the road?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "No anxiety at all",
          "rightLabel": "Constant anxiety and concern"
        },
        {
          "index": 38,
          "title": "How motivated are you to set aside money specifically for health-related expenses?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not motivated at all",
          "rightLabel": "Extremely motivated"
        },
        {
          "index": 39,
          "title": "Tie-Breaker Questions",
          "type": "SECTION_HEADER",
          "helpText": "These help us finalize your priorities. Please answer all three.",
          "required": false
        },
        {
          "index": 40,
          "title": "If you could only fully fund one area this year, which would you choose?*",
          "type": "LIST",
          "helpText": "",
          "required": true,
          "choices": [
            "Retirement",
            "Education",
            "Health"
          ]
        },
        {
          "index": 41,
          "title": "Which area would feel most painful to neglect or delay right now?*",
          "type": "LIST",
          "helpText": "",
          "required": true,
          "choices": [
            "Retirement",
            "Education",
            "Health"
          ]
        },
        {
          "index": 42,
          "title": "Rank these in order of importance",
          "type": "GRID",
          "helpText": "",
          "required": true,
          "rows": [
            "Retirement",
            "Education",
            "Health"
          ],
          "columns": [
            "1",
            "2",
            "3"
          ]
        },
        {
          "index": 43,
          "title": "Profile Deep Dive Questions",
          "type": "SECTION_HEADER",
          "helpText": "These help us to customize your Blueprint based on you specific situation.  If you do not know the answer to a question write \"I do not know.\"  or \"Please give me advie on this.\"",
          "required": false
        },
        {
          "index": 44,
          "title": "What is the current balance in your Traditional IRA or other old retirement account?",
          "type": "PARAGRAPH_TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 45,
          "title": "Have you ever made after-tax (non-deductible) contributions to an IRA?",
          "type": "PARAGRAPH_TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 46,
          "title": "Do you understand, or have you used the \"Backdoor Roth\" IRA strategy?",
          "type": "PARAGRAPH_TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 47,
          "title": "Would you like to move some, or all, of your Traditional IRA money into a Roth IRA?  If so, how much?",
          "type": "PARAGRAPH_TEXT",
          "helpText": "",
          "required": true
        }
      ]
    },
    "5_Bracket_Strategist": {
      "metadata": {
        "formId": "15clxf7SsHDxz05m5GetbCRToxb48eMrNk9Dpz4dVFO8",
        "name": "Phase 2 - Bracket-Balanced Strategist",
        "title": "Retirement Blueprint – Phase 2 – Bracket Balanced Strategist Profile Deep Dive",
        "description": "This form captures detailed information to create your personalized Retirement Blueprint. Please answer all that apply.",
        "exportTimestamp": "2025-08-12T06:19:57.093Z"
      },
      "items": [
        {
          "index": 0,
          "title": "Full Name",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 1,
          "title": "Email",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 2,
          "title": "Student Identifier",
          "type": "TEXT",
          "helpText": "Last 4 digits of your cell phone + initials in CAPS, no spaces. e.g. 6123LY (If pre-filled please do not change)",
          "required": true
        },
        {
          "index": 3,
          "title": "Demographics & Investment Profile",
          "type": "SECTION_HEADER",
          "helpText": "These help us classify your profile and set growth assumptions.",
          "required": false
        },
        {
          "index": 4,
          "title": "Current Age",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 5,
          "title": "Target Retirement Age",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 6,
          "title": "Do you have children (or plan to support children’s education)?",
          "type": "MULTIPLE_CHOICE",
          "helpText": "",
          "required": true,
          "choices": [
            "Yes",
            "No"
          ]
        },
        {
          "index": 7,
          "title": "If Yes, years until you plan to use the funds.",
          "type": "TEXT",
          "helpText": "Leave blank if no children",
          "required": false
        },
        {
          "index": 8,
          "title": "Do you have an HSA or do you expect to be eligible for an HSA?",
          "type": "MULTIPLE_CHOICE",
          "helpText": "",
          "required": true,
          "choices": [
            "Yes",
            "No"
          ]
        },
        {
          "index": 9,
          "title": "Your Investment Profile",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us estimate the return rate for your self directed investments.",
          "required": false
        },
        {
          "index": 10,
          "title": "How involved do you want to be in managing your own investment decisions?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not involved",
          "rightLabel": "Highly involved"
        },
        {
          "index": 11,
          "title": "How much time do you plan to dedicate to investment research and management?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "As little as possible",
          "rightLabel": "A lot"
        },
        {
          "index": 12,
          "title": "How would you rate your confidence in investing as well as your knowledge or experience?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Beginner",
          "rightLabel": "Very experienced"
        },
        {
          "index": 13,
          "title": "Health (HSA) Urgency",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us determine the Urgency in growing an HSA account.",
          "required": false
        },
        {
          "index": 14,
          "title": "Current HSA balance",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 15,
          "title": "Current monthly HSA contribution",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 16,
          "title": "Years until you expect to need these funds",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 17,
          "title": "Target HSA balance",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 18,
          "title": "Education (CESA) Urgency",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us determine the urgency and scale of your combined education savings.",
          "required": false
        },
        {
          "index": 19,
          "title": "Current education savings balance",
          "type": "TEXT",
          "helpText": "Leave blank if not saving for Education",
          "required": false
        },
        {
          "index": 20,
          "title": "Current monthly education contribution",
          "type": "TEXT",
          "helpText": "Leave blank if not saving for Education",
          "required": false
        },
        {
          "index": 21,
          "title": "How many children or dependents are you saving for?",
          "type": "TEXT",
          "helpText": "Leave blank if not saving for Education\nEnter a whole number, e.g. 2",
          "required": false
        },
        {
          "index": 22,
          "title": "Total combined education savings goal",
          "type": "TEXT",
          "helpText": "Leave blank if not saving for Education\ne.g. $150,000 for all children",
          "required": false
        },
        {
          "index": 23,
          "title": "Years until the first child needs funds",
          "type": "TEXT",
          "helpText": "Leave blank if not saving for Education\nEnter years until your earliest education expense, e.g. 5",
          "required": false
        },
        {
          "index": 24,
          "title": "Retirement Urgency",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us determine the Urgency in growing your personal retirement accounts.",
          "required": false
        },
        {
          "index": 25,
          "title": "Current total retirement savings",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 26,
          "title": "Current monthly retirement contribution",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 27,
          "title": "Years until your target retirement age",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 28,
          "title": "Desired monthly retirement income (today’s dollars)",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 29,
          "title": "Ambition Quotient",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us understand the relative importance of each domain in your life today.",
          "required": false
        },
        {
          "index": 30,
          "title": "How important to you is saving for retirement at this point in your life?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not at all important",
          "rightLabel": "Absolutely essential"
        },
        {
          "index": 31,
          "title": "How much anxiety do you currently feel about your retirement outlook?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "No anxiety at all",
          "rightLabel": "Constant anxiety and concern"
        },
        {
          "index": 32,
          "title": "How motivated are you to take action toward your retirement goals?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not motivated at all",
          "rightLabel": "Extremely motivated"
        },
        {
          "index": 33,
          "title": "How important to you is saving for a child’s education (or the education of children you support) at this point in your life?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not at all important",
          "rightLabel": "Absolutely essential"
        },
        {
          "index": 34,
          "title": "How much anxiety do you currently feel about being able to fund your children’s future education?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "No anxiety at all",
          "rightLabel": "Constant anxiety and concern"
        },
        {
          "index": 35,
          "title": "How motivated are you to take action toward funding your children’s future education?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not motivated at all",
          "rightLabel": "Extremely motivated"
        },
        {
          "index": 36,
          "title": "How important to you is saving for future healthcare costs at this point in your life?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not at all important",
          "rightLabel": "Absolutely essential"
        },
        {
          "index": 37,
          "title": "How much anxiety do you currently feel about being able to afford healthcare expenses down the road?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "No anxiety at all",
          "rightLabel": "Constant anxiety and concern"
        },
        {
          "index": 38,
          "title": "How motivated are you to set aside money specifically for health-related expenses?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not motivated at all",
          "rightLabel": "Extremely motivated"
        },
        {
          "index": 39,
          "title": "Tie-Breaker Questions",
          "type": "SECTION_HEADER",
          "helpText": "These help us finalize your priorities. Please answer all three.",
          "required": false
        },
        {
          "index": 40,
          "title": "If you could only fully fund one area this year, which would you choose?*",
          "type": "LIST",
          "helpText": "",
          "required": true,
          "choices": [
            "Retirement",
            "Education",
            "Health"
          ]
        },
        {
          "index": 41,
          "title": "Which area would feel most painful to neglect or delay right now?*",
          "type": "LIST",
          "helpText": "",
          "required": true,
          "choices": [
            "Retirement",
            "Education",
            "Health"
          ]
        },
        {
          "index": 42,
          "title": "Rank these in order of importance",
          "type": "GRID",
          "helpText": "",
          "required": true,
          "rows": [
            "Retirement",
            "Education",
            "Health"
          ],
          "columns": [
            "1",
            "2",
            "3"
          ]
        },
        {
          "index": 43,
          "title": "Profile Deep Dive Questions",
          "type": "SECTION_HEADER",
          "helpText": "These help us to customize your Blueprint based on you specific situation.  If you do not know the answer to a question write \"I do not know.\"  or \"Please give me advie on this.\"",
          "required": false
        },
        {
          "index": 44,
          "title": "Are you currently contributing to any tax-deferred accounts (Traditional IRA/401(k))?",
          "type": "PARAGRAPH_TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 45,
          "title": "If yes, approximately how much do you contribute per month? (USD)",
          "type": "PARAGRAPH_TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 46,
          "title": "In the next 5 years, do you expect your income to Increase / Decrease / Stay about the same?",
          "type": "PARAGRAPH_TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 47,
          "title": "Do you plan to convert any Traditional retirement money to a Roth IRA later?",
          "type": "PARAGRAPH_TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 48,
          "title": "Do you currently contribute anything to a Roth IRA?  If so, how much?",
          "type": "PARAGRAPH_TEXT",
          "helpText": "",
          "required": true
        }
      ]
    },
    "6_Catch_Up": {
      "metadata": {
        "formId": "1_GPFDAOkM0QQuJxWfTRNJjLfIW8IwRxwQrfiMvqgJK4",
        "name": "Phase 2 - Catch-Up Visionary",
        "title": "Retirement Blueprint – Phase 2 – Catch Up Visionary Profile Deep Dive",
        "description": "This form captures detailed information to create your personalized Retirement Blueprint. Please answer all that apply.",
        "exportTimestamp": "2025-08-12T06:20:09.145Z"
      },
      "items": [
        {
          "index": 0,
          "title": "Full Name",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 1,
          "title": "Email",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 2,
          "title": "Student Identifier",
          "type": "TEXT",
          "helpText": "Last 4 digits of your cell phone + initials in CAPS, no spaces. e.g. 6123LY (If pre-filled please do not change)",
          "required": true
        },
        {
          "index": 3,
          "title": "Demographics & Investment Profile",
          "type": "SECTION_HEADER",
          "helpText": "These help us classify your profile and set growth assumptions.",
          "required": false
        },
        {
          "index": 4,
          "title": "Current Age",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 5,
          "title": "Target Retirement Age",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 6,
          "title": "Do you have children (or plan to support children’s education)?",
          "type": "MULTIPLE_CHOICE",
          "helpText": "",
          "required": true,
          "choices": [
            "Yes",
            "No"
          ]
        },
        {
          "index": 7,
          "title": "If Yes, years until you plan to use the funds.",
          "type": "TEXT",
          "helpText": "Leave blank if no children",
          "required": false
        },
        {
          "index": 8,
          "title": "Do you have an HSA or do you expect to be eligible for an HSA?",
          "type": "MULTIPLE_CHOICE",
          "helpText": "",
          "required": true,
          "choices": [
            "Yes",
            "No"
          ]
        },
        {
          "index": 9,
          "title": "Your Investment Profile",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us estimate the return rate for your self directed investments.",
          "required": false
        },
        {
          "index": 10,
          "title": "How involved do you want to be in managing your own investment decisions?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not involved",
          "rightLabel": "Highly involved"
        },
        {
          "index": 11,
          "title": "How much time do you plan to dedicate to investment research and management?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "As little as possible",
          "rightLabel": "A lot"
        },
        {
          "index": 12,
          "title": "How would you rate your confidence in investing as well as your knowledge or experience?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Beginner",
          "rightLabel": "Very experienced"
        },
        {
          "index": 13,
          "title": "Health (HSA) Urgency",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us determine the Urgency in growing an HSA account.",
          "required": false
        },
        {
          "index": 14,
          "title": "Current HSA balance",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 15,
          "title": "Current monthly HSA contribution",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 16,
          "title": "Years until you expect to need these funds",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 17,
          "title": "Target HSA balance",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 18,
          "title": "Education (CESA) Urgency",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us determine the urgency and scale of your combined education savings.",
          "required": false
        },
        {
          "index": 19,
          "title": "Current education savings balance",
          "type": "TEXT",
          "helpText": "Leave blank if not saving for Education",
          "required": false
        },
        {
          "index": 20,
          "title": "Current monthly education contribution",
          "type": "TEXT",
          "helpText": "Leave blank if not saving for Education",
          "required": false
        },
        {
          "index": 21,
          "title": "How many children or dependents are you saving for?",
          "type": "TEXT",
          "helpText": "Leave blank if not saving for Education\nEnter a whole number, e.g. 2",
          "required": false
        },
        {
          "index": 22,
          "title": "Total combined education savings goal",
          "type": "TEXT",
          "helpText": "Leave blank if not saving for Education\ne.g. $150,000 for all children",
          "required": false
        },
        {
          "index": 23,
          "title": "Years until the first child needs funds",
          "type": "TEXT",
          "helpText": "Leave blank if not saving for Education\nEnter years until your earliest education expense, e.g. 5",
          "required": false
        },
        {
          "index": 24,
          "title": "Retirement Urgency",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us determine the Urgency in growing your personal retirement accounts.",
          "required": false
        },
        {
          "index": 25,
          "title": "Current total retirement savings",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 26,
          "title": "Current monthly retirement contribution",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 27,
          "title": "Years until your target retirement age",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 28,
          "title": "Desired monthly retirement income (today’s dollars)",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 29,
          "title": "Ambition Quotient",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us understand the relative importance of each domain in your life today.",
          "required": false
        },
        {
          "index": 30,
          "title": "How important to you is saving for retirement at this point in your life?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not at all important",
          "rightLabel": "Absolutely essential"
        },
        {
          "index": 31,
          "title": "How much anxiety do you currently feel about your retirement outlook?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "No anxiety at all",
          "rightLabel": "Constant anxiety and concern"
        },
        {
          "index": 32,
          "title": "How motivated are you to take action toward your retirement goals?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not motivated at all",
          "rightLabel": "Extremely motivated"
        },
        {
          "index": 33,
          "title": "How important to you is saving for a child’s education (or the education of children you support) at this point in your life?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not at all important",
          "rightLabel": "Absolutely essential"
        },
        {
          "index": 34,
          "title": "How much anxiety do you currently feel about being able to fund your children’s future education?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "No anxiety at all",
          "rightLabel": "Constant anxiety and concern"
        },
        {
          "index": 35,
          "title": "How motivated are you to take action toward funding your children’s future education?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not motivated at all",
          "rightLabel": "Extremely motivated"
        },
        {
          "index": 36,
          "title": "How important to you is saving for future healthcare costs at this point in your life?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not at all important",
          "rightLabel": "Absolutely essential"
        },
        {
          "index": 37,
          "title": "How much anxiety do you currently feel about being able to afford healthcare expenses down the road?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "No anxiety at all",
          "rightLabel": "Constant anxiety and concern"
        },
        {
          "index": 38,
          "title": "How motivated are you to set aside money specifically for health-related expenses?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not motivated at all",
          "rightLabel": "Extremely motivated"
        },
        {
          "index": 39,
          "title": "Tie-Breaker Questions",
          "type": "SECTION_HEADER",
          "helpText": "These help us finalize your priorities. Please answer all three.",
          "required": false
        },
        {
          "index": 40,
          "title": "If you could only fully fund one area this year, which would you choose?*",
          "type": "LIST",
          "helpText": "",
          "required": true,
          "choices": [
            "Retirement",
            "Education",
            "Health"
          ]
        },
        {
          "index": 41,
          "title": "Which area would feel most painful to neglect or delay right now?*",
          "type": "LIST",
          "helpText": "",
          "required": true,
          "choices": [
            "Retirement",
            "Education",
            "Health"
          ]
        },
        {
          "index": 42,
          "title": "Rank these in order of importance",
          "type": "GRID",
          "helpText": "",
          "required": true,
          "rows": [
            "Retirement",
            "Education",
            "Health"
          ],
          "columns": [
            "1",
            "2",
            "3"
          ]
        },
        {
          "index": 43,
          "title": "Profile Deep Dive Questions",
          "type": "SECTION_HEADER",
          "helpText": "These help us to customize your Blueprint based on you specific situation.  If you do not know the answer to a question write \"I do not know.\"  or \"Please give me advie on this.\"",
          "required": false
        },
        {
          "index": 44,
          "title": "How many years until you plan to retire?",
          "type": "PARAGRAPH_TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 45,
          "title": "Which retirement accounts do you have, and what are their balances (approximate)?",
          "type": "PARAGRAPH_TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 46,
          "title": "Because you’re age 50+, are you open to making “catch-up” contributions? If yes, how much extra per month?",
          "type": "PARAGRAPH_TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 47,
          "title": "What is your biggest financial concern right now?",
          "type": "PARAGRAPH_TEXT",
          "helpText": "",
          "required": true
        }
      ]
    },
    "7_Foundation_Builder": {
      "metadata": {
        "formId": "1zv6LiVaeW0D9NbsKkCMgo40zcYhzSDlIQq5Zw7IXhuw",
        "name": "Phase 2 - Foundation Builder",
        "title": "Retirement Blueprint – Phase 2 – Foundation Builder Profile Deep Dive",
        "description": "This form captures detailed information to create your personalized Retirement Blueprint. Please answer all that apply.",
        "exportTimestamp": "2025-08-12T06:20:21.144Z"
      },
      "items": [
        {
          "index": 0,
          "title": "Full Name",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 1,
          "title": "Email",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 2,
          "title": "Student Identifier",
          "type": "TEXT",
          "helpText": "Last 4 digits of your cell phone + initials in CAPS, no spaces. e.g. 6123LY (If pre-filled please do not change)",
          "required": true
        },
        {
          "index": 3,
          "title": "Demographics & Investment Profile",
          "type": "SECTION_HEADER",
          "helpText": "These help us classify your profile and set growth assumptions.",
          "required": false
        },
        {
          "index": 4,
          "title": "Current Age",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 5,
          "title": "Target Retirement Age",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 6,
          "title": "Do you have children (or plan to support children’s education)?",
          "type": "MULTIPLE_CHOICE",
          "helpText": "",
          "required": true,
          "choices": [
            "Yes",
            "No"
          ]
        },
        {
          "index": 7,
          "title": "If Yes, years until you plan to use the funds.",
          "type": "TEXT",
          "helpText": "Leave blank if no children",
          "required": false
        },
        {
          "index": 8,
          "title": "Do you have an HSA or do you expect to be eligible for an HSA?",
          "type": "MULTIPLE_CHOICE",
          "helpText": "",
          "required": true,
          "choices": [
            "Yes",
            "No"
          ]
        },
        {
          "index": 9,
          "title": "Your Investment Profile",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us estimate the return rate for your self directed investments.",
          "required": false
        },
        {
          "index": 10,
          "title": "How involved do you want to be in managing your own investment decisions?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not involved",
          "rightLabel": "Highly involved"
        },
        {
          "index": 11,
          "title": "How much time do you plan to dedicate to investment research and management?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "As little as possible",
          "rightLabel": "A lot"
        },
        {
          "index": 12,
          "title": "How would you rate your confidence in investing as well as your knowledge or experience?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Beginner",
          "rightLabel": "Very experienced"
        },
        {
          "index": 13,
          "title": "Health (HSA) Urgency",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us determine the Urgency in growing an HSA account.",
          "required": false
        },
        {
          "index": 14,
          "title": "Current HSA balance",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 15,
          "title": "Current monthly HSA contribution",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 16,
          "title": "Years until you expect to need these funds",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 17,
          "title": "Target HSA balance",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 18,
          "title": "Education (CESA) Urgency",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us determine the urgency and scale of your combined education savings.",
          "required": false
        },
        {
          "index": 19,
          "title": "Current education savings balance",
          "type": "TEXT",
          "helpText": "Leave blank if not saving for Education",
          "required": false
        },
        {
          "index": 20,
          "title": "Current monthly education contribution",
          "type": "TEXT",
          "helpText": "Leave blank if not saving for Education",
          "required": false
        },
        {
          "index": 21,
          "title": "How many children or dependents are you saving for?",
          "type": "TEXT",
          "helpText": "Leave blank if not saving for Education\nEnter a whole number, e.g. 2",
          "required": false
        },
        {
          "index": 22,
          "title": "Total combined education savings goal",
          "type": "TEXT",
          "helpText": "Leave blank if not saving for Education\ne.g. $150,000 for all children",
          "required": false
        },
        {
          "index": 23,
          "title": "Years until the first child needs funds",
          "type": "TEXT",
          "helpText": "Leave blank if not saving for Education\nEnter years until your earliest education expense, e.g. 5",
          "required": false
        },
        {
          "index": 24,
          "title": "Retirement Urgency",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us determine the Urgency in growing your personal retirement accounts.",
          "required": false
        },
        {
          "index": 25,
          "title": "Current total retirement savings",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 26,
          "title": "Current monthly retirement contribution",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 27,
          "title": "Years until your target retirement age",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 28,
          "title": "Desired monthly retirement income (today’s dollars)",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 29,
          "title": "Ambition Quotient",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us understand the relative importance of each domain in your life today.",
          "required": false
        },
        {
          "index": 30,
          "title": "How important to you is saving for retirement at this point in your life?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not at all important",
          "rightLabel": "Absolutely essential"
        },
        {
          "index": 31,
          "title": "How much anxiety do you currently feel about your retirement outlook?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "No anxiety at all",
          "rightLabel": "Constant anxiety and concern"
        },
        {
          "index": 32,
          "title": "How motivated are you to take action toward your retirement goals?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not motivated at all",
          "rightLabel": "Extremely motivated"
        },
        {
          "index": 33,
          "title": "How important to you is saving for a child’s education (or the education of children you support) at this point in your life?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not at all important",
          "rightLabel": "Absolutely essential"
        },
        {
          "index": 34,
          "title": "How much anxiety do you currently feel about being able to fund your children’s future education?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "No anxiety at all",
          "rightLabel": "Constant anxiety and concern"
        },
        {
          "index": 35,
          "title": "How motivated are you to take action toward funding your children’s future education?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not motivated at all",
          "rightLabel": "Extremely motivated"
        },
        {
          "index": 36,
          "title": "How important to you is saving for future healthcare costs at this point in your life?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not at all important",
          "rightLabel": "Absolutely essential"
        },
        {
          "index": 37,
          "title": "How much anxiety do you currently feel about being able to afford healthcare expenses down the road?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "No anxiety at all",
          "rightLabel": "Constant anxiety and concern"
        },
        {
          "index": 38,
          "title": "How motivated are you to set aside money specifically for health-related expenses?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not motivated at all",
          "rightLabel": "Extremely motivated"
        },
        {
          "index": 39,
          "title": "Tie-Breaker Questions",
          "type": "SECTION_HEADER",
          "helpText": "These help us finalize your priorities. Please answer all three.",
          "required": false
        },
        {
          "index": 40,
          "title": "If you could only fully fund one area this year, which would you choose?*",
          "type": "LIST",
          "helpText": "",
          "required": true,
          "choices": [
            "Retirement",
            "Education",
            "Health"
          ]
        },
        {
          "index": 41,
          "title": "Which area would feel most painful to neglect or delay right now?*",
          "type": "LIST",
          "helpText": "",
          "required": true,
          "choices": [
            "Retirement",
            "Education",
            "Health"
          ]
        },
        {
          "index": 42,
          "title": "Rank these in order of importance",
          "type": "GRID",
          "helpText": "",
          "required": true,
          "rows": [
            "Retirement",
            "Education",
            "Health"
          ],
          "columns": [
            "1",
            "2",
            "3"
          ]
        },
        {
          "index": 43,
          "title": "Profile Deep Dive Questions",
          "type": "SECTION_HEADER",
          "helpText": "These help us to customize your Blueprint based on you specific situation.  If you do not know the answer to a question write \"I do not know.\"  or \"Please give me advie on this.\"",
          "required": false
        },
        {
          "index": 44,
          "title": "Which of these retirement accounts do you already have? (None / Roth IRA / Traditional IRA / Employer 401(k))",
          "type": "PARAGRAPH_TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 45,
          "title": "Which account would you like to start first? (Roth IRA / Solo 401(k) / HSA / 529/ESA)",
          "type": "PARAGRAPH_TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 46,
          "title": "About how much could you save each month? (USD)",
          "type": "PARAGRAPH_TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 47,
          "title": "Would you like to include education savings (529/ESA) or health savings (HSA) now?",
          "type": "PARAGRAPH_TEXT",
          "helpText": "",
          "required": true
        }
      ]
    },
    "8_Biz_Owner_Group": {
      "metadata": {
        "formId": "1CXFEpBy4XA49CXA7R66lHAosEE5CzANH9Vl6B1opxYQ",
        "name": "Phase 2 - Business Owner with Employee Group",
        "title": "Issues Showing Love – Retirement Blueprint – Phase 2 – Business Owner with Employee Group Profile Deep Dive",
        "description": "This form captures detailed information to create your personalized Retirement Blueprint. Please answer all that apply.",
        "exportTimestamp": "2025-08-12T06:20:32.067Z"
      },
      "items": [
        {
          "index": 0,
          "title": "Full Name",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 1,
          "title": "Email",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 2,
          "title": "Student Identifier",
          "type": "TEXT",
          "helpText": "Last 4 digits of your cell phone + initials in CAPS, no spaces. e.g. 6123LY (If pre-filled please do not change)",
          "required": true
        },
        {
          "index": 3,
          "title": "Demographics & Investment Profile",
          "type": "SECTION_HEADER",
          "helpText": "These help us classify your profile and set growth assumptions.",
          "required": false
        },
        {
          "index": 4,
          "title": "Current Age",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 5,
          "title": "Target Retirement Age",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 6,
          "title": "Do you have children (or plan to support children’s education)?",
          "type": "MULTIPLE_CHOICE",
          "helpText": "",
          "required": true,
          "choices": [
            "Yes",
            "No"
          ]
        },
        {
          "index": 7,
          "title": "If Yes, years until you plan to use the funds.",
          "type": "TEXT",
          "helpText": "Leave blank if no children",
          "required": false
        },
        {
          "index": 8,
          "title": "Do you have an HSA or do you expect to be eligible for an HSA?",
          "type": "MULTIPLE_CHOICE",
          "helpText": "",
          "required": true,
          "choices": [
            "Yes",
            "No"
          ]
        },
        {
          "index": 9,
          "title": "Your Investment Profile",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us estimate the return rate for your self directed investments.",
          "required": false
        },
        {
          "index": 10,
          "title": "How involved do you want to be in managing your own investment decisions?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not involved",
          "rightLabel": "Highly involved"
        },
        {
          "index": 11,
          "title": "How much time do you plan to dedicate to investment research and management?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "As little as possible",
          "rightLabel": "A lot"
        },
        {
          "index": 12,
          "title": "How would you rate your confidence in investing as well as your knowledge or experience?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Beginner",
          "rightLabel": "Very experienced"
        },
        {
          "index": 13,
          "title": "Health (HSA) Urgency",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us determine the Urgency in growing an HSA account.",
          "required": false
        },
        {
          "index": 14,
          "title": "Current HSA balance",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 15,
          "title": "Current monthly HSA contribution",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 16,
          "title": "Years until you expect to need these funds",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 17,
          "title": "Target HSA balance",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 18,
          "title": "Education (CESA) Urgency",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us determine the urgency and scale of your combined education savings.",
          "required": false
        },
        {
          "index": 19,
          "title": "Current education savings balance",
          "type": "TEXT",
          "helpText": "Leave blank if not saving for Education",
          "required": false
        },
        {
          "index": 20,
          "title": "Current monthly education contribution",
          "type": "TEXT",
          "helpText": "Leave blank if not saving for Education",
          "required": false
        },
        {
          "index": 21,
          "title": "How many children or dependents are you saving for?",
          "type": "TEXT",
          "helpText": "Leave blank if not saving for Education\nEnter a whole number, e.g. 2",
          "required": false
        },
        {
          "index": 22,
          "title": "Total combined education savings goal",
          "type": "TEXT",
          "helpText": "Leave blank if not saving for Education\ne.g. $150,000 for all children",
          "required": false
        },
        {
          "index": 23,
          "title": "Years until the first child needs funds",
          "type": "TEXT",
          "helpText": "Leave blank if not saving for Education\nEnter years until your earliest education expense, e.g. 5",
          "required": false
        },
        {
          "index": 24,
          "title": "Retirement Urgency",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us determine the Urgency in growing your personal retirement accounts.",
          "required": false
        },
        {
          "index": 25,
          "title": "Current total retirement savings",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 26,
          "title": "Current monthly retirement contribution",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 27,
          "title": "Years until your target retirement age",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 28,
          "title": "Desired monthly retirement income (today’s dollars)",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 29,
          "title": "Ambition Quotient",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us understand the relative importance of each domain in your life today.",
          "required": false
        },
        {
          "index": 30,
          "title": "How important to you is saving for retirement at this point in your life?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not at all important",
          "rightLabel": "Absolutely essential"
        },
        {
          "index": 31,
          "title": "How much anxiety do you currently feel about your retirement outlook?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "No anxiety at all",
          "rightLabel": "Constant anxiety and concern"
        },
        {
          "index": 32,
          "title": "How motivated are you to take action toward your retirement goals?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not motivated at all",
          "rightLabel": "Extremely motivated"
        },
        {
          "index": 33,
          "title": "How important to you is saving for a child’s education (or the education of children you support) at this point in your life?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not at all important",
          "rightLabel": "Absolutely essential"
        },
        {
          "index": 34,
          "title": "How much anxiety do you currently feel about being able to fund your children’s future education?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "No anxiety at all",
          "rightLabel": "Constant anxiety and concern"
        },
        {
          "index": 35,
          "title": "How motivated are you to take action toward funding your children’s future education?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not motivated at all",
          "rightLabel": "Extremely motivated"
        },
        {
          "index": 36,
          "title": "How important to you is saving for future healthcare costs at this point in your life?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not at all important",
          "rightLabel": "Absolutely essential"
        },
        {
          "index": 37,
          "title": "How much anxiety do you currently feel about being able to afford healthcare expenses down the road?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "No anxiety at all",
          "rightLabel": "Constant anxiety and concern"
        },
        {
          "index": 38,
          "title": "How motivated are you to set aside money specifically for health-related expenses?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not motivated at all",
          "rightLabel": "Extremely motivated"
        },
        {
          "index": 39,
          "title": "Tie-Breaker Questions",
          "type": "SECTION_HEADER",
          "helpText": "These help us finalize your priorities. Please answer all three.",
          "required": false
        },
        {
          "index": 40,
          "title": "If you could only fully fund one area this year, which would you choose?*",
          "type": "LIST",
          "helpText": "",
          "required": true,
          "choices": [
            "Retirement",
            "Education",
            "Health"
          ]
        },
        {
          "index": 41,
          "title": "Which area would feel most painful to neglect or delay right now?*",
          "type": "LIST",
          "helpText": "",
          "required": true,
          "choices": [
            "Retirement",
            "Education",
            "Health"
          ]
        },
        {
          "index": 42,
          "title": "Rank these in order of importance",
          "type": "GRID",
          "helpText": "",
          "required": true,
          "rows": [
            "Retirement",
            "Education",
            "Health"
          ],
          "columns": [
            "1",
            "2",
            "3"
          ]
        },
        {
          "index": 43,
          "title": "Profile Deep Dive Questions",
          "type": "SECTION_HEADER",
          "helpText": "These help us to customize your Blueprint based on you specific situation.  If you do not know the answer to a question write \"I do not know.\"  or \"Please give me advie on this.\"",
          "required": false
        },
        {
          "index": 44,
          "title": "How many W-2 employees do you have (not including you or your spouse)?",
          "type": "PARAGRAPH_TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 45,
          "title": "Are your businesses linked together for benefits (controlled group)?",
          "type": "PARAGRAPH_TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 46,
          "title": "Which retirement plans do you offer or participate in? (401(k), Profit-Sharing, DB Pension, Other)",
          "type": "PARAGRAPH_TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 47,
          "title": "Are you interested in adding advanced plans? (Profit-Sharing / Defined Benefit / No)",
          "type": "PARAGRAPH_TEXT",
          "helpText": "",
          "required": true
        }
      ]
    },
    "9_Late_Stage_Growth": {
      "metadata": {
        "formId": "1kGGt6z6dovWvzHkSPfmeTg3E5-Lv3gT1hhlDOwUyiik",
        "name": "Phase 2 - Late-Stage Growth Strategist",
        "title": "Retirement Blueprint – Phase 2 – Late Stage Growth StrategistProfile Deep Dive",
        "description": "This form captures detailed information to create your personalized Retirement Blueprint. Please answer all that apply.",
        "exportTimestamp": "2025-08-12T06:20:44.455Z"
      },
      "items": [
        {
          "index": 0,
          "title": "Full Name",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 1,
          "title": "Email",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 2,
          "title": "Student Identifier",
          "type": "TEXT",
          "helpText": "Last 4 digits of your cell phone + initials in CAPS, no spaces. e.g. 6123LY (If pre-filled please do not change)",
          "required": true
        },
        {
          "index": 3,
          "title": "Demographics & Investment Profile",
          "type": "SECTION_HEADER",
          "helpText": "These help us classify your profile and set growth assumptions.",
          "required": false
        },
        {
          "index": 4,
          "title": "Current Age",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 5,
          "title": "Target Retirement Age",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 6,
          "title": "Do you have children (or plan to support children’s education)?",
          "type": "MULTIPLE_CHOICE",
          "helpText": "",
          "required": true,
          "choices": [
            "Yes",
            "No"
          ]
        },
        {
          "index": 7,
          "title": "If Yes, years until you plan to use the funds.",
          "type": "TEXT",
          "helpText": "Leave blank if no children",
          "required": false
        },
        {
          "index": 8,
          "title": "Do you have an HSA or do you expect to be eligible for an HSA?",
          "type": "MULTIPLE_CHOICE",
          "helpText": "",
          "required": true,
          "choices": [
            "Yes",
            "No"
          ]
        },
        {
          "index": 9,
          "title": "Your Investment Profile",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us estimate the return rate for your self directed investments.",
          "required": false
        },
        {
          "index": 10,
          "title": "How involved do you want to be in managing your own investment decisions?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not involved",
          "rightLabel": "Highly involved"
        },
        {
          "index": 11,
          "title": "How much time do you plan to dedicate to investment research and management?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "As little as possible",
          "rightLabel": "A lot"
        },
        {
          "index": 12,
          "title": "How would you rate your confidence in investing as well as your knowledge or experience?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Beginner",
          "rightLabel": "Very experienced"
        },
        {
          "index": 13,
          "title": "Health (HSA) Urgency",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us determine the Urgency in growing an HSA account.",
          "required": false
        },
        {
          "index": 14,
          "title": "Current HSA balance",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 15,
          "title": "Current monthly HSA contribution",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 16,
          "title": "Years until you expect to need these funds",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 17,
          "title": "Target HSA balance",
          "type": "TEXT",
          "helpText": "Leave blank if not eligible",
          "required": false
        },
        {
          "index": 18,
          "title": "Education (CESA) Urgency",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us determine the urgency and scale of your combined education savings.",
          "required": false
        },
        {
          "index": 19,
          "title": "Current education savings balance",
          "type": "TEXT",
          "helpText": "Leave blank if not saving for Education",
          "required": false
        },
        {
          "index": 20,
          "title": "Current monthly education contribution",
          "type": "TEXT",
          "helpText": "Leave blank if not saving for Education",
          "required": false
        },
        {
          "index": 21,
          "title": "How many children or dependents are you saving for?",
          "type": "TEXT",
          "helpText": "Leave blank if not saving for Education\nEnter a whole number, e.g. 2",
          "required": false
        },
        {
          "index": 22,
          "title": "Total combined education savings goal",
          "type": "TEXT",
          "helpText": "Leave blank if not saving for Education\ne.g. $150,000 for all children",
          "required": false
        },
        {
          "index": 23,
          "title": "Years until the first child needs funds",
          "type": "TEXT",
          "helpText": "Leave blank if not saving for Education\nEnter years until your earliest education expense, e.g. 5",
          "required": false
        },
        {
          "index": 24,
          "title": "Retirement Urgency",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us determine the Urgency in growing your personal retirement accounts.",
          "required": false
        },
        {
          "index": 25,
          "title": "Current total retirement savings",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 26,
          "title": "Current monthly retirement contribution",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 27,
          "title": "Years until your target retirement age",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 28,
          "title": "Desired monthly retirement income (today’s dollars)",
          "type": "TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 29,
          "title": "Ambition Quotient",
          "type": "SECTION_HEADER",
          "helpText": "These questions help us understand the relative importance of each domain in your life today.",
          "required": false
        },
        {
          "index": 30,
          "title": "How important to you is saving for retirement at this point in your life?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not at all important",
          "rightLabel": "Absolutely essential"
        },
        {
          "index": 31,
          "title": "How much anxiety do you currently feel about your retirement outlook?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "No anxiety at all",
          "rightLabel": "Constant anxiety and concern"
        },
        {
          "index": 32,
          "title": "How motivated are you to take action toward your retirement goals?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not motivated at all",
          "rightLabel": "Extremely motivated"
        },
        {
          "index": 33,
          "title": "How important to you is saving for a child’s education (or the education of children you support) at this point in your life?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not at all important",
          "rightLabel": "Absolutely essential"
        },
        {
          "index": 34,
          "title": "How much anxiety do you currently feel about being able to fund your children’s future education?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "No anxiety at all",
          "rightLabel": "Constant anxiety and concern"
        },
        {
          "index": 35,
          "title": "How motivated are you to take action toward funding your children’s future education?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not motivated at all",
          "rightLabel": "Extremely motivated"
        },
        {
          "index": 36,
          "title": "How important to you is saving for future healthcare costs at this point in your life?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not at all important",
          "rightLabel": "Absolutely essential"
        },
        {
          "index": 37,
          "title": "How much anxiety do you currently feel about being able to afford healthcare expenses down the road?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "No anxiety at all",
          "rightLabel": "Constant anxiety and concern"
        },
        {
          "index": 38,
          "title": "How motivated are you to set aside money specifically for health-related expenses?",
          "type": "SCALE",
          "helpText": "",
          "required": true,
          "lowerBound": 1,
          "upperBound": 7,
          "leftLabel": "Not motivated at all",
          "rightLabel": "Extremely motivated"
        },
        {
          "index": 39,
          "title": "Tie-Breaker Questions",
          "type": "SECTION_HEADER",
          "helpText": "These help us finalize your priorities. Please answer all three.",
          "required": false
        },
        {
          "index": 40,
          "title": "If you could only fully fund one area this year, which would you choose?*",
          "type": "LIST",
          "helpText": "",
          "required": true,
          "choices": [
            "Retirement",
            "Education",
            "Health"
          ]
        },
        {
          "index": 41,
          "title": "Which area would feel most painful to neglect or delay right now?*",
          "type": "LIST",
          "helpText": "",
          "required": true,
          "choices": [
            "Retirement",
            "Education",
            "Health"
          ]
        },
        {
          "index": 42,
          "title": "Rank these in order of importance",
          "type": "GRID",
          "helpText": "",
          "required": true,
          "rows": [
            "Retirement",
            "Education",
            "Health"
          ],
          "columns": [
            "1",
            "2",
            "3"
          ]
        },
        {
          "index": 43,
          "title": "Profile Deep Dive Questions",
          "type": "SECTION_HEADER",
          "helpText": "These help us to customize your Blueprint based on you specific situation.  If you do not know the answer to a question write \"I do not know.\"  or \"Please give me advie on this.\"",
          "required": false
        },
        {
          "index": 44,
          "title": "What is your total retirement savings balance today?",
          "type": "PARAGRAPH_TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 45,
          "title": "In how many years do you expect to start withdrawing from your funds?",
          "type": "PARAGRAPH_TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 46,
          "title": "Would you like to convert some retirement money to a Roth IRA before retirement?",
          "type": "PARAGRAPH_TEXT",
          "helpText": "",
          "required": true
        },
        {
          "index": 47,
          "title": "Are you interested in investing part of your retirement in real estate or private funds? If yes, what %?",
          "type": "PARAGRAPH_TEXT",
          "helpText": "",
          "required": true
        }
      ]
    }
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// GOOGLE FORMS MANAGEMENT FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Configuration for all forms in the system
 * Add Phase 1 form ID and any additional Phase 2 forms here
 */
const FORM_CONFIG = {
  // Phase 1 form
  PHASE_1: {
    formId: '1w4aPniYDM3oxiT-crPghmn9sYxYaw51sSexktoZJE8A',
    name: 'Phase 1 - Profile Classification',
    type: 'phase1'
  },
  
  // Phase 2 forms - using ACTUAL form IDs (not prefilled response IDs)
  '1_ROBS_In_Use': {
    formId: '1jv_rpG_i6O26BB0TcTtF_pxjYyvIXfA5qXTNPT8uzec',
    name: 'Phase 2 - ROBS-In-Use Strategist',
    type: 'phase2',
    profileId: '1_ROBS_In_Use'
  },
  '2_ROBS_Curious': {
    formId: '1XjpC0o75D4Lgu07hegkK1c5LD47TU6M78Kdywhj8Ao8',
    name: 'Phase 2 - ROBS-Curious Builder',
    type: 'phase2',
    profileId: '2_ROBS_Curious'
  },
  '3_Solo401k_Builder': {
    formId: '1ur5MAwKetidU52v1xQDZSMn5LjefpIQqGbngxLR8dOE',
    name: 'Phase 2 - Solo 401(k) Builder',
    type: 'phase2',
    profileId: '3_Solo401k_Builder'
  },
  '4_Roth_Reclaimer': {
    formId: '1B1VaZanAkzb6QB86knxk9eWhlNFpH-st65pdX__CvnE',
    name: 'Phase 2 - Roth IRA Reclaimer',
    type: 'phase2',
    profileId: '4_Roth_Reclaimer'
  },
  '5_Bracket_Strategist': {
    formId: '15clxf7SsHDxz05m5GetbCRToxb48eMrNk9Dpz4dVFO8',
    name: 'Phase 2 - Bracket-Balanced Strategist',
    type: 'phase2',
    profileId: '5_Bracket_Strategist'
  },
  '6_Catch_Up': {
    formId: '1_GPFDAOkM0QQuJxWfTRNJjLfIW8IwRxwQrfiMvqgJK4',
    name: 'Phase 2 - Catch-Up Visionary',
    type: 'phase2',
    profileId: '6_Catch_Up'
  },
  '7_Foundation_Builder': {
    formId: '1zv6LiVaeW0D9NbsKkCMgo40zcYhzSDlIQq5Zw7IXhuw',
    name: 'Phase 2 - Foundation Builder',
    type: 'phase2',
    profileId: '7_Foundation_Builder'
  },
  '8_Biz_Owner_Group': {
    formId: '1CXFEpBy4XA49CXA7R66lHAosEE5CzANH9Vl6B1opxYQ',
    name: 'Phase 2 - Business Owner with Employee Group',
    type: 'phase2',
    profileId: '8_Biz_Owner_Group'
  },
  '9_Late_Stage_Growth': {
    formId: '1kGGt6z6dovWvzHkSPfmeTg3E5-Lv3gT1hhlDOwUyiik',
    name: 'Phase 2 - Late-Stage Growth Strategist',
    type: 'phase2',
    profileId: '9_Late_Stage_Growth'
  }
};

/**
 * Export a single Google Form to JSON format
 * @param {string} formId - The Google Form ID
 * @param {string} formName - Descriptive name for the form
 * @returns {Object} JSON representation of the form structure
 */
function exportFormToJSON(formId, formName) {
  try {
    const form = FormApp.openById(formId);
    
    const formData = {
      metadata: {
        formId: formId,
        name: formName,
        title: form.getTitle(),
        description: form.getDescription(),
        exportTimestamp: new Date().toISOString()
      },
      items: []
    };
    
    const items = form.getItems();
    
    items.forEach((item, index) => {
      const itemData = {
        index: index,
        title: item.getTitle(),
        type: item.getType().toString(),
        helpText: item.getHelpText() || '',
        required: false
      };
      
      // Handle different item types
      switch (item.getType()) {
        case FormApp.ItemType.MULTIPLE_CHOICE:
          const mcItem = item.asMultipleChoiceItem();
          itemData.required = mcItem.isRequired();
          itemData.choices = mcItem.getChoices().map(choice => choice.getValue());
          break;
          
        case FormApp.ItemType.CHECKBOX:
          const cbItem = item.asCheckboxItem();
          itemData.required = cbItem.isRequired();
          itemData.choices = cbItem.getChoices().map(choice => choice.getValue());
          break;
          
        case FormApp.ItemType.TEXT:
          const textItem = item.asTextItem();
          itemData.required = textItem.isRequired();
          break;
          
        case FormApp.ItemType.PARAGRAPH_TEXT:
          const paraItem = item.asParagraphTextItem();
          itemData.required = paraItem.isRequired();
          break;
          
        case FormApp.ItemType.LIST:
          const listItem = item.asListItem();
          itemData.required = listItem.isRequired();
          itemData.choices = listItem.getChoices().map(choice => choice.getValue());
          break;
          
        case FormApp.ItemType.SCALE:
          const scaleItem = item.asScaleItem();
          itemData.required = scaleItem.isRequired();
          itemData.lowerBound = scaleItem.getLowerBound();
          itemData.upperBound = scaleItem.getUpperBound();
          itemData.leftLabel = scaleItem.getLeftLabel();
          itemData.rightLabel = scaleItem.getRightLabel();
          break;
          
        case FormApp.ItemType.GRID:
          const gridItem = item.asGridItem();
          itemData.required = gridItem.isRequired();
          itemData.rows = gridItem.getRows();
          itemData.columns = gridItem.getColumns();
          break;
          
        case FormApp.ItemType.SECTION_HEADER:
          // Section headers don't have required property
          break;
          
        default:
          Logger.log(`Unknown item type: ${item.getType()}`);
      }
      
      formData.items.push(itemData);
    });
    
    return formData;
    
  } catch (error) {
    Logger.log(`Error exporting form ${formId}: ${error.message}`);
    return {
      error: error.message,
      formId: formId,
      name: formName
    };
  }
}

/**
 * Update the embedded form data in this file
 * Exports all forms and replaces the CURRENT_FORMS section
 */
function updateEmbeddedFormData() {
  Logger.log('🔄 Starting embedded form data update...');
  
  const exportedData = {
    lastExported: new Date().toISOString(),
    exportedBy: 'updateEmbeddedFormData()',
    formsData: {}
  };
  
  let successCount = 0;
  let errorCount = 0;
  
  // Export all forms
  Object.entries(FORM_CONFIG).forEach(([configKey, formConfig]) => {
    if (!formConfig.formId) {
      Logger.log(`⚠️ Skipping ${configKey} - no form ID provided`);
      exportedData.formsData[configKey] = null;
      return;
    }
    
    Logger.log(`📋 Exporting ${configKey}...`);
    const formData = exportFormToJSON(formConfig.formId, formConfig.name);
    
    if (formData.error) {
      Logger.log(`❌ Failed to export ${configKey}: ${formData.error}`);
      exportedData.formsData[configKey] = { error: formData.error };
      errorCount++;
    } else {
      exportedData.formsData[configKey] = formData;
      successCount++;
      Logger.log(`✅ ${configKey}: ${formData.items.length} questions`);
    }
  });
  
  // Save the data to a temporary file instead of logging
  try {
    const fileName = `CURRENT_FORMS_${new Date().toISOString().slice(0,10)}.js`;
    const fileContent = `// Generated on ${new Date().toISOString()}
// Copy this entire content and replace the CURRENT_FORMS section in Code.js

const CURRENT_FORMS = ${JSON.stringify(exportedData, null, 2)};`;
    
    // Save to Google Drive
    const blob = Utilities.newBlob(fileContent, 'text/plain', fileName);
    const file = DriveApp.createFile(blob);
    
    Logger.log(`\n🎯 EXPORT COMPLETE:`);
    Logger.log(`✅ Success: ${successCount} forms`);
    Logger.log(`❌ Errors: ${errorCount} forms`);
    Logger.log(`\n📁 FORM DATA SAVED TO GOOGLE DRIVE:`);
    Logger.log(`File: ${fileName}`);
    Logger.log(`File ID: ${file.getId()}`);
    Logger.log(`\n📝 NEXT STEPS:`);
    Logger.log(`1. Open the file in Google Drive: ${fileName}`);
    Logger.log(`2. Copy the entire CURRENT_FORMS content from that file`);
    Logger.log(`3. Replace the CURRENT_FORMS section in your local Code.js`);
    Logger.log(`4. Use clasp push to deploy the updated code`);
    Logger.log(`\n🔗 Direct link: https://drive.google.com/file/d/${file.getId()}`);
    
  } catch (error) {
    Logger.log(`❌ Error saving to Drive: ${error.message}`);
    Logger.log(`\n⚠️ FALLBACK - SUMMARY ONLY:`);
    Logger.log(`Data is too large for logging. Use individual form analysis instead.`);
    Logger.log(`Run showFormComparison('1_ROBS_In_Use') for detailed form view.`);
  }
  
  return {
    success: errorCount === 0,
    exported: successCount,
    errors: errorCount,
    data: exportedData
  };
}

/**
 * Analyze current forms vs ideal templates
 * Requires CURRENT_FORMS to be populated with actual data
 */
function analyzeFormGaps() {
  if (!CURRENT_FORMS.lastExported) {
    Logger.log('❌ No current form data available. Run updateEmbeddedFormData() first.');
    return;
  }
  
  Logger.log(`\n🔍 FORM GAP ANALYSIS`);
  Logger.log(`Data from: ${CURRENT_FORMS.lastExported}`);
  Logger.log('='.repeat(60));
  
  const analysis = {
    timestamp: new Date().toISOString(),
    universalGaps: [],
    profileGaps: {},
    recommendations: []
  };
  
  // Analyze each Phase 2 form
  Object.keys(PROFILE_CONFIG).forEach(profileId => {
    const currentForm = CURRENT_FORMS.formsData[profileId];
    if (!currentForm || currentForm.error) {
      Logger.log(`❌ ${profileId}: No data available`);
      return;
    }
    
    Logger.log(`\n📋 ${profileId}:`);
    Logger.log(`Current: ${currentForm.items.length} questions`);
    
    // Generate ideal template for comparison
    const idealTemplate = generateFormTemplate(profileId);
    Logger.log(`Ideal: ${idealTemplate.questions.length} questions`);
    
    // Find missing universal questions
    const currentTitles = currentForm.items.map(item => item.title.toLowerCase());
    const missingUniversal = [];
    
    UNIVERSAL_QUESTIONS.forEach(q => {
      if (q.type !== 'SECTION_HEADER') {
        const found = currentTitles.some(title => 
          title.includes(q.title.toLowerCase().substring(0, 10))
        );
        if (!found) {
          missingUniversal.push(q.title);
        }
      }
    });
    
    if (missingUniversal.length > 0) {
      Logger.log(`❌ Missing universal: ${missingUniversal.join(', ')}`);
      analysis.profileGaps[profileId] = { missingUniversal };
    } else {
      Logger.log(`✅ Has all universal questions`);
    }
    
    // Check profile-specific questions
    const profileConfig = PROFILE_CONFIG[profileId];
    const expectedExtra = profileConfig.extraQuestions ? profileConfig.extraQuestions.length : 0;
    const currentExtra = currentForm.items.filter(item => 
      item.title.toLowerCase().includes('describe') || 
      item.title.toLowerCase().includes('what') ||
      item.title.toLowerCase().includes('how')
    ).length;
    
    Logger.log(`📝 Profile questions: ${currentExtra}/${expectedExtra} expected`);
  });
  
  Logger.log(`\n💡 NEXT STEPS:`);
  Logger.log(`1. Review missing universal questions`);
  Logger.log(`2. Optimize UNIVERSAL_QUESTIONS template`);
  Logger.log(`3. Review profile-specific extra questions`);
  Logger.log(`4. Run syncAllFormsToTemplates() to apply changes`);
  
  return analysis;
}

/**
 * Show detailed comparison for a specific form
 */
function showFormComparison(profileId) {
  const currentForm = CURRENT_FORMS.formsData[profileId];
  if (!currentForm || currentForm.error) {
    Logger.log(`❌ No data for ${profileId}`);
    return;
  }
  
  const idealTemplate = generateFormTemplate(profileId);
  
  Logger.log(`\n📊 DETAILED COMPARISON: ${profileId}`);
  Logger.log('='.repeat(50));
  Logger.log(`Current Form: "${currentForm.metadata.title}"`);
  Logger.log(`Ideal Template: "${idealTemplate.title}"`);
  Logger.log(`\n📋 CURRENT QUESTIONS (${currentForm.items.length}):`);
  
  currentForm.items.forEach((item, i) => {
    Logger.log(`${i+1}. [${item.type}] ${item.title}`);
    if (item.required) Logger.log(`   → Required: ${item.required}`);
    if (item.choices) Logger.log(`   → Choices: ${item.choices.slice(0,3).join(', ')}${item.choices.length > 3 ? '...' : ''}`);
  });
  
  Logger.log(`\n🎯 IDEAL QUESTIONS (${idealTemplate.questions.length}):`);
  idealTemplate.questions.forEach((item, i) => {
    Logger.log(`${i+1}. [${item.type}] ${item.title}`);
    if (item.headerMapping) Logger.log(`   → Maps to: ${item.headerMapping}`);
  });
}

/**
 * Export all forms to JSON and save as JavaScript files in our codebase
 * Creates individual .js files that can be committed to git
 * @deprecated Use updateEmbeddedFormData() instead for embedded approach
 */
function exportAllFormsToJSON() {
  const results = [];
  const allFormsData = {};
  
  Object.entries(FORM_CONFIG).forEach(([configKey, formConfig]) => {
    if (!formConfig.formId) {
      Logger.log(`Skipping ${configKey} - no form ID provided`);
      return;
    }
    
    Logger.log(`Exporting ${formConfig.name}...`);
    const formData = exportFormToJSON(formConfig.formId, formConfig.name);
    
    if (formData.error) {
      Logger.log(`Failed to export ${formConfig.name}: ${formData.error}`);
      results.push({
        configKey,
        formConfig,
        status: 'error',
        error: formData.error
      });
      return;
    }
    
    // Store in combined data structure
    allFormsData[configKey] = formData;
    
    results.push({
      configKey,
      formConfig,
      status: 'success',
      questionCount: formData.items.length
    });
    
    Logger.log(`✓ ${configKey}: ${formData.items.length} questions exported`);
  });
  
  // Create JavaScript file content that can be added to our codebase
  const jsFileContent = `// ═══════════════════════════════════════════════════════════════════════════════
// EXPORTED FORM STRUCTURES - Generated on ${new Date().toISOString()}
// ═══════════════════════════════════════════════════════════════════════════════
// This file contains the current structure of all Google Forms
// Use this data to analyze differences vs ideal templates

const EXPORTED_FORMS = ${JSON.stringify(allFormsData, null, 2)};

// Analysis helper functions
function analyzeFormStructure(formKey) {
  const form = EXPORTED_FORMS[formKey];
  if (!form) {
    console.log(\`Form \${formKey} not found\`);
    return;
  }
  
  console.log(\`\\n=== \${formKey} ANALYSIS ===\`);
  console.log(\`Title: \${form.metadata.title}\`);
  console.log(\`Questions: \${form.items.length}\`);
  console.log(\`\\nQuestion List:\`);
  
  form.items.forEach((item, index) => {
    console.log(\`\${index + 1}. [\${item.type}] \${item.title}\`);
    if (item.required) console.log(\`   → Required: \${item.required}\`);
    if (item.choices) console.log(\`   → Choices: \${item.choices.join(', ')}\`);
  });
}

function compareAllFormsToTemplates() {
  console.log('\\n=== FORM COMPARISON ANALYSIS ===');
  Object.keys(EXPORTED_FORMS).forEach(formKey => {
    if (formKey !== 'PHASE_1') {
      console.log(\`\\n--- \${formKey} ---\`);
      analyzeFormStructure(formKey);
    }
  });
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EXPORTED_FORMS, analyzeFormStructure, compareAllFormsToTemplates };
}`;

  // Log the JavaScript content (which can be copied to a new file)
  Logger.log('\n=== JAVASCRIPT FILE CONTENT ===');
  Logger.log('Copy the content below to create: "Form_Exports.js"');
  Logger.log('=' * 80);
  Logger.log(jsFileContent);
  Logger.log('=' * 80);
  
  // Print summary
  Logger.log('\n=== EXPORT SUMMARY ===');
  results.forEach(result => {
    if (result.status === 'success') {
      Logger.log(`✓ ${result.configKey}: ${result.questionCount} questions`);
    } else {
      Logger.log(`✗ ${result.configKey}: ${result.error}`);
    }
  });
  
  Logger.log(`\n📋 Next Steps:`);
  Logger.log(`1. Copy the JavaScript content above`);
  Logger.log(`2. Create new file: "Form_Exports.js" in your project`);
  Logger.log(`3. Use analyzeFormStructure('1_ROBS_In_Use') to analyze specific forms`);
  Logger.log(`4. Use compareAllFormsToTemplates() for full analysis`);
  
  return results;
}

/**
 * Test function to export a single form
 * Use this to test the export functionality
 */
function testExportSingleForm() {
  // Test with the first available form from FORM_CONFIG (not PROFILE_CONFIG)
  const firstProfileKey = Object.keys(FORM_CONFIG).find(key => key !== 'PHASE_1');
  const formConfig = FORM_CONFIG[firstProfileKey];
  
  if (formConfig && formConfig.formId) {
    Logger.log(`Testing export of ${firstProfileKey}...`);
    Logger.log(`Using form ID: ${formConfig.formId}`);
    const result = exportFormToJSON(formConfig.formId, formConfig.name);
    Logger.log(JSON.stringify(result, null, 2));
  } else {
    Logger.log('No form ID available for testing');
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// GOOGLE FORMS UPDATE/MODIFICATION FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Clear all items from a Google Form (except title/description)
 * @param {string} formId - The Google Form ID
 * @returns {boolean} Success status
 */
function clearFormItems(formId) {
  try {
    const form = FormApp.openById(formId);
    const items = form.getItems();
    
    // Delete all items in reverse order to avoid index issues
    for (let i = items.length - 1; i >= 0; i--) {
      form.deleteItem(items[i]);
    }
    
    Logger.log(`Cleared ${items.length} items from form ${formId}`);
    return true;
  } catch (error) {
    Logger.log(`Error clearing form ${formId}: ${error.message}`);
    return false;
  }
}

/**
 * Add a question to a Google Form based on question definition
 * @param {Form} form - The Google Form object
 * @param {Object} questionDef - Question definition object
 * @returns {Item} The created form item
 */
function addQuestionToForm(form, questionDef) {
  let item;
  
  switch (questionDef.type) {
    case 'SECTION_HEADER':
      item = form.addSectionHeaderItem();
      item.setTitle(questionDef.title);
      if (questionDef.helpText) {
        item.setHelpText(questionDef.helpText);
      }
      break;
      
    case 'TEXT':
      item = form.addTextItem();
      item.setTitle(questionDef.title);
      if (questionDef.helpText) {
        item.setHelpText(questionDef.helpText);
      }
      if (questionDef.required) {
        item.setRequired(questionDef.required);
      }
      break;
      
    case 'PARAGRAPH_TEXT':
      item = form.addParagraphTextItem();
      item.setTitle(questionDef.title);
      if (questionDef.helpText) {
        item.setHelpText(questionDef.helpText);
      }
      if (questionDef.required) {
        item.setRequired(questionDef.required);
      }
      break;
      
    case 'MULTIPLE_CHOICE':
      item = form.addMultipleChoiceItem();
      item.setTitle(questionDef.title);
      if (questionDef.helpText) {
        item.setHelpText(questionDef.helpText);
      }
      if (questionDef.choices && questionDef.choices.length > 0) {
        item.setChoices(questionDef.choices.map(choice => 
          item.createChoice(choice)
        ));
      }
      if (questionDef.required) {
        item.setRequired(questionDef.required);
      }
      break;
      
    case 'CHECKBOX':
      item = form.addCheckboxItem();
      item.setTitle(questionDef.title);
      if (questionDef.helpText) {
        item.setHelpText(questionDef.helpText);
      }
      if (questionDef.choices && questionDef.choices.length > 0) {
        item.setChoices(questionDef.choices.map(choice => 
          item.createChoice(choice)
        ));
      }
      if (questionDef.required) {
        item.setRequired(questionDef.required);
      }
      break;
      
    case 'LIST':
      item = form.addListItem();
      item.setTitle(questionDef.title);
      if (questionDef.helpText) {
        item.setHelpText(questionDef.helpText);
      }
      if (questionDef.choices && questionDef.choices.length > 0) {
        item.setChoices(questionDef.choices.map(choice => 
          item.createChoice(choice)
        ));
      }
      if (questionDef.required) {
        item.setRequired(questionDef.required);
      }
      break;
      
    case 'SCALE':
      item = form.addScaleItem();
      item.setTitle(questionDef.title);
      if (questionDef.helpText) {
        item.setHelpText(questionDef.helpText);
      }
      if (questionDef.lowerBound !== undefined && questionDef.upperBound !== undefined) {
        item.setBounds(questionDef.lowerBound, questionDef.upperBound);
      }
      if (questionDef.leftLabel) {
        item.setLeftLabel(questionDef.leftLabel);
      }
      if (questionDef.rightLabel) {
        item.setRightLabel(questionDef.rightLabel);
      }
      if (questionDef.required) {
        item.setRequired(questionDef.required);
      }
      break;
      
    case 'GRID':
      item = form.addGridItem();
      item.setTitle(questionDef.title);
      if (questionDef.helpText) {
        item.setHelpText(questionDef.helpText);
      }
      if (questionDef.rows && questionDef.rows.length > 0) {
        item.setRows(questionDef.rows);
      }
      if (questionDef.columns && questionDef.columns.length > 0) {
        item.setColumns(questionDef.columns);
      }
      if (questionDef.required) {
        item.setRequired(questionDef.required);
      }
      break;
      
    default:
      Logger.log(`Unknown question type: ${questionDef.type}`);
      return null;
  }
  
  return item;
}

/**
 * Update a Google Form with a new structure
 * @param {string} formId - The Google Form ID
 * @param {Object} formStructure - New form structure definition
 * @returns {Object} Update result with status and details
 */
function updateFormStructure(formId, formStructure) {
  try {
    const form = FormApp.openById(formId);
    
    // Update form metadata
    if (formStructure.title) {
      form.setTitle(formStructure.title);
    }
    if (formStructure.description) {
      form.setDescription(formStructure.description);
    }
    
    // Clear existing items
    const clearSuccess = clearFormItems(formId);
    if (!clearSuccess) {
      return {
        success: false,
        error: 'Failed to clear existing form items'
      };
    }
    
    // Add new items
    const addedItems = [];
    if (formStructure.questions && formStructure.questions.length > 0) {
      formStructure.questions.forEach((questionDef, index) => {
        try {
          const item = addQuestionToForm(form, questionDef);
          if (item) {
            addedItems.push({
              index: index,
              title: questionDef.title,
              type: questionDef.type,
              success: true
            });
          } else {
            addedItems.push({
              index: index,
              title: questionDef.title,
              type: questionDef.type,
              success: false,
              error: 'Failed to create item'
            });
          }
        } catch (error) {
          addedItems.push({
            index: index,
            title: questionDef.title || 'Unknown',
            type: questionDef.type || 'Unknown',
            success: false,
            error: error.message
          });
        }
      });
    }
    
    const successCount = addedItems.filter(item => item.success).length;
    const errorCount = addedItems.filter(item => !item.success).length;
    
    Logger.log(`Form ${formId} updated: ${successCount} items added, ${errorCount} errors`);
    
    return {
      success: errorCount === 0,
      formId: formId,
      itemsAdded: successCount,
      errors: errorCount,
      details: addedItems
    };
    
  } catch (error) {
    Logger.log(`Error updating form ${formId}: ${error.message}`);
    return {
      success: false,
      formId: formId,
      error: error.message
    };
  }
}

/**
 * Batch update multiple forms
 * @param {Object} formUpdates - Map of formId to formStructure
 * @returns {Array} Array of update results
 */
function batchUpdateForms(formUpdates) {
  const results = [];
  
  Object.entries(formUpdates).forEach(([formId, formStructure]) => {
    Logger.log(`Updating form ${formId}...`);
    const result = updateFormStructure(formId, formStructure);
    results.push(result);
  });
  
  // Print summary
  Logger.log('\n=== BATCH UPDATE SUMMARY ===');
  results.forEach(result => {
    if (result.success) {
      Logger.log(`✓ ${result.formId}: ${result.itemsAdded} items added`);
    } else {
      Logger.log(`✗ ${result.formId}: ${result.error}`);
    }
  });
  
  return results;
}

/**
 * Test function to update a single form
 * Use this to test the update functionality
 */
function testUpdateSingleForm() {
  // Test with the first available form (BE CAREFUL - this will modify the actual form!)
  const firstProfile = Object.keys(PROFILE_CONFIG)[0];
  const formConfig = PROFILE_CONFIG[firstProfile];
  
  if (formConfig.formId) {
    Logger.log(`WARNING: This will modify the actual form ${firstProfile}!`);
    Logger.log('Uncomment the next line to proceed with test update');
    // Uncomment the next lines to test:
    // const testTemplate = generateFormTemplate('2_ROBS_Curious');
    // const result = updateFormStructure(formConfig.formId, testTemplate);
    // Logger.log(JSON.stringify(result, null, 2));
  } else {
    Logger.log('No form ID available for testing');
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// FORM TEMPLATE SYSTEM - DEFINE IDEAL FORM STRUCTURES
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Universal questions that appear in every Phase 2 form
 * These map to the P2_* HEADERS and collect standard data for all profiles
 */
const UNIVERSAL_QUESTIONS = [
  // Personal Information Section
  {
    type: 'SECTION_HEADER',
    title: 'Personal Information',
    helpText: 'Basic information to help us customize your recommendations'
  },
  {
    type: 'TEXT',
    title: 'Full Name',
    helpText: 'Please enter your full name as it appears on your financial accounts',
    required: true,
    headerMapping: 'P2_FULL_NAME'
  },
  {
    type: 'TEXT',
    title: 'Email Address',
    helpText: 'We\'ll use this to send your personalized recommendations',
    required: true,
    headerMapping: 'P2_EMAIL'
  },
  {
    type: 'TEXT',
    title: 'Student Identifier',
    helpText: 'Your unique student identifier (last 4 digits)',
    required: true,
    headerMapping: 'P2_STUDENT_IDENTIFIER'
  },
  {
    type: 'TEXT',
    title: 'Current Age',
    helpText: 'Your current age in years',
    required: true,
    headerMapping: 'P2_CURRENT_AGE'
  },
  {
    type: 'TEXT',
    title: 'Target Retirement Age',
    helpText: 'At what age do you plan to retire?',
    required: true,
    headerMapping: 'P2_TARGET_RETIREMENT_AGE'
  },

  // Investment Profile Section
  {
    type: 'SECTION_HEADER',
    title: 'Investment Profile',
    helpText: 'Help us understand your investment approach and risk tolerance'
  },
  {
    type: 'SCALE',
    title: 'Investment Involvement',
    helpText: 'How involved do you want to be in managing your investments? (1=Hands-off, 7=Very hands-on)',
    lowerBound: 1,
    upperBound: 7,
    leftLabel: 'Hands-off',
    rightLabel: 'Very hands-on',
    required: true,
    headerMapping: 'P2_INV_INVOLVEMENT'
  },
  {
    type: 'SCALE',
    title: 'Time for Investment Research',
    helpText: 'How much time can you dedicate to investment research? (1=No time, 7=Lots of time)',
    lowerBound: 1,
    upperBound: 7,
    leftLabel: 'No time',
    rightLabel: 'Lots of time',
    required: true,
    headerMapping: 'P2_INV_TIME'
  },
  {
    type: 'SCALE',
    title: 'Investment Confidence',
    helpText: 'How confident are you in making investment decisions? (1=Not confident, 7=Very confident)',
    lowerBound: 1,
    upperBound: 7,
    leftLabel: 'Not confident',
    rightLabel: 'Very confident',
    required: true,
    headerMapping: 'P2_INV_CONFIDENCE'
  },

  // Health Savings Account Section
  {
    type: 'SECTION_HEADER',
    title: 'Health Savings Account (HSA)',
    helpText: 'Information about your HSA eligibility and goals'
  },
  {
    type: 'MULTIPLE_CHOICE',
    title: 'HSA Eligibility',
    helpText: 'Are you currently eligible for an HSA (High Deductible Health Plan)?',
    choices: ['Yes', 'No', 'Not sure'],
    required: true,
    headerMapping: 'P2_HSA_ELIGIBILITY'
  },
  {
    type: 'TEXT',
    title: 'Current HSA Balance',
    helpText: 'What is your current HSA balance? (Enter 0 if none)',
    required: false,
    headerMapping: 'P2_HSA_CURRENT_BALANCE'
  },
  {
    type: 'TEXT',
    title: 'Current Monthly HSA Contribution',
    helpText: 'How much do you currently contribute to your HSA per month? (Enter 0 if none)',
    required: false,
    headerMapping: 'P2_HSA_MONTHLY_CONTRIB'
  },
  {
    type: 'TEXT',
    title: 'Years Until HSA Need',
    helpText: 'In how many years do you expect to start using your HSA for medical expenses?',
    required: false,
    headerMapping: 'P2_HSA_YEARS_UNTIL_NEED'
  },
  {
    type: 'TEXT',
    title: 'HSA Target Balance',
    helpText: 'What HSA balance would you like to have at retirement?',
    required: false,
    headerMapping: 'P2_HSA_TARGET_BALANCE'
  },

  // Education Savings Section
  {
    type: 'SECTION_HEADER',
    title: 'Education Savings (CESA)',
    helpText: 'Information about education savings for children'
  },
  {
    type: 'MULTIPLE_CHOICE',
    title: 'Children or Planning for Children',
    helpText: 'Do you have children or plan to have children whose education you want to fund?',
    choices: ['Yes', 'No'],
    required: true,
    headerMapping: 'P2_HAS_CHILDREN'
  },
  {
    type: 'TEXT',
    title: 'Number of Children',
    helpText: 'How many children do you have or plan to have? (Enter 0 if none)',
    required: false,
    headerMapping: 'P2_CESA_NUM_CHILDREN'
  },
  {
    type: 'TEXT',
    title: 'Current CESA Balance',
    helpText: 'What is your current Coverdell ESA balance? (Enter 0 if none)',
    required: false,
    headerMapping: 'P2_CESA_CURRENT_BALANCE'
  },
  {
    type: 'TEXT',
    title: 'Current Monthly CESA Contribution',
    helpText: 'How much do you currently contribute to CESA per month? (Enter 0 if none)',
    required: false,
    headerMapping: 'P2_CESA_MONTHLY_CONTRIB'
  },
  {
    type: 'TEXT',
    title: 'Total Education Goal',
    helpText: 'What is your total education savings goal across all children?',
    required: false,
    headerMapping: 'P2_CESA_TOTAL_GOAL'
  },
  {
    type: 'TEXT',
    title: 'Years Until First Education Need',
    helpText: 'In how many years will you need to start using education funds?',
    required: false,
    headerMapping: 'P2_CESA_YEARS_UNTIL_FIRST'
  },

  // Retirement Savings Section
  {
    type: 'SECTION_HEADER',
    title: 'Retirement Savings',
    helpText: 'Information about your retirement planning and current savings'
  },
  {
    type: 'TEXT',
    title: 'Current Retirement Balance',
    helpText: 'What is your current total retirement account balance? (Enter 0 if none)',
    required: false,
    headerMapping: 'P2_RETIREMENT_CURRENT_BAL'
  },
  {
    type: 'TEXT',
    title: 'Current Monthly Retirement Contribution',
    helpText: 'How much do you currently contribute to retirement accounts per month? (Enter 0 if none)',
    required: false,
    headerMapping: 'P2_RETIREMENT_PERSONAL'
  },
  {
    type: 'TEXT',
    title: 'Years Until Retirement',
    helpText: 'In how many years do you plan to retire?',
    required: true,
    headerMapping: 'P2_RETIREMENT_YEARS'
  },
  {
    type: 'TEXT',
    title: 'Desired Monthly Retirement Income',
    helpText: 'What monthly income would you like to have in retirement?',
    required: false,
    headerMapping: 'P2_RETIREMENT_DESIRED_INC'
  },

  // Goal Importance Section
  {
    type: 'SECTION_HEADER',
    title: 'Goal Priorities',
    helpText: 'Help us understand how important each financial goal is to you'
  },
  {
    type: 'SCALE',
    title: 'Retirement Importance',
    helpText: 'How important is retirement savings to you? (1=Not important, 7=Extremely important)',
    lowerBound: 1,
    upperBound: 7,
    leftLabel: 'Not important',
    rightLabel: 'Extremely important',
    required: true,
    headerMapping: 'P2_RETIREMENT_IMPORTANCE'
  },
  {
    type: 'SCALE',
    title: 'Education Importance',
    helpText: 'How important is education savings to you? (1=Not important, 7=Extremely important)',
    lowerBound: 1,
    upperBound: 7,
    leftLabel: 'Not important',
    rightLabel: 'Extremely important',
    required: true,
    headerMapping: 'P2_EDUCATION_IMPORTANCE'
  },
  {
    type: 'SCALE',
    title: 'Health Importance',
    helpText: 'How important is health savings to you? (1=Not important, 7=Extremely important)',
    lowerBound: 1,
    upperBound: 7,
    leftLabel: 'Not important',
    rightLabel: 'Extremely important',
    required: true,
    headerMapping: 'P2_HEALTH_IMPORTANCE'
  }
];

/**
 * Generate form template for a specific profile
 * Combines universal questions with profile-specific questions
 * @param {string} profileId - The profile identifier (e.g., '1_ROBS_In_Use')
 * @returns {Object} Complete form structure
 */
function generateFormTemplate(profileId) {
  const profileConfig = PROFILE_CONFIG[profileId];
  if (!profileConfig) {
    throw new Error(`Profile ${profileId} not found in PROFILE_CONFIG`);
  }

  const formStructure = {
    title: `Phase 2 - ${profileConfig.title}`,
    description: `${profileConfig.description}\n\nThis form will collect information specific to your profile to create a personalized investment strategy.`,
    questions: [...UNIVERSAL_QUESTIONS] // Start with universal questions
  };

  // Add profile-specific section if there are extra questions
  if (profileConfig.extraQuestions && profileConfig.extraQuestions.length > 0) {
    // Add profile-specific section header
    formStructure.questions.push({
      type: 'SECTION_HEADER',
      title: `${profileConfig.title} - Specific Questions`,
      helpText: 'These questions are specifically tailored to your investment profile'
    });

    // Add each extra question as a paragraph text field
    profileConfig.extraQuestions.forEach((question, index) => {
      formStructure.questions.push({
        type: 'PARAGRAPH_TEXT',
        title: question,
        helpText: 'Please provide as much detail as possible to help us customize your recommendations',
        required: false,
        headerMapping: `P2_EX_Q${index + 1}` // Maps to ex_q1, ex_q2, etc.
      });
    });
  }

  return formStructure;
}

/**
 * Generate all form templates
 * @returns {Object} Map of profileId to form structure
 */
function generateAllFormTemplates() {
  const templates = {};
  
  // Generate Phase 2 profile templates
  Object.keys(PROFILE_CONFIG).forEach(profileId => {
    templates[profileId] = generateFormTemplate(profileId);
  });
  
  // TODO: Add Phase 1 template when needed
  
  return templates;
}

/**
 * Preview a form template (for debugging)
 * @param {string} profileId - The profile to preview
 */
function previewFormTemplate(profileId) {
  const template = generateFormTemplate(profileId);
  
  Logger.log(`\n=== FORM TEMPLATE PREVIEW: ${profileId} ===`);
  Logger.log(`Title: ${template.title}`);
  Logger.log(`Description: ${template.description}`);
  Logger.log(`\nQuestions (${template.questions.length} total):`);
  
  template.questions.forEach((q, index) => {
    Logger.log(`${index + 1}. [${q.type}] ${q.title}`);
    if (q.headerMapping) {
      Logger.log(`   → Maps to: ${q.headerMapping}`);
    }
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// FORM SYNC SYSTEM - COMPARE AND UPDATE FORMS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Compare current form structure with ideal template
 * @param {Object} currentForm - Exported form structure
 * @param {Object} idealTemplate - Generated template structure
 * @returns {Object} Comparison result with differences
 */
function compareFormStructures(currentForm, idealTemplate) {
  const comparison = {
    identical: false,
    differences: [],
    summary: {
      titleMatch: currentForm.metadata?.title === idealTemplate.title,
      descriptionMatch: currentForm.metadata?.description === idealTemplate.description,
      questionCountMatch: currentForm.items?.length === idealTemplate.questions?.length,
      currentQuestionCount: currentForm.items?.length || 0,
      idealQuestionCount: idealTemplate.questions?.length || 0
    }
  };

  // Check title
  if (!comparison.summary.titleMatch) {
    comparison.differences.push({
      type: 'title',
      current: currentForm.metadata?.title || 'Unknown',
      ideal: idealTemplate.title,
      severity: 'minor'
    });
  }

  // Check description
  if (!comparison.summary.descriptionMatch) {
    comparison.differences.push({
      type: 'description',
      current: currentForm.metadata?.description || 'Unknown',
      ideal: idealTemplate.description,
      severity: 'minor'
    });
  }

  // Check question count
  if (!comparison.summary.questionCountMatch) {
    comparison.differences.push({
      type: 'questionCount',
      current: comparison.summary.currentQuestionCount,
      ideal: comparison.summary.idealQuestionCount,
      severity: 'major'
    });
  }

  // Compare individual questions (basic comparison)
  if (currentForm.items && idealTemplate.questions) {
    const maxQuestions = Math.max(currentForm.items.length, idealTemplate.questions.length);
    
    for (let i = 0; i < maxQuestions; i++) {
      const currentQ = currentForm.items[i];
      const idealQ = idealTemplate.questions[i];
      
      if (!currentQ && idealQ) {
        comparison.differences.push({
          type: 'missingQuestion',
          index: i,
          ideal: idealQ.title,
          severity: 'major'
        });
      } else if (currentQ && !idealQ) {
        comparison.differences.push({
          type: 'extraQuestion',
          index: i,
          current: currentQ.title,
          severity: 'major'
        });
      } else if (currentQ && idealQ) {
        // Compare question titles
        if (currentQ.title !== idealQ.title) {
          comparison.differences.push({
            type: 'questionTitle',
            index: i,
            current: currentQ.title,
            ideal: idealQ.title,
            severity: 'major'
          });
        }
        
        // Compare question types
        if (currentQ.type !== idealQ.type) {
          comparison.differences.push({
            type: 'questionType',
            index: i,
            current: currentQ.type,
            ideal: idealQ.type,
            severity: 'major'
          });
        }
      }
    }
  }

  // Determine if forms are identical
  comparison.identical = comparison.differences.length === 0;

  return comparison;
}

/**
 * Sync a single form to match its ideal template
 * @param {string} profileId - The profile to sync (or 'PHASE_1')
 * @param {boolean} dryRun - If true, only analyze without making changes
 * @returns {Object} Sync result
 */
function syncFormToTemplate(profileId, dryRun = true) {
  try {
    // Get the form configuration
    let formConfig;
    if (profileId === 'PHASE_1') {
      formConfig = FORM_CONFIG.PHASE_1;
    } else {
      formConfig = FORM_CONFIG[profileId];
    }

    if (!formConfig || !formConfig.formId) {
      return {
        success: false,
        profileId: profileId,
        error: `Form configuration not found for ${profileId}`
      };
    }

    // Export current form structure
    Logger.log(`Exporting current structure for ${profileId}...`);
    const currentForm = exportFormToJSON(formConfig.formId, formConfig.name);
    
    if (currentForm.error) {
      return {
        success: false,
        profileId: profileId,
        error: `Failed to export current form: ${currentForm.error}`
      };
    }

    // Generate ideal template
    Logger.log(`Generating ideal template for ${profileId}...`);
    let idealTemplate;
    if (profileId === 'PHASE_1') {
      // TODO: Create Phase 1 template when needed
      return {
        success: false,
        profileId: profileId,
        error: 'Phase 1 template not implemented yet'
      };
    } else {
      idealTemplate = generateFormTemplate(profileId);
    }

    // Compare structures
    Logger.log(`Comparing current vs ideal for ${profileId}...`);
    const comparison = compareFormStructures(currentForm, idealTemplate);

    if (comparison.identical) {
      return {
        success: true,
        profileId: profileId,
        status: 'already_synced',
        message: 'Form already matches ideal template',
        differences: []
      };
    }

    // If dry run, just return the comparison
    if (dryRun) {
      return {
        success: true,
        profileId: profileId,
        status: 'dry_run',
        message: `Found ${comparison.differences.length} differences (dry run mode)`,
        differences: comparison.differences,
        comparison: comparison
      };
    }

    // Apply changes to the actual form
    Logger.log(`Updating form ${profileId} to match template...`);
    const updateResult = updateFormStructure(formConfig.formId, idealTemplate);

    if (updateResult.success) {
      return {
        success: true,
        profileId: profileId,
        status: 'synced',
        message: `Successfully synced form (${updateResult.itemsAdded} items)`,
        differences: comparison.differences,
        updateResult: updateResult
      };
    } else {
      return {
        success: false,
        profileId: profileId,
        error: `Failed to update form: ${updateResult.error}`,
        differences: comparison.differences
      };
    }

  } catch (error) {
    return {
      success: false,
      profileId: profileId,
      error: error.message
    };
  }
}

/**
 * Sync all forms to match their ideal templates
 * @param {boolean} dryRun - If true, only analyze without making changes
 * @param {Array} profileFilter - Optional array of profiles to sync (default: all)
 * @returns {Array} Array of sync results
 */
function syncAllFormsToTemplates(dryRun = true, profileFilter = null) {
  const results = [];
  
  // Determine which profiles to sync
  const profilesToSync = profileFilter || Object.keys(PROFILE_CONFIG);
  
  Logger.log(`\n=== SYNCING ${profilesToSync.length} FORMS ${dryRun ? '(DRY RUN)' : '(LIVE)'} ===`);
  
  profilesToSync.forEach(profileId => {
    Logger.log(`\nSyncing ${profileId}...`);
    const result = syncFormToTemplate(profileId, dryRun);
    results.push(result);
    
    // Log summary
    if (result.success) {
      if (result.status === 'already_synced') {
        Logger.log(`✓ ${profileId}: Already in sync`);
      } else if (result.status === 'dry_run') {
        Logger.log(`📋 ${profileId}: ${result.differences.length} differences found`);
      } else if (result.status === 'synced') {
        Logger.log(`✅ ${profileId}: Successfully synced`);
      }
    } else {
      Logger.log(`❌ ${profileId}: ${result.error}`);
    }
  });
  
  // Print detailed summary
  Logger.log('\n=== SYNC SUMMARY ===');
  const alreadyInSync = results.filter(r => r.status === 'already_synced').length;
  const needsSync = results.filter(r => r.status === 'dry_run' && r.differences?.length > 0).length;
  const synced = results.filter(r => r.status === 'synced').length;
  const errors = results.filter(r => !r.success).length;
  
  Logger.log(`Already in sync: ${alreadyInSync}`);
  Logger.log(`Need sync: ${needsSync}`);
  Logger.log(`Successfully synced: ${synced}`);
  Logger.log(`Errors: ${errors}`);
  
  if (dryRun && needsSync > 0) {
    Logger.log(`\n🔧 To apply changes, run: syncAllFormsToTemplates(false)`);
  }
  
  return results;
}

/**
 * Show detailed differences for a specific form
 * @param {string} profileId - The profile to analyze
 */
function showFormDifferences(profileId) {
  const result = syncFormToTemplate(profileId, true);
  
  if (!result.success) {
    Logger.log(`Error analyzing ${profileId}: ${result.error}`);
    return;
  }
  
  if (result.status === 'already_synced') {
    Logger.log(`✅ ${profileId} is already perfectly synced with its template`);
    return;
  }
  
  Logger.log(`\n=== DETAILED DIFFERENCES: ${profileId} ===`);
  if (result.differences && result.differences.length > 0) {
    result.differences.forEach((diff, index) => {
      Logger.log(`${index + 1}. ${diff.type.toUpperCase()} [${diff.severity}]`);
      if (diff.current !== undefined) {
        Logger.log(`   Current: ${diff.current}`);
      }
      if (diff.ideal !== undefined) {
        Logger.log(`   Ideal: ${diff.ideal}`);
      }
      if (diff.index !== undefined) {
        Logger.log(`   Question #: ${diff.index + 1}`);
      }
      Logger.log('');
    });
  } else {
    Logger.log('No differences found');
  }
}

/**
 * Tax preference utility functions
 */
function prioritizeTraditionalAccounts(vehicleOrder) {
  // Move Traditional/401k accounts higher in priority for current tax savings
  const traditional = [];
  const roth = [];
  const other = [];
  
  vehicleOrder.forEach(v => {
    if (v.name.includes('Traditional') || (v.name.includes('401') && !v.name.includes('Roth'))) {
      traditional.push(v);
    } else if (v.name.includes('Roth')) {
      roth.push(v);
    } else {
      other.push(v);
    }
  });
  
  // Order: Traditional first, then other, then Roth
  return [...traditional, ...other, ...roth];
}

function prioritizeRothAccounts(vehicleOrder) {
  // Move Roth accounts higher in priority for tax-free growth
  const roth = [];
  const traditional = [];
  const other = [];
  
  vehicleOrder.forEach(v => {
    if (v.name.includes('Roth')) {
      roth.push(v);
    } else if (v.name.includes('Traditional') || (v.name.includes('401') && !v.name.includes('Roth'))) {
      traditional.push(v);
    } else {
      other.push(v);
    }
  });
  
  // Order: Roth first, then other, then Traditional
  return [...roth, ...other, ...traditional];
}

// Stub helpers object—one entry per profileId
/**
 * Per-profile configuration helpers.
 * Each helper returns:
 *  • seeds:       { Education: {}, Health: {}, Retirement: {} }
 *  • vehicleOrders: { Education: [...], Health: [...], Retirement: [...] }
 */
const profileHelpers = {
'3_Solo401k_Builder': function(rowArr, hdr) {
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
    
    // Get tax preference
    const taxFocus = getValue(hdr, rowArr, HEADERS.TAX_MINIMIZATION);
    
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
    
    // Build base retirement order
    let baseRetirementOrder = cfg.vehicleOrder_Retirement
      .map(v => ({ name: v.name, capMonthly: v.capMonthly }))
      .filter(v => !(v.name === 'HSA' && !hsaElig));
    
    // Adjust order based on tax preference
    if (taxFocus === 'Now') {
      // Prioritize Traditional over Roth for current tax savings
      baseRetirementOrder = prioritizeTraditionalAccounts(baseRetirementOrder);
    } else if (taxFocus === 'Later') {
      // Prioritize Roth over Traditional for tax-free growth
      baseRetirementOrder = prioritizeRothAccounts(baseRetirementOrder);
    }
    // For 'Both' or undefined, keep original order (balanced approach)
    
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

    const retirementOrder = baseRetirementOrder.concat({ name: 'Family Bank', capMonthly: Infinity });

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
  setTestValue(HEADERS.TAX_MINIMIZATION, data.taxFocus || 'Both');
  
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
 * Step-by-step profile helper validation and tuning
 */
function validateProfileHelper(profileId, testScenarios = []) {
  Logger.log(`\n🔍 VALIDATING PROFILE: ${profileId}`);
  Logger.log('═'.repeat(80));
  
  const cfg = PROFILE_CONFIG[profileId];
  if (!cfg) {
    Logger.log(`❌ ERROR: No configuration found for ${profileId}`);
    return false;
  }
  
  Logger.log(`📋 Profile: ${cfg.title}`);
  Logger.log(`📝 Description: ${cfg.description}`);
  
  // Default test scenarios if none provided
  if (testScenarios.length === 0) {
    testScenarios = [
      { name: 'Standard Case', options: {} },
      { name: 'No Kids', options: { numKids: 0 } },
      { name: 'No HSA', options: { hsaEligible: false } },
      { name: 'Age 55+', options: { age: 55 } },
      { name: 'High Income', options: { netIncome: 20000 } }
    ];
  }
  
  let allPassed = true;
  
  testScenarios.forEach(scenario => {
    Logger.log(`\n🧪 Testing Scenario: ${scenario.name}`);
    Logger.log('─'.repeat(50));
    
    try {
      const { mockRowArr, mockHdr } = createTestData(profileId, scenario.options);
      const helper = profileHelpers[profileId];
      const result = helper(mockRowArr, mockHdr);
      
      // Log scenario parameters
      const age = getValue(mockHdr, mockRowArr, HEADERS.CURRENT_AGE);
      const numKids = getValue(mockHdr, mockRowArr, HEADERS.P2_CESA_NUM_CHILDREN);
      const hsaElig = getValue(mockHdr, mockRowArr, HEADERS.P2_HSA_ELIGIBILITY);
      const filing = getValue(mockHdr, mockRowArr, HEADERS.FILING_STATUS);
      
      Logger.log(`Parameters: Age ${age}, Kids ${numKids}, HSA ${hsaElig}, Filing ${filing}`);
      
      // Validate the results
      const validation = validateHelperResults(result, {
        age: Number(age),
        numKids: Number(numKids),
        hsaEligible: hsaElig === 'Yes',
        filing: filing,
        profileId: profileId
      });
      
      if (validation.passed) {
        Logger.log('✅ Technical Tests PASSED');
        
        // Now run financial strategy validation
        const strategyValidation = validateFinancialStrategy(profileId, result, {
          age: Number(age),
          numKids: Number(numKids),
          hsaEligible: hsaElig === 'Yes',
          filing: filing,
          profileId: profileId,
          netIncome: getValue(mockHdr, mockRowArr, HEADERS.NET_MONTHLY_INCOME)
        });
        
        if (!strategyValidation.passed) {
          Logger.log('❌ Strategic Validation FAILED');
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

/**
 * Validate helper results against expected behavior
 */
function validateHelperResults(result, params) {
  const errors = [];
  
  // 1. Check basic structure
  if (!result.seeds || !result.vehicleOrders) {
    errors.push('Missing seeds or vehicleOrders in result');
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
    if (cesaVehicle) {
      const expectedCap = (CONFIG.ANNUAL_CESA_LIMIT * params.numKids) / 12;
      if (Math.abs(cesaVehicle.capMonthly - expectedCap) > 0.01) {
        errors.push(`CESA cap incorrect: expected ${expectedCap}, got ${cesaVehicle.capMonthly}`);
      }
    }
  }
  
  // 6. Check HSA cap calculation
  if (params.hsaEligible) {
    const hsaVehicle = result.vehicleOrders.Health?.find(v => v.name === 'HSA') ||
                      result.vehicleOrders.Retirement?.find(v => v.name === 'HSA');
    if (hsaVehicle) {
      const hsaType = params.filing === 'Married Filing Jointly' ? 'FAMILY' : 'INDIVIDUAL';
      const base = LIMITS.HEALTH.HSA[hsaType];
      const catchup = params.age >= 55 ? LIMITS.HEALTH.HSA.CATCHUP : 0;
      const expectedCap = (base + catchup) / 12;
      
      if (Math.abs(hsaVehicle.capMonthly - expectedCap) > 0.01) {
        errors.push(`HSA cap incorrect: expected ${expectedCap}, got ${hsaVehicle.capMonthly}`);
      }
    }
  }
  
  // 7. Check catch-up contributions for age 50+
  if (params.age >= 50) {
    // Look for catch-up vehicles or enhanced caps
    const has401kCatchup = result.vehicleOrders.Retirement?.some(v => 
      v.name.includes('Catch-Up') || v.name.includes('catch-up')
    );
    
    // For profiles that should have catch-up but don't explicitly name it,
    // check if employee 401k cap is enhanced
    if (params.profileId === '5_Catch_Up' && !has401kCatchup) {
      errors.push('Catch-up contributions missing for age 50+ profile');
    }
  }
  
  // 8. Check that Bank vehicles appear last
  ['Education', 'Health', 'Retirement'].forEach(domain => {
    const vehicles = result.vehicleOrders[domain];
    if (vehicles && vehicles.length > 0) {
      const bankIndex = vehicles.findIndex(v => v.name.includes('Bank'));
      if (bankIndex >= 0 && bankIndex !== vehicles.length - 1) {
        errors.push(`${domain} Bank vehicle should be last in priority order`);
      }
    }
  });
  
  return { passed: errors.length === 0, errors };
}

/**
 * Validate the financial strategy and optimization logic of helper results
 */
function validateFinancialStrategy(profileId, result, params) {
  const strategy = [];
  const warnings = [];
  const errors = [];
  
  Logger.log(`\n💰 FINANCIAL STRATEGY ANALYSIS: ${profileId}`);
  Logger.log('═'.repeat(60));
  
  const cfg = PROFILE_CONFIG[profileId];
  
  // Analyze retirement priority order
  const retirementOrder = result.vehicleOrders.Retirement;
  
  switch(profileId) {
    case '1A_ROBS_In_Use':
      strategy.push('ROBS Strategy: Business profits → Solo 401k → tax-advantaged growth');
      
      // Check if profit distribution is prioritized (should be first)
      const profitFirst = retirementOrder[0]?.name.includes('Profit Distribution');
      if (!profitFirst) {
        errors.push('ROBS profit distribution should be #1 priority for tax efficiency');
      }
      
      // Check if traditional vs Roth makes sense
      const rothIndex = retirementOrder.findIndex(v => v.name.includes('Roth'));
      const tradIndex = retirementOrder.findIndex(v => v.name.includes('Traditional'));
      
      if (params.age < 40 && rothIndex > tradIndex) {
        warnings.push('Young investor: Consider prioritizing Roth over Traditional for long-term tax-free growth');
      }
      break;
      
    case '2_Solo401k_Builder':
      strategy.push('Solo 401k Strategy: Maximize employer deduction + employee deferral');
      
      // Employee vs Employer priority check
      const empIndex = retirementOrder.findIndex(v => v.name.includes('Employee'));
      const emplIndex = retirementOrder.findIndex(v => v.name.includes('Employer'));
      
      if (empIndex > emplIndex) {
        errors.push('Employee deferrals should come before employer contributions for immediate tax benefit');
      }
      
      // HSA priority check
      const hsaIndex = retirementOrder.findIndex(v => v.name === 'HSA');
      if (hsaIndex > 2 && params.hsaEligible) {
        warnings.push('HSA offers triple tax advantage - consider higher priority than position #' + (hsaIndex + 1));
      }
      break;
      
    case '3_Roth_Reclaimer':
      strategy.push('Roth Strategy: Backdoor conversions + tax diversification');
      
      const backdoorIndex = retirementOrder.findIndex(v => v.name.includes('Backdoor'));
      if (backdoorIndex !== 0) {
        errors.push('Backdoor Roth should be #1 priority for high earners locked out of direct Roth');
      }
      break;
      
    case '4_Bracket_Strategist':
      strategy.push('Tax Strategy: Current deductions + future Roth flexibility');
      
      const traditionalIndex = retirementOrder.findIndex(v => v.name.includes('Traditional'));
      if (traditionalIndex > 1) {
        warnings.push('Traditional accounts should be prioritized for current tax reduction');
      }
      break;
      
    case '5_Catch_Up':
      strategy.push('Catch-up Strategy: Maximize age 50+ contribution limits');
      
      const hasCatchup = retirementOrder.some(v => v.name.includes('Catch-Up'));
      if (!hasCatchup) {
        errors.push('Age 50+ should prioritize catch-up contributions for accelerated savings');
      }
      break;
      
    case '6_Foundation_Builder':
      strategy.push('Foundation Strategy: Build tax-diversified base');
      
      const rothFirst = retirementOrder[0]?.name.includes('Roth');
      if (!rothFirst && params.age < 35) {
        warnings.push('Young investors typically benefit from Roth-first strategy for tax-free growth');
      }
      break;
      
    case '7_Biz_Owner_Group':
      strategy.push('Business Owner Strategy: Group plan compliance + owner benefits');
      
      // Check for defined benefit if high income
      const hasDB = retirementOrder.some(v => v.name.includes('Defined Benefit'));
      if (!hasDB && params.netIncome > 15000) {
        warnings.push('High-income business owners should consider defined benefit plans for maximum deferrals');
      }
      break;
      
    case '8_Late_Stage_Growth':
      strategy.push('Late-stage Strategy: Alternative investments + tax optimization');
      
      // Should prioritize alternatives for growth
      const hasAlts = retirementOrder.some(v => v.name.includes('Alternative'));
      if (!hasAlts) {
        warnings.push('Near-retirement investors should consider alternative investments for diversification');
      }
      break;
  }
  
  // Universal strategic checks
  
  // 1. HSA Priority Check (Triple tax advantage)
  if (params.hsaEligible) {
    const hsaRetirementIndex = retirementOrder.findIndex(v => v.name === 'HSA');
    if (hsaRetirementIndex > 3) {
      warnings.push(`HSA has triple tax advantage but appears at position #${hsaRetirementIndex + 1} - consider higher priority`);
    }
  }
  
  // 2. Tax Diversification Check
  const hasRoth = retirementOrder.some(v => v.name.includes('Roth'));
  const hasTraditional = retirementOrder.some(v => v.name.includes('Traditional') || v.name.includes('401'));
  
  if (!hasRoth && params.age < 45) {
    warnings.push('Young investors should consider some Roth contributions for tax diversification');
  }
  
  if (!hasTraditional && params.netIncome > 10000) {
    warnings.push('Higher earners should consider traditional contributions for current tax savings');
  }
  
  // 3. Liquidity Check
  const rothIraIndex = retirementOrder.findIndex(v => v.name === 'Roth IRA');
  const rothBeforeHsa = params.hsaEligible && rothIraIndex >= 0 && 
                        rothIraIndex < retirementOrder.findIndex(v => v.name === 'HSA');
  
  if (rothBeforeHsa) {
    warnings.push('HSA offers contribution deduction + investment growth + tax-free withdrawals - may warrant priority over Roth IRA');
  }
  
  // Log the analysis
  strategy.forEach(s => Logger.log(`📊 ${s}`));
  
  if (warnings.length > 0) {
    Logger.log('\n⚠️  STRATEGIC CONSIDERATIONS:');
    warnings.forEach(w => Logger.log(`   • ${w}`));
  }
  
  if (errors.length > 0) {
    Logger.log('\n❌ STRATEGIC ERRORS:');
    errors.forEach(e => Logger.log(`   • ${e}`));
  }
  
  const strategicScore = errors.length === 0 ? (warnings.length === 0 ? 'OPTIMAL' : 'GOOD') : 'NEEDS_WORK';
  Logger.log(`\n📈 STRATEGIC RATING: ${strategicScore}`);
  
  return {
    strategicScore,
    strategy,
    warnings,
    errors,
    passed: errors.length === 0
  };
}

/**
 * Test all profiles systematically
 */
function validateAllProfiles() {
  Logger.log('🔍 SYSTEMATIC VALIDATION OF ALL PROFILE HELPERS');
  Logger.log('═'.repeat(80));
  
  const profiles = Object.keys(PROFILE_CONFIG);
  const results = {};
  let overallPassed = true;
  
  profiles.forEach(profileId => {
    const passed = validateProfileHelper(profileId);
    results[profileId] = passed;
    if (!passed) overallPassed = false;
    
    Logger.log('\n' + '─'.repeat(80));
  });
  
  Logger.log(`\n🏁 FINAL RESULTS:`);
  Logger.log('═'.repeat(40));
  
  profiles.forEach(profileId => {
    const status = results[profileId] ? '✅ PASS' : '❌ FAIL';
    Logger.log(`${profileId}: ${status}`);
  });
  
  Logger.log(`\nOverall Status: ${overallPassed ? '✅ ALL PASSED' : '❌ SOME FAILED'}`);
  return results;
}

// Individual validation functions for easy testing
function validate_1A_ROBS_In_Use() { return validateProfileHelper('1A_ROBS_In_Use'); }
function validate_1B_ROBS_Curious() { return validateProfileHelper('1B_ROBS_Curious'); }
function validate_2_Solo401k_Builder() { return validateProfileHelper('2_Solo401k_Builder'); }
function validate_3_Roth_Reclaimer() { return validateProfileHelper('3_Roth_Reclaimer'); }
function validate_4_Bracket_Strategist() { return validateProfileHelper('4_Bracket_Strategist'); }
function validate_5_Catch_Up() { return validateProfileHelper('5_Catch_Up'); }
function validate_6_Foundation_Builder() { return validateProfileHelper('6_Foundation_Builder'); }
function validate_7_Biz_Owner_Group() { return validateProfileHelper('7_Biz_Owner_Group'); }
function validate_8_Late_Stage_Growth() { return validateProfileHelper('8_Late_Stage_Growth'); }

/**
 * Test tax preference impact on vehicle ordering
 */
function testTaxPreferences(profileId = '1A_ROBS_In_Use') {
  Logger.log(`\n🎯 TESTING TAX PREFERENCES: ${profileId}`);
  Logger.log('═'.repeat(80));
  
  const taxPreferences = [
    { name: 'Tax Savings NOW', value: 'Now' },
    { name: 'Tax Savings LATER', value: 'Later' }, 
    { name: 'BALANCED Approach', value: 'Both' }
  ];
  
  taxPreferences.forEach(pref => {
    Logger.log(`\n📊 Scenario: ${pref.name} (${pref.value})`);
    Logger.log('─'.repeat(50));
    
    const { mockRowArr, mockHdr } = createTestData(profileId, { 
      taxFocus: pref.value,
      age: 35,
      netIncome: 10000
    });
    
    const helper = profileHelpers[profileId];
    const result = helper(mockRowArr, mockHdr);
    
    Logger.log('\nRetirement Vehicle Priority Order:');
    result.vehicleOrders.Retirement.forEach((vehicle, index) => {
      const cap = vehicle.capMonthly === Infinity ? 'Unlimited' : `$${Math.round(vehicle.capMonthly)}/mo`;
      const taxType = vehicle.name.includes('Roth') ? '🟢 Roth' : 
                     vehicle.name.includes('Traditional') ? '🔵 Traditional' : 
                     vehicle.name.includes('401') ? '🟡 401k' : '⚪ Other';
      Logger.log(`  ${index + 1}. ${vehicle.name} (${cap}) ${taxType}`);
    });
  });
  
  Logger.log('\n💡 Key Insights:');
  Logger.log('• "Now" should prioritize Traditional/401k accounts for current deductions');
  Logger.log('• "Later" should prioritize Roth accounts for tax-free growth');
  Logger.log('• "Both" should maintain balanced order');
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





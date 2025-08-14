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

// ═══════════════════════════════════════════════════════════════════════════════
// CURRENT FORMS SUMMARY - OPTIMIZATION DATA
// ═══════════════════════════════════════════════════════════════════════════════

const CURRENT_FORMS_SUMMARY = {
  lastAnalyzed: "2025-08-12T06:18:55.748Z",
  totalForms: 10,
  phase1Questions: 46,
  phase2QuestionsPerProfile: "46-50 questions each",
  
  universalQuestions: [
    "Full Name", "Email", "Student Identifier", "Current Age", "Gross Annual Income",
    "Net Monthly Income", "Filing Status", "Tax Minimization Preference",
    "HSA Eligibility", "Number of Children", "Retirement Catch-up Eligibility",
    "Investment Involvement", "Investment Time Horizon", "Investment Confidence",
    "Retirement Importance", "Years Until Retirement", "Education Importance",
    "Years Until Education Need", "Health Importance", "Years Until Health Need"
  ],
  
  profileSpecificSeeds: {
    "1_ROBS_In_Use": ["Current ROBS Profit", "Monthly HSA Contribution", "Monthly CESA Contribution"],
    "2_ROBS_Curious": ["Monthly HSA Contribution", "Monthly CESA Contribution"],
    "3_Solo401k_Builder": ["Solo 401k Employee Contribution", "Monthly HSA Contribution"],
    "4_Roth_Reclaimer": ["Current Roth IRA Balance", "Monthly HSA Contribution"],
    "5_Bracket_Strategist": ["Current 401k Balance", "Monthly HSA Contribution", "Monthly CESA Contribution"],
    "6_Catch_Up": ["Current Retirement Balance", "Monthly HSA Contribution"],
    "7_Foundation_Builder": ["Emergency Fund Amount", "Monthly HSA Contribution"],
    "8_Biz_Owner_Group": ["Business Retirement Plan", "Monthly HSA Contribution", "Monthly CESA Contribution"],
    "9_Late_Stage_Growth": ["Total Retirement Assets", "Monthly HSA Contribution", "Monthly CESA Contribution"]
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// CURRENT FORMS - REFERENCE
// ═══════════════════════════════════════════════════════════════════════════════
// Complete CURRENT_FORMS data is available from Current_Forms_Full.js
// (In Google Apps Script, all files share global scope)

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

/**
 * HSA/CESA calculation utility functions
 */
function calculateHsaMonthlyCapacity(hsaEligible, age, filingStatus) {
  if (!hsaEligible) return 0;
  
  const type = (filingStatus === 'Married Filing Jointly') ? 'FAMILY' : 'INDIVIDUAL';
  const base = LIMITS.HEALTH.HSA[type];
  const catchup = age >= 55 ? LIMITS.HEALTH.HSA.CATCHUP : 0;
  
  return (base + catchup) / 12;
}

function calculateCesaMonthlyCapacity(numChildren) {
  return (CONFIG.ANNUAL_CESA_LIMIT * numChildren) / 12;
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
  // Read the "have plan?" flag and all three Solo‐401k fields
  const hasPlan       = getValue(hdr, rowArr, HEADERS.P2_EX_Q3) === 'Yes';
  const annualEmployee= Number(getValue(hdr, rowArr, HEADERS.P2_EX_Q4)) || 0;
  const annualEmployer= Number(getValue(hdr, rowArr, HEADERS.P2_EX_Q5)) || 0;
  const annualFuture  = Number(getValue(hdr, rowArr, HEADERS.P2_EX_Q6)) || 0;

  // Compute HSA/­CESA caps as before…
  const hsaElig = getValue(hdr,rowArr,HEADERS.P2_HSA_ELIGIBILITY)==='Yes';
  const numKids = Number(getValue(hdr,rowArr,HEADERS.P2_CESA_NUM_CHILDREN))||0;
  const age     = Number(getValue(hdr,rowArr,HEADERS.CURRENT_AGE));
  const filing  = getValue(hdr,rowArr,HEADERS.FILING_STATUS);
  
  // Get tax preference for vehicle ordering
  const taxFocus = getValue(hdr, rowArr, HEADERS.TAX_MINIMIZATION);
  
  // Calculate monthly capacities using utility functions
  const hsaCap = calculateHsaMonthlyCapacity(hsaElig, age, filing);
  const cesaCap = calculateCesaMonthlyCapacity(numKids);

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
  const cfg = PROFILE_CONFIG['3_Solo401k_Builder'];
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

  // Build base retirement order with catch-up contributions
  let baseRetirementOrder = cfg.vehicleOrder_Retirement
    .map(v => {
      let adjustedCap = v.capMonthly;
      
      // Apply catch-up contributions for age 50+
      if (age >= 50) {
        if (v.name.includes('401')) {
          // 401(k) catch-up: $7,500 for 50-59, $11,250 for 60+
          const catchup401k = age >= 60 ? LIMITS.RETIREMENT.CATCHUP_401K_60 : LIMITS.RETIREMENT.CATCHUP_401K_50;
          adjustedCap = (v.capMonthly * 12 + catchup401k) / 12;
        } else if (v.name.includes('IRA')) {
          // IRA catch-up: $1,000 for 50+
          adjustedCap = (v.capMonthly * 12 + LIMITS.RETIREMENT.CATCHUP_IRA) / 12;
        }
      }
      
      return { name: v.name, capMonthly: adjustedCap };
    });
  
  // Adjust order based on tax preference
  if (taxFocus === 'Now') {
    // Prioritize Traditional over Roth for current tax savings
    baseRetirementOrder = prioritizeTraditionalAccounts(baseRetirementOrder);
  } else if (taxFocus === 'Later') {
    // Prioritize Roth over Traditional for tax-free growth
    baseRetirementOrder = prioritizeRothAccounts(baseRetirementOrder);
  }
  // For 'Both' or undefined, keep original order (balanced approach)
  
  const retirementOrder = baseRetirementOrder.concat({ name:'Family Bank', capMonthly:Infinity });

  return {
    seeds,
    vehicleOrders: {
      Education:  educationOrder,
      Health:     healthOrder,
      Retirement: retirementOrder
    }
  };
},







  '1_ROBS_In_Use': function(rowArr, hdr) {
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
    
    const cfg = PROFILE_CONFIG['1_ROBS_In_Use'];
    
    // Build base retirement order
    let baseRetirementOrder = cfg.vehicleOrder_Retirement
      .map(v => {
        let adjustedCap = v.capMonthly;
        
        // Apply catch-up contributions for age 50+
        if (age >= 50) {
          if (v.name.includes('401')) {
            // 401(k) catch-up: $7,500 for 50-59, $11,250 for 60+
            const catchup401k = age >= 60 ? LIMITS.RETIREMENT.CATCHUP_401K_60 : LIMITS.RETIREMENT.CATCHUP_401K_50;
            adjustedCap = (v.capMonthly * 12 + catchup401k) / 12;
          } else if (v.name.includes('IRA')) {
            // IRA catch-up: $1,000 for 50+
            adjustedCap = (v.capMonthly * 12 + LIMITS.RETIREMENT.CATCHUP_IRA) / 12;
          }
        }
        
        return { name: v.name, capMonthly: adjustedCap };
      });
    
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
  '2_ROBS_Curious': function(rowArr, hdr) {
    const hsaElig = getValue(hdr, rowArr, HEADERS.P2_HSA_ELIGIBILITY) === 'Yes';
    const numKids = Number(getValue(hdr, rowArr, HEADERS.P2_CESA_NUM_CHILDREN)) || 0;
    const age = Number(getValue(hdr, rowArr, HEADERS.CURRENT_AGE));
    const filing = getValue(hdr, rowArr, HEADERS.FILING_STATUS);
    
    // Get tax preference for vehicle ordering
    const taxFocus = getValue(hdr, rowArr, HEADERS.TAX_MINIMIZATION);
    
    // Calculate monthly capacities using utility functions
    const hsaCap = calculateHsaMonthlyCapacity(hsaElig, age, filing);
    const cesaCap = calculateCesaMonthlyCapacity(numKids);

    const seeds = { Education: {}, Health: {}, Retirement: {} };
    
    const cfg = PROFILE_CONFIG['2_ROBS_Curious'];
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

    // Build base retirement order with catch-up contributions
    let baseRetirementOrder = cfg.vehicleOrder_Retirement
      .map(v => {
        let adjustedCap = v.capMonthly;
        
        // Apply catch-up contributions for age 50+
        if (age >= 50) {
          if (v.name.includes('401')) {
            // 401(k) catch-up: $7,500 for 50-59, $11,250 for 60+
            const catchup401k = age >= 60 ? LIMITS.RETIREMENT.CATCHUP_401K_60 : LIMITS.RETIREMENT.CATCHUP_401K_50;
            adjustedCap = (v.capMonthly * 12 + catchup401k) / 12;
          } else if (v.name.includes('IRA')) {
            // IRA catch-up: $1,000 for 50+
            adjustedCap = (v.capMonthly * 12 + LIMITS.RETIREMENT.CATCHUP_IRA) / 12;
          }
        }
        
        return { name: v.name, capMonthly: adjustedCap };
      });
    
    // Adjust order based on tax preference
    if (taxFocus === 'Now') {
      // Prioritize Traditional over Roth for current tax savings
      baseRetirementOrder = prioritizeTraditionalAccounts(baseRetirementOrder);
    } else if (taxFocus === 'Later') {
      // Prioritize Roth over Traditional for tax-free growth
      baseRetirementOrder = prioritizeRothAccounts(baseRetirementOrder);
    }
    // For 'Both' or undefined, keep original order (balanced approach)
    
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
  '4_Roth_Reclaimer': function(rowArr, hdr) {
    const hsaElig = getValue(hdr, rowArr, HEADERS.P2_HSA_ELIGIBILITY) === 'Yes';
    const numKids = Number(getValue(hdr, rowArr, HEADERS.P2_CESA_NUM_CHILDREN)) || 0;
    const age = Number(getValue(hdr, rowArr, HEADERS.CURRENT_AGE));
    const filing = getValue(hdr, rowArr, HEADERS.FILING_STATUS);
    
    // Get tax preference for vehicle ordering
    const taxFocus = getValue(hdr, rowArr, HEADERS.TAX_MINIMIZATION);
    
    // Calculate monthly capacities using utility functions
    const hsaCap = calculateHsaMonthlyCapacity(hsaElig, age, filing);
    const cesaCap = calculateCesaMonthlyCapacity(numKids);

    const seeds = { Education: {}, Health: {}, Retirement: {} };
    
    const cfg = PROFILE_CONFIG['4_Roth_Reclaimer'];
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

    // Build base retirement order with catch-up logic
    let baseRetirementOrder = cfg.vehicleOrder_Retirement
      .map(v => {
        let adjustedCap = v.capMonthly;
        
        // Apply catch-up contributions for age 50+
        if (age >= 50) {
          if (v.name.includes('401')) {
            // 401(k) catch-up: $7,500 for 50-59, $11,250 for 60+
            const catchup401k = age >= 60 ? LIMITS.RETIREMENT.CATCHUP_401K_60 : LIMITS.RETIREMENT.CATCHUP_401K_50;
            adjustedCap = (v.capMonthly * 12 + catchup401k) / 12;
          } else if (v.name.includes('IRA')) {
            // IRA catch-up: $1,000 for 50+
            adjustedCap = (v.capMonthly * 12 + LIMITS.RETIREMENT.CATCHUP_IRA) / 12;
          }
        }
        
        return { name: v.name, capMonthly: adjustedCap };
      });
    
    // Adjust order based on tax preference
    if (taxFocus === 'Now') {
      // Prioritize Traditional over Roth for current tax savings
      baseRetirementOrder = prioritizeTraditionalAccounts(baseRetirementOrder);
    } else if (taxFocus === 'Later') {
      // Prioritize Roth over Traditional for tax-free growth
      baseRetirementOrder = prioritizeRothAccounts(baseRetirementOrder);
    }
    // For 'Both' or undefined, keep original order (balanced approach)
    
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
  '5_Bracket_Strategist': function(rowArr, hdr) {
    const hsaElig = getValue(hdr, rowArr, HEADERS.P2_HSA_ELIGIBILITY) === 'Yes';
    const numKids = Number(getValue(hdr, rowArr, HEADERS.P2_CESA_NUM_CHILDREN)) || 0;
    const age = Number(getValue(hdr, rowArr, HEADERS.CURRENT_AGE));
    const filing = getValue(hdr, rowArr, HEADERS.FILING_STATUS);
    
    // Get tax preference for vehicle ordering
    const taxFocus = getValue(hdr, rowArr, HEADERS.TAX_MINIMIZATION);
    
    // Calculate monthly capacities using utility functions
    const hsaCap = calculateHsaMonthlyCapacity(hsaElig, age, filing);
    const cesaCap = calculateCesaMonthlyCapacity(numKids);

    const seeds = { Education: {}, Health: {}, Retirement: {} };
    
    const cfg = PROFILE_CONFIG['5_Bracket_Strategist'];
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

    // Build base retirement order with catch-up logic
    let baseRetirementOrder = cfg.vehicleOrder_Retirement
      .map(v => {
        let adjustedCap = v.capMonthly;
        
        // Apply catch-up contributions for age 50+
        if (age >= 50) {
          if (v.name.includes('401')) {
            // 401(k) catch-up: $7,500 for 50-59, $11,250 for 60+
            const catchup401k = age >= 60 ? LIMITS.RETIREMENT.CATCHUP_401K_60 : LIMITS.RETIREMENT.CATCHUP_401K_50;
            adjustedCap = (v.capMonthly * 12 + catchup401k) / 12;
          } else if (v.name.includes('IRA')) {
            // IRA catch-up: $1,000 for 50+
            adjustedCap = (v.capMonthly * 12 + LIMITS.RETIREMENT.CATCHUP_IRA) / 12;
          }
        }
        
        return { name: v.name, capMonthly: adjustedCap };
      });
    
    // Adjust order based on tax preference
    if (taxFocus === 'Now') {
      // Prioritize Traditional over Roth for current tax savings
      baseRetirementOrder = prioritizeTraditionalAccounts(baseRetirementOrder);
    } else if (taxFocus === 'Later') {
      // Prioritize Roth over Traditional for tax-free growth
      baseRetirementOrder = prioritizeRothAccounts(baseRetirementOrder);
    }
    // For 'Both' or undefined, keep original order (balanced approach)
    
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
  '6_Catch_Up': function(rowArr, hdr) {
    const hsaElig = getValue(hdr, rowArr, HEADERS.P2_HSA_ELIGIBILITY) === 'Yes';
    const numKids = Number(getValue(hdr, rowArr, HEADERS.P2_CESA_NUM_CHILDREN)) || 0;
    const age = Number(getValue(hdr, rowArr, HEADERS.CURRENT_AGE));
    const filing = getValue(hdr, rowArr, HEADERS.FILING_STATUS);
    
    // Get tax preference for vehicle ordering
    const taxFocus = getValue(hdr, rowArr, HEADERS.TAX_MINIMIZATION);
    
    // Calculate monthly capacities using utility functions
    const hsaCap = calculateHsaMonthlyCapacity(hsaElig, age, filing);
    const cesaCap = calculateCesaMonthlyCapacity(numKids);

    const seeds = { Education: {}, Health: {}, Retirement: {} };
    
    const cfg = PROFILE_CONFIG['6_Catch_Up'];
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

    // Build base retirement order with catch-up logic
    let baseRetirementOrder = cfg.vehicleOrder_Retirement
      .map(v => {
        let adjustedCap = v.capMonthly;
        
        // Apply catch-up contributions for age 50+
        if (age >= 50) {
          if (v.name.includes('401')) {
            // 401(k) catch-up: $7,500 for 50-59, $11,250 for 60+
            const catchup401k = age >= 60 ? LIMITS.RETIREMENT.CATCHUP_401K_60 : LIMITS.RETIREMENT.CATCHUP_401K_50;
            adjustedCap = (v.capMonthly * 12 + catchup401k) / 12;
          } else if (v.name.includes('IRA')) {
            // IRA catch-up: $1,000 for 50+
            adjustedCap = (v.capMonthly * 12 + LIMITS.RETIREMENT.CATCHUP_IRA) / 12;
          }
        }
        
        return { name: v.name, capMonthly: adjustedCap };
      });
    
    // Adjust order based on tax preference
    if (taxFocus === 'Now') {
      // Prioritize Traditional over Roth for current tax savings
      baseRetirementOrder = prioritizeTraditionalAccounts(baseRetirementOrder);
    } else if (taxFocus === 'Later') {
      // Prioritize Roth over Traditional for tax-free growth
      baseRetirementOrder = prioritizeRothAccounts(baseRetirementOrder);
    }
    // For 'Both' or undefined, keep original order (balanced approach)
    
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
  '7_Foundation_Builder': function(rowArr, hdr) {
    const hsaElig = getValue(hdr, rowArr, HEADERS.P2_HSA_ELIGIBILITY) === 'Yes';
    const numKids = Number(getValue(hdr, rowArr, HEADERS.P2_CESA_NUM_CHILDREN)) || 0;
    const age = Number(getValue(hdr, rowArr, HEADERS.CURRENT_AGE));
    const filing = getValue(hdr, rowArr, HEADERS.FILING_STATUS);
    
    // Get tax preference for vehicle ordering
    const taxFocus = getValue(hdr, rowArr, HEADERS.TAX_MINIMIZATION);
    
    // Calculate monthly capacities using utility functions
    const hsaCap = calculateHsaMonthlyCapacity(hsaElig, age, filing);
    const cesaCap = calculateCesaMonthlyCapacity(numKids);

    const seeds = { Education: {}, Health: {}, Retirement: {} };
    
    const cfg = PROFILE_CONFIG['7_Foundation_Builder'];
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

    // Build base retirement order with catch-up logic
    let baseRetirementOrder = cfg.vehicleOrder_Retirement
      .map(v => {
        let adjustedCap = v.capMonthly;
        
        // Apply catch-up contributions for age 50+
        if (age >= 50) {
          if (v.name.includes('401')) {
            // 401(k) catch-up: $7,500 for 50-59, $11,250 for 60+
            const catchup401k = age >= 60 ? LIMITS.RETIREMENT.CATCHUP_401K_60 : LIMITS.RETIREMENT.CATCHUP_401K_50;
            adjustedCap = (v.capMonthly * 12 + catchup401k) / 12;
          } else if (v.name.includes('IRA')) {
            // IRA catch-up: $1,000 for 50+
            adjustedCap = (v.capMonthly * 12 + LIMITS.RETIREMENT.CATCHUP_IRA) / 12;
          }
        }
        
        return { name: v.name, capMonthly: adjustedCap };
      });
    
    // Adjust order based on tax preference
    if (taxFocus === 'Now') {
      // Prioritize Traditional over Roth for current tax savings
      baseRetirementOrder = prioritizeTraditionalAccounts(baseRetirementOrder);
    } else if (taxFocus === 'Later') {
      // Prioritize Roth over Traditional for tax-free growth
      baseRetirementOrder = prioritizeRothAccounts(baseRetirementOrder);
    }
    // For 'Both' or undefined, keep original order (balanced approach)
    
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
  '8_Biz_Owner_Group': function(rowArr, hdr) {
    const hsaElig = getValue(hdr, rowArr, HEADERS.P2_HSA_ELIGIBILITY) === 'Yes';
    const numKids = Number(getValue(hdr, rowArr, HEADERS.P2_CESA_NUM_CHILDREN)) || 0;
    const age = Number(getValue(hdr, rowArr, HEADERS.CURRENT_AGE));
    const filing = getValue(hdr, rowArr, HEADERS.FILING_STATUS);
    
    // Get tax preference for vehicle ordering
    const taxFocus = getValue(hdr, rowArr, HEADERS.TAX_MINIMIZATION);
    
    // Calculate monthly capacities using utility functions
    const hsaCap = calculateHsaMonthlyCapacity(hsaElig, age, filing);
    const cesaCap = calculateCesaMonthlyCapacity(numKids);

    const seeds = { Education: {}, Health: {}, Retirement: {} };
    
    const cfg = PROFILE_CONFIG['8_Biz_Owner_Group'];
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

    // Build base retirement order with catch-up logic
    let baseRetirementOrder = cfg.vehicleOrder_Retirement
      .map(v => {
        let adjustedCap = v.capMonthly;
        
        // Apply catch-up contributions for age 50+
        if (age >= 50) {
          if (v.name.includes('401')) {
            // 401(k) catch-up: $7,500 for 50-59, $11,250 for 60+
            const catchup401k = age >= 60 ? LIMITS.RETIREMENT.CATCHUP_401K_60 : LIMITS.RETIREMENT.CATCHUP_401K_50;
            adjustedCap = (v.capMonthly * 12 + catchup401k) / 12;
          } else if (v.name.includes('IRA')) {
            // IRA catch-up: $1,000 for 50+
            adjustedCap = (v.capMonthly * 12 + LIMITS.RETIREMENT.CATCHUP_IRA) / 12;
          }
        }
        
        return { name: v.name, capMonthly: adjustedCap };
      });
    
    // Adjust order based on tax preference
    if (taxFocus === 'Now') {
      // Prioritize Traditional over Roth for current tax savings
      baseRetirementOrder = prioritizeTraditionalAccounts(baseRetirementOrder);
    } else if (taxFocus === 'Later') {
      // Prioritize Roth over Traditional for tax-free growth
      baseRetirementOrder = prioritizeRothAccounts(baseRetirementOrder);
    }
    // For 'Both' or undefined, keep original order (balanced approach)
    
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
  '9_Late_Stage_Growth': function(rowArr, hdr) {
    const hsaElig = getValue(hdr, rowArr, HEADERS.P2_HSA_ELIGIBILITY) === 'Yes';
    const numKids = Number(getValue(hdr, rowArr, HEADERS.P2_CESA_NUM_CHILDREN)) || 0;
    const age = Number(getValue(hdr, rowArr, HEADERS.CURRENT_AGE));
    const filing = getValue(hdr, rowArr, HEADERS.FILING_STATUS);
    
    // Get tax preference for vehicle ordering
    const taxFocus = getValue(hdr, rowArr, HEADERS.TAX_MINIMIZATION);
    
    // Calculate monthly capacities using utility functions
    const hsaCap = calculateHsaMonthlyCapacity(hsaElig, age, filing);
    const cesaCap = calculateCesaMonthlyCapacity(numKids);

    const seeds = { Education: {}, Health: {}, Retirement: {} };
    
    const cfg = PROFILE_CONFIG['9_Late_Stage_Growth'];
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

    // Build base retirement order with catch-up logic
    let baseRetirementOrder = cfg.vehicleOrder_Retirement
      .map(v => {
        let adjustedCap = v.capMonthly;
        
        // Apply catch-up contributions for age 50+
        if (age >= 50) {
          if (v.name.includes('401')) {
            // 401(k) catch-up: $7,500 for 50-59, $11,250 for 60+
            const catchup401k = age >= 60 ? LIMITS.RETIREMENT.CATCHUP_401K_60 : LIMITS.RETIREMENT.CATCHUP_401K_50;
            adjustedCap = (v.capMonthly * 12 + catchup401k) / 12;
          } else if (v.name.includes('IRA')) {
            // IRA catch-up: $1,000 for 50+
            adjustedCap = (v.capMonthly * 12 + LIMITS.RETIREMENT.CATCHUP_IRA) / 12;
          }
        }
        
        return { name: v.name, capMonthly: adjustedCap };
      });
    
    // Adjust order based on tax preference
    if (taxFocus === 'Now') {
      // Prioritize Traditional over Roth for current tax savings
      baseRetirementOrder = prioritizeTraditionalAccounts(baseRetirementOrder);
    } else if (taxFocus === 'Later') {
      // Prioritize Roth over Traditional for tax-free growth
      baseRetirementOrder = prioritizeRothAccounts(baseRetirementOrder);
    }
    // For 'Both' or undefined, keep original order (balanced approach)
    
    const retirementOrder = baseRetirementOrder.concat({ name: 'Family Bank', capMonthly: Infinity });

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
    profile = '1_ROBS_In_Use';
  } else if (
    robsInterest === 'Yes' &&
    robsNewBiz   === 'Yes' &&
    robsFunds    === 'Yes' &&
    robsSetup    === 'Yes'
  ) {
    profile = '2_ROBS_Curious';
  } else if (hasEmployees === 'Yes') {
    profile = '8_Biz_Owner_Group';
  } else if ((workSituation === 'Self-employed' || workSituation === 'Both') && hasEmployees === 'No') {
    profile = '3_Solo401k_Builder';
  } else if (hasTradIRA === 'Yes') {
    profile = '4_Roth_Reclaimer';
  } else if (age >= 55 || String(nearRetire).startsWith('Yes')) {
    profile = '9_Late_Stage_Growth';
  } else if (age >= 50 && catchUpFeeling === 'Yes') {
    profile = '6_Catch_Up';
  } else if (['Now','Both'].includes(taxFocus)) {
    profile = '5_Bracket_Strategist';
  } else {
    profile = '7_Foundation_Builder';
  }

  // Write ProfileID
  setValue(sh, hdr, rowNum, HEADERS.PROFILE_ID, profile);

  // Build & write tags in sheet order
  const tags = {
    USES_ROBS:           (robsInUse   === 'Yes'),
    INTREST_ROBS:        (profile !== '1_ROBS_In_Use' && robsInterest === 'Yes'),
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
  const fbCol = hdr[HEADERS.FAMILY_BANK_IDEAL];
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

/**
 * Main processing engine - orchestrates the entire allocation process
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

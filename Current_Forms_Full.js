// ═══════════════════════════════════════════════════════════════════════════════
// COMPLETE CURRENT FORM DATA - REFERENCE ONLY (4,100+ lines)
// ═══════════════════════════════════════════════════════════════════════════════
// This file contains the complete exported form structures for reference.
// Updated by updateEmbeddedFormData() function.
// For optimization work, see CURRENT_FORMS_SUMMARY in Code.js

// Complete form export data extracted from Code.js (lines 289-4400)
// Contains all 10 forms (1 Phase 1 + 9 Phase 2) with full question structures
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
          "title": "What is your expected annual business income available for retirement savings?",
          "type": "PARAGRAPH_TEXT",
          "helpText": "Enter total amount you can save from your business",
          "required": true
        },
        {
          "index": 46,
          "title": "Does your employer offer a 401(k) retirement plan?",
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
          "title": "Does your employer match your 401(k) contributions?",
          "type": "MULTIPLE_CHOICE",
          "helpText": "",
          "required": true,
          "choices": [
            "Yes",
            "No"
          ]
        },
        {
          "index": 48,
          "title": "What percentage does your employer match?",
          "type": "TEXT",
          "helpText": "e.g., \"50% up to 6%\" or \"100% up to 3%\"",
          "required": false
        },
        {
          "index": 49,
          "title": "Does your employer 401(k) plan have a Roth option?",
          "type": "MULTIPLE_CHOICE",
          "helpText": "",
          "required": true,
          "choices": [
            "Yes",
            "No"
          ]
        },
        {
          "index": 50,
          "title": "Does your spouse work in your business (or plan to)?",
          "type": "MULTIPLE_CHOICE",
          "helpText": "",
          "required": true,
          "choices": [
            "Yes",
            "No"
          ]
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

// Export for use in other files if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CURRENT_FORMS };
}

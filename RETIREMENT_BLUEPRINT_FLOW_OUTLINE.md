# Retirement Blueprint - Comprehensive Flow Outline

## 🎯 Purpose Statement
The Retirement Blueprint is an intelligent financial planning tool that creates personalized retirement savings strategies. It analyzes individual circumstances, classifies users into one of 9 specific profiles, and generates optimal allocation recommendations across various investment vehicles (401k, IRA, HSA, CESA, etc.) while considering tax implications, contribution limits, and personal goals.

## 📊 User Perspective Flow

### Step 1: Initial Assessment (Phase 1 Form)
**Purpose**: Gather essential information to understand your current situation and classify you into the right planning profile

**What Users Do**:
- Complete initial questionnaire covering:
  - Personal info (age, contact details)
  - Employment status (W-2 employee, self-employed, both)
  - Business ownership details
  - ROBS (Rollover for Business Startups) interest/usage
  - Existing retirement accounts
  - Tax minimization priorities
  - Retirement timeline and urgency

**What Happens Behind the Scenes**:
- System classifies you into one of 9 specialized profiles
- Generates personalized Phase 2 form link
- Sends email with next steps

### Step 2: Deep Dive Assessment (Phase 2 Form)
**Purpose**: Collect detailed financial information specific to your profile for precise optimization

**What Users Do**:
- Complete profile-specific questionnaire covering:
  - Financial goals prioritization (Retirement, Education, Health)
  - Current retirement account balances
  - Monthly contribution capacity
  - Tax preference (Traditional vs Roth)
  - Additional profile-specific questions

**What Happens Behind the Scenes**:
- System captures detailed preferences
- Prepares data for allocation engine

### Step 3: Allocation Optimization
**Purpose**: Generate your personalized retirement savings strategy optimized for your specific situation

**The System Automatically**:
- Calculates available monthly investment capacity
- Applies IRS contribution limits
- Considers tax implications and phase-outs
- Runs profile-specific optimization algorithm
- Generates allocation recommendations

### Step 4: Receive Your Blueprint
**Purpose**: Get actionable recommendations on how to allocate your savings for maximum benefit

**What You Receive**:
- Detailed monthly allocation amounts for each investment vehicle
- Priority order for funding accounts
- Tax-optimized strategy based on your preferences
- Clear next steps for implementation

## 🛠️ Technical Flow

### Architecture Overview
```
Google Forms → Google Apps Script → Google Sheets Database
     ↓                    ↓                    ↓
  User Input      Processing Engine      Data Storage
                         ↓
                 Allocation Results
```

### Detailed Technical Flow

#### 1. Form Submission Handling
```javascript
onAnyFormSubmit(e) → Routes to appropriate handler
├── handlePhase1(e) - Initial form processing
│   ├── Copy submission to Working Sheet
│   ├── Notify administrator
│   ├── Track in Financial sheet
│   ├── classifyClientProfileFromWorkingSheet()
│   │   └── Determines 1 of 9 profiles based on rules
│   ├── Generate Phase 2 prefill URL
│   └── Send Phase 2 email to user
│
└── handlePhase2(e) - Detailed form processing
    ├── Copy submission to RawPhase2
    ├── Transfer to Working Sheet
    ├── Run allocation engine
    └── Generate results
```

#### 2. Profile Classification Logic
```
IF using ROBS → Profile 1: ROBS_In_Use
ELSE IF interested in ROBS AND meets all requirements → Profile 2: ROBS_Curious
ELSE IF has W-2 employees → Profile 8: Biz_Owner_Group
ELSE IF self-employed without employees → Profile 3: Solo401k_Builder
ELSE IF has Traditional IRA → Profile 4: Roth_Reclaimer
ELSE IF age ≥ 55 OR retiring soon → Profile 9: Late_Stage_Growth
ELSE IF age ≥ 50 AND needs catch-up → Profile 6: Catch_Up
ELSE IF tax focus is "Now" or "Both" → Profile 5: Bracket_Strategist
ELSE → Profile 7: Foundation_Builder
```

#### 3. Allocation Engine Process
```javascript
runUniversalEngine(rowNum)
├── Load user data from Working Sheet
├── Parse preferences and constraints
├── Call profile-specific helper function
│   └── profileHelpers[profileId](params)
├── Apply universal functions:
│   ├── calculateHsaMonthlyCapacity()
│   ├── calculateCesaMonthlyCapacity()
│   ├── addEmployer401kVehicles()
│   ├── applyRothIRAPhaseOut()
│   └── Tax preference functions
├── computeNetPool() - Available funds calculation
├── computeDomainsAndWeights() - Priority calculation
├── coreAllocate() - Waterfall allocation
└── Write results back to Working Sheet
```

#### 4. Key Components

**Profile Helpers** (9 total):
Each implements specific business logic for their user type, including:
- Vehicle priority ordering
- Contribution limit calculations
- Tax optimization strategies
- Special rules (e.g., ROBS restrictions, catch-up contributions)

**Universal Functions**:
- HSA capacity based on coverage type and age
- CESA capacity with $2000/child annual limit
- Employer 401(k) matching calculations
- Roth IRA income phase-out calculations
- Tax preference prioritization

**Allocation Algorithm**:
1. Calculate total available monthly funds
2. Prioritize domains (Retirement/Education/Health) based on user goals
3. Within each domain, fill vehicles in priority order
4. Respect all IRS contribution limits
5. Apply tax optimization strategies
6. Handle employer matching optimally

#### 5. Data Model

**Working Sheet Columns** (Key fields):
- Personal: Name, Email, Age, Student ID
- Classification: Profile ID, Various tags
- Phase 2 Inputs: Goals, Balances, Contributions
- Computed: Tax preferences, Allocation results
- Admin: Timestamps, URLs, Status

**Integration Points**:
- Google Forms API (form creation/management)
- Google Sheets API (data storage/retrieval)
- Gmail API (email notifications)
- External Library: FinancialTruPathFunctionLibrary

### Error Handling & Validation
- Missing profile configuration checks
- Student ID validation against Financial sheet
- Contribution limit enforcement
- Data type validation throughout
- Admin notifications for exceptions

### Testing Infrastructure
- Comprehensive test suite in Testing.js
- Test data generation for all 9 profiles
- Individual and batch testing capabilities
- Header mapping diagnostics
- Result validation

## 💡 Key Benefits for Users

1. **Personalized Strategy**: Not one-size-fits-all, but tailored to your specific situation
2. **Tax Optimization**: Maximizes tax advantages based on current laws and your preferences
3. **Automated Complexity**: Handles IRS limits, phase-outs, and complex rules automatically
4. **Holistic Approach**: Considers retirement, education, and health savings together
5. **Actionable Output**: Clear monthly dollar amounts for each investment vehicle
6. **Professional-Grade**: Based on financial planning best practices and current regulations
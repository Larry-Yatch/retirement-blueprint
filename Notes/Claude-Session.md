  Current State Summary:
  - Branch: optimize-profile-helpers
  - Universal functions: ✅ Implemented (calculateHsaMonthlyCapacity, calculateCesaMonthlyCapacity, applyRothIRAPhaseOut, prioritizeTraditionalAccounts,
  prioritizeRothAccounts)
  - Foundation Builder: ~90% complete (needs 401k catch-up)
  - Solo 401(k) Builder: ~80% complete (needs all catch-up logic)
  - Other helpers: ~60% complete (need employer 401k and various fixes)

  Key Files:
  - /Users/Larry/code/retirement-blueprint/Code.js - Main application code with profile helpers
  - /Users/Larry/code/retirement-blueprint/Testing.js - Test infrastructure
  - /Users/Larry/code/retirement-blueprint/Form_Management.js - Form handling (not modified)

  Critical Functions to Remember:
  - profileHelpers object contains all 9 helper functions
  - runUniversalEngine() is the main engine
  - addEmployer401kVehicles() adds employer plans dynamically
  - computeNetPool() calculates available allocation pool
  - coreAllocate() performs waterfall allocation

  Known Issues:
  - Output header comment had wrong indentation (fixed)
  - HSA appears in both retirement and health domains (needs cleanup)
  - Not all helpers use employer 401(k) options where appropriate

  Testing Commands:
  - createTestDataTab() - Creates test data sheet
  - runAllEngineTests() - Tests all 9 profiles
  - diagnoseWorkingSheetHeaders() - Debugs header issues


  Profile Helper Work List
  Comprehensive Profile Helper Implementation Strategy

  🎯 Core Implementation Principles

  Every Profile Helper Must:
  1. Use all 5 universal functions (HSA, CESA, Roth phase-out, tax preferences)
  2. Implement age-based catch-up contributions (50+ and 60+)
  3. Follow proper vehicle priority order for the profile's goals
  4. Handle edge cases (income limits, contribution caps)
  5. Provide appropriate default values

  ---
  1️⃣ Helper 1: ROBS-In-Use Strategist

  Profile Goal: Maximize retirement savings through existing C-corp ROBS
  structure

  Implementation Approach:
  // Already complete, but verify:
  - ✅ ROBS vehicles prioritized correctly
  - ✅ Profit distribution unlimited capacity
  - ✅ Tax preferences applied
  - ✅ Catch-up contributions
  - 🔍 TEST: Verify ROBS vehicles work with engine

  Key Retirement Planning Considerations:
  - ROBS profit distributions are tax-advantaged
  - Should prioritize Roth within ROBS for tax-free growth
  - HSA remains valuable for triple tax advantage

  ---
  2️⃣ Helper 2: ROBS-Curious Builder

  Profile Goal: Prepare for future ROBS implementation while maximizing current
   options

  Implementation Approach:
  // Already complete, but verify:
  - ✅ Solo 401(k) as placeholder for future ROBS
  - ✅ Tax preferences working
  - ✅ Catch-up contributions
  - 🔍 Consider: Should we add employer 401(k) option?

  Key Retirement Planning Considerations:
  - Building capital for future ROBS rollover
  - Solo 401(k) provides practice with self-directed retirement

  ---
  3️⃣ Helper 3: Solo 401(k) Builder ⭐ PRIORITY

  Profile Goal: Maximize self-employment retirement contributions

  Implementation Approach:
  // NEEDS WORK:
  1. Add catch-up logic:
     - Solo 401(k) employee: +$7,500 if age 50+
     - Solo 401(k) employer: No catch-up (percentage based)
     - IRA vehicles: +$1,000 if age 50+

  2. Enhance seeding logic:
     - If ex_q3 === 'Yes': Use ex_q4 (employee) and ex_q5 (employer)
     - If ex_q3 === 'No': Use ex_q6 for future contributions

  3. Vehicle order refinement:
     - Consider tax preference for Solo 401(k) Roth vs Traditional
     - HSA before or after Solo 401(k) based on health needs

  Key Retirement Planning Considerations:
  - Employee contributions have different limits than employer
  - Employer contributions limited to ~25% of compensation
  - Solo 401(k) allows both Roth and Traditional

  ---
  4️⃣ Helper 4: Roth IRA Reclaimer

  Profile Goal: Access Roth savings despite high income

  Implementation Approach:
  // Enhancement needed:
  1. Add employer 401(k) check:
     - If has employer plan with after-tax contributions
     - Add mega-backdoor Roth option ($69,000 limit)

  2. Optimize vehicle order:
     - Backdoor Roth IRA first
     - Mega-backdoor if available
     - HSA for additional tax advantage

  Key Retirement Planning Considerations:
  - High earners need backdoor strategies
  - Pro-rata rules may affect conversions
  - Mega-backdoor through 401(k) avoids pro-rata issues

  ---
  5️⃣ Helper 5: Bracket-Balanced Strategist

  Profile Goal: Reduce current taxes while maintaining Roth flexibility

  Implementation Approach:
  // Add employer 401(k) support:
  1. Call addEmployer401kVehicles() based on ex_q1-4
  2. Ensure Traditional vehicles come first:
     - Traditional 401(k) (employer or regular)
     - Traditional IRA
     - Then Roth options

  3. Tax preference should favor traditional

  Key Retirement Planning Considerations:
  - Current tax bracket reduction is priority
  - Some Roth for tax diversification
  - HSA provides additional deduction

  ---
  6️⃣ Helper 6: Catch-Up Visionary

  Profile Goal: Aggressive retirement savings for 50+ individuals

  Implementation Approach:
  // Already complete, verify:
  - ✅ Vehicles have catch-up built into caps
  - ✅ All universal functions applied
  - 🔍 Consider: Add employer 401(k) options?

  Key Retirement Planning Considerations:
  - Time is limited, maximize all available vehicles
  - Catch-up contributions are crucial
  - Balance tax strategies for near-term retirement

  ---
  7️⃣ Helper 7: Foundation Builder ⭐ NEARLY COMPLETE

  Profile Goal: Build retirement foundation with employer benefits

  Implementation Approach:
  // Final touches needed:
  1. Add 401(k) catch-up logic:
     - Check if employer vehicles were added
     - Apply +$7,500 catch-up to employee contribution

  2. Verify employer match logic:
     - Matching should be "free money" priority

  Key Retirement Planning Considerations:
  - Employer match is 100% return
  - Build emergency fund alongside retirement
  - Long time horizon allows risk-taking

  ---
  8️⃣ Helper 8: Business Owner with Employee Group

  Profile Goal: Maximize owner benefits within group plan constraints

  Implementation Approach:
  // Verify implementation:
  - ✅ Group 401(k) vehicles
  - ✅ Defined Benefit Plan option
  - ✅ Higher contribution limits

  Key Retirement Planning Considerations:
  - Non-discrimination testing limits
  - Defined benefit plans allow huge contributions
  - Must benefit employees too

  ---
  9️⃣ Helper 9: Late-Stage Growth Strategist

  Profile Goal: Final push for retirement readiness

  Implementation Approach:
  // Add employer 401(k) support:
  1. Call addEmployer401kVehicles()
  2. Ensure catch-up is applied to all vehicles
  3. Consider more conservative allocation

  Key Retirement Planning Considerations:
  - Limited time requires maximum contributions
  - Tax diversification still important
  - Healthcare costs approaching

  ---
  📋 Implementation Order

  Week 1: High-Impact Fixes
  1. Helper 3 (Solo 401k) - Add catch-up logic
  2. Helper 7 (Foundation) - Add 401k catch-up
  3. Test both thoroughly

  Week 2: Employer 401(k) Additions
  4. Helper 5 (Bracket-Balanced) - Add employer options
  5. Helper 4 (Roth Reclaimer) - Add mega-backdoor
  6. Helper 9 (Late-Stage) - Add employer options

  Week 3: Verification & Testing
  7. Verify helpers 1, 2, 6, 8 still work correctly
  8. Build comprehensive test suite
  9. Fix header management
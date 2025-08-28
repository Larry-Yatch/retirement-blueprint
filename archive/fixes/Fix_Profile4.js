/**
 * Fix for Profile 4 (Roth Reclaimer) employer 401k handling
 * 
 * This fix replaces the addEmployer401kVehicles() calls with custom logic
 * that reads from Profile 4's specific field positions (ex_q5-q8)
 */

// Here's the fixed section for Profile 4 that should replace lines ~1398-1405 and ~1500-1507

// For W-2 Employee only section (around line 1398):
/*
      // 1. Get employer match first (free money)
      if (hasEmployer401k && hasEmployerMatch) {
        // Profile 4 specific: Read match from ex_q7
        const matchPercentage = getValue(hdr, rowArr, HEADERS.P2_EX_Q7) || '';
        
        if (matchPercentage) {
          // Calculate match capacity
          let matchCap = 0;
          const match = matchPercentage.match(/(\d+)%\s*up to\s*(\d+)%/);
          if (match) {
            const matchRate = Number(match[1]) / 100;
            const matchLimit = Number(match[2]) / 100;
            matchCap = Math.round(grossIncome * matchLimit / 12);
          }
          
          baseRetirementOrder.push({ 
            name: `401(k) Match Traditional (${matchPercentage})`,
            capMonthly: matchCap
          });
        }
      }
*/

// For Both W-2 and Self-Employed section (around line 1500):
/*
      // 1. 401(k) Match (W-2)
      if (hasEmployer401k && hasEmployerMatch) {
        // Profile 4 specific: Read match from ex_q7
        const matchPercentage = getValue(hdr, rowArr, HEADERS.P2_EX_Q7) || '';
        
        if (matchPercentage) {
          // Calculate match capacity
          let matchCap = 0;
          const match = matchPercentage.match(/(\d+)%\s*up to\s*(\d+)%/);
          if (match) {
            const matchRate = Number(match[1]) / 100;
            const matchLimit = Number(match[2]) / 100;
            matchCap = Math.round(grossIncome * matchLimit / 12);
          }
          
          baseRetirementOrder.push({ 
            name: `401(k) Match Traditional (${matchPercentage})`,
            capMonthly: matchCap
          });
        }
      }
*/

// FULL REPLACEMENT CODE for the entire Profile 4 function:
function generateProfile4RothReclaimerFixed() {
  return function(rowArr, hdr) {
    const hsaElig = getValue(hdr, rowArr, HEADERS.P2_HSA_ELIGIBILITY) === 'Yes';
    const numKids = Number(getValue(hdr, rowArr, HEADERS.P2_CESA_NUM_CHILDREN)) || 0;
    const age = Number(getValue(hdr, rowArr, HEADERS.CURRENT_AGE));
    const filing = getValue(hdr, rowArr, HEADERS.FILING_STATUS);
    const grossIncome = Number(getValue(hdr, rowArr, HEADERS.GROSS_ANNUAL_INCOME)) || 95000;
    
    // Get tax preference and backdoor Roth info
    const taxFocus = getValue(hdr, rowArr, HEADERS.TAX_MINIMIZATION);
    const tradIRABalance = Number(getValue(hdr, rowArr, HEADERS.P2_EX_Q1)) || 0;
    const can401kAcceptRollins = getValue(hdr, rowArr, HEADERS.P2_EX_Q2) === 'Yes';
    
    // Get employment situation
    const workSituation = getValue(hdr, rowArr, HEADERS.WORK_SITUATION);
    const isSelfEmployed = workSituation === 'Self-employed' || workSituation === 'Both';
    const isW2Employee = workSituation === 'W-2 employee' || workSituation === 'Both';
    const isBoth = workSituation === 'Both';
    
    // Get employer 401(k) info - Profile 4 specific positions
    const hasEmployer401k = getValue(hdr, rowArr, HEADERS.P2_EX_Q5) === 'Yes';
    const hasEmployerMatch = getValue(hdr, rowArr, HEADERS.P2_EX_Q6) === 'Yes';
    const matchPercentage = getValue(hdr, rowArr, HEADERS.P2_EX_Q7) || '';
    const hasRoth401k = getValue(hdr, rowArr, HEADERS.P2_EX_Q8) === 'Yes';
    
    // Calculate monthly capacities using utility functions
    const hsaCap = calculateHsaMonthlyCapacity(hsaElig, age, filing);
    const cesaCap = calculateCesaMonthlyCapacity(numKids);
    
    // Initialize seeds
    const seeds = { Education: {}, Health: {}, Retirement: {} };
    if (tradIRABalance > 0) {
      seeds.Retirement['Traditional IRA Balance'] = tradIRABalance;
    }
    
    // Education vehicles (simplified)
    const educationOrder = (numKids > 0
      ? [{ name: 'Combined CESA', capMonthly: cesaCap }]
      : []
    ).concat({ name: 'Education Bank', capMonthly: Infinity });

    // Health vehicles
    const healthOrder = (hsaElig
      ? [{ name: 'HSA', capMonthly: hsaCap }]
      : []
    ).concat({ name: 'Health Bank', capMonthly: Infinity });

    // Build retirement order based on employment situation
    let baseRetirementOrder = [];
    
    // Calculate 401(k) employee limits with catch-up
    let employee401kCap = LIMITS.RETIREMENT.EMPLOYEE_401K / 12;
    if (age >= 50) {
      const catchup401k = age >= 60 ? LIMITS.RETIREMENT.CATCHUP_401K_60 : LIMITS.RETIREMENT.CATCHUP_401K_50;
      employee401kCap = (LIMITS.RETIREMENT.EMPLOYEE_401K + catchup401k) / 12;
    }
    
    // Calculate IRA limits with catch-up
    let iraCap = LIMITS.RETIREMENT.TRADITIONAL_IRA / 12;
    if (age >= 50) {
      iraCap = (LIMITS.RETIREMENT.TRADITIONAL_IRA + LIMITS.RETIREMENT.CATCHUP_IRA) / 12;
    }
    
    // Determine if backdoor Roth is needed
    const canDoBackdoor = tradIRABalance === 0 || can401kAcceptRollins;
    
    // Check if income allows direct Roth contributions
    const rothPhaseout = applyRothIRAPhaseOut([{ name: 'Roth IRA', capMonthly: iraCap }], {
      grossIncome,
      filingStatus: filing,
      taxFocus
    });
    const canDoDirectRoth = rothPhaseout.length > 0 && rothPhaseout[0].capMonthly > 0;
    
    // Branch based on employment situation
    if (isW2Employee && !isBoth) {
      // W-2 Employee only
      // 1. Get employer match first (free money)
      if (hasEmployer401k && hasEmployerMatch && matchPercentage) {
        // Calculate match capacity
        let matchCap = 0;
        const match = matchPercentage.match(/(\d+)%\s*up to\s*(\d+)%/);
        if (match) {
          const matchRate = Number(match[1]) / 100;
          const matchLimit = Number(match[2]) / 100;
          matchCap = Math.round(grossIncome * matchLimit / 12);
        }
        
        if (matchCap > 0) {
          baseRetirementOrder.push({ 
            name: `401(k) Match Traditional (${matchPercentage})`,
            capMonthly: matchCap
          });
        }
      }
      
      // 2. HSA (triple tax advantage)
      if (hsaElig) {
        baseRetirementOrder.push({ name: 'HSA', capMonthly: hsaCap });
      }
      
      // 3. Backdoor Roth IRA (prioritized for Roth-focused profile)
      if (!canDoDirectRoth) {
        // Need backdoor due to income limits
        if (tradIRABalance > 0) {
          if (can401kAcceptRollins) {
            baseRetirementOrder.push({ 
              name: 'Backdoor Roth IRA', 
              capMonthly: iraCap,
              note: 'Backdoor Roth: 1) Contribute to Traditional IRA (non-deductible) 2) Roll existing IRA to 401(k) 3) Convert to Roth tax-free'
            });
          } else {
            baseRetirementOrder.push({ 
              name: 'Backdoor Roth IRA', 
              capMonthly: iraCap,
              note: 'Backdoor Roth with pro-rata tax: 1) Contribute to Traditional IRA 2) Convert to Roth (taxable due to existing IRA balance)'
            });
          }
        } else {
          // Clean backdoor possible - no IRA balance
          baseRetirementOrder.push({ 
            name: 'Backdoor Roth IRA', 
            capMonthly: iraCap,
            note: 'Backdoor Roth: 1) Contribute to Traditional IRA (non-deductible) 2) Convert to Roth immediately (tax-free)'
          });
        }
      } else if (canDoDirectRoth) {
        // Income allows direct Roth
        baseRetirementOrder.push({ name: 'Roth IRA', capMonthly: iraCap });
      }
      
      // 4. 401(k) Roth (if available)
      if (hasEmployer401k && hasRoth401k) {
        baseRetirementOrder.push({ name: '401(k) Roth', capMonthly: employee401kCap });
      }
      
      // 5. Traditional 401(k) for additional tax-deferred savings
      if (hasEmployer401k) {
        baseRetirementOrder.push({ name: 'Traditional 401(k)', capMonthly: employee401kCap });
      }
      
      // 6. Traditional IRA as fallback
      baseRetirementOrder.push({ name: 'Traditional IRA', capMonthly: iraCap });
      
    } else if (isSelfEmployed && !isBoth) {
      // Self-Employed only
      // 1. HSA first
      if (hsaElig) {
        baseRetirementOrder.push({ name: 'HSA', capMonthly: hsaCap });
      }
      
      // 2. Solo 401(k) – Employee Roth (Roth-focused profile)
      baseRetirementOrder.push({ name: 'Solo 401(k) – Employee Roth', capMonthly: employee401kCap });
      
      // 3. Solo 401(k) – Employer
      const employerCap = Math.round(grossIncome * 0.20 / 12); // Simplified 20% calculation
      baseRetirementOrder.push({ name: 'Solo 401(k) – Employer', capMonthly: employerCap });
      
      // 4. Backdoor Roth IRA (prioritized above traditional vehicles)
      if (!canDoDirectRoth) {
        // Same backdoor logic as W-2
        if (tradIRABalance > 0) {
          baseRetirementOrder.push({ 
            name: 'Backdoor Roth IRA', 
            capMonthly: iraCap,
            note: canDoBackdoor ? 'Roll IRA to Solo 401(k) first for clean conversion' : 'Pro-rata taxes apply'
          });
        } else {
          baseRetirementOrder.push({ 
            name: 'Backdoor Roth IRA', 
            capMonthly: iraCap,
            note: 'Clean conversion - no existing IRA balance'
          });
        }
      } else {
        baseRetirementOrder.push({ name: 'Roth IRA', capMonthly: iraCap });
      }
      
      // 5. After-tax Solo 401(k) → Mega Backdoor Roth
      baseRetirementOrder.push({ 
        name: 'After-Tax Solo 401(k) → Mega Backdoor Roth', 
        capMonthly: 5833,  // ~$70k/year
        note: 'If plan allows'
      });
      
      // 6. Traditional IRA as fallback
      baseRetirementOrder.push({ name: 'Traditional IRA', capMonthly: iraCap });
      
    } else if (isBoth) {
      // Both W-2 and Self-Employed
      // 1. 401(k) Match (W-2)
      if (hasEmployer401k && hasEmployerMatch && matchPercentage) {
        // Calculate match capacity
        let matchCap = 0;
        const match = matchPercentage.match(/(\d+)%\s*up to\s*(\d+)%/);
        if (match) {
          const matchRate = Number(match[1]) / 100;
          const matchLimit = Number(match[2]) / 100;
          matchCap = Math.round(grossIncome * matchLimit / 12);
        }
        
        if (matchCap > 0) {
          baseRetirementOrder.push({ 
            name: `401(k) Match Traditional (${matchPercentage})`,
            capMonthly: matchCap
          });
        }
      }
      
      // 2. HSA
      if (hsaElig) {
        baseRetirementOrder.push({ name: 'HSA', capMonthly: hsaCap });
      }
      
      // 3. Backdoor Roth IRA
      if (!canDoDirectRoth) {
        baseRetirementOrder.push({ 
          name: 'Backdoor Roth IRA', 
          capMonthly: iraCap,
          note: tradIRABalance > 0 ? 'Consider rolling to 401(k) first' : 'Clean conversion'
        });
      } else {
        baseRetirementOrder.push({ name: 'Roth IRA', capMonthly: iraCap });
      }
      
      // 4. Coordinate 401(k) limits between employer and Solo
      if (hasEmployer401k && hasRoth401k) {
        baseRetirementOrder.push({ name: '401(k) Roth', capMonthly: employee401kCap / 2 });
      }
      baseRetirementOrder.push({ name: 'Solo 401(k) – Employee', capMonthly: employee401kCap / 2 });
      
      // 5. Solo 401(k) Employer
      const employerCap = Math.round(grossIncome * 0.20 / 12);
      baseRetirementOrder.push({ name: 'Solo 401(k) – Employer', capMonthly: employerCap });
      
      // 6. Mega Backdoor if available
      baseRetirementOrder.push({ 
        name: 'After-Tax Solo 401(k) → Mega Backdoor Roth', 
        capMonthly: 2917  // Half of solo limit
      });
    }
    
    // Add overflow bank
    baseRetirementOrder.push({ name: 'Family Bank', capMonthly: Infinity });
    
    // Apply tax preference adjustments if needed
    let retirementOrder = baseRetirementOrder;
    
    if (taxFocus === 'Now') {
      retirementOrder = prioritizeTraditionalAccounts(baseRetirementOrder);
    } else if (taxFocus === 'Later') {
      retirementOrder = prioritizeRothAccounts(baseRetirementOrder);
    }
    
    return {
      seeds,
      vehicleOrders: {
        Education: educationOrder,
        Health: healthOrder,
        Retirement: retirementOrder
      }
    };
  };
}
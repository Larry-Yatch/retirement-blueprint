// ═══════════════════════════════════════════════════════════════════════════════
// NARRATIVE ENHANCEMENT FUNCTIONS FOR DOCUMENT GENERATION
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Generate opening narrative based on client data
 */
function generateOpeningNarrative(rowData, hdr) {
  const firstName = (rowData[hdr['Full_Name']] || '').split(' ')[0];
  const age = rowData[hdr['Current_Age']];
  const workSituation = rowData[hdr['Work_Situation']];
  const profileId = rowData[hdr['ProfileID']];
  const profileConfig = PROFILE_CONFIG[profileId];
  
  let narrative = `Dear ${firstName},\n\n`;
  
  // Age-based opening
  if (age < 35) {
    narrative += `At ${age}, you're at an ideal stage to build a powerful financial foundation. `;
  } else if (age < 50) {
    narrative += `At ${age}, you're in your peak earning years with significant opportunities to accelerate your wealth building. `;
  } else if (age < 60) {
    narrative += `At ${age}, you've entered a critical phase where strategic decisions can dramatically impact your retirement security. `;
  } else {
    narrative += `At ${age}, you're approaching or in retirement with important opportunities to optimize and protect your wealth. `;
  }
  
  // Work situation context
  if (workSituation === 'Self-employed') {
    narrative += `As a self-employed professional, you have unique control over your retirement strategy. `;
  } else if (workSituation === 'W-2 employee') {
    narrative += `As an employee, you have access to valuable workplace benefits that we'll help you maximize. `;
  } else if (workSituation === 'Both') {
    narrative += `With both employment and self-employment income, you have exceptional opportunities to diversify your retirement savings. `;
  }
  
  narrative += `\n\nThis personalized Retirement Blueprint has been crafted specifically for your situation as a ${profileConfig.title}. `;
  narrative += `We've analyzed your current financial position, understood your priorities, and designed a strategy that aligns with your goals.`;
  
  return narrative;
}

/**
 * Generate Phase 1 narrative - Current Situation Story
 */
function generatePhase1Narrative(rowData, hdr) {
  const income = formatCurrency(rowData[hdr['gross_annual_income']]);
  const netMonthly = formatCurrency(rowData[hdr['Net_Monthly_Income']]);
  const savingsRate = rowData[hdr['Allocation_Percentage']] + '%';
  const filingStatus = rowData[hdr['filing_status']];
  const retirementTimeframe = rowData[hdr['Retirement_Timeframe']];
  const actionMotivation = rowData[hdr['Action_Motivation']];
  
  let narrative = `## Understanding Your Current Path\n\n`;
  
  // Financial snapshot narrative
  narrative += `With an annual income of ${income} and monthly net income of ${netMonthly}, `;
  narrative += `you've committed to saving ${savingsRate} of your income for the future. `;
  
  // Tax situation
  if (filingStatus === 'Single') {
    narrative += `As a single filer, we'll help you maximize individual contribution limits and tax advantages. `;
  } else if (filingStatus === 'Married Filing Jointly') {
    narrative += `Filing jointly provides opportunities for higher contribution limits and coordinated tax strategies. `;
  }
  
  // Urgency and motivation
  if (retirementTimeframe === 'Less than 5 years') {
    narrative += `\n\nWith retirement approaching soon, every decision counts. `;
  } else if (retirementTimeframe === '5-10 years') {
    narrative += `\n\nWith 5-10 years until retirement, you're in the critical accumulation phase. `;
  } else {
    narrative += `\n\nWith over 10 years until retirement, time is your greatest asset. `;
  }
  
  if (actionMotivation === 'Urgent - Need to act now') {
    narrative += `Your sense of urgency is well-founded, and we're here to help you take immediate, effective action.`;
  } else {
    narrative += `Your proactive approach to planning will pay significant dividends over time.`;
  }
  
  return narrative;
}

/**
 * Generate Phase 2 narrative - Priorities and Goals
 */
function generatePhase2Narrative(rowData, hdr) {
  const retirementImportance = rowData[hdr['retirement_importance']];
  const educationImportance = rowData[hdr['education_importance']];
  const healthImportance = rowData[hdr['health_importance']];
  const hasChildren = rowData[hdr['cesa_num_children']] > 0;
  const hsaEligible = rowData[hdr['hsa_eligibility']] === 'Yes';
  const investmentConfidence = rowData[hdr['investment_confidence']];
  
  let narrative = `## Your Priorities and Vision\n\n`;
  
  // Investment philosophy
  const confidenceLevel = parseInt(investmentConfidence) || 4;
  if (confidenceLevel >= 6) {
    narrative += `Your high investment confidence (${confidenceLevel}/7) indicates you're ready for sophisticated strategies. `;
  } else if (confidenceLevel >= 4) {
    narrative += `Your moderate investment confidence (${confidenceLevel}/7) suggests a balanced approach with room for growth. `;
  } else {
    narrative += `We'll help build your investment confidence (currently ${confidenceLevel}/7) through education and gradual implementation. `;
  }
  
  // Domain priorities
  const priorities = [
    { domain: 'retirement', importance: parseInt(retirementImportance) || 0 },
    { domain: 'education', importance: parseInt(educationImportance) || 0 },
    { domain: 'health', importance: parseInt(healthImportance) || 0 }
  ].sort((a, b) => b.importance - a.importance);
  
  narrative += `\n\nYour priorities are clear: `;
  
  if (priorities[0].domain === 'retirement') {
    narrative += `Retirement security is your top priority, `;
  } else if (priorities[0].domain === 'education' && hasChildren) {
    narrative += `Funding your children's education is your top priority, `;
  } else if (priorities[0].domain === 'health') {
    narrative += `Health security and medical expense planning is your top priority, `;
  }
  
  narrative += `and we've designed your strategy accordingly. `;
  
  // Specific goals
  const desiredRetirement = rowData[hdr['retirement_desired_monthly_income']];
  if (desiredRetirement) {
    narrative += `Your goal of ${formatCurrency(desiredRetirement)} monthly retirement income guides our recommendations. `;
  }
  
  return narrative;
}

/**
 * Generate results interpretation narrative
 */
function generateResultsNarrative(rowData, hdr) {
  const actualTotal = calculateTotalMonthly(rowData, hdr, 'actual');
  const idealTotal = calculateTotalMonthly(rowData, hdr, 'ideal');
  const difference = idealTotal - actualTotal;
  const percentIncrease = actualTotal > 0 ? ((difference / actualTotal) * 100).toFixed(0) : 100;
  
  let narrative = `## Your Optimization Opportunity\n\n`;
  
  if (difference > 0) {
    narrative += `By optimizing your allocation strategy, you can increase your monthly contributions by ${formatCurrency(difference)} `;
    narrative += `(a ${percentIncrease}% improvement) while maximizing tax advantages. `;
  } else if (difference === 0) {
    narrative += `Congratulations! You're already optimizing your contributions effectively. `;
    narrative += `Our recommendations confirm your current strategy while ensuring you're not missing any opportunities. `;
  }
  
  // Future value impact
  const retirementFvActual = parseFloat(rowData[hdr['retirement_fv_actual']]) || 0;
  const retirementFvIdeal = parseFloat(rowData[hdr['retirement_fv_ideal']]) || 0;
  const fvDifference = retirementFvIdeal - retirementFvActual;
  
  if (fvDifference > 1000000) {
    narrative += `\n\nThis optimization could mean an additional ${formatCurrency(fvDifference)} in retirement savings - `;
    narrative += `that's over a million dollars in additional wealth for your future. `;
  } else if (fvDifference > 100000) {
    narrative += `\n\nOver time, this strategy could generate an additional ${formatCurrency(fvDifference)} for retirement. `;
  }
  
  return narrative;
}

/**
 * Generate action steps narrative
 */
function generateActionStepsNarrative(rowData, hdr, recommendations) {
  let narrative = `## Your Immediate Action Plan\n\n`;
  
  narrative += `Based on your unique situation, here are your priority actions:\n\n`;
  
  // Get top 3 recommendations by ideal amount
  const topActions = recommendations
    .filter(r => r.ideal > r.actual)
    .sort((a, b) => (b.ideal - b.actual) - (a.ideal - a.actual))
    .slice(0, 3);
  
  topActions.forEach((action, index) => {
    narrative += `${index + 1}. **${action.name}**: `;
    
    if (action.actual === 0) {
      narrative += `Open and fund with ${formatCurrency(action.ideal)} monthly. `;
    } else {
      narrative += `Increase from ${formatCurrency(action.actual)} to ${formatCurrency(action.ideal)} monthly. `;
    }
    
    // Add specific guidance
    if (action.name.includes('401(k) Match')) {
      narrative += `This is free money from your employer - make this your #1 priority. `;
    } else if (action.name.includes('HSA')) {
      narrative += `Triple tax advantage makes this incredibly valuable for long-term growth. `;
    } else if (action.name.includes('Backdoor')) {
      narrative += `This strategy reclaims Roth benefits despite income limits. `;
    }
    
    narrative += `\n\n`;
  });
  
  return narrative;
}

/**
 * Generate profile-specific narrative section
 */
function generateProfileNarrative(profileId, rowData, hdr) {
  const narratives = {
    '1_ROBS_In_Use': generateROBSInUseNarrative,
    '2_ROBS_Curious': generateROBSCuriousNarrative,
    '3_Solo401k_Builder': generateSolo401kNarrative,
    '4_Roth_Reclaimer': generateRothReclaimerNarrative,
    '5_Bracket_Strategist': generateBracketStrategistNarrative,
    '6_Catch_Up': generateCatchUpNarrative,
    '7_Foundation_Builder': generateFoundationBuilderNarrative,
    '8_Biz_Owner_Group': generateBizOwnerNarrative,
    '9_Late_Stage_Growth': generateLateStageNarrative
  };
  
  const narrativeFunction = narratives[profileId];
  if (narrativeFunction) {
    return narrativeFunction(rowData, hdr);
  }
  
  return '';
}

// Profile-specific narrative generators

function generateROBSInUseNarrative(rowData, hdr) {
  const profitDistribution = rowData[hdr['ex_q6']];
  const contributionType = rowData[hdr['ex_q3']];
  
  let narrative = `## Your ROBS Advantage\n\n`;
  narrative += `You've taken the entrepreneurial leap, using your retirement funds to build your business through a ROBS structure. `;
  narrative += `This positions you uniquely in the retirement planning landscape.\n\n`;
  
  if (profitDistribution) {
    narrative += `With projected annual profit distributions of ${formatCurrency(profitDistribution)}, `;
    narrative += `you have virtually unlimited contribution capacity - a massive advantage over traditional retirement savers. `;
  }
  
  narrative += `\n\nYour C-corporation structure allows you to contribute far beyond normal limits, `;
  narrative += `turning business profits into tax-advantaged retirement savings. `;
  
  if (contributionType === 'Roth only') {
    narrative += `Your preference for Roth contributions will create tax-free wealth for retirement. `;
  } else if (contributionType === 'Traditional only') {
    narrative += `Your traditional contributions provide immediate tax deductions to fuel business growth. `;
  } else {
    narrative += `Your balanced approach between Roth and traditional gives you tax flexibility. `;
  }
  
  return narrative;
}

function generateROBSCuriousNarrative(rowData, hdr) {
  const rolloverBalance = rowData[hdr['ex_q5']];
  const businessSavings = rowData[hdr['ex_q6']];
  
  let narrative = `## Exploring Your ROBS Potential\n\n`;
  narrative += `You're considering one of the most powerful strategies for entrepreneurial wealth building. `;
  
  if (rolloverBalance) {
    narrative += `With ${formatCurrency(rolloverBalance)} available for rollover, `;
    narrative += `you have substantial capital to launch or acquire a business while maintaining tax advantages. `;
  }
  
  narrative += `\n\nA ROBS structure could transform your retirement savings into active business capital, `;
  narrative += `potentially accelerating wealth creation beyond traditional investment returns. `;
  
  if (businessSavings) {
    narrative += `Your projected business savings of ${formatCurrency(businessSavings)} annually `;
    narrative += `could flow into your Solo 401(k) with no contribution limits. `;
  }
  
  return narrative;
}

// ... Continue with other profile narratives ...

/**
 * Export functions for use in Document_Generation.js
 */
if (typeof module !== 'undefined') {
  module.exports = {
    generateOpeningNarrative,
    generatePhase1Narrative,
    generatePhase2Narrative,
    generateResultsNarrative,
    generateActionStepsNarrative,
    generateProfileNarrative
  };
}
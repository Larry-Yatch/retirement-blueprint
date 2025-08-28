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
  
  // Add more context about the process
  narrative += `\n\nThrough our comprehensive analysis, we've examined over 15 different investment vehicles, calculated personalized growth projections based on your unique profile, and identified specific opportunities that could significantly enhance your financial future. `;
  narrative += `This isn't a generic plan – every recommendation has been tailored to your specific circumstances, tax situation, and long-term objectives.`;
  
  // Add urgency or encouragement based on age
  if (age < 40) {
    narrative += `\n\nThe decisions you make today will compound exponentially over the next ${65 - age} years. `;
    narrative += `By taking action now, you're positioning yourself for extraordinary long-term wealth building that many people miss by waiting too long.`;
  } else if (age < 55) {
    narrative += `\n\nYou're in a powerful position to make strategic moves that can dramatically improve your retirement readiness. `;
    narrative += `The next decade represents your peak earning and saving opportunity – let's make it count.`;
  } else {
    narrative += `\n\nWhile others might think it's too late to make meaningful changes, we know better. `;
    narrative += `Strategic optimization at this stage can still create substantial improvements in your retirement security and legacy planning.`;
  }
  
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
  
  // Add current savings analysis
  const actualTotal = Number(rowData[hdr['retirement_traditional_401k_actual']]) || 0;
  const netIncome = Number(rowData[hdr['Net_Monthly_Income']]) || 0;
  const currentSavingsRate = netIncome > 0 ? (actualTotal / netIncome * 100).toFixed(1) : 0;
  
  narrative += `\n\nCurrently, you're saving approximately ${currentSavingsRate}% of your net income toward retirement. `;
  
  if (currentSavingsRate >= 15) {
    narrative += `This puts you well ahead of most Americans, but there's still room to optimize where these dollars go for maximum tax efficiency and growth. `;
  } else if (currentSavingsRate >= 10) {
    narrative += `While this is a solid foundation, increasing your savings rate even modestly can have dramatic long-term impacts on your wealth. `;
  } else {
    narrative += `There's significant opportunity to accelerate your wealth building by gradually increasing this percentage and optimizing your vehicle selection. `;
  }
  
  // Add context about their current tax situation  
  narrative += `\n\nYour current tax situation provides specific opportunities we'll leverage. `;
  const age = Number(rowData[hdr['Current_Age']]) || 0;
  if (age >= 50) {
    narrative += `Being ${age} years old, you have access to valuable catch-up contribution limits that can accelerate your wealth building in these critical years. `;
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
  
  // Add more context about their priorities
  narrative += `\n\nUnderstanding these priorities allows us to create a strategy that balances your immediate needs with long-term wealth building. `;
  
  // Add investment time and involvement context
  const invTime = Number(rowData[hdr['investment_time']]) || 4;
  const invInvolvement = Number(rowData[hdr['investment_involvement']]) || 4;
  
  if (invTime >= 5 && invInvolvement >= 5) {
    narrative += `Your willingness to dedicate time and be actively involved in your investments opens doors to more sophisticated strategies that can significantly enhance returns. `;
  } else if (invTime <= 3 || invInvolvement <= 3) {
    narrative += `We've designed a streamlined approach that respects your time constraints while still maximizing growth opportunities. `;
  }
  
  // HSA context if eligible
  if (hsaEligible) {
    narrative += `\n\nYour HSA eligibility is a hidden gem in your retirement strategy. This "triple tax advantage" vehicle can serve as a powerful supplemental retirement account, growing tax-free for decades. `;
  }
  
  // Children/education context
  if (hasChildren) {
    const numChildren = Number(rowData[hdr['cesa_num_children']]) || 0;
    narrative += `\n\nBalancing retirement savings with education funding for your ${numChildren} ${numChildren === 1 ? 'child' : 'children'} requires careful planning. `;
    narrative += `We'll show you how to optimize both goals without sacrificing your own financial security. `;
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
    narrative += `To put this in perspective, this could mean the difference between a modest retirement and true financial freedom - `;
    narrative += `the ability to travel, support family, pursue passions, and leave a meaningful legacy. `;
  } else if (fvDifference > 100000) {
    narrative += `\n\nOver time, this strategy could generate an additional ${formatCurrency(fvDifference)} for retirement. `;
    narrative += `This isn't just a number – it represents years of additional financial security and flexibility in your golden years. `;
  }
  
  // Add tax efficiency context
  narrative += `\n\nBeyond the raw numbers, our strategy emphasizes tax efficiency at every level. `;
  narrative += `By strategically utilizing tax-advantaged accounts, you'll keep more of what you earn and accelerate your wealth building through compound growth. `;
  
  // Add context about the optimization
  const yearlyIncrease = difference * 12;
  if (yearlyIncrease > 0) {
    narrative += `\n\nThe additional ${formatCurrency(yearlyIncrease)} per year we've identified isn't about dramatic lifestyle changes. `;
    narrative += `It's about redirecting money you're already planning to save into more efficient vehicles that work harder for your future. `;
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
      narrative += `Every dollar you don't capture is a 100% guaranteed loss of return. `;
    } else if (action.name.includes('HSA')) {
      narrative += `Triple tax advantage makes this incredibly valuable for long-term growth. `;
      narrative += `Tax-deductible going in, tax-free growth, and tax-free withdrawals for medical expenses - no other account offers this combination. `;
    } else if (action.name.includes('Backdoor')) {
      narrative += `This strategy reclaims Roth benefits despite income limits. `;
      narrative += `While it requires a few extra steps, the long-term tax savings make it absolutely worth the effort. `;
    } else if (action.name.includes('Solo 401(k)')) {
      narrative += `As a self-employed individual, this gives you the highest contribution limits available. `;
      narrative += `You can contribute as both employee AND employer, potentially sheltering $70,000+ annually. `;
    } else if (action.name.includes('Traditional IRA')) {
      narrative += `Immediate tax deduction provides instant savings to reinvest for growth. `;
    } else if (action.name.includes('Roth IRA')) {
      narrative += `Tax-free growth and withdrawals in retirement - especially powerful if you expect higher future tax rates. `;
    }
    
    narrative += `\n\n`;
  });
  
  // Add implementation guidance
  narrative += `\n## Implementation Strategy\n\n`;
  narrative += `Start with the highest-impact changes first. Even if you can't implement everything immediately, each step forward compounds over time. `;
  narrative += `We recommend setting up automatic contributions to ensure consistency and remove the temptation to skip months. `;
  
  // Add timeline context
  narrative += `\n\nMost of these changes can be implemented within 30 days. `;
  narrative += `Contact your HR department or benefits administrator for employer-sponsored plans, and work with a reputable custodian for IRAs and HSAs. `;
  narrative += `The key is to start – even partial implementation beats analysis paralysis. `;
  
  // Add motivation
  const age = Number(rowData[hdr['Current_Age']]) || 35;
  const yearsToRetirement = Math.max(65 - age, 5);
  narrative += `\n\nRemember: You have approximately ${yearsToRetirement} years until traditional retirement age. `;
  narrative += `Every month you delay is a month of compound growth lost forever. `;
  narrative += `The best time to plant a tree was 20 years ago; the second-best time is today.`;
  
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

function generateSolo401kNarrative(rowData, hdr) {
  let narrative = `## Your Solo 401(k) Advantage\n\n`;
  narrative += `As a self-employed professional, you have access to one of the most powerful retirement vehicles available. `;
  narrative += `The Solo 401(k) allows you to contribute as both employee AND employer, potentially sheltering more than $70,000 annually from taxes.\n\n`;
  
  const businessIncome = rowData[hdr['business_income']] || rowData[hdr['gross_annual_income']];
  if (businessIncome) {
    narrative += `With your business income, you can maximize both employee deferrals and employer profit-sharing contributions. `;
    narrative += `This dual contribution structure can accelerate your retirement savings far beyond what traditional employees can achieve. `;
  }
  
  narrative += `\n\nThe flexibility of self-employment combined with the Solo 401(k)'s generous limits creates an unparalleled opportunity for wealth building.`;
  return narrative;
}

function generateRothReclaimerNarrative(rowData, hdr) {
  let narrative = `## Reclaiming Your Roth Benefits\n\n`;
  narrative += `High income doesn't have to mean losing access to Roth benefits. `;
  narrative += `Through strategic planning and the backdoor Roth IRA strategy, you can still build tax-free retirement wealth.\n\n`;
  
  narrative += `The key is understanding and navigating the rules correctly. `;
  narrative += `By converting traditional IRA contributions to Roth, you bypass income limits while building a tax-free retirement bucket. `;
  narrative += `This strategy becomes even more powerful when combined with workplace retirement plans.`;
  
  return narrative;
}

function generateBracketStrategistNarrative(rowData, hdr) {
  let narrative = `## Optimizing Across Tax Brackets\n\n`;
  narrative += `Your tax-conscious approach positions you to maximize after-tax wealth through strategic account selection. `;
  narrative += `By balancing traditional and Roth contributions, you're creating tax flexibility for retirement.\n\n`;
  
  narrative += `This isn't just about saving taxes today – it's about controlling your tax burden throughout retirement. `;
  narrative += `Your diversified approach across account types gives you options to manage income and taxes in any economic environment.`;
  
  return narrative;
}

function generateCatchUpNarrative(rowData, hdr) {
  const age = rowData[hdr['Current_Age']] || 50;
  let narrative = `## Accelerating Your Retirement Savings\n\n`;
  narrative += `At ${age}, you've unlocked powerful catch-up contribution opportunities. `;
  narrative += `These additional contribution limits recognize that your peak earning years often coincide with reduced expenses as children become independent.\n\n`;
  
  narrative += `Every additional dollar you can save now benefits from fewer years until retirement, making immediate action crucial. `;
  narrative += `The combination of higher limits and your experience-driven earning power creates a unique window for rapid wealth accumulation.`;
  
  return narrative;
}

function generateFoundationBuilderNarrative(rowData, hdr) {
  let narrative = `## Building Your Financial Foundation\n\n`;
  narrative += `You're taking the crucial first steps in building long-term wealth. `;
  narrative += `By starting now, you're harnessing the incredible power of compound growth over decades.\n\n`;
  
  const age = rowData[hdr['Current_Age']] || 30;
  const yearsToRetirement = 65 - age;
  narrative += `With approximately ${yearsToRetirement} years until retirement, even modest contributions today can grow into substantial wealth. `;
  narrative += `The key is establishing good habits now and gradually increasing contributions as your income grows.`;
  
  return narrative;
}

function generateBizOwnerNarrative(rowData, hdr) {
  let narrative = `## Advanced Strategies for Business Owners\n\n`;
  narrative += `As a business owner with employees, you have access to sophisticated retirement strategies that can save hundreds of thousands in taxes. `;
  narrative += `From cash balance plans to profit sharing, your options extend far beyond typical 401(k) limits.\n\n`;
  
  narrative += `The key is balancing your retirement goals with employee benefit costs and regulatory requirements. `;
  narrative += `Properly structured, these plans can dramatically accelerate your wealth building while providing valuable employee benefits.`;
  
  return narrative;
}

function generateLateStageNarrative(rowData, hdr) {
  let narrative = `## Optimizing Your Final Working Years\n\n`;
  narrative += `You're in the critical final phase where every decision has immediate impact. `;
  narrative += `This is your opportunity to maximize contributions, optimize asset allocation, and prepare for the transition to retirement income.\n\n`;
  
  narrative += `Beyond just saving more, this phase requires strategic thinking about Social Security timing, healthcare coverage, and tax-efficient withdrawal strategies. `;
  narrative += `The decisions you make now will determine your financial security and flexibility throughout retirement.`;
  
  return narrative;
}
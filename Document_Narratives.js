// ═══════════════════════════════════════════════════════════════════════════════
// SIMPLIFIED NARRATIVE FUNCTIONS FOR DOCUMENT GENERATION
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Generate opening narrative based on client data
 */
function generateOpeningNarrative(rowData, hdr) {
  const firstName = (rowData[hdr['Full_Name']] || '').split(' ')[0];
  const age = rowData[hdr['Current_Age']];
  const profileId = rowData[hdr['ProfileID']];
  const profileConfig = PROFILE_CONFIG[profileId] || { title: 'Retirement Strategist' };
  
  let narrative = `Dear ${firstName},\n\n`;
  
  if (age < 50) {
    narrative += `At ${age}, you're in an excellent position to build substantial wealth for retirement. `;
  } else {
    narrative += `At ${age}, strategic planning can significantly improve your retirement security. `;
  }
  
  narrative += `This personalized Retirement Blueprint has been crafted specifically for your situation as a ${profileConfig.title}. `;
  narrative += `We've analyzed your current position and identified opportunities to optimize your retirement savings strategy.`;
  
  return narrative;
}

/**
 * Generate Phase 1 narrative - Current Situation
 */
function generatePhase1Narrative(rowData, hdr) {
  const income = formatCurrency(rowData[hdr['gross_annual_income']]);
  const savingsRate = rowData[hdr['Allocation_Percentage']] + '%';
  
  let narrative = `Your current financial snapshot shows an annual income of ${income} `;
  narrative += `with ${savingsRate} allocated to retirement savings. `;
  narrative += `Let's explore how to optimize this allocation for maximum growth and tax efficiency.`;
  
  return narrative;
}

/**
 * Generate Phase 2 narrative - Priorities
 */
function generatePhase2Narrative(rowData, hdr) {
  const primaryGoal = rowData[hdr['Primary_Goal']];
  const riskTolerance = rowData[hdr['Risk_Tolerance']];
  
  let narrative = `Based on your priorities, `;
  
  if (primaryGoal) {
    narrative += `your primary goal is ${primaryGoal}. `;
  }
  
  if (riskTolerance === 'Conservative') {
    narrative += `With a conservative approach, we'll focus on stable, tax-advantaged growth strategies.`;
  } else if (riskTolerance === 'Aggressive') {
    narrative += `With your aggressive growth mindset, we'll maximize high-growth opportunities while managing risk.`;
  } else {
    narrative += `With a balanced approach, we'll blend growth opportunities with stability.`;
  }
  
  return narrative;
}

/**
 * Generate results narrative
 */
function generateResultsNarrative(rowData, hdr) {
  const actualTotal = calculateTotalMonthly(rowData, hdr, 'actual');
  const idealTotal = calculateTotalMonthly(rowData, hdr, 'ideal');
  const improvement = idealTotal - actualTotal;
  
  let narrative = `Our analysis reveals significant opportunities to enhance your retirement strategy. `;
  
  if (improvement > 0) {
    narrative += `By optimizing your contributions across the recommended vehicles, `;
    narrative += `you could increase your monthly retirement savings by ${formatCurrency(improvement)}. `;
    narrative += `This represents a powerful enhancement to your long-term wealth building.`;
  } else {
    narrative += `Your current allocation is already well-optimized. `;
    narrative += `We've identified ways to maintain this level while potentially improving tax efficiency.`;
  }
  
  return narrative;
}

/**
 * Generate action steps narrative
 */
function generateActionStepsNarrative(rowData, hdr, recommendations) {
  let narrative = `Based on our comprehensive analysis, here's your prioritized action plan:\n\n`;
  
  if (recommendations && recommendations.length > 0) {
    // Top 3 priorities
    const topPriorities = recommendations.slice(0, 3);
    
    topPriorities.forEach((rec, index) => {
      narrative += `${index + 1}. **${rec.name}**: `;
      if (rec.ideal > rec.actual) {
        narrative += `Increase contribution to ${formatCurrency(rec.ideal)} monthly`;
      } else if (rec.ideal < rec.actual) {
        narrative += `Optimize to ${formatCurrency(rec.ideal)} monthly`;
      } else {
        narrative += `Maintain current contribution of ${formatCurrency(rec.actual)} monthly`;
      }
      narrative += `\n`;
    });
    
    narrative += `\nThese top priorities will provide the greatest impact on your retirement readiness. `;
    narrative += `Start with the first recommendation and work your way down as your capacity allows.`;
  } else {
    narrative += `1. Review your current retirement vehicles\n`;
    narrative += `2. Consider tax-advantaged options based on your profile\n`;
    narrative += `3. Schedule a consultation to discuss specific strategies\n`;
  }
  
  return narrative;
}

/**
 * Generate profile-specific narrative
 */
function generateProfileNarrative(profileId, rowData, hdr) {
  const profileConfig = PROFILE_CONFIG[profileId];
  if (!profileConfig) return '';
  
  let narrative = `As a ${profileConfig.title}, you have unique opportunities:\n\n`;
  
  // Add profile-specific insights
  switch(profileId) {
    case '1_ROBS_In_Use':
      narrative += `Your ROBS structure provides exceptional contribution flexibility. `;
      narrative += `Focus on maximizing employer contributions through your C-corp while maintaining compliance.`;
      break;
      
    case '2_ROBS_Curious':
      narrative += `A ROBS strategy could unlock significant contribution potential. `;
      narrative += `Consider how business ownership through a C-corp could enhance your retirement savings capacity.`;
      break;
      
    case '3_Solo401k_Builder':
      narrative += `Your Solo 401(k) is a powerful tool for high contribution limits. `;
      narrative += `Maximize both employee deferrals and employer profit-sharing contributions.`;
      break;
      
    case '4_Roth_Reclaimer':
      narrative += `Your backdoor Roth strategy provides tax-free growth opportunities. `;
      narrative += `Continue executing annual conversions while managing your tax bracket.`;
      break;
      
    case '5_Bracket_Strategist':
      narrative += `Strategic tax bracket management is key to your long-term success. `;
      narrative += `Balance current deductions with future tax-free withdrawals.`;
      break;
      
    case '6_Catch_Up':
      narrative += `Your catch-up contributions provide additional saving power. `;
      narrative += `Take full advantage of these higher limits across all eligible accounts.`;
      break;
      
    case '7_Foundation_Builder':
      narrative += `You're building a strong foundation for future wealth. `;
      narrative += `Focus on establishing good habits and maximizing employer matches.`;
      break;
      
    case '8_Biz_Owner_Group':
      narrative += `Your business structure opens doors to advanced strategies. `;
      narrative += `Consider cash balance plans and maximized profit-sharing contributions.`;
      break;
      
    case '9_Late_Stage_Growth':
      narrative += `Strategic planning at this stage can still make a significant difference. `;
      narrative += `Focus on tax-efficient strategies and wealth preservation techniques.`;
      break;
      
    default:
      narrative += `Your profile provides specific optimization opportunities. `;
      narrative += `Focus on maximizing tax advantages while building long-term wealth.`;
  }
  
  return narrative;
}
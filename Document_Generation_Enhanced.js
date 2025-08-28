/**
 * Enhanced Document Generation System - Main Production Version
 * Generates comprehensive retirement blueprint documents with rich narratives
 */

// Using global constants from code.js
// - PROFILE_CONFIG
// - CONFIG

const DOC_SETTINGS = {
  SHEET_NAME: 'Working Sheet',
  HEADER_ROW: 2,
  OUTPUT_FOLDER_ID: '16KZLGRzLxa-e-jxnkDVb-sZcbosgPvGM',
  
  // Enhanced narrative lengths (no truncation for main narratives)
  NARRATIVE_LENGTHS: {
    opening: 1500,      // Was 500
    phase1: 1200,       // Was 500
    phase2: 1200,       // Was 500
    profile: 1500,      // Was 500
    results: 1200,      // Was 500
    action: 2000,       // Was 800
    projections: 1000   // New
  }
};

/**
 * Main document generation function - Enhanced version
 */
function generateRetirementBlueprint(rowNum) {
  try {
    Logger.log(`Starting enhanced document generation for row ${rowNum}`);
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const ws = ss.getSheetByName(DOC_SETTINGS.SHEET_NAME);
    if (!ws) throw new Error('Working Sheet not found');
    
    // Get headers and data
    const lastCol = ws.getLastColumn();
    const headers = ws.getRange(DOC_SETTINGS.HEADER_ROW, 1, 1, lastCol).getValues()[0];
    const rowData = ws.getRange(rowNum, 1, 1, lastCol).getValues()[0];
    
    // Create header map
    const hdr = {};
    headers.forEach((h, i) => {
      if (h) hdr[h] = i;
    });
    
    // Get key data
    const fullName = rowData[hdr['Full_Name']] || 'Client';
    const profileId = rowData[hdr['ProfileID']];
    const email = rowData[hdr['Email']];
    
    // Create document name
    const timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
    const cleanName = fullName.replace(/\s+/g, '_');
    const docName = `Retirement Blueprint_${cleanName}_${timestamp}`;
    
    // Create NEW document
    const folder = DOC_SETTINGS.OUTPUT_FOLDER_ID ? 
      DriveApp.getFolderById(DOC_SETTINGS.OUTPUT_FOLDER_ID) : 
      DriveApp.getRootFolder();
    
    const doc = DocumentApp.create(docName);
    const body = doc.getBody();
    body.clear();
    
    // Set document styles
    const style = {};
    style[DocumentApp.Attribute.FONT_FAMILY] = 'Georgia';
    style[DocumentApp.Attribute.FONT_SIZE] = 11;
    body.setAttributes(style);
    
    // Build enhanced document
    buildTitleSection(body, fullName, timestamp, profileId);
    buildExecutiveSummary(body, rowData, hdr);
    buildOpeningNarrative(body, rowData, hdr);
    buildChapter1_CurrentPath(body, rowData, hdr);
    buildChapter2_Priorities(body, rowData, hdr, profileId);
    buildChapter3_Opportunity(body, rowData, hdr);
    buildChapter4_Projections(body, rowData, hdr);
    buildChapter5_Vehicles(body, rowData, hdr);
    buildChapter6_ActionPlan(body, rowData, hdr);
    buildChapter7_NextSteps(body, rowData, hdr, profileId);
    buildClosing(body);
    
    // Save and move
    doc.saveAndClose();
    const file = DriveApp.getFileById(doc.getId());
    file.moveTo(folder);
    
    const docUrl = doc.getUrl();
    
    // Save URL to sheet
    const urlCol = hdr['retirement_blueprint_doc_url'] || lastCol + 1;
    if (!hdr['retirement_blueprint_doc_url']) {
      ws.getRange(DOC_SETTINGS.HEADER_ROW, urlCol).setValue('retirement_blueprint_doc_url');
    }
    ws.getRange(rowNum, urlCol).setValue(docUrl);
    
    Logger.log(`Document created successfully: ${docUrl}`);
    
    // Generate PDF and email if requested
    if (email) {
      sendRetirementBlueprintEmail(doc.getId(), email, fullName);
    }
    
    return docUrl;
    
  } catch (error) {
    Logger.log(`Error in generation: ${error.toString()}`);
    throw error;
  }
}

// ============== ENHANCED DOCUMENT SECTIONS ==============

function buildTitleSection(body, fullName, timestamp, profileId) {
  const titleStyle = {};
  titleStyle[DocumentApp.Attribute.FONT_SIZE] = 24;
  titleStyle[DocumentApp.Attribute.BOLD] = true;
  
  const title = body.appendParagraph('RETIREMENT BLUEPRINT');
  title.setHeading(DocumentApp.ParagraphHeading.TITLE);
  title.setAttributes(titleStyle);
  
  body.appendParagraph('Your Personalized Path to Financial Freedom');
  body.appendParagraph('');
  body.appendParagraph('Prepared for: ' + fullName);
  body.appendParagraph('Date: ' + timestamp);
  body.appendParagraph('Profile: ' + (PROFILE_CONFIG[profileId]?.title || 'Retirement Strategist'));
  
  body.appendPageBreak();
}

function buildExecutiveSummary(body, rowData, hdr) {
  body.appendParagraph('EXECUTIVE SUMMARY').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph('');
  
  // Key findings
  const actualTotal = calculateTotalMonthly(rowData, hdr, 'actual');
  const idealTotal = calculateTotalMonthly(rowData, hdr, 'ideal');
  const monthlyIncrease = idealTotal - actualTotal;
  const retirementFvActual = parseFloat(rowData[hdr['retirement_fv_actual']]) || 0;
  const retirementFvIdeal = parseFloat(rowData[hdr['retirement_fv_ideal']]) || 0;
  const additionalWealth = retirementFvIdeal - retirementFvActual;
  
  body.appendParagraph('Key Findings:').setBold(true);
  
  const findings = body.appendParagraph('');
  findings.appendText('• Monthly Savings Opportunity: ').setBold(true);
  findings.appendText(formatCurrency(monthlyIncrease) + ' additional per month\n');
  
  findings.appendText('• Long-term Wealth Impact: ').setBold(true);  
  findings.appendText(formatCurrency(additionalWealth) + ' in additional retirement savings\n');
  
  findings.appendText('• Personalized Growth Rate: ').setBold(true);
  findings.appendText(formatPercentage(rowData[hdr['personalized_annual_rate']]) + ' annual return\n');
  
  findings.appendText('• Tax Optimization: ').setBold(true);
  findings.appendText('Strategies to reduce lifetime tax burden by 20-40%');
  
  body.appendParagraph('');
  body.appendPageBreak();
}

function buildOpeningNarrative(body, rowData, hdr) {
  const opening = generateOpeningNarrative(rowData, hdr);
  body.appendParagraph(opening);
  body.appendParagraph('');
  
  // Add context about the blueprint process
  body.appendParagraph('What This Blueprint Contains:').setBold(true);
  body.appendParagraph('This comprehensive analysis combines your financial data, personal priorities, and proven strategies to create a roadmap uniquely suited to your situation. We\'ve analyzed over 15 different investment vehicles, calculated personalized growth projections, and identified the exact steps needed to maximize your wealth building potential.');
  body.appendParagraph('');
}

function buildChapter1_CurrentPath(body, rowData, hdr) {
  body.appendParagraph('CHAPTER 1: YOUR CURRENT PATH').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph('');
  
  const phase1Narrative = generatePhase1Narrative(rowData, hdr);
  body.appendParagraph(phase1Narrative);
  body.appendParagraph('');
  
  // Enhanced financial snapshot with more context
  body.appendParagraph('Financial Snapshot:').setBold(true);
  
  const snapshot = body.appendParagraph('');
  snapshot.appendText('• Annual Income: ').setBold(true);
  snapshot.appendText(formatCurrency(rowData[hdr['gross_annual_income']]) + '\n');
  
  snapshot.appendText('• Monthly Net Income: ').setBold(true);
  snapshot.appendText(formatCurrency(rowData[hdr['Net_Monthly_Income']]) + '\n');
  
  snapshot.appendText('• Current Savings Rate: ').setBold(true);
  snapshot.appendText((rowData[hdr['Allocation_Percentage']] || '0') + '%\n');
  
  snapshot.appendText('• Tax Filing Status: ').setBold(true);
  snapshot.appendText((rowData[hdr['filing_status']] || 'N/A') + '\n');
  
  // Add current contribution analysis
  body.appendParagraph('');
  body.appendParagraph('Current Contribution Analysis:').setBold(true);
  
  const currentContribs = analyzeCurrentContributions(rowData, hdr);
  body.appendParagraph(currentContribs);
  body.appendParagraph('');
}

function buildChapter2_Priorities(body, rowData, hdr, profileId) {
  body.appendParagraph('CHAPTER 2: YOUR PRIORITIES & PROFILE').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph('');
  
  const phase2Narrative = generatePhase2Narrative(rowData, hdr);
  body.appendParagraph(phase2Narrative);
  body.appendParagraph('');
  
  const profileNarrative = generateProfileNarrative(profileId, rowData, hdr);
  if (profileNarrative) {
    body.appendParagraph(profileNarrative);
    body.appendParagraph('');
  }
  
  // Add investment philosophy section
  body.appendParagraph('Your Investment Philosophy:').setBold(true);
  const philosophy = generateInvestmentPhilosophy(rowData, hdr);
  body.appendParagraph(philosophy);
  body.appendParagraph('');
}

function buildChapter3_Opportunity(body, rowData, hdr) {
  body.appendParagraph('CHAPTER 3: YOUR OPTIMIZATION OPPORTUNITY').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph('');
  
  const resultsNarrative = generateResultsNarrative(rowData, hdr);
  body.appendParagraph(resultsNarrative);
  body.appendParagraph('');
  
  // Enhanced monthly contribution comparison
  const actualTotal = calculateTotalMonthly(rowData, hdr, 'actual');
  const idealTotal = calculateTotalMonthly(rowData, hdr, 'ideal');
  const difference = idealTotal - actualTotal;
  
  body.appendParagraph('Monthly Contribution Optimization:').setBold(true);
  
  const comparison = body.appendTable();
  const headerRow = comparison.appendTableRow();
  headerRow.appendTableCell('Category').getChild(0).asParagraph().setBold(true);
  headerRow.appendTableCell('Current').getChild(0).asParagraph().setBold(true);
  headerRow.appendTableCell('Optimized').getChild(0).asParagraph().setBold(true);
  headerRow.appendTableCell('Increase').getChild(0).asParagraph().setBold(true);
  
  // Add domain breakdowns
  const domains = ['retirement', 'education', 'health'];
  domains.forEach(domain => {
    const actualDomain = calculateDomainTotal(rowData, hdr, domain, 'actual');
    const idealDomain = calculateDomainTotal(rowData, hdr, domain, 'ideal');
    if (actualDomain > 0 || idealDomain > 0) {
      const row = comparison.appendTableRow();
      row.appendTableCell(domain.charAt(0).toUpperCase() + domain.slice(1));
      row.appendTableCell(formatCurrency(actualDomain));
      row.appendTableCell(formatCurrency(idealDomain));
      row.appendTableCell(formatCurrency(idealDomain - actualDomain));
    }
  });
  
  // Total row
  const totalRow = comparison.appendTableRow();
  totalRow.appendTableCell('TOTAL').getChild(0).asParagraph().setBold(true);
  totalRow.appendTableCell(formatCurrency(actualTotal)).getChild(0).asParagraph().setBold(true);
  totalRow.appendTableCell(formatCurrency(idealTotal)).getChild(0).asParagraph().setBold(true);
  totalRow.appendTableCell(formatCurrency(difference)).getChild(0).asParagraph().setBold(true);
  
  body.appendParagraph('');
}

function buildChapter4_Projections(body, rowData, hdr) {
  body.appendParagraph('CHAPTER 4: FUTURE VALUE PROJECTIONS').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph('');
  
  const rate = rowData[hdr['personalized_annual_rate']];
  const projectionNarrative = generateProjectionNarrative(rowData, hdr);
  body.appendParagraph(projectionNarrative);
  body.appendParagraph('');
  
  body.appendParagraph('Personalized Growth Analysis:').setBold(true);
  body.appendParagraph(`Based on your investment confidence scores, we project a ${formatPercentage(rate)} annual return. This personalized rate reflects your comfort with investment complexity and time commitment.`);
  body.appendParagraph('');
  
  // Comprehensive projections table
  body.appendParagraph('30-Year Wealth Projections:').setBold(true);
  
  const projTable = body.appendTable();
  const projHeader = projTable.appendTableRow();
  projHeader.appendTableCell('Savings Domain').getChild(0).asParagraph().setBold(true);
  projHeader.appendTableCell('Current Path').getChild(0).asParagraph().setBold(true);
  projHeader.appendTableCell('Optimized Path').getChild(0).asParagraph().setBold(true);
  projHeader.appendTableCell('Additional Wealth').getChild(0).asParagraph().setBold(true);
  
  // Add all domains
  const domainNames = {
    retirement: 'Retirement',
    education: 'Education',
    health: 'Healthcare'
  };
  
  let totalActualFV = 0;
  let totalIdealFV = 0;
  
  Object.entries(domainNames).forEach(([key, name]) => {
    const actualFV = parseFloat(rowData[hdr[`${key}_fv_actual`]]) || 0;
    const idealFV = parseFloat(rowData[hdr[`${key}_fv_ideal`]]) || 0;
    
    if (actualFV > 0 || idealFV > 0) {
      const row = projTable.appendTableRow();
      row.appendTableCell(name);
      row.appendTableCell(formatCurrency(actualFV));
      row.appendTableCell(formatCurrency(idealFV));
      row.appendTableCell(formatCurrency(idealFV - actualFV));
      
      totalActualFV += actualFV;
      totalIdealFV += idealFV;
    }
  });
  
  // Total row
  const totalProjRow = projTable.appendTableRow();
  totalProjRow.appendTableCell('TOTAL WEALTH').getChild(0).asParagraph().setBold(true);
  totalProjRow.appendTableCell(formatCurrency(totalActualFV)).getChild(0).asParagraph().setBold(true);
  totalProjRow.appendTableCell(formatCurrency(totalIdealFV)).getChild(0).asParagraph().setBold(true);
  totalProjRow.appendTableCell(formatCurrency(totalIdealFV - totalActualFV)).getChild(0).asParagraph().setBold(true);
  
  body.appendParagraph('');
}

function buildChapter5_Vehicles(body, rowData, hdr) {
  body.appendParagraph('CHAPTER 5: YOUR INVESTMENT VEHICLES').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph('');
  
  body.appendParagraph('Each investment vehicle offers unique advantages. Your optimized strategy leverages the best combination for your situation:');
  body.appendParagraph('');
  
  const recommendations = formatVehicleRecommendations(rowData, hdr);
  if (recommendations && recommendations.length > 0) {
    const table = body.appendTable();
    populateVehicleRecommendationsTable(table, recommendations);
    body.appendParagraph('');
    
    // Add vehicle-specific guidance
    body.appendParagraph('Vehicle-Specific Guidance:').setBold(true);
    recommendations.forEach(rec => {
      if (rec.ideal > rec.actual) {
        const guidance = generateVehicleGuidance(rec.name, rec.actual, rec.ideal);
        if (guidance) {
          body.appendParagraph(`• ${rec.name}: ${guidance}`);
        }
      }
    });
  }
  body.appendParagraph('');
}

function buildChapter6_ActionPlan(body, rowData, hdr) {
  body.appendParagraph('CHAPTER 6: YOUR PRIORITIZED ACTION PLAN').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph('');
  
  const recommendations = formatVehicleRecommendations(rowData, hdr);
  const actionNarrative = generateActionStepsNarrative(rowData, hdr, recommendations);
  body.appendParagraph(actionNarrative);
  body.appendParagraph('');
  
  // Add implementation timeline
  body.appendParagraph('30-Day Implementation Timeline:').setBold(true);
  const timeline = generateImplementationTimeline(rowData, hdr, recommendations);
  body.appendParagraph(timeline);
  body.appendParagraph('');
}

function buildChapter7_NextSteps(body, rowData, hdr, profileId) {
  body.appendParagraph('CHAPTER 7: RESOURCES & NEXT STEPS').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph('');
  
  // Profile-specific resources
  const resources = generateProfileResources(profileId, rowData, hdr);
  body.appendParagraph(resources);
  body.appendParagraph('');
  
  // Common pitfalls to avoid
  body.appendParagraph('Common Pitfalls to Avoid:').setBold(true);
  const pitfalls = generateCommonPitfalls(profileId);
  body.appendParagraph(pitfalls);
  body.appendParagraph('');
}

function buildClosing(body) {
  body.appendParagraph('CLOSING THOUGHTS').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph('');
  
  body.appendParagraph('You\'ve taken the most important step – understanding where you are and where you could be. This blueprint represents more than numbers; it\'s a pathway to the financial freedom and security you deserve.');
  body.appendParagraph('');
  
  body.appendParagraph('Remember: The best retirement plan is the one you actually implement. Start with one action today, build momentum, and watch as small changes compound into life-changing results.');
  body.appendParagraph('');
  
  body.appendParagraph('We\'re here to support you every step of the way.');
  body.appendParagraph('');
  
  body.appendParagraph('To your financial freedom,');
  body.appendParagraph('The Retirement Blueprint Team');
  body.appendParagraph('');
  
  const disclaimer = body.appendParagraph('Disclaimer: This report provides educational information based on your inputs. Consult with qualified professionals before making financial decisions.');
  disclaimer.setFontSize(9);
  disclaimer.setItalic(true);
}

// ============== ENHANCED NARRATIVE FUNCTIONS ==============

function generateProjectionNarrative(rowData, hdr) {
  const years = rowData[hdr['retirement_years']] || 30;
  const retirementFvActual = parseFloat(rowData[hdr['retirement_fv_actual']]) || 0;
  const retirementFvIdeal = parseFloat(rowData[hdr['retirement_fv_ideal']]) || 0;
  const difference = retirementFvIdeal - retirementFvActual;
  
  let narrative = `Looking ahead ${years} years, the power of optimized contributions and compound growth becomes crystal clear. `;
  
  if (difference > 1000000) {
    narrative += `By implementing these strategies, you could accumulate an additional ${formatCurrency(difference)} – `;
    narrative += `that's over a million dollars in extra wealth for your retirement. `;
    narrative += `This isn't just a number; it's the difference between a comfortable retirement and true financial freedom. `;
  } else if (difference > 500000) {
    narrative += `The optimization strategies identified could generate an additional ${formatCurrency(difference)} in retirement savings. `;
    narrative += `This substantial increase could mean retiring years earlier or enjoying a significantly enhanced lifestyle. `;
  } else if (difference > 100000) {
    narrative += `These adjustments could yield an additional ${formatCurrency(difference)} for your future. `;
    narrative += `While this might seem modest annually, the cumulative effect is powerful. `;
  }
  
  narrative += `\n\nThese projections use your personalized growth rate, which factors in your investment sophistication and risk tolerance. `;
  narrative += `The beauty of this approach is that it's tailored specifically to your comfort level while maximizing growth potential.`;
  
  return narrative;
}

function generateInvestmentPhilosophy(rowData, hdr) {
  const involvement = rowData[hdr['investment_involvement']] || 4;
  const time = rowData[hdr['investment_time']] || 4;
  const confidence = rowData[hdr['investment_confidence']] || 4;
  const avgScore = (Number(involvement) + Number(time) + Number(confidence)) / 3;
  
  let philosophy = '';
  
  if (avgScore >= 5.5) {
    philosophy = 'You demonstrate strong investment sophistication with high involvement, time commitment, and confidence. ';
    philosophy += 'This positions you to take advantage of more complex strategies that can significantly accelerate wealth building. ';
    philosophy += 'Your blueprint leverages advanced vehicles and techniques that align with your expertise.';
  } else if (avgScore >= 4) {
    philosophy = 'You show solid investment fundamentals with moderate sophistication across all dimensions. ';
    philosophy += 'This balanced approach allows for steady growth while maintaining comfort with your strategy. ';
    philosophy += 'Your blueprint emphasizes proven vehicles with room to explore more advanced options as your confidence grows.';
  } else {
    philosophy = 'You prefer a straightforward investment approach, which is perfectly valid and can be highly successful. ';
    philosophy += 'Your blueprint focuses on simple, proven strategies that require minimal maintenance while building wealth consistently. ';
    philosophy += 'As you gain experience, you can gradually incorporate more sophisticated elements.';
  }
  
  return philosophy;
}

function generateVehicleGuidance(vehicleName, actual, ideal) {
  const increase = ideal - actual;
  
  const guidance = {
    'HSA': `Triple tax advantage makes this a retirement powerhouse. Contribute ${formatCurrency(increase)} more monthly for tax-free growth.`,
    '401(k) Match': `This is free money! Capturing the full match should be your absolute top priority.`,
    'Solo 401(k)': `As a business owner, this offers massive contribution limits. Consider both employee and employer contributions.`,
    'Backdoor Roth IRA': `Circumvents income limits to secure tax-free retirement income. Worth the extra steps.`,
    'Traditional IRA': `Provides immediate tax deduction. Consider if you're in a high tax bracket now.`,
    'Roth IRA': `Tax-free growth and withdrawals in retirement. Ideal if you expect higher future tax rates.`,
    'CESA': `Education savings with tax-free growth. Start early to maximize compound growth.`,
    'Cash Balance Plan': `For high earners, this can shelter $100k+ annually from taxes.`
  };
  
  return guidance[vehicleName] || `Increase contributions by ${formatCurrency(increase)} monthly to optimize this vehicle.`;
}

function generateImplementationTimeline(rowData, hdr, recommendations) {
  const topPriorities = recommendations
    .filter(r => r.ideal > r.actual)
    .sort((a, b) => (b.ideal - b.actual) - (a.ideal - a.actual))
    .slice(0, 3);
  
  let timeline = 'Week 1: Foundation Setup\n';
  timeline += '• Review current contribution elections\n';
  timeline += '• Gather account statements and login credentials\n';
  timeline += '• Schedule time with HR/benefits coordinator if needed\n\n';
  
  timeline += 'Week 2: High Priority Changes\n';
  if (topPriorities[0]) {
    timeline += `• Implement ${topPriorities[0].name} changes (increase by ${formatCurrency(topPriorities[0].ideal - topPriorities[0].actual)})\n`;
  }
  timeline += '• Verify changes are processed correctly\n\n';
  
  timeline += 'Week 3-4: Additional Optimizations\n';
  topPriorities.slice(1).forEach(priority => {
    timeline += `• Set up ${priority.name} contributions\n`;
  });
  timeline += '• Automate all contributions\n';
  timeline += '• Set calendar reminders for annual reviews';
  
  return timeline;
}

function generateProfileResources(profileId, rowData, hdr) {
  const resources = {
    '1_ROBS_In_Use': 'ROBS Resources:\n• IRS guidelines on prohibited transactions\n• C-Corp tax optimization strategies\n• Solo 401(k) contribution calculators\n• Business valuation methodologies',
    '2_ROBS_Curious': 'ROBS Exploration Resources:\n• ROBS feasibility calculator\n• Business acquisition financing options\n• C-Corp vs S-Corp analysis\n• Solo 401(k) setup guides',
    '3_Solo401k_Builder': 'Solo 401(k) Resources:\n• Provider comparison chart\n• Contribution limit calculators\n• Employer vs employee contribution strategies\n• Year-end tax planning guides',
    '4_Roth_Reclaimer': 'Roth Strategy Resources:\n• Backdoor Roth step-by-step guide\n• Pro-rata rule calculator\n• Mega backdoor Roth eligibility\n• Tax projection worksheets',
    '5_Bracket_Strategist': 'Tax Optimization Resources:\n• Tax bracket analyzers\n• Roth vs Traditional calculators\n• State tax considerations\n• Multi-year tax planning tools',
    '6_Catch_Up': 'Catch-Up Resources:\n• Age 50+ contribution limits\n• Social Security optimization\n• Healthcare bridge strategies\n• Retirement readiness calculators',
    '7_Foundation_Builder': 'Foundation Resources:\n• Investment basics courses\n• Employer benefit guides\n• Emergency fund calculators\n• Debt payoff strategies',
    '8_Biz_Owner_Group': 'Business Owner Resources:\n• Defined benefit plan providers\n• Cash balance plan calculators\n• Employee benefit benchmarking\n• Succession planning guides',
    '9_Late_Stage_Growth': 'Late Stage Resources:\n• Retirement withdrawal strategies\n• Medicare planning guides\n• Estate planning checklists\n• Tax-efficient giving strategies'
  };
  
  return resources[profileId] || 'Contact our team for profile-specific resources and guidance.';
}

function generateCommonPitfalls(profileId) {
  const pitfalls = {
    '1_ROBS_In_Use': '• Prohibited transactions that could disqualify your plan\n• Over-concentrating retirement assets in one business\n• Missing employer contribution deadlines\n• Inadequate business succession planning',
    '2_ROBS_Curious': '• Underestimating ROBS setup complexity\n• Not considering business risk factors\n• Rushing into business purchase\n• Ignoring ongoing compliance requirements',
    '3_Solo401k_Builder': '• Missing employer contribution deadlines\n• Not maximizing both employee and employer portions\n• Hiring employees without plan adjustment\n• Poor provider selection',
    '4_Roth_Reclaimer': '• Triggering pro-rata rule accidentally\n• Missing backdoor Roth deadlines\n• Incorrect conversion reporting\n• Not considering state tax implications',
    '5_Bracket_Strategist': '• Over-contributing to traditional accounts\n• Missing Roth conversion opportunities\n• Ignoring state tax changes\n• Not adjusting for income fluctuations',
    '6_Catch_Up': '• Starting catch-up contributions too late\n• Ignoring healthcare costs in planning\n• Over-conservative investment allocation\n• Not maximizing employer benefits',
    '7_Foundation_Builder': '• Leaving employer match on the table\n• Not starting HSA contributions\n• Keeping high-interest debt\n• Analysis paralysis preventing action',
    '8_Biz_Owner_Group': '• Discrimination testing failures\n• Over-complex plan designs\n• Ignoring employee retention impact\n• Missing funding deadlines',
    '9_Late_Stage_Growth': '• Sequence of returns risk\n• Medicare enrollment mistakes\n• Poor Social Security timing\n• Inadequate estate planning'
  };
  
  return pitfalls[profileId] || '• Analysis paralysis – start with one change\n• Trying to time the market\n• Not automating contributions\n• Forgetting to review annually';
}

function analyzeCurrentContributions(rowData, hdr) {
  const actualTotal = calculateTotalMonthly(rowData, hdr, 'actual');
  const netIncome = parseFloat(rowData[hdr['Net_Monthly_Income']]) || 0;
  const currentRate = netIncome > 0 ? (actualTotal / netIncome) * 100 : 0;
  
  let analysis = `You're currently contributing ${formatCurrency(actualTotal)} per month, `;
  analysis += `which represents ${currentRate.toFixed(1)}% of your net income. `;
  
  if (currentRate >= 20) {
    analysis += `This is an excellent savings rate that puts you ahead of most Americans. `;
    analysis += `Our optimization focuses on ensuring these contributions work as hard as possible through tax-advantaged vehicles.`;
  } else if (currentRate >= 10) {
    analysis += `This is a solid foundation, above the national average. `;
    analysis += `There's significant room to accelerate your wealth building by increasing contributions to tax-advantaged accounts.`;
  } else {
    analysis += `While any savings is positive, there's substantial opportunity to build wealth faster. `;
    analysis += `Even small increases, when properly allocated, can have dramatic long-term impacts.`;
  }
  
  return analysis;
}

function calculateDomainTotal(rowData, hdr, domain, type) {
  let total = 0;
  Object.entries(hdr).forEach(([header, idx]) => {
    if (header.startsWith(`${domain}_`) && header.endsWith(`_${type}`) && !header.includes('_fv_')) {
      const value = parseFloat(rowData[idx]) || 0;
      total += value;
    }
  });
  return total;
}

// ============== MENU FUNCTION ==============

function generateDocumentEnhanced() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const row = sheet.getActiveRange().getRow();
  
  if (row < 3) {
    SpreadsheetApp.getUi().alert('Please select a data row (row 3+)');
    return;
  }
  
  try {
    const url = generateRetirementBlueprint(row);
    SpreadsheetApp.getUi().alert('Document generated successfully!\n\n' + url);
  } catch (error) {
    SpreadsheetApp.getUi().alert('Error: ' + error.toString());
  }
}
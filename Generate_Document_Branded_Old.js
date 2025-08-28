// ═══════════════════════════════════════════════════════════════════════════════
// BRANDED DOCUMENT GENERATION - Safe Version with Professional Formatting
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Utility function to truncate narratives
 */
function truncateNarrative(text, maxLength) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Calculate total monthly contributions
 */
function calculateTotalMonthly(rowData, hdr, type) {
  let total = 0;
  
  // Define the columns to sum based on type
  const columns = type === 'actual' ? [
    'retirement_traditional_401k_actual',
    'retirement_roth_401k_actual',
    'retirement_traditional_ira_actual',
    'retirement_roth_ira_actual',
    'retirement_solo_401k_actual',
    'retirement_other_actual',
    'education_cesa_actual',
    'education_529_actual',
    'education_other_actual',
    'health_hsa_actual',
    'health_other_actual'
  ] : [
    'retirement_traditional_401k_ideal',
    'retirement_roth_401k_ideal',
    'retirement_traditional_ira_ideal',
    'retirement_roth_ira_ideal',
    'retirement_solo_401k_ideal',
    'retirement_other_ideal',
    'education_cesa_ideal',
    'education_529_ideal',
    'education_other_ideal',
    'health_hsa_ideal',
    'health_other_ideal'
  ];
  
  // Sum up all the columns
  columns.forEach(col => {
    const value = parseFloat(rowData[hdr[col]]) || 0;
    total += value;
  });
  
  return total;
}

/**
 * Get vehicle recommendations from row data
 */
function getVehicleRecommendations(rowData, hdr) {
  const vehicles = [
    { name: 'Traditional 401(k)', actual: 'retirement_traditional_401k_actual', ideal: 'retirement_traditional_401k_ideal' },
    { name: 'Roth 401(k)', actual: 'retirement_roth_401k_actual', ideal: 'retirement_roth_401k_ideal' },
    { name: 'Traditional IRA', actual: 'retirement_traditional_ira_actual', ideal: 'retirement_traditional_ira_ideal' },
    { name: 'Roth IRA', actual: 'retirement_roth_ira_actual', ideal: 'retirement_roth_ira_ideal' },
    { name: 'Solo 401(k)', actual: 'retirement_solo_401k_actual', ideal: 'retirement_solo_401k_ideal' },
    { name: 'HSA', actual: 'health_hsa_actual', ideal: 'health_hsa_ideal' },
    { name: 'CESA', actual: 'education_cesa_actual', ideal: 'education_cesa_ideal' }
  ];
  
  return vehicles.map(v => ({
    name: v.name,
    actual: parseFloat(rowData[hdr[v.actual]]) || 0,
    ideal: parseFloat(rowData[hdr[v.ideal]]) || 0
  })).filter(v => v.actual > 0 || v.ideal > 0);
}

/**
 * Format currency values
 */
function formatCurrency(amount) {
  if (typeof amount === 'string') amount = parseFloat(amount) || 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Generate a branded retirement blueprint document
 * This is the safe version with professional formatting and branding
 */
function generateDocumentBranded() {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const row = sheet.getActiveRange().getRow();
    
    if (row < 2) {
      throw new Error('Please select a data row (row 2 or below)');
    }
    
    Logger.log(`Starting BRANDED document generation for row ${row}`);
    
    // Get headers and data
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const rowData = sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // Create header map
    const hdr = {};
    headers.forEach((header, index) => {
      hdr[header] = index;
    });
    
    // Log ProfileID for debugging
    const profileId = rowData[hdr['ProfileID']];
    Logger.log(`ProfileID from row: "${profileId}"`);
    Logger.log(`ProfileID column index: ${hdr['ProfileID']}`);
    
    // Generate the branded document
    const docUrl = generateBrandedDocument(rowData, hdr);
    
    SpreadsheetApp.getUi().alert('✅ Success!', 
      `Your branded Retirement Blueprint has been created.\n\nDocument URL:\n${docUrl}`, 
      SpreadsheetApp.getUi().ButtonSet.OK);
    
  } catch (error) {
    Logger.log(`Error in branded generation: ${error.toString()}`);
    Logger.log(`Error stack: ${error.stack}`);
    SpreadsheetApp.getUi().alert('❌ Error', 
      `Failed to generate document: ${error.toString()}`, 
      SpreadsheetApp.getUi().ButtonSet.OK);
  }
}

/**
 * Core branded document generation
 */
function generateBrandedDocument(rowData, hdr) {
  const clientName = rowData[hdr['Full_Name']] || 'Client';
  const firstName = clientName.split(' ')[0];
  const profileId = rowData[hdr['ProfileID']] || 'Unknown';
  
  // Better error handling for profile configuration
  let profileConfig;
  if (!PROFILE_CONFIG) {
    Logger.log('ERROR: PROFILE_CONFIG is not defined');
    throw new Error('Profile configuration not found. Please ensure code.js is properly loaded.');
  }
  
  profileConfig = PROFILE_CONFIG[profileId];
  if (!profileConfig) {
    Logger.log(`WARNING: No profile config found for ProfileID: "${profileId}"`);
    Logger.log('Available profiles: ' + Object.keys(PROFILE_CONFIG).join(', '));
    profileConfig = { 
      title: 'General Profile', 
      color: '#666666',
      description: 'Standard retirement planning profile'
    };
  }
  
  // Create new document
  const docName = `Retirement Blueprint - ${clientName} - ${new Date().toLocaleDateString()}`;
  const newDoc = DocumentApp.create(docName);
  const body = newDoc.getBody();
  
  // Clear default content
  body.clear();
  
  // Apply base branding
  applyBranding(newDoc);
  
  // TITLE PAGE
  addBrandedTitlePage(body, clientName, profileConfig);
  
  // TABLE OF CONTENTS
  body.appendPageBreak();
  addTableOfContents(body);
  
  // EXECUTIVE SUMMARY
  body.appendPageBreak();
  addExecutiveSummary(body, rowData, hdr);
  
  // CHAPTER 1: Current Path
  body.appendPageBreak();
  const chapter1 = body.appendParagraph('CHAPTER 1: YOUR CURRENT PATH');
  chapter1.setHeading(DocumentApp.ParagraphHeading.HEADING1);
  formatText(chapter1, 'heading1');
  
  // Generate narratives
  const opening = truncateNarrative(generateOpeningNarrative(rowData, hdr), 1500);
  const phase1 = truncateNarrative(generatePhase1Narrative(rowData, hdr), 1200);
  
  const openingPara = body.appendParagraph(opening);
  formatText(openingPara, 'body');
  
  const phase1Para = body.appendParagraph(phase1);
  formatText(phase1Para, 'body');
  
  // Add Phase 1 details with visual formatting
  addFormattedPhase1Details(body, rowData, hdr);
  
  // CHAPTER 2: Priorities
  body.appendPageBreak();
  const chapter2 = body.appendParagraph('CHAPTER 2: YOUR PRIORITIES');
  chapter2.setHeading(DocumentApp.ParagraphHeading.HEADING1);
  formatText(chapter2, 'heading1');
  
  const phase2 = truncateNarrative(generatePhase2Narrative(rowData, hdr), 1200);
  const phase2Para = body.appendParagraph(phase2);
  formatText(phase2Para, 'body');
  
  addFormattedPriorities(body, rowData, hdr);
  
  // CHAPTER 3: Opportunity
  body.appendPageBreak();
  const chapter3 = body.appendParagraph('CHAPTER 3: YOUR OPPORTUNITY');
  chapter3.setHeading(DocumentApp.ParagraphHeading.HEADING1);
  formatText(chapter3, 'heading1');
  
  const results = truncateNarrative(generateResultsNarrative(rowData, hdr), 1500);
  const resultsPara = body.appendParagraph(results);
  formatText(resultsPara, 'body');
  
  addOpportunityHighlights(body, rowData, hdr);
  
  // CHAPTER 4: Future Projections
  body.appendPageBreak();
  const chapter4 = body.appendParagraph('CHAPTER 4: FUTURE PROJECTIONS');
  chapter4.setHeading(DocumentApp.ParagraphHeading.HEADING1);
  formatText(chapter4, 'heading1');
  
  addFutureProjectionsWithCharts(body, rowData, hdr);
  
  // CHAPTER 5: Your Vehicles
  body.appendPageBreak();
  const chapter5 = body.appendParagraph('CHAPTER 5: YOUR INVESTMENT VEHICLES');
  chapter5.setHeading(DocumentApp.ParagraphHeading.HEADING1);
  formatText(chapter5, 'heading1');
  
  // Profile narrative
  const profileNarrative = truncateNarrative(generateProfileNarrative(profileId, rowData, hdr), 1500);
  if (profileNarrative) {
    const profilePara = body.appendParagraph(profileNarrative);
    formatText(profilePara, 'body');
  }
  
  // Vehicle recommendations table
  const recommendations = getVehicleRecommendations(rowData, hdr);
  const table = populateBrandedVehicleTable(body, recommendations);
  
  // CHAPTER 6: Action Plan
  body.appendPageBreak();
  const chapter6 = body.appendParagraph('CHAPTER 6: YOUR ACTION PLAN');
  chapter6.setHeading(DocumentApp.ParagraphHeading.HEADING1);
  formatText(chapter6, 'heading1');
  
  const actionSteps = truncateNarrative(generateActionStepsNarrative(rowData, hdr, recommendations), 2000);
  const actionPara = body.appendParagraph(actionSteps);
  formatText(actionPara, 'body');
  
  // Add implementation checklist
  addImplementationChecklist(body, recommendations);
  
  // CLOSING PAGE
  body.appendPageBreak();
  addClosingPage(body, firstName);
  
  // APPENDIX
  body.appendPageBreak();
  addAppendix(body);
  
  return newDoc.getUrl();
}

/**
 * Add branded title page
 */
function addBrandedTitlePage(body, clientName, profileConfig) {
  // Add some spacing
  body.appendParagraph('');
  body.appendParagraph('');
  body.appendParagraph('');
  
  // Main title
  const title = body.appendParagraph('RETIREMENT BLUEPRINT');
  title.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  title.setHeading(DocumentApp.ParagraphHeading.TITLE);
  formatText(title, 'title');
  
  // Subtitle
  const subtitle = body.appendParagraph('Your Personalized Path to Financial Freedom');
  subtitle.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  formatText(subtitle, 'heading2', BRANDING_CONFIG.colors.secondary);
  
  // Add decorative line
  addBrandedDivider(body);
  
  body.appendParagraph('');
  body.appendParagraph('');
  
  // Client info box
  const preparedFor = body.appendParagraph('Prepared exclusively for');
  preparedFor.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  formatText(preparedFor, 'body', BRANDING_CONFIG.colors.lightGray);
  
  const clientNamePara = body.appendParagraph(clientName);
  clientNamePara.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  formatText(clientNamePara, 'heading1', BRANDING_CONFIG.colors.primary);
  
  const profilePara = body.appendParagraph(`Profile: ${profileConfig.title}`);
  profilePara.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  formatText(profilePara, 'heading3', profileConfig.color || BRANDING_CONFIG.colors.secondary);
  
  body.appendParagraph('');
  body.appendParagraph('');
  
  const datePara = body.appendParagraph(new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }));
  datePara.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  formatText(datePara, 'body', BRANDING_CONFIG.colors.lightGray);
  
  // Add bottom section with company info
  const spacer = body.appendParagraph('');
  for (let i = 0; i < 10; i++) {
    body.appendParagraph('');
  }
  
  const companyInfo = body.appendParagraph(BRANDING_CONFIG.company.name);
  companyInfo.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  formatText(companyInfo, 'heading2', BRANDING_CONFIG.colors.primary);
  
  const tagline = body.appendParagraph(BRANDING_CONFIG.company.tagline);
  tagline.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  formatText(tagline, 'body', BRANDING_CONFIG.colors.lightGray);
}

/**
 * Add table of contents
 */
function addTableOfContents(body) {
  const tocTitle = body.appendParagraph('TABLE OF CONTENTS');
  tocTitle.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  formatText(tocTitle, 'heading1');
  
  body.appendParagraph('');
  
  const sections = [
    { num: '', title: 'Executive Summary', page: '3' },
    { num: '1', title: 'Your Current Path', page: '4' },
    { num: '2', title: 'Your Priorities', page: '6' },
    { num: '3', title: 'Your Opportunity', page: '8' },
    { num: '4', title: 'Future Projections', page: '10' },
    { num: '5', title: 'Your Investment Vehicles', page: '12' },
    { num: '6', title: 'Your Action Plan', page: '14' },
    { num: '', title: 'Next Steps', page: '16' },
    { num: '', title: 'Appendix: Resources & Glossary', page: '17' }
  ];
  
  sections.forEach(section => {
    const line = section.num 
      ? `Chapter ${section.num}: ${section.title} ${''.padEnd(50 - section.title.length, '.')} ${section.page}`
      : `${section.title} ${''.padEnd(58 - section.title.length, '.')} ${section.page}`;
    
    const tocLine = body.appendParagraph(line);
    tocLine.setIndentStart(36);
    formatText(tocLine, 'body');
  });
}

/**
 * Add executive summary
 */
function addExecutiveSummary(body, rowData, hdr) {
  const summaryTitle = body.appendParagraph('EXECUTIVE SUMMARY');
  summaryTitle.setHeading(DocumentApp.ParagraphHeading.HEADING1);
  formatText(summaryTitle, 'heading1');
  
  body.appendParagraph('');
  
  // Key highlights in a callout box
  const actualTotal = calculateTotalMonthly(rowData, hdr, 'actual');
  const idealTotal = calculateTotalMonthly(rowData, hdr, 'ideal');
  const difference = idealTotal - actualTotal;
  const retirementFvIdeal = parseFloat(rowData[hdr['retirement_fv_ideal']]) || 0;
  
  addCalloutBox(body, 
    `Key Finding: By optimizing your retirement strategy, you can increase your monthly contributions by ${formatCurrency(difference)} ` +
    `and potentially add ${formatCurrency(retirementFvIdeal)} to your retirement savings.`,
    '🎯'
  );
  
  body.appendParagraph('');
  
  // Get profile title safely
  const profileId = rowData[hdr['ProfileID']] || 'Unknown';
  const profileTitle = PROFILE_CONFIG && PROFILE_CONFIG[profileId] 
    ? PROFILE_CONFIG[profileId].title 
    : 'Custom Profile';
  
  // Summary points
  const summaryPoints = [
    `Current Monthly Retirement Savings: ${formatCurrency(actualTotal)}`,
    `Optimized Monthly Savings Potential: ${formatCurrency(idealTotal)}`,
    `Monthly Increase Opportunity: ${formatCurrency(difference)}`,
    `Projected Retirement Value: ${formatCurrency(retirementFvIdeal)}`,
    `Investment Profile: ${profileTitle}`
  ];
  
  summaryPoints.forEach(point => {
    const bullet = body.appendParagraph('• ' + point);
    bullet.setIndentFirstLine(18);
    formatText(bullet, 'body');
  });
}

/**
 * Add formatted Phase 1 details
 */
function addFormattedPhase1Details(body, rowData, hdr) {
  addBrandedDivider(body, 'Financial Snapshot');
  
  // Create a visual summary table
  const table = body.appendTable();
  
  const data = [
    ['Annual Income', formatCurrency(rowData[hdr['gross_annual_income']])],
    ['Monthly Net Income', formatCurrency(rowData[hdr['Net_Monthly_Income']])],
    ['Current Savings Rate', rowData[hdr['Allocation_Percentage']] + '%'],
    ['Filing Status', rowData[hdr['filing_status']]],
    ['Retirement Timeframe', rowData[hdr['Retirement_Timeframe']]],
    ['Action Motivation', rowData[hdr['Action_Motivation']]]
  ];
  
  data.forEach(([label, value]) => {
    const row = table.appendTableRow();
    const labelCell = row.appendTableCell(label);
    const valueCell = row.appendTableCell(value);
    
    // Format cells
    labelCell.getChild(0).asParagraph().editAsText().setBold(true);
    valueCell.getChild(0).asParagraph().setAlignment(DocumentApp.HorizontalAlignment.RIGHT);
  });
  
  formatTable(table);
}

/**
 * Add formatted priorities section
 */
function addFormattedPriorities(body, rowData, hdr) {
  addBrandedDivider(body, 'Your Priorities');
  
  // Create priority visualization
  const priorities = [
    { name: 'Retirement Security', score: parseInt(rowData[hdr['retirement_importance']]) || 0 },
    { name: 'Education Funding', score: parseInt(rowData[hdr['education_importance']]) || 0 },
    { name: 'Healthcare Planning', score: parseInt(rowData[hdr['health_importance']]) || 0 }
  ].sort((a, b) => b.score - a.score);
  
  priorities.forEach((priority, index) => {
    const bar = '█'.repeat(priority.score * 2) + '░'.repeat((7 - priority.score) * 2);
    const line = body.appendParagraph(`${index + 1}. ${priority.name}: ${bar} (${priority.score}/7)`);
    formatText(line, 'body');
    
    if (index === 0) {
      line.editAsText().setForegroundColor(0, priority.name.length + 3, BRANDING_CONFIG.colors.accent);
    }
  });
}

/**
 * Add opportunity highlights
 */
function addOpportunityHighlights(body, rowData, hdr) {
  // Calculate key metrics
  const actualTotal = calculateTotalMonthly(rowData, hdr, 'actual');
  const idealTotal = calculateTotalMonthly(rowData, hdr, 'ideal');
  const monthlyIncrease = idealTotal - actualTotal;
  const yearlyIncrease = monthlyIncrease * 12;
  
  // Create highlight boxes
  addCalloutBox(body, 
    `Monthly Optimization: ${formatCurrency(monthlyIncrease)} additional per month`,
    '📈'
  );
  
  addCalloutBox(body,
    `Annual Impact: ${formatCurrency(yearlyIncrease)} more per year in tax-advantaged accounts`,
    '💰'
  );
  
  const fvDifference = (parseFloat(rowData[hdr['retirement_fv_ideal']]) || 0) - 
                      (parseFloat(rowData[hdr['retirement_fv_actual']]) || 0);
  
  if (fvDifference > 100000) {
    addCalloutBox(body,
      `Long-term Growth: ${formatCurrency(fvDifference)} additional retirement wealth`,
      '🚀'
    );
  }
}

/**
 * Add future projections with visual elements
 */
function addFutureProjectionsWithCharts(body, rowData, hdr) {
  const currentAge = parseInt(rowData[hdr['Current_Age']]) || 30;
  const retirementAge = 65;
  const yearsToRetirement = retirementAge - currentAge;
  
  const intro = body.appendParagraph(
    `Based on your current trajectory and our optimization strategy, here's how your retirement savings will grow over the next ${yearsToRetirement} years:`
  );
  formatText(intro, 'body');
  
  body.appendParagraph('');
  
  // Create projection table
  const projTable = body.appendTable();
  const headerRow = projTable.appendTableRow();
  headerRow.appendTableCell('Milestone');
  headerRow.appendTableCell('Current Path');
  headerRow.appendTableCell('Optimized Path');
  headerRow.appendTableCell('Difference');
  
  // Calculate milestones
  const milestones = [
    { years: 5, label: 'In 5 Years' },
    { years: 10, label: 'In 10 Years' },
    { years: 20, label: 'In 20 Years' },
    { years: yearsToRetirement, label: `At Retirement (${retirementAge})` }
  ];
  
  const monthlyActual = calculateTotalMonthly(rowData, hdr, 'actual');
  const monthlyIdeal = calculateTotalMonthly(rowData, hdr, 'ideal');
  const returnRate = 0.07; // 7% annual return
  
  milestones.forEach(milestone => {
    if (milestone.years <= yearsToRetirement) {
      const fvActual = calculateFutureValue(monthlyActual, returnRate / 12, milestone.years * 12);
      const fvIdeal = calculateFutureValue(monthlyIdeal, returnRate / 12, milestone.years * 12);
      const difference = fvIdeal - fvActual;
      
      const row = projTable.appendTableRow();
      row.appendTableCell(milestone.label);
      row.appendTableCell(formatCurrency(fvActual));
      row.appendTableCell(formatCurrency(fvIdeal));
      row.appendTableCell('+' + formatCurrency(difference));
    }
  });
  
  formatTable(projTable);
}

/**
 * Create branded vehicle recommendations table
 */
function populateBrandedVehicleTable(body, recommendations) {
  body.appendParagraph('');
  
  const tableIntro = body.appendParagraph('Your personalized investment vehicle recommendations:');
  formatText(tableIntro, 'body');
  
  const table = body.appendTable();
  
  // Header row
  const headerRow = table.appendTableRow();
  headerRow.appendTableCell('Investment Vehicle');
  headerRow.appendTableCell('Current Monthly');
  headerRow.appendTableCell('Recommended');
  headerRow.appendTableCell('Action Required');
  
  // Data rows
  recommendations.forEach(rec => {
    const row = table.appendTableRow();
    row.appendTableCell(rec.name);
    row.appendTableCell(formatCurrency(rec.actual));
    row.appendTableCell(formatCurrency(rec.ideal));
    
    let action = '';
    if (rec.ideal > rec.actual) {
      if (rec.actual === 0) {
        action = '🟢 Open & Fund';
      } else {
        action = '🟡 Increase';
      }
    } else if (rec.ideal === rec.actual && rec.actual > 0) {
      action = '✅ Optimal';
    }
    
    row.appendTableCell(action);
  });
  
  formatTable(table);
  
  return table;
}

/**
 * Add implementation checklist
 */
function addImplementationChecklist(body, recommendations) {
  addBrandedDivider(body, '30-Day Implementation Checklist');
  
  const checklistIntro = body.appendParagraph('Follow this checklist to implement your optimized strategy:');
  formatText(checklistIntro, 'body');
  
  body.appendParagraph('');
  
  // Week 1
  const week1 = body.appendParagraph('Week 1: Foundation');
  formatText(week1, 'heading3', BRANDING_CONFIG.colors.secondary);
  
  const week1Items = [
    '□ Review this blueprint with your spouse/partner',
    '□ Contact HR about 401(k) contribution changes',
    '□ Research IRA custodians (Vanguard, Fidelity, Schwab)'
  ];
  
  week1Items.forEach(item => {
    const checkItem = body.appendParagraph(item);
    checkItem.setIndentFirstLine(18);
    formatText(checkItem, 'body');
  });
  
  body.appendParagraph('');
  
  // Week 2
  const week2 = body.appendParagraph('Week 2: Account Setup');
  formatText(week2, 'heading3', BRANDING_CONFIG.colors.secondary);
  
  const week2Items = [
    '□ Open recommended IRA accounts',
    '□ Set up automatic monthly contributions',
    '□ Update 401(k) contribution percentages'
  ];
  
  week2Items.forEach(item => {
    const checkItem = body.appendParagraph(item);
    checkItem.setIndentFirstLine(18);
    formatText(checkItem, 'body');
  });
  
  body.appendParagraph('');
  
  // Week 3-4
  const week34 = body.appendParagraph('Weeks 3-4: Optimization');
  formatText(week34, 'heading3', BRANDING_CONFIG.colors.secondary);
  
  const week34Items = [
    '□ Complete any backdoor Roth conversions',
    '□ Review and adjust investment allocations',
    '□ Schedule quarterly review reminder'
  ];
  
  week34Items.forEach(item => {
    const checkItem = body.appendParagraph(item);
    checkItem.setIndentFirstLine(18);
    formatText(checkItem, 'body');
  });
}

/**
 * Add closing page
 */
function addClosingPage(body, firstName) {
  const closingTitle = body.appendParagraph('YOUR JOURNEY BEGINS TODAY');
  closingTitle.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  formatText(closingTitle, 'heading1');
  
  body.appendParagraph('');
  body.appendParagraph('');
  
  const message = body.appendParagraph(
    `Dear ${firstName},\n\n` +
    `This blueprint represents more than just numbers and strategies – it's your roadmap to financial freedom. ` +
    `Every recommendation has been carefully tailored to your unique situation, goals, and dreams.\n\n` +
    `The path ahead is clear, and the opportunity is significant. The only thing standing between you and ` +
    `your optimized financial future is taking that first step.\n\n` +
    `Remember: The best time to plant a tree was 20 years ago. The second best time is now.\n\n` +
    `We're here to support you every step of the way.`
  );
  formatText(message, 'body');
  
  body.appendParagraph('');
  body.appendParagraph('');
  
  const signature = body.appendParagraph('To your success,');
  formatText(signature, 'body');
  
  const team = body.appendParagraph('The ' + BRANDING_CONFIG.company.name + ' Team');
  formatText(team, 'heading3', BRANDING_CONFIG.colors.primary);
  
  body.appendParagraph('');
  body.appendParagraph('');
  
  // Add contact info in a styled box
  addBrandedDivider(body);
  
  const contactTitle = body.appendParagraph('Questions? We\'re Here to Help');
  contactTitle.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  formatText(contactTitle, 'heading3');
  
  const contactInfo = body.appendParagraph(
    `📧 ${BRANDING_CONFIG.company.email}\n` +
    `📞 ${BRANDING_CONFIG.company.phone}\n` +
    `🌐 ${BRANDING_CONFIG.company.website}`
  );
  contactInfo.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
  formatText(contactInfo, 'body');
}

/**
 * Add appendix
 */
function addAppendix(body) {
  const appendixTitle = body.appendParagraph('APPENDIX: RESOURCES & GLOSSARY');
  appendixTitle.setHeading(DocumentApp.ParagraphHeading.HEADING1);
  formatText(appendixTitle, 'heading1');
  
  // Recommended Resources
  const resourcesTitle = body.appendParagraph('Recommended Resources');
  formatText(resourcesTitle, 'heading2');
  
  const resources = [
    '• IRS Retirement Topics: www.irs.gov/retirement-plans',
    '• Backdoor Roth Guide: www.whitecoatinvestor.com/backdoor-roth-ira',
    '• HSA Ultimate Guide: www.madfientist.com/ultimate-retirement-account',
    '• Solo 401(k) Calculator: www.mysolo401k.net/calculator'
  ];
  
  resources.forEach(resource => {
    const resourcePara = body.appendParagraph(resource);
    formatText(resourcePara, 'body');
  });
  
  body.appendParagraph('');
  
  // Glossary
  const glossaryTitle = body.appendParagraph('Glossary of Terms');
  formatText(glossaryTitle, 'heading2');
  
  const terms = [
    { term: '401(k) Match', def: 'Free money from your employer when you contribute to your 401(k)' },
    { term: 'Backdoor Roth', def: 'Strategy to contribute to Roth IRA despite income limits' },
    { term: 'HSA', def: 'Health Savings Account - triple tax advantage for medical expenses' },
    { term: 'Solo 401(k)', def: 'Retirement plan for self-employed with highest contribution limits' }
  ];
  
  terms.forEach(({ term, def }) => {
    const termPara = body.appendParagraph(`${term}: ${def}`);
    const text = termPara.editAsText();
    text.setBold(0, term.length, true);
    formatText(termPara, 'body');
  });
}

/**
 * Calculate future value helper
 */
function calculateFutureValue(monthlyPayment, monthlyRate, months) {
  if (monthlyRate === 0) return monthlyPayment * months;
  return monthlyPayment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
}

/**
 * Test the branded document generation
 */
function testBrandedGeneration() {
  // First test just the branding
  testBranding();
  
  Logger.log('Branded document test complete. Check your Google Drive for the test document.');
}
// ═══════════════════════════════════════════════════════════════════════════════
// BRANDED DOCUMENT GENERATION - Safe Version with Professional Formatting
// Fixed version with comprehensive error handling
// ═══════════════════════════════════════════════════════════════════════════════

// Constants for magic numbers
const RETIREMENT_AGE = 65;
const DEFAULT_RETURN_RATE = 0.07;
const MONTHS_PER_YEAR = 12;

/**
 * Utility function to safely check if a global variable exists
 */
function checkGlobalExists(globalName) {
  try {
    return eval(`typeof ${globalName} !== 'undefined' && ${globalName} !== null`);
  } catch (e) {
    return false;
  }
}

/**
 * Safely get value from rowData with column validation
 */
function safeGetValue(rowData, hdr, columnName, defaultValue = '') {
  if (!hdr || !rowData) return defaultValue;
  
  const index = hdr[columnName];
  if (index === undefined || index === null) {
    Logger.log(`Warning: Column "${columnName}" not found in headers`);
    return defaultValue;
  }
  
  return rowData[index] !== undefined ? rowData[index] : defaultValue;
}

/**
 * Utility function to truncate narratives
 */
function truncateNarrative(text, maxLength) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Calculate total monthly contributions with validation
 */
function calculateTotalMonthly(rowData, hdr, type) {
  if (!rowData || !hdr || !type) return 0;
  
  let total = 0;
  
  // Define the columns to sum based on type
  // Note: Using actual column names from the spreadsheet
  const columns = type === 'actual' ? [
    'retirement_traditional_401k_actual',
    'retirement_roth_ira_actual',
    'retirement_traditional_ira_actual',
    'retirement_backdoor_roth_ira_actual',
    'retirement_solo_401k_employee_actual',
    'retirement_solo_401k_employer_actual',
    'retirement_401k_catch_up_actual',
    'retirement_ira_catch_up_actual',
    'retirement_hsa_actual',
    'education_combined_cesa_actual',
    'health_hsa_actual'
  ] : [
    'retirement_traditional_401k_ideal',
    'retirement_roth_ira_ideal',
    'retirement_traditional_ira_ideal',
    'retirement_backdoor_roth_ira_ideal',
    'retirement_solo_401k_employee_ideal',
    'retirement_solo_401k_employer_ideal',
    'retirement_401k_catch_up_ideal',
    'retirement_ira_catch_up_ideal',
    'retirement_hsa_ideal',
    'education_combined_cesa_ideal',
    'health_hsa_ideal'
  ];
  
  // Sum up all the columns safely
  columns.forEach(col => {
    const value = parseFloat(safeGetValue(rowData, hdr, col, 0)) || 0;
    total += value;
  });
  
  return total;
}

/**
 * Get vehicle recommendations from row data with validation
 */
function getVehicleRecommendations(rowData, hdr) {
  if (!rowData || !hdr) return [];
  
  const vehicles = [
    { name: 'Traditional 401(k)', actual: 'retirement_traditional_401k_actual', ideal: 'retirement_traditional_401k_ideal' },
    { name: 'Traditional IRA', actual: 'retirement_traditional_ira_actual', ideal: 'retirement_traditional_ira_ideal' },
    { name: 'Roth IRA', actual: 'retirement_roth_ira_actual', ideal: 'retirement_roth_ira_ideal' },
    { name: 'Backdoor Roth IRA', actual: 'retirement_backdoor_roth_ira_actual', ideal: 'retirement_backdoor_roth_ira_ideal' },
    { name: 'Solo 401(k) Employee', actual: 'retirement_solo_401k_employee_actual', ideal: 'retirement_solo_401k_employee_ideal' },
    { name: 'Solo 401(k) Employer', actual: 'retirement_solo_401k_employer_actual', ideal: 'retirement_solo_401k_employer_ideal' },
    { name: 'HSA', actual: 'health_hsa_actual', ideal: 'health_hsa_ideal' },
    { name: 'CESA', actual: 'education_combined_cesa_actual', ideal: 'education_combined_cesa_ideal' }
  ];
  
  return vehicles.map(v => ({
    name: v.name,
    actual: parseFloat(safeGetValue(rowData, hdr, v.actual, 0)) || 0,
    ideal: parseFloat(safeGetValue(rowData, hdr, v.ideal, 0)) || 0
  })).filter(v => v.actual > 0 || v.ideal > 0);
}

/**
 * Format currency values safely
 */
function formatCurrency(amount) {
  try {
    if (amount === null || amount === undefined) return '$0';
    if (typeof amount === 'string') amount = parseFloat(amount) || 0;
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  } catch (e) {
    Logger.log('Error formatting currency: ' + e.toString());
    return '$' + amount;
  }
}

/**
 * Safe wrapper for narrative functions
 */
function safeGenerateNarrative(narrativeFn, rowData, hdr, ...args) {
  try {
    if (typeof narrativeFn === 'function') {
      return narrativeFn(rowData, hdr, ...args) || '';
    }
    Logger.log('Warning: Narrative function not available');
    return '';
  } catch (e) {
    Logger.log('Error generating narrative: ' + e.toString());
    return '';
  }
}

/**
 * Generate a branded retirement blueprint document
 * This is the safe version with professional formatting and branding
 */
function generateDocumentBranded() {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const row = sheet.getActiveRange().getRow();
    
    if (row < 3) {
      throw new Error('Please select a data row (row 3 or below)');
    }
    
    Logger.log(`Starting BRANDED document generation for row ${row}`);
    
    // Check dependencies
    if (!checkGlobalExists('PROFILE_CONFIG')) {
      throw new Error('Profile configuration not loaded. Please ensure code.js is deployed.');
    }
    
    if (!checkGlobalExists('BRANDING_CONFIG')) {
      throw new Error('Branding configuration not loaded. Please ensure Document_Branding.js is deployed.');
    }
    
    // Get headers and data safely (headers are in row 2)
    const headerRange = sheet.getRange(2, 1, 1, sheet.getLastColumn()).getValues();
    if (!headerRange || headerRange.length === 0 || !headerRange[0]) {
      throw new Error('No headers found in row 2');
    }
    const headers = headerRange[0];
    
    const rowDataRange = sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues();
    if (!rowDataRange || rowDataRange.length === 0 || !rowDataRange[0]) {
      throw new Error('No data found in selected row');
    }
    const rowData = rowDataRange[0];
    
    // Create header map
    const hdr = {};
    headers.forEach((header, index) => {
      if (header) hdr[header] = index;
    });
    
    // Log ProfileID for debugging
    const profileId = safeGetValue(rowData, hdr, 'ProfileID', 'Unknown');
    Logger.log(`ProfileID from row: "${profileId}"`);
    
    // Generate the branded document
    const docUrl = generateBrandedDocumentCore(rowData, hdr);
    
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
 * Core branded document generation with comprehensive error handling
 */
function generateBrandedDocumentCore(rowData, hdr) {
  // Get client info safely
  const clientName = safeGetValue(rowData, hdr, 'Full_Name', 'Client');
  const firstNameParts = clientName.split(' ');
  const firstName = firstNameParts.length > 0 ? firstNameParts[0] : clientName;
  
  const profileId = safeGetValue(rowData, hdr, 'ProfileID', 'Unknown');
  
  // Get profile configuration safely
  let profileConfig = { 
    title: 'General Profile', 
    color: '#666666',
    description: 'Standard retirement planning profile'
  };
  
  if (checkGlobalExists('PROFILE_CONFIG') && PROFILE_CONFIG[profileId]) {
    profileConfig = PROFILE_CONFIG[profileId];
  } else {
    Logger.log(`Using default profile config for ProfileID: "${profileId}"`);
  }
  
  // Create new document
  const docName = `Retirement Blueprint - ${clientName} - ${new Date().toLocaleDateString()}`;
  Logger.log(`Creating document: ${docName}`);
  const newDoc = DocumentApp.create(docName);
  const body = newDoc.getBody();
  Logger.log(`Document created with ID: ${newDoc.getId()}`);
  
  // Clear default content
  body.clear();
  
  // Apply base branding if available
  if (checkGlobalExists('applyBranding') && typeof applyBranding === 'function') {
    try {
      applyBranding(newDoc);
    } catch (e) {
      Logger.log('Warning: Could not apply branding - ' + e.toString());
    }
  }
  
  // Build document sections with error handling for each
  try {
    // TITLE PAGE
    addBrandedTitlePageSafe(body, clientName, profileConfig);
    
    // TABLE OF CONTENTS
    body.appendPageBreak();
    addTableOfContentsSafe(body);
    
    // EXECUTIVE SUMMARY
    body.appendPageBreak();
    addExecutiveSummarySafe(body, rowData, hdr);
    
    // CHAPTER 1: Current Path
    body.appendPageBreak();
    addChapter1Safe(body, rowData, hdr);
    
    // CHAPTER 2: Priorities
    body.appendPageBreak();
    addChapter2Safe(body, rowData, hdr);
    
    // CHAPTER 3: Opportunity
    body.appendPageBreak();
    addChapter3Safe(body, rowData, hdr);
    
    // CHAPTER 4: Future Projections
    body.appendPageBreak();
    addChapter4Safe(body, rowData, hdr);
    
    // CHAPTER 5: Your Vehicles
    body.appendPageBreak();
    addChapter5Safe(body, rowData, hdr, profileId);
    
    // CHAPTER 6: Action Plan
    body.appendPageBreak();
    addChapter6Safe(body, rowData, hdr);
    
    // CLOSING PAGE
    body.appendPageBreak();
    addClosingPageSafe(body, firstName);
    
    // APPENDIX
    body.appendPageBreak();
    addAppendixSafe(body);
    
  } catch (sectionError) {
    Logger.log('Error building document sections: ' + sectionError.toString());
    body.appendParagraph('Error generating some sections. Please check the logs.');
  }
  
  const docUrl = newDoc.getUrl();
  Logger.log(`Document URL: ${docUrl}`);
  return docUrl;
}

// Safe section builders with error handling

function addBrandedTitlePageSafe(body, clientName, profileConfig) {
  try {
    // Add spacing
    for (let i = 0; i < 3; i++) {
      body.appendParagraph('');
    }
    
    // Main title
    const title = body.appendParagraph('RETIREMENT BLUEPRINT');
    title.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    title.setHeading(DocumentApp.ParagraphHeading.TITLE);
    
    // Subtitle
    const subtitle = body.appendParagraph('Your Personalized Path to Financial Freedom');
    subtitle.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    
    // Client info
    body.appendParagraph('');
    body.appendParagraph('');
    
    const preparedFor = body.appendParagraph('Prepared exclusively for');
    preparedFor.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    
    const clientNamePara = body.appendParagraph(clientName);
    clientNamePara.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    
    const profilePara = body.appendParagraph(`Profile: ${profileConfig.title || 'General'}`);
    profilePara.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    
    // Date
    body.appendParagraph('');
    const datePara = body.appendParagraph(new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }));
    datePara.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    
  } catch (e) {
    Logger.log('Error in title page: ' + e.toString());
    body.appendParagraph('RETIREMENT BLUEPRINT');
  }
}

function addTableOfContentsSafe(body) {
  try {
    const tocTitle = body.appendParagraph('TABLE OF CONTENTS');
    tocTitle.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    
    body.appendParagraph('');
    
    const sections = [
      'Executive Summary',
      'Chapter 1: Your Current Path',
      'Chapter 2: Your Priorities',
      'Chapter 3: Your Opportunity',
      'Chapter 4: Future Projections',
      'Chapter 5: Your Investment Vehicles',
      'Chapter 6: Your Action Plan',
      'Next Steps',
      'Appendix: Resources & Glossary'
    ];
    
    sections.forEach(section => {
      body.appendParagraph(section);
    });
  } catch (e) {
    Logger.log('Error in table of contents: ' + e.toString());
  }
}

function addExecutiveSummarySafe(body, rowData, hdr) {
  try {
    const summaryTitle = body.appendParagraph('EXECUTIVE SUMMARY');
    summaryTitle.setHeading(DocumentApp.ParagraphHeading.HEADING1);
    
    body.appendParagraph('');
    
    // Calculate key metrics safely
    const actualTotal = calculateTotalMonthly(rowData, hdr, 'actual');
    const idealTotal = calculateTotalMonthly(rowData, hdr, 'ideal');
    const difference = idealTotal - actualTotal;
    const retirementFvIdeal = parseFloat(safeGetValue(rowData, hdr, 'retirement_fv_ideal', 0)) || 0;
    
    // Get profile info safely
    const profileId = safeGetValue(rowData, hdr, 'ProfileID', 'Unknown');
    const profileTitle = (checkGlobalExists('PROFILE_CONFIG') && PROFILE_CONFIG[profileId]) 
      ? PROFILE_CONFIG[profileId].title 
      : 'Custom Profile';
    
    // Summary points
    const summaryText = `
Key Findings:
• Current Monthly Retirement Savings: ${formatCurrency(actualTotal)}
• Optimized Monthly Savings Potential: ${formatCurrency(idealTotal)}
• Monthly Increase Opportunity: ${formatCurrency(difference)}
• Projected Retirement Value: ${formatCurrency(retirementFvIdeal)}
• Investment Profile: ${profileTitle}

By optimizing your retirement strategy, you can potentially increase your monthly contributions by ${formatCurrency(difference)} and add ${formatCurrency(retirementFvIdeal)} to your retirement savings.
    `;
    
    body.appendParagraph(summaryText);
    
  } catch (e) {
    Logger.log('Error in executive summary: ' + e.toString());
    body.appendParagraph('Executive summary could not be generated. Please check your data.');
  }
}

function addChapter1Safe(body, rowData, hdr) {
  try {
    const chapter1 = body.appendParagraph('CHAPTER 1: YOUR CURRENT PATH');
    chapter1.setHeading(DocumentApp.ParagraphHeading.HEADING1);
    
    // Try to generate narrative
    let narrative = '';
    if (checkGlobalExists('generateOpeningNarrative') && typeof generateOpeningNarrative === 'function') {
      narrative = safeGenerateNarrative(generateOpeningNarrative, rowData, hdr);
    }
    
    if (!narrative) {
      // Fallback content
      narrative = `Based on the information provided, we've analyzed your current financial situation and created this personalized retirement blueprint to help you achieve your goals.`;
    }
    
    body.appendParagraph(truncateNarrative(narrative, 1500));
    
    // Add financial snapshot
    body.appendParagraph('');
    body.appendParagraph('Financial Snapshot:');
    
    const income = formatCurrency(safeGetValue(rowData, hdr, 'gross_annual_income', 0));
    const netMonthly = formatCurrency(safeGetValue(rowData, hdr, 'Net_Monthly_Income', 0));
    const savingsRate = safeGetValue(rowData, hdr, 'Allocation_Percentage', '0') + '%';
    
    body.appendParagraph(`• Annual Income: ${income}`);
    body.appendParagraph(`• Monthly Net Income: ${netMonthly}`);
    body.appendParagraph(`• Current Savings Rate: ${savingsRate}`);
    
  } catch (e) {
    Logger.log('Error in chapter 1: ' + e.toString());
    body.appendParagraph('Your current financial path information.');
  }
}

function addChapter2Safe(body, rowData, hdr) {
  try {
    const chapter2 = body.appendParagraph('CHAPTER 2: YOUR PRIORITIES');
    chapter2.setHeading(DocumentApp.ParagraphHeading.HEADING1);
    
    // Priorities
    const retirementImp = parseInt(safeGetValue(rowData, hdr, 'retirement_importance', 5)) || 5;
    const educationImp = parseInt(safeGetValue(rowData, hdr, 'education_importance', 3)) || 3;
    const healthImp = parseInt(safeGetValue(rowData, hdr, 'health_importance', 4)) || 4;
    
    body.appendParagraph('Your Financial Priorities:');
    body.appendParagraph(`• Retirement Security: ${retirementImp}/7`);
    body.appendParagraph(`• Education Funding: ${educationImp}/7`);
    body.appendParagraph(`• Healthcare Planning: ${healthImp}/7`);
    
  } catch (e) {
    Logger.log('Error in chapter 2: ' + e.toString());
    body.appendParagraph('Your priority information.');
  }
}

function addChapter3Safe(body, rowData, hdr) {
  try {
    const chapter3 = body.appendParagraph('CHAPTER 3: YOUR OPPORTUNITY');
    chapter3.setHeading(DocumentApp.ParagraphHeading.HEADING1);
    
    const actualTotal = calculateTotalMonthly(rowData, hdr, 'actual');
    const idealTotal = calculateTotalMonthly(rowData, hdr, 'ideal');
    const monthlyIncrease = idealTotal - actualTotal;
    const yearlyIncrease = monthlyIncrease * MONTHS_PER_YEAR;
    
    body.appendParagraph(`By optimizing your retirement strategy, you can:`);
    body.appendParagraph(`• Increase monthly contributions by ${formatCurrency(monthlyIncrease)}`);
    body.appendParagraph(`• Add ${formatCurrency(yearlyIncrease)} annually to tax-advantaged accounts`);
    
  } catch (e) {
    Logger.log('Error in chapter 3: ' + e.toString());
    body.appendParagraph('Your optimization opportunities.');
  }
}

function addChapter4Safe(body, rowData, hdr) {
  try {
    const chapter4 = body.appendParagraph('CHAPTER 4: FUTURE PROJECTIONS');
    chapter4.setHeading(DocumentApp.ParagraphHeading.HEADING1);
    
    const currentAge = parseInt(safeGetValue(rowData, hdr, 'Current_Age', 30)) || 30;
    const yearsToRetirement = Math.max(RETIREMENT_AGE - currentAge, 5);
    
    body.appendParagraph(`Based on your optimization strategy, here's your projected growth over ${yearsToRetirement} years.`);
    
    // Simple projection table
    const monthlyIdeal = calculateTotalMonthly(rowData, hdr, 'ideal');
    const fv = calculateFutureValueSafe(monthlyIdeal, DEFAULT_RETURN_RATE / MONTHS_PER_YEAR, yearsToRetirement * MONTHS_PER_YEAR);
    
    body.appendParagraph(`Projected value at retirement: ${formatCurrency(fv)}`);
    
  } catch (e) {
    Logger.log('Error in chapter 4: ' + e.toString());
    body.appendParagraph('Your future projections.');
  }
}

function addChapter5Safe(body, rowData, hdr, profileId) {
  try {
    const chapter5 = body.appendParagraph('CHAPTER 5: YOUR INVESTMENT VEHICLES');
    chapter5.setHeading(DocumentApp.ParagraphHeading.HEADING1);
    
    const recommendations = getVehicleRecommendations(rowData, hdr);
    
    if (recommendations.length > 0) {
      body.appendParagraph('Recommended Investment Vehicles:');
      recommendations.forEach(rec => {
        const status = rec.ideal > rec.actual ? '↑ Increase' : rec.actual > 0 ? '✓ Optimal' : '→ Consider';
        body.appendParagraph(`• ${rec.name}: ${formatCurrency(rec.actual)} → ${formatCurrency(rec.ideal)} ${status}`);
      });
    } else {
      body.appendParagraph('Vehicle recommendations will be customized based on your specific situation.');
    }
    
  } catch (e) {
    Logger.log('Error in chapter 5: ' + e.toString());
    body.appendParagraph('Your investment vehicle recommendations.');
  }
}

function addChapter6Safe(body, rowData, hdr) {
  try {
    const chapter6 = body.appendParagraph('CHAPTER 6: YOUR ACTION PLAN');
    chapter6.setHeading(DocumentApp.ParagraphHeading.HEADING1);
    
    body.appendParagraph('Immediate Action Steps:');
    body.appendParagraph('1. Review this blueprint with your spouse/partner');
    body.appendParagraph('2. Contact HR about retirement plan changes');
    body.appendParagraph('3. Open recommended investment accounts');
    body.appendParagraph('4. Set up automatic contributions');
    body.appendParagraph('5. Schedule quarterly reviews');
    
  } catch (e) {
    Logger.log('Error in chapter 6: ' + e.toString());
    body.appendParagraph('Your personalized action plan.');
  }
}

function addClosingPageSafe(body, firstName) {
  try {
    const closingTitle = body.appendParagraph('YOUR JOURNEY BEGINS TODAY');
    closingTitle.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    
    body.appendParagraph('');
    
    const message = `Dear ${firstName},

This blueprint represents your roadmap to financial freedom. Every recommendation has been tailored to your unique situation.

The path ahead is clear, and the opportunity is significant. The only thing standing between you and your optimized financial future is taking that first step.

We're here to support you every step of the way.`;
    
    body.appendParagraph(message);
    
  } catch (e) {
    Logger.log('Error in closing page: ' + e.toString());
    body.appendParagraph('Thank you for using Retirement Blueprint.');
  }
}

function addAppendixSafe(body) {
  try {
    const appendixTitle = body.appendParagraph('APPENDIX: RESOURCES & GLOSSARY');
    appendixTitle.setHeading(DocumentApp.ParagraphHeading.HEADING1);
    
    body.appendParagraph('Recommended Resources:');
    body.appendParagraph('• IRS Retirement Topics: www.irs.gov/retirement-plans');
    body.appendParagraph('• Investment Education: www.investor.gov');
    
    body.appendParagraph('');
    body.appendParagraph('Key Terms:');
    body.appendParagraph('• 401(k): Employer-sponsored retirement plan');
    body.appendParagraph('• IRA: Individual Retirement Account');
    body.appendParagraph('• HSA: Health Savings Account');
    
  } catch (e) {
    Logger.log('Error in appendix: ' + e.toString());
  }
}

/**
 * Safe future value calculation
 */
function calculateFutureValueSafe(monthlyPayment, monthlyRate, months) {
  try {
    if (!monthlyPayment || monthlyPayment <= 0) return 0;
    if (!monthlyRate || monthlyRate <= 0) return monthlyPayment * months;
    if (!months || months <= 0) return 0;
    
    return monthlyPayment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  } catch (e) {
    Logger.log('Error calculating future value: ' + e.toString());
    return monthlyPayment * months;
  }
}

/**
 * Create the safe version as the main function
 */
function generateDocumentBrandedSafe() {
  return generateDocumentBranded();
}
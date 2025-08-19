// Profile 2 Form Automation Helper
// This script helps automate filling out the Profile 2 (ROBS Curious) form for testing

/**
 * Generate a bookmarklet that auto-fills the form
 * Copy the output and save as a browser bookmark
 */
function generateFormBookmarklet(scenario) {
  const scenarios = {
    w2Employee: {
      name: 'W-2 Employee Test',
      values: {
        // Basic info
        fullName: 'Test W2 Employee',
        email: 'test.w2@example.com', 
        studentId: '1234TW',
        // Demographics
        age: '45',
        income: '120000',
        filing: 'Married Filing Jointly',
        work: 'W-2 employee',
        // Profile questions
        q44: '75000',  // rollover
        q45: '0',      // business savings
        q46: 'Yes',    // employer 401k
        q47: 'Yes',    // match
        q48: '50% up to 6%', // match percent
        q49: 'Yes',    // roth 401k
        q50: 'No'      // spouse in business
      }
    },
    selfEmployed: {
      name: 'Self-Employed Test',
      values: {
        fullName: 'Test Business Owner',
        email: 'test.biz@example.com',
        studentId: '5678TB',
        age: '52',
        income: '150000',
        filing: 'Single',
        work: 'Self-employed',
        q44: '200000',
        q45: '50000',
        q46: 'No',
        q47: 'No',
        q48: '',
        q49: 'No',
        q50: 'No'
      }
    },
    both: {
      name: 'Both W-2 and Self-Employed',
      values: {
        fullName: 'Test Hybrid Worker',
        email: 'test.both@example.com',
        studentId: '9012TH',
        age: '40',
        income: '180000',
        filing: 'Married Filing Jointly',
        work: 'Both',
        q44: '50000',
        q45: '20000',
        q46: 'Yes',
        q47: 'Yes',
        q48: '100% up to 3%',
        q49: 'No',
        q50: 'No'
      }
    },
    spouseInBusiness: {
      name: 'Family Business Test',
      values: {
        fullName: 'Test Family Business',
        email: 'test.family@example.com',
        studentId: '3456TF',
        age: '48',
        income: '200000',
        filing: 'Married Filing Jointly',
        work: 'Self-employed',
        q44: '150000',
        q45: '100000',
        q46: 'No',
        q47: 'No',
        q48: '',
        q49: 'No',
        q50: 'Yes'
      }
    },
    highIncome: {
      name: 'High Income Phase-out',
      values: {
        fullName: 'Test High Income',
        email: 'test.high@example.com',
        studentId: '7890TH',
        age: '35',
        income: '250000',
        filing: 'Single',
        work: 'W-2 employee',
        q44: '100000',
        q45: '0',
        q46: 'Yes',
        q47: 'No',
        q48: '',
        q49: 'Yes',
        q50: 'No'
      }
    }
  };
  
  const data = scenarios[scenario] || scenarios.w2Employee;
  
  // Create the bookmarklet code
  const bookmarkletCode = `
    javascript:(function(){
      // Helper function to set input value and trigger change
      function setInput(selector, value) {
        const el = document.querySelector(selector);
        if (el) {
          el.value = value;
          el.dispatchEvent(new Event('input', {bubbles: true}));
          el.dispatchEvent(new Event('change', {bubbles: true}));
        }
      }
      
      // Helper function to click radio/checkbox
      function clickOption(text) {
        const labels = Array.from(document.querySelectorAll('label'));
        const label = labels.find(l => l.textContent.trim() === text);
        if (label) {
          const input = label.querySelector('input') || label.previousElementSibling;
          if (input) input.click();
        }
      }
      
      // Fill basic info
      const inputs = document.querySelectorAll('input[type="text"], input[type="email"]');
      if (inputs[0]) setInput('input[type="text"]', '${data.values.fullName}');
      if (inputs[1]) setInput('input[type="email"]', '${data.values.email}');
      if (inputs[2]) inputs[2].value = '${data.values.studentId}';
      
      // Fill other text fields by position
      const allTextInputs = Array.from(document.querySelectorAll('input[type="text"]'));
      
      // Age (usually around position 3-5)
      const ageInput = allTextInputs.find(input => {
        const label = input.closest('div')?.textContent || '';
        return label.includes('age') || label.includes('Age');
      });
      if (ageInput) ageInput.value = '${data.values.age}';
      
      // Income
      const incomeInput = allTextInputs.find(input => {
        const label = input.closest('div')?.textContent || '';
        return label.includes('income') || label.includes('Income');
      });
      if (incomeInput) incomeInput.value = '${data.values.income}';
      
      // Click radio buttons
      clickOption('${data.values.filing}');
      clickOption('${data.values.work}');
      
      // Fill profile questions (these are usually the last text inputs)
      const profileInputs = allTextInputs.slice(-7); // Last 7 text inputs
      if (profileInputs[0]) profileInputs[0].value = '${data.values.q44}';
      if (profileInputs[1]) profileInputs[1].value = '${data.values.q45}';
      if (profileInputs[2]) profileInputs[2].value = '${data.values.q48}'; // match percent
      
      // Click Yes/No for employer questions
      setTimeout(() => {
        clickOption('${data.values.q46}'); // employer 401k
        clickOption('${data.values.q47}'); // match
        clickOption('${data.values.q49}'); // roth
        clickOption('${data.values.q50}'); // spouse
      }, 500);
      
      alert('Form filled with ${data.name} data. Please review and complete any missing fields.');
    })();
  `;
  
  // Clean up the code for bookmarklet format
  const compressed = bookmarkletCode
    .replace(/\n/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  console.log(`\n=== BOOKMARKLET FOR ${data.name.toUpperCase()} ===\n`);
  console.log('1. Copy the code below:');
  console.log('\n' + compressed + '\n');
  console.log('2. Create a new bookmark in your browser');
  console.log('3. Set the URL to the code above');
  console.log('4. Name it "Fill Profile 2 - ' + data.name + '"');
  console.log('5. Navigate to the form and click the bookmark\n');
  
  return compressed;
}

/**
 * Alternative: Generate a URL with pre-filled values
 * This works if the form supports URL parameters
 */
function generatePrefilledURL(formId, scenario) {
  const baseUrl = `https://docs.google.com/forms/d/${formId}/viewform`;
  
  // Map our data to form entry IDs (you'll need to inspect the form to get these)
  const entryMappings = {
    fullName: 'entry.XXXXXX',     // Replace with actual entry IDs
    email: 'entry.XXXXXX',
    studentId: 'entry.XXXXXX',
    // ... etc
  };
  
  // Build URL parameters
  const params = new URLSearchParams();
  Object.entries(entryMappings).forEach(([field, entryId]) => {
    if (scenario.values[field]) {
      params.append(entryId, scenario.values[field]);
    }
  });
  
  return `${baseUrl}?${params.toString()}`;
}

/**
 * Create test data that can be imported via CSV
 */
function generateTestDataCSV() {
  const headers = [
    'Full Name', 'Email', 'Student ID', 'Current Age', 'Gross Annual Income',
    'Filing Status', 'Work Situation', 'Tax Minimization', 'HSA Eligibility',
    'Number of Children', 'Rollover Balance', 'Business Savings',
    'Employer 401k', 'Employer Match', 'Match Percent', 'Roth Option',
    'Spouse in Business'
  ];
  
  const scenarios = [
    ['Test W2 Employee', 'test.w2@example.com', '1234TW', 45, 120000,
     'Married Filing Jointly', 'W-2 employee', 'Both', 'Yes', 2,
     75000, 0, 'Yes', 'Yes', '50% up to 6%', 'Yes', 'No'],
    ['Test Business Owner', 'test.biz@example.com', '5678TB', 52, 150000,
     'Single', 'Self-employed', 'Now', 'Yes', 0,
     200000, 50000, 'No', 'No', '', 'No', 'No'],
    ['Test Hybrid Worker', 'test.both@example.com', '9012TH', 40, 180000,
     'Married Filing Jointly', 'Both', 'Later', 'No', 1,
     50000, 20000, 'Yes', 'Yes', '100% up to 3%', 'No', 'No'],
    ['Test Family Business', 'test.family@example.com', '3456TF', 48, 200000,
     'Married Filing Jointly', 'Self-employed', 'Both', 'Yes', 3,
     150000, 100000, 'No', 'No', '', 'No', 'Yes'],
    ['Test High Income', 'test.high@example.com', '7890TH', 35, 250000,
     'Single', 'W-2 employee', 'Now', 'No', 0,
     100000, 0, 'Yes', 'No', '', 'Yes', 'No']
  ];
  
  // Create CSV content
  let csv = headers.join(',') + '\n';
  scenarios.forEach(row => {
    csv += row.map(val => `"${val}"`).join(',') + '\n';
  });
  
  console.log('\n=== TEST DATA CSV ===\n');
  console.log(csv);
  console.log('\nSave this as test_data.csv and use for bulk testing\n');
  
  return csv;
}

/**
 * Browser automation script using Chrome DevTools
 */
function generateAutomationScript(scenario) {
  const script = `
// Chrome DevTools Console Script
// Run this in the browser console while on the form page

async function fillForm() {
  const data = ${JSON.stringify(scenarios[scenario] || scenarios.w2Employee, null, 2)};
  
  // Helper to find and fill inputs
  const fillInput = (selector, value) => {
    const el = document.querySelector(selector);
    if (el) {
      el.value = value;
      el.dispatchEvent(new Event('input', {bubbles: true}));
    }
  };
  
  // Helper to click radio/checkbox by label text
  const clickByText = (text) => {
    const labels = Array.from(document.querySelectorAll('label'));
    const label = labels.find(l => l.textContent.includes(text));
    if (label) {
      const input = label.querySelector('input') || label.previousElementSibling;
      if (input) input.click();
    }
  };
  
  // Fill the form
  console.log('Filling form with test data...');
  
  // Add your form filling logic here based on the form structure
  
  console.log('Form filled! Please review before submitting.');
}

fillForm();
  `;
  
  console.log('\n=== BROWSER CONSOLE SCRIPT ===\n');
  console.log(script);
  console.log('\n1. Open the form in Chrome');
  console.log('2. Press F12 to open DevTools');
  console.log('3. Go to Console tab');
  console.log('4. Paste and run the script above\n');
  
  return script;
}

// Generate all helper scripts
function generateAllHelpers() {
  console.log('=== PROFILE 2 FORM AUTOMATION HELPERS ===\n');
  
  // Generate bookmarklets for each scenario
  ['w2Employee', 'selfEmployed', 'both', 'spouseInBusiness', 'highIncome'].forEach(scenario => {
    generateFormBookmarklet(scenario);
  });
  
  // Generate CSV data
  generateTestDataCSV();
  
  console.log('\n=== ADDITIONAL OPTIONS ===\n');
  console.log('1. Use Form Publisher add-on to create pre-filled links');
  console.log('2. Use Selenium or Puppeteer for full automation');
  console.log('3. Create a Google Apps Script web app that submits directly');
  console.log('4. Use browser extensions like "Form Filler" or "Autofill"');
}

// Run this to generate all helpers
generateAllHelpers();
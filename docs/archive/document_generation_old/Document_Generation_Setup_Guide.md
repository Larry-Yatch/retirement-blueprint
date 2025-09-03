# Document Generation Setup Guide

## Overview

The document generation system creates personalized Retirement Blueprint reports for clients after they complete Phase 3. It merges data from all three phases into a narrative document that explains their current vs. ideal allocations and provides actionable recommendations.

## What We've Built

### 1. Document_Generation.js
A complete document generation system that includes:
- **generateRetirementBlueprint()** - Main function to create documents
- **Template system** - Creates Google Docs from templates with {{placeholders}}
- **Vehicle recommendations table** - Dynamically generated table showing actual vs ideal allocations
- **Email integration** - Automatically sends PDF reports to clients
- **Menu system** - Easy access to document generation functions

### 2. Integration with Phase 3
- Documents generate automatically after Phase 3 completes
- Added to Code.js: `runPhase3()` now calls `generateRetirementBlueprint()`
- Non-blocking - if document generation fails, Phase 3 still completes

### 3. Universal Template Structure
The template includes:
- **Executive Summary** - Profile type and key metrics
- **Current vs Recommended Analysis** - Monthly contribution comparison
- **Future Value Projections** - Based on personalized growth rate
- **Vehicle Allocation Recommendations** - Dynamic table of all vehicles
- **Immediate Action Steps** - Clear next steps for the client

## Setup Instructions

### Step 1: Create Output Folder
1. Create a new folder in Google Drive: "Retirement Blueprint Reports"
2. Open the folder and copy the ID from the URL:
   - URL: `https://drive.google.com/drive/folders/[FOLDER_ID_HERE]`
3. Update `DOC_CONFIG.OUTPUT_FOLDER_ID` in Document_Generation.js

### Step 2: Create Template Document
1. In Google Sheets, go to menu: "📄 Document Generation" → "Create Template Documents"
2. Check the logs (View → Logs) for the template document ID
3. Update `DOC_CONFIG.UNIVERSAL_TEMPLATE_ID` in Document_Generation.js with this ID

### Step 3: Test the System
1. Select a row with complete Phase 1, 2, and 3 data
2. Go to menu: "📄 Document Generation" → "Generate Document for Current Row"
3. Check that:
   - Document is created in the output folder
   - All placeholders are replaced with actual data
   - Vehicle recommendations table is populated
   - Email is sent (if email address exists)

## Configuration Options

### DOC_CONFIG Settings
```javascript
const DOC_CONFIG = {
  // Template IDs
  UNIVERSAL_TEMPLATE_ID: '[YOUR_TEMPLATE_ID]',
  
  // Output folder
  OUTPUT_FOLDER_ID: '[YOUR_FOLDER_ID]',
  
  // Email template
  EMAIL_TEMPLATE: {
    subject: 'Your Retirement Blueprint Report',
    body: '...' // Customize email text
  }
};
```

### Customizing the Template
1. Open the template document (use the ID from DOC_CONFIG)
2. Edit the content while keeping {{placeholders}}
3. Available placeholders include:
   - All Working Sheet headers (e.g., {{Full_Name}}, {{gross_annual_income}})
   - Calculated fields: {{FirstName}}, {{report_date}}, {{total_actual_monthly}}, etc.
   - Profile info: {{profile_title}}, {{profile_description}}

## Next Steps

### 1. Create Profile-Specific Templates (Optional)
For each profile, create a template document with specific guidance:
```javascript
DOC_CONFIG.PROFILE_TEMPLATES = {
  '1_ROBS_In_Use': '[TEMPLATE_ID]',
  '2_ROBS_Curious': '[TEMPLATE_ID]',
  // ... etc
}
```

### 2. Setup Addendum Documents
Create documents in these folders:
- `docs/addendum/universal/` - General guides for all profiles
- `docs/addendum/biz_owner_group/` - Profile 8 specific guides
- `docs/addendum/late_stage_growth/` - Profile 9 specific guides

Suggested addendums:
- `universal/tax_optimization_strategies.md`
- `universal/contribution_limit_reference.md`
- `universal/hsa_optimization_guide.md`
- `universal/education_funding_strategies.md`
- `biz_owner_group/cash_balance_plan_guide.md`
- `biz_owner_group/mega_backdoor_roth_setup.md`
- `late_stage_growth/roth_conversion_strategies.md`
- `late_stage_growth/qcd_planning_guide.md`

### 3. Enhance the System
Future enhancements could include:
- Charts/graphs of allocations
- Multi-year projections
- Tax impact analysis
- Implementation checklists
- Links to educational resources

## Troubleshooting

### Document Not Generating
1. Check logs: View → Logs
2. Verify template ID is set in DOC_CONFIG
3. Ensure all required fields exist in Working Sheet
4. Check that Phase 3 completed successfully

### Email Not Sending
1. Verify email address exists in Email column
2. Check Gmail quota (limited sends per day)
3. Look for bounce-back emails

### Placeholders Not Replaced
1. Ensure placeholder names match headers exactly
2. Check for typos in {{placeholder}} syntax
3. Verify data exists in the Working Sheet

## Testing Checklist

- [ ] Output folder created and ID configured
- [ ] Template document created and ID configured
- [ ] Menu appears in Google Sheets
- [ ] Can generate document for test row
- [ ] All placeholders replaced correctly
- [ ] Vehicle recommendations table populated
- [ ] Email sent successfully
- [ ] Document saved in correct folder
- [ ] Document generates automatically after Phase 3

## Important Notes

1. **Headers must match exactly** - The system uses Working Sheet headers as placeholders
2. **Row 2 contains headers** - Not row 1
3. **Documents are one-time generation** - Won't regenerate if URL already exists
4. **Email is immediate** - No batch processing currently
5. **PDF conversion happens automatically** - For email attachments

This completes the first phase of the document generation system. The core functionality is in place and ready for testing with real data.
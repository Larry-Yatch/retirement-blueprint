# Document Generation Complete Guide

## Overview

The document generation system creates personalized Retirement Blueprint reports for clients after they complete Phase 3. It merges data from all three phases into branded PDF documents that explain current vs. ideal allocations and provides actionable recommendations.

## System Architecture

### Core Components
- **Document_Generation.js** - Main document generation logic
- **Document_Generation_Helpers.js** - Utility functions for formatting
- **Phase3_Document_Integration.js** - Automation bridge
- **Generate_Document_Branded.gs** - Branded document creation
- **Generate_Document_Safe.gs** - Safe fallback generation
- **Document_Branding.gs** - Branding application logic
- **Logo_Helper.gs** - Logo management utilities

### Document Flow
1. Phase 3 completes → Triggers `generateRetirementBlueprint(rowNum)`
2. Creates branded document from template
3. Applies logo and formatting
4. Converts to PDF (3 versions: safe, branded, addendum)
5. Sends email with all attachments
6. Saves document URL to Working Sheet

## Initial Setup

### Step 1: Configure Output Folder
```javascript
const DOC_CONFIG = {
  OUTPUT_FOLDER_ID: '[YOUR_FOLDER_ID]',  // Google Drive folder for reports
  SHEET_NAME: 'Working Sheet',           // Data source sheet
  HEADER_ROW: 2                          // Header row position
};
```

### Step 2: Create Template Document
1. Go to menu: "📄 Document Generation" → "Create Template Documents"
2. Check logs for template document ID
3. Update `DOC_CONFIG.UNIVERSAL_TEMPLATE_ID` with this ID

### Step 3: Configure Logo (Optional)
```javascript
const LOGO_FILE_ID = '[YOUR_LOGO_FILE_ID]';  // Optional branding
```

### Step 4: Test the System
1. Select a row with complete Phase 1, 2, and 3 data
2. Menu: "📄 Document Generation" → "Generate Document for Current Row"
3. Verify document creation, formatting, and email delivery

## Template System

### Available Placeholders
All Working Sheet headers can be used as placeholders:
- `{{Full_Name}}`, `{{Email}}`, `{{gross_annual_income}}`
- `{{retirement_actual_monthly}}`, `{{retirement_ideal_monthly}}`
- Calculated fields: `{{FirstName}}`, `{{report_date}}`
- Profile info: `{{profile_title}}`, `{{profile_description}}`

### Template Structure
```
Executive Summary
- Profile classification and key metrics

Current vs Recommended Analysis
- Monthly contribution comparison table
- Actual vs ideal allocations

Future Value Projections
- Personalized growth rate calculations
- 10, 20, 30 year projections

Vehicle Recommendations
- Dynamic table of all applicable vehicles
- Current vs recommended amounts

Action Steps
- Prioritized implementation checklist
```

## Automation Configuration

### Automatic Generation After Phase 3
Enabled by default when Phase3_Document_Integration.js is present:
```javascript
// In runPhase3() - automatically calls:
generateRetirementBlueprint(rowNum);
```

### Manual Generation Options
```javascript
// Single row generation
generateDocumentBranded();

// Batch processing
batchGenerateDocuments();  // Prompts for row numbers

// Test automation
testAutomatedDocumentGeneration();  // Tests specific row
```

## Email Configuration

### Email Template
```javascript
const EMAIL_TEMPLATE = {
  subject: 'Your Retirement Blueprint Report',
  body: `Dear {{FirstName}},
  
  Your personalized Retirement Blueprint is ready...`,
  
  attachments: [
    'retirement_blueprint_safe.pdf',
    'retirement_blueprint_branded.pdf',
    'retirement_addendum.pdf'
  ]
};
```

### Email Delivery
- Automatic after document generation
- Includes 3 PDF attachments
- Falls back to safe version if branding fails

## Branding Configuration

### Branding Elements
- Company logo in header
- Custom fonts and colors
- Formatted tables and sections
- Professional PDF output

### Branding Application
```javascript
// Automatic branding during generation
applyBrandingToDocument(docId, logoFileId);

// Manual branding for existing document
brandExistingDocument(docId);
```

## Error Handling

### Resilient Design
- Document generation failures don't break Phase 3
- Falls back to safe (unbranded) version if branding fails
- All errors logged but process continues
- Email still sends even if one attachment fails

### Common Issues & Solutions

**"formatCurrency is not defined"**
- Add Document_Generation_Helpers.js to project

**"generateRetirementBlueprint is not defined"**
- Add Phase3_Document_Integration.js to project

**Placeholders not replaced**
- Verify header names match exactly
- Check for data in Working Sheet

**Email not sending**
- Verify email address exists in Email column
- Check Gmail quota limits
- Look for bounce-back messages

## Testing Checklist

- [ ] Output folder created and configured
- [ ] Template document created with placeholders
- [ ] Logo file uploaded and ID configured
- [ ] Menu items appear in Google Sheets
- [ ] Manual generation works for test row
- [ ] Automatic generation after Phase 3
- [ ] All 3 PDF attachments created
- [ ] Email sends successfully
- [ ] Document URL saved to sheet
- [ ] Branding applied correctly

## Advanced Features

### Profile-Specific Templates
```javascript
PROFILE_TEMPLATES: {
  '1_ROBS_In_Use': '[TEMPLATE_ID]',
  '2_ROBS_Curious': '[TEMPLATE_ID]',
  '8_Biz_Owner_High_Income': '[TEMPLATE_ID]',
  // ... etc
}
```

### Addendum Documents
Create supplementary guides in these folders:
- `docs/addendum/universal/` - All profiles
- `docs/addendum/biz_owner_group/` - Profile 8 specific
- `docs/addendum/late_stage_growth/` - Profile 9 specific

### Batch Processing
Process multiple rows efficiently:
```javascript
batchGenerateDocuments();  // Interactive prompt
// Or programmatically:
const rows = [3, 5, 7, 9];
rows.forEach(row => generateRetirementBlueprint(row));
```

## Monitoring & Maintenance

### Log Monitoring
- View → Logs in Script Editor
- Look for: 📄 (info), ✅ (success), ❌ (error)
- Document generation logged with timestamps

### Performance Optimization
- Template caching reduces API calls
- Batch processing for multiple documents
- Async email sending when possible

### Rollback Procedure
To disable automatic generation:
```javascript
// Comment out in runPhase3():
// generateRetirementBlueprint(rowNum);
```

## Security & Permissions

### Required Permissions
- Google Drive: Create/edit documents
- Gmail: Send emails with attachments
- Google Sheets: Read/write data

### Data Protection
- Documents saved to restricted folder
- Email only to verified addresses
- No sensitive data in logs

## Future Enhancements

Potential additions:
- Charts and graphs in documents
- Multi-year projection tables
- Tax impact analysis
- Interactive checklists
- Video tutorial links
- Client portal integration
- Document versioning
- Bulk regeneration tools

## Support Resources

- Check logs for detailed error messages
- Test with sample data first
- Keep template document as backup
- Monitor email delivery rates
- Review failed generations weekly

---

*Last Updated: January 2025*
*System Version: Phase 3 Complete with Automation*
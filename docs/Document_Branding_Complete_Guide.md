# Document Branding Complete Guide

## Overview

The branding system creates professional, customized Retirement Blueprint documents with your company's visual identity, including logo, colors, typography, and formatted layouts.

## Quick Setup

### 1. Upload Your Logo
1. Upload logo to Google Drive (PNG, transparent background, 300x100px recommended)
2. Right-click → "Get link" → Copy the file ID from URL
3. Update in `Document_Branding.js`:
```javascript
const LOGO_FILE_ID = 'YOUR_LOGO_FILE_ID_HERE';
```

### 2. Update Company Information
In `Document_Branding.js`, update BRANDING_CONFIG:
```javascript
company: {
  name: 'Your Company Name',
  tagline: 'Your Tagline',
  website: 'www.yoursite.com',
  email: 'contact@company.com',
  phone: '(555) 123-4567'
}
```

### 3. Test Your Branding
Menu: Document Generation → Test Branding

## Complete Configuration

### Logo Configuration
```javascript
logo: {
  fileId: 'YOUR_LOGO_FILE_ID',
  width: 150,        // Width in points
  height: 50,        // Height in points
  alignment: 'LEFT'  // LEFT, CENTER, or RIGHT
}
```

### Color Scheme
```javascript
colors: {
  primary: '#2C3E50',      // Headers and emphasis
  secondary: '#3498DB',    // Links and accents
  accent: '#E74C3C',       // Highlights and CTAs
  text: {
    dark: '#2C3E50',       // Main text
    medium: '#555555',     // Secondary text
    light: '#7F8C8D'       // Captions
  },
  background: {
    light: '#F8F9FA',      // Light backgrounds
    white: '#FFFFFF'       // White backgrounds
  },
  table: {
    headerBg: '#34495E',   // Table header background
    headerText: '#FFFFFF', // Table header text
    borderColor: '#BDC3C7' // Table borders
  }
}
```

### Typography
```javascript
fonts: {
  heading: {
    family: 'Georgia',     // Or 'Arial', 'Times New Roman'
    sizes: {
      h1: 24,
      h2: 18,
      h3: 14,
      h4: 12
    }
  },
  body: {
    family: 'Arial',
    size: 11
  },
  table: {
    family: 'Arial',
    header: 10,
    cell: 9
  }
}
```

### Layout Settings
```javascript
layout: {
  margins: {
    top: 72,      // 1 inch
    bottom: 72,
    left: 72,
    right: 72
  },
  spacing: {
    beforeHeading: 12,
    afterHeading: 6,
    betweenParagraphs: 6,
    beforeTable: 12,
    afterTable: 12
  }
}
```

## Branding Elements

### Document Header
Applied to all pages:
- Company logo (left aligned)
- Company name and tagline
- Document title
- Professional separator line

### Section Headers
Formatted with:
- Primary color
- Larger font size
- Proper spacing
- Optional numbering

### Tables
Professional formatting:
- Colored header row
- Alternating row colors (optional)
- Proper borders and padding
- Aligned columns

### Footer
Contains:
- Page numbers
- Company website
- Confidentiality notice (optional)
- Generation date

## Advanced Customization

### Custom Styles
Add custom paragraph styles:
```javascript
customStyles: {
  'highlight': {
    backgroundColor: '#FFFACD',
    bold: true
  },
  'warning': {
    color: '#FF0000',
    italic: true
  },
  'success': {
    color: '#00AA00',
    bold: true
  }
}
```

### Conditional Branding
Apply different branding based on profile:
```javascript
profileBranding: {
  '8_Biz_Owner_High_Income': {
    colors: { primary: '#4A90E2' },
    tagline: 'Advanced Strategies for Business Owners'
  },
  '9_Late_Stage_High_Growth': {
    colors: { primary: '#7CB342' },
    tagline: 'Maximizing Your Retirement Years'
  }
}
```

### Table Formatting
Customize table appearance:
```javascript
tableStyles: {
  recommendations: {
    headerColor: '#2C3E50',
    alternatingRows: true,
    borderWidth: 1,
    cellPadding: 8
  },
  comparison: {
    headerColor: '#3498DB',
    highlightDifferences: true,
    showTotals: true
  }
}
```

## Logo Helper Utilities

### Check Logo Accessibility
```javascript
// Run in Script Editor to verify logo access
function testLogoAccess() {
  checkLogoAccess(LOGO_FILE_ID);
}
```

### Resize Logo Proportionally
```javascript
// Maintains aspect ratio
const dimensions = calculateLogoDimensions(originalWidth, originalHeight, maxWidth, maxHeight);
```

### Logo Positioning
```javascript
logoPosition: {
  horizontal: 'LEFT',     // LEFT, CENTER, RIGHT
  vertical: 'TOP',        // TOP, MIDDLE
  offsetX: 0,            // Horizontal offset in points
  offsetY: 0             // Vertical offset in points
}
```

## Testing Your Branding

### Test Functions
```javascript
// Test branding on sample document
testBranding();

// Test specific profile branding
testProfileBranding('8_Biz_Owner_High_Income');

// Generate branded sample
generateBrandedSample();
```

### Validation Checklist
- [ ] Logo displays correctly
- [ ] Company info is accurate
- [ ] Colors match brand guidelines
- [ ] Fonts are readable
- [ ] Tables are properly formatted
- [ ] Headers and footers are consistent
- [ ] PDF conversion preserves formatting

## Troubleshooting

### Logo Not Appearing
1. Verify file ID is correct
2. Check file permissions (must be accessible)
3. Confirm image format (PNG/JPG)
4. Test with `checkLogoAccess()`

### Formatting Lost in PDF
1. Use standard fonts (Arial, Times, Georgia)
2. Avoid complex formatting
3. Test with simpler styles
4. Check PDF conversion settings

### Colors Not Applying
1. Use hex color codes (#RRGGBB)
2. Verify color values are valid
3. Check for typos in configuration
4. Test with default colors first

### Performance Issues
1. Optimize logo file size (<2MB)
2. Reduce number of style changes
3. Simplify table formatting
4. Use batch processing for multiple docs

## Best Practices

### Design Guidelines
- Keep logo file under 2MB
- Use web-safe fonts
- Maintain consistent spacing
- Ensure sufficient color contrast
- Test on different devices

### Brand Consistency
- Match company brand guidelines
- Use official color palette
- Maintain typography hierarchy
- Apply consistent spacing
- Include required legal text

### Accessibility
- Ensure text contrast ratio > 4.5:1
- Use readable font sizes (min 10pt)
- Provide alt text for images
- Structure content with headers
- Test with screen readers

## Quick Reference

### File Locations
- `Document_Branding.js` - Main branding configuration
- `Logo_Helper.js` - Logo utility functions
- `Generate_Document_Branded.gs` - Branded generation logic

### Key Functions
```javascript
applyBrandingToDocument(docId, logoFileId);  // Apply branding
formatDocument(doc, config);                 // Format document
addLogo(doc, logoId, position);             // Add logo
styleTable(table, tableConfig);             // Style table
```

### Menu Options
- Document Generation → Test Branding
- Document Generation → Generate Branded Document
- Document Generation → Update Logo

## Migration from Old Branding

If upgrading from previous version:
1. Backup current configuration
2. Copy custom settings to new format
3. Update logo file reference
4. Test with sample document
5. Deploy to production

---

*Last Updated: January 2025*
*Version: 2.0 - Complete Branding System*
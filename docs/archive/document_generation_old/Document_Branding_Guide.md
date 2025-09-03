# Document Branding Customization Guide

This guide will walk you through customizing the branded document generation system for your Retirement Blueprint documents.

## Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Detailed Customization](#detailed-customization)
4. [Logo Setup](#logo-setup)
5. [Color Scheme](#color-scheme)
6. [Typography](#typography)
7. [Layout and Spacing](#layout-and-spacing)
8. [Testing Your Branding](#testing-your-branding)
9. [Troubleshooting](#troubleshooting)
10. [Examples](#examples)

## Overview

The branded document generation system allows you to create professional, customized Retirement Blueprint documents with:
- Your company logo and branding
- Custom color schemes
- Professional typography
- Formatted tables and visual elements
- Branded headers and footers

All branding settings are configured in the `Document_Branding.js` file.

## Quick Start

1. **Open Google Apps Script Editor**
   - From your spreadsheet, go to Extensions → Apps Script
   - Find and open `Document_Branding.js`

2. **Update Basic Company Info**
   ```javascript
   company: {
     name: 'Your Company Name',
     tagline: 'Your Tagline Here',
     website: 'www.yourwebsite.com',
     email: 'contact@yourcompany.com',
     phone: '(555) 123-4567'
   }
   ```

3. **Save and Test**
   - Save the file (Ctrl/Cmd + S)
   - Return to your spreadsheet
   - Run: Document Generation → Test Branding

## Detailed Customization

### Company Information

Edit the company section in `BRANDING_CONFIG`:

```javascript
company: {
  name: 'Retirement Blueprint Inc.',      // Your company name
  tagline: 'Securing Your Financial Future', // Your tagline/motto
  website: 'www.retirementblueprint.com',   // Your website URL
  email: 'support@retirementblueprint.com', // Contact email
  phone: '(800) 555-PLAN'                   // Contact phone
}
```

These values appear in:
- Document headers and footers
- Title page
- Contact information sections

## Logo Setup

### Step 1: Prepare Your Logo
- Recommended format: PNG with transparent background
- Recommended size: 300x100 pixels (3:1 ratio)
- File size: Under 2MB

### Step 2: Upload to Google Drive
1. Go to [Google Drive](https://drive.google.com)
2. Click "New" → "File upload"
3. Select your logo file
4. Wait for upload to complete

### Step 3: Get the File ID
1. Right-click on your uploaded logo
2. Click "Get link"
3. Click "Copy link"
4. The link will look like:
   ```
   https://drive.google.com/file/d/1ABC123def456GHI789jkl/view?usp=sharing
   ```
5. Extract the ID between `/d/` and `/view`:
   ```
   1ABC123def456GHI789jkl
   ```

### Step 4: Update Configuration
```javascript
logo: {
  driveFileId: '1ABC123def456GHI789jkl', // Your logo's ID
  width: 150,   // Width in pixels
  height: 50,   // Height in pixels
  alignment: DocumentApp.HorizontalAlignment.LEFT // LEFT, CENTER, or RIGHT
}
```

### Step 5: Set Sharing Permissions
1. Right-click your logo in Google Drive
2. Click "Share"
3. Change to "Anyone with the link can view"
4. Click "Done"

## Color Scheme

### Understanding the Color System

```javascript
colors: {
  primary: '#003366',    // Main brand color - headers, titles
  secondary: '#0066CC',  // Secondary brand color - subheaders
  accent: '#FF6600',     // Accent color - CTAs, highlights
  text: '#333333',       // Main body text
  lightGray: '#666666',  // Secondary text, borders
  background: '#F5F5F5', // Light backgrounds
  white: '#FFFFFF'       // White (for contrast)
}
```

### Color Usage:
- **Primary**: Chapter titles, main headers, company name
- **Secondary**: Section headers, links, secondary emphasis
- **Accent**: Important callouts, action items, highlights
- **Text**: All body text and paragraphs
- **Light Gray**: Footer text, borders, dividers
- **Background**: Alternating table rows, section backgrounds

### Popular Color Schemes

#### Professional Blue
```javascript
colors: {
  primary: '#003366',
  secondary: '#0066CC',
  accent: '#FF6600',
  text: '#333333',
  lightGray: '#666666',
  background: '#F5F5F5',
  white: '#FFFFFF'
}
```

#### Corporate Green
```javascript
colors: {
  primary: '#2C5F2D',
  secondary: '#97BC62',
  accent: '#EDC813',
  text: '#333333',
  lightGray: '#666666',
  background: '#F5F8F5',
  white: '#FFFFFF'
}
```

#### Modern Purple
```javascript
colors: {
  primary: '#4A148C',
  secondary: '#7B1FA2',
  accent: '#FFB300',
  text: '#212121',
  lightGray: '#757575',
  background: '#F3E5F5',
  white: '#FFFFFF'
}
```

#### Elegant Gray
```javascript
colors: {
  primary: '#212121',
  secondary: '#616161',
  accent: '#FF5722',
  text: '#424242',
  lightGray: '#9E9E9E',
  background: '#FAFAFA',
  white: '#FFFFFF'
}
```

## Typography

### Font Configuration

```javascript
fonts: {
  heading: 'Georgia',    // Serif font for headers
  body: 'Arial',        // Sans-serif for body
  accent: 'Arial'       // Font for special elements
}
```

### Available Google Docs Fonts

**Serif Fonts (Professional, Traditional)**
- Georgia
- Times New Roman
- Playfair Display
- Merriweather
- Lora

**Sans-Serif Fonts (Modern, Clean)**
- Arial
- Helvetica
- Open Sans
- Roboto
- Lato
- Montserrat

**Display Fonts (For Headers)**
- Oswald
- Raleway
- Bebas Neue

### Font Sizes

```javascript
sizes: {
  title: 28,      // Main document title
  heading1: 22,   // Chapter titles
  heading2: 18,   // Section headers
  heading3: 16,   // Subsection headers
  body: 11,       // Body text
  small: 9,       // Captions, footnotes
  footer: 8       // Footer text
}
```

### Size Guidelines:
- **Title**: Used once on title page
- **Heading1**: Chapter titles (6-8 per document)
- **Heading2**: Major sections within chapters
- **Heading3**: Subsections
- **Body**: All paragraph text
- **Small**: Footnotes, captions, disclaimers

## Layout and Spacing

### Spacing Configuration

```javascript
spacing: {
  beforeHeading1: 24,    // Points before chapter titles
  afterHeading1: 12,     // Points after chapter titles
  beforeHeading2: 18,    // Points before section headers
  afterHeading2: 8,      // Points after section headers
  beforeParagraph: 6,    // Points before paragraphs
  afterParagraph: 6,     // Points after paragraphs
  lineSpacing: 1.5       // Line height multiplier
}
```

### Page Margins

```javascript
page: {
  marginTop: 72,      // 1 inch
  marginBottom: 72,   // 1 inch
  marginLeft: 72,     // 1 inch
  marginRight: 72     // 1 inch
}
```

**Common Margin Settings:**
- Standard: 72 points (1 inch)
- Narrow: 54 points (0.75 inch)
- Wide: 90 points (1.25 inch)

## Testing Your Branding

### 1. Test Branding Function
Run from menu: Document Generation → Test Branding
- Creates a sample document with all styling elements
- Shows headers, tables, callout boxes
- Demonstrates all color and font usage

### 2. Test with Real Data
1. Select a client row in your spreadsheet
2. Run: Document Generation → Generate Branded Blueprint
3. Review the generated document

### 3. Checklist for Testing
- [ ] Logo appears correctly in header
- [ ] Company information in footer is accurate
- [ ] Colors match your brand guidelines
- [ ] Fonts are readable and professional
- [ ] Tables are properly formatted
- [ ] Spacing looks balanced
- [ ] All text is legible

## Troubleshooting

### Logo Not Appearing

**Problem**: Logo shows as broken image or doesn't appear
**Solutions**:
1. Check file ID is correct
2. Ensure logo file has public sharing permissions
3. Verify logo file size is under 2MB
4. Try a different image format (PNG recommended)

### Colors Not Applying

**Problem**: Colors don't match what you specified
**Solutions**:
1. Ensure hex codes include the # symbol
2. Use 6-digit hex codes (#FFFFFF not #FFF)
3. Save the file and refresh the spreadsheet
4. Check for typos in color names

### Font Issues

**Problem**: Fonts reverting to default
**Solutions**:
1. Use only Google Docs supported fonts
2. Check font name spelling exactly
3. Avoid custom fonts not in Google's library

### Formatting Errors

**Problem**: Document generation fails
**Solutions**:
1. Check for syntax errors in Document_Branding.js
2. Ensure all brackets and quotes are properly closed
3. Test with default settings first
4. Check the execution logs for specific errors

## Examples

### Example 1: Financial Advisory Firm

```javascript
const BRANDING_CONFIG = {
  company: {
    name: 'Premier Wealth Advisors',
    tagline: 'Your Partner in Financial Success',
    website: 'www.premierwealthadvisors.com',
    email: 'info@premierwealthadvisors.com',
    phone: '(888) 555-9876'
  },
  logo: {
    driveFileId: '1xYz123ABC456def789GHI',
    width: 180,
    height: 60,
    alignment: DocumentApp.HorizontalAlignment.CENTER
  },
  colors: {
    primary: '#1B3A57',      // Navy blue
    secondary: '#4A90E2',    // Light blue
    accent: '#F5A623',       // Gold
    text: '#2C3E50',         // Dark gray
    lightGray: '#7F8C8D',    // Medium gray
    background: '#ECF0F1',   // Light gray
    white: '#FFFFFF'
  },
  fonts: {
    heading: 'Playfair Display',
    body: 'Open Sans',
    accent: 'Open Sans'
  }
};
```

### Example 2: Modern Tech-Focused Firm

```javascript
const BRANDING_CONFIG = {
  company: {
    name: 'FutureFi Solutions',
    tagline: 'Smart Planning for Tomorrow',
    website: 'www.futurefi.tech',
    email: 'hello@futurefi.tech',
    phone: '(800) 555-3333'
  },
  logo: {
    driveFileId: '2aBc456DEF789ghi012JKL',
    width: 200,
    height: 50,
    alignment: DocumentApp.HorizontalAlignment.LEFT
  },
  colors: {
    primary: '#6200EA',      // Purple
    secondary: '#00BCD4',    // Cyan
    accent: '#FF5252',       // Red
    text: '#212121',         // Almost black
    lightGray: '#9E9E9E',    // Gray
    background: '#FAFAFA',   // Off white
    white: '#FFFFFF'
  },
  fonts: {
    heading: 'Montserrat',
    body: 'Roboto',
    accent: 'Roboto'
  }
};
```

### Example 3: Traditional Investment Firm

```javascript
const BRANDING_CONFIG = {
  company: {
    name: 'Heritage Investment Partners',
    tagline: 'Building Wealth Through Generations',
    website: 'www.heritageinvest.com',
    email: 'contact@heritageinvest.com',
    phone: '(877) 555-4321'
  },
  logo: {
    driveFileId: '3cDe789FGH012ijk345LMN',
    width: 160,
    height: 80,
    alignment: DocumentApp.HorizontalAlignment.CENTER
  },
  colors: {
    primary: '#004225',      // Forest green
    secondary: '#8B7355',    // Brown
    accent: '#DAA520',       // Goldenrod
    text: '#2F4F4F',         // Dark slate gray
    lightGray: '#696969',    // Dim gray
    background: '#F5F5DC',   // Beige
    white: '#FFFFFF'
  },
  fonts: {
    heading: 'Times New Roman',
    body: 'Georgia',
    accent: 'Georgia'
  }
};
```

## Best Practices

1. **Keep it Simple**: Don't use too many colors or fonts
2. **Ensure Readability**: Test with different screen sizes and print
3. **Be Consistent**: Use the same branding across all materials
4. **Test Thoroughly**: Generate several documents before finalizing
5. **Get Feedback**: Have colleagues review the branded documents
6. **Document Changes**: Keep notes on what you've customized

## Need Help?

If you encounter issues or need assistance:

1. Check the execution logs in Apps Script editor
2. Test with the default configuration first
3. Make one change at a time to isolate issues
4. Ensure all syntax is correct (quotes, brackets, semicolons)

Remember to save your changes in the Apps Script editor and refresh your spreadsheet before testing!
# Logo Setup Fix Guide

## Error: "Unexpected error while getting the method or property getFileById on object DriveApp"

This error occurs when Google Apps Script cannot access your logo file. Here's how to fix it:

## Quick Fix Steps

### 1. Use the Logo Helper Menu
After deploying the latest code:
1. Go to your spreadsheet
2. Click: **Document Generation → Logo Setup → Test Logo Setup**
3. Follow the diagnostic information provided

### 2. Common Causes & Solutions

#### Cause 1: No Logo ID Set
**Symptom**: Using default value 'YOUR_LOGO_FILE_ID_HERE'
**Fix**: 
1. Upload logo to Google Drive
2. Get the file ID
3. Update Document_Branding.js

#### Cause 2: Incorrect File ID
**Symptom**: File not found error
**Fix**: 
1. Double-check the ID copied from Google Drive
2. Make sure you copied only the ID, not the full URL

#### Cause 3: Permission Issues
**Symptom**: Access denied errors
**Fix**:
1. Right-click your logo in Google Drive
2. Click "Share"
3. Change to "Anyone with the link can view"
4. Click "Done"

#### Cause 4: File Deleted or Moved
**Symptom**: File no longer exists
**Fix**: Re-upload logo and update the ID

## Step-by-Step Logo Setup

### Option A: Use Sample Logo (For Testing)
1. Run: **Document Generation → Logo Setup → Create Sample Logo**
2. Copy the file ID shown in the alert
3. Update Document_Branding.js with this ID
4. Save and test

### Option B: Use Your Logo
1. **Prepare Your Logo**
   - Format: PNG (transparent background preferred)
   - Size: Under 2MB
   - Dimensions: ~300x100 pixels

2. **Upload to Google Drive**
   - Go to [drive.google.com](https://drive.google.com)
   - Click "New" → "File upload"
   - Select your logo file

3. **Set Sharing Permissions**
   - Right-click the uploaded logo
   - Click "Share"
   - Click "Change to anyone with the link"
   - Set to "Viewer"
   - Click "Done"

4. **Get the File ID**
   - Right-click the logo again
   - Click "Get link"
   - Click "Copy link"
   - The link looks like: `https://drive.google.com/file/d/ABC123xyz/view?usp=sharing`
   - Extract the ID: `ABC123xyz` (between /d/ and /view)

5. **Update Configuration**
   ```javascript
   // In Document_Branding.js
   logo: {
     driveFileId: 'ABC123xyz',  // Your actual ID here
     width: 150,
     height: 50,
     alignment: DocumentApp.HorizontalAlignment.LEFT
   }
   ```

6. **Save and Deploy**
   - Save in Apps Script (Ctrl+S)
   - Run: `clasp push` (if using clasp)
   - Or manually save in Apps Script editor

7. **Test**
   - Run: **Document Generation → Logo Setup → Test Logo Setup**
   - Should show "✅ Logo Setup Successful!"

## Alternative: Text-Only Header

If you prefer not to use a logo, the system will automatically use a text header with your company name. No changes needed - it's the default fallback.

## Troubleshooting Commands

Run these from the Logo Setup menu:

- **Test Logo Setup**: Diagnoses logo configuration issues
- **Create Sample Logo**: Creates a test logo for immediate use  
- **Get Logo URL**: Shows the sharing URL for your logo
- **Create Test Document**: Generates a document to verify logo display

## Still Having Issues?

1. Check the Apps Script logs:
   - Extensions → Apps Script → View → Logs

2. Verify you're logged into Google Drive

3. Try the sample logo first to isolate the issue

4. Make sure the logo file hasn't been moved to trash

The logo feature is optional - documents will still generate perfectly without it, using your company name in the header instead.
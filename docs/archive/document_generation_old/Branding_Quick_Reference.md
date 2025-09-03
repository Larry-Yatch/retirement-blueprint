# Branding Quick Reference Card

## 🚀 5-Minute Setup

### Step 1: Basic Info
Open `Document_Branding.js` and update:
```javascript
company: {
  name: 'Your Company',
  tagline: 'Your Tagline',
  website: 'www.yoursite.com',
  email: 'info@yoursite.com',
  phone: '(555) 123-4567'
}
```

### Step 2: Colors (Hex Codes)
```javascript
colors: {
  primary: '#003366',    // Headers
  secondary: '#0066CC',  // Subheaders  
  accent: '#FF6600',     // Highlights
  text: '#333333'        // Body text
}
```

### Step 3: Logo
1. Upload logo to Google Drive
2. Right-click → Get link
3. Copy ID from URL: `drive.google.com/file/d/[THIS-PART]/view`
4. Update:
```javascript
logo: {
  driveFileId: 'YOUR-ID-HERE',
  width: 150,
  height: 50
}
```

### Step 4: Test
Menu → Document Generation → Test Branding

---

## 🎨 Color Scheme Templates

### Professional Blue
```javascript
primary: '#003366', secondary: '#0066CC', accent: '#FF6600'
```

### Corporate Green  
```javascript
primary: '#2C5F2D', secondary: '#97BC62', accent: '#EDC813'
```

### Modern Purple
```javascript
primary: '#4A148C', secondary: '#7B1FA2', accent: '#FFB300'
```

### Elegant Gray
```javascript
primary: '#212121', secondary: '#616161', accent: '#FF5722'
```

---

## 📝 Font Options

### Professional
```javascript
fonts: {
  heading: 'Georgia',
  body: 'Arial'
}
```

### Modern
```javascript
fonts: {
  heading: 'Montserrat',
  body: 'Open Sans'
}
```

### Traditional
```javascript
fonts: {
  heading: 'Times New Roman',
  body: 'Georgia'
}
```

---

## ⚡ Common Issues

**Logo not showing?**
- Check Drive sharing: "Anyone with link can view"
- Verify ID is correct
- Try smaller file size

**Colors not working?**
- Include # in hex codes
- Use 6 digits: #FFFFFF not #FFF

**Fonts reverting?**
- Use Google Docs fonts only
- Check exact spelling

---

## 📐 Size Reference

```javascript
sizes: {
  title: 28,      // Main title
  heading1: 22,   // Chapters
  heading2: 18,   // Sections
  body: 11,       // Paragraphs
}
```

---

## ✅ Testing Checklist

- [ ] Logo appears in header
- [ ] Colors match brand
- [ ] Fonts are correct
- [ ] Footer has right info
- [ ] Generate test document
- [ ] Print preview looks good

---

## 🔍 Where Things Appear

| Element | Where It Shows |
|---------|---------------|
| Company Name | Header, Footer, Title Page |
| Logo | Every page header |
| Primary Color | Chapter titles, Headers |
| Secondary Color | Subheaders, Links |
| Accent Color | Callouts, Highlights |
| Contact Info | Footer, Closing Page |

---

## 💾 Don't Forget!

1. **Save** in Apps Script (Ctrl/Cmd + S)
2. **Refresh** your spreadsheet
3. **Test** before using with clients

Full guide: `Document_Branding_Guide.md`
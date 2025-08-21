# How to Deploy as API Executable for Direct Testing

## Steps to Enable clasp run

### 1. Open the Script Editor
- Go to your Google Sheet
- Extensions → Apps Script

### 2. Create API Executable Deployment
1. Click **Deploy** → **New Deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **API Executable**
4. Fill in:
   - Description: "API Testing Deployment"
   - Click **Deploy**

### 3. Authorize the Deployment
- You'll be prompted to authorize
- Review and accept the permissions

### 4. Copy the Deployment ID
- After deployment, you'll see a deployment ID
- It will look like: `AKfycbw...` (long string)

### 5. Update .clasp.json
Add the deployment ID to your `.clasp.json`:
```json
{
  "scriptId": "1u76NxCIbrJ0suSF5TKcI1VFE6KfaLxhdhCZ183CKQ-s217AaYq5O5TwD",
  "deploymentId": "YOUR_API_DEPLOYMENT_ID_HERE"
}
```

### 6. Test the Connection
```bash
# List available functions
clasp run --help

# Run a test function
clasp run testProfile7Retest
```

## Benefits of API Executable Deployment

1. **Direct Testing**: Run functions from command line
2. **Faster Iteration**: No need to open Google Sheets UI
3. **Automated Testing**: Can integrate into CI/CD
4. **Better Debugging**: See console output directly
5. **Batch Testing**: Run multiple tests sequentially

## Example Test Commands

```bash
# Test Profile 7
clasp run testProfile7YoungProfessional
clasp run testProfile7FamilyStarter

# Test Profile 4
clasp run testProfile4HighIncome
clasp run testProfile4LowIncome

# Run validation reports
clasp run generateProfile7Report
clasp run generateProfile4Report
```

## Security Notes

- API executable deployments have full access to your script
- Only share the deployment ID with trusted parties
- Can revoke deployment anytime from script editor
- Each deployment has its own ID and permissions

## Troubleshooting

If `clasp run` still doesn't work:
1. Make sure you're logged in: `clasp login`
2. Check deployment is active in script editor
3. Verify function names match exactly
4. Ensure functions are top-level (not nested)

This setup is definitely worth it for extensive testing!
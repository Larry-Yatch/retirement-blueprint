# Profile Tuning Efficiency Guide

## Lessons Learned from Profile 2 (ROBS Curious) Tuning

### Overview
Profile 2 tuning took significant time due to several issues that could have been avoided. This guide captures lessons learned to make future profile tuning more efficient.

## Major Time Sinks & Solutions

### 1. Header Mismatch Issues (3+ hours wasted)
**Problem**: Test functions failed repeatedly due to header name mismatches between:
- Working Sheet row 2 (simplified headers like `Current_Age`)
- Phase 2 forms row 1 (full questions like "What is your current age?")
- Test functions using wrong row or wrong format

**Solution**:
- Always use Working Sheet row 2 headers
- Use the HEADERS constant from Code.js
- Run `validateHeaders()` before any test
- Create test data with `buildHeaderMap()` dynamically

**Prevention Checklist**:
```javascript
// ✅ GOOD
const headerRange = ws.getRange(2, 1, 1, ws.getLastColumn()); // Row 2!
const age = getValue(hdr, rowArr, HEADERS.CURRENT_AGE);

// ❌ BAD
const headerRange = ws.getRange(1, 1, 1, ws.getLastColumn()); // Wrong row!
const age = getValue(hdr, rowArr, 'Current_Age'); // Hardcoded string
```

### 2. Complex Solo 401(k) Questions (2+ hours redesigning)
**Problem**: Initial approach asked for entity type, profit percentages, separate employee/employer contributions - too complex for users.

**Solution**: Simplified to two questions:
1. Total business savings capacity
2. Spouse in business?

**Efficiency Tip**: Start with the simplest approach that gets 80-90% accuracy. You can always add complexity later if needed.

### 3. Form Question Mapping (1+ hour debugging)
**Problem**: 
- Form questions aren't always in sequential order
- Spouse question was at position 13, not 9
- Mapping system wasn't clear initially

**Solution**: Created FORM_EX_Q_MAPPING system that explicitly maps form positions to ex_q slots

**Prevention**: Always verify actual form question order before implementing mapping

### 4. Available Pool Calculation Discovery (1 hour)
**Problem**: Spent time trying to understand how available funds are calculated, discovered NET_MONTHLY_INCOME comes from external library.

**Solution**: Document external dependencies clearly

### 5. Test Data Generation Issues (2+ hours)
**Problem**: Multiple failures due to:
- Missing required fields
- Wrong data types
- Incorrect header references

**Solution**: Created standardized test data generation with proper defaults

## Efficient Profile Tuning Process

### Phase 1: Analysis (30 minutes)
1. **Profile Identity**: Write one paragraph about who this profile serves
2. **Current Implementation Review**: 
   - Check existing vehicle order
   - Note any hardcoded values
   - Identify missing universal functions
3. **Extra Questions Analysis**: Document what each ex_q is used for
4. **Quick Test**: Run existing profile to see baseline behavior

### Phase 2: Planning (20 minutes)
1. **Decision Tree**: Sketch out the logic flow on paper first
2. **Vehicle Priority**: List vehicles in order for each scenario
3. **Edge Cases**: List known edge cases to handle
4. **Simplification Opportunities**: What can be simplified?

### Phase 3: Implementation (1-2 hours)
1. **Start with Structure**:
   ```javascript
   '[ProfileID]': function(rowArr, hdr) {
     // 1. Extract all data (use HEADERS constants!)
     // 2. Calculate capacities (use universal functions)
     // 3. Build vehicle arrays conditionally
     // 4. Apply phase-outs and preferences
     // 5. Return result (NO Taxable Brokerage!)
   }
   ```

2. **Use Universal Functions**:
   - `calculateHsaMonthlyCapacity()`
   - `calculateCesaMonthlyCapacity()`
   - `applyRothIRAPhaseOut()`
   - `prioritizeTraditionalAccounts()` or `prioritizeRothAccounts()`

3. **Add Employer 401(k)** (if applicable):
   - Use `addEmployer401kVehicles()`
   - Map questions correctly in FORM_EX_Q_MAPPING

### Phase 4: Testing (30 minutes)
1. **Create Test Scenarios**:
   ```javascript
   const scenarios = [
     { name: 'Basic scenario', data: { /* use HEADERS constants */ } },
     { name: 'Edge case 1', data: { /* ... */ } },
     { name: 'Edge case 2', data: { /* ... */ } }
   ];
   ```

2. **Validate Headers First**:
   ```javascript
   const validation = validateHeaders();
   if (!validation.valid) {
     console.error('Fix headers first!');
     return;
   }
   ```

3. **Run Tests**: Test each scenario and verify outputs

### Phase 5: Documentation (15 minutes)
1. Update tracking document immediately
2. Note any special logic or edge cases
3. Document form mapping if changed

## Common Pitfalls to Avoid

### 1. Don't Assume Headers
- Always use HEADERS constants
- Always validate before testing
- Working Sheet uses row 2, not row 1

### 2. Don't Overcomplicate Questions
- Start simple, add complexity only if needed
- Users prefer one clear number over multiple calculations
- Add disclaimers rather than perfect accuracy

### 3. Don't Include Taxable Brokerage
- All excess flows to Family Bank
- No intermediate taxable accounts

### 4. Don't Hardcode Values
- Use LIMITS constants for IRS limits
- Calculate dynamically based on age/income
- Use default values with || operator

### 5. Don't Skip Universal Functions
- Every profile needs HSA/CESA calculations
- Every profile needs Roth phase-out logic
- Every profile needs tax preference ordering

## Testing Efficiency Tips

### 1. Batch Your Tests
Run all scenarios in one test function:
```javascript
scenarios.forEach(scenario => {
  const testData = createTestDataSafe(scenario.data);
  const result = profileHelpers[profileId](testData.rowArr, testData.hdr);
  // Verify results
});
```

### 2. Use Console Groups
```javascript
console.log(`\n${'='.repeat(50)}`);
console.log(`Testing: ${scenario.name}`);
console.log('='.repeat(50));
```

### 3. Validate Early
Check headers before any testing to avoid cascade failures

### 4. Test in Google Apps Script
Push changes and test in actual environment early - don't wait until the end

## Quick Reference Checklist

Before starting any profile tuning:
- [ ] Read current implementation
- [ ] Check which universal functions are missing
- [ ] Review extra questions usage
- [ ] Verify HEADERS constants exist for all needed fields
- [ ] Plan vehicle order on paper
- [ ] Consider simplification opportunities

During implementation:
- [ ] Use HEADERS constants (not strings)
- [ ] Apply all universal functions
- [ ] Handle all employment scenarios
- [ ] Add appropriate defaults
- [ ] NO Taxable Brokerage
- [ ] Consider employer 401(k) if applicable

Before testing:
- [ ] Validate headers
- [ ] Create diverse test scenarios  
- [ ] Use proper test data generation
- [ ] Test edge cases

After completion:
- [ ] Update tracking document
- [ ] Document any special logic
- [ ] Note lessons learned
- [ ] Commit with clear message

## Time Estimates

With this process:
- Simple profile update: 1-2 hours
- Complex profile (like ROBS): 2-3 hours
- Testing and validation: 30-45 minutes

Without this process:
- Can easily take 6-8 hours due to debugging header issues, failed tests, and redesigns

## Key Insight

The most time is wasted on:
1. Header mismatches (preventable)
2. Over-complex initial designs (simplify first)
3. Missing test data (use standard generation)
4. Unclear requirements (document first)

Focus on getting 80% accuracy with 20% complexity, then iterate if needed.
# Development Notes

## Known Issues

### 1. Profile 5, 6, 9 Form Mapping - RESOLVED
**Issue**: FORM_EX_Q_MAPPING previously had comments saying these profiles have "NO employer 401k questions", but they have now been updated.

**Resolution (November 2024)**:
- ✅ Profile 5, 6, and 9 form mappings have been implemented
- ✅ All profiles now properly map employer 401k questions to ex_q1-4
- ✅ Employment-based logic has been added to profile helper functions

**Current State**:
```javascript
'5_Bracket_Strategist': {
  44: 'ex_q1',  // employer 401k
  45: 'ex_q2',  // employer match
  46: 'ex_q3',  // match percentage
  47: 'ex_q4'   // roth option
},
```

### 2. Missing Form Mapping Tests
**Issue**: No tests exist for the `remapFormValues()` function in Testing.js

**Impact**: Form mapping changes could break without detection

**Action Required**: Create test functions to verify:
- Form values map to correct ex_q positions
- Unmapped profiles pass through unchanged
- Edge cases handled properly

### 3. Referenced Test Functions Don't Exist
**Issue**: EMPLOYER_401K_TESTING_GUIDE.md references test functions that aren't in the codebase:
- `testEmployer401kIntegration()`
- `testFormQuestionMapping()`

**Action Required**: Either create these test functions or update documentation

## Future Enhancements

### 1. Advanced Form Mapping Options

The current implementation uses Option 2 (position-based mapping) from the original design. Future options to consider:

#### Option 3: Smart Detection System
Detect question type by analyzing the response pattern:
```javascript
const QUESTION_PATTERNS = {
  employer_401k: {
    pattern: /^(Yes|No)$/,
    preceded_by_pattern: /employer.*401/i,
    maps_to: 'P2_EX_Q1'
  },
  match_percentage: {
    pattern: /\d+%.*up to.*\d+%/,
    maps_to: 'P2_EX_Q3'
  }
};
```
**Benefit**: More flexible, handles form reordering automatically

#### Option 4: Dynamic Form Reader
Read form structure dynamically and create mapping:
```javascript
function createDynamicMapping(formId) {
  const formData = exportFormById(formId);
  const questions = formData.items.filter(item => 
    item.type === 'TEXT' || item.type === 'MULTIPLE_CHOICE'
  );
  // Create mapping based on question titles
}
```
**Benefit**: Ultimate flexibility, no manual mapping updates needed

### 2. Form Mapping UI
Create an admin interface to:
- View current mappings
- Update mappings without code changes
- Test mappings with sample data
- Track form version history

### 3. Automated Form Change Detection
- Monitor forms for question changes
- Alert when mapping updates needed
- Auto-generate mapping suggestions

## Implementation Priority

### High Priority - COMPLETED
1. ✅ Fixed Profile 5, 6, 9 form mappings (November 2024)
2. Create basic form mapping tests (still needed)
3. Document actual test functions available (still needed)

### New High Priority
1. Create test functions for enhanced profiles (5, 6, 8, 9)
2. Implement form mapping validation tests
3. Add employment-based scenario tests

### Medium Priority
1. Implement smart detection (Option 3)
2. Create form mapping validation tool

### Low Priority
1. Dynamic form reader (Option 4)
2. Admin UI for mapping management

## Code Cleanup Tasks

### Remove or Update
- Old test function references in documentation
- Commented-out mapping code that's no longer relevant

### Consolidate
- Multiple form handling functions could be simplified
- Duplicate validation logic across handlers

## Recent Enhancements (November 2024)

### Profile Helper Updates
1. **Employment-Based Logic**: Profiles 4, 5, 6, and 9 now support:
   - W-2 Employee scenarios
   - Self-employed scenarios
   - Both (mixed employment) scenarios
   - Dynamic vehicle generation based on work situation

2. **HSA Prioritization**: HSA moved higher in vehicle order for tax efficiency:
   - Profile 1: Position 3 (after ROBS vehicles)
   - Profiles 4, 5, 6, 9: Position 2 (after employer match)
   - Profile 8: Position 4 (after group plans)

3. **Advanced Vehicles Added**:
   - Profile 8: Cash Balance Plan (age 45+) and Mega Backdoor Roth
   - Profile 9: Roth Conversions and QCD Planning (age 70.5+)

### Documentation Updates
- ✅ All profile documentation updated with new line numbers
- ✅ Implementation status updated across all guides
- ✅ Testing Guide enhanced with new profile test commands
- ✅ Technical Reference updated with enhancement details

## Performance Optimization Opportunities

### Current Bottlenecks
1. Form response processing could be batched
2. Working Sheet writes could be optimized
3. Header lookups could be cached

### Potential Improvements
1. Implement batch processing for multiple submissions
2. Cache header positions per session
3. Optimize allocation engine for large datasets

## Security Considerations

### Current State
- Form IDs hardcoded in multiple places
- No validation of form response source

### Recommendations
1. Centralize form ID management
2. Add source validation for form submissions
3. Implement rate limiting for API calls

## Testing Infrastructure Improvements

### Missing Test Coverage
1. Form mapping functionality
2. Profile classification edge cases
3. Allocation engine boundary conditions
4. Email generation and sending

### Test Data Management
1. Create comprehensive test data sets
2. Implement test data versioning
3. Add performance benchmarks

## Documentation Gaps

### Technical Documentation
1. Detailed allocation algorithm explanation
2. Profile classification decision tree
3. Form-to-sheet data flow diagram

### User Documentation
1. Profile selection guide
2. Common allocation scenarios
3. FAQ for each profile type

## Maintenance Schedule

### Weekly
- Review form submissions for errors
- Check for unmapped questions
- Validate allocation results

### Monthly
- Update contribution limits if needed
- Review profile classification accuracy
- Performance metrics analysis

### Quarterly
- Form mapping audit
- Code optimization review
- Documentation updates

## Notes for Next Developer

1. **Form Mapping**: Current system works but is brittle - consider implementing Option 3 or 4
2. **Testing**: Prioritize creating form mapping tests before making changes
3. **Profiles 5,6,9**: Check if forms have been updated before fixing mappings
4. **Performance**: System handles current load but may need optimization for scale

## References

- Original design: FLEXIBLE_FORM_MAPPING_SYSTEM.md (archived)
- Current implementation: Code.js lines 1950-2020
- Related commits: 3ae34bf, 0b643a0
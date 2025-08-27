# Form Question Updates for Clarity

*Created: August 27, 2025*

## Purpose
To clarify that the allocation percentage represents ADDITIONAL savings beyond existing contributions, preventing user confusion and over-allocation issues.

## Critical Update: Phase 1 Allocation Percentage Question

### Current Question (Needs Update)
**Location**: Phase 1 Form, Question Index 24
**Current Text**:
> "What percentage of your monthly take-home pay would you like to invest each month, in addition to what you're already contributing to existing accounts?
> 
> Enter a whole number between 0 and 100. For example, if you're already saving 10% of your take-home pay and you'd like to save another 12%, enter 12."

### Recommended Updated Question

#### Option 1: Detailed Version
> "What ADDITIONAL percentage of your take-home pay would you like to save beyond your current contributions?
> 
> **IMPORTANT**: This percentage will be IN ADDITION to:
> - Any employer 401(k) matches
> - ROBS profit distributions (for Profile 1 users)
> - Existing Solo 401(k) contributions (for Profile 3 users)
> - Current retirement plan contributions (for Profile 8 users)
> - Any other automatic contributions you'll tell us about in Phase 2
> 
> **Example**: If you currently save 15% through existing plans and want to increase your total savings rate to 25%, enter 10 (not 25)."

#### Option 2: Concise Version (Recommended)
> "What ADDITIONAL percentage of your take-home pay would you like to save beyond your current contributions?
> 
> **NOTE**: We'll automatically include any existing 401(k) contributions, ROBS distributions, or employer matches you tell us about. This percentage is EXTRA savings on top of those.
> 
> **Example**: Enter 10 if you want to add 10% MORE to your current savings rate."

#### Option 3: Ultra-Simple Version
> "How much MORE would you like to save as a percentage of take-home pay?
> 
> This is IN ADDITION to any existing retirement contributions or ROBS distributions.
> 
> Enter 0 if you only want to optimize your existing contributions."

## Profile-Specific Clarifications

### Profile 1: ROBS In Use
**Current ex_q6 Question**:
> "Expected annual company profit distributions back into your Solo 401(k)"

**Recommended Update**:
> "Expected annual company profit distributions back into your Solo 401(k)
> 
> NOTE: These distributions will be treated as existing contributions. Any allocation percentage you specified will be added ON TOP of these distributions."

### Profile 3: Solo 401(k) Builder
**Current ex_q6 Question**:
> "If no, about how much do you expect to contribute into your new SOLO401k from your business each year?"

**Recommended Update**:
> "If no, about how much do you expect to contribute into your new SOLO401k from your business each year?
> 
> NOTE: This amount will be treated as a committed contribution. Any allocation percentage you specified will be for ADDITIONAL savings beyond this amount."

### Profile 8: Business Owner Group
**Current ex_q6 Question**:
> "How much do you contribute annually?"

**Recommended Update**:
> "How much do you currently contribute annually to your retirement plan?
> 
> NOTE: This will be treated as your baseline contribution. The allocation percentage you specified earlier will add EXTRA savings on top of this amount."

## Alternative Solution: Add a Clarification Screen

If updating the form questions is difficult, consider adding a clarification screen after Phase 1 submission:

**Clarification Screen Text**:
> "Just to confirm: You indicated you'd like to save an additional [X]% of your take-home pay.
> 
> Based on your Phase 2 answers, we'll be adding this ON TOP of:
> - [List any existing contributions identified]
> 
> Your total retirement savings will be: [existing] + [additional X%] = [total]
> 
> Is this correct?"
> 
> [ ] Yes, I want to ADD [X]% to my existing contributions
> [ ] No, I want my TOTAL savings rate to be [X]% (adjust for me)

## Implementation Priority

1. **Immediate**: Update Phase 1 allocation percentage question (Option 2 recommended)
2. **High Priority**: Add clarifying note to Profile 1, 3, and 8 questions about existing contributions
3. **Medium Priority**: Consider adding confirmation screen for profiles with seeded contributions
4. **Future**: Consider redesigning the allocation system to ask for total desired rate instead

## Testing the Updates

After implementing these changes:
1. Test with users who have existing contributions
2. Verify they understand the additional nature of the percentage
3. Confirm the calculations match their expectations
4. Document any remaining confusion for further refinement

## Notes

- The current system design (additional %) makes sense for users wanting to increase savings
- ROBS users particularly benefit from this approach as profit distributions are mandatory
- The key is clear communication about what's included in the baseline vs. what's additional
- Consider adding help text or tooltips with examples specific to each profile
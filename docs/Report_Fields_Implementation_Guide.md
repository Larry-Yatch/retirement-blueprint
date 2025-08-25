# Report Fields Implementation Guide

## Overview
This document provides a comprehensive reference for all output fields needed for the retirement blueprint report generation system. It covers fields from all 9 profiles and serves as the definitive guide for creating report templates and ensuring proper data flow from calculations to final reports.

## Report Generation Architecture

### Data Flow
1. **Phase 1 Form** → Profile Classification → Profile Assignment
2. **Phase 2 Form** → Profile-specific questions → Extra question data
3. **Allocation Engine** → Profile helper functions → Vehicle allocations
4. **Report Generation** → Working Sheet columns → Report placeholders
5. **Email Delivery** → PDF generation → Client delivery

### Key Components
- **Working Sheet**: Central data repository with all calculation results
- **Report Template**: Google Docs with {{placeholder}} fields
- **Merge Function**: Maps Working Sheet headers to template placeholders
- **PDF Generator**: Converts filled template to PDF for email delivery

## Master Field List

### Core Client Information Fields
These fields are common to all profiles and come from Phase 1 and Phase 2 forms:

```
{{timestamp}}                    // Form submission timestamp
{{full_name}}                   // Client's full name
{{email}}                       // Client's email address
{{student_id_last4}}           // Last 4 digits of ID (for tracking)
{{current_age}}                // Client's current age
{{filing_status}}              // Single, Married Filing Jointly, etc.
{{work_situation}}             // W-2 employee, Self-employed, Both
{{gross_annual_income}}        // Annual gross income
{{net_monthly_income}}         // Monthly net income after taxes
{{allocation_percentage}}      // User's desired allocation percentage
{{tax_minimization}}           // Now, Later, or Both
{{has_children}}               // Yes/No
{{num_children}}               // Number of children (if applicable)
{{investment_experience}}      // Investment scoring result
```

### Profile Classification Fields
```
{{profile_id}}                 // e.g., "1_ROBS_In_Use"
{{profile_name}}               // e.g., "ROBS-In-Use Strategist"
{{profile_description}}        // Profile overview text
{{classification_reason}}      // Why this profile was selected
```

### Allocation Summary Fields
These fields show the high-level allocation results:

```
{{total_monthly_savings}}      // Total allocated across all domains
{{effective_savings_rate}}     // Percentage of net income saved
{{retirement_total_monthly}}   // Total retirement domain allocation
{{education_total_monthly}}    // Total education domain allocation
{{health_total_monthly}}       // Total health domain allocation
{{family_bank_monthly}}        // Overflow/unallocated amount
```

### Universal Vehicle Fields
These vehicles appear across multiple profiles:

```
{{hsa_eligible}}               // Yes/No
{{hsa_monthly}}                // HSA allocation amount
{{hsa_catchup}}                // Yes/No (if age 55+)
{{combined_cesa_monthly}}      // CESA total for all children
{{cesa_per_child}}             // CESA amount per child
{{roth_ira_monthly}}           // Regular Roth IRA amount
{{backdoor_roth_ira_monthly}}  // Backdoor Roth IRA amount
{{traditional_ira_monthly}}    // Traditional IRA amount
{{education_bank_monthly}}     // Education overflow
{{health_bank_monthly}}        // Health overflow
```

## Profile-Specific Fields

### Profile 1: ROBS In Use
Unique fields for ROBS structure:

```
{{robs_structure_description}}         // ex_q1 response
{{robs_profit_routing}}                // ex_q2 response
{{robs_contribution_type}}             // Roth only/Traditional only/Both
{{robs_contribution_frequency}}        // Monthly/Quarterly/etc.
{{robs_also_uses_roth_ira}}           // Yes/No
{{robs_annual_profit_distribution}}    // Annual amount from business
{{robs_profit_distribution_monthly}}   // Monthly profit distribution
{{robs_solo_401k_roth_monthly}}       // Roth 401(k) portion
{{robs_solo_401k_traditional_monthly}} // Traditional 401(k) portion
```

### Profile 2: ROBS Curious
Planning ROBS implementation:

```
{{planned_robs_rollover}}              // Initial rollover amount
{{business_savings_capacity}}          // Annual business savings potential
{{spouse_in_business}}                 // Yes/No
{{has_employer_401k}}                  // Yes/No
{{employer_match_percentage}}          // Match percentage if applicable
{{employer_401k_has_roth}}             // Yes/No
{{solo_401k_employee_monthly}}         // Employee deferral
{{solo_401k_employer_monthly}}         // Employer contribution
{{employer_401k_match_monthly}}        // Employer match amount
```

### Profile 3: Solo 401k Builder
Self-employed optimization:

```
{{business_entity_type}}               // Sole Prop/LLC/S-Corp/C-Corp
{{has_employees}}                      // Should be No for this profile
{{has_existing_solo_401k}}             // Yes/No
{{solo_401k_employee_annual}}          // Current employee contribution
{{solo_401k_employer_annual}}          // Current employer contribution
{{solo_401k_future_annual}}            // Planned future contribution
{{solo_401k_employee_monthly}}         // Monthly employee amount
{{solo_401k_employer_monthly}}         // Monthly employer amount
{{has_employees_warning}}              // Warning if employees detected
```

### Profile 4: Roth Reclaimer
Backdoor Roth strategies:

```
{{traditional_ira_balance}}            // Current Traditional IRA balance
{{has_after_tax_contributions}}        // Yes/No
{{understands_backdoor_roth}}          // Yes/No
{{roth_conversion_desired_amount}}     // Amount to convert
{{employer_401k_available}}            // Yes/No
{{employer_401k_match}}                // Yes/No
{{employer_401k_match_percentage}}     // Match percentage
{{employer_401k_has_roth_option}}      // Yes/No
{{backdoor_roth_monthly}}              // Backdoor Roth allocation
{{roth_conversion_monthly}}            // Conversion amount monthly
```

### Profile 5: Bracket Strategist
Tax-focused allocation:

```
{{tax_focus_preference}}               // Now/Later/Both
{{traditional_401k_monthly}}           // Traditional 401(k) amount
{{roth_401k_monthly}}                  // Roth 401(k) amount
{{traditional_ira_monthly}}            // Traditional IRA amount
{{tax_bracket_current}}                // Current marginal rate
{{tax_bracket_retirement_est}}         // Estimated retirement rate
```

### Profile 6: Catch Up
Age 50+ acceleration:

```
{{age_50_plus}}                        // True (always for this profile)
{{401k_catchup_monthly}}               // Total 401(k) with catch-up
{{401k_catchup_amount}}                // Catch-up portion only
{{ira_catchup_monthly}}                // Total IRA with catch-up
{{ira_catchup_amount}}                 // IRA catch-up portion only
{{total_catchup_benefit}}              // Total additional from catch-ups
{{years_to_retirement}}                // Estimated years remaining
```

### Profile 7: Foundation Builder
Standard W-2 employee:

```
{{employer_401k_available}}            // Yes/No
{{employer_401k_employee_monthly}}     // Employee deferral
{{employer_401k_match_monthly}}        // Employer match
{{employer_401k_match_percentage}}     // Match percentage
{{employer_401k_has_roth}}             // Yes/No
{{roth_401k_monthly}}                  // Roth 401(k) amount
{{traditional_401k_monthly}}           // Traditional 401(k) amount
{{total_401k_monthly}}                 // Combined 401(k) amount
```

### Profile 8: Biz Owner Group
Business with employees:

```
{{num_employees}}                      // Number of W-2 employees
{{avg_employee_age}}                   // Average employee age
{{avg_employee_salary}}                // Average employee salary
{{owner_age_advantage}}                // Years older than employees
{{has_existing_group_plan}}            // Yes/No
{{existing_plan_type}}                 // 401(k)/DB/Other
{{current_annual_contribution}}        // Current contribution amount
{{group_401k_employee_monthly}}        // Employee deferral
{{group_401k_employer_monthly}}        // Profit sharing
{{defined_benefit_plan_monthly}}       // DB plan if applicable
{{defined_benefit_recommended}}        // Yes/No based on age gap
{{cash_balance_plan_monthly}}          // Cash balance if applicable
{{cash_balance_recommended}}           // Yes/No based on age
{{mega_backdoor_roth_monthly}}         // After-tax → Roth
{{total_advanced_strategies}}          // Combined advanced vehicles
```

### Profile 9: Late Stage Growth
Near retirement:

```
{{years_to_retirement}}                // Estimated years
{{retirement_readiness_score}}         // Calculated score
{{current_retirement_assets}}          // Total saved so far
{{roth_conversion_strategy}}           // Yes/No
{{roth_conversion_monthly}}            // Conversion amount
{{qcd_eligible}}                       // Yes if 70.5+
{{qcd_planning_monthly}}               // QCD amount if applicable
{{alternative_investments_interest}}   // From questionnaire
{{alternative_investments_monthly}}    // Alternative allocation
{{estate_planning_vehicles}}           // List of estate strategies
{{required_minimum_distributions}}     // RMD planning if applicable
```

## Working Sheet Headers to Add

To support report generation, add these headers to the HEADERS constant in code.js:

```javascript
const HEADERS = {
  // ... existing headers ...
  
  // Report Generation Headers
  DOC_URL: 'doc_url',
  DOC_CREATED_AT: 'doc_created_at',
  PDF_URL: 'pdf_url',
  PDF_SENT_AT: 'pdf_sent_at',
  
  // Profile-Specific Output Headers
  PROFILE_NAME: 'profile_name',
  PROFILE_DESCRIPTION: 'profile_description',
  TOTAL_MONTHLY_SAVINGS: 'total_monthly_savings',
  EFFECTIVE_SAVINGS_RATE: 'effective_savings_rate',
  
  // Vehicle-Specific Headers (examples)
  ROBS_PROFIT_DISTRIBUTION: 'robs_profit_distribution',
  SOLO_401K_EMPLOYEE: 'solo_401k_employee',
  SOLO_401K_EMPLOYER: 'solo_401k_employer',
  GROUP_401K_EMPLOYEE: 'group_401k_employee',
  CASH_BALANCE_PLAN: 'cash_balance_plan',
  MEGA_BACKDOOR_ROTH: 'mega_backdoor_roth',
  
  // Add all unique vehicle headers...
};
```

## Implementation Checklist

### Phase 1: Data Structure Setup
- [ ] Add all report headers to HEADERS constant
- [ ] Modify Working Sheet to include all columns
- [ ] Update column mappings in all functions
- [ ] Ensure all profile helpers write to correct columns

### Phase 2: Calculation Updates
- [ ] Update computeFullAllocation() to calculate summary fields
- [ ] Ensure each profile helper outputs all its unique fields
- [ ] Add percentage and ratio calculations
- [ ] Implement conditional field population

### Phase 3: Report Template Creation
- [ ] Create Google Docs template with all placeholders
- [ ] Design professional layout with sections
- [ ] Add conditional sections for profile-specific content
- [ ] Include charts/graphs placeholders if needed

### Phase 4: Integration
- [ ] Update form submission handlers
- [ ] Implement Phase 2 completion trigger
- [ ] Test data flow end-to-end
- [ ] Verify all fields populate correctly

### Phase 5: Testing
- [ ] Test each profile individually
- [ ] Verify calculations match expectations
- [ ] Check PDF generation quality
- [ ] Test email delivery

## Report Template Structure

### Suggested Section Organization

1. **Executive Summary**
   - Total savings rate and amount
   - Profile classification
   - Key recommendations

2. **Personal Information**
   - Demographics
   - Income and tax situation
   - Goals and preferences

3. **Allocation Summary**
   - Retirement domain breakdown
   - Education planning (if applicable)
   - Health savings strategy
   - Visual allocation chart

4. **Vehicle Details**
   - Specific amounts for each vehicle
   - Contribution timing
   - Tax implications
   - Special considerations

5. **Profile-Specific Strategies**
   - Unique opportunities
   - Advanced strategies (if applicable)
   - Implementation timeline
   - Next steps

6. **Appendix**
   - Assumptions used
   - Regulatory limits
   - Disclaimers

## Field Naming Conventions

### Standard Format
- Use lowercase with underscores: `{{field_name}}`
- Be descriptive but concise
- Group related fields with prefixes
- Always include units in name if not dollars

### Examples
- `{{employer_401k_match_monthly}}` - Clear vehicle and frequency
- `{{robs_profit_distribution_annual}}` - Profile-specific prefix
- `{{effective_savings_rate_percent}}` - Includes unit
- `{{has_children}}` - Boolean fields start with has/is/can

## Error Handling and Defaults

### Missing Data Handling
```javascript
// In profile helpers
const value = getValue(hdr, rowArr, HEADERS.FIELD) || defaultValue;

// In report template
{{field_name|Default text if missing}}
```

### Conditional Display
```
{{#if has_children}}
Education Planning: ${{education_total_monthly}}/month
  - CESA Contributions: ${{combined_cesa_monthly}}/month
  - Number of Children: {{num_children}}
{{/if}}
```

## Maintenance and Updates

### When Adding New Fields
1. Add to this documentation
2. Add header constant
3. Update Working Sheet structure
4. Modify relevant profile helper
5. Update report template
6. Test end-to-end

### Version Control
- Document changes in this file
- Update "Last Modified" dates
- Keep change log at bottom

## Technical Notes

### Performance Considerations
- Batch header updates to minimize sheet operations
- Cache frequently accessed values
- Use efficient formulas for calculations

### Data Validation
- Validate all numeric inputs
- Check for required fields before report generation
- Provide meaningful error messages

### Security
- Never log sensitive financial data
- Sanitize all user inputs
- Use secure email delivery methods

## Change Log

### December 2024
- Initial comprehensive documentation created
- All 9 profiles documented
- Complete field list compiled
- Implementation guide structured

---

**Last Updated**: December 2024
**Maintained By**: Development Team
**Next Review**: After initial testing phase
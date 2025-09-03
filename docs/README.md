# Retirement Blueprint Documentation

*Last Updated: January 2025*

## 🚨 Important Update: Actual vs Ideal System

The system now implements a two-output system showing **actual** (current) vs **ideal** (recommended) contributions. Allocation percentage now represents the **TOTAL** savings rate, not additional savings. See [Actual vs Ideal System Documentation](./Actual_vs_Ideal_System.md) for details.

## 📚 Core Documentation

### System Understanding

1. **[System_Overview.md](./System_Overview.md)**
   - Project overview and architecture
   - Actual vs ideal output system
   - System features and profile status
   - Infrastructure improvements

2. **[Actual_vs_Ideal_System.md](./Actual_vs_Ideal_System.md)**
   - Complete guide to the two-output system
   - Total vs additional percentage explanation
   - Discretionary vs non-discretionary contributions
   - Implementation details and testing

3. **[Phase_3_Future_Value_System.md](./Phase_3_Future_Value_System.md)**
   - Future value calculator documentation
   - Personalized interest rate calculation
   - Domain consolidation and projections
   - Integration with Phase 2

### Implementation Guides

4. **[Profile_Implementation_Guide.md](./Profile_Implementation_Guide.md)**
   - Complete guide for implementing profiles
   - Standard structures and patterns
   - Profile-specific details and status

5. **[Technical_Reference.md](./Technical_Reference.md)**
   - Header management system
   - Actual/ideal system functions
   - Phase 3 future value functions
   - Form mapping system
   - Contribution limits

6. **[Report_Fields_Implementation_Guide.md](./Report_Fields_Implementation_Guide.md)**
   - Email report generation
   - Field mappings and formatting

### Document Generation

7. **[Document_Generation_Guide.md](./Document_Generation_Guide.md)**
   - Complete document generation system
   - Automatic generation after Phase 3
   - Template configuration
   - Email integration with PDF attachments

8. **[Document_Branding_Complete_Guide.md](./Document_Branding_Complete_Guide.md)**
   - Logo and branding setup
   - Color schemes and typography
   - Professional formatting
   - Troubleshooting branding issues

### Testing & Debugging

9. **[TESTING_GUIDE_COMPLETE.md](./TESTING_GUIDE_COMPLETE.md)**
   - Comprehensive testing framework
   - Test data requirements
   - Common failures and solutions
   - Debug helpers

10. **[TESTING_QUICK_REFERENCE.md](./TESTING_QUICK_REFERENCE.md)**
    - Quick command reference
    - Common test commands
    - Profile test status

11. **[Debugging_Reference.md](./Debugging_Reference.md)** 🆕
    - Reprocess_Allocations.js guide
    - Common debugging scenarios
    - Header verification
    - Debug logging best practices

### User Resources

12. **[User_Guide.md](./User_Guide.md)**
    - Guide for end users
    - Understanding the 9 profiles
    - Interpreting results

13. **[Quick_Start.md](./Quick_Start.md)**
    - "I need to..." task reference
    - Common workflows
    - Troubleshooting

14. **[Profile_Complete_Validation_Guide.md](./Profile_Complete_Validation_Guide.md)**
    - Profile validation procedures
    - Testing checklists
    - Validation rules

## 🚀 Where to Start

**New to the project?**
- Start with [System_Overview.md](./System_Overview.md)
- Understand the new [Actual vs Ideal System](./Actual_vs_Ideal_System.md)
- Review [Quick_Start.md](./Quick_Start.md) for common tasks

**Testing the system?**
- Go to [TESTING_GUIDE_COMPLETE.md](./TESTING_GUIDE_COMPLETE.md)
- Use [TESTING_QUICK_REFERENCE.md](./TESTING_QUICK_REFERENCE.md) for commands

**Debugging allocation issues?**
- Use [Debugging_Reference.md](./Debugging_Reference.md) for Reprocess_Allocations
- Check the actual/ideal system documentation
- Reference [Technical_Reference.md](./Technical_Reference.md) for headers
- See Current_Headers.md for exact column positions

## 🚀 System Status

### Production Ready (January 2025)
- ✅ All 9 profiles fully implemented and tested
- ✅ Profile 4 and Profile 8 bugs fixed
- ✅ Complete testing infrastructure (Testing.js and Testing_Scenarios.js)
- ✅ Comprehensive test coverage for all profiles
- ✅ Actual vs ideal output system working perfectly
- ✅ All form questions properly mapped and validated
- ✅ Phase 3 Future Value Calculator implemented

### Recent Updates (January 2025)
- Phase 3 Future Value Calculator with personalized rates (8-20%)
- Document Generation System with automatic PDF creation
- Branded document templates with logo support
- Email delivery with multiple PDF attachments
- Consolidated documentation for easier navigation
- Archived completed audit and cleanup documents

## 📁 Archive Structure

Historical and completed documentation has been organized into archive folders:

**`archive/completed_audits_2024/`** - Completed audit and fix documentation
- Audit fix summaries
- Cleanup instructions
- Google Apps Script cleanup guides

**`archive/document_generation_old/`** - Previous document generation guides
- Original setup guides (now consolidated)
- Phase-specific documentation (now merged)

**`archive/`** - Historical documentation
- Outdated test results and analyses
- Old form questions and implementations
- Historical development notes

All current, actively-used documentation remains in the main docs folder.
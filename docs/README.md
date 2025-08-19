# Documentation Guide

This folder contains essential documentation for maintaining and extending the Retirement Blueprint system.

## 📚 Documentation Files

### 1. **CRITICAL_BUGS.md**
- **Purpose**: Track system-breaking bugs and their fixes
- **When to use**: When you encounter a bug that prevents the engine from working
- **Priority**: HIGH - Check this first when things break unexpectedly

### 2. **Profile_Tuning_Guide.md** 
- **Purpose**: Complete guide for tuning profiles efficiently
- **When to use**: Every time you tune a new profile
- **Key content**: Quick reference, common patterns, lessons learned, gotchas to avoid

### 3. **Header_Management_System.md**
- **Purpose**: Prevent and fix header-related test failures
- **When to use**: When tests fail with "header not found" or similar errors
- **Key content**: Header constants, validation functions, debugging tips

### 4. **Form_Mapping_Guide.md**
- **Purpose**: Map form question positions to Working Sheet columns correctly
- **When to use**: When adding profile-specific questions to forms
- **Critical info**: Profile questions always start at position 44+

## 🚀 Quick Start

**Tuning a new profile?**
1. Start with `Profile_Tuning_Guide.md`
2. Check `CRITICAL_BUGS.md` for known issues
3. Reference `Form_Mapping_Guide.md` when adding questions

**Tests failing?**
1. Check `Header_Management_System.md` first
2. Look at `CRITICAL_BUGS.md` for known issues

**Adding new questions?**
1. Read `Form_Mapping_Guide.md` carefully
2. Remember: Profile questions start at position 44+

## 📝 Maintenance

- Update `CRITICAL_BUGS.md` when discovering new system-breaking issues
- Keep `Profile_Tuning_Guide.md` updated with new patterns and lessons learned
- Document any header changes in `Header_Management_System.md`
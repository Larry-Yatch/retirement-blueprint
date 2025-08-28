# Phase 3: Future Value Calculator System

*Last Updated: January 28, 2025*

## Overview

Phase 3 implements a comprehensive future value calculator that projects the growth of retirement, education, and health savings over time. The system uses personalized interest rates based on investment sophistication and shows projections for both actual (current) and ideal (recommended) contribution scenarios.

## Key Features

### 1. Personalized Interest Rate Calculation
- **Range**: 8% to 20% annual return
- **Based on**: Investment scoring (involvement, time, confidence)
- **Formula**: `Base Rate (8%) + ((Average Score - 1) / 6) × Max Additional Rate (12%)`

### 2. Domain-Based Consolidation
The system consolidates all accounts within each domain:
- **Retirement**: All 401(k), IRA, ROBS, and other retirement vehicles
- **Education**: Combined CESA accounts
- **Health**: HSA accounts

### 3. Monthly Compounding
- Uses monthly compounding for accurate projections
- Formula: `FV = PMT × ((1 + r/12)^(n×12) - 1) / (r/12)`
- More realistic than annual compounding

### 4. Automatic Execution
- Runs automatically after Phase 2 completion
- Can also be triggered manually for specific rows

## Implementation Details

### Configuration Constants
```javascript
const FV_CONFIG = {
  BASE_RATE: 0.08,              // 8% minimum rate
  MAX_ADDITIONAL_RATE: 0.12,     // Up to 12% additional
  USE_MONTHLY_COMPOUNDING: true  // Monthly vs annual
};
```

### New Headers Added
The following columns must be added to the Working Sheet (row 2):
- `personalized_annual_rate` - The calculated annual rate
- `retirement_fv_actual` - Future value of current retirement contributions
- `retirement_fv_ideal` - Future value of recommended retirement contributions
- `education_fv_actual` - Future value of current education contributions
- `education_fv_ideal` - Future value of recommended education contributions
- `health_fv_actual` - Future value of current health contributions
- `health_fv_ideal` - Future value of recommended health contributions

### Core Functions

#### calculatePersonalizedRate(hdr, rowArr)
Calculates the annual interest rate based on investment scoring:
- Reads investment involvement, time, and confidence (1-7 scale)
- Averages the three scores
- Converts to annual rate (8-20%)

#### futureValue(monthlyContribution, annualRate, years)
Calculates future value with monthly compounding:
- Handles edge cases (zero/negative contributions, 99-year timelines)
- Returns 0 for invalid inputs
- Uses precise monthly compounding formula

#### consolidateByDomain(hdr, rowArr, type)
Consolidates all contributions by domain:
- Iterates through all headers ending in `_actual` or `_ideal`
- Groups by domain prefix (retirement_, education_, health_)
- Returns total monthly contribution for each domain

#### runPhase3(rowNum)
Main entry point for Phase 3:
- Initializes data from Working Sheet
- Calls calculation functions
- Writes results to appropriate columns
- Handles errors gracefully

## Timeline Fields Used

Phase 3 uses existing Phase 2 timeline fields:
- `retirement_years_until_target` - Years until retirement
- `cesa_years_until_first_need` - Years until first child needs education funds
- `hsa_years_until_need` - Years until major health expenses

Special handling:
- Timeline of 99 years = Not applicable (returns $0)
- Zero or negative timelines return $0

## Testing

### Test Functions Available

1. **testPhase3()** - Basic test using existing data
   ```javascript
   testPhase3()
   ```

2. **testPhase3EdgeCases()** - Tests edge cases
   ```javascript
   testPhase3EdgeCases()
   ```

3. **testPhase3Scenarios()** - Real-world scenarios
   ```javascript
   testPhase3Scenarios()
   ```

### Expected Behavior

For a user with:
- Investment scores: 5, 5, 5 (average)
- 20 years to retirement
- $1,000/month contributions

Expected:
- Personalized rate: 14%
- Future value: ~$1.03 million

## Integration with Phase 2

Phase 3 is automatically triggered at the end of Phase 2:

```javascript
// In handlePhase2()
try {
  runPhase3(rowNum);
} catch (error) {
  Logger.log(`⚠️ Phase 3 failed but Phase 2 completed successfully: ${error.message}`);
  // Don't throw - Phase 2 was successful even if Phase 3 fails
}
```

This ensures:
- Phase 3 runs automatically
- Phase 2 success isn't affected by Phase 3 failures
- Errors are logged but don't break the flow

## Manual Execution

To run Phase 3 manually for a specific row:
```javascript
runPhase3(5); // Run for row 5
```

## Future Enhancements

Potential improvements for future versions:
1. **Account-type multipliers** - Different growth rates for self-directed vs employer plans
2. **Monte Carlo simulations** - Show probability ranges instead of single projections
3. **Inflation adjustment** - Real vs nominal returns
4. **Tax considerations** - After-tax projections
5. **Visualization** - Charts showing growth over time

## Troubleshooting

### Common Issues

1. **Missing headers**: Ensure all 7 new columns are added to Working Sheet
2. **No output**: Check that Phase 2 data exists (ideal columns populated)
3. **Zero values**: Verify timeline fields are populated and reasonable
4. **Rate seems wrong**: Check investment scoring fields (should be 1-7)

### Debug Commands
```javascript
// Check personalized rate calculation
const rate = calculatePersonalizedRate(hdr, rowArr);
Logger.log(`Rate: ${(rate * 100).toFixed(2)}%`);

// Test domain consolidation
const totals = consolidateByDomain(hdr, rowArr, 'actual');
Logger.log(`Totals: ${JSON.stringify(totals)}`);
```

## Technical Notes

- All monetary values are rounded to whole dollars
- Interest rates are stored as decimals (0.14 = 14%)
- The system gracefully handles missing or invalid data
- Calculations assume consistent monthly contributions
- No present value component (starts from $0)
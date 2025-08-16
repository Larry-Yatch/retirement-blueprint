# User Journey Flowchart

```mermaid
flowchart TD
    Start([User Starts Journey]) --> Phase1[Complete Phase 1 Form]
    
    Phase1 --> Process1{System Processes<br/>Phase 1 Data}
    
    Process1 --> Profile[System Classifies User<br/>into 1 of 9 Profiles]
    
    Profile --> Email[User Receives Email<br/>with Phase 2 Link]
    
    Email --> Phase2[Complete Phase 2 Form<br/>Profile-Specific Questions]
    
    Phase2 --> Process2{System Runs<br/>Allocation Engine}
    
    Process2 --> Results[User Receives<br/>Retirement Blueprint]
    
    Results --> Implementation[User Implements<br/>Recommendations]
    
    %% Phase 1 Details
    Phase1 -.-> P1Details[Phase 1 Collects:<br/>• Age & Contact Info<br/>• Employment Status<br/>• Business Ownership<br/>• ROBS Interest<br/>• Existing Accounts<br/>• Tax Priorities<br/>• Retirement Timeline]
    
    %% Profile Types
    Profile -.-> ProfileTypes[9 Profile Types:<br/>1. ROBS In Use<br/>2. ROBS Curious<br/>3. Solo 401k Builder<br/>4. Roth Reclaimer<br/>5. Bracket Strategist<br/>6. Catch Up<br/>7. Foundation Builder<br/>8. Biz Owner Group<br/>9. Late Stage Growth]
    
    %% Phase 2 Details
    Phase2 -.-> P2Details[Phase 2 Collects:<br/>• Goal Priorities<br/>• Current Balances<br/>• Monthly Capacity<br/>• Tax Preferences<br/>• Profile-Specific Info]
    
    %% Results Details
    Results -.-> ResultDetails[Blueprint Includes:<br/>• Monthly Allocations<br/>• Vehicle Priority<br/>• Tax Strategy<br/>• Contribution Limits<br/>• Next Steps]
    
    style Start fill:#e1f5e1
    style Results fill:#e1f5e1
    style Implementation fill:#e1f5e1
    style Process1 fill:#ffe6e6
    style Process2 fill:#ffe6e6
    style Profile fill:#fff4e6
```

## User Journey Steps Explained

### 1. **Start Journey**
User initiates the retirement planning process, typically through a course or advisor referral.

### 2. **Phase 1 Form**
Initial assessment to understand basic situation and determine appropriate planning profile.

### 3. **Profile Classification**
Automated system analyzes responses and assigns user to most appropriate profile.

### 4. **Email Notification**
Personalized email with Phase 2 form link pre-filled with user's identifier.

### 5. **Phase 2 Form**
Detailed questionnaire specific to assigned profile for precise optimization.

### 6. **Allocation Engine**
Complex calculations considering limits, taxes, and preferences to optimize strategy.

### 7. **Receive Blueprint**
Comprehensive retirement savings strategy with specific monthly allocation amounts.

### 8. **Implementation**
User takes action based on recommendations to optimize retirement savings.
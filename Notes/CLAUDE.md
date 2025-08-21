# CLAUDE.md – Project Memory for Claude Code
This file helps Claude Code understand how to safely and effectively contribute to this project.  
Keep it short, directive, and update as the repo evolves.

---

## 📌 Project Overview
- Project: **Financial Trauma – Retirement Blueprint**
- Stack: Google Apps Script, Sheets automation, VSCode with `clasp`, Node for helpers
- Goal: Automate financial analysis + planning workflows and generate client-ready docs (PDFs, reports, emails)

---

## ⚙️ How to Run
- **Apps Script sync:** `clasp push` (deploy) / `clasp pull` (fetch changes)
- **Local testing:** Run unit tests via `npm test`
- **Linting:** `npm run lint`
- **Build:** Not required (Apps Script runs serverless). Just commit + push changes.

---

## 📝 Style & Conventions
- Code style: ES6+, prefer `const`/`let` over `var`
- Functions: Modular, reusable, pure where possible
- Logging: Use `console.log` or `Logger.log` for debugging
- Errors: Fail fast with clear error messages
- Comments: JSDoc-style headers for all exported functions

---

## 🚧 Danger Zones (Do Not Touch Without Explicit Instruction)
- **Google Sheet column mappings** – These drive financial calculations; never reorder/rename silently.
- **Core functions** – The core functions work so we do not want to change them unless we are sure of the problem
- **Drive folder IDs / Doc template IDs** – Hard-coded in config. Do not delete or overwrite.
- **Auth keys / API secrets** – Never commit or expose.
- **Generated output folders** – Don’t purge automatically; require explicit confirmation.

---

## ✅ Safe Tasks for Claude
- Refactoring functions into smaller units
- Writing new helper functions
- Adding inline error checks/logging
- Creating test stubs or sample inputs
- Updating docs (`README`, `CLAUDE.md`, comments)

---

## ❌ Unsafe Tasks (Require Human Approval)
- Mass file deletions or directory restructuring
- Destructive Git commands (`git reset --hard`, `git push -f`)
- Changing Sheet tab names or response column headers
- Touching deployment config (`.clasp.json`, API keys)

---

## 🔑 Commit & Branching
- Always work on a **feature branch** (`feature/<name>`)
- Write clear, small commits: “Add logging to importCore” > “fix stuff”
- Default commit command: `git add -A && git commit -m "<message>"`

---

## 🛠 Example Prompts That Work Well
- “Refactor `computeTopJudgementAndValue` to use a map instead of chained ifs”
- “Add defensive checks if config object is missing keys”
- “Draft pseudocode for personalized allocation engine before coding”

---

## 📂 Repo Structure (simplified)
- `/src` – Apps Script + helpers
- `/tests` – Unit test files
- `/docs` – Generated docs/templates
- `/config` – Constants, IDs, mappings

---

## 🧭 Rules of Engagement
- **Always show a plan before writing code.**
- **Never assume column order—read from config.**
- **Ask before deleting or renaming.**
- **Prefer incremental edits with diffs.**

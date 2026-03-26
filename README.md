# QA Tool — AI Test Case Generator

> Generate, save, and track test cases by project — powered by Claude AI.

[![Playwright Tests](https://github.com/engmilo/qa-tool/actions/workflows/playwright.yml/badge.svg)](https://github.com/engmilo/qa-tool/actions/workflows/playwright.yml)
[![GitHub Pages](https://img.shields.io/badge/demo-live-brightgreen)](https://engmilo.github.io/qa-tool/)

---

## Overview

**QA Tool** is a browser-based AI-powered test case generator built for QA engineers and developers. Describe a feature or user story, and the tool generates comprehensive test cases covering happy paths, edge cases, and negative scenarios — instantly.

### Features

- 🤖 **AI-generated test cases** — powered by Claude (Anthropic)
- 📁 **Project management** — save and organise test cases by project
- 📊 **Coverage dashboard** — track priority breakdown and test coverage across projects
- ✅ **Status tracking** — mark test cases as Pass, Fail, or Blocked
- 📤 **Export options** — download test cases as CSV or JSON
- 🌍 **Multilingual** — supports English, Finnish, and Arabic
- 🌗 **Light / Dark mode** — fully themed UI

---

## Demo

🔗 **Live app:** [https://engmilo.github.io/qa-tool/](https://engmilo.github.io/qa-tool/)

---

## Running Locally

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [Git](https://git-scm.com/)

### Setup

```bash
# Clone the repository
git clone https://github.com/engmilo/qa-tool.git
cd qa-tool

# Install dependencies
npm install
```

### Run

Since this is a static HTML application, you can open `index.html` directly in your browser, or use a local server:

```bash
# Using Node.js http-server (install once)
npx http-server .

# Then open http://localhost:8080 in your browser
```

---

## Running Playwright Tests

The project includes end-to-end tests written with [Playwright](https://playwright.dev/).

### Install Playwright browsers

```bash
npx playwright install
```

### Run all tests

```bash
npx playwright test
```

### Run a specific test file

```bash
npx playwright test qa-tool.spec.ts
```

### Run in headed mode (see the browser)

```bash
npx playwright test --headed
```

### View the HTML report

```bash
npx playwright show-report
```

---

## CI/CD

Tests run automatically on every push and pull request to `main` via **GitHub Actions**.

The workflow is defined in [`.github/workflows/playwright.yml`](.github/workflows/playwright.yml).

After each run, an HTML test report is uploaded as a downloadable artifact in the **Actions** tab.

---

## Project Structure

```
qa-tool/
├── index.html               # Main application
├── tests/
│   └── qa-tool.spec.ts      # Playwright end-to-end tests
├── .github/
│   └── workflows/
│       └── playwright.yml   # CI/CD workflow
├── playwright.config.ts     # Playwright configuration
└── package.json
```

---

## Author

**Milo Haireche** — 20+ years of QA expertise

---

## License

This project is open source and available under the [MIT License](LICENSE).
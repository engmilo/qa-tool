# QA Studio — AI Test Case Generator

A single-page AI-powered test case generator built for QA engineers. Describe a feature and get structured, prioritised test cases instantly.

🔗 **Live site:** https://YOUR-USERNAME.github.io/qa-studio

---

## Features

- 🤖 AI-generated test cases (via Claude API)
- 🎯 Priority levels: Critical → Trivial
- 📋 Step-by-step test structure with expected results, tags & risk notes
- 📥 Export to JSON and CSV
- 🌙 Light / Dark mode
- 📁 Projects, Suites & History views

---

## Setup

### 1. Clone the repo
```bash
git clone https://github.com/YOUR-USERNAME/qa-studio.git
cd qa-studio
```

### 2. Configure your Cloudflare Worker URL

Open `index.html` and update this line near the top of the `<script>` block:

```js
const WORKER_URL = "https://YOUR-WORKER.YOUR-NAME.workers.dev";
```

### 3. Cloudflare Worker (API proxy)

The Worker receives POST requests from the frontend, injects your Anthropic API key, and forwards to `api.anthropic.com`.

Your Worker code should look like this:

```js
export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    const body = await request.json();

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  },
};
```

Set your API key as a Worker secret:
```bash
wrangler secret put ANTHROPIC_API_KEY
```

### 4. Deploy to GitHub Pages

```bash
git add .
git commit -m "init: QA Studio scaffold"
git push origin main
```

Then go to your repo → **Settings → Pages → Source: main branch → Save**.

Your site will be live at `https://YOUR-USERNAME.github.io/qa-studio` within a minute.

---

## Project Structure

```
qa-studio/
├── index.html          # Single-file app (HTML + CSS + JS)
├── README.md
├── .gitignore
└── .github/
    └── workflows/
        └── deploy.yml  # Auto-deploy to GitHub Pages on push
```

---

## Tech Stack

- Vanilla HTML/CSS/JS (no build step)
- [Lucide Icons](https://lucide.dev)
- [Inter font](https://fonts.google.com/specimen/Inter)
- Claude API via Cloudflare Worker proxy

---

## License

MIT

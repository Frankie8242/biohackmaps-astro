# 📌 QUICK REFERENCE CARD

## 🌐 Access Points

| What | Where | Port |
|------|-------|------|
| Live Site | https://biohackmaps.com | 443 |
| Dev Server | http://localhost:4322 | 4322 |
| Search Console | https://search.google.com/search-console | - |
| Outscraper | https://www.outscraper.com | 443 |

## 📂 Important Files

| File | Location | Purpose |
|------|----------|---------|
| Import Script | `scripts/import-venues.js` | Process Outscraper CSV |
| CSV Guide | `CSV_IMPORT_GUIDE.md` | CSV format documentation |
| Deployment Guide | `DEPLOYMENT_CHECKLIST.md` | Step-by-step checklist |
| Status Doc | `READY_TO_LAUNCH.md` | Complete project status |

## 🔧 Key Commands

```bash
# Development
npm run dev              # Start dev server at 4322

# Build
npm run build           # Create production build

# Data Import
node scripts/import-venues.js venues.csv
```

## ✅ Checklist for Launch

- [ ] Submit sitemap to Google Search Console
- [ ] Download CSV from Outscraper
- [ ] Send CSV to agent for import
- [ ] Agent imports and rebuilds
- [ ] Verify new pages on live site
- [ ] Check Google Search Console for progress

## 🎯 Current Task

**You:** Get venues.csv from Outscraper  
**Agent:** Import CSV and deploy 100+ pages

---

*Dev server is running at http://localhost:4322/*

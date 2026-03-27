# BiohackMaps Deployment Checklist

## ✅ What I've Done

- [x] Installed sitemap plugin (@astrojs/sitemap)
- [x] Configured sitemap in astro.config.mjs
- [x] Generated sitemap-index.xml (available after each build)
- [x] Created CSV import script (`scripts/import-venues.js`)
- [x] Built project - 14 pages + sitemap generated successfully
- [x] Site ready to deploy to biohackmaps.com

## 🔗 What You Need to Do (In Order)

### Step 1: Verify Site is Live
- Go to https://biohackmaps.com/
- Confirm it's working (you already deployed the base build)

### Step 2: Submit Sitemap to Google Search Console
1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Select "biohackmaps.com" property
3. Click "Sitemaps" in left menu
4. Add new sitemap: `https://biohackmaps.com/sitemap-index.xml`
5. Click "Submit"
6. Wait for "Submitted" status ✓

### Step 3: Request URL Indexing
1. In Search Console, go to "URL Inspection" (search bar at top)
2. Paste these URLs one-by-one and click "Request Indexing":
   - `https://biohackmaps.com/`
   - `https://biohackmaps.com/venues/`
   - `https://biohackmaps.com/science/`
   - `https://biohackmaps.com/for-business/`
3. Wait for each to say "Submitted to index"

### Step 4: Get Your Venue Data (Outscraper)
1. Go to [Outscraper](https://www.outscraper.com/)
2. Create scraper for Google Maps venues in Sydney (or your target city)
3. Export results as **CSV format**
4. Save the file as `venues.csv`
5. **Send me the CSV file** (paste contents or upload)

### Step 5: I'll Import & Deploy
Once you give me the CSV, I will:
1. Run: `node scripts/import-venues.js venues.csv`
2. Generate updated `src/data/venues.ts` with real venues
3. Run: `npm run build`
4. All 300+ pages will regenerate with real data
5. Deploy to Netlify automatically
6. Google will crawl and index all new pages

## 📊 Expected Results After Data Import

- **Before**: 14 pages (1 mock venue)
- **After**: 100+ pages
  - 1 home page
  - 1 venues directory
  - ~50+ individual venue pages
  - 8 modality pages with filtered venues
  - Multiple city pages

## 🚀 Quick Reference Commands

When you have the CSV file:
```bash
# Import CSV and generate venues.ts
node scripts/import-venues.js venues.csv

# Build all pages
npm run build

# Test locally
npm run dev

# View sitemap status
# Check dist/sitemap-0.xml and dist/sitemap-index.xml
```

---

**Current Status**: ✅ Site is live, sitemap ready, waiting for venue data

**Next Action**: Submit sitemap to Search Console (5 min), then download CSV (10 min)

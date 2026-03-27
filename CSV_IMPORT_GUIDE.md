# CSV Import Guide

## Expected CSV Format

Your Outscraper CSV should have these columns (exact names):
- `name` (required) - Venue name
- `address` (required) - Street address
- `city` (required) - City name
- `country` (optional) - Country name
- `latitude` (optional) - Latitude coordinate
- `longitude` (optional) - Longitude coordinate
- `phone` (optional) - Phone number
- `website` (optional) - Website URL
- `email` (optional) - Email address
- `modalities` (optional) - Comma-separated modality types
- `rating` (optional) - Numeric rating
- `reviewCount` (optional) - Number of reviews
- `hours` (optional) - Operating hours
- `description` (optional) - Venue description
- `verified` (optional) - true/false
- `featured` (optional) - true/false

## Supported Modalities
- infrared-sauna
- cryotherapy
- float-tank
- red-light-therapy
- hyperbaric-oxygen
- cold-plunge
- trt-clinic
- tanning

## How to Import

1. **Download CSV from Outscraper**
   - Export your venue data as CSV format
   - Save as `venues-import.csv` in the project root

2. **Run this command:**
   ```bash
   npx astro-cli import venues-import.csv
   ```
   Or use the import script directly:
   ```bash
   node scripts/import-venues.js venues-import.csv
   ```

3. **Rebuild and deploy:**
   ```bash
   npm run build
   npm run deploy
   ```

## Example CSV Row
```
name,address,city,country,latitude,longitude,phone,website,email,modalities,rating,reviewCount,hours,description,verified,featured
SaunaLab Sydney,123 Fitness St,Sydney,Australia,-33.8821,151.2213,+61212345678,https://saunalab.com,info@saunalab.com,infrared-sauna;cold-plunge,4.8,142,Mon-Sun: 6am-10pm,Premium sauna facility,true,true
```

## Notes
- CSV header row is required
- Empty fields are acceptable
- Modalities should be semicolon-separated (;) if multiple
- Name and city are required for each row
- Venue slugs are auto-generated from name and city

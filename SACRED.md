# SACRED.md — Non-Negotiable Constants

These values are locked. Do NOT change without explicit Board approval.

## Analytics
- Google Analytics ID: `G-YQF2PSNPVS`
- File: src/layouts/Layout.astro

## Domain & URLs
- Canonical domain: `https://biohackmaps.com`
- File: src/layouts/Layout.astro (canonicalURL)
- OG image base: `https://biohackmaps.com`

## Stripe
- Live publishable key: `pk_live_51TGW09KAU2Dgyxl4QPsob7eNaEq7B22g0KtIyFjnaeymIP5y4dJKGzTMDax3lPyhfL7Hq9wZQ3W6aDfadqY7Rndj00acXXzgN1`
- Buy button ID: `buy_btn_1TGXx3KAU2Dgyxl4wXcw2vS7`
- Checkout URL: `https://buy.stripe.com/cNicN68X16P56rietQ33W01`
- File: src/pages/for-business.astro, src/pages/claim.astro

## Venue Quality Filters
- Minimum rating: 4.7 stars
- Minimum reviews: 50
- Minimum venues for city×modality page: 2

## Netlify
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 22

## Security Headers (netlify.toml)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- X-Robots-Tag: noai, noimageai
- Cache-Control for /_astro/*: public, max-age=31536000, immutable

## Social
- X/Twitter: @biohackmaps
- Instagram: @biohackmap
- Email: support@biohackmap.com

## Modalities (10 total — do not remove any)
1. infrared-sauna
2. cryotherapy
3. float-tank
4. red-light-therapy
5. hyperbaric-oxygen
6. cold-plunge
7. trt-clinic
8. iv-therapy
9. tanning
10. womens-health

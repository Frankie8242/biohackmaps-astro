# CLAUDE.md — BiohackMap

## Project
BiohackMap — the world's largest free directory of biohacking venues.
- Stack: Astro + TypeScript, deployed on Netlify
- Repo: https://github.com/Frankie8242/biohackmaps-astro
- Live: https://biohackmaps.com
- 528+ venues, 57+ cities, 10+ countries, 790 pages

## Rules

### Never do these without Board approval
- NEVER modify venue city/country fields in src/data/venues.ts
- NEVER change netlify.toml redirects, headers, or build config
- NEVER modify robots.txt or sitemap config
- NEVER push to main without building first (npm run build)
- NEVER run git reset, git revert, or git checkout on any file
- NEVER delete or rename existing pages/routes
- NEVER remove structured data schemas from pages
- NEVER modify the Stripe checkout links or pricing

### Always do these
- Always run `npm run build` before committing to catch errors
- Always `git pull` before starting work
- Always read SACRED.md before modifying any sacred file
- Never hallucinate file paths, function names, or APIs — check first
- Verify venue data changes against real sources (Google Maps, venue websites)
- Keep internal cross-links intact — don't remove link sections from templates

### Sacred files (read SACRED.md)
Changes to these files require extra care:
- src/data/venues.ts — venue database
- src/data/modalities.ts — modality definitions
- src/lib/schema.ts — structured data for Google
- src/layouts/Layout.astro — global layout, meta tags, analytics
- netlify.toml — build config, redirects, security headers
- public/robots.txt — crawler rules

## Check Guards
When asked to "check guards" or "read safeguards", run all of these:
1. Read CLAUDE.md (this file)
2. Read SACRED.md
3. Verify sacred constants haven't drifted (check SACRED.md values against code)
4. Run `npm run build` to verify no errors
5. Check git status for uncommitted changes
6. Verify robots.txt blocks are intact
7. Verify netlify.toml security headers are present
8. Report pass/fail for each check

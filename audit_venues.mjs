import { readFileSync } from 'fs';

const src = readFileSync('src/data/venues.ts', 'utf8');

const skipWords = ['massage','facial','cosmetic','dental','chiro','yoga','pilates','tattoo','day spa','barber','beauty salon','wax','nail salon','laser hair','threading','eyebrow','lash'];

const violations = { lowRating: [], lowReviews: [], badKeyword: [] };
let count = 0;

// Split on venue object boundaries
const idRe = /id:\s*['"`](\d+)['"`]/g;
const ids = [...src.matchAll(idRe)].map(m => ({ id: m[1], idx: m.index }));

for (let i = 0; i < ids.length; i++) {
  const start = ids[i].idx;
  const end = ids[i + 1]?.idx ?? src.length;
  const block = src.slice(start, end);

  const id = ids[i].id;
  const name = (block.match(/name:\s*['"`]([^'"`]+)['"`]/) || [])[1];
  const rating = parseFloat((block.match(/rating:\s*([\d.]+)/) || [])[1]);
  const reviews = parseInt((block.match(/reviewCount:\s*(\d+)/) || [])[1]);
  const city = (block.match(/city:\s*['"`]([^'"`]+)['"`]/) || [])[1];

  if (!name) continue;
  count++;

  const nameLower = name.toLowerCase();
  const badWord = skipWords.find(w => nameLower.includes(w));

  if (!isNaN(rating) && rating < 4.7) violations.lowRating.push({ id, name, city, rating });
  if (!isNaN(reviews) && reviews < 50) violations.lowReviews.push({ id, name, city, reviews });
  if (badWord) violations.badKeyword.push({ id, name, city, badWord });
}

console.log('Total venues parsed:', count);
console.log('\n=== LOW RATING (< 4.7) ===', violations.lowRating.length);
violations.lowRating.forEach(v => console.log(`  [${v.id}] ${v.name} (${v.city}) — ${v.rating}`));
console.log('\n=== LOW REVIEWS (< 50) ===', violations.lowReviews.length);
violations.lowReviews.forEach(v => console.log(`  [${v.id}] ${v.name} (${v.city}) — ${v.reviews} reviews`));
console.log('\n=== BAD KEYWORDS IN NAME ===', violations.badKeyword.length);
violations.badKeyword.forEach(v => console.log(`  [${v.id}] ${v.name} (${v.city}) → "${v.badWord}"`));

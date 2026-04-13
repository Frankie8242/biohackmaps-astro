// Post-build script: ping IndexNow (Bing/Yandex) and Google with sitemap updates
// Run after every deploy via: node scripts/ping-search-engines.js

const SITE = 'https://biohackmaps.com';
const INDEXNOW_KEY = 'd4c5eff1ef5048c78c84ef44b2e8c813';
const SITEMAP_URL = `${SITE}/sitemap-index.xml`;

async function pingGoogle() {
  const url = `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;
  try {
    const res = await fetch(url);
    console.log(`Google ping: ${res.status} ${res.statusText}`);
  } catch (e) {
    console.log(`Google ping failed: ${e.message}`);
  }
}

async function pingIndexNow() {
  // Ping Bing via IndexNow
  const url = 'https://api.indexnow.org/indexnow';
  const body = {
    host: 'biohackmaps.com',
    key: INDEXNOW_KEY,
    keyLocation: `${SITE}/${INDEXNOW_KEY}.txt`,
    urlList: [
      `${SITE}/`,
      `${SITE}/venues/`,
      `${SITE}/cities/`,
      `${SITE}/submit/`,
      `${SITE}/for-business/`,
      `${SITE}/science/`,
    ],
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    console.log(`IndexNow ping: ${res.status} ${res.statusText}`);
  } catch (e) {
    console.log(`IndexNow ping failed: ${e.message}`);
  }
}

async function main() {
  console.log('Pinging search engines...');
  await Promise.all([pingGoogle(), pingIndexNow()]);
  console.log('Done.');
}

main();

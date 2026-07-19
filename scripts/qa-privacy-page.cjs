const { chromium } = require('playwright');
const fs = require('fs');

const url = process.argv[2] || 'http://127.0.0.1:8765/privacy/';
const outputDirectory = process.argv[3] || '/tmp/thingineeer-privacy-qa';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

(async () => {
  fs.mkdirSync(outputDirectory, { recursive: true });
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const results = [];

  try {
    for (const width of [375, 768, 1280]) {
      const context = await browser.newContext({
        viewport: { width, height: 900 },
        colorScheme: 'light',
        locale: 'ko-KR',
      });
      const page = await context.newPage();
      await page.goto(url, { waitUntil: 'networkidle' });

      const facts = await page.evaluate(() => ({
        title: document.title,
        language: document.documentElement.lang,
        articles: document.querySelectorAll('.app-policy').length,
        details: document.querySelectorAll('.app-policy details').length,
        main: Boolean(document.querySelector('main#content')),
        navLabel: document.querySelector('nav')?.getAttribute('aria-label'),
        horizontalOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        emptyLinks: [...document.querySelectorAll('a')].filter((link) => !link.getAttribute('href')).length,
        unlabeledControls: [...document.querySelectorAll('button, select')].filter((control) => {
          if (control.getAttribute('aria-label') || control.getAttribute('aria-labelledby')) return false;
          if (control.id && document.querySelector(`label[for="${control.id}"]`)) return false;
          return control.tagName !== 'BUTTON' || !control.textContent.trim();
        }).length,
      }));

      assert(facts.title.includes('개인정보 처리방침'), `${width}px: document title missing`);
      assert(facts.language === 'ko', `${width}px: html lang must be ko`);
      assert(facts.articles === 9 && facts.details === 9, `${width}px: app directory incomplete`);
      assert(facts.main && facts.navLabel, `${width}px: semantic landmarks missing`);
      assert(facts.horizontalOverflow <= 1, `${width}px: horizontal overflow ${facts.horizontalOverflow}px`);
      assert(facts.emptyLinks === 0, `${width}px: link without href`);
      assert(facts.unlabeledControls === 0, `${width}px: unlabeled controls`);

      await page.screenshot({
        path: `${outputDirectory}/privacy-${width}.png`,
        fullPage: true,
      });

      results.push({ width, ...facts });
      await context.close();
    }

    const context = await browser.newContext({ viewport: { width: 375, height: 900 }, locale: 'ko-KR' });
    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.selectOption('#app-select', 'ddalggak');
    await page.waitForFunction(() => location.hash === '#ddalggak');
    assert(await page.locator('#ddalggak details').evaluate((node) => node.open), 'Ddalggak details did not open');
    assert(await page.locator('#ddalggak').evaluate((node) => node.classList.contains('is-selected')), 'Ddalggak selection highlight missing');
    await page.screenshot({ path: `${outputDirectory}/privacy-ddalggak-selected.png`, fullPage: false });
    await context.close();

    console.log(JSON.stringify({ status: 'PASS', url, results }, null, 2));
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error.stack || error.message);
  process.exit(1);
});

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
import fs from 'node:fs';
import path from 'node:path';
const base = process.env.SPORTGRIPS_BASE_URL || 'http://localhost:3028';
const output = path.resolve('docs/seo/visual-checks');
fs.mkdirSync(output, { recursive: true });
const failures = [],
  errors = [],
  checks = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};
const sports = ['golf', 'tennis', 'padel', 'badminton', 'squash', 'hockey'];
let browser;
(async () => {
  browser = await chromium.launch({
    headless: true,
    ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE }
      : {}),
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  page.on('pageerror', (e) => errors.push(e.message));
  const visit = async (route) => {
    const response = await page.goto(base + route, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const reject = page.getByRole('button', { name: 'Alleen noodzakelijk', exact: true }).first();
    if (await reject.isVisible()) await reject.click();
    assert(response.status() === 200, `${route}: HTTP ${response.status()}`);
  };
  await visit('/');
  for (const sport of sports) {
    const href = `/${sport}grips/`;
    const top = page.locator(
      `#primary-menu > a[href="${href}"], #primary-menu > div > div > a[href="${href}"]`,
    );
    assert(
      (await top.count()) === 1 && (await top.isVisible()),
      `${sport}: first-level link missing`,
    );
    assert(
      (await page.locator(`footer a[href="${href}"]`).count()) === 1,
      `${sport}: footer link missing`,
    );
  }
  const golf = page.getByRole('button', { name: 'Golfgrips submenu', exact: true });
  await golf.hover();
  const golfPanel = page.locator('#' + (await golf.getAttribute('aria-controls')));
  assert(await golfPanel.isVisible(), 'Desktop hover did not open golf');
  assert(
    (await golfPanel.locator('a[href$="/vervangen/"]').count()) === 0,
    'Replacement guide appears in sports dropdown',
  );
  assert(
    (await golfPanel.getByRole('link', { name: 'Golf Pride', exact: true }).count()) === 1,
    'Golf brand link missing',
  );
  await golf.focus();
  await golf.press('ArrowDown');
  await page.waitForFunction(
    () => document.activeElement === document.querySelector('#navigation-dropdown-0 a'),
  );
  assert(
    await golfPanel
      .getByRole('link')
      .first()
      .evaluate((el) => el === document.activeElement),
    'ArrowDown focus missing',
  );
  await page.keyboard.press('Escape');
  assert(
    await golf.evaluate((el) => el === document.activeElement),
    'Escape did not restore trigger focus',
  );
  assert((await golf.getAttribute('aria-expanded')) === 'false', 'Escape did not close dropdown');
  await golf.evaluate((el) => el.blur());
  await page.mouse.move(1, 500);
  await golf.hover();
  await page.mouse.move(1, 500);
  assert(await golfPanel.isVisible(), 'Hover grace period missing');
  await page.waitForTimeout(450);
  assert(!(await golfPanel.isVisible()), 'Hover menu did not close after delay');
  const knowledge = page.getByRole('button', { name: 'Gripkennis submenu', exact: true });
  await knowledge.hover();
  const knowledgePanel = page.locator('#' + (await knowledge.getAttribute('aria-controls')));
  assert(
    (await knowledgePanel.locator('a[href$="/vervangen/"]').count()) === 6,
    'Knowledge menu must include six replacement guides',
  );
  await page.getByRole('link', { name: 'Alle gripkennis', exact: true }).click();
  await page.waitForURL('**/kennis/');
  assert(
    (await page.locator('#grips-vervangen .project-grid a[href$="/vervangen/"]').count()) === 6,
    'Knowledge overview replacement section incomplete',
  );
  await visit('/golfgrips/maat/midsize/');
  const crumbs = await page.getByRole('navigation', { name: 'Kruimelpad' }).innerText();
  assert(
    crumbs.includes('Golfgrips') && crumbs.includes('Gripmaat golf') && crumbs.includes('Midsize'),
    'Nested breadcrumb incomplete',
  );
  const schema = await page.locator('script[type="application/ld+json"]').allTextContents();
  const breadcrumb = schema.map((s) => JSON.parse(s)).find((s) => s['@type'] === 'BreadcrumbList');
  assert(breadcrumb.itemListElement.length === 4, 'Nested breadcrumb schema incomplete');
  const routes = [
    '/',
    '/golfgrips/',
    '/tennisgrips/',
    '/padelgrips/',
    '/badmintongrips/',
    '/squashgrips/',
    '/hockeygrips/',
    '/tennisgrips/basisgrips/',
    '/golfgrips/golf-pride/',
    '/padelgrips/adidas/',
    '/kennis/',
  ];
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
    for (const route of routes) {
      await visit(route);
      const metrics = await page.evaluate(() => ({
        width: document.documentElement.scrollWidth,
        viewport: innerWidth,
        h1: getComputedStyle(document.querySelector('h1')).fontWeight,
        broken: [...document.images].filter((i) => i.complete && !i.naturalWidth).map((i) => i.src),
      }));
      assert(metrics.width <= metrics.viewport, `${width} ${route}: overflow ${metrics.width}`);
      assert(metrics.h1 === '400', `${width} ${route}: H1 weight ${metrics.h1}`);
      assert(metrics.broken.length === 0, `${width} ${route}: broken images`);
      checks.push({ width, route, ...metrics });
      if (width !== 320 && ['/golfgrips/', '/tennisgrips/basisgrips/'].includes(route)) {
        await page.screenshot({
          path: path.join(
            output,
            `refresh-${route.includes('basisgrips') ? 'category' : 'pillar'}-${width}.png`,
          ),
          fullPage: true,
          animations: 'disabled',
        });
        await page.screenshot({
          path: path.join(
            output,
            `refresh-${route.includes('basisgrips') ? 'category' : 'pillar'}-${width}-top.png`,
          ),
          animations: 'disabled',
        });
        if (route === '/golfgrips/' && width === 1440) {
          await page.locator('.grip-directory').first().scrollIntoViewIfNeeded();
          await page.screenshot({
            path: path.join(output, 'refresh-pillar-directory.png'),
            animations: 'disabled',
          });
        }
      }
      if (route === '/golfgrips/')
        assert(
          (await page.locator('.grip-directory a[href="/golfgrips/golf-pride/"]').count()) === 1,
          'Pillar brand card missing',
        );
      if (route === '/tennisgrips/basisgrips/') {
        assert(
          (await page.locator('.rich-content > section > h2').count()) === 5,
          'Category should have five editorial H2s',
        );
        assert(
          (await page.locator('.grip-product').count()) === 4,
          'Category product selection incomplete',
        );
        const external = await page
          .locator('.grip-shop-link')
          .evaluateAll((els) => els.map((el) => ({ href: el.href, rel: el.rel })));
        assert(
          external.every(
            (el) =>
              new URL(el.href).hostname === 'www.bol.com' &&
              new URL(el.href).searchParams.get('searchtext') &&
              el.rel.includes('sponsored') &&
              el.rel.includes('noopener'),
          ),
          'Product destination or rel invalid',
        );
      }
    }
  }
  // Dense desktop header and tablet/mobile menu boundaries.
  for (const width of [1200, 1280, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await visit('/');
    if (width >= 1200) {
      const geometry = await page.locator('nav[aria-label="Hoofdnavigatie"]').evaluate((nav) => {
        const rect = (el) => {
          const b = el.getBoundingClientRect();
          return { left: b.left, right: b.right };
        };
        return {
          logo: rect(nav.children[0]),
          menu: rect(nav.children[1]),
          cta: rect(nav.children[2]),
          viewport: innerWidth,
        };
      });
      assert(
        geometry.logo.right <= geometry.menu.left &&
          geometry.menu.right <= geometry.cta.left &&
          geometry.cta.right <= width,
        `${width}: header links overlap`,
      );
    } else {
      await page.getByRole('button', { name: 'Menu openen', exact: true }).click();
      await page.getByRole('button', { name: 'Gripkennis submenu', exact: true }).click();
      const panel = page.locator('#navigation-dropdown-6');
      assert(
        (await panel.locator('a[href$="/vervangen/"]').count()) === 6,
        `${width}: mobile replacement links missing`,
      );
      assert(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        `${width}: open menu overflow`,
      );
      await panel.getByRole('link', { name: 'Squashgrips vervangen', exact: true }).click();
      await page.waitForURL('**/squashgrips/vervangen/');
      assert(
        await page.getByRole('button', { name: 'Menu openen', exact: true }).isVisible(),
        `${width}: navigation did not close after selection`,
      );
      if (width === 390) {
        await page.getByRole('button', { name: 'Menu openen', exact: true }).click();
        await page.getByRole('button', { name: 'Gripkennis submenu', exact: true }).click();
        await page.screenshot({
          path: path.join(output, 'refresh-menu-mobile.png'),
          animations: 'disabled',
        });
      }
    }
  }
  // Changed helper branch: squash replacement must resolve to the new guide.
  await page.setViewportSize({ width: 390, height: 844 });
  await visit('/keuzehulp/');
  await page.getByRole('button', { name: 'Start de keuzehulp', exact: true }).click();
  for (const [index, value] of ['squash', 'base', 'dry', 'surface', 'replace'].entries()) {
    await page.locator(`input[value="${value}"]`).check({ force: true });
    await page
      .getByRole('button', {
        name: index === 4 ? 'Bekijk mijn gripadvies' : 'Volgende',
        exact: true,
      })
      .click();
  }
  assert(
    (await page.getByRole('link', { name: 'Lees mijn keuzeuitleg' }).getAttribute('href')) ===
      '/squashgrips/vervangen/',
    'Squash helper result incorrect',
  );
  assert(errors.length === 0, 'Browser runtime errors');
  const report = {
    base,
    failures,
    errors,
    routeChecks: checks,
    menuWidths: [1440, 1280, 1200, 768, 390, 320],
    helper: 'squash replacement',
  };
  fs.writeFileSync('docs/seo/check-refresh-browser.json', JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify({ ...report, routeChecks: checks.length }, null, 2));
  await browser.close();
  if (failures.length) process.exitCode = 1;
})().catch(async (error) => {
  console.error(error);
  if (browser) await browser.close();
  process.exitCode = 1;
});

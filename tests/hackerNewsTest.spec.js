import { test, expect } from '@playwright/test';

test('100 articles sorted', async ({ page }) => {
  await page.goto('https://news.ycombinator.com/newest');

  const moreButton = page.getByRole('link', {name: 'More'});

  // Test for cell 1 to contain text '1'
  page.getByRole('cell', { name: '1' });
  await expect(page.getByRole('cell', { name: '1.', exact: true })).toHaveText('1.');

  // Expect 30 articles on the first page
  const articles = await page.locator('.athing').count();
  expect(articles).toBe(30);

  // Check the articles go from newest to oldest
  expect (await page.locator('.age').count()).toBe(30);

  // Extracting article timecodes from the first page
  const times1 = await page.locator('.age').evaluateAll((ages) =>
    ages.map(age => age.getAttribute('title'))
  );

  expect(times1.length).toBe(30);

  await moreButton.click();
});


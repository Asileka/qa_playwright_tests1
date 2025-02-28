import { test, expect } from "@playwright/test";

test("100 articles sorted", async ({ page }) => {
  await page.goto("https://news.ycombinator.com/newest");

  const moreButton = page.getByRole("link", { name: "More", exact: true });

  // Extracting article timecodes from the first page
  const times1 = await page
    .locator(".age")
    .evaluateAll((ages) => ages.map((age) => age.getAttribute("title")));

  // Only keeping the timestamps, slicing out the rest of the timecode
  const timeStamps1 = times1.map((time) => time.slice(20));
  // Rearranging the timestamps in the descending order
  const sortedTimeStamps1 = [...timeStamps1].sort((a, b) => b - a);
  expect(timeStamps1).toEqual(sortedTimeStamps1);
  await moreButton.click();
  const times2 = await page
    .locator(".age")
    .evaluateAll((ages) => ages.map((age) => age.getAttribute("title")));
  let timesCombined = [...times1, ...times2];

  while (timesCombined.length < 100) {
    await moreButton.click();

    const nextPageTimes = await page
      .locator(".age")
      .evaluateAll((ages) => ages.map((age) => age.getAttribute("title")));

    timesCombined = [...timesCombined, ...nextPageTimes];
    console.log(timesCombined.length);
  }
  const times100 = timesCombined;
  if (timesCombined.length > 100) {
    times100 = timesCombined.slice(0, timesCombined.length - 100);
  }
  const timeStamps100 = times100.map((time) => time.slice(20));
});

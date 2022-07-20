import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.tidio.com/panel/register");
  await page.evaluate(() => {
    localStorage.setItem("inboxAb", "false"); //set localstorage to avoid feature A/B test
  });
  await page.reload();
});

export const getNewEmail = (): string =>
  `testing+${new Date().getTime()}@tidio.net`;

let password = (Math.random() + 1).toString(36).substring(2);

test.describe("Widget tests", () => {
  test("Send message from widget to panel and from panel to widget", async ({
    page,
  }) => {
    await test.step("Register new account", async () => {
      await page.locator('[placeholder="Email"]').fill(getNewEmail());
      await page.locator('[placeholder="Password"]').fill(password);
      await page.locator('[placeholder="Website"]').fill("example.com");
      await page.locator('[type="checkbox"]').click();
      await page.locator("button", { hasText: "Get started" }).click();
      await expect(
        page.locator("h3", { hasText: "Configure your live chat" })
      ).toBeVisible();
    });
    await test.step("Complete tour", async () => {
      const continueButton = page.locator("css=button >> text=Continue");
      await page.locator("//*[text()='Your name']/..//input").fill("user");
      await continueButton.click();
      await page
        .locator("//*[text()='Number of support agents']/..//input")
        .fill("5");
      await page.locator('//label[text()="What\'s your industry?"]/..').click();
      await page.locator('text="Online Store"').click();
      await page.locator('//label[text()="Number of customers"]/..').click();
      await page.locator('text="6-25"').click();
      await page
        .locator(
          "//*[contains(text(),'I want to have a customer service tool')]"
        )
        .click();
      await continueButton.click();
      await continueButton.click();
      await continueButton.click();
      await page.locator('text="Skip now & go to main dashboard"').click();
      await expect(page.locator("h2", { hasText: "News Feed" })).toBeVisible();
    });
    await test.step(
      "Simulate visitor and send message from widget to panel",
      async () => {
        await page.locator("[href='/panel/conversations']").click();
        //TODO
      }
    );
    await test.step("Send a reply message from the panel", async () => {
      //TODO
    });
  });
});

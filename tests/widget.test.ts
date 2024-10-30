import { test, expect } from "@playwright/test";
import { chatMessages, uiElementsText, userEmail } from "./consts/definitions";
import { clearConversations } from './consts/commands';

test.beforeAll(async () => {
await clearConversations();
});

test.describe("Widget tests", () => {
  test("Send message from widget to panel and from panel to widget", async ({
    page,
  }) => {
    await test.step("Login to project", async () => {
      await page.goto(
        `https://www.tidio.com/panel/?project_public_key=${process.env.PROJECT_PUBLIC_KEY}&api_token=${process.env.API_TOKEN}`
      );
    });
    await test.step("Simulate visitor and send message from widget to panel", async () => {

      await page.locator('[data-test-id="inbox-section-button"]').click();
      const [newPage] = await Promise.all([
        page.waitForEvent("popup"),
        page.getByRole("button", { name: 'Simulate a conversation' }).click(),
      ]);
      await newPage.waitForLoadState();
      const chatFrame = await newPage.waitForSelector('#tidio-chat-iframe');
      const frame = await chatFrame.contentFrame();

      if (frame) {

        const greetingMessage = frame.getByTestId('flyMessage');
        await expect(greetingMessage).toHaveText(uiElementsText.greetingMessage);


        const widgetButton = frame.getByTestId('widgetButton');
        await widgetButton.click();

        const messageTextarea = frame.getByTestId('newMessageTextarea');
        await messageTextarea.fill(chatMessages.question);

        const sendButton = frame.getByTestId('widgetButtonBody');
        await sendButton.click();

        const userModal = frame.locator('.pre-chat');
        await expect(userModal).toHaveText(uiElementsText.userModal);

        const emailInput = frame.locator('[placeholder="Enter your email..."]');
        await emailInput.click();
        await emailInput.fill(userEmail.randomEmail);

        const submitButton = frame.locator('button[type="submit"]');
        await submitButton.click();

        await newPage.waitForTimeout(5000);
      }
      await newPage.close();
    });
    await test.step("Send a reply message from the panel", async () => {

      const inboxIcon = page.locator('[data-test-id="inbox-section-button"]');
      await expect(inboxIcon).toHaveAttribute('href', '/panel/inbox');
      await expect(inboxIcon).toHaveAttribute('aria-current', 'page');
      await expect(inboxIcon).toHaveText('1');
      
      const goToUnnasignedButton = page.locator('button:has-text("Go to Unassigned")');
      await goToUnnasignedButton.click();

      const userConversationTile = page.locator('div.message-wrapper.with-avatar').nth(1);
      await expect(userConversationTile).toContainText(chatMessages.question);
      await expect(userConversationTile).toContainText(userEmail.randomEmail);
      
      const joinConversationButton = page.locator('button:has-text("Join conversation")');
      await joinConversationButton.click();

      const newMessageTextArea = page.locator('[data-test-id="new-message-textarea"]');
      await expect(newMessageTextArea).toHaveAttribute('placeholder', uiElementsText.newAnswerMessagePlaceholder);
      await newMessageTextArea.fill(chatMessages.answear);

      const replyButton = page.locator('button:has-text("Reply")');
      await replyButton.click();
    });
  });
});

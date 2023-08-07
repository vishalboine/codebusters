const { test, expect } = require('@playwright/test');
test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto('https://codebusters.neofinancials.com/login');
    const usernameInput = page.getByPlaceholder('Enter Username');
    const passwordInput = page.getByPlaceholder('Enter password');


    await usernameInput.fill('faisal.s');
    await usernameInput.press('Enter');
    await passwordInput.fill('123456');
    await passwordInput.press('Enter');
    await page.getByRole('button', { name: 'Login' }).click();
});

test('has logged in', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveURL('https://codebusters.neofinancials.com');
});

test('modal open on import click', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await page.getByRole('button', { name: 'Import' }).click();
    // Wait for the modal to open (adjust the selector and wait time if needed)

  // Check if the screen has the text "Import Data"
  const hasImportDataText = await page.textContent('body >> text=Import Data');
  expect(hasImportDataText).toBeTruthy();

  // You can also check if the modal title contains the text "Import Data"
  const modalTitle = await page.textContent('.modalHead >> h4');
  expect(modalTitle).toContain('Import Data');
});

test('download excel on export click', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await page.getByRole('button', { name: 'Export' }).click();
    // Wait for the modal to open (adjust the selector and wait time if needed)

    const downloadPromise = page.waitForEvent('download');
    const download = await downloadPromise;
    await download.saveAs('/path/to/save/download/at.txt');
});

test('check if logout modal opens', async ({page}) => {
    const elementWithAriaLabel = await page.locator(`[aria-label="logout"]`);
    await elementWithAriaLabel.click()

    const modalTitle = await page.textContent('.logoutWrapper >> h5');
  expect(modalTitle).toContain('Are you sure you want to log out?');
})
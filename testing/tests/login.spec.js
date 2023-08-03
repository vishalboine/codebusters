const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto('https://codebusters.neofinancials.com/login');
});

test('has title', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Import Wizard/);
});

test('Username Field', async ({ page }) => {
    const usernameInput = page.getByPlaceholder('Enter Username');

    await usernameInput.fill('faisal.s');
    await usernameInput.press('Enter');

    await expect(page.getByPlaceholder('Enter Username')).toHaveValue('faisal.s')
});
test('Password Field', async ({ page }) => {
    const passwordInput = page.getByPlaceholder('Enter password');

    await passwordInput.fill('123456');
    await passwordInput.press('Enter');

    // Expect a title "to contain" a substring.
    await expect(page.getByPlaceholder('Enter Password')).toHaveValue('123456')
});
test('Redirect after login', async ({ page }) => {
    const usernameInput = page.getByPlaceholder('Enter Username');
    const passwordInput = page.getByPlaceholder('Enter password');


    await usernameInput.fill('faisal.s');
    await usernameInput.press('Enter');
    await passwordInput.fill('123456');
    await passwordInput.press('Enter');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL('https://codebusters.neofinancials.com');
});
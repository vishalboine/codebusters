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

test('check if all tabs clickable', async ({page}) => {
    await page.waitForURL('https://codebusters.neofinancials.com')
    await page.getByRole('link').nth(3).click()

    await expect(page.getByRole('heading', { name: 'Add Table' })).toBeVisible();
    
    const btn = page.getByText('Update Table')
    await btn.click()
    await expect(page.getByRole('heading', { name: 'Update Table' })).toBeVisible();
    const btn2 = page.getByText('Column Validation')
    await btn2.click()
    await expect(page.getByRole('heading', { name: 'Column Validation' })).toBeVisible();
})
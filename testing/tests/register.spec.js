const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto('https://codebusters.neofinancials.com/register');
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
test('Confirm Password Field', async ({ page }) => {
    const passwordInput = page.getByPlaceholder('Confirm password');

    await passwordInput.fill('123456');
    await passwordInput.press('Enter');

    // Expect a title "to contain" a substring.
    await expect(page.getByPlaceholder('Confirm Password')).toHaveValue('123456')
});
test('Password and Confirm Password Field', async ({ page }) => {
    const passwordInput = page.getByPlaceholder('Enter password');
    const cpasswordInput = page.getByPlaceholder('Confirm password');
    // Enter values into the password and confirm password fields
    const passwordValue = '123456';
    const confirmPasswordValue = '123456';
    await passwordInput.type(passwordValue);
    await cpasswordInput.type(confirmPasswordValue);

    // Get the values of the inputs
    const enteredPassword = await passwordInput.inputValue();
    const enteredConfirmPassword = await cpasswordInput.inputValue();

    // Check if the entered values are the same
    expect(enteredPassword).toEqual(enteredConfirmPassword);
});

test('Redirect after register', async ({ page }) => {
    const usernameInput = page.getByPlaceholder('Enter Username');
    const passwordInput = page.getByPlaceholder('Enter password');
    const cpasswordInput = page.getByPlaceholder('Confirm password');

    await usernameInput.fill('demo');
    await usernameInput.press('Enter');
    await passwordInput.fill('123456');
    await passwordInput.press('Enter');
    await cpasswordInput.fill('123456');
    await cpasswordInput.press('Enter');
    await page.getByRole('button', { name: 'Register' }).click();

    await expect(page).toHaveURL('https://codebusters.neofinancials.com/login');
});
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

    await passwordInput.fill('New12345@');
    await passwordInput.press('Enter');

    // Expect a title "to contain" a substring.
    await expect(page.getByPlaceholder('Enter Password')).toHaveValue('New12345@')
});
test('Confirm Password Field', async ({ page }) => {
    const passwordInput = page.getByPlaceholder('Confirm password');

    await passwordInput.fill('New12345@');
    await passwordInput.press('Enter');

    // Expect a title "to contain" a substring.
    await expect(page.getByPlaceholder('Confirm Password')).toHaveValue('New12345@')
});
test('Password and Confirm Password Field', async ({ page }) => {
    const passwordInput = page.getByPlaceholder('Enter password');
    const cpasswordInput = page.getByPlaceholder('Confirm password');
    // Enter values into the password and confirm password fields
    const passwordValue = 'New12345@';
    const confirmPasswordValue = 'New12345@';
    await passwordInput.type(passwordValue);
    await cpasswordInput.type(confirmPasswordValue);

    // Get the values of the inputs
    const enteredPassword = await passwordInput.inputValue();
    const enteredConfirmPassword = await cpasswordInput.inputValue();

    // Check if the entered values are the same
    expect(enteredPassword).toEqual(enteredConfirmPassword);
});

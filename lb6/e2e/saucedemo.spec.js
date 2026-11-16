import { test, expect } from '@playwright/test';

test('TC-01: Успішна авторизація', async ({ page }) => {
    // Відкриваємо сторінку
    await page.goto('/');

    // Вводимо логін
    await page.getByTestId('username')
        .fill('standard_user');

    // Вводимо пароль
    await page.getByTestId('password')
        .fill('secret_sauce');

    // Натискаємо Login
    await page.getByTestId('login-button')
        .click();

    // Перевіряємо результат
    await expect(page)
        .toHaveURL(/inventory\.html/);

    await expect(
        page.getByText('Products', { exact: true })
    ).toBeVisible();
});

test('TC-02: Авторизація з неправильним паролем', async ({ page }) => {
    // Відкриваємо сторінку
    await page.goto('/');

    // Вводимо логін
    await page.getByTestId('username')
        .fill('standard_user');

    // Вводимо неправильний пароль
    await page.getByTestId('password')
        .fill('wrong_password');

    // Натискаємо Login
    await page.getByTestId('login-button')
        .click();

    // Перевіряємо повідомлення про помилку
    const errorMessage = page.getByTestId('error');

    await expect(errorMessage).toBeVisible();

    await expect(errorMessage)
        .toContainText('Username and password do not match');
});

test('TC-03: Додавання товару до кошика', async ({ page }) => {
    // Відкриваємо сторінку
    await page.goto('/');

    // Авторизуємось
    await page.getByTestId('username')
        .fill('standard_user');

    await page.getByTestId('password')
        .fill('secret_sauce');

    await page.getByTestId('login-button')
        .click();

    await expect(page)
        .toHaveURL(/inventory\.html/);

    // Додаємо товар до кошика
    await page
        .getByTestId('add-to-cart-sauce-labs-bolt-t-shirt')
        .click();

    // Перевіряємо кількість на індикаторі кошика
    await expect(page.locator('.shopping_cart_badge'))
        .toHaveText('1');

    // Переходимо до кошика
    await page.locator('.shopping_cart_link')
        .click();

    await expect(page)
        .toHaveURL(/cart\.html/);

    // Перевіряємо назву товару в кошику
    await expect(
        page.getByText('Sauce Labs Bolt T-Shirt', { exact: true })
    ).toBeVisible();
});

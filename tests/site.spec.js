import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.route("https://yandex.ru/**", (route) => route.abort());
  await page.route("https://fonts.googleapis.com/**", (route) => route.abort());
  await page.goto("./");
});
test("catalog, prices and selected order", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const [name, count] of [
    ["грибные", 2],
    ["мясные", 4],
    ["сырные", 3],
    ["все", 9],
  ]) {
    await page.getByRole("button", { name, exact: true }).click();
    await expect(page.locator(".catalog__item:visible")).toHaveCount(count);
  }
  const product = page.locator(".product").nth(5);
  await product.getByRole("button", { name: "25см" }).click();
  await expect(product.locator(".product__price-value")).toHaveText("950");
  await product.getByRole("button", { name: "заказать" }).click();
  await expect(page.locator(".modal__name-title")).toHaveText("Ассорти");
  await expect(page.locator(".modal__name-price")).toHaveText("950");
  await expect(page.locator(".modal__text")).toHaveText("25см");
  await page.keyboard.press("Escape");
  await expect(product.getByRole("button", { name: "заказать" })).toBeFocused();
  await page.locator(".product__btn").first().click();
  await expect(page.locator(".modal__name-title")).toHaveText("Салями");
  expect(errors).toEqual([]);
});
test("validation and demo submission without network", async ({ page }) => {
  await page.locator(".product__btn").first().click();
  await page.getByRole("button", { name: "Оформить демозаказ" }).click();
  await expect(page.locator('[aria-invalid="true"]')).toHaveCount(4);
  await page.getByLabel("Имя", { exact: true }).fill("   ");
  await page.getByLabel("Телефон", { exact: true }).fill("123");
  await page.getByLabel("E-mail", { exact: true }).fill("wrong");
  await page.getByRole("button", { name: "Оформить демозаказ" }).click();
  await expect(page.locator('[aria-invalid="true"]')).toHaveCount(4);
  await page.getByLabel("Имя", { exact: true }).fill("Иван");
  await page.getByLabel("Телефон", { exact: true }).fill("8 (999) 123-45-67");
  await expect(page.getByLabel("Телефон", { exact: true })).toHaveValue(
    "+79991234567",
  );
  await page.getByLabel("E-mail", { exact: true }).fill("ivan@example.com");
  await page.getByLabel("Способ оплаты").selectOption("cash");
  const requests = [];
  page.on("request", (r) => requests.push(r.url()));
  await page.getByRole("button", { name: "Оформить демозаказ" }).click();
  await expect(page.getByRole("status")).toHaveText(
    "Демонстрационный заказ оформлен. Данные не отправлены.",
  );
  expect(requests).toEqual([]);
});
for (const width of [320, 375, 768, 1440])
  test(`layout ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    if (width < 851) {
      const menu = page.locator(".header__burger");
      await menu.click();
      await expect(menu).toHaveAttribute("aria-expanded", "true");
      await page.keyboard.press("Escape");
      await expect(menu).toHaveAttribute("aria-expanded", "false");
      await menu.click();
      await page.locator(".header__link").first().click();
      await expect(menu).toHaveAttribute("aria-expanded", "false");
    }
    await page.locator(".product__btn").first().click();
    await expect(page.getByRole("dialog")).toBeVisible();
    const bounds = await page.getByRole("dialog").boundingBox();
    expect(bounds.x).toBeGreaterThanOrEqual(0);
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(width);
    await page.screenshot({
      path: `test-results/layout-${width}-${test.info().project.name}.png`,
      fullPage: true,
    });
  });

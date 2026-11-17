import { chromium } from "playwright";
import assert from "node:assert/strict";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  permissions: ["clipboard-read", "clipboard-write"],
});
const page = await context.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
const root = "http://127.0.0.1:5173";
try {
  await page.goto(root);
  await page
    .getByRole("heading", { name: "Seu próximo projeto começa aqui." })
    .waitFor();
  assert.equal(await page.locator(".component-card").count(), 22);
  for (const card of await page.locator(".component-card").all()) {
    if (!(await card.locator('a[href="/componente/selecao-deslizante"],a[href="/componente/elevacao-liquida"],a[href="/componente/icone-flutuante"],a[href="/componente/preenchimento-animado"],a[href="/componente/rotulo-expansivel"],a[href="/componente/bolha-flutuante"]').count())) continue;
    if (!(await card.locator('a[href="/componente/selecao-deslizante"],a[href="/componente/elevacao-liquida"],a[href="/componente/icone-flutuante"],a[href="/componente/preenchimento-animado"],a[href="/componente/rotulo-expansivel"],a[href="/componente/bolha-flutuante"]').count())) continue;
    await card.scrollIntoViewIfNeeded();
    const preview = card.frameLocator("iframe");
    await preview.getByRole("button", { name: "Perfil", exact: true }).click();
    assert.equal(
      await preview
        .getByRole("button", { name: "Perfil", exact: true })
        .getAttribute("aria-current"),
      "page",
    );
    assert.ok(
      await preview
        .locator(".menu")
        .evaluate((el) => el.getBoundingClientRect().right <= innerWidth),
    );
  }
  await page
    .getByRole("textbox", { name: "Pesquisar no catálogo", exact: true })
    .fill("SELECAO DESLIZANTE");
  assert.equal(await page.locator(".component-card").count(), 1);
  await page.getByRole("button", { name: "Limpar busca" }).click();
  await page
    .getByRole("button", { name: "Favoritar Seleção deslizante", exact: true })
    .click();
  await page.reload();
  await page.goto(root + "/favoritos");
  assert.equal(await page.locator(".component-card").count(), 1);
  await page.getByRole("button", { name: "Ativar tema claro" }).click();
  await page.reload();
  assert.equal(await page.locator("html").getAttribute("data-theme"), "light");
  const ids = [
    "selecao-deslizante",
    "elevacao-liquida",
    "icone-flutuante",
    "preenchimento-animado",
    "rotulo-expansivel",
    "bolha-flutuante",
  ];
  for (const id of ids) {
    await page.goto(root + "/componente/" + id);
    const frame = page.frameLocator(".live-preview iframe");
    await frame.getByRole("button", { name: "Explorar", exact: true }).click();
    assert.equal(
      await frame
        .getByRole("button", { name: "Explorar", exact: true })
        .getAttribute("aria-current"),
      "page",
    );
    await frame
      .getByRole("button", { name: "Explorar", exact: true })
      .press("ArrowRight");
    assert.equal(
      await frame
        .getByRole("button", { name: "Favoritos", exact: true })
        .getAttribute("aria-current"),
      "page",
    );
    await page.getByRole("slider", { name: "Quantidade de itens" }).focus();
    await page
      .getByRole("slider", { name: "Quantidade de itens" })
      .press("Home");
    await page.waitForTimeout(200);
    assert.equal(await frame.locator(".item").count(), 3);
    await page
      .getByRole("button", { name: "Copiar código", exact: true })
      .click();
    await page
      .getByRole("status")
      .filter({ hasText: "Código copiado com sucesso." })
      .waitFor();
    const copied = await page.evaluate(() => navigator.clipboard.readText());
    assert.ok(copied.includes("<!doctype html>"));
    assert.equal((copied.match(/<button /g) || []).length, 3);
    await page.getByRole("button", { name: "Restaurar padrão" }).click();
    await frame.locator(".item").nth(4).waitFor();
    assert.equal(await frame.locator(".item").count(), 5);
  }
  for (const category of [
    "menus-laterais",
    "menus-inferiores",
    "botoes-animados",
    "cartoes-interativos",
    "carregamentos",
    "formularios-e-campos",
    "transicoes-de-paginas",
    "alertas-e-notificacoes",
  ]) {
    await page.goto(root + "/categoria/" + category);
    assert.equal(
      await page.locator(".component-card").count(),
      ({"menus-inferiores":6,"carregamentos":4,"botoes-animados":1,"alertas-e-notificacoes":2}[category] || 0),
    );
  }
  await page.goto(root + "/configuracoes");
  await page
    .getByRole("heading", { name: "Configurações", exact: true })
    .waitFor();
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(root);
  assert.ok(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  );
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await page.locator(".sidebar.open").waitFor();
  await page.getByRole("button", { name: "Fechar menu", exact: true }).click();
  for (const card of await page.locator(".component-card").all()) {
    if (!(await card.locator('a[href="/componente/selecao-deslizante"],a[href="/componente/elevacao-liquida"],a[href="/componente/icone-flutuante"],a[href="/componente/preenchimento-animado"],a[href="/componente/rotulo-expansivel"],a[href="/componente/bolha-flutuante"]').count())) continue;
    await card.scrollIntoViewIfNeeded();
    await card
      .frameLocator("iframe")
      .getByRole("button", { name: "Perfil", exact: true })
      .waitFor();
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: "tests/mobile.png", fullPage: true });
  await page.goto(root + "/componente/selecao-deslizante");
  await page.locator(".live-preview iframe").waitFor();
  assert.ok(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  );
  assert.ok(
    await page
      .frameLocator(".live-preview iframe")
      .locator(".menu")
      .evaluate((el) => el.getBoundingClientRect().right <= innerWidth),
  );
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(root);
  await page.getByRole("button", { name: "Ativar tema escuro" }).click();
  for (const card of await page.locator(".component-card").all()) {
    if (!(await card.locator('a[href="/componente/selecao-deslizante"],a[href="/componente/elevacao-liquida"],a[href="/componente/icone-flutuante"],a[href="/componente/preenchimento-animado"],a[href="/componente/rotulo-expansivel"],a[href="/componente/bolha-flutuante"]').count())) continue;
    await card.scrollIntoViewIfNeeded();
    await card
      .frameLocator("iframe")
      .getByRole("button", { name: "Perfil", exact: true })
      .waitFor();
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: "tests/desktop.png", fullPage: true });
  assert.deepEqual(errors, []);
  console.log(
    "Navegador: rotas, menus, teclado, personalização, cópia, tema, favoritos e mobile aprovados.",
  );
} catch (error) {
  console.error("Erros da página:", errors);
  console.error("Conteúdo:", await page.locator("body").innerText());
  await page.screenshot({ path: "tests/failure.png", fullPage: true });
  throw error;
} finally {
  await browser.close();
}

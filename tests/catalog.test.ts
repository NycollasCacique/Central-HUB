import { describe, it, expect } from "vitest";
import {
  catalog,
  categories,
  defaults,
  filterCatalog,
} from "../src/registry/catalog";
import { generate } from "../src/utils/generate";
describe("Registro e filtros", () => {
  it("tem seis identificadores únicos e categorias válidas", () => {
    expect(catalog).toHaveLength(22);
    expect(new Set(catalog.map((e) => e.id)).size).toBe(22);
    catalog.forEach((e) =>
      expect(categories.some((c) => c[0] === e.category)).toBe(true),
    );
  });
  it("busca sem acentos e caixa, por nome, descrição e tags", () => {
    expect(
      filterCatalog(catalog, "SELECAO").some(
        (e) => e.id === "selecao-deslizante",
      ),
    ).toBe(true);
    expect(filterCatalog(catalog, "organico")[0].id).toBe("elevacao-liquida");
    expect(filterCatalog(catalog, "contexto")[0].id).toBe("rotulo-expansivel");
  });
  it("combina favoritos e tecnologia sem inventar resultados", () => {
    expect(filterCatalog(catalog, "", "CSS", ["bolha-flutuante"])).toHaveLength(
      1,
    );
    expect(filterCatalog(catalog, "", "Vue")).toHaveLength(0);
    expect(filterCatalog(catalog, "", "", [])).toHaveLength(0);
  });
  it("ordena por data e alfabeticamente", () => {
    expect(filterCatalog(catalog.slice(0,6), "")[0].id).toBe("bolha-flutuante");
    expect(filterCatalog(catalog.slice(0,6), "", "", undefined, "alpha")[0].id).toBe(
      "bolha-flutuante",
    );
  });
});
describe("Código exportável", () => {
  for (const entry of catalog.slice(0,6))
    it(`gera documento autônomo para ${entry.name}`, () => {
      const files = generate(entry.variant, {
        ...defaults,
        primary: "#123456",
        count: 3,
        width: 320,
        speed: 600,
      });
      expect(files.HTML.match(/<button /g)).toHaveLength(3);
      expect(files.CSS).toContain("--primary: #123456");
      expect(files.CSS).toContain("width: 320px");
      expect(files.CSS).toContain("--speed: 600ms");
      expect(files["Código completo"]).toContain(files.HTML);
      expect(files["Código completo"]).toContain(files.CSS);
      expect(files["Código completo"]).toContain(files.JavaScript);
      expect(files.JavaScript).toContain("ArrowRight");
      expect(files["React + TypeScript"]).toContain(
        "export default function Menu",
      );
      expect(files.CSS).toContain("prefers-reduced-motion");
    });
});

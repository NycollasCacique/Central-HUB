import { useState } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import { Copy, Check, Download } from "lucide-react";
import { generate } from "../utils/generate";
import type { Settings, Variant } from "../registry/catalog";
export function CodePanel({
  variant,
  settings,
}: {
  variant: Variant;
  settings: Settings;
}) {
  const files = generate(variant, settings);
  const [tab, setTab] = useState<keyof typeof files>("Código completo");
  const [status, setStatus] = useState("");
  const code = files[tab];
  const language =
    tab === "CSS"
      ? "css"
      : tab === "JavaScript"
        ? "javascript"
        : tab === "React + TypeScript"
          ? "tsx"
          : "markup";
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setStatus("Código copiado com sucesso.");
    } catch {
      setStatus(
        "Não foi possível copiar. Selecione o código ou baixe o arquivo.",
      );
    }
  }
  function download() {
    const url = URL.createObjectURL(
      new Blob([code], { type: "text/plain;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download =
      tab === "React + TypeScript"
        ? "Menu.tsx"
        : tab === "CSS"
          ? "menu.css"
          : tab === "JavaScript"
            ? "menu.js"
            : "menu.html";
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <section className="code-panel">
      <div className="section-heading">
        <div>
          <h2>Código pronto para usar</h2>
          <p>Personalizado e independente da biblioteca.</p>
        </div>
        <div className="actions">
          <button onClick={download} aria-label="Baixar código">
            <Download size={16} />
          </button>
          <button className="button" onClick={copy}>
            {status.startsWith("Código") ? (
              <Check size={15} />
            ) : (
              <Copy size={15} />
            )}{" "}
            Copiar código
          </button>
        </div>
      </div>
      <div
        className="code-tabs"
        role="tablist"
        aria-label="Linguagem do código"
      >
        {Object.keys(files).map((t) => (
          <button
            role="tab"
            aria-selected={tab === t}
            key={t}
            className={tab === t ? "active" : ""}
            onClick={() => {
              setTab(t as keyof typeof files);
              setStatus("");
            }}
          >
            {t}
          </button>
        ))}
      </div>
      <p className="copy-status" role="status">
        {status ||
          (tab === "React + TypeScript"
            ? "Componente TSX com iframe isolado. Requer apenas React; instruções incluídas no arquivo."
            : "HTML completo funciona sozinho. Nas abas separadas, use CSS e JavaScript junto ao HTML.")}
      </p>
      <pre tabIndex={0} aria-label={`Código ${tab}`}>
        <code
          dangerouslySetInnerHTML={{
            __html: Prism.highlight(code, Prism.languages[language], language),
          }}
        />
      </pre>
    </section>
  );
}

import type { Settings, Variant } from "../registry/catalog";
import { animations } from '../modules/animations';
import { generateAnimation } from '../modules/animations/generate';
const paths = [
  "M3 10 12 3l9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z",
  "M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0",
  "M12 21S2 15 2 8a5 5 0 0 1 10-2A5 5 0 0 1 22 8c0 7-10 13-10 13",
  "M4 4h16v13H8l-4 4ZM8 8h8M8 12h5",
  "M20 21v-2a7 7 0 0 0-14 0v2M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
];
const labels = ["Início", "Explorar", "Favoritos", "Mensagens", "Perfil"];
export function generate(variant: Variant, s: Settings): Record<string,string> {
  if (animations.some(m=>m.id===variant)) return generateAnimation(variant,s);
  const html = `<nav class="menu ${variant}" aria-label="Navegação principal"><span class="indicator" aria-hidden="true"></span>${labels
    .slice(0, s.count)
    .map(
      (label, i) =>
        `<button type="button" class="item${i === 0 ? " active" : ""}" aria-label="${label}" aria-current="${i === 0 ? "page" : "false"}"><span class="icon"><svg width="${s.iconSize}" height="${s.iconSize}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[i]}"/></svg></span><span class="label">${label}</span></button>`,
    )
    .join("")}</nav>`;
  const css = `* { box-sizing: border-box; }
html { background: #191c1e; color-scheme: dark; }
body { margin: 0; min-height: 100vh; display: grid; grid-template-columns: minmax(0, 1fr); place-items: center; padding: 32px 12px; background: transparent; font-family: system-ui, sans-serif; }
.menu { --primary: ${s.primary}; --secondary: ${s.secondary}; --icons: ${s.icons}; --speed: ${s.speed}ms; --lift: ${s.intensity}px; position: relative; isolation: isolate; display: flex; align-items: center; width: ${s.width}px; max-width: 100%; height: 72px; padding: 8px; border-radius: ${s.radius}px; background: ${s.background}; box-shadow: 0 12px 30px #0002; }
.item { position: relative; flex: 1; min-width: 0; height: 56px; border: 0; background: transparent; color: var(--icons); cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; border-radius: ${Math.max(0, s.radius - 7)}px; transition: flex var(--speed), color var(--speed); -webkit-tap-highlight-color: transparent; }
.item:focus-visible { outline: 2px solid var(--primary); outline-offset: 3px; }
.icon { position: relative; display: grid; place-items: center; width: 44px; height: 44px; flex-shrink: 0; border-radius: 50%; transition: transform var(--speed), background var(--speed), color var(--speed); }
.active { color: var(--primary); }
.label { display: none; font-size: 12px; white-space: nowrap; }
.indicator { position: absolute; z-index: -1; left: 8px; width: calc((100% - 16px) / ${s.count}); height: 52px; border-radius: ${Math.max(0, s.radius - 7)}px; background: var(--primary); transition: transform var(--speed) cubic-bezier(.22,.8,.25,1); }
.slide .active { color: var(--secondary); }
.slide .active .icon { transform: translateY(calc(var(--lift) * -.18)); }
.liquid .indicator { top: -10px; height: 72px; border-radius: 50% 50% 36% 36%; background: ${s.background}; box-shadow: 0 -4px 0 var(--secondary); }
.liquid .active .icon { transform: translateY(calc(var(--lift) * -1)); background: var(--primary); color: var(--secondary); }
.float .indicator, .fill .indicator, .expand .indicator { display: none; }
.float .active .icon { transform: translateY(calc(var(--lift) * -1)); background: var(--primary); color: var(--secondary); box-shadow: 0 0 0 6px var(--secondary); }
.fill .icon:before { content: ''; position: absolute; inset: 0; border-radius: 50%; background: var(--primary); transform: scale(0); transition: transform var(--speed); z-index: -1; }
.fill .icon { isolation: isolate; }
.fill .active .icon:before { transform: scale(1); }
.fill .active { color: var(--secondary); }
.expand .active { flex: 2.5; background: var(--primary); color: var(--secondary); }
.expand .label { display: block; max-width: 0; opacity: 0; overflow: hidden; transition: max-width var(--speed), opacity var(--speed); }
.expand .active .label { max-width: 95px; opacity: 1; }
.expand .icon { width: ${s.iconSize + 8}px; }
.bubble .indicator { top: 10px; height: 48px; border-radius: 50%; background: var(--secondary); transition-timing-function: cubic-bezier(.34,1.4,.64,1); }
.bubble .active .icon { transform: translateY(calc(var(--lift) * -.4)); }
@media (prefers-reduced-motion: reduce) { *, *:before { transition: none !important; animation: none !important; } }`;
  const js = `const menu = document.querySelector('.menu');
const items = [...menu.querySelectorAll('.item')];
function select(index) {
  items.forEach((item, i) => {
    item.classList.toggle('active', i === index);
    item.setAttribute('aria-current', i === index ? 'page' : 'false');
  });
  menu.querySelector('.indicator').style.transform = 'translateX(' + (index * 100) + '%)';
}
items.forEach((item, index) => {
  item.addEventListener('click', () => select(index));
  item.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % items.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + items.length) % items.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = items.length - 1;
    if (next !== undefined) { event.preventDefault(); select(next); items[next].focus(); }
  });
});`;
  const full = `<!doctype html>\n<html lang="pt-BR">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>Menu interativo</title>\n<style>\n${css}\n</style>\n</head>\n<body>\n${html}\n<script>\n${js}\n</script>\n</body>\n</html>`;
  const tsx = `// Menu.tsx — requer react e @types/react. Sem dependências de ícones.\n// Uso: import Menu from './Menu'; <Menu />\n// O documento isolado inclui todos os estilos e eventos; não requer CSS externo.\nimport type { CSSProperties } from 'react';\nconst document = ${JSON.stringify(full)};\nexport default function Menu({ style }: { style?: CSSProperties }) {\n  return <iframe title="Menu interativo" sandbox="allow-scripts" srcDoc={document}\n    style={{ width: '100%', height: 160, border: 0, ...style }} />;\n}\n`;
  return {
    HTML: html,
    CSS: css,
    JavaScript: js,
    "Código completo": full,
    "React + TypeScript": tsx,
  };
}

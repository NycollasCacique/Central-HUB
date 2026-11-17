import type { AnimationModule } from './types';
export default {
  "id": "progresso-circular",
  "name": "Progresso circular",
  "category": "indicadores-e-numeros",
  "description": "Percentual SVG acessível com atualização dinâmica sem reinício.",
  "tags": [
    "Progresso circular",
    "Percentual",
    "SVG",
    "acessível",
    "com"
  ],
  "html": "<div class=\"progress\" role=\"progressbar\" aria-label=\"Progresso\" aria-valuenow=\"{{value}}\" aria-valuemin=\"0\" aria-valuemax=\"100\"><svg viewBox=\"0 0 100 100\" aria-hidden=\"true\"><circle cx=\"50\" cy=\"50\" r=\"42\"/><circle class=\"front\" cx=\"50\" cy=\"50\" r=\"42\" pathLength=\"100\"/></svg><output>{{value}}%</output></div><label>Valor <input data-value type=\"range\" min=\"0\" max=\"100\" value=\"{{value}}\"></label>",
  "css": ".progress{position:relative;width:var(--size);height:var(--size);display:grid;place-items:center}.progress svg{width:100%;height:100%;transform:rotate(-90deg)}.progress circle{fill:none;stroke:var(--secondary);stroke-width:var(--thickness)}.progress .front{stroke:var(--primary);stroke-dasharray:100;stroke-dashoffset:100;transition:stroke-dashoffset var(--speed) ease}.progress output{position:absolute;font-weight:700}",
  "js": "const ring=root.querySelector('.front'), bar=root.querySelector('[role=progressbar]');const update=v=>{v=Math.max(0,Math.min(100,Number(v)));bar.setAttribute('aria-valuenow',v);root.querySelector('output').textContent=v+'%';ring.style.strokeDashoffset=100-v;};root.querySelector('[data-value]').oninput=e=>update(e.target.value);requestAnimationFrame(()=>requestAnimationFrame(()=>update({{value}})));root.updateValue=update;",
  "controls": [
    "size",
    "thickness",
    "speed",
    "value"
  ]
} satisfies AnimationModule;

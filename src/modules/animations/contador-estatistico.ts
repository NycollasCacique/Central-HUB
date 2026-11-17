import type { AnimationModule } from './types';
export default {
  "id": "contador-estatistico",
  "name": "Contador estatístico",
  "category": "indicadores-e-numeros",
  "description": "Interpolação numérica temporal com formatação pt-BR.",
  "tags": [
    "Contador estatístico",
    "Interpolação",
    "numérica",
    "temporal",
    "com"
  ],
  "html": "<div class=\"counter\"><output aria-label=\"Valor final: {{end}}\">{{start}}</output><span>{{text}}</span></div><button type=\"button\" data-replay>Reproduzir animação</button>",
  "css": ".counter{display:flex;flex-direction:column;align-items:center;gap:8px}.counter output{font-size:var(--fontSize);font-weight:700;font-variant-numeric:tabular-nums;color:var(--primary)}",
  "js": "let frame=0,last='';const output=root.querySelector('output'),motion=matchMedia('(prefers-reduced-motion: reduce)'),format=new Intl.NumberFormat('pt-BR',{maximumFractionDigits:2});function render(v){const text=format.format(v);if(last!==text){output.textContent=text;last=text;}}function play(){cancelAnimationFrame(frame);if(motion.matches){render({{end}});return;}const began=performance.now();function tick(now){const p=Math.min(1,(now-began)/{{speed}});render({{start}}+({{end}}-{{start}})*p);if(p<1)frame=requestAnimationFrame(tick);}frame=requestAnimationFrame(tick);}root.querySelector('[data-replay]').onclick=play;motion.addEventListener('change',play);window.addEventListener('pagehide',()=>cancelAnimationFrame(frame));play();",
  "controls": [
    "start",
    "end",
    "speed",
    "text",
    "fontSize"
  ]
} satisfies AnimationModule;

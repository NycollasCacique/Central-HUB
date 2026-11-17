import type { AnimationModule } from './types';
export default {
  "id": "entrada-com-foco",
  "name": "Entrada com foco",
  "category": "entradas-e-revelacoes",
  "description": "Cartão com entrada por desfoque; use em poucos elementos.",
  "tags": [
    "Entrada com foco",
    "Cartão",
    "com",
    "entrada",
    "por"
  ],
  "html": "<div data-effect class=\"focus\">{{text}}</div><button type=\"button\" data-replay>Reproduzir animação</button>",
  "css": ".focus{padding:28px;max-width:100%;border-radius:var(--radius);background:linear-gradient(135deg,var(--primary),var(--secondary));color:var(--background);animation:hub-focus var(--speed) ease-out both}@keyframes hub-focus{from{opacity:0;filter:blur(var(--intensity));transform:scale(var(--scale))}to{opacity:1;filter:blur(0);transform:scale(1)}}",
  "js": "root.querySelector('[data-replay]').onclick=()=>{const el=root.querySelector('[data-effect]');el.getAnimations({subtree:true}).forEach(a=>{a.cancel();a.play()});};",
  "controls": [
    "speed",
    "intensity",
    "text",
    "scale"
  ]
} satisfies AnimationModule;

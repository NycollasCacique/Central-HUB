import type { AnimationModule } from './types';
export default {
  "id": "confirmacao-desenhada",
  "name": "Confirmação desenhada",
  "category": "alertas-e-notificacoes",
  "description": "Círculo e símbolo desenhados em sequência com geometria normalizada.",
  "tags": [
    "Confirmação desenhada",
    "Círculo",
    "e",
    "símbolo",
    "desenhados"
  ],
  "html": "<svg data-effect class=\"check\" viewBox=\"0 0 64 64\" role=\"img\" aria-label=\"Confirmado\"><circle cx=\"32\" cy=\"32\" r=\"26\" pathLength=\"100\"/><path d=\"M19 32l9 9 17-19\" pathLength=\"100\"/></svg><button type=\"button\" data-replay>Reproduzir animação</button>",
  "css": ".check{width:var(--size);height:var(--size);fill:none;stroke:var(--primary);stroke-width:3;stroke-linecap:round;stroke-linejoin:round}.check>*{stroke-dasharray:100;stroke-dashoffset:100;animation:hub-check var(--speed) ease forwards}.check path{animation-delay:var(--speed)}@keyframes hub-check{to{stroke-dashoffset:0}}",
  "js": "root.querySelector('[data-replay]').onclick=()=>{const el=root.querySelector('[data-effect]');el.getAnimations({subtree:true}).forEach(a=>{a.cancel();a.play()});};",
  "controls": [
    "size",
    "speed"
  ]
} satisfies AnimationModule;

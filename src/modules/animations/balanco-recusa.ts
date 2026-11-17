import type { AnimationModule } from './types';
export default {
  "id": "balanco-recusa",
  "name": "Balanço de recusa",
  "category": "alertas-e-notificacoes",
  "description": "Aviso com balanço discreto e reprodução manual.",
  "tags": [
    "Balanço de recusa",
    "Aviso",
    "com",
    "balanço",
    "discreto"
  ],
  "html": "<div data-effect class=\"refusal\" role=\"status\">{{text}}</div><button type=\"button\" data-replay>Reproduzir animação</button>",
  "css": ".refusal{padding:16px;border:2px solid var(--primary);border-radius:var(--radius);animation:hub-refusal var(--speed) ease-in-out both}@keyframes hub-refusal{0%,100%{transform:translateX(0)}20%{transform:translateX(calc(var(--intensity)*-1))}40%{transform:translateX(calc(var(--intensity)*.8))}60%{transform:translateX(calc(var(--intensity)*-.5))}80%{transform:translateX(calc(var(--intensity)*.3))}}",
  "js": "root.querySelector('[data-replay]').onclick=()=>{const el=root.querySelector('[data-effect]');el.getAnimations({subtree:true}).forEach(a=>{a.cancel();a.play()});};",
  "controls": [
    "text",
    "speed",
    "intensity"
  ]
} satisfies AnimationModule;

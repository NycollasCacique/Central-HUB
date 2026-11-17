import type { AnimationModule } from './types';
export default {
  "id": "revelacao-cortina",
  "name": "Revelação por cortina",
  "category": "entradas-e-revelacoes",
  "description": "Revelação por recorte em quatro direções.",
  "tags": [
    "Revelação por cortina",
    "Revelação",
    "por",
    "recorte",
    "em"
  ],
  "html": "<div data-effect class=\"curtain\">{{text}}</div><button type=\"button\" data-replay>Reproduzir animação</button>",
  "css": ".curtain{padding:20px;max-width:100%;border:2px solid var(--primary);border-radius:var(--radius);animation:hub-curtain var(--speed) ease both}@keyframes hub-curtain{from{clip-path:inset({{inset}})}to{clip-path:inset(0 0 0 0)}}",
  "js": "root.querySelector('[data-replay]').onclick=()=>{const el=root.querySelector('[data-effect]');el.getAnimations({subtree:true}).forEach(a=>{a.cancel();a.play()});};",
  "controls": [
    "speed",
    "direction",
    "text"
  ]
} satisfies AnimationModule;

import type { AnimationModule } from './types';
export default {
  "id": "pontos-saltitantes",
  "name": "Pontos saltitantes",
  "category": "carregamentos",
  "description": "Três pontos com saltos sequenciais e atrasos negativos.",
  "tags": [
    "Pontos saltitantes",
    "Três",
    "pontos",
    "com",
    "saltos"
  ],
  "html": "<div class=\"dots\" role=\"status\" aria-label=\"Carregando\"><span></span><span></span><span></span></div>",
  "css": ".dots{display:flex;gap:var(--gap)}.dots span{width:var(--size);height:var(--size);border-radius:50%;background:var(--primary);animation:hub-pontos var(--speed) ease-in-out infinite}.dots span:nth-child(2){animation-delay:calc(var(--speed)*-.66);background:var(--secondary)}.dots span:nth-child(3){animation-delay:calc(var(--speed)*-.33)}@keyframes hub-pontos{0%,60%,100%{transform:translateY(0);opacity:.45}30%{transform:translateY(calc(var(--intensity)*-1));opacity:1}}",
  "js": "",
  "controls": [
    "speed",
    "size",
    "gap",
    "intensity"
  ]
} satisfies AnimationModule;

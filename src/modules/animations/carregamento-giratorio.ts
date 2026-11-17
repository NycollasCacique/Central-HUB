import type { AnimationModule } from './types';
export default {
  "id": "carregamento-giratorio",
  "name": "Carregamento giratório",
  "category": "carregamentos",
  "description": "Rotação linear de um anel com borda destacada.",
  "tags": [
    "Carregamento giratório",
    "Rotação",
    "linear",
    "de",
    "um"
  ],
  "html": "<div class=\"spinner\" role=\"status\" aria-label=\"Carregando\"></div>",
  "css": ".spinner{width:var(--size);height:var(--size);border:var(--thickness) solid var(--secondary);border-top-color:var(--primary);border-radius:50%;animation:hub-giro var(--speed) linear infinite}@keyframes hub-giro{to{transform:rotate(360deg)}}",
  "js": "",
  "controls": [
    "size",
    "thickness",
    "speed"
  ]
} satisfies AnimationModule;

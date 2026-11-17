import type { AnimationModule } from './types';
export default {
  "id": "barra-deslizante",
  "name": "Barra deslizante",
  "category": "carregamentos",
  "description": "Indicador que percorre todo o trilho usando transform.",
  "tags": [
    "Barra deslizante",
    "Indicador",
    "que",
    "percorre",
    "todo"
  ],
  "html": "<div class=\"track\" role=\"status\" aria-label=\"Carregando\"><span></span></div>",
  "css": ".track{width:var(--width);max-width:100%;height:var(--height);border-radius:999px;overflow:hidden;background:var(--secondary)}.track span{display:block;width:40%;height:100%;border-radius:inherit;background:var(--primary);animation:hub-barra var(--speed) ease-in-out infinite}@keyframes hub-barra{from{transform:translateX(-100%)}to{transform:translateX(250%)}}",
  "js": "",
  "controls": [
    "width",
    "height",
    "speed"
  ]
} satisfies AnimationModule;

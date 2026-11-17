import type { AnimationModule } from './types';
export default {
  "id": "carregamento-conico",
  "name": "Carregamento cônico",
  "category": "carregamentos",
  "description": "Gradiente cônico com máscara e fallback de borda.",
  "tags": [
    "Carregamento cônico",
    "Gradiente",
    "cônico",
    "com",
    "máscara"
  ],
  "html": "<div class=\"cone\" role=\"status\" aria-label=\"Carregando\"></div>",
  "css": ".cone{width:var(--size);height:var(--size);border:var(--thickness) solid var(--secondary);border-top-color:var(--primary);border-radius:50%;animation:hub-conico var(--speed) linear infinite}@supports (background:conic-gradient(red,blue)) and ((mask:radial-gradient(white,black)) or (-webkit-mask:radial-gradient(white,black))){.cone{border:0;background:conic-gradient(var(--secondary),var(--primary));mask:radial-gradient(farthest-side,transparent calc(100% - var(--thickness)),#000 calc(100% - var(--thickness) + 1px));-webkit-mask:radial-gradient(farthest-side,transparent calc(100% - var(--thickness)),#000 calc(100% - var(--thickness) + 1px))}}@keyframes hub-conico{to{transform:rotate(360deg)}}",
  "js": "",
  "controls": [
    "size",
    "thickness",
    "speed"
  ]
} satisfies AnimationModule;

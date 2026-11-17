import type { AnimationModule } from './types';
export default {
  "id": "texto-com-foco",
  "name": "Texto com foco",
  "category": "textos-animados",
  "description": "Texto com foco progressivo, escala e desfoque configuráveis.",
  "tags": [
    "Texto com foco",
    "Texto",
    "com",
    "foco",
    "progressivo,"
  ],
  "html": "<p data-effect class=\"focus-text\">{{text}}</p><button type=\"button\" data-replay>Reproduzir animação</button>",
  "css": ".focus-text{margin:0;font:700 var(--fontSize)/1.2 Georgia,serif;color:var(--primary);animation:hub-text-focus var(--speed) ease both}@keyframes hub-text-focus{from{opacity:0;filter:blur(var(--intensity));transform:scale(var(--scale))}to{opacity:1;filter:blur(0);transform:scale(1)}}",
  "js": "root.querySelector('[data-replay]').onclick=()=>{const el=root.querySelector('[data-effect]');el.getAnimations({subtree:true}).forEach(a=>{a.cancel();a.play()});};",
  "controls": [
    "text",
    "speed",
    "intensity",
    "scale",
    "fontSize"
  ]
} satisfies AnimationModule;

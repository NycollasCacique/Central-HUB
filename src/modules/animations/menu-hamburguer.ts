import type { AnimationModule } from './types';
export default {
  "id": "menu-hamburguer",
  "name": "Menu hambúrguer animado",
  "category": "menus-e-navegacao",
  "description": "Botão semântico que alterna entre três linhas e X.",
  "tags": [
    "Menu hambúrguer animado",
    "Botão",
    "semântico",
    "que",
    "alterna"
  ],
  "html": "<button class=\"hamburger\" type=\"button\" aria-label=\"Alternar menu\" aria-expanded=\"false\"><span></span><span></span><span></span></button>",
  "css": ".hamburger{width:var(--size);height:var(--size);display:flex;flex-direction:column;justify-content:center;gap:6px;padding:10px}.hamburger span{display:block;height:2px;width:100%;background:var(--primary);transition:transform var(--speed),opacity var(--speed)}.hamburger[aria-expanded=true] span:first-child{transform:translateY(8px) rotate(45deg)}.hamburger[aria-expanded=true] span:nth-child(2){opacity:0}.hamburger[aria-expanded=true] span:last-child{transform:translateY(-8px) rotate(-45deg)}",
  "js": "const button=root.querySelector('button');button.onclick=()=>button.setAttribute('aria-expanded',button.getAttribute('aria-expanded')!=='true');",
  "controls": [
    "size",
    "speed"
  ]
} satisfies AnimationModule;

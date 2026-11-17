import type { AnimationModule } from './types';
export default {
  "id": "acordeao-expansivel",
  "name": "Acordeão expansível",
  "category": "paineis-e-acordeoes",
  "description": "Painel reversível com altura real e associação acessível.",
  "tags": [
    "Acordeão expansível",
    "Painel",
    "reversível",
    "com",
    "altura"
  ],
  "html": "<section class=\"panel\"><button type=\"button\" id=\"{{id}}-heading\" aria-expanded=\"false\" aria-controls=\"{{id}}-body\">{{text}}<span class=\"arrow\" aria-hidden=\"true\">⌄</span></button><div class=\"body\" id=\"{{id}}-body\" role=\"region\" aria-labelledby=\"{{id}}-heading\" aria-hidden=\"true\" inert><div class=\"inner\"><p>Conteúdo que se adapta à altura real, com expansão e recolhimento completos.</p></div></div></section>",
  "css": ".panel{width:var(--width);max-width:100%;border:1px solid var(--primary);border-radius:var(--radius);overflow:hidden}.panel>button{width:100%;display:flex;justify-content:space-between}.arrow{transition:transform var(--speed)}[aria-expanded=true] .arrow{transform:rotate(180deg)}.body{display:grid;grid-template-rows:0fr;transition:grid-template-rows var(--speed)}.body[data-open=true]{grid-template-rows:1fr}.inner{min-height:0;overflow:hidden}.inner p{padding:16px;margin:0}",
  "js": "const button=root.querySelector('[aria-expanded]'),body=root.querySelector('.body');button.onclick=()=>{const open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',open);body.dataset.open=open;body.setAttribute('aria-hidden',!open);body.inert=!open;};",
  "controls": [
    "width",
    "radius",
    "speed",
    "text"
  ]
} satisfies AnimationModule;

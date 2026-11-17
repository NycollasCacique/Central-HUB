import type { AnimationModule } from './types';
export default {
  "id": "botao-confirmacao",
  "name": "Botão de confirmação",
  "category": "botoes-animados",
  "description": "Estados normal, processando e confirmado após ação concluída.",
  "tags": [
    "Botão de confirmação",
    "Estados",
    "normal,",
    "processando",
    "e"
  ],
  "html": "<button class=\"confirm\" type=\"button\"><span class=\"normal\">{{text}}</span><span class=\"success\">{{successText}}</span></button><p role=\"status\"></p><button type=\"button\" data-reset>Reiniciar</button>",
  "css": ".confirm{position:relative;overflow:hidden;min-width:170px;min-height:48px;background:var(--primary);color:var(--background)}.confirm span{display:block;transition:transform var(--speed)}.confirm .success{position:absolute;inset:0;display:grid;place-items:center;transform:translateY(110%)}.confirm[data-done=true] .normal{transform:translateY(-200%)}.confirm[data-done=true] .success{transform:translateY(0)}",
  "js": "const button=root.querySelector('.confirm'),status=root.querySelector('[role=status]'),reset=root.querySelector('[data-reset]');let generation=0;/* Substitua esta ação demonstrativa pela Promise da operação real. */async function action(){await new Promise(resolve=>setTimeout(resolve,700));}button.onclick=async()=>{const token=++generation;button.disabled=true;reset.disabled=true;status.textContent='Processando…';try{await action();if(token!==generation)return;button.dataset.done='true';status.textContent='Ação concluída.';}catch{status.textContent='Falha. Tente novamente.';button.disabled=false;}finally{reset.disabled=false;}};reset.onclick=()=>{generation++;button.disabled=false;button.dataset.done='false';status.textContent='';};",
  "controls": [
    "speed",
    "text",
    "successText"
  ]
} satisfies AnimationModule;

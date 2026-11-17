import { animations } from './index';
import type { Settings } from '../../registry/catalog';
export const escapeHTML = (s: string) => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
export function generateAnimation(id: string, s: Settings) {
  const mod = animations.find(m => m.id === id)!;
  const labels = s.tabLabels.split('|').map(t=>t.trim()).filter(Boolean).slice(0,10);
  if (!labels.length) labels.push('Início');
  const values: Record<string,string|number> = {...s,id,inset: ({left:'0 100% 0 0',right:'0 0 0 100%',top:'0 0 100% 0',bottom:'100% 0 0 0'}[s.direction] || '0 100% 0 0'),
    tabs: labels.map((l,i)=>`<button type="button" role="tab" id="${id}-tab-${i}" aria-controls="${id}-panel-${i}" aria-selected="${i===0}" tabindex="${i===0?0:-1}">${escapeHTML(l)}</button>`).join(''),
    panels:labels.map((l,i)=>`<div role="tabpanel" tabindex="0" id="${id}-panel-${i}" aria-labelledby="${id}-tab-${i}" ${i?'hidden':''}>Conteúdo de ${escapeHTML(l)}</div>`).join('')};
  const replace=(str:string,html=false)=>str.replace(/\{\{(\w+)\}\}/g,(_,key)=>html&&!['tabs','panels'].includes(key)?escapeHTML(String(values[key])):String(values[key]));
  const selector=`.hub-${id}`;
  const html=`<div class="hub-demo hub-${id}">${replace(mod.html,true)}</div>`;
  const variables=`--primary:${s.primary};--secondary:${s.secondary};--background:${s.background};--speed:${s.speed}ms;--width:${s.width}px;--size:${s.size}px;--height:${s.height}px;--thickness:${s.thickness}px;--intensity:${id==='balanco-recusa'?Math.min(s.intensity,8):s.intensity}px;--radius:${s.radius}px;--gap:${s.gap}px;--scale:${s.scale};--fontSize:${s.fontSize}px;`;
  // Scope every selector, including those inside @supports, without changing keyframe steps.
  function scope(source:string):string {
    let result='', position=0;
    while(position<source.length){
      const opening=source.indexOf('{',position); if(opening<0)break;
      let closing=opening+1,depth=1;
      while(depth&&closing<source.length){if(source[closing]==='{')depth++;if(source[closing]==='}')depth--;closing++;}
      const head=source.slice(position,opening).trim(),body=source.slice(opening+1,closing-1);
      result+=(head.startsWith('@')?head:head.split(',').map(sel=>selector+' '+sel.trim()).join(','))+'{'+(head.startsWith('@supports')?scope(body):body)+'}';position=closing;
    }return result;
  }
  const scoped=scope(replace(mod.css));
  const css=`${selector}{${variables}display:flex;flex-direction:column;align-items:center;gap:16px;max-width:100%;color:${s.icons};font:14px system-ui,sans-serif} ${selector},${selector} *{box-sizing:border-box} ${selector} button{font:inherit;cursor:pointer;border:1px solid var(--primary);border-radius:var(--radius);padding:10px 14px;background:var(--background);color:var(--primary)} ${selector} button:disabled{cursor:wait;opacity:.7} ${selector} :focus-visible{outline:3px solid var(--primary);outline-offset:3px} ${selector} [hidden]{display:none!important} ${scoped}\n@media(prefers-reduced-motion:reduce){${selector} *,${selector} *::before{animation:none!important;transition:none!important;filter:none!important}${selector} .check>*{stroke-dashoffset:0!important}}`;
  const js=`document.querySelectorAll('${selector}').forEach(root=>{\n${replace(mod.js)}\n${id==='progresso-circular'?"window.addEventListener('message',event=>{if(event.source===parent&&event.data?.type==='hub-progress'){const value=Number(event.data.value);if(Number.isFinite(value)){root.updateValue(value);root.querySelector('[data-value]').value=Math.max(0,Math.min(100,value));}}});":''}\n});`;
  const full=`<!doctype html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${mod.name}</title><style>body{margin:0;min-height:100vh;display:grid;grid-template-columns:minmax(0,1fr);place-items:center;padding:20px;background:${s.background}}${css}</style></head><body>${html}<script>${js}</script></body></html>`;
  return {HTML:html,CSS:css,JavaScript:js,'Código completo':full};
}

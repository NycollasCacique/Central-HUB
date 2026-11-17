import type { AnimationModule } from './types';
export default {
  "id": "abas-deslizantes",
  "name": "Abas deslizantes",
  "category": "seletores-e-abas",
  "description": "Seleção acessível com indicador medido e textos variáveis.",
  "tags": [
    "Abas deslizantes",
    "Seleção",
    "acessível",
    "com",
    "indicador"
  ],
  "html": "<div class=\"tabs\" role=\"tablist\" aria-label=\"Seções\"><span class=\"marker\" aria-hidden=\"true\"></span>{{tabs}}</div>{{panels}}",
  "css": ".tabs{position:relative;display:flex;max-width:100%;overflow:auto;padding:5px;gap:4px;background:var(--secondary);border-radius:var(--radius)}.tabs button{position:relative;z-index:1;white-space:nowrap;border:0;background:transparent}.tabs button[aria-selected=true]{color:var(--background)}.marker{position:absolute;left:0;top:5px;bottom:5px;background:var(--primary);border-radius:var(--radius);transition:transform var(--speed),width var(--speed)}[role=tabpanel]{padding:12px}",
  "js": "const tabs=[...root.querySelectorAll('[role=tab]')],marker=root.querySelector('.marker');let active=0;function measure(){const el=tabs[active];marker.style.width=el.offsetWidth+'px';marker.style.transform='translateX('+el.offsetLeft+'px)';}function select(i){active=i;tabs.forEach((t,n)=>{t.setAttribute('aria-selected',n===i);t.tabIndex=n===i?0:-1;root.querySelectorAll('[role=tabpanel]')[n].hidden=n!==i;});measure();}tabs.forEach((t,i)=>{t.onclick=()=>select(i);t.onkeydown=e=>{let n;if(e.key==='ArrowRight')n=(i+1)%tabs.length;if(e.key==='ArrowLeft')n=(i+tabs.length-1)%tabs.length;if(e.key==='Home')n=0;if(e.key==='End')n=tabs.length-1;if(n!==undefined){e.preventDefault();select(n);tabs[n].focus();}};});new ResizeObserver(measure).observe(root.querySelector('.tabs'));tabs.forEach(t=>new ResizeObserver(measure).observe(t));select(0);document.fonts.ready.then(measure);",
  "controls": [
    "speed",
    "radius",
    "tabLabels"
  ]
} satisfies AnimationModule;

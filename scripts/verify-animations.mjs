import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const modules=fs.readdirSync('src/modules/animations').filter(n=>!['index.ts','types.ts','generate.ts'].includes(n)).map(n=>JSON.parse(fs.readFileSync('src/modules/animations/'+n,'utf8').split('export default ')[1].split(' satisfies')[0]));
const browser=await chromium.launch({channel:'msedge',headless:true});
const context=await browser.newContext({permissions:['clipboard-read','clipboard-write']});
const page=await context.newPage(),errors=[];
page.on('pageerror',e=>errors.push(e.message));
try{
 for(const m of modules){
  await page.goto('http://127.0.0.1:5173/componente/'+m.id);
  const frame=page.frameLocator('.live-preview iframe');
  await frame.locator('.hub-demo').waitFor();
  if(m.id==='menu-hamburguer'){
   const b=frame.getByRole('button');await b.focus();await b.press('Enter');assert.equal(await b.getAttribute('aria-expanded'),'true');await b.press('Space');assert.equal(await b.getAttribute('aria-expanded'),'false');
  }
  if(m.id==='abas-deslizantes'){
   const tabs=frame.getByRole('tab');await tabs.first().focus();await tabs.first().press('End');assert.equal(await tabs.last().getAttribute('aria-selected'),'true');
   assert.ok(await frame.locator('.marker').evaluate(el=>Math.abs(el.getBoundingClientRect().width-el.parentElement.querySelector('[aria-selected=true]').getBoundingClientRect().width)<1));
  }
  if(m.id==='progresso-circular'){
   await frame.getByRole('slider').fill('83');assert.equal(await frame.getByRole('progressbar').getAttribute('aria-valuenow'),'83');
   await frame.locator('.hub-demo').evaluate(el=>el.dataset.identity='preserved');
   await page.getByRole('slider',{name:'Percentual',exact:true}).fill('47');await page.waitForTimeout(150);
   assert.equal(await frame.locator('.hub-demo').getAttribute('data-identity'),'preserved');assert.equal(await frame.getByRole('progressbar').getAttribute('aria-valuenow'),'47');
  }
  if(m.id==='acordeao-expansivel'||m.id==='expansao-vertical'){
   const b=frame.getByRole('button');await b.press('Enter');assert.equal(await b.getAttribute('aria-expanded'),'true');await b.press('Space');await page.waitForTimeout(500);assert.ok(await frame.locator('.body').evaluate(el=>el.getBoundingClientRect().height<1));
  }
  if(m.id==='botao-confirmacao'){
   await frame.locator('.confirm').click();assert.equal(await frame.getByRole('status').innerText(),'Processando…');await page.waitForTimeout(800);assert.equal(await frame.locator('.confirm').getAttribute('data-done'),'true');await frame.getByText('Reiniciar',{exact:true}).click();assert.equal(await frame.locator('.confirm').isDisabled(),false);
  }
  if(await frame.locator('[data-replay]').count())await frame.locator('[data-replay]').click();
  const slider=page.getByRole('slider',{name:'Duração',exact:true});await slider.fill('800');
  await frame.locator('.hub-demo').waitFor();
  await page.getByRole('button',{name:'Copiar código',exact:true}).click();
  await page.getByRole('status').filter({hasText:'Código copiado com sucesso.'}).waitFor();
  const code=await page.evaluate(()=>navigator.clipboard.readText());assert.ok(code.includes('--speed:800ms'));
  const standalone=await context.newPage();standalone.on('pageerror',e=>errors.push(e.message));await standalone.setContent(code);await standalone.locator('.hub-demo').waitFor();
  await standalone.emulateMedia({reducedMotion:'reduce'});
  assert.equal(await standalone.locator('.hub-demo').evaluate(el=>el.getAnimations({subtree:true}).filter(a=>a.playState==='running').length),0);
  await standalone.setViewportSize({width:320,height:600});assert.ok(await standalone.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await standalone.close();
  await page.getByRole('button',{name:'Restaurar padrão'}).click();
  const favorite=page.getByRole('button',{name:'Favoritar',exact:true});await favorite.click();await page.reload();await page.getByRole('button',{name:'Favoritado',exact:true}).waitFor();
  console.log('Aprovado:',m.name);
 }
 assert.deepEqual(errors,[]);
 console.log('16 componentes: interação, teclado, personalização, cópia, exportação isolada, movimento reduzido, mobile e favoritos aprovados.');
}finally{await browser.close();}

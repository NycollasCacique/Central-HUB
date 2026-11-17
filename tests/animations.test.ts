import { describe,it,expect } from 'vitest';
import { animations } from '../src/modules/animations';
import { catalog,defaults } from '../src/registry/catalog';
import { generate } from '../src/utils/generate';
describe('Expansão modular',()=>{
  it('registra os 16 novos componentes uma única vez',()=>{
    expect(animations).toHaveLength(16);
    animations.forEach(m=>expect(catalog.filter(e=>e.id===m.id)).toHaveLength(1));
  });
  for(const m of animations)it(`exporta ${m.name} com configuração e isolamento`,()=>{
    const f=generate(m.id,{...defaults,primary:'#123456',text:'<script>alert(1)</script>'});
    expect(f.CSS).toContain('--primary:#123456');
    expect(f.CSS).toContain(`.hub-${m.id}`);
    expect(f.CSS).toContain('prefers-reduced-motion');
    expect(f['Código completo']).toContain(f.HTML);
    expect(f['Código completo']).not.toContain('{{');
    expect(f['React + TypeScript']).toBeUndefined();
    expect(f.HTML).not.toContain('<script>');
    expect(()=>new Function(f.JavaScript)).not.toThrow();
  });
});

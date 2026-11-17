# Expansão da biblioteca — 17/11/2026

Base identificada: versão 1.0.0, React 19, TypeScript 5.7, Vite 6 e React Router 7; seis componentes de menus inferiores. A expansão mantém essa aplicação e adiciona os dez componentes do pedido inicial e os seis do anexo: total de **22 componentes em 14 categorias**.

## Arquivos da implementação

- `src/modules/animations/`: 16 módulos individuais, `types.ts`, `index.ts` e `generate.ts`. Cada módulo contém metadados, controles suportados, HTML, CSS e eventos. O gerador compartilhado monta documentos independentes e aplica isolamento de seletores.
- `src/registry/catalog.ts`: configurações adicionais, categorias e integração dos novos registros.
- `src/utils/generate.ts`: encaminha cada nova animação ao gerador modular, preservando os seis menus.
- `src/components/Detail.tsx`: controles por componente e retorno à categoria correspondente.
- `src/components/Preview.tsx`: atualização do percentual por mensagem, preservando o documento e a transição de progresso.
- `src/modules/library/Library.tsx`: tecnologias disponíveis por entrada e filtro agregado.
- `src/App.tsx`: ícones de categorias adicionais e reinicialização de configurações ao trocar de componente.
- `tests/catalog.test.ts`, `tests/animations.test.ts`: testes de registro, filtros, isolamento, configuração e geração.
- `scripts/verify-browser.mjs`, `scripts/verify-animations.mjs`: regressão dos seis menus e validação dos 16 novos componentes no Edge.

## Exportação

Os novos componentes exportam HTML, CSS, JavaScript e documento HTML completo, sem dependências adicionais. Não anunciam React nativo. Os menus anteriores mantêm a exportação TSX com iframe identificada na interface.

O botão de confirmação demonstra uma operação assíncrona; o código indica onde substituir a Promise demonstrativa pela ação real. O sucesso só aparece depois da resolução.

## Validação

Executar `npm test`, `npm run build` e, com o servidor local ativo, `npm run test:browser` e `node scripts/verify-animations.mjs`. Neste ambiente, os comandos usam `.tools/runtime/node.exe`, pois Node e npm não estão no PATH.

- 27 testes automatizados de catálogo e geração.
- Regressão: seis menus, clique, setas, personalização, restauração, cópia, filtros, favoritos persistidos, temas e layout mobile.
- Novas animações: clique e teclado onde aplicável, reprodução, medição do indicador das abas, recolhimento completo dos painéis, confirmação assíncrona, percentual dinâmico sem recriar a prévia, cópia e abertura do HTML independente, ausência de animações CSS com movimento reduzido, largura de 320 px e favoritos persistidos.
- Captura de exceções JavaScript durante as duas verificações no navegador.
- Build com checagem TypeScript e Vite. O Vite informa avisos de diretivas `use client` do React Router ignoradas no bundle; não impedem o build.

As capturas de regressão são gravadas em `tests/desktop.png` e `tests/mobile.png`.

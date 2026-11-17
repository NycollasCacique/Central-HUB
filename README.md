# Central de Componentes

Biblioteca pessoal de interações web, em português brasileiro. Primeira versão com seis menus inferiores reais, prévias clicáveis, configurações ao vivo e código exportável. Não utiliza backend ou autenticação.

## Executar

Instale Node.js 22 LTS ou superior e execute na pasta do projeto:

```sh
npm install
npm run dev
```

Abra o endereço informado pelo Vite, normalmente `http://127.0.0.1:5173`.

Neste workspace, `iniciar.cmd` também inicia a aplicação com o runtime portátil preparado durante a implementação, sem depender de Node no PATH. A pasta `.tools` é apenas infraestrutura local e não deve ser distribuída como código-fonte.

```sh
npm test
npm run build
```

O build estático fica em `dist/`. Ao hospedar, configure fallback de todas as rotas para `index.html` (React Router usa BrowserRouter).

## Tecnologias

React 19, TypeScript, Vite, Tailwind CSS 4, Lucide React, React Router, Prism e Vitest. Estados locais usam hooks; favoritos e tema usam LocalStorage. A aplicação respeita a preferência de movimento reduzido.

## Organização

```text
src/
  App.tsx                 Layout e rotas
  main.tsx                Entrada e provedor de roteamento
  components/
    Preview.tsx           Prévia isolada do documento exportado
    Detail.tsx            Playground e controles
    CodePanel.tsx         Abas, destaque, cópia e download
  registry/catalog.ts     Categorias, componentes, tipos e padrões
  modules/library/        Dashboard, filtros e cards do catálogo
  utils/
    generate.ts           Documentos HTML, CSS, JS e integração TSX
    storage.ts            Persistência local
  styles/app.css          Design system e responsividade
tests/catalog.test.ts     Registro, pesquisa e geração de código
```

## Uso

Navegue pela sidebar ou pelos atalhos do dashboard. Cada card permite experimentar o menu diretamente. Abra o título do card para personalizar cores, velocidade, intensidade quando aplicável, largura, ícones, arredondamento e quantidade de itens. Restaurar padrão redefine todos os controles.

O playground usa exatamente o documento exibido na aba Código completo. HTML, CSS e JavaScript são partes desse mesmo documento. O arquivo completo pode ser aberto sozinho em um navegador. A aba React + TypeScript fornece um componente TSX com imports e um iframe isolado contendo o documento, sem bibliotecas de ícones ou CSS externo. Essa integração preserva os eventos e estilos da prévia; não é uma conversão para elementos DOM nativos do React.

Favoritos e tema ficam salvos no navegador por origem. Se o navegador bloquear armazenamento, a sessão continua funcionando, mas os dados não persistem. A cópia depende da Clipboard API e de um contexto seguro (localhost ou HTTPS); o botão de download permite obter o código quando a cópia estiver indisponível.

## Adicionar uma categoria

Adicione identificador, nome e ícone em `categories` no registro e o ícone correspondente em `icons` no layout. A rota `/categoria/:category`, a contagem e os filtros são derivados do registro. Categorias sem entradas mostram um estado vazio.

## Cadastrar uma animação

1. Cadastre metadados em `catalog`: id único, nome, descrição, categoria, tags, data, destaque e tecnologias realmente implementadas.
2. Para uma nova família de interação, adicione seu identificador ao tipo `Variant` e implemente os estilos e eventos em `generate.ts`. As seis variantes atuais compartilham a base acessível de navegação, mas têm estilos de movimento próprios.
3. Retorne somente arquivos implementados. Para outra estrutura além de menus, amplie o contrato de geração e o renderer `Preview` antes de anunciar a tecnologia no catálogo.
4. Atualize os testes para verificar o documento autônomo e as opções suportadas.

## Verificação manual

Após iniciar, percorra dashboard, oito categorias, favoritos, configurações, seis playgrounds e rota inexistente. Teste pesquisa com `SELECAO` e `orgânico`, ordenações e filtros combinados; favorite, recarregue e confira persistência. Alterne os temas, clique em todos os itens de cada menu e use Tab, setas, Home e End. Mude cada controle, compare prévia e código e abra o HTML baixado fora da aplicação. Verifique mobile em 375 px e desktop em 1440 px, além de movimento reduzido no sistema.

Os testes automatizados cobrem registro, pesquisa e geração. Validação em navegador deve ser executada antes de considerar todos os critérios de entrega confirmados.

### Validação executada

- Build de produção com TypeScript e Vite aprovado.
- 10 testes de registro, busca, filtros e geração de código aprovados.
- Verificação automatizada no Edge aprovada: rotas, seis prévias e playgrounds, teclado, personalização, cópia, favoritos após recarregar, tema persistido e larguras de 1440 px e 375 px. Sem exceções JavaScript capturadas.

Para repetir a verificação no Windows com Edge instalado, mantenha `npm run dev` em um terminal e execute `npm run test:browser` em outro. As capturas são gravadas em `tests/desktop.png` e `tests/mobile.png`.

## Expans?o da biblioteca

O cat?logo atual cont?m 22 componentes em 14 categorias: seis menus originais e 16 anima??es adicionais. Consulte [o relat?rio da expans?o](tests/EXPANSAO.md) para arquitetura, arquivos e valida??es. As novas anima??es s?o cadastradas em m?dulos individuais em `src/modules/animations/`; a exporta??o dispon?vel ? HTML/CSS/JavaScript independente.

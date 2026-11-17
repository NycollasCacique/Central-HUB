import { animations } from '../modules/animations';
export const categories = [
  ["menus-laterais", "Menus laterais", "PanelLeft"],
  ["menus-inferiores", "Menus inferiores", "PanelBottom"],
  ["botoes-animados", "Botões animados", "MousePointer2"],
  ["cartoes-interativos", "Cartões interativos", "Layers"],
  ["carregamentos", "Carregamentos", "LoaderCircle"],
  ["formularios-e-campos", "Formulários e campos", "TextCursorInput"],
  ["transicoes-de-paginas", "Transições de páginas", "ArrowRightLeft"],
  ["alertas-e-notificacoes", "Alertas e notificações", "Bell"],
  ['indicadores-e-numeros', 'Indicadores e números', 'Layers'],
  ['menus-e-navegacao', 'Menus e navegação', 'PanelLeft'],
  ['seletores-e-abas', 'Seletores e abas', 'Layers'],
  ['paineis-e-acordeoes', 'Painéis e acordeões', 'Layers'],
  ['entradas-e-revelacoes', 'Entradas e revelações', 'Layers'],
  ['textos-animados', 'Textos animados', 'Layers'],
] as const;
export type Variant = string;
export interface Settings {
  size: number; height: number; thickness: number; gap: number; value: number;
  text: string; successText: string; tabLabels: string; direction: 'left'|'right'|'top'|'bottom';
  scale: number; fontSize: number; start: number; end: number;
  primary: string;
  secondary: string;
  background: string;
  icons: string;
  speed: number;
  intensity: number;
  radius: number;
  iconSize: number;
  width: number;
  count: number;
}
export const defaults: Settings = {
  size: 64, height: 6, thickness: 4, gap: 7, value: 65,
  text: 'Experimente a animação', successText: 'Confirmado!', tabLabels: 'Início|Explorar projetos|Perfil',
  direction: 'left', scale: 1.04, fontSize: 32, start: 0, end: 1250,
  primary: "#b4f272",
  secondary: "#202c23",
  background: "#202225",
  icons: "#a4a8af",
  speed: 420,
  intensity: 12,
  radius: 20,
  iconSize: 22,
  width: 400,
  count: 5,
};
export interface Entry {
  id: string;
  name: string;
  description: string;
  category: string;
  variant: Variant;
  tags: string[];
  added: string;
  featured: boolean;
  technologies: string[];
}
export const catalog: Entry[] = [
  {
    id: "selecao-deslizante",
    name: "Seleção deslizante",
    description: "Uma cápsula que acompanha cada movimento.",
    variant: "slide",
    tags: ["cápsula", "suave", "indicador"],
  },
  {
    id: "elevacao-liquida",
    name: "Elevação líquida",
    description: "Movimento orgânico, com uma curva de personalidade.",
    variant: "liquid",
    tags: ["orgânico", "líquido", "curva"],
  },
  {
    id: "icone-flutuante",
    name: "Ícone flutuante",
    description: "Dê um novo nível à navegação do seu projeto.",
    variant: "float",
    tags: ["elevação", "circular", "ícone"],
  },
  {
    id: "preenchimento-animado",
    name: "Preenchimento animado",
    description: "Uma expansão de cor a cada nova seleção.",
    variant: "fill",
    tags: ["circular", "preenchimento", "cor"],
  },
  {
    id: "rotulo-expansivel",
    name: "Rótulo expansível",
    description: "Mais contexto, apenas quando você precisa.",
    variant: "expand",
    tags: ["texto", "expansão", "abas"],
  },
  {
    id: "bolha-flutuante",
    name: "Bolha flutuante",
    description: "Um indicador leve, com movimento elástico.",
    variant: "bubble",
    tags: ["elástico", "bolha", "indicador"],
  },
].map((item, i) => ({
  ...item,
  variant: item.variant as Variant,
  category: "menus-inferiores",
  added: `2026-11-${String(10 + i).padStart(2, "0")}`,
  featured: i < 3,
  technologies: ["HTML", "CSS", "JavaScript", "React + TypeScript"],
}));
catalog.push(...animations.map(m=>({id:m.id,name:m.name,description:m.description,category:m.category,variant:m.id,tags:m.tags,added:'2026-11-17',featured:false,technologies:['HTML','CSS','JavaScript']})));
export const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
export function filterCatalog(
  entries: Entry[],
  query: string,
  technology = "",
  favorites?: string[],
  order = "recent",
) {
  return entries
    .filter(
      (e) =>
        normalize([e.name, e.description, ...e.tags].join(" ")).includes(
          normalize(query),
        ) &&
        (!technology || e.technologies.includes(technology)) &&
        (!favorites || favorites.includes(e.id)),
    )
    .sort((a, b) =>
      order === "alpha"
        ? a.name.localeCompare(b.name, "pt-BR")
        : b.added.localeCompare(a.added),
    );
}

import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  PanelLeft,
  PanelBottom,
  MousePointer2,
  Layers,
  LoaderCircle,
  TextCursorInput,
  ArrowRightLeft,
  Bell,
  Heart,
  Search,
  ArrowUpRight,
  ArrowRight,
  X,
  Code2,
  Sparkles,
  SlidersHorizontal,
  LayoutDashboard,
} from "lucide-react";
import {
  catalog,
  categories,
  filterCatalog,
  type Entry,
} from "../../registry/catalog";
import { Preview } from "../../components/Preview";
const icons = [
  PanelLeft,
  PanelBottom,
  MousePointer2,
  Layers,
  LoaderCircle,
  TextCursorInput,
  ArrowRightLeft,
  Bell,
];
function Card({
  entry,
  favorites,
  toggle,
  index,
}: {
  entry: Entry;
  favorites: string[];
  toggle: (id: string) => void;
  index: number;
}) {
  return (
    <article className={`component-card card-${index % 6}`}>
      <div className="card-preview">
        <span className="preview-tag">INTERATIVO</span>
        <button
          className={`favorite ${favorites.includes(entry.id) ? "saved" : ""}`}
          aria-label={`${favorites.includes(entry.id) ? "Desfavoritar" : "Favoritar"} ${entry.name}`}
          onClick={() => toggle(entry.id)}
        >
          <Heart
            size={16}
            fill={favorites.includes(entry.id) ? "currentColor" : "none"}
          />
        </button>
        <Preview variant={entry.variant} title={`Prévia de ${entry.name}`} />
        <span className="interact-hint">Clique para experimentar</span>
      </div>
      <div className="card-body">
        <Link to={`/componente/${entry.id}`} className="card-title">
          {entry.name}
          <ArrowUpRight size={17} />
        </Link>
        <p>{entry.description}</p>
        <div className="card-bottom">
          <span className="tech-badges">
            <span>HTML</span>
            <span>CSS</span>
            <span>JS</span>
            {entry.technologies.includes('React + TypeScript') && <span>TSX</span>}
          </span>
          <Link
            to={`/componente/${entry.id}`}
            aria-label={`Personalizar ${entry.name}`}
          >
            <SlidersHorizontal size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}
export function Library({
  dashboard = false,
  favoritesOnly = false,
  query,
  setQuery,
  favorites,
  toggle,
}: {
  dashboard?: boolean;
  favoritesOnly?: boolean;
  query: string;
  setQuery: (s: string) => void;
  favorites: string[];
  toggle: (id: string) => void;
}) {
  const { category } = useParams();
  const [technology, setTechnology] = useState("");
  const [order, setOrder] = useState("recent");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [onlySaved, setOnlySaved] = useState(false);
  const [featured, setFeatured] = useState(false);
  const name = dashboard
    ? "Seu próximo projeto começa aqui."
    : favoritesOnly
      ? "Seus favoritos"
      : categories.find((c) => c[0] === category)?.[1] ||
        "Categoria não encontrada";
  const base = catalog.filter(
    (e) =>
      (!category || e.category === category) &&
      (!categoryFilter || e.category === categoryFilter) &&
      (!featured || e.featured),
  );
  const entries = filterCatalog(
    base,
    query,
    technology,
    favoritesOnly || onlySaved ? favorites : undefined,
    order,
  );
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            {dashboard
              ? "SEU LABORATÓRIO DE INTERFACES"
              : favoritesOnly
                ? "SUA COLEÇÃO"
                : "EXPLORE A BIBLIOTECA"}
          </span>
          <h1>{name}</h1>
          <p>
            {dashboard
              ? "Explore, personalize e leve boas interações para o seu código."
              : favoritesOnly
                ? "As interações que você quer manter por perto."
                : "Componentes reais. Movimento com propósito. Código pronto para usar."}
          </p>
        </div>
        {dashboard && (
          <Link className="button primary" to="/categoria/menus-inferiores">
            Explorar componentes <ArrowUpRight size={16} />
          </Link>
        )}
      </div>
      {dashboard && (
        <>
          <section className="stats">
            <div>
              <span className="stat-icon">
                <Layers size={19} />
              </span>
              <div>
                <small>Componentes disponíveis</small>
                <strong>
                  {catalog.length.toString().padStart(2, "0")}
                  <span>Prontos para usar</span>
                </strong>
              </div>
            </div>
            <div>
              <span className="stat-icon">
                <PanelLeft size={19} />
              </span>
              <div>
                <small>Categorias na biblioteca</small>
                <strong>
                  {categories.length.toString().padStart(2, "0")}
                  <span>Espaço para expandir</span>
                </strong>
              </div>
            </div>
            <div>
              <span className="stat-icon">
                <Heart size={19} />
              </span>
              <div>
                <small>Seus favoritos</small>
                <strong>
                  {favorites.length.toString().padStart(2, "0")}
                  <span>Sua coleção pessoal</span>
                </strong>
              </div>
            </div>
          </section>
          <section className="hero-banner">
            <div>
              <span className="new-badge">
                <span className="live-dot" /> PRIMEIRO MÓDULO DISPONÍVEL
              </span>
              <h2>
                Navegação que se move
                <br />
                com as suas ideias<span>.</span>
              </h2>
              <p>
                Seis formas de transformar um menu inferior
                <br />
                em uma experiência memorável.
              </p>
              <Link to="/categoria/menus-inferiores">
                Conhecer os menus inferiores <ArrowRight size={16} />
              </Link>
            </div>
            <div className="hero-art" aria-hidden="true">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="art-chip">
                <Code2 size={16} /> interação em cada detalhe
              </div>
              <div className="art-menu">
                {[LayoutDashboard, Search, Heart, Bell].map((Icon, i) => (
                  <span key={i} className={i === 0 ? "selected" : ""}>
                    <Icon size={24} />
                  </span>
                ))}
              </div>
              <span className="art-caption">
                <span className="live-dot" /> pronto para o seu próximo projeto
              </span>
            </div>
          </section>
          <div className="quick-categories">
            {categories.slice(0, 4).map(([id, label], i) => {
              const Icon = icons[i] || Layers;
              return (
                <Link to={`/categoria/${id}`} key={id}>
                  <Icon size={16} />
                  {label}
                  <span>{catalog.filter((e) => e.category === id).length}</span>
                </Link>
              );
            })}
          </div>
        </>
      )}
      <div className="section-heading library-heading">
        <div>
          <h2>
            {dashboard
              ? "Explore os componentes"
              : favoritesOnly
                ? "Componentes salvos"
                : "Todos os componentes"}{" "}
            <span className="number-badge">{entries.length}</span>
          </h2>
          <p>
            {dashboard
              ? "Encontre a interação certa para a sua próxima interface."
              : "Experimente a prévia ou abra um componente para personalizar."}
          </p>
        </div>
        <span className="available">
          <span className="live-dot" /> Prévias funcionais
        </span>
      </div>
      <div className="filterbar">
        <div className="filter-search">
          <Search size={16} />
          <input
            aria-label="Pesquisar no catálogo"
            placeholder="Buscar por nome, descrição ou tag..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button aria-label="Limpar busca" onClick={() => setQuery("")}>
              <X size={14} />
            </button>
          )}
        </div>
        {!category && (
          <select
            aria-label="Filtrar categoria"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">Todas as categorias</option>
            {categories.map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </select>
        )}
        <select
          aria-label="Filtrar tecnologia"
          value={technology}
          onChange={(e) => setTechnology(e.target.value)}
        >
          <option value="">Tecnologias</option>
          {[...new Set(catalog.flatMap(e=>e.technologies))].map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <select
          aria-label="Ordenar componentes"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="recent">Mais recentes</option>
          <option value="alpha">Nome: A–Z</option>
        </select>
        <button
          className={`filter-icon ${onlySaved ? "active" : ""}`}
          aria-label="Filtrar favoritos"
          aria-pressed={onlySaved}
          onClick={() => setOnlySaved(!onlySaved)}
        >
          <Heart size={16} />
        </button>
      </div>
      {dashboard && (
        <div className="collection-tabs">
          <button
            className={!featured ? "active" : ""}
            onClick={() => setFeatured(false)}
          >
            Últimos adicionados
          </button>
          <button
            className={featured ? "active" : ""}
            onClick={() => setFeatured(true)}
          >
            <Sparkles size={13} /> Em destaque
          </button>
        </div>
      )}
      {entries.length ? (
        <div className="card-grid">
          {entries.map((entry, i) => (
            <Card
              key={entry.id}
              entry={entry}
              index={i}
              favorites={favorites}
              toggle={toggle}
            />
          ))}
        </div>
      ) : (
        <div className="empty">
          <Layers size={36} />
          <h2>
            {!base.length
              ? "Novas interações vêm por aí."
              : "Nenhum componente encontrado"}
          </h2>
          <p>
            {!base.length
              ? "Esta categoria ainda não tem componentes cadastrados. Explore os menus inferiores disponíveis."
              : "Experimente outros filtros ou adicione componentes aos seus favoritos."}
          </p>
          <Link className="button" to="/categoria/menus-inferiores">
            Explorar menus inferiores <ArrowRight size={15} />
          </Link>
        </div>
      )}
    </>
  );
}

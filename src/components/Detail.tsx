import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Heart, RotateCcw, SlidersHorizontal } from "lucide-react";
import { catalog, categories, defaults, type Settings } from "../registry/catalog";
import { animations } from '../modules/animations';
import { Preview } from "./Preview";
import { CodePanel } from "./CodePanel";
export function Detail({
  favorites,
  toggle,
}: {
  favorites: string[];
  toggle: (id: string) => void;
}) {
  const { id } = useParams();
  const entry = catalog.find((e) => e.id === id);
  const [settings, setSettings] = useState<Settings>({ ...defaults });
  if (!entry)
    return (
      <div className="empty">
        <h1>Componente não encontrado</h1>
        <Link to="/">Voltar à biblioteca</Link>
      </div>
    );
  const set = <K extends keyof Settings>(key: K, value: Settings[K]) =>
    setSettings((s) => ({ ...s, [key]: value }));
  const ranges: [keyof Settings, string, number, number, number, string][] = [
    ["speed", "Duração", 100, 1200, 20, "ms"],
    ["intensity", "Intensidade", 0, 24, 1, "px"],
    ["radius", "Arredondamento", 0, 36, 1, "px"],
    ["iconSize", "Tamanho dos ícones", 16, 30, 1, "px"],
    ["width", "Largura", 260, 600, 10, "px"],
    ["count", "Quantidade de itens", 3, 5, 1, ""],
  ];
  const mod = animations.find(m=>m.id===entry.variant);
  const extraRanges: typeof ranges = [
    ['size','Tamanho',8,180,1,'px'],['height','Altura',2,30,1,'px'],['thickness','Espessura',1,12,1,'px'],
    ['gap','Distância entre pontos',2,30,1,'px'],['value','Percentual',0,100,1,'%'],
    ['scale','Escala',1,1.2,.01,''],['fontSize','Tamanho da fonte',16,64,1,'px'],
    ['start','Valor inicial',-1000,5000,10,''],['end','Valor final',-1000,10000,10,''],
  ];
  return (
    <>
      <Link className="back" to={`/categoria/${entry.category}`}>
        <ArrowLeft size={16} /> {categories.find(c=>c[0]===entry.category)?.[1]}
      </Link>
      <div className="page-heading">
        <div>
          <span className="eyebrow">PLAYGROUND INTERATIVO</span>
          <h1>{entry.name}</h1>
          <p>{entry.description}</p>
        </div>
        <button
          className={`button ${favorites.includes(entry.id) ? "saved" : ""}`}
          onClick={() => toggle(entry.id)}
        >
          <Heart
            size={16}
            fill={favorites.includes(entry.id) ? "currentColor" : "none"}
          />{" "}
          {favorites.includes(entry.id) ? "Favoritado" : "Favoritar"}
        </button>
      </div>
      <div className="playground">
        <section className="live-preview">
          <div className="preview-label">
            <span className="live-dot" /> Prévia ao vivo{" "}
            <span>Interaja com os itens ↓</span>
          </div>
          <Preview
            variant={entry.variant}
            settings={settings}
            title={`Prévia de ${entry.name}`}
          />
          <div className="preview-foot">
            HTML · CSS · JavaScript <span>Teclado: Tab e setas</span>
          </div>
        </section>
        <section className="properties">
          <h2>
            <SlidersHorizontal size={16} /> Personalizar
          </h2>
          <div className="color-controls">
            {(
              [
                ["primary", "Cor principal"],
                ["secondary", "Cor secundária"],
                ["background", "Fundo da barra"],
                ["icons", "Cor dos ícones"],
              ] as const
            ).map(([key, label]) => (
              <label key={key}>
                {label}
                <span>
                  <input
                    type="color"
                    value={settings[key]}
                    onChange={(e) => set(key, e.target.value)}
                  />
                  <small>{settings[key]}</small>
                </span>
              </label>
            ))}
          </div>
          {mod?.controls.filter(k=>['text','successText','tabLabels','direction'].includes(k)).map(k=><label className="range-control" key={k}>{({text:'Texto',successText:'Texto de sucesso',tabLabels:'Abas (separadas por |)',direction:'Direção'})[k as 'text']}{k==='direction'?<select aria-label="Direção" value={settings.direction} onChange={e=>set('direction',e.target.value as Settings['direction'])}>{['left','right','top','bottom'].map((v,i)=><option key={v} value={v}>{['Esquerda','Direita','Cima','Baixo'][i]}</option>)}</select>:<input aria-label={k==='text'?'Texto':k==='successText'?'Texto de sucesso':'Abas (separadas por |)'} value={String(settings[k as keyof Settings])} onChange={e=>set(k as keyof Settings,e.target.value)}/>}</label>)}
          {(mod ? [...ranges,...extraRanges].filter(([k])=>mod.controls.includes(k)) : ranges)
            .filter(
              ([key]) =>
                !!mod || key !== "intensity" ||
                ["slide", "liquid", "float", "bubble"].includes(entry.variant),
            )
            .map(([key, label, min, max, step, unit]) => (
              <label className="range-control" key={key}>
                <span>
                  {label}
                  <output>
                    {settings[key]}
                    {unit}
                  </output>
                </span>
                <input
                  type="range"
                  aria-label={label}
                  min={min}
                  max={max}
                  step={step}
                  value={settings[key]}
                  onChange={(e) => set(key, Number(e.target.value))}
                />
              </label>
            ))}
          <button
            className="button reset"
            onClick={() => setSettings({ ...defaults })}
          >
            <RotateCcw size={14} /> Restaurar padrão
          </button>
        </section>
      </div>
      <CodePanel variant={entry.variant} settings={settings} />
    </>
  );
}

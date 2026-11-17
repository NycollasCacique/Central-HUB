import { useMemo, useRef, useEffect } from "react";
import { generate } from "../utils/generate";
import { defaults, type Settings, type Variant } from "../registry/catalog";
export function Preview({
  variant,
  settings = defaults,
  title = "Menu interativo",
}: {
  variant: Variant;
  settings?: Settings;
  title?: string;
}) {
  const frame = useRef<HTMLIFrameElement>(null);
  const dynamicProgress = variant === 'progresso-circular';
  const stableSettings = JSON.stringify(dynamicProgress ? {...settings,value:0} : settings);
  const document = useMemo(
    () => generate(variant, {...JSON.parse(stableSettings),value:settings.value})["Código completo"],
    [variant, stableSettings],
  );
  const update = () => { if(dynamicProgress) frame.current?.contentWindow?.postMessage({type:'hub-progress',value:settings.value},'*'); };
  useEffect(update,[dynamicProgress,settings.value,document]);
  return (
    <iframe
      ref={frame}
      onLoad={update}
      title={title}
      sandbox="allow-scripts"
      srcDoc={document}
      className="preview-frame"
    />
  );
}

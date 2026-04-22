import { useEffect, useRef, useState } from 'react';

const BASE_WIDTH = 1280;
const BASE_HEIGHT = 840;

function PreviewPanel({ finalHtml }) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateScale = () => {
      const width = containerRef.current?.clientWidth || BASE_WIDTH;
      const next = Math.min(1, width / BASE_WIDTH);
      setScale(next);
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="panel preview-panel">
      <header className="panel-header compact">
        <h2>Vista previa</h2>
        <p>Aquí puede revisar cómo quedará su menú.</p>
      </header>

      <div className="preview-outer" ref={containerRef}>
        <div className="preview-stage" style={{ height: `${BASE_HEIGHT * scale}px` }}>
          <iframe
            id="preview_frame"
            title="Vista previa del menú"
            srcDoc={finalHtml}
            style={{
              width: `${BASE_WIDTH}px`,
              height: `${BASE_HEIGHT}px`,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default PreviewPanel;

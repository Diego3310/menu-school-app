import { useEffect, useState } from 'react';
import { getTemplatePath } from '../config/template';
import { loadTemplateHtml } from '../services/templateService';

export function useTemplate() {
  const [templateHtml, setTemplateHtml] = useState('');
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const html = await loadTemplateHtml(getTemplatePath());
        setTemplateHtml(html);
      } catch {
        setLoadError('No se pudo cargar la plantilla. Revise la ruta en getTemplatePath().');
        setTemplateHtml('<html><body><h2>Error cargando plantilla</h2></body></html>');
      }
    };

    load();
  }, []);

  return { templateHtml, loadError };
}

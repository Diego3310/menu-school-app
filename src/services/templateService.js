export async function loadTemplateHtml(templatePath) {
  const response = await fetch(templatePath);
  if (!response.ok) {
    throw new Error('No se pudo cargar la plantilla');
  }
  return response.text();
}

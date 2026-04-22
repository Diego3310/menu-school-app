# Menu Builder (React + Vite)

Proyecto React para editar el menú escolar y generar PDF usando la plantilla `menu-template.html`.

Notas de comportamiento:

- Los días están fijos de **lunes a viernes** (no se configuran en UI).
- El rango de semana se define con selector de fechas (`inicio` y `fin`).
- En costos, el usuario escribe solo el monto y la app agrega automáticamente `S/`.
- La opción **a la carta** está desactivada por defecto y puede activarse con un check.
- La salida PDF se hace con captura visual (`html2canvas` + `jsPDF`) en formato **A4 horizontal** para mantener el diseño lo más fiel posible al preview.
- Los iconos de Yape y Plin se cargan automáticamente desde `public/yape.png` y `public/plin.png`.
- El ícono de WhatsApp para el teléfono se carga desde `public/wsp.webp`.
- El logo escolar se fija automáticamente desde `public/escolar.png` (no editable en el formulario).

## Requisitos

- Node.js 18+
- npm

## Ejecutar en local

```bash
npm install
npm run dev
```

## Build para producción

```bash
npm run build
npm run preview
```

## Deploy en GitHub Pages

```bash
npm run build
npm run deploy
```

## Estructura (mejores prácticas)

- `src/components/`: componentes de interfaz (una responsabilidad por componente).
- `src/hooks/`: lógica de negocio y estado (`useTemplate`, `useMenuBuilder`).
- `src/services/`: acceso a datos externos (carga de plantilla).
- `src/utils/`: utilidades puras (placeholders, exportación, agrupación).
- `src/domain/`: constantes y modelos base del dominio del menú.
- `src/config/`: configuración de rutas.

## Configuración de plantilla (backoffice)

La app toma la plantilla desde `public/menu-template.html`.

Ruta configurable en:

- `src/config/template.js`
- función `getTemplatePath()`

Ejemplo actual:

```js
export function getTemplatePath() {
  return `${import.meta.env.BASE_URL}menu-template.html`;
}
```

Si su backoffice mueve la plantilla, solo cambie esa función.

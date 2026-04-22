import { DAY_KEYS } from '../domain/days';

export function createItemId() {
  return `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

function collectByType(items, day) {
  return {
    menu: items.filter((item) => item.day === day && item.type === 'menu'),
    carta: items.filter((item) => item.day === day && item.type === 'carta'),
  };
}

function normalizeItemText(value) {
  return String(value ?? '')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function toStablePreviewText(value) {
  // Usamos espacio no separable + salto opcional para evitar que html2canvas
  // "coma" espacios en la exportación PDF.
  return escapeHtml(value).replaceAll(' ', '&nbsp;<wbr>');
}

function joinLine(item) {
  const dishText = toStablePreviewText(normalizeItemText(item.dish));
  const drinkText = toStablePreviewText(normalizeItemText(item.drink));

  return `
    <div style="display:flex;flex-direction:column;gap:2px;align-items:center;">
      <span style="white-space:normal;word-break:normal;overflow-wrap:break-word;">${dishText}</span>
      <span style="font-weight:600;color:#475569;white-space:normal;word-break:normal;overflow-wrap:break-word;">${drinkText}</span>
    </div>
  `;
}

function buildSection(title, titleHint, colorBg, colorText, rows) {
  if (rows.length === 0) return '';

  const lines = rows
    .map((item) => `<div style="font-size:13px;line-height:1.35;">${joinLine(item)}</div>`)
    .join('');

  return `
    <div style="display:flex;flex-direction:column;gap:6px;">
      <span title="${titleHint}"
        style="display:inline-block;align-self:center;padding:4px 10px;border-radius:999px;background:${colorBg};color:${colorText};font-size:12px;font-weight:700;">
        ${title}
      </span>
      ${lines}
    </div>
  `;
}

function buildDaySlot(itemsOfDay) {
  const menuBlock = buildSection(
    'Menú',
    'Para menú del día',
    '#e0f2fe',
    '#0c4a6e',
    itemsOfDay.menu,
  );

  const cartaBlock = buildSection(
    'Plato a la carta',
    'Disponible como plato a la carta',
    '#fef3c7',
    '#92400e',
    itemsOfDay.carta,
  );

  return `<div style="display:flex;flex-direction:column;gap:10px;text-align:center;">${menuBlock}${cartaBlock}</div>`;
}

export function buildPreviewSlotsByDay(items) {
  const slots = {};

  DAY_KEYS.forEach((day) => {
    const grouped = collectByType(items, day);
    slots[day] = buildDaySlot(grouped);
  });

  return slots;
}

export function buildEmptyDrinksByDay() {
  const drinks = {};
  DAY_KEYS.forEach((day) => {
    drinks[day] = '';
  });
  return drinks;
}

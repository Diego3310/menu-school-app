export function formatSolesAmount(amount, label) {
  if (amount == null || String(amount).trim() === '') return '';
  const clean = String(amount).replace(',', '.').trim();
  return `${label}: S/${clean}`;
}

function formatDateShort(value) {
  if (!value) return '';
  const parts = value.split('-');
  if (parts.length !== 3) return value;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

export function formatWeekRangeLabel(startDate, endDate) {
  const start = formatDateShort(startDate);
  const end = formatDateShort(endDate);

  if (start && end) return `Semana del ${start} al ${end}`;
  if (start) return `Desde ${start}`;
  if (end) return `Hasta ${end}`;
  return '';
}

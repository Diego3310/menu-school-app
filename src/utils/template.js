export function replacePlaceholders(template, data) {
  return template.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, path) => {
    const value = path.split('.').reduce((acc, key) => (acc && key in acc ? acc[key] : ''), data);
    return value == null ? '' : String(value);
  });
}

export function removeDrinksRowFromTemplate(template) {
  const pattern =
    /<tr>\s*<td>\s*\{\{drinks\.monday\}\}\s*<\/td>\s*<td>\s*\{\{drinks\.tuesday\}\}\s*<\/td>\s*<td>\s*\{\{drinks\.wednesday\}\}\s*<\/td>\s*<td>\s*\{\{drinks\.thursday\}\}\s*<\/td>\s*<td>\s*\{\{drinks\.friday\}\}\s*<\/td>\s*<\/tr>/s;
  return template.replace(pattern, '');
}

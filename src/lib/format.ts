export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function formatIsoDay(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function formatMonthYear(date: Date) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(date);
}

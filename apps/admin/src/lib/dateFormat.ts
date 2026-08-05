// Several pages in this app store dates as "DD/MM/YYYY" display strings.
// DatePicker works in ISO ("yyyy-MM-dd"), so convert at the boundary.

export function ddmmyyyyToIso(dateStr: string): string {
  const [d, m, y] = dateStr.split('/');
  if (!d || !m || !y) return '';
  return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
}

export function isoToDdmmyyyy(iso: string): string {
  const [y, m, d] = iso.split('-');
  if (!d || !m || !y) return '';
  return `${d}/${m}/${y}`;
}

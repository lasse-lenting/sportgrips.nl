const dateFormatter = new Intl.DateTimeFormat('nl-NL', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

/** Formats an ISO date (YYYY-MM-DD) as "13 september 2026". */
export function formatDate(isoDate: string) {
  return dateFormatter.format(new Date(`${isoDate}T12:00:00Z`));
}

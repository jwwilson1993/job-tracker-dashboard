export function formatDate(dateString) {
  if (!dateString) {
    return 'Not set';
  }

  const date = new Date(`${dateString}T00:00:00`);

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}
export function exportApplicationsToCSV(applications) {
  if (!applications.length) {
    return;
  }

  const headers = ['Company', 'Role', 'Status', 'Date Applied', 'Notes'];

  const rows = applications.map((application) => [
    application.company,
    application.role,
    application.status,
    application.dateApplied || '',
    application.notes || ''
  ]);

  const csvContent = [headers, ...rows]
    .map((row) =>
      row
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(',')
    )
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'job-applications.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
import './DashboardStats.css';

function DashboardStats({ applications }) {
  const total = applications.length;
  const applied = applications.filter((app) => app.status === 'Applied').length;
  const interview = applications.filter((app) => app.status === 'Interview').length;
  const rejected = applications.filter((app) => app.status === 'Rejected').length;
  const offer = applications.filter((app) => app.status === 'Offer').length;

  return (
    <section className="dashboard-stats">
      <div className="stat-card">
        <h3>Total</h3>
        <p>{total}</p>
      </div>

      <div className="stat-card">
        <h3>Applied</h3>
        <p>{applied}</p>
      </div>

      <div className="stat-card">
        <h3>Interview</h3>
        <p>{interview}</p>
      </div>

      <div className="stat-card">
        <h3>Rejected</h3>
        <p>{rejected}</p>
      </div>

      <div className="stat-card">
        <h3>Offer</h3>
        <p>{offer}</p>
      </div>
    </section>
  );
}

export default DashboardStats;
import './ApplicationCard.css';
import { formatDate } from '../../utils/formatDate';

function ApplicationCard({
  application,
  onDeleteApplication,
  onEditApplication
}) {
  const { company, role, status, dateApplied, notes } = application;

  return (
    <article className="application-card">
      <div className="application-card-header">
        <div className="application-main">
          <h3>{company}</h3>
          <p className="role">{role}</p>
        </div>

        <span className={`status-badge status-${status.toLowerCase()}`}>
          {status}
        </span>
      </div>

      <div className="application-meta">
        <div className="meta-item">
          <span className="meta-label">Date Applied</span>
          <span className="meta-value">{formatDate(dateApplied)}</span>
        </div>
      </div>

      <div className="notes-block">
        <span className="meta-label">Notes</span>
        <p className="notes-text">{notes || 'No notes yet'}</p>
      </div>

      <div className="card-actions">
        <button
          className="edit-button"
          onClick={() => onEditApplication(application)}
        >
          Edit
        </button>

        <button
          className="delete-button"
          onClick={() => onDeleteApplication(application)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default ApplicationCard;
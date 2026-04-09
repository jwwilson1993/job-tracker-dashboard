import './ApplicationList.css';
import ApplicationCard from '../ApplicationCard/ApplicationCard';

function ApplicationList({
  applications,
  onDeleteApplication,
  onEditApplication
}) {
  return (
    <section className="application-list-section">
      <h2>Applications</h2>

      {applications.length === 0 ? (
        <p className="empty-message">
            No applications yet.
             <br />
            Start by adding one above.
            </p>
                ) : (
        <div className="application-list">
          {applications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              onDeleteApplication={onDeleteApplication}
              onEditApplication={onEditApplication}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ApplicationList;
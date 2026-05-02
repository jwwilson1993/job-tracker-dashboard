import './ApplicationList.css';
import ApplicationCard from '../ApplicationCard/ApplicationCard';

function ApplicationList({
  applications,
  onDeleteApplication,
  onEditApplication
}) {
  return (
    <div className="application-list-section">
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
    </div>
  );
}

export default ApplicationList;
import { useEffect, useMemo, useState } from 'react';
import './App.css';

import ApplicationForm from './components/ApplicationForm/ApplicationForm';
import FilterBar from './components/FilterBar/FilterBar';
import DashboardStats from './components/DashboardStats/DashboardStats';
import ApplicationList from './components/ApplicationList/ApplicationList';
import Toast from './components/Toast/Toast';
import StatusChart from './components/StatusChart/StatusChart';
import ConfirmModal from './components/ConfirmModal/ConfirmModal';

import starterData from './data/starterData';
import { loadApplications, saveApplications } from './utils/storage';
import { exportApplicationsToCSV } from './utils/exportApplications';
import { loadTheme, saveTheme } from './utils/themeStorage';

function App() {
  const [applications, setApplications] = useState(() => {
    const savedApplications = loadApplications();
    return savedApplications || starterData;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [editingApplication, setEditingApplication] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState(null);
  const [theme, setTheme] = useState(() => loadTheme());
  const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false);

  useEffect(() => {
    saveApplications(applications);
  }, [applications]);

  useEffect(() => {
    saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (!toastMessage) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setToastMessage('');
    }, 2500);

    return () => clearTimeout(timeoutId);
  }, [toastMessage]);

  const showToast = (message) => {
    setToastMessage(message);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const addApplication = (newApplication) => {
    setApplications((prevApplications) => [
      { ...newApplication, id: Date.now() },
      ...prevApplications
    ]);

    showToast('Application added.');
  };

  const updateApplication = (updatedApplication) => {
    setApplications((prevApplications) =>
      prevApplications.map((application) =>
        application.id === updatedApplication.id ? updatedApplication : application
      )
    );

    setEditingApplication(null);
    showToast('Changes saved.');
  };

  

const requestDeleteApplication = (application) => {
  setApplicationToDelete(application);
};

const confirmDeleteApplication = () => {
  if (!applicationToDelete) return;

  setApplications((prevApplications) =>
    prevApplications.filter(
      (application) => application.id !== applicationToDelete.id
    )
  );

  if (editingApplication?.id === applicationToDelete.id) {
    setEditingApplication(null);
  }

  setApplicationToDelete(null);
  showToast('Application deleted.');
};

  const cancelDeleteApplication = () => {
    setApplicationToDelete(null);
  };

  const resetDemoData = () => {
    setApplications(starterData);
    setEditingApplication(null);
    setSearchTerm('');
    setStatusFilter('All');
    setApplicationToDelete(null);
    setIsActionsMenuOpen(false);
    showToast('Demo data restored.');
  };

  const openClearModal = () => {
    setIsActionsMenuOpen(false);
    setIsClearModalOpen(true);
  };

  const closeClearModal = () => {
    setIsClearModalOpen(false);
  };

  const confirmClearAllApplications = () => {
    setApplications([]);
    setEditingApplication(null);
    setApplicationToDelete(null);
    setIsClearModalOpen(false);
    showToast('All applications cleared.');
  };

  const handleExportCSV = () => {
    if (!applications.length) {
      showToast('No applications to export.');
      return;
    }

    exportApplicationsToCSV(applications);
    setIsActionsMenuOpen(false);
    showToast('CSV exported.');
  };

  const filteredApplications = useMemo(() => {
    const filtered = applications.filter((application) => {
      const matchesSearch =
        application.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        application.role.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === 'All' || application.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    return filtered.sort((a, b) => {
      if (!a.dateApplied && !b.dateApplied) return b.id - a.id;
      if (!a.dateApplied) return 1;
      if (!b.dateApplied) return -1;

      return new Date(b.dateApplied) - new Date(a.dateApplied);
    });
  }, [applications, searchTerm, statusFilter]);

  return (
    <div className={`app ${theme}`}>
      <Toast message={toastMessage} />

      <ConfirmModal
        isOpen={isClearModalOpen}
        title="Clear all applications?"
        message="This will permanently remove all tracked applications from the dashboard."
        confirmText="Clear All"
        cancelText="Keep Them"
        onConfirm={confirmClearAllApplications}
        onCancel={closeClearModal}
      />

      <ConfirmModal
        isOpen={Boolean(applicationToDelete)}
        title="Delete this application?"
        message={
          applicationToDelete
            ? `Remove ${applicationToDelete.role || 'this role'} at ${applicationToDelete.company || 'this company'} from the dashboard?`
            : ''
        }
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDeleteApplication}
        onCancel={() => setApplicationToDelete(null)}
      />

      <header className="app-header">
        <div className="header-top">
          <div className="header-text">
            <h1>Hireflow</h1>
            <p className="subtitle">
              Track applications, interviews, and offers in one place.
            </p>
          </div>

          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </header>

      <main className="app-main">
        <DashboardStats applications={applications} />

        <section className="top-section">
          <ApplicationForm
            onAddApplication={addApplication}
            onUpdateApplication={updateApplication}
            editingApplication={editingApplication}
            onCancelEdit={() => setEditingApplication(null)}
          />
        </section>

        <section className="applications-section" aria-labelledby="applications-heading">
          <div className="applications-section-toolbar">
            <h2 id="applications-heading" className="applications-section-title">
              Applications
            </h2>
            <div className="applications-toolbar-actions">
              <FilterBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
              />

              <div className="actions-menu" aria-label="Dashboard actions">
                <button
                  className="actions-menu-trigger"
                  type="button"
                  aria-label="Open dashboard actions"
                  aria-haspopup="menu"
                  aria-expanded={isActionsMenuOpen}
                  onClick={() => setIsActionsMenuOpen((isOpen) => !isOpen)}
                >
                  <span className="actions-menu-dots" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </span>
                </button>

                {isActionsMenuOpen && (
                  <div className="actions-menu-panel" role="menu">
                    <button type="button" role="menuitem" onClick={resetDemoData}>
                      Reset Demo Data
                    </button>

                    <button type="button" role="menuitem" onClick={handleExportCSV}>
                      Export CSV
                    </button>

                    <button
                      type="button"
                      role="menuitem"
                      className="actions-menu-danger"
                      onClick={openClearModal}
                    >
                      Clear All Applications
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <ApplicationList
            applications={filteredApplications}
            onDeleteApplication={requestDeleteApplication}
            onEditApplication={setEditingApplication}
          />
        </section>

        <StatusChart applications={applications} theme={theme} />
      </main>
    </div>
  );
}

export default App;

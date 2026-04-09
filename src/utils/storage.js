const STORAGE_KEY = 'jobTrackerApplications';

export const saveApplications = (applications) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
};

export const loadApplications = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : null;
};
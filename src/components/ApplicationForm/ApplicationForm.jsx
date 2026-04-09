import { useEffect, useState } from 'react';
import './ApplicationForm.css';

const emptyForm = {
  company: '',
  role: '',
  status: 'Applied',
  dateApplied: '',
  notes: ''
};

function ApplicationForm({
  onAddApplication,
  onUpdateApplication,
  editingApplication,
  onCancelEdit
}) {
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (editingApplication) {
      setFormData(editingApplication);
    } else {
      setFormData(emptyForm);
    }
  }, [editingApplication]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.company.trim() || !formData.role.trim()) {
      return;
    }

    if (editingApplication) {
      onUpdateApplication(formData);
    } else {
      onAddApplication(formData);
      setFormData(emptyForm);
    }
  };

  return (
    <section className="application-form-section">
      <h2>{editingApplication ? 'Edit Application' : 'Add Application'}</h2>

      <form className="application-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
        />

        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
          <option value="Offer">Offer</option>
        </select>

        <input
          type="date"
          name="dateApplied"
          value={formData.dateApplied}
          onChange={handleChange}
        />

        <textarea
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
          rows="4"
        />

        <button
            type="submit"
            disabled={!formData.company.trim() || !formData.role.trim()}
>
            {editingApplication ? 'Save Changes' : 'Add Application'}
            </button>
        
      </form>
    </section>
  );
}

export default ApplicationForm;
import './FilterBar.css';

function FilterBar({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter
}) {
  return (
    <section className="filter-bar">
      <h2>Filter Applications</h2>

      <input
        type="text"
        placeholder="Search by company or role"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <select
        value={statusFilter}
        onChange={(event) => setStatusFilter(event.target.value)}
      >
        <option value="All">All Statuses</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Rejected">Rejected</option>
        <option value="Offer">Offer</option>
      </select>
    </section>
  );
}

export default FilterBar;
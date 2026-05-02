import './FilterBar.css';

function FilterBar({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter
}) {
  return (
    <div className="filter-bar" role="search">
      <div className="filter-bar-controls">
        <label className="visually-hidden" htmlFor="application-search">
          Search by company or role
        </label>
        <input
          id="application-search"
          className="filter-bar-search"
          type="text"
          placeholder="Search by company or role"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <label className="visually-hidden" htmlFor="application-status-filter">
          Filter by status
        </label>
        <select
          id="application-status-filter"
          className="filter-bar-status"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
          <option value="Offer">Offer</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;
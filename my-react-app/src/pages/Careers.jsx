
import { useState } from "react";
import { Link } from "react-router-dom";
import { jobs } from "../data/jobs";
import "./Careers.css"

export default function Careers() {
  const [searchItem, setSearchItem] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");

  // function to reset all filters 
  const resetFilters = () => {
    setSearchItem("");
    setDepartmentFilter("");
    setLocationFilter("");
    setLevelFilter("");
  };

  // Filtering the jobs 
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchItem.toLowerCase()) ||
      job.tags.some((tag) =>
        tag.toLowerCase().includes(searchItem.toLowerCase())
      );
//filtering based on department, level and location
    const matchesDepartment = departmentFilter? job.department === departmentFilter: true;
    const matchesLocation = locationFilter ? job.location === locationFilter : true;
    const matchesLevel = levelFilter ? job.level === levelFilter : true;
    return matchesSearch && matchesDepartment && matchesLocation && matchesLevel;
  });

  return (
    <div>
       <h1 className="title">Join Barabari</h1>
      <p className="subtitle">"We're a tech & design partner. Build products that matter."</p>

      <input
        type="text"
        placeholder="Search roles (e.g., React, design)"
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
        className="searchBar"
      />

     
      <div className="filters">
        <select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)}>
          <option value="">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="Design">Design</option>
          <option value="Product">Product</option>
        </select>

        <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
          <option value="">All Locations</option>
          <option value="Hyderabad (IN)">Hyderabad (IN)</option>
          <option value="Remote (IN)">Remote (IN)</option>
        </select>

        <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}>
          <option value="">All Levels</option>
          <option value="Intern">Intern</option>
          <option value="Junior">Junior</option>
          <option value="Mid">Mid</option>
          <option value="Senior">Senior</option>
        </select>

        <button onClick={resetFilters}>Reset Filters</button>
      </div>

      {/* Job Cards */}
      <div className="jobList">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job.id} className="jobCard">
              <h3>{job.title} | {job.level}</h3>
              <p>Location: {job.location}</p>
              <p>{job.summary}</p>
              <div className="tags">
                {job.tags.map((tag)=>(
                    <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <button>
                <Link to={`/careers/${job.id}`}>View / Apply</Link>
              </button>
            </div>
          ))
        ) : (
          <p className="noResults">No jobs match your search or filters.</p>
        )}
      </div>
    </div>
  );
}


import { useParams, Link } from "react-router-dom";
import { jobs } from "../data/jobs";
import { useState, useRef } from "react";
import "./jobDetails.css";

export default function JobDetail() {
  const { jobId } = useParams();
  const job = jobs.find((job) => job.id === jobId);

  const [showForm, setShowForm] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    portfolio: "",
    resume: null,
    coverLetter: "",
    location: "",
    notice: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const inputRefs = {
    name: useRef(null),
    email: useRef(null),
    phone: useRef(null),
    portfolio: useRef(null),
    coverLetter: useRef(null),
    location: useRef(null),
    notice: useRef(null),
  };

  // Validation function
  const validate = (values = formValues) => {
    const newErrors = {};
    if (!values.name.trim()) newErrors.name = "Full Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      newErrors.email = "Please enter a valid email";
    if (!/^\d{10}$/.test(values.phone))
      newErrors.phone = "Phone number must be 10 digits";
    if (!values.coverLetter.trim())
      newErrors.coverLetter = "Cover Letter is required";
    if (!values.location)
      newErrors.location = "Preferred Location is required";
    if (!values.notice) newErrors.notice = "Notice Period is required";
    return newErrors;
  };

  const handleChange = (field, value) => {
    setFormValues({ ...formValues, [field]: value });

    // Validate this field on change
    const fieldErrors = validate({ ...formValues, [field]: value });
    setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] || "" }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const fieldErrors = validate(formValues);
    setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] || "" }));
  };

  const handleKeyDown = (e, fieldName) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const order = [
        "name",
        "email",
        "phone",
        "portfolio",
        "coverLetter",
        "location",
        "notice",
      ];
      const currentIndex = order.indexOf(fieldName);
      if (currentIndex !== -1 && currentIndex < order.length - 1) {
        const nextField = order[currentIndex + 1];
        inputRefs[nextField]?.current?.focus();
      }
    }
  };

  const handleApplyClick = () => {
    setSubmitted(false); // reset submitted when opening the form
    if (!showForm) {
      setShowForm(true);
      setTimeout(() => inputRefs.name.current?.focus(), 100);
    } else {
      setFormValues({
        name: "",
        email: "",
        phone: "",
        portfolio: "",
        resume: null,
        coverLetter: "",
        location: "",
        notice: "",
      });
      setErrors({});
      setTouched({});
      setShowForm(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);

    // mark all fields as touched
    setTouched({
      name: true,
      email: true,
      phone: true,
      portfolio: true,
      coverLetter: true,
      location: true,
      notice: true,
    });

    if (Object.keys(newErrors).length > 0) {
      // stop submission if there are errors
      return;
    }

    // Save to localStorage
    const savedApplications =
      JSON.parse(localStorage.getItem("applications") || "[]");
    savedApplications.push({
      jobId,
      ...formValues,
      resume: formValues.resume ? formValues.resume.name : null,
    });
    localStorage.setItem("applications", JSON.stringify(savedApplications));

    setSubmitted(true);
    console.log("Application submitted:", formValues);

    // Reset form after successful submission
    setFormValues({
      name: "",
      email: "",
      phone: "",
      portfolio: "",
      resume: null,
      coverLetter: "",
      location: "",
      notice: "",
    });
    setErrors({});
    setTouched({});
    setShowForm(false);
  };

  const fields = [
    { name: "name", label: "Full Name", type: "text", placeholder: "Enter your full name" },
    { name: "email", label: "Email", type: "email", placeholder: "Enter your email" },
    { name: "phone", label: "Phone", type: "tel", placeholder: "Enter your phone" },
    { name: "portfolio", label: "Portfolio / Website", type: "url", placeholder: "https://..." },
    { name: "resume", label: "Resume", type: "file" },
    { name: "coverLetter", label: "Cover Letter", type: "textarea" },
    { name: "location", label: "Preferred Location", type: "select", options: ["Hyderabad (IN)", "Remote (IN)"] },
    { name: "notice", label: "Notice Period", type: "select", options: ["Immediate", "15 days", "30 days", "60 days"] },
  ];

  return (
    <div className="jobDetail">
      {/* Job Info */}
      <div className="jobHeader">
        <h3>{job.title} | {job.level}</h3>
        <p><b>Location</b>: {job.location}</p>
        <p><b>Department</b>: {job.department}</p>
        <div className="tags">
          <b>Tags</b>: {job.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
        </div>
        <p><b>Summary</b>: {job.summary}</p>
        <p><b>Description</b>: {job.description}</p>
        <p><b>Posted At</b>: {job.postedAt}</p>
      </div>

      {/* Sections */}
      <section className="jobSection">
        <h3>About Role</h3>
        <p>{job.about}</p>
      </section>
      <section className="jobSection">
        <h3>Responsibilities</h3>
        <ul>{job.responsibilities.map((item, idx) => <li key={idx}>{item}</li>)}</ul>
      </section>
      <section className="jobSection">
        <h3>Skills</h3>
        <ul>{job.skills.map((item, idx) => <li key={idx}>{item}</li>)}</ul>
      </section>
      <section className="jobSection">
        <h3>About Us</h3>
        <p>
          Barabari Collective democratizes freelancing opportunities for candidates from low-income, semi-urban, and rural communities through an earn-as-you-learn project-based upskilling program.
        </p>
        <a href="https://www.barabaricollective.org/">The Barabari Collective</a>
      </section>

      {/* Buttons */}
      <div className="jobButtons">
        <Link to="/careers"><button>Go Back to Careers</button></Link>
        {!submitted && <button onClick={handleApplyClick}>{showForm ? "Cancel" : "Apply"}</button>}
      </div>

      {/* Form */}
      {showForm && !submitted && (
        <form className="jobForm" onSubmit={handleSubmit}>
          {fields.map(field => (
            <div key={field.name}>
              <label>{field.label}</label>

              {field.type === "textarea" ? (
                <textarea
                  value={formValues[field.name]}
                  ref={inputRefs[field.name]}
                  onChange={e => handleChange(field.name, e.target.value)}
                  onBlur={() => handleBlur(field.name)}
                  onKeyDown={e => handleKeyDown(e, field.name)}
                />
              ) : field.type === "select" ? (
                <select
                  value={formValues[field.name]}
                  ref={inputRefs[field.name]}
                  onChange={e => handleChange(field.name, e.target.value)}
                  onBlur={() => handleBlur(field.name)}
                  onKeyDown={e => handleKeyDown(e, field.name)}
                >
                  <option value="">Select</option>
                  {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              ) : (
                <input
                  type={field.type}
                  value={field.type === "file" ? undefined : formValues[field.name]}
                  ref={inputRefs[field.name]}
                  onChange={e => handleChange(field.name, field.type === "file" ? e.target.files[0] : e.target.value)}
                  onBlur={() => handleBlur(field.name)}
                  placeholder={field.placeholder}
                  onKeyDown={e => handleKeyDown(e, field.name)}
                />
              )}

              {field.type === "file" && formValues.resume && <p>Selected file: {formValues.resume.name}</p>}

              {(touched[field.name] || submitted) && errors[field.name] && (
                <p className="error">{errors[field.name]}</p>
              )}
            </div>
          ))}

          <button type="submit">Submit Application</button>
        </form>
      )}

      {/* Success state */}
      {submitted && (
        <div className="success">
          <h3>Application received 🎉</h3>
          <p>Thanks for applying to <b>{job.title}</b>. We’ll get back to you soon.</p>
        </div>
      )}
    </div>
  );
}

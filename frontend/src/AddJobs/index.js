import React, { useState } from "react";
import Header from "../Header";
import "./index.css";

const AddJob = () => {
  const [companyName, setCompanyName] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [mode, setMode] = useState("");
  const [stipend, setStipend] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const handleChangeCompanyName = (event) => {
    setCompanyName(event.target.value);
  };

  const handleChangeJobLocation = (event) => {
    setJobLocation(event.target.value);
  };

  const handleChangeJobRole = (event) => {
    setJobRole(event.target.value);
  };

  const handleChangeMode = (event) => {
    setMode(event.target.value);
  };

  const handleChangeStipend = (event) => {
    setStipend(event.target.value);
  };

  const handleChangeJobDescription = (event) => {
    setJobDescription(event.target.value);
  };

  const addJobBtn = async (event) => {
    event.preventDefault();
    const jobDetails = {
      companyName,
      jobLocation,
      jobRole,
      mode,
      stipend,
      jobDescription,
    };
    console.log(jobDetails);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobDetails),
    };
    const response = await fetch("http://localhost:3000/job-listings", options);
    if (response.ok) {
      alert("Job Added Successfully!");
      setCompanyName("");
      setJobLocation("");
      setJobRole("");
      setMode("");
      setStipend("");
      setJobDescription("");
    } else {
      alert("Failed to add job. Please try again.");
    }
  };

  return (
    <div className="addjob-page-bg-container">
      <Header />
      <div className="addjob-page-container">
        <form className="form-container" onSubmit={addJobBtn}>
          <label>Company Name:</label>
          <input
            type="text"
            value={companyName}
            onChange={handleChangeCompanyName}
          />
          <label>Job Location</label>
          <input
            type="text"
            value={jobLocation}
            onChange={handleChangeJobLocation}
          />
          <label>Job Role:</label>
          <input type="text" value={jobRole} onChange={handleChangeJobRole} />
          <label>Mode</label>
          <input type="text" value={mode} onChange={handleChangeMode} />
          <label>Stipend</label>
          <input type="text" value={stipend} onChange={handleChangeStipend} />
          <label>Job Description:</label>
          <input
            type="text"
            value={jobDescription}
            onChange={handleChangeJobDescription}
          />
          <button type="submit" className="btn btn-dark">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJob;

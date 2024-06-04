import React, { useState } from "react";
import "./index.css";
import EmailVerification from "./EmailVerification";

const AddJob = () => {
  const [companyName, setCompanyName] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [mode, setMode] = useState("");
  const [stipend, setStipend] = useState("");
  const [jobDescription, setJobDescription] = useState("");

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
    const response = await fetch("http://localhost:8000/jobs", options);
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
      <EmailVerification />
      <div className="addjob-page-container">
        <form className="form-container" onSubmit={addJobBtn}>
          <label>Company Name:</label>
          <input
            type="text"
            value={companyName}
            onChange={(event) => {
              setCompanyName(event.target.value);
            }}
          />
          <label>Job Location</label>
          <input
            type="text"
            value={jobLocation}
            onChange={(event) => {
              setJobLocation(event.target.value);
            }}
          />
          <label>Job Role:</label>
          <input
            type="text"
            value={jobRole}
            onChange={(event) => {
              setJobRole(event.target.value);
            }}
          />
          <label>Mode</label>
          <input
            type="text"
            value={mode}
            onChange={(event) => {
              setMode(event.target.value);
            }}
          />
          <label>Stipend</label>
          <input
            type="text"
            value={stipend}
            onChange={(event) => {
              setStipend(event.target.value);
            }}
          />
          <label>Job Description:</label>
          <input
            type="text"
            value={jobDescription}
            onChange={(event) => {
              setJobDescription(event.target.value);
            }}
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

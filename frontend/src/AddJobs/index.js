import React, { useState } from "react";
import "./index.css";
import EmailVerification from "./EmailVerification";

const AddJob = () => {
  const [companyName, setCompanyName] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [mode, setMode] = useState("");
  const [stipend, setStipend] = useState("");
  const [companyOverview, setCompanyOverview] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [jobPostingDate, setJobPostingDate] = useState(Date);
  const [applicationDeadline, setApplicationDeadline] = useState(Date);
  const [applicationProcess, setApplicationProcess] = useState([]);
  const [jobDuraion, setJobDuration] = useState("");
  const [workHours, setWorkHours] = useState("");
  const [benefits, setBenefits] = useState([]);
  const [skills, setSkills] = useState([]);

  const addJobBtn = async (event) => {
    event.preventDefault();
    const jobDetails = {
      companyName,
      jobLocation,
      jobRole,
      jobType,
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
      setJobType("");
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
          <div>
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
            <label>Job Type:</label>
            <input
              type="text"
              value={jobType}
              onChange={(event) => {
                setJobType(event.target.value);
              }}
            />
            <label>Mode :</label>
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
            <label>Company Overview:</label>
            <input
              type="text"
              value={companyOverview}
              onChange={(event) => {
                setCompanyOverview(event.target.value);
              }}
            />
            <label>Qualifications</label>
            <input
              type="text"
              value={qualifications}
              onChange={(event) => {
                setQualifications(event.target.value);
              }}
            />
            <label>Company Name:</label>
            <input
              type="text"
              value={companyName}
              onChange={(event) => {
                setCompanyName(event.target.value);
              }}
            />
            <label>Experience Level:</label>
            <input
              type="text"
              value={experienceLevel}
              onChange={(event) => {
                setExperienceLevel(event.target.value);
              }}
            />
            <label>Education Level Name:</label>
            <input
              type="text"
              value={educationLevel}
              onChange={(event) => {
                setEducationLevel(event.target.value);
              }}
            />
          </div>
          <div>
            <label>Job Posting Date:</label>
            <input
              type="date"
              value={jobPostingDate}
              onChange={(event) => {
                setJobPostingDate(event.target.value);
              }}
            />
            <label>Application Deadline:</label>
            <input
              type="date"
              value={applicationDeadline}
              onChange={(event) => {
                setApplicationDeadline(event.target.value);
              }}
            />
            <label>Application Process:</label>
            <input
              type="text"
              value={applicationProcess}
              onChange={(event) => {
                setApplicationProcess(event.target.value);
              }}
            />
            <label>Job Duration:</label>
            <input
              type="text"
              value={jobDuraion}
              onChange={(event) => {
                setJobDuration(event.target.value);
              }}
            />
            <label>Work Hours:</label>
            <input
              type="text"
              value={workHours}
              onChange={(event) => {
                setWorkHours(event.target.value);
              }}
            />
            <label>Benefits:</label>
            <input
              type="text"
              value={benefits}
              onChange={(event) => {
                setBenefits(event.target.value);
              }}
            />
            <label>Skills:</label>
            <input
              type="text"
              value={skills}
              onChange={(event) => {
                setSkills(event.target.value);
              }}
            />
          </div>
          <button type="submit" className="btn btn-dark">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJob;

import React, { useState } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import "./index.css";

const AddJob = () => {
  const jwtToken = Cookies.get("jwt_token");
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
  const [jobPostingDate, setJobPostingDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [applicationDeadline, setApplicationDeadline] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [applicationProcess, setApplicationProcess] = useState("");
  const [jobDuration, setJobDuration] = useState("");
  const [workHours, setWorkHours] = useState("");
  const [benefits, setBenefits] = useState("");
  const [skills, setSkills] = useState("");

  const addJobBtn = async (event) => {
    event.preventDefault();
    const jobDetails = {
      companyName,
      jobRole,
      jobLocation,
      jobType,
      mode,
      stipend,
      companyOverview,
      jobDescription,
      qualifications,
      experienceLevel,
      educationLevel,
      jobPostingDate,
      applicationDeadline,
      applicationProcess,
      jobDuration,
      workHours,
      benefits,
      skills,
    };
    console.log(jobDetails);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(jobDetails),
    };
    const response = await fetch(
      "https://careerconnect-apis-cqaklzs35-nithin-ambatis-projects.vercel.app/jobs",
      options
    );
    if (response.ok) {
      alert("Job Added Successfully!");
      setCompanyName("");
      setCompanyOverview("");
      setJobLocation("");
      setJobRole("");
      setJobType("");
      setStipend("");
      setJobDescription("");
      setQualifications("");
      setExperienceLevel("");
      setEducationLevel("");
      setJobPostingDate(new Date().toISOString().split("T")[0]);
      setApplicationDeadline(new Date().toISOString().split("T")[0]);
      setApplicationProcess("");
      setJobDuration("");
      setWorkHours("");
      setBenefits("");
      setSkills("");
      await fetch(
        "https://careerconnect-apis-cqaklzs35-nithin-ambatis-projects.vercel.app/send-mail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jobRole,
            jobLocation,
            companyName,
          }),
        }
      );
    } else {
      alert("Failed to add job. Please try again.");
    }
  };

  console.log(jwtToken);

  if (jwtToken === undefined) {
    return <Navigate to="/employer/login" />;
  }
  return (
    <div className="addjob-page-bg-container">
      <div className="addjob-page-container">
        <form className="form-container" onSubmit={addJobBtn}>
          <div className="form-sub-container">
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
              <label>Job Description:</label>
              <input
                type="text"
                value={jobDescription}
                onChange={(event) => {
                  setJobDescription(event.target.value);
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
            </div>
            <div>
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
                value={jobDuration}
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

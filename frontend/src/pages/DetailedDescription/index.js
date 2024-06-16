import { useState, useEffect, useCallback } from "react";
import { Navigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

const DetailedJobDescription = () => {
  const { id } = useParams();
  const jwtToken = Cookies.get("jwt_token");
  const [jobDetails, setJobDetails] = useState({});

  const getData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://careerconnect-apis.vercel.app/jobs/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch job details");
      }
      const parsedData = await response.json();
      setJobDetails(parsedData);
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);

  const applyJobBtn = async () => {
    if (!jwtToken) {
      alert("Login to Apply jobs");
      return;
    }
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(
      `http://localhost:8000/jobs/apply/${id}`,
      options
    );
    if (!response.ok) {
      alert("Failed to apply for the job");
    } else {
      alert("Successfully applied");
    }
  };

  return (
    <div className="job-details-container">
      <h1 className="job-role">{jobDetails.jobRole}</h1>
      <p className="company-overview">{jobDetails.companyOverview}</p>
      <div className="job-info">
        <p>
          <strong>Location:</strong> {jobDetails.jobLocation}
        </p>
        <p>
          <strong>Mode:</strong> {jobDetails.jobMode}
        </p>
        <p>
          <strong>Type:</strong> {jobDetails.jobType}
        </p>
        <p>
          <strong>Stipend:</strong> {jobDetails.stipend}
        </p>
        <p>
          <strong>Description:</strong> {jobDetails.jobDescription}
        </p>
        <p>
          <strong>Qualifications:</strong> {jobDetails.qualifications}
        </p>
        <p>
          <strong>Experience Level:</strong> {jobDetails.experienceLevel}
        </p>
        <p>
          <strong>Education Level:</strong> {jobDetails.educationLevel}
        </p>
        <p>
          <strong>Posting Date:</strong> {jobDetails.jobPostingDate}
        </p>
        <p>
          <strong>Application Deadline:</strong>{" "}
          {jobDetails.applicationDeadline}
        </p>
        <p>
          <strong>Application Process:</strong> {jobDetails.applicationProcess}
        </p>
        <p>
          <strong>No. of Openings:</strong> {jobDetails.numberOfOpenings}
        </p>
        <p>
          <strong>Duration:</strong> {jobDetails.jobDuration}
        </p>
        <p>
          <strong>Work Hours:</strong> {jobDetails.workHours}
        </p>
        <p>
          <strong>Benefits:</strong> {jobDetails.benefits}
        </p>
        <p>
          <strong>Skills:</strong> {jobDetails.skills}
        </p>
      </div>
      <button className="apply-button" onClick={applyJobBtn}>
        Apply Now
      </button>
    </div>
  );
};

export default DetailedJobDescription;

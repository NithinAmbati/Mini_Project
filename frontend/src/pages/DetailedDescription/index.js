import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

const DetailedJobDescription = () => {
  const { id } = useParams();
  const jwtToken = Cookies.get("jwt_token");
  const [jobDetails, setJobDetails] = useState({});

  const getData = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8000/jobs/${id}`);
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
      alert("Login to Apply jobs");
    } else alert("Successfully applied");
  };

  return (
    <div>
      <h1>{jobDetails.jobRole}</h1>
      <p>{jobDetails.companyOverview}</p>
      <p>{jobDetails.jobLocation}</p>
      <p>{jobDetails.jobMode}</p>
      <p>{jobDetails.jobType}</p>
      <p>Stipend: {jobDetails.stipend}</p>
      <p>{jobDetails.jobDescription}</p>
      <p>{jobDetails.qualifications}</p>
      <p>{jobDetails.experienceLevel}</p>
      <p>{jobDetails.educationLevel}</p>
      <p>{jobDetails.jobPostingDate}</p>
      <p>{jobDetails.applicationDeadline}</p>
      <p>{jobDetails.applicationProcess}</p>
      <p>No of Openingns: {jobDetails.numberOfOpenings}</p>
      <p>{jobDetails.jobDuration}</p>
      <p>{jobDetails.workHours}</p>
      <p>{jobDetails.benefits}</p>
      <p>{jobDetails.skills}</p>
      <button onClick={applyJobBtn}>Apply Now</button>
    </div>
  );
};

export default DetailedJobDescription;

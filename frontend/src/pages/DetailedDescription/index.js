import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

const DetailedJobDescription = () => {
  const { id } = useParams();
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

  return (
    <div>
      <h1>{jobDetails.jobRole}</h1>
    </div>
  );
};

export default DetailedJobDescription;

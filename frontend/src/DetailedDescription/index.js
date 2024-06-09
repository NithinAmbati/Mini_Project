import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const DetailedJobDescription = () => {
  const { id } = useParams();
  console.log(id);
  const [jobDetails, setJobDetails] = useState({});
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const options = {
      method: "GET",
    };
    const response = await fetch(`http://localhost:8000/jobs/${id}`, options);
    if (response.ok) {
      const parsedData = await response.json();
      console.log(parsedData);
      setJobDetails(parsedData);
    }
  };

  return (
    <div>
      <h1>{jobDetails.jobRole}</h1>
    </div>
  );
};

export default DetailedJobDescription;

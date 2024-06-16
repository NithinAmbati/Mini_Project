import { Spin } from "antd";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import "./index.css";

const JobsPosted = () => {
  const navigate = useNavigate();
  const jwtToken = Cookies.get("jwt_token");
  const [jobsPostedList, setJobsPostedList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getJobsPostedList();
  }, []);

  const getJobsPostedList = async () => {
    const options = {
      method: "GET",
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(
      "https://careerconnect-apis-cqaklzs35-nithin-ambatis-projects.vercel.app/employer/jobs/posted/",
      options
    );
    if (response.ok) {
      const data = await response.json();
      setJobsPostedList(data);
      setLoading(false);
    }
  };

  if (jwtToken === undefined) {
    return <Navigate to="/employer/login" />;
  }

  return (
    <div className="jobs-posted-container">
      <h1 className="jobs-posted-header">Jobs Posted</h1>
      {isLoading ? (
        <div className="loading-spinner">
          <Spin />
        </div>
      ) : jobsPostedList.length > 0 ? (
        jobsPostedList.map((job) => (
          <div
            key={job._id}
            className="job-item"
            onClick={() => navigate(`/employer/jobs/posted/${job._id}`)}
          >
            <h4>{job._id}</h4>
            <h2>{job.jobRole}</h2>
            <p>{job.jobLocation}</p>
          </div>
        ))
      ) : (
        <h1 className="empty-message">No Jobs Posted</h1>
      )}
    </div>
  );
};

export default JobsPosted;

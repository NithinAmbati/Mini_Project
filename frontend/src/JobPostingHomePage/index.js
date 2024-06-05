import React from "react";
import { useNavigate } from "react-router-dom";

function JobPostingHomePage() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Job Posting Home Page</h1>
      <button
        onClick={() => {
          navigate("/post-jobs");
        }}
        className="btn btn-primary"
      >
        Post a Job
      </button>
    </div>
  );
}

export default JobPostingHomePage;

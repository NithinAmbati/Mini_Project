import React from "react";
import JobPostingHome from "./JobPostingHome";
import JobPostingSteps from "./JobPostingSteps";
import QuickHire from "./QuickHire";

function JobPostingHomePage() {
  return (
    <div>
      <JobPostingHome />
      <JobPostingSteps />
      <QuickHire />
    </div>
  );
}

export default JobPostingHomePage;

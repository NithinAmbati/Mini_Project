import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

const JobItem = (props) => {
  const { item } = props;
  const {
    _id,
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
    benefits = [],
    skills = [],
  } = item || {};
  return (
    <a
      href={`/jobs/${_id}`}
      className="job-item p-4 m-3 shadow-sm shadow-gray-400"
    >
      <div className="space-y-1">
        <h4>{jobRole}</h4>
        <p>{companyName}</p>
        <p>{jobLocation}</p>
        <div className="flex">
          <p className="bg-gray-300 px-2 py-1 rounded-sm mx-2">{stipend}</p>
        </div>
        <div className="flex">
          <p className="bg-gray-300 px-2 py-1 rounded-sm mx-2">{mode}</p>
          <p className="bg-gray-300 px-2 py-1 rounded-sm">{jobType}</p>
        </div>
        <p>
          <span className="font-bold">Description : </span> {jobDuration}
        </p>
      </div>
    </a>
  );
};

export default JobItem;

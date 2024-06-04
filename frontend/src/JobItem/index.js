import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

const JobItem = (props) => {
  const { item } = props;
  const { id, job_role, job_type, companyName, salary, description, location } =
    item || {};
  return (
    <a
      href={`/jobs/${id}`}
      className="job-item p-4 m-3 shadow-sm shadow-gray-400"
    >
      <div className="space-y-1">
        <h4>{job_role}</h4>
        <p>{companyName}</p>
        <p>{location}</p>
        <div className="flex">
          <p className="bg-gray-300 px-2 py-1 rounded-sm mx-2">{salary}</p>
          <p className="bg-gray-300 px-2 py-1 rounded-sm">{job_type}</p>
        </div>
        <p>
          <span className="font-bold">Description : </span> {description}
        </p>
      </div>
    </a>
  );
};

export default JobItem;

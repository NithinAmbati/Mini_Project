import "bootstrap/dist/css/bootstrap.css";
import { IoLocationOutline } from "react-icons/io5";
import { PiSuitcaseSimple } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import "./index.css";

const JobItem = (props) => {
  const { item } = props;
  return (
    <li className="job-detail-item">
      <div className="mt-4">
        <h4>{item.companyName}</h4>
      </div>
      <div className="d-flex">
        <IoLocationOutline className="m-2" />
        <p className="mr-4 location-text">{item.jobLocation}</p>
        <PiSuitcaseSimple className="m-2" />
        <p className="ml-2 location-text">{item.mode}</p>
      </div>
      <hr className="line" />
      <p>{item.description}</p>
    </li>
  );
};

export default JobItem;

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
        <h6>{item.jobRole}</h6>
      </div>
      <div className="d-flex">
        <IoLocationOutline className="m-2" />
        <p className="mr-4 location-text">{item.location}</p>
        <PiSuitcaseSimple className="m-2" />
        <p className="ml-2 location-text">{item.package}</p>
      </div>
      <hr className="line" />
      <p>{item.description}</p>
    </li>
  );
};

export default JobItem;

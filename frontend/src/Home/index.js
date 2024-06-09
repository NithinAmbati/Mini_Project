import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import JobItem from "../JobItem";
import "./index.css";

const Home = () => {
  const [jobsList, setJobsList] = useState([]);

  useEffect(() => {
    getJobsList();
  }, []);

  const getJobsList = async () => {
    const apiUrl = `https://mini-project-nine-rho.vercel.app/jobs`;
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const response = await fetch(apiUrl, options);
    if (response.ok) {
      const fetchedData = await response.json();
      console.log(fetchedData);
      setJobsList(fetchedData);
    }
  };
  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken === undefined) {
    return <Navigate to="/some-path" />;
  }

  return (
    <div className="home-page-bg-container">
      <div className="home-page-main-container">
        <div className="home-search-container shadow-md shadow-gray-300">
          <input
            type="search"
            placeholder="Search by Company, Job Roles"
            className="border-r p-2"
          />
          <input
            type="search"
            placeholder="Search by Location"
            className="mx-2 p-2 "
          />
          <button className="btn btn-primary">Find Jobs</button>
        </div>
        <p className="self-center mt-[20px]">
          <span className="text-blue-800 font-bold">Post your Resume</span> -
          For better UserExperience
        </p>
        <p className="text-blue-800 font-bold self-center mt-[-5px]">
          Post a Job on Jobby
        </p>
        <hr className="self-center w-75" />
        <h1 className="self-center">Jobs</h1>
        <div className="jobs-list-container">
          {jobsList.map((item) => (
            <JobItem item={item} key={item._id} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;

import { useState, useEffect } from "react";
import JobItem from "../../components/JobItem";
import { Spin } from "antd";
import "./index.css";

const Home = () => {
  const [jobsList, setJobsList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getJobsList();
  }, []);

  const getJobsList = async () => {
    const apiUrl = `https://careerconnect-apis-cqaklzs35-nithin-ambatis-projects.vercel.app/jobs`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    const response = await fetch(apiUrl, options);
    if (response.ok) {
      const fetchedData = await response.json();
      console.log(fetchedData);
      setJobsList(fetchedData);
      setLoading(false);
    }
  };

  return (
    <div className="home-page-bg-container">
      <div className="home-page-main-container">
        <div className="home-search-container shadow-md shadow-gray-300">
          <input
            type="search"
            placeholder="Search by Company, Job Roles and Location"
            className="border-r p-2"
          />
          <button className="btn btn-primary">Find Jobs</button>
        </div>
        <p className="self-center mt-[20px]">
          <span className="text-blue-800 font-bold">Post your Resume</span> -
          For better UserExperience
        </p>
        <p className="text-blue-800 font-bold self-center mt-[-5px]">
          Post a Job on CAREERCONNECT
        </p>
        <hr className="self-center w-75" />
        <h1 className="self-center">Jobs</h1>
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <div className="jobs-list-container">
            {jobsList.map((item) => (
              <JobItem item={item} key={item._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;

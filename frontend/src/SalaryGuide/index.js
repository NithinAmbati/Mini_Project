import { useEffect, useState } from "react";
import "./index.css";

const SalaryGuide = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const options = {
      method: "GET",
    };
    const response = await fetch(
      "https://mini-project-nine-rho.vercel.app/avg-salaries",
      options
    );
    if (response.ok) {
      const data = await response.json();
      setData(data);
    }
  };

  console.log(data);

  return (
    <>
      <div className="salary-page-top-container bg-gray-950 text-white p-5">
        <h3 className="font-bold">Find a Career You'll Love</h3>
        <p>
          Explore which careers have the highest job satisfaction, best salaries
          and more
        </p>
        <div className="salary-guide-search-container shadow-md">
          <input
            type="search"
            placeholder="Search by Job Roles"
            className="border-1 border-gray-400 p-2 "
          />
          <button className="btn btn-primary mb-3 ml-2">Find Jobs</button>
        </div>
      </div>
      <div className="salary-page-bottom-container">
        <h4 className="font-bold">Browse Top Paying Companies by Industry</h4>
        <div className="salaries-list-container">
          {data.map((item) => (
            <div className="salary-item">
              <h4 className="text-lg font-bold">{item.job_role}</h4>
              <p className="font-bold text-blue-800 text-md">
                Avg Salary Rs.{item.salary} {"  "} per year
              </p>
              <p className="font-underline">job openings</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SalaryGuide;

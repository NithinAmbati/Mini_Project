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
    const response = await fetch("http://localhost:8000/avg-salaries", options);
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
        <div className="search-container self-center flex justify-center items-center border-2 rounded-lg shadow-md border-gray h-[120px] relative top-[100px]">
          <div className="flex flex-col">
            <label className="text-black">What</label>
            <input
              type="search"
              placeholder="Search by Company, Job Roles"
              className="border-1 border-black p-2 w-[300px]"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-black">Where</label>
            <input
              type="search"
              placeholder="Search by Location"
              className="mx-2 p-2  border-1 border-black"
            />
          </div>
          <button className="btn btn-primary m-2 mt-4">Find Jobs</button>
        </div>
      </div>
      <div className="salary-page-bottom-container">
        <h4 className="font-bold">Browse Top Paying Companies by Industry</h4>
        <div className="salaries-container">
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

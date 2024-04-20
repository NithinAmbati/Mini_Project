import React, { useState, useEffect } from "react";
import Header from "../Header";
import JobItem from "../JobItem";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const employmentTypesList = [
  {
    label: "Software",
    employmentTypeId: "SOFTWARE",
  },
  {
    label: "Frontend",
    employmentTypeId: "FRONTEND",
  },
  {
    label: "Backend",
    employmentTypeId: "BACKEND",
  },
  {
    label: "Data Scientist",
    employmentTypeId: "DATA SCIENTIST",
  },
];

const salaryRangesList = [
  {
    salaryRangeId: 5,
    label: "5 LPA and above",
  },
  {
    salaryRangeId: 8,
    label: "8 LPA and above",
  },
  {
    salaryRangeId: 10,
    label: "10 LPA and above",
  },
  {
    salaryRangeId: 15,
    label: "15 LPA and above",
  },
];

const Jobs = () => {
  const [jobsList, setJobsList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [typeOfEmployment, setTypeOfEmployment] = useState("");
  const [salaryRange, setSalaryRange] = useState(0);
  const [noFilters1, setNoFilters1] = useState(true);
  const [noFilters2, setNoFilters2] = useState(true);

  useEffect(() => {
    getJobsList();
  }, []);

  const getJobsList = async () => {
    const apiUrl = `http://localhost:3000/jobs-list`;
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
      setJobsList(fetchedData);
    }
  };

  const changeEmploymentType = (event) => {
    setTypeOfEmployment(event.target.value);
    setNoFilters1(false);
  };

  const changeSalaryRange = (event) => {
    setSalaryRange(event.target.value);
    setNoFilters2(false);
  };

  const changeSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const clearFilters = () => {
    setTypeOfEmployment("");
    setSalaryRange(0);
    setNoFilters1(true);
    setNoFilters2(true);
  };

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken === undefined) {
    return <Redirect to="/login" />;
  }

  const updatedJobsList = jobsList.filter(
    (item) =>
      item.jobRole.toLowerCase().includes(typeOfEmployment.toLowerCase()) &&
      item.package >= salaryRange &&
      item.jobRole.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="jobs-bg-container">
      <Header />
      <div className="combined-container">
        <div className="left-container">
          <div className="profile-container">
            <h2 className="user-profile-heading">Nithin Ambati</h2>
            <p className="user-profile-para">
              Lead Software Developer at AI/ML and web
            </p>
          </div>
          <hr />
          <h3>Type of Employment</h3>
          <ul className="role-based-list-container">
            {employmentTypesList.map((item) => (
              <li className="role-based-list-item" key={item.employmentTypeId}>
                <input
                  type="radio"
                  id={item.employmentTypeId}
                  name="employment-type"
                  value={item.employmentTypeId}
                  onChange={changeEmploymentType}
                />
                <label htmlFor={item.employmentTypeId}>{item.label}</label>
              </li>
            ))}
          </ul>
          <hr />
          <h3>Salary Range</h3>
          <ul className="salary-based-list-container">
            {salaryRangesList.map((item) => (
              <li className="role-based-list-item" key={item.label}>
                <input
                  type="radio"
                  id={item.label}
                  name="salary-range"
                  value={item.salaryRangeId}
                  onChange={changeSalaryRange}
                />
                <label htmlFor={item.label}>{item.label}</label>
              </li>
            ))}
          </ul>
          <button className="btn btn-light" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
        <div className="right-container">
          <ul className="jobs-list-container">
            <li>
              {" "}
              <input
                type="search"
                className="search"
                placeholder="Search"
                onChange={changeSearchInput}
              />
            </li>
            {updatedJobsList.map((item) => (
              <JobItem key={item.id} item={item} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Jobs;

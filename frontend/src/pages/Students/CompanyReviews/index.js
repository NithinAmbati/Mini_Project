import "./index.css";
import { useState, useEffect } from "react";
import { RiStarSFill } from "react-icons/ri";
import SubmitFeedback from "./SubmitFeedback";
import Cookies from "js-cookie";
import { Spin } from "antd";
import { Navigate } from "react-router-dom";

const CompanyReviewItem = ({ item, index }) => {
  return (
    <div key={index} className="company-reviews-item">
      <h4 className="font-bold text-md">{item.companyName}</h4>
      <div className="reviews-container">
        <div className="star1-container">
          {Array.from(
            { length: item.reviewScore / item.reviewsCount },
            (_, i) => (
              <RiStarSFill key={i} className="star1" />
            )
          )}
        </div>
        <div className="star2-container">
          {Array.from(
            { length: 5 - Math.floor(item.reviewScore / item.reviewsCount) },
            (_, i) => (
              <RiStarSFill key={i} className="star2" />
            )
          )}
        </div>
        <p className="ml-2 text-blue-600">{item.reviewsCount} reviews</p>
      </div>
      <div className="flex justify-between">
        <p className="text-sm">Salaries</p>
        <p className="text-sm">Questions</p>
        <p className="text-sm">Open Jobs</p>
      </div>
    </div>
  );
};

const CompanyReviews = () => {
  const jwtToken = Cookies.get("jwt_token");
  const [companiesReviewsList, setCompaniesReviewsList] = useState([]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getCompaniesReviewsList();
  }, []);

  const getCompaniesReviewsList = async () => {
    const options = {
      method: "GET",
    };
    const response = await fetch(
      "https://careerconnect-apis.vercel.app/company-reviews",
      options
    );
    if (response.ok) {
      const data = await response.json();
      setCompaniesReviewsList(data);
      setIsLoading(false);
    }
  };

  const submitFeedback = async (companyName) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({ companyName, rating }),
    };
    await fetch(
      "https://careerconnect-apis.vercel.app/company-reviews",
      options
    );
  };

  if (jwtToken === undefined) {
    return <Navigate to="/student/login" />;
  }

  const filteredCompaniesReviewsList = companiesReviewsList.filter((item) =>
    item.companyName.toLowerCase().includes(searchInput)
  );

  return (
    <div className="company-reviews-page-container">
      <h1 className="text-center">Find great places to work</h1>
      <h5 className="mt-3 text-center">
        Get access to millions of company reviews
      </h5>
      <div>
        <div className="company-reviews-search-container">
          <input
            type="search"
            className="company-reviews-search"
            placeholder="Search for Comapny Reviews"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button className="btn btn-primary">Find Companies</button>
        </div>
      </div>
      <div className="company-reviews-container mt-5">
        {isLoading ? (
          <Spin size="large" />
        ) : (
          filteredCompaniesReviewsList.map((item, index) => (
            <CompanyReviewItem key={index} item={item} index={index} />
          ))
        )}
      </div>
    </div>
  );
};

export default CompanyReviews;

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

  return (
    <div className="company-reviews-page-container">
      <h1 className="text-center">Find great places to work</h1>
      <h5 className="mt-3 text-center">
        Get access to millions of company reviews
      </h5>
      <div>
        <div className="company-reviews-search-container">
          <input type="search" className="company-reviews-search" />
          <button className="btn btn-primary">Find Companies</button>
        </div>
        <a
          href="/salary-guide"
          className="underline text-blue-400 relative bottom-5"
        >
          Do you want to search for salaries?
        </a>
      </div>
      <div className="company-reviews-container">
        {isLoading ? (
          <Spin size="large" />
        ) : (
          companiesReviewsList.map((item, index) => (
            <CompanyReviewItem key={index} item={item} index={index} />
          ))
        )}
      </div>
      <div className="rating-system">
        <h3 className="font-bold">Rate your recent Employer: </h3>
        <div className="star-rating mx-4">
          {[...Array(5)].map((star, index) => {
            const ratingValue = index + 1;
            return (
              <span
                key={index}
                className={
                  ratingValue <= (hover || rating) ? "star selected" : "star"
                }
                onClick={() => setRating(ratingValue)}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(0)}
              >
                &#9733;
              </span>
            );
          })}
        </div>
        <SubmitFeedback
          submitFeedback={submitFeedback}
          getCompaniesReviewsList={getCompaniesReviewsList}
        />
      </div>
    </div>
  );
};

export default CompanyReviews;

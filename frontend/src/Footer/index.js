import React from "react";
import "./index.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="flex flex-col space-y-2">
        <h5>We are here to Help</h5>
        <p>
          Visit our Help Centre for answers to common questions or contact us
          directly.
        </p>
        <div>
          <button className="btn btn-light">Help Center</button>
          <button className="btn btn-light mx-3">Contact Support</button>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <h5>Employers</h5>
        <a href="/" className="text-white">
          Post a Job
        </a>
        <a href="/" className="text-white">
          FAQ
        </a>
      </div>
      <div className="flex flex-col space-y-2">
        <h5>Resources</h5>
        <a href="/" className="text-white">
          How to write Job descriptions
        </a>
        <a href="/" className="text-white">
          Interview Questions
        </a>
      </div>
    </div>
  );
};

export default Footer;

import { Component } from "react";
import Header from "../Header";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import "./index.css";

class Home extends Component {
  render() {
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken === undefined) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="home-bg-container">
        <Header />
        <div className="home-page-container">
          <div className="home-page-card-container">
            <h1 className="home-heading">Find the Job that fits your Life</h1>
            <p className="home-para">
              Millios of people are searching for jobs, salaru information,
              company reviews. Find the job that fits your abilities and
              potential.
            </p>
            <button className="btn btn-primary">
              <a href="/jobs" className="nav-item">
                Find Jobs
              </a>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;

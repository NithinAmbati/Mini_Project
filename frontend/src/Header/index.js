import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoReorderThreeSharp } from "react-icons/io5";

import "./index.css";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target instanceof HTMLElement)) return;
      if (!event.target.closest(".header") && sidebarOpen) {
        closeSidebar();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [sidebarOpen]);

  const handleTradeNameClick = () => {};

  return (
    <header className="header">
      <div className="header-top-section">
        <div className="logo">
          <a
            onClick={handleTradeNameClick}
            className="pointer text-white"
            href="/"
          >
            JOBBY
          </a>
        </div>{" "}
        <ul className="header-top-list-container">
          <li>
            <a href="/" className="text-white">
              Home
            </a>
          </li>
          <li>
            <a href="/company-reviews" className="text-white">
              Company Reviews
            </a>
          </li>
          <li>
            <a href="/salary-guide" className="text-white">
              Salary Guide
            </a>
          </li>
          <li>
            <a href="/job-posting" className="text-white">
              Post Job
            </a>
          </li>
        </ul>
      </div>

      <nav className={`nav bg-light ${sidebarOpen ? "nav--open" : ""}`}>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/company-reviews">Company Reviews</a>
          </li>
          <li>
            <a href="/salary-guide">Salary Guide</a>
          </li>
          <li>
            <a href="/job-posting">Post Job</a>
          </li>
        </ul>
      </nav>
      <div className="hamburger" onClick={toggleSidebar}>
        {sidebarOpen ? (
          <RxCross2 className="nav-logo" />
        ) : (
          <IoReorderThreeSharp className="nav-logo" />
        )}
      </div>
    </header>
  );
};

export default Header;

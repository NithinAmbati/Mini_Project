import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoReorderThreeSharp } from "react-icons/io5";

import "./index.css";

const Header = (props) => {
  const { headerContent } = props;
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
          {headerContent.map((item, index) => (
            <li key={index}>
              <a href={item.link} className="text-white">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <nav className={`nav bg-light ${sidebarOpen ? "nav--open" : ""}`}>
        <ul>
          {headerContent.map((item, index) => (
            <li key={index}>
              <a href={item.link} className="text-dark">
                {item.title}
              </a>
            </li>
          ))}
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

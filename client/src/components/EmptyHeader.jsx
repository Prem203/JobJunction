import React from "react";
import jobJunctionLogo from "../assets/jjs-logo-black.png";
import { FaHome } from "react-icons/fa";
import "../styling/styles.css";

export default function EmptyHeader({ headerTag }) {
  return (
    <>
      <header>
        <div className="header container-fluid d-flex justify-content-between align-items-center">
          <div className="logo-and-text">
            <a className="navbar-brand" href="/">
              <img src={jobJunctionLogo} alt="Logo" width="70" height="70" />
            </a>
            <h1 className="app-name">{headerTag}</h1>
          </div>
          <div className="nav-icons">
            <a href="/" className="nav-link">
              <FaHome className="icon" />
            </a>
          </div>
        </div>
      </header>
    </>
  );
}

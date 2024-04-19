import React from "react";
import jobJunctionLogo from "../assets/jjs-logo-black.png";
import { Link } from "react-router-dom";
import { IoBriefcase, IoBookmarks } from "react-icons/io5";
import { FaUserAlt, FaInfoCircle, FaHome, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import "../styling/styles.css";
import { useAuth0 } from "@auth0/auth0-react";


export default function Header({ headerTag, iconList }) {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  const logoutUser = () => {
    console.log("logging out");
    console.log("isAuthenticated before logout", isAuthenticated);
    console.log("user before logout", user);
    console.log("window.location.origin", window.location.origin);
    logout({returnTo: window.location.origin});
    console.log("isAuthenticated after logout", isAuthenticated);
    console.log("user after logout", user);
  }


  const renderIcons = () => {
    return iconList.map((icon, index) => {
      switch (icon) {
        case "login":
          return (
            <Link key={index} to="/verify-user" className="nav-link" onClick={loginWithRedirect}>
              <FaSignInAlt className="icon" />
            </Link>
          );
        case "briefcase":
          return (
            <Link key={index} to="/jobList" className="nav-link">
              <IoBriefcase className="icon" />
            </Link>
          );
        case "bookmarks":
          return (
            <Link key={index} to="/savedJobs" className="nav-link">
              <IoBookmarks className="icon" />
            </Link>
          );
        case "user":
          return (
            <Link key={index} to="/profile" className="nav-link">
              <FaUserAlt className="icon" />
            </Link>
          );
        case "info":
          return (
            <Link key={index} to="/about" className="nav-link">
              <FaInfoCircle className="icon" />
            </Link>
          );
        case "home":
          return (
            <Link key={index} to="/" className="nav-link">
              <FaHome className="icon" />
            </Link>
          );
        case "logout":
          return (
            <Link key={index} className="nav-link" onClick={logoutUser}>
              <FaSignOutAlt className="icon" />
            </Link>
          );
        default:
          return null;
      }
    });
  };

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
          <div className="nav-icons">{renderIcons()}</div>
        </div>
      </header>
    </>
  );
}

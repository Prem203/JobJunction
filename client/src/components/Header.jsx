import React from "react";
import jobJunctionLogo from "../assets/jjs-logo-black.png";
import { IoBriefcase } from "react-icons/io5";
import { IoBookmarks } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import "../styling/styles.css";

export default function Header({ headerTag, iconList }) {
  const renderIcons = () => {
    return iconList.map((icon, index) => {
      switch (icon) {
        case "briefcase":
          return (
            <a key={index} href="/jobList" className="nav-link">
              <IoBriefcase className="icon" />
            </a>
          );
        case "bookmarks":
          return (
            <a key={index} href="/savedJobs" className="nav-link">
              <IoBookmarks className="icon" />
            </a>
          );
        case "user":
          return (
            <a key={index} href="/profile" className="nav-link">
              <FaUserAlt className="icon" />
            </a>
          );
        case "info":
          return (
            <a key={index} href="/about" className="nav-link">
              <FaInfoCircle className="icon" />
            </a>
          );
        case "home":
          return (
            <a key={index} href="/" className="nav-link">
              <FaHome className="icon" />
            </a>
          );
        case "logout":
          return (
            <a key={index} href="/logout" className="nav-link">
              <FaSignOutAlt className="icon" />
            </a>
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

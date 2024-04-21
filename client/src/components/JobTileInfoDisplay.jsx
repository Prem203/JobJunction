import React from "react";
import jobJunctionLogo from "../assets/jjs-logo-black.png";
import { LuDot } from "react-icons/lu";

export default function JobTileInfoDisplay({ job }) {
  const showSalaryInfo =
    job.job_min_salary && job.job_max_salary && job.job_salary_currency;

  // Helper function to calculate job posted duration
  const findJobPostedDuration = () => {
    const jobPostedDate = new Date(job.job_posted_at_timestamp * 1000);
    const now = new Date();

    const diffInMilliseconds = now - jobPostedDate;

    const millisecondsPerSecond = 1000;
    const secondsPerMinute = 60;
    const minutesPerHour = 60;
    const hoursPerDay = 24;
    const daysPerMonth = 30;
    const daysPerYear = 365;

    const diffInSeconds = diffInMilliseconds / millisecondsPerSecond;
    const diffInMinutes = diffInSeconds / secondsPerMinute;
    const diffInHours = diffInMinutes / minutesPerHour;
    const diffInDays = diffInHours / hoursPerDay;

    if (diffInDays >= daysPerYear) {
      const years = Math.floor(diffInDays / daysPerYear);
      return `${years} year(s) ago`;
    } else if (diffInDays >= daysPerMonth) {
      const months = Math.floor(diffInDays / daysPerMonth);
      return `${months} month(s) ago`;
    } else if (diffInDays >= 1) {
      const days = Math.floor(diffInDays);
      return `${days} day(s) ago`;
    } else if (diffInHours >= 1) {
      const hours = Math.floor(diffInHours);
      return `${hours} hour(s) ago`;
    } else if (diffInMinutes >= 1) {
      const minutes = Math.floor(diffInMinutes);
      return `${minutes} minute(s) ago`;
    } else {
      const seconds = Math.floor(diffInSeconds);
      return `${seconds} second(s) ago`;
    }
  };

  return (
    <div className="job-info">
      {job.employer_logo === "../assets/jjs-logo-black.png" ? (
        <img
          src={jobJunctionLogo} // Using the imported local asset
          alt="Company Logo"
          className="job-logo"
        />
      ) : (
        <img
          src={job.employer_logo} // Using the provided job logo
          alt="Company Logo"
          className="job-logo"
        />
      )}
      <h3>{job.employer_name}</h3>
      <h2>{job.job_title}</h2>
      <div className="job-tile-description">
        <div className="job-tile-salary-type">
          {showSalaryInfo && (
            <p>
              {job.job_salary_currency === "USD"
                ? "$"
                : job.job_salary_currency}
              {job.job_min_salary}-{job.job_max_salary}
              {job.job_salary_period === "HOUR"
                ? "/hr"
                : job.job_salary_period === "WEEK"
                ? "/wk"
                : "/yr"}
              <LuDot className="dot" />{" "}
            </p>
          )}
          {job.job_employment_type && <p>{job.job_employment_type}</p>}
        </div>
        <div className="job-tile-location-duration">
          {job.job_city && job.job_state && (
            <p>
              {job.job_city}, {job.job_state}
              <LuDot className="dot" />
            </p>
          )}
          {job.job_posted_at_timestamp && <p>{findJobPostedDuration()}</p>}
        </div>
      </div>
    </div>
  );
}

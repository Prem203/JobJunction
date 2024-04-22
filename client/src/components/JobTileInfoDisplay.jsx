import React from "react";
import { findJobPostedDuration } from "../utils/TimeUtils.js";
import { showCompanyLogo } from "./JobDetailDisplay.jsx";
import { LuDot } from "react-icons/lu";

export default function JobTileInfoDisplay({ job }) {
  const showSalaryInfo =
    job.job_min_salary && job.job_max_salary && job.job_salary_currency;

  const slicedEmployerName = job.employer_name.slice(0, 15);
  const slicedJobTitle = job.job_title.slice(0, 20);

  return (
    <div className="job-info">
      {showCompanyLogo(job)}
      <h3>{slicedEmployerName}</h3>
      <h2 className="mob-display">{slicedJobTitle}</h2>
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
          {job.job_posted_at_timestamp && (
            <p>{findJobPostedDuration({ job })}</p>
          )}
        </div>
      </div>
    </div>
  );
}

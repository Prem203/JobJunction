import React from "react";

import {
  showCompanyLogo,
  showDurationInfo,
  showEducationInfo,
  showEmploymentTypeInfo,
  showJobDescription,
  showJobHighlights,
  showLocationInfo,
  showRequiredExperience,
  showRequiredSkills,
  showSalaryInfo,
} from "./JobDetailDisplay.jsx";
import "../styling/styles.css";

export default function SelectedJobDisplay({ selectedJob }) {
  return (
    <>
      <div className="selected-job-container">
        <div className="selected-job-subcontainer">
          <div className="selected-job-company-details">
            {showCompanyLogo(selectedJob)}
            <div className="selected-job-company-title">
              <h2>{selectedJob.employer_name}</h2>
              <h4>{selectedJob.job_publisher}</h4>
            </div>
          </div>
          <div className="selected-job-title">
            <h1>{selectedJob.job_title}</h1>
          </div>
          {showDurationInfo(selectedJob)}
          <button
            onClick={() => {
              window.open(
                selectedJob.job_apply_link,
                "_blank",
                "noopener noreferrer"
              );
            }}
            className="selected-job-button"
          >
            Apply
          </button>
        </div>
        <div className="selected-job-subcontainer">
          <h2>At a Glance</h2>
          <div className="selected-job-salary-loc-type">
            {showSalaryInfo(selectedJob)}
            {showLocationInfo(selectedJob)}
            {showEmploymentTypeInfo(selectedJob)}
          </div>
        </div>
        <div className="selected-job-subcontainer">
          {showJobDescription(selectedJob)}
        </div>
        <div className="selected-job-subcontainer">
          {showJobHighlights(selectedJob)}
        </div>
        <div className="selected-job-subcontainer">
          {showRequiredExperience(selectedJob)}
          {showRequiredSkills(selectedJob)}
          {showEducationInfo(selectedJob)}
        </div>
      </div>
    </>
  );
}

import React from "react";

export default function SelectedJobDisplay({ selectedJob }) {
  return (
    <>
      <div>
        <h1>Job Details</h1>
        <h2>{selectedJob.job_title}</h2>
        <h3>{selectedJob.employer_name}</h3>
        <p>{selectedJob.job_description}</p>
      </div>
    </>
  );
}

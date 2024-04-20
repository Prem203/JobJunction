import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SelectedJobDisplay from "../components/SelectedJobDisplay";
import { FETCH_ALL_JOBS_DB_URL, ICON_LIST_COMMON } from "../constants.js";

export default function JobListPage() {
  const [jobList, setJobList] = useState([]);
  const [queryString, setQueryString] = useState("");
  const [fetchedQueries, setFetchedQueries] = useState([]);
  const [jobsToDisplay, setJobsToDisplay] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const jobDataRef = useRef(null);

  useEffect(() => {
    fetchAllJobDetails();
  }, []);

  useEffect(() => {
    setJobsToDisplay(jobList); // Initialize with all jobs
    if (jobList.length > 0) {
      setSelectedJob(jobList[0]); // Default to the first job
    }
  }, [jobList]);

  const fetchAllJobDetails = async () => {
    console.log("Fetching all job details from DB");
    try {
      const response = await fetch(FETCH_ALL_JOBS_DB_URL);
      const data = await response.json();
      console.log(data);
      setJobList(data);

      const uniqueQueries = new Set(data.map((job) => job.query.toLowerCase()));
      setFetchedQueries(Array.from(uniqueQueries));
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setQueryString(event.target.value);
  };

  const fetchQueryJobs = () => {
    if (queryString.trim() === "") {
      // If the input is empty, set jobsToDisplay to the entire jobList
      setJobsToDisplay(jobList);
    } else {
      // Otherwise, filter based on query
      const filteredJobs = jobList.filter((job) =>
        job.query.toLowerCase().includes(queryString.toLowerCase())
      );
      setJobsToDisplay(filteredJobs);
      if (filteredJobs.length > 0) {
        setSelectedJob(filteredJobs[0]); // Select the first filtered job
      }
    }
    jobDataRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCardClick = (job) => {
    setSelectedJob(job); // Update selected job when a card is clicked
  };

  return (
    <>
      <Header headerTag={"All Jobs"} iconList={ICON_LIST_COMMON} />
      <div className="job-data">
        <div className="job-list">
          <div className="search-bar">
            <input
              type="text"
              list="suggestions"
              placeholder="Search for jobs"
              value={queryString}
              onChange={handleChange}
            />
            <datalist id="suggestions">
              {fetchedQueries.map((query, index) => (
                <option key={index} value={query} />
              ))}
            </datalist>
            <button onClick={fetchQueryJobs}>Search</button>
          </div>
          <div className="display-jobs" ref={jobDataRef}>
            {jobsToDisplay.map((job) => (
              <div
                key={job.job_id}
                className={`job-card ${
                  selectedJob && selectedJob.job_id === job.job_id
                    ? "selected"
                    : ""
                }`}
                onClick={() => handleCardClick(job)}
              >
                <h2>{job.job_title}</h2>
                <h3>{job.employer_name}</h3>
                <h5>{job.query}</h5>
              </div>
            ))}
          </div>
        </div>
        <div className="job-details">
          {selectedJob ? (
            <SelectedJobDisplay selectedJob={selectedJob} />
          ) : (
            <p>No job selected</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

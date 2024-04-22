import React, { useState, useEffect, useRef, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SelectedJobDisplay from "../components/SelectedJobDisplay";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import {
  FETCH_ALL_JOBS_ENDPOINT,
  FETCH_SAVED_JOBS_ENDPOINT,
  ICON_LIST_COMMON,
} from "../constants.js";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthToken } from "../AuthTokenContext.js";
import JobTileInfoDisplay from "../components/JobTileInfoDisplay.jsx";
import { addSavedJobsToDB, removeSavedJobFromDB } from "../utils/SavedJobs.js";

export default function JobListPage() {
  const [jobList, setJobList] = useState([]);
  const [queryString, setQueryString] = useState("");
  const [fetchedQueries, setFetchedQueries] = useState([]);
  const [jobsToDisplay, setJobsToDisplay] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);

  const jobDataRef = useRef(null);
  const { user } = useAuth0();
  const { accessToken } = useAuthToken();

  useEffect(() => {
    fetchAllJobDetails();
  }, []);

  useEffect(() => {
    setJobsToDisplay(jobList); // Initialize with all jobs
    if (jobList.length > 0) {
      setSelectedJob(jobList[0]); // Default to the first job
    }
  }, [jobList]);

  useEffect(() => {}, [savedJobs]);

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const fetchAllJobDetails = async () => {
    const fetchURL = `${process.env.REACT_APP_API_URL}${FETCH_ALL_JOBS_ENDPOINT}`;
    console.log("Fetching all job details from DB", fetchURL);
    try {
      const response = await fetch(fetchURL);
      const data = await response.json();
      setJobList(data);

      const uniqueQueries = new Set(data.map((job) => job.query.toLowerCase()));
      setFetchedQueries(Array.from(uniqueQueries));
    } catch (error) {
      console.error(error);
    }
  };

  // Define fetchSavedJobs with useCallback to avoid recreating it on every render
  const fetchSavedJobs = useCallback(async () => {
    if (!accessToken) {
      console.log("No auth token found");
      return;
    }

    const fetchURL = `${process.env.REACT_APP_API_URL}${FETCH_SAVED_JOBS_ENDPOINT}`;

    try {
      const response = await fetch(fetchURL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        console.log("Failed to fetch saved jobs", response.statusText);
        return;
      }
      console.log("response", response);
      const data = await response.json();
      const { SavedJobs } = data;
      console.log("Saved jobs fetched:", SavedJobs);
      setSavedJobs(SavedJobs);
    } catch (error) {
      console.error(error);
    }
  }, [accessToken]);

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
    setSelectedJob(job);
  };

  const toggleSave = (job) => {
    if (!user) {
      alert("Please log in or sign up to save jobs");
      return;
    }

    const updatedSavedJobs = Array.isArray(savedJobs) ? savedJobs : [];

    const index = updatedSavedJobs.findIndex(
      (savedJob) => savedJob.job_id === job.job_id
    );

    if (index === -1) {
      addSavedJobsToDB(job.job_id, accessToken);
      setSavedJobs((prevSavedJobs) => [...prevSavedJobs, job]);
    } else {
      removeSavedJobFromDB(job.job_id, accessToken);
      setSavedJobs((prevSavedJobs) => {
        const updatedJobs = [...prevSavedJobs];
        updatedJobs.splice(index, 1);
        return updatedJobs;
      });
    }
  };

  return (
    <>
      <Header headerTag={"All Jobs"} iconList={ICON_LIST_COMMON} />
      <div className="job-data">
        <div className="job-list" ref={jobDataRef}>
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
          <div className="display-jobs">
            {jobsToDisplay.length === 0 ? (
              <div className="no-jobs">
                <h2>No jobs found to display</h2>
              </div>
            ) : (
              jobsToDisplay.map((job) => (
                <div
                  key={job.job_id}
                  className={`job-tile ${
                    selectedJob && selectedJob.job_id === job.job_id
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleCardClick(job)}
                >
                  <JobTileInfoDisplay job={job} />
                  <div className="save-button" onClick={() => toggleSave(job)}>
                    {savedJobs.some(
                      (savedJob) => savedJob.job_id === job.job_id
                    ) ? (
                      <FaBookmark />
                    ) : (
                      <FaRegBookmark />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="selected-job-display">
          {selectedJob ? (
            <SelectedJobDisplay selectedJob={selectedJob} />
          ) : (
            <h2>No job selected</h2>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

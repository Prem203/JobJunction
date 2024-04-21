import React, { useState, useEffect, useRef, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SelectedJobDisplay from "../components/SelectedJobDisplay";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import {
  FETCH_ALL_JOBS_ENDPOINT,
  FETCH_SAVED_JOBS_ENDPOINT,
  SAVE_JOB_ENDPOINT,
  DELETE_SAVED_JOB_ENDPOINT,
  ICON_LIST_COMMON,
} from "../constants.js";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthToken } from "../AuthTokenContext.js";
import JobTileInfoDisplay from "../components/JobTileInfoDisplay.jsx";

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
    setSelectedJob(job); // Update selected job when a card is clicked
  };

  //change this to save the job to the user's profile
  const toggleSave = (job) => {
    if (!user) {
      alert("Please log in or sign up to save jobs");
      return;
    }
    const updatedSavedJobs = Array.isArray(savedJobs) ? savedJobs : [];

    const index = updatedSavedJobs.findIndex(
      (savedJob) => savedJob.job_id === job.job_id
    );

    console.log(index);

    setSavedJobs((prevSavedJobs) => {
      const prevJobs = Array.isArray(prevSavedJobs) ? prevSavedJobs : [];
      if (index === -1) {
        // Job is not saved, add it to savedJobs
        addSavedJobsToDB(job.job_id);
        return [...prevJobs, job];
      } else {
        // Job is already saved, remove it from savedJobs
        removeSavedJobFromDB(job.job_id);
        const updatedSavedJobs = [...prevJobs];
        updatedSavedJobs.splice(index, 1);
        return updatedSavedJobs;
      }
    });
    console.log("Saved jobs", savedJobs);
    fetchSavedJobs();
  };

  const addSavedJobsToDB = async (jobId) => {
    const postURL = `${process.env.REACT_APP_API_URL}${SAVE_JOB_ENDPOINT}`;
    console.log(
      "Adding saved jobs to DB, accessToken:",
      accessToken,
      savedJobs
    );
    try {
      const response = await fetch(postURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ jobId }),
      });
      const data = await response.json();
      console.log("Saved jobs added to DB:", data);
    } catch (error) {
      console.error(error);
    }
  };

  const removeSavedJobFromDB = async (jobId) => {
    const deleteURL = `${process.env.REACT_APP_API_URL}${DELETE_SAVED_JOB_ENDPOINT}`;

    try {
      const response = await fetch(deleteURL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ jobId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete saved job");
      }

      const data = await response.json();
      console.log("Deleted saved job from DB:", data);
    } catch (error) {
      console.error("Error deleting saved job:", error);
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
            {jobsToDisplay.map((job) => (
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
                <div
                  className="save-button"
                  onClick={() =>
                    toggleSave(
                      job,
                      !savedJobs ||
                        !Array.isArray(savedJobs) ||
                        !savedJobs.some(
                          (savedJob) => savedJob.job_id === job.job_id
                        )
                    )
                  }
                >
                  {savedJobs &&
                  Array.isArray(savedJobs) &&
                  savedJobs.some(
                    (savedJob) => savedJob.job_id === job.job_id
                  ) ? (
                    <FaBookmark />
                  ) : (
                    <FaRegBookmark />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="selected-job-display">
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

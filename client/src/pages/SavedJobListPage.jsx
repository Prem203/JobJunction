import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ICON_LIST_COMMON } from "../constants.js";
import { IoIosArrowBack } from "react-icons/io";
import {
  FETCH_SPECIFIC_JOB_ENDPOINT,
  FETCH_SAVED_JOBS_ENDPOINT,
} from "../constants.js";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import JobTileInfoDisplay from "../components/JobTileInfoDisplay.jsx";
import SelectedJobDisplay from "../components/SelectedJobDisplay.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthToken } from "../AuthTokenContext.js";
import { addSavedJobsToDB, removeSavedJobFromDB } from "../utils/SavedJobs.js";
import "../styling/styles.css";

export default function SavedJobListPage() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const { user } = useAuth0();
  const { accessToken } = useAuthToken();

  useEffect(() => {
    console.log("use effect");
    fetchSavedJobs();
  }, []);

  const fetchSavedJobs = async () => {
    console.log("Fetching saved jobs in jsx");
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

      const jobIds = SavedJobs.map((job) => job.job_id);
      await fetchSavedJobsDetails(jobIds);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSavedJobsDetails = async (jobIds) => {
    const fetchURL = `${process.env.REACT_APP_API_URL}${FETCH_SPECIFIC_JOB_ENDPOINT}`;
    console.log("Fetching all job details from DB", fetchURL);
    try {
      const response = await fetch(fetchURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobIds }),
      });
      if (!response.ok) {
        console.error("Failed to fetch job details:", response.statusText);
        return;
      }

      const data = await response.json();
      console.log("Job details fetched:", data.JobDetails);
      setSavedJobs(data.JobDetails);
      setSelectedJob(data.JobDetails[0]);
    } catch (error) {
      console.error(error);
    }
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
        if (updatedJobs.length === 0) {
          setSelectedJob(null);
        } else {
          setSelectedJob(updatedJobs[0]);
        }

        return updatedJobs;
      });
    }
  };

  return (
    <>
      <Header headerTag="Saved Jobs" iconList={ICON_LIST_COMMON} />

      <div className="job-data">
        <Link to="/profile" className="icon">
          <IoIosArrowBack />
        </Link>
        <div className="job-list">
          <div className="display-jobs">
            {savedJobs.map((job) => (
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
            ))}
          </div>
        </div>
        <div className="selected-job-display">
          {selectedJob ? (
            <SelectedJobDisplay selectedJob={selectedJob} />
          ) : (
            <h2>You have not saved any jobs yet</h2>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

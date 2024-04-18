import React, { useEffect, useState } from "react";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import { FaArrowRightLong } from "react-icons/fa6";
import { ICON_LIST_HOME } from "../constants.js";
import "../styling/styles.css";

export default function LandingPage() {
  const [computerNetworkingJobs, setComputerNetworkingJobs] = useState([]);
  const [webDevelopmentJobs, setWebDevelopmentJobs] = useState([]);

  useEffect(() => {
    // fetchWebDevelopmentJobs();
    // fetchComputerNetworkingJobs();
  }, []);

  // const fetchWebDevelopmentJobs = async () => {
  //   console.log("Fetching web development jobs");
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       "X-RapidAPI-Key": API_KEY_1,
  //       "X-RapidAPI-Host": API_HOST,
  //     },
  //   };
  //   try {
  //     const response = await fetch(FETCH_WEB_DEVELOPMENT_JOBS_URL, options);
  //     const data = await response.json();
  //     console.log(data);
  //     const extractedData = data.data;
  //     if (extractedData.length > 5)
  //       extractedData.splice(5, extractedData.length - 5);
  //     setWebDevelopmentJobs(extractedData);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const fetchComputerNetworkingJobs = async () => {
  //   console.log("Fetching computer networking jobs");
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       "X-RapidAPI-Key": API_KEY_1,
  //       "X-RapidAPI-Host": API_HOST,
  //     },
  //   };
  //   try {
  //     const response = await fetch(FETCH_COMPUTER_NETWORKING_JOBS_URL, options);
  //     const data = await response.json();
  //     console.log(data);
  //     const extractedData = data.data;
  //     if (extractedData.length > 5)
  //       extractedData.splice(5, extractedData.length - 5);
  //     setComputerNetworkingJobs(extractedData);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <>
      <Header headerTag={"JobJunction"} iconList={ICON_LIST_HOME} />
      <div className="home">
        <div className="recommended-jobs">
          <h2>Jobs in Web Development</h2>
          <div className="job-cards">
            {webDevelopmentJobs.map((job) => (
              <div key={job.job_id} className="job-card">
                <h3 className="job-title">{job.job_title}</h3>
                <p className="job-company">{job.employer_name}</p>
                <p className="job-location">{job.job_country}</p>
              </div>
            ))}
          </div>
          <a href="/jobList" className="see-more-link">
            <div>See more jobs</div>
            <FaArrowRightLong className="right-arrow" />
          </a>
        </div>
        <div className="recommended-jobs">
          <h2>Jobs in Computer Networking</h2>
          <div className="job-cards">
            {computerNetworkingJobs.map((job) => (
              <div key={job.job_id} className="job-card">
                <h3 className="job-title">{job.job_title}</h3>
                <p className="job-company">{job.employer_name}</p>
                <p className="job-location">{job.job_country}</p>
              </div>
            ))}
          </div>
          <a href="/jobList" className="see-more-link">
            <div>See more jobs</div>
            <FaArrowRightLong className="right-arrow" />
          </a>
        </div>
        <Footer />
      </div>
    </>
  );
}

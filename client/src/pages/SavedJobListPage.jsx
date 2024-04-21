import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ICON_LIST_COMMON } from "../constants.js";
// import { jobListPage } from "../pages/JobListPage.jsx";

export default function SavedJobListPage() {
  // const [savedJobs, setSavedJobs] = useState([]);

  // useEffect(() => {
  //   jobListPage.fetchSavedJobs();
  //   setSavedJobs(jobListPage.savedJobs);
  // }, []);

  return (
    <>
      <Header headerTag={"Saved Jobs"} iconList={ICON_LIST_COMMON} /> <Footer />
    </>
  );
}

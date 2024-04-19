import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ICON_LIST_COMMON } from "../constants.js";

export default function JobListPage() {

  // useEffect(() => {
  //   // fetchAllJobDetails();
  // }, []);

  // const fetchAllJobDetails = async () => {
  //   console.log("Fetching all job details");
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       "X-RapidAPI-Key": API_KEY_1,
  //       "X-RapidAPI-Host": API_HOST,
  //     },
  //   };
  //   try {
  //     const response = await fetch(FETCH_ALL_JOBS_URL, options);
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <>
      <Header headerTag={"All Jobs"} iconList={ICON_LIST_COMMON} /> <Footer />
    </>
  );
}

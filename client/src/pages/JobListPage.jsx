import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { API_KEY_1, API_HOST, FETCH_ALL_JOBS_URL } from "../constants.js";

export default function JobListPage() {
  const iconList = ["home"];

  useEffect(() => {
    fetchAllJobDetails();
  }, []);

  const fetchAllJobDetails = async () => {
    console.log("Fetching all job details");
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": API_KEY_1,
        "X-RapidAPI-Host": API_HOST,
      },
    };
    try {
      const response = await fetch(FETCH_ALL_JOBS_URL, options);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header headerTag={"All Jobs"} iconList={iconList} /> <Footer />
    </>
  );
}

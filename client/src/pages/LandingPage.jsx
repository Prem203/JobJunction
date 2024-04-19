import React, { useEffect, useState } from "react";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import { ICON_LIST_HOME_LOGIN, ICON_LIST_HOME_LOGOUT } from "../constants.js";
import "../styling/styles.css";

export default function LandingPage() {
  // useEffect(() => {}, []);

  return (
    <>
      <Header headerTag={"JobJunction"} iconList={ICON_LIST_HOME_LOGIN} />
      <div className="semicircle">
        <div className="home-content">
          <h1>
            Make your career dreams <br />
            come true
          </h1>
          Join millions on the best place to get hired. <br />
        </div>
      </div>
      <div className="home-tagline">Find the job that fits your life</div>
      <Footer />
    </>
  );
}

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function SavedJobListPage() {
  const iconList = ["home"];
  return (
    <>
      <Header headerTag={"Saved Jobs"} iconList={iconList} /> <Footer />
    </>
  );
}

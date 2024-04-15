import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ICON_LIST_COMMON } from "../constants.js";

export default function SavedJobListPage() {
  return (
    <>
      <Header headerTag={"Saved Jobs"} iconList={ICON_LIST_COMMON} /> <Footer />
    </>
  );
}

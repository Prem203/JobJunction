import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProfileNav from "../components/ProfileNav";
import { ICON_LIST_PROFILE } from "../constants.js";

export default function ProfilePage() {
  return (
    <>
      <Header headerTag={"Profile"} iconList={ICON_LIST_PROFILE} />
      <ProfileNav />
      <Footer />
    </>
  );
}

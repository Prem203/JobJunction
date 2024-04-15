import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ProfilePage() {
  const iconList = ["home", "logout"];
  return (
    <>
      <Header headerTag={"Profile"} iconList={iconList} />
      <Footer />
    </>
  );
}

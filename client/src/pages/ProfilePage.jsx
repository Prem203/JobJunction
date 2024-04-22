import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ICON_LIST_PROFILE } from "../constants.js";
import "../styling/styles.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthToken } from "../AuthTokenContext.js";
import { FETCH_USER_ENDPOINT } from "../constants.js";
import { useEffect, useState } from "react";
import { FaEdit, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ProfilePage() {

  const { user } = useAuth0();
  const { accessToken } = useAuthToken();
  const [userData, setUserData] = useState(null);
  console.log(user);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    const fetchURL = `${process.env.REACT_APP_API_URL}${FETCH_USER_ENDPOINT}`;
    console.log("Fetching user details from DB", fetchURL);
    try {
      const response = await fetch(fetchURL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      setUserData(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Header headerTag={"Profile"} iconList={ICON_LIST_PROFILE} />
        <div className="profile-flex">
          <div className="profile-page">
            <div className="profile-box p-4">
                  <img
                    src={user.picture}
                    alt="Profile"
                    className="img-fluid rounded-circle"
                  />
                  <p className="profile-name">{user.name}</p>
                  <p className="profile-content">{user.email}</p>
            </div>
            <div className="contact-box">
                  <h3>Socials</h3>
                  <p className="contact-content"><FaLinkedin className="profile-icon"/>{userData?.user_linkedin !== "NA" && (
                    <a onClick={() => window.open(userData?.user_linkedin, "_blank")}>{userData?.user_linkedin}</a>
                    )}
                  </p>
                  <p className="contact-content"><FaGithub className="profile-icon"/>{userData?.user_github !== "NA" && (
                    <a onClick={() => window.open(userData?.user_github, "_blank")}>{userData?.user_github}</a>
                    )}
                  </p>
                  <p className="contact-content"><FaTwitter className="profile-icon"/>{userData?.user_twitter !== "NA" && (
                    <a onClick={() => window.open(userData?.user_twitter, "_blank")}>{userData?.user_twitter}</a>
                    )}
                  </p>
            </div>
          </div>

          <div className="profile-skills">
            <h3>Education</h3>
            <p className="profile-skills-content"><b>Major:</b>{userData?.user_major}</p>
            <p className="profile-skills-content"><b>Work Experience:</b>{userData?.user_work_exp} year/s</p>
            
            <br />
            <br />
            <h3>Other Links</h3>
            <p className="profile-skills-content"><b>Cover Letter:</b> {userData?.user_cover_letter}</p>
            <p className="profile-skills-content"><b>Resume:</b> {userData?.user_resume_link}</p>
            <p className="profile-skills-content"><b>Projects:</b> {userData?.user_project}</p>
          </div>

          <div className="profile-edit ">
            <Link to="/editProfile" className="profile-edit">
              <FaEdit />
            </Link>
          </div>
        </div>
      <Footer />
    </>
  );
}

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
    if (accessToken) {
      fetchUserDetails();
    }
  }, [accessToken]);

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
    } catch (error) {
      console.error(error);
    }
  };

  const showLinkedInProfile = () => {
    console.log("userData", userData);
    return (
      <>
        <FaLinkedin className="profile-icon" />
        {userData?.user_linkedin ? (
          <a
            href={userData?.user_linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            {userData?.user_linkedin}
          </a>
        ) : (
          <Link to={`/editProfile/${userData.user_id}`}>Add LinkedIn URL</Link>
        )}
      </>
    );
  };

  const showGithubProfile = () => {
    return (
      <>
        <FaGithub className="profile-icon" />
        {userData?.user_github ? (
          <a
            href={userData?.user_github}
            target="_blank"
            rel="noopener noreferrer"
          >
            {userData?.user_github}
          </a>
        ) : (
          <Link to={`/editProfile/${userData.user_id}`}>Add Github URL</Link>
        )}
      </>
    );
  };

  const showTwitterProfile = () => {
    return (
      <>
        <FaTwitter className="profile-icon" />
        {userData?.user_twitter ? (
          <a
            href={userData?.user_twitter}
            target="_blank"
            rel="noopener noreferrer"
          >
            {userData?.user_twitter}
          </a>
        ) : (
          <Link to={`/editProfile/${userData.user_id}`} className="url-styling">
            Add Twitter URL
          </Link>
        )}
      </>
    );
  };

  const showSocialProfiles = () => {
    return (
      <>
        <p className="contact-content">{showLinkedInProfile()}</p>
        <p className="contact-content">{showGithubProfile()}</p>
        <p className="contact-content">{showTwitterProfile()}</p>
      </>
    );
  };

  const showEducationSkills = () => {
    return (
      <div className="profile-skills">
        <h3>Education</h3>
        <p className="profile-skills-content">
          <b>Major:</b>
          {userData?.user_major ? (
            userData.user_major
          ) : (
            <Link to={`/editProfile/${userData.user_id}`}>Add Major</Link>
          )}
        </p>

        <p className="profile-skills-content">
          <b>Work Experience:</b>
          {userData?.user_work_exp ? (
            `${userData.user_work_exp} year(s)`
          ) : (
            <Link to={`/editProfile/${userData.user_id}`}>Add Work Experience</Link>
          )}
        </p>

        <h3>Other Links</h3>
        <p className="profile-skills-content">
          <b>Cover Letter:</b>
          {userData?.user_cover_letter ? (
            userData.user_cover_letter
          ) : (
            <Link to={`/editProfile/${userData.user_id}`}>Add Cover Letter</Link>
          )}
        </p>

        <p className="profile-skills-content">
          <b>Resume:</b>
          {userData?.user_resume_link ? (
            <a
              href={userData.user_resume_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Resume
            </a>
          ) : (
            <Link to={`/editProfile/${userData.user_id}`}>Add Resume Link</Link>
          )}
        </p>

        <p className="profile-skills-content">
          <b>Projects:</b>
          {userData?.user_project ? (
            userData.user_project
          ) : (
            <Link to={`/editProfile/${userData.user_id}`}>Add Projects</Link>
          )}
        </p>
      </div>
    );
  };

  if (!userData) {
    return <div>Loading...</div>;
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
            {showSocialProfiles()}
          </div>
        </div>
        {showEducationSkills()}

        <div className="profile-edit ">
          <Link to={`/editProfile/${userData.user_id}`} className="profile-edit">
            <FaEdit />
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

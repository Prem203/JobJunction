import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styling/styles.css";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { ICON_LIST_COMMON } from "../constants.js";
import { IoIosArrowBack } from "react-icons/io";
import { useParams } from "react-router-dom";
import {
  FETCH_SPECIFIC_USER_ENDPOINT,
  UPDATE_USER_DETAILS_ENDPOINT,
} from "../constants.js";
import { useAuthToken } from "../AuthTokenContext.js";

export default function EditProfilePage() {
  const { user_id } = useParams(); // Get the user ID from the route parameters
  const { accessToken } = useAuthToken(); // Get the auth token
  const [userData, setUserData] = useState(null);
  const initialFormData = {
    user_linkedin: userData?.user_linkedin || "",
    user_github: userData?.user_github || "",
    user_twitter: userData?.user_twitter || "",
    user_major: userData?.user_major || "",
    user_work_exp: userData?.user_work_exp
      ? parseInt(userData.user_work_exp)
      : 0, // Convert to integer
    user_cover_letter: userData?.user_cover_letter || "",
    user_resume_link: userData?.user_resume_link || "",
    user_project: userData?.user_project || "",
  };
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    console.log("user_id", user_id);
    if (user_id) {
      fetchSpecificUserDetails();
    }
  }, [user_id]);

  const fetchSpecificUserDetails = async () => {
    console.log("Fetching specific user details from DB");
    const fetchURL = `${process.env.REACT_APP_API_URL}${FETCH_SPECIFIC_USER_ENDPOINT}/${user_id}`; // Endpoint to fetch user data by ID
    try {
      const response = await fetch(fetchURL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      setUserData(data); // Set the fetched data in state
      setFormData({
        user_linkedin: data.user_linkedin || "",
        user_github: data.user_github || "",
        user_twitter: data.user_twitter || "",
        user_major: data.user_major || "",
        user_work_exp: data.user_work_exp ? parseInt(data.user_work_exp) : 0,
        user_cover_letter: data.user_cover_letter || "",
        user_resume_link: data.user_resume_link || "",
        user_project: data.user_project || "",
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "user_work_exp" ? parseInt(value) : value; // Convert to integer if necessary
    setFormData({ ...formData, [name]: newValue });
  };

  const updateSpecificUserDetails = async (e) => {
    console.log("formData", formData);
    e.preventDefault();

    const updateURL = `${process.env.REACT_APP_API_URL}${UPDATE_USER_DETAILS_ENDPOINT}/${user_id}`;

    try {
      const response = await fetch(updateURL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("User details updated successfully");
        alert("Successfully Updated Profile");
      } else {
        console.error("Error updating user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header headerTag={"Edit Profile"} iconList={ICON_LIST_COMMON} />
      <div className="icon-margin">
        <Link to="/profile" className="icon">
          <IoIosArrowBack />
        </Link>
      </div>
      <div className="form-styling">
        <form className="container mt-4" onSubmit={updateSpecificUserDetails}>
          {/* LinkedIn */}
          <div className="mb-3">
            <label className="form-label">LinkedIn:</label>
            <input
              type="text"
              className="form-control"
              name="user_linkedin"
              placeholder="LinkedIn"
              value={formData.user_linkedin} //Prefill with user data
              onChange={handleChange}
            />
          </div>

          {/* Github */}
          <div className="mb-3">
            <label className="form-label">Github:</label>
            <input
              type="text"
              className="form-control"
              name="user_github"
              placeholder="Github"
              value={formData.user_github} //Prefill with user data
              onChange={handleChange}
            />
          </div>

          {/* Twitter */}
          <div className="mb-3">
            <label className="form-label">Twitter:</label>
            <input
              type="text"
              className="form-control"
              name="user_twitter"
              placeholder="Twitter"
              value={formData.user_twitter} //Prefill with user data
              onChange={handleChange}
            />
          </div>

          {/* Major */}
          <div className="mb-3">
            <label className="form-label">Major:</label>
            <input
              type="text"
              className="form-control"
              name="user_major"
              placeholder="Enter your major"
              value={formData.user_major} //Prefill with user data
              onChange={handleChange}
            />
          </div>

          {/* Work Experience */}
          <div className="mb-3">
            <label className="form-label">Work Experience:</label>
            <input
              type="number"
              class="form-control"
              name="user_work_exp"
              placeholder="Enter work experience"
              value={formData.user_work_exp ?? "0"} //Prefill with user data
              onChange={handleInputChange}
            />
          </div>

          {/* Cover Letter */}
          <div class="mb-3">
            <label class="form-label">Cover Letter:</label>
            <input
              type="text"
              class="form-control"
              name="user_cover_letter"
              placeholder="Enter cover letter link"
              value={formData.user_cover_letter} //Prefill with user data
              onChange={handleChange}
            />
          </div>

          {/* Resume */}
          <div class="mb-3">
            <label class="form-label">Resume:</label>
            <input
              type="text"
              class="form-control"
              name="user_resume_link"
              placeholder="Enter resume link"
              value={formData.user_resume_link} //Prefill with user data
              onChange={handleChange}
            />
          </div>

          {/* Projects */}
          <div class="mb-3">
            <label class="form-label">Projects:</label>
            <input
              type="text"
              class="form-control"
              name="user_project"
              placeholder="Enter projects link"
              value={formData.user_project} //Prefill with user data
              onChange={handleChange}
            />
          </div>

          {/* Save Button */}
          <button type="submit" class="btn btn-primary custom-btn">
            Save
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

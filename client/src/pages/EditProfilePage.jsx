import React from 'react'
import "../styling/styles.css";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { ICON_LIST_COMMON } from "../constants.js";
import { useAuth0 } from '@auth0/auth0-react';

export default function EditProfilePage() {

    const { user } = useAuth0();
    

  return (
    <>
        <Header headerTag={"Edit Profile"} iconList={ICON_LIST_COMMON} />
            <div className="form-styling">
                <form className="container mt-4">
                    <div className="mb-3">
                        <label className="form-label">LinkedIn:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="editProfile"
                            placeholder='LinkedIn'
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Github:</label>
                        <div className="mb-2">
                            <input
                                type="text"
                                className="form-control"
                                name="Github"
                                placeholder="Github"
                            />
                            
                        </div>
                    </div>
                    
                    <div className="mb-3">
                        <label className="form-label">Twitter:</label>
                        <div className="mb-2"></div>
                            <input
                                type="text"
                                className="form-control mt-2"
                                name="Twitter"
                                placeholder="Twitter"
                            />
                        </div>

                    <div className="mb-3">
                        <label className="form-label">Major:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="major"
                            placeholder="Enter your major"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Work Experience:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="workExp"
                            placeholder='Enter your work experience in years'
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Cover Letter:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="coverLetter"
                            placeholder='Enter your cover letter link'
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Resume:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="resume"
                            placeholder='Enter your resume link'
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Projects:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="projects"
                            placeholder='Enter your projects link'  
                        />
                    </div>

                    <button type="submit" className="btn btn-primary custom-btn">
                        Save
                    </button>
                </form>
            </div>
            <Footer />
    </>
  )
}

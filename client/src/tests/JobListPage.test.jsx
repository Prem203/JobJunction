import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import JobTileInfoDisplay from "../components/JobTileInfoDisplay.jsx";
import JobListPage from "../pages/JobListPage.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import { MemoryRouter } from "react-router-dom";
import { useAuthToken } from "../AuthTokenContext";
import { FETCH_ALL_JOBS_ENDPOINT, SAVE_JOB_ENDPOINT } from "../constants.js";
import SelectedJobDisplay from "../components/SelectedJobDisplay.jsx";

jest.mock("@auth0/auth0-react");
jest.mock("../AuthTokenContext");

describe("JobListPage Component Tests", () => {
  const mockUser = {
    name: "Test User",
    email: "testUser@gmail.com",
    picture: "https://example.com/testUser.jpg",
    sub: "auth0|1234567890",
    email_verified: true,
  };

  beforeEach(() => {
    useAuth0.mockReturnValue({
      user: mockUser,
    });
    useAuthToken.mockReturnValue({ accessToken: "fake-token" });
    global.fetch = jest.fn((url, options) => {
      if (
        url === `${process.env.REACT_APP_API_URL}${FETCH_ALL_JOBS_ENDPOINT}` &&
        options.method !== "POST"
      ) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve([
              {
                employer_company_type: "Computer Services",
                employer_logo: "https://image.status.io/z6aeO6kAGsAG.png",
                employer_name: "Upwork",
                employer_website: "http://www.elance.com",
                id: 1,
                job_apply_is_direct: true,
                job_apply_link:
                  "https://www.upwork.com/freelance-jobs/apply/Website-Development-for-Spoken-English-Institute_~013b15fe479763b19c/",
                job_city: null,
                job_country: "United States",
                job_description:
                  "We are looking for a skilled web developer who can build a professional website for our spoken English institute. The website should have a modern and user-friendly design, showcasing our courses, faculty, and testimonials. We want to provide an easy way for potential students to learn about our institute and enroll in our programs. The developer should be proficient in the following skills:\n\n- Web design and development\n\n- HTML/CSS\n\n- JavaScript\n\n- Content management systems\n\n- Responsive design\n\nThe size of this project is medium, with an estimated duration of 1 to 3 months. We are seeking an intermediate-level web developer with experience in building similar educational websites.",
                job_employment_type: "CONTRACTOR",
                job_google_link:
                  "https://www.google.com/search?gl=us&hl=en&rciv=jb&q=web+development&start=90&ibp=htl;jobs#fpstate=tldetail&htivrt=jobs&htiq=web+development&htidocid=uJglhtQxAeW4gB8SAAAAAA%3D%3D",
                job_highlights: {
                  Qualifications: [
                    "Web design and development",
                    "HTML/CSS",
                    "JavaScript",
                    "Content management systems",
                    "Responsive design",
                    "We are seeking an intermediate-level web developer with ",
                  ],
                },
                job_id: "uJglhtQxAeW4gB8SAAAAAA==",
                job_is_remote: true,
                job_max_salary: null,
                job_min_salary: null,
                job_offer_expiration_datetime: "12/31/1969, 16:00:00",
                job_offer_expiration_timestamp: null,
                job_posted_at_datetime: "03/21/2024, 07:32:40",
                job_posted_at_timestamp: 1711031560,
                job_publisher: "Upwork",
                job_required_education: {
                  associates_degree: false,
                  bachelors_degree: false,
                  degree_mentioned: true,
                  degree_preferred: false,
                  high_school: false,
                  postgraduate_degree: false,
                  professional_certification: false,
                  professional_certification_mentioned: false,
                },
                job_required_experience: {
                  experience_mentioned: true,
                  experience_preferred: false,
                  no_experience_required: false,
                  required_experience_in_months: null,
                },
                job_required_skills: [
                  "WordPress",
                  "Web Development",
                  "Web Design",
                  "English",
                  "HTML",
                ],
                job_salary_currency: null,
                job_salary_period: null,
                job_state: null,
                job_title: "Website Development for Spoken English Institute",
                query: "web development",
              },
              {
                employer_company_type: "Computer Services",
                employer_logo: "https://image.status.io/z6aeO6kAGsAG.png",
                employer_name: "Upwork",
                employer_website: "http://www.elance.com",
                id: 2,
                job_apply_is_direct: true,
                job_apply_link:
                  "https://www.upwork.com/freelance-jobs/apply/Website-Development-for-Spoken-English-Institute_~013b15fe479763b19c/",
                job_city: null,
                job_country: "United States",
                job_description:
                  "We are looking for a skilled web developer who can build a professional website for our spoken English institute. The website should have a modern and user-friendly design, showcasing our courses, faculty, and testimonials. We want to provide an easy way for potential students to learn about our institute and enroll in our programs. The developer should be proficient in the following skills:\n\n- Web design and development\n\n- HTML/CSS\n\n- JavaScript\n\n- Content management systems\n\n- Responsive design\n\nThe size of this project is medium, with an estimated duration of 1 to 3 months. We are seeking an intermediate-level web developer with experience in building similar educational websites.",
                job_employment_type: "CONTRACTOR",
                job_google_link:
                  "https://www.google.com/search?gl=us&hl=en&rciv=jb&q=web+development&start=90&ibp=htl;jobs#fpstate=tldetail&htivrt=jobs&htiq=web+development&htidocid=uJglhtQxAeW4gB8SAAAAAA%3D%3D",
                job_highlights: {
                  Qualifications: [
                    "Web design and development",
                    "HTML/CSS",
                    "JavaScript",
                    "Content management systems",
                    "Responsive design",
                    "We are seeking an intermediate-level web developer with ",
                  ],
                },
                job_id: "uJglhtQxAeW4gB8SAAAAAA==",
                job_is_remote: true,
                job_max_salary: null,
                job_min_salary: null,
                job_offer_expiration_datetime: "12/31/1969, 16:00:00",
                job_offer_expiration_timestamp: null,
                job_posted_at_datetime: "03/21/2024, 07:32:40",
                job_posted_at_timestamp: 1711031560,
                job_publisher: "Upwork",
                job_required_education: {
                  associates_degree: false,
                  bachelors_degree: false,
                  degree_mentioned: true,
                  degree_preferred: false,
                  high_school: false,
                  postgraduate_degree: false,
                  professional_certification: false,
                  professional_certification_mentioned: false,
                },
                job_required_experience: {
                  experience_mentioned: true,
                  experience_preferred: false,
                  no_experience_required: false,
                  required_experience_in_months: null,
                },
                job_required_skills: [
                  "WordPress",
                  "Web Development",
                  "Web Design",
                  "English",
                  "HTML",
                ],
                job_salary_currency: null,
                job_salary_period: null,
                job_state: null,
                job_title: "Website Development for Spoken English Institute",
                query: "web development",
              },
            ]),
        });
      }

      if (
        url === `${process.env.REACT_APP_API_URL}${SAVE_JOB_ENDPOINT}` &&
        options.method === "POST"
      ) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              job_id: "uJglhtQxAeW4gB8SAAAAAA==",
              saved_id: 7,
              user_id: 1,
            }),
        });
      }

      return Promise.resolve({
        ok: false,
        json: () => Promise.resolve({}),
      });
    });
  });
  test("renders without crashing", () => {
    render(
      <MemoryRouter>
        <JobListPage />
      </MemoryRouter>
    );
    expect(screen.getByText("All Jobs")).toBeInTheDocument();
  });

  test("renders search bar and button", async () => {
    render(
      <MemoryRouter>
        <JobListPage />
      </MemoryRouter>
    );

    const searchBar = screen.getByPlaceholderText("Search for jobs");
    expect(searchBar).toBeInTheDocument();
    const searchButton = screen.getByText("Search");
    expect(searchButton).toBeInTheDocument();
  });
});

// Mock data for a job
const mockJob = {
  employer_name: "Tech Corp",
  job_title: "Software Developer",
  job_min_salary: 60000,
  job_max_salary: 90000,
  job_salary_currency: "USD",
  job_salary_period: "YEAR",
  job_employment_type: "Full-Time",
  job_city: "San Francisco",
  job_state: "CA",
  job_posted_at_timestamp: 1711031560, // A valid timestamp
};

// Test the rendering of JobTileInfoDisplay
describe("JobTileInfoDisplay Component Tests", () => {
  test("Renders with correct job information", () => {
    render(<JobTileInfoDisplay job={mockJob} />);

    // Check that the employer name is displayed
    expect(screen.getByText("Tech Corp")).toBeInTheDocument();

    // Check that the job title is displayed
    expect(screen.getByText("Software Developer")).toBeInTheDocument();

    // Check that the employment type is displayed
    expect(screen.getByText("Full-Time")).toBeInTheDocument();

    // Check that the salary info is displayed
    expect(screen.getByText("$60000-90000/yr")).toBeInTheDocument();

    // Check that the location info is displayed
    expect(screen.getByText("San Francisco, CA")).toBeInTheDocument();
  });

  test("Clicking on job tile triggers an action", () => {
    const onClick = jest.fn(); // Mock function to check if it's called on click

    render(
      <div onClick={onClick}>
        <JobTileInfoDisplay job={mockJob} />
      </div>
    );

    const jobTile = screen.getByText("Software Developer");
    fireEvent.click(jobTile);

    expect(onClick).toHaveBeenCalled(); // Ensure the click event is triggered
  });
});

describe("SelectedJobDisplay Component Tests", () => {
  const mockSelectedJob = {
    employer_name: "Tech Corp",
    job_title: "Software Developer",
    job_apply_link: "https://example.com/apply",
    job_publisher: "Tech Corp Publisher",
    job_min_salary: 60000,
    job_max_salary: 90000,
    job_salary_currency: "USD",
    job_salary_period: "YEAR",
    job_required_education: {
      postgraduate_degree: false,
      professional_certification: false,
      high_school: true,
      associates_degree: false,
      bachelors_degree: true,
      degree_mentioned: true,
      degree_preferred: false,
    },
  };

  test("Renders with correct job information", () => {
    render(<SelectedJobDisplay selectedJob={mockSelectedJob} />);

    // Check the employer name and job title
    expect(screen.getByText("Tech Corp")).toBeInTheDocument();
    expect(screen.getByText("Software Developer")).toBeInTheDocument();

    // Check the job publisher
    expect(screen.getByText("Tech Corp Publisher")).toBeInTheDocument();

    // Check the salary info
    expect(screen.getByText("$60000-90000/yr")).toBeInTheDocument();
  });

  test("Clicking on the apply button opens a new tab", () => {
    const openSpy = jest.spyOn(window, "open").mockImplementation(() => {}); // Mock window.open

    render(<SelectedJobDisplay selectedJob={mockSelectedJob} />);

    const applyButton = screen.getByText("Apply");
    fireEvent.click(applyButton);

    expect(openSpy).toHaveBeenCalledWith(
      "https://example.com/apply",
      "_blank",
      "noopener noreferrer"
    );

    openSpy.mockRestore(); // Restore the original implementation
  });
});

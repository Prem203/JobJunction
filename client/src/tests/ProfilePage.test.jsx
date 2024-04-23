import React from "react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthToken } from "../AuthTokenContext";
import ProfilePage from "../pages/ProfilePage";

jest.mock("@auth0/auth0-react");
jest.mock("../AuthTokenContext");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("ProfilePage Component Tests", () => {
  const mockUser = {
    name: "Test User",
    email: "testUser@gmail.com",
    picture: "https://example.com/testUser.jpg",
    sub: "auth0|1234567890",
    email_verified: true,
  };

  const mockUserData = {
    user_linkedin: "https://www.linkedin.com/in/testuser/",
    user_github: "https://github.com/testuser",
    user_twitter: "https://twitter.com/testuser",
    user_major: "Computer Science",
    user_work_exp: 2,
    user_cover_letter: "https://example.com/coverletter.pdf",
    user_resume_link: "https://example.com/resume.pdf",
    user_project: "Some projects",
    user_id: "1234567890",
  };

  beforeEach(() => {
    useAuth0.mockReturnValue({
      user: mockUser,
    });

    useAuthToken.mockReturnValue({
      accessToken: "fake-token",
    });

    // Mock the fetch response with the user data
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockUserData),
    });
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock states after each test
  });

  test("displays user information and social links correctly", async () => {
    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    });

    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    expect(screen.getByAltText("Profile")).toBeInTheDocument();

    // Test social links
    expect(
      screen.getByText("https://www.linkedin.com/in/testuser/")
    ).toBeInTheDocument();
    expect(screen.getByText("https://github.com/testuser")).toBeInTheDocument();
    expect(
      screen.getByText("https://twitter.com/testuser")
    ).toBeInTheDocument();

    // Test other user-related information
    expect(screen.getByText("Computer Science")).toBeInTheDocument();
    expect(screen.getByText("2 year(s)")).toBeInTheDocument();
    expect(screen.getByText("Some projects")).toBeInTheDocument();

    // Test cover letter and resume links
    expect(screen.getByText("View Resume")).toBeInTheDocument();
    expect(
      screen.getByText("https://example.com/coverletter.pdf")
    ).toBeInTheDocument();
  });
});
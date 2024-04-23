import React from "react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import LandingPage from "../pages/LandingPage"; // Make sure this path is correct
import { useAuth0 } from "@auth0/auth0-react";
import Header from "../components/Header";

jest.mock("@auth0/auth0-react");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("LandingPage Component Tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    useAuth0.mockReturnValue({
      isAuthenticated: false, // Starting with non-authenticated state
    });
  });

  test("renders without crashing and displays expected content", () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    // Assert expected texts are found in the document
    expect(
      screen.getByText("Make your career dreams come true")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Join millions on the best place to get hired.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Find the job that fits your life")
    ).toBeInTheDocument();
  });
});

describe("Header Component Tests", () => {
  // Mock Auth0 with a logout function and an isAuthenticated flag
  const mockLogout = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks(); // Reset mocks before each test
    useAuth0.mockReturnValue({
      isAuthenticated: false, // You can change this based on test cases
      loginWithRedirect: jest.fn(),
      logout: mockLogout,
      user: null,
    });
    useNavigate.mockReturnValue(mockNavigate); // Mock the navigate function
  });

  test("renders with expected headerTag and icons", () => {
    const iconList = ["login", "home", "info"]; // Example icon list
    const headerTag = "Job Junction";

    const { container } = render(
      <MemoryRouter>
        <Header headerTag={headerTag} iconList={iconList} />
      </MemoryRouter>
    );

    // Assert header tag is displayed
    expect(screen.getByText(headerTag)).toBeInTheDocument();

    const navIconsDiv = container.querySelector(".nav-icons");

    expect(navIconsDiv).not.toBeNull();
  });
});

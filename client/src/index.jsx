import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./components/NotFound";
import LandingPage from "./pages/LandingPage.jsx";
import JobListPage from "./pages/JobListPage.jsx";
import SavedJobListPage from "./pages/SavedJobListPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import VerifyUser from "./components/VerifyUser";
import { Auth0Provider } from "@auth0/auth0-react";
import { AuthTokenProvider } from "./AuthTokenContext";

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);

const requestedScopes = ["profile", "email"];

function RequireAuth({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();

  // If the user is not authenticated, redirect to the home page
  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, display the children (the protected page)
  return children;
}

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/verify-user`,
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        scope: requestedScopes.join(" "),
      }}
    >
      <AuthTokenProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/verify-user" element={<VerifyUser />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/jobList" element={<JobListPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/*"
            element={
              <RequireAuth>
                <Routes>
                  <Route path="/savedJobs" element={<SavedJobListPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                </Routes>
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
      </AuthTokenProvider>
    </Auth0Provider>
  </React.StrictMode>
);

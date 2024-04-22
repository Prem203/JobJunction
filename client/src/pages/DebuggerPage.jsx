import React from 'react';
import "../styling/styles.css";
import { useAuth0 } from '@auth0/auth0-react';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { ICON_LIST_COMMON } from "../constants.js";
import { useAuthToken } from '../AuthTokenContext.js';

export default function DebuggerPage() {
    const { user } = useAuth0();
    const { accessToken } = useAuthToken();
    return (
      <>
        <Header headerTag={"Debugger"} iconList={ICON_LIST_COMMON} />
        <div>
          <div>
            <h4>Access Token:</h4>
            <pre>{JSON.stringify(accessToken, null, 2)}</pre>
          </div>
          <div>
            <br></br>
            <h4>User Info</h4>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </div>
        </div>
        <Footer />
      </>
    );
  }

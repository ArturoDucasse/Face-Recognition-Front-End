import React from "react";

/**
 * Handles the info displayed at the Navbar
 * @param {Function} newPath
 * @param {Bool} isSignIn
 * @returns
 */
const Navigation = ({ newPath, isSignIn }) => {
  if (isSignIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => newPath("signout")}
          className="br3 shadow-5 ba b--black-10 mv4 w-100 w-100-m w-25-l mw5 pv3 f3 mr3 pointer"
        >
          Sign Out
        </p>
      </nav>
    );
  }
  return null;
};

export default Navigation;

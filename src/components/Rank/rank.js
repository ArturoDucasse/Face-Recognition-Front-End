import React from "react";

/**
 * Handles the display of the user info and rank in the database
 * @param {String} userName
 * @param {String} userEntries
 * @returns
 */
const Rank = ({ userName, userEntries }) => {
  return <div className="black f3">{`${userName}  # ${userEntries}`}</div>;
};
export default Rank;

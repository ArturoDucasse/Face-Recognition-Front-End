import React from "react";

/**
 * Handles the display of the user info and rank in the database
 * @param {String} userName
 * @param {String} userEntries
 * @returns
 */
const Rank = ({ userName, userEntries }) => {
  return (
    <div>
      <div className="white f3">
        {`${userName}, your current entries are...`}
      </div>
      <div className="white f1">{`${userEntries}`}</div>
    </div>
  );
};
export default Rank;

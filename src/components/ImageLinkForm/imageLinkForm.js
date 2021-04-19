import React from "react";
import "./imageLinkForm.css";

/**
 * Handles the display, and input of information in main page
 * @param {String} onInputChange
 * @param {function} onButtonSubmit
 * @returns
 */
const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className="f3">This magic tool will detect faces in your pictures !</p>
      <div className="center">
        <div className="center form pa4 br3 shadow-2">
          <input
            className="f4 pa2 w-70 center"
            type="tex"
            onChange={onInputChange}
            placeholder="Image URL"
          />
          <button
            className="grow f4 link ph3 pv2 dib white bg-gray"
            onClick={onButtonSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;

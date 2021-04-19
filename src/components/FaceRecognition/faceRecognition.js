import React from "react";
import "./faceRecognition.css";

/**
 * Display the image and, draw squares at the faces location
 * @param {String} imageUrl
 * @param {Array} box
 * @returns
 */
const faceRecognition = ({ imageUrl, box }) => {
  return (
    <div style={{ position: "relative" }}>
      <div className="absolute">
        <img id="inputimage" alt="Face" src={imageUrl} />
        {box.map((imageBox, i) => {
          return (
            <div
              key={i}
              className="bounding-box"
              style={{
                top: imageBox.topRow,
                right: imageBox.rightCol,
                bottom: imageBox.bottomRow,
                left: imageBox.leftCol,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default faceRecognition;

import React from "react";

import Rank from "../Rank/rank";
import ImageLinkForm from "../ImageLinkForm/imageLinkForm";
import FaceRecognition from "../FaceRecognition/faceRecognition";
import "./container.css";

const Container = ({
  userName,
  userEntries,
  onInputChange,
  onButtonSubmit,
  box,
  imageUrl,
}) => {
  return (
    <div className="container center form pa4 br3 shadow-2">
      <div className="inputSide">
        <Rank userName={userName} userEntries={userEntries} />
        <ImageLinkForm
          onInputChange={onInputChange}
          onButtonSubmit={onButtonSubmit}
        />
      </div>
      <div className="imageSide">
        {imageUrl && <FaceRecognition box={box} imageUrl={imageUrl} />}
      </div>
    </div>
  );
};

export default Container;

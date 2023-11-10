// CreateCommuniti3.jsx
import React, { useState } from "react";
import "./CreateCommuniti3.scss";
import calendarImage from "../../../assets/images/calendar.svg";
import chooseFile from "../../../assets/images/choose-file.svg";

function CreateCommuniti3({ image, setImage }) {
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // Do something with the loaded image (e.g., display preview)
        setImage(reader.result);
      };

      reader.readAsDataURL(file);

      // Check file size
      if (file.size > 3000000) {
        alert("File size exceeds 3MB. Please choose a smaller file.");
        e.target.value = null; // Reset the file input
      }
    }
  };

  return (
    <div className="create-communiti3__container">
      <div className="create-communiti3__container-left">
        <h1 className="create-communiti3__container-heading">
          Welcome to your Communiti!
        </h1>
        <form className="create-communiti3__container-form">
          <label
            className="create-communiti3__container-label"
            htmlFor="communiti-icon"
          >
            {image ? "Upload complete!" : "Upload a Communiti image"}
          </label>
          <div className="create-communiti3__container-input-container">
            {image ? (
              <img
                className="create-communiti3__container-preview"
                src={image}
                alt="Preview"
              />
            ) : (
              <>
                <input
                  type="file"
                  id="communiti-icon"
                  name="communiti-icon"
                  className="create-communiti3__container-input visually-hidden"
                  onChange={handleFileInputChange}
                />
                <label
                  htmlFor="communiti-icon"
                  className="create-communiti3__custom-file-input"
                >
                  <img src={chooseFile} alt="Choose File Icon" />
                </label>
                <p className="create-communiti3__container-input-text">
                  drag and drop file or <span> choose file</span>
                </p>
              </>
            )}
          </div>
          {image && (
            <>
              {/* Add any additional content you want to display when an image is uploaded */}
            </>
          )}
          {!image && (
            <p className="create-communiti3__container-input-text--alt">
              supported formats: JPG, PNG, PDF,
              <br /> SVG maximum size: 3MB
            </p>
          )}
        </form>
      </div>
      <div className="create-communiti3__container-right">
        <img
          className="create-communiti3__container-image"
          src={calendarImage}
          alt="Calendar"
        />
      </div>
    </div>
  );
}

export default CreateCommuniti3;

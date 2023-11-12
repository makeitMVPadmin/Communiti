// CreateCommuniti1.jsx
import React, { useState } from "react";
import "./CreateCommuniti1.scss";
import calendarImage from "../../../assets/images/calendar.svg";

function CreateCommuniti1({
  communitiName,
  setCommunitiName,
  selectedOption,
  setSelectedOption,
  location,
  setLocation,
}) {
  const [isLocationEnabled, setLocationEnabled] = useState(false);
  const [isLocation2Enabled, setLocation2Enabled] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setLocationEnabled(event.target.value === "in-person");
    setLocation2Enabled(event.target.value === "hybrid");
  };

  return (
    <div className="create-communiti1__container">
      <div className="create-communiti1__container-left">
        <h1 className="create-communiti1__container-heading">
          Welcome to your Communiti!
        </h1>
        <form className="create-communiti1__container-form">
          <label
            className="create-communiti1__container-label"
            htmlFor="communitiName"
          >
            Communiti Name
          </label>
          <input
            className="create-communiti1__container-input"
            placeholder="Communiti Name"
            type="text"
            name="communitiName"
            id="communitiName"
            value={communitiName}
            onChange={(e) => setCommunitiName(e.target.value)}
          />
          <p className="create-communiti1__container-description">
            Where is the Communiti?
          </p>
          <input
            type="checkbox"
            id="virtual"
            name="virtual"
            value="virtual"
            className="create-communiti1__container-checkbox"
            checked={selectedOption === "virtual"}
            onChange={handleOptionChange}
          />
          <label
            className="create-communiti1__container-checkbox-label"
            htmlFor="virtual"
          >
            Virtual
          </label>
          <div className="create-communiti1__container-checkbox-container">
            <input
              type="checkbox"
              id="hybrid"
              name="hybrid"
              value="hybrid"
              className="create-communiti1__container-checkbox"
              checked={selectedOption === "hybrid"}
              onChange={handleOptionChange}
            />
            <label
              className="create-communiti1__container-checkbox-label"
              htmlFor="hybrid"
            >
              Hybrid
            </label>
            <input
              className={`create-communiti1__container-input create-communiti1__container-input--location ${
                isLocation2Enabled ? "" : "disabled"
              }`}
              placeholder="Location"
              type="text"
              name="location"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={!isLocation2Enabled}
            />
          </div>
          <div className="create-communiti1__container-checkbox-container">
            <input
              type="checkbox"
              id="in-person"
              name="in-person"
              value="in-person"
              className="create-communiti1__container-checkbox"
              checked={selectedOption === "in-person"}
              onChange={handleOptionChange}
            />
            <label
              className="create-communiti1__container-checkbox-label"
              htmlFor="in-person"
            >
              In Person
            </label>
            <input
              className={`create-communiti1__container-input create-communiti1__container-input--location ${
                isLocationEnabled ? "" : "disabled"
              }`}
              placeholder="Location"
              type="text"
              name="location"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={!isLocationEnabled}
            />
          </div>
        </form>
      </div>
      <div className="create-communiti1__container-right">
        <img
          className="create-communiti1__container-image"
          src={calendarImage}
          alt="Calendar"
        />
      </div>
    </div>
  );
}

export default CreateCommuniti1;

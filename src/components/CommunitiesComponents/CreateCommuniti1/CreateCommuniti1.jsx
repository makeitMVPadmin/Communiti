// CreateCommuniti1.jsx
import React, { useState } from "react";
import "./CreateCommuniti1.scss";
import calendarImage from "../../../assets/images/calendar.svg";
import Button from "../../../components/Button/Button";

function CreateCommuniti1({
  communitiName,
  setCommunitiName,
  selectedOption,
  setSelectedOption,
  location,
  setLocation,
  handleBack,
  handleNext,
}) {
  const [isLocationEnabled, setLocationEnabled] = useState(false);

  const handleOptionChange = (event) => {
    const option = event.target.value;

    setSelectedOption((prevSelectedOptions) => {
      // If the option is already selected, remove it
      if (prevSelectedOptions.includes(option)) {
        return prevSelectedOptions.filter(
          (selectedOption) => selectedOption !== option
        );
      }

      // Otherwise, add the option to the selected options
      return [...prevSelectedOptions, option];
    });

    setLocationEnabled(option === "in-person");
  };

  return (
    <div>
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
            <p className="create-communiti1__container-description--alt">
              Choose all that apply
            </p>
            <input
              type="checkbox"
              id="virtual"
              name="virtual"
              value="virtual"
              className="create-communiti1__container-checkbox"
              checked={selectedOption.includes("virtual")}
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
                id="in-person"
                name="in-person"
                value="in-person"
                className="create-communiti1__container-checkbox"
                checked={selectedOption.includes("in-person")}
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
      <div className="create-communiti1__container-bottom">
        <Button
          buttonText="Back"
          className={`button button-back`}
          onClick={handleBack}
        />
        <Button
          buttonText="Next"
          className={`button create-communiti__button-next ${
            !communitiName || (!selectedOption.length && !location)
              ? "button__not-active"
              : "button__active"
          }`}
          onClick={handleNext}
        />
      </div>
    </div>
  );
}

export default CreateCommuniti1;

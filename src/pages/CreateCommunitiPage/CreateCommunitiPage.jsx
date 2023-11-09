import "./CreateCommunitiPage.scss";
import calendarImage from "../../assets/images/calendar.svg";
import backArrow from "../../assets/images/back.svg";
import { useState } from "react";

function CreateCommunitiPage() {
  const [selectedOption, setSelectedOption] = useState("");
  const [isLocationEnabled, setLocationEnabled] = useState(false);
  const [isLocation2Enabled, setLocation2Enabled] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setLocationEnabled(event.target.value === "in-person");
    setLocation2Enabled(event.target.value === "hybrid");
  };

  return (
    <div className="create-communiti">
      <button className="create-communiti__button">
        <img
          className="create-communiti__image create-communiti__image--back-arrow"
          src={backArrow}
          alt="backArrow"
        />
      </button>

      <div className="create-communiti__container">
        <div className="create-communiti__container-left">
          <h1 className="create-communiti__heading">
            Welcome to your Communiti!
          </h1>
          <form className="create-communiti__form">
            <label className="create-communiti__label" for="communitiName">
              What would you like to name it?
            </label>
            <input
              className="create-communiti__input"
              placeholder="Communiti Name"
              type="text"
              name="communitiName"
              id="communitiName"
            />
            <p className="create-communiti__description">
              Where is the Communiti?
            </p>
            <input
              type="checkbox"
              id="virtual"
              name="virtual"
              value="virtual"
              className="create-communiti__checkbox"
              checked={selectedOption === "virtual"}
              onChange={handleOptionChange}
            />
            <label
              className="create-communiti__checkbox-label"
              htmlfor="virtual"
            >
              Virtual
            </label>
            <div className="create-communiti__checkbox-container">
              <input
                type="checkbox"
                id="hybrid"
                name="hybrid"
                value="hybrid"
                className="create-communiti__checkbox"
                checked={selectedOption === "hybrid"}
                onChange={handleOptionChange}
              />
              <label
                className="create-communiti__checkbox-label"
                htmlFor="hybrid"
              >
                Hybrid
              </label>
              <input
                className={`create-communiti__input create-communiti__input--location ${
                  isLocation2Enabled ? "" : "disabled"
                }`}
                placeholder="Location"
                type="text"
                name="location"
                id="location"
                disabled={!isLocation2Enabled}
              />
            </div>
            <div className="create-communiti__checkbox-container">
              <input
                type="checkbox"
                id="in-person"
                name="in-person"
                value="in-person"
                className="create-communiti__checkbox"
                checked={selectedOption === "in-person"}
                onChange={handleOptionChange}
              />
              <label
                className="create-communiti__checkbox-label"
                htmlFor="in-person"
              >
                In Person
              </label>
              <input
                className={`create-communiti__input create-communiti__input--location ${
                  isLocationEnabled ? "" : "disabled"
                }`}
                placeholder="Location"
                type="text"
                name="location"
                id="location"
                disabled={!isLocationEnabled}
              />
            </div>
          </form>
        </div>
        <div className="create-communiti__container-right">
          <img
            className="create-communiti__image"
            src={calendarImage}
            alt="Calendar"
          />
        </div>
      </div>
    </div>
  );
}

export default CreateCommunitiPage;

import { useState } from "react";
import "./CreateCommuniti2.scss";
import calendarImage from "../../../assets/images/calendar.svg";
import Button from "../../../components/Button/Button";

function CreateCommuniti2({
  communitiDescription,
  setCommunitiDescription,
  handleBack,
  handleNext,
}) {
  const maxLength = 500;
  const [text, setText] = useState(communitiDescription);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= maxLength) {
      setText(inputValue);
      setCommunitiDescription(inputValue);
    }
  };

  return (
    <div className="create-communiti2">
      <div className="create-communiti2__content">
        <div className="create-communiti2__content-container">
          <div className="create-communiti2__content-container-left">
            <h1 className="create-communiti2__content-heading">
              Welcome to your Communiti!
            </h1>
          </div>
          <div className="create-communiti2__content-container-right">
            <img
              className="create-communiti2__content-image"
              src={calendarImage}
              alt="Calendar"
            />
          </div>
        </div>
        <form className="create-communiti2__content-form">
          <label
            className="create-communiti2__content-label"
            htmlFor="communitiDescription"
          >
            How would you describe your Communiti?
          </label>
          <div className="create-communiti2__content-textarea-container">
            <textarea
              className="create-communiti2__content-textarea"
              placeholder="Communiti Description"
              id="communitiDescription"
              name="communitiDescription"
              value={text}
              onChange={handleInputChange}
              maxLength={maxLength}
            />
            <p className="create-communiti2__content-character-count">
              {maxLength - text.length}/500 characters
            </p>
          </div>
        </form>
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
            !communitiDescription ? "button__not-active" : "button__active"
          }`}
          onClick={handleNext}
        />
      </div>
    </div>
  );
}

export default CreateCommuniti2;

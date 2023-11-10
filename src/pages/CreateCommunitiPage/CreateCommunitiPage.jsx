import React, { useState } from "react";
import "./CreateCommunitiPage.scss";
import CreateCommuniti1 from "../../components/CommunitiesComponents/CreateCommuniti1/CreateCommuniti1";
import CreateCommuniti2 from "../../components/CommunitiesComponents/CreateCommuniti2/CreateCommuniti2";
import CreateCommuniti3 from "../../components/CommunitiesComponents/CreateCommuniti3/CreateCommuniti3";
import backArrow from "../../assets/images/back.svg";
import Button from "../../components/Button/Button";

function CreateCommunitiPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [communitiName, setCommunitiName] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [location, setLocation] = useState("");
  const [communitiDescription, setCommunitiDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleNext = () => {
    if (
      currentStep === 1 &&
      communitiName &&
      (selectedOption !== "hybrid" || location)
    ) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 2 && communitiDescription) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 3 && image) {
      // Perform any additional actions needed for the last step
      console.log("Communiti creation complete!");
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="create-communiti">
      <button className="create-communiti__button-back" onClick={handleBack}>
        <img
          className="create-communiti__back-arrow"
          src={backArrow}
          alt="backArrow"
        />
      </button>
      <div className="create-communiti__container">
        {currentStep === 1 && (
          <CreateCommuniti1
            communitiName={communitiName}
            setCommunitiName={setCommunitiName}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            location={location}
            setLocation={setLocation}
          />
        )}
        {currentStep === 2 && (
          <CreateCommuniti2
            communitiDescription={communitiDescription}
            setCommunitiDescription={setCommunitiDescription}
          />
        )}
        {currentStep === 3 && (
          <CreateCommuniti3 image={image} setImage={setImage} />
        )}
      </div>
      {currentStep <= 3 && (
        <Button
          buttonText={currentStep === 3 ? "Done" : "Next"}
          className={`button create-communiti__button-next ${
            (currentStep === 1 &&
              (!communitiName || (selectedOption === "hybrid" && !location))) ||
            (currentStep === 2 && !communitiDescription) ||
            (currentStep === 3 && !image)
              ? "button__not-active"
              : "button__active"
          }`}
          onClick={handleNext}
        />
      )}
    </div>
  );
}

export default CreateCommunitiPage;

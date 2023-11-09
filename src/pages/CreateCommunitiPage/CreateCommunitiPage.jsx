import "./CreateCommunitiPage.scss";
import calendarImage from "../../assets/images/calendar.svg";

function CreateCommunitiPage() {
  return (
    <>
      <div className="create-communiti">
        <div className="create-communiti__container">
          <h1 className="create-communiti__heading">
            Welcome to your Communiti!
          </h1>
          <div className="create-communiti__content">
            <div className="create-communiti__content-left">
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
                  name="location"
                  value="virtual"
                  className="create-communiti__checkbox"
                />
                <label
                  className="create-communiti__checkbox-label"
                  for="virtual"
                >
                  Virtual
                </label>
                <input
                  type="checkbox"
                  id="in-person"
                  name="location"
                  value="in-person"
                  className="create-communiti__checkbox"
                />
                <label
                  className="create-communiti__checkbox-label"
                  for="in-person"
                >
                  In Person
                </label>
              </form>
            </div>
            <div className="create-communiti__content-left">
              <img
                className="create-communiti__image"
                src={calendarImage}
                alt="Calendar"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateCommunitiPage;

import "./Announcements.scss";
import clockIcon from "../../assets/images/clockIcon.svg";
import PlaceHolderIcon from "../../assets/images/PlaceHolderIcon.png";

function Announcements() {
  return (
    <>
      <div className="dashboard-page__post-container">
        <div className="dashboard-page__icon-heading">
          <img
            src={PlaceHolderIcon}
            alt="Placeholder for user profile"
            className="dashboard-page__profile-image"
          />

          <div className="dashboard-page__heading">
            <div className="dashboard-page__name">Early Career Designers</div>
            <div className="dashboard-page__time-posted">
              <img
                src={clockIcon}
                alt="Clock icon"
                className="dashboard-page__clock"
              />
              <p className="dashboard-page__time">10 hours ago</p>
            </div>
          </div>
        </div>
        <div className="dashboard-page__content">
          <p className="dashboard-page__text">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos ex,
            inventore voluptate quidem delectus, saepe vitae, illum odit optio
            ullam voluptas excepturi laborum ipsum voluptatibus! Ut eos
            asperiores assumenda unde!
          </p>
        </div>
      </div>
    </>
  );
}

export default Announcements;

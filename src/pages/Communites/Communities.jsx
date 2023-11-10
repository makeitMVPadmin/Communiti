import "./Communities.scss";
import { Link } from "react-router-dom";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import back from "../../assets/images/back.svg";
import profilePicBlack from "../../assets/images/profilePicBlack.svg";
import locationPin from "../../assets/images/locationPin.svg";
import profilePicBlack2 from "../../assets/images/profilePicBlack2.svg";

function Communities() {
  return (
    <div className="communities">
      <DashboardNavbar />
      <div className="communities-top">
        <Link className="communities-back" to="/dontKnowYet">
          <img
            className="communities-back-button"
            src={back}
            alt="back button"
          />
          <span className="communities-back-text">Back to Communities</span>
        </Link>
      </div>
      <div className="communities-middle">
        <div className="communities-middle-image">
          <img src={profilePicBlack} alt="black profile pic" />
        </div>
        <div className="communities-middle-text">
          <h1>Product Pitchers</h1>
          <img src={locationPin} alt="location pin" />
          <span className="communities-location-text">
            San Francisco, Remote
          </span>
          <img src={profilePicBlack2} alt="black profile pic" />
          <span className="communities-members-text">25 members</span>
        </div>
      </div>
      <div className="communities-description-container">
        <div className="communities-description-text">
          <h2 className="communities-description-header">Description</h2>
          <span className="communities-description-words">
            Lorem ipsum dolor sit amet consectetur. Diam massa odio erat pretium
            id. Ultrices egestas et dictumst at ridiculus sit viverra. Nulla
            pretium tristique cras elit ullamcorper tincidunt. Metus consequat
            amet eget et sapien amet.
          </span>
        </div>
      </div>
    </div>
  );
}

export default Communities;

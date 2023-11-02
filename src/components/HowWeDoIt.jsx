import React from "react";
import hands from "../images/hands.svg";
import calendar from "../images/calendar.svg";
import inbox from "../images/inbox.svg";
import update from "../images/update.svg";
import "./HowWeDoIt.scss";

const HowWeDoIt = () => {
  return (
    <div className="how">
      <div className="how_content">
        <div className="how_icon_container">
          <img src={hands} alt="hands" />
        </div>
        <h2 className="how_header">HOW WE DO IT</h2>
        <div className="how_images">
          <img className="how_image" src={calendar} alt="events" />
          <div className="left-align-section">
            {" "}
            {/* Apply the class to the section */}
            <h3 className="underlined">Events</h3>
            <p className="paragraph">
              Stop forgetting your upcoming events. Track them all with your
              Communiti calendar.
            </p>
          </div>
          <img className="how_image" src={inbox} alt="inbox" />
          <div className="left-align-section">
            {" "}
            {/* Apply the class to the section */}
            <h3 className="underlined">Inbox</h3>
            <p className="paragraph">
              Keep in touch with new connections and nurture existing ones with
              your Communiti inbox.
            </p>
          </div>
          <img className="how_image" src={update} alt="update" />
          <div className="left-align-section">
            {" "}
            {/* Apply the class to the section */}
            <h3 className="underlined">Updates</h3>
            <p className="paragraph">
              Subscribe for newsletters and announcements from the organizations
              you're a part of so you can keep up with the latest info.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowWeDoIt;

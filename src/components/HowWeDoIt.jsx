
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
        <h1 className="how_header">HOW WE DO IT</h1>
        <div className="how_images">
          <img className="how_image" src={calendar} alt="events" />
          <img className="how_image" src={inbox} alt="inbox" />
          <img className="how_image" src={update} alt="update" />
        </div>
      </div>
    </div>
  );
};

export default HowWeDoIt;

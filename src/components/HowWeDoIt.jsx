
import React from "react";
import hands from "../images/hands.svg";
import events from "../images/events.svg";
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
          <img src={events} alt="events" />
          <img src={inbox} alt="inbox" />
          <img src={update} alt="update" />
        </div>
      </div>
    </div>
  );
};

export default HowWeDoIt;

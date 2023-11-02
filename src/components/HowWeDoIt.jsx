
import React from "react";
import hands from "../images/hands.svg";
import events from "../images/events.svg";
import inbox from "../images/inbox.svg";
import update from "../images/update.svg";
import "./HowWeDoIt.scss";

const HowWeDoIt = () => {
  return (
    <div className="home">
      <div className="home_content">
        <div className="home_icon_container">
          <img src={hands} alt="hands" />
        </div>
        <h1 className="home_header">HOW WE DO IT</h1>
        <div className="home_images">
          <img src={events} alt="events" />
          <img src={inbox} alt="inbox" />
          <img src={update} alt="update" />
        </div>
      </div>
    </div>
  );
};

export default HowWeDoIt;

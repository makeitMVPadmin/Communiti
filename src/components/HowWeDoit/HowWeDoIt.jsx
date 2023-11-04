import React from "react";
import hands from "../../assets/images/hands.svg";
import calendar from "../../assets/images/calendar.svg";
import inbox from "../../assets/images/inbox.svg";
import update from "../../assets/images/update.svg";

import "./HowWeDoIt.scss";

const HowWeDoIt = () => {
  return (
    <section className="how">
      <img className="how__hands" src={hands} alt="hands" />
      <h2 className="how__header">HOW WE DO IT</h2>
      <div className="how__images">
        <div className="how__container">
          <img className="how__image" src={calendar} alt="events" />
          <div className="how__containers">
            <h3 className="how__sub-header">Events</h3>
            <p className="how__paragraph">
              Stop forgetting your upcoming events. Track them all with your
              Communiti calendar.
            </p>
          </div>
        </div>
        <div className="how__container">
          <img className="how__image" src={inbox} alt="inbox" />
          <div className="how__containers">
            <h3 className="how__sub-header ">Inbox</h3>
            <p className="how__paragraph">
              Keep in touch with new connections and nurture existing ones with
              your Communiti inbox.
            </p>
          </div>
        </div>
        <div className="how__container">
          <img className="how__image" src={update} alt="update" />
          <div className="how__containers">
            <h3 className="how__sub-header">Updates</h3>
            <p className="how__paragraph">
              Subscribe for newsletters and announcements from the organizations
              you're a part of so you can keep up with the latest info.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeDoIt;

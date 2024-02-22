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
            <h3 className="how__sub-header">Calendar Integration</h3>
            <p className="how__paragraph">
              Stop forgetting your upcoming events. Integrate Communiti events into your Google calendar!
            </p>
          </div>
        </div>
        <div className="how__container">
          <img className="how__image" src={inbox} alt="inbox" />
          <div className="how__containers">
            <h3 className="how__sub-header ">Event Discussions</h3>
            <p className="how__paragraph">
              Communicate and organize event logistics with ease with the event's discussion forum.
            </p>
          </div>
        </div>
        <div className="how__container">
          <img className="how__image" src={update} alt="update" />
          <div className="how__containers">
            <h3 className="how__sub-header">Attendee Management</h3>
            <p className="how__paragraph">
              Effortlessly organize, track, and engage with event participants for enhanced attendee experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeDoIt;

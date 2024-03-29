import React from "react";
import "./AddToCalendarButton.scss";
import calendarPlus from "../../assets/images/calendarPlus.svg"




const AddToCalendarButton = ({event}) => {
  // let event = [
  //   {
  //     title: "Test 1",
  //     startTime: "2024-02-14T21:38:00.000Z".replace(/[^a-zA-Z0-9]/g, ""),
  //     endTime: "2024-02-14T23:38:00.000Z".replace(/[^a-zA-Z0-9]/g, ""),
  //     description: "Test description",
  //     locationType: "Zoom",
  //   },
    
  // ];
  // const { event.title, event.startTime, event.endTime, event.description, event.locationType } = events[0];
  const title = event.title 
  const startTime = event.startTime.replace(/[^a-zA-Z0-9]/g, "")
  const endTime = event.endTime.replace(/[^a-zA-Z0-9]/g, "")
  const description = event.description
  const locationType = event.locationType
  const eventUrl = encodeURI(
    `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${description}&location=${locationType}`
  );

  return (
    <a
      href={eventUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="addToCalendarButton"
    >
      <button type="button" className="calendar-button">
        <img
          src={calendarPlus}
          alt="add to calendar"
          className="calendar-icon"
        />
        <span className="calendar-text">Add to Calendar</span>
      </button>
    </a>
  );
};

export default AddToCalendarButton;

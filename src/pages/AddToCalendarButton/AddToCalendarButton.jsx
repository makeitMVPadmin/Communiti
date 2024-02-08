
import React from "react";



import "./AddToCalendarButton.scss";

const AddToCalendarButton = () => {
  let events = [
    {
      title: "Test 1",
      startTime: "20240217T150002",
      endTime: "20240217T164500",
      description: "Test description",
      locationType: "Zoom",
    
    },
  ];
  const { title, startTime, endTime, description, locationType } = events[0];
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
      <button type="button">Add to Google Calendar</button>
    </a>
  );
};

export default AddToCalendarButton;

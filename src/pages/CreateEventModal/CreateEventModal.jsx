import React, { useState } from "react";
import "./CreateEventModal.scss";

function CreateEventModal() {
  const [eventTitle, setEventTitle] = useState("");
  const [titleCharCount, setTitleCharCount] = useState(0);
  const [description, setDescription] = useState("");
  const [descriptionCharCount, setDescriptionCharCount] = useState(0);
  const [locationType, setLocationType] = useState("venue");
  const [venueAddress, setVenueAddress] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [timezone, setTimezone] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const handleLocationChange = (event) => {
    setLocationType(event.target.value);
  };

  const handleVenueAddressChange = (event) => {
    setVenueAddress(event.target.value);
  };
  const handleTimezoneChange = (event) => {
    setTimezone(event.target.value);
  };

  const handleThumbnailChange = (event) => {
    setThumbnail(event.target.files[0]);
  };
  const handleEventTitleChange = (e) => {
    setEventTitle(e.target.value);
    setTitleCharCount(e.target.value.length); // Update character count
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setDescriptionCharCount(e.target.value.length); // Update character count for description
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="event-form-container">
      <h2>Create an Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="eventTitle">Event Title*</label>
          <input
            type="text"
            id="eventTitle"
            value={eventTitle}
            onChange={handleEventTitleChange}
            maxLength="80"
            placeholder="How AI can help us in Marketing"
          />
          <span className="char-count">{titleCharCount}/80 characters</span>{" "}
        </div>

        <div className="input-group">
          <label htmlFor="description">Description*</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            maxLength="250" 
            placeholder="Come learn about different ways you can meet investors and learn how to pitch to them. Join us and please come learn about different ways you can meet investors and learn how to pitch to them."
          ></textarea>
          <span className="char-count">
            {descriptionCharCount}/250 characters
          </span>
        </div>
        <label htmlFor="date">Date*</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <div className="location-section">
          <p>Location*</p>
          <label htmlFor="venue">
            <input
              type="radio"
              id="venue"
              name="locationType"
              value="venue"
              checked={locationType === "venue"}
              onChange={handleLocationChange}
            />
            Venue
          </label>
          {locationType === "venue" && (
            <input
              type="text"
              value={venueAddress}
              onChange={handleVenueAddressChange}
              placeholder="213 Seymour St., Denver"
            />
          )}
          <label htmlFor="online">
            <input
              type="radio"
              id="online"
              name="locationType"
              value="online"
              checked={locationType === "online"}
              onChange={handleLocationChange}
            />
            Online
          </label>
        </div>

        <label htmlFor="startTime">Start Time</label>
        <input
          type="time"
          id="startTime"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />

        <label htmlFor="endTime">End Time</label>
        <input
          type="time"
          id="endTime"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <label htmlFor="timezone">Timezone</label>
        <select id="timezone" value={timezone} onChange={handleTimezoneChange}>
          <option value="">Select Timezone</option>
          <option value="GMT-0800">
            (GMT -8:00) Pacific Time (US & Canada)
          </option>
          <option value="GMT-0500">
            (GMT -5:00) Eastern Time (US & Canada)
          </option>
          <option value="GMT">(GMT) Greenwich Mean Time, London</option>
          <option value="GMT+0100">
            (GMT +1:00) Central European Time, Paris
          </option>
          <option value="GMT+0530">
            (GMT +5:30) India Standard Time, New Delhi
          </option>
          <option value="GMT+0800">
            (GMT +8:00) China Standard Time, Beijing
          </option>
          <option value="GMT+1000">
            (GMT +10:00) Eastern Australia, Sydney
          </option>
        </select>

        <div className="upload-thumbnail-section">
          <label htmlFor="thumbnail">Upload a Thumbnail Image</label>
          <input
            type="file"
            id="thumbnail"
            onChange={handleThumbnailChange}
            accept=".jpg, .png, .pdf, .svg"
          />
          <span>Supported formats: JPG, PNG, PDF, SVG. Maximum size: 10MB</span>
        </div>

        <button type="button">Cancel</button>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateEventModal;

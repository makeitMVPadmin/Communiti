import "./EditEventModal.scss";
import { useState, useEffect } from "react";
// import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// import { db, storage } from "../../Firebase/FirebaseConfig";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import chooseFile from "../../assets/images/choose-file.svg";
import exitIcon from "../../assets/images/exit.svg";
import moment from "moment-timezone";
const { DateTime } = require("luxon");


function EditEventModal({ setEditEvent, eventDetails }) {
  const [eventTitle, setEventTitle] = useState(eventDetails.title);
  // here, just do length of the incoming title
  const [titleCharCount, setTitleCharCount] = useState(eventTitle.length);
  const [description, setDescription] = useState(eventDetails.description);
  const [descriptionCharCount, setDescriptionCharCount] = useState(
    description.length
  );
  const [locationType, setLocationType] = useState(eventDetails.locationType);
  const [venueAddress, setVenueAddress] = useState(eventDetails.venueAddress);
  const [date, setDate] = useState(eventDetails.date);
  const [startTime, setStartTime] = useState(DateTime.fromISO(eventDetails.startTime));
  const [startTimeDisplay, setStartTimeDisplay] = useState(DateTime.fromISO(eventDetails.startTime).toFormat("HH:mm"));
  const [endTime, setEndTime] = useState(DateTime.fromISO(eventDetails.endTime));
  const [endTimeDisplay, setEndTimeDisplay] = useState(DateTime.fromISO(eventDetails.endTime).toFormat("HH:mm"));
  const [timezone, setTimezone] = useState(eventDetails.timezone);
  const [image, setImage] = useState(null);
  const [timezoneOptions, setTimezoneOptions] = useState([]);
  const [userTimezone, setUserTimezone] = useState("");
  
  const handleLocationChange = (event) => {
    setLocationType(event.target.value);
  };

  const handleVenueAddressChange = (event) => {
    setVenueAddress(event.target.value);
  };
  const handleTimezoneChange = (event) => {
    setTimezone(event.target.value);
  };

  const handleEventTitleChange = (e) => {
    setEventTitle(e.target.value);
    setTitleCharCount(e.target.value.length); // Update character count
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setDescriptionCharCount(e.target.value.length); // Update character count for description
  };

  const handleStartTimeChange = (e) => {
    let time = `${date}T${e.target.value}`
    setStartTime(DateTime.fromISO(time));
    setStartTimeDisplay(DateTime.fromISO(time).toFormat("HH:mm"))
  };

  const handleEndTimeChange = (e) => {
    let time = `${date}T${e.target.value}`
    setEndTime(DateTime.fromISO(time));
    setEndTimeDisplay(DateTime.fromISO(time).toFormat("HH:mm"))
  };

  useEffect(() => {
    // Generate time zone options dynamically
    const generateTimeZoneOptions = () => {
      const timeZones = moment.tz.names();
      const timeZoneOptions = timeZones.map((tz) => ({
        value: tz,
        label: `${tz} (UTC${moment.tz(tz).format("Z")})`,
      }));
      return timeZoneOptions;
    };

    // Set the time zone options in state
    setTimezoneOptions(generateTimeZoneOptions());

    // Detect user's time zone
    const detectUserTimezone = () => {
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setUserTimezone(userTimeZone);
      console.log(eventDetails.startTime)
    };

    // Call the function to detect user's time zone
    detectUserTimezone();
  }, []);

  const handleEdit = (e) => {
    e.preventDefault();

    const eventID = eventDetails.id;
    const updatedEvent = {
      title: eventTitle,
      description,
      venue: locationType === "venue" ? venueAddress : "Online",
      date,
      startTime,
      endTime,
      timezone,
    };
    fetch(`http://localhost:3001/events/${eventID}`, {
      method: "PATCH", // Use appropriate HTTP method for writing data
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEvent),
    }).then((r) => {
      if (!r.ok) {
        throw new Error(`HTTP error! Status: ${r.status}`);
      }

      console.log("Event updated successfully in JSON file");
      setEditEvent(false);
    });

  };
 
  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileName = file.name.toLowerCase();
      const isJPEG = fileName.endsWith(".jpg") || fileName.endsWith(".jpeg");
      const isPNG = fileName.endsWith(".png");
      const isPDF = fileName.endsWith(".pdf");
      const isSVG = fileName.endsWith(".svg");

      if (!(isJPEG || isPNG || isPDF || isSVG)) {
        alert("Supported formats: JPG, PNG, PDF, SVG");
        e.target.value = null;
        return;
      }

      if (file.size > 3000000) {
        alert("File size exceeds 3MB. Please choose a smaller file.");
        e.target.value = null;
        return;
      }

      setImage(file);
    }
  };

  return (
    <div
      className={`edit-event-overlay-background ${setEditEvent ? "open" : ""}`}
    >
      <div className="edit-event-overlay">
        <div className="edit-event-overlay__outer-div">
          <div className="edit-event-overlay__title-container">
            <h2 className="edit-event-overlay__title">Edit the Event</h2>
            <img src={exitIcon} onClick={() => setEditEvent(false)} alt="exit form"></img>
          </div>
          <form className="edit-event-overlay__form" onSubmit={handleEdit}>
            <div className="edit-event-overlay__container">
              <label
                className="edit-event-overlay__input-label"
                htmlFor="eventTitle"
              >
                Event Title&#42;
              </label>
              <div className="edit-event-overlay__input-title-container">
                <input
                  className="edit-event-overlay__input-title"
                  type="text"
                  id="eventTitle"
                  value={eventTitle}
                  onChange={handleEventTitleChange}
                  maxLength="80"
                  placeholder="How AI can help us in Marketing"
                />
                <span className="edit-event-overlay__input-count">
                  {titleCharCount}/80 characters
                </span>
              </div>
            </div>
            <div className="edit-event-overlay__input-container">
              <label
                className="edit-event-overlay__input-label"
                htmlFor="description"
              >
                Description&#42;
              </label>
              <div className="edit-event-overlay__input-description-container">
                <textarea
                  className="edit-event-overlay__input-description"
                  id="description"
                  value={description}
                  onChange={handleDescriptionChange}
                  maxLength="250"
                  rows={3}
                  placeholder="Come learn about different ways you can meet investors and learn how to pitch to them. Join us and please come learn about different ways you can meet investors and learn how to pitch to them."
                ></textarea>
                <span className="edit-event-overlay__input-count edit-event-overlay__input-count--description">
                  {descriptionCharCount}/250 characters
                </span>
              </div>
            </div>
            <div className="edit-event-overlay__date-location-venue-timezone-container">
              <div style={{ display: "flex", gap: "2rem" }}>
                <div>
                  <label
                    className="edit-event-overlay__input-label"
                    htmlFor="date"
                  >
                    Date&#42;
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="edit-event-overlay__input-date"
                  />
                </div>
                <div className="edit-event-overlay__bottom-container">
                  <div className="edit-event-overlay__left-container">
                    <div className="edit-event-overlay__input-time-container">
                      <div className="edit-event-overlay__input-time-containers">
                        <label
                          className="edit-event-overlay__input-label"
                          htmlFor="startTime"
                        >
                          Start Time&#42;
                        </label>
                        <input
                          type="time"
                          id="startTime"
                          value={startTimeDisplay}

                          // TODO: input value is not in ISO format
                          // onChange={(e) => setStartTime(e.target.value)}
                          onChange={handleStartTimeChange}
                          className="edit-event-overlay__input-time"
                        />
                      </div>
                      <div className="edit-event-overlay__input-time-containers">
                        <label
                          className="edit-event-overlay__input-label"
                          htmlFor="endTime"
                        >
                          End Time&#42;
                        </label>
                        <input
                          type="time"
                          id="endTime"
                          value={endTimeDisplay}

                          // TODO: input value is not in ISO format
                          // onChange={(e) => setEndTime(e.target.value)}
                          onChange={handleEndTimeChange}
                          className="edit-event-overlay__input-time"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="edit-event-overlay__input-label-container">
                <label
                  className="edit-event-overlay__input-label"
                  htmlFor="timezone"
                >
                  Timezone&#42;
                </label>
                <br />
                <select
                  className="edit-event-overlay__input-select"
                  id="timezone"
                  value={timezone}
                  onChange={handleTimezoneChange}
                >
                  <option value="">Select Timezone</option>
                  {timezoneOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="edit-event-overlay__input-location-container">
                <p className="edit-event-overlay__input-label">
                  Location&#42;
                </p>
                <div>
                  <div className="edit-event-overlay__input-location-container-alt">
                    <input
                      type="radio"
                      id="venue"
                      name="locationType"
                      value="venue"
                      checked={locationType === "Venue"}
                      onChange={handleLocationChange}
                      className="edit-event-overlay__input-location"
                    />
                    <div className="edit-event-overlay__input-venue">
                      <label
                        className="edit-event-overlay__input-sub-label"
                        htmlFor="venue"
                      >
                        Venue
                      </label>
                      {locationType === "Venue" && (
                        <input
                          type="text"
                          value={venueAddress}
                          onChange={handleVenueAddressChange}
                          placeholder="213 Seymour St., Denver"
                          className="edit-event-overlay__input-location-alt"
                        />
                      )}
                    </div>
                  </div>
                  <div className="edit-event-overlay__input-venue-radio">
                    <input
                      type="radio"
                      id="online"
                      name="locationType"
                      value="online"
                      checked={locationType === "online"}
                      onChange={handleLocationChange}
                      className="edit-event-overlay__input-location"
                    />
                    <label
                      className="edit-event-overlay__input-sub-label"
                      htmlFor="online"
                    >
                      Online
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <div className="edit-event-overlay__image-container">
                  <div>
                    <label
                      className="edit-event-overlay__picture-title edit-event-overlay__input-label"
                      htmlFor="communiti-icon"
                    >
                      {image ? "Upload complete!" : "Upload a Thumbnail Image"}
                    </label>
                    <div className="edit-event-overlay__image-container-outer-div">
                      {image ? (
                        <img
                          style={{ width: "40%" }}
                          src={
                            image instanceof File
                              ? URL.createObjectURL(image)
                              : image
                          }
                          alt="Preview"
                        />
                      ) : (
                        <>
                          <input
                            type="file"
                            id="communiti-icon"
                            name="communiti-icon"
                            className="create-communiti3__container-input visually-hidden"
                            onChange={handleFileInputChange}
                            style={{ display: "none" }}
                          />
                          <label
                            htmlFor="communiti-icon"
                            className="create-communiti3__custom-file-input"
                          >
                            <img src={chooseFile} alt="Choose File Icon" />
                          </label>
                          <p className="edit-event-overlay__text">
                            drag and drop file or <span> choose file</span>
                          </p>
                        </>
                      )}
                    </div>
                    {image && <></>}
                    {!image && (
                      <p className="edit-event-overlay__text--alt ">
                        supported formats: JPG, PNG, PDF, SVG
                        <br /> maximum size: 3MB
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="edit-event-overlay__button-containers">
              <button
                className="edit-event-overlay__button edit-event-overlay__button--alt"
                type="button"
                onClick={() => setEditEvent(false)}
              >
                Delete Event
              </button>
              <button className="edit-event-overlay__button" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditEventModal;

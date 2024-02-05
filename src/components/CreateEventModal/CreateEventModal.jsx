import { useState, useEffect } from "react";
import "./CreateEventModal.scss";
import calendar from "../../assets/images/calendar.svg";
import chooseFile from "../../assets/images/choose-file.svg";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db, storage } from "../../Firebase/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import moment from "moment-timezone";

function CreateEventModal({ setEventsOverlay }) {
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
  const [image, setImage] = useState(null);
  const [timezoneOptions, setTimezoneOptions] = useState([]);
  const [userTimezone, setUserTimezone] = useState("");

  const { id } = useParams();

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
    };

    // Call the function to detect user's time zone
    detectUserTimezone();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const imageFileName = image.name || `image_${Date.now()}`;
      const storageRef = ref(storage, `event_thumbnails/${imageFileName}`);
      await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(storageRef);

      const eventsRef = collection(db, `Communities/${id}/Events`);
      const eventData = {
        title: eventTitle,
        description,
        date,
        locationType,
        venueAddress: locationType === "venue" ? venueAddress : null,
        startTime: moment(`${date}T${startTime}`).toISOString(),
        endTime: moment(`${date}T${endTime}`).toISOString(),
        timezone,
        eventImage: imageUrl,
      };

      await addDoc(eventsRef, {
        ...eventData,
        timestamp: serverTimestamp(),
      });

      setEventsOverlay(false);
    } catch (error) {
      console.error("Error adding event: ", error);
    }
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
    <div className="event-overlay-background">
      <div className="event-overlay">
        <h2 className="event-overlay__title">Create an Event</h2>
        <form className="event-overlay__form" onSubmit={handleSubmit}>
          <div className="event-overlay__container">
            <label className="event-overlay__input-label" htmlFor="eventTitle">
              Event Title*
            </label>
            <div className="event-overlay__input-title-container">
              <input
                className="event-overlay__input-title"
                type="text"
                id="eventTitle"
                value={eventTitle}
                onChange={handleEventTitleChange}
                maxLength="80"
                placeholder="How AI can help us in Marketing"
              />
              <span className="event-overlay__input-count">
                {titleCharCount}/80 characters
              </span>
            </div>
          </div>
          <div className="event-overlay__input-container">
            <label className="event-overlay__input-label" htmlFor="description">
              Description*
            </label>
            <div className="event-overlay__input-description-container">
              <textarea
                className="event-overlay__input-description"
                id="description"
                value={description}
                onChange={handleDescriptionChange}
                maxLength="250"
                rows={3}
                placeholder="Come learn about different ways you can meet investors and learn how to pitch to them. Join us and please come learn about different ways you can meet investors and learn how to pitch to them."
              ></textarea>
              <span className="event-overlay__input-count event-overlay__input-count--description">
                {descriptionCharCount}/250 characters
              </span>
            </div>
          </div>
          <div>
            <label className="event-overlay__input-label" htmlFor="date">
              Date*
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="event-overlay__input-date"
            />
          </div>
          <div className="event-overlay__input-location-container">
            <p className="event-overlay__input-label">Location*</p>
            <div className="event-overlay__input-location-container-alt">
              <input
                type="radio"
                id="venue"
                name="locationType"
                value="venue"
                checked={locationType === "venue"}
                onChange={handleLocationChange}
                className="event-overlay__input-location"
              />
              <label className="event-overlay__input-sub-label" htmlFor="venue">
                Venue
              </label>
              {locationType === "venue" && (
                <input
                  type="text"
                  value={venueAddress}
                  onChange={handleVenueAddressChange}
                  placeholder="213 Seymour St., Denver"
                  className="event-overlay__input-location-alt"
                />
              )}
            </div>
            <input
              type="radio"
              id="online"
              name="locationType"
              value="online"
              checked={locationType === "online"}
              onChange={handleLocationChange}
              className="event-overlay__input-location"
            />
            <label className="event-overlay__input-sub-label" htmlFor="online">
              Online
            </label>
          </div>
          <div className="event-overlay__bottom-container">
            <div className="event-overlay__left-container">
              <div className="event-overlay__input-time-container">
                <div className="event-overlay__input-time-containers">
                  <label
                    className="event-overlay__input-label"
                    htmlFor="startTime"
                  >
                    Start Time
                  </label>
                  <input
                    type="time"
                    id="startTime"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="event-overlay__input-time"
                  />
                </div>
                <div className="event-overlay__input-time-containers">
                  <label
                    className="event-overlay__input-label"
                    htmlFor="endTime"
                  >
                    End Time
                  </label>
                  <input
                    type="time"
                    id="endTime"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="event-overlay__input-time"
                  />
                </div>
              </div>
              <label className="event-overlay__input-label" htmlFor="timezone">
                Timezone
              </label>
              <br />
              <select
                className="event-overlay__input-select"
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

              <div className="event-overlay__image-container">
                <div className="create-communiti3__container-form">
                  <label
                    className="create-communiti3__container-label event-overlay__picture-title"
                    htmlFor="communiti-icon"
                  >
                    {image ? "Upload complete!" : "Upload a Thumbnail Image"}
                  </label>
                  <div className="create-communiti3__container-input-container">
                    {image ? (
                      <img
                        className="create-communiti3__container-preview"
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
                        />
                        <label
                          htmlFor="communiti-icon"
                          className="create-communiti3__custom-file-input"
                        >
                          <img src={chooseFile} alt="Choose File Icon" />
                          <p className="create-communiti3__container-input-text event-overlay__text ">
                            drag and drop file or <span> choose file</span>
                          </p>
                        </label>
                      </>
                    )}
                  </div>
                  {image && <></>}
                  {!image && (
                    <p className="create-communiti3__container-input-text--alt event-overlay__text--alt ">
                      supported formats: JPG, PNG, PDF, SVG
                      <br /> maximum size: 3MB
                    </p>
                  )}
                </div>
              </div>
            </div>
            <img className="event-overlay__img" src={calendar} alt="calendar" />
          </div>
          <div className="event-overlay__button-containers">
            <button
              className="event-overlay__button event-overlay__button--alt"
              type="button"
              onClick={() => setEventsOverlay(false)}
            >
              Cancel
            </button>
            <button className="event-overlay__button" type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEventModal;

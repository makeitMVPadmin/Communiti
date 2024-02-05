import { useState, useEffect } from "react";
import "./EditEventModal.scss";
import calendar from "../../assets/images/calendar.svg";
import chooseFile from "../../assets/images/choose-file.svg";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db, storage } from "../../Firebase/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import moment from "moment-timezone";

function EditEventModal({ setEventsOverlay }) {
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
    <div className="edit-event-overlay-background">
      <div className="edit-event-overlay">
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <h2 className="edit-event-overlay__title">Edit the Event</h2>
          <span
            style={{ cursor: "pointer " }}
            onClick={() => setEventsOverlay(false)}
          >
            &#x2715;
          </span>
        </div>
        <form className="edit-event-overlay__form" onSubmit={handleSubmit}>
          <div className="edit-event-overlay__container">
            <label
              className="edit-event-overlay__input-label"
              htmlFor="eventTitle"
            >
              Event Title*
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
              Description*
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
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>
                  <label
                    className="edit-event-overlay__input-label"
                    htmlFor="date"
                  >
                    Date*
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="edit-event-overlay__input-date"
                  />
                </div>
                <div className="edit-event-overlay__input-location-container">
                  <p className="edit-event-overlay__input-label">Location*</p>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div className="edit-event-overlay__input-location-container-alt">
                      <input
                        type="radio"
                        id="venue"
                        name="locationType"
                        value="venue"
                        checked={locationType === "venue"}
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
                        {locationType === "venue" && (
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
                    <div style={{ minHeight: "40px" }}>
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
                <div className="edit-event-overlay__bottom-container">
                  <div className="edit-event-overlay__left-container">
                    <div className="edit-event-overlay__input-time-container">
                      <div className="edit-event-overlay__input-time-containers">
                        <label
                          className="edit-event-overlay__input-label"
                          htmlFor="startTime"
                        >
                          Start Time
                        </label>
                        <input
                          type="time"
                          id="startTime"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="edit-event-overlay__input-time"
                        />
                      </div>
                      <div className="edit-event-overlay__input-time-containers">
                        <label
                          className="edit-event-overlay__input-label"
                          htmlFor="endTime"
                        >
                          End Time
                        </label>
                        <input
                          type="time"
                          id="endTime"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          className="edit-event-overlay__input-time"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label
                  className="edit-event-overlay__input-label"
                  htmlFor="timezone"
                >
                  Timezone
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
                <div
                  className="edit-event-overlay__image-container"
                  style={{ display: "flex" }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                    //  className="create-communiti3__container-form"
                  >
                    <label
                      className="edit-event-overlay__picture-title edit-event-overlay__input-label"
                      htmlFor="communiti-icon"
                    >
                      {image ? "Upload complete!" : "Upload a Thumbnail Image"}
                    </label>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        cursor: "pointer",
                        padding: "15px 30px",
                        margin: "20px 0",
                        border: ".1rem dotted black",
                        height: "175px",
                      }}
                      // className="create-communiti3__container-input-container"
                    >
                      {image ? (
                        <img
                          style={{ width: "40%" }}
                          // className="create-communiti3__container-preview"
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
                          <p
                            // className="create-communiti3__container-input-text edit-event-overlay__text"
                            className="edit-event-overlay__text"
                          >
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
                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>

          <div className="edit-event-overlay__button-containers">
            <button
              className="edit-event-overlay__button edit-event-overlay__button--alt"
              type="button"
              onClick={() => setEventsOverlay(false)}
            >
              Cancel
            </button>
            <button className="edit-event-overlay__button" type="submit">
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEventModal;

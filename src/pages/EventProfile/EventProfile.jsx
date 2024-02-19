import React, { useEffect, useState } from "react";
import "./EventProfile.scss";
import { useNavigate } from "react-router-dom";

import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import placeHolderIcon from "../../assets/images/PlaceHolderIcon.png";
import calendarIcon from "../../assets/images/calendarIcon.svg";
import clockIcon from "../../assets/images/clockIcon.svg";
import location from "../../assets/images/location.svg";
import rightArrowIcon from "../../assets/images/rightArrowIcon.svg";
import profilePic from "../../assets/images/profilePic.svg";
import editIcon from "../../assets/images/edit.svg";
import EditEventModal from "../../components/EditEventModal/EditEventModal";
import { db, auth } from "../../Firebase/FirebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  setDoc,
} from "firebase/firestore";
// import data from "../../../public/DummyData2.json";
export default function EventProfile() {
  const [editEvent, setEditEvent] = useState(false);
  const [editDetails, setEditDetails] = useState({});
  const [eventData, setEventData] = useState(null);

  const eventId = "BSkXvI13omQcXrL5Mqpb";

  //   useEffect(() => {
  //     const fetchEventDetails = async (eventId) => {
  //       try {
  //         const eventDocRef = db.doc(`Events/${eventId}`);
  //         const eventDocSnapshot = await eventDocRef.get();

  //         if (eventDocSnapshot.exists()) {
  //           const { name, date, location } = eventDocSnapshot.data();
  //           setEventDetails({
  //             id: eventDocSnapshot.id,
  //             name,
  //             date,
  //             location,
  //           });
  //         } else {
  //           console.warn("Event not found.");
  //           setEventDetails(null);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching event details:", error);
  //       }
  //     };

  //     if (eventId) {
  //       fetchEventDetails(eventId);
  //     }
  //   }, [eventId]);
  //   useEffect(() => {
  //     const fetchEventData = async () => {
  //       try {
  //         if (eventId) {
  //           const eventRef = doc(collection(db, "Events"), eventId);
  //           const eventDoc = await getDoc(eventRef);

  //           if (eventDoc.exists()) {
  //             const event = eventDoc.data();
  //             setEditDetails(event);
  //           } else {
  //             console.log("No such document!");
  //           }
  //         }
  //       } catch (error) {
  //         console.error("Error fetching document: ", error);
  //       }
  //     };

  //     fetchEventData();
  //   }, [eventId]);

  //   console.log(editDetails);

  //   const eventDetails = {
  //     title: "How AI can help in Marketing",
  //     description:
  //       " Come learn about different ways you can meet investors and learn how to pitch to them Come learn about different ways you can meet investors and learn how to pitch to them",
  //     date: "2023-11-07",
  //     venue: "venue",
  //     startTime: "16:00",
  //     endTime: "17:00",
  //     timezone: "America/Los_Angeles",
  //     address: "213 Seymour st., Denver",
  //     organizedBy: { name: "Marina Reese", position: "Product Manager" },
  //     communityInfo: "Communiti Group",
  //   };

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        // Fetch the JSON file
        const response = await fetch("http://localhost:3005/events");

        // Check if the request was successful (status code 200)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON data
        const jsonData = await response.json();
        // console.log(jsonData[0]);

        // Access the 'events' object
        // const eventsData = jsonData.communities.map(
        //   (community) => community.events
        // );
        // setEventData(eventsData[0][0]);
        setEventData(jsonData[0]);

        // Now you can work with the eventsData array
        // console.log(eventsData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    // Call the fetchEventsData function
    fetchEventsData();
  }, []);
  //   console.log(eventData);
  const eventDetails = eventData;

  const formatDate = (dateString) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    const date = new Date(dateString.replace(/-/g, "/"));
    const day = date.toLocaleDateString("en-US", { weekday: "short" });
    const formattedDate = date.toLocaleDateString("en-US", options);

    return `${formattedDate}`;
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    let period = "AM";

    let hours12 = parseInt(hours, 10);
    if (hours12 >= 12) {
      period = "PM";
      if (hours12 > 12) {
        hours12 -= 12;
      }
    }

    return `${hours12}:${minutes} ${period}`;
  };

  const getTimezoneAbbreviation = (sourceTimezone) => {
    const date = new Date();
    const options = { timeZone: sourceTimezone, timeZoneName: "short" };
    const timezoneAbbreviation = date
      .toLocaleTimeString("en-US", options)
      .split(" ")[2];
    return timezoneAbbreviation;
  };

  const navigate = useNavigate();

  const handleEditButton = () => {
    setEditEvent(!editEvent);
  };

  if (eventData) {
    return (
      <>
        {/* <DashboardNavbar /> */}
        <main className="event-profile">
          <div className="event-profile__container">
            <img className="event-profile__image" src={placeHolderIcon} />
            <div className="event-profile__header-container">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h1 className="event-profile__header">{eventDetails.title}</h1>
                <p className="event-profile__content-text">
                  {eventDetails.description}
                </p>
              </div>
              <div className="event-profile__edit-calendar-container">
                <div className="event-profile__edit-container">
                  <button
                    className="event-profile__edit-button"
                    onClick={handleEditButton}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: ".5rem",
                      }}
                    >
                      <img src={editIcon} />
                      <p>Edit Event</p>
                    </div>
                  </button>
                </div>
                <div>Add to Calendar</div>
              </div>
            </div>
            <div className="event-profile__content-communiti-organizer-container">
              <div className="event-profile__content-communiti-container">
                <div className="event-profile__content-container">
                  <div className="event-profile__content-details-container">
                    <div className="event-profile__content-details-div">
                      <img
                        src={calendarIcon}
                        className="event-profile__content-details-image"
                      />
                      <p className="event-profile__content-details-text">
                        {formatDate(eventDetails.date)}
                      </p>
                    </div>
                    <div className="event-profile__content-details-div">
                      <img
                        src={clockIcon}
                        className="event-profile__content-details-image"
                      />
                      <p className="event-profile__content-details-text">
                        {formatTime(eventDetails.startTime)} -{" "}
                        {formatTime(eventDetails.endTime)}{" "}
                        {getTimezoneAbbreviation(eventDetails.timezone)}
                      </p>
                    </div>
                    <div className="event-profile__content-details-div">
                      <img
                        src={location}
                        className="event-profile__content-details-image"
                      />
                      <p className="event-profile__content-details-text">
                        {eventDetails.venueAddress}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="event-profile__communiti-container">
                  <h3 className="event-profile__communiti-header">
                    From the community
                  </h3>
                  <div
                    className="event-profile__communiti-card"
                    onClick={() =>
                      navigate(`/communities/${"iEeWCH0z3B9Pu1zy5gWH"}`)
                    }
                  >
                    <img
                      // src={community?.CommunityImage || placeHolderIcon}
                      src={placeHolderIcon}
                      className="event-profile__communiti-card-profile-pic"
                    />
                    <div className="event-profile__communiti-card-bottom-container">
                      <div className="event-profile__communiti-card-bottom-inner-container">
                        <div>
                          <h6 className="event-profile__communiti-card-heading">
                            {eventDetails.communityInfo}
                          </h6>
                        </div>
                        <div className="event-profile__communiti-card-button-div-container">
                          <button
                            className="event-profile__communiti-card-arrow-button"
                            //   onClick={() =>
                            //     navigate(`/communities/admin/${community?.id}`)
                            //   }
                          >
                            <img
                              src={rightArrowIcon}
                              alt="right arrow button"
                              className="event-profile__communiti-card-arrow-button-img"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="event-profile__communiti-organizer-container">
                <div className="event-profile__organizer">
                  <h3 className="event-profile__communiti-header">
                    Organized By
                  </h3>
                  <div className="event-profile__organizer-card">
                    <div className="event-profile__organizer-card-profile-pic-container">
                      <img
                        className="event-profile__organizer-card-profile-pic"
                        src={profilePic}
                      />
                    </div>
                    <div className="event-profile__organizer-card-details">
                      <p className="event-profile__organizer-card-details-paragraph-name">
                        {eventDetails.organizedBy.name}
                      </p>
                      <p className="event-profile__organizer-card-details-paragraph-title">
                        {eventDetails.organizedBy.position}
                      </p>
                    </div>
                    {/* <div className="event-profile__organizer-card-details-chat-emoji-container">
                      <img
                        className="event-profile__organizer-card-details-chat-emoji"
                        src={chatIcon}
                      />
                    </div> */}
                  </div>
                </div>
                <div className="event-profile__registrants">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h3 className="event-profile__registrants-header">
                      Registrants (21)
                    </h3>
                    <p style={{ fontSize: "13px", alignSelf: "flex-end" }}>
                      View all
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: ".25rem",
                    }}
                  >
                    {[1, 2, 3, 4].map((registrant) => {
                      return (
                        <div className="event-profile__registrants-card">
                          <div className="event-profile__registrants-card-profile-pic-container">
                            <img
                              className="event-profile__registrants-card-profile-pic"
                              src={profilePic}
                            />
                          </div>
                          <div className="event-profile__registrants-card-details">
                            <p className="event-profile__registrants-card-details-paragraph-name">
                              {eventDetails.organizedBy.name}
                            </p>
                            <p className="event-profile__registrants-card-details-paragraph-title">
                              {eventDetails.organizedBy.position}
                            </p>
                          </div>
                          <div className="event-profile__registrants-card-details-going-container">
                            <p
                              style={{
                                fontSize: "16px",
                                color: "rgba(74, 174, 81, 1)",
                              }}
                            >
                              Going
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        {editEvent ? (
          <div className="event-profile__edit-event">
            <EditEventModal
              setEditEvent={setEditEvent}
              eventDetails={eventDetails}
            />
          </div>
        ) : null}
      </>
    );
  }
}

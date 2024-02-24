import React, { useEffect, useState } from "react";
import "./EventProfile.scss";
import { useNavigate, useParams } from "react-router-dom";

import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import placeHolderIcon from "../../assets/images/PlaceHolderIcon.png";
import calendarIcon from "../../assets/images/calendarIcon.svg";
import clockIcon from "../../assets/images/clockIcon.svg";
import location from "../../assets/images/location.svg";
import rightArrowIcon from "../../assets/images/rightArrowIcon.svg";
import profilePic from "../../assets/images/profilePic.svg";
import EditIcon from "../../assets/images/EditIconWhite.svg";
import EditEventModal from "../../components/EditEventModal/EditEventModal";
import AddToCalendarButton from "../../components/AddToCalendarButton/AddToCalendarButton";
// import { db, auth } from "../../Firebase/FirebaseConfig";
// import {
//   collection,
//   doc,
//   getDoc,
//   getDocs,
//   updateDoc,
//   setDoc,
// } from "firebase/firestore";
const { DateTime } = require("luxon");

export default function EventProfile() {
  const { id } = useParams();
  const [editEvent, setEditEvent] = useState(false);
  const [editDetails, setEditDetails] = useState({});
  const [eventData, setEventData] = useState(null);
  const [community, setCommunity] = useState(null);
  const [rsvpList, setRsvpList] = useState(null);

  const navigate = useNavigate();

  // JSON DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get event
        const response1 = await fetch(`http://localhost:3001/events/${id}`);
        if (!response1.ok) {
          throw new Error("Network response for events was not okay");
        } 
        const eventData = await response1.json();

        // Get event's community data
        const response2 = await fetch(`http://localhost:3001/communities/${eventData.community}`);
        if (!response2.ok) {
          throw new Error("Network response for community was not okay");
        } 
        const communityData = await response2.json();

        // Get user data for event's RSVP list
        const response3 = await fetch(`http://localhost:3001/users`);
        if (!response3.ok) {
          throw new Error("Network response for users was not okay");
        } 
        const userData = await response3.json();
        const list = eventData.rsvpList;
        const filteredUsers = userData.filter(user => list.includes(user.id));

        setEventData(eventData);
        setCommunity(communityData);
        setRsvpList(filteredUsers);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  },[]);

  // FIREBASE DATA
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

  const eventDetails = eventData;



  const handleEditButton = () => {
    setEditEvent(!editEvent);
  };

  if (eventData) {
    return (
      <>
        <DashboardNavbar />
        <main className="event-profile">
          <div className="event-profile__container">
            <img className="event-profile__image" src={eventData.eventImage || placeHolderIcon} alt=""/>
            <div className="event-profile__header-container">
              <div>
                <h1 className="event-profile__header">{eventData.title}</h1>
                <p className="event-profile__content-text">
                  {eventDetails.description}
                </p>
              </div>

              {/* EDIT EVENT & ADD TO CALENDAR BUTTONS */}
              <div className="event-profile__edit-calendar-container">
                <div className="event-profile__edit-container">
                  <button
                    className="event-profile__edit-button"
                    onClick={handleEditButton}
                  >
                    <div className="event-profile__edit-button-inner-div">
                      <img src={EditIcon} alt="Edit button"/>
                      <p>Edit Event</p>
                    </div>
                  </button>
                </div>
                <div>
                  <AddToCalendarButton event={eventData} />
                </div>
              </div>
            </div>

            <div className="event-profile__content-container">
              <div className="event-profile__content-communiti-container">

                {/* DATE, TIME, & LOCATION */}
                {/* <div className="event-profile__content-subcontainer"> */}
                  <div className="event-profile__content-details-container">
                    <div className="event-profile__content-details-div">
                      <img
                        src={calendarIcon}
                        alt="calendar icon"
                        className="event-profile__content-details-image"
                      />
                      <p className="event-profile__content-details-text">
                        {DateTime.fromISO(eventDetails.date).toFormat("ccc, MMM dd, yyyy").toUpperCase()}
                      </p>
                    </div>
                    <div className="event-profile__content-details-div">
                      <img
                        src={clockIcon}
                        alt="clock icon"
                        className="event-profile__content-details-image"
                      />
                      <p className="event-profile__content-details-text">
                        {DateTime.fromISO(eventDetails.startTime).toFormat("t")}
                        &nbsp;- {DateTime.fromISO(eventDetails.endTime).toFormat("t ZZZZ")}
                      </p>
                    </div>
                    <div className="event-profile__content-details-div">
                      <img
                        src={location}
                        alt="location pin icon"
                        className="event-profile__content-details-image"
                      />
                      <p className="event-profile__content-details-text">
                        {eventDetails.locationType === "Virtual" ? 
                          "Virtual" : 
                          eventDetails.venueAddress
                        }
                      </p>
                    </div>
                  </div>
                {/* </div> */}

                {/* COMMUNITY */}
                <div className="event-profile__community-container">
                  <div className="event-profile__community-card">
                    <img
                      src={community.communityImage || placeHolderIcon}
                      alt=""
                      className="event-profile__community-card-image"
                    />
                    <div className="event-profile__community-card-bottom">
                      <h4 className="event-profile__community-card-heading">
                        {community.name}
                      </h4>
                      <button
                        className="event-profile__community-card-arrow-button"
                          onClick={() =>
                            navigate(`/communities/admin/${eventDetails.community}`)
                          }
                      >
                        <img
                          src={rightArrowIcon}
                          alt="right arrow button"
                          className="communities__card-arrow-button-img"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="event-profile__people">
                {/* ORGANIZED BY */}
                <div className="event-profile__people-inner-div">
                  <h2>Organized by</h2>
                  <div className="event-profile__people-card">
                    <div className="event-profile__people-card-profile-pic-container">
                      <img
                        className="event-profile__people-card-profile-pic"
                        src={rsvpList[0].profilePhoto || profilePic}
                        alt=""
                      />
                    </div>
                    <div className="event-profile__people-card-details">
                      <p className="event-profile__people-card-details-paragraph-name">
                        {rsvpList[0].fullName}
                      </p>
                      <p className="event-profile__people-card-details-paragraph-title">
                        {rsvpList[0].discipline}
                      </p>
                    </div>
                  </div>
                  </div>

                {/* REGISTRANTS */}
                <div className="event-profile__people-header">
                  <h2>Registrants ({rsvpList.length - 1})</h2>
                  <p style={{ fontSize: "13px", alignSelf: "flex-end" }}>
                    View all
                  </p>
                </div>
                <div className="event-profile__people-inner-div">
                  {rsvpList.slice(1).map((user, index) => {
                    return (
                      <div
                        key={index}
                        className="event-profile__people-card"
                      >
                        <div className="event-profile__people-card-profile-pic-container">
                          <img
                            className="event-profile__people-card-profile-pic"
                            src={user.profilePhoto || profilePic}
                            alt=""
                          />
                        </div>
                        <div className="event-profile__people-card-details">
                          <p className="event-profile__people-card-details-paragraph-name">
                            {user.fullName}
                          </p>
                          <p className="event-profile__people-card-details-paragraph-title">
                            {user.discipline}
                          </p>
                        </div>
                        <div className="event-profile__people-card-details-going-container">
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

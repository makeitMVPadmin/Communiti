import { Link } from "react-router-dom";
import "./EventsInfo.scss";
import EditIcon from "../../assets/images/EditIconWhite.svg";
import { useState, useEffect } from "react";
// import { db } from "../../Firebase/FirebaseConfig";
// import { collection, getDocs, doc, query, getDoc } from "firebase/firestore";
import data from "../../data.json";
import AddToCalendarButton from "../AddToCalendarButton/AddToCalendarButton";
const { DateTime } = require("luxon");

function EventsInfo({ communityId }) {
  const [events, setEvents] = useState([]);
  const [communityInfo, setCommunityInfo] = useState(null);
  const [sortedEvents, setSortedEvents] = useState([]);

  // useEffect(() => {
  //   const fetchCommunityData = async () => {
  //     try {
  //       if (communityId) {
  //         const communityRef = doc(collection(db, "Communities"), communityId);
  //         const communityDoc = await getDoc(communityRef);

  //         if (communityDoc.exists()) {
  //           const communityData = communityDoc.data();
  //           setCommunityInfo(communityData);
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error fetching community details:", error);
  //     }
  //   };

  //   fetchCommunityData();
  // }, [communityId]);

  useEffect(() => {
    let community = data.communities.filter(c => {return c.id === communityId});
    setCommunityInfo(community[0]);
  },[]);
  console.log(communityInfo);

  useEffect(() => {
    setEvents(data.events);
  },[]);

  // useEffect(() => {
  //   const fetchCommunityEventsData = async () => {
  //     try {
  //       // Proceed only if communityInfo is available
  //       if (communityInfo) {
  //         const eventsQuery = query(
  //           collection(db, "Communities", communityId, "Events")
  //         );
  //         const eventsSnapshot = await getDocs(eventsQuery);
  //         const eventsData = [];

  //         eventsSnapshot.forEach((doc) => {
  //           const { title } = doc.data();
  //           const { description } = doc.data();
  //           const { eventImage } = doc.data();
  //           const { startTime } = doc.data();

  //           eventsData.push({
  //             title,
  //             description,
  //             eventImage,
  //             startTime,
  //           });
  //         });

  //         setEvents(eventsData);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching announcements:", error);
  //     }
  //   };

  //   fetchCommunityEventsData();
  // }, [communityInfo, communityId]);

  const formatDate = (timestamp) => {
    const eventDate = new Date(timestamp);
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    const dayOfWeek = days[eventDate.getUTCDay()];
    const month = months[eventDate.getUTCMonth()];
    const day = eventDate.getUTCDate();
    let hours = eventDate.getUTCHours();
    const minutes = eventDate.getUTCMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours %= 12;
    hours = hours || 12; // 0 should be converted to 12

    const formattedDate = `${dayOfWeek}, ${month} ${day} ${hours}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm} UTC`;
    return formattedDate;
  };

  // Group events in list by date
  const sortAndGroupEvents = (events) => {
    // Create an object and loop through the events list
    const eventsByDate = events.reduce((acc, event) => {
      const { date } = event;
      // If the current event's date does not already exist as a property in the object, 
      // create a new property for that date with an empty array
      acc[date] = acc[date] || [];
      // Push the event to that array
      acc[date].push(event);
      return acc;
    }, {});

    // Sort dates in object
    const sortedDates = Object.keys(eventsByDate).sort();
    
    // Sort events by start time for each date
    sortedDates.forEach(date => {
      eventsByDate[date].sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
    });

    return sortedDates.map(date => (
      { 
        date, 
        events: eventsByDate[date] 
      }
    ));
  };

  useEffect(() => {
    setSortedEvents(sortAndGroupEvents(events));
  }, [events]);

  return (
    <>
      {/* Conditionally rendered message for no events*/}
      {events.length <= 0 && (
        <div className="event-page__empty-message-container">
          <h3 className="event-page__empty-message">
            Your events will appear here when they are available. Get ready for
            something amazing!
          </h3>
        </div>
      )}

      {/* Map through each date */}
      {sortedEvents.map(({ date, events }, index) => (
        <div>
        <Link key={index} to={"/events/1"}>
          <h2 className="event-page__section-text">{DateTime.fromISO(date).toFormat("cccc, MMMM dd")}</h2> 
          
          {/* Map through each event for that date */}
          {events.map(event => (
            <div key={event.id} className="events-info">
              <div className="events-info__thumbnail">
                <img
                  className="events-info__thumbnail-img"
                  src={event.eventImage}
                  alt="Events Thumbnail"
                />
              </div>
              <div className="events-info__details">
                <h2 className="events-info__details-title">{event.title}</h2>
                <p className="events-info__details-datetime">
                  {formatDate(event.startTime)}
                </p>
                <p className="events-info__details-description">
                  {event.description}
                </p>
              </div>
              <div className="events-info__button-container">
                <button className="events-info__button events-info__button-edit">
                  <img src={EditIcon} alt="Edit button" />
                  Edit Event
                </button>
                <AddToCalendarButton event={event} />
              </div>
            </div>
          ))}

        </Link>
        </div>
      ))}
    </>
  );
}

export default EventsInfo;
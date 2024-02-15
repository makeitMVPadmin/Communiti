import "./EventsInfo.scss";
import CheckMark from "../../assets/images/CheckMark-Black.svg";
import PlusIcon from "../../assets/images/PlusIcon-Black.svg";
import { useState, useEffect } from "react";
// import { db } from "../../Firebase/FirebaseConfig";
// import { collection, getDocs, doc, query, getDoc } from "firebase/firestore";
import data from "../../data.json";

function EventsInfo({ communityId }) {
  const [userAttending, setUserAttending] = useState(false);
  const [events, setEvents] = useState([]);
  const [communityInfo, setCommunityInfo] = useState(null);
  const [sortedEvents, setSortedEvents] = useState([]);

  useEffect(() => {
    let events = data.events;
    setEvents(events);
  },[]);
  console.log(events);


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

  const handleAttending = () => {
    // Logic to toggle userAttending state
    setUserAttending(!userAttending);
    // Additional logic to update attending status in the backend
  };

  const attendingClass = userAttending
    ? "events-info__button events-info__button-attending"
    : "events-info__button events-info__button-rsvp";


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
      {events.length <= 0 && <div className="event-page__empty-message-container">
        <h3 className="event-page__empty-message">
          Your events will appear here when they are available. Get ready
          for something amazing!
        </h3>
      </div>}
      {sortedEvents.map(({ date, events }) => (
        <div key={date}>
          <h2 className="event-page__section-text">{date}</h2> 
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
                <p className="events-info__details-description">
                  {event.description}
                </p>
                <p className="events-info__details-datetime">
                  {formatDate(event.startTime)}
                </p>
              </div>
              <button className={attendingClass} onClick={handleAttending}>
                <img
                  src={userAttending ? CheckMark : PlusIcon}
                  alt={userAttending ? "Attending" : "RSVP"}
                />
                {userAttending ? "Attending" : "RSVP"}
              </button>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export default EventsInfo;

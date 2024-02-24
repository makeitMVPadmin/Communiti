import { Link } from "react-router-dom";
import "./EventsInfo.scss";
import EditIcon from "../../assets/images/EditIconWhite.svg";
import PlusIcon from "../../assets/images/PlusIcon-Black.svg";
import EditEventModal from "../../components/EditEventModal/EditEventModal";
import { useState, useEffect } from "react";
// import { db } from "../../Firebase/FirebaseConfig";
// import { collection, getDocs, doc, query, getDoc } from "firebase/firestore";
import AddToCalendarButton from "../AddToCalendarButton/AddToCalendarButton";
const { DateTime } = require("luxon");

function EventsInfo({ eventList }) {
  const [events, setEvents] = useState([]);
  const [sortedEvents, setSortedEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // DATA.JSON
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/events`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        
        const eventsMap = new Map();
        eventList.forEach(event => {
          eventsMap.set(event.id, event.type)
        });
        
        // Filter JSON data for events from eventList
        // Add each event's community type (managed or joined) from eventList
        const ids = eventList.map(event => event.id);
        const eventsData = jsonData
          .filter(event => ids.includes(event.id))
          .map(event => ({
            ...event,
            type: eventsMap.get(event.id)
          }));

        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [eventList]);

  // // FIREBASE DATA
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
  //   let community = data.communities.filter(c => {return c.id === communityId});
  //   setCommunityInfo(community[0]);
  // },[]);
  // console.log(communityInfo);

  // useEffect(() => {
  //   setEvents(data.events);
  // },[]);

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

  const editButton = (event) => {
    return (
      <button 
        className="events-info__button events-info__button-edit"
        onClick={() => handleEditButton(event)}
      >
      <img src={EditIcon} alt="Edit button" />
      Edit Event
    </button>
    )
  };

  const handleEditButton = (event) => {
    setEditEvent(!editEvent);
    setSelectedEvent(event);
  };

  const rsvpButton = (event) => {
    return (
      <button 
        className="events-info__button events-info__button-rsvp"
        // onClick={() => handleEditButton(event)}
      >
      <img src={PlusIcon} alt="RSVP icon" />
      RSVP
    </button>
    )
  };

  return (
    <>
      {/* Conditionally rendered message for no events */}
      {events.length < 1 && (
        <div className="event-page__empty-message-container">
          <h3 className="event-page__empty-message">
            Your events will appear here when they are available. Get ready for
            something amazing!
          </h3>
        </div>
      )}

      {/* Map through each date */}
      {sortedEvents.map(({ date, events }, index) => (
        <div key={date}>
          <h2 className="event-page__section-text">{DateTime.fromISO(date).toFormat("cccc, MMMM dd")}</h2> 
          
          {/* Map through each event for that date */}
          {events.map(event => (
            <div key={event.id} className="events-info">
              <Link key={index} to={"/events/1"} className="events-info__container">
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
                  {DateTime.fromISO(event.startTime).toFormat("ccc, MMM d - t ZZZZ").toUpperCase()} 
                </p>
                <p className="events-info__details-description">
                  {event.description.trim()}
                </p>
              </div>
              </Link>
              
              <div className="events-info__button-container">
                {event.type === "managed" ? editButton(event) : rsvpButton(event)}
                <AddToCalendarButton event={event} />
              </div>
            </div>
          ))}
        </div>
      ))}
      {editEvent ? (
        <div className="event-profile__edit-event">
          <EditEventModal
            setEditEvent={setEditEvent}
            eventDetails={selectedEvent}
          />
        </div>
      ) : null}
    </>
  );
};

export default EventsInfo;

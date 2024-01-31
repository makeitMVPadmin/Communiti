import "./EventsInfo.scss";
import EditIcon from "../../assets/images/EditIconWhite.svg";
import { useState, useEffect } from "react";
import { db } from "../../Firebase/FirebaseConfig";
import { collection, getDocs, doc, query, getDoc } from "firebase/firestore";

function EventsInfo({ communityId, setShowEventsDetails }) {
  const [events, setEvents] = useState([]);
  const [communityInfo, setCommunityInfo] = useState(null);
  

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        if (communityId) {
          const communityRef = doc(collection(db, "Communities"), communityId);
          const communityDoc = await getDoc(communityRef);

          if (communityDoc.exists()) {
            const communityData = communityDoc.data();
            setCommunityInfo(communityData);
          }
        }
      } catch (error) {
        console.error("Error fetching community details:", error);
      }
    };

    fetchCommunityData();
  }, [communityId]);

  useEffect(() => {
    const fetchCommunityEventsData = async () => {
      try {
        // Proceed only if communityInfo is available
        if (communityInfo) {
          const eventsQuery = query(
            collection(db, "Communities", communityId, "Events")
          );
          const eventsSnapshot = await getDocs(eventsQuery);
          const eventsData = [];

          eventsSnapshot.forEach((doc) => {
            const { title } = doc.data();
            const { description } = doc.data();
            const { eventImage } = doc.data();
            const { startTime } = doc.data();

            eventsData.push({
              title,
              description,
              eventImage,
              startTime,
            });
          });

          setEvents(eventsData);
        }
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchCommunityEventsData();
  }, [communityInfo, communityId]);

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

  return (
    <>
      {events.map((event, index) => (
        <div onClick={ () => setShowEventsDetails(true) } key={index} className="events-info">
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
          <button className="events-info__button events-info__button-edit">
            <img src={EditIcon} alt="Edit button" />
            Edit Event
          </button>
        </div>
      ))}
    </>
  );
}

export default EventsInfo;

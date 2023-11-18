import "./EventsInfo.scss";
import EditIcon from "../../assets/images/EditIconWhite.svg";
import { useState, useEffect } from "react";
import { db } from "../../Firebase/FirebaseConfig";
import { collection, getDocs, doc, query, getDoc } from "firebase/firestore";

function EventsInfo({ communityId }) {
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

            eventsData.push({
              title,
              description,
              eventImage,
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

  return (
    <>
      {events.map((event, index) => (
        <div key={index} className="events-info">
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
              WED, NOV 9 4:00 PM PST
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

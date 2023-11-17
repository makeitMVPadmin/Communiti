import "./Event.scss";
import clockIcon from "../../assets/images/clockIcon.svg";
import { useParams } from "react-router-dom";
import { collection, getDocs, doc, query, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/FirebaseConfig";
import { useState, useEffect } from "react";

function Events({ communityData }) {
  const { id } = useParams();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchCommunityEventsData = async () => {
      try {
        if (id) {
          const communityRef = doc(collection(db, "Communities"), id);
          const communityDoc = await getDoc(communityRef);

          if (communityDoc.exists()) {
            const eventsQuery = query(collection(communityRef, "Event"));
            const eventsSnapshot = await getDocs(eventsQuery);
            const eventsData = [];

            eventsSnapshot.forEach((doc) => {
              const { text } = doc.data();

              eventsData.push({
                text,
              });
            });

            setEvents(eventsData);
          }
        }
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchCommunityEventsData();
  }, [id]);

  return (
    <>
      {events.map((event, index) => (
        <div key={index} className="events__post-container">
          <div className="events__icon-heading">
            <img
              src={communityData.CommunityImage}
              alt="Placeholder for user profile"
              className="events__profile-image"
            />
            <div className="events__heading">
              <div className="events__name">{communityData.Name}</div>
              <div className="events__time-posted">
                <img
                  src={clockIcon}
                  alt="Clock icon"
                  className="events__clock"
                />
                <p className="events__time">{event.timestamp}</p>
              </div>
            </div>
          </div>
          <div className="events__content">
            <p className="events__text">{event.text}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default Events;

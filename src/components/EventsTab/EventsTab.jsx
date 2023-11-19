import "./EventsTab.scss";
import { useState, useEffect } from "react";
import { collection, getDocs, doc, query, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/FirebaseConfig";
import { useParams } from "react-router-dom";
import Events from "../Events/Event";

function EventsTab({ communityData }) {
  const [events, setEvents] = useState([]);
  const [hasEvents, setHasEvents] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchCommunityEventsData = async () => {
      try {
        const communityRef = doc(collection(db, "Communities"), id);
        const communityDoc = await getDoc(communityRef);

        if (communityDoc.exists()) {
          const eventsQuery = query(collection(communityRef, "Events"));
          const eventsSnapshot = await getDocs(eventsQuery);

          // Check if there are any events
          setHasEvents(!eventsSnapshot.empty);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchCommunityEventsData();
  }, [id]);

  function noEvents() {
    return (
      <div className="events-tab__none">
        <p className="events-tab__none-writing">
          Bring your community to life!
          <br /> Create events to connect and engage
        </p>
        <button className="events-tab__none-button">+ Create Event</button>
      </div>
    );
  }

  function renderEvents() {
    if (!hasEvents) {
      return noEvents();
    } else {
      return <Events events={events} communityData={communityData} />;
    }
  }

  return (
    <section className="events-tab-background">
      <div className="events-tab-">{renderEvents()}</div>
    </section>
  );
}

export default EventsTab;

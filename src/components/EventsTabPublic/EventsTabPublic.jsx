import "./EventsTabPublic.scss";
import { useState, useEffect } from "react";
import { collection, getDocs, doc, query, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/FirebaseConfig";
import { useParams } from "react-router-dom";
// import Events from "../Events/Event";
import EventsInfo from "../EventsInfo/EventsInfo";
import data from "../../data.json";


function EventsTab({ communityData }) {
  const [events, setEvents] = useState([]);
  const [hasEvents, setHasEvents] = useState(false);
  const { id } = useParams();

  // useEffect(() => {
  //   const fetchCommunityEventsData = async () => {
  //     try {
  //       const communityRef = doc(collection(db, "Communities"), id);
  //       const communityDoc = await getDoc(communityRef);

  //       if (communityDoc.exists()) {
  //         const eventsQuery = query(collection(communityRef, "Events"));
  //         const eventsSnapshot = await getDocs(eventsQuery);

  //         // Check if there are any events
  //         setHasEvents(!eventsSnapshot.empty);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching events:", error);
  //     }
  //   };

  //   fetchCommunityEventsData();
  // }, [id]);


  function noEvents() {
    return (
      <div className="events-tab-public__none">
        <p className="events-tab-public__none-writing">
          Oops! No events found for this community. Events will appear here when they are available. Get
          ready for something amazing!
        </p>
      </div>
    );
  }

  function renderEvents() {
    // if (!hasEvents) {
    //   return noEvents();
    // } else {
    //   return <Events events={events} communityData={communityData} />;
    // }
    // return <Events events={events} communityData={communityData} />;
    return <EventsInfo communityId={id} />;
  }

  return (
    // <section className="events-tab-public-background">
    <section className="events-tab-public__section">
      {renderEvents()}
    </section>
  );
}

export default EventsTab;

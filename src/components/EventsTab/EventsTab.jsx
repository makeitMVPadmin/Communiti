import "./EventsTab.scss";
import { useParams } from "react-router-dom";
import EventsInfo from "../EventsInfo/EventsInfo";

function EventsTab({ communityData, setEventsOverlay, events }) {
  const { id } = useParams();

  function noEvents() {
    return (
      <div className="events-tab__none">
        <p className="events-tab__none-writing">
          Share important updates with your community. Spark curiosity and keep
          everyone informed.
        </p>
        <button
          className="events-tab__none-button"
          onClick={() => setEventsOverlay(true)}
        >
          + Create Events
        </button>
      </div>
    );
  }

  function someEvents() {
    return (
      <div className="events-tab__some">
        <div className="events-tab__date-container">
          <label className="events-tab__date-text">Date Range</label>
          <div className="events-tab__dates-container">
            <input
              type="date"
              id="startDate"
              name="startDate"
              className="events-tab__date-input"
            />
            <p className="events-tab__date-text events-tab__date-text--alt">
              -
            </p>
            <input
              type="date"
              id="endDate"
              name="endDate"
              className="events-tab__date-input"
            />
          </div>
        </div>
        <button
          className="events-tab__none-button"
          onClick={() => setEventsOverlay(true)}
        >
          + Create Events
        </button>
      </div>
    );
  }

  return (
    <section className="events-tab-background">
      <div className="events-tab-">
        {events.length === 0 ? noEvents() : someEvents()}
      </div>
      <EventsInfo communityData={communityData}/>
    </section>
  );
}

export default EventsTab;

import EventsNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import "./EventsPage.scss";
function EventsHomePage() {
  return (
    <div className="event-page">
      <EventsNavbar />
      <div className="event-page__container">
        <div className="event-page__filters">
          <select id="myDropdown" className="event-page__dropdown">
            <option value="option1">All Events</option>
            <option value="option2">Created By Me</option>
            <option value="option3">My Communiti Events</option>
          </select>
          <div className="event-page__date-container">
            <label className="event-page__date-text">Select Date Range</label>
            <div className="event-page__dates-container">
              <input
                type="date"
                id="startDate"
                name="startDate"
                className="event-page__date-input"
              />
              <p className="event-page__date-text event-page__date-text--alt">
                -
              </p>
              <input
                type="date"
                id="endDate"
                name="endDate"
                className="event-page__date-input"
              />
            </div>
          </div>
        </div>

        <div className="event-page__section">
          <h2 className="event-page__section-text">Today</h2>
          <div className="event-page__empty-message-container">
            <h3 className="event-page__empty-message">
              Your events will appear here when they are available. Get ready
              for something amazing!
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventsHomePage;

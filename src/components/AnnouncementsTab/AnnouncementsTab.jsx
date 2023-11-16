import "./AnnouncementsTab.scss";

function AnnouncementsTab({ announcements, setAnnouncementsOverlay }) {
  function noAnnouncements() {
    return (
      <div className="announcements-tab__none">
        <p className="announcements-tab__none-writing">
          Share important updates with your community. Spark curiosity and keep
          everyone informed.
        </p>
        <button
          className="announcements-tab__none-button"
          onClick={() => setAnnouncementsOverlay(true)}
        >
          + Create Announcements
        </button>
      </div>
    );
  }

  function someAnnouncements() {
    return (
      <div>
        <h1>hello</h1>
      </div>
    );
  }
  return (
    <section className="announcements-tab">
      {announcements.length === 0 ? noAnnouncements() : someAnnouncements()}
    </section>
  );
}

export default AnnouncementsTab;

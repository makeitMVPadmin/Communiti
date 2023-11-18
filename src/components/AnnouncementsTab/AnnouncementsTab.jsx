import "./AnnouncementsTab.scss";
import Announcements from "../Announcements/Announcements";

function AnnouncementsTab({
  announcements,
  setAnnouncementsOverlay,
  communityData,
}) {
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
  return (
    <section className="announcements-tab-background">
      <div className="announcements-tab">
        {announcements.length === 0 ? noAnnouncements() : someAnnouncements()}
      </div>
      <Announcements communityData={communityData} />
    </section>
  );
}

export default AnnouncementsTab;

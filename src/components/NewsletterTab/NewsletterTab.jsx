import "./NewsletterTab.scss";
import Announcements from "../Announcements/Announcements";

function NewsletterTab({
  announcements,
  setAnnouncementsOverlay,
  communityData,
}) {
  function noAnnouncements() {
    return (
      <div className="announcements-tab__none">
        <p className="announcements-tab__none-writing">
          Use AI to write your newsletter.
        </p>
        <button
          className="announcements-tab__none-button"
          onClick={() => setAnnouncementsOverlay(true)}
        >
          + Create Newsletter
        </button>
      </div>
    );
  }

  function someAnnouncements() {
    return (
      <div className="announcements-tab__none">
        <p className="announcements-tab__none-writing">
          Use AI to write your newsletter.
        </p>
        <button
          className="announcements-tab__none-button"
          onClick={() => setAnnouncementsOverlay(true)}
        >
          + Create Newsletter
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

export default NewsletterTab;

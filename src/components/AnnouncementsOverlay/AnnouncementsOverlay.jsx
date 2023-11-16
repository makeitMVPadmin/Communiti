import "./AnnouncmentsOverlay.scss";

function AnnouncmentsOverlay({ setAnnouncementsOverlay, communityData }) {
  return (
    <div className="announcements-overlay">
      <div className="announcements-overlay__top-container">
        <img
          src={communityData.CommunityImage}
          alt="Name of COmmunitiy Icon"
          className="announcements-overlay__logo"
        />
        <h2 className="announcements-overlay__name">{communityData.Name}</h2>
      </div>
      <div className="announcements-overlay__middle-container">
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          className="announcements-overlay__textarea"
          placeholder="What do you want to share with your community?"
        />
      </div>
      <div className="announcements-overlay__bottom-container">
        <button
          className="announcements-overlay__button"
          onClick={() => setAnnouncementsOverlay(false)}
        >
          Cancel
        </button>
        <button className="announcements-overlay__button announcements-overlay__button--not-active">
          Post
        </button>
      </div>
    </div>
  );
}
export default AnnouncmentsOverlay;

import "./AnnouncmentsOverlay.scss";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../Firebase/FirebaseConfig";
import { useParams } from "react-router-dom";

function AnnouncmentsOverlay({ setAnnouncementsOverlay, communityData }) {
  const [announcementText, setAnnouncementText] = useState(""); // State to store the announcement text
  const [isTextEntered, setIsTextEntered] = useState(false); // State to track text entry

  const { id } = useParams();

  const handlePost = async () => {
    try {
      // Get a reference to the Announcements subcollection for the community
      const announcementsRef = collection(
        db,
        `Communities/${id}/Announcements`
      );

      // Add the announcement with text and timestamp to Firestore
      await addDoc(announcementsRef, {
        text: announcementText,
        timestamp: serverTimestamp(),
      });

      // Close the overlay after posting
      setAnnouncementsOverlay(false);
    } catch (error) {
      console.error("Error adding announcement: ", error);
    }
  };

  const handleTextChange = (e) => {
    setAnnouncementText(e.target.value);
    // Check if text is entered to enable/disable the "Post" button
    setIsTextEntered(e.target.value.length > 0);
  };

  return (
    <div className="announcements-overlay-background">
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
            value={announcementText}
            onChange={handleTextChange} // Update text and track text entry
            required
          />
        </div>
        <div className="announcements-overlay__bottom-container">
          <button
            className="announcements-overlay__button"
            onClick={() => setAnnouncementsOverlay(false)}
          >
            Cancel
          </button>
          <button
            className={`announcements-overlay__button ${
              isTextEntered ? "" : "announcements-overlay__button--not-active"
            }`}
            onClick={handlePost} // Call handlePost function to add announcement
            disabled={!isTextEntered} // Disable button if text is not entered
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
export default AnnouncmentsOverlay;

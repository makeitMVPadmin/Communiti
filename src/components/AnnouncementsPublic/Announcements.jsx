import "./Announcements.scss";
import clockIcon from "../../assets/images/clockIcon.svg";
import { useParams } from "react-router-dom";
import { collection, getDocs, doc, query, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/FirebaseConfig";
import { useState, useEffect } from "react";

// Function to convert timestamp to a human-readable format
function getTimeAgo(timestamp) {
  const now = new Date();
  const date = timestamp.toDate(); // Assuming `timestamp` is a Firebase Timestamp object

  const seconds = Math.floor((now - date) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    return interval === 1 ? "1 year ago" : `${interval} years ago`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval === 1 ? "1 month ago" : `${interval} months ago`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval === 1 ? "1 day ago" : `${interval} days ago`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval === 1 ? "1 hour ago" : `${interval} hours ago`;
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval === 1 ? "1 minute ago" : `${interval} minutes ago`;
  }
  return "Just now";
}

function Announcements({ communityData }) {
  const { id } = useParams();
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchCommunityAnnouncementsData = async () => {
      try {
        if (id) {
          const communityRef = doc(collection(db, "Communities"), id);
          const communityDoc = await getDoc(communityRef);

          if (communityDoc.exists()) {
            const announcementsQuery = query(
              collection(communityRef, "Announcements")
            );
            const announcementsSnapshot = await getDocs(announcementsQuery);
            const announcementsData = [];

            announcementsSnapshot.forEach((doc) => {
              const { text, timestamp } = doc.data();
              const formattedTime = getTimeAgo(timestamp); // Format timestamp
              announcementsData.push({
                text,
                timestamp: formattedTime, // Use the formatted time
              });
            });

            setAnnouncements(announcementsData);
          }
        }
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchCommunityAnnouncementsData();
  }, [id]);

  return (
    <>
      {announcements.map((announcement, index) => (
        <div key={index} className="announcements__post-container">
          <div className="announcements__icon-heading">
            <img
              src={communityData.CommunityImage}
              alt="Placeholder for user profile"
              className="announcements__profile-image"
            />
            <div className="announcements__heading">
              <div className="announcements__name">{communityData.Name}</div>
              <div className="announcements__time-posted">
                <img
                  src={clockIcon}
                  alt="Clock icon"
                  className="announcements__clock"
                />
                <p className="announcements__time">{announcement.timestamp}</p>
              </div>
            </div>
          </div>
          <div className="announcements__content">
            <p className="announcements__text">{announcement.text}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default Announcements;

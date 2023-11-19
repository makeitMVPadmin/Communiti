import React, { useState, useEffect } from "react";
import "./AnnouncementsTabPublic.scss";
import Announcements from "../AnnouncementsPublic/Announcements";
import { collection, getDocs, doc, query, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/FirebaseConfig";
import { useParams } from "react-router-dom";

function AnnouncementsTabPublic({ communityData }) {
  const [announcements, setAnnouncements] = useState([]);
  const [hasAnnouncements, setHasAnnouncements] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchCommunityAnnouncementsData = async () => {
      try {
        const communityRef = doc(collection(db, "Communities"), id);
        const communityDoc = await getDoc(communityRef);

        if (communityDoc.exists()) {
          const announcementsQuery = query(
            collection(communityRef, "Announcements")
          );
          const announcementsSnapshot = await getDocs(announcementsQuery);

          // Check if there are any announcements
          setHasAnnouncements(!announcementsSnapshot.empty);
        }
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchCommunityAnnouncementsData();
  }, [id]);

  function noAnnouncements() {
    return (
      <div className="announcements-tab-public__none">
        <p className="announcements-tab-public__none-writing">
          Announcements shared by this community will appear here!
        </p>
      </div>
    );
  }

  function renderAnnouncements() {
    if (!hasAnnouncements) {
      return noAnnouncements();
    } else {
      return (
        <Announcements
          announcements={announcements}
          communityData={communityData}
        />
      );
    }
  }

  return (
    <section className="announcements-tab-public-background">
      <div className="announcements-tab-public">{renderAnnouncements()}</div>
    </section>
  );
}

export default AnnouncementsTabPublic;

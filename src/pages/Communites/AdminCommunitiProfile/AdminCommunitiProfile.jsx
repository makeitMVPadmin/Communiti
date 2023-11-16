import "./AdminCommunitiProfile.scss";
import { useState, useEffect } from "react";
import DashboardNavbar from "../../../components/DashboardNavbar/DashboardNavbar";
import back from "../../../assets/images/back.svg";
import penAndPaper from "../../../assets/images/penAndPaper.svg";
import location from "../../../assets/images/location.svg";
import members from "../../../assets/images/members.svg";
import AnnouncementsTab from "../../../components/AnnouncementsTab/AnnouncementsTab";
import EventsTab from "../../../components/EventsTab/EventsTab";
import MembersTab from "../../../components/MembersTab/MembersTab";
import { useParams } from "react-router-dom";
import { db } from "../../../Firebase/FirebaseConfig";
import { collection, doc, getDoc } from "firebase/firestore";

function AdminCommunitiProfile() {
  const { id } = useParams();
  const [showAnnouncements, setShowAnnouncements] = useState(true);
  const [showEvents, setShowEvents] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [communityData, setCommunityData] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        if (id) {
          const communityRef = doc(collection(db, "Communities"), id); // Corrected usage of doc and collection
          const communityDoc = await getDoc(communityRef);

          if (communityDoc.exists()) {
            const community = communityDoc.data();
            setCommunityData(community);
            setAnnouncements(community.announcements || []);
            setEvents(community.events || []);
            setGroupMembers(community.members || []);
          } else {
            console.log("No such document!");
          }
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    fetchCommunityData();
  }, [id]);

  function handleTabChoice(choice) {
    switch (choice) {
      case "A":
        setShowAnnouncements(true);
        setShowEvents(false);
        setShowMembers(false);
        break;
      case "E":
        setShowAnnouncements(false);
        setShowEvents(true);
        setShowMembers(false);
        break;
      case "M":
        setShowAnnouncements(false);
        setShowEvents(false);
        setShowMembers(true);
        break;
      default:
        break;
    }
  }

  return (
    <>
      <DashboardNavbar />
      <main className="admin-communiti-profile">
        <section className="admin-communiti-profile__hero">
          <div className="admin-communiti-profile__hero-writing">
            <img
              className="admin-communiti-profile__hero-writing-icon"
              src={back}
              alt="arrow pointing left"
            ></img>
            <p>Back to Communities</p>
          </div>
        </section>
        {communityData && (
          <section className="admin-communiti-profile__card">
            <div className="admin-communiti-profile__card-top">
              <img
                className="admin-communiti-profile__card-top-pic"
                src={communityData.CommunityImage || penAndPaper}
                alt="a pencil atop notebook with imaginative notes taken on it"
              ></img>
              <div className="admin-communiti-profile__card-writing">
                <h1 className="admin-communiti-profile__card-writing-top">
                  {communityData.Name}
                </h1>
                <div className="admin-communiti-profile__card-writing-bottom">
                  <div className="admin-communiti-profile__card-writing-bottom-left">
                    <div className="admin-communiti-profile__card-card">
                      <img
                        className="admin-communiti-profile__card-card-icon"
                        src={location}
                        alt="pin drop icon"
                      ></img>
                      <p className="admin-communiti-profile__card-card-writing">
                        {communityData.Location}
                      </p>
                    </div>
                    <div className="admin-communiti-profile__card-card">
                      <img
                        className="admin-communiti-profile__card-card-icon"
                        src={location}
                        alt="pin drop icon"
                      ></img>
                      <p className="admin-communiti-profile__card-card-writing">
                        {communityData.meetingType}
                      </p>
                    </div>
                  </div>
                  <div className="admin-communiti-profile__card-writing-bottom-right">
                    <img
                      src={members}
                      alt="the silouhette of two people, one standing directly behind the other"
                    ></img>
                    <p className="admin-communiti-profile__card-text">
                      {communityData.members
                        ? `${communityData.members.length} members`
                        : "Loading..."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <section className="admin-communiti-profile__card-description">
              <h2 className="admin-communiti-profile__card-description-heading">
                Description
              </h2>
              <p className="admin-communiti-profile__card-description-description">
                {communityData.Description}
              </p>
            </section>

            <section className="admin-communiti-profile__aem">
              <div className="admin-communiti-profile__aem-tabs">
                <p
                  onClick={() => handleTabChoice("A")}
                  className={
                    showAnnouncements
                      ? "admin-communiti-profile__aem-tabs-tab admin-communiti-profile__aem-tabs-tab--active"
                      : "admin-communiti-profile__aem-tabs-tab"
                  }
                >
                  Announcements
                </p>
                <p
                  onClick={() => handleTabChoice("E")}
                  className={
                    showEvents
                      ? "admin-communiti-profile__aem-tabs-tab admin-communiti-profile__aem-tabs-tab--active"
                      : "admin-communiti-profile__aem-tabs-tab"
                  }
                >
                  Events
                </p>
                <p
                  onClick={() => handleTabChoice("M")}
                  className={
                    showMembers
                      ? "admin-communiti-profile__aem-tabs-tab admin-communiti-profile__aem-tabs-tab--active"
                      : "admin-communiti-profile__aem-tabs-tab"
                  }
                >
                  Members
                </p>
              </div>

              {showAnnouncements && (
                <AnnouncementsTab announcements={announcements} />
              )}
              {showEvents && <EventsTab events={events} />}
              {showMembers && <MembersTab groupMembers={groupMembers} />}
            </section>
          </section>
        )}
      </main>
    </>
  );
}

export default AdminCommunitiProfile;

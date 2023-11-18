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
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../../Firebase/FirebaseConfig";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import AnnouncmentsOverlay from "../../../components/AnnouncementsOverlay/AnnouncementsOverlay";
import Announcements from "../../../components/Announcements/Announcements";

function AdminCommunitiProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showAnnouncements, setShowAnnouncements] = useState(true);
  const [showAnnouncementsOverlay, setAnnouncementsOverlay] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [showEventsOverlay, setEventsOverlay] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [communityData, setCommunityData] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [memberCount, setMemberCount] = useState(0);
  const [memberIds, setMemberIds] = useState([]);
  const [memberRoles, setMemberRoles] = useState([]);
  const [inviteLink, setInviteLink] = useState("");

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        if (id) {
          const communityRef = doc(collection(db, "Communities"), id);
          const communityDoc = await getDoc(communityRef);

          if (communityDoc.exists()) {
            const community = communityDoc.data();
            setCommunityData(community);
            setAnnouncements(community.announcements || []);
            setEvents(community.events || []);

            // Fetch the Members subcollection and count its documents
            const membersCollectionRef = collection(
              db,
              `Communities/${id}/Members`
            );
            const membersSnapshot = await getDocs(membersCollectionRef);
            const memberIds = membersSnapshot.docs.map((doc) => doc.id);
            setMemberIds(memberIds);
            setMemberCount(memberIds.length);

            const memberRoles = [];
            for (const memberId of memberIds) {
              const memberRef = doc(
                collection(db, `Communities/${id}/Members`),
                memberId
              );
              const memberDoc = await getDoc(memberRef);
              if (memberDoc.exists()) {
                const memberData = memberDoc.data();
                const memberRole = {
                  memberId,
                  role: memberData.role || "New Member",
                };
                memberRoles.push(memberRole);
              }
            }
            setMemberRoles(memberRoles);
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

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        if (id) {
          const communityRef = doc(collection(db, "Communities"), id);
          const communityDoc = await getDoc(communityRef);

          if (communityDoc.exists()) {
            const community = communityDoc.data();

            // Create the invite link based on the community ID
            const link = `https://communiti-630fc.web.app/communities/${id}`;
            setInviteLink(link);
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

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      alert("Link copied to clipboard!");
    } catch (error) {
      console.error("Error copying link to clipboard: ", error);
    }
  };

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
      {showAnnouncementsOverlay && (
        <AnnouncmentsOverlay
          setAnnouncementsOverlay={setAnnouncementsOverlay}
          communityData={communityData}
        />
      )}
      <DashboardNavbar />
      <main className="admin-communiti-profile">
        <section className="admin-communiti-profile__hero">
          <div
            className="admin-communiti-profile__hero-writing"
            onClick={() => navigate(`/communities/`)}
          >
            <img
              className="admin-communiti-profile__hero-writing-icon"
              src={back}
              alt="arrow pointing left"
            ></img>
            <p>Back to Communities</p>
          </div>
          <button
            className="admin-communiti-profile__button"
            onClick={copyToClipboard}
          >
            Invite
          </button>
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
                    {communityData.Location &&
                      communityData.Location.map((locationItem, index) => (
                        <div
                          key={index}
                          className="admin-communiti-profile__card-card"
                        >
                          <img
                            className="admin-communiti-profile__card-card-icon"
                            src={location}
                            alt="pin drop icon"
                          ></img>
                          <p className="admin-communiti-profile__card-card-writing">
                            {locationItem}
                          </p>
                        </div>
                      ))}
                  </div>
                  <div className="admin-communiti-profile__card-writing-bottom-right">
                    <img
                      src={members}
                      alt="the silouhette of two people, one standing directly behind the other"
                    ></img>
                    <p className="admin-communiti-profile__card-text">
                      {memberCount !== null ? `${memberCount} members` : "0"}
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
                <AnnouncementsTab
                  announcements={announcements}
                  setAnnouncementsOverlay={setAnnouncementsOverlay}
                  communityData={communityData}
                />
              )}
              {showEvents && (
                <EventsTab
                  events={events}
                  setEventsOverlay={setEventsOverlay}
                  communityData={communityData}
                />
              )}
              {showMembers && (
                <MembersTab memberIds={memberIds} memberRoles={memberRoles} />
              )}
            </section>
          </section>
        )}
      </main>
    </>
  );
}

export default AdminCommunitiProfile;

import "./AdminCommunitiProfile.scss";
import { useState, useEffect } from "react";
import DashboardNavbar from "../../../components/DashboardNavbar/DashboardNavbar";
import back from "../../../assets/images/back.svg";
import penAndPaper from "../../../assets/images/penAndPaper.svg";
import location from "../../../assets/images/location.svg";
import members from "../../../assets/images/members.svg";
import edit from "../../../assets/images/edit.svg";
import trash from "../../../assets/images/trash.svg";
import AnnouncementsTab from "../../../components/AnnouncementsTab/AnnouncementsTab";
import EventsTab from "../../../components/EventsTab/EventsTab";
import MembersTab from "../../../components/MembersTab/MembersTab";
import NewsletterTab from "../../../components/NewsletterTab/NewsletterTab";
import { useParams, useNavigate } from "react-router-dom";
// import { db } from "../../../Firebase/FirebaseConfig";
// import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import AnnouncmentsOverlay from "../../../components/AnnouncementsOverlay/AnnouncementsOverlay";
import EventsOverlay from "../../../components/CreateEventModal/CreateEventModal";

function AdminCommunitiProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showAnnouncements, setShowAnnouncements] = useState(true);
  const [showAnnouncementsOverlay, setAnnouncementsOverlay] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [showEventsOverlay, setEventsOverlay] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [communityData, setCommunityData] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [memberIds, setMemberIds] = useState([]);
  const [inviteLink, setInviteLink] = useState("");

  //  DATA.JSON
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/communities/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setCommunityData(jsonData);
        setAnnouncements(jsonData.announcements || []);
        setMemberIds(jsonData.members || []);

        const eventData = []
        jsonData.events.forEach(event => {
          eventData.push({
            id: event,
            type: "managed"
          })
        })
        setEventList(eventData || []);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  // // FIREBASE DATA
  // useEffect(() => {
  //   const fetchCommunityData = async () => {
  //     try {
  //       if (id) {
  //         const communityRef = doc(collection(db, "Communities"), id);
  //         const communityDoc = await getDoc(communityRef);

  //         if (communityDoc.exists()) {
  //           const community = communityDoc.data();
  //           setCommunityData(community);
  //           setAnnouncements(community.announcements || []);
  //           setEvents(community.events || []);

  //           // Fetch the Members subcollection and count its documents
  //           const membersCollectionRef = collection(
  //             db,
  //             `Communities/${id}/Members`
  //           );
  //           const membersSnapshot = await getDocs(membersCollectionRef);
  //           const memberIds = membersSnapshot.docs.map((doc) => doc.id);
  //           setMemberIds(memberIds);

  //           const memberRoles = [];
  //           for (const memberId of memberIds) {
  //             const memberRef = doc(
  //               collection(db, `Communities/${id}/Members`),
  //               memberId
  //             );
  //             const memberDoc = await getDoc(memberRef);
  //             if (memberDoc.exists()) {
  //               const memberData = memberDoc.data();
  //               const memberRole = {
  //                 memberId,
  //                 role: memberData.role || "New Member",
  //               };
  //               memberRoles.push(memberRole);
  //             }
  //           }
  //           setMemberRoles(memberRoles);
  //         } else {
  //           console.log("No such document!");
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error fetching document: ", error);
  //     }
  //   };

  //   fetchCommunityData();
  // }, [id]);

  // useEffect(() => {
  //   const fetchCommunityData = async () => {
  //     try {
  //       if (id) {
  //         const communityRef = doc(collection(db, "Communities"), id);
  //         const communityDoc = await getDoc(communityRef);

  //         if (communityDoc.exists()) {
  //           const community = communityDoc.data();

  //           // Create the invite link based on the community ID
  //           const link = `https://communiti-630fc.web.app/communities/${id}`;
  //           setInviteLink(link);
  //         } else {
  //           console.log("No such document!");
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error fetching document: ", error);
  //     }
  //   };

  //   fetchCommunityData();
  // }, [id]);

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
        setShowNewsletter(false);
        break;
      case "E":
        setShowAnnouncements(false);
        setShowEvents(true);
        setShowMembers(false);
        setShowNewsletter(false);
        break;
      case "M":
        setShowAnnouncements(false);
        setShowEvents(false);
        setShowMembers(true);
        setShowNewsletter(false);
        break;
      case "N":
        setShowAnnouncements(false);
        setShowEvents(false);
        setShowMembers(false);
        setShowNewsletter(true);
        break;
      default:
        break;
    };
  };

  return (
    <>
      {showAnnouncementsOverlay && (
        <AnnouncmentsOverlay
          setAnnouncementsOverlay={setAnnouncementsOverlay}
          communityData={communityData}
        />
      )}
      {showEventsOverlay && (
        <EventsOverlay
          setEventsOverlay={setEventsOverlay}
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
                src={communityData.communityImage || penAndPaper}
                alt="a pencil atop notebook with imaginative notes taken on it"
              ></img>
              <div className="admin-communiti-profile__card-writing">
                <h1 className="admin-communiti-profile__card-writing-top">
                  {communityData.name}
                  <div className="admin-communiti-profile__card-writing-top-icons">
                    <img src={edit} alt="edit icon"></img>
                    <img src={trash} alt="trash icon"></img>
                  </div>
                </h1>
                <div className="admin-communiti-profile__card-writing-bottom">
                  <div className="admin-communiti-profile__card-writing-bottom-left">
                    {communityData.location &&
                      communityData.location.map((locationItem, index) => (
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
                      alt="the silhouette of two people, one standing directly behind the other"
                    ></img>
                    <p className="admin-communiti-profile__card-text">
                      {memberIds.length !== 1 ? `${memberIds.length} members` : "1 member"}
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
                {communityData.description}
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
                <p
                  onClick={() => handleTabChoice("N")}
                  className={
                    showNewsletter
                      ? "admin-communiti-profile__aem-tabs-tab admin-communiti-profile__aem-tabs-tab--active"
                      : "admin-communiti-profile__aem-tabs-tab"
                  }
                >
                  Newsletter
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
                  eventList={eventList}
                  setEventsOverlay={setEventsOverlay}
                  communityData={communityData}
                />
              )}
              {showMembers && (
                <MembersTab 
                  memberIds={memberIds} 
                />
              )}
              {showNewsletter && (
                // Placeholder for newsletter UI from Team Supergroup
                <NewsletterTab
                  announcements={announcements}
                  setAnnouncementsOverlay={setAnnouncementsOverlay}
                  communityData={communityData}
                />
              )}
            </section>
          </section>
        )}
      </main>
    </>
  );
}

export default AdminCommunitiProfile;

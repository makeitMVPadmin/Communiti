import "./CommunitiProfile.scss";
import { useState, useEffect } from "react";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import penAndPaper from "../../assets/images/penAndPaper.svg";
import location from "../../assets/images/location.svg";
import members from "../../assets/images/members.svg";
import AnnouncementsTab from "../../components/AnnouncementsTab/AnnouncementsTab";
import EventsTab from "../../components/EventsTab/EventsTab";
import MembersTab from "../../components/MembersTab/MembersTab";
import { useParams } from "react-router-dom";
import { db, auth } from "../../Firebase/FirebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  setDoc,
} from "firebase/firestore";

function CommunitiProfile() {
  const { id } = useParams();
  const [showAnnouncements, setShowAnnouncements] = useState(true);
  const [showEvents, setShowEvents] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [communityData, setCommunityData] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [memberCount, setMemberCount] = useState(0);
  const [memberIds, setMemberIds] = useState([]);
  const [memberRoles, setMemberRoles] = useState([]);
  const [isUserJoined, setIsUserJoined] = useState(false); // Define isUserJoined state

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
                  role: memberData.role || "Default Role",
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
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      setIsUserJoined(memberIds.includes(userId)); // Set the user's membership status
    }
  }, [memberIds]); // Update isUserJoined when memberIds change

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

  const handleJoinCommunity = async () => {
    const currentUser = auth.currentUser;
    const communityId = id;

    if (currentUser) {
      const userId = currentUser.uid;

      const memberRef = doc(db, `Communities/${communityId}/Members`, userId);
      await setDoc(memberRef, { userId: userId, role: "Member" });

      const userRef = doc(db, "Users", userId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const communitiesJoined = userData.CommunitiesJoined || [];

        if (!communitiesJoined.includes(communityId)) {
          const updatedCommunities = [...communitiesJoined, communityId];
          await updateDoc(userRef, {
            CommunitiesJoined: updatedCommunities,
          });
          console.log("Joined Community !");
        } else {
          console.log("User has already joined this community!");
        }
      } else {
        console.log("User document does not exist.");
      }
    } else {
      console.log("Please Login");
    }
  };

  return (
    <>
      <DashboardNavbar />
      <main className="communiti-profile">
        <section className="communiti-profile__hero">
          {!isUserJoined && ( // Render the button only if the user hasn't joined
            <div className="communiti-profile__button-container">
              <button
                className="communiti-profile__button"
                onClick={handleJoinCommunity}
              >
                Join the Community
              </button>
            </div>
          )}
        </section>
        {communityData && (
          <section className="communiti-profile__card">
            <div className="communiti-profile__card-top">
              <img
                className="communiti-profile__card-top-pic"
                src={communityData.CommunityImage || penAndPaper}
                alt="a pencil atop notebook with imaginative notes taken on it"
              ></img>
              <div className="communiti-profile__card-writing">
                <h1 className="communiti-profile__card-writing-top">
                  {communityData.Name}
                </h1>
                <div className="communiti-profile__card-writing-bottom">
                  <div className="communiti-profile__card-writing-bottom-left">
                    {communityData.Location &&
                      communityData.Location.map((locationItem, index) => (
                        <div
                          key={index}
                          className="communiti-profile__card-card"
                        >
                          <img
                            className="communiti-profile__card-card-icon"
                            src={location}
                            alt="pin drop icon"
                          ></img>
                          <p className="communiti-profile__card-card-writing">
                            {locationItem}
                          </p>
                        </div>
                      ))}
                  </div>
                  <div className="communiti-profile__card-writing-bottom-right">
                    <img
                      src={members}
                      alt="the silouhette of two people, one standing directly behind the other"
                    ></img>
                    <p className="communiti-profile__card-text">
                      {memberCount !== null ? `${memberCount} members` : "0"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <section className="communiti-profile__card-description">
              <h2 className="communiti-profile__card-description-heading">
                Description
              </h2>
              <p className="communiti-profile__card-description-description">
                {communityData.Description}
              </p>
            </section>

            <section className="communiti-profile__aem">
              <div className="communiti-profile__aem-tabs">
                <p
                  onClick={() => handleTabChoice("A")}
                  className={
                    showAnnouncements
                      ? "communiti-profile__aem-tabs-tab communiti-profile__aem-tabs-tab--active"
                      : "communiti-profile__aem-tabs-tab"
                  }
                >
                  Announcements
                </p>
                <p
                  onClick={() => handleTabChoice("E")}
                  className={
                    showEvents
                      ? "communiti-profile__aem-tabs-tab communiti-profile__aem-tabs-tab--active"
                      : "communiti-profile__aem-tabs-tab"
                  }
                >
                  Events
                </p>
                <p
                  onClick={() => handleTabChoice("M")}
                  className={
                    showMembers
                      ? "communiti-profile__aem-tabs-tab communiti-profile__aem-tabs-tab--active"
                      : "communiti-profile__aem-tabs-tab"
                  }
                >
                  Members
                </p>
              </div>

              {showAnnouncements && (
                <AnnouncementsTab announcements={announcements} />
              )}
              {showEvents && <EventsTab events={events} />}
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

export default CommunitiProfile;

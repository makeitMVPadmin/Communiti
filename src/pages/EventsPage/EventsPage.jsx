import EventsNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import "./EventsPage.scss";
import { collection, doc, getDoc } from "firebase/firestore";
import EventsInfo from "../../components/EventsInfo/EventsInfo";
import EventsInfoPublic from "../../components/EventsInfoPublic/EventsInfoPublic";
import { useState, useEffect } from "react";
import { db, auth } from "../../Firebase/FirebaseConfig";
import data from "../../data.json";

function EventsHomePage() {
  const [userCommunitiesJoined, setUserCommunitiesJoined] = useState([]);
  const [userCommunitiesManaged, setUserCommunitiesManaged] = useState([]);
  const [userCommunities, setUserCommunities] = useState([]);
  const [selectedOption, setSelectedOption] = useState("option1"); // Default to All Events

  // // FIREBASE DATA
  // useEffect(() => {
  //   // Fetch user's communities
  //   const fetchUserCommunities = async () => {
  //     try {
  //       const currentUser = auth.currentUser;
  //       if (currentUser) {
  //         const uid = currentUser.uid;
  //         const userDocRef = doc(collection(db, "Users"), uid);
  //         const userDocSnapshot = await getDoc(userDocRef);

  //         if (userDocSnapshot.exists()) {
  //           const userData = userDocSnapshot.data();
  //           const joinedIds = userData.CommunitiesJoined || [];
  //           const managedIds = userData.CommunitiesManage || [];

  //           setUserCommunitiesJoined(joinedIds);
  //           setUserCommunitiesManaged(managedIds);
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user communities:", error);
  //     }
  //   };

  //   fetchUserCommunities();
  // }, []);

  // useEffect(() => {
  //   setUserCommunitiesJoined(data.users[0].communitiesJoined);
  // }, []);
  // useEffect(() => {
  //   setUserCommunitiesManaged(data.users[0].communitiesManaged);
  // }, []);
  // useEffect(() => {
  //   setUserCommunities([...userCommunitiesJoined, ...userCommunitiesManaged]);
  // }, []);

  useEffect(() => {
    setUserCommunities([1]);
    setUserCommunitiesJoined([1]);
    setUserCommunitiesManaged([1]);
  }, []);

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  //  DATA.JSON
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/communities');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setUserCommunitiesManaged(jsonData.filter(community => ["community4_uuid", "community5_uuid"].includes(community.id)))
        setUserCommunitiesJoined(jsonData.filter(community => ["community1_uuid", "community2_uuid", "community3_uuid"].includes(community.id)))
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Filter out joined communities that are also managed
  const filteredJoinedCommunities = userCommunitiesJoined.filter(
    (joinedId) => !userCommunitiesManaged.includes(joinedId)
  );

  const filterEvents = () => {
    switch (selectedOption) {
      case "option2": // Communities Managed
        return userCommunitiesManaged.map((community, index) => (
          <EventsInfo
            key={`managed-${index}`}
            communityData={community}
            // communityId={communityId}
            managed
          />
        ));
      case "option3": // Communities Joined
        // return filteredJoinedCommunities.map((communityId, index) => (
        return userCommunitiesJoined.map((community, index) => (
          <EventsInfo
            key={`joined-${index}`}
            // communityId={communityId}
            communityData={community}
            joined
          />
        ));
      default: // All Events
        return (
          <>
            {userCommunities.map((communityId, index) => (
              <EventsInfo
                key={`joined-${index}`}
                communityId={communityId}
                joined
              />
            ))}
          </>
        );
    }
  };

  return (
    <div className="event-page">
      <EventsNavbar />
      <div className="event-page__container">
        <div className="event-page__filters">
          <select
            id="myDropdown"
            className="event-page__dropdown"
            value={selectedOption}
            onChange={handleDropdownChange}
          >
            <option value="option1">All Events</option>
            <option value="option2">Communities Managed</option>
            <option value="option3">Communities Joined</option>
          </select>
          <div className="event-page__date-container">
            <label className="event-page__date-text">Select Date Range</label>
            <div className="event-page__dates-container">
              <input
                type="date"
                id="startDate"
                name="startDate"
                className="event-page__date-input"
              />
              <p className="event-page__date-text event-page__date-text--alt">
                -
              </p>
              <input
                type="date"
                id="endDate"
                name="endDate"
                className="event-page__date-input"
              />
            </div>
          </div>
        </div>
        <div className="event-page__section">
          {filterEvents()}
        </div>
      </div>
    </div>
  );
}

export default EventsHomePage;

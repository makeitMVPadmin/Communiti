import "./DashboardPage.scss";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import plusIcon from "../../assets/images/plusIcon.svg";
import { collection, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../Firebase/FirebaseConfig";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Announcements from "../../components/AnnouncementsDashboard/Announcements";
import {useAppContext} from "../../context/appContext";


function DashboardPage() {
  const navigate = useNavigate();
  const { user, isLoading } = useAppContext();
  const [userCommunities, setUserCommunities] = useState([]);

  const [userFullName, setUserFullName] = useState(() => {
    const storedFullName = sessionStorage.getItem("FullName");
    return storedFullName ? JSON.parse(storedFullName) : null;
  });

 

 

  useEffect(() => {
    // Fetch user's communities
    const fetchUserCommunities = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const uid = currentUser.uid;
          const userDocRef = doc(collection(db, "Users"), uid);
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const userCommunitiesIds =
              userDocSnapshot.data().CommunitiesJoined || [];

            setUserCommunities(userCommunitiesIds);
          }
        }
      } catch (error) {
        console.error("Error fetching user communities:", error);
      }
    };

    fetchUserCommunities();
  }, []);

  const handleCreateCommunity = () => {
    // Load the specified URL on button click
    navigate("/communities/create");
  };

  return (
    <div className="dashboard-page">
      <DashboardNavbar />
      <div className="dashboard-page__container">
        <div className="dashboard-page__welcome">
          <h1 className="dashboard-page__header">
            Welcome back! {userCommunities ? `${userFullName} 👋` : "Loading..."}
          </h1>
        </div>
        {userCommunities.length === 0 && (
          <div className="communities__create-container">
            <div className="communities__subheading-container">
              <h3 className="communities__subheading">
                Fuel your passion with a community
              </h3>
              <h3 className="communities__subheading">
                Create and Manage it with ease right here.
              </h3>
            </div>

            <button
              className="communities__button"
              onClick={handleCreateCommunity}
            >
              <img
                className="communities__button-icon"
                src={plusIcon}
                alt="plus icon in button"
              />
              <p className="communities__button-text">Create Community</p>
            </button>
          </div>
        )}
        {userCommunities.map((communityId, index) => (
          <Announcements key={index} communityId={communityId} />
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;

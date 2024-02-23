import "./DashboardPage.scss";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import plusIcon from "../../assets/images/plusIcon.svg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Announcements from "../../components/AnnouncementsDashboard/Announcements";
import data from "../../data.json";

function DashboardPage() {
  const navigate = useNavigate();
  const [userCommunities, setUserCommunities] = useState([]);
  // const [userFullName, setUserFullName] = useState(
  //   data.users[1].fullName || null
  // );



  //   const storedFullName = sessionStorage.getItem("FullName");
  //   console.log("Stored FullName:", storedFullName);
  //   return storedFullName ? JSON.parse(storedFullName) : null;
  // });

  useEffect(() => {
 
    const fetchUserCommunities = () => {
      try {
        const userCommunitiesIds = data.CommunitiesJoined || [];
        setUserCommunities(userCommunitiesIds);
      } catch (error) {
        console.error("Error fetching user communities:", error);
      }
    };

    fetchUserCommunities();
  }, []);

  const handleCreateCommunity = () => {
    navigate("/communities/create");
  };

  return (
    <div className="dashboard-page">
      <DashboardNavbar />
      <div className="dashboard-page__container">
        <div className="dashboard-page__welcome">
          <h1 className="dashboard-page__header">
            Welcome! 👋
          </h1>
        </div>
        {userCommunities.length === 0 && (
          <div className="communities__create-container">
            <div className="communities__subheading-container">
              <h3 className="communities__subheading">
                Fuel your passion with a community.
              </h3>
              <h3 className="communities__subheading">
                Create and manage it with ease right here.
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

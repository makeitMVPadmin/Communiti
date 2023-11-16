import "./DashboardPage.scss";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import clockIcon from "../../assets/images/clockIcon.svg";
import PlaceHolderIcon from "../../assets/images/PlaceHolderIcon.png";
import plusIcon from "../../assets/images/plusIcon.svg";
import { collection, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../Firebase/FirebaseConfig";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const navigate = useNavigate();
  const [userFullName, setUserFullName] = useState(() => {
    const storedFullName = sessionStorage.getItem("FullName");
    return storedFullName ? JSON.parse(storedFullName) : null;
  });

  useEffect(() => {
    const currentUser = auth.currentUser;

    const fetchUserData = async () => {
      try {
        const uid = currentUser.uid;

        if (currentUser) {
          const userDocRef = doc(collection(db, "Users"), uid);
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const fullName = userDocSnapshot.data().fullName;
            setUserFullName(fullName);
          } else {
            console.error("User document does not exist");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
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
            Welcome back! {userFullName ? `${userFullName} 👋` : "Loading..."}
          </h1>
        </div>
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
        <div className="dashboard-page__post-container">
          <div className="dashboard-page__icon-heading">
            <img
              src={PlaceHolderIcon}
              alt="Placeholder for user profile"
              className="dashboard-page__profile-image"
            />

            <div className="dashboard-page__heading">
              <div className="dashboard-page__name">Early Career Designers</div>
              <div className="dashboard-page__time-posted">
                <img
                  src={clockIcon}
                  alt="Clock icon"
                  className="dashboard-page__clock"
                />
                <p className="dashboard-page__time">10 hours ago</p>
              </div>
            </div>
          </div>
          <div className="dashboard-page__content">
            <p className="dashboard-page__text">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos ex,
              inventore voluptate quidem delectus, saepe vitae, illum odit optio
              ullam voluptas excepturi laborum ipsum voluptatibus! Ut eos
              asperiores assumenda unde!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;

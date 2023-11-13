import "./DashboardNavbar.scss";
import homeIcon from "../../assets/images/homeIcon.svg";
import chatIcon from "../../assets/images/chatIcon.svg";
import calendarIcon from "../../assets/images/calendarIcon.svg";
import communitiesIcon from "../../assets/images/communitiesIcon.svg";
import LogoIcon from "../../assets/logos/communiti2.svg";
import profilePic from "../../assets/images/profilePic.svg";
import DropDownArrow from "../../assets/images/drop-down-arrow.svg";
import { NavLink, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { collection, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../Firebase/FirebaseConfig";

function DashboardNavbar() {
  const [profilePhoto, setProfilePhoto] = useState(profilePic); // Change the variable here

  useEffect(() => {
    // Get the current user from Firebase Authentication
    const currentUser = auth.currentUser;

    // Check if a user is signed in
    if (currentUser) {
      const uid = currentUser.uid;

      // Fetch user data from Firestore based on UID
      const fetchUserData = async () => {
        try {
          const userDocRef = doc(collection(db, "Users"), uid);
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            console.log("User Data:", userData);

            if (userData && userData.profilePhoto) {
              setProfilePhoto(userData.profilePhoto);
              console.log("Profile Photo set:", userData.profilePhoto);
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error.message);
        }
      };

      // Call the fetchUserData function
      fetchUserData();
    }
  }, []);

  return (
    <div className="dashboard-navbar">
      <div className="dashboard-navbar__left">
        <Link to="/dashboard" className="dashboard-navbar__link">
          <img
            src={LogoIcon}
            alt="Logo Icon"
            className="dashboard-navbar__logo"
          />
        </Link>
        <NavLink
          to="/dashboard"
          className={(navData) =>
            navData.isActive
              ? "dashboard-navbar__link active"
              : "dashboard-navbar__link"
          }
        >
          <img
            src={homeIcon}
            alt="Home icon"
            className="dashboard-navbar__img dashboard-navbar__img--home"
          />
          <p className="dashboard-navbar__text">Home</p>
        </NavLink>
        <NavLink
          to="/communities"
          className={(navData) =>
            navData.isActive
              ? "dashboard-navbar__link active"
              : "dashboard-navbar__link"
          }
        >
          <img
            src={communitiesIcon}
            alt="communities icon"
            className="dashboard-navbar__img dashboard-navbar__img--communities"
          />
          <p className="dashboard-navbar__text">Communities</p>
        </NavLink>
        <NavLink
          to="/events"
          className={(navData) =>
            navData.isActive
              ? "dashboard-navbar__link active"
              : "dashboard-navbar__link"
          }
        >
          <img
            src={calendarIcon}
            alt="calendar icon"
            className="dashboard-navbar__img dashboard-navbar__img--calendar"
          />
          <p className="dashboard-navbar__text">Events</p>
        </NavLink>
        <NavLink
          to="/chat"
          className={(navData) =>
            navData.isActive
              ? "dashboard-navbar__link active"
              : "dashboard-navbar__link"
          }
        >
          <img
            src={chatIcon}
            alt="chat icon"
            className="dashboard-navbar__img dashboard-navbar__img--chat"
          />
          <p className="dashboard-navbar__text">Chat</p>
        </NavLink>
      </div>
      <div className="dashboard-navbar__right">
        <Link to="/profile" className="dashboard-navbar__link">
          <img
            src={profilePhoto}
            alt="profile icon"
            className="dashboard-navbar__img dashboard-navbar__img--profile"
          />
        </Link>
        <button className="dashboard-navbar__button">
          <img src={DropDownArrow} alt="DropDownArrow icon" />
        </button>
      </div>
    </div>
  );
}

export default DashboardNavbar;

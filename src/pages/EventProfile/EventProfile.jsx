import React from "react";
import "./EventProfile.scss";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import placeHolderIcon from "../../assets/images/PlaceHolderIcon.png";
import calendarIcon from "../../assets/images/calendarIcon.svg";
import clockIcon from "../../assets/images/clockIcon.svg";
import location from "../../assets/images/location.svg";
import rightArrowIcon from "../../assets/images/rightArrowIcon.svg";
import profilePic from "../../assets/images/profilePic.svg";
import chatIcon from "../../assets/images/chatIcon.svg";

export default function EventProfile() {
  return (
    <>
      {/* <DashboardNavbar /> */}
      <main className="event-profile">
        <div className="event-profile-container">
          {/* <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          > */}
          {/* <div
          className="event-profile-image-container"
            style={{
              width: "100%",
            }}
          > */}
          <img className="event-profile-image" src={placeHolderIcon} />
          {/* </div> */}
          <div className="event-profile-header-container">
            <h1 className="event-profile-header">
              How AI can help in Marketing
            </h1>
            <span className="event-profile-header-trash-icon">🗑️</span>
          </div>
          <div className="event-profile-content-edit-container">
            <div className="event-profile-content-container">
              <p
                style={{
                  color: "gray",
                  fontSize: "14px",
                  marginBottom: "20px",
                }}
              >
                Come learn about different ways you can meet investors and learn
                how to pitch to them Come learn about different ways you can
                meet investors and learn how to pitch to them
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  marginLeft: "15px",
                }}
              >
                <div style={{ display: "flex" }}>
                  <img src={calendarIcon} style={{ width: "22px" }} />
                  <p style={{ marginLeft: "10px", fontSize: "18px" }}>
                    WED, NOV 7
                  </p>
                </div>
                <div style={{ display: "flex" }}>
                  <img src={clockIcon} style={{ width: "22px" }} />
                  <p style={{ marginLeft: "10px", fontSize: "18px" }}>
                    4:00 PM - 5:00 PM PST
                  </p>
                </div>
                <div style={{ display: "flex" }}>
                  <img src={location} style={{ width: "22px" }} />
                  <p style={{ marginLeft: "10px", fontSize: "18px" }}>
                    213 Seymour st. , Denver
                  </p>
                </div>
              </div>
            </div>
            <div
              style={{
                alignSelf: "flex-end",
                "@media screen and (minWidth: 768px)": {
                  alignSelf: "flex-start",
                },
              }}
            >
              <button
                style={{
                  margin: "0",
                  background: "rgb(9, 84, 176)",
                  color: "white",
                  width: "170px",
                  height: "44px",
                  border: "none",
                  borderRadius: "10px",
                  fontFamily: "Corben",
                }}
              >
                Edit Event
              </button>
            </div>
          </div>
          <div>
            <h3>From the community</h3>
            <div className="communiti__card">
              <img
                // src={community?.CommunityImage || placeHolderIcon}
                src={placeHolderIcon}
                className="communiti__card-profile-pic"
              />
              <div className="communiti__card-bottom-container">
                <div className="communiti__card-bottom-inner-container">
                  <div>
                    <h6 className="communiti__card-heading">Community Name</h6>
                  </div>
                  <div className="communiti__card-button-div-container">
                    <button
                      className="communiti__card-arrow-button"
                      //   onClick={() =>
                      //     navigate(`/communities/admin/${community?.id}`)
                      //   }
                    >
                      <img
                        src={rightArrowIcon}
                        alt="right arrow button"
                        className="communiti__card-arrow-button-img"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3>Organized By</h3>
            <div
              style={{
                display: "flex",
                border: "1px solid black",
                maxWidth: "300px",
                padding: "4px 8px",
                borderRadius: "10px",
              }}
            >
              <div style={{ display: "flex" }}>
                <img src={profilePic} style={{ width: "40px" }} />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "10px",
                  flexGrow: "1",
                }}
              >
                <p style={{ fontSize: "14px" }}>Marina Reese</p>
                <p style={{ fontSize: "14px" }}>Product Manager</p>
              </div>
              <div style={{ display: "flex" }}>
                <img
                  src={chatIcon}
                  style={{
                    width: "25px",
                    // marginRight: "10px"
                  }}
                />
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
      </main>
    </>
  );
}

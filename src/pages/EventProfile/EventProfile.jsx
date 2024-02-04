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
        <div className="event-profile__container">
          <img className="event-profile__image" src={placeHolderIcon} />
          <div className="event-profile__header-container">
            <h1 className="event-profile__header">
              How AI can help in Marketing
            </h1>
            <span className="event-profile__header-trash-icon">&#128465;</span>
          </div>
          <div className="event-profile__content-edit-container">
            <div className="event-profile__content-container">
              <p className="event-profile__content-text">
                Come learn about different ways you can meet investors and learn
                how to pitch to them Come learn about different ways you can
                meet investors and learn how to pitch to them
              </p>
              <div className="event-profile__content-details-container">
                <div className="event-profile__content-details-div">
                  <img
                    src={calendarIcon}
                    className="event-profile__content-details-image"
                  />
                  <p className="event-profile__content-details-text">
                    WED, NOV 7
                  </p>
                </div>
                <div className="event-profile__content-details-div">
                  <img
                    src={clockIcon}
                    className="event-profile__content-details-image"
                  />
                  <p className="event-profile__content-details-text">
                    4:00 PM - 5:00 PM PST
                  </p>
                </div>
                <div className="event-profile__content-details-div">
                  <img
                    src={location}
                    className="event-profile__content-details-image"
                  />
                  <p className="event-profile__content-details-text">
                    213 Seymour st., Denver
                  </p>
                </div>
              </div>
            </div>
            <div className="event-profile__edit-container">
              <button className="event-profile__edit-button">Edit Event</button>
            </div>
          </div>
          <div className="event-profile__communiti-organizer-container">
            <div className="event-profile__communiti">
              <h3 className="event-profile__communiti-header">
                From the community
              </h3>
              <div className="event-profile__communiti-card">
                <img
                  // src={community?.CommunityImage || placeHolderIcon}
                  src={placeHolderIcon}
                  className="event-profile__communiti-card-profile-pic"
                />
                <div className="event-profile__communiti-card-bottom-container">
                  <div className="event-profile__communiti-card-bottom-inner-container">
                    <div>
                      <h6 className="event-profile__communiti-card-heading">
                        Community Name
                      </h6>
                    </div>
                    <div className="event-profile__communiti-card-button-div-container">
                      <button
                        className="event-profile__communiti-card-arrow-button"
                        //   onClick={() =>
                        //     navigate(`/communities/admin/${community?.id}`)
                        //   }
                      >
                        <img
                          src={rightArrowIcon}
                          alt="right arrow button"
                          className="event-profile__communiti-card-arrow-button-img"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="event-profile__organizer">
              <h3 className="event-profile__communiti-header">Organized By</h3>
              <div className="event-profile__organizer-card">
                <div className="event-profile__organizer-card-profile-pic-container">
                  <img
                    className="event-profile__organizer-card-profile-pic"
                    src={profilePic}
                  />
                </div>
                <div className="event-profile__organizer-card-details">
                  <p className="event-profile__organizer-card-details-paragraph-name">
                    Marina Reese
                  </p>
                  <p className="event-profile__organizer-card-details-paragraph-title">
                    Product Manager
                  </p>
                </div>
                <div className="event-profile__organizer-card-details-chat-emoji-container">
                  <img
                    className="event-profile__organizer-card-details-chat-emoji"
                    src={chatIcon}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

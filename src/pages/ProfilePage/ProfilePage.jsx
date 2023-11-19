import React, { useState } from "react";
import "./ProfilePage.scss";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import profilePic from "../../assets/images/profilePic.svg";
import edit from "../../assets/images/edit.svg";

function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("First Last Name");
  const [profileImage, setProfileImage] = useState(profilePic);

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleImageChange = (event) => {
    setProfileImage(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <>
      <DashboardNavbar />
      <div className="profile">
        <div className="profile_container">
          {isEditing ? (
            <>
              <button className="profile_save" onClick={handleSaveClick}>
                Save
              </button>
              <div className="profile_pic_edit_container">
                <img
                  className="profile_pic"
                  src={profileImage}
                  alt="profile pic"
                />
                <button className="profile_edit_button">
                  <img src={edit} alt="edit" />
                </button>
              </div>
              {/* <input type="file" onChange={handleImageChange} /> */}
              <div className="profile_name_edit_container">
                <input
                  className="firstLastName"
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                />
                <button className="profile_edit_button">
                  <img src={edit} alt="edit" />
                </button>
              </div>
            </>
          ) : (
            <>
              <button className="profile_edit" onClick={handleEditClick}>
                Edit
              </button>
              <img
                className="profile_pic"
                src={profileImage}
                alt="profile pic"
              />
              <span className="firstLastName">{name}</span>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ProfilePage;

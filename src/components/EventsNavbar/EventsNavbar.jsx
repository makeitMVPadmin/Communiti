import React, { useState } from "react";
import "./EventsNavbar.scss";
import home from "../../assets/images/home.svg";
import chat from "../../assets/images/chat.svg";
import smallCalendar from "../../assets/images/smallCalendar.svg";
import communitiesIconBlack from "../../assets/images/communitiesIconBlack.svg";
import searchIcon from "../../assets/images/searchIcon.svg";
import communiti2 from "../../assets/logos/communiti2.svg";
import { Link } from "react-router-dom";

export default function EventsNavbar() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearch = () => {
    console.log("Search for:", searchTerm);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

    const handleSubmit = (event) => {
      event.preventDefault(); 
      handleSearch();
    };


  return (
    <div className="events-navbar">
      <div className="logo">
        <img className="logoPicture"src={communiti2} alt="community-logo" />
      </div>
      <div className="button-group">
        <Link to="/events/home"className="button-with-image">
          <img src={home} alt="home" type="button" />
          <span>Home</span>
        </Link>
        <Link to="/events/chat" className="button-with-image">
          <img src={chat} alt="chat bubbles" type="button" />
          <span>Chats</span>
        </Link>
        <Link to="/events/events" className="button-with-image">
          <img src={smallCalendar} alt="small calendar" type="button" />
          <span>Events</span>
        </Link>
        <Link to="/events/communities" className="button-with-image">
          <img
            src={communitiesIconBlack}
            alt="communities icon"
            type="button"
          />
          <span>Communities</span>
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search Communities"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          onClick={() => {
            handleSearch();
            toggleDropdown();
          }}
          className="dropdown-button"
        >
          <img className="magnifyingGlass" src={searchIcon} alt="Search" />
        </button>
        {isDropdownVisible && (
          <div className="dropdown-menu">
            <a href="#community1">Community 1</a>
            <a href="#community2">Community 2</a>
            <a href="#community3">Community 3</a>
          </div>
        )}
      </form>
    </div>
  );
}

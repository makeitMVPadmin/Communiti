import EventsNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import "./EventsChats.scss"
import chatPic from "../../assets/images/chatPic.svg";
import pencil from "../../assets/images/pencil.svg"
import notification from "../../assets/images/notification.svg";
import searchIcon from "../../assets/images/searchIcon.svg";
function EventsChatsPage() {
  const chatList = [
    { name: "Karen Lupert", imageUrl: chatPic, hasNewMessages: true },
    { name: "Karen Lupert", imageUrl: chatPic, hasNewMessages: true },
    { name: "Karen Lupert", imageUrl: chatPic, hasNewMessages: true },
  ];
  return (
    <>
      <EventsNavbar />
      <div className="events-chat-container">
        <div className="sidebar">
          <div className="title-edit">
            <h2>Chats</h2>
            <button>
              <img src={pencil} alt="Edit" />
            </button>
          </div>
          <div className="tabs-row">
            <span className="tab-option active-tab">Inbox</span>
            <span className="tab-option">Communities</span>
          </div>
          <div className="inbox-tab">
            {chatList.map((chat, index) => (
              <div key={index} className="chat-item">
                <img src={chat.imageUrl} alt={chat.name} />
                <span>{chat.name}</span>
                {chat.hasNewMessages && (
                  <img
                    src={notification}
                    alt="New Message"
                    className="notification-icon"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="search-container">
          <input type="text" placeholder="Search chats" />
          <button className="search-button">
            <img src={searchIcon} alt="Search" />
          </button>
        </div>
      </div>
    </>
  );
}

export default EventsChatsPage;

import EventsNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import "./EventsChats.scss";
import chatPic from "../../assets/images/chatPic.svg";
import pencil from "../../assets/images/pencil.svg";
import notification from "../../assets/images/notification.svg";
import searchIcon from "../../assets/images/searchIcon.svg";
import ellipsis from "../../assets/images/ellipsis.svg";

function EventsChatsPage() {
  const chatList = [
    { name: "Karen Lupert", imageUrl: chatPic, hasNewMessages: true },
    { name: "Karen Lupert", imageUrl: chatPic, hasNewMessages: true },
    { name: "Karen Lupert", imageUrl: chatPic, hasNewMessages: true },
  ];

  const messages = [
    {
      image: chatPic,
      sender: "Marina Reese",
      timestamp: "5:10 PM",
      content:
        "Quick note: today Liza will join our team synch to provide updates on the launch. If you have questions, bring them!",
    },
    {
      image: chatPic,
      sender: "Marina Reese",
      timestamp: "5:10 PM",
      content:
        "Quick note: today Liza will join our team synch to provide updates on the launch. If you have questions, bring them!",
    },
    {
      image: chatPic,
      sender: "Marina Reese",
      timestamp: "5:10 PM",
      content:
        "Quick note: today Liza will join our team synch to provide updates on the launch. If you have questions, bring them!",
    },
    // Additional messages can be added here in the same format
  ];

  const ChatMessage = ({ image, sender, timestamp, content }) => (
    <div className="chat-message">
      <div>
        <img src={image} alt="profile pic" />
      </div>
      <div>
        <strong>{sender}</strong> <span>{timestamp}</span>
        <p>{content}</p>
      </div>
    </div>
  );

  const ChatWindow = () => (
    <div>
      {messages.map((msg, index) => (
        <ChatMessage key={index} {...msg} />
      ))}
    </div>
  );
  

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
        <div className="whole-container">
          <div className="search-container">
            <input type="text" placeholder="Search chats" />
            <button className="search-button">
              <img src={searchIcon} alt="Search" />
            </button>
          </div>
          <div className="chat-container">
            <div className="chat-topBar">
              <span className="chat-name">Karen Lupert</span>
              <img className="chat-ellipsis" src={ellipsis} alt="ellipsis" />
            </div>
            <div className="chat-container-bottom">
              <ChatWindow />
              <div className="message-input-area">
                <input
                  className="message-input"
                  type="text"
                  placeholder="Type a message..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventsChatsPage;

import ChatNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import "./ChatsPage.scss";
import chatPic from "../../assets/images/chatPic.svg";
import pencil from "../../assets/images/pencil.svg";
import notification from "../../assets/images/notification.svg";
import searchIcon from "../../assets/images/searchIcon.svg";
import ellipsis from "../../assets/images/ellipsis.svg";
import paperclip from "../../assets/images/paperclip.svg";
import emoji from "../../assets/images/emoji.svg";

function ChatsPage() {
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
    <div className="chat__message">
      <img src={image} alt="profile pic" className="chat__message-img" />
      <div className="chat__message-container">
        <p className="chat__message-name">
          {sender} <span className="chat__message-time">{timestamp}</span>
        </p>
        <p className="chat__message-content">{content}</p>
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
  const handleAttachment = (event) => {
    // Get the selected file
    const file = event.target.files[0];
    // Perform actions with the file (like uploading or storing the file)
    console.log(file); // Just for demonstration
  };

  return (
    <>
      <ChatNavbar />
      <div className="chat">
        <div className="chat__sidebar">
          <div className="chat__title-edit">
            <h2 className="chat__title">Chats</h2>
            <button className="chat__button">
              <img className="chat__button-img" src={pencil} alt="Edit" />
            </button>
          </div>
          <div className="chat__tabs-row">
            <button className="chat__tabs-option">Inbox</button>
          </div>

          <div className="chat__inbox-tab">
            {chatList.map((chat, index) => (
              <div key={index} className="chat__inbox-tab-item">
                <img
                  className="chat__inbox-tab-item-image"
                  src={chat.imageUrl}
                  alt={chat.name}
                />
                <p>{chat.name}</p>
                {chat.hasNewMessages && (
                  <img
                    src={notification}
                    alt="New Message"
                    className="chat__inbox-tab-item-notification-icon"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="chat__whole-container">
          <div className="chat__search-container">
            <input
              type="text"
              placeholder="Search chats"
              className="chat__search"
            />
            <button className="chat__search-button">
              <img
                src={searchIcon}
                alt="Search"
                className="chat__search-button-img"
              />
            </button>
          </div>
          <div className="chat__container">
            <div className="chat__topbar">
              <h2 className="chat__name">Karen Lupert</h2>
              <img className="chat__ellipsis" src={ellipsis} alt="ellipsis" />
            </div>
            <div className="chat__container-bottom">
              <ChatWindow />
              <div className="chat__message-input-area">
                <input
                  className="chat__message-input"
                  type="text"
                  placeholder="Type a message..."
                />

                <input
                  type="file"
                  id="file-input"
                  style={{ display: "none" }}
                  onChange={handleAttachment}
                />
                <button
                  className="chat__search-button--alt"
                  onClick={() => document.getElementById("file-input").click()}
                >
                  <img src={paperclip} alt="Attach" />
                </button>
                <button className="chat__search-button--alt">
                  <img src={emoji} alt="Emoji" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatsPage;

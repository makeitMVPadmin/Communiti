import "./MembersTab.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import profilePic from "../../assets/images/profilePic.svg";
import chat from "../../assets/images/chatSingle.svg";
// import { db } from "../../Firebase/FirebaseConfig";
// import { collection, doc, getDoc } from "firebase/firestore";
import data from "../../data.json";

function MembersTab({ memberIds, memberRoles }) {
  const [membersData, setMembersData] = useState([]);

  //  DATA.JSON
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        const members = jsonData.filter(user => memberIds.includes(user.id))
        setMembersData(members)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // // FIREBASE DATA
  // useEffect(() => {
  //   const fetchMemberDetails = async () => {
  //     if (memberIds && memberIds.length > 0) {
  //       try {
  //         const usersRef = collection(db, "Users");
  //         const membersDetails = [];

  //         for (const memberId of memberIds) {
  //           const userDoc = await getDoc(doc(usersRef, memberId));
  //           if (userDoc.exists()) {
  //             const userData = userDoc.data();

  //             // Find the corresponding role for the member
  //             const role = memberRoles.find(
  //               (role) => role.memberId === memberId
  //             )?.role;

  //             const memberData = {
  //               id: userDoc.id,
  //               name: userData.fullName,
  //               role: role || "New Memeber",
  //               photo: userData.profilePhoto,
  //             };
  //             membersDetails.push(memberData);
  //           }
  //         }

  //         setMembersData(membersDetails);
  //       } catch (error) {
  //         console.error("Error fetching member details:", error);
  //       }
  //     }
  //   };

  //   fetchMemberDetails();
  // }, [memberIds, memberRoles]);

  return (
    <section className="members-tab">
      <div className="members-tab__header">
        <h2 className="members-tab__header-heading">
          Members{" "}
          <span className="members-tab__header-heading--alt">
            ({membersData.length}){" "}
          </span>
        </h2>
      </div>

      <ul className="members-tab__members">
        {membersData.map((member) => (
          <li key={member.id} className="members-tab__members-member">
            <div className="members-tab__members-member-left">
              <img
                className="members-tab__members-member-profile-pic"
                src={member.profilePhoto || profilePic}
                alt={`${member.fullName} profile`}
              ></img>

              <div className="members-tab__members-member-writing">
                <p className="members-tab__members-member-writing-name">
                  {member.fullName}
                </p>
                <p className="members-tab__members-member-writing-role">
                  {member.discipline}
                </p>
              </div>
            </div>
            <Link to={"/chat"}>
              <img
                className="members-tab__members-member-icon"
                src={chat}
                alt="chat bubble icon"
              ></img>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default MembersTab;

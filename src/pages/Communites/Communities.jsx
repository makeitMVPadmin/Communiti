import "./Communities.scss";
import DashboardNavbar from "../../components/DashboardNavbar/DashboardNavbar";
import Footer from "../../components/Footer/Footer";
import rightArrowIcon from "../../assets/images/rightArrowIcon.svg";
import plusIcon from "../../assets/images/plusIcon.svg";
import placeHolderIcon from "../../assets/images/PlaceHolderIcon.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db, auth } from "../../Firebase/FirebaseConfig";

function Communities() {
  const [userCommunitiesManaged, setUserCommunitiesManaged] = useState([]);
  const [userCommunitiesJoined, setUserCommunitiesJoined] = useState([]);
  const [showAllManagedCommunities, setShowAllManagedCommunities] =
    useState(false);
  const [showAllJoinedCommunities, setShowAllJoinedCommunities] =
    useState(false);
  const navigate = useNavigate();


  //  DATA.JSON
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/communities');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setUserCommunitiesManaged(jsonData.slice(-2))
        setUserCommunitiesJoined(jsonData.slice(0,3));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // // FIREBASE DATA
  // // Fetch user data and all communities from Firestore
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Get the current user from Firebase Authentication
  //       const currentUser = auth.currentUser;

  //       if (currentUser) {
  //         const uid = currentUser.uid;

  //         // Fetch user data
  //         const userSnapshot = await getDocs(collection(db, "Users"));
  //         const users = [];
  //         userSnapshot.forEach((doc) => {
  //           users.push({ id: doc.id, ...doc.data() });
  //         });

  //         // Find the user by ID (replace 'uid' with the actual user ID)
  //         const currentUserData = users.find((user) => user.id === uid);

  //         if (currentUserData) {
  //           setUserCommunitiesManage(currentUserData["CommunitiesManage"]);
  //           setUserCommunitiesJoined(currentUserData["CommunitiesJoined"]);
  //         }

  //         // Fetch all communities
  //         const communitiesSnapshot = await getDocs(
  //           collection(db, "Communities")
  //         );
  //         const communities = [];
  //         communitiesSnapshot.forEach((doc) => {
  //           communities.push({ id: doc.id, ...doc.data() });
  //         });
  //         setAllCommunities(communities);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data: ", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const handleCreateCommunity = () => {
    navigate("/communities/create");
  };

  return (
    <div className="communities">
      <DashboardNavbar />
      <div className="communities__contents">
        <div className="communities__create-container">
          <div className="communities__subheading-container">
            <h3 className="communities__subheading">
              Fuel your passion with a community.
            </h3>
            <h3 className="communities__subheading">
              Create and manage it with ease right here.
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

        {userCommunitiesManaged.length > 0 && (
          <section className="communities__managed-section">
            <div className="communities__joined">
              <div className="communities__joined-heading-container">
                <h2 className="communities__joined-heading">
                  Communities you manage
                </h2>
              </div>
              <button
                className="communities__joined-text"
                onClick={() =>
                  setShowAllManagedCommunities(!showAllManagedCommunities)
                }
              >
                {showAllManagedCommunities ? "View Less" : "View All"}
              </button>
            </div>

            <div className="communities__cards">
              {/* COMMUNITIES MANAGED  - FROM DATA.JSON */}
              {userCommunitiesManaged
                .slice(0, showAllManagedCommunities ? undefined : 3)
                .map(community => (
                <div key={community.id} className="communities__card">
                  <img
                    src={community.communityImage || placeHolderIcon}
                    alt={`${community.name} Icon `}
                    className="communities__card-profile-pic"
                  />
                  <div className="communities__card-bottom-container">
                    <h4 className="communities__card-heading">
                      {community.name}
                    </h4>
                    <button
                      className="communities__card-arrow-button"
                      onClick={() =>
                        navigate(`/communities/admin/${community.id}`)
                      }
                    >
                      <img
                        src={rightArrowIcon}
                        alt="right arrow button"
                        className="communities__card-arrow-button-img"
                      />
                    </button>
                  </div>
                </div>
              ))}

              {/* COMMUNITIES MANAGED - FROM FIREBASE */}
              {/* {userCommunitiesManaged
                .slice(0, showAllManagedCommunities ? undefined : 3)
                .map((communityId, index) => {
                  const community = allCommunities.find(
                    (c) => c.id === communityId
                  );
                  return (
                    <div key={index} className="communities__card">
                      <img
                        src={community?.CommunityImage || placeHolderIcon}
                        alt={`${community?.Name} Icon `}
                        className="communities__card-profile-pic"
                      />
                      <div className="communities__card-bottom-container">
                        <h4 className="communities__card-heading">
                          {community?.Name}
                        </h4>
                        <button
                          className="communities__card-arrow-button"
                          onClick={() =>
                            navigate(`/communities/admin/${community?.id}`)
                          }
                        >
                          <img
                            src={rightArrowIcon}
                            alt="right arrow button"
                            className="communities__card-arrow-button-img"
                          />
                        </button>
                      </div>
                    </div>
                  );
                })} */}
            </div>
          </section>
        )}

        {userCommunitiesJoined.length > 0 && (
          <section className="communities__joined-section">
            <div className="communities__joined">
              <div className="communities__joined-heading-container">
                <h2 className="communities__joined-heading">
                  Communities you joined
                </h2>
              </div>
              <button
                className="communities__joined-text"
                onClick={() =>
                  setShowAllJoinedCommunities(!showAllJoinedCommunities)
                }
              >
                {showAllJoinedCommunities ? "View Less" : "View All"}
              </button>
            </div>

            <div className="communities__cards">
            
              {/* COMMUNITIES JOINED - FROM DATA.JSON */}
              <div className="communities__cards">
                {userCommunitiesJoined
                  .slice(0, userCommunitiesJoined ? undefined : 3)
                  .map(community => (
                  <div key={community.id} className="communities__card">
                    <img
                      src={community.communityImage || placeHolderIcon}
                      alt={`${community.name} Icon `}
                      className="communities__card-profile-pic"
                    />
                    <div className="communities__card-bottom-container">
                      <h4 className="communities__card-heading">
                        {community.name}
                      </h4>
                      <button
                        className="communities__card-arrow-button"
                        onClick={() =>
                          navigate(`/communities/admin/${community.id}`)
                        }
                      >
                        <img
                          src={rightArrowIcon}
                          alt="right arrow button"
                          className="communities__card-arrow-button-img"
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* COMMUNITIES JOINED - FROM FIREBASE */}
              {/* {userCommunitiesJoined
                .slice(0, showAllJoinedCommunities ? undefined : 3)
                .map((communityId, index) => {
                  const community = allCommunities.find(
                    (c) => c.id === communityId
                  );
                  return (
                    <div key={index} className="communities__card">
                      <img
                        src={community?.CommunityImage || placeHolderIcon}
                        alt={`${community?.Name} Icon `}
                        className="communities__card-profile-pic"
                      />
                      <div className="communities__card-bottom-container">
                        <h4 className="communities__card-heading">
                          {community?.Name}
                        </h4>
                        <button
                          className="communities__card-arrow-button"
                          onClick={() =>
                            navigate(`/communities/${community?.id}`)
                          }
                        >
                          <img
                            src={rightArrowIcon}
                            alt="right arrow button"
                            className="communities__card-arrow-button-img"
                          />
                        </button>
                      </div>
                    </div>
                  );
                })} */}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Communities;

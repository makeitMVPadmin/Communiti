import { useState } from "react";
import "./CreateCommunitiPage.scss";
import DashboardNavbar from "../../../components/DashboardNavbar/DashboardNavbar";
import CreateCommuniti1 from "../../../components/CommunitiesComponents/CreateCommuniti1/CreateCommuniti1";
import CreateCommuniti2 from "../../../components/CommunitiesComponents/CreateCommuniti2/CreateCommuniti2";
import CreateCommuniti3 from "../../../components/CommunitiesComponents/CreateCommuniti3/CreateCommuniti3";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  arrayUnion,
  setDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db, auth } from "../../../Firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";

function CreateCommunitiPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [communitiName, setCommunitiName] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [location, setLocation] = useState([]);
  const [communitiDescription, setCommunitiDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleNext = async () => {
    if (currentStep === 1 && communitiName && (selectedOption || location)) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 2 && communitiDescription) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 3) {
      try {
        let imageUrl = null
        if (image) {
          const imageFilename = image.name || `image_${Date.now()}`;
          const storageRef = ref(storage, `community_images/${imageFilename}`);
          await uploadBytes(storageRef, image);
          imageUrl = await getDownloadURL(storageRef);
        }

        // Use the actual user ID when user authentication is implemented
        const createdBy = auth.currentUser.uid;

        const locationValues = [];

        // Check if "Virtual" is selected and add it to locationValues
        if (selectedOption.includes("virtual")) {
          locationValues.push("Virtual");
        }

        // Check if "In Person" is selected and add its value if available
        if (selectedOption.includes("in-person") && location) {
          locationValues.push(location);
        }

        const docRef = await addDoc(collection(db, "Communities"), {
          Name: communitiName,
          CreatedBy: createdBy,
          Created: serverTimestamp(),
          Description: communitiDescription,
          Location: locationValues,
          CommunityImage: imageUrl,
        });

        // Add the creator to the community members subcollection
        const membersCollectionRef = collection(
          db,
          `Communities/${docRef.id}/Members`
        );

        // Use the actual user ID when user authentication is implemented
        const creatorUserId = auth.currentUser.uid;

        // Add the creator as a member of the community
        await setDoc(doc(membersCollectionRef, creatorUserId), {
          JoinedAt: serverTimestamp(),
        });

        // Update user's CommunitiesManage field array
        const userDocRef = doc(collection(db, "Users"), creatorUserId);
        await updateDoc(userDocRef, {
          CommunitiesManage: arrayUnion(docRef.id),
        });

        console.log("Communiti creation complete!");
        // Navigate to the "/communities" route
        navigate(`/communities/admin/${docRef.id}`);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      navigate("/communities"); // Redirect to "/communities"
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="create-communiti-container">
      <DashboardNavbar />
      <div className="create-communiti">
        <div className="create-communiti__container">
          {currentStep === 1 && (
            <CreateCommuniti1
              communitiName={communitiName}
              setCommunitiName={setCommunitiName}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              location={location}
              setLocation={setLocation}
              handleBack={handleBack}
              handleNext={handleNext}
            />
          )}
          {currentStep === 2 && (
            <CreateCommuniti2
              communitiDescription={communitiDescription}
              setCommunitiDescription={setCommunitiDescription}
              handleBack={handleBack}
              handleNext={handleNext}
            />
          )}
          {currentStep === 3 && (
            <CreateCommuniti3
              image={image}
              setImage={setImage}
              handleBack={handleBack}
              handleNext={handleNext}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateCommunitiPage;

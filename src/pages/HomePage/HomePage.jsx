import "./HomePage.scss";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import NavbarAlt from "../../components/NavbarAlt/NavbarAlt";
import google from "../../assets/logos/google.svg";
import linkedin from "../../assets/logos/linkedin.svg";
import facebook from "../../assets/logos/facebook.svg";
import communitiHero from "../../assets//images/communitiHero.svg";
import { handleGoogleSignIn } from "../../Firebase/FirebaseAuth";

function HomePage() {
  const navigate = useNavigate();
  const handleGoogleButtonClicked = async () => {
    try {
      await handleGoogleSignIn();
      // Google sign-in was successful, you can redirect the user or perform any other actions here.
      navigate("/home");
    } catch (error) {
      // Handle the error or display an error message to the user.
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <>
      <NavbarAlt />
      <main className="homepage">
        <img
          src={communitiHero}
          alt="Home Icon"
          className="homepage__image"
        ></img>
        <section className="homepage__content">
          <h1 className="homepage__heading">Welcome to Communiti!</h1>
          <div className="homepage__buttons">
            <Link to="/login" className="homepage__buttons-link">
              <Button buttonText="Log In" className="button button--blue" />
            </Link>
            <Link to="/signup" className="homepage__buttons-link">
              <Button
                buttonText="Sign Up"
                className="button button--yellow-alt"
              />
            </Link>
          </div>
          <p className="homepage__writing">or</p>
          <div className="homepage__sso">
            <button
              className="homepage__sso-button homepage__sso-button--google"
              onClick={handleGoogleButtonClicked}
            >
              <img
                src={google}
                alt="Google Sign On"
                className="homepage__sso-icon"
              ></img>
            </button>
            <button className="homepage__sso-button homepage__sso-button--linkedin">
              <img
                src={linkedin}
                alt="linkedin Sign On"
                className="homepage__sso-icon"
              ></img>
            </button>
            <button className="homepage__sso-button homepage__sso-button--facebook">
              <img
                src={facebook}
                alt="facebook Sign On"
                className="homepage__sso-icon"
              ></img>
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export default HomePage;

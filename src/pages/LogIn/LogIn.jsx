import "./LogIn.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/Button/Button";
import NavbarAlt from "../../components/NavbarAlt/NavbarAlt";
import communitiHero from "../../assets//images/communitiHero.svg";

import google from "../../assets/logos/google.svg";
import linkedin from "../../assets/logos/linkedin.svg";
import facebook from "../../assets/logos/facebook.svg";
import { handleSignIn, handleGoogleSignIn } from "../../Firebase/FirebaseAuth";

function LogIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignInButtonClicked = async () => {
    try {
      await handleSignIn(email, password);
      // Sign-in was successful
      navigate("/home");
    } catch (error) {
      // Handle the error or display an error message to the user.
      console.error("Sign-in error:", error);
    }
  };

  const handleGoogleButtonClicked = async () => {
    try {
      await handleGoogleSignIn();
      // Google sign-in was successful
      navigate("/dashboard");
    } catch (error) {
      // Handle the error or display an error message to the user.
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <>
      <NavbarAlt />
      <main className="loginpage">
        <img
          src={communitiHero}
          alt="Home Icon"
          className="signuppage__image"
        ></img>
        <section className="loginpage__content">
          <h1 className="loginpage__heading">Log in to your Communiti!</h1>
          <form
            className="loginpage__form"
            onSubmit={handleSignInButtonClicked}
          >
            <input
              className="loginpage__input"
              placeholder="Email"
              type="email"
              name="email"
              id="email"
              autoComplete="current-email"
              value={email}
              onChange={handleEmailChange}
            ></input>
            <input
              className="loginpage__input"
              placeholder="Password"
              type="password"
              name="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
            ></input>
            <Link to={"/forgotpassword"} className="loginpage__forgot-link">
              <p className="loginpage__forgot"> FORGOT PASSWORD?</p>
            </Link>
            <Button
              buttonText="Log In"
              className="button button--yellow-alt loginpage__button"
              type="submit"
            />
          </form>
          <p className="loginpage__writing">or</p>
          <div className="loginpage__sso">
            <button className="loginpage__sso-button loginpage__sso-button--google">
              <img
                src={google}
                alt="Google Sign On"
                className="loginpage__sso-icon"
                onClick={handleGoogleButtonClicked}
              ></img>
            </button>
            <button className="loginpage__sso-button loginpage__sso-button--linkedin">
              <img
                src={linkedin}
                alt="linkedin Sign On"
                className="loginpage__sso-icon"
                onClick={handleGoogleButtonClicked}
              ></img>
            </button>
            <button className="loginpage__sso-button loginpage__sso-button--facebook">
              <img
                src={facebook}
                alt="facebook Sign On"
                className="loginpage__sso-icon"
                onClick={handleGoogleButtonClicked}
              ></img>
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export default LogIn;

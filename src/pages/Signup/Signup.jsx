import "./Signup.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import NavbarAlt from "../../components/NavbarAlt/NavbarAlt";
import homeImg from "../../assets/images/homeIcon.svg";
import google from "../../assets/logos/google-black.svg";
import { handleSignUp, handleGoogleSignIn } from "../../Firebase/firebaseAuth";


function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();

    // Call the Firebase signup function with the email and password
    handleSignUp(email, password)
      .then(() => {
        // Signup was successful, redirect
        navigate("/home");
      })
      .catch((error) => {
        // Handle signup error, you can display an error message
        console.error("Signup error:", error);
      });
  };

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
      <main className="signuppage">
        <img src={homeImg} alt="Home Icon" className="signuppage__image"></img>
        <section className="signuppage__content">
          <h1 className="signuppage__heading">
            Create Your <br /> Communiti!
          </h1>
          <form className="signuppage__form" onSubmit={handleSignupSubmit}>
            <input
              className="signuppage__input"
              placeholder="Full Name"
              type="text"
              name="name"
              id="name"
            ></input>
            <input
              className="signuppage__input"
              placeholder="Email"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            ></input>
            <input
              className="signuppage__input"
              placeholder="PASSWORD"
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            ></input>
            <Button
              buttonText="Sign Up"
              className="button button--gray"
              type="submit"
            />
          </form>
          <p className="signuppage__writing">or</p>
          <div className="signuppage__sso">
            <button
              className="signuppage__sso-button signuppage__sso-button--google"
              onClick={handleGoogleButtonClicked}
            >
              <img
                src={google}
                alt="logo for Google"
                className="signuppage__sso-icon"
              ></img>
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export default Signup;

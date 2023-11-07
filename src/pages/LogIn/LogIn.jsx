import "./LogIn.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/Button/Button";
import NavbarAlt from "../../components/NavbarAlt/NavbarAlt";
import homeImg from "../../assets/images/homeIcon.svg";
import google from "../../assets/logos/google-black.svg";
import { handleSignIn, handleGoogleSignIn } from "../../firebase/FirebaseAuth";

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
      // Sign-in was successful, you can redirect the user or perform any other actions here.
      navigate("/home");
    } catch (error) {
      // Handle the error or display an error message to the user.
      console.error("Sign-in error:", error);
    }
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
      <main className="loginpage">
        <img src={homeImg} alt="Home Icon" className="loginpage__image"></img>
        <section className="loginpage__content">
          <h1 className="loginpage__heading">
            Login in to your <br /> Communiti!
          </h1>
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
              placeholder="PASSWORD"
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
              buttonText="Sign In"
              className="button button--gray"
              type="submit"
            />
          </form>
          <p className="loginpage__writing">or</p>
          <div className="loginpage__sso">
            <button className="loginpage__sso-button loginpage__sso-button--google">
              <img
                src={google}
                alt="logo for Google"
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

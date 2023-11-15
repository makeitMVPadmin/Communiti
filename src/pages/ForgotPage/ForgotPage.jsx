import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPage.scss";
import NavbarAlt from "../../components/NavbarAlt/NavbarAlt";
import communitiHero from "../../assets/images/communitiHero.svg";
import Button from "../../components/Button/Button";
import { sendPasswordResetEmail } from "../../Firebase/FirebaseAuth";

function ForgotPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(email);
      setMessage("Password reset email sent! Check your inbox.");
      // Redirect to the login page
      navigate("/login"); // Change this to the correct route
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <NavbarAlt />
      <main className="forgotpage">
        <img
          src={communitiHero}
          alt="Home Icon"
          className="forgotpage__image"
        ></img>
        <section className="forgotpage__content">
          <h1 className="forgotpage__heading">Forgot Your Password?</h1>
          <form className="forgotpage__form" onSubmit={handleFormSubmit}>
            <div className="forgotpage__label-container">
              <label className="forgotpage__label">Email</label>
            </div>
            <input
              className="forgotpage__input"
              type="email"
              name="email"
              id="email"
              autoComplete="current-email"
              value={email}
              onChange={handleEmailChange}
            ></input>
            <div className="forgotpage__button-link">
              <Button
                buttonText="Recover Password"
                className="button button--yellow-alt forgotpage__button"
                type="submit"
              />
            </div>
          </form>
          {message && <p className="forgotpage__message">{message}</p>}
        </section>
      </main>
    </>
  );
}

export default ForgotPage;

import React, { useState } from "react";
import "./Hero.scss";
import Button from "../Button/Button";
import communitiHero from "../../assets/images/communitiHero.svg";
import arrowCircleButton from "../../assets/images/arrowCircleButton.svg";
import { handleSignUp } from "../../Firebase/FirebaseAuth";

function Hero() {
  const [email, setEmail] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSignupSubmit = (event) => {
    event.preventDefault();

    // Call Firebase signup function with the email
    handleSignUp(email)
      .then(() => {
        // Display success message to the user
        setShowForm(false);
        setShowSuccess(true);
      })
      .catch((error) => {
        // Handle signup error, you can display an error message
        console.error("Signup error:", error);
      });
  };

  const handleSuccessClose = () => {
    setShowForm(false);
    setShowSuccess(false);
  };

  return (
    <div className="hero">
      <div className="hero__image-container">
        <img className="hero__image" alt="Hero Icon" src={communitiHero} />
      </div>
      <div className="hero__left-container">
        <div className="hero__container">
          <h1 className="hero__header">Welcome to your Communiti!</h1>
        </div>
        <p className="hero__description">
          From interactive chats and virtual workshops to mentorships and more,
          we've got all your community needs covered in one place.
        </p>
        <div className="hero__container">
          <Button
            buttonText="Join the Launch"
            className="button button--yellow"
          />
          {showForm && (
            <div className="hero__sign-up">
              <form onSubmit={handleSignupSubmit} className="hero__form">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="email address"
                />
                <button type="submit" className="button button--yellow">
                  <img
                    src={arrowCircleButton}
                    alt="Submit"
                    className="arrow-circle-button"
                  ></img>
                </button>
              </form>
            </div>
          )}
          {showSuccess && (
            <div className="hero__success">
              <p className="hero__success-message">
                Success! Thank you for signing up! We can't wait to have you in
                the Communiti!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Hero;

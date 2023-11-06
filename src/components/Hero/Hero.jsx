import React from "react";
import { Link } from "react-router-dom";
import "./Hero.scss";
import Button from "../Button/Button";
import communitiHero from "../../assets//images/communitiHero.svg";

const Hero = () => {
  return (
    <div className="hero">
            <img className="hero__image" alt="Image" src={communitiHero} />
          <div>
          <div className="hero__container">
            <h1 className="hero__header"> Welcome to your Communiti!</h1>
          </div>
          <p className="hero__description">
            From interactive chats and virtual workshops to mentorships and
            more, we've got all your community needs covered in one place.
          </p>
        <div className="hero__sign-up">           
        <Link className="hero__container" to="/">
            <Button buttonText="Join the Launch" className="button button--yellow" />
          </Link>
        </div>
        </div> 
    </div>
  );
};

export default Hero;
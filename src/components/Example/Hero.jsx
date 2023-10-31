import React from "react";
import CtaButton from './components/buttons/CtaButton';
// import { Logo } from './Logo';
// import "./style.css"

export const Hero = () => {
  return (
    <div className="hero">
      <div className="splash-content">
        <div className="right-content">
          <div className="overlap-group">
            <img className="image" alt="Image" src="community_hero.png" />
          </div>
        </div>
        <div className="left-content">
          <CtaButton
            className="CTA-button-instance"
            divClassName="design-component-instance-node"
            pressed={false}
          />
          <p className="description">
            From interactive chats and virtual workshops to mentorships and
            more, we've got all your community needs covered in one place.
          </p>
          <div className="hero">
            <div className="div">
              <div className="hero-drop">Communiti!</div>
              <div className="hero-2"> Welcome to your Communiti!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

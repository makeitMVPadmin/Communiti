import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const CtaButton = ({ pressed, className }) => {
  return (
    <button className={`CTA-button-pressed-${pressed} ${className}`}>
      <div className="text-wrapper">Sign Up</div>
    </button>
  );
};

CtaButton.propTypes = {
  pressed: PropTypes.bool,
  className: PropTypes.string,
};
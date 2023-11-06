import PropTypes from "prop-types";
import React from "react";
import "./CtaButton.scss";

export const CtaButton = ({ pressed, className }) => {
  return (
    <button className={`CTA-button-pressed-${pressed || false } ${className || ""}`}>
    </button>
  );
};

CtaButton.propTypes = {
  pressed: PropTypes.bool,
  className: PropTypes.string,
};
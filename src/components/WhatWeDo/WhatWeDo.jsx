import "./WhatWeDo.scss";

import computer from "../../assets/images/computer.svg";
import laptopGuy from "../../assets/images/laptop-dude.svg";

const WhatWeDo = () => {
  return (
    <section className="what-we-do">
      <div className="what-we-do__left">
        <img
          src={computer}
          alt="emoji laptop"
          className="what-we-do__left-circle-icon"
        ></img>

        <h2 className="what-we-do__heading">WHAT WE DO</h2>
        <p className="what-we-do__writing">
          Communiti is an all-encompassing platform designed to foster and
          streamline community engagement.
        </p>
        <p className="what-we-do__writing">
          It offers a comprehensive suite of tools that includes calendars for
          event scheduling, newsletters for regular updates, real-time chat for
          instant communication, virtual workshops and courses for continuous
          learning, and a mentorship program to connect novices with experts.
        </p>
        <p className="what-we-do__writing">
          Intended to serve as the ultimate hub, Communiti aims to centralize
          and enhance the community experience, making it vibrant, cohesive, and
          efficient for all members.
        </p>
      </div>

      <img
        src={laptopGuy}
        alt="organized desk with a laptop computer sporting a 3d rendering of a man potentially talking about interesting apps to use on aforementioned computer"
        className="what-we-do__right-image"
      ></img>
    </section>
  );
};

export default WhatWeDo;

import React from "react";
import HowWeDoIt from "../../components/HowWeDoit/HowWeDoIt";
import Navbar from "../../components/Navbar/Navbar";
import WhatWeDo from "../../components/WhatWeDo/WhatWeDo";
import Footer from "../../components/Footer/Footer";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <HowWeDoIt />
      <WhatWeDo />
      <Footer />
    </>
  );
};

export default LandingPage;

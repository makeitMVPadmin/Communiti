import React from "react";
import HowWeDoIt from "../../components/HowWeDoit/HowWeDoIt";
import Navbar from "../../components/Navbar/Navbar";
import WhatWeDo from "../../components/WhatWeDo/WhatWeDo";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";


const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <HowWeDoIt />
      <WhatWeDo />
      <Footer />
    </>
  );
};

export default LandingPage;

import { useEffect, useState } from "react";
import FooterComponent from "../components/footer";
import Navbar from "../components/Navbar";
import HeroSection from "../components/hero";
import WhyChooseUs from "../components/WhyChooseUs";
import WorkDisplaySection from "../components/workDisplaySection";
import Services from "../components/services";
import CounterSection from "../components/statsComponent";
import PropertyListing from "../components/PropertyListing";
import OurClients from "../components/ourClients";
import RealEstateCTA from "../components/RealEstateCTA";
import ContactUs from "../components/ContactUsPage";
import ServicesSection from "../components/ServiceSection";
import OurJourney from "./About/Component/OurJourney";
import axios from "axios";
import OurValues from "./About/Component/OurValues";
import OurAchievements from "./About/Component/OurAchievements";

function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      {/* <WhyChooseUs about={general.about}/> */}
      <PropertyListing />
      <OurClients />
      <Services />
      <RealEstateCTA />
      {/* <CounterSection/> */}
      {/* <WorkDisplaySection /> */}
      {/* <ContactUs /> */}
      <FooterComponent />
    </>
  );
}

export default HomePage;

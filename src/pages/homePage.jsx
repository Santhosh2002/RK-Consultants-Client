import {useEffect,useState} from 'react';
import FooterComponent from '../components/footer';
import Navbar from '../components/Navbar';
import HeroSection from '../components/hero';
import WhyChooseUs from '../components/WhyChooseUs';
import WorkDisplaySection from '../components/workDisplaySection';
import Services from '../components/services';
import CounterSection from '../components/statsComponent';
import PropertyListing from '../components/propertyListing';
import OurClients from '../components/OurClients'
import RealEstateCTA from '../components/RealEstateCTA';
import ContactUs from '../components/ContactUsPage';
import ServicesSection from '../components/ServiceSection';
import OurJourney from './About/Component/OurJourney';
import axios from 'axios'
import OurValues from './About/Component/OurValues';
import OurAchievements from './About/Component/OurAchievements';

function HomePage() {
  const visitorUpdate = async()=>{
    const base= import.meta.env.VITE_BASE_URL ;
    const url = base + "/api/visitor/"; 
    await axios.get(url); 
  }
  const [general, setGeneral] = useState({});
  const getGeneralSettings = async()=>{
    const base = import.meta.env.VITE_BASE_URL;
    const url = base + "/api/general"; 
    const response = await axios.get(url); 
    setGeneral(response.data.general);
    return response.data.general; 
  }
  useEffect(()=>{
    visitorUpdate();
    getGeneralSettings(); 
  },[]); 
  return (
    <>
      <Navbar />
      <HeroSection logo={general.logo}/>
      <ServicesSection />
      {/* <WhyChooseUs about={general.about}/> */}
      <PropertyListing />
      <OurClients />
      <Services/>
      <RealEstateCTA />
      {/* <CounterSection/> */}
      {/* <WorkDisplaySection /> */}
      {/* <ContactUs /> */}
      <FooterComponent address={general.address} phone={general.phone} email={general.email} logo={general.logo} insta={general.instagram} fb={general.facebook}   linkedin={general.linkedin}  />  
    </>
  )
}

export default HomePage
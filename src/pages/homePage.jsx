import {useEffect,useState} from 'react';
import FooterComponent from '../components/footer';
import {HeroSection} from '../components/hero';
import WhyChooseUs from '../components/WhyChooseUs';
import WorkDisplaySection from '../components/workDisplaySection';
import Services from '../components/services';
import CounterSection from '../components/statsComponent';
import PropertyListing from '../components/propertyListing';
import OurClients from '../components/OurClients'
import RealEstateCTA from '../components/RealEstateCTA';
import ContactUs from '../components/ContactUsPage';
import axios from 'axios'

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
      <HeroSection logo={general.logo}/>
      <WhyChooseUs about={general.about}/>
      <PropertyListing />
      <OurClients />
      <RealEstateCTA />
      <Services/>
      {/* <CounterSection/> */}
      {/* <WorkDisplaySection /> */}
      {/* <ContactUs /> */}
      <FooterComponent address={general.address} phone={general.phone} email={general.email} logo={general.logo} insta={general.instagram} fb={general.facebook}   linkedin={general.linkedin}  />  
    </>
  )
}

export default HomePage
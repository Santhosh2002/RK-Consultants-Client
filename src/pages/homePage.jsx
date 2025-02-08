import {useEffect,useState} from 'react'
import FooterComponent from '../components/footer'
import {HeroSection} from '../components/hero'
import OurClients from '../components/ourClients'
import WhyChooseUs from '../components/WhyChooseUs'
import WorkDisplaySection from '../components/workDisplaySection'
import Services from '../components/services'
import CounterSection from '../components/statsComponent'
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
    <OurClients/>
    <Services/>
    <CounterSection/>
    <WorkDisplaySection />
    <FooterComponent address={general.address} phone={general.phone} email={general.email} logo={general.logo} insta={general.instagram} fb={general.facebook}   linkedin={general.linkedin}  />
    </>
  )
}

export default HomePage
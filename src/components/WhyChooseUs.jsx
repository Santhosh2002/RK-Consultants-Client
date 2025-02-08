import { motion } from "framer-motion";
import { fadeIn } from "../variants";
const WhyChooseUs = ({about}) => {
  return (
    <section className="bg-[#E0EDE5]"id='about'>
    <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-4 lg:px-6">
    <motion.div variants={
                    fadeIn('right', 0.1)
                    } initial="hidden" whileInView={"show"}viewport={{once:true,amount:0.01 }} className="grid grid-cols-2 gap-4 mt-8">
            <img className="w-full rounded-lg h-[calc(100vh-378px)] object-cover" src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="office content 1"/>
            <img className="mt-4 w-full lg:mt-10 rounded-lg h-[calc(100vh-378px)] object-cover" src="https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=1506&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="office content 2"/>
        </motion.div>
        <motion.div variants={
                    fadeIn('left', 0.1)
                    } initial="hidden" whileInView={"show"}viewport={{once:true,amount:0}} className="font-light text-black">
            <h2 className="mb-4 text-4xl tracking-tight font-semibold text-gray-900 ">Why Choose us?</h2>
            <p className="mb-4">{about}</p>
            

        </motion.div>
        
    </div>
</section>
  );
};

export default WhyChooseUs;

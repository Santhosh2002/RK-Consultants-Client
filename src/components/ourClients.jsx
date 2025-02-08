
import { motion } from "framer-motion";
import { fadeIn } from "../variants";
export default function OurClients() {
  const clientData = [
    {
      id: 1,
      image: "/client-logo-01.png",
      name: "Client 1",
      des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, optio.",
    },
    {
      id: 2,
      image: "/client-logo-03.png",
      name: "Client 3",
      des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, optio.",
    },
    {
      id: 3,
      image: "/client-logo-02.png",
      name: "Client 2",
      des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, optio.",
    },
  ];

  return (
    <>
    <section className="bg-gray-950"> 
      <div className="w-full pt-10 mx-auto text-center text-gray-200 bg-gray-950 font-semibold text-3xl">
        Our Clients
      </div>
      <div className="w-full mx-auto text-center text-gray-400 bg-gray-950 font-light text-lg">
        We have been working with some 50+ fortune clients
      </div>
      <div className="grid grid-cols-1  lg:grid-cols-3 gap-6 px-5 py-10 justify-center items-center w-full max-w-5xl mx-auto">
  {clientData.map((client, index) => (
    <motion.div variants={
        fadeIn('up', 0.2)
        } initial="hidden" whileInView={"show"}viewport={{once:true,amount:0.1 }}
      key={client.id}
      className={`max-w-lg bg-gray-100 border border-gray-800 rounded-lg shadow mx-auto hover:shadow-lg hover:scale-110 duration-150`}
    >
      <a href="#">
        <img
          className="rounded-t-lg w-full object-cover"
          src={client.image}
          alt={client.name}
        />
      </a>
      
    </motion.div>
  ))}
</div>
</section>

    </>
  );
}

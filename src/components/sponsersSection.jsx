

function SponsorsSection() {
  const sponsors = [
    { name: 'Kano', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTzPFGyg8JCSEJwPbZmGPbAjkvmaK6DMrxPg&s' },
    { name: 'Revenue', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTzPFGyg8JCSEJwPbZmGPbAjkvmaK6DMrxPg&s' },
    { name: 'Fivetran', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTzPFGyg8JCSEJwPbZmGPbAjkvmaK6DMrxPg&s' },
    { name: 'Gem', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTzPFGyg8JCSEJwPbZmGPbAjkvmaK6DMrxPg&s' },
    { name: 'Legion', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTzPFGyg8JCSEJwPbZmGPbAjkvmaK6DMrxPg&s' },
  ];

  return (
    <div className="bg-white py-10">
      <h2 className="text-center text-2xl font-bold mb-6 text-black">Our Partners</h2>
      <div className="flex flex-wrap justify-center items-center gap-40 px-4">
        {sponsors.map((sponsor, index) => (
         <div key={index} className="flex items-center justify-center">
         <img
           src={sponsor.logo}
           alt={sponsor.name}
           className="h-24 md:h-24 object-contain filter grayscale hover:grayscale-0 hover:scale-110 transition duration-300 ease-in-out"
         />
       </div>
        ))}
      </div>
    </div>
  );
}

export default SponsorsSection;

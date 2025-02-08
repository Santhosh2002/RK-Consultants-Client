import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const CounterSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Initial state for counters fetched from API
  const [counters, setCounters] = useState([]);
  const [counts, setCounts] = useState([]);

  // Fetch stats from the API
  const getStats = async () => {
    const url = import.meta.env.VITE_BASE_URL + "/api/stats";
    try {
      const response = await axios.get(url);

      const apiStats = response.data.stats;
      const countersFromApi = [
        { label: "Happy Clients", value: apiStats?.happyClients || 0 },
        { label: "Projects Done", value: apiStats?.projects || 0 },
        { label: "Days of Work", value: apiStats?.daysOfWork || 0 },
      ];

      setCounters(countersFromApi);
      setCounts(countersFromApi.map(() => 0)); // Initialize counters with 0 for animation
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  // Observe visibility of the section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Fetch stats on component mount
  useEffect(() => {
    getStats();
  }, []);

  // Animate counters when section is visible
  useEffect(() => {
    if (isVisible && counters.length > 0) {
      const intervalIds = counters.map((counter, index) => {
        return setInterval(() => {
          setCounts((prevCounts) => {
            const newCounts = [...prevCounts];
            if (newCounts[index] < counter.value) {
              newCounts[index] += Math.ceil(counter.value / 50); // Increment speed
            } else {
              clearInterval(intervalIds[index]);
              newCounts[index] = counter.value;
            }
            return newCounts;
          });
        }, 30);
      });

      return () => intervalIds.forEach((id) => clearInterval(id));
    }
  }, [isVisible, counters]);

  return (
    <div
      ref={sectionRef}
      className="bg-[#E0EDE5] py-16 text-center text-black flex justify-center items-center"
    >
      <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 gap-8">
        {counters.map((counter, index) => (
          <div
            key={counter.label}
            className="flex flex-col items-center justify-center"
          >
            <h2 className="text-4xl font-bold text-green-600">
              {counts[index]}+
            </h2>
            <p className="text-lg mt-2">{counter.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CounterSection;

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FaReact,
  FaNodeJs,
  FaJsSquare,
  FaGoogle,
  FaFire,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiFirebase,
  SiVite,
  SiSocketdotio,
  SiAxios,
} from "react-icons/si";
import { RiRouteLine, RiDragDropLine } from "react-icons/ri";
import { BiLogoTypescript } from "react-icons/bi";

const TechnologiesUsed = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animation variants for tech nodes (continuous orbit)
  const nodeVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
    orbit: {
      rotate: 360,
      transition: {
        duration: 20, // Adjust speed of rotation (20 seconds for a full circle)
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  // Tech stack data
  const technologies = [
    { icon: <FaReact size={40} />, name: "React", color: "#61DAFB" },
    { icon: <FaJsSquare size={40} />, name: "JavaScript", color: "#F7DF1E" },
    { icon: <BiLogoTypescript size={40} />, name: "TypeScript", color: "#3178C6" },
    { icon: <SiTailwindcss size={40} />, name: "Tailwind CSS", color: "#38B2AC" },
    { icon: <SiVite size={40} />, name: "Vite", color: "#646CFF" },
    { icon: <SiFirebase size={40} />, name: "Firebase", color: "#FFCA28" },
    { icon: <FaGoogle size={40} />, name: "Google Auth", color: "#4285F4" },
    { icon: <RiDragDropLine size={40} />, name: "@hello-pangea/dnd", color: "#FF6F61" },
    { icon: <RiRouteLine size={40} />, name: "React Router", color: "#CA4245" },
    { icon: <SiAxios size={40} />, name: "Axios", color: "#5A29E4" },
    { icon: <SiSocketdotio size={40} />, name: "Socket.IO", color: "#010101" },
    { icon: <FaFire size={40} />, name: "Framer Motion", color: "#FF0080" },
    { icon: <FaNodeJs size={40} />, name: "Node.js", color: "#68A063" },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-[#211444] transition-colors duration-500 relative overflow-hidden">
      {/* Background Orbital Lines */}
      <motion.div
        className="absolute inset-0 opacity-20 dark:opacity-30"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <svg className="w-full h-full dark:[#211444] ">
          <circle cx="50%" cy="50%" r="40%" stroke="pink" strokeWidth="1" fill="none" />
          <circle cx="50%" cy="50%" r="30%" stroke="purple" strokeWidth="1" fill="none" />
        </svg>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Orbital Tech Grid with Centered Heading */}
        <div className="relative flex justify-center items-center min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
          {/* Centered Heading and Subheading */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute text-center z-20"
            style={{ top: "45%", transform: "translate(-50%, -50%)" }}
          >
            <h2 className="text-2xl   font-extrabold text-[#1B4D3E] dark:text-[#6EE7B7] tracking-tight drop-shadow-[0_2px_6px_rgba(27,77,62,0.5)] dark:drop-shadow-[0_2px_6px_rgba(110,231,183,0.5)]">
              Technologies Used
            </h2>
            <p className="mt-2 sm:mt-3 text-base  text-gray-700 dark:text-gray-300 font-light">
              A constellation of tools powering TaskPilot.
            </p>
            <motion.div
              className="w-24 sm:w-32 md:w-40 h-1 bg-gradient-to-r from-[#6EE7B7] to-[#A78BFA] mx-auto mt-2 sm:mt-3 md:mt-4 rounded-full shadow-[0_0_10px_#6EE7B7] dark:shadow-[0_0_10px_#A78BFA]"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.div>

          {/* Rotating Tech Icons Container */}
          <motion.div
            className="absolute top-1/2 left-1/2"
            style={{ transform: "translate(-50%, -50%)" }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Rotating Tech Icons */}
            {technologies.map((tech, index) => {
              const totalTech = technologies.length;
              const angle = (index / totalTech) * 2 * Math.PI; // Use radians for Math.cos/sin
              const radius = windowWidth < 480 ? 100 : windowWidth < 768 ? 150 : 250; // Adjusted for mobile responsiveness
              const x = radius * Math.cos(angle);
              const y = radius * Math.sin(angle);

              return (
                <motion.div
                  key={index}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={nodeVariants}
                  className="absolute flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-gray-800 dark:bg-[#2a1b5e] rounded-full shadow-lg"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    position: "absolute",
                  }}
                >
                  {/* Glowing Background */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `radial-gradient(circle, ${tech.color}40 0%, transparent 70%)`,
                      opacity: 0.4, // Constant opacity (no hover effect)
                      transition: "opacity 0.3s",
                    }}
                  />

                  {/* Icon */}
                  <motion.div
                    className="relative z-10"
                    style={{ color: tech.color }}
                  >
                    {tech.icon}
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Floating Particles (Scaled for responsiveness) */}
      <motion.div
        className="absolute top-1/5 left-1/5 w-3 sm:w-4 md:w-5 bg-[#6EE7B7] rounded-full"
        animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-2 sm:w-3 md:w-4 bg-[#A78BFA] rounded-full"
        animate={{ y: [0, 15, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute top-20 left-20 w-32 h-32 md:w-52 md:h-52 bg-pink-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 md:w-52 md:h-52 bg-green-500 opacity-20 rounded-full blur-3xl animate-pulse delay-700"></div>
    </section>
  );
};

export default TechnologiesUsed;
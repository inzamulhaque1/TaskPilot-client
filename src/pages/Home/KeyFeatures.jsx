import { motion } from "framer-motion";
import {
  FcGoogle,
  FcTodoList,
  FcRefresh,
  FcNightPortrait,
  FcList,
  FcPrivacy,
} from "react-icons/fc"; // Colorful icons
import { useState } from "react";

const KeyFeatures = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Animation variants for polaroid cards
  const cardVariants = {
    hidden: { opacity: 0, y: 100, rotate: -5 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotate: i % 2 === 0 ? 3 : -3, // Slight tilt for variety
      transition: { delay: i * 0.2, duration: 0.7, ease: "easeOut" },
    }),
    hover: {
      y: -20,
      rotate: 0,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.4 },
    },
  };

  // Features data with unique gradient colors
  const features = [
    {
      icon: <FcGoogle size={50} />,
      title: "Google Sign-In",
      description: "Log in effortlessly with Google.",
      gradient: "from-[#FF6F61] to-[#FFD700]", // Coral to Gold
    },
    {
      icon: <FcTodoList size={50} />,
      title: "Drag-and-Drop",
      description: "Rearrange tasks with ease.",
      gradient: "from-[#6EE7B7] to-[#34D399]", // Lime to Emerald
    },
    {
      icon: <FcRefresh size={50} />,
      title: "Real-time Updates",
      description: "Instant task syncing.",
      gradient: "from-[#A78BFA] to-[#7C3AED]", // Lavender to Purple
    },
    {
      icon: <FcNightPortrait size={50} />,
      title: "Dark Mode",
      description: "Sleek, eye-friendly theme.",
      gradient: "from-[#211444] to-[#4C1D95]", // Deep Purple to Indigo
    },
    {
      icon: <FcList size={50} />,
      title: "Task Categories",
      description: "Organize with To-Do, In Progress, Done.",
      gradient: "from-[#F472B6] to-[#EC4899]", // Pink to Magenta
    },
    {
      icon: <FcPrivacy size={50} />,
      title: "Secure Storage",
      description: "Data encryption for privacy.",
      gradient: "from-orange-500 to-black", // Pink to Magenta
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-100 to-gray-300 dark:from-[#1a0b38] dark:to-[#211444] transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading and Subheading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 relative"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold text-[#1B4D3E] dark:text-[#6EE7B7] tracking-wide drop-shadow-lg">
            Key Features
          </h2>
          <p className="mt-3 text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-light">
            Unleash productivity with TaskPilot’s standout tools.
          </p>
          {/* Decorative underline */}
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-[#6EE7B7] to-[#A78BFA] mx-auto mt-4 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>
        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 relative">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={cardVariants}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative bg-white dark:bg-[#2a1b5e] rounded-lg p-6 transform perspective-1000"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Polaroid Frame Effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-20 rounded-lg`}
              />
              <div className="relative z-10 bg-white dark:bg-[#2a1b5e] rounded-lg p-6 shadow-xl border-4 border-white dark:border-[#211444] transform rotate-1">
                {/* Icon with Floating Tape Effect */}
                <div className="relative mb-6">
                  <motion.div
                    className="absolute -top-4 -left-4 w-12 h-2 bg-[#FFD700] dark:bg-[#A78BFA] rotate-45 opacity-70"
                    animate={
                      hoveredIndex === index
                        ? { scale: 1.2, opacity: 1 }
                        : { scale: 1, opacity: 0.7 }
                    }
                    transition={{ duration: 0.3 }}
                  />
                  <div className="flex justify-center">{feature.icon}</div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-[#1B4D3E] dark:text-[#A78BFA] mb-2">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-base">
                  {feature.description}
                </p>

                {/* Decorative Bottom Accent */}
                <motion.div
                  className={`w-16 h-1 bg-gradient-to-r ${feature.gradient} mx-auto mt-4 rounded-full`}
                  initial={{ width: 0 }}
                  animate={
                    hoveredIndex === index ? { width: 200 } : { width: 32 }
                  }
                  transition={{ duration: 0.4 }}
                />
              </div>

              {/* Subtle Floating Particle */}
              {hoveredIndex === index && (
                <motion.div
                  className="absolute -top-2 -right-2 w-4 h-4 bg-[#6EE7B7] rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              )}
            </motion.div>
          ))}
          
        </div>
        
      </div>
      <div className="absolute top-20 left-20 w-32 h-32 md:w-52 md:h-52 bg-pink-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 md:w-52 md:h-52 bg-green-500 opacity-20 rounded-full blur-3xl animate-pulse delay-700"></div>
    </section>
  );
};

export default KeyFeatures;

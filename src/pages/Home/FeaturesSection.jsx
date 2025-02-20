import { FaTasks, FaUsers, FaBell, FaChartLine, FaSync, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaTasks className="w-12 h-12 mb-4 text-lime-600 dark:text-lime-400" />,
      title: "Task Management",
      description: "Easily create, organize, and prioritize tasks to stay on top of your work.",
    },
    {
      icon: <FaUsers className="w-12 h-12 mb-4 text-lime-600 dark:text-lime-400" />,
      title: "Team Collaboration",
      description: "Collaborate with your team in real-time and assign tasks effortlessly.",
    },
    {
      icon: <FaBell className="w-12 h-12 mb-4 text-lime-600 dark:text-lime-400" />,
      title: "Smart Reminders",
      description: "Get timely reminders and notifications to never miss a deadline.",
    },
    {
      icon: <FaChartLine className="w-12 h-12 mb-4 text-lime-600 dark:text-lime-400" />,
      title: "Progress Tracking",
      description: "Track your progress with intuitive charts and analytics.",
    },
    {
      icon: <FaSync className="w-12 h-12 mb-4 text-lime-600 dark:text-lime-400" />,
      title: "Sync Across Devices",
      description: "Access your tasks from anywhere, on any device.",
    },
    {
      icon: <FaLock className="w-12 h-12 mb-4 text-lime-600 dark:text-lime-400" />,
      title: "Secure & Private",
      description: "Your data is safe with our end-to-end encryption.",
    },
  ];

  return (
    <section className="py-16 relative md:py-20 px-4 md:px-12 bg-gray-50 dark:bg-[#211444] text-gray-800 dark:text-white">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4"
        >
          Why Choose <span className="text-lime-600 dark:text-lime-400">TaskPilot</span>?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl mb-12 text-gray-600 dark:text-gray-300"
        >
          Discover the features that make TaskPilot the ultimate productivity tool.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="p-6 bg-white dark:bg-[#1A1A2E] rounded-lg shadow-lg hover:shadow-xl hover:shadow-lime-300 transition-shadow duration-300"
            >
              <div className="flex flex-col items-center">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
      <div className="absolute top-20 left-20 w-32 h-32 md:w-52 md:h-52 bg-pink-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 md:w-52 md:h-52 bg-yellow-400 opacity-20 rounded-full blur-3xl animate-pulse delay-700"></div>
    </section>
  );
};

export default FeaturesSection;
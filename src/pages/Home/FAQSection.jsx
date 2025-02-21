import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaQuestionCircle, FaChevronDown, FaCheckCircle, FaLightbulb, FaRocket } from "react-icons/fa";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);


  // Animation variants for FAQ items
  const itemVariants = {
    hidden: { opacity: 0, height: 0, marginBottom: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      marginBottom: "1rem",
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: { opacity: 0, height: 0, marginBottom: 0, transition: { duration: 0.4 } },
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.2, duration: 0.6 },
    },
  };

  // FAQ data with unique icons and colors
  const faqs = [
    {
      question: "What is TaskPilot?",
      answer:
        "TaskPilot is a cutting-edge task management tool that offers real-time updates, drag-and-drop functionality, and task categorization to boost productivity.",
      icon: <FaRocket size={24} className="text-[#FF6F61]" />, // Coral icon
    },
    {
      question: "How do I sign up for TaskPilot?",
      answer:
        "You can sign up for TaskPilot using Google Sign-In or by creating an account directly on our website. It’s quick, secure, and free!",
      icon: <FaCheckCircle size={24} className="text-[#6EE7B7]" />, // Lime icon
    },
    {
      question: "Can I use TaskPilot offline?",
      answer:
        "TaskPilot supports offline mode through local storage and syncs your tasks once you’re back online, ensuring uninterrupted productivity.",
      icon: <FaLightbulb size={24} className="text-[#A78BFA]" />, // Lavender icon
    },
    {
      question: "What features does TaskPilot offer?",
      answer:
        "TaskPilot offers real-time updates, drag-and-drop task management, dark mode, task categories (To-Do, In Progress, Done), and Firebase-powered authentication.",
      icon: <FaQuestionCircle size={24} className="text-[#FFD700]" />, // Gold icon
    },
  ];

  return (
    <section className={`py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-[#1a0b38] transition-colors duration-500 relative overflow-hidden`}>


      {/* Background Glow Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-30"
        animate={{
          scale: [1, 1.02, 1],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-[#6EE7B7] rounded-full opacity-30 top-1/4 left-1/5" />
        <div className="absolute w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-[#A78BFA] rounded-full opacity-30 bottom-1/3 right-1/4" />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-500 dark:text-white text-center mb-12 tracking-wide drop-shadow-[0_2px_6px_rgba(27,77,62,0.5)] dark:drop-shadow-[0_2px_6px_rgba(110,231,183,0.5)]`}
        >
          Frequently Asked Questions
        </motion.h2>

        {/* FAQ Accordion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="mb-4"
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            >
              {/* Question Card */}
              <motion.div
                className="relative bg-gray-200 dark:bg-[#2a1b5e] rounded-xl p-6 sm:p-8 shadow-md cursor-pointer hover:bg-gray-300 dark:hover:bg-[#3a2b7e] transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {faq.icon}
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100">
                      {faq.question}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaChevronDown className="text-gray-600 dark:text-gray-400" size={20} />
                  </motion.div>
                </div>
              </motion.div>

              {/* Answer (Animated Collapse/Expand) */}
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="bg-gray-100 dark:bg-[#3a2b7e] rounded-b-xl p-6 sm:p-8 text-gray-700 dark:text-gray-300 text-sm sm:text-base shadow-md"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
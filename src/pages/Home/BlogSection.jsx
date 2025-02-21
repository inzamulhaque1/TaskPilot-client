import { motion } from "framer-motion";
import { FaRegClock, FaClipboardList, FaRocket, FaRegStar } from "react-icons/fa";

const BlogSection = () => {
  const blogPosts = [
    {
      title: "The Power of TaskPilot: Real-Time Task Management",
      date: "Feb 21, 2025",
      comments: 12,
      icon: <FaClipboardList />,
      description:
        "TaskPilot allows real-time task management with features like drag-and-drop, live updates, and categorization of tasks for streamlined productivity.",
    },
    {
      title: "Building TaskPilot with React and Node.js",
      date: "Feb 18, 2025",
      comments: 5,
      icon: <FaRocket />,
      description:
        "TaskPilot uses React for the frontend and Node.js for the backend, making it a powerful, fast, and scalable web app to manage all your tasks efficiently.",
    },
    {
      title: "The Future of Task Management with TaskPilot",
      date: "Feb 15, 2025",
      comments: 8,
      icon: <FaRegStar />,
      description:
        "With features like Firebase authentication, real-time updates, and task categorization, TaskPilot is the future of intuitive and efficient task management.",
    },
  ];

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: {
      scale: 1.05,
      rotate: 3,
      boxShadow: "0 4px 25px rgba(0, 255, 255, 0.4)",
      transition: { type: "spring", stiffness: 300 },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-br from-white to-[#F9F9F9] dark:from-[#1a0b38] dark:to-[#211444] relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-extrabold text-[#FF014F] dark:text-[#A78BFA]">
            Blog - TaskPilot
          </h2>
          <p className="text-xl mt-3 text-gray-700 dark:text-gray-300 font-light">
            Explore the power, technology, and features behind TaskPilot, the ultimate task management tool.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              className="relative bg-white dark:bg-[#2a1b5e] text-black dark:text-white p-8 rounded-lg shadow-xl overflow-hidden transition-all duration-300 transform hover:scale-105"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              {/* Snake-Like Border Animation */}
              <motion.div
                className="absolute inset-0 border-4 border-transparent rounded-lg animate-border z-10"
                style={{
                  animation: "snake-border 4s linear infinite",
                }}
              ></motion.div>

              <div className="relative z-20">
                {/* Icon */}
                <div className="text-4xl mb-4 text-[#FF014F] dark:text-[#6EE7B7]">{post.icon}</div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-2">{post.title}</h3>

                {/* Date */}
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{post.date}</p>

                {/* Description */}
                <p className="text-gray-700 dark:text-gray-300 mb-4">{post.description}</p>

                {/* Comments */}
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                  <FaRegClock className="mr-2" />
                  <span>{post.comments} Comments</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;

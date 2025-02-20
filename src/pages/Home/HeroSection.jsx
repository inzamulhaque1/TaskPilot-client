import { Link } from "react-router-dom";
import taskIllustration from "../../assets/images/img.png";
import bgImage from "../../assets/images/bg/bg-adv.jpg";

const HeroSection = () => {
  return (
    <section
      className="relative flex flex-col md:flex-row items-center justify-between py-12 md:py-20 px-4 md:px-12 
      bg-cover bg-center bg-no-repeat text-white overflow-hidden 
      dark:bg-[#211444]"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/50 dark:bg-[#211444]/80"></div>

      {/* Image Section */}
      <div className="relative z-10 w-full md:w-1/2 lg:w-2/5 flex justify-center md:justify-start mb-8 md:mb-0 animate-fade-in-left">
        <img
          src={taskIllustration}
          alt="TaskPilot Productivity Illustration"
          className="w-3/4 md:w-[85%] lg:w-[75%] max-w-sm md:max-w-md transform hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Text Section */}
      <div className="relative z-10 w-full md:w-1/2 lg:w-3/5 text-center md:text-left animate-fade-in-right px-4 md:px-0">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight tracking-tight">
          Conquer Chaos with <span className="text-lime-400">TaskPilot</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-8 font-light text-gray-200 max-w-lg mx-auto md:mx-0">
          Master your to-dos, streamline collaboration, and soar to peak productivity.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6 justify-center md:justify-start">
          <Link
            to="/dashboard"
            className="inline-block bg-lime-400 px-6 md:px-8 py-3 md:py-4 rounded-full text-black font-semibold text-base md:text-lg shadow-lg hover:bg-lime-300 hover:scale-105 transition-all duration-300"
          >
            Launch Your Tasks
          </Link>
          <Link
            to="/login"
            className="inline-block bg-white px-6 md:px-8 py-3 md:py-4 rounded-full text-[#143D3A] font-semibold text-base md:text-lg shadow-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300"
          >
            Log In Now
          </Link>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 md:w-52 md:h-52 bg-lime-400 opacity-20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 md:w-52 md:h-52 bg-teal-400 opacity-20 rounded-full blur-xl animate-pulse delay-700"></div>
    </section>
  );
};

export default HeroSection;
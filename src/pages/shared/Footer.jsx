import  { useState } from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin,
  ArrowUpCircle,
  Heart
} from 'lucide-react';
import logo from "../../assets/images/logo/TaskPilot1.png";
const Footer = () => {
  const [isHovered, setIsHovered] = useState(null);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-[#1B4D3E] dark:bg-[#211444] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
            <img className="h-[60px] rounded-xl" src={logo} alt="TaskPilot Logo" />
            </div>
            <p className="text-gray-300">
              Empowering your productivity with intelligent task management solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Services', 'Contact'].map((link) => (
                <li key={link}>
                  <button 
                    className="hover:text-teal-300 transition-colors duration-300 flex items-center space-x-2"
                    onMouseEnter={() => setIsHovered(link)}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    <span className={`transform transition-transform duration-300 ${isHovered === link ? 'translate-x-2' : ''}`}>
                      {link}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 group">
                <Mail className="w-5 h-5 group-hover:text-teal-300 transition-colors duration-300" />
                <span className="group-hover:text-teal-300 transition-colors duration-300">
                  contact@taskpilot.com
                </span>
              </div>
              <div className="flex items-center space-x-3 group">
                <Phone className="w-5 h-5 group-hover:text-teal-300 transition-colors duration-300" />
                <span className="group-hover:text-teal-300 transition-colors duration-300">
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-center space-x-3 group">
                <MapPin className="w-5 h-5 group-hover:text-teal-300 transition-colors duration-300" />
                <span className="group-hover:text-teal-300 transition-colors duration-300">
                  123 Business Ave, Suite 100
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-12 flex justify-center space-x-6">
          {[
            { Icon: Facebook, label: 'Facebook' },
            { Icon: Twitter, label: 'Twitter' },
            { Icon: Instagram, label: 'Instagram' }
          ].map(({ Icon, label }) => (
            <button
              key={label}
              className="transform hover:scale-110 hover:text-teal-300 transition-all duration-300"
              aria-label={label}
            >
              <Icon className="w-6 h-6" />
            </button>
          ))}
        </div>

        {/* Scroll to Top Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={scrollToTop}
            className="animate-bounce hover:text-teal-300 transition-colors duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUpCircle className="w-8 h-8" />
          </button>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center border-t border-teal-800 pt-8">
          <p className="flex items-center justify-center text-sm text-gray-300">
            Made with <Heart className="w-4 h-4 mx-2 text-red-500" /> by TaskPilot © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
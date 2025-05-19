import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative bg-jet-black/90 backdrop-blur-sm border-t border-titanium-gray/20 py-8 sm:py-10">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 xs:gap-7 sm:gap-8">
          {/* Logo & About */}
          <div className="flex flex-col items-center sm:items-start">
            <motion.div 
              className="flex items-center mb-3 xs:mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 relative mr-1.5 xs:mr-2">
                <div className="absolute inset-0 bg-deep-sky-blue/30 rounded-full blur-md"></div>
                <div className="absolute inset-1.5 xs:inset-2 bg-jet-black rounded-full"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-deep-sky-blue font-orbitron font-bold text-[10px] xs:text-xs">A</span>
                </div>
              </div>
              <h2 className="text-base xs:text-lg font-orbitron font-bold tracking-wider text-white">
                <span className="text-deep-sky-blue">AERO</span>BMSCE
              </h2>
            </motion.div>
            <p className="text-titanium-gray text-xs xs:text-sm text-center sm:text-left mb-3 xs:mb-4 max-w-xs">
              Exploring the frontiers of aerospace engineering through innovation, education, and hands-on projects.
            </p>
            <div className="flex justify-center space-x-2 xs:space-x-3">
              {['instagram', 'linkedin', 'github', 'twitter'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  className="w-7 h-7 xs:w-8 xs:h-8 rounded-full bg-jet-black border border-titanium-gray/30 flex items-center justify-center text-titanium-gray hover:text-deep-sky-blue hover:border-deep-sky-blue transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Visit our ${social}`}
                >
                  <span className="sr-only">{social}</span>
                  <i className={`fa-brands fa-${social}`}></i>
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-white font-orbitron text-xs xs:text-sm mb-3 xs:mb-4 tracking-wider uppercase">Navigate</h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-1 xs:gap-2">
              {['Home', 'About', 'Events', 'Projects', 'Team', 'Contact'].map((link) => (
                <li key={link}>
                  <motion.a 
                    href={`#${link.toLowerCase()}`}
                    className="text-titanium-gray hover:text-deep-sky-blue transition-colors duration-300 text-xs xs:text-sm inline-block py-1"
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div className="text-center sm:text-left">
            <h3 className="text-white font-orbitron text-xs xs:text-sm mb-3 xs:mb-4 tracking-wider uppercase">Contact Base</h3>
            <ul className="space-y-2 xs:space-y-3">
              <li className="flex flex-col sm:flex-row sm:items-center text-xs xs:text-sm">
                <span className="text-titanium-gray sm:mr-2 uppercase text-[10px] xs:text-xs">Location:</span>
                <span className="text-white">BMSCE, Bangalore, India</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center text-xs xs:text-sm">
                <span className="text-titanium-gray sm:mr-2 uppercase text-[10px] xs:text-xs">Email:</span>
                <a href="mailto:contact@aerobmsce.org" className="text-deep-sky-blue hover:text-deep-sky-blue/80 transition-colors duration-300 break-all">
                  contact@aerobmsce.org
                </a>
              </li>
              <li className="flex flex-col sm:flex-row sm:items-center text-xs xs:text-sm">
                <span className="text-titanium-gray sm:mr-2 uppercase text-[10px] xs:text-xs">Phone:</span>
                <span className="text-white">+91 80 2662 2130</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-4 sm:pt-5 border-t border-titanium-gray/10 text-center text-titanium-gray text-[10px] xs:text-xs">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p>&copy; {currentYear} AeroBMSCE. All rights reserved.</p>
            <div className="mt-2 sm:mt-0 flex space-x-4">
              <a href="#" className="hover:text-deep-sky-blue transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-deep-sky-blue transition-colors duration-300">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none"></div>
    </footer>
  );
};

export default Footer;

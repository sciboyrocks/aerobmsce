import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useContext } from 'react';
import NightModeToggle from './NightModeToggle';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  nightMode?: boolean;
  setNightMode?: (nightMode: boolean) => void;
}

const Navbar = ({ activeSection, setActiveSection, nightMode = false, setNightMode }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Use the nightMode prop directly
  const isNightMode = nightMode;

  // No need for the observer since we're now using the nightMode prop directly
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'events', label: 'Events' },
    { id: 'projects', label: 'Projects' },
    { id: 'team', label: 'Team' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleClick = (section: string) => {
    setActiveSection(section);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? isNightMode 
            ? 'bg-jet-black/80 backdrop-blur-md py-2' 
            : 'bg-sky-blue/80 backdrop-blur-md py-2 shadow-md' 
          : 'py-3 xs:py-4 sm:py-5'
      }`}
    >
      <div className="container mx-auto px-3 xs:px-4 flex justify-between items-center">
        <motion.div 
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 relative mr-1.5 xs:mr-2">
            <div className={`absolute inset-0 ${isNightMode ? 'bg-control-panel-green/30' : 'bg-deep-sky-blue/30'} rounded-full blur-md`}></div>
            <div className={`absolute inset-0 border ${isNightMode ? 'border-control-panel-green/30' : 'border-deep-sky-blue/30'} rounded-full overflow-hidden`}>
              <img 
                src="/aerobmsce.jpg" 
                alt="AEROBMSCE Logo" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h1 className={`text-lg xs:text-xl sm:text-2xl font-orbitron font-bold tracking-wider ${isNightMode ? 'text-white' : 'text-slate-800'}`}>
            <span className={isNightMode ? "text-control-panel-green" : "text-deep-sky-blue"}>AERO</span>BMSCE
          </h1>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-1 lg:space-x-2 items-center">
          {navItems.map((item) => (
            <div key={item.id} className="relative">
              <motion.button
                className={`nav-item px-2 lg:px-3 py-1.5 text-sm lg:text-base ${
                  activeSection === item.id 
                    ? 'text-afterburner-orange' 
                    : isNightMode 
                      ? 'text-white hover:text-white/80' 
                      : 'text-slate-800 hover:text-slate-600'
                } transition-colors`}
                onClick={() => handleClick(item.id)}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 500 }}
              >
                {item.label}
              </motion.button>
              {activeSection === item.id && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-afterburner-orange"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </div>
          ))}
          
          {/* Night Mode Toggle in Navbar */}
          <div className="ml-2 scale-90">
            {setNightMode && (
              <NightModeToggle 
                nightMode={nightMode} 
                setNightMode={setNightMode} 
                navbarVersion={true} 
              />
            )}
          </div>
        </div>

        {/* Mobile Menu Button and Night Mode Toggle */}
        <div className="md:hidden flex items-center">
          {/* Night Mode Toggle in mobile */}
          {setNightMode && (
            <div className="scale-85 mr-2">
              <NightModeToggle 
                nightMode={nightMode} 
                setNightMode={setNightMode} 
                navbarVersion={true} 
              />
            </div>
          )}

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <div className="w-5 xs:w-6 h-4 xs:h-5 flex flex-col justify-between">
              <span className={`block h-0.5 w-full ${isNightMode ? 'bg-white' : 'bg-slate-800'} transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5 xs:translate-y-2' : ''}`}></span>
              <span className={`block h-0.5 w-full ${isNightMode ? 'bg-white' : 'bg-slate-800'} transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block h-0.5 w-full ${isNightMode ? 'bg-white' : 'bg-slate-800'} transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5 xs:-translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu with AnimatePresence for smooth transitions */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden ${isNightMode ? 'bg-jet-black/95' : 'bg-sky-blue/95'} backdrop-blur-md fixed top-[52px] xs:top-[60px] sm:top-[68px] left-0 right-0 bottom-0 z-40 overflow-auto`}
          >
            <div className="container mx-auto px-4 py-6 flex flex-col">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`py-3 my-1 px-4 text-left text-lg font-medium rounded-md ${
                    activeSection === item.id 
                      ? 'bg-white/10 text-afterburner-orange' 
                      : isNightMode 
                        ? 'text-white hover:bg-white/5' 
                        : 'text-slate-800 hover:bg-slate-800/5'
                  } transition-colors`}
                  onClick={() => handleClick(item.id)}
                >
                  <div className="flex items-center">
                    {item.label}
                    {activeSection === item.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-2 w-1.5 h-1.5 rounded-full bg-afterburner-orange"
                      />
                    )}
                  </div>
                </motion.button>
              ))}
              
              {/* Additional mobile navigation footer */}
              <div className="mt-6 pt-6 border-t border-white/10 text-center">
                <p className="text-sm text-titanium-gray mb-4">Connect with us</p>
                <div className="flex justify-center space-x-4">
                  {['instagram', 'twitter', 'linkedin', 'youtube'].map((social) => (
                    <a 
                      key={social}
                      href="#" 
                      className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors"
                      aria-label={`Visit our ${social}`}
                    >
                      <span className="sr-only">{social}</span>
                      <i className={`fa fa-${social}`}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

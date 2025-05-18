import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface NightModeToggleProps {
  nightMode: boolean;
  setNightMode: (nightMode: boolean) => void;
  navbarVersion?: boolean;
}

const NightModeToggle = ({ nightMode, setNightMode, navbarVersion = false }: NightModeToggleProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle mode toggle with animation state
  const handleModeToggle = () => {
    if (isAnimating) return; // Prevent multiple clicks during animation
    
    setIsAnimating(true);
    setNightMode(!nightMode);
    
    // Reset animation state after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  // Hide the toggle when scrolling down, show when scrolling up
  // Only apply this behavior when not in navbar
  useEffect(() => {
    if (navbarVersion) return; // Don't apply scroll behavior when in navbar
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= 100 || currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, navbarVersion]);

  return (
    <motion.button
      onClick={handleModeToggle}
      disabled={isAnimating}
      className={`${
        navbarVersion 
          ? 'inline-flex items-center justify-center p-1.5 rounded-full bg-black/10 backdrop-blur-sm hover:bg-black/20' 
          : 'fixed left-5 bottom-5 z-40 glass-panel p-4 rounded-full w-18 h-18 flex items-center justify-center shadow-lg'
      } ${nightMode ? 'night-toggle' : 'day-toggle'} ${isAnimating ? 'pointer-events-none' : ''}`}
      whileHover={{ scale: navbarVersion ? 1.05 : 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={navbarVersion ? { opacity: 1 } : { opacity: 0, y: 50 }}
      animate={{ 
        opacity: navbarVersion ? 1 : (isVisible ? 1 : 0.3),
        y: navbarVersion ? 0 : (isVisible ? 0 : 10),
        scale: navbarVersion ? 1 : (isVisible ? 1 : 0.8)
      }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className={`relative ${navbarVersion ? 'w-6 h-6' : 'w-8 h-8'} toggle-icon`}>
        {nightMode ? (
          <motion.div
            className="w-full h-full relative toggle-pulse"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Advanced moon icon with crater details */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className={`${navbarVersion ? 'w-6 h-6' : 'w-8 h-8'} text-control-panel-green absolute inset-0`}
            >
              {/* Moon body with glow effect */}
              <path
                className="moon-body"
                fill="currentColor"
                d="M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6C21.662 17.854 17.316 22 12.001 22 6.477 22 2 17.523 2 12c0-5.315 4.146-9.661 9.38-9.981z"
              />
              {/* Detailed craters */}
              <circle cx="10" cy="8" r="1" fill="rgba(0,0,0,0.2)" />
              <circle cx="14" cy="15" r="1.5" fill="rgba(0,0,0,0.15)" />
              <circle cx="7" cy="13" r="1.2" fill="rgba(0,0,0,0.1)" />
              <circle cx="16" cy="10" r="0.8" fill="rgba(0,0,0,0.2)" />
              <circle cx="9" cy="11" r="0.6" fill="rgba(0,0,0,0.15)" />
            </svg>
            {/* Tech circuit overlay */}
            <svg
              className="absolute inset-0 opacity-20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M4 4h2v2H4zM4 10h2v2H4zM4 16h2v2H4zM10 4h2v2h-2zM10 10h2v2h-2zM10 16h2v2h-2zM16 4h2v2h-2zM16 10h2v2h-2zM16 16h2v2h-2z" 
                stroke="currentColor" 
                strokeWidth="0.5" 
                strokeOpacity="0.6"
              />
              <path 
                d="M5 5h14M5 11h14M5 17h14M5 5v12M11 5v12M17 5v12" 
                stroke="currentColor" 
                strokeWidth="0.3" 
                strokeOpacity="0.4"
                strokeLinecap="round" 
                strokeDasharray="1 2"
              />
            </svg>
            {/* Subtle stars around moon */}
            <svg
              className="absolute inset-0"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.g
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <circle className="star-twinkle" cx="18" cy="4" r="0.5" fill="#E0F7FA" style={{ animationDelay: '0s' }}/>
                <circle className="star-twinkle" cx="20" cy="9" r="0.3" fill="#E0F7FA" style={{ animationDelay: '0.5s' }}/>
                <circle className="star-twinkle" cx="16" cy="7" r="0.2" fill="#E0F7FA" style={{ animationDelay: '1s' }}/>
                <circle className="star-twinkle" cx="19" cy="6" r="0.2" fill="#E0F7FA" style={{ animationDelay: '1.5s' }}/>
                <circle className="star-twinkle" cx="3" cy="12" r="0.2" fill="#E0F7FA" style={{ animationDelay: '0.7s' }}/>
              </motion.g>
            </svg>
          </motion.div>
        ) : (
          <motion.div
            className="w-full h-full relative toggle-pulse"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Advanced sun icon with dynamic rays */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className={`${navbarVersion ? 'w-6 h-6' : 'w-8 h-8'} text-afterburner-orange absolute inset-0`}
            >
              {/* Sun core */}
              <circle className="sun-core" cx="12" cy="12" r="5" fill="currentColor" />
              
              {/* Inner energy ring */}
              <circle cx="12" cy="12" r="3" fill="rgba(253, 112, 20, 0.7)" />
              
              <motion.g
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
                />
              </motion.g>
              
              <motion.g
                animate={{ 
                  rotate: -180,
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                  opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <path
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeDasharray="1,2"
                  d="M12 4v1m0 14v1M6.34 6.34l.7.7m9.9 9.9.7.7M4 12h1m14 0h1M6.34 17.66l.7-.7M16.95 7.05l.7-.7"
                />
              </motion.g>
            </svg>
            
            {/* Tech circuit overlay for sun */}
            <svg
              className="absolute inset-0 opacity-20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 1" />
              <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="0.3" strokeDasharray="1 1" />
              
              <path d="M12 4v16" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.6" />
              <path d="M4 12h16" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.6" />
              <path d="M6.34 6.34l11.32 11.32" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.6" />
              <path d="M17.66 6.34L6.34 17.66" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.6" />
            </svg>
            
            {/* Heat particles */}
            <svg
              className="absolute inset-0"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.g
                animate={{
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <circle className="star-twinkle" cx="14" cy="6" r="0.3" fill="#FFF9C4" style={{ animationDelay: '0.2s' }} />
                <circle className="star-twinkle" cx="16" cy="12" r="0.25" fill="#FFF9C4" style={{ animationDelay: '0.5s' }} />
                <circle className="star-twinkle" cx="14" cy="18" r="0.3" fill="#FFF9C4" style={{ animationDelay: '0.8s' }} />
                <circle className="star-twinkle" cx="8" cy="17" r="0.2" fill="#FFF9C4" style={{ animationDelay: '1.1s' }} />
                <circle className="star-twinkle" cx="6" cy="10" r="0.25" fill="#FFF9C4" style={{ animationDelay: '1.4s' }} />
                <circle className="star-twinkle" cx="10" cy="5" r="0.3" fill="#FFF9C4" style={{ animationDelay: '1.7s' }} />
              </motion.g>
            </svg>
          </motion.div>
        )}
        
        {/* Enhanced glowing effect with pulsating animation */}
        <motion.div
          className={`absolute inset-0 rounded-full ${
            nightMode ? 'bg-control-panel-green' : 'bg-afterburner-orange'
          }`}
          animate={{ 
            opacity: isAnimating ? [0.2, 0.8, 0.2] : [0.2, 0.4, 0.2],
            scale: isAnimating ? [1, 1.6, 1] : [1, 1.3, 1],
          }}
          transition={{ 
            duration: isAnimating ? 1 : 2.5, 
            repeat: isAnimating ? 0 : Infinity, 
            ease: "easeInOut" 
          }}
          style={{ filter: 'blur(8px)' }}
        />
        
        {/* Additional tech circuit pattern in the background */}
        <motion.div
          className={`absolute inset-0 rounded-full overflow-hidden ${nightMode ? 'opacity-30' : 'opacity-20'}`}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <div className="circuit-pattern w-full h-full" />
        </motion.div>
      </div>
      
      {/* Mode label with futuristic styling - only show when not in navbar */}
      {!navbarVersion && (
        <motion.div 
          className="absolute -bottom-9 flex flex-col items-center"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="mode-label flex items-center">
            <span className="mr-1 text-[0.5rem]">■</span>
            {nightMode ? 'NIGHT MODE' : 'DAY MODE'}
            <span className="ml-1 text-[0.5rem]">■</span>
          </div>
          <div className="w-full h-[1px] mt-1 bg-gradient-to-r from-transparent via-current to-transparent"></div>
        </motion.div>
      )}
    </motion.button>
  );
};

export default NightModeToggle;

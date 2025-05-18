import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AerospaceData = () => {
  const [time, setTime] = useState(new Date());
  const [altitude, setAltitude] = useState(0);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  
  useEffect(() => {
    // Update time
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    // Track scroll as "altitude" with smoother transitions
    let lastAltitude = 0;
    let animationFrameId: number;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      // Calculate scroll percentage and simulated altitude
      const percentage = (scrollY / documentHeight) * 100;
      setScrollPercentage(Math.min(percentage, 100));
      
      // Calculate target altitude
      // Ensure altitude is 0 when at the top of the page
      const targetAltitude = scrollY <= 5 
        ? 0 
        : Math.floor((scrollY / documentHeight) * 38000);
      
      // Use smooth transition for altitude
      const smoothAltitudeChange = () => {
        // If target is 0 and we're at the top, snap to 0 immediately
        if (targetAltitude === 0 && scrollY <= 5) {
          lastAltitude = 0;
          setAltitude(0);
          return;
        }
        
        // Apply smoothing using lerp (linear interpolation)
        lastAltitude = lastAltitude + (targetAltitude - lastAltitude) * 0.1;
        
        // Round to avoid endless tiny changes
        if (Math.abs(targetAltitude - lastAltitude) < 1) {
          lastAltitude = targetAltitude;
        }
        
        setAltitude(Math.floor(lastAltitude));
        
        if (Math.abs(targetAltitude - lastAltitude) > 0.1) {
          animationFrameId = requestAnimationFrame(smoothAltitudeChange);
        }
      };
      
      // Start the smooth transition
      smoothAltitudeChange();
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);
  
  // Format time as display string
  const formatTime = () => {
    return time.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };
  
  // Format altitude with leading zeros
  const formatAltitude = () => {
    return altitude.toString().padStart(5, '0');
  };
  
  return (
    <div className="fixed top-20 right-0 pointer-events-none z-30 p-4 flex flex-col items-end gap-2 transition-transform">
      {/* Time Display */}
      <motion.div 
        className="glass-panel px-3 py-1 flex items-center text-xs"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 0.9, x: 0 }}
        transition={{ delay: 0.2, duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="cockpit-label mr-2">TIME</div>
        <div className="cockpit-value">{formatTime()}</div>
      </motion.div>
      
      {/* Altitude (Scroll) Display */}
      <motion.div 
        className="glass-panel px-3 py-1 flex items-center text-xs"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 0.9, x: 0 }}
        transition={{ delay: 0.3, duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="cockpit-label mr-2">ALT</div>
        <div className="cockpit-value">{formatAltitude()}</div>
        <span className="text-titanium-gray ml-1 text-[10px]">FT</span>
      </motion.div>
      
      {/* Callsign Display */}
      <motion.div 
        className="glass-panel px-3 py-1 flex items-center text-xs"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 0.9, x: 0 }}
        transition={{ delay: 0.4, duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="cockpit-label mr-2">CALLSIGN</div>
        <div className="cockpit-value">AERO-BMSCE</div>
      </motion.div>
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="w-32 glass-panel p-1"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 0.9, x: 0 }}
        transition={{ delay: 0.5, duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="h-1 bg-titanium-gray/20 w-full rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-deep-sky-blue"
            style={{ width: `${scrollPercentage}%` }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default AerospaceData;

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TransitionOverlayProps {
  nightMode: boolean;
  isTransitioning: boolean;
}

const TransitionOverlay = ({ nightMode, isTransitioning }: TransitionOverlayProps) => {
  const [transitionClass, setTransitionClass] = useState('');
  
  useEffect(() => {
    if (isTransitioning) {
      if (nightMode) {
        // Transitioning to night mode
        setTransitionClass('day-to-night');
      } else {
        // Transitioning to day mode
        setTransitionClass('night-to-day');
      }
    }
  }, [nightMode, isTransitioning]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className={`fixed inset-0 z-40 pointer-events-none mode-transition-overlay ${transitionClass}`}
        >
          {/* Simulated stars/sun rays that appear during transition */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 5 }).map((_, index) => (
              <motion.div
                key={index}
                className={`absolute w-1 h-1 rounded-full ${nightMode ? 'bg-white' : 'bg-afterburner-orange'}`}
                initial={{ 
                  x: '50%', 
                  y: '50%', 
                  opacity: 0,
                  scale: 0
                }}
                animate={{ 
                  x: `${50 + (Math.random() * 60 - 30)}%`,
                  y: `${50 + (Math.random() * 60 - 30)}%`,
                  opacity: [0, 0.8, 0],
                  scale: [0, 1 + Math.random(), 0]
                }}
                transition={{ 
                  duration: 0.3 + Math.random() * 0.2, 
                  ease: "easeOut",
                  delay: Math.random() * 0.1
                }}
                style={{ 
                  width: `${2 + Math.random() * 3}px`,
                  height: `${2 + Math.random() * 3}px`,
                  filter: `blur(${Math.random()}px)`
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TransitionOverlay;

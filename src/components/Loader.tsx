import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Loader = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prevProgress + 4;
      });
    }, 80);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  const scanLines = Array.from({ length: 20 }).map((_, i) => (
    <div 
      key={i} 
      className="absolute inset-0 bg-transparent border-t border-deep-sky-blue/10 z-10"
      style={{ top: `${5 * i}%`, height: '1px' }}
    />
  ));

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-jet-black z-50">
      {/* Grid Overlay */}
      <div className="absolute inset-0 grid-overlay opacity-20"></div>
      
      {/* Scan Lines */}
      {scanLines}
      
      {/* Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-12"
      >
        <motion.div 
          className="flex items-center justify-center p-3 backdrop-blur-sm bg-black/30 border border-titanium-gray/20 rounded-lg relative"
          animate={{ filter: ['drop-shadow(0 0 5px rgba(0,119,182,0.3))', 'drop-shadow(0 0 20px rgba(0,119,182,0.7))', 'drop-shadow(0 0 5px rgba(0,119,182,0.3))'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.img 
            src="/aerobmsce.jpg" 
            alt="AEROBMSCE" 
            className="h-28 md:h-32 rounded-md object-contain"
            animate={{ 
              scale: [1, 1.02, 1],
              opacity: [0.95, 1, 0.95] 
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
          
          {/* HUD elements overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-deep-sky-blue/70"></div>
            <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-deep-sky-blue/70"></div>
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-deep-sky-blue/70"></div>
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-deep-sky-blue/70"></div>
            
            {/* Scan line */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-b from-transparent via-deep-sky-blue/10 to-transparent h-full w-full"
              animate={{ top: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              style={{ height: '10%' }}
            />
          </div>
        </motion.div>
        <motion.div 
          className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-1 w-40 bg-deep-sky-blue/50"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
      
      {/* Loading Progress */}
      <div className="w-64 h-2 bg-jet-black border border-titanium-gray/30 rounded-full overflow-hidden mb-4 relative">
        <motion.div
          className="h-full bg-gradient-to-r from-deep-sky-blue/70 to-deep-sky-blue"
          style={{ width: `${progress}%` }}
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
        <div className="absolute inset-0 flex">
          {Array.from({ length: 10 }).map((_, i) => (
            <div 
              key={i} 
              className="flex-1 border-r border-titanium-gray/20" 
            />
          ))}
        </div>
      </div>
      
      {/* Loading Text */}
      <div className="text-sm font-rajdhani text-titanium-gray tracking-widest flex space-x-1 items-center">
        <span>INITIALIZING</span>
        <span className="text-deep-sky-blue">SYSTEMS</span>
        <motion.span 
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="inline-block"
        >_</motion.span>
      </div>
      
      {/* System Data Text */}
      <div className="absolute bottom-5 left-5 text-xs font-rajdhani text-titanium-gray/60 text-left">
        <div>SYS.INIT: <span className="text-deep-sky-blue/70">RUNNING</span></div>
        <div>CALLSIGN: <span className="text-deep-sky-blue/70">AERO-BMSCE</span></div>
        <div>VERSION: <span className="text-deep-sky-blue/70">1.0.5</span></div>
      </div>
      
      {/* Radar Sweep Effect */}
      <div className="absolute bottom-5 right-5 w-24 h-24 rounded-full border border-titanium-gray/30 overflow-hidden">
        <div className="absolute inset-0 bg-jet-black/80"></div>
        <div className="absolute inset-0 grid-overlay opacity-30"></div>
        <motion.div 
          className="absolute left-1/2 top-1/2 w-1 h-12 bg-radar-green/70 blur-sm origin-top"
          style={{ top: '50%', left: '50%' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-radar-green/70 blur-sm"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;

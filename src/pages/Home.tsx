import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const Home = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Setup starfield animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Check if day mode is active
    const isDayMode = document.body.classList.contains('day-mode-body');
    
    // Star properties - adjust count based on screen size for performance
    const stars: { x: number; y: number; radius: number; speed: number }[] = [];
    const starCount = Math.min(Math.floor(window.innerWidth * window.innerHeight / 8000), 150);
    
    // Create stars
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        speed: Math.random() * 0.5 + 0.1
      });
    }
    
    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        
        // Different star colors for day/night mode
        if (isDayMode) {
          // Blue/white stars for day mode
          ctx.fillStyle = 'rgba(0, 119, 182, ' + (0.3 + Math.random() * 0.3) + ')';
        } else {
          // White stars for night mode
          ctx.fillStyle = 'rgba(255, 255, 255, ' + (0.5 + Math.random() * 0.5) + ')';
        }
        ctx.fill();
        
        // Move star
        star.y += star.speed;
        
        // Reset star if it goes off screen
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  // Listen for day/night mode changes to update canvas
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          // Re-init the canvas when the body class changes (mode switch)
          const canvas = canvasRef.current;
          if (canvas && canvas.getContext) {
            const ctx = canvas.getContext('2d');
            if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
          }
        }
      });
    });
    
    observer.observe(document.body, { attributes: true });
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  // Variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-16 xs:pt-18 sm:pt-20">
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 grid-overlay z-0"></div>
      
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 z-10 flex flex-col items-center">
        <motion.div 
          className="relative mb-6 sm:mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-deep-sky-blue/20 filter blur-3xl rounded-full transform scale-150"></div>
          
          {/* Main Logo */}
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-orbitron font-bold tracking-wider text-white relative">
            <motion.span 
              className="text-deep-sky-blue"
              animate={{ 
                textShadow: [
                  '0 0 5px rgba(0,119,182,0.3)',
                  '0 0 15px rgba(0,119,182,0.7)',
                  '0 0 5px rgba(0,119,182,0.3)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >AERO</motion.span>
            BMSCE
          </h1>
          
          {/* Logo underline effect */}
          <motion.div 
            className="h-1 bg-gradient-to-r from-deep-sky-blue/0 via-deep-sky-blue to-deep-sky-blue/0 mt-2"
            animate={{ 
              opacity: [0.5, 1, 0.5],
              width: ['80%', '100%', '80%']
            }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ marginLeft: 'auto', marginRight: 'auto' }}
          />
        </motion.div>
        
        {/* Tagline */}
        <motion.p 
          className="text-titanium-gray text-base xs:text-lg md:text-xl mb-6 xs:mb-7 sm:mb-8 max-w-xs xs:max-w-sm sm:max-w-md md:max-w-2xl text-center px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Pushing the boundaries of aerospace engineering through innovation, education, and passion.
        </motion.p>
        
        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col xs:flex-row space-y-3 xs:space-y-0 xs:space-x-3 sm:space-x-4 mb-12 sm:mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.a 
            href="#projects"
            className="button-primary group relative overflow-hidden text-sm xs:text-base"
            variants={itemVariants}
            whileHover="hover"
          >
            <span className="relative z-10">Explore Projects</span>
            <motion.div 
              className="absolute inset-0 bg-deep-sky-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
              whileHover={{ opacity: 0.2 }}
            />
            <motion.div 
              className="absolute bottom-0 left-0 h-1 bg-afterburner-orange" 
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
          
          <motion.a 
            href="#contact"
            className="button-secondary text-sm xs:text-base"
            variants={itemVariants}
          >
            Join Us
          </motion.a>
        </motion.div>
        
        {/* Scroll Down Indicator */}
        <motion.div
          className="absolute bottom-8 xs:bottom-10 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center z-20"
          initial={{ opacity: 0, scale: 0.7, y: 30 }}
          animate={{ 
            opacity: 1, 
            scale: [0.8, 1],
            y: [20, 0] 
          }}
          transition={{
            delay: 1.2,
            duration: 1.1,
            type: 'spring',
            bounce: 0.5
          }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
          >
            <span className="text-titanium-gray text-[10px] xs:text-xs font-orbitron tracking-widest mb-1 drop-shadow-lg">SCROLL DOWN</span>
            <svg
              className="w-6 h-6 xs:w-7 xs:h-7 text-deep-sky-blue drop-shadow-lg mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative Elements - made responsive and hidden on very small screens */}
      <div className="hidden xs:block absolute left-4 xs:left-6 sm:left-10 top-1/3 w-24 xs:w-32 sm:w-40 h-24 xs:h-32 sm:h-40 pointer-events-none">
        <motion.div 
          className="absolute inset-0 border border-titanium-gray/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1.5 xs:w-2 h-1.5 xs:h-2 bg-deep-sky-blue rounded-full"></div>
        </motion.div>
        <motion.div 
          className="absolute inset-5 border border-titanium-gray/10 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      <div className="hidden xs:block absolute right-4 xs:right-6 sm:right-10 bottom-1/3 w-36 xs:w-48 sm:w-64 h-36 xs:h-48 sm:h-64 pointer-events-none">
        <motion.div 
          className="absolute inset-0 border border-dashed border-titanium-gray/10 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute inset-8 border border-titanium-gray/10 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-afterburner-orange rounded-full"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'
import './assets/css/gridPattern.css'
import './assets/css/dayMode.css'
import './assets/css/transitions.css'
import './assets/css/teamCards.css'
import './assets/css/enhancedTeamCards.css'
import './assets/css/enhancedTeamResponsive.css'
import './assets/css/toggleStyles.css'
import './assets/css/responsive.css'

// Pages
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Events from './pages/Events'
import Projects from './pages/Projects'
import Team from './pages/Team'
import Contact from './pages/Contact'
import Footer from './components/Footer'
import Loader from './components/Loader'
import NightModeToggle from './components/NightModeToggle'
import AerospaceData from './components/AerospaceData'
import TransitionOverlay from './components/TransitionOverlay'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [nightMode, setNightMode] = useState(true)
  const [section, setSection] = useState('home')
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  useEffect(() => {
    // Simulating loading time
    setTimeout(() => {
      setIsLoading(false)
    }, 2500)
    
    // Apply night mode to body on initial load
    document.body.classList.add('night-mode-body')
  }, [])

  // Track scroll position and update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      // Get all section elements
      const sections = document.querySelectorAll('section[id]');
      
      // Find the section currently in view
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setSection(sectionId);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount to set initial active section
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Effect to update the document body class when night mode changes
  useEffect(() => {
    // Set transitioning state to true to show the overlay
    setIsTransitioning(true);
    
    if (nightMode) {
      document.body.classList.add('night-mode-body');
      // Small delay before removing day mode to create a more fluid transition
      setTimeout(() => {
        document.body.classList.remove('day-mode-body');
        // Set transitioning state to false after a shorter delay
        setTimeout(() => setIsTransitioning(false), 300);
      }, 20);
    } else {
      document.body.classList.add('day-mode-body');
      // Small delay before removing night mode to create a more fluid transition
      setTimeout(() => {
        document.body.classList.remove('night-mode-body');
        // Set transitioning state to false after a shorter delay
        setTimeout(() => setIsTransitioning(false), 300);
      }, 20);
    }
  }, [nightMode]);

  return (
    <div className={`reticle-cursor min-h-screen bg-grid-pattern ${nightMode ? 'night-mode' : 'day-mode'} ${isTransitioning ? 'mode-flash' : ''}`}>
      {/* Grid overlay for futuristic UI - Visible in both modes but styled differently */}
      <div className="grid-overlay fixed inset-0 pointer-events-none z-0"></div>
      
      {/* Transition overlay */}
      <TransitionOverlay nightMode={nightMode} isTransitioning={isTransitioning} />
      
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50"
          >
            <Loader />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <AerospaceData />
            <Navbar activeSection={section} setActiveSection={setSection} nightMode={nightMode} setNightMode={setNightMode} />
            
            <main>
              <section id="home" className={`section-transition ${section === 'home' ? 'active' : ''}`}>
                <Home />
              </section>
              
              <section id="about" className={`section-transition ${section === 'about' ? 'active' : ''}`}>
                <About />
              </section>
              
              <section id="events" className={`section-transition ${section === 'events' ? 'active' : ''}`}>
                <Events />
              </section>
              
              <section id="projects" className={`section-transition ${section === 'projects' ? 'active' : ''}`}>
                <Projects />
              </section>
              
              <section id="team" className={`section-transition ${section === 'team' ? 'active' : ''}`}>
                <Team />
              </section>
              
              <section id="contact" className={`section-transition ${section === 'contact' ? 'active' : ''}`}>
                <Contact />
              </section>
            </main>
            
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App

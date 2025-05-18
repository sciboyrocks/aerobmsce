import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  status: 'Completed' | 'Ongoing' | 'Concept';
  team: string[];
  details: {
    objective: string;
    technologies: string[];
    achievements?: string[];
    challenges?: string[];
  };
}

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [rotateY, setRotateY] = useState(0);
  const projectDetailsRef = useRef<HTMLDivElement>(null);
  
  // Sample projects data
  const projects: Project[] = [
    {
      id: 1,
      title: "Stratosphere Explorer Drone",
      description: "High-altitude unmanned aerial vehicle designed for atmospheric research and data collection at stratospheric heights.",
      image: "https://images.unsplash.com/photo-1508614999368-9260051292e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "UAV",
      status: "Completed",
      team: ["Avionics Team", "Propulsion Team", "Structures Team"],
      details: {
        objective: "Design and build a lightweight drone capable of reaching altitudes of 20+ kilometers while collecting atmospheric data and maintaining stable communication with ground control.",
        technologies: ["Carbon fiber composites", "Lithium-polymer batteries", "Solar panels", "Custom flight controller", "Environmental sensors"],
        achievements: [
          "Reached altitude of 22.5 km in test flight",
          "Published research paper on high-altitude wind patterns",
          "Runner-up in National Aerospace Design Competition"
        ]
      }
    },
    {
      id: 2,
      title: "Supersonic Wind Tunnel",
      description: "Small-scale supersonic wind tunnel for testing aerodynamic profiles at speeds exceeding Mach 1.2.",
      image: "https://images.unsplash.com/photo-1527066579998-dbbae57f45ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Research",
      status: "Completed",
      team: ["Fluid Dynamics Team", "Instrumentation Team"],
      details: {
        objective: "Build a functioning supersonic wind tunnel for aerodynamic research that is accessible to undergraduate students for learning and experimentation.",
        technologies: ["Convergent-divergent nozzle", "High-pressure air system", "Schlieren photography", "Digital pressure sensors", "Force balance systems"],
        achievements: [
          "Successfully visualized shock waves around various profiles",
          "Integrated with computational fluid dynamics simulation software",
          "Used in 3 undergraduate research projects"
        ]
      }
    },
    {
      id: 3,
      title: "Mars Habitat Prototype",
      description: "Scale model of a self-sustaining Mars habitat with functional life support and radiation shielding systems.",
      image: "https://images.unsplash.com/photo-1451187863213-d1bcbaae3fa3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Space",
      status: "Ongoing",
      team: ["Habitat Design Team", "Life Support Systems Team", "Structures Team"],
      details: {
        objective: "Design a viable habitat for Mars colonization that addresses challenges of radiation, resource recycling, and psychological well-being of inhabitants.",
        technologies: ["Regolith-based construction", "Water recycling systems", "Artificial lighting for plant growth", "Radiation shielding materials", "3D printing"],
        challenges: [
          "Balancing weight constraints with radiation shielding requirements",
          "Developing closed-loop life support systems",
          "Creating psychologically supportive living spaces"
        ]
      }
    },
    {
      id: 4,
      title: "Hybrid Rocket Engine",
      description: "Student-designed hybrid rocket engine using solid fuel and liquid oxidizer for safer, controllable thrust.",
      image: "https://images.unsplash.com/photo-1567416661576-659fa442dd39?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Propulsion",
      status: "Ongoing",
      team: ["Propulsion Team", "Controls Team"],
      details: {
        objective: "Develop a safe, throttleable hybrid rocket engine that can be used for educational purposes and potentially small launch vehicles.",
        technologies: ["HTPB solid fuel", "Liquid nitrous oxide", "Graphite nozzle", "Electronic throttle control", "Thrust measurement system"],
        challenges: [
          "Achieving consistent combustion efficiency",
          "Developing reliable ignition system",
          "Thermal management of combustion chamber"
        ]
      }
    },
    {
      id: 5,
      title: "CubeSat Mission Planner",
      description: "Software suite for planning and simulating CubeSat missions, including orbit calculations and power management.",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Software",
      status: "Completed",
      team: ["Software Development Team", "Orbital Mechanics Team"],
      details: {
        objective: "Create an open-source software tool that helps students and researchers plan viable CubeSat missions with realistic constraints and parameters.",
        technologies: ["Python", "Orbital mechanics simulation", "Power system modeling", "Communication link budgeting", "3D visualization"],
        achievements: [
          "Successfully modeled the orbit of an actual educational CubeSat",
          "Published as open-source software with 500+ downloads",
          "Used by 3 universities for their CubeSat projects"
        ]
      }
    },
    {
      id: 6,
      title: "Vertical Takeoff Aircraft",
      description: "Concept design for an electric vertical takeoff and landing (eVTOL) aircraft for urban air mobility.",
      image: "https://images.unsplash.com/photo-1534551767192-78b8dd45b51b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Aircraft",
      status: "Concept",
      team: ["Aircraft Design Team", "Electric Propulsion Team"],
      details: {
        objective: "Design a feasible electric VTOL aircraft concept for urban air mobility that addresses challenges of noise, safety, range, and efficiency.",
        technologies: ["Distributed electric propulsion", "Tilt-rotor design", "Composite structures", "Flight stability augmentation", "Battery technology"],
        challenges: [
          "Balancing VTOL capabilities with forward flight efficiency",
          "Addressing battery energy density limitations",
          "Developing noise reduction strategies"
        ]
      }
    }
  ];
  
  // Get all unique categories
  const categories = ['all', ...Array.from(new Set(projects.map(project => project.category)))];
  
  // Filter projects based on activeCategory
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);
  
  // Handle mouse move on project card for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!projectDetailsRef.current) return;
    
    const card = projectDetailsRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const centerX = rect.width / 2;
    
    // Calculate rotation based on mouse position (max 10 degrees)
    const newRotateY = ((x - centerX) / centerX) * 8;
    setRotateY(newRotateY);
  };
  
  // Reset rotation when mouse leaves
  const handleMouseLeave = () => {
    setRotateY(0);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <div className="min-h-screen pt-16 sm:pt-20 md:pt-24 pb-12 md:pb-16 relative overflow-x-hidden">
      <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none"></div>
      
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <motion.div 
            className="mb-8 sm:mb-10 md:mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-orbitron font-bold mb-4 sm:mb-6 relative inline-block">
              <span>Flight <span className="text-deep-sky-blue">Projects</span></span>
              <motion.div 
                className="absolute -bottom-2 left-0 h-1 bg-deep-sky-blue"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </h2>
            <p className="text-titanium-gray text-base sm:text-lg">Innovative aerospace initiatives in our hangar</p>
          </motion.div>
          
          {/* Filter Categories */}
          <motion.div 
            className="flex flex-wrap justify-center gap-1.5 xs:gap-2 sm:gap-3 mb-6 sm:mb-8 md:mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {categories.map((category) => (
              <button
                key={category}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition-all duration-300 ${
                  activeCategory === category 
                    ? 'bg-deep-sky-blue text-white' 
                    : 'bg-titanium-gray/20 text-titanium-gray hover:bg-titanium-gray/30 hover:text-white'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category === 'all' ? 'All Projects' : category}
              </button>
            ))}
          </motion.div>
          
          {/* Projects Grid */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={activeCategory} // Add key to force re-render when category changes
          >
            {filteredProjects.map((project) => (
              <motion.div 
                key={project.id}
                className="glass-panel rounded-lg overflow-hidden group cursor-pointer h-full flex flex-col perspective-card"
                variants={itemVariants}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                onClick={() => setActiveProject(project)}
              >
                {/* Project Image with Enhanced Visual Elements */}
                <div className="h-40 xs:h-44 sm:h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-jet-black to-transparent z-10 opacity-60"></div>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Decorative Corner Element */}
                  <div className="absolute top-0 left-0 w-12 h-12 z-10 pointer-events-none">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-deep-sky-blue/30">
                      <path d="M0 0 L100 0 L0 100 Z" fill="currentColor" />
                    </svg>
                  </div>
                  
                  {/* Project Status Badge */}
                  <div className={`absolute top-2 sm:top-3 right-2 sm:right-3 px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-medium rounded-full z-20 ${
                    project.status === 'Completed' 
                      ? 'bg-control-panel-green/80 text-white' 
                      : project.status === 'Ongoing'
                        ? 'bg-deep-sky-blue/80 text-white'
                        : 'bg-afterburner-orange/80 text-white'
                  }`}>
                    {project.status}
                  </div>
                  
                  {/* Project Category */}
                  <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 z-20">
                    <div className="bg-jet-black/70 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded text-xs text-white">
                      {project.category}
                    </div>
                  </div>
                </div>
                
                {/* Project Details */}
                <div className="p-3 xs:p-4 sm:p-5 flex-1 flex flex-col">
                  <h3 className="font-orbitron text-base xs:text-lg mb-2 group-hover:text-deep-sky-blue transition-colors duration-300 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-titanium-gray text-xs xs:text-sm mb-3 xs:mb-4 flex-grow line-clamp-3">
                    {project.description}
                  </p>
                  
                  {/* Teams Involved */}
                  <div className="mt-auto">
                    <h4 className="text-xs uppercase text-titanium-gray mb-1 xs:mb-2">Teams Involved</h4>
                    <div className="flex flex-wrap gap-1 xs:gap-2">
                      {project.team.slice(0, 2).map((team) => (
                        <span 
                          key={team} 
                          className="text-[10px] xs:text-xs px-1.5 xs:px-2 py-0.5 xs:py-1 bg-titanium-gray/10 text-titanium-gray rounded"
                        >
                          {team}
                        </span>
                      ))}
                      {project.team.length > 2 && (
                        <span className="text-[10px] xs:text-xs px-1.5 xs:px-2 py-0.5 xs:py-1 bg-titanium-gray/10 text-titanium-gray rounded">
                          +{project.team.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* View Details Indicator */}
                <div className="absolute bottom-3 right-3 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-deep-sky-blue/0 flex items-center justify-center transition-all duration-300 group-hover:bg-deep-sky-blue/20">
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-deep-sky-blue transform transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Project Detail Modal */}
      {activeProject && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 xs:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-jet-black/80 backdrop-blur-sm"
            onClick={() => setActiveProject(null)}
          ></div>
          
          {/* Modal Content */}
          <motion.div 
            className="w-full max-w-4xl relative z-10 perspective max-h-[90vh] overflow-auto"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* 3D Card Effect */}
            <div 
              ref={projectDetailsRef}
              className="glass-panel rounded-lg overflow-hidden"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `rotateY(${rotateY}deg)`,
                transition: 'transform 0.1s ease-out'
              }}
            >
              {/* Close Button */}
              <button 
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-jet-black/50 flex items-center justify-center text-white hover:bg-deep-sky-blue/20 transition-colors duration-300"
                onClick={() => setActiveProject(null)}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="flex flex-col md:flex-row">
                {/* Left Column - Image */}
                <div className="md:w-1/2 relative h-48 sm:h-56 md:h-auto">
                  <div className="absolute inset-0 blueprint-grid opacity-20 z-10"></div>
                  <img 
                    src={activeProject.image} 
                    alt={activeProject.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r md:from-transparent md:to-jet-black from-jet-black/20 to-jet-black/20 opacity-40"></div>
                  
                  {/* Project Status */}
                  <div className={`absolute top-3 sm:top-4 left-3 sm:left-4 px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-medium rounded-full z-20 ${
                    activeProject.status === 'Completed' 
                      ? 'bg-control-panel-green/80 text-white' 
                      : activeProject.status === 'Ongoing'
                        ? 'bg-deep-sky-blue/80 text-white'
                        : 'bg-afterburner-orange/80 text-white'
                  }`}>
                    {activeProject.status}
                  </div>
                  
                  {/* Category */}
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 z-20">
                    <div className="bg-jet-black/70 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded text-xs text-white">
                      {activeProject.category}
                    </div>
                  </div>
                </div>
                
                {/* Right Column - Details */}
                <div className="md:w-1/2 p-4 sm:p-5 md:p-6 lg:p-8">
                  <h3 className="font-orbitron text-xl sm:text-2xl mb-3 sm:mb-4 text-white">
                    {activeProject.title}
                  </h3>
                  <p className="text-titanium-gray text-sm sm:text-base mb-4 sm:mb-6">
                    {activeProject.description}
                  </p>
                  
                  {/* Objective */}
                  <div className="mb-4 sm:mb-6">
                    <h4 className="text-xs sm:text-sm uppercase font-orbitron text-deep-sky-blue mb-1 sm:mb-2">Mission Objective</h4>
                    <p className="text-white/90 text-xs sm:text-sm">{activeProject.details.objective}</p>
                  </div>
                  
                  {/* Technologies */}
                  <div className="mb-4 sm:mb-6">
                    <h4 className="text-xs sm:text-sm uppercase font-orbitron text-deep-sky-blue mb-1 sm:mb-2">Technologies</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
                      {activeProject.details.technologies.map((tech) => (
                        <li key={tech} className="text-white/90 text-xs sm:text-sm flex items-start">
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-deep-sky-blue mr-1.5 sm:mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                          </svg>
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Achievements or Challenges */}
                  <div className="mb-4 sm:mb-6">
                    <h4 className="text-xs sm:text-sm uppercase font-orbitron text-deep-sky-blue mb-1 sm:mb-2">
                      {activeProject.details.achievements ? 'Achievements' : 'Challenges'}
                    </h4>
                    <ul className="space-y-1 sm:space-y-2">
                      {(activeProject.details.achievements || activeProject.details.challenges || []).map((item) => (
                        <li key={item} className="text-white/90 text-xs sm:text-sm flex items-start">
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-afterburner-orange mr-1.5 sm:mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {activeProject.details.achievements ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            )}
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Team */}
                  <div>
                    <h4 className="text-xs sm:text-sm uppercase font-orbitron text-deep-sky-blue mb-1 sm:mb-2">Team</h4>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {activeProject.team.map((team) => (
                        <span 
                          key={team} 
                          className="text-[10px] xs:text-xs px-2 sm:px-3 py-1 sm:py-1.5 bg-titanium-gray/10 text-titanium-gray rounded-full"
                        >
                          {team}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Projects;

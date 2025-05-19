import { motion } from 'framer-motion';
import { useState } from 'react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
  image: string;
  bio: string;
  expertise: string[];
  social: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

const Team = () => {
  const [activeDepartment, setActiveDepartment] = useState<string>('all');
  const [activeMember, setActiveMember] = useState<TeamMember | null>(null);
  
  // Team members data with placeholders
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Faculty Advisor",
      role: "Faculty Advisor",
      department: "Faculty",
      image: "https://placehold.co/200x200?text=Faculty+Advisor",
      bio: "Our faculty advisor provides guidance and mentorship to all teams within AeroBMSCE, bringing years of experience in aerospace engineering.",
      expertise: ["Aerospace Engineering", "Research", "Mentorship"],
      social: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 2,
      name: "Club President",
      role: "President",
      department: "Leadership",
      image: "https://placehold.co/200x200?text=President",
      bio: "The club president leads AeroBMSCE with a passion for innovation and collaboration, bringing expertise in aerospace technologies.",
      expertise: ["Leadership", "Project Management", "Aerospace Design"],
      social: {
        linkedin: "#",
        github: "#",
        twitter: "#"
      }
    },
    {
      id: 3,
      name: "Vice President",
      role: "Vice President",
      department: "Leadership",
      image: "https://placehold.co/200x200?text=Vice+President",
      bio: "Our vice president focuses on strategic partnerships and technical direction for the club, with expertise in advanced aerospace materials.",
      expertise: ["Strategic Planning", "Materials Science", "Team Coordination"],
      social: {
        linkedin: "#",
        github: "#"
      }
    },
    {
      id: 4,
      name: "Avionics Lead",
      role: "Avionics Team Lead",
      department: "Technical",
      image: "https://placehold.co/200x200?text=Avionics+Lead",
      bio: "The avionics lead oversees the development of custom electronics and flight control systems for AeroBMSCE projects.",
      expertise: ["Flight Controls", "Embedded Systems", "Electronics Design"],
      social: {
        linkedin: "#",
        github: "#"
      }
    },
    {
      id: 5,
      name: "Structures Lead",
      role: "Structures Team Lead",
      department: "Technical",
      image: "https://placehold.co/200x200?text=Structures+Lead",
      bio: "Our structures lead oversees the design and fabrication of aerospace structures, focusing on lightweight and high-strength designs.",
      expertise: ["Structural Analysis", "CAD/CAM", "Composite Materials"],
      social: {
        linkedin: "#",
        github: "#"
      }
    },
    {
      id: 6,
      name: "Propulsion Lead",
      role: "Propulsion Team Lead",
      department: "Technical",
      image: "https://placehold.co/200x200?text=Propulsion+Lead",
      bio: "The propulsion lead develops systems for our rockets and UAVs, applying expertise in fluid dynamics and thermodynamics.",
      expertise: ["Propulsion Systems", "Fluid Dynamics", "Thermodynamics"],
      social: {
        linkedin: "#",
        github: "#",
        twitter: "#"
      }
    },
    {
      id: 7,
      name: "Software Lead",
      role: "Software Team Lead",
      department: "Technical",
      image: "https://placehold.co/200x200?text=Software+Lead",
      bio: "Our software lead heads the development of flight software, simulation tools, and data analysis platforms for the team.",
      expertise: ["Flight Software", "Simulation", "Data Analysis"],
      social: {
        linkedin: "#",
        github: "#"
      }
    },
    {
      id: 8,
      name: "Events Coordinator",
      role: "Events Coordinator",
      department: "Operations",
      image: "https://placehold.co/200x200?text=Events+Coordinator",
      bio: "The events coordinator organizes workshops, competitions, and industry visits for AeroBMSCE, ensuring smooth execution of all club events.",
      expertise: ["Event Planning", "Public Relations", "Networking"],
      social: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 9,
      name: "Treasurer",
      role: "Treasurer",
      department: "Operations",
      image: "https://placehold.co/200x200?text=Treasurer",
      bio: "Our treasurer manages finances, budgeting, and procurement for all AeroBMSCE projects, combining engineering and financial expertise.",
      expertise: ["Budgeting", "Resource Allocation", "Procurement"],
      social: {
        linkedin: "#"
      }
    }
  ];
  
  // Get all unique departments
  const departments = ['all', ...Array.from(new Set(teamMembers.map(member => member.department)))];
  
  // Filter team members based on activeDepartment
  const filteredMembers = activeDepartment === 'all' 
    ? teamMembers 
    : teamMembers.filter(member => member.department === activeDepartment);
  
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
    <div className="min-h-screen pt-24 pb-16 relative">
      <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <motion.div 
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-6 relative inline-block">
              <span>Mission <span className="text-deep-sky-blue">Team</span></span>
              <motion.div 
                className="absolute -bottom-2 left-0 h-1 bg-deep-sky-blue"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </h2>
            <p className="text-titanium-gray text-lg">The brilliant minds behind our aerospace adventures</p>
          </motion.div>
          
          {/* Department Filters */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {departments.map((department) => (
              <button
                key={department}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  activeDepartment === department 
                    ? 'bg-deep-sky-blue text-white' 
                    : 'bg-titanium-gray/20 text-titanium-gray hover:bg-titanium-gray/30 hover:text-white'
                }`}
                onClick={() => setActiveDepartment(department)}
              >
                {department === 'all' ? 'All Teams' : department}
              </button>
            ))}
          </motion.div>
          
          {/* Team Grid */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={activeDepartment} // Add key to force re-render when department changes
          >
            {filteredMembers.map((member) => (
              <motion.div 
                key={member.id}
                className="glass-panel overflow-hidden group cursor-pointer relative perspective-card team-card-holo team-card-border"
                variants={itemVariants}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                onClick={() => setActiveMember(member)}
              >
                {/* Circuit pattern background */}
                <div className="circuit-pattern"></div>
                
                {/* Tech indicators */}
                <div className="tech-indicator top-right"></div>
                <div className="tech-indicator bottom-left"></div>
                
                {/* Hexagonal Clip and Border Effect */}
                <div className="absolute inset-0 hexagon-border opacity-40 pointer-events-none hexagon-border-animated"></div>
                
                {/* Radar animation effect */}
                <div className="radar-sweep"></div>
                
                {/* Member Image with Stylized Design */}
                <div className="relative">
                  {/* Decorative Top Corner */}
                  <div className="absolute top-0 right-0 w-16 h-16 z-10 corner-top-right">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-deep-sky-blue/30">
                      <path d="M0 0 L100 0 L100 100 Z" fill="currentColor" />
                    </svg>
                  </div>
                  
                  {/* Decorative Bottom Corner */}
                  <div className="absolute bottom-0 left-0 w-16 h-16 z-10 rotate-180 corner-bottom-left">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-deep-sky-blue/30">
                      <path d="M0 0 L100 0 L100 100 Z" fill="currentColor" />
                    </svg>
                  </div>
                  
                  {/* Circular Image Container with Gradient Border */}
                  <div className="md:flex md:items-center p-4 relative">
                    <div className="mx-auto md:mx-0 md:mr-4 mb-4 md:mb-0 w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden relative shadow-lg border-2 border-deep-sky-blue/30 transform transition-transform duration-500 group-hover:scale-105 group-hover:border-deep-sky-blue profile-image-tech image-reflection">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                      
                      {/* Circular Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-radial from-transparent to-jet-black/70 opacity-60"></div>
                      
                      {/* Scan Line Animation Effect */}
                      <div className="absolute inset-0 scan-line-effect"></div>
                    </div>
                    
                    {/* Text Information with Animated Border */}
                    <div className="flex-1 text-center md:text-left relative px-4 md:pr-2 py-2">
                      {/* Department Badge */}
                      <div className="inline-block md:absolute md:top-0 md:right-0 px-3 py-1 text-xs font-medium rounded-full bg-deep-sky-blue/20 text-white backdrop-blur-sm border border-deep-sky-blue/30 mb-3 md:mb-0 role-badge">
                        {member.department}
                      </div>
                      
                      <h3 className="font-orbitron text-lg sm:text-xl text-white group-hover:text-deep-sky-blue transition-colors duration-300 mt-1 md:mt-0">
                        {member.name}
                      </h3>
                      
                      <p className="text-titanium-gray text-sm sm:text-base mb-3">{member.role}</p>
                      
                      {/* Expertise Tags with progress rings */}
                      <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                        {member.expertise.slice(0, 2).map((skill, index) => (
                          <span 
                            key={index} 
                            className="text-xs px-2 py-1 bg-titanium-gray/10 text-titanium-gray rounded-full border border-titanium-gray/20 flex items-center"
                          >
                            <div className="expertise-ring mr-1" style={{"--expertise-percentage": `${75 + index * 10}%`} as React.CSSProperties}></div>
                            {skill}
                          </span>
                        ))}
                        {member.expertise.length > 2 && (
                          <span className="text-xs px-2 py-1 bg-titanium-gray/10 text-titanium-gray rounded-full border border-titanium-gray/20">
                            +{member.expertise.length - 2} more
                          </span>
                        )}
                      </div>
                      
                      {/* Social Links */}
                      <div className="flex space-x-2 justify-center md:justify-start">
                        {member.social.linkedin && (
                          <a 
                            href={member.social.linkedin}
                            className="w-8 h-8 rounded-full bg-jet-black/50 backdrop-blur-sm flex items-center justify-center text-titanium-gray hover:text-deep-sky-blue hover:bg-deep-sky-blue/10 transition-all duration-300 border border-transparent hover:border-deep-sky-blue/30"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="sr-only">LinkedIn</span>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                          </a>
                        )}
                        {member.social.github && (
                          <a 
                            href={member.social.github}
                            className="w-8 h-8 rounded-full bg-jet-black/50 backdrop-blur-sm flex items-center justify-center text-titanium-gray hover:text-deep-sky-blue hover:bg-deep-sky-blue/10 transition-all duration-300 border border-transparent hover:border-deep-sky-blue/30"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="sr-only">GitHub</span>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          </a>
                        )}
                        {member.social.twitter && (
                          <a 
                            href={member.social.twitter}
                            className="w-8 h-8 rounded-full bg-jet-black/50 backdrop-blur-sm flex items-center justify-center text-titanium-gray hover:text-deep-sky-blue hover:bg-deep-sky-blue/10 transition-all duration-300 border border-transparent hover:border-deep-sky-blue/30"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="sr-only">Twitter</span>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom Decoration */}
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-deep-sky-blue rounded-full shadow-glow"></div>
                    <div className="flex-1 h-1 bg-gradient-to-r from-deep-sky-blue/70 to-transparent"></div>
                    <div className="w-full max-w-[40%] h-1 bg-gradient-to-r from-transparent via-deep-sky-blue/30 to-transparent"></div>
                    <div className="flex-1 h-1 bg-gradient-to-l from-deep-sky-blue/70 to-transparent"></div>
                    <div className="w-2 h-2 bg-deep-sky-blue rounded-full shadow-glow"></div>
                  </div>
                </div>
                
                {/* Click Indicator */}
                <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-deep-sky-blue/0 flex items-center justify-center transition-all duration-300 group-hover:bg-deep-sky-blue/20">
                  <svg className="w-4 h-4 text-deep-sky-blue transform transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Join Us CTA */}
          <motion.div 
            className="text-center glass-panel py-8 px-4 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-2xl font-orbitron font-bold mb-4">Join Our Crew</h3>
            <p className="text-titanium-gray max-w-2xl mx-auto mb-6">
              We're always looking for passionate students to join our aerospace adventure. Whether you're interested in structures, propulsion, avionics, or operations, there's a place for you on our team.
            </p>
            <a href="#contact" className="button-primary">
              Apply Now
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* Team Member Detail Modal */}
      {activeMember && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 xs:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-jet-black/80 backdrop-blur-sm"
            onClick={() => setActiveMember(null)}
          ></div>
          
          {/* Modal Content */}
          <motion.div 
            className="glass-panel rounded-lg overflow-hidden w-full max-w-2xl relative z-10 max-h-[90vh] overflow-auto team-card-holo"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Circuit pattern background */}
            <div className="circuit-pattern"></div>
            
            {/* Tech indicators */}
            <div className="tech-indicator top-right"></div>
            <div className="tech-indicator bottom-left"></div>
            
            {/* Hexagonal Border Effect */}
            <div className="absolute inset-0 hexagon-border-animated opacity-40 pointer-events-none"></div>
            
            {/* Close Button */}
            <button 
              className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-jet-black/50 flex items-center justify-center text-white hover:bg-deep-sky-blue/20 transition-colors duration-300"
              onClick={() => setActiveMember(null)}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="flex flex-col md:flex-row">
              {/* Left: Image */}
              <div className="md:w-2/5 relative">
                <div className="h-56 sm:h-64 md:h-full overflow-hidden profile-image-tech image-reflection">
                  <img 
                    src={activeMember.image} 
                    alt={activeMember.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-jet-black via-transparent to-transparent opacity-80"></div>
                </div>
                
                {/* Member Details Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-3 sm:p-4">
                  <div className="flex flex-col">
                    <div className="text-xs text-titanium-gray uppercase tracking-wider mb-1 role-badge inline-block">
                      {activeMember.department}
                    </div>
                    <h3 className="font-orbitron text-lg sm:text-xl text-white mb-1">
                      {activeMember.name}
                    </h3>
                    <p className="text-deep-sky-blue text-sm">{activeMember.role}</p>
                  </div>
                </div>
                
                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-16 h-16 z-10 pointer-events-none corner-top-right">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-deep-sky-blue/30">
                    <path d="M100 0 L100 100 L0 0 Z" fill="currentColor" />
                  </svg>
                </div>
              </div>
              
              {/* Right: Details */}
              <div className="md:w-3/5 p-4 sm:p-5 md:p-6">
                {/* Bio */}
                <div className="mb-4 sm:mb-6">
                  <h4 className="text-xs sm:text-sm uppercase font-orbitron text-deep-sky-blue mb-1 sm:mb-2">Bio</h4>
                  <p className="text-white/90 text-sm">{activeMember.bio}</p>
                </div>
                
                {/* Expertise */}
                <div className="mb-4 sm:mb-6">
                  <h4 className="text-xs sm:text-sm uppercase font-orbitron text-deep-sky-blue mb-1 sm:mb-2">Areas of Expertise</h4>
                  <ul className="space-y-1">
                    {activeMember.expertise.map((skill, index) => (
                      <li key={skill} className="text-white/90 flex items-start text-xs sm:text-sm">
                        <div className="expertise-ring mr-1" style={{"--expertise-percentage": `${75 + (index * 5)}%`} as React.CSSProperties}></div>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Social Links */}
                <div>
                  <h4 className="text-xs sm:text-sm uppercase font-orbitron text-deep-sky-blue mb-1 sm:mb-2">Connect</h4>
                  <div className="flex space-x-2 sm:space-x-3">
                    {activeMember.social.linkedin && (
                      <a 
                        href={activeMember.social.linkedin}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-jet-black border border-titanium-gray/30 flex items-center justify-center text-titanium-gray hover:text-deep-sky-blue hover:border-deep-sky-blue transition-colors duration-300"
                      >
                        <span className="sr-only">LinkedIn</span>
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    )}
                    {activeMember.social.github && (
                      <a 
                        href={activeMember.social.github}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-jet-black border border-titanium-gray/30 flex items-center justify-center text-titanium-gray hover:text-deep-sky-blue hover:border-deep-sky-blue transition-colors duration-300"
                      >
                        <span className="sr-only">GitHub</span>
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                    {activeMember.social.twitter && (
                      <a 
                        href={activeMember.social.twitter}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-jet-black border border-titanium-gray/30 flex items-center justify-center text-titanium-gray hover:text-deep-sky-blue hover:border-deep-sky-blue transition-colors duration-300"
                      >
                        <span className="sr-only">Twitter</span>
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                      </a>
                    )}
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

export default Team;

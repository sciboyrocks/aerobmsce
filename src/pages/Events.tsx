// filepath: /Users/samrudhraikote/untitled folder/src/pages/Events.tsx
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import React, { useState, useRef, useEffect } from 'react';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  category: 'upcoming' | 'past';
  tags: string[];
}

const Events = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);
  const [isChangingFilter, setIsChangingFilter] = useState(false);
  // Reference to the expanded card element
  const expandedCardRef = useRef<HTMLDivElement>(null);
  
  // Sample events data
  const events: Event[] = [
    {
      id: 1,
      title: "AeroTech Summit 2025",
      date: "June 15, 2025",
      location: "BMSCE Main Auditorium",
      description: "Join us for a day of inspiring talks, workshops, and demonstrations focused on the latest trends in aerospace technology. Industry experts will share insights on electric propulsion, sustainable aviation, and space exploration.",
      image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: 'upcoming',
      tags: ['Conference', 'Workshop']
    },
    {
      id: 2,
      title: "Drone Design Competition",
      date: "July 8-10, 2025",
      location: "BMSCE Innovation Lab",
      description: "Put your design skills to the test in this three-day competition. Teams will prototype, build, and test autonomous drones designed for urban delivery systems. Prizes for most innovative design, best performance, and sustainability.",
      image: "https://images.unsplash.com/photo-1506947411487-a56738267384?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: 'upcoming',
      tags: ['Competition', 'Design']
    },
    {
      id: 3,
      title: "Aerospace Industry Mixer",
      date: "May 5, 2025",
      location: "Virtual Event",
      description: "Network with professionals from leading aerospace companies. This virtual event will feature breakout rooms, Q&A sessions, and opportunities to learn about internships and job openings in the industry.",
      image: "https://images.unsplash.com/photo-1513193171507-66cf9535bce3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: 'upcoming',
      tags: ['Networking', 'Industry']
    },
    {
      id: 4,
      title: "Rocket Propulsion Workshop",
      date: "March 12, 2025",
      location: "Engineering Block, Room 305",
      description: "Gained hands-on experience with different rocket propulsion systems. Participants built and tested small-scale solid fuel rockets and learned about the principles of thrust, efficiency, and safety in rocket design.",
      image: "https://images.unsplash.com/photo-1518364538800-6bae3c2ea0f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: 'past',
      tags: ['Workshop', 'Technical']
    },
    {
      id: 5,
      title: "Aviation Safety Seminar",
      date: "February 28, 2025",
      location: "Virtual Event",
      description: "This seminar covered critical aspects of aviation safety, featuring speakers from the aviation industry who discussed risk assessment, human factors in aviation accidents, and modern safety systems in aircraft design.",
      image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: 'past',
      tags: ['Seminar', 'Safety']
    },
    {
      id: 6,
      title: "Wind Tunnel Testing Demo",
      date: "January 20, 2025",
      location: "Aerospace Lab",
      description: "Students observed and participated in wind tunnel testing of various airfoil designs. The event demonstrated principles of aerodynamics and provided practical insights into how engineers test and refine aircraft components.",
      image: "https://images.unsplash.com/photo-1464037801781-bdcd73b2c9d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: 'past',
      tags: ['Demo', 'Technical']
    }
  ];
  
  // Filter events based on activeFilter
  const filteredEvents = activeFilter === 'all' 
    ? events 
    : events.filter(event => event.category === activeFilter);
  
  // Enhanced animation variants with improved properties
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        when: "beforeChildren",
        duration: 0.3,
        ease: [0.2, 0.0, 0.2, 1.0]
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: [0.4, 0.0, 1, 1]
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1]
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.98,
      transition: {
        duration: 0.2,
        ease: [0.4, 0.0, 1, 1]
      }
    }
  };
  
  // Handle filter change with proper animation management
  const handleFilterChange = (filter: 'all' | 'upcoming' | 'past') => {
    // Don't change if it's the same filter
    if (filter === activeFilter) return;
    
    setIsChangingFilter(true);
    
    // Short delay before changing filter to allow exit animations
    setTimeout(() => {
      setActiveFilter(filter);
      setIsChangingFilter(false);
    }, 150);
  };
  
  // Handle event click - Enhanced Horizontal expansion approach
  const handleEventClick = (event: Event) => {
    if (activeEvent && activeEvent.id === event.id) {
      // If clicking the same event, close it
      setActiveEvent(null);
    } else {
      // Set the active event
      setActiveEvent(event);
      
      // Enhanced smooth scrolling to center the card with animation frame for better performance
      setTimeout(() => {
        const cardElement = document.getElementById(`card-${event.id}`);
        const containerElement = document.getElementById(`event-container-${event.id}`);
        
        if (cardElement && containerElement) {
          // Get container position and size
          const containerRect = containerElement.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          
          // Calculate ideal position (centered in viewport)
          const idealPosition = viewportHeight / 2 - containerRect.height / 2;
          const currentPosition = containerRect.top;
          const scrollDifference = currentPosition - idealPosition;
          
          // Use requestAnimationFrame for smoother scrolling
          const startPosition = window.scrollY;
          const targetPosition = startPosition + scrollDifference;
          const duration = 600; // ms
          const startTime = performance.now();
          
          function scrollStep(timestamp: number): void {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth deceleration
            const easeOutCubic = (p: number): number => 1 - Math.pow(1 - p, 3);
            const easedProgress = easeOutCubic(progress);
            
            window.scrollTo(0, startPosition + (scrollDifference * easedProgress));
            
            if (progress < 1) {
              requestAnimationFrame(scrollStep);
            }
          }
          
          requestAnimationFrame(scrollStep);
        }
      }, 50); // Reduced timeout for quicker response
    }
  };
  
  // Close event details
  const closeEventDetails = () => {
    // Get the card element before closing
    if (activeEvent) {
      const cardElement = document.getElementById(`card-${activeEvent.id}`);
      if (cardElement) {
        // Smooth scroll to keep the card in view before closing
        cardElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
    
    // Delay the state change slightly to let the scroll complete
    setTimeout(() => {
      setActiveEvent(null);
    }, 100);
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
              <span><span className="text-deep-sky-blue">Events</span> Log</span>
              <motion.div 
                className="absolute -bottom-2 left-0 h-1 bg-deep-sky-blue"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </h2>
            <p className="text-titanium-gray text-lg">Connect, learn, and collaborate at our aerospace events</p>
          </motion.div>
          
          {/* Filter Tabs */}
          <LayoutGroup id="filter-tabs">
          <motion.div 
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="glass-panel p-1.5 rounded-md flex relative">
              {['all', 'upcoming', 'past'].map((filter) => (
                <motion.button
                  key={`filter-${filter}`}
                  className={`px-4 py-2 rounded-md relative z-10 transition-all duration-300 ${
                    activeFilter === filter 
                      ? 'text-white font-medium' 
                      : 'text-titanium-gray hover:text-white'
                  }`}
                  onClick={() => handleFilterChange(filter as 'all' | 'upcoming' | 'past')}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  
                  {/* Active background moves with the selected filter */}
                  {activeFilter === filter && (
                    <motion.div 
                      className="absolute inset-0 rounded-md bg-deep-sky-blue/20 -z-10"
                      layoutId="active-filter-bg"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
          </LayoutGroup>
          
          {/* Events Grid with Horizontal Expansion */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={`events-${activeFilter}`} 
              className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12 min-h-[200px]"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
            >
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <motion.div 
                    key={`event-container-${event.id}`}
                    id={`event-container-${event.id}`}
                    className={`flex flex-col ${activeEvent?.id === event.id ? 'md:col-span-2 md:flex-row gap-6' : ''}`}
                    layout
                    transition={{ duration: 0.3, type: 'spring', damping: 25, stiffness: 300 }}
                  >
                    {/* Main Card */}
                    <motion.div 
                      id={`card-${event.id}`}
                      className={`glass-panel overflow-hidden rounded-lg cursor-pointer group relative flex-1 ${
                        activeEvent?.id === event.id ? 'ring-2 ring-deep-sky-blue md:flex-[0_0_48%]' : ''
                      }`}
                      variants={cardVariants}
                      whileHover={{ 
                        y: activeEvent?.id === event.id ? 0 : -5, 
                        boxShadow: '0 10px 25px rgba(0, 119, 182, 0.1)',
                        transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }
                      }}
                      onClick={() => handleEventClick(event)}
                      layout
                    >
                      {/* Event Image */}
                      <div className="h-48 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-jet-black to-transparent z-10 opacity-60"></div>
                        <motion.img 
                          src={event.image} 
                          alt={event.title} 
                          className="w-full h-full object-cover"
                          initial={{ scale: 1 }}
                          whileHover={{ scale: 1.08 }}
                          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                        />
                        
                        {/* Category Badge */}
                        <div className={`absolute top-3 right-3 px-3 py-1 text-xs font-medium rounded-full z-20 ${
                          event.category === 'upcoming' 
                            ? 'bg-afterburner-orange/80 text-white' 
                            : 'bg-titanium-gray/80 text-white'
                        }`}>
                          {event.category === 'upcoming' ? 'Upcoming' : 'Past'}
                        </div>
                      
                        {/* Event Date & Location */}
                        <div className="absolute bottom-3 left-3 z-20 flex items-center">
                          <div className="bg-jet-black/70 backdrop-blur-sm px-3 py-1 rounded text-xs text-white flex items-center">
                            <svg className="w-3 h-3 mr-1 text-deep-sky-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {event.date}
                          </div>
                        </div>
                      </div>
                      
                      {/* Event Details */}
                      <div className="p-5">
                        <h3 className="font-orbitron text-lg mb-2 group-hover:text-deep-sky-blue transition-colors duration-300">
                          {event.title}
                        </h3>
                        <div className="flex items-center mb-3 text-titanium-gray text-xs">
                          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {event.location}
                        </div>
                        <p className="text-titanium-gray text-sm mb-4 line-clamp-2">
                          {event.description}
                        </p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {event.tags.map((tag) => (
                            <span 
                              key={tag} 
                              className="text-xs px-2 py-1 bg-titanium-gray/10 text-titanium-gray rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* View Details Indicator */}
                      <div className={`absolute bottom-4 right-4 w-8 h-8 rounded-full ${
                        activeEvent?.id === event.id 
                          ? 'bg-deep-sky-blue/20' 
                          : 'bg-deep-sky-blue/0'
                      } flex items-center justify-center transition-all duration-300 group-hover:bg-deep-sky-blue/20`}>
                        <svg 
                          className={`w-4 h-4 text-deep-sky-blue transform transition-transform duration-300 ${
                            activeEvent?.id === event.id 
                              ? 'rotate-90' 
                              : 'group-hover:translate-x-0.5'
                          }`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </motion.div>
                    
                    {/* Expanded Details (shows beside when active) */}
                    {activeEvent?.id === event.id && (
                      <motion.div
                        ref={expandedCardRef}
                        className="glass-panel rounded-lg overflow-hidden flex-1 md:max-w-[50%] relative"
                        initial={{ opacity: 0, scale: 0.95, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95, x: 20 }}
                        transition={{ 
                          duration: 0.35, 
                          ease: [0.25, 0.1, 0.25, 1],
                          type: 'spring',
                          damping: 25,
                          stiffness: 300
                        }}
                        layout
                      >
                        <div className="p-5">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="font-orbitron text-xl text-white">{event.title}</h3>
                            <button 
                              className="w-7 h-7 rounded-full bg-deep-sky-blue/10 flex items-center justify-center hover:bg-deep-sky-blue/20 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                closeEventDetails();
                              }}
                            >
                              <svg className="w-4 h-4 text-deep-sky-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                          
                          <div className="flex flex-col gap-4">
                            <div className="flex flex-wrap gap-3 items-center text-titanium-gray text-sm">
                              <div className="flex items-center">
                                <svg className="w-4 h-4 mr-1 text-deep-sky-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {event.date}
                              </div>
                              
                              <div className="flex items-center">
                                <svg className="w-4 h-4 mr-1 text-deep-sky-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {event.location}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm uppercase font-orbitron text-titanium-gray mb-2">Details</h4>
                              <p className="text-white/90 text-sm">{event.description}</p>
                            </div>
                            
                            <div>
                              <h4 className="text-sm uppercase font-orbitron text-titanium-gray mb-2">Categories</h4>
                              <div className="flex flex-wrap gap-2">
                                {event.tags.map((tag, index) => (
                                  <motion.span 
                                    key={tag} 
                                    className="text-xs px-2 py-1 bg-titanium-gray/10 text-titanium-gray rounded"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1 + (index * 0.05) }}
                                  >
                                    {tag}
                                  </motion.span>
                                ))}
                              </div>
                            </div>
                            
                            {/* Action Buttons - Only for upcoming events */}
                            {event.category === 'upcoming' && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                <button className="px-4 py-1.5 text-xs bg-deep-sky-blue text-white rounded-md hover:bg-deep-sky-blue/90 transition-colors">
                                  Register Now
                                </button>
                                <button className="px-4 py-1.5 text-xs border border-deep-sky-blue/30 text-deep-sky-blue rounded-md hover:bg-deep-sky-blue/10 transition-colors">
                                  Add to Calendar
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  className="col-span-full flex flex-col items-center justify-center py-12 glass-panel rounded-lg"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                >
                  <svg className="w-16 h-16 text-titanium-gray/40 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-titanium-gray text-lg mb-2">No events found for this filter</p>
                  <p className="text-titanium-gray/70 text-sm mb-6 max-w-md text-center">
                    {activeFilter === 'upcoming' 
                      ? 'There are no upcoming events scheduled at this time.' 
                      : 'There are no past events recorded in this category.'}
                  </p>
                  <button 
                    className="px-6 py-2.5 text-deep-sky-blue border border-deep-sky-blue/30 rounded-md hover:bg-deep-sky-blue/10 transition-colors duration-300"
                    onClick={() => handleFilterChange('all')}
                  >
                    View All Events
                  </button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
          
          {/* Show More Button (if there are many events) */}
          <AnimatePresence>
            {filteredEvents.length > 6 && (
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.2,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                key={`more-${activeFilter}`}
                layout
              >
                <button className="button-secondary flex items-center mx-auto gap-2">
                  <span>View More Events</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Events;

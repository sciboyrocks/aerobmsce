import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100]);
  
  const features = [
    {
      title: "Innovation",
      description: "Pushing the boundaries of aerospace technology through creative problem-solving and cutting-edge research.",
      icon: (
        <svg className="w-5 h-5 xs:w-6 xs:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Education",
      description: "Providing hands-on learning experiences and knowledge sharing in aerospace engineering disciplines.",
      icon: (
        <svg className="w-5 h-5 xs:w-6 xs:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: "Collaboration",
      description: "Working together with industry partners, academia, and fellow enthusiasts to achieve greater heights.",
      icon: (
        <svg className="w-5 h-5 xs:w-6 xs:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Excellence",
      description: "Striving for the highest standards in all our projects and competitions, aiming for perfection in execution.",
      icon: (
        <svg className="w-5 h-5 xs:w-6 xs:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    }
  ];
  
  return (
    <div 
      ref={sectionRef}
      className="min-h-screen pt-16 xs:pt-20 sm:pt-24 pb-12 sm:pb-16 relative"
    >
      <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none"></div>
      
      <motion.div 
        className="container mx-auto px-3 xs:px-4 sm:px-6"
        style={{ opacity, y }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <motion.div 
            className="mb-8 sm:mb-12 md:mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl xs:text-3xl md:text-4xl font-orbitron font-bold mb-4 xs:mb-5 sm:mb-6 relative inline-block">
              <span>About <span className="text-deep-sky-blue">Us</span></span>
              <motion.div 
                className="absolute -bottom-2 left-0 h-1 bg-deep-sky-blue"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </h2>
            <p className="text-titanium-gray text-base xs:text-lg">Pushing the boundaries of what's possible in aerospace engineering</p>
          </motion.div>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-12 md:mb-16">
            {/* Left Column: Mission Statement */}
            <motion.div 
              className="glass-panel p-4 xs:p-5 sm:p-6 md:p-8 relative overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="absolute top-0 right-0 w-24 xs:w-32 sm:w-40 h-24 xs:h-32 sm:h-40 bg-deep-sky-blue/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <h3 className="font-orbitron text-lg xs:text-xl mb-3 xs:mb-4 text-deep-sky-blue">Our Mission</h3>
              <p className="text-white/90 mb-4 xs:mb-5 sm:mb-6 relative z-10 text-sm xs:text-base">
                AeroBMSCE aims to foster innovation and excellence in aerospace engineering, creating a collaborative environment where students can develop practical skills, theoretical knowledge, and industry connections.
              </p>
              <div className="border-l-2 border-deep-sky-blue pl-3 xs:pl-4 py-2 mb-4 xs:mb-5 sm:mb-6">
                <p className="text-titanium-gray italic text-sm xs:text-base">
                  "We're not just learning about aerospace—we're building the future of flight, one project at a time."
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 xs:w-12 xs:h-12 bg-jet-black rounded-full flex items-center justify-center mr-3 xs:mr-4 border border-titanium-gray/30">
                  <svg className="w-5 h-5 xs:w-6 xs:h-6 text-deep-sky-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium text-sm xs:text-base">Est. May 5, 2017</p>
                  <p className="text-titanium-gray text-xs xs:text-sm">BMSCE, Bangalore</p>
                </div>
              </div>
              
              {/* Blueprint grid in the background */}
              <div className="absolute inset-0 blueprint-grid opacity-10 z-0"></div>
            </motion.div>
            
            {/* Right Column: Club History */}
            <motion.div 
              className="glass-panel p-4 xs:p-5 sm:p-6 md:p-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="font-orbitron text-lg xs:text-xl mb-3 xs:mb-4 text-deep-sky-blue">Our Story</h3>
              <div className="space-y-4 xs:space-y-5 sm:space-y-6">
                <div className="flex">
                  <div className="mr-3 xs:mr-4 flex flex-col items-center">
                    <div className="w-6 h-6 xs:w-8 xs:h-8 rounded-full bg-deep-sky-blue/20 border border-deep-sky-blue/30 flex items-center justify-center text-deep-sky-blue">
                      <span className="text-xs xs:text-sm">01</span>
                    </div>
                    <div className="w-0.5 h-full bg-titanium-gray/20 my-2"></div>
                  </div>
                  <div>
                    <h4 className="font-medium text-white text-sm xs:text-base">Formation</h4>
                    <p className="text-titanium-gray text-xs xs:text-sm">Founded by a group of passionate engineering students with a shared dream of advancing aerospace technology.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-3 xs:mr-4 flex flex-col items-center">
                    <div className="w-6 h-6 xs:w-8 xs:h-8 rounded-full bg-deep-sky-blue/20 border border-deep-sky-blue/30 flex items-center justify-center text-deep-sky-blue">
                      <span className="text-xs xs:text-sm">02</span>
                    </div>
                    <div className="w-0.5 h-full bg-titanium-gray/20 my-2"></div>
                  </div>
                  <div>
                    <h4 className="font-medium text-white text-sm xs:text-base">Growth</h4>
                    <p className="text-titanium-gray text-xs xs:text-sm">Expanded from a small interest group to a full-fledged student club with specialized departments and faculty support.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-3 xs:mr-4 flex flex-col items-center">
                    <div className="w-6 h-6 xs:w-8 xs:h-8 rounded-full bg-deep-sky-blue/20 border border-deep-sky-blue/30 flex items-center justify-center text-deep-sky-blue">
                      <span className="text-xs xs:text-sm">03</span>
                    </div>
                    <div className="w-0.5 h-full bg-titanium-gray/20 my-2"></div>
                  </div>
                  <div>
                    <h4 className="font-medium text-white text-sm xs:text-base">Achievement</h4>
                    <p className="text-titanium-gray text-xs xs:text-sm">Participation in national and international competitions, with multiple award-winning projects and research papers.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-3 xs:mr-4 flex flex-col items-center">
                    <div className="w-6 h-6 xs:w-8 xs:h-8 rounded-full bg-afterburner-orange/20 border border-afterburner-orange/30 flex items-center justify-center text-afterburner-orange">
                      <span className="text-xs xs:text-sm">04</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-white text-sm xs:text-base">Today</h4>
                    <p className="text-titanium-gray text-xs xs:text-sm">A thriving community at the forefront of student aerospace innovation, collaborating with industry partners and preparing future leaders.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Values/Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 mb-8 sm:mb-12 md:mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="glass-panel p-4 xs:p-5 sm:p-6 flex"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="mr-3 xs:mr-4 flex-shrink-0 w-10 h-10 xs:w-12 xs:h-12 rounded-full bg-deep-sky-blue/20 flex items-center justify-center text-deep-sky-blue">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-orbitron text-base xs:text-lg mb-1 xs:mb-2">{feature.title}</h3>
                  <p className="text-titanium-gray text-sm xs:text-base">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* CTA */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a href="#team" className="button-primary text-sm xs:text-base">
              Meet Our Team
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;

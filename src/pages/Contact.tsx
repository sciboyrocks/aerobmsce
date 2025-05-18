import { motion } from 'framer-motion';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    interest: 'general'
  });
  
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate form submission
    setTimeout(() => {
      // In a real application, you would make an API call here
      console.log('Form submitted:', formData);
      setFormStatus('success');
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        interest: 'general'
      });
      
      // Reset status after a delay
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    }, 1500);
  };
  
  // Define the areas of interest options
  const interestOptions = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'membership', label: 'Club Membership' },
    { value: 'project', label: 'Project Collaboration' },
    { value: 'sponsorship', label: 'Sponsorship Opportunity' },
    { value: 'event', label: 'Event Information' }
  ];
  
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
              <span>Control <span className="text-deep-sky-blue">Center</span></span>
              <motion.div 
                className="absolute -bottom-2 left-0 h-1 bg-deep-sky-blue"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </h2>
            <p className="text-titanium-gray text-lg">Establish communication channels with our mission control</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Left Column: Contact Form */}
            <motion.div 
              className="glass-panel rounded-lg p-6 md:p-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="font-orbitron text-xl mb-6 text-deep-sky-blue">Send Transmission</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm text-titanium-gray uppercase font-orbitron tracking-wider">
                    Name <span className="text-deep-sky-blue">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-jet-black/50 text-white border border-titanium-gray/30 rounded-md p-3 pl-10 focus:outline-none focus:border-deep-sky-blue transition-colors duration-300"
                      placeholder="Your name"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-titanium-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Email Input */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm text-titanium-gray uppercase font-orbitron tracking-wider">
                    Email <span className="text-deep-sky-blue">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-jet-black/50 text-white border border-titanium-gray/30 rounded-md p-3 pl-10 focus:outline-none focus:border-deep-sky-blue transition-colors duration-300"
                      placeholder="Your email address"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-titanium-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Area of Interest */}
                <div className="space-y-2">
                  <label htmlFor="interest" className="block text-sm text-titanium-gray uppercase font-orbitron tracking-wider">
                    Area of Interest
                  </label>
                  <div className="relative">
                    <select
                      id="interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      className="w-full bg-jet-black/50 text-white border border-titanium-gray/30 rounded-md p-3 pl-10 appearance-none focus:outline-none focus:border-deep-sky-blue transition-colors duration-300"
                    >
                      {interestOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-titanium-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-titanium-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Subject Input */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm text-titanium-gray uppercase font-orbitron tracking-wider">
                    Subject <span className="text-deep-sky-blue">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-jet-black/50 text-white border border-titanium-gray/30 rounded-md p-3 pl-10 focus:outline-none focus:border-deep-sky-blue transition-colors duration-300"
                      placeholder="Message subject"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-titanium-gray" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Message Textarea */}
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm text-titanium-gray uppercase font-orbitron tracking-wider">
                    Message <span className="text-deep-sky-blue">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-jet-black/50 text-white border border-titanium-gray/30 rounded-md p-3 focus:outline-none focus:border-deep-sky-blue transition-colors duration-300"
                      placeholder="Your message"
                    />
                  </div>
                </div>
                
                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="button-primary w-full flex items-center justify-center"
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Transmitting...
                      </>
                    ) : (
                      'Send Transmission'
                    )}
                  </button>
                  
                  {/* Success Message */}
                  {formStatus === 'success' && (
                    <motion.div 
                      className="mt-4 p-3 bg-control-panel-green/20 border border-control-panel-green/30 rounded-md text-white text-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2 text-control-panel-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Message transmitted successfully!</span>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Error Message */}
                  {formStatus === 'error' && (
                    <motion.div 
                      className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-md text-white text-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Transmission error. Please try again.</span>
                      </div>
                    </motion.div>
                  )}
                </div>
              </form>
            </motion.div>
            
            {/* Right Column: Contact Info */}
            <motion.div 
              className="glass-panel rounded-lg p-6 md:p-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="font-orbitron text-xl mb-6 text-deep-sky-blue text-center">Mission Control</h3>
              
              {/* Contact Information */}
              <div className="space-y-6 mb-8 flex flex-col items-center">
                <div className="flex flex-col sm:flex-row items-center text-center sm:text-left">
                  <div className="mb-3 sm:mb-0 sm:mr-4 flex-shrink-0 w-10 h-10 rounded-full bg-deep-sky-blue/20 flex items-center justify-center text-deep-sky-blue">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm text-titanium-gray mb-1 uppercase font-orbitron tracking-wider">Base Location</h4>
                    <p className="text-white">BMSCE Aerospace Department<br />Bull Temple Road, Basavanagudi<br />Bangalore, Karnataka 560019</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center text-center sm:text-left">
                  <div className="mb-3 sm:mb-0 sm:mr-4 flex-shrink-0 w-10 h-10 rounded-full bg-deep-sky-blue/20 flex items-center justify-center text-deep-sky-blue">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm text-titanium-gray mb-1 uppercase font-orbitron tracking-wider">Digital Communication</h4>
                    <p className="text-white mb-1">Email: <a href="mailto:contact@aerobmsce.org" className="text-deep-sky-blue hover:underline">contact@aerobmsce.org</a></p>
                    <p className="text-white">Website: <a href="https://aerobmsce.org" className="text-deep-sky-blue hover:underline">aerobmsce.org</a></p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center text-center sm:text-left">
                  <div className="mb-3 sm:mb-0 sm:mr-4 flex-shrink-0 w-10 h-10 rounded-full bg-deep-sky-blue/20 flex items-center justify-center text-deep-sky-blue">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm text-titanium-gray mb-1 uppercase font-orbitron tracking-wider">Voice Comms</h4>
                    <p className="text-white mb-1">Phone: +91 80 2662 2130</p>
                    <p className="text-white">Working Hours: Mon-Fri, 9:00 - 17:00 IST</p>
                  </div>
                </div>
              </div>
              
              {/* Social Media Links */}
              <div className="mb-8">
                <h4 className="text-sm text-titanium-gray mb-4 uppercase font-orbitron tracking-wider">Connect with Us</h4>
                <div className="flex space-x-4">
                  {['instagram', 'twitter', 'linkedin', 'youtube', 'github'].map((social) => (
                    <motion.a
                      key={social}
                      href="#"
                      className="w-10 h-10 rounded-full bg-jet-black border border-titanium-gray/30 flex items-center justify-center text-titanium-gray hover:text-deep-sky-blue hover:border-deep-sky-blue transition-colors duration-300"
                      whileHover={{ y: -5, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="sr-only">{social}</span>
                      <i className={`fa fa-${social}`}></i>
                    </motion.a>
                  ))}
                </div>
              </div>
              
              {/* Map or Location Visual */}
              <div className="relative rounded-md overflow-hidden h-48 border border-titanium-gray/30">
                <div className="absolute inset-0 bg-jet-black/50 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center">
                    <div className="mb-3 text-titanium-gray">
                      <svg className="w-10 h-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    </div>
                    <button className="button-secondary text-sm py-1.5">
                      View on Map
                    </button>
                  </div>
                </div>
                <div className="absolute inset-0 blueprint-grid opacity-20"></div>
              </div>
            </motion.div>
          </div>
          
          {/* FAQ Section */}
          <motion.div 
            className="glass-panel rounded-lg p-6 md:p-8 mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h3 className="font-orbitron text-xl mb-6 text-deep-sky-blue text-center">Frequently Asked Questions</h3>
            
            <div className="space-y-4">
              {[
                {
                  question: "How can I join AeroBMSCE?",
                  answer: "We recruit new members at the beginning of each semester. Keep an eye on our website and social media for announcements about recruitment drives and interviews. You can also fill out the contact form above expressing your interest in joining."
                },
                {
                  question: "Do I need prior experience in aerospace to join?",
                  answer: "No, we welcome students from all backgrounds and experience levels. What's most important is enthusiasm and willingness to learn. We provide training and mentorship to help you develop the necessary skills."
                },
                {
                  question: "How much time commitment is required?",
                  answer: "The time commitment varies depending on your role and the projects you're involved in. Generally, we expect members to dedicate 4-6 hours per week, with additional time during competitions or project deadlines."
                },
                {
                  question: "Can companies sponsor or collaborate with AeroBMSCE?",
                  answer: "Absolutely! We're always open to industry partnerships and sponsorships. Please reach out via the contact form or email our partnerships team directly at partnerships@aerobmsce.org to discuss collaboration opportunities."
                }
              ].map((faq, index) => (
                <div key={index} className="border border-titanium-gray/20 rounded-md overflow-hidden">
                  <details className="group">
                    <summary className="flex justify-between items-center p-4 cursor-pointer bg-titanium-gray/10">
                      <h4 className="font-orbitron text-white">{faq.question}</h4>
                      <div className="text-deep-sky-blue transform group-open:rotate-180 transition-transform duration-300">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </summary>
                    <div className="p-4 border-t border-titanium-gray/20 text-titanium-gray">
                      <p>{faq.answer}</p>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

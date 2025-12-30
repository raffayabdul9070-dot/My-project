import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Globe, BookOpen, Fingerprint, Database, Map, Languages } from 'lucide-react';
import './about.css';

const About = () => {
  // Explicit typing to fix the TypeScript Variants error
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div className="about-visual-page">
      <motion.div 
        className="about-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* HERO TEXT CARD - Explains the project */}
        <motion.div className="text-card hero-card" variants={cardVariants}>
          <div className="icon-badge"><Globe size={28} /></div>
          <h2>Geolinguistic <span className="gold-text">Survey</span></h2>
          <p>Mapping 74+ languages from the frozen peaks of K2 to the emerald shores of Gawadar. We are chronicling the living voice of a nation through digital preservation.</p>
          
          <div className="stat-row">
            <div className="stat">
              <span className="gold-text">74+</span>
              <p>Dialects</p>
            </div>
            <div className="stat">
              <span className="gold-text">25k</span>
              <p>Recordings</p>
            </div>
            <div className="stat">
              <span className="gold-text">100%</span>
              <p>Digital</p>
            </div>
          </div>
        </motion.div>
        
        {/* IMAGE CARD - TALL */}
        <motion.div className="image-card tall" variants={cardVariants}>
          <img src="https://images.unsplash.com/photo-1596464716127-f2a82984de30" alt="Heritage" />
          <div className="card-overlay">
            <div className="label"><BookOpen size={14} /> Heritage Scripts</div>
            <h3>Evolution of Script</h3>
            <p>From ancient manuscripts to modern digital typography.</p>
          </div>
        </motion.div>
        
        {/* IMAGE CARD - WIDE */}
        <motion.div className="image-card wide" variants={cardVariants}>
          <img src="https://images.unsplash.com/photo-1524230507669-5ff97982bb5e" alt="Artifact" />
          <div className="card-overlay">
            <div className="label"><Fingerprint size={14} /> Cultural DNA</div>
            <h3>Identity Preservation</h3>
          </div>
        </motion.div>

        {/* MISSION CARD */}
        <motion.div className="text-card mission-card" variants={cardVariants}>
          <div className="icon-badge gold-bg"><Database size={28} /></div>
          <h2>Our <span className="gold-text">Goal</span></h2>
          <p>To digitize every dialect and preserve the cultural DNA of Pakistan, making our heritage accessible to the next generation of researchers.</p>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="explore-btn"
          >
            Explore the Map <Map size={18} style={{ marginLeft: '8px' }} />
          </motion.button>
        </motion.div>

        {/* SECONDARY INFO CARD */}
        <motion.div className="text-card mini-card" variants={cardVariants}>
          <div className="icon-badge"><Languages size={24} /></div>
          <h3>Polyglot Nation</h3>
          <p>Pakistan ranks among the top 10 most linguistically diverse countries in the world.</p>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default About;
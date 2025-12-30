import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './gallery.css';

const images = [
 { 
    url: "/images/heritage1.jpg", // Path to your local file
    title: "Karakoram Echoes", 
    desc: "Whispers of the ancient silk road." 
  },
  { 
    url: "/images/heritage2.jpg", 
    title: "Indus Lineage", 
    desc: "Tracing the geometric perfection of scripts." 
  },
  { 
    url: "/images/heritage3.jpg", // Path to your local file
    title: "Karakoram Echoes", 
    desc: "Whispers of the ancient silk road." 
  },
  { 
    url: "/images/heritage4.jpg", 
    title: "Indus Lineage", 
    desc: "Tracing the geometric perfection of scripts." 
  },
  { 
    url: "/images/heritage5.jpg", // Path to your local file
    title: "Karakoram Echoes", 
    desc: "Whispers of the ancient silk road." 
  },
 
];

const Gallery = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const next = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const slideVariants = {
    initial: (direction: number) => ({
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 90 : -90,
      z: -500
    }),
    animate: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      z: 0,
      transition: { duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }
    },
    exit: (direction: number) => ({
      opacity: 0,
      scale: 1.1,
      rotateY: direction > 0 ? -90 : 90,
      z: -200,
      transition: { duration: 0.5 }
    })
  };

  return (
    <div className="gallery-page">
      <div className="gallery-header">
        <motion.h2 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          Visual <span className="gold-text">Anthology</span>
        </motion.h2>
      </div>

      <div className="museum-slider">
        <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} onClick={prev} className="nav-btn">
          <ArrowLeft />
        </motion.button>
        
        <motion.div 
          className="image-frame"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="slide-img"
              style={{ 
                backgroundImage: `url(${images[index].url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transformStyle: "preserve-3d" 
              }}
            >
              <div className="img-overlay">
                <motion.h3 initial={{ z: 0, opacity: 0, x: -30 }} animate={{ z: 50, opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                  {images[index].title}
                </motion.h3>
                <motion.p initial={{ z: 0, opacity: 0 }} animate={{ z: 30, opacity: 1 }} transition={{ delay: 0.5 }}>
                  {images[index].desc}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} onClick={next} className="nav-btn">
          <ArrowRight />
        </motion.button>
      </div>

      <div className="gallery-dots">
        {images.map((_, i) => (
          <motion.div 
            key={i} 
            className={`dot ${i === index ? 'active' : ''}`}
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
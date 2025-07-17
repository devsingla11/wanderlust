import React from 'react';
import { motion } from 'framer-motion';

const AnimatedCard = ({ 
  children, 
  className = "", 
  delay = 0, 
  whileHover = { scale: 1.02, y: -8 },
  whileTap = { scale: 0.98 },
  ...props 
}) => {
  return (
    <motion.div
      className={`animated-card ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: delay * 0.1,
        ease: [0.4, 0, 0.2, 1]
      }}
      whileHover={whileHover}
      whileTap={whileTap}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard; 
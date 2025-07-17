import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedButton = ({ 
  children, 
  className = "", 
  variant = "primary",
  size = "medium",
  disabled = false,
  onClick,
  ...props 
}) => {
  const [ripples, setRipples] = useState([]);

  const addRipple = (event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = {
      id: Date.now(),
      x,
      y,
      size
    };
    
    setRipples(prev => [...prev, ripple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== ripple.id));
    }, 600);
  };

  const handleClick = (event) => {
    if (!disabled) {
      addRipple(event);
      onClick?.(event);
    }
  };

  const buttonVariants = {
    primary: "btn-primary",
    secondary: "btn-secondary", 
    outline: "btn-outline",
    ghost: "btn-ghost"
  };

  const sizeVariants = {
    small: "btn-sm",
    medium: "btn-md",
    large: "btn-lg"
  };

  return (
    <motion.button
      className={`animated-button ${buttonVariants[variant]} ${sizeVariants[size]} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      whileHover={{ 
        scale: disabled ? 1 : 1.02,
        y: disabled ? 0 : -2
      }}
      whileTap={{ 
        scale: disabled ? 1 : 0.98,
        y: disabled ? 0 : 0
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
      {...props}
    >
      {children}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="ripple"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size
          }}
        />
      ))}
    </motion.button>
  );
};

export default AnimatedButton; 
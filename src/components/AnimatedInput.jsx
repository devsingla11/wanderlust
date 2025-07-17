import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedInput = ({
  label,
  type = "text",
  value = "",
  onChange,
  placeholder,
  required = false,
  error = "",
  className = "",
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);

  const handleChange = (e) => {
    setHasValue(!!e.target.value);
    onChange?.(e);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={`animated-input-container ${className} ${error ? 'error' : ''}`}>
      <motion.div
        className="input-wrapper"
        initial={false}
        animate={{
          scale: isFocused ? 1.02 : 1,
          y: isFocused ? -2 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30
        }}
      >
        <motion.label
          className="floating-label"
          initial={false}
          animate={{
            y: (isFocused || hasValue) ? -25 : 0,
            scale: (isFocused || hasValue) ? 0.85 : 1,
            color: isFocused ? 'var(--primary-color)' : 'var(--text-secondary)'
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30
          }}
        >
          {label}
          {required && <span className="required">*</span>}
        </motion.label>
        
        <input
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="animated-input"
          placeholder={isFocused ? placeholder : ""}
          required={required}
          {...props}
        />
        
        <motion.div
          className="input-border"
          initial={false}
          animate={{
            scaleX: isFocused ? 1 : 0,
            opacity: isFocused ? 1 : 0
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut"
          }}
        />
      </motion.div>
      
      {error && (
        <motion.div
          className="error-message"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.div>
      )}
    </div>
  );
};

export default AnimatedInput; 
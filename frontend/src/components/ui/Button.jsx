import React from 'react';
import { motion } from 'framer-motion';

const Button = React.forwardRef(({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
  isLoading = false,
  ...props
}, ref) => {
  const variants = {
    primary: 'bg-devbot-purple hover:bg-devbot-purple/80 text-white glow-shadow',
    secondary: 'bg-devbot-surface border border-devbot-border hover:bg-devbot-surface/80',
    ghost: 'bg-transparent border border-devbot-border hover:bg-devbot-surface/30',
    gradient: 'bg-gradient-to-r from-devbot-purple to-devbot-cyan hover:from-devbot-cyan hover:to-devbot-purple text-white glow-shadow'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const baseClasses = `
    font-medium rounded-lg
    transition-all duration-200
    flex items-center justify-center gap-2
    disabled:opacity-50 disabled:cursor-not-allowed
    active:scale-95
    hover:scale-[1.03]
  `;

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
          Loading...
        </>
      ) : (
        children
      )}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;

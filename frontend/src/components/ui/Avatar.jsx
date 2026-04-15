import React from 'react';
import { getInitials } from '../../utils/helpers';

const Avatar = ({
  name = 'User',
  size = 'md',
  src = null,
  isAi = false,
  className = ''
}) => {
  const sizes = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg'
  };

  if (isAi) {
    return (
      <div className={`
        ${sizes[size]}
        rounded-full bg-gradient-to-br from-devbot-purple to-devbot-cyan
        flex items-center justify-center font-heading font-bold text-white
        ${className}
      `}>
        D
      </div>
    );
  }

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`
          ${sizes[size]}
          rounded-full object-cover
          ${className}
        `}
      />
    );
  }

  return (
    <div className={`
      ${sizes[size]}
      rounded-full bg-devbot-surface border border-devbot-border
      flex items-center justify-center font-semibold text-devbot-cyan
      ${className}
    `}>
      {getInitials(name)}
    </div>
  );
};

export default Avatar;

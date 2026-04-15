import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

const FormField = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div>
      <label className="block text-sm font-medium text-devbot-text mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          type={
            type === 'password' && name === 'password'
              ? showPassword
                ? 'text'
                : 'password'
              : type === 'password' && name === 'confirmPassword'
              ? showConfirmPassword
                ? 'text'
                : 'password'
              : type
          }
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={label}
          className={`w-full px-4 py-3 rounded-lg bg-devbot-surface border transition-all duration-200 font-body text-devbot-text placeholder-devbot-muted ${
            error ? 'border-devbot-purple' : 'border-devbot-border'
          }`}
        />

        {type === 'password' && name === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3.5 text-devbot-muted hover:text-devbot-text transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}

        {type === 'password' && name === 'confirmPassword' && (
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-3.5 text-devbot-muted hover:text-devbot-text transition-colors"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && (
        <motion.p className="text-sm text-devbot-purple mt-1.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default React.memo(FormField);

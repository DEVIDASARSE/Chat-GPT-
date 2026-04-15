import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { isValidEmail } from '../../utils/helpers';
import toast from 'react-hot-toast';

const LoginForm = ({ onSubmit, isLoading = false, onSwitchMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!isValidEmail(email)) newErrors.email = 'Invalid email format';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await onSubmit({ email, password });
      setEmail('');
      setPassword('');
      setErrors({});
    } catch (error) {
      toast.error(error.message || 'Login failed');
    }
  };

  const shakeVariants = {
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-5 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Email Field */}
      <motion.div
        variants={errors.email ? shakeVariants : {}}
        animate={errors.email ? 'shake' : 'rest'}
      >
        <label className="block text-sm font-medium text-devbot-text mb-1.5">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors({ ...errors, email: '' });
          }}
          placeholder="your@email.com"
          className={`w-full px-4 py-3 rounded-lg bg-devbot-surface border transition-all duration-200 font-body text-devbot-text placeholder-devbot-muted ${
            errors.email ? 'border-devbot-purple' : 'border-devbot-border'
          }`}
        />
        {errors.email && (
          <motion.p className="text-sm text-devbot-purple mt-1.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {errors.email}
          </motion.p>
        )}
      </motion.div>

      {/* Password Field */}
      <motion.div
        variants={errors.password ? shakeVariants : {}}
        animate={errors.password ? 'shake' : 'rest'}
      >
        <label className="block text-sm font-medium text-devbot-text mb-1.5">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors({ ...errors, password: '' });
            }}
            placeholder="••••••••"
            className={`w-full px-4 py-3 rounded-lg bg-devbot-surface border transition-all duration-200 font-body text-devbot-text placeholder-devbot-muted ${
              errors.password ? 'border-devbot-purple' : 'border-devbot-border'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3.5 text-devbot-muted hover:text-devbot-text transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && (
          <motion.p className="text-sm text-devbot-purple mt-1.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {errors.password}
          </motion.p>
        )}
      </motion.div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="gradient"
        size="md"
        isLoading={isLoading}
        className="w-full"
      >
        Login
      </Button>

      {/* Switch to Register */}
      <p className="text-center text-sm text-devbot-muted">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={onSwitchMode}
          className="text-devbot-cyan hover:text-devbot-purple transition-colors font-medium"
        >
          Register
        </button>
      </p>
    </motion.form>
  );
};

export default LoginForm;

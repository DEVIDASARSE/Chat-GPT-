import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { isValidEmail } from '../../utils/helpers';
import toast from 'react-hot-toast';
import FormField from './FormField';

const RegisterForm = ({ onSubmit, isLoading = false, onSwitchMode }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    else if (name.length < 2) newErrors.name = 'Name must be at least 2 characters';
    if (!email) newErrors.email = 'Email is required';
    else if (!isValidEmail(email)) newErrors.email = 'Invalid email format';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
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
      await onSubmit({ name, email, password });
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setErrors({});
    } catch (error) {
      toast.error(error.message || 'Registration failed');
    }
  };

  const shakeVariants = {
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.5 }
    }
  };

  // Using a stable FormField component (separate file) to avoid focus loss

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <FormField
        label="Full Name"
        name="name"
        value={name}
        onChange={setName}
        error={errors.name}
      />

      <FormField
        label="Email"
        name="email"
        value={email}
        onChange={setEmail}
        type="email"
        error={errors.email}
      />

      <FormField
        label="Password"
        name="password"
        value={password}
        onChange={setPassword}
        type="password"
        error={errors.password}
      />

      <FormField
        label="Confirm Password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={setConfirmPassword}
        type="password"
        error={errors.confirmPassword}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        variant="gradient"
        size="md"
        isLoading={isLoading}
        className="w-full"
      >
        Register
      </Button>

      {/* Switch to Login */}
      <p className="text-center text-sm text-devbot-muted">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchMode}
          className="text-devbot-cyan hover:text-devbot-purple transition-colors font-medium"
        >
          Login
        </button>
      </p>
    </motion.form>
  );
};

export default RegisterForm;

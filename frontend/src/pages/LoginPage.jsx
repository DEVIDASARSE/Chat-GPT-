import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import Logo from '../components/ui/Logo';
import { useAuthStore } from '../store/authStore';
import { authAPI } from '../services/api';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, login: authLogin } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/chat');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (credentials) => {
    try {
      setIsLoading(true);
      const response = await authAPI.login(credentials);
      const { data, token } = response.data;
      
      authLogin(data, token);
      toast.success('Login successful!');
      navigate('/chat');
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (userData) => {
    try {
      setIsLoading(true);
      const response = await authAPI.register(userData);
      const { data, token } = response.data;
      
      authLogin(data, token);
      toast.success('Registration successful!');
      navigate('/chat');
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-devbot-bg flex items-center justify-center px-4 py-12 overflow-hidden relative">
      {/* Animated Background Orbs */}
      <motion.div
        className="absolute w-96 h-96 bg-devbot-purple rounded-full blur-3xl opacity-10"
        animate={{ y: [0, 100, 0], x: [0, 50, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ top: '-10%', left: '-20%' }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-devbot-cyan rounded-full blur-3xl opacity-10"
        animate={{ y: [100, 0, 100], x: [50, 0, 50] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{ bottom: '-20%', right: '-10%' }}
      />

      {/* Main Container */}
      <motion.div
        className="relative z-10 w-full max-w-5xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
          {/* Left Side - Gradient Animation (Desktop Only) */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-devbot-purple/20 to-devbot-cyan/20 rounded-2xl"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="relative z-10 text-center max-w-sm">
              <motion.div
                className="mb-8"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              >
                <Logo size="lg" withText={false} animated={false} />
              </motion.div>
              <h2 className="text-3xl font-heading font-bold gradient-text mb-4">
                Welcome to DevBot
              </h2>
              <p className="text-devbot-muted">
                Your intelligent AI companion for all your questions and creative endeavors.
              </p>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            className="flex items-center justify-center lg:py-24"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.div className="glass w-full max-w-sm px-8 py-8 rounded-2xl border border-devbot-border"
              whileHover={{ borderColor: 'rgba(124, 58, 237, 0.3)' }}
            >
              {/* Mobile Logo */}
              <div className="lg:hidden flex justify-center mb-6">
                <Logo size="md" />
              </div>

              {/* Form Title */}
              <motion.div
                className="mb-8 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-2xl font-heading font-bold text-devbot-text mb-2">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h1>
                <p className="text-sm text-devbot-muted">
                  {isLogin
                    ? 'Login to access your chats and continue your conversation'
                    : 'Sign up to start chatting with DevBot'
                  }
                </p>
              </motion.div>

              {/* Forms */}
              <motion.div
                key={isLogin ? 'login' : 'register'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {isLogin ? (
                  <LoginForm
                    onSubmit={handleLogin}
                    isLoading={isLoading}
                    onSwitchMode={() => setIsLogin(false)}
                  />
                ) : (
                  <RegisterForm
                    onSubmit={handleRegister}
                    isLoading={isLoading}
                    onSwitchMode={() => setIsLogin(true)}
                  />
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;

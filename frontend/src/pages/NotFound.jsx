import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-devbot-bg flex items-center justify-center px-4">
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="mb-6 text-devbot-purple"
          animate={{ rotate: [0, -10, 10, -10, 0], y: [0, -20, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
        >
          <AlertCircle size={80} className="mx-auto" />
        </motion.div>

        <h1 className="text-4xl font-heading font-bold text-devbot-text mb-2">
          404
        </h1>
        <h2 className="text-2xl font-heading font-semibold gradient-text mb-4">
          Page Not Found
        </h2>
        <p className="text-devbot-muted mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="gradient" onClick={() => navigate('/')}>
            Go Home
          </Button>
          <Button variant="ghost" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;

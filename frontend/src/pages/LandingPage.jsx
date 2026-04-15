import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Brain, Lock } from 'lucide-react';
import Logo from '../components/ui/Logo';
import Button from '../components/ui/Button';

const LandingPage = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const featureCards = [
    {
      icon: Zap,
      title: 'Real-time Responses',
      description: 'Instant AI responses powered by Socket.io for seamless communication'
    },
    {
      icon: Brain,
      title: 'Long-term Memory',
      description: 'Vector search for semantic understanding of your chat history'
    },
    {
      icon: Lock,
      title: 'Secure & Private',
      description: 'Enterprise-grade JWT authentication to protect your data'
    }
  ];

  return (
    <div className="min-h-screen bg-devbot-bg overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 bg-devbot-purple rounded-full blur-3xl opacity-10"
          animate={{ y: [0, 100, 0], x: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ top: '-10%', left: '-10%' }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-devbot-cyan rounded-full blur-3xl opacity-10"
          animate={{ y: [100, 0, 100], x: [50, 0, 50] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          style={{ bottom: '-20%', right: '-20%' }}
        />
      </div>

      {/* Header */}
      <motion.header
        className="sticky top-0 z-50 backdrop-blur-md bg-devbot-bg/50 border-b border-devbot-border px-6 py-4"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Logo size="md" />
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button variant="gradient" onClick={() => navigate('/register')}>
              Register
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Hero Section */}
        <motion.section
          className="py-24 md:py-32 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Main Heading */}
          <motion.h1
            className="text-4xl md:text-6xl font-heading font-bold mb-6 gradient-text leading-tight"
            variants={itemVariants}
          >
            DevBot — Your AI Companion
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-lg md:text-xl text-devbot-muted max-w-2xl mx-auto mb-10"
            variants={itemVariants}
          >
            Next-generation AI chat powered by Gemini. Built for developers, thinkers, and creators.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={itemVariants}
          >
            <Button
              variant="gradient"
              size="lg"
              onClick={() => navigate('/chat')}
              className="w-full sm:w-auto"
            >
              Start Chatting →
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto"
            >
              Login
            </Button>
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          className="py-24 grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          viewport={{ once: true }}
          whileInView="show"
        >
          {featureCards.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                className="glass p-8 rounded-2xl border border-devbot-border hover:border-devbot-purple transition-colors"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-devbot-purple to-devbot-cyan mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-heading font-bold text-lg text-devbot-text mb-2">
                  {feature.title}
                </h3>
                <p className="text-devbot-muted">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.section>

        {/* Footer */}
        <motion.footer
          className="py-12 border-t border-devbot-border text-center text-sm text-devbot-muted"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p>DevBot © 2025 | Powered by Gemini AI</p>
        </motion.footer>
      </div>
    </div>
  );
};

export default LandingPage;

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const features = [
    {
      title: 'Match Summaries',
      description: 'Get detailed summaries of any IPL match from 2008 to 2024',
      icon: '📊',
    },
    {
      title: 'Smart Chatbot',
      description: 'Ask questions about IPL history, stats, and more',
      icon: '💬',
    },
    {
      title: 'Team Reports',
      description: 'Comprehensive analysis of team performance',
      icon: '🏏',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-ipl-purple to-ipl-blue text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold mb-6">
            IPL LLM - Your Smart Cricket Companion
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience IPL like never before with AI-powered insights, match summaries, and interactive features.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/signup"
              className="btn-primary bg-ipl-gold text-ipl-purple hover:bg-opacity-90"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="btn-primary bg-transparent border-2 border-ipl-gold text-ipl-gold hover:bg-ipl-gold hover:text-ipl-purple"
            >
              Explore
            </Link>
          </div>
        </motion.div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="card bg-white/10 backdrop-blur-sm p-6 rounded-lg"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-200">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/20 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#" className="text-gray-300 hover:text-ipl-gold">
              Twitter
            </a>
            <a href="#" className="text-gray-300 hover:text-ipl-gold">
              Facebook
            </a>
            <a href="#" className="text-gray-300 hover:text-ipl-gold">
              Instagram
            </a>
          </div>
          <p className="text-gray-400">
            © 2024 IPL LLM. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 
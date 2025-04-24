import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarIcon,
  NewspaperIcon,
  InformationCircleIcon,
  TrophyIcon,
  SparklesIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  FireIcon,
} from '@heroicons/react/24/outline';

const DashboardHome = () => {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [timeUntilNextMatch, setTimeUntilNextMatch] = useState(null);

  // Sample upcoming matches data (replace with API data later)
  const upcomingMatches = [
    {
      id: 1,
      team1: 'Mumbai Indians',
      team2: 'Chennai Super Kings',
      date: '2024-04-14',
      time: '19:30',
      venue: 'Wankhede Stadium, Mumbai',
    },
    {
      id: 2,
      team1: 'Royal Challengers Bangalore',
      team2: 'Kolkata Knight Riders',
      date: '2024-04-15',
      time: '15:30',
      venue: 'M. Chinnaswamy Stadium, Bangalore',
    },
  ];

  // Sample news data (replace with API data later)
  const latestNews = [
    {
      id: 1,
      title: 'IPL 2024: New Rules and Changes',
      description: 'The BCCI has announced several new rules for IPL 2024, including impact player changes and DRS updates.',
      date: '2024-04-10',
    },
    {
      id: 2,
      title: 'Team Preview: Mumbai Indians',
      description: 'A detailed analysis of Mumbai Indians squad and their chances in IPL 2024.',
      date: '2024-04-09',
    },
    {
      id: 3,
      title: 'IPL 2024: Key Players to Watch',
      description: 'Here are the top 5 players who could make a significant impact in this year tournament.',
      date: '2024-04-08',
    },
  ];

  const features = [
    {
      title: 'Match Summaries',
      description: 'Get detailed summaries of any IPL match from 2008 to 2024, including key moments, player performances, and match statistics.',
    },
    {
      title: 'Smart Chatbot',
      description: 'Our AI-powered chatbot can answer your questions about IPL history, statistics, players, and teams in real-time.',
    },
    {
      title: 'Team Reports',
      description: 'Comprehensive analysis of team performance, including historical data, current form, and player contributions.',
    },
    {
      title: 'Player Statistics',
      description: 'Detailed player statistics, performance analysis, and career records for all IPL players.',
    },
  ];

  // Calculate time until next match
  useEffect(() => {
    const calculateTimeUntilNextMatch = () => {
      const nextMatch = upcomingMatches[0];
      const matchDate = new Date(`${nextMatch.date}T${nextMatch.time}`);
      const now = new Date();
      const diff = matchDate - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeUntilNextMatch({ days, hours, minutes });
      }
    };

    calculateTimeUntilNextMatch();
    const interval = setInterval(calculateTimeUntilNextMatch, 60000);
    return () => clearInterval(interval);
  }, []);

  const nextNews = () => {
    setCurrentNewsIndex((prev) => (prev + 1) % latestNews.length);
  };

  const prevNews = () => {
    setCurrentNewsIndex((prev) => (prev - 1 + latestNews.length) % latestNews.length);
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-ipl-purple/20 to-ipl-blue/20 rounded-2xl blur-2xl"></div>
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-ipl-purple to-ipl-blue bg-clip-text text-transparent">
          Welcome to IPL LLM
        </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
          Your smart cricket companion for IPL insights and analysis
        </p>
              </div>
              <div className="hidden md:block">
                <TrophyIcon className="w-16 h-16 text-ipl-gold" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Matches */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-ipl-purple to-ipl-blue p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CalendarIcon className="w-6 h-6 text-white mr-2" />
                  <h2 className="text-lg font-semibold text-white">
                    Upcoming Matches
                  </h2>
                </div>
                {timeUntilNextMatch && (
                  <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
                    <ClockIcon className="w-4 h-4 text-white" />
                    <span className="text-white text-sm">
                      {timeUntilNextMatch.days}d {timeUntilNextMatch.hours}h {timeUntilNextMatch.minutes}m
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="p-6 space-y-4">
              {upcomingMatches.map((match, index) => (
            <motion.div
                  key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow group"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900 dark:text-white group-hover:text-ipl-purple transition-colors">
                        {match.team1}
                      </span>
                      <span className="text-ipl-purple font-bold">vs</span>
                      <span className="font-medium text-gray-900 dark:text-white group-hover:text-ipl-purple transition-colors">
                        {match.team2}
                      </span>
                    </div>
                    <span className="text-sm bg-ipl-purple/10 text-ipl-purple px-3 py-1 rounded-full group-hover:bg-ipl-purple group-hover:text-white transition-colors">
                      {new Date(match.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                    <p className="flex items-center">
                      <span className="w-4 h-4 bg-ipl-purple/10 rounded-full flex items-center justify-center mr-2 group-hover:bg-ipl-purple transition-colors">
                        <span className="w-2 h-2 bg-ipl-purple rounded-full group-hover:bg-white transition-colors"></span>
                      </span>
                      {match.time} IST
                    </p>
                    <p className="flex items-center">
                      <span className="w-4 h-4 bg-ipl-purple/10 rounded-full flex items-center justify-center mr-2 group-hover:bg-ipl-purple transition-colors">
                        <span className="w-2 h-2 bg-ipl-purple rounded-full group-hover:bg-white transition-colors"></span>
                      </span>
                      {match.venue}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Latest News */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-ipl-blue to-ipl-purple p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <NewspaperIcon className="w-6 h-6 text-white mr-2" />
                  <h2 className="text-lg font-semibold text-white">
                    Latest News
                  </h2>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={prevNews}
                    className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <ChevronLeftIcon className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={nextNews}
                    className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <ChevronRightIcon className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentNewsIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-ipl-blue rounded-full mt-2 mr-3"></div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                        {latestNews[currentNewsIndex].title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {latestNews[currentNewsIndex].description}
                      </p>
                      <span className="text-xs bg-ipl-blue/10 text-ipl-blue px-2 py-1 rounded-full">
                        {new Date(latestNews[currentNewsIndex].date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* About Us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-ipl-purple to-ipl-blue p-4">
              <div className="flex items-center">
                <InformationCircleIcon className="w-6 h-6 text-white mr-2" />
                <h2 className="text-lg font-semibold text-white">
                  About IPL LLM
                </h2>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                IPL LLM is your comprehensive platform for all things IPL. We provide real-time match updates, detailed statistics, and AI-powered insights to enhance your IPL experience.
              </p>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <SparklesIcon className="w-5 h-5 text-ipl-gold mr-2" />
                Features We Offer
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer group"
                  >
                    <div className="flex items-start">
                      <div className="p-2 bg-ipl-purple/10 rounded-lg mr-4 group-hover:bg-ipl-purple transition-colors">
                        <FireIcon className="w-6 h-6 text-ipl-purple group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2 text-lg group-hover:text-ipl-purple transition-colors">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {feature.description}
                        </p>
                      </div>
                    </div>
            </motion.div>
          ))}
        </div>
          </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardHome; 
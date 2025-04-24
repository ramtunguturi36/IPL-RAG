import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import {
  Cog6ToothIcon,
  BellIcon,
  EyeIcon,
  GlobeAltIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline';

const SettingsPage = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('en');
  const [emailUpdates, setEmailUpdates] = useState(true);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'bn', name: 'Bengali' },
    { code: 'ta', name: 'Tamil' },
    { code: 'te', name: 'Telugu' },
  ];

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-6">
          <Cog6ToothIcon className="w-8 h-8 text-ipl-purple mr-3" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Settings
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Notification Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <BellIcon className="w-6 h-6 text-ipl-purple mr-2" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Notifications
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Match Alerts
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Get notified about match updates
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notifications}
                    onChange={() => setNotifications(!notifications)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-ipl-purple/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-ipl-purple"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Display Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <EyeIcon className="w-6 h-6 text-ipl-purple mr-2" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Display
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Dark Mode
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Switch between light and dark theme
                  </p>
                </div>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {isDarkMode ? (
                    <SunIcon className="w-5 h-5 text-ipl-purple" />
                  ) : (
                    <MoonIcon className="w-5 h-5 text-ipl-purple" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Language Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <GlobeAltIcon className="w-6 h-6 text-ipl-purple mr-2" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Language
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ipl-purple focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Email Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <BellIcon className="w-6 h-6 text-ipl-purple mr-2" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Email Preferences
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Email Updates
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive email notifications about IPL updates
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={emailUpdates}
                    onChange={() => setEmailUpdates(!emailUpdates)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-ipl-purple/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-ipl-purple"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsPage; 
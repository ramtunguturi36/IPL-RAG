import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { cricketApi } from '../services/apiService';

const IPL_TEAMS = [
  'Mumbai Indians',
  'Chennai Super Kings',
  'Royal Challengers Bangalore',
  'Kolkata Knight Riders',
  'Delhi Capitals',
  'Punjab Kings',
  'Rajasthan Royals',
  'Sunrisers Hyderabad',
  'Lucknow Super Giants',
  'Gujarat Titans'
];

const YEARS = Array.from({ length: 17 }, (_, i) => 2024 - i);

const MatchSummaryPage = () => {
  const [formData, setFormData] = useState({
    team1: '',
    team2: '',
    year: '',
  });
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      console.log('Submitting form data:', formData);
      const response = await cricketApi.getMatchSummary(formData);
      console.log('Raw API Response:', response);

      if (!response) {
        throw new Error('No response received from the server');
      }

      // Extract the content from the OpenRouter response
      const content = response.choices?.[0]?.message?.content;
      if (!content) {
        throw new Error('No content found in the response');
      }

      console.log('Extracted Content:', content);
      
      // Set the summary with the content
      setSummary({
        content: content
      });
    } catch (err) {
      console.error('Error details:', err);
      setError(err.message || 'Failed to fetch match summary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Add useEffect to monitor state changes
  useEffect(() => {
    console.log('Summary state changed:', summary);
  }, [summary]);

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-6">
          <DocumentTextIcon className="w-8 h-8 text-ipl-purple mr-3" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Match Summary
          </h1>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Get detailed summaries of any IPL match from 2008 to 2024
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="team1" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Team 1
              </label>
              <select
                id="team1"
                name="team1"
                value={formData.team1}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ipl-purple dark:bg-gray-800 dark:text-white"
                required
              >
                <option value="">Select Team 1</option>
                {IPL_TEAMS.map(team => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="team2" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Team 2
              </label>
              <select
                id="team2"
                name="team2"
                value={formData.team2}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ipl-purple dark:bg-gray-800 dark:text-white"
                required
              >
                <option value="">Select Team 2</option>
                {IPL_TEAMS.map(team => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Year
              </label>
              <select
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ipl-purple dark:bg-gray-800 dark:text-white"
                required
              >
                <option value="">Select Year</option>
                {YEARS.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-ipl-purple text-white rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Generating Summary...' : 'Generate Summary'}
          </button>
        </form>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {loading && (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-ipl-purple border-t-transparent"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Generating match summary...</p>
          </div>
        )}

        {summary && summary.content && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <div className="prose dark:prose-invert max-w-none">
              {summary.content.split('\n').map((line, i) => {
                if (line.startsWith('##')) {
                  return (
                    <h2 key={i} className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-4">
                      {line.replace('##', '')}
                    </h2>
                  );
                } else if (line.startsWith('###')) {
                  return (
                    <h3 key={i} className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4 mb-2">
                      {line.replace('###', '')}
                    </h3>
                  );
                } else if (line.startsWith('-')) {
                  return (
                    <li key={i} className="text-gray-600 dark:text-gray-300 mb-2 ml-4">
                      {line.replace('-', '')}
                    </li>
                  );
                } else if (line.startsWith('**')) {
                  return (
                    <p key={i} className="text-gray-600 dark:text-gray-300 mb-4 last:mb-0 font-semibold">
                      {line.replace(/\*\*/g, '')}
                    </p>
                  );
                } else if (line.includes('won by')) {
                  return (
                    <p key={i} className="text-green-600 dark:text-green-400 font-semibold mb-4 last:mb-0">
                      {line}
                    </p>
                  );
                } else if (line.includes('Player of the Match')) {
                  return (
                    <p key={i} className="text-ipl-purple dark:text-ipl-purple font-semibold mb-4 last:mb-0">
                      {line}
                    </p>
                  );
                } else if (line.includes('Scorecard')) {
                  return (
                    <div key={i} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {line}
                      </h4>
                    </div>
                  );
                } else {
                  return (
                    <p key={i} className="text-gray-600 dark:text-gray-300 mb-4 last:mb-0">
                      {line}
                    </p>
                  );
                }
              })}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default MatchSummaryPage; 
import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserGroupIcon } from '@heroicons/react/24/outline';
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

const TeamReportPage = () => {
  const [selectedTeam, setSelectedTeam] = useState('');
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      console.log('Generating report for team:', selectedTeam);
      const response = await cricketApi.getTeamReport({ teamName: selectedTeam });
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
      
      // Set the report with the content
      setReport({
        content: content
      });
    } catch (err) {
      console.error('Error details:', err);
      setError(err.message || 'Failed to fetch team report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-6">
          <UserGroupIcon className="w-8 h-8 text-ipl-purple mr-3" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Team Report
          </h1>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Get detailed reports for any IPL team
        </p>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="max-w-md">
            <label htmlFor="team" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Team
            </label>
            <div className="flex gap-4">
              <select
                id="team"
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ipl-purple dark:bg-gray-800 dark:text-white"
                required
              >
                <option value="">Select a team</option>
                {IPL_TEAMS.map(team => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
              <button
                type="submit"
                className="px-6 py-2 bg-ipl-purple text-white rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Generating...' : 'Generate Report'}
              </button>
            </div>
          </div>
        </form>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {loading && (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-ipl-purple border-t-transparent"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Generating team report...</p>
          </div>
        )}

        {report && report.content && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <div className="prose dark:prose-invert max-w-none">
              {report.content.split('\n').map((line, i) => {
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

export default TeamReportPage; 
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MicrophoneIcon } from '@heroicons/react/24/outline';
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

const CommentaryPage = () => {
  const [selectedTeam1, setSelectedTeam1] = useState('');
  const [selectedTeam2, setSelectedTeam2] = useState('');
  const [commentary, setCommentary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      console.log('Generating commentary for teams:', selectedTeam1, 'vs', selectedTeam2);
      const response = await cricketApi.getCommentary({ 
        team1: selectedTeam1,
        team2: selectedTeam2
      });
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
      
      // Set the commentary with the content
      setCommentary({
        content: content
      });
    } catch (err) {
      console.error('Error details:', err);
      setError(err.message || 'Failed to generate commentary. Please try again.');
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
          <MicrophoneIcon className="w-8 h-8 text-ipl-purple mr-3" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Match Commentary
          </h1>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Generate live-like commentary for any IPL match
        </p>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="team1" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Team 1
              </label>
              <select
                id="team1"
                value={selectedTeam1}
                onChange={(e) => setSelectedTeam1(e.target.value)}
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
                value={selectedTeam2}
                onChange={(e) => setSelectedTeam2(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ipl-purple dark:bg-gray-800 dark:text-white"
                required
              >
                <option value="">Select Team 2</option>
                {IPL_TEAMS.map(team => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2 bg-ipl-purple text-white rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50"
            disabled={loading || !selectedTeam1 || !selectedTeam2}
          >
            {loading ? 'Generating...' : 'Generate Commentary'}
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
            <p className="mt-2 text-gray-600 dark:text-gray-300">Generating match commentary...</p>
          </div>
        )}

        {commentary && commentary.content && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <div className="prose dark:prose-invert max-w-none">
              {commentary.content.split('\n').map((line, i) => (
                <p key={i} className={`mb-4 last:mb-0 ${
                  line.includes('FOUR!') || line.includes('SIX!') 
                    ? 'text-green-600 dark:text-green-400 font-semibold' 
                    : line.includes('OUT!') || line.includes('WICKET!')
                    ? 'text-red-600 dark:text-red-400 font-semibold'
                    : 'text-gray-600 dark:text-gray-300'
                }`}>
                  {line}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default CommentaryPage; 
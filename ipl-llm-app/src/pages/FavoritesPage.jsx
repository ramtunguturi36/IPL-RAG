import { useState } from 'react';
import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/outline';

const SAMPLE_FAVORITES = {
  teams: [
    {
      id: 1,
      name: 'Mumbai Indians',
      logo: 'https://example.com/mi-logo.png',
      matchesPlayed: 247,
      titlesWon: 5,
      lastTitle: '2020',
    },
    {
      id: 2,
      name: 'Chennai Super Kings',
      logo: 'https://example.com/csk-logo.png',
      matchesPlayed: 225,
      titlesWon: 4,
      lastTitle: '2021',
    },
  ],
  players: [
    {
      id: 1,
      name: 'Virat Kohli',
      team: 'Royal Challengers Bangalore',
      role: 'Batsman',
      matches: 237,
      runs: 7263,
      highestScore: '113',
    },
    {
      id: 2,
      name: 'MS Dhoni',
      team: 'Chennai Super Kings',
      role: 'Wicketkeeper',
      matches: 250,
      runs: 5082,
      highestScore: '84*',
    },
  ],
  matches: [
    {
      id: 1,
      team1: 'Mumbai Indians',
      team2: 'Chennai Super Kings',
      date: '2023-05-06',
      venue: 'Wankhede Stadium',
      result: 'MI won by 5 wickets',
      highlights: 'Rohit Sharma scored 65 runs',
    },
    {
      id: 2,
      team1: 'Royal Challengers Bangalore',
      team2: 'Kolkata Knight Riders',
      date: '2023-04-26',
      venue: 'M. Chinnaswamy Stadium',
      result: 'RCB won by 8 runs',
      highlights: 'Virat Kohli scored 100 runs',
    },
  ],
};

const FavoritesPage = () => {
  const [activeTab, setActiveTab] = useState('teams');

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-6">
          <StarIcon className="w-8 h-8 text-ipl-purple mr-3" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Favorites
          </h1>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          View and manage your favorite teams, players, and matches
        </p>

        <div className="mb-8">
          <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
            {['teams', 'players', 'matches'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-ipl-purple text-ipl-purple'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {activeTab === 'teams' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SAMPLE_FAVORITES.teams.map((team) => (
                <div
                  key={team.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {team.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {team.matchesPlayed} matches played
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {team.titlesWon} titles
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Last title: {team.lastTitle}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'players' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SAMPLE_FAVORITES.players.map((player) => (
                <div
                  key={player.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {player.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {player.team} • {player.role}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {player.matches} matches
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {player.runs} runs
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'matches' && (
            <div className="space-y-6">
              {SAMPLE_FAVORITES.matches.map((match) => (
                <div
                  key={match.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {match.team1} vs {match.team2}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {match.date} • {match.venue}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-sm font-medium">
                      {match.result}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Highlights: {match.highlights}
                  </p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FavoritesPage; 
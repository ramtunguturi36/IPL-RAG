import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChartBarIcon } from '@heroicons/react/24/outline';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const STATS_CATEGORIES = [
  'Batting',
  'Bowling',
  'Fielding',
  'Team Records',
  'Season Records'
];

const SAMPLE_STATS = {
  batting: [
    { name: 'Most Runs', value: 'Virat Kohli (7263)', year: '2008-2023' },
    { name: 'Highest Score', value: 'Chris Gayle (175*)', year: '2013' },
    { name: 'Most Centuries', value: 'Virat Kohli (7)', year: '2008-2023' },
    { name: 'Most Fifties', value: 'David Warner (61)', year: '2008-2023' },
    { name: 'Most Sixes', value: 'Chris Gayle (357)', year: '2008-2023' },
  ],
  bowling: [
    { name: 'Most Wickets', value: 'Dwayne Bravo (183)', year: '2008-2023' },
    { name: 'Best Bowling', value: 'Alzarri Joseph (6/12)', year: '2019' },
    { name: 'Most 4-Wicket Hauls', value: 'Lasith Malinga (7)', year: '2008-2023' },
    { name: 'Most Maidens', value: 'Praveen Kumar (14)', year: '2008-2023' },
    { name: 'Best Economy', value: 'Rashid Khan (6.33)', year: '2008-2023' },
  ],
  fielding: [
    { name: 'Most Catches', value: 'Suresh Raina (109)', year: '2008-2023' },
    { name: 'Most Dismissals (WK)', value: 'MS Dhoni (170)', year: '2008-2023' },
    { name: 'Most Run Outs', value: 'Ravindra Jadeja (24)', year: '2008-2023' },
  ],
  team: [
    { name: 'Most Titles', value: 'Mumbai Indians (5)', year: '2008-2023' },
    { name: 'Highest Total', value: 'Royal Challengers Bangalore (263/5)', year: '2013' },
    { name: 'Lowest Total', value: 'Royal Challengers Bangalore (49)', year: '2017' },
    { name: 'Most Wins', value: 'Mumbai Indians (138)', year: '2008-2023' },
    { name: 'Longest Winning Streak', value: 'Kolkata Knight Riders (10)', year: '2014-2015' },
  ],
  season: [
    { name: 'Most Runs in Season', value: 'Virat Kohli (973)', year: '2016' },
    { name: 'Most Wickets in Season', value: 'Dwayne Bravo (32)', year: '2013' },
    { name: 'Most Sixes in Season', value: 'Andre Russell (52)', year: '2019' },
    { name: 'Most Catches in Season', value: 'Kieron Pollard (15)', year: '2019' },
    { name: 'Highest Team Total', value: 'Royal Challengers Bangalore (263/5)', year: '2013' },
  ]
};

const StatsBoxPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Batting');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-6">
          <ChartBarIcon className="w-8 h-8 text-ipl-purple mr-3" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            IPL Stats Box
          </h1>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Explore key statistics and records from IPL history
        </p>

        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {STATS_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? 'bg-ipl-purple text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {selectedCategory} Records
            </h2>
            <div className="space-y-4">
              {SAMPLE_STATS[selectedCategory.toLowerCase().replace(' ', '')].map((stat, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{stat.name}</p>
                      <p className="font-medium text-gray-900 dark:text-white">{stat.value}</p>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {stat.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Performance Trends
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { year: '2019', value: 450 },
                    { year: '2020', value: 500 },
                    { year: '2021', value: 400 },
                    { year: '2022', value: 600 },
                    { year: '2023', value: 550 },
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" name="Performance" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default StatsBoxPage; 
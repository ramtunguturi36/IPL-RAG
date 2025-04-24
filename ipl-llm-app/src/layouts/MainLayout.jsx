import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  HomeIcon, 
  ChatBubbleLeftIcon, 
  DocumentTextIcon, 
  UserGroupIcon, 
  UserIcon, 
  SpeakerWaveIcon, 
  ChartBarIcon, 
  StarIcon,
  BellIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  console.log('MainLayout user:', user);
  console.log('LocalStorage user:', localStorage.getItem('user'));

  const navItems = [
    { name: 'Home', icon: HomeIcon, path: '/dashboard' },
    { name: 'Chatbot', icon: ChatBubbleLeftIcon, path: '/dashboard/chatbot' },
    { name: 'Match Summary', icon: DocumentTextIcon, path: '/dashboard/match-summary' },
    { name: 'Team Report', icon: UserGroupIcon, path: '/dashboard/team-report' },
    { name: 'Player Report', icon: UserIcon, path: '/dashboard/player-report' },
    { name: 'Commentary', icon: SpeakerWaveIcon, path: '/dashboard/commentary' },
    { name: 'Stats Box', icon: ChartBarIcon, path: '/dashboard/stats' },
    { name: 'Favorites', icon: StarIcon, path: '/dashboard/favorites' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div 
        className={`${isSidebarOpen ? 'w-64' : 'w-20'} 
          bg-gradient-to-b from-ipl-purple to-ipl-blue 
          text-white transition-all duration-300
          shadow-lg flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-ipl-gold to-yellow-400 bg-clip-text text-transparent">
            IPL LLM
          </h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <nav className="mt-8 space-y-1 px-2 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200
                ${location.pathname === item.path 
                  ? 'bg-white text-ipl-purple font-semibold shadow-lg' 
                  : 'text-gray-200 hover:bg-white/20 hover:text-white'
                }`}
            >
              <item.icon className={`w-6 h-6 ${location.pathname === item.path ? 'text-ipl-purple' : 'text-gray-200'}`} />
              {isSidebarOpen && <span className="ml-3">{item.name}</span>}
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10">
          <div className="space-y-2">
            <Link
              to="/dashboard/settings"
              className="flex items-center px-4 py-2 text-gray-200 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Cog6ToothIcon className="w-5 h-5" />
              {isSidebarOpen && <span className="ml-3">Settings</span>}
            </Link>
            <Link
              to="/dashboard/help"
              className="flex items-center px-4 py-2 text-gray-200 hover:bg-white/10 rounded-lg transition-colors"
            >
              <QuestionMarkCircleIcon className="w-5 h-5" />
              {isSidebarOpen && <span className="ml-3">Help & Support</span>}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search matches, players, teams..."
                  className="w-96 px-4 py-2 rounded-lg border border-gray-200 
                    focus:outline-none focus:ring-2 focus:ring-ipl-purple focus:border-transparent
                    dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute right-3 top-3" />
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <button className="relative p-2 text-gray-600 hover:text-ipl-purple 
                dark:text-gray-300 dark:hover:text-white transition-colors">
                <BellIcon className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="relative">
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-3 focus:outline-none"
                >
                  <img
                    src="/OIP.jpg"
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-ipl-purple object-cover"
                  />
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user?.name || 'Guest User'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user?.favoriteTeam ? `Supports ${user.favoriteTeam}` : 'IPL Fan'}
                    </p>
                  </div>
                </button>

                {/* Profile Dropdown Menu */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50">
                    <Link
                      to="/dashboard/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Your Profile
                    </Link>
                    <Link
                      to="/dashboard/settings"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                    >
                      <ArrowLeftOnRectangleIcon className="w-4 h-4 mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 shadow-sm py-4 px-6">
          <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
            <div>
              © 2024 IPL LLM. All rights reserved.
            </div>
            <div className="flex space-x-4">
              <Link to="/terms" className="hover:text-ipl-purple">Terms</Link>
              <Link to="/privacy" className="hover:text-ipl-purple">Privacy</Link>
              <Link to="/contact" className="hover:text-ipl-purple">Contact</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout; 
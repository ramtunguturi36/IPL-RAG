import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import {
  UserCircleIcon,
  PencilIcon,
  CameraIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

const ProfilePage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    favoriteTeam: user?.favoriteTeam || '',
    bio: user?.bio || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement profile update logic
    setIsEditing(false);
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Profile Header */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-ipl-purple/20 to-ipl-blue/20 rounded-2xl blur-2xl"></div>
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <img
                    src="/OIP.jpg"
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-ipl-purple object-cover"
                  />
                  <button className="absolute bottom-0 right-0 p-2 bg-ipl-purple rounded-full text-white hover:bg-ipl-blue transition-colors">
                    <CameraIcon className="w-5 h-5" />
                  </button>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-transparent border-b-2 border-ipl-purple focus:outline-none"
                      />
                    ) : (
                      formData.name
                    )}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    IPL Fan since 2024
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-2 px-4 py-2 bg-ipl-purple text-white rounded-lg hover:bg-ipl-blue transition-colors"
              >
                <PencilIcon className="w-5 h-5" />
                <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Personal Information
            </h2>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <EnvelopeIcon className="w-6 h-6 text-ipl-purple" />
                <div className="flex-1">
                  <label className="text-sm text-gray-500 dark:text-gray-400">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b-2 border-ipl-purple focus:outline-none"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white">{formData.email}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <PhoneIcon className="w-6 h-6 text-ipl-purple" />
                <div className="flex-1">
                  <label className="text-sm text-gray-500 dark:text-gray-400">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b-2 border-ipl-purple focus:outline-none"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white">{formData.phone || 'Not provided'}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <MapPinIcon className="w-6 h-6 text-ipl-purple" />
                <div className="flex-1">
                  <label className="text-sm text-gray-500 dark:text-gray-400">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b-2 border-ipl-purple focus:outline-none"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white">{formData.location || 'Not provided'}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <CalendarIcon className="w-6 h-6 text-ipl-purple" />
                <div className="flex-1">
                  <label className="text-sm text-gray-500 dark:text-gray-400">Member Since</label>
                  <p className="text-gray-900 dark:text-white">April 2024</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Favorite Team */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Favorite Team
            </h2>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-ipl-purple/10 rounded-lg flex items-center justify-center">
                <UserGroupIcon className="w-8 h-8 text-ipl-purple" />
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <select
                    name="favoriteTeam"
                    value={formData.favoriteTeam}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b-2 border-ipl-purple focus:outline-none"
                  >
                    <option value="">Select Team</option>
                    <option value="Mumbai Indians">Mumbai Indians</option>
                    <option value="Chennai Super Kings">Chennai Super Kings</option>
                    <option value="Royal Challengers Bangalore">Royal Challengers Bangalore</option>
                    <option value="Kolkata Knight Riders">Kolkata Knight Riders</option>
                    <option value="Delhi Capitals">Delhi Capitals</option>
                    <option value="Punjab Kings">Punjab Kings</option>
                    <option value="Rajasthan Royals">Rajasthan Royals</option>
                    <option value="Sunrisers Hyderabad">Sunrisers Hyderabad</option>
                    <option value="Lucknow Super Giants">Lucknow Super Giants</option>
                    <option value="Gujarat Titans">Gujarat Titans</option>
                  </select>
                ) : (
                  <p className="text-gray-900 dark:text-white">{formData.favoriteTeam || 'Not selected'}</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              About Me
            </h2>
            {isEditing ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full h-32 bg-transparent border-2 border-ipl-purple rounded-lg p-4 focus:outline-none"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-gray-600 dark:text-gray-300">
                {formData.bio || 'No bio provided yet.'}
              </p>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage; 
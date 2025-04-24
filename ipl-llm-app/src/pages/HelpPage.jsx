import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  QuestionMarkCircleIcon,
  ChatBubbleLeftIcon,
  EnvelopeIcon,
  PhoneIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

const HelpPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: 'How do I get match summaries?',
      answer: 'You can access match summaries by clicking on the "Match Summary" option in the sidebar. Select the match you want to view from the list of available matches.'
    },
    {
      question: 'Can I customize my notifications?',
      answer: 'Yes, you can customize your notifications in the Settings page. You can choose to receive alerts for specific matches, teams, or players.'
    },
    {
      question: 'How accurate are the statistics?',
      answer: 'Our statistics are sourced from official IPL data and are updated in real-time during matches. We ensure the highest level of accuracy in all our data.'
    },
    {
      question: 'Can I save my favorite teams and players?',
      answer: 'Yes, you can save your favorite teams and players in the "Favorites" section. This will help you quickly access their information and receive updates about them.'
    },
    {
      question: 'How do I contact support?',
      answer: 'You can contact our support team through the contact form below, or reach out to us via email or phone. Our support team is available 24/7 during the IPL season.'
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-6">
          <QuestionMarkCircleIcon className="w-8 h-8 text-ipl-purple mr-3" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Help & Support
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* FAQs Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <span className="font-medium text-gray-900 dark:text-white">
                      {faq.question}
                    </span>
                    <ChevronDownIcon
                      className={`w-5 h-5 text-gray-500 transform transition-transform ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="p-4 bg-gray-50 dark:bg-gray-700">
                      <p className="text-gray-600 dark:text-gray-300">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Contact Us
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-ipl-purple/10 rounded-full">
                    <ChatBubbleLeftIcon className="w-5 h-5 text-ipl-purple" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Live Chat
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Available 24/7 during IPL season
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-ipl-purple/10 rounded-full">
                    <EnvelopeIcon className="w-5 h-5 text-ipl-purple" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Email Support
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      support@iplllm.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-ipl-purple/10 rounded-full">
                    <PhoneIcon className="w-5 h-5 text-ipl-purple" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Phone Support
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      +91 1234567890
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Send us a Message
              </h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ipl-purple focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Enter your subject"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-ipl-purple focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Enter your message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-ipl-purple text-white py-2 px-4 rounded-md hover:bg-ipl-blue transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HelpPage; 
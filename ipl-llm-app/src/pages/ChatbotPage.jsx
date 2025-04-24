import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { cricketApi } from '../services/apiService';

const ChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      console.log('Sending message:', input);
      const response = await cricketApi.chat(input);
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
      
      const botMessage = { text: content, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error('Error details:', err);
      setError(err.message || 'Failed to get response. Please try again.');
      const errorMessage = { text: 'Sorry, I encountered an error. Please try again.', sender: 'bot' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex flex-col"
      >
        <div className="flex items-center mb-6">
          <ChatBubbleLeftIcon className="w-8 h-8 text-ipl-purple mr-3" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            IPL Chatbot
          </h1>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Ask me anything about IPL matches, players, teams, or statistics
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              Start a conversation by typing a message below
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.sender === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-ipl-purple text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  {message.sender === 'bot' ? (
                    <div className="prose dark:prose-invert max-w-none">
                      {message.text.split('\n').map((line, i) => (
                        <p key={i} className="mb-2 last:mb-0">
                          {line}
                        </p>
                      ))}
                    </div>
                  ) : (
                    message.text
                  )}
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="text-center py-4">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-ipl-purple border-t-transparent"></div>
              <p className="mt-2 text-gray-600 dark:text-gray-300">Thinking...</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-ipl-purple dark:bg-gray-800 dark:text-white"
              disabled={loading}
            />
            <button
              type="submit"
              className="px-6 py-2 bg-ipl-purple text-white rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50"
              disabled={loading || !input.trim()}
            >
              Send
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ChatbotPage; 
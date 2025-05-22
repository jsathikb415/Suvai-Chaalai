import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Trophy, Loader } from 'lucide-react';
import GameCard from '../components/game/GameCard';
import { Game } from '../types';
import { getAllGames } from '../services/gameService';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const GamesPage: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  
  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const allGames = await getAllGames();
        setGames(allGames);
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchGames();
  }, []);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
          Fun Mini-Games
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Play games and earn discount coupons to reduce your food order bill
        </p>
      </motion.div>
      
      {!currentUser && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-md"
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <Trophy className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                You need to be logged in to play games and earn coupons.{' '}
                <Link to="/login" className="font-medium text-yellow-700 underline">
                  Sign in
                </Link>{' '}
                or{' '}
                <Link to="/signup" className="font-medium text-yellow-700 underline">
                  create an account
                </Link>{' '}
                to start playing.
              </p>
            </div>
          </div>
        </motion.div>
      )}
      
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg overflow-hidden shadow-xl mb-12">
        <div className="relative p-8 md:p-12">
          <div className="absolute right-0 bottom-0 opacity-10">
            <Gamepad2 size={180} />
          </div>
          
          <div className="max-w-3xl relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              How It Works
            </h2>
            <ul className="text-white space-y-3">
              <li className="flex items-start">
                <span className="bg-white text-primary-600 rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm mr-2 mt-0.5">1</span>
                <span>Play any of our fun mini-games</span>
              </li>
              <li className="flex items-start">
                <span className="bg-white text-primary-600 rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm mr-2 mt-0.5">2</span>
                <span>Earn points based on your performance</span>
              </li>
              <li className="flex items-start">
                <span className="bg-white text-primary-600 rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm mr-2 mt-0.5">3</span>
                <span>Get discount coupons - higher scores mean bigger discounts!</span>
              </li>
              <li className="flex items-start">
                <span className="bg-white text-primary-600 rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm mr-2 mt-0.5">4</span>
                <span>Apply your coupons during checkout to save money</span>
              </li>
            </ul>
            
            {currentUser ? (
              <Button
                variant="secondary"
                size="lg"
                className="mt-6"
              >
                Start Playing Now
              </Button>
            ) : (
              <Link to="/login">
                <Button
                  variant="secondary"
                  size="lg"
                  className="mt-6"
                >
                  Sign In to Play
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader size={40} className="animate-spin text-primary-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GameCard game={game} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GamesPage;
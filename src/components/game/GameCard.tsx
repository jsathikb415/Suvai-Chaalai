import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Game } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const navigate = useNavigate();
  
  return (
    <Card className="overflow-hidden" hover>
      <div className="relative">
        <img 
          src={game.imageUrl}
          alt={game.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          Up to {game.maxReward}% OFF
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{game.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{game.description}</p>
        
        <Button
          variant="primary"
          fullWidth
          onClick={() => navigate(`/games/${game.id}`)}
        >
          Play Now
        </Button>
      </div>
    </Card>
  );
};

export default GameCard;
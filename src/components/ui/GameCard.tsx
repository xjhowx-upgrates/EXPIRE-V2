import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Clock, Award } from 'lucide-react';

interface GameCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  minutos?: number;
}

const GameCard: React.FC<GameCardProps> = ({
  id,
  title,
  description,
  image,
  category,
  minutos
}) => {
  const navigate = useNavigate();

  // Tradução das categorias
  const translateCategory = (category: string) => {
    const categories: {[key: string]: string} = {
      'slots': 'Slots',
      'crash': 'Crash',
      'table': 'Mesa',
      'card': 'Cartas',
      'lottery': 'Loteria',
      'dice': 'Dados'
    };
    
    return categories[category.toLowerCase()] || category;
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://via.placeholder.com/400x200?text=Jogo";
          }}
        />
        <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          {translateCategory(category)}
        </div>
      </div>
      
      <div className="p-5 flex-grow">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 text-sm">{description}</p>
        
        {minutos !== undefined && (
          <div className="flex items-center text-gray-500 text-sm mb-3">
            <Clock className="w-4 h-4 mr-1" />
            <span>{minutos} minutos disponíveis</span>
          </div>
        )}
        
        <div className="flex items-center text-gray-500 text-sm">
          <Award className="w-4 h-4 mr-1" />
          <span>Conquistas disponíveis</span>
        </div>
      </div>
      
      <div className="px-5 pb-5">
        <button
          onClick={() => navigate(`/game/${id}`)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center"
        >
          <Play className="w-4 h-4 mr-2" />
          Jogar Agora
        </button>
      </div>
    </div>
  );
};

export default GameCard;
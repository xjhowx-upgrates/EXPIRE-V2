import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Trophy, Users, Sparkles, Timer, Shield, Zap } from 'lucide-react';
import GameCard from '../components/ui/GameCard';
import slotGames from '../data/slotGames';
import { useAuth } from '../hooks/useAuth';
import { useTime } from '../contexts/TimeContext';
import Logo from '../components/ui/Logo';

const Home: React.FC = () => {
  const { currentUser } = useAuth();
  const { availableMinutes } = useTime();
  const navigate = useNavigate();
  const [featuredGames, setFeaturedGames] = useState<any[]>([]);

  useEffect(() => {
    const randomGames = [...slotGames].sort(() => 0.5 - Math.random()).slice(0, 3);
    setFeaturedGames(randomGames);
  }, []);

  const features = [
    {
      icon: <Timer className="w-12 h-12 text-blue-500 dark:text-blue-400" />,
      title: 'Aposte Tempo, Não Dinheiro',
      description: 'Uma experiência única onde você investe minutos do seu tempo em vez de dinheiro real.'
    },
    {
      icon: <Shield className="w-12 h-12 text-green-500 dark:text-green-400" />,
      title: 'Sem Riscos Financeiros',
      description: 'Divirta-se sem preocupações! Não há risco de perder dinheiro, apenas tempo de diversão.'
    },
    {
      icon: <Trophy className="w-12 h-12 text-yellow-500 dark:text-yellow-400" />,
      title: 'Conquistas & Rankings',
      description: 'Desbloqueie conquistas exclusivas e compete com outros jogadores na classificação.'
    },
    {
      icon: <Zap className="w-12 h-12 text-purple-500 dark:text-purple-400" />,
      title: 'Recarga Automática',
      description: 'Ganhe minutos automaticamente a cada hora para continuar jogando.'
    }
  ];

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="mb-8">
            <Logo size="lg" className="justify-center mb-6" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Aposte <span className="text-yellow-400">Tempo</span>,<br />
            Não <span className="text-red-400 line-through">Dinheiro</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed">
            Uma plataforma revolucionária onde você investe minutos do seu tempo em jogos emocionantes, 
            mantendo toda a diversão sem os riscos financeiros.
          </p>

          {currentUser && (
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto mb-8">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Clock className="w-6 h-6 text-yellow-400" />
                <span className="text-2xl font-bold text-yellow-400">
                  {formatTime(availableMinutes)}
                </span>
              </div>
              <p className="text-white text-opacity-90">disponíveis para jogar</p>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => navigate('/games')} 
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-xl transition duration-300 text-lg shadow-lg transform hover:scale-105"
            >
              🎮 Começar a Jogar
            </button>
            {!currentUser && (
              <button 
                onClick={() => navigate('/register')} 
                className="bg-transparent hover:bg-white hover:bg-opacity-20 text-white border-2 border-white font-bold py-4 px-8 rounded-xl transition duration-300 text-lg backdrop-blur-sm"
              >
                ⏰ Criar Conta Grátis
              </button>
            )}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Como Funciona o EXPIRE?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Uma nova forma de jogar que prioriza diversão e responsabilidade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center group hover:scale-105">
                <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Games */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              🎯 Jogos em Destaque
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Experimente nossos jogos mais populares
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredGames.map((game) => (
              <GameCard
                key={game.id}
                id={game.id}
                title={game.title}
                description={game.description}
                image={game.image}
                category={game.category}
                minutos={game.category === 'slots' ? 5 : game.category === 'crash' ? 3 : 4}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button 
              onClick={() => navigate('/games')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition duration-300 text-lg shadow-lg transform hover:scale-105"
            >
              🎮 Ver Todos os Jogos
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                0€
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-400">Custo para Jogar</p>
            </div>
            <div className="p-8">
              <div className="text-4xl md:text-5xl font-bold text-green-600 dark:text-green-400 mb-2">
                100%
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-400">Seguro e Divertido</p>
            </div>
            <div className="p-8">
              <div className="text-4xl md:text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                24/7
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-400">Disponível Sempre</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            ⏰ Pronto para uma Nova Experiência?
          </h2>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
            Junte-se à revolução dos jogos baseados em tempo. Diversão garantida, riscos zero!
          </p>
          <button 
            onClick={() => navigate(currentUser ? '/games' : '/register')} 
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-10 rounded-xl transition duration-300 text-xl shadow-lg transform hover:scale-105"
          >
            {currentUser ? '🎮 Jogar Agora' : '🚀 Começar Grátis'}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
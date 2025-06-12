interface SlotGame {
  id: string;
  title: string;
  titlePt: string;
  description: string;
  descriptionPt: string;
  image: string;
  category: string;
  provider: string;
  rtp: number;
  volatility: 'low' | 'medium' | 'high';
  minBet: number;
  maxBet: number;
  features: string[];
  featuresPt: string[];
}

const slotGames: SlotGame[] = [
  {
    id: 'fortune-tiger',
    title: 'Fortune Tiger',
    titlePt: 'Tigre da Fortuna',
    description: 'Join the mighty tiger on a journey to wealth in this Asian-themed slot game.',
    descriptionPt: 'Junte-se ao poderoso tigre em uma jornada para a riqueza neste jogo de caça-níqueis com tema asiático.',
    image: 'https://via.placeholder.com/400x200?text=Fortune+Tiger',
    category: 'slots',
    provider: 'PG Soft',
    rtp: 96.8,
    volatility: 'high',
    minBet: 0.20,
    maxBet: 100,
    features: ['Wild Symbols', 'Free Spins', 'Multipliers'],
    featuresPt: ['Símbolos Curinga', 'Giros Grátis', 'Multiplicadores']
  },
  {
    id: 'crash',
    title: 'Crash',
    titlePt: 'Crash',
    description: 'Watch the multiplier rise and cash out before it crashes in this thrilling game of risk and reward.',
    descriptionPt: 'Veja o multiplicador subir e saque antes que ele caia neste emocionante jogo de risco e recompensa.',
    image: 'https://via.placeholder.com/400x200?text=Crash',
    category: 'crash',
    provider: 'EXPIRE Games',
    rtp: 97.3,
    volatility: 'high',
    minBet: 1,
    maxBet: 1000,
    features: ['Live Multipliers', 'Auto Cash-Out', 'Game History'],
    featuresPt: ['Multiplicadores ao Vivo', 'Saque Automático', 'Histórico de Jogos']
  },
  {
    id: 'roulette',
    title: 'Roulette',
    titlePt: 'Roleta',
    description: 'Experience the classic casino game with multiple betting options and strategies.',
    descriptionPt: 'Experimente o clássico jogo de cassino com múltiplas opções de apostas e estratégias.',
    image: 'https://via.placeholder.com/400x200?text=Roulette',
    category: 'table',
    provider: 'EXPIRE Games',
    rtp: 97.3,
    volatility: 'medium',
    minBet: 1,
    maxBet: 500,
    features: ['European Wheel', 'Betting Table', 'Statistics'],
    featuresPt: ['Roleta Europeia', 'Mesa de Apostas', 'Estatísticas']
  },
  {
    id: 'sweet-bonanza',
    title: 'Sweet Bonanza',
    titlePt: 'Doce Bonança',
    description: 'Indulge in this candy-themed slot with cascading wins and multiplier free spins.',
    descriptionPt: 'Delicie-se neste caça-níqueis com tema de doces, com vitórias em cascata e giros grátis multiplicadores.',
    image: 'https://via.placeholder.com/400x200?text=Sweet+Bonanza',
    category: 'slots',
    provider: 'Pragmatic Play',
    rtp: 96.5,
    volatility: 'high',
    minBet: 0.20,
    maxBet: 125,
    features: ['Tumbling Reels', 'Scatter Pays', 'Free Spins'],
    featuresPt: ['Rolos em Cascata', 'Pagamentos de Scatter', 'Giros Grátis']
  },
  {
    id: 'mines',
    title: 'Mines',
    titlePt: 'Minas',
    description: 'Clear the field without hitting any mines in this nerve-wracking game of chance.',
    descriptionPt: 'Limpe o campo sem atingir nenhuma mina neste emocionante jogo de sorte.',
    image: 'https://via.placeholder.com/400x200?text=Mines',
    category: 'dice',
    provider: 'EXPIRE Games',
    rtp: 97,
    volatility: 'high',
    minBet: 0.1,
    maxBet: 100,
    features: ['Adjustable Grid Size', 'Adjustable Mine Count', 'Auto Bet'],
    featuresPt: ['Tamanho de Grade Ajustável', 'Contagem de Minas Ajustável', 'Aposta Automática']
  },
  {
    id: 'blackjack',
    title: 'Blackjack',
    titlePt: 'Vinte e Um',
    description: 'Beat the dealer with a better hand in this classic card game of skill and chance.',
    descriptionPt: 'Vença o dealer com uma mão melhor neste clássico jogo de cartas de habilidade e sorte.',
    image: 'https://via.placeholder.com/400x200?text=Blackjack',
    category: 'card',
    provider: 'EXPIRE Games',
    rtp: 99.5,
    volatility: 'low',
    minBet: 5,
    maxBet: 1000,
    features: ['Multi-Hand', 'Insurance', 'Double Down'],
    featuresPt: ['Múltiplas Mãos', 'Seguro', 'Dobrar Aposta']
  }
];

export default slotGames;
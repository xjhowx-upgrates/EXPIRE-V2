import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Instagram, Twitter } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Footer: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <footer className="bg-gray-900 text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4">EXPIRE</h3>
            <p className="text-gray-400 text-sm">
              A melhor plataforma de jogos online com experiências incríveis e prêmios exclusivos.
            </p>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition duration-300">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/games" className="text-gray-400 hover:text-white transition duration-300">
                  Jogos
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-gray-400 hover:text-white transition duration-300">
                  Classificação
                </Link>
              </li>
              <li>
                <Link to="/achievements" className="text-gray-400 hover:text-white transition duration-300">
                  Conquistas
                </Link>
              </li>
              {!currentUser && (
                <li>
                  <Link to="/login" className="text-gray-400 hover:text-white transition duration-300">
                    Entrar
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition duration-300">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition duration-300">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition duration-300">
                  Sobre Nós
                </Link>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-4">Siga-nos</h4>
            <div className="flex space-x-4">
              <a href="https://github.com/xjhowx" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
                <Github size={20} />
              </a>
              <a href="https://twitter.com/xjhowx" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com/xjhowx" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} EXPIRE. Todos os direitos reservados.
          </p>
          <p className="text-gray-400 text-sm flex items-center">
            <span className="mr-1">Desenvolvido com ❤️ por</span>
            <a 
              href="https://github.com/xjhowx" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium text-blue-400 hover:text-blue-300 transition duration-300"
            >
              @xjhowx
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
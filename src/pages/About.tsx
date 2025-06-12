import React from 'react';
import { Shield, Sparkles, Clock, Users, Github } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12">Sobre o EXPIRE</h1>
          
          {/* Introdução */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-10">
            <h2 className="text-2xl font-semibold mb-4">Nossa Missão</h2>
            <p className="text-gray-700 mb-6">
              A EXPIRE foi criada com uma missão simples: revolucionar a forma como as pessoas experimentam jogos online, 
              trazendo uma combinação única de diversão limitada por tempo e jogabilidade envolvente.
            </p>
            <p className="text-gray-700">
              Nossa plataforma é projetada para oferecer jogos emocionantes e desafiadores que testam suas habilidades 
              e estratégia, tudo dentro de um ambiente seguro e transparente. Acreditamos que os melhores momentos 
              são aqueles que sabemos aproveitar enquanto duram.
            </p>
          </section>
          
          {/* Valores */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-10">
            <h2 className="text-2xl font-semibold mb-6">Nossos Valores</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Segurança</h3>
                  <p className="text-gray-600">
                    Priorizamos a proteção dos seus dados e garantimos um ambiente de jogo seguro.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Inovação</h3>
                  <p className="text-gray-600">
                    Estamos constantemente evoluindo nossa plataforma e criando novos jogos empolgantes.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Experiência Única</h3>
                  <p className="text-gray-600">
                    Nossa abordagem baseada em tempo cria uma experiência de jogo única e viciante.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Comunidade</h3>
                  <p className="text-gray-600">
                    Construímos uma comunidade vibrante de jogadores com interesses semelhantes.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Nossa História */}
          <section className="bg-white rounded-lg shadow-md p-8 mb-10">
            <h2 className="text-2xl font-semibold mb-4">Nossa História</h2>
            <p className="text-gray-700 mb-4">
              A EXPIRE nasceu da paixão por jogos e tecnologia. Fundada em 2023, nossa equipe de desenvolvedores 
              e entusiastas de jogos se uniu com o objetivo de criar uma plataforma que mudasse a forma como 
              as pessoas jogam online.
            </p>
            <p className="text-gray-700 mb-4">
              Percebemos que muitas plataformas de jogos focavam apenas em mecânicas simples e recompensas aleatórias. 
              Queríamos algo diferente – jogos que recompensassem habilidade, estratégia e tempo de jogo inteligente.
            </p>
            <p className="text-gray-700">
              Hoje, a EXPIRE é uma comunidade crescente de jogadores que apreciam nosso conceito único 
              e continuam nos ajudando a melhorar e expandir nossa plataforma a cada dia.
            </p>
          </section>
          
          {/* Equipe */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-6">Desenvolvido Por</h2>
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full mb-4 overflow-hidden">
                <img 
                  src="https://github.com/xjhowx.png" 
                  alt="Developer" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/150?text=Dev";
                  }}
                />
              </div>
              <h3 className="text-xl font-medium">@xjhowx</h3>
              <p className="text-gray-600 mb-4">Desenvolvedor Full Stack</p>
              <a 
                href="https://github.com/xjhowx" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center text-blue-600 hover:text-blue-800 transition duration-300"
              >
                <Github className="w-5 h-5 mr-2" />
                github.com/xjhowx
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
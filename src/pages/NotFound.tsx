import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
        
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Página Não Encontrada</h2>
          <p className="text-gray-600">
            Parece que você encontrou um bug no sistema. A página que você está procurando não existe ou foi movida.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center w-full px-5 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300"
          >
            <Home className="mr-2 h-5 w-5" />
            Voltar para Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center w-full px-5 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition duration-300"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Voltar para a Página Anterior
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
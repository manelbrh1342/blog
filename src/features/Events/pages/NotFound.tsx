 import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="container">
      <div className="error-page">
        <h1>404</h1>
        <p>La page que vous recherchez n'existe pas.</p>
        <Link to="/" className="btn">Retour à l'accueil</Link>
      </div>
    </div>
  );
};

export default NotFound;
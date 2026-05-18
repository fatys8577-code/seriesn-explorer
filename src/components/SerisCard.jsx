import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavorisContext } from '../context/FavorisContext';
import StarRating from './StarRating';

const SerieCard = ({ serie }) => {
  if (!serie) return null;

  const { favoris, ajouterFavori, estFavori } = useContext(FavorisContext);

  const isFavori = estFavori ? estFavori(serie.id) : false;

  return (
    <div className="serie-card">
      <div className="card-image-container">
        <img src={serie.image} alt={serie.titre} className="card-image" />
        
        {serie.enCours && <span className="badge-encours">En cours</span>}
        
        <button 
          className="fav-badge" 
          onClick={() => ajouterFavori(serie)}
          aria-label="Ajouter aux favoris"
        >
          {isFavori ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="card-content">
        <h3 className="card-title">{serie.titre}</h3>
        
        <div className="card-meta">
          <span className="card-chaine">{serie.chaine}</span>
          <span className="card-annee">{serie.annee}</span>
        </div>

        <div className="card-rating">
          <StarRating rating={serie.note} /> <span>{serie.note}</span>
        </div>

        <div className="card-genres">
          {serie?.genre?.map((g, index) => (
            <span key={index} className="genre-tag">{g}</span>
          ))}
        </div>

        <Link to={`/serie/${serie.id}`} className="btn-details">
          Voir les détails
        </Link>
      </div>
    </div>
  );
};

export default SerieCard;
import React from 'react';
import './SeasonCard.css';

interface SeasonCardProps {
  title: string;
  description: string;
  image?: string;
}

const SeasonCard: React.FC<SeasonCardProps> = ({ title, description, image }) => {
  return (
    <div className="season-card" tabIndex={0} role="button" aria-label={`Temporada: ${title}`}>
      {image && <img src={image} alt={title} className="season-card-image" />}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default SeasonCard;

import React from 'react';
import card from './ArtistCard.module.css';

const ArtistCard = ({name, genre, image}) => {
    return (
        <li className={card.content}>
            <img className={card.img} src={image} alt={name}/>
            <p className={card.title}>{name}</p>
            <p className={card.genre}>{genre}</p>
        </li>
    );
};

export default ArtistCard;
import React from 'react';
import card from './SearchArtistCard.module.css';

const SearchArtistCard = ({name, countListeners, image}) => {
    return (
        <li className={card.content}>
            <img className={card.cover} src={image} alt={name}/>
            <div className={card.info}>
                <p className={card.name}>{name}</p>
                <p>{countListeners} listeners</p>
            </div>
        </li>
    );
};

export default SearchArtistCard;
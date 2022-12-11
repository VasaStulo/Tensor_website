import React from 'react';
import card from './SearchTrackCard.module.css';

const SearchTrackCard = ({trackTitle, name, image, duration}) => {
    return (
        <li className={card.content}>
            <img className={card.cover} src={image} alt={trackTitle}/>
            <p className={card.title}>{trackTitle}</p>
            <p>{name}</p>
            <p>{duration}</p>
        </li>
    );
};

export default SearchTrackCard;
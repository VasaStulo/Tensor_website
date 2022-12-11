import React from 'react';
import card from './SearchAlbumCard.module.css';

const SearchAlbumCard = ({albumTitle, name, image}) => {
    return (
        <li className={card.content}>
            <img className={card.cover} src={image} alt={albumTitle}/>
            <div className={card.info}>
                <p className={card.title}>{albumTitle}</p>
                <p>{name}</p>
            </div>
        </li>
    );
};

export default SearchAlbumCard;
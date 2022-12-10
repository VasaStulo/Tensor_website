import React from 'react';
import artists from "./Artists.module.css";
import ArtistCard from "../ArtistCard/ArtistCard";

const ArtistsList = ({artistsList}) => {

    if (!artistsList.length) {
        return (
            <h2 style={{textAlign: 'center', marginTop: '20px'}}>
                is empty here :(
            </h2>
        )
    }
    return (
        <div className={artists.content}>
            <ul className={artists.list}>
                {artistsList.map((artist) =>
                    <ArtistCard
                        key={artist.name}
                        name={artist.name}
                        genre={artist.genre}
                        image={artist.image}/>
                )}
            </ul>
        </div>
    );
};

export default ArtistsList;
import React from 'react';
import TrackCard from "../TrackCard/TrackCard";
import tracks from "../../pages/Main/styles/Tracks.module.css";

const TracksList = ({tracksList, isLoading}) => {

    if (!tracksList.length && !isLoading) {
        return (
            <h2 style={{textAlign: 'center', marginTop: '20px'}}>
                is empty here :(
            </h2>
        )
    }

    return (
        <ul className={tracks.list}>
            {tracksList.map((artist) =>
                <TrackCard
                    key={artist.name}
                    trackTitle={artist.trackTitle}
                    artist={artist.artist}
                    genre={artist.genre}
                    image={artist.image}/>
            )}
        </ul>
    );
};

export default TracksList;
import React from 'react';
import Subtitle from "../ui/Subtitle/Subtitle";
import SearchTrackCard from "../SearchTrackCard/SearchTrackCard";
import tracksList from './SearchTrackList.module.css';

const SearchTrackList = ({trackList}) => {
    return (
        <>
            {trackList.length !== 0
                ? <Subtitle title="Tracks"/>
                : ''
            }
            <ul className={tracksList.content}>
                {trackList.map((t) => <SearchTrackCard
                    name={t.name}
                    key={t.trackTitle}
                    trackTitle={t.trackTitle}
                    duration={t.duration}
                    image={t.image}
                />)}
            </ul>
        </>
    );
};

export default SearchTrackList;
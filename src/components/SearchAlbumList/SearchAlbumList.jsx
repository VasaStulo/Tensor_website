import React from 'react';
import Subtitle from "../ui/Subtitle/Subtitle";
import SearchAlbumCard from "../SearchAlbumCard/SearchAlbumCard";
import albumsList from './SearchAlbumList.module.css';

const SearchAlbumList = ({albumList}) => {
    return (
        <>
            {albumList.length !== 0
                ? <Subtitle title="Albums"/>
                : ''
            }
            <ul className={albumsList.content}>
                {albumList.map((a) => <SearchAlbumCard
                    key={a.albumTitle}
                    albumTitle={a.albumTitle}
                    name={a.name}
                    image={a.image}
                />)}
            </ul>
        </>
    );
};

export default SearchAlbumList;
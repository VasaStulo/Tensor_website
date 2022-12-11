import React, {useState} from 'react';
import search from './Search.module.css';
import SearchForm from "../../components/SearchForm/SearchForm";
import SearchArtistsList from "../../components/SearchArtistsList/SearchArtistsList";
import API from "../../utils/API";
import SearchAlbumList from "../../components/SearchAlbumList/SearchAlbumList";
import SearchTrackList from "../../components/SearchTrackList/SearchTrackList";
import {msToMmSs} from "../../utils/date";

const Search = () => {

    const [artistList, setArtistList] = useState([]);
    const [albumList, setAlbumList] = useState([]);
    const [trackList, setTrackList] = useState([]);

    async function fetchInfo(text) {
        await fetchArtists(text);
        await fetchAlbums(text);
        await fetchTracks(text)
        ;
    }

    async function fetchArtists(text) {
        const {results: artistsResults} = await API.get('', {method: 'artist.search', limit: 8, artist: text});

        const artists = artistsResults.artistmatches.artist.map((a) => {
            return {
                name: a.name, countListeners: a.listeners, image: a.image[2]['#text']
            }
        })

        setArtistList([...artists])
    }

    async function fetchAlbums(text) {
        const {results: albumsResults} = await API.get('', {method: 'album.search', limit: 8, album: text});
        const albums = albumsResults.albummatches.album.map((a) => {
            return {
                name: a.name, albumTitle: a.artist, image: a.image[2]['#text']
            }
        })

        setAlbumList([...albums])
    }

    async function fetchTracks(text) {
        const {results: tracksResults} = await API.get('', {method: 'track.search', limit: 8, track: text});
        const tracks = await Promise.all(tracksResults.trackmatches.track.map(async (t) => {
            const {track} = await API.get('', {method: 'track.getInfo', track: t.name, artist: t.artist});
            return {
                trackTitle: t.name,
                name: t.artist,
                image: t.image[2]['#text'],
                duration: +track.duration ? msToMmSs(track.duration) : '',
            }
        }))

        setTrackList([...tracks])
    }

    return (
        <main className={search.content}>
            <h1>Search</h1>
            <SearchForm search={fetchInfo}/>
            <SearchArtistsList artistList={artistList}/>
            <SearchAlbumList albumList={albumList}/>
            <SearchTrackList trackList={trackList}/>
        </main>
    );
};

export default Search;
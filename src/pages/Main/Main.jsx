import React, {useEffect, useState} from 'react';
import main from './styles/Main.module.css';
import tracks from './styles/Tracks.module.css';
import artists from './styles/Artists.module.css';
import ArtistsList from "../../components/ArtistsList/ArtistsList";
import API from "../../utils/API";
import TracksList from "../../components/TracksList/TracksList";

const Main = () => {

    const [artistsList, setArtists] = useState([])
    const [tracksList, setTracks] = useState([])

    async function getGenreByArtistName(name) {
        const {artist} = await API.get('', {method: 'artist.getInfo', artist: name});
        return artist.tags.tag.map((tag) => tag.name).join(', ')
    }

    async function fetchArtists() {
        const {artists} = await API.get('', {method: 'chart.gettopartists', limit: 12});

        const artistsWithTags = await Promise.all(artists.artist.map(async (a) => {
            const tags = await getGenreByArtistName(a.name);
            return {
                name: a.name,
                genre: tags,
                image: a.image[4]['#text'],
            }
        }))

        setArtists([...artistsWithTags])
    }

    async function fetchTracks() {
        const {tracks} = await API.get('', {method: 'chart.gettoptracks', limit: 18});

        const tracksWithTags = await Promise.all(tracks.track.map(async (t) => {
            const tags = await getGenreByArtistName(t.artist.name);
            return {
                trackTitle: t.name,
                artist: t.artist.name,
                genre: tags,
                image: t.image[3]['#text'],
            }
        }))

        setTracks([...tracksWithTags])
    }

    useEffect(() => {
        fetchArtists()
        fetchTracks()
    }, [])

    return (
        <main className={main.music}>
            <h1>MUSIC</h1>
            <div className={artists.content}>
                <h2 className="subtitle">Hot right now</h2>
                <hr/>
                <ArtistsList artistsList={artistsList}/>
            </div>
            <div className={tracks.content}>
                <h2 className="subtitle">Popular tracks</h2>
                <hr/>
                <TracksList tracksList={tracksList}/>
            </div>
        </main>
    );
};

export default Main;
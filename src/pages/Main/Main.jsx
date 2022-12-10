import React, {useEffect, useState} from 'react';
import main from './styles/Main.module.css';
import tracks from './styles/Tracks.module.css';
import ArtistsList from "../../components/ArtistsList/ArtistsList";
import API from "../../utils/API";

const Main = () => {

    const [artistsList, setArtists] = useState([])

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

    useEffect(() => {
        fetchArtists()
    }, [])

    return (
        <main className={main.music}>
            <h1>MUSIC</h1>
            <h2 className="subtitle">Hot right now</h2>
            <hr/>
            <ArtistsList artistsList={artistsList}/>
            <div className={tracks.main}>
                <h2 className="subtitle">Popular tracks</h2>
                <hr/>
                <ul className={tracks.list}/>
            </div>
        </main>
    );
};

export default Main;
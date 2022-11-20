import React from 'react';
import './index.css';
import api from "./utils/api";
// import App from './App';
import * as render from './render';
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );


async function init() {
    await showTopArtist();
    await showTopTracks();
}

async function showTopArtist() {
    const {artists} = await api.get('', {method: 'chart.gettopartists', limit: 12});
    const topArtistList = document.getElementsByClassName('artists-list')[0];
    for (const a of artists.artist) {
        const tags = await getGenreByArtistName(a.name);
        topArtistList.innerHTML += render.renderHotArtist(a.name, tags, a.image[4]['#text'])
    }
}

async function showTopTracks() {
    const {tracks} = await api.get('', {method: 'chart.gettoptracks', limit: 18});
    const topTracksList = document.getElementsByClassName('tracks-list')[0];
    for (const t of tracks.track) {
        const tags = await getGenreByArtistName(t.artist.name);
        topTracksList.innerHTML += render.renderPopularTrack(t.name, t.artist.name, tags, t.image[3]['#text'])
    }
}

async function getGenreByArtistName(name: string) {
    const {artist} = await api.get('', {method: 'artist.getInfo', artist: name});
    return artist?.tags?.tag?.map((tag: any) => tag.name).join(', ')
}

init()

/**
 * Перевод из миллисекунд в формат мм:сс
 * @param duration - длительность в мс
 * @returns {string}
 */
function msToMmSs(duration) {
    let seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60);

    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
}

/**
 * Генерирует одну запись артиста
 * @param name - имя артиста
 * @param countListeners - кол-во прослушиваний
 * @param image - изображение
 * @returns {string}
 */
function renderSearchedArtist(name, countListeners, image) {
    return `
    <li class="searched-artist">
        <img class="artist-cover" src="${image}" alt="${name}"/>
        <div class="searched-info__artist">
            <p class="searched-info__name">${name}</p>
            <p class="searched-info__listeners">${countListeners} listeners</p>
        </div>
    </li>
    `
}

/**
 * Генерирует одну запись альбома
 * @param albumTitle - название альбома
 * @param name - имя исполнителя
 * @param image - изображение альбома
 * @returns {string}
 */
function renderSearchedAlbum(albumTitle, name, image) {
    return `
    <li class="searched-album">
        <img class="album-cover" src="${image}" alt="${albumTitle}"/>
        <div class="searched-info__album">
            <p class="searched-info__title">${albumTitle}</p>
            <p class="searched-info__name">${name}</p>
        </div>
    </li>
    `
}

/**
 * Генерирует один элемент трека
 * @param trackTitle - название трека
 * @param name - имя исполнителя
 * @param image - обложка трека
 * @param duration - длительность трека
 * @returns {string}
 */
function renderSearchedTrack(trackTitle, name, image, duration) {
    return `
    <li class="searched-track">
        <img class="track-cover" src="${image}" alt="${trackTitle}"/>
        <p class="track-info__title">${trackTitle}</p>
        <p class="track-info__name">${name}</p>
        <p class="track-info__duration">${duration}</p>
    </li>
    <br>
    `
}

/**
 * Действие по кнопке(логика поиска)
 * @param text - текст для поиска
 * @returns {Promise<void>}
 */
async function toSearch(text) {
    const {results: artistsResults} = await get('', {method: 'artist.search', limit: 8, artist: text});
    const {results: albumsResults} = await get('', {method: 'album.search', limit: 8, album: text});
    const {results: tracksResults} = await get('', {method: 'track.search', limit: 8, track: text});

    const searchedArtistsList = document.querySelector('.searched-artists-list');
    const searchedAlbumsList = document.querySelector('.searched-albums-list');
    const searchedTracksList = document.querySelector('.searched-tracks-list');

    // очищаем предыдущие результаты
    while (searchedArtistsList.firstChild) {
        searchedArtistsList.removeChild(searchedArtistsList.firstChild);
    }
    while (searchedAlbumsList.firstChild) {
        searchedAlbumsList.removeChild(searchedAlbumsList.firstChild);
    }
    while (searchedTracksList.firstChild) {
        searchedTracksList.removeChild(searchedTracksList.firstChild);
    }


    for (const a of artistsResults.artistmatches.artist) {
        searchedArtistsList.innerHTML += renderSearchedArtist(a.name, a.listeners, a.image[2]['#text'])
    }

    for (const a of albumsResults.albummatches.album) {
        searchedAlbumsList.innerHTML += renderSearchedAlbum(a.name, a.artist, a.image[2]['#text'])
    }

    for (const a of tracksResults.trackmatches.track) {
        const {track} = await get('', {method: 'track.getInfo', track: a.name, artist: a.artist});
        searchedTracksList.innerHTML += renderSearchedTrack(a.name, a.artist, a.image[2]['#text'], +track.duration ? msToMmSs(track.duration) : '')
    }
}

document.getElementById('search-btn').addEventListener('click', async (e) => {
    e.preventDefault();
    const value = document.getElementById('search').value || '';
    await toSearch(value);
});
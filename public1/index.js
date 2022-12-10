/**
 * Получение innerHTML для исполнителя
 * @param name - имя исполнителя
 * @param genre - жанр
 * @param image - изображение исполнителя
 */
function renderHotArtist(name, genre, image) {
    return `
    <li class="artist-card">
        <img class="circle" src="${image}" alt="${name}"/>
        <p class="artist-card__title">${name}</p>
        <p class="genre">${genre}</p>
    </li>
    `
}

/**
 * Получение innerHTML для трека
 * @param trackTitle - название трека
 * @param artist - исполнитель
 * @param genre - жанр
 * @param image - обложка трека
 */
function renderPopularTrack(trackTitle, artist, genre, image) {
    return `
    <li class="popular-track">
        <img class="track-cover" src="${image}" alt="${trackTitle}"/>
        <div class="track-info">
            <p class="track-info__title">${trackTitle}</p>
            <p>${artist}</p>
            <p class="genre">${genre}</p>
        </div>
    </li>
    `
}

/**
 * Инициализация при открытии страницы и подгрузка данных
 * @returns {Promise<void>}
 */
async function init() {
    await showTopArtist();
    await showTopTracks();
}

/**
 * Инициализация топ чартов исполнителей
 * @returns {Promise<void>}
 */
async function showTopArtist() {
    const {artists} = await get('', {method: 'chart.gettopartists', limit: 12});

    const artistsWithTags = await Promise.all(artists.artist.map(async (a) => {
        const tags = await getGenreByArtistName(a.name);
        return {
            ...a, tags
        }
    }))

    const topArtistList = document.getElementsByClassName('artists-list')[0];
    artistsWithTags.forEach((a) => {
        topArtistList.innerHTML += renderHotArtist(a.name, a.tags, a.image[4]['#text'])
    })
    
}

/**
 * * Инициализация топ чартов треков
 * @returns {Promise<void>}
 */
async function showTopTracks() {
    const {tracks} = await get('', {method: 'chart.gettoptracks', limit: 18});

    const tracksWithTags = await Promise.all(tracks.track.map(async (t) => {
        const tags = await getGenreByArtistName(t.artist.name);
        return {
            ...t, tags
        }
    }))

    const topTracksList = document.getElementsByClassName('tracks-list')[0];
    tracksWithTags.forEach((t) => {
        topTracksList.innerHTML += renderPopularTrack(t.name, t.artist.name, t.tags, t.image[3]['#text'])
    })
}

/**
 * Получение жанров по имени артиста
 * @param name - имя исполнителя
 * @returns {Promise<*>}
 */
async function getGenreByArtistName(name) {
    const {artist} = await get('', {method: 'artist.getInfo', artist: name});
    return artist.tags.tag.map((tag) => tag.name).join(', ')
}

init()
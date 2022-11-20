/**
 * Получение innerHTML для исполнителя
 * @param name - имя исполнителя
 * @param genre - жанр
 * @param image - изображение исполнителя
 */
export const renderHotArtist = (name: string, genre: string, image: string) => {
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
export const renderPopularTrack = (trackTitle: string, artist: string, genre: string, image: string) => {
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

export const renderSearchedArtists = (name: string, countListeners: number, image: string) => {
    return `
    <li class="searched-artist">
        <img class="artist-cover" src="${image}" alt="${name}"/>
        <div class="artist-info">
            <p class="artist-info__name">${name}</p>
            <p class="artist-info__listeners">${countListeners} listeners</p>
        </div>
    </li>
    `
}
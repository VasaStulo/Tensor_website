/**
 * Перевод из миллисекунд в формат мм:сс
 * @param duration - длительность в мс
 * @returns {string}
 */
export function msToMmSs(duration) {
    let seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60);

    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
}
// const LAST_FM_TOKEN = '9fa9f1f40bb4a52e96940d079b7cf062';
// const BASE_URL = 'https://ws.audioscrobbler.com/2.0';

class API {
    #LAST_FM_TOKEN = '9fa9f1f40bb4a52e96940d079b7cf062';
    #BASE_URL = 'https://ws.audioscrobbler.com/2.0';

    /**
     * Метод получения данных по API LASTFM
     * @param url - url для стука
     * @param query - GET параметры
     * @param requireToken - необходимость токена
     * @returns {Promise<any>}
     */
    async get(url = '', query = {}, requireToken = true) {
        try {
            const urlParams = {format: 'json', ...query};
            let cUrl = `${this.#BASE_URL}/${url}?` + new URLSearchParams();

            if (requireToken) { // подмешиваем токен если нужно
                urlParams.api_key = this.#LAST_FM_TOKEN;
            }

            cUrl += new URLSearchParams(urlParams);
            const res = await fetch(
                cUrl,
                {method: 'GET'}
            );

            return res.json();
        } catch (e) {
            console.log('Error while getting resource:', e);
            throw e
        }
    }
}

export default new API();
type urlSearchParams = {
    format?: string;
    api_key?: string;
}

/**
 * Класс доступа к API
 */
export class Api {
    private readonly LAST_FM_TOKEN: string = '9fa9f1f40bb4a52e96940d079b7cf062';
    private readonly BASE_URL: string;

    /**
     * Конструктор класса API
     * @param baseUrl - базовый адрес API
     */
    constructor(baseUrl: string) {
        this.BASE_URL = baseUrl;
    }

    /**
     * GET метод получения данных
     * @param url - method для доступа к API
     * @param query
     * @param requireToken - необходим ли токен в query
     */
    async get(url = '', query = {}, requireToken = true) {
        try {
            const urlParams: urlSearchParams = {format: 'json', ...query};

            let cUrl = `${this.BASE_URL}/${url}?` + new URLSearchParams();
            
            if (requireToken) {
                urlParams.api_key = this.LAST_FM_TOKEN;
            }

            cUrl += new URLSearchParams(urlParams);
            const res = await fetch(
                cUrl,
                {method: 'GET'}
            );

            return res.json();
        } catch (e) {
            console.log('Error while getting resource:', e);
        }
    }
}

export default (new Api('https://ws.audioscrobbler.com/2.0'))
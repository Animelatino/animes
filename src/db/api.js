import axios from 'axios';

// export const API_URL = 'http://192.168.0.40/animelhdapi/public/api/';

export const API_URL = 'https://api.animelatinohd.com/api/';

export const api = axios.create({
    baseURL: API_URL,
    timeout: 5000,
});

export const useApiUrl = () => {
    function apiUrl(query, params) {
        let paramsUrl = '';
        if (params) {
            paramsUrl += '?';
            params &&
                params.map((param) => {
                    paramsUrl += `&${param.name}=${param.value}`;
                });
        }
        return `${query}${paramsUrl}`;
    }
    return apiUrl;
};

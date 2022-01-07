import { api, useApiUrl } from './api'

export const useAnimes = () => {
    const apiUrl = useApiUrl();

    function getAnimes(callback, type, params, header) {
        return api.get(apiUrl(`anime/${type}`, params),header)
        .then(response => {
            callback(response?.data)
        })
        .catch()
    }
    return getAnimes
}

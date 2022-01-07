import { api, useApiUrl } from './api'

export const useAnimesGenres = () => {
    const apiUrl = useApiUrl();

    function getAnimesGenres(callback, type, params, header) {
        return api.get(apiUrl(`anime/${type}`, params),header)
        .then(response => {
            callback(response?.data?.data)
        })
        .catch()
    }
    return getAnimesGenres
}

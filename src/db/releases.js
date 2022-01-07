import { api, useApiUrl } from './api'

export const useReleases = () => {
    const apiUrl = useApiUrl();

    function getReleases(callback, type, params, header) {
        return api.get(apiUrl(`${type}`, params),header)
        .then(response => {
            callback(response?.data)
        })
        .catch()
    }
    return getReleases
}

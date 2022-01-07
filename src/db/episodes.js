import { api, useApiUrl } from './api';

export const useEpisode = () => {
    const apiUrl = useApiUrl();

    function getEpisode(callback, slug, params, header) {
        return api
            .get(apiUrl(`episodes/${slug}`, params), header)
            .then((response) => {
                callback(response?.data);
            })
            .catch();
    }
    return getEpisode;
};

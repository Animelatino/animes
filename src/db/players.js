import { api, useApiUrl } from './api';

export const usePlayer = () => {
    const apiUrl = useApiUrl();

    function getPlayer(callback, number, params, header) {
        return api
            .get(apiUrl(`players/${number}`, params), header)
            .then((response) => {
                callback(response?.data);
            })
            .catch();
    }
    return getPlayer;
};

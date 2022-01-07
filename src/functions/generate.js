import axios from 'axios';
import { api } from '../db/api';

export const removeItemFromArr = (arr, item) => {
    var i = arr.indexOf(item);
    if (i !== -1) {
        arr.splice(i, 1);
    }
    return arr;
};

export const _generateVideos = async (player) => {
    let res = [];
    switch (player.server.title.toLowerCase()) {
        case 'alpha':
        case 'delta':
        case 'omega':
        case 'epsilon':
            return _convertToSource(player.code);
        case 'gocdn':
            res = await axios.get(
                player.code.replace('gocdn.html#', 'gocdn.php?v=')
            );
            return res.data.error ? '' : _convertToSource(res.data.file);
        case 'fembed':
        case 'alphaf':
        case 'alphaj':
        case 'alpham':
        case 'alphat':
            let id = player.code
                .replace('https://embedsito.com/v/', '')
                .replace('https://www.fembed.com/v/', '');
            res = await axios.post(`http://diasfem.com/api/source/${id}`);
            return (res.data.length = 0 ? '' : res.data.data);
        case 'archive':
        case 'degoo':
        case 'gphotos':
        case 'fireload':
        case 'beta':
            res = await api.get(`players/${player.id}`);
            return res.data;
        case 'pcloud':
            const get = await axios.get(`${player.code}`);
            let data = get.data.split(`"downloadlink": "`);
            let videoURL = data[1].split(`"`);
            videoURL = videoURL[0].replace(new RegExp('\\\\/|/\\\\', 'g'), '/');
            return _convertToSource(videoURL);
        case 'solidfiles':
            const getS = await axios.get(`${player.code}`);
            let dataS = getS.data.split(`"downloadUrl":"`);
            let videoURLS = dataS[1].split(`"`);
            videoURLS = videoURLS[0].replace(
                new RegExp('\\\\/|/\\\\', 'g'),
                '/'
            );
            return _convertToSource(videoURLS);
    }
};

export const _convertToSource = (url) => {
    return [
        {
            file: url,
            type: 'video/mp4',
            label: '720p',
        },
    ];
};

export const _orderPlayers = (data) => {
    data?.sort((a, b) => (a.server.position > b.server.position ? 1 : -1));
    return data;
};

export const _getStatusCode = async (url) => {
    return new Promise(function (resolve, reject) {
        var ipRequest = new XMLHttpRequest();
        ipRequest.open('GET', url, true);
        ipRequest.send();
        ipRequest.onreadystatechange = function () {
            if (ipRequest.status >= 200 && ipRequest.status <= 500) {
                resolve(ipRequest.status);
                ipRequest.abort();
            }
        };
    });
};

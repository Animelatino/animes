import { Dimensions } from 'react-native';

export const episodeItemWidth = (width) => {
    let items = 1.5;
    switch (true) {
        case width >= 960:
            items = 4.5;
            break;
        case width >= 760:
            items = 3.5;
            break;
        case width >= 425:
            items = 2.5;
            break;
    }
    return width / items;
};

export const animeItemWidth = (width) => {
    let items = 2.5;
    switch (true) {
        case width >= 960:
            items = 5.5;
            break;
        case width >= 760:
            items = 4.5;
            break;
        case width >= 425:
            items = 3.5;
            break;
    }
    return width / items;
};

export const genreItemWidth = (width) => {
    let items = 3;
    switch (true) {
        case width >= 1400:
            items = 9;
            break;
        case width >= 1200:
            items = 8;
            break;
        case width >= 992:
            items = 7;
            break;
        case width >= 768:
            items = 6;
            break;
        case width >= 576:
            items = 5;
            break;
        case width < 576:
            items = 3;
            break;
    }
    return width / items;
};

export const directorioItemWidth = (width) => {
    let items = 2;
    switch (true) {
        case width >= 960:
            items = 4;
            break;
        case width >= 760:
            items = 3;
            break;
        case width >= 425:
            items = 2;
            break;
    }
    return width / items;
};

export const animeListColumns = () => {
    const width = Dimensions.get('window').width;
    let items = 2;
    switch (true) {
        case width >= 1400:
            items = 7;
            break;
        case width >= 1200:
            items = 6;
            break;
        case width >= 992:
            items = 5;
            break;
        case width >= 768:
            items = 4;
            break;
        case width >= 576:
            items = 3;
            break;
        case width < 576:
            items = 2;
            break;
    }
    return items;
};

export const animePosterRatio = () => {
    return 9 / 14;
};

export const episodeBannerRatio = () => {
    return 16 / 9;
};

export const genreCardRatio = () => {
    return 1 / 0.5;
};

export const directorioCardRatio = () => {
    return 1 / 1;
};

export const getParametersUrl = (object) => {
    var parameters = [];
    for (var property in object) {
        if (object.hasOwnProperty(property)) {
            parameters.push(encodeURI(property + '=' + object[property]));
        }
    }
    return parameters.join('&');
};

export const validURL = (str) => {
    var pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$',
        'i'
    ); // fragment locator
    return !!pattern.test(str);
};

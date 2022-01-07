import moment from 'moment';

moment.updateLocale('es', require('moment/locale/es'));

export const hourNow = () => {
    return moment().valueOf();
};

export const addHourNow = () => {
    return moment().add(1, 'm').valueOf();
};

export const verifyDates = (date) => {
    return moment(date).isBefore(hourNow());
};

export const getDateNow = () => {
    return moment().locale('es-PE').format('YYYY-MM-DD HH:mm:ss');
};

export const getTimeEpisode = (date) => {
    return moment(date).format('DD MMM YYYY');
};

export const getDateFromNow = (date) => {
    return moment(date).fromNow();
};

export const getAired = (date) => {
    return moment(date).format('LL');
};

export const getDayMonth = (date) => {
    return moment(date).format('D MMM');
};

export const getYear = (date) => {
    return moment(date).format('YYYY');
};

export const formatTime = (second) => {
    second = second / 1000;
    let h = 0,
        i = 0,
        s = parseInt(second);
    if (s > 60) {
        i = parseInt(s / 60);
        s = parseInt(s % 60);
    }
    let zero = (v) => {
        return v >> 0 < 10 ? '0' + v : v;
    };
    let time = [];
    if (h > 0) {
        time.push(zero(h));
    }
    time.push(zero(i));
    if (h <= 0) {
        time.push(zero(s));
    }
    return time.join(':');
};

export const formatViews = (views) => {
    var num = views?.replace(/\./g, '');
    if (!isNaN(num)) {
        num = num
            .toString()
            .split('')
            .reverse()
            .join('')
            .replace(/(?=\d*\.?)(\d{3})/g, '$1,');
        num = num.split('').reverse().join('').replace(/^[\,]/, '');
    }
    return num;
};

export const getTypeAnime = (type) => {
    switch (type.toLowerCase()) {
        case 'tv':
            return 'Anime';
        case 'movie':
            return 'Película';
        case 'special':
            return 'Especial';
        default:
            return type;
    }
};

export const getStatus = (status) => {
    switch (status) {
        case 0:
            return 'Finalizado';
        case 1:
            return 'En Emisión';
        default:
            return 'Sin definir';
    }
};

export const genresConvertedName = (genres) => {
    return genres?.split(',')?.map(function (genre) {
        genre = genre[0].toUpperCase() + genre.slice(1);
        genre = genre.replace(/_|#|-|@|<>/g, ' ');
        return genre;
    });
};

export const genreConvertedName = (genre) => {
    return (genre[0].toUpperCase() + genre.slice(1)).replace(
        /_|#|-|@|<>/g,
        ' '
    );
};

export const nFormatter = (num, digits) => {
    var si = [
        { value: 1, symbol: '' },
        { value: 1e3, symbol: 'K' },
        { value: 1e6, symbol: 'M' },
        { value: 1e9, symbol: 'G' },
        { value: 1e12, symbol: 'T' },
        { value: 1e15, symbol: 'P' },
        { value: 1e18, symbol: 'E' },
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
        if (Math.abs(num) >= si[i].value) {
            break;
        }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol;
};

export const bytesToSize = (bytes) => {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

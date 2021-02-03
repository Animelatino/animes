import moment from 'moment';
moment.locale('es');

const pathTmdb = 'https://www.themoviedb.org/t/p/';

export const imageEpisode = (image) => {
    const size = 'w500';
    return pathTmdb+size+image;
}

export const imageAnimeSearch = (image) => {
    const size = 'w154';
    return pathTmdb+size+image;
}

export const posterAnime = (image) => {
    const size = 'w300';
    return pathTmdb+size+image;
}

export const bannerAnime = (image) => {
    const size = 'w1280';
    return pathTmdb+size+image;
}

export const bannerAnimeCalendar = (image) => {
    const size = 'w300';
    return pathTmdb+size+image;
}

export const slugAnime = (slug) => {
    return `/${slug}`;
}

export const slugEpisode = (slug, number) => {
    return `/${slug}/capitulo-${number}`;
}

export const slugGenre = (slug) => {
    return `/animes?genre=${slug}`;
}

export const simulCast = (object) => {
    let formats = {
        lastDay : '[Ayer]',
        sameDay : '[Hoy]',
        nextDay : '[Mañana]',
        lastWeek : 'dddd',
        nextWeek : 'dddd',
        sameElse : 'L'
    }
    let data = [];
    const diasEntreFechas = (desde, hasta) =>  {
        var dia_actual = desde;
        var fechas = [];
        while (moment(dia_actual).isSameOrBefore(hasta)) {
            fechas.push(dia_actual.format('YYYY-MM-DD'));
            dia_actual.add(1, 'days');
        }
        return fechas;
    };
    let days = diasEntreFechas(moment(),moment().add('6','day'));
    for (let index = 0; index < days.length; index++) {
        let dayName = moment(days[index]).calendar(formats);
        let dayNumber = moment(days[index]).isoWeekday();
        let item = {
            dayName: dayName,
            dayNumber: dayNumber,
            data: object[dayNumber]
        }
        data.push(item);
    }
    return data;
}

export const isNowEpisode = (date_now) => {
    let now = new Date();
    now.setHours(0,0,0,0);
    if(moment(date_now).isBetween(moment(now), moment())){
        return true;
    }else{
        return false;
    }
}

export const nFormatter = (num, digits) => {
    var si = [
        { value: 1, symbol: "" },
        { value: 1E3, symbol: "K" },
        { value: 1E6, symbol: "M" },
        { value: 1E9, symbol: "G" },
        { value: 1E12, symbol: "T" },
        { value: 1E15, symbol: "P" },
        { value: 1E18, symbol: "E" }
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
        if (Math.abs(num) >= si[i].value) {
            break;
        }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

export const menuItems = () => {
    const items = [
        {
            link: '/animes',
            name: 'Animes',
            icon: '<path d="M3,17V19H9V17H3M3,5V7H13V5H3M13,21V19H21V17H13V15H11V21H13M7,9V11H3V13H7V15H9V9H7M21,13V11H11V13H21M15,9H17V7H21V5H17V3H15V9Z"></path>'
        },
        {
            link: '/animes/calendario',
            name: 'Calendario',
            icon: '<path d="M14,12H15.5V14.82L17.94,16.23L17.19,17.53L14,15.69V12M4,2H18A2,2 0 0,1 20,4V10.1C21.24,11.36 22,13.09 22,15A7,7 0 0,1 15,22C13.09,22 11.36,21.24 10.1,20H4A2,2 0 0,1 2,18V4A2,2 0 0,1 4,2M4,15V18H8.67C8.24,17.09 8,16.07 8,15H4M4,8H10V5H4V8M18,8V5H12V8H18M4,13H8.29C8.63,11.85 9.26,10.82 10.1,10H4V13M15,10.15A4.85,4.85 0 0,0 10.15,15C10.15,17.68 12.32,19.85 15,19.85A4.85,4.85 0 0,0 19.85,15C19.85,12.32 17.68,10.15 15,10.15Z"></path>'
        },
        {
            link: '/animes/latino',
            name: 'Latino',
            icon: '<path d="M9,5V9H21V5M9,19H21V15H9M9,14H21V10H9M4,9H8V5H4M4,19H8V15H4M4,14H8V10H4V14Z"></path>'
        },
        {
            link: '/animes/mas-vistos',
            name: 'Más vistos',
            icon: '<g data-name="Layer 2"><path d="M12 5C5 5 2 11 2 12s3 7 10 7 10-6 10-7-3-7-10-7zm0 12c-4 0-7-4-8-5 1-1 4-5 8-5s7 4 8 5c-1 1-4 5-8 5z"/><path d="M12 8a4 4 0 104 4 4 4 0 00-4-4zm0 6a2 2 0 112-2 2 2 0 01-2 2z"/></g>'
        },
        {
            link: '/animes/populares',
            name: 'Populares',
            icon: '<path d="M8 24h1c-1-2-2-4-1-6l4-7s0 3 2 5 3 5 1 8c2-1 4-3 4-7v-4l-3-4c0-1 0 0 0 0l-1 2-1-3c0-3 0-5-2-7l-1-1h-1c1 2 0 6-3 11-4 5-2 8-2 9l3 4zm0 0"/>'
        }
    ]
    return items;
}
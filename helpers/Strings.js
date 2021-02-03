import moment from 'moment';
moment.locale('es');

export const getTypeAnime = (type) => {
    switch (type.toLowerCase()) {
        case 'tv':
                return 'Anime';
            break;
        case 'movie':
                return 'Película';
            break;
        case 'special':
                return 'Especial';
            break;
        default:
                return type;
            break;
    }
}

export const getFromNow = (date) => {
    return moment(date).fromNow();
}

export const getStatusAnime = (status) => {
    return status === 0 ? 'Finalizado' : 'En emisión';
}

export const getYear = (date) => {
    return moment(date).format('YYYY');
}

export const getDateAiredAnime = (date) => {
    return moment(date).format('LL');
}

export const getRatingAnime = (rating) => {
    return rating;
}

export const getVoteAverageAnime = (voteAverage) => {
    return voteAverage + '/10';
}

export const getPopularityAnime = (popularity) => {
    return popularity;
}

export const getLanguajePlayer = (languaje) => {
    return languaje === '0' ? 'Subtitulado' : 'Latino';
}

export const getStreamPlayer = (item) => {
    return item?.server?.type === 0 
        ?   process.env.STREAMURL + item?.id 
        :(  item?.server?.embed 
            ?   item?.server?.embed?.replace('{id}',item?.code)
            :   item?.code
        );
}

export const getDayName = (day) => {
    const dayNames = ['No definido','Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
    return dayNames[day];
}

export const getNowDay = () => {
    var d = new Date();
    return d.getDay() + 1;
}

export const getUrlVideo = (video) => {
    let url = video?.server?.type === 1 ? (video?.server?.embed ? video?.server?.embed?.replace('{id}',video?.code) : video?.code ) : process.env.STREAMURL+video.id;
    return url;
}

export const getCheckLatino = (players) => {
    return 1 in players ? true : false;
}


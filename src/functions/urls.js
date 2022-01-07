import { useStore } from '../store/StoreProvider';

const pathImage = 'https://www.themoviedb.org/t/p/';

export const getImage = (size = 'w500', key) => {
    const { config } = useStore();
    return config?.imagenes
        ? pathImage + size + key
        : 'https://i.imgur.com/BB7cDvQ.png';
};

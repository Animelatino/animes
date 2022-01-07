import React, { memo } from 'react';
import { useTheme } from '@react-navigation/native';
import ItemAnime from '../../components/ItemAnime';

function AnimeItem(props) {
    const { radio } = useTheme();
    return (
        <ItemAnime
            {...props}
            thumb={true}
            rounded={radio.sm}
            displayInfo={true}
        />
    );
}

export default memo(AnimeItem);

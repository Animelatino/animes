import React from 'react';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Thumb from '../../components/Thumb';
import ListingItem from '../../components/ListingItem';
import { getImage } from '../../functions/urls';

export default React.memo((props) => {
    const { index, item } = props;
    const navigation = useNavigation();
    return (
        <ListingItem
            isHorizontal={true}
            isFirst={index === 0}
            style={{ width: Dimensions.get('window').width / 2 }}
        >
            <Thumb
                aspectRatio={14 / 9}
                backgroundUri={getImage('w300', item?.banner)}
                onPress={() =>
                    navigation.navigate('Anime', { slug: item?.slug })
                }
            />
        </ListingItem>
    );
});

import React, { memo } from 'react';
import { Dimensions, View } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import Touchable from '../../components/Touchable';
import { genreCardRatio, genreItemWidth } from '../../functions/helpers';
import Genre from '../../components/Genre';

function GenreItem(props) {
    const { index, item } = props;
    const { space, radio } = useTheme();
    const navigation = useNavigation();
    return (
        <View
            style={[
                {
                    marginLeft: index == 0 ? 0 : space.md,
                    width: genreItemWidth(Dimensions.get('window').width),
                },
            ]}
        >
            <View style={{ overflow: 'hidden', borderRadius: radio.sm }}>
                <Touchable
                    background={true}
                    useForeground={true}
                    onPress={() =>
                        navigation.push('Animes', {
                            type: 'list',
                            query: {
                                genre: item,
                            },
                            title: 'Genero',
                            genre: item,
                        })
                    }
                >
                    <Genre
                        rounded={radio.xl}
                        aspectRatio={genreCardRatio()}
                        {...props}
                    />
                </Touchable>
            </View>
        </View>
    );
}

export default memo(GenreItem);

import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import Thumb from './Thumb';
import { getImage } from '../functions/urls';
import { animeListColumns, animePosterRatio } from '../functions/helpers';
import useOrientation from '../hooks/useOrientation';

function ItemEpisode({ item, thumb = false, displayInfo = false }) {
    const orientation = useOrientation();
    const numColumns = animeListColumns(orientation.width);
    const navigation = useNavigation();
    const { colors, space, fontSizes } = useTheme();
    return (
        <View
            style={[
                styles.container,
                {
                    flex: 1 / numColumns,
                    marginHorizontal: space.xxs,
                },
            ]}
        >
            {thumb && (
                <Thumb
                    rounded={radio}
                    aspectRatio={animePosterRatio()}
                    backgroundUri={getImage('w300', item?.poster)}
                    onPress={() =>
                        navigation.push('Anime', { slug: item?.slug })
                    }
                />
            )}
            {displayInfo && item?.name && (
                <View style={[styles.infoContainer, { padding: space.xxs }]}>
                    <Text
                        style={[
                            styles.nameText,
                            {
                                color: colors.text,
                                fontSize: fontSizes.h4,
                            },
                        ]}
                        numberOfLines={2}
                        ellipsizeMode={'tail'}
                    >
                        {item?.name}
                    </Text>
                </View>
            )}
        </View>
    );
}

export default memo(ItemEpisode);

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
    infoContainer: {
        flex: 1,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    nameText: {
        textAlign: 'center',
        fontFamily: 'SemiBold',
    },
});

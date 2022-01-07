import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import Thumb from '../../components/Thumb';
import { getImage } from '../../functions/urls';
import { animePosterRatio } from '../../functions/helpers';

function AnimeItem(props) {
    const { item, numColumns } = props;
    const navigation = useNavigation();
    const { colors, space, radio, fontSizes } = useTheme();
    return (
        <View
            style={[
                styles.container,
                {
                    flex: 1 / numColumns,
                    marginHorizontal: space.sm,
                },
            ]}
        >
            <Thumb
                rounded={radio.xl}
                background={true}
                useForeground={true}
                aspectRatio={animePosterRatio()}
                backgroundUri={getImage('w300', item?.poster)}
                onPress={() => navigation.push('Anime', { slug: item?.slug })}
            />
            <View style={[styles.infoContainer, { paddingVertical: space.sm }]}>
                <Text
                    style={[
                        styles.nameText,
                        {
                            color: colors.text,
                            fontSize: fontSizes.h4,
                            textAlign: 'center',
                        },
                    ]}
                    numberOfLines={2}
                    ellipsizeMode={'tail'}
                >
                    {item?.name}
                </Text>
            </View>
        </View>
    );
}

export default memo(AnimeItem);

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
    infoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    nameText: {
        fontFamily: 'Medium',
        lineHeight: 20,
        opacity: 0.9,
    },
});

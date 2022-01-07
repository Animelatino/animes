import React, { memo } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import Thumb from '../../components/Thumb';
import { getImage } from '../../functions/urls';
import { animeItemWidth, animePosterRatio } from '../../functions/helpers';

function AnimeItem({ width = 160, aspectRatio = 9 / 13, item }) {
    const { colors, space, radio, fontSizes } = useTheme();
    const navigation = useNavigation();
    return (
        <View
            style={[
                {
                    paddingRight: 16,
                    width:
                        width || animeItemWidth(Dimensions.get('window').width),
                },
            ]}
        >
            <Thumb
                rounded={radio.md}
                background={false}
                useForeground={true}
                aspectRatio={aspectRatio}
                backgroundUri={getImage('w300', item?.poster)}
                onPress={() => navigation.push('Anime', { slug: item?.slug })}
            />
            <View style={{ paddingVertical: space.xxs }}>
                <Text
                    numberOfLines={2}
                    style={{
                        fontFamily: 'SemiBold',
                        color: colors.text,
                        fontSize: fontSizes.body1,
                    }}
                >
                    {item?.name}
                </Text>
            </View>
        </View>
    );
}

export default memo(AnimeItem);

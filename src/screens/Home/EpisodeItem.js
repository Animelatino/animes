import React, { memo } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import Thumb from '../../components/Thumb';
import { getImage } from '../../functions/urls';
import { episodeItemWidth, episodeBannerRatio } from '../../functions/helpers';
import { useStore } from '../../store/StoreProvider';

function EpisodeItem({ index, item }) {
    const { config } = useStore();
    const { colors, space, radio } = useTheme();
    const navigation = useNavigation();
    return (
        <View
            style={[
                {
                    marginLeft: index == 0 ? 0 : space.md,
                    width: episodeItemWidth(Dimensions.get('window').width),
                },
            ]}
        >
            <Thumb
                rounded={radio.sm}
                background={false}
                useForeground={true}
                aspectRatio={episodeBannerRatio()}
                backgroundUri={getImage('w500', item?.anime?.banner)}
                onPress={() =>
                    config?.videos
                        ? navigation.push('Player', {
                              slug: item?.anime?.slug,
                              number: item?.number,
                          })
                        : null
                }
            />
            <View style={[styles.infoContainer, { paddingTop: space.sm }]}>
                <Text
                    style={[
                        styles.title,
                        {
                            color: colors.text,
                            marginRight: space.sm,
                            paddingRight: space.sm,
                        },
                    ]}
                    numberOfLines={1}
                    ellipsizeMode={'middle'}
                >
                    {item?.anime?.name}
                </Text>
                <Text
                    style={[
                        styles.number,
                        { color: colors.text, opacity: 0.5 },
                    ]}
                    numberOfLines={1}
                >
                    {`Eps. ${item?.number}`}
                </Text>
            </View>
        </View>
    );
}

export default memo(EpisodeItem);

const styles = StyleSheet.create({
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        flex: 1,
        fontFamily: 'SemiBold',
        lineHeight: 20,
    },
    number: {
        fontFamily: 'Regular',
    },
});

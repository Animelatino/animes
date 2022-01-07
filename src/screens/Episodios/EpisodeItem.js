import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, ToastAndroid, Image } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { getTimeEpisode } from '../../functions/strings';
import * as Icons from 'react-native-vector-icons';
import Touchable from '../../components/Touchable';
import { api } from '../../db/api';
import { useStore } from '../../store/StoreProvider';
import { getImage } from '../../functions/urls';

function AnimeItem({ item, slug, banner }) {
    const { colors, space, fontSizes, radio } = useTheme();
    const [viewed, setViewed] = useState(item?.viewed);
    const [fetching, setFetching] = useState(false);
    const { token, user, config } = useStore();
    const navigation = useNavigation();

    function pressEpisode() {
        if (config?.videos) {
            if (user?.id) {
                setViewed(true);
            }
            navigation.push('Player', {
                slug: slug,
                number: item?.number,
                viewed: viewed,
            });
        }
    }

    async function markEpisode() {
        try {
            setFetching(true);
            const parameters = {
                user_id: user.id,
                episode_id: item.id,
            };
            const options = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const dataJson = await api.post(
                viewed ? `auth/like/delete` : `auth/like/add`,
                parameters,
                options
            );
            if (dataJson.data.code == 200) {
                ToastAndroid.show(
                    dataJson.data.status
                        ? 'Marcado como visto'
                        : 'Quitado de vistos',
                    ToastAndroid.SHORT
                );
                setViewed(dataJson.data.status);
                setFetching(false);
            } else {
                throw dataJson.data.msg;
            }
        } catch (error) {
            ToastAndroid.show('Hubo un error inesperado');
            setViewed(item?.viewed);
            setFetching(false);
        }
    }

    return (
        <Touchable onPress={() => pressEpisode()}>
            <View
                style={[
                    styles.container,
                    {
                        padding: space.md,
                        marginBottom: space.xxs,
                        opacity: viewed ? 0.5 : 1,
                    },
                ]}
            >
                <View
                    style={{
                        width: 130,
                        aspectRatio: 16 / 9,
                        backgroundColor: colors.card,
                        borderRadius: radio.md,
                        overflow: 'hidden',
                    }}
                >
                    <Image
                        style={{ width: '100%', height: '100%' }}
                        source={{ uri: getImage('w154', banner) }}
                    />
                </View>
                <View
                    style={[
                        styles.infoContainer,
                        { marginHorizontal: space.sm },
                    ]}
                >
                    <View
                        style={[
                            styles.titleContainer,
                            { marginVertical: space.xxs },
                        ]}
                    >
                        <Text
                            style={[
                                styles.titleText,
                                { color: colors.text, fontSize: fontSizes.h3 },
                            ]}
                        >{`Episodio ${item?.number}`}</Text>
                    </View>
                    <View style={[styles.timeContainer]}>
                        <Icons.AntDesign
                            name={'clockcircleo'}
                            color={colors.gray}
                            size={14}
                        />
                        <Text
                            style={[
                                styles.timeText,
                                {
                                    color: colors.gray,
                                    marginLeft: space.xxs,
                                    fontSize: fontSizes.body2,
                                },
                            ]}
                        >
                            {getTimeEpisode(item?.created_at)}
                        </Text>
                    </View>
                </View>
                {user?.id && (
                    <View
                        style={[styles.buttonContainer, { padding: space.sm }]}
                    >
                        <Touchable
                            disabled={fetching}
                            ripple={false}
                            onPress={markEpisode}
                        >
                            <Icons.Ionicons
                                name={viewed ? 'eye-off' : 'eye'}
                                color={colors.gray}
                                size={32}
                            />
                        </Touchable>
                    </View>
                )}
            </View>
        </Touchable>
    );
}

export default memo(AnimeItem);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    infoContainer: {
        flex: 1,
    },
    titleText: {
        fontFamily: 'SemiBold',
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeText: {
        fontFamily: 'Regular',
    },
});

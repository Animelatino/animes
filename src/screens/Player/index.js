import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    StatusBar,
    BackHandler,
} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useNavigation } from '@react-navigation/core';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';
import { api } from '../../db/api';
import { useTheme } from '@react-navigation/native';
import TouchableButton from '../../components/TouchableButton';
import { _orderPlayers } from '../../functions/generate';
import { useStore } from '../../store/StoreProvider';

export default (props) => {
    const { slug, number, viewed } = props.route.params;
    const navigation = useNavigation();
    const [episode, setEpisode] = useState();
    const [data, setData] = useState();
    const [error, setError] = useState(null);
    const [fetching, setFecthing] = useState(true);
    const [languaje, setLanguaje] = useState(0);

    const { colors, space, fontSizes } = useTheme();
    const { token, user } = useStore();

    async function orientationLandscape() {
        await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.LANDSCAPE
        );
    }

    async function backAction() {
        await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.PORTRAIT
        );
        navigation.goBack();
    }

    const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
    );

    function onPressOption(item) {
        if (item.server.status == 1) {
            return true;
        } else {
            navigation.push('VideoPlayer', {
                item: item,
                episode: episode,
            });
        }
    }

    async function getData() {
        try {
            const dataJson = await api.get(`episodes/${slug}/${number}`);
            setData(dataJson.data);
            setFecthing(false);
            const cloneEp = Object.assign({}, dataJson.data);
            delete cloneEp.players;
            setEpisode(cloneEp);
        } catch (error) {
            setFecthing(false);
            if (error.response) {
                if (error.response.status != 200) {
                    setError('Sin hay acceso a los servidores.');
                }
            } else {
                setError('Hubo un error inesperado.');
            }
        }
    }

    async function markEpisode() {
        try {
            await api.post(
                `auth/like/add`,
                {
                    user_id: user.id,
                    episode_id: data.id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        } catch {}
    }

    useEffect(() => {
        if (slug && number) {
            orientationLandscape();
            getData();
        }
        return () => {
            setData();
            setError(null);
            setFecthing(true);
            setLanguaje(0);
            setEpisode();
            backHandler.remove();
        };
    }, [slug, number]);

    useEffect(() => {
        if (data) {
            setLanguaje(Object.keys(data?.players)[0]);
            if (!viewed) markEpisode();
        }
        return () => {
            setLanguaje(0);
        };
    }, [data]);

    if (error) {
        return <ErrorMessage message={error} />;
    }

    if (fetching && !data) {
        return <Loader />;
    } else {
        return (
            <>
                <StatusBar hidden={true} />
                <View style={styles.container}>
                    <Text
                        style={[
                            styles.titleEpisode,
                            { fontSize: fontSizes.h3, color: colors.primary50 },
                        ]}
                        numberOfLines={1}
                        ellipsizeMode={'middle'}
                    >
                        {data?.anime?.name} Episodio {data?.number}
                    </Text>
                    <View style={styles.content}>
                        <ScrollView
                            style={styles.listContainer}
                            stickyHeaderIndices={[0]}
                        >
                            <View
                                style={{
                                    backgroundColor: colors.background,
                                    paddingBottom: 5,
                                }}
                            >
                                <Text
                                    style={[
                                        styles.titleText,
                                        {
                                            color: colors.primary50,
                                            fontSize: fontSizes.h3,
                                        },
                                    ]}
                                >
                                    Idioma
                                </Text>
                            </View>

                            <View
                                style={[
                                    styles.innerContent,
                                    { paddingVertical: space.md },
                                ]}
                            >
                                {data?.players &&
                                    Object.keys(data?.players)?.map(
                                        (item, idx) => (
                                            <TouchableButton
                                                key={`lang_${idx}`}
                                                riple={true}
                                                bgContainer={false}
                                                useForeground={false}
                                                style={{
                                                    backgroundColor:
                                                        languaje == item
                                                            ? colors.secondary400
                                                            : colors.primary900,
                                                    paddingHorizontal: space.xl,
                                                    paddingVertical: space.md,
                                                    borderBottomWidth: 1,
                                                    borderBottomColor:
                                                        colors.primary800,
                                                }}
                                                onPress={() =>
                                                    setLanguaje(item)
                                                }
                                            >
                                                <Text
                                                    style={[
                                                        styles.itemText,
                                                        {
                                                            color: colors.primary50,
                                                            fontSize:
                                                                fontSizes.h4,
                                                        },
                                                    ]}
                                                >
                                                    {item == 0
                                                        ? 'Subtitulado'
                                                        : 'Español Latino'}
                                                </Text>
                                            </TouchableButton>
                                        )
                                    )}
                            </View>
                        </ScrollView>
                        <ScrollView
                            style={styles.listContainer}
                            stickyHeaderIndices={[0]}
                        >
                            <View
                                style={{
                                    backgroundColor: colors.background,
                                    paddingBottom: 5,
                                }}
                            >
                                <Text
                                    style={[
                                        styles.titleText,
                                        {
                                            color: colors.primary50,
                                            fontSize: fontSizes.h3,
                                        },
                                    ]}
                                >
                                    Servidores
                                </Text>
                            </View>
                            <View
                                style={[
                                    styles.innerContent,
                                    { paddingVertical: space.md },
                                ]}
                            >
                                {data?.players &&
                                    _orderPlayers(data?.players[languaje])?.map(
                                        (item, idx) => (
                                            <TouchableButton
                                                key={`server_${idx}`}
                                                riple={true}
                                                bgContainer={false}
                                                useForeground={false}
                                                style={{
                                                    backgroundColor:
                                                        languaje == item
                                                            ? colors.secondary400
                                                            : colors.primary900,
                                                    paddingHorizontal: space.xl,
                                                    paddingVertical: space.md,
                                                    borderBottomWidth: 1,
                                                    borderBottomColor:
                                                        colors.card,
                                                }}
                                                onPress={() =>
                                                    onPressOption(item)
                                                }
                                            >
                                                <Text
                                                    style={[
                                                        styles.itemText,
                                                        {
                                                            color: colors.text,
                                                            fontSize:
                                                                fontSizes.h4,
                                                        },
                                                    ]}
                                                >
                                                    {item?.server?.title}
                                                </Text>
                                                <Text
                                                    style={[
                                                        styles.itemText,
                                                        {
                                                            color: colors.gray,
                                                            fontSize: 12,
                                                            marginTop: 5,
                                                        },
                                                    ]}
                                                >
                                                    {item?.server?.status == 1
                                                        ? 'Fuera de servicio'
                                                        : 'En línea'}{' '}
                                                    -{' '}
                                                    {item?.server?.type == 1
                                                        ? 'Reproductor externo'
                                                        : 'Reproductor interno'}
                                                </Text>
                                            </TouchableButton>
                                        )
                                    )}
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    listContainer: {
        flex: 1,
        marginHorizontal: 5,
    },
    innerContent: {},
    titleText: {
        fontFamily: 'Bold',
    },
    itemText: {
        fontFamily: 'Regular',
    },
    titleEpisode: {
        fontFamily: 'ExtraBold',
        textAlign: 'center',
        marginHorizontal: 32,
        marginBottom: 16,
    },
});

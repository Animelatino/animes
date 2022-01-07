import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    ToastAndroid,
} from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { getImage } from '../../functions/urls';
import { getYear, getStatus, getTypeAnime } from '../../functions/strings';
import * as Icons from 'react-native-vector-icons';
import TouchableButton from '../../components/TouchableButton';
import ButtonsAction from './ButtonsAction';

import { AdMobInterstitial } from 'expo-ads-admob';
import { ADMOB_INTERSTITIAL } from '@env';
import { useStore } from '../../store/StoreProvider';
import { validURL } from '../../functions/helpers';

export default (props) => {
    const { data } = props;
    const { colors, space, fontSizes } = useTheme();
    const navigation = useNavigation();

    const { config } = useStore();

    async function pressButtonPlay() {
        ToastAndroid.show('Por favor espere...', ToastAndroid.SHORT);
        try {
            await AdMobInterstitial.setAdUnitID(
                __DEV__
                    ? 'ca-app-pub-3940256099942544/1033173712'
                    : ADMOB_INTERSTITIAL
            );
            await AdMobInterstitial.requestAdAsync({
                servePersonalizedAds: true,
            });
            const res = await AdMobInterstitial.getIsReadyAsync();

            if (res) {
                await AdMobInterstitial.showAdAsync();
            }
        } catch (error) {
            ToastAndroid.show('Sin anuncios!!', ToastAndroid.SHORT);
        }

        if (config?.videos) {
            navigation.push('Episodios', {
                slug: data?.slug,
            });
        } else {
            if (validURL(data?.trailer)) {
                navigation.push('WebViewPlayer', {
                    id: '',
                    url: data?.trailer,
                });
            } else {
                navigation.push('WebViewPlayer', {
                    id: data?.trailer,
                });
            }
        }
    }

    return (
        <View style={[styles.container, { borderBottomColor: colors.border }]}>
            <View style={{ height: 350 }}>
                <View style={{ flex: 1 }}>
                    <ImageBackground
                        style={{ flex: 1 }}
                        source={{ uri: getImage('w780', data?.banner) }}
                    />
                    <View
                        style={[
                            StyleSheet.absoluteFill,
                            { backgroundColor: 'rgba(0,0,0,.3)' },
                        ]}
                    ></View>
                </View>
                <LinearGradient
                    colors={[
                        colors.background,
                        'rgba(0,0,0,0)',
                        colors.background,
                    ]}
                    style={StyleSheet.absoluteFill}
                />
                <View
                    style={[
                        StyleSheet.absoluteFill,
                        {
                            alignItems: 'flex-start',
                            justifyContent: 'flex-end',
                        },
                    ]}
                >
                    <View style={{ padding: space.md, width: '100%' }}>
                        <View
                            style={[
                                {
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.typeText,
                                    {
                                        fontSize: fontSizes.h1 + 4,
                                        color: colors.primary,
                                    },
                                ]}
                            >
                                {getTypeAnime(data?.type)}
                            </Text>
                            <Text
                                style={[
                                    styles.yearText,
                                    {
                                        marginLeft: space.xs,
                                        color: colors.white,
                                    },
                                ]}
                            >
                                {getYear(data?.aired)}
                            </Text>
                        </View>
                        <Text
                            style={[
                                styles.title,
                                {
                                    color: colors.white,
                                    fontSize: fontSizes.h3,
                                    marginBottom: space.xs,
                                },
                            ]}
                            numberOfLines={2}
                        >
                            {data?.name}
                        </Text>
                        <View
                            style={[
                                {
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                },
                            ]}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    marginRight: space.md,
                                }}
                            >
                                <ButtonsAction data={data} />
                            </View>
                            <View
                                style={{
                                    alignItems: 'flex-end',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <Text
                                    style={[
                                        styles.statusText,
                                        {
                                            color:
                                                data?.status == 1
                                                    ? 'green'
                                                    : 'red',
                                            fontSize: fontSizes.body1,
                                        },
                                    ]}
                                >
                                    {getStatus(data?.status)}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View
                    style={[
                        StyleSheet.absoluteFill,
                        {
                            alignItems: 'center',
                            justifyContent: 'center',
                        },
                    ]}
                >
                    <TouchableButton onPress={pressButtonPlay}>
                        <Icons.FontAwesome5
                            style={[{ elevation: 5, zIndex: 99 }]}
                            name={'play'}
                            size={48}
                            color={colors.white}
                        />
                    </TouchableButton>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
    },
    image: {
        aspectRatio: 14 / 9,
    },
    content: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    inner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textContainer: {
        flex: 1,
        marginRight: 10,
    },
    typeText: {
        fontFamily: 'Bold',
        textTransform: 'uppercase',
    },
    title: {
        fontFamily: 'Bold',
    },
    statusText: {
        fontFamily: 'Bold',
    },
    yearText: {
        fontFamily: 'SemiBold',
    },
});

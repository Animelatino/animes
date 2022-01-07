import { useTheme, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import Touchable from '../../components/Touchable';
import { useDispatch } from '../../store/StoreProvider';
import { types } from '../../store/StoreReducer';
import * as SecureStore from 'expo-secure-store';
import { api } from '../../db/api';
import useOrientation from '../../hooks/useOrientation';
import Constants from 'expo-constants';

function Account(props) {
    const { user } = props;
    const { colors, space, radio, fontSizes } = useTheme();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    async function logoutUser() {
        try {
            let token = await SecureStore.getItemAsync('userToken');
            if (token) {
                const dataJson = await api.get('auth/logout', {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (dataJson.status == 200) {
                    await SecureStore.deleteItemAsync('userToken');
                    ToastAndroid.show('Desconectado', ToastAndroid.SHORT);
                    navigation.reset({ index: 0, routes: [{ name: 'Tabs' }] });
                    dispatch({ type: types.updateUser, data: {} });
                }
            }
        } catch (error) {
            if (error.response) {
                await SecureStore.deleteItemAsync('userToken');
                ToastAndroid.show('Logeese primero', ToastAndroid.SHORT);
                navigation.reset({ index: 0, routes: [{ name: 'Tabs' }] });
                dispatch({ type: types.updateToken, data: null });
                dispatch({ type: types.updateUser, data: {} });
            } else {
                ToastAndroid.show('Ha ocurrido un error', ToastAndroid.SHORT);
            }
        }
    }

    const orientation = useOrientation();

    return (
        <View
            style={[
                styles.container,
                {
                    width: '100%',
                    padding: space.xxs,
                    flexDirection: orientation.isPortrait ? 'column' : 'row',
                },
            ]}
        >
            <View
                style={[
                    styles.userContainer,
                    {
                        width: orientation.isPortrait ? '100%' : '40%',
                        padding: space.xxs,
                    },
                ]}
            >
                <View
                    style={[
                        styles.headerContainer,
                        {
                            padding: space.xxs,
                        },
                    ]}
                >
                    <View
                        style={[
                            styles.imageContainer,
                            {
                                padding: space.xxs,
                            },
                        ]}
                    >
                        <Image
                            style={[styles.image]}
                            source={require('../../../assets/images/boy.png')}
                        />
                    </View>
                    <View style={{ padding: space.md }}>
                        <Text
                            style={[
                                styles.userNameText,
                                {
                                    fontSize: fontSizes.h1,
                                    color: colors.text,
                                },
                            ]}
                        >
                            {user?.name}
                        </Text>
                        <Text
                            style={[
                                styles.emailText,
                                {
                                    fontSize: fontSizes.h4,
                                    color: colors.gray,
                                },
                            ]}
                        >
                            {user?.email}
                        </Text>
                    </View>
                    <View
                        style={[
                            styles.buttonContainer,
                            {
                                borderRadius: radio.sm,
                                margin: space.md,
                            },
                        ]}
                    >
                        <Touchable
                            riple={true}
                            background={false}
                            useForeground={true}
                            onPress={logoutUser}
                        >
                            <View
                                style={{
                                    backgroundColor: colors.primary,
                                    paddingVertical: space.xs,
                                    paddingHorizontal: space.xxl,
                                }}
                            >
                                <Text
                                    style={[
                                        styles.textButton,
                                        {
                                            color: colors.white,
                                            fontSize: fontSizes.h4,
                                        },
                                    ]}
                                >
                                    Desconectarse
                                </Text>
                            </View>
                        </Touchable>
                    </View>
                    {user?.id == 1 && (
                        <View
                            style={[
                                styles.buttonContainer,
                                {
                                    borderRadius: radio.sm,
                                    margin: space.md,
                                },
                            ]}
                        >
                            <Touchable
                                riple={true}
                                background={false}
                                useForeground={true}
                                onPress={() => navigation.navigate('Descargas')}
                            >
                                <View
                                    style={{
                                        backgroundColor: colors.primary,
                                        paddingVertical: space.xs,
                                        paddingHorizontal: space.xxl,
                                    }}
                                >
                                    <Text
                                        style={[
                                            styles.textButton,
                                            {
                                                color: colors.white,
                                                fontSize: fontSizes.h4,
                                            },
                                        ]}
                                    >
                                        {Constants.manifest.version}
                                    </Text>
                                </View>
                            </Touchable>
                        </View>
                    )}
                </View>
            </View>
            <View
                style={{
                    width: orientation.isPortrait ? '100%' : '60%',
                    padding: space.xxs,
                }}
            >
                <View
                    style={{
                        paddingHorizontal: space.xxs,
                        marginVertical: orientation.isPortrait ? 0 : space.xxl,
                    }}
                >
                    <View
                        style={[
                            styles.buttonContainer,
                            {
                                borderRadius: radio.sm,
                                marginBottom: space.md,
                            },
                        ]}
                    >
                        <Touchable
                            riple={true}
                            background={false}
                            useForeground={true}
                            onPress={() =>
                                navigation.push('Animes', {
                                    isAuth: true,
                                    type: 'favorite',
                                    method: 'post',
                                    title: 'Mis favoritos',
                                    subtitle: 'Lista',
                                })
                            }
                        >
                            <View
                                style={[
                                    styles.rowContainer,
                                    {
                                        backgroundColor: colors.navigation,
                                        padding: space.xs,
                                    },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.textButton,
                                        {
                                            color: colors.text,
                                            fontSize: fontSizes.h3,
                                            flex: 1,
                                            marginHorizontal: space.sm,
                                        },
                                    ]}
                                >
                                    Mis favoritos
                                </Text>
                                <View style={{ width: 50, aspectRatio: 1 / 1 }}>
                                    <Image
                                        style={[styles.image]}
                                        source={require('../../../assets/images/lover.png')}
                                    />
                                </View>
                            </View>
                        </Touchable>
                    </View>
                    <View
                        style={[
                            styles.buttonContainer,
                            {
                                borderRadius: radio.sm,
                                marginBottom: space.md,
                            },
                        ]}
                    >
                        <Touchable
                            riple={true}
                            background={false}
                            useForeground={true}
                            onPress={() =>
                                navigation.push('Animes', {
                                    isAuth: true,
                                    type: 'suscribe',
                                    method: 'post',
                                    title: 'Terminados',
                                    subtitle: 'Lista',
                                })
                            }
                        >
                            <View
                                style={[
                                    styles.rowContainer,
                                    {
                                        backgroundColor: colors.navigation,
                                        padding: space.xs,
                                    },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.textButton,
                                        {
                                            color: colors.text,
                                            fontSize: fontSizes.h3,
                                            flex: 1,
                                            marginHorizontal: space.sm,
                                        },
                                    ]}
                                >
                                    Terminados
                                </Text>
                                <View style={{ width: 50, aspectRatio: 1 / 1 }}>
                                    <Image
                                        style={[styles.image]}
                                        source={require('../../../assets/images/closed-eyes.png')}
                                    />
                                </View>
                            </View>
                        </Touchable>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default Account;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    userContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        width: '50%',
        aspectRatio: 1 / 1,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    buttonContainer: {
        overflow: 'hidden',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textButton: {
        fontFamily: 'SemiBold',
    },
    userNameText: {
        fontFamily: 'Bold',
        textAlign: 'center',
    },
    emailText: {
        fontFamily: 'SemiBold',
        textAlign: 'center',
    },
});

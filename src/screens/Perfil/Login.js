import { useTheme, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import Constants from 'expo-constants';
import {
    Image,
    View,
    Text,
    StyleSheet,
    TextInput,
    ActivityIndicator,
    ToastAndroid,
} from 'react-native';
import * as Icons from 'react-native-vector-icons';
import Touchable from '../../components/Touchable';
import { api } from '../../db/api';
import { useDispatch } from '../../store/StoreProvider';
import { types } from '../../store/StoreReducer';
import * as SecureStore from 'expo-secure-store';

function Login() {
    const { colors, space, fontSizes, radio } = useTheme();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [secure, setSecure] = useState(true);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [fetching, setFetching] = useState(false);

    async function loginUser() {
        try {
            setFetching(true);
            const dataJson = await api.post('auth/token', {
                email: email,
                password: password,
                device_name: Constants.deviceName,
            });
            if (dataJson.status == 200) {
                if (dataJson.data.msg) {
                    setFetching(false);
                    ToastAndroid.show(dataJson.data.msg, ToastAndroid.SHORT);
                } else {
                    let token = dataJson.data;
                    await SecureStore.setItemAsync('userToken', token);
                    ToastAndroid.show('Bienvenido', ToastAndroid.SHORT);
                    const userData = await api.get('auth/user', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    navigation.reset({ index: 0, routes: [{ name: 'Tabs' }] });
                    dispatch({ type: types.updateUser, data: userData.data });
                    dispatch({ type: types.updateToken, data: token });
                }
            }
        } catch (error) {
            ToastAndroid.show(
                'Ha ocurrido un error inesperado',
                ToastAndroid.SHORT
            );
            setFetching(false);
        }
    }

    return (
        <View
            style={[
                styles.container,
                {
                    padding: space.xxs,
                },
            ]}
        >
            <View style={[styles.content, { padding: space.xxs }]}>
                <View style={[styles.imageContainer, { padding: space.sm }]}>
                    <Image
                        style={styles.image}
                        source={require('../../../assets/images/login.png')}
                    />
                </View>
                <View style={[styles.formContainer, { padding: space.xxs }]}>
                    <View
                        style={[
                            styles.formControl,
                            { marginVertical: space.xs },
                        ]}
                    >
                        <Text
                            style={[
                                styles.labelText,
                                {
                                    marginBottom: space.xs,
                                    fontSize: fontSizes.h4,
                                    color: colors.text,
                                },
                            ]}
                        >
                            Correo electrónico
                        </Text>
                        <View
                            style={[
                                styles.inputText,
                                {
                                    backgroundColor: colors.card,
                                    borderRadius: radio.sm,
                                },
                            ]}
                        >
                            <Icons.MaterialCommunityIcons
                                style={{
                                    padding: space.sm,
                                    backgroundColor: colors.navigation,
                                }}
                                name="email"
                                size={24}
                                color={colors.gray}
                            />
                            <TextInput
                                placeholderTextColor={colors.gray}
                                placeholder={'user@example.com'}
                                value={email}
                                onChangeText={setEmail}
                                style={[
                                    styles.textInput,
                                    { padding: space.sm, color: colors.white },
                                ]}
                                textContentType={'emailAddress'}
                                keyboardType={'email-address'}
                                autoCompleteType={'email'}
                            />
                        </View>
                    </View>
                    <View
                        style={[
                            styles.formControl,
                            { marginVertical: space.md },
                        ]}
                    >
                        <Text
                            style={[
                                styles.labelText,
                                {
                                    marginBottom: space.xs,
                                    fontSize: fontSizes.h4,
                                    color: colors.text,
                                },
                            ]}
                        >
                            Contraseña
                        </Text>
                        <View
                            style={[
                                styles.inputText,
                                {
                                    backgroundColor: colors.card,
                                    borderRadius: radio.sm,
                                },
                            ]}
                        >
                            <Icons.MaterialCommunityIcons
                                style={{
                                    padding: space.sm,
                                    backgroundColor: colors.navigation,
                                }}
                                name="lock"
                                size={24}
                                color={colors.gray}
                            />
                            <TextInput
                                placeholderTextColor={colors.gray}
                                placeholder={'**********'}
                                value={password}
                                onChangeText={setPassword}
                                style={[
                                    styles.textInput,
                                    { padding: space.sm, color: colors.white },
                                ]}
                                secureTextEntry={secure}
                                textContentType={'password'}
                                autoCompleteType={'password'}
                            />
                            <Touchable onPress={() => setSecure(!secure)}>
                                <Icons.MaterialCommunityIcons
                                    style={{ padding: space.sm }}
                                    name={secure ? 'eye' : 'eye-off'}
                                    size={24}
                                    color={colors.gray}
                                />
                            </Touchable>
                        </View>
                    </View>
                </View>
                <View
                    style={[
                        styles.buttonsContainer,
                        {
                            marginVertical: space.sm,
                            paddingHorizontal: space.xxs,
                        },
                    ]}
                >
                    <View
                        style={[
                            styles.buttonContainer,
                            {
                                marginVertical: space.xxs,
                                borderRadius: radio.sm,
                            },
                        ]}
                    >
                        <Touchable
                            background={false}
                            useForeground={true}
                            onPress={() =>
                                email && password ? loginUser() : null
                            }
                        >
                            <View
                                style={[
                                    {
                                        padding: space.sm,
                                        backgroundColor:
                                            email && password
                                                ? colors.primary
                                                : colors.navigation,
                                    },
                                ]}
                            >
                                {fetching ? (
                                    <ActivityIndicator
                                        color={colors.white}
                                        size={24}
                                    />
                                ) : (
                                    <Text
                                        style={[
                                            styles.buttonText,
                                            {
                                                color: colors.white,
                                                fontSize: fontSizes.h4,
                                            },
                                        ]}
                                    >
                                        Ingresar
                                    </Text>
                                )}
                            </View>
                        </Touchable>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        width: '100%',
        maxWidth: 500,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        width: '50%',
        aspectRatio: 1 / 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    formContainer: {
        width: '100%',
    },
    inputText: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        flex: 1,
        fontFamily: 'Regular',
    },
    labelText: {
        fontFamily: 'SemiBold',
    },
    buttonsContainer: {
        width: '100%',
    },
    buttonContainer: {
        overflow: 'hidden',
    },
    buttonText: {
        fontFamily: 'SemiBold',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
});

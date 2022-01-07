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

function Register(props) {
    const { setVisible } = props;
    const { colors, space, fontSizes, radio } = useTheme();
    const [secure, setSecure] = useState(true);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirmation, setPasswordConfirmation] = useState();
    const [errors, setErrors] = useState();
    const [fetching, setFetching] = useState(false);

    async function signInUser() {
        try {
            setFetching(true);
            const dataJson = await api.post('auth/register', {
                name: name,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation,
                device_name: Constants.deviceName,
            });

            if (dataJson.data) {
                ToastAndroid.show('Registro Exitoso', ToastAndroid.SHORT);
                setFetching(false);
                setVisible(false);
            }
        } catch (error) {
            if (error.response.data) {
                setErrors(error.response.data.errors);
                ToastAndroid.show(
                    'Los datos proporcionados no son válidos.',
                    ToastAndroid.SHORT
                );
            } else {
                ToastAndroid.show(
                    'Ha ocurrido un error inesperado',
                    ToastAndroid.SHORT
                );
            }
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
                        source={require('../../../assets/images/sign-up.png')}
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
                            Nombre de usuario
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
                                name="account"
                                size={24}
                                color={colors.gray}
                            />
                            <TextInput
                                placeholderTextColor={colors.gray}
                                placeholder={'user001'}
                                value={name}
                                onChangeText={setName}
                                style={[
                                    styles.textInput,
                                    { padding: space.sm, color: colors.white },
                                ]}
                                textContentType={'name'}
                                autoCompleteType={'name'}
                            />
                        </View>
                    </View>
                    {errors?.name && (
                        <Text
                            style={[
                                styles.errorText,
                                {
                                    fontSize: fontSizes.h5,
                                    color: colors.primary,
                                },
                            ]}
                        >
                            {errors?.name}
                        </Text>
                    )}
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
                    {errors?.email && (
                        <Text
                            style={[
                                styles.errorText,
                                {
                                    fontSize: fontSizes.h5,
                                    color: colors.primary,
                                },
                            ]}
                        >
                            {errors?.email}
                        </Text>
                    )}
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
                    {errors?.password && (
                        <Text
                            style={[
                                styles.errorText,
                                {
                                    fontSize: fontSizes.h5,
                                    color: colors.primary,
                                },
                            ]}
                        >
                            {errors?.password}
                        </Text>
                    )}
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
                            Repetir contraseña
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
                                value={passwordConfirmation}
                                onChangeText={setPasswordConfirmation}
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
                                name &&
                                email &&
                                password &&
                                passwordConfirmation
                                    ? signInUser()
                                    : null
                            }
                        >
                            <View
                                style={[
                                    {
                                        padding: space.sm,
                                        backgroundColor:
                                            name &&
                                            email &&
                                            password &&
                                            passwordConfirmation
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
                                        Registrarse
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

export default Register;

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
        width: '35%',
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
    errorText: {
        fontFamily: 'Regular',
    },
});

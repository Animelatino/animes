import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import Touchable from '../../components/Touchable';
import Login from './Login';
import ModalContext from './ModalContext';
import Register from './Register';

function Auth() {
    const [visibleLogin, setVisibleLogin] = useState(false);
    const [visibleRegister, setVisibleRegister] = useState(false);
    const { colors, space, fontSizes, radio } = useTheme();
    return (
        <View style={[styles.container, { padding: space.xxs }]}>
            <View style={[styles.content, { padding: space.xxs }]}>
                <View style={[styles.imageContainer, { padding: space.sm }]}>
                    <Image
                        style={styles.image}
                        source={require('../../../assets/images/authentication.png')}
                    />
                </View>
                <Text
                    style={[
                        styles.infoText,
                        { fontSize: fontSizes.h3, color: colors.gray },
                    ]}
                >
                    Registrate para tener una cuenta
                </Text>
                <View
                    style={[
                        styles.buttonsContainer,
                        {
                            marginVertical: space.xxl,
                            paddingHorizontal: space.sm,
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
                            onPress={() => setVisibleLogin(true)}
                        >
                            <View
                                style={[
                                    {
                                        padding: space.sm,
                                        backgroundColor: colors.primary,
                                    },
                                ]}
                            >
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
                            </View>
                        </Touchable>
                    </View>
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
                            onPress={() => setVisibleRegister(true)}
                        >
                            <View
                                style={[
                                    styles.button,
                                    {
                                        padding: space.sm,
                                        backgroundColor: colors.card,
                                    },
                                ]}
                            >
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
                            </View>
                        </Touchable>
                    </View>
                </View>
            </View>
            <ModalContext visible={visibleLogin} setVisible={setVisibleLogin}>
                <Login />
            </ModalContext>
            <ModalContext
                visible={visibleRegister}
                setVisible={setVisibleRegister}
            >
                <Register setVisible={setVisibleRegister} />
            </ModalContext>
        </View>
    );
}

export default Auth;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    infoText: {
        textAlign: 'center',
        fontFamily: 'Regular',
    },
    buttonsContainer: {
        width: '100%',
    },
    buttonContainer: {
        overflow: 'hidden',
    },
    button: {
        overflow: 'hidden',
    },
    buttonText: {
        fontFamily: 'SemiBold',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
});

import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    Image,
    Dimensions,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Touchable from './Touchable';

function ErrorMessage(props) {
    const { message, onReload } = props;
    const { colors, space, radio, fontSizes } = useTheme();
    return (
        <View style={[styles.container, { margin: space.xxl }]}>
            <View
                style={{
                    width: Dimensions.get('window').width > 728 ? '20%' : '50%',
                    aspectRatio: 1 / 1,
                    overflow: 'hidden',
                }}
            >
                <Image
                    style={{ width: '100%', height: '100%' }}
                    source={require('../../assets/images/error.png')}
                />
            </View>
            <View
                style={[
                    styles.content,
                    {
                        marginVertical: space.xl,
                    },
                ]}
            >
                {message && (
                    <Text
                        style={[
                            styles.text,
                            { color: colors.white, fontSize: fontSizes.h2 },
                        ]}
                    >
                        {message}
                    </Text>
                )}
                {onReload && (
                    <View
                        style={[
                            styles.onReload,
                            {
                                backgroundColor: colors.primary,
                                borderRadius: radio.xl,
                                marginVertical: space.md,
                            },
                        ]}
                    >
                        <Touchable onPress={onReload}>
                            <View
                                style={[
                                    styles.onReload,
                                    {
                                        paddingVertical: space.md,
                                        paddingHorizontal: space.xl,
                                    },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.textReload,
                                        {
                                            color: colors.white,
                                            fontSize: fontSizes.h3,
                                        },
                                    ]}
                                >
                                    Recargar
                                </Text>
                            </View>
                        </Touchable>
                    </View>
                )}
            </View>
        </View>
    );
}

export default ErrorMessage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'Regular',
        textAlign: 'center',
    },
    onReload: {
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textReload: {
        fontFamily: 'Bold',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
});

import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Touchable from '../../components/Touchable';

function LoadMore(props) {
    const { nextPage, page, setPage } = props;
    const { colors, space, radio, fontSizes } = useTheme();

    if (!nextPage) return null;
    return (
        <View style={[styles.container, { marginVertical: space.xl }]}>
            <View
                style={[
                    styles.buttonMore,
                    {
                        backgroundColor: colors.primary,
                        borderRadius: radio.xl,
                    },
                ]}
            >
                <Touchable onPress={() => setPage(page + 1)}>
                    <View
                        style={{
                            paddingVertical: space.md,
                            paddingHorizontal: space.xl,
                        }}
                    >
                        <Text
                            style={[
                                styles.buttonText,
                                { color: colors.text, fontSize: fontSizes.h3 },
                            ]}
                        >
                            Cargar más
                        </Text>
                    </View>
                </Touchable>
            </View>
        </View>
    );
}

export default LoadMore;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonMore: {
        overflow: 'hidden',
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: 'Regular',
    },
});

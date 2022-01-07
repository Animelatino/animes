import { useTheme } from '@react-navigation/native';

import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

function Loading({ message }) {
    const { colors } = useTheme();

    return (
        <View style={[StyleSheet.absoluteFill, styles.container]}>
            <ActivityIndicator color={'red'} size={'large'} />
            {message && (
                <Text
                    style={{
                        marginVertical: 16,
                        fontFamily: 'Bold',
                        color: colors.text,
                    }}
                >
                    {message}
                </Text>
            )}
        </View>
    );
}

export default Loading;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
    },
});

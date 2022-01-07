import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';

function Loader() {
    const { colors } = useTheme();
    return (
        <View style={[styles.container, StyleSheet.absoluteFillObject]}>
            <ActivityIndicator color={colors.primary} size={'large'} />
        </View>
    );
}

export default Loader;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

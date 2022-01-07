import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { useTheme } from '@react-navigation/native'

export default (props) => {
    const { children, title } = props;
    const { colors } = useTheme();
    return (
        <View style={styles.container}>
            {title && (
                <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>{title}</Text>
            )}
            {children && ( children )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderColor: 'rgb(45,45,45)'
    },
    title: {
        paddingHorizontal: 24,
        marginBottom: 16,
        fontSize: 18,
        fontFamily: 'Bold'
    }
});
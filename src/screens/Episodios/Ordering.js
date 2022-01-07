import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import * as Icons from 'react-native-vector-icons';
import Touchable from '../../components/Touchable';

function Ordering({ desc, pressOrder }) {
    const { colors } = useTheme();
    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: colors.primary,
                },
            ]}
        >
            <Touchable onPress={pressOrder}>
                <View style={[styles.buttonContainer]}>
                    <Icons.FontAwesome
                        name={desc ? 'sort-numeric-asc' : 'sort-numeric-desc'}
                        color={colors.text}
                        size={24}
                    />
                </View>
            </Touchable>
        </View>
    );
}

export default Ordering;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        borderRadius: 35,
        overflow: 'hidden',
        bottom: 20,
        left: 20,
        elevation: 5,
    },
    buttonContainer: {
        width: 60,
        aspectRatio: 1 / 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

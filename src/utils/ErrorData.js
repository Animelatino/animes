import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Text } from 'react-native';
import { TouchableNativeFeedback } from 'react-native';
import { TextInput } from 'react-native';

export default (props) => {
    const { colors } = useTheme();
    return (
        <ErrorData {...props} colors={colors}/>
    )
}

class ErrorData extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        const { colors, reloadData } = this.props;
        return (
            <View style={styles.container}>
                <View style={[styles.messageContainer, { backgroundColor: colors.detailed }]}>
                    <Text style={styles.titleText}>¡Lo sentimos!</Text>
                    <Text style={styles.messageText}>Ha ocurrido un error inesperado.</Text>
                    <TouchableNativeFeedback onPress={() => reloadData()}>
                        <View style={[styles.btnReloadContainer, { backgroundColor: colors.primary }]}>
                            <Text style={styles.reloadText}>Reintentar</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    messageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        borderRadius: 8
    },
    titleText: {
        fontFamily: 'Bold',
        fontSize: 20,
        color: 'white'
    },
    messageText: {
        fontFamily: 'Regular',
        color: 'white'
    },
    btnReloadContainer: {
        marginTop: 16,
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 16
    },
    reloadText: {
        fontFamily: 'Regular',
        color: 'white'
    }
});
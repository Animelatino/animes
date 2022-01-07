import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TouchableNativeFeedback } from 'react-native';

export default (props) => {
    const { colors } = useTheme();
    return (
        <Error {...props} colors={colors}/>
    )
}

class Error extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { colors, data, reload } = this.props;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
                <Text style={{ textAlign: 'center', fontFamily: 'Bold', color: colors.text, marginBottom: 16 }}>{`"${data?.type == 0 ? `No hay conexión a Internet.` : `No es posible conectarse con ${`Kawaii Animes`}.`}"`}</Text>
                <TouchableNativeFeedback onPress={() => reload()}>
                    <View style={{ paddingHorizontal: 16, paddingVertical: 10, backgroundColor: colors.card, borderRadius: 4 }}>
                        <Text style={{ fontFamily: 'Bold', color: colors.text }}>Reintentar</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }
}

import React, { PureComponent } from 'react';
import { View, TouchableNativeFeedback } from 'react-native';
import * as Icons from 'react-native-vector-icons';
import { useTheme, useNavigation } from '@react-navigation/native';

export default (props) => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    return (
        <HeaderLeft {...props} colors={colors} navigation={navigation}/>
    )
}
class HeaderLeft extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={{ marginHorizontal: 5 }}>
                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('gray', true)} useForeground={true} onPress={() => navigation.navigate("Perfil")}>
                    <View>
                        <Icons.FontAwesome style={{ marginHorizontal: 10 }} name="user-circle" color={'gray'} size={24}/>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }
}
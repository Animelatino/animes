import React, { PureComponent } from 'react';
import { View, TouchableNativeFeedback } from 'react-native';
import * as Icons from 'react-native-vector-icons';
import { useTheme, useNavigation } from '@react-navigation/native';

export default (props) => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    return (
        <HeaderRigth {...props} colors={colors} navigation={navigation}/>
    )
}
class HeaderRigth extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        const { colors, navigation } = this.props;
        return (
            <View style={{ marginHorizontal: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('gray', true)} useForeground={true} onPress={() => navigation.navigate("Busqueda")}>
                    <View>
                        <Icons.FontAwesome style={{ marginHorizontal: 10 }} name="search" color={colors.gray} size={24}/>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('gray', true)} useForeground={true} onPress={() => navigation.navigate("Settings")}>
                    <View>
                        <Icons.FontAwesome style={{ marginHorizontal: 16 }} name="ellipsis-v" color={colors.gray} size={24}/>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }
}
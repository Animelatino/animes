import React, { PureComponent } from 'react'
import Constants from 'expo-constants'
import { View, StyleSheet, Text, TouchableNativeFeedback } from 'react-native';
import * as Icons from 'react-native-vector-icons';

class HeaderWithBack extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        const { title = null, subtitle = null } = this.props.route.params;
        const { navigation } = this.props;
        return (
            <View style={styles.containter}>
                <TouchableNativeFeedback onPress={() => navigation.goBack() }>
                    <Icons.Ionicons name="arrow-back" size={24} color="gray"/> 
                </TouchableNativeFeedback>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subTitle}>{subtitle}</Text>
                </View>
            </View>
        )
    }
}

export default HeaderWithBack

const styles = StyleSheet.create({
    containter: {
        paddingTop: 16 + Constants.statusBarHeight,
        paddingVertical: 10,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgb(0,0,0)',
        borderBottomColor: 'rgb(45,45,45)',
        borderBottomWidth: .7,
    },
    titleContainer: {
        marginLeft: 16
    },
    title: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'RBold'
    },
    subTitle: {
        fontSize: 12,
        color: 'gray',
        fontFamily: 'RMedium'
    }
});
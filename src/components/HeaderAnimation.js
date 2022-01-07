import React, { PureComponent } from 'react';
import Constants from 'expo-constants';
import {
    Animated,
    View,
    StyleSheet,
    Text,
    Dimensions,
    TouchableNativeFeedback,
} from 'react-native';
import * as Icons from 'react-native-vector-icons';

class HeaderAnimation extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { title, subtitle } = this.props.route.params;
        const { navigation, animation } = this.props;
        const opacityHeader = animation.interpolate({
            inputRange: [
                Dimensions.get('window').width / 5 / 3,
                Dimensions.get('window').width / 5,
            ],
            outputRange: [0, 1],
        });
        return (
            <Animated.View
                style={[styles.containter, { opacity: opacityHeader }]}
            >
                <TouchableNativeFeedback onPress={() => navigation.goBack()}>
                    <Icons.Ionicons name="arrow-back" size={24} color="gray" />
                </TouchableNativeFeedback>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        {title?.charAt(0).toUpperCase() +
                            title.slice(1).replace('-', ' ')}
                    </Text>
                    <Text style={styles.subTitle}>
                        {subtitle?.charAt(0).toUpperCase() +
                            subtitle.slice(1).replace('-', ' ')}
                    </Text>
                </View>
            </Animated.View>
        );
    }
}

export default HeaderAnimation;

const styles = StyleSheet.create({
    containter: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        paddingTop: 16,
        paddingVertical: 10,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgb(0,0,0)',
        borderBottomColor: 'rgb(45,45,45)',
        borderBottomWidth: 0.7,
    },
    titleContainer: {
        marginLeft: 16,
    },
    title: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'RBold',
    },
    subTitle: {
        fontSize: 12,
        color: 'gray',
        fontFamily: 'RMedium',
    },
});

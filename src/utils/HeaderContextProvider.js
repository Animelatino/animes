import React, { PureComponent } from 'react';
import Constants from 'expo-constants';
import { Animated, StyleSheet } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';

export default (props) => {
    const { colors } = useTheme();
    return (
        <HeaderContextProvider {...props} colors={colors}/>
    )
}


class HeaderContextProvider extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { title, opacity } = this.props;
        return (
            <Animated.View style={styles.container}>
                <Animated.View>
                    <Animated.Text style={{ color: 'white' }} numberOfLines={1}>{ 'adasd' }</Animated.Text>
                </Animated.View>
                <Animated.View>
                    <Animated.Text style={[styles.titleText,{ opacity: opacity }]} numberOfLines={1}>{ title }</Animated.Text>
                </Animated.View>
                <Animated.View>
                    <Animated.Text style={{ color: 'white' }} numberOfLines={1}>{ 'adasdddddddd' }</Animated.Text>
                </Animated.View>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight + 16,
        padding: 16,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#000'
    },
    titleText: {
        flexGrow: 1,
        textAlign: 'center',
        marginHorizontal: 16,
        fontSize: 17,
        fontFamily: 'Bold'
    }
})